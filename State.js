class State {
  constructor() { }

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
      this.painter.mode.draw(this.painter.layer, event, this.painter.context);
      this.painter.changeState(new MousedownState(this.painter));
    }
  }
}

class MousedownState extends State {
  constructor(painter) {
    super();
    this.painter = painter;
  }

  doEvent(event) {
    if (event.type === 'mousemove') {
      this.painter.mode.move(this.painter.layer, event, this.painter.context);
      this.painter.changeState(new MousemoveState(this.painter));
    }
  }
}

class MousemoveState extends State {
  constructor(painter) {
    super();
    this.painter = painter;
  }

  doEvent(event) {
    if (event.type === 'mousemove') {
      this.painter.mode.move(this.painter.layer, event, this.painter.context);
    } else if (event.type === 'mouseup') {
      this.painter.mode.create(this.painter.layer, event, this.painter.context);
      this.painter.changeState(new IdleState(this.painter));
    }
  }
}

export { State, IdleState, MousedownState, MousemoveState };