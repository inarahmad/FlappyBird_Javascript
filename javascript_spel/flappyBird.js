var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//get images
var bird = new Image();
var background = new Image();
var ground = new Image();
var pipeA = new Image();
var pipeB = new Image();

var flap = new Audio();
var pass = new Audio();

flap.src = "sounds/fly.mp3";
pass.src = "sounds/score.mp3";

//bird position
var bX = 10;
var bY = 100;
var gravity = 2;
var score = 0;

bird.src = "images/bird.png";
background.src = "images/bg.png";
ground.src = "images/fg.png";
pipeA.src = "images/pipeA.png";
pipeB.src = "images/pipeB.png";

//flying control
document.addEventListener("keyup", moveUp);

function moveUp() {
    bY -= 40;
    flap.play();
}

//pipe position
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
};

function draw() {
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(bird, bX, bY);
    bY += gravity;

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeA, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeB, pipe[i].x, pipe[i].y + pipeA.height + 115);
        ctx.drawImage(ground, 0, cvs.height - ground.height);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeA.height) - pipeA.height
            });
        }

        //hit  rules

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeA.width && (bY <= pipe[i].y + pipeA.height || bY + bird.height >= pipe[i].y + pipeA.height + 115) || bY + bird.height >= cvs.height - ground.height) {
            var replay = confirm("Game Over! Spela igen?");
            if (replay == true) {
                location.reload();
            }
            return false;
        }

        if (pipe[i].x == 5) {
            score++;
            pass.play();
        }
    }
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("score : " + score, cvs.width - 100, cvs.height - 30);
    requestAnimationFrame(draw);
}

try {
    draw();
} catch (err) {
    document.getElementById("error").innerHTML = "Kan inte ladda spelet. Det gick fel pga " + err.name;
}