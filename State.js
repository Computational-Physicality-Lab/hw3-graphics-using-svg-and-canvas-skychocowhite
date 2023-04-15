import { SelectionMode } from "./Mode.js";

class State {
  constructor() { /* Base class constructor */ }

  doEvent(event) {
    throw new Error('doEvent method not implemented');
  }
}

class IdleState extends State {
  constructor(painter) {
    super();
    this.painter = painter;
  }

  doEvent(event) {
    if (event.type === 'mousedown') {
      if (!(this.mode instanceof SelectionMode)) {
        this.painter.mode.draw(this.painter.layer, event, this.painter.context);
        this.painter.changeState(new DrawMousedownState(this.painter));
      }
    }
  }
}

class DrawMousedownState extends State {
  constructor(painter) {
    super();
    this.painter = painter;
  }

  doEvent(event) {
    if (event.type === 'mousemove') {
      if (!(this.mode instanceof SelectionMode)) {
        this.painter.mode.move(this.painter.layer, event, this.painter.context);
        this.painter.changeState(new DrawMousemoveState(this.painter));
      }
    } else if (event.type === 'keydown' && event.code === 'Escape') {
      if (!(this.mode instanceof SelectionMode)) {
        this.painter.layer.removeCurrentElement(event, this.painter.context);
        this.painter.changeState(new IdleState(this.painter));
      }
    }
  }
}

class DrawMousemoveState extends State {
  constructor(painter) {
    super();
    this.painter = painter;
  }

  doEvent(event) {
    if (event.type === 'mousemove') {
      if (!(this.mode instanceof SelectionMode)) {
        this.painter.mode.move(this.painter.layer, event, this.painter.context);
        this.painter.changeState(new DrawMousemoveState(this.painter));
      }
    } else if (event.type === 'mouseup') {
      if (!(this.mode instanceof SelectionMode)) {
        this.painter.mode.create(this.painter.layer, event, this.painter.context);
        this.painter.changeState(new IdleState(this.painter));
      }
    } else if (event.type === 'keydown' && event.code === 'Escape') {
      if (!(this.mode instanceof SelectionMode)) {
        this.painter.layer.removeCurrentElement(event, this.painter.context);
        this.painter.changeState(new IdleState(this.painter));
      }
    }
  }
}

export { State, IdleState, DrawMousedownState, DrawMousemoveState };