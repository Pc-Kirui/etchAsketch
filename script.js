'use strict';

const GRIDSIDE = 400;
let CURRENTFOREGROUNDCOLOR = 'gray';
let CURRENTDIMS = 16;
// let rows = 24;
// let columns = 24;

const numSquares = document.querySelector('.squares');
const input = document.querySelector('#grid');
const white = document.querySelector('.white');
const aqua = document.querySelector('.aqua');
const reset = document.querySelector('.reset');
const eraser = document.querySelector('.eraser');
const rainbow = document.querySelector('.rainbow');

//Creating sketch Area
const sketchPad = document.querySelector('.sketch-pad');
sketchPad.style.height = `${GRIDSIDE}px`;
sketchPad.style.width = `${GRIDSIDE}px`;

function setForegroundColor() {
  if (CURRENTFOREGROUNDCOLOR === `rainbow`) {
    this.style.backgroundColor = generateRandomRGB();
  } else {
    this.style.backgroundColor = CURRENTFOREGROUNDCOLOR;
  }
}
function generateRandomRGB() {
  const red = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  return `rgb(${red},${green},${blue})`;
}

//function prompting the user for the number of squares
//by shifting the focus to the input button
numSquares.addEventListener('click', function () {
  input.disabled = false;
  input.focus();
});

white.addEventListener('click', function () {
  CURRENTFOREGROUNDCOLOR = 'white';
});

aqua.addEventListener('click', function () {
  CURRENTFOREGROUNDCOLOR = 'aqua';
});

rainbow.addEventListener('click', function () {
  CURRENTFOREGROUNDCOLOR = 'rainbow';
});

reset.addEventListener('click', function () {
  removeGridSquares();
  createGridSquares(CURRENTDIMS);
  CURRENTFOREGROUNDCOLOR = 'gray';
});

eraser.addEventListener('click', function () {
  CURRENTFOREGROUNDCOLOR = 'black';
});

//generating new grid and setting limits for user input
input.addEventListener('change', function () {
  const userInput = Number(input.value);
  CURRENTDIMS = userInput;
  console.log(userInput);
  if (!userInput) {
    removeGridSquares();
    console.log('No number!');
    alert('Enter a valid number!');
  } else if (userInput < 16 || userInput > 100) {
    removeGridSquares();
    console.log('Not within the limit of squares required!');
    alert('Not within the limit required');
  } else {
    createGridSquares(userInput);
  }
});

//removing the  existing grid
const removeGridSquares = function () {
  while (sketchPad.firstChild) {
    sketchPad.removeChild(sketchPad.firstChild);
  }
};

//Creating divs(grids) using javascript
//inside the sketchpad container
const createGridSquares = function (dims) {
  removeGridSquares();
  for (let i = 0; i < dims * dims; i++) {
    const gridCell = document.createElement('div');

    gridCell.style.width = `${GRIDSIDE / dims - 2}px`;
    gridCell.style.height = `${GRIDSIDE / dims - 2}px`;
    gridCell.classList.add('cell');

    sketchPad.appendChild(gridCell);

    //calling function that sets foreground color
    //when mouse passes over them
    gridCell.addEventListener('mouseover', setForegroundColor);
  }
};
// createGridSquares(50);
