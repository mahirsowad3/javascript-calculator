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
  let allClearButton = document.getElementsByClassName("clear-btn");

  //get the delete button
  let deleteButton = document.getElementsByClassName("del-btn");

  //get the decimal button
  let decimalButton = document.getElementsByClassName("decimal-point");

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

  //set up event listener on the equal button
  for (let i = 0; i < equalButton.length; i++) {
    equalButton[i].addEventListener("click", () => {
      equalButtonClickHandler(equalButton[i]);
    });
  }

  //set up event listener on the delete button
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", () => {
      deleteButtonClickHandler(deleteButton[i]);
    });
  }

  //set up event listener on the all clear button
  for (let i = 0; i < allClearButton.length; i++) {
    allClearButton[i].addEventListener("click", () => {
      allClearButtonClickHandler(allClearButton[i]);
    });
  }

  //set up event listener on the decimal point button
  for (let i = 0; i < decimalButton.length; i++) {
    decimalButton[i].addEventListener("click", (button) => {
      decimalButtonClickhandler(button);
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

        //checking to prevent one or multiple leading 0s
        if (firstNumberInput === "0" && buttonNumberText === "0") {
          //if firstNumberInput is already 0 and user trying to more 0s
          //do nothing
        } else if (firstNumberInput === "0" && buttonNumberText !== "0") {
          //if user trying to enter non-zero digit after pressing zero
          //then remove the zero leading digit
          firstNumberInput = buttonNumberText;
        } else {
          //if firstNumberInput does not have leading 0s
          firstNumberInput = firstNumberInput.concat(buttonNumberText);
        }

        //update current operation panel
        currentOperationPanel[0].innerText = firstNumberInput;
      } else {
        //if operator has already been choosen
        //then append digit to second number

        //checking to prevent one or multiple leading 0s
        if (secondNumberInput === "0" && buttonNumberText === "0") {
          //if firstNumberInput is already 0 and user trying to more 0s
          //do nothing
        } else if (secondNumberInput === "0" && buttonNumberText !== "0") {
          //if user trying to enter non-zero digit after pressing zero
          //then remove the zero leading digit
          secondNumberInput = buttonNumberText;
        } else {
          //if firstNumberInput does not have leading 0s
          secondNumberInput = secondNumberInput.concat(buttonNumberText);
        }

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

    //check if the firstNumberInput has been entered
    if (firstNumberInput === INPUT_EMPTY) {
      //if firstNumberInput is empty
      //then set firstNumberInput to 0
      firstNumberInput = "0";
    }

    //operator logic begins here:
    //
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
      //replace the current operator with the new operator
      operatorInput = buttonOperatorText;
      //update the display
      currentOperationPanel[0].innerText = firstNumberInput
        .concat(" ")
        .concat(operatorInput);
    } else if (
      firstNumberInput !== INPUT_EMPTY &&
      operatorInput !== INPUT_EMPTY &&
      secondNumberInput !== INPUT_EMPTY
    ) {
      //if the user wants to chain operations together
      //find the result of the current operation
      let currentResult = performOperation(
        Number(firstNumberInput),
        Number(secondNumberInput),
        operatorInput
      );
      //update previous operation panel
      previousOperationPanel[0].innerText = currentOperationPanel[0].innerText
        .concat(" ")
        .concat("=");
      //set the firstNumberInput to the result of current operation
      firstNumberInput = currentResult.toString();
      //set the operatorInput to the new operator
      operatorInput = buttonOperatorText;
      //reset the secondNumberInput
      secondNumberInput = INPUT_EMPTY;
      //update the current operation panel
      currentOperationPanel[0].innerText = currentResult
        .toString()
        .concat(" ")
        .concat(operatorInput);
    }
  };

  /*
  function to handle clicks for the equal button
  parameters: button
  button-the button being pressed
  */
  let equalButtonClickHandler = (button) => {
    //if user has entered no number
    if (firstNumberInput === INPUT_EMPTY && secondNumberInput === INPUT_EMPTY) {
      //set the firstNumberInput to 0
      firstNumberInput = "0";
      //update the previous operation panel
      previousOperationPanel[0].innerText = firstNumberInput
        .concat(" ")
        .concat("=");
      //update the current operation panel
      currentOperationPanel[0].innerText = firstNumberInput;
    } else if (
      firstNumberInput !== INPUT_EMPTY &&
      operatorInput !== INPUT_EMPTY &&
      secondNumberInput !== INPUT_EMPTY
    ) {
      //calculate the result of the operation
      let currentResult = performOperation(
        Number(firstNumberInput),
        Number(secondNumberInput),
        operatorInput
      );
      //update the previous operation panel
      previousOperationPanel[0].innerText = currentOperationPanel[0].innerText
        .concat(" ")
        .concat("=");
      //set the firstNumberInput as the result of the current operation
      firstNumberInput = currentResult.toString();
      //reset the operatorInput
      operatorInput = INPUT_EMPTY;
      //reset the secondNumberInput
      secondNumberInput = INPUT_EMPTY;
      //update the current operation panel
      currentOperationPanel[0].innerText = currentResult.toString();
    }
  };

  /*
  function to handle clicks for the all clear button
  parameters: button
  button-the button being pressed
  */
  let allClearButtonClickHandler = (button) => {
    //reset the firstNumberInput
    firstNumberInput = INPUT_EMPTY;
    //reset the operatorInput
    operatorInput = INPUT_EMPTY;
    //reset the secondNumberInput
    secondNumberInput = INPUT_EMPTY;
    //reset the previous operation panel
    previousOperationPanel[0].innerText = "";
    //reset the current operation panel
    currentOperationPanel[0].innerText = "0";
  };

  /*
  function to handle clicks for the delete button
  parameters: button
  button-the button being pressed
  */
  let deleteButtonClickHandler = (button) => {
    //find out where to delete from
    if (
      firstNumberInput !== INPUT_EMPTY &&
      operatorInput !== INPUT_EMPTY &&
      secondNumberInput !== INPUT_EMPTY
    ) {
      //if all the inputs are non-empty
      //delete the last digit from secondNumberInput
      secondNumberInput = secondNumberInput.substring(
        0,
        secondNumberInput.length - 1
      );
      //update the current operation panel
      currentOperationPanel[0].innerText = firstNumberInput
        .concat(" ")
        .concat(operatorInput)
        .concat(" ")
        .concat(secondNumberInput);
    } else if (
      firstNumberInput !== INPUT_EMPTY &&
      operatorInput !== INPUT_EMPTY &&
      secondNumberInput === INPUT_EMPTY
    ) {
      //if the secondNumberInput is empty
      //then delete the operatorInput
      operatorInput = INPUT_EMPTY;
      //update the current operation panel
      currentOperationPanel[0].innerText = firstNumberInput;
    } else if (
      firstNumberInput !== INPUT_EMPTY &&
      operatorInput === INPUT_EMPTY &&
      secondNumberInput === INPUT_EMPTY
    ) {
      //if only the first number is non-empty
      //delete the last digit from the first number
      firstNumberInput = firstNumberInput.substring(
        0,
        firstNumberInput.length - 1
      );
      //clear the previous operation panel
      previousOperationPanel[0].innerText = "";
      //update the current operation panel
      if (firstNumberInput === INPUT_EMPTY) {
        //if firstNumberInput is empty
        //then set the current operation panel to 0
        currentOperationPanel[0].innerText = "0";
      } else {
        //if firstNumberInput is non-empty
        //then update the current operation panel normally
        currentOperationPanel[0].innerText = firstNumberInput;
      }
    }
  };

  /*
  function to handle clicks for the decimal point button
  parameters: button
  button-the button being pressed
  */
  let decimalButtonClickhandler = (button) => {
    //figure out where to add the decimal point
    if (operatorInput === INPUT_EMPTY) {
      //if operatorInput is empty
      //check if decimal is already present in firstNumberInput
      if (firstNumberInput.includes(".")) {
        //if firstNumberInput already has a decimal point
        //do nothing
      } else {
        //if firstNumberInput does not have a decimal point
        //add it
        firstNumberInput = firstNumberInput.concat(".");
        //update current operation panel
        currentOperationPanel[0].innerText = firstNumberInput;
      }
    } else {
      //if operatorInput is non-empty
      //check if decimal is already present in secondNumberInput
      if (secondNumberInput.includes(".")) {
        //if secondNumberInput already has a decimal point
        //do nothing
      } else {
        //if seocndNumberInput does not have a deicmal point
        //add it
        secondNumberInput = secondNumberInput.concat(".");
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
