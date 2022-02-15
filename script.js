const numKeys = document.querySelectorAll('[data-action="numKey"]');
const operatorKeys = document.querySelectorAll('[data-action="operatorKey"]');
const display = document.querySelector("#display");
const expressionElement = document.querySelector(".expression");

display.textContent = 0;
let expression = "";
let currentOperand = "";
let isCalculated = false;

numKeys.forEach((key) => {
  key.addEventListener("click", (event) => {
    playClickSound();
    console.log("pressed", event.target.innerText);
    if (display.textContent.length < 15) {
      if (display.textContent === "0" || isCalculated) {
        isCalculated = false;
        display.textContent = event.target.innerText;
        expression = event.target.innerText;
        currentOperand = event.target.innerText;
      } else {
        display.textContent += event.target.innerText;
        expression += event.target.innerText;
        currentOperand += event.target.innerText;
      }
    }
  });
});

operatorKeys.forEach((key) => {
  key.addEventListener("click", (event) => {
    playClickSound();
    if (!display.textContent.length < 15) {
      isCalculated = false;
      console.log("pressed", event.target.innerText);
      const operator = event.target.innerText;
      console.log(expression);

      if (isLastKeyOperator()) {
        display.textContent = display.textContent.slice(0, -1);
        expression = expression.slice(0, -1);
      }
      console.log(expression);
      if (expression.length === 0) {
        expression = currentOperand = 0;
      }
      handleOperations(operator);
    }
  });
});

expressionElement.addEventListener("focus", (event) => {
  expressionElement.setAttribute("aria-label", "The answer is " + display.textContent);
});

const handleOperations = (operator) => {
  switch (operator) {
    case "+":
      display.textContent += "+";
      expression += "+";
      currentOperand = "";
      break;
    case "-":
      display.textContent += "-";
      expression += "-";
      currentOperand = "";
      break;
    case "×":
      display.textContent += "×";
      expression += "*";
      currentOperand = "";
      break;
    case "÷":
      display.textContent += "÷";
      expression += "/";
      currentOperand = "";
      break;
    case "AC":
      display.textContent = 0;
      expression = "";
      currentOperand = "";
      break;
    case "DEL":
      display.textContent = display.textContent.slice(0, -1);
      expression = expression.slice(0, -1);
      currentOperand = currentOperand.slice(0, -1);

      if (display.textContent === "") {
        display.textContent = 0;
      }
      break;
    case "=":
      expression = expression.replace(/\s/g, "");
      if (isLastKeyOperator()) {
        display.textContent = display.textContent.slice(0, -1);
        expression = expression.slice(0, -1);
      }
      display.textContent = eval(expression);
      isCalculated = true;
      expression = "";
      expressionElement.focus()
      break;
    case ".":
      if (!currentOperand.includes(".")) {
        display.textContent += ".";
        expression += ".";
        currentOperand += ".";
      }
      break;
    case "(-)":
      break;
    default:
      console.log("Invalid Key");
  }
};

isLastKeyOperator = () => {
  expression = expression.replace(/\s/g, "");
  if (["+", "-", "*", "/"].includes(expression.charAt(expression.length - 1))) {
    return true;
  }
  return false;
};

playClickSound = () => {
  audio = new Audio(
    "http://freesoundeffect.net/sites/default/files/keypaddoorlock-237-sound-effect-2163697.mp3"
  );
  audio.play();
};
