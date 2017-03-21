(function(window) {

  var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    (function() {

      var timeLast = 0;

      return function(cb) {
        var timeCurrent = Date.now();

        var timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));

        timeLast = timeCurrent + timeDelta;

        return setTimeout(function() {
          cb(timeCurrent + timeDelta);
        }, timeDelta);
      };

    })();

  function $(selector) {
    return new $.prototype.init(selector);
  }

  $.fn = $.prototype = {
    constructor: $,
    init: function(selector) {

      if (typeof selector === "string") {

        if (selector.charAt(0) === '#') {

          this[0] = document.getElementById(selector.slice(1));
          this.length = 1;
          return this;

        } else if (selector.charAt(0) === '.') {

          var elms = document.getElementsByClassName(selector.slice(1));

          for (var i = 0; i < elms.length; i++) {
            this[i] = elms[i];
          }
          this.length = elms.length;
          return this;
        }

      } else if (selector.nodeType) {
        this[0] = selector;
        this.length = 1;
        return this;
      }
      alert("wrong selector");
    },
    on: function(type, fn) {
      for (var i = 0; i < this.length; i++) {
        this[i].addEventListener(type, fn, false);
      }
    },
    getContext: function(kind) {
      return this[0].getContext(kind);
    },
    offset: function() {

      var docElem, win, rect, doc,
        elem = this[0];

      if (!elem) {
        return;
      }

      rect = elem.getBoundingClientRect();

      // Make sure element is not hidden (display: none)
      if (rect.width || rect.height) {
        doc = elem.ownerDocument;
        win = doc != null && doc === doc.window ? doc : doc.nodeType === 9 && doc.defaultView;
        docElem = doc.documentElement;

        return {
          top: rect.top + win.pageYOffset - docElem.clientTop,
          left: rect.left + win.pageXOffset - docElem.clientLeft
        };
      }

      // Return zeros for disconnected and hidden elements (gh-2310)
      return rect;
    }
  };
  $.fn.init.prototype = $.prototype;


  var animations = {};
  var now = -1, loop;

  function animate(name, fn, time) {

    if (time && !now)
      throw "Frag Robert[0] ;)";

    animations[name] = {fn: fn, time: time, start: now};
  }

  function stopAnimate(name) {

    delete animations[name];
  }

  function countdown(text) {
    var n = 3;

    function loop() {

      displayText(n);
      if (n == 0) {
        displayText(text);
        window.setTimeout(function() {
          displayText("");
        }, 1000);
        return;
      }
      n--;
      window.setTimeout(loop, 1000);
    }

    loop();
  }

  function displayText(text) {
    var id = document.getElementById("overlay");
    id.innerHTML = text;
  }

  requestAnimationFrame(loop = function(time) {

    now = time;

    for (var i in animations) {

      var a = animations[i];

      if (a['time']) {

        var pos = (time - a['start']) / a['time'];

        if (pos >= 1) {
          pos = 1;
          stopAnimate(i);
        }
        a['fn'](pos);

      } else {
        a['fn']();
      }
    }

    requestAnimationFrame(loop);
  });

  function Indicator(id) {

    var indic = document.getElementById(id);
    var ictx = indic.getContext("2d");

    indic.width = 50;
    indic.height = 400;

    ictx.translate(0.5, 0.5);

    this.ctx = ictx;
  }

  Indicator.SENSE = 10;

  Indicator.prototype = {
    draw: function() {

      var ictx = this.ctx;

      ictx.clearRect(0, 0, 50, 400);

      ictx.fillStyle = "#0c0";
      ictx.fillRect(20, 2 + Math.max(0, 396 * 0.5 * (1 - this.value)), 10, Math.max(0, 396 * 0.5 * this.value));
      ictx.fillStyle = "#c00";
      ictx.fillRect(20, 2 + 396 * 0.5, 10, Math.max(0, -396 * 0.5 * this.value));
      ictx.strokeRect(20, 2, 10, 396);
      ictx.beginPath();
      ictx.moveTo(6, 2 + 396 * 0.5);
      ictx.lineTo(44, 2 + 396 * 0.5);
      ictx.stroke();
      return this;
    },

    addValue: function(val) {

      this.value = Math.max(-1, Math.min(1, this.value + val / Indicator.SENSE));
      return this;
    },
    value: 0
  };


  $.animate = animate;
  $.stopAnimtate = stopAnimate;
  $.displayText = displayText;
  $.countdown = countdown;
  $.Indicator = Indicator;

  window.$ = $;

})(this);
