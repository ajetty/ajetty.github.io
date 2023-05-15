//https://stackoverflow.com/a/38473767 <- canvas info

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const starPath = new Path2D("M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z");

const colorList = ["#A7489B","#CA4246","#E16541","#E16541","#F18F43","#F18F43","#8B9862","#8B9862","#007ae8","#476098"];

const starInitialVelocity = 0.25;
const angle = 60;
const duration = 6000;
const gravity = 0.0001;
const airResistance = 0.0005;


let stars = [];

function resize(canvas) {
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    if (width != canvas.width || height != canvas.height) {
        canvas.width = width;
        canvas.height = height;
    }
}

let before = Date.now();
const id = setInterval(render, 5);
const gr = setInterval(starBackground, 100);

function render(time) {

    let current = Date.now();
    let deltaTime = current - before;
    before = current;

    resize(ctx.canvas);
    ctx.save();

    let w = ctx.canvas.width;
    let h = ctx.canvas.height;
    let hw = w / 2;
    let hh = h / 2;

    ctx.clearRect(0, 0, w, h);


    for(let i in stars) {
        const star = stars[i];
        star.time -= deltaTime;

        ctx.resetTransform();

        if(star.time > 0) {
            star.velocityX -= star.velocityX * airResistance * deltaTime;
            star.velocityY -= gravity * deltaTime + star.velocityY * airResistance * deltaTime;

            star.positionX += star.velocityX * deltaTime;
            star.positionY -= star.velocityY * deltaTime;

            ctx.fillStyle = star.color;
            ctx.translate(star.positionX, star.positionY);
            ctx.scale(star.scale, star.scale);
            ctx.fill(starPath);
        }else {
            stars.splice(i, 1);
        }
    }

    ctx.restore();
}



function generateStar(x, y, scale) {

    let starParameters = {
        color: colorList[Math.floor(Math.random() * colorList.length)],
        positionX: x,
        positionY: y,
        velocityX: starInitialVelocity * Math.sin(angle * Math.PI / 180),
        velocityY: starInitialVelocity * Math.cos(angle * Math.PI / 180),
        scale: scale,
        time: duration
    }

    if(stars == null) {
        stars = [];
    }else {
        stars.push(starParameters);
    }


}

function starBackground() {

    let scale = Math.floor(Math.random() * 2 + 0.5);
    let windowWidth = canvas.clientWidth;
    let windowHeight = canvas.clientHeight;

    let xPosition = Math.floor(Math.random() * (windowWidth+300)) - 300;
    let yPosition = Math.floor(Math.random() * (windowHeight));


    generateStar(xPosition, yPosition, scale);
}