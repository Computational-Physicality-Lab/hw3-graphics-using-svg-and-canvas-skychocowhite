class Context {
  constructor() {
    this.firstMouseX = 0.0;
    this.firstMouseY = 0.0;
    this.drawingElement = undefined;
    this.mouseDownElement = undefined;
    this.originElementPoints = [];
    this.selectionElement = undefined;
    this.borderColor = "rgb(0, 0, 0)";
    this.fillColor = "rgb(134, 201, 134)";
    this.borderWidth = 3;
  }
}

export { Context };