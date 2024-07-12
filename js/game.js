const Game = {

    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight
    },

    keys: {
        LEFT: 'ArrowLeft',
        RIGHT: 'ArrowRight'
    },

    player: undefined,

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
    },

    setEventListeners() {
        document.onkeydown = event => {

            switch (event.code) {
                case this.keys.LEFT:
                    this.player.moveLeft()
                    break
                case this.keys.RIGHT:
                    this.player.moveRight()
                    break
            }
        }

    },

    startGameLoop() {
        setInterval(() => {
            this.drawAll()
        }, 60)
    },

    drawAll() {
        this.player.move()
    }

}