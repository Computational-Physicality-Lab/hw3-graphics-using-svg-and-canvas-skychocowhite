const svgns = 'http://www.w3.org/2000/svg';

class Layer {
  constructor() { /* Base class constructor */ }

  getLayerPoint(layer, x, y) {
    let point = {
      x: x - layer.getBoundingClientRect().x,
      y: y - layer.getBoundingClientRect().y
    };
    return point;
  }

  drawLine() {
    throw new Error('drawLine is not implemented');
  }

  drawRectangle() {
    throw new Error('drawRectangle is not implemented');
  }

  drawOval() {
    throw new Error('drawOval is not implemented');
  }
}

class CanvasLayer extends Layer {
  constructor() {
    super();
  }

  drawLine() { }

  drawRectangle() {
  }

  drawOval() { }
}

class SVGLayer extends Layer {
  constructor() {
    super();
  }

  drawLine(event, context) {
    let element = document.createElementNS(svgns, 'line');
    let svgLayer = document.getElementById('svgLayer');
    let point = this.getLayerPoint(svgLayer, event.clientX, event.clientY);

    element.setAttribute('class', 'svgElement');
    element.setAttribute('x1', point.x);
    element.setAttribute('y1', point.y);
    element.setAttribute('x2', point.x);
    element.setAttribute('y2', point.y);
    element.style.stroke = context.borderColor;
    element.style.strokeWidth = context.borderWidth;
    context.drawingElement = element;
    context.firstMouseX = point.x;
    context.firstMouseY = point.y;

    svgLayer.appendChild(element);
  }

  moveLine(event, context) {
    let element = context.drawingElement;
    let svgLayer = document.getElementById('svgLayer');
    let point = this.getLayerPoint(svgLayer, event.clientX, event.clientY);

    element.setAttribute('x2', point.x);
    element.setAttribute('y2', point.y);
  }

  createLine(event, context) {
    let element = context.drawingElement;
    let svgLayer = document.getElementById('svgLayer');
    let point = this.getLayerPoint(svgLayer, event.clientX, event.clientY);
    let dx = point.x - context.firstMouseX;
    let dy = point.y - context.firstMouseY;

    if (dx * dx + dy * dy < 100) {
      element.remove();
    } else {
      context.firstMouseX = context.firstMouseY = 0.0;
      context.drawingElement = undefined;
    }
  }

  drawRectangle(event, context) {
    let element = document.createElementNS(svgns, 'rect');
    let svgLayer = document.getElementById('svgLayer');
    let point = this.getLayerPoint(svgLayer, event.clientX, event.clientY);

    element.setAttribute('class', 'svgElement');
    element.setAttribute('x', point.x);
    element.setAttribute('y', point.y);
    element.setAttribute('width', "0");
    element.setAttribute('height', "0");
    element.style.fill = context.fillColor;
    element.style.stroke = context.borderColor;
    element.style.strokeWidth = context.borderWidth;
    context.drawingElement = element;
    context.firstMouseX = point.x;
    context.firstMouseY = point.y;

    svgLayer.appendChild(element);
  }

  scaleRectangle(event, context) {
    let element = context.drawingElement;
    let svgLayer = document.getElementById("svgLayer");
    let point = this.getLayerPoint(svgLayer, event.clientX, event.clientY);

    element.setAttribute("x", Math.min(context.firstMouseX, point.x));
    element.setAttribute("y", Math.min(context.firstMouseY, point.y));
    element.setAttribute("width", Math.abs(point.x - context.firstMouseX));
    element.setAttribute('height', Math.abs(point.y - context.firstMouseY));
  }

  createRectangle(event, context) {
    let element = context.drawingElement;
    let svgLayer = document.getElementById("svgLayer");
    let point = this.getLayerPoint(svgLayer, event.clientX, event.clientY);

    if (Math.abs(context.firstMouseX - point.x) < 10 ||
      Math.abs(context.firstMouseY - point.y) < 10) {

      element.remove();
    } else {
      context.firstMouseX = context.firstMouseY = 0.0;
      context.drawingElement = undefined;
    }
  }

  drawOval(event, context) {
    let element = document.createElementNS(svgns, 'ellipse');
    let svgLayer = document.getElementById('svgLayer');
    let point = this.getLayerPoint(svgLayer, event.clientX, event.clientY);

    element.setAttribute('class', 'svgElement');
    element.setAttribute('cx', point.x);
    element.setAttribute('cy', point.y);
    element.setAttribute('rx', "0");
    element.setAttribute('ry', "0");
    element.style.fill = context.fillColor;
    element.style.stroke = context.borderColor;
    element.style.strokeWidth = context.borderWidth;
    context.drawingElement = element;
    context.firstMouseX = point.x;
    context.firstMouseY = point.y;

    svgLayer.appendChild(element);
  }

  scaleOval(event, context) {
    let element = context.drawingElement;
    let svgLayer = document.getElementById('svgLayer');
    let point = this.getLayerPoint(svgLayer, event.clientX, event.clientY);

    element.setAttribute('cx', (point.x + context.firstMouseX) / 2);
    element.setAttribute('cy', (point.y + context.firstMouseY) / 2);
    element.setAttribute('rx', Math.abs(point.x - context.firstMouseX) / 2);
    element.setAttribute('ry', Math.abs(point.y - context.firstMouseY) / 2);
  }

  createOval(event, context) {
    let element = context.drawingElement;
    let svgLayer = document.getElementById('svgLayer');
    let point = this.getLayerPoint(svgLayer, event.clientX, event.clientY);

    if (Math.abs(point.x - context.firstMouseX) < 10 ||
      Math.abs(point.y - context.firstMouseY) < 10) {

      element.remove();
    } else {
      context.firstMouseX = context.firstMouseY = 0.0;
      context.drawingElement = undefined;
    }
  }
}

export { Layer, CanvasLayer, SVGLayer };
