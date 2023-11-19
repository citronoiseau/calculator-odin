let firstNum = 5;
let secondNum = 10;
let operator = "*";

function Calculator() {
  this.methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };
  this.operate = function (a, b, op) {
    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }
    return this.methods[op](a, b);
  };
}
let calculator = new Calculator();
console.log(calculator.operate(firstNum, secondNum, operator));
