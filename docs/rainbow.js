/* 2025-04-15 ebb: Credits: This JavaScript is adapted from Jefferson Lam's Rainbow Mouse Trail CodePen at https://codepen.io/jeffersonlam/pen/NqrWeL
* It is updated on with help from ChatGPT to function as a separate JavaScript file
 * and to properly handle event listeners and functions.  */
'use strict';

// mouseTrail.js
'use strict';

/* ebb: A JS Class is something we can re-usa for other events.
* The numbers provided are defaults to be used
* if we don't set our customized values when we initiate the JS.
* Notice how it puts boe */
class Trail {
  constructor(options) {
    this.size = options.size || 50;
    this.trailLength = options.trailLength || 20;
    this.interval = options.interval || 15;
    this.hueSpeed = options.hueSpeed || 6;

    this.boxes = [];
    this.hue = 0;
    this.mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
  }

  init() {
    for (let i = 0; i < this.trailLength; i++) {
      const box = document.createElement('div');
      box.className = 'box';
      box.style.width = this.size + 'px';
      box.style.height = this.size + 'px';
      document.body.appendChild(box);
      this.boxes.push(box);
    }

    // Update trail boxes periodically
    setInterval(() => {
      this.updateHue();
      this.updateBoxes();
    }, this.interval);

    // Attach mousemove event
    document.addEventListener('mousemove', (event) => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
    });
  }

  updateHue() {
    this.hue = (this.hue + this.hueSpeed) % 360;
  }

  updateBoxes() {
    for (let i = 0; i < this.boxes.length; i++) {
      if (i + 1 === this.boxes.length) {
        this.boxes[i].style.top = this.mouse.y - this.size / 2 + 'px';
        this.boxes[i].style.left = this.mouse.x - this.size / 2 + 'px';
        this.boxes[i].style.backgroundColor = `hsl(${this.hue}, 90%, 50%)`;
      } else {
        this.boxes[i].style.top = this.boxes[i + 1].style.top;
        this.boxes[i].style.left = this.boxes[i + 1].style.left;
        this.boxes[i].style.backgroundColor = this.boxes[i + 1].style.backgroundColor;
      }
    }
  }
}

/* ebb: This initiates the JS on the page when it loads in the browser, and sets
* the constants for the length + size of the mousetrail boxes.
* It makes a new Trail defined by the class Trail above,
* which essentially loads the options you set here and invokes them on "this", which is
* the HTML element that the user is interacting with now.
* Then it fires the init() function up on line 24. */
window.addEventListener('DOMContentLoaded', () => {
  const options = {
    trailLength: 30,
    size: 5,
    interval: 10,
    hueSpeed: 2
  };
  const trail = new Trail(options);
  trail.init();
});      

