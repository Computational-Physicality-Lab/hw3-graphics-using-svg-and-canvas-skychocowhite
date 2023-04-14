class Layer {
  constructor() { }

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

  drawRectangle() { }

  drawOval() { }
}

class SVGLayer extends Layer {
  constructor() {
    super();
  }

  drawLine() { }

  drawRectangle() { }

  drawOval() { }
}
