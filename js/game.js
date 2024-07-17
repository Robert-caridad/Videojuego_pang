const Game = {

    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight
    },

    keys: {
        LEFT: 'ArrowLeft',
        RIGHT: 'ArrowRight',
        SHOOT: 'Space'
    },

    receivesDamage: true,
    canExplode: true,
    leftKeyPressed: false,
    rightKeyPressed: false,

    player: undefined,
    ballsArr: [],
    oldBallPos: undefined,

    stage: 1,

    init() {
        this.setDimensions()
        this.start()
    },

    setDimensions() {
        document.querySelector("#game-screen").style.width = `${this.gameSize.w}px`
        document.querySelector("#game-screen").style.height = `${this.gameSize.h}px`
    },

    start() {

        this.createElements()
        this.setEventListeners()
        this.startGameLoop()
    },

    createElements() {
        this.player = new Player(this.gameSize)
        this.ballsArr.push(new Ball(this.gameSize, 150, { left: 0, top: 0 }, { left: 10, top: 5 }))
    },

    setEventListeners() {
        document.onkeydown = event => {

            if (event.code === this.keys.LEFT) {
                this.leftKeyPressed = true;
                // Start moving the object left
            } else if (event.code === this.keys.RIGHT) {
                this.rightKeyPressed = true;
                // Start moving the object right
            } else if (event.code === this.keys.SHOOT) {
                this.player.shoot()
            }
        }

        document.onkeyup = event => {

            if (event.code === this.keys.LEFT) {
                this.leftKeyPressed = false;
                // Start moving the object left
            } else if (event.code === this.keys.RIGHT) {
                this.rightKeyPressed = false;
                // Start moving the object right
            }
        }

    },



    startGameLoop() {

        setInterval(() => {
            this.checkCollisions()
            this.moveAll()
            this.clearAll()
        }, 60)

    },

    checkCollisions() {
        if (this.isCollisionBallsWithPlayer()) this.deleteLives()
        if (this.isCollisionBallsWithBullets()) this.handleBallCreation()
        if (this.ballsArr.length === 0) this.winGame()
    },

    moveAll() {


        if (this.leftKeyPressed) {
            this.player.moveLeft()
        }
        if (this.rightKeyPressed) {
            this.player.moveRight()
        }

        this.ballsArr.forEach((eachBall) => {
            eachBall.move()
        })

        this.player.bullets.forEach(elm => {
            elm.move()
        })

    },

    handleBallCreation() { // TODO: to know witch state each ball is.

        if (this.stage === 1 && this.isCollisionBallsWithBullets() && this.canExplode === true) {

            this.clearBall()
            this.ballsArr.push(new Ball(this.gameSize, 100, this.oldBallPos, { left: -15, top: -5 }))
            this.ballsArr.push(new Ball(this.gameSize, 100, this.oldBallPos, { left: 15, top: -5 }))

            this.stage += 1

            this.canExplode = false

            setTimeout(() => this.canExplode = true, 1000)


        } else if (this.stage === 2 && this.isCollisionBallsWithBullets() && this.canExplode === true) {
            this.clearBall()
            this.ballsArr.push(new Ball(this.gameSize, 50, this.oldBallPos, { left: -15, top: -5 }))
            this.ballsArr.push(new Ball(this.gameSize, 50, this.oldBallPos, { left: 15, top: -5 }))
            this.stage += 1

            this.canExplode = false

            setTimeout(() => this.canExplode = true, 1000)

        } else if (this.stage === 3 && this.isCollisionBallsWithBullets() && this.canExplode === true) {
            this.clearBall()

        }
    },

    clearAll() {
        this.player.clearBullets()
    },

    isCollisionBallsWithBullets() {

        for (let i = 0; i < this.ballsArr.length; i++) {

            for (let j = 0; j < this.player.bullets.length; j++) {

                if (
                    this.player.bullets[j].bulletPos.left + this.player.bullets[j].bulletSize.w >= this.ballsArr[i].ballsPos.left &&
                    this.player.bullets[j].bulletPos.top + this.player.bullets[j].bulletSize.h >= this.ballsArr[i].ballsPos.top &&
                    this.player.bullets[j].bulletPos.left <= this.ballsArr[i].ballsPos.left + this.ballsArr[i].ballsSize.w &&
                    this.player.bullets[j].bulletPos.top <= this.ballsArr[i].ballsPos.top + this.ballsArr[i].ballsSize.h) {

                    this.oldBallPos = this.ballsArr[i].ballsPos

                    return true
                }
            }
        }
    },

    clearBall() {
        this.ballsArr.forEach((ball, idx) => {

            ball.ballsElement.remove()

            this.ballsArr.splice(idx, 1)
        })
    },

    isCollisionBallsWithPlayer() {

        for (let i = 0; i < this.ballsArr.length; i++) {
            if (
                this.player.playerPos.left + this.player.playerSize.w >= this.ballsArr[i].ballsPos.left &&
                this.player.playerPos.top + this.player.playerSize.h >= this.ballsArr[i].ballsPos.top &&
                this.player.playerPos.left <= this.ballsArr[i].ballsPos.left + this.ballsArr[i].ballsSize.w &&
                this.player.playerPos.top <= this.ballsArr[i].ballsPos.top + this.ballsArr[i].ballsSize.h

            ) {
                return true
            }
        }
    },

    deleteLives() {

        if (this.isCollisionBallsWithPlayer() && this.player.lives > 0 && this.receivesDamage === true) {
            this.player.lives -= 1
            this.receivesDamage = false

            setTimeout(() => this.receivesDamage = true, 1000)

        }
        if (this.player.lives === 0) {
            this.gameOver()
        }
    },

    gameOver() {
        // alert('GAME OVER')
    },

    winGame() {
        alert('WIN')
    }

}