class Context {
  constructor() {
    this.firstMouseX = 0.0;
    this.firstMouseY = 0.0;
    this.drawingElement = undefined;
    this.selectionElement = undefined;
    this.borderColor = "black";
    this.fillColor = "green";
    this.borderWidth = 3;
  }
}

export { Context };