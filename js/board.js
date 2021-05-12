// variables
let direction = { x: 0, y: 0 };
let speed = 10;
let lastPaintTime = 0;
let score = 0;
let highScore = localStorage.getItem('hiscore');

if (highScore === null) {
    localStorage.setItem('hiscore', 0);
    highScore = localStorage.getItem('hiscore');
}

let snakeArr = [
    { x: 5, y: 10 }
]

let Food = { x: 9, y: 15 };

let snhead;

let gameState = "start";

highScoreBoard.innerHTML = `HighScore : ${highScore}`;

// main function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {

    // console.log(e.key);


    if (gameState === 'over' || gameState === 'start') {
        if (e.key === ' ') {
            gameState = 'play';
            gameBoard.classList.remove('over');
            scoreBoard.innerHTML = `Score : ${score}`;
            snakeArr = [
                { x: 5, y: 10 }
            ]
            direction = {x : 0, y : 0};
            gameEngine();
        }
    }


    switch (e.key) {
        case 'ArrowUp':
            turn('up');
            break;
        case 'ArrowDown':
            turn('down')
            break;
        case 'ArrowLeft':
            turn('left')
            break;
        case 'ArrowRight':
            turn('right')
            break;
        default:
            break;
    }
})

function isCollision(snakeArr) {
    let first = snakeArr[0];
    if (first.x <= 0 || first.x > 20 || first.y <= 0 || first.y > 20) {
        return true;
    }

    for (let i = 1; i < snakeArr.length; i++) {
        if (first.x === snakeArr[i].x && first.y === snakeArr[i].y) return true;
    }

    return false;
}

function gameEngine() {

    if (gameState === 'over') {
        let mess = document.createElement('div');
        gameBoard.innerHTML = "";
        mess.innerHTML = '<h1>Game Over</h1><br><h3>Press space to play again </h3>';
        gameBoard.classList.add('over');
        gameBoard.appendChild(mess);
        return;
    }

    if (gameState === 'start') {
        let mess = document.createElement('div');
        gameBoard.innerHTML = "";
        mess.innerHTML = '<h2>Press space to play</h2>'
        gameBoard.classList.add('over');
        gameBoard.appendChild(mess);
        return;
    }

    // If collision occurs
    if (isCollision(snakeArr)) {
        direction = { x: 0, y: 0 };
        score = 0;
        localStorage.setItem('hiscore', highScore);
        gameState = 'over';

    }

    // when Snake eates the food
    if (snakeArr[0].x == Food.x && snakeArr[0].y == Food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y });
        score += speed / 2;
        highScore = Math.max(score, highScore);
        scoreBoard.innerHTML = `Score : ${score}`;
        highScoreBoard.innerHTML = `HighScore : ${highScore}`;
        let a = 2;
        let b = 18;

        do {
            Food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        } while (isOccupied(Food));

    }

    //Displaying the snake
    gameBoard.innerHTML = "";
    snakeArr.forEach((e, i) => {
        let snakeElem = document.createElement('div');
        snakeElem.style.gridColumnStart = e.x;
        snakeElem.style.gridRowStart = e.y;
        if (i === 0) {
            snakeElem.classList.add('head');
            if (!(snhead === null)) snakeElem.classList.add(snhead);
        }
        else snakeElem.classList.add('body');
        gameBoard.appendChild(snakeElem);
    })

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    // Displaying the food
    let food = document.createElement('div');
    food.style.gridColumnStart = Food.x;
    food.style.gridRowStart = Food.y;
    food.classList.add('food');
    gameBoard.appendChild(food);
}

// checking if the food spawn is not in the snake area
function isOccupied(Food) {
    snakeArr.forEach(e => {
        if (e.x === Food.x && e.y === Food.y) return 1;
    })

    return 0;
}

// Making controls for mobiles
tgbtn.addEventListener('click', () => {
    if (controls.style.display === "grid") {
        controls.style.display = "none";
    }
    else {
        controls.style.display = "grid";
    }

    if (res.style.display === 'block')
    {
        res.style.display = 'none';
    }
    else{
        res.style.display = 'block';
    }
})

// res.addEventListener('click', () => {
    
// })

let arrow = document.querySelectorAll('.arrow');

arrow.forEach((e, i) => {
    e.addEventListener('click', () => {
        // console.log(e.classList[1]);

        switch (e.classList[1]) {
            case 'ctup':
                turn('up')
                break;
            case 'ctdown':
                turn('down')
                break;
            case 'ctleft':
                turn('left');
                break;
            case 'ctright':
                turn('right');
                break;
        }
    })
})

// turning the snake
function turn(dir) {
    switch (dir) {
        case 'up':
            if (direction.y === 0) {
                direction.x = 0;
                direction.y = -1;
                snhead = 'hdup';
            }
            break;
        case 'down':
            if (direction.y === 0) {
                direction.x = 0;
                direction.y = 1;
                snhead = 'hddown';
            }
            break;
        case 'left':
            if (direction.x === 0) {
                direction.x = -1;
                direction.y = 0;
                snhead = 'hdleft';
            }
            break;
        case 'right':
            if (direction.x === 0) {
                direction.x = 1;
                direction.y = 0;
                snhead = 'hdright';
            }
            break;
        default:
            break;
    }
}

//Function for index page to change the settings