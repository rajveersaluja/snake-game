//game constants
let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("music/food.mp3");
let gameOverSound = new Audio("music/gameover.mp3");
let moveSound = new Audio("music/move.mp3");
let musicSound = new Audio("music/music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = {
  x: 10,
  y: 5,
};

//game Function
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  } else {
    lastPaintTime = ctime;
    gameEngine();
  }
}
function isCollide(snake) {
  //if you bump into yourself
  for (i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
    //i9f you bump into wall
    if (
      snake[0].x >= 18 ||
      snake[0].x <= 0 ||
      snake[0].y >= 18 ||
      snake[0].y <= 0
    ) {
      return true;
    }
  }
}

function gameEngine() {
  // Part 1 : updating Snake Array and food

  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("game over");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
  }

  // if you jave eaten the food , increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    score += 1
    scoreBox.innerHTML = 'Score : '+score
    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 15;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //moving the snake
  for (i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: display the snake and food
  //display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  moveSound.play();
  musicSound.play();
  inputDir = { x: 0, y: 1 }; //start the gaem
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
