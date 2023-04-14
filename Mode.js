class Mode {
  constructor() { }

  draw(layer) {
    throw new Error('draw method not implemented');
  }
}

class SelectionMode extends Mode {
  constructor() {
    super();
  }

  draw(layer) {
    return;
  }
}

class LineMode extends Mode {
  constructor() {
    super();
  }

  draw(layer) {
    return layer.draw();
  }
}

class RectangleMode extends Mode {
  constructor() {
    super();
  }

  draw(layer) {
    return layer.draw();
  }
}

class OvalMode extends Mode {
  constructor() {
    super();
  }

  draw(layer) {
    return layer.draw();
  }
}