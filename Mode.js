class Mode {
  constructor() { /* Base class contructor */ }

  draw(layer, event, context) {
    throw new Error('draw method not implemented');
  }

  move(layer, event, context) {
    throw new Error('move method not implemented');
  }

  create(layer, event, context) {
    throw new Error('create method not implemented');
  }
}

class SelectionMode extends Mode {
  constructor() {
    super();
  }

  draw(layer, event, context) {
    return;
  }

  move(layer, event, context) {
    return;
  }

  create(layer, event, context) {
    return;
  }


}

class LineMode extends Mode {
  constructor() {
    super();
  }

  draw(layer, event, context) {
    if (layer !== undefined) {
      layer.drawLine(event, context);
    }
  }

  move(layer, event, context) {
    if (layer !== undefined) {
      layer.scaleLine(event, context);
    }
  }

  create(layer, event, context) {
    if (layer !== undefined) {
      layer.createLine(event, context);
    }
  }
}

class RectangleMode extends Mode {
  constructor() {
    super();
  }

  draw(layer, event, context) {
    if (layer !== undefined) {
      layer.drawRectangle(event, context);
    }
  }

  move(layer, event, context) {
    if (layer !== undefined) {
      layer.scaleRectangle(event, context);
    }
  }

  create(layer, event, context) {
    if (layer !== undefined) {
      return layer.createRectangle(event, context);
    }
  }
}

class OvalMode extends Mode {
  constructor() {
    super();
  }

  draw(layer, event, context) {
    if (layer !== undefined) {
      layer.drawOval(event, context);
    }
  }

  move(layer, event, context) {
    if (layer !== undefined) {
      layer.scaleOval(event, context);
    }
  }

  create(layer, event, context) {
    if (layer !== undefined) {
      layer.createOval(event, context);
    }
  }
}

export { Mode, SelectionMode, LineMode, RectangleMode, OvalMode };