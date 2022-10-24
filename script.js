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

  //set up event sisteners on number buttons
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
