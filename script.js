let firstNum = 5;
let secondNum = 10;
let operator = "*";
let calculator = new Calculator();
function Calculator() {
  this.methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };
  this.calculate = function (firstNum, secondNum, operator) {
    a = firstNum;
    b = secondNum;
    op = operator;
    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }
    return this.methods[op](a, b);
  };
}
console.log(calculator.calculate(firstNum, secondNum, operator));
