class Painter {
  constructor() {
    this.context = new Context();
    this.state = new IdleState();
    this.layer = undefined;
    this.layerMode = "svg";
    this.mode = new SelectionMode();
  }

  setMode(mode) {
    this.mode = mode;
  }

  setLayer(layer) {
    this.layer = Layer;
  }

  doEvent(event) {
    this.state.doEvent(event);
  }

  changeState(state) {
    this.state = state;
  }
}