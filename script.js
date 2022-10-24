//constants to keep track of what current button press means
const INPUT_EMPTY = "";

let firstNumberInput = INPUT_EMPTY;
let operatorInput = INPUT_EMPTY;
let secondNumberInput = INPUT_EMPTY;

//event listener wrapper to wait for DOM elemnts to load before continuing
document.addEventListener("DOMContentLoaded", (e) => {
  //get the number buttons
  let numberButtons = document.getElementsByClassName("number");

  //get the operator buttons
  let operatorButtons = document.getElementsByClassName("operator");

  //get the equal button
  let equalButton = document.getElementsByClassName("equal-btn");

  //get the clear button
  let clearButton = document.getElementsByClassName("clear-btn");

  //get the delete button
  let deleteButton = document.getElementsByClassName("del-btn");

  //get the results panel displays
  let previousOperationPanel =
    document.getElementsByClassName("previous-operation");
  let currentOperationPanel =
    document.getElementsByClassName("current-operation");

  //set up event listeners on number buttons
  for (let i = 0; i < numberButtons.length; i++) {
    //set up event listeners on each number button
    numberButtons[i].addEventListener("click", () => {
      numberButtonClickHandler(numberButtons[i]);
    });
  }

  //set up event listeners on operator buttons
  for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", () => {
      operatorButtonClickHandler(operatorButtons[i]);
    });
  }

  /*
   function to handle clicks for numberButtons
   parameters: button
   button-the button being clicked
  */
  let numberButtonClickHandler = (button) => {
    //get the number associated with that button
    let buttonNumberText = button.innerText;

    //check if firstNumberInput is empty
    if (firstNumberInput === INPUT_EMPTY) {
      //if empty, then set firstNumberInput to buttonNumber
      firstNumberInput = buttonNumberText;
      //update current operation panel
      currentOperationPanel[0].innerText = firstNumberInput;
    } else {
      //if firstNumberInput is not empty
      //then check if operatorInput is empty
      if (operatorInput === INPUT_EMPTY) {
        //if operatorInput is empty
        //then append number to the end of firstNumberInput
        firstNumberInput = firstNumberInput.concat(buttonNumberText);
        //update current operation panel
        currentOperationPanel[0].innerText = firstNumberInput;
      } else {
        //if operator has already been choosen
        //then append to second number
        secondNumberInput = secondNumberInput.concat(buttonNumberText);
        //update current operation panel
        currentOperationPanel[0].innerText = firstNumberInput
          .concat(" ")
          .concat(operatorInput)
          .concat(" ")
          .concat(secondNumberInput);
      }
    }
  };

  /*
  function to handle clicks for operator buttons
  parameters: button
  button-the button being clicked
  */
  let operatorButtonClickHandler = (button) => {
    //get the operator of the button being clicked
    let buttonOperatorText = button.innerText;

    //check if this is the first operation
    if (
      firstNumberInput !== INPUT_EMPTY &&
      operatorInput === INPUT_EMPTY &&
      secondNumberInput === INPUT_EMPTY
    ) {
      //if first operation
      //set the operatorInput to the chosen operator
      operatorInput = buttonOperatorText;
      //update the display
      currentOperationPanel[0].innerText = firstNumberInput
        .concat(" ")
        .concat(operatorInput);
    } else if (
      firstNumberInput !== INPUT_EMPTY &&
      operatorInput !== INPUT_EMPTY &&
      secondNumberInput === INPUT_EMPTY
    ) {
      //if user presses multiple operations sequentially
      operatorInput = buttonOperatorText;
      //update the display
      currentOperationPanel[0].innerText = firstNumberInput
        .concat(" ")
        .concat(operatorInput);
    }
  };

  /*
  function to perform math operation
  parameters: firstNum, secondNum, operation
  firstNum-the first operand
  secondNum-the second operand
  operation-the operation to be performed
  */
  let performOperation = (firstNum, secondNum, operation) => {
    if (operation === "+") {
      return firstNum + secondNum;
    } else if (operation === "-") {
      return firstNum - secondNum;
    } else if (operation === "*") {
      return firstNum * secondNum;
    } else if (operation === "÷") {
      return firstNum / secondNum;
    } else {
      console.log("Error in performOperation: Unrecognized Operator");
    }
  };
});
