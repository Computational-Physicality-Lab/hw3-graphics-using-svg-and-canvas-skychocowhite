class Mode {
  constructor() { }

  draw(layer, event, painter) {
    throw new Error('draw method not implemented');
  }

  move(layer, event, painter) {
    throw new Error('move method not implemented');
  }

  create(layer, event, painter) {
    throw new Error('create method not implemented');
  }
}

class SelectionMode extends Mode {
  constructor() {
    super();
  }

  draw(layer, event, painter) {
    return;
  }

  move(layer, event, painter) {
    return;
  }

  create(layer, event, painter) {

  }
}

class LineMode extends Mode {
  constructor() {
    super();
  }

  draw(layer, event, context) {
    layer.drawLine(event, context);
  }

  move(layer, event, context) {
    layer.moveLine(event, context);
  }

  create(layer, event, context) {
    layer.createLine(event, context);
  }
}

class RectangleMode extends Mode {
  constructor() {
    super();
  }

  draw(layer, event, context) {
    layer.drawRectangle(event, context);
  }

  move(layer, event, context) {
    layer.scaleRectangle(event, context);
  }

  create(layer, event, context) {
    layer.createRectangle(event, context);
  }
}

class OvalMode extends Mode {
  constructor() {
    super();
  }

  draw(layer, event, context) {
    layer.drawOval(event, context);
  }

  move(layer, event, context) {
    layer.scaleOval(event, context);
  }

  create(layer, event, context) {
    layer.createOval(event, context);
  }
}

export { Mode, SelectionMode, LineMode, RectangleMode, OvalMode };