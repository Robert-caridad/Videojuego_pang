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

    player: undefined,
    ballsArr: [],


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
        this.balls = new Balls(this.gameSize)

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

            if (this.checkBallsCollisionWithBullets()) this.clearBall()
        }, 60)
    },

    drawAll() {
        this.player.move()
        this.balls.move()

    },

    moveAll() {
        this.player.move()
        this.balls.move()

    },

    clearAll() {
        this.player.clearBullets()
        this.clearBall()
    },

    checkBallsCollisionWithBullets() { // preguntar a German colicion entre objetos en movimiento
        if (this.ballsPos.top === this.gameSize.h) { //modificar el condicional 
            this.clearBall()
        }
    },

    clearBall() {
        this.ballsArr.forEach((ball, idx) => {

            ball.ballsElement.remove()

            this.ballsArr.splice(idx, 1)
        })
    }


}