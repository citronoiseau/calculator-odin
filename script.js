let firstNum = ``;
let secondNum = ``;
let operator = null;
const numberBtns = document.querySelectorAll(`.number`);
const operatorBtns = document.querySelectorAll(`.operator`);
const currentOperation = document.querySelector(`.currentOperation`);
const cursorElement = document.querySelector(".cursor");
const previousOperation = document.querySelector(`.previousOperation`);
previousOperation.textContent = ``;
const equalsBtn = document.querySelector(`.equalsBtn`);
const clearBtn = document.querySelector(`.clearBtn`);
const eraseBtn = document.querySelector(`.eraseBtn`);

function getNumber(number) {
  if (cursorElement) {
    cursorElement.remove();
  }
  if (number === "." && currentOperation.textContent.includes(`.`)) {
    return;
  }
  currentOperation.textContent += number;
}

numberBtns.forEach((button) =>
  button.addEventListener(`click`, (event) =>
    getNumber(event.target.textContent)
  )
);

function getOperator(op) {
  if (operator != null) getExpression();
  firstNum = parseFloat(currentOperation.textContent);
  if (op === "-" && isNaN(firstNum)) {
    currentOperation.textContent = `${op}`;
  }
  if (isNaN(firstNum)) {
    return;
  }
  operator = op;
  currentOperation.textContent = ``;
  previousOperation.textContent = `${firstNum} ${operator}`;
  currentOperation.appendChild(cursorElement);
}

operatorBtns.forEach((button) =>
  button.addEventListener(`click`, (event) =>
    getOperator(event.target.textContent)
  )
);

function getExpression() {
  secondNum = parseFloat(currentOperation.textContent);
  if (isNaN(secondNum)) {
    return;
  }
  let result = roundNumber(calculator.operate(firstNum, secondNum, operator));
  currentOperation.textContent = result;
  previousOperation.textContent = ``;
  firstNum = result;
  operator = null;
}
equalsBtn.addEventListener(`click`, getExpression);

function erase() {
  const lastOperator = previousOperation.textContent.slice(-1);
  if (!currentOperation.contains(cursorElement)) {
    currentOperation.textContent = currentOperation.textContent.slice(0, -1);
  }
  if (
    currentOperation.contains(cursorElement) &&
    ["+", "-", "×", "÷", "^", "%"].includes(lastOperator)
  ) {
    operator = null;
    previousOperation.textContent = previousOperation.textContent.slice(0, -1);
    currentOperation.textContent = previousOperation.textContent;
    previousOperation.textContent = ``;
  }
  if (currentOperation.textContent === ``) {
    currentOperation.appendChild(cursorElement);
  }
}
eraseBtn.addEventListener(`click`, erase);

function clearScreen() {
  firstNum = ``;
  secondNum = ``;
  operator = null;
  currentOperation.textContent = ``;
  currentOperation.appendChild(cursorElement);
  previousOperation.textContent = ``;
}
clearBtn.addEventListener(`click`, clearScreen);

function roundNumber(number) {
  return Math.round(number * 10) / 10;
}
function keybordControls(event) {
  const input = event.key;
  if (!isNaN(input) || input === ".") {
    getNumber(input);
  }
  let operator = isOperator(input);
  if (operator) {
    getOperator(operator);
  }
  if (input === "=" || input === "Enter") {
    getExpression();
  }
  if (input === "Backspace") {
    erase();
  }
  if (input === "Delete") {
    clearScreen();
  }
}
function isOperator(input) {
  if (input === "/") {
    input = "÷";
  }
  if (input === "*") {
    input = "×";
  }
  if (["+", "-", "×", "÷", "^", "%"].includes(input)) {
    return input;
  }
}
document.addEventListener(`keydown`, keybordControls);

function Calculator() {
  this.methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b,
    "×": (a, b) => a * b,
    "÷": (a, b) => a / b,
    "^": (a, b) => Math.pow(a, b),
    "%": (a, b) => (a / 100) * b,
  };
  this.operate = function (a, b, op) {
    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }
    return this.methods[op](a, b);
  };
}
let calculator = new Calculator();
