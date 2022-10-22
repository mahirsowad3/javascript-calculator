//constants to keep track of what current button press means
const INPUT_EMPTY = -1;

let firstNumberInput = INPUT_EMPTY;
let operatorInput = INPUT_EMPTY;
let secondNumberInput = INPUT_EMPTY;

//event listener wrapper to wait for DOM elemnts to load before continuing
document.addEventListener("DOMContentLoaded", (e) => {
  //get the number buttons
  let numberButtons = document.getElementsByClassName("number");

  //get the operator buttons
  let operatorButtons = document.getElementsByClassName("operator");
  console.log(operatorButtons);
  console.log(operatorButtons.length);
  for (let i = 0; i < operatorButtons.length; i++) {
    console.log(operatorButtons[i]);
  }

  //get the equal button
  let equalButton = document.getElementsByClassName("equal-btn");
  console.log(equalButton);
  console.log(equalButton.length);
  for (let i = 0; i < equalButton.length; i++) {
    console.log(equalButton[i]);
  }

  //get the clear button
  let clearButton = document.getElementsByClassName("clear-btn");
  console.log(clearButton);
  console.log(clearButton.length);
  for (let i = 0; i < clearButton.length; i++) {
    console.log(clearButton[i]);
  }

  //get the delete button
  let deleteButton = document.getElementsByClassName("del-btn");
  console.log(deleteButton);
  console.log(deleteButton.length);
  for (let i = 0; i < deleteButton.length; i++) {
    console.log(deleteButton[i]);
  }

  //get the results panel displays
  let previousOperationPanel =
    document.getElementsByClassName("previous-operation");
  let currentOperationPanel =
    document.getElementsByClassName("current-operation");

  for (let i = 0; i < numberButtons.length; i++) {
    //set up event listeners on each number button
    numberButtons[i].addEventListener("click", () => {
      numberButtonClickHandler(numberButtons[i]);
    });
  }

  /*
   function to handle clicks for numberButtons
  */
  let numberButtonClickHandler = (button) => {
    //get the number associated with that button
    let buttonNumber = button.innerText;

    //check if firstNumberInput is empty
    if (firstNumberInput === INPUT_EMPTY) {
      //if empty, then set firstNumberInput to buttonNumber
      firstNumberInput = buttonNumber;
      currentOperationPanel[0].innerText = firstNumberInput;
    } else if (firstNumberInput !== INPUT_EMPTY) {
      //if firstNumberInput is not empty
      //then check if operatorInput is empty
      if (operatorInput === INPUT_EMPTY) {
        //if operatorInput is empty
        //then append number to the end of firstNumberInput
        firstNumberInput = firstNumberInput.concat(buttonNumber);
        currentOperationPanel[0].innerText = firstNumberInput;
      }
    }
  };
});
