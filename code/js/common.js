

(function (window) {

  var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    (function () {

      var timeLast = 0;

      return function (cb) {
        var timeCurrent = Date.now();

        var timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));

        timeLast = timeCurrent + timeDelta;

        return setTimeout(function () {
          cb(timeCurrent + timeDelta);
        }, timeDelta);
      };

    })();

  function $(selector) {
    return new $.prototype.init(selector);
  }

  $.fn = $.prototype = {
    constructor: $,
    init: function (selector) {

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
        this[ 0 ] = selector;
        this.length = 1;
        return this;
      }
      alert("wrong selector");
    },
    on: function (type, fn) {
      for (var i = 0; i < this.length; i++) {
        this[i].addEventListener(type, fn, false);
      }
    },
    getContext: function (kind) {
      return this[0].getContext(kind);
    },
    offset: function () {

      var docElem, win, rect, doc,
              elem = this[ 0 ];

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

  requestAnimationFrame(loop = function (time) {

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

  $.animate = animate;
  $.stopAnimtate = stopAnimate;

  window.$ = $;

})(this);
