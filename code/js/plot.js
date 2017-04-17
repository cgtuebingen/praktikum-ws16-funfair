function getXY(element) {

  var top = 0, left = 0;
  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    y: top,
    x: left
  };
}


function Plot(canvas, Xbox, Ybox) {

  this.w = canvas.width - 2 * this.pad;
  this.h = canvas.height - 2 * this.pad;

  this.canvas = canvas;

  this._data = [];
  this._event = {
    click: []
  };

  this.ctx = canvas.getContext("2d");
  this.ctx.translate(this.pad, this.pad);

  if (Xbox !== undefined && Ybox !== undefined) {

    var minX = typeof Xbox === 'number' ? 0 : Xbox[0];
    var maxX = typeof Xbox === 'number' ? Xbox : Xbox[1];
    var minY = typeof Ybox === 'number' ? 0 : Ybox[0];
    var maxY = typeof Ybox === 'number' ? Ybox : Ybox[1];

    this.resX = this.w / (maxX - minX);
    this.resY = this.h / (maxY - minY);

    this.x = this.w / (2 * this.resX) + minX;
    this.y = this.h / (2 * this.resY) + minY;
  }

  var self = this;

  canvas.addEventListener('click', function(ev) {

    var _cb = self._event.click;

    if (_cb.length > 0) {

      var can = getXY(canvas);

      var data = {
        type: 'click',
        x: self.x + (ev.pageX - can.x - self.pad - self.w / 2) / self.resX,
        y: self.y - (ev.pageY - can.y - self.pad - self.h / 2) / self.resY
      };

      for (var i = 0; i < _cb.length; i++) {
        _cb[i].call(self, data);
      }
    }

  });
}

Plot.prototype = {
  w: 0, // Screen width
  h: 0, // Screen height
  x: 0, // Center point
  y: 0, // Center point
  ctx: null,
  canvas: null,
  resX: 30, // 10px = 1unit
  resY: 30,
  pad: 20.5,

  _data: null,
  _event: null,

  setFeatures: function(ft) {

    ft = ft.split(",");

    var self = this;
    var drag = {active: 0, cx: 0, cy: 0, px: 0, py: 0, sx: 0, sy: 0};
    var select = {active: 0, cx: 0, cy: 0, w: 0, h: 0, sx: 0, sy: 0};

    for (var i = 0; i < ft.length; i++) {

      switch (ft[i]) {

        case 'drag': {

          self.canvas.style.cursor = "move";

          this.canvas.addEventListener('mousedown', function(ev) {

            var can = getXY(self.canvas);

            // Screen offset of canvas
            drag.sx = can.x;
            drag.sy = can.y;

            // Click position on canvas
            drag.cx = ev.pageX - can.x;
            drag.cy = ev.pageY - can.y;

            // Previous x/y of coordinate frame
            drag.px = self.x;
            drag.py = self.y;
            drag.active = true;
          }, false);

          document.addEventListener('mouseup', function(ev) {
            drag.active = false;
          }, false);

          document.addEventListener('mousemove', function(ev) {

            if (drag.active && !select.active) {
              self.x = drag.px - (ev.pageX - drag.sx - drag.cx) / self.resX;
              self.y = drag.py + (ev.pageY - drag.sy - drag.cy) / self.resY;
              self.draw();
            }
          }, false);

          break;
        }

        case 'grid': {
          this._data.push(['grid', true, 'black']);
          break;
        }

        case 'zoom': {


          break;
        }

        case 'select': {

          var $selStyle = document.getElementById('selector').style;

          document.addEventListener('keydown', function(ev) {
            if (ev.keyCode === 16) select.active |= 1;
          }, false);

          document.addEventListener('keyup', function(ev) {
            if (ev.keyCode === 16) select.active &= ~1;
          }, false);

          this.canvas.addEventListener('mousedown', function(ev) {

            if ((select.active & 1) === 0) return;

            select.active |= 2;

            var can = getXY(self.canvas);

            // Screen offset of canvas
            select.sx = can.x;
            select.sy = can.y;

            // Click position on canvas
            select.cx = ev.pageX - can.x;
            select.cy = ev.pageY - can.y;

            // Height/width
            select.w = 0;
            select.h = 0;

            $selStyle.left = (select.cx + select.sx) + "px";
            $selStyle.top = (select.cy + select.sy) + "px";
            $selStyle.width = select.w + "px";
            $selStyle.height = select.h + "px";
            $selStyle.display = "block";

          }, false);

          document.addEventListener('mouseup', function(ev) {

            if (select.active === 3) {

              self.x -= (self.w + select.w + 2 * (self.pad + select.sx - ev.pageX)) / (2 * self.resX);
              self.y = (self.h + select.h + 2 * (self.pad + select.sy - ev.pageY + self.resY * self.y)) / (2 * self.resY);

              self.resX = self.w * self.resX / select.w;
              self.resY = self.h * self.resY / select.h;

              self.draw();

              /* Original derivation:

               var x = (ev.pageX - select.sx - self.pad - self.w / 2) / self.resX + self.x;
               var y = -(ev.pageY - select.sy - self.pad - self.h / 2) / self.resY + self.y;

               var minX = x - select.w / self.resX;
               var maxX = x;
               var minY = y;
               var maxY = y + select.h / self.resY;

               self.resX = self.w / (maxX - minX);
               self.resY = self.h / (maxY - minY);

               self.x = (self.w / 2) / self.resX + minX;
               self.y = (self.h / 2) / self.resY + minY;
               */
            }

            select.active &= ~2;
            $selStyle.display = "none";

          }, false);

          document.addEventListener('mousemove', function(ev) {

            if (select.active === 3) {
              select.w = Math.max(0, ev.pageX - select.sx - select.cx);
              select.h = Math.max(0, ev.pageY - select.sy - select.cy);
              $selStyle.width = select.w + "px";
              $selStyle.height = select.h + "px";
            }
          }, false);


          break;
        }

        default:


      }
    }
  },

  func: function(fn, color) {
    this._data.push(['fn', fn, color]);

    return this._data.length - 1;
  },

  gaussian: function(mu, sigma, color) {

    var normalize = 1 / (sigma * Math.sqrt(2 * Math.PI));
    var sigma2 = sigma * sigma;

    this.func(function(x) {
      return normalize * Math.exp(-(x - mu) * (x - mu) / (2 * sigma2));
    }, color);

    return this._data.length - 1;
  },

  line: function(data, color) {
    this._data.push(['line', data, color]);
    return this._data.length - 1;
  },

  arrow: function(data, color) {
    this._data.push(['arrow', data, color]);
    return this._data.length - 1;
  },

  points: function(data, color) {
    this._data.push(['points', data, color]);
    return this._data.length - 1;
  },

  annotate: function(data, color) {
    // arrow + label to x,y coord
  },

  addPoint: function(ndx, pt, follow) {

    this._data[ndx][1].push(pt);

    /*
     if (follow) {
     this.x+= ...
     this.y+= ...
     }
     */
  },


  on: function(type, fn) {

    if (fn instanceof Function) {

      if (this._event[type] !== undefined) {
        this._event[type].push(fn);
      } else {
        throw new Error('on:click Type ' + type + ' not known');
      }

    } else {
      throw new Error('on:click Not a function');
    }
  },


  draw: function() {

    var ctx = this.ctx;

    var resX = this.resX;
    var resY = this.resY;

    // mid point
    var mx = this.w / 2 - this.x * resX;
    var my = this.h / 2 + this.y * resY;

    var minX = this.x - this.w / (resX + resX);
    var maxX = this.x + this.w / (resX + resX);

    var minY = this.y - this.h / (resY + resY);
    var maxY = this.y + this.h / (resY + resY);

    ctx.clearRect(-this.pad, -this.pad, this.w + this.pad * 2, this.h + this.pad * 2);

    for (var K = 0; K < this._data.length; K++) {

      var cur = this._data[K];
      var color = cur[2];

      ctx.strokeStyle = color || "grey";
      ctx.fillStyle = color || "grey";

      switch (cur[0]) {

        case 'fn': {

          var f = cur[1];
          var x = minX;
          var dx = 2 / resX;

          ctx.beginPath();
          ctx.moveTo(x * resX + mx, -f(x) * resY + my);

          do {
            x += dx;
            ctx.lineTo(x * resX + mx, -f(x) * resY + my);
          } while (x < maxX);
          ctx.stroke();

          break;
        }

        case 'grid': {

          ctx.beginPath();
          ctx.moveTo(0, my);
          ctx.lineTo(this.w, my);

          ctx.moveTo(mx, 0);
          ctx.lineTo(mx, this.h);

          // Horizontal
          for (var i = Math.floor(minX); i <= maxX; i++) {

            if (i == 0) continue;

            ctx.moveTo(i * resX + mx, my - 3);
            ctx.lineTo(i * resX + mx, my + 3);

            ctx.fillText(i, i * resX + mx - 5, my + 13);
          }

          // Vertical
          for (var i = Math.floor(minY); i <= maxY; i++) {

            if (i == 0) continue;

            ctx.moveTo(mx - 3, -i * resY + my);
            ctx.lineTo(mx + 3, -i * resY + my);

            ctx.fillText(i, mx - 15, -i * resY + my);
          }

          ctx.stroke();

          break;
        }

        case 'timeseries': {

          var d = cur[1];

          ctx.beginPath();

          ctx.moveTo(0 * resX + mx, -d[0] * resY + my);
          for (var i = 1; i < d.length; i++) {
            ctx.lineTo(i * resX + mx, -d[i] * resY + my);
          }
          ctx.stroke();
          break;
        }

        case 'arrow': {

          var d = cur[1];
          var dx = d.x2 - d.x1;
          var dy = d.y2 - d.y1;

          var r = 10 / Math.max(resX, resY);
          var l = Math.sqrt(dx * dx + dy * dy);

          var cosAtan = dx / l;
          var sinAtan = dy / l;
          var cosPi6 = 0.8660254037844386; // pi/6=30° angle
          var sinPi6 = 0.5;

          var ax = d.x2;
          var ay = d.y2;

          var bx = ax - (cosAtan * cosPi6 - sinAtan * sinPi6) * r;
          var by = ay - (sinAtan * cosPi6 + cosAtan * sinPi6) * r;

          var cx = ax - (cosAtan * cosPi6 + sinAtan * sinPi6) * r;
          var cy = ay - (sinAtan * cosPi6 - cosAtan * sinPi6) * r;

          /* Derivation
           var alpha = Math.atan2(d.y2 - d.y1, d.x2 - d.x1);

           var theta = 1 / 6 * Math.PI;
           var r = 10 / Math.max(resX, resY);

           var ax = d.x2;
           var ay = d.y2;

           var bx = ax - Math.cos(alpha + theta) * r;
           var by = ay - Math.sin(alpha + theta) * r;

           var cx = ax - Math.cos(alpha - theta) * r;
           var cy = ay - Math.sin(alpha - theta) * r;
           */

          ctx.beginPath();
          ctx.moveTo(ax * resX + mx, -ay * resY + my);
          ctx.lineTo(bx * resX + mx, -by * resY + my);
          ctx.lineTo(cx * resX + mx, -cy * resY + my);
          ctx.closePath();

          ctx.fill();
        }
        // fall and draw the line

        case 'line': {

          var d = cur[1];

          ctx.beginPath();

          ctx.moveTo(d.x1 * resX + mx, -d.y1 * resY + my);
          ctx.lineTo(d.x2 * resX + mx, -d.y2 * resY + my);
          ctx.stroke();
          break;
        }

        case 'points': {

          var data = cur[1];

          ctx.beginPath();

          for (var i = 0; i < data.length; i++) {

            var p = 1;
            var x = 0, y = 0;
            var c = data[i];

            if (typeof c === "number") {
              x = c;
              y = 0;
            } else if (c.x !== undefined) {
              x = c.x;
              y = c.y;
            } else if (c[0] !== undefined) {
              x = c[0];
              y = c[1];
            }

            ctx.moveTo(x * resX + mx - p, -y * resY + my - p);
            ctx.lineTo(x * resX + mx + p, -y * resY + my + p);

            ctx.moveTo(x * resX + mx - p, -y * resY + my + p);
            ctx.lineTo(x * resX + mx + p, -y * resY + my - p);
          }
          ctx.stroke();

          break;
        }

      }


    }


  }


};
