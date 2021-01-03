let img;
let imgPlayer1;
let imgPlayer2;
let borderColor1;
let borderColor2;
let menuColor;
let menuColorDark;
let winningColor;
let circleUnselected;
let font;
let sparklerColorList;

const borderWidth = 20;

const cornerRadius = 20;

const backgroundBorderRectWidth = 770;
const backgroundBorderRectHeight = 570;

const gameBoardRectWidth = 770 - borderWidth;
const gameBoardRectHeight = 570 - borderWidth;

const backgroundImageWidth = gameBoardRectWidth;
const backgroundImageHeight = gameBoardRectHeight;

const backgroundSubmenuBorderRectWidth = 300;
const backgroundSubmenuBorderRectHeight = 250;

const submenuBorderWidth = 15;

const submenuBoardRectWidth = backgroundSubmenuBorderRectWidth - submenuBorderWidth;
const submenuBoardRectHeight = backgroundSubmenuBorderRectHeight - submenuBorderWidth;

const circleDiameter = 50;
let circleList;
let winningCircles;

let playerOneTurn;

let gameController;

let winner;
let textYOffset;

let bitIndex = [57, 58, 59, 60, 61, 62, 50, 51, 52, 53, 54, 55, 43, 44, 45, 46, 47, 48, 36, 37, 38,
    39, 40, 41, 29, 30, 31, 32, 33, 34, 22, 23, 24, 25, 26, 27, 15, 16, 17, 18, 19, 20];

let cnv;
let button;

let menuText;
let playerTurnText;

let angle;
let speed = 0.01;

let particles = [];

function preload() {
    img = loadImage('images/flowerbackground.png');
    imgPlayer1 = loadImage('images/daisy.png');
    imgPlayer2 = loadImage('images/redflower.png');
    font = loadFont('fonts/DeliusSwashCaps-Regular.ttf');
}

function setup() {
    borderColor1 = color('#3a243b');
    borderColor2 = color('#732226');
    menuColor = color('#e9c0c4');
    menuColorDark = color(`#3a243b`);
    winningColor = color('#a98316');
    sparklerColorList = [color(38,0,255), color(9,0,255), color(255,0,255), color(0,140,255)];
    cnv = createCanvas(950, 600);
    cnv.id(`canvas`);
    button = createButton('Play Again');
    button.id(`button`);
    newGame();
    textAlign(CENTER);
}

function windowResized() {
    centerCanvas();
}

function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnv.position(x, y);
    button.position(x + 725, y + 315);

    let playerTurnStatus = document.getElementById('playerTurnStatus');
    playerTurnStatus.style.position = "absolute";
    playerTurnStatus.style.left = `${x}px`;
    playerTurnStatus.style.top = `${y-90}px`;

    let playerImage = document.getElementById('playerImage');
    playerImage.style.position = "absolute";
    playerImage.style.left = `${x+310}px`;
    playerImage.style.top = `${y-60}px`;

    let firework = document.getElementById('firework');
    firework.style.position = "absolute";
    firework.style.left = `${x+330}px`;
    firework.style.top = `${y-30}px`;

}

function newGame() {
    playerOneTurn = true;
    circleList = [];
    winningCircles = [];
    winner = 0;
    angle = 0;
    textYOffset = 10;
    playerTurnText = "Player One Turn"

    let playerImage = document.getElementById('playerImage');
    playerImage.src = "images/daisy.png"

    playerImage.classList.remove("scale");
    playerImage.classList.add('rotate');
    //newPlayerImage = playerImage.cloneNode(true);
    //playerImage.parentNode.replaceChild(newPlayerImage, playerImage);

    let firework = document.getElementById('firework');
    firework.classList.remove("after");

    menuText = "This is a two player game. Please click on a column to drop a player's piece. The first one to make four in a row wins!";
    background('rgba(0,0,0, 0.0)');
    gameController = new GameController(new PlayerOne(), new PlayerTwo());
    createCircles();
    centerCanvas();
    button.mouseReleased(newGame);
}


/* Creating the circle objects that hold the ellipse data for each playable tile on the game board.
 * bitIndex ids correspond to game board move positions and bitboards used to
 * record player data.
 *
 * 56 49 42 35 28 21 14 <--BUFFER/NO ACCESS
 * 57 50 43 36 29 22 15 <--TOP
 * 58 51 44 37 30 23 16
 * 59 52 45 38 31 24 17
 * 60 53 46 39 32 25 18
 * 61 54 47 40 33 26 19
 * 62 55 48 41 34 27 20 <--BOTTOM
*/
function createCircles() {

    let bitIndexCount = 0;

    circleUnselected = color('#A9A9A9');
    let offset = 35;

    let xPosition = borderWidth * 2 + offset;
    let yPosition = borderWidth * 2 + offset;

    //draw circles and push reference to list
    for (let x = 0; x < 7; x++) {
        fill(circleUnselected);

        for (let y = 0; y < 6; y++) {

            let circle = new Circle(xPosition, yPosition, circleDiameter, circleUnselected, bitIndex[bitIndexCount]);
            circleList.push(circle);

            yPosition += circleDiameter + offset;
            bitIndexCount++;

        }

        xPosition += circleDiameter + offset;
        yPosition = borderWidth * 2 + offset;

    }

}

function drawCircles() {

    circleList.forEach(circle => circle.display());

}

function createGameBoard() {
    rectMode(CORNER);
    noStroke();

    //border rectangle base rectangle
    fill(borderColor1);
    rect(0, 0, backgroundBorderRectWidth, backgroundBorderRectHeight, cornerRadius, cornerRadius, cornerRadius, cornerRadius);

    //border rectangle gradient rectangle on top of border base rectangle
    setGradient(cornerRadius, 0, backgroundBorderRectWidth - (cornerRadius * 2), backgroundBorderRectHeight, borderColor1, borderColor2, 'X');

    noStroke();

    //main game board
    fill(menuColor);
    rect(borderWidth / 2, borderWidth / 2, gameBoardRectWidth, gameBoardRectHeight, 20, 20, 20, 20);

    //background image for main game board
    image(img, borderWidth / 2, borderWidth / 2, backgroundImageWidth, backgroundImageHeight);

    if(winner == 0) {
        document.getElementById('playerTurnStatus').innerHTML
            = playerTurnText;
    }else {
        createLineSparkler()
        createHalo();
    }
}

function createLineSparkler() {
    stroke(color('green'));
    strokeWeight(10);
    let scoreLine = line(winningCircles[0].getX(), winningCircles[0].getY(), winningCircles[3].getX(), winningCircles[3].getY());
    noStroke();

    ParticleSystem(winningCircles[0].getX(), winningCircles[0].getY());
    ParticleSystem(winningCircles[1].getX(), winningCircles[1].getY());
    ParticleSystem(winningCircles[2].getX(), winningCircles[2].getY());
    ParticleSystem(winningCircles[3].getX(), winningCircles[3].getY());
}

let ParticleSystem = function (xPos, yPos) {
    for (let i = 0; i < 5; i++) {
        let p = new Particle(xPos, yPos);
        particles.push(p);
    }
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        if (particles[i].finished()) {
            particles.splice(i, 1);
        }
    }
}

function createHalo() {
    fill(color(231, 189, 66, 100 - frameCount % 100));
    ellipse(winningCircles[3].getX(), winningCircles[3].getY(), (frameCount % 100)*2, (frameCount % 100)*2);
    ellipse(winningCircles[2].getX(), winningCircles[2].getY(), (frameCount % 100)*2, (frameCount % 100)*2);
    ellipse(winningCircles[1].getX(), winningCircles[1].getY(), (frameCount % 100)*2, (frameCount % 100)*2);
    ellipse(winningCircles[0].getX(), winningCircles[0].getY(), (frameCount % 100)*2, (frameCount % 100)*2);
    fill(color(231, 189, 66, 100 - (frameCount + 16) % 100));
    ellipse(winningCircles[3].getX(), winningCircles[3].getY(), ((frameCount + 16) % 100)*2, ((frameCount + 16) % 100)*2);
    ellipse(winningCircles[2].getX(), winningCircles[2].getY(), ((frameCount + 16) % 100)*2, ((frameCount + 16) % 100)*2);
    ellipse(winningCircles[1].getX(), winningCircles[1].getY(), ((frameCount + 16) % 100)*2, ((frameCount + 16) % 100)*2);
    ellipse(winningCircles[0].getX(), winningCircles[0].getY(), ((frameCount + 16) % 100)*2, ((frameCount + 16) % 100)*2);
    fill(color(231, 189, 66, 100 - (frameCount + 32) % 100));
    ellipse(winningCircles[3].getX(), winningCircles[3].getY(), ((frameCount + 32) % 100)*2, ((frameCount + 32) % 100)*2);
    ellipse(winningCircles[2].getX(), winningCircles[2].getY(), ((frameCount + 32) % 100)*2, ((frameCount + 32) % 100)*2);
    ellipse(winningCircles[1].getX(), winningCircles[1].getY(), ((frameCount + 32) % 100)*2, ((frameCount + 32) % 100)*2);
    ellipse(winningCircles[0].getX(), winningCircles[0].getY(), ((frameCount + 32) % 100)*2, ((frameCount + 32) % 100)*2);
}

function createSubmenu() {

    textFont(font, 20);

    rectMode(CORNER);
    noStroke();

    translate(630, 150);

    //border rectangle base rectangle
    fill(borderColor1);
    rect(0, 0, backgroundSubmenuBorderRectWidth, backgroundSubmenuBorderRectHeight, cornerRadius, cornerRadius, cornerRadius, cornerRadius);

    //border rectangle gradient rectangle on top of border base rectangle
    setGradient(cornerRadius, 1, backgroundSubmenuBorderRectWidth - (cornerRadius * 2), backgroundSubmenuBorderRectHeight - 3, borderColor1, borderColor2, 'X');

    noStroke();

    //submenu game board
    fill(menuColor);
    rect(submenuBorderWidth / 2, submenuBorderWidth / 2, submenuBoardRectWidth, submenuBoardRectHeight, 20, 20, 20, 20);

    fill(menuColorDark);
    text(menuText, submenuBorderWidth / 2 + 8, submenuBorderWidth / 2 + textYOffset, submenuBoardRectWidth - 2, 200);


    pop();
}


function draw() {

    clear();

    createGameBoard();

    drawCircles();

    createSubmenu();

    showWinner();

    //print(`Frame rate: ${frameRate()}`)

}

//https://p5js.org/examples/color-linear-gradient.html
function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();

    if (axis === 'Y') {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else if (axis === 'X') {
        // Left to right gradient

        let halfway = (x + w) / 2;
        let fullway = x + w;

        for (let i = x; i <= halfway; i++) {
            let inter = map(i, x, halfway, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }

        for (let i = halfway; i <= fullway; i++) {
            let inter = map(i, halfway, fullway, 0, 1);
            let c = lerpColor(c2, c1, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}

function mousePressed() {

    let foundCircle;

    for (let i = 0; i < circleList.length; i++) {
        foundCircle = circleList[i].clicked();

        if (foundCircle) {
            print(`mouse pressed get id: ${circleList[i].getId()}`)
            gameController.receiveGUIMove(circleList[i].getId());
        }
    }

    gameController.gameLoop();

}

function changePlayerTurnText() {
    if(playerOneTurn) {
        playerTurnText = "Player One Turn";
        document.getElementById('playerImage').src = "images/daisy.png"
    }else {
        playerTurnText = "Player Two Turn";
        document.getElementById('playerImage').src = "images/redflower.png"
    }
}

function receiveTurn(value) {
    let circle = circleList.find(element => element.getId() === value);

    circle.setPlayerColor();
    playerOneTurn = !playerOneTurn;
}

function receiveGameOver(whoWon, winningCombo) {
    if(whoWon) {
        menuText = "Game Over!\n Player 1 has won!"
        textYOffset = 75;
        winner = 1;
    }else {
        menuText = "Game Over!\n Player 2 has won!"
        textYOffset = 75;
        winner = 2;
    }

    winningCombo.sort();

    print(`winning combo ${winningCombo}`);



    winningCombo.forEach(id => winningCircles.push(circleList.find(circle => circle.getId() === id)));

    winningCircles.forEach(circle => circle.setDisplayColor(color(winningColor)));

    print(`winning circle ${winningCircles[3].getY()}`);

    animations("scale", "playerImage");
    animations("after", "firework");


}

function showWinner() {

    if(winner == 1) {
        push();
        translate(150,-20);
        rotate(angle * speed);
        imageMode(CENTER);
        noFill();
        image(imgPlayer1,0,0,155,155);
        angle++;
        pop();
    }else if(winner == 2) {
        push();
        translate(150,-20);
        rotate(angle * speed);
        imageMode(CENTER);
        noFill();
        image(imgPlayer2,0,0,155,155);
        angle++;
        pop();
    }
    //imageMode(CORNER);

}


class Circle {

    constructor(x, y, diameter, displayColor, id) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.displayColor = displayColor;
        this.id = id;
        this.player = 0;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getDiameter() {
        return this.diameter;
    }

    setDisplayColor(displayColor) {
        this.displayColor = displayColor;
    }

    getId() {
        return this.id;
    }

    display() {
        if(this.player == 1) {
            stroke(color('#3a243b'));
            strokeWeight(2);
            fill(this.displayColor);
            ellipse(this.x, this.y, this.diameter + 10, this.diameter + 10);
            noFill();
            image(imgPlayer1, this.x-25, this.y-25, this.diameter, this.diameter);
            changePlayerTurnText();
        }else if(this.player == 2) {
            stroke(color('#3a243b'));
            strokeWeight(2);
            fill(this.displayColor);
            ellipse(this.x, this.y, this.diameter + 10, this.diameter + 10);
            noFill();
            image(imgPlayer2, this.x-25, this.y-27, this.diameter, this.diameter);
            changePlayerTurnText();
        }else {
            fill(this.displayColor)
            ellipse(this.x, this.y, this.diameter, this.diameter);
            this.hoverEnter();
        }
        noStroke();
    }

    selected() {
        stroke(color('#3a243b'));
        strokeWeight(2);
        fill(color('#732226'));
        ellipse(this.x, this.y, this.diameter + 10, this.diameter + 10);
        noFill();
        if(playerOneTurn) {
            image(imgPlayer1, this.x-25, this.y-25, this.diameter + 10, this.diameter + 10);
        }else {
            image(imgPlayer2, this.x-25, this.y-27, this.diameter + 10, this.diameter + 10);
        }

    }

    hoverEnter() {
        this.d = dist(this.x, this.y, mouseX, mouseY);

        if (this.d < this.diameter / 2) {
            this.selected();
        }
    }

    clicked() {
        this.d = dist(this.x, this.y, mouseX, mouseY);

        if (this.d < this.diameter / 2) {
            return true;
        }
    }

    setPlayerColor() {
        if (playerOneTurn == true) {
            this.displayColor = color('#006295');
            this.player = 1;
        } else {
            this.displayColor = color('#bdcac0');
            this.player = 2;
        }
    }

}

class Particle {
    constructor(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;
        this.acceleration = createVector(0, 0.05);
        this.velocity = createVector(random(-2, 2), random(-3, 0));
        this.alpha = 255;
        this.particleColor = sparklerColorList[int(random(0, sparklerColorList.length))];
    }

    finished() {
        return this.alpha < 0;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 5;
    }

    display() {
        noStroke();
        push();
        fill(red(this.particleColor),green(this.particleColor),blue(this.particleColor), this.alpha);
        ellipse(this.x, this.y, 4);
        translate(this.x, this.y);
        pop();
    }
}
