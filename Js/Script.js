window.onload = loading;
let canvas = document.querySelector("canvas");
let ctxcanvas = canvas.getContext('2d');
let speedearth = 0;
let cactusX = screen.width;
let birdX = screen.width + 500;
let speedPlayer = 0;
let grav = 0.1;
let playerDrawY = 30;
let playerJump = false;
let playerDown = false;
let isPause = true;
canvas.width = screen.width;
canvas.height = 200;
var imgsprite = new Image();
imgsprite.src = "Sprite.png";
function loading() {
    ctxcanvas.drawImage(imgsprite, 3, 104, 2400, 25, 0, 180, screen.width, 25);
    document.addEventListener("keydown", function (event) {
        if (event.keyCode == 87) {
            playerJump = true;
        }
    });
    document.addEventListener("keyup", function (event) {
        if (event.keyCode == 87) {
            playerJump = false;
        }
    });
}
function drawPlayer() {
    speedPlayer += grav;
    playerDrawY += Math.floor(speedPlayer);
    if (playerDrawY > 135) {
        playerDrawY = 135;
    }
    if (playerDrawY == 135) {
        if (playerJump) {
            speedPlayer = -5;
        }
    }
    if (cactusX < 250 && playerDrawY + 55 > 135 && cactusX - 30 > playerDrawY + 55) {
        isPause = false;
        alert("Игра окончена");
    }
    if (birdX < 350 && playerDrawY + 55 > 100 && cactusX - 45 > playerDrawY + 55 && playerDrawY < 100 + 32) {
        isPause = false;
        alert("Игра окончена");
    }
    ctxcanvas.drawImage(imgsprite, 1340, 0, 85, 95, 200, playerDrawY, 50, 55);
}
function drawCactus() {
    ctxcanvas.drawImage(imgsprite, 652, 2, 50, 100, 500, 135, 30, 60);
    if (cactusX < -30) {
        cactusX = screen.width;
    }
}
function drawBird() {
    ctxcanvas.drawImage(imgsprite, 260, 15, 90, 65, birdX -= 2, 100, 45, 32);
    if (birdX < -45) {
        birdX = screen.width;
    }
}
function drawEarth() {
    speedearth -= 2;
    ctxcanvas.drawImage(imgsprite, 3, 104, 2400, 25, 0 + speedearth, 180, screen.width, 25);
    ctxcanvas.drawImage(imgsprite, 3, 104, 2400, 25, 0 + speedearth + screen.width, 180, screen.width, 25);
    if (speedearth <= -screen.width) {
        speedearth = 0;
    }
}
setInterval(() => {
    if (isPause) {
        ctxcanvas.clearRect(0, 0, screen.width, 200);
        drawPlayer();
        drawCactus();
        drawBird();
        drawEarth();
    }
}, 1);