const tasks = [
    {
        "title": "Complex Shape With Texture",
        "subtitle": "<span class=\"base-tag webgl2-tag\">WebGL2<\/span> <span class=\"base-tag glsl-tag\">GLSL<\/span> <span class=\"base-tag html5-tag\">HTML5<\/span> <span class=\"base-tag javascript-tag\">JavaScript",
        "description": "A complex object made with WebGL2 with texture, modified-phong shading, and user input movement.",
        "Demo": "https://ajetty.github.io/WebGL2_3DTexture/3DTexture/3DTexture.html",
        "Github": "https://github.com/ajetty/WebGL2_3DTexture",
        "image": "images/out.gif",
        "header": "h4",
        "subheader": "h6",
        "resize": 0
    },
    {
        "title": "Connect Four",
        "subtitle": "<span class=\"base-tag javascript-tag\">Javascript<\/span> <span class=\"base-tag otherlibrary-tag\">P5.js<\/span>",
        "description": "A two player game that uses bit boards for computing movement.",
        "Demo": "https://ajetty.github.io/Connect-Four-JavaScript/index.html",
        "Github": "https://github.com/ajetty/Connect-Four-JavaScript",
        "image": "images/ConnectFourJavascript.gif",
        "header": "h4",
        "subheader": "h6",
        "resize": 0
    },
    {
        "title": "Elon's Martian Musketeers",
        "subtitle": "<span class=\"base-tag unity-tag\">Unity<\/span> <span class=\"base-tag csharp-tag\">C#<\/span>",
        "description": "A tactical RPG using a turn based system, path finding, and AI for gameplay.",
        "Demo": "https://ajetty.github.io/EMM_WebGL_Build/index.html",
        "Github": "https://github.com/ajetty/Elons_Martian_Musketeers/tree/Ashley",
        "image": "images/EMM.gif",
        "header": "h4",
        "subheader": "h6",
        "resize": 0
    },
    {
        "title": "Weather Buddy",
        "subtitle": "<span class=\"base-tag kotlin-tag\">Kotlin<\/span> <span class=\"base-tag android-tag\">Android Studio<\/span> <span class=\"base-tag otherlibrary-tag\">OpenWeather API<\/span>",
        "description": "A weather app that has a virtual bear whose visual status represents different weather conditions.",
        "Demo": "none",
        "Github": "https://github.com/ajetty/weather-buddy",
        "image": "images/BearAnimate.gif",
        "header": "h4",
        "subheader": "h6",
        "resize": 150
    },
    {
        "title": "WebGL2 Fur Shader",
        "subtitle": "<span class=\"base-tag webgl2-tag\">WebGL2<\/span> <span class=\"base-tag glsl-tag\">GLSL<\/span> <span class=\"base-tag html5-tag\">HTML5<\/span> <span class=\"base-tag javascript-tag\">JavaScript<\/span>",
        "description": "A rendered sphere with fur. The creation of a fur shader using alpha blending and shell layers with hair movement.",
        "Demo": "https://ajetty.github.io/webgl-fur-sprite/Project/index.html",
        "Github": "https://github.com/ajetty/webgl-fur-sprite",
        "image": "images/webgl2_fur.gif",
        "header": "h4",
        "subheader": "h6",
        "resize": 0

    },
    {
        "title": "Fruit Salad",
        "subtitle": "<span class=\"base-tag cpp-tag\">C++<\/span> <span class=\"base-tag unreal-tag\">Unreal Engine<\/span>",
        "description": "A demo game where a player drives a bulldozer into targeted buildings destroying them in an allotted time.",
        "Demo": "https://www.youtube.com/watch?v=sE0fJ1PAJq4",
        "Github": "https://github.com/ajetty/FruitSalad",
        "image": "images/DestroyBuilding.gif",
        "header": "h4",
        "subheader": "h6",
        "resize": 0

    },
    {
        "title": "Star Bridges",
        "subtitle": "<span class=\"base-tag cpp-tag\">C++<\/span> <span class=\"base-tag unreal-tag\">Unreal Engine<\/span>",
        "description": "A puzzle demo based on the game Hashi where a player connects bridges between nodes, according to their values, to form one interconnecting path.",
        "Demo": "https://www.youtube.com/watch?v=SqM581gZNWY",
        "Github": "https://github.com/ajetty/StarBridges",
        "image": "images/Island.gif",
        "header": "h4",
        "subheader": "h6",
        "resize": 0

    },
    {
        "blank": "I am a blank card."
    },
    {
        "blank": "I am a blank card."
    }
];

let cardContainer;
let carddeck;

let createCardDeck = () => {
    let cardrow = document.createElement('div');
    cardrow.className = 'row';

    carddeck = document.createElement('div');
    carddeck.className = 'card-deck mb-3';

    cardContainer = document.getElementById('card-container');
    cardContainer.appendChild(cardrow);

    cardrow.appendChild(carddeck);
}

let createTaskCard = (task) => {
    if (task.blank === undefined) {

        let card = document.createElement('div');
        card.className = 'card border-custom mb-4 box-shadow navbar-custom';

        let image = document.createElement('img');
        image.className = 'card-img-top mx-auto';
        image.src = task.image

        let cardheader = document.createElement('div');
        cardheader.className = 'card-header bg-light';
        cardheader.style = "text-align:center";

        let title = document.createElement(task.header);
        title.className = 'my-0 font-weight-normal';
        title.innerText = task.title;

        let subtitle = document.createElement(task.subheader);
        subtitle.innerHTML = task.subtitle;

        let cardbody = document.createElement('div');
        cardbody.className = 'card-body bg-white';

        let carddescription = document.createElement('p');
        carddescription.innerText = task.description;

        let cardbuttondemo = document.createElement('button');
        cardbuttondemo.type = 'button';
        cardbuttondemo.className = 'btn btn-lg btn-block btn-outline-primary';
        cardbuttondemo.onclick = function () {
            window.location.href = task.Demo
        };
        cardbuttondemo.innerText = 'Demo';

        let cardbuttongithub = document.createElement('button');
        cardbuttongithub.type = 'button';
        cardbuttongithub.className = 'btn btn-lg btn-block btn-outline-primary';
        cardbuttongithub.onclick = function () {
            window.location.href = task.Github
        }
        cardbuttongithub.innerText = 'Github Repository';

        carddeck.appendChild(card);

        card.appendChild(image);

        card.appendChild(cardheader);
        cardheader.appendChild(title);
        cardheader.appendChild(subtitle);

        card.appendChild(cardbody);
        cardbody.appendChild(carddescription);

        //not all tasks have demos
        if(task.Demo !== 'none') {
            cardbody.appendChild(cardbuttondemo);
        }

        cardbody.appendChild(cardbuttongithub);

        //if an image needs to be resized then it is done here
        if(task.resize) {
            image.style = `width:${task.resize}px;`
        }

    } else {
        let card = document.createElement('div');
        card.className = 'card mb-4';
        card.style = 'background-color: rgba(0,0,0,0); border: none;';

        let cardheader = document.createElement('div');

        let pre = document.createElement('pre');
        pre.innerText = '                                   ';

        carddeck.appendChild(card);

        card.appendChild(cardheader);
        cardheader.appendChild(pre);
    }

}

let initListOfTasks = () => {
    if (cardContainer) {
        document.getElementById('card-container').replaceWith(cardContainer);
        return;
    }

    createCardDeck();

    let card_counter = 1;

    tasks.forEach((task) => {
        createTaskCard(task);
        card_counter++;

        if (card_counter % 4 === 0) {
            createCardDeck();
            card_counter = 1;
        }
    });

};

initListOfTasks();