const btns = document.querySelectorAll("[data-num]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equals]");
const delBtn = document.querySelector("[data-delete]");
const allClear = document.querySelector("[data-clear]");
const previousCal = document.querySelector("[data-prev]");
const currentCal = document.querySelector("[data-curr]");

class Calculator {
  constructor(previousCal, currentCal) {
    this.previousCal = previousCal;
    this.currentCal = currentCal;
  }

  clear() {
    this.currentNum = "";
    this.previousNum = "";
    this.operation = undefined;
  }

  delete() {
    this.currentNum = this.currentNum.toString().slice(0, -1);
  }

  appendNum(num) {
    if (num === "." && this.currentNum.includes(".")) return;
    this.currentNum = (this.currentNum ?? "") + num;
  }

  chooseOperation(operation) {
    if (this.currentNum === "") return;

    if (this.previousNum !== "") {
      this.equalatedCal();
    }

    this.operation = operation;
    this.previousNum = this.currentNum;
    this.currentNum = "";
  }

  equalatedCal() {
    let computation;
    const prev = parseFloat(this.previousNum);
    const current = parseFloat(this.currentNum);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;

      case "-":
        computation = prev - current;
        break;

      case "/":
        computation = prev / current;
        break;

      case "*":
        computation = prev * current;
        break;

      case "%":
        computation = prev % current;
        break;

      default:
        return;
    }
    this.currentNum = computation;
    this.previousNum = "";
    this.operation = undefined;
  }

  getDisplayNum(num) {
    const strNumber = num.toString();
    const intDigits = parseFloat(strNumber.split(".")[0]);
    const decDigits = strNumber.split(".")[1];
    let intDisplay;

    if (isNaN(intDigits)) {
      intDisplay = "";
    } else {
      intDisplay = intDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decDigits != null) {
      return `${intDisplay}.${decDigits}`;
    } else {
      return intDisplay;
    }
  }

  updatedResult() {
    this.currentCal.textContent = this.getDisplayNum(this.currentNum);

    if (this.operation != null) {
      this.previousCal.textContent = `${this.getDisplayNum(this.previousNum)} ${
        this.operation
      }`;
    } else {
      this.previousCal.textContent = "";
    }
  }
}

const calculator = new Calculator(previousCal, currentCal);

allClear.addEventListener("click", () => {
  calculator.clear();
  calculator.updatedResult();
});

delBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updatedResult();
});

btns.forEach((val) => {
  val.addEventListener("click", () => {
    calculator.appendNum(val.textContent);
    calculator.updatedResult();
  });
});

operationBtns.forEach((val) => {
  val.addEventListener("click", () => {
    calculator.chooseOperation(val.textContent);
    calculator.updatedResult();
  });
});

equalBtn.addEventListener("click", () => {
  calculator.equalatedCal();
  calculator.updatedResult();
});
