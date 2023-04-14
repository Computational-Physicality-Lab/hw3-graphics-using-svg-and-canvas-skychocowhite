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

  }
}

class MousedownState extends State {
  constructor(painter) {
    super();
    this.painter = painter;
  }

  doEvent(event) { }
}

class MousemoveState extends State {
  constructor(painter) {
    super();
    this.painter = painter;
  }

  doEvent(event) { }
}

class MouseupState extends State {
  constructor(painter) {
    super();
    this.painter = painter;
  }

  doEvent(event) { }
}