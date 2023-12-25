let field = document.createElement("div");
document.body.appendChild(field);
field.classList.add("field");

for (let i = 0; i < 225; i++) {
  let cell = document.createElement("div");
  field.appendChild(cell);
  cell.classList.add("cell");
  if (i % 2 === 0) {
    cell.classList.add("cell-1");
  }
}

const cells = document.getElementsByClassName("cell");
let x = 1;
y = 15;

for (let i = 0; i < cells.length; i++) {
  cells[i].setAttribute("positionX", x);
  cells[i].setAttribute("positionY", y);

  if (x === 15) {
    y--;
  }
  x < 15 ? x++ : (x = 1);
}

function createSnake() {
  let positionX = Math.round(Math.random() * (15 - 3) + 3);
  let positionY = Math.round(Math.random() * (15 - 1) + 1);
  return [positionX, positionY];
}

const coordinatesHead = createSnake();

const snake = [
  document.querySelector(
    `[positionX = "${coordinatesHead[0]}"][positionY = "${coordinatesHead[1]}"]`
  ),
  document.querySelector(
    `[positionX = "${coordinatesHead[0] - 1}"][positionY = "${
      coordinatesHead[1]
    }"]`
  ),
  document.querySelector(
    `[positionX = "${coordinatesHead[0] - 2}"][positionY = "${
      coordinatesHead[1]
    }"]`
  ),
];

for (let i = 0; i < snake.length; i++) {
  snake[i].classList.add("body");
}

snake[0].classList.add("head-right");

let apple;

function createCoordinatesApple() {
  let positionX = Math.round(Math.random() * (15 - 1) + 1);
  let positionY = Math.round(Math.random() * (15 - 1) + 1);
  return [positionX, positionY];
}

function createApple() {
  let coordinatesApple = createCoordinatesApple();
  apple = document.querySelector(
    `[positionX = "${coordinatesApple[0]}"][positionY = "${coordinatesApple[1]}"]`
  );

  while (apple.classList.contains("body")) {
    let coordinatesApple = createCoordinatesApple();
    apple = document.querySelector(
      `[positionX = "${coordinatesApple[0]}"][positionY = "${coordinatesApple[1]}"]`
    );
  }

  apple.classList.add("apple");
}

createApple();

let nextStep = true;
let direction = "right";
let score = 0;
let speed = 350;
const inputScore = document.createElement("input");
document.body.appendChild(inputScore);
inputScore.classList.add("score");

function move() {
  inputScore.value = `SCORE: ${score}`;

  let headPositionX = +snake[0].getAttribute("positionX");
  let headPositionY = +snake[0].getAttribute("positionY");

  switch (direction) {
    case "right":
      headPositionX == 15 ? (headPositionX = 1) : (headPositionX += 1);
      break;

    case "left":
      headPositionX == 1 ? (headPositionX = 15) : (headPositionX -= 1);
      break;

    case "up":
      headPositionY == 15 ? (headPositionY = 1) : (headPositionY += 1);
      break;

    case "down":
      headPositionY == 1 ? (headPositionY = 15) : (headPositionY -= 1);
      break;
  }

  snake[snake.length - 1].classList.remove("body");
  snake[0].classList.remove("head-up", "head-down", "head-right", "head-left");
  snake[0].classList.add("body");
  snake.pop();
  snake.unshift(
    document.querySelector(
      `[positionX = "${headPositionX}"][positionY = "${headPositionY}"]`
    )
  );

  if (direction == "right") {
    snake[0].classList.add("head-right");
  }
  if (direction == "left") {
    snake[0].classList.add("head-left");
  }
  if (direction == "up") {
    snake[0].classList.add("head-up");
  }
  if (direction == "down") {
    snake[0].classList.add("head-down");
  }

  if (snake[0].classList.contains("body")) {
    snake[0].classList.add("collision");
    setTimeout(() => {
      alert(`GAME OVER \n SCORE ${score}`);
    }, speed - 5);
    //clearInterval(steps, speed)
    clearTimeout(steps, speed);
  }

  if (
    snake[0].getAttribute("positionX") == apple.getAttribute("positionX") &&
    snake[0].getAttribute("positionY") == apple.getAttribute("positionY")
  ) {
    apple.classList.remove("apple");
    let taiiPositionX = snake[snake.length - 1].getAttribute("positionX");
    let taiiPositionY = snake[snake.length - 1].getAttribute("positionY");
    snake.push(
      document.querySelector(
        `[positionX = "${taiiPositionX}"][positionY = "${taiiPositionY}"]`
      )
    );

    createApple();
    score++;
    speed -= 5;
  }
  nextStep = true;
}

// let steps = setInterval(move, speed)
setTimeout(function steps() {
  move();
  setTimeout(steps, speed);
}, speed);

window.addEventListener("keydown", function (e) {
  if (nextStep) {
    if (e.key == "ArrowLeft" && direction != "right") {
      direction = "left";
    } else if (e.key == "ArrowRight" && direction != "left") {
      direction = "right";
    } else if (e.key == "ArrowUp" && direction != "down") {
      direction = "up";
    } else if (e.key == "ArrowDown" && direction != "up") {
      direction = "down";
    }
    nextStep = false;
  }
});
