var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cw = c.width = window.innerWidth;
var ch = c.height = window.innerHeight;
var cX = cw / 2,
  cY = ch / 2;
var rad = Math.PI / 180;
var R = 50;
var r = 45;
var ro = 35;
var r1 = 28;
var r2 = 20;
var ang, ci = 0,
  cj = 0;
//angle increment
var increment = 1.5;
var speed = .1;
var rad = (Math.PI / 180);
var p = [];
var stopped = true;

function buildRy() {
  var C = 0;

  cw = c.width = window.innerWidth;
  ch = c.height = window.innerHeight;

  for (var i = 0; i < cw; i += R * 2) {
    ci += 1;
    console.log(ci)
    for (var j = 0; j < ch; j += R * 2) {
      cj += 1;
      console.log(cj)
      if (ci % 2 == 1 && cj % 2 == 0) {
        ang = 45 * rad;
      } else if (ci % 2 == 0 && cj % 2 == 0) {
        ang = 135 * rad;
      } else if (ci % 2 == 0 && cj % 2 == 1) {
        ang = 225 * rad;

      } else {
        ang = 315 * rad;
      }
      p[C] = {
        moveToX: i + R + r,
        moveToY: j + R,
        Cx: i + R,
        Cy: j + R,
        a: ang

      };
      C++;
    }
  }
  return p;
}

function Draw() {
  ctx.clearRect(0, 0, cw, ch);
  for (var k = 0; k < p.length; k++) {
    p[k].a += speed
    ctx.fillStyle = "#CDCD09";
    ctx.beginPath();
    ctx.moveTo(p[k].moveToX, p[k].moveToY);
    ctx.arc(p[k].Cx, p[k].Cy, r, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    var cx = p[k].Cx + (r - ro) * Math.cos(p[k].a)
    var cy = p[k].Cy + (r - ro) * Math.sin(p[k].a)
    ctx.arc(cx, cy, ro, 0, 2 * Math.PI);
    ctx.fillStyle = "#CC6405";
    ctx.fill();
    ctx.beginPath();
    var cx = p[k].Cx + (r - r1) * Math.cos(p[k].a)
    var cy = p[k].Cy + (r - r1) * Math.sin(p[k].a)
    ctx.arc(cx, cy, r1, 0, 2 * Math.PI);
    ctx.fillStyle = "#9C3800";
    ctx.fill();
    ctx.beginPath();
    var cx = p[k].Cx + (r - r2) * Math.cos(p[k].a)
    var cy = p[k].Cy + (r - r2) * Math.sin(p[k].a)
    ctx.arc(cx, cy, r2, 0, 2 * Math.PI);
    ctx.fillStyle = "#350302";
    ctx.fill();

  }

}

function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}

function getAngle(Cx, Cy, x, y) {
  var X = x - Cx;
  var Y = y - Cy;

  var a = Math.atan2(Y, X);

  return a;
}

window.addEventListener("load", function() {
  buildRy();
  Draw();
}, false);
window.addEventListener("resize", function() {
  buildRy();
  Draw();
}, false);

c.addEventListener("mousemove", function(evt) {
  buildRy();
  var o = oMousePos(c, evt);
  for (var m = 0; m < p.length; m++) {

    p[m].a = getAngle(p[m].Cx, p[m].Cy, o.x, o.y);
  }
  Draw();
}, false);
