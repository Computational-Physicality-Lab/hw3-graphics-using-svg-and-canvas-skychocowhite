class Layer {
  constructor() { /* Base class constructor */ }

  getLayerPoint(layer, x, y) {
    return {
      x: x - layer.getBoundingClientRect().left,
      y: y - layer.getBoundingClientRect().top
    };
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


  drawLine(event, context) {
    if (context.borderColor === 'none') { return; }

    let tmpLayer = document.getElementById('tmpCanvasLayer');
    let point = this.getLayerPoint(tmpLayer, event.clientX, event.clientY);

    context.firstMouseX = point.x;
    context.firstMouseY = point.y;
  }

  scaleLine(event, context) {
    if (context.borderColor === 'none') { return; }

    let tmpLayer = document.getElementById('tmpCanvasLayer');
    let ctx = tmpLayer.getContext('2d');
    let point = this.getLayerPoint(tmpLayer, event.clientX, event.clientY);

    ctx.clearRect(0, 0, tmpLayer.width, tmpLayer.height);
    ctx.strokeStyle = context.borderColor;
    ctx.lineWidth = context.borderWidth;
    ctx.beginPath();
    ctx.moveTo(context.firstMouseX, context.firstMouseY);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  }

  createLine(event, context) {
    if (context.borderColor === 'none') { return; }

    let canvasLayer = document.getElementById('canvasLayer');
    let tmpLayer = document.getElementById('tmpCanvasLayer');
    let ctx = canvasLayer.getContext('2d');
    let tmpCtx = tmpLayer.getContext('2d');
    let point = this.getLayerPoint(canvasLayer, event.clientX, event.clientY);
    let dx = point.x - context.firstMouseX;
    let dy = point.y - context.firstMouseY;

    if (dx * dx + dy * dy >= 10) {
      ctx.drawImage(tmpLayer, 0, 0);
    }
    tmpCtx.clearRect(0, 0, canvasLayer.width, canvasLayer.height);
    context.firstMouseX = context.firstMouseY = 0;
  }

  drawRectangle(event, context) {
    let tmpLayer = document.getElementById('tmpCanvasLayer');
    let point = this.getLayerPoint(tmpLayer, event.clientX, event.clientY);

    context.firstMouseX = point.x;
    context.firstMouseY = point.y;
  }

  scaleRectangle(event, context) {
    let tmpLayer = document.getElementById('tmpCanvasLayer');
    let ctx = tmpLayer.getContext('2d');
    let point = this.getLayerPoint(tmpLayer, event.clientX, event.clientY);

    ctx.clearRect(0, 0, tmpLayer.width, tmpLayer.height);
    ctx.beginPath();
    ctx.fillStyle = context.fillColor;
    ctx.strokeStyle = context.borderColor;
    ctx.lineWidth = context.borderWidth;
    if (context.fillColor !== 'none') {
      ctx.fillRect(
        Math.min(point.x, context.firstMouseX),
        Math.min(point.y, context.firstMouseY),
        Math.abs(point.x - context.firstMouseX),
        Math.abs(point.y - context.firstMouseY)
      );
    }
    if (context.borderColor !== 'none') {
      ctx.strokeRect(
        Math.min(point.x, context.firstMouseX),
        Math.min(point.y, context.firstMouseY),
        Math.abs(point.x - context.firstMouseX),
        Math.abs(point.y - context.firstMouseY)
      );
    }
  }

  createRectangle(event, context) {
    let canvasLayer = document.getElementById('canvasLayer');
    let tmpLayer = document.getElementById('tmpCanvasLayer');
    let ctx = canvasLayer.getContext('2d');
    let tmpCtx = tmpLayer.getContext('2d');
    let point = this.getLayerPoint(canvasLayer, event.clientX, event.clientY);

    if (Math.abs(point.x - context.firstMouseX) >= 10 &&
      Math.abs(point.y - context.firstMouseY) >= 10) {

      ctx.drawImage(tmpLayer, 0, 0);
    }
    tmpCtx.clearRect(0, 0, tmpLayer.width, tmpLayer.height);
    context.firstMouseX = context.firstMouseY = 0;
  }

  drawOval(event, context) {
    let tmpLayer = document.getElementById('tmpCanvasLayer');
    let point = this.getLayerPoint(tmpLayer, event.clientX, event.clientY);

    context.firstMouseX = point.x;
    context.firstMouseY = point.y;
  }

  scaleOval(event, context) {
    let tmpLayer = document.getElementById('tmpCanvasLayer');
    let ctx = tmpLayer.getContext('2d');
    let point = this.getLayerPoint(tmpLayer, event.clientX, event.clientY);

    ctx.clearRect(0, 0, tmpLayer.width, tmpLayer.height);
    ctx.beginPath();
    ctx.fillStyle = context.fillColor;
    ctx.strokeStyle = context.borderColor;
    ctx.lineWidth = context.borderWidth;
    ctx.ellipse(
      (point.x + context.firstMouseX) / 2,
      (point.y + context.firstMouseY) / 2,
      Math.abs(point.x - context.firstMouseX) / 2,
      Math.abs(point.y - context.firstMouseY) / 2,
      0, 0, 2 * Math.PI
    );

    if (context.fillColor !== 'none') {
      ctx.fill();
    }
    if (context.borderColor !== 'none') {
      ctx.stroke();
    }
  }

  createOval(event, context) {
    let canvasLayer = document.getElementById('canvasLayer');
    let tmpLayer = document.getElementById('tmpCanvasLayer');
    let ctx = canvasLayer.getContext('2d');
    let tmpCtx = tmpLayer.getContext('2d');
    let point = this.getLayerPoint(canvasLayer, event.clientX, event.clientY);

    if (Math.abs(point.x - context.firstMouseX) >= 10 &&
      Math.abs(point.y - context.firstMouseY) >= 10) {

      ctx.drawImage(tmpLayer, 0, 0);
    }
    tmpCtx.clearRect(0, 0, tmpLayer.width, tmpLayer.height);
    context.firstMouseX = context.firstMouseY = 0;
  }

  removeCurrentElement(event, context) {
    let tmpLayer = document.getElementById('tmpCanvasLayer');
    let ctx = tmpLayer.getContext('2d');
    ctx.clearRect(0, 0, tmpLayer.width, tmpLayer.height);
  }
}

const svgns = 'http://www.w3.org/2000/svg';

class SVGLayer extends Layer {
  constructor() {
    super();
  }

  drawLine(event, context) {
    if (context.borderColor === 'none') { return; }

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

  scaleLine(event, context) {
    if (context.borderColor === 'none') { return; }

    let element = context.drawingElement;
    let svgLayer = document.getElementById('svgLayer');
    let point = this.getLayerPoint(svgLayer, event.clientX, event.clientY);

    element.setAttribute('x2', point.x);
    element.setAttribute('y2', point.y);
  }

  createLine(event, context) {
    if (context.borderColor === 'none') { return; }

    let element = context.drawingElement;
    let svgLayer = document.getElementById('svgLayer');
    let point = this.getLayerPoint(svgLayer, event.clientX, event.clientY);
    let dx = point.x - context.firstMouseX;
    let dy = point.y - context.firstMouseY;

    if (dx * dx + dy * dy < 100) {
      element.remove();
    }
    context.firstMouseX = context.firstMouseY = 0.0;
    context.drawingElement = undefined;
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
      element = undefined;
    }
    context.firstMouseX = context.firstMouseY = 0.0;
    context.drawingElement = undefined;
    return element;
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
    }
    context.firstMouseX = context.firstMouseY = 0.0;
    context.drawingElement = undefined;
  }

  removeCurrentElement(event, context) {
    if (context.drawingElement !== undefined) {
      context.firstMouseX = context.firstMouseY = 0.0;
      context.drawingElement.remove();
    }
  }
}

export { Layer, CanvasLayer, SVGLayer };
