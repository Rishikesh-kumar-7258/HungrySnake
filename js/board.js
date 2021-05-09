// variables
let direction = {x : 0, y : 0};
let speed = 10;
let lastPaintTime = 0;
let score = 0;
let highScore = localStorage.getItem('hiscore');

if (highScore === null)
{
    localStorage.setItem('hiscore', 0);
    highScore = localStorage.getItem('hiscore');
}

let snakeArr = [
    {x : 5, y : 10}
]

let Food = { x : 9, y : 15};

highScoreBoard.innerHTML = `HighScore : ${highScore}`;

// main function
function main(ctime)
{
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1/speed)
    {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {


    switch(e.key){
        case 'ArrowUp':
            if (direction.y === 0)
            {
                direction.x = 0;
                direction.y = -1;
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0)
            {
                direction.x = 0;
                direction.y = 1;
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0)
            {
                direction.x = -1;
                direction.y = 0;
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0)
            {
                direction.x = 1;
                direction.y = 0;
            }
            break;
        default :
            break;
    }
})

function isCollision(snakeArr)
{
    let first = snakeArr[0];
    if (first.x <= 0 || first.x > 20 || first.y <= 0 || first.y > 20)
    {
        return true;
    }

    for (let i = 1; i < snakeArr.length; i++)
    {
        if (first.x === snakeArr[i].x && first.y === snakeArr[i].y) return true;
    }

    return false;
}

function gameEngine()
{

    // If collision occurs
    if (isCollision(snakeArr))
    {
        direction = {x : 0, y : 0};
        score = 0;
        localStorage.setItem('hiscore', highScore);
        alert("Game Over! press any key to continue");
        scoreBoard.innerHTML = `Score : ${score}`;
        snakeArr = [
            {x : 5, y : 10}
        ]
        gameEngine();
    }

    // when Snake eates the food
    if (snakeArr[0].x == Food.x && snakeArr[0].y == Food.y)
    {
        snakeArr.unshift({x : snakeArr[0].x + direction.x , y : snakeArr[0].y + direction.y});
        score += speed/2;
        highScore = Math.max(score, highScore);
        scoreBoard.innerHTML = `Score : ${score}`;
        highScoreBoard.innerHTML = `HighScore : ${highScore}`;
        let a = 2;
        let b = 18;

        do {
            Food = {x : Math.round(a + (b-a)*Math.random()), y : Math.round(a + (b-a)*Math.random())};  
        } while (isOccupied(Food));

    }

    //Displaying the snake
    gameBoard.innerHTML = "";
    snakeArr.forEach((e, i) => {
        let snakeElem = document.createElement('div');
        snakeElem.style.gridColumnStart = e.x;
        snakeElem.style.gridRowStart = e.y;
        if (i === 0) snakeElem.classList.add('head');
        else snakeElem.classList.add('body');
        gameBoard.appendChild(snakeElem);
    })

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--)
    {
        snakeArr[i+1] = {...snakeArr[i]};
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
function isOccupied(Food)
{
    snakeArr.forEach(e => {
        if (e.x === Food.x && e.y === Food.y) return 1;
    })

    return 0;
}