//constants to keep track of what current button press means
const INPUT_FIRST_NUM = 0;
const OPERATOR = 1;
const INPUT_SECOND_NUM = 2;
const INPUT_INVALID = 3;

//event listener wrapper to wait for DOM elemnts to load before continuing
document.addEventListener("DOMContentLoaded", (e) => {
  //get the number buttons
  let numberButtons = document.getElementsByClassName("number");
  console.log(numberButtons);
  console.log(numberButtons.length);
  for (let i = 0; i < numberButtons.length; i++) {
    console.log(numberButtons[i]);
  }

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
});
