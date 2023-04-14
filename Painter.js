import { Context } from "./Context.js";
import { IdleState } from "./State.js";
import { SVGLayer } from "./Layer.js";
import { SelectionMode } from "./Mode.js";

class Painter {
  constructor() {
    this.context = new Context();
    this.state = new IdleState(this);
    this.layer = new SVGLayer();
    this.layerMode = "svg";
    this.mode = new SelectionMode();
  }

  setMode(mode) {
    this.mode = mode;
  }

  setLayer(layer) {
    this.layer = layer;
  }

  doEvent(event) {
    this.state.doEvent(event);
  }

  changeState(state) {
    this.state = state;
  }
}

export { Painter };