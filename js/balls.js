class Balls {

    constructor(gameSize) {

        this.gameSize = gameSize

        this.ballsSize = {
            w: 60,
            h: 60
        }

        this.ballsPos = {
            left: this.gameSize.w - this.gameSize.w, // no sale desde 0
            top: this.gameSize.h / 2
        }

        this.ballsPhysics = {
            speed: {
                left: 10,
                top: 5
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
        this.ballsPhysics.speed.top += this.ballsElement.gravity

        this.ballsPos.top += this.ballsPhysics.speed.top
        this.ballsPos.left += this.ballsPhysics.speed.left

        // this.checkBorderCollision()
        this.updatePosition()
    }

    updatePosition() {
        this.ballsElement.style.left = `${this.ballsPos.left}px`
        this.ballsElement.style.top = `${this.ballsPos.top}px`
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