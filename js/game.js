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

    player: undefined,
    ballsArr: [],
    oldBallPos: undefined,

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
        this.ballsArr.push(new Balls(this.gameSize, 100, { left: 0, top: 0 }, { left: 10, top: 5 }))

    },

    setEventListeners() {
        document.onkeydown = event => {

            switch (event.code) {
                case this.keys.LEFT:
                    this.player.moveLeft()
                    break;
                case this.keys.RIGHT:
                    this.player.moveRight()
                    break;
                case this.keys.SHOOT:
                    this.player.shoot()
                    break;

            }
        }

    },

    startGameLoop() {
        setInterval(() => {

            this.drawAll()
            this.moveAll()
            this.clearAll()

            if (this.isCollisionBallsWithPlayer()) this.deleteLives()
            if (this.isCollisionBallsWithBullets()) this.handleBallCreation()
            if (this.isCollisionBallsWithBullets()) this.clearBall()
            //if (this.ballsArr.length === 0) this.winGame()
        }, 60)
    },

    drawAll() {
        this.player.move()
        this.ballsArr.forEach((eachBall) => {
            eachBall.move()
        })

    },

    moveAll() {
        this.player.move()
        this.ballsArr.forEach((eachBall) => {
            eachBall.move()
        })

    },

    handleBallCreation() {
        if (this.isCollisionBallsWithBullets() && this.receivesDamage === true) { // elimina las 2 o 3 bolas de golpe
            this.clearBall()
            this.ballsArr.push(new Balls(this.gameSize, 50, this.oldBallPos, { left: -15, top: 5 }))
            this.ballsArr.push(new Balls(this.gameSize, 50, this.oldBallPos, { left: 15, top: 5 }))

            this.receivesDamage = false

            setTimeout(() => this.receivesDamage = true, 1000)

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

            console.log(this.player.lives)
        }
        if (this.player.lives === 0) {
            this.gameOver()
        }


    },

    gameOver() {
        alert('GAME OVER')
    },

    winGame() {
        alert('WWWWWIIIIIIINNNNN')
    }

}