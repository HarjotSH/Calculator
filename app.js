const calculator = document.querySelector(".calcultor");
const keys = document.querySelector(".calculator_keys");
const display = document.querySelector(".calculator_display");

//event listener for keys
keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const keyVal = key.textContent;
    const action = key.dataset.action;

    console.log("clicked key:", keyVal);

    if (!action) {
      console.log("number key");
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      console.log("operator key");
    }

    if (action === "decimal") {
      console.log("decimal key");
    }

    if (action === "clear") {
      console.log("clear key");
    }

    if (action === "calculate") {
      console.log("equal key!");
    }
  }
});

//Handling Number keys
let lastdepressedButton = null;
let previousKeyType = null;
let FirstOperand = null;

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    if (!action) {
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      previousKeyType = "number";
    }

    //Handling decimal key
    if (action === "decimal") {
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = "0.";
      } else {
        previousKeyType = "decimal";
      }
    }

    //Handling decimal key
    if (action === "clear") {
      display.textContent = "0";
      if (lastdepressedButton) {
        lastdepressedButton.classList.remove("is-depressed");
      }
      lastdepressedButton = null;
      previousKeyType = "clear";
      FirstOperand = null;
    }

    //Calculating resul
    if (action === "calculate") {
      const secondOperand = parseFloat(display.textContent);
      let result;
      switch (operator) {
        case "add":
          result = FirstOperand + secondOperand;
          break;
        case "subtract":
          result = FirstOperand - secondOperand;
          break;
        case "multiply":
          result = FirstOperand * secondOperand;
          break;
        case "divide":
          if (secondOperand === 0) {
            result = "Error";
          } else {
            result = FirstOperand / secondOperand;
          }
          break;
        default:
          result = "Invalid";
      }
      display.textContent = result;
      previousKeyType = "calculate";
      if (lastdepressedButton) {
        lastdepressedButton.classList.remove("is-depressed");
      }
      lastdepressedButton = null;
    }

    //Handling operator keys
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const currentOperator = key;
      if (lastdepressedButton) {
        lastdepressedButton.classList.remove("id-depressed");
      }
      key.classList.add("is-depressed");
      lastdepressedButton = key;

      FirstOperand = parseFloat(display.textContent);
      operator = action;
      previousKeyType = "operator";
    }
  }
});
