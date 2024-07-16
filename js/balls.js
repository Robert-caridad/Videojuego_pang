class Balls {

    constructor(gameSize, size, startingPosition, startingDirection) {

        this.gameSize = gameSize

        this.ballsSize = {
            w: size,
            h: size
        }

        this.ballsPos = { //preguntar por que no sale desde left 0
            left: startingPosition.left,
            top: startingPosition.top
        }

        this.ballsPhysics = {
            speed: {
                left: startingDirection.left,
                top: startingDirection.top
            },

            gravity: .4
        }


        this.init()

    }

    init() {

        this.ballsElement = document.createElement('div')

        this.ballsElement.style.position = 'absolute'
        this.ballsElement.style.width = `${this.ballsSize.w}px`
        this.ballsElement.style.height = `${this.ballsSize.h}px`
        this.ballsElement.style.left = `${this.ballsPos.left}px`
        this.ballsElement.style.top = `${this.ballsPos.top}px`
        this.ballsElement.style.backgroundColor = `white`
        this.ballsElement.style.borderRadius = '50%'


        document.querySelector('#game-screen').appendChild(this.ballsElement)
    }

    move() {
        this.ballsPhysics.speed.top += this.ballsPhysics.gravity

        this.ballsPos.top += this.ballsPhysics.speed.top
        this.ballsPos.left += this.ballsPhysics.speed.left

        this.checkBorderCollision()
        this.updatePosition()
    }

    updatePosition() {
        this.ballsElement.style.left = `${this.ballsPos.left}px`
        this.ballsElement.style.top = `${this.ballsPos.top}px`
    }

    checkBorderCollision() { // llega un momento que la bola desaparece en el suelo
        if (this.ballsPos.top >= this.gameSize.h - this.ballsSize.h) {
            this.turnTop()
        }

        if (this.ballsPos.top <= 0) {
            this.turnTop()
        }

        if (this.ballsPos.left >= this.gameSize.w - this.ballsSize.w) {
            this.turnLeft()
        }

        if (this.ballsPos.left <= 0) {
            this.turnLeft()
        }
    }

    turnTop() {
        this.ballsPhysics.speed.top *= -1
    }

    turnLeft() {
        this.ballsPhysics.speed.left *= -1
    }
}




/**clearBall(){
    this.balls.forEach((ball, idx) => {
        if (ball.ballsPos.top && ball.balls.left = bullet.position) {
             ball.ballElement.remove()
             
        this.ball.splice(idx, 1)
        }
    })
}  cuando la bala coincida con la bola en el eje x e y tiene que desaparecer la bola y la bala ( posterioirmente aparecer dos bolas mas pequeñas)**/