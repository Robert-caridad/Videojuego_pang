class Player {

    constructor(gameSize) {
        this.gameSize = gameSize;
        //this.bullets = [];

        this.playerSize = {
            w: 100,
            h: 100
        }

        this.playerPos = {
            left: 50,
            top: this.gameSize.h - this.playerSize.h - 10
        }

        this.playerSpeed = {
            left: 70,
            top: 5
        }

        this.init()
    }

    init() {
        this.playerElement = document.createElement('div')

        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.w}px`
        this.playerElement.style.height = `${this.playerSize.h}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`
        this.playerElement.style.backgroundColor = `red`

        document.querySelector('#game-screen').appendChild(this.playerElement)
    }

    move() {
        this.updatePosition()
    }

    moveLeft() {
        this.playerPos.left -= this.playerSpeed.left
    }

    moveRight() {
        this.playerPos.left += this.playerSpeed.left
    }

    updatePosition() {
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`
    }
}