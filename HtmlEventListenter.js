let painter = new Painter();

function doEvent(event) {
  console.log(event.type);
  painter.doEvent(event);
  event.stopPropagation();
}

const canvasLayer = document.querySelector("#canvasLayer");
const svgLayer = document.querySelector("#svgLayer");
const rectangleModeSquare = document.querySelector("#rectangleModeSquare");
const ovalModeCircle = document.querySelector("#ovalModeCircle");
const borderNoneButton = document.querySelector('#noneBorderColor');
const fillNoneButton = document.querySelector('#noneFillColor');

let colorMap = {
  'white': 'white',
  'gray': 'gray',
  'black': 'black',
  'yellow': 'rgb(255, 255, 78)',
  'red': 'rgb(249, 80, 80)',
  'blue': 'rgb(143, 186, 255)',
  'green': 'rgb(134, 201, 134)',
}

document.querySelectorAll('input[name="layer"]').forEach((element) => {
  element.addEventListener('change', function (event) {
    console.log(event.target.value + ' is clicked');

    if (event.target.value === 'canvas') {
      painter.layer = canvasLayer;
    } else if (event.target.value === 'svg') {
      painter.layer = svgLayer;
    } else if (event.target.value === 'all') {
      painter.layer = undefined;
    } else {
      throw new Error('Undefined layer selection is clicked');
    }
    painter.layerMode = event.target.value;
  });
});

document.querySelectorAll('input[name="mode"]').forEach((element) => {
  element.addEventListener('change', function (event) {
    console.log(event.target.value + ' is clicked');

    if (event.target.value === 'cursor') {
      painter.mode = new SelectionMode();
    } else if (event.target.value === 'line') {
      painter.mode = new LineMode();
    } else if (event.target.value === 'rectangle') {
      painter.mode = new RectangleMode();
    } else if (event.target.value == 'oval') {
      painter.mode = new OvalMode();
    } else {
      throw new Error('Undefined mode is clicked');
    }
  });
});

document.querySelectorAll('input[name="borderColor"]').forEach((element) => {
  element.addEventListener('change', function (event) {
    console.log(event.target.value + ' border color is clicked');

    fillNoneButton.disabled = false;
    painter.context.borderColor = event.target.value;
    if (event.target.value === 'none') {
      rectangleModeSquare.style.borderColor = 'white';
      ovalModeCircle.style.borderColor = 'white';
      fillNoneButton.disabled = true;
    } else {
      rectangleModeSquare.style.borderColor = colorMap[event.target.value];
      ovalModeCircle.style.borderColor = colorMap[event.target.value];
    }
  });
});

document.querySelector('input[name="borderWidth"]').addEventListener('change', function (event) {
  console.log('border width set to ' + event.target.value);

  painter.context.borderWidht = event.target.value;
});

document.querySelectorAll('input[name="fillColor"]').forEach((element) => {
  element.addEventListener('change', function (event) {
    console.log(event.target.value + ' fill color is clicked');

    borderNoneButton.disabled = false;
    painter.context.fillColor = event.target.value;
    if (event.target.value === 'none') {
      rectangleModeSquare.style.backgroundColor = 'white';
      ovalModeCircle.style.backgroundColor = 'white';
      borderNoneButton.disabled = true;
    } else {
      rectangleModeSquare.style.backgroundColor = colorMap[event.target.value];
      ovalModeCircle.style.backgroundColor = colorMap[event.target.value];
    }
  });
});

