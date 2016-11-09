

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

  window['animate'] = animate;
  window['stopAnimate'] = stopAnimate;

})(this);
