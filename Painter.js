import { Context } from "./Context.js";
import { IdleState } from "./State.js";
import { SVGLayer } from "./Layer.js";
import { RectangleMode } from "./Mode.js";

class Painter {
  constructor() {
    this.context = new Context();
    this.state = new IdleState(this);
    this.layer = new SVGLayer();
    this.layerMode = "svg";
    this.mode = new RectangleMode();
    this.colorMap = {
      'none': 'none',
      'white': 'rgb(255, 255, 255)',
      'gray': 'rgb(128, 128, 128)',
      'black': 'rgb(0, 0, 0)',
      'yellow': 'rgb(255, 255, 78)',
      'red': 'rgb(249, 80, 80)',
      'blue': 'rgb(143, 186, 255)',
      'green': 'rgb(134, 201, 134)',
    };
  }

  setMode(mode) {
    this.mode = mode;
  }

  setLayer(layer) {
    this.layer = layer;
  }

  doEvent(event) {
    console.log(this.state);
    this.state.doEvent(event);
  }

  changeState(state) {
    this.state = state;
  }
}

export { Painter };