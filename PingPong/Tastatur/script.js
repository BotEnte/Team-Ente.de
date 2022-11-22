import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

const PADDLE_SPEED = .1
const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
let down = false
let up = false

let lastTime


document.onkeydown = function(event) {
    if(event.keyCode == 40 || event.keyCode == 83) down = true
    if(event.keyCode == 38 || event.keyCode == 87) up = true
}

document.onkeyup = function(event) {
    if(event.keyCode == 40 || event.keyCode == 83) down = false
    if(event.keyCode == 38 || event.keyCode == 87) up = false
}

// Update Loop
function update(time){
    if(lastTime != null){
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        
        if(down){
            if(playerPaddle.position <= 100) playerPaddle.position += PADDLE_SPEED*delta
        }
        if(up){
            if(playerPaddle.position >= 0) playerPaddle.position -= PADDLE_SPEED*delta
        }

        if(isLose()) {
            handleLose()
        }
    }

    lastTime = time
    window.requestAnimationFrame(update)
}

function handleLose() {
    const rect = ball.rect()
    if(rect.right >= window.innerWidth){
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    }   else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
    playerPaddle.reset()
}

function isLose() {
    const rect = ball.rect()
    return rect.left >= window.innerWidth || rect.right <= 0 
}

window.requestAnimationFrame(update)