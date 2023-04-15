import { Painter } from './Painter.js'
import { CanvasLayer, SVGLayer } from './Layer.js';
import { SelectionMode, LineMode, RectangleMode, OvalMode } from './Mode.js';

const mainPanel = document.getElementById('mainPanel');
const canvasLayer = document.querySelector("#canvasLayer");
const tmpCanvasLayer = document.querySelector("#tmpCanvasLayer");
const svgLayer = document.querySelector("#svgLayer");
const rectangleModeSquare = document.querySelector("#rectangleModeSquare");
const ovalModeCircle = document.querySelector("#ovalModeCircle");
const borderNoneButton = document.querySelector('#noneBorderColor');
const fillNoneButton = document.querySelector('#noneFillColor');

mainPanel.setAttribute('tabindex', -1);
mainPanel.focus();
mainPanel.addEventListener('keydown', doEvent);

canvasLayer.width = canvasLayer.clientWidth;
canvasLayer.height = canvasLayer.clientHeight;
tmpCanvasLayer.width = tmpCanvasLayer.clientWidth;
tmpCanvasLayer.height = tmpCanvasLayer.clientHeight;

let painter = new Painter();

function doEvent(event) {
  console.log(event.type);
  painter.doEvent(event);
  event.stopPropagation();
}

function resetSelectionSVGElement() {
  if (painter.context.selectionElement !== undefined) {
    painter.context.selectionElement.removeAttribute('filter');
  }
}

document.querySelectorAll('input[name="layer"]').forEach((element) => {
  element.addEventListener('change', function (event) {
    console.log(event.target.value + ' is clicked');

    document.querySelectorAll('.block, .block input, #borderWidth input, #layerDeletion').forEach((element) => {
      element.style.opacity = 1;
      element.disabled = false;
    });

    if (event.target.value === 'canvas') {
      painter.layer = new CanvasLayer();
      canvasLayer.style.visibility = 'visible';
      svgLayer.style.visibility = 'hidden';
      document.querySelector('#layerDeletion').style.opacity = 0.5;
      document.querySelector('#layerDeletion').disabled = true;
    } else if (event.target.value === 'svg') {
      painter.layer = new SVGLayer();
      canvasLayer.style.visibility = 'hidden';
      svgLayer.style.visibility = 'visible';
    } else if (event.target.value === 'all') {
      painter.layer = undefined;
      canvasLayer.style.visibility = 'visible';
      svgLayer.style.visibility = 'visible';
      document.querySelectorAll('.block, .block input, #borderWidth input, #layerDeletion').forEach((element) => {
        element.style.opacity = 0.5;
        element.disabled = true;
      });
    } else {
      throw new Error('Undefined layer selection is clicked');
    }
    resetSelectionSVGElement();
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
    resetSelectionSVGElement();
  });
});

document.querySelectorAll('input[name="borderColor"]').forEach((element) => {
  element.addEventListener('change', function (event) {
    console.log(event.target.value + ' border color is clicked');

    fillNoneButton.disabled = false;
    fillNoneButton.parentElement.style.opacity = 1;
    painter.context.borderColor = painter.colorMap[event.target.value];
    if (event.target.value === 'none') {
      rectangleModeSquare.style.borderColor = 'white';
      ovalModeCircle.style.borderColor = 'white';
      fillNoneButton.disabled = true;
      fillNoneButton.parentElement.style.opacity = 0.5;
    } else {
      rectangleModeSquare.style.borderColor = painter.colorMap[event.target.value];
      ovalModeCircle.style.borderColor = painter.colorMap[event.target.value];
    }

    if (painter.context.selectionElement !== undefined) {
      if (painter.context.selectionElement.tagName === 'line' && event.target.value === 'none') { return; }
      painter.context.selectionElement.style.stroke = painter.colorMap[event.target.value];
    }
  });
});

document.querySelector('input[name="borderWidth"]').addEventListener('change', function (event) {
  console.log('border width set to ' + event.target.value);

  painter.context.borderWidth = event.target.value;
  if (painter.context.selectionElement !== undefined) {
    painter.context.selectionElement.style.strokeWidth = event.target.value;
  }
});

document.querySelectorAll('input[name="fillColor"]').forEach((element) => {
  element.addEventListener('change', function (event) {
    console.log(event.target.value + ' fill color is clicked');

    borderNoneButton.disabled = false;
    borderNoneButton.parentElement.style.opacity = 1;
    painter.context.fillColor = painter.colorMap[event.target.value];
    if (event.target.value === 'none') {
      rectangleModeSquare.style.backgroundColor = 'white';
      ovalModeCircle.style.backgroundColor = 'white';
      borderNoneButton.disabled = true;
      borderNoneButton.parentElement.style.opacity = 0.5;
    } else {
      rectangleModeSquare.style.backgroundColor = painter.colorMap[event.target.value];
      ovalModeCircle.style.backgroundColor = painter.colorMap[event.target.value];
    }

    if (painter.context.selectionElement !== undefined) {
      painter.context.selectionElement.style.fill = painter.colorMap[event.target.value];
    }
  });
});

document.querySelector('#layerDeletion').addEventListener('click', function (event) {
  if (painter.context.selectionElement !== undefined) {
    painter.context.selectionElement.remove();
  }
});

document.querySelector('#allDeletion').addEventListener('click', function (event) {
  canvasLayer.getContext('2d').clearRect(0, 0, canvasLayer.width, canvasLayer.height);
  while (svgLayer.firstChild) {
    svgLayer.childNodes.forEach((element) => {
      element.remove();
    });
  }
});

tmpCanvasLayer.addEventListener('mousedown', doEvent);
tmpCanvasLayer.addEventListener('mousemove', doEvent);
tmpCanvasLayer.addEventListener('mouseup', doEvent);

svgLayer.addEventListener('mousedown', doEvent);
svgLayer.addEventListener('mousemove', doEvent);
svgLayer.addEventListener('mouseup', doEvent);
svgLayer.addEventListener('click', doEvent);