import { SVGLayer } from "./Layer.js";
import { SelectionMode } from "./Mode.js";

function addSVGElementMouseDownEvent(painter, element) {
  element.addEventListener('mousedown', function (event) {
    painter.doEvent(event);
    event.stopPropagation();
  });
}

function addSVGElementMouseMoveEvent(painter, element) {
  element.addEventListener('mousemove', function (event) {
    painter.doEvent(event);
    event.stopPropagation();
  });
}

function addSVGElementMouseClickEvent(painter, element) {
  element.addEventListener('mouseup', function (event) {
    painter.doEvent(event);
    event.stopPropagation();
  });
}

function copyOriginSVGElementPos(context, element) {
  if (element.tagName === 'line') {
    context.originElementPoints.push({
      x: element.x1.baseVal.value,
      y: element.y1.baseVal.value
    });
    context.originElementPoints.push({
      x: element.x2.baseVal.value,
      y: element.y2.baseVal.value
    });
  } else if (element.tagName === 'rect') {
    context.originElementPoints.push({
      x: element.x.baseVal.value,
      y: element.y.baseVal.value
    });
  } else if (element.tagName === 'ellipse') {
    context.originElementPoints.push({
      x: element.cx.baseVal.value,
      y: element.cy.baseVal.value
    });
  }
}

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
      if (!(this.painter.mode instanceof SelectionMode)) {
        this.painter.mode.draw(this.painter.layer, event, this.painter.context);
        this.painter.changeState(new DrawMousedownState(this.painter));
      } else {
        let point = this.painter.layer.getLayerPoint(document.getElementById('svgLayer'), event.clientX, event.clientY);
        this.painter.context.firstMouseX = point.x;
        this.painter.context.firstMouseY = point.y;
        if (this.painter.layer instanceof SVGLayer && event.target.tagName !== 'svg') {
          this.painter.context.mouseDownElement = event.target;
          this.painter.changeState(new SVGLayerSelectionMouseDownState(this.painter));
        } else if (this.painter.layer instanceof SVGLayer && event.target.tagName === 'svg') {
          this.painter.changeState(new SVGLayerBackgroundMouseDownState(this.painter));
        }
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
      }
    } else if (event.type === 'mouseup') {
      if (!(this.mode instanceof SelectionMode)) {
        let element = this.painter.mode.create(this.painter.layer, event, this.painter.context);
        this.painter.changeState(new IdleState(this.painter));
        if (element !== undefined) {
          addSVGElementMouseDownEvent(this.painter, element);
          addSVGElementMouseMoveEvent(this.painter, element);
          addSVGElementMouseClickEvent(this.painter, element);
        }
      }
    } else if (event.type === 'keydown' && event.code === 'Escape') {
      if (!(this.mode instanceof SelectionMode)) {
        this.painter.layer.removeCurrentElement(event, this.painter.context);
        this.painter.changeState(new IdleState(this.painter));
      }
    }
  }
}

class SVGLayerSelectionMouseDownState extends State {
  constructor(painter) {
    super();
    this.painter = painter;
  }

  doEvent(event) {
    if (event.type === 'click') {
      if (this.painter.context.mouseDownElement !== event.target) {
        this.painter.context.mouseDownElement = undefined;
        this.painter.changeState(new IdleState(this.painter));
        return;
      }

      console.log(event.target);
      if (this.painter.context.selectionElement !== undefined) {
        this.painter.context.selectionElement.removeAttribute('filter');
      }
      this.painter.context.selectionElement = event.target;
      this.painter.context.mouseDownElement = undefined;

      if (event.target.tagName === 'line') {
        event.target.setAttribute('filter', 'url(#lineShadowEffect)');
      } else {
        event.target.setAttribute('filter', 'url(#shadowEffect)');
        let fillColor = Object.keys(this.painter.colorMap).find(key => this.painter.colorMap[key] === event.target.style.fill);
        document.querySelector(`#fillColors input[value="${fillColor}"]`).dispatchEvent(new Event('change'));
        document.querySelector(`#fillColors input[value="${fillColor}"]`).checked = true;
      }

      let borderColor = Object.keys(this.painter.colorMap).find(key => this.painter.colorMap[key] === event.target.style.stroke);
      document.querySelector(`#borderColors input[value="${borderColor}"]`).dispatchEvent(new Event('change'));
      document.querySelector(`#borderColors input[value="${borderColor}"]`).checked = true;

      let borderWidth = event.target.style.strokeWidth;
      let borderWidthBar = document.querySelector('input[name="borderWidth"]');
      borderWidthBar.value = borderWidth;
      borderWidthBar.parentElement.querySelector('output').innerHTML = borderWidth;
      borderWidthBar.dispatchEvent(new Event('change'));

      this.painter.changeState(new IdleState(this.painter));
    }
    else if (event.type === 'mousemove') {
      let point = this.painter.layer.getLayerPoint(document.getElementById('svgLayer'), event.clientX, event.clientY);
      if ((this.painter.context.firstMouseX !== point.x) ||
        (this.painter.context.firstMouseY !== point.y)) {

        if (this.painter.context.selectionElement !== undefined) {
          this.painter.context.selectionElement.removeAttribute('filter');
        }
        this.painter.context.selectionElement = event.target;

        if (event.target.tagName === 'line') {
          event.target.setAttribute('filter', 'url(#lineShadowEffect)');
        } else {
          event.target.setAttribute('filter', 'url(#shadowEffect)');
          let fillColor = Object.keys(this.painter.colorMap).find(key => this.painter.colorMap[key] === event.target.style.fill);
          document.querySelector(`#fillColors input[value="${fillColor}"]`).dispatchEvent(new Event('change'));
          document.querySelector(`#fillColors input[value="${fillColor}"]`).checked = true;
        }

        let borderColor = Object.keys(this.painter.colorMap).find(key => this.painter.colorMap[key] === event.target.style.stroke);
        document.querySelector(`#borderColors input[value="${borderColor}"]`).dispatchEvent(new Event('change'));
        document.querySelector(`#borderColors input[value="${borderColor}"]`).checked = true;

        let borderWidth = event.target.style.strokeWidth;
        let borderWidthBar = document.querySelector('input[name="borderWidth"]');
        borderWidthBar.value = borderWidth;
        borderWidthBar.parentElement.querySelector('output').innerHTML = borderWidth;
        borderWidthBar.dispatchEvent(new Event('change'));

        copyOriginSVGElementPos(this.painter.context, event.target);
        this.painter.changeState(new SVGLayerSelectionMouseMoveState(this.painter));
      }
    }
  }
}

class SVGLayerSelectionMouseMoveState extends State {
  constructor(painter) {
    super();
    this.painter = painter;
  }

  doEvent(event) {
    if (event.type === 'mousemove') {
      let point = this.painter.layer.getLayerPoint(document.getElementById('svgLayer'), event.clientX, event.clientY);
      let offsetX = point.x - this.painter.context.firstMouseX;
      let offsetY = point.y - this.painter.context.firstMouseY;

      let x, y;
      if (this.painter.context.selectionElement.tagName === 'line') {
        x = this.painter.context.selectionElement.x1.baseVal.value + offsetX;
        y = this.painter.context.selectionElement.y1.baseVal.value + offsetY;
        this.painter.context.selectionElement.setAttribute('x1', x);
        this.painter.context.selectionElement.setAttribute('y1', y);
        x = this.painter.context.selectionElement.x2.baseVal.value + offsetX;
        y = this.painter.context.selectionElement.y2.baseVal.value + offsetY;
        this.painter.context.selectionElement.setAttribute('x2', x);
        this.painter.context.selectionElement.setAttribute('y2', y);
      } else if (this.painter.context.selectionElement.tagName === 'rect') {
        x = this.painter.context.selectionElement.x.baseVal.value + offsetX;
        y = this.painter.context.selectionElement.y.baseVal.value + offsetY;
        this.painter.context.selectionElement.setAttribute('x', x);
        this.painter.context.selectionElement.setAttribute('y', y);
      } else if (this.painter.context.selectionElement.tagName === 'ellipse') {
        x = this.painter.context.selectionElement.cx.baseVal.value + offsetX;
        y = this.painter.context.selectionElement.cy.baseVal.value + offsetY;
        this.painter.context.selectionElement.setAttribute('cx', x);
        this.painter.context.selectionElement.setAttribute('cy', y);
      }

      this.painter.context.firstMouseX = point.x;
      this.painter.context.firstMouseY = point.y;
    } else if (event.type === 'mouseup') {
      this.painter.context.firstMouseX = this.painter.context.firstMouseY = 0.0;
      this.painter.context.mouseDownElement = undefined;
      this.painter.changeState(new IdleState(this.painter));
    } else if (event.type === 'keydown' && event.code === 'Escape') {
      if (this.painter.context.selectionElement !== undefined) {
        this.painter.context.selectionElement.removeAttribute('filter');
      }


      if (this.painter.context.selectionElement.tagName === 'line') {
        this.painter.context.selectionElement.setAttribute('x1', this.painter.context.originElementPoints[0].x);
        this.painter.context.selectionElement.setAttribute('y1', this.painter.context.originElementPoints[0].y);
        this.painter.context.selectionElement.setAttribute('x2', this.painter.context.originElementPoints[1].x);
        this.painter.context.selectionElement.setAttribute('y2', this.painter.context.originElementPoints[1].y);
      } else if (this.painter.context.selectionElement.tagName === 'rect') {
        this.painter.context.selectionElement.setAttribute('x', this.painter.context.originElementPoints[0].x);
        this.painter.context.selectionElement.setAttribute('y', this.painter.context.originElementPoints[0].y);
      } else if (this.painter.context.selectionElement.tagName === 'ellipse') {
        this.painter.context.selectionElement.setAttribute('cx', this.painter.context.originElementPoints[0].x);
        this.painter.context.selectionElement.setAttribute('cy', this.painter.context.originElementPoints[0].y);
      }

      this.painter.context.originElementPoints = [];
      this.painter.context.firstMouseX = this.painter.context.firstMouseY = 0.0;
      this.painter.context.mouseDownElement = undefined;
      this.painter.context.selectionElement = undefined;
      this.painter.changeState(new IdleState(this.painter));
    }
  }
}

class SVGLayerBackgroundMouseDownState extends State {
  constructor(painter) {
    super();
    this.painter = painter;
  }

  doEvent(event) {
    if (event.type === 'click') {
      if (this.painter.context.selectionElement !== undefined) {
        this.painter.context.selectionElement.removeAttribute('filter');
        this.painter.context.selectionElement = undefined;
      }
      this.painter.context.firstMouseX = this.painter.context.firstMouseY = 0.0;
      this.painter.changeState(new IdleState(this.painter));
    } else if (event.type === 'mousemove') {
      let point = this.painter.layer.getLayerPoint(document.getElementById('svgLayer'), event.clientX, event.clientY);
      if ((this.painter.context.firstMouseX !== point.x) ||
        (this.painter.context.firstMouseY !== point.y)) {
        this.painter.changeState(new IdleState(this.painter));
      }
    }
  }
}

export { State, IdleState, DrawMousedownState, DrawMousemoveState, SVGLayerSelectionMouseDownState, SVGLayerSelectionMouseMoveState, SVGLayerBackgroundMouseDownState };