var e =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof self !== "undefined"
    ? self
    : global;
var r = {};
(function (e, t) {
  r = t();
})(0, function () {
  var r = function isPreviewableImage(e) {
    return /^image/.test(e.type);
  };
  function _AwaitValue(r) {
    (this || e).wrapped = r;
  }
  function _AsyncGenerator(r) {
    var t, a;
    function send(e, r) {
      return new Promise(function (i, n) {
        var o = { key: e, arg: r, resolve: i, reject: n, next: null };
        if (a) a = a.next = o;
        else {
          t = a = o;
          resume(e, r);
        }
      });
    }
    function resume(e, t) {
      try {
        var a = r[e](t);
        var i = a.value;
        var n = i instanceof _AwaitValue;
        Promise.resolve(n ? i.wrapped : i).then(
          function (e) {
            n ? resume("next", e) : settle(a.done ? "return" : "normal", e);
          },
          function (e) {
            resume("throw", e);
          }
        );
      } catch (e) {
        settle("throw", e);
      }
    }
    function settle(e, r) {
      switch (e) {
        case "return":
          t.resolve({ value: r, done: true });
          break;
        case "throw":
          t.reject(r);
          break;
        default:
          t.resolve({ value: r, done: false });
          break;
      }
      t = t.next;
      t ? resume(t.key, t.arg) : (a = null);
    }
    (this || e)._invoke = send;
    typeof r.return !== "function" && ((this || e).return = void 0);
  }
  typeof Symbol === "function" &&
    Symbol.asyncIterator &&
    (_AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this || e;
    });
  _AsyncGenerator.prototype.next = function (e) {
    return this._invoke("next", e);
  };
  _AsyncGenerator.prototype.throw = function (e) {
    return this._invoke("throw", e);
  };
  _AsyncGenerator.prototype.return = function (e) {
    return this._invoke("return", e);
  };
  function _slicedToArray(e, r) {
    return (
      _arrayWithHoles(e) || _iterableToArrayLimit(e, r) || _nonIterableRest()
    );
  }
  function _arrayWithHoles(e) {
    if (Array.isArray(e)) return e;
  }
  function _iterableToArrayLimit(e, r) {
    var t = [];
    var a = true;
    var i = false;
    var n = void 0;
    try {
      for (
        var o, c = e[Symbol.iterator]();
        !(a = (o = c.next()).done);
        a = true
      ) {
        t.push(o.value);
        if (r && t.length === r) break;
      }
    } catch (e) {
      i = true;
      n = e;
    } finally {
      try {
        a || c.return == null || c.return();
      } finally {
        if (i) throw n;
      }
    }
    return t;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
  var t = function vectorMultiply(e, r) {
    return o(e.x * r, e.y * r);
  };
  var a = function vectorAdd(e, r) {
    return o(e.x + r.x, e.y + r.y);
  };
  var i = function vectorNormalize(e) {
    var r = Math.sqrt(e.x * e.x + e.y * e.y);
    return r === 0 ? { x: 0, y: 0 } : o(e.x / r, e.y / r);
  };
  var n = function vectorRotate(e, r, t) {
    var a = Math.cos(r);
    var i = Math.sin(r);
    var n = o(e.x - t.x, e.y - t.y);
    return o(t.x + a * n.x - i * n.y, t.y + i * n.x + a * n.y);
  };
  var o = function createVector() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return { x: e, y: r };
  };
  var c = function getMarkupValue(e, r) {
    var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    var a = arguments.length > 3 ? arguments[3] : void 0;
    return typeof e === "string"
      ? parseFloat(e) * t
      : typeof e === "number"
      ? e * (a ? r[a] : Math.min(r.width, r.height))
      : void 0;
  };
  var v = function getMarkupStyles(e, r, t) {
    var a = e.borderStyle || e.lineStyle || "solid";
    var i = e.backgroundColor || e.fontColor || "transparent";
    var n = e.borderColor || e.lineColor || "transparent";
    var o = c(e.borderWidth || e.lineWidth, r, t);
    var v = e.lineCap || "round";
    var s = e.lineJoin || "round";
    var u =
      typeof a === "string"
        ? ""
        : a
            .map(function (e) {
              return c(e, r, t);
            })
            .join(",");
    var l = e.opacity || 1;
    return {
      "stroke-linecap": v,
      "stroke-linejoin": s,
      "stroke-width": o || 0,
      "stroke-dasharray": u,
      stroke: n,
      fill: i,
      opacity: l,
    };
  };
  var s = function isDefined(e) {
    return e != null;
  };
  var u = function getMarkupRect(e, r) {
    var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    var a = c(e.x, r, t, "width") || c(e.left, r, t, "width");
    var i = c(e.y, r, t, "height") || c(e.top, r, t, "height");
    var n = c(e.width, r, t, "width");
    var o = c(e.height, r, t, "height");
    var v = c(e.right, r, t, "width");
    var u = c(e.bottom, r, t, "height");
    s(i) || (i = s(o) && s(u) ? r.height - o - u : u);
    s(a) || (a = s(n) && s(v) ? r.width - n - v : v);
    s(n) || (n = s(a) && s(v) ? r.width - a - v : 0);
    s(o) || (o = s(i) && s(u) ? r.height - i - u : 0);
    return { x: a || 0, y: i || 0, width: n || 0, height: o || 0 };
  };
  var l = function pointsToPathShape(e) {
    return e
      .map(function (e, r) {
        return ""
          .concat(r === 0 ? "M" : "L", " ")
          .concat(e.x, " ")
          .concat(e.y);
      })
      .join(" ");
  };
  var h = function setAttributes(e, r) {
    return Object.keys(r).forEach(function (t) {
      return e.setAttribute(t, r[t]);
    });
  };
  var d = "http://www.w3.org/2000/svg";
  var f = function svg(e, r) {
    var t = document.createElementNS(d, e);
    r && h(t, r);
    return t;
  };
  var p = function updateRect(e) {
    return h(e, Object.assign({}, e.rect, e.styles));
  };
  var g = function updateEllipse(e) {
    var r = e.rect.x + e.rect.width * 0.5;
    var t = e.rect.y + e.rect.height * 0.5;
    var a = e.rect.width * 0.5;
    var i = e.rect.height * 0.5;
    return h(e, Object.assign({ cx: r, cy: t, rx: a, ry: i }, e.styles));
  };
  var m = { contain: "xMidYMid meet", cover: "xMidYMid slice" };
  var y = function updateImage(e, r) {
    h(
      e,
      Object.assign({}, e.rect, e.styles, {
        preserveAspectRatio: m[r.fit] || "none",
      })
    );
  };
  var w = { left: "start", center: "middle", right: "end" };
  var E = function updateText(e, r, t, a) {
    var i = c(r.fontSize, t, a);
    var n = r.fontFamily || "sans-serif";
    var o = r.fontWeight || "normal";
    var v = w[r.textAlign] || "start";
    h(
      e,
      Object.assign({}, e.rect, e.styles, {
        "stroke-width": 0,
        "font-weight": o,
        "font-size": i,
        "font-family": n,
        "text-anchor": v,
      })
    );
    if (e.text !== r.text) {
      e.text = r.text;
      e.textContent = r.text.length ? r.text : " ";
    }
  };
  var I = function updateLine(e, r, o, v) {
    h(e, Object.assign({}, e.rect, e.styles, { fill: "none" }));
    var s = e.childNodes[0];
    var u = e.childNodes[1];
    var l = e.childNodes[2];
    var d = e.rect;
    var f = { x: e.rect.x + e.rect.width, y: e.rect.y + e.rect.height };
    h(s, { x1: d.x, y1: d.y, x2: f.x, y2: f.y });
    if (r.lineDecoration) {
      u.style.display = "none";
      l.style.display = "none";
      var p = i({ x: f.x - d.x, y: f.y - d.y });
      var g = c(0.05, o, v);
      if (r.lineDecoration.indexOf("arrow-begin") !== -1) {
        var m = t(p, g);
        var y = a(d, m);
        var w = n(d, 2, y);
        var E = n(d, -2, y);
        h(u, {
          style: "display:block;",
          d: "M"
            .concat(w.x, ",")
            .concat(w.y, " L")
            .concat(d.x, ",")
            .concat(d.y, " L")
            .concat(E.x, ",")
            .concat(E.y),
        });
      }
      if (r.lineDecoration.indexOf("arrow-end") !== -1) {
        var I = t(p, -g);
        var M = a(f, I);
        var x = n(f, 2, M);
        var T = n(f, -2, M);
        h(l, {
          style: "display:block;",
          d: "M"
            .concat(x.x, ",")
            .concat(x.y, " L")
            .concat(f.x, ",")
            .concat(f.y, " L")
            .concat(T.x, ",")
            .concat(T.y),
        });
      }
    }
  };
  var M = function updatePath(e, r, t, a) {
    h(
      e,
      Object.assign({}, e.styles, {
        fill: "none",
        d: l(
          r.points.map(function (e) {
            return { x: c(e.x, t, a, "width"), y: c(e.y, t, a, "height") };
          })
        ),
      })
    );
  };
  var x = function createShape(e) {
    return function (r) {
      return f(e, { id: r.id });
    };
  };
  var T = function createImage(e) {
    var r = f("image", {
      id: e.id,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      opacity: "0",
    });
    r.onload = function () {
      r.setAttribute("opacity", e.opacity || 1);
    };
    r.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e.src);
    return r;
  };
  var A = function createLine(e) {
    var r = f("g", {
      id: e.id,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    });
    var t = f("line");
    r.appendChild(t);
    var a = f("path");
    r.appendChild(a);
    var i = f("path");
    r.appendChild(i);
    return r;
  };
  var R = {
    image: T,
    rect: x("rect"),
    ellipse: x("ellipse"),
    text: x("text"),
    path: x("path"),
    line: A,
  };
  var C = { rect: p, ellipse: g, image: y, text: E, path: M, line: I };
  var k = function createMarkupByType(e, r) {
    return R[e](r);
  };
  var P = function updateMarkupByType(e, r, t, a, i) {
    r !== "path" && (e.rect = u(t, a, i));
    e.styles = v(t, a, i);
    C[r](e, t, a, i);
  };
  var D = ["x", "y", "left", "top", "right", "bottom", "width", "height"];
  var V = function toOptionalFraction(e) {
    return typeof e === "string" && /%/.test(e) ? parseFloat(e) / 100 : e;
  };
  var G = function prepareMarkup(e) {
    var r = _slicedToArray(e, 2),
      t = r[0],
      a = r[1];
    var i = a.points
      ? {}
      : D.reduce(function (e, r) {
          e[r] = V(a[r]);
          return e;
        }, {});
    return [t, Object.assign({ zIndex: 0 }, a, i)];
  };
  var b = function sortMarkupByZIndex(e, r) {
    return e[1].zIndex > r[1].zIndex ? 1 : e[1].zIndex < r[1].zIndex ? -1 : 0;
  };
  var O = function createMarkupView(e) {
    return e.utils.createView({
      name: "image-preview-markup",
      tag: "svg",
      ignoreRect: true,
      mixins: {
        apis: ["width", "height", "crop", "markup", "resize", "dirty"],
      },
      write: function write(e) {
        var r = e.root,
          t = e.props;
        if (t.dirty) {
          var a = t.crop,
            i = t.resize,
            n = t.markup;
          var o = t.width;
          var c = t.height;
          var v = a.width;
          var s = a.height;
          if (i) {
            var u = i.size;
            var l = u && u.width;
            var h = u && u.height;
            var d = i.mode;
            var f = i.upscale;
            l && !h && (h = l);
            h && !l && (l = h);
            var p = v < l && s < h;
            if (!p || (p && f)) {
              var g = l / v;
              var m = h / s;
              if (d === "force") {
                v = l;
                s = h;
              } else {
                var y;
                d === "cover"
                  ? (y = Math.max(g, m))
                  : d === "contain" && (y = Math.min(g, m));
                v *= y;
                s *= y;
              }
            }
          }
          var w = { width: o, height: c };
          r.element.setAttribute("width", w.width);
          r.element.setAttribute("height", w.height);
          var E = Math.min(o / v, c / s);
          r.element.innerHTML = "";
          var I = r.query("GET_IMAGE_PREVIEW_MARKUP_FILTER");
          n.filter(I)
            .map(G)
            .sort(b)
            .forEach(function (e) {
              var t = _slicedToArray(e, 2),
                a = t[0],
                i = t[1];
              var n = k(a, i);
              P(n, a, i, w, E);
              r.element.appendChild(n);
            });
        }
      },
    });
  };
  var S = function createVector(e, r) {
    return { x: e, y: r };
  };
  var L = function vectorDot(e, r) {
    return e.x * r.x + e.y * r.y;
  };
  var W = function vectorSubtract(e, r) {
    return S(e.x - r.x, e.y - r.y);
  };
  var N = function vectorDistanceSquared(e, r) {
    return L(W(e, r), W(e, r));
  };
  var z = function vectorDistance(e, r) {
    return Math.sqrt(N(e, r));
  };
  var H = function getOffsetPointOnEdge(e, r) {
    var t = e;
    var a = 1.5707963267948966;
    var i = r;
    var n = 1.5707963267948966 - r;
    var o = Math.sin(a);
    var c = Math.sin(i);
    var v = Math.sin(n);
    var s = Math.cos(n);
    var u = t / o;
    var l = u * c;
    var h = u * v;
    return S(s * l, s * h);
  };
  var F = function getRotatedRectSize(e, r) {
    var t = e.width;
    var a = e.height;
    var i = H(t, r);
    var n = H(a, r);
    var o = S(e.x + Math.abs(i.x), e.y - Math.abs(i.y));
    var c = S(e.x + e.width + Math.abs(n.y), e.y + Math.abs(n.x));
    var v = S(e.x - Math.abs(n.y), e.y + e.height - Math.abs(n.x));
    return { width: z(o, c), height: z(o, v) };
  };
  var q = function calculateCanvasSize(e, r) {
    var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    var a = e.height / e.width;
    var i = 1;
    var n = r;
    var o = 1;
    var c = a;
    if (c > n) {
      c = n;
      o = c / a;
    }
    var v = Math.max(i / o, n / c);
    var s = e.width / (t * v * o);
    var u = s * r;
    return { width: s, height: u };
  };
  var U = function getImageRectZoomFactor(e, r, t, a) {
    var i = a.x > 0.5 ? 1 - a.x : a.x;
    var n = a.y > 0.5 ? 1 - a.y : a.y;
    var o = i * 2 * e.width;
    var c = n * 2 * e.height;
    var v = F(r, t);
    return Math.max(v.width / o, v.height / c);
  };
  var Y = function getCenteredCropRect(e, r) {
    var t = e.width;
    var a = t * r;
    if (a > e.height) {
      a = e.height;
      t = a / r;
    }
    var i = 0.5 * (e.width - t);
    var n = 0.5 * (e.height - a);
    return { x: i, y: n, width: t, height: a };
  };
  var X = function getCurrentCropSize(e) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var t = r.zoom,
      a = r.rotation,
      i = r.center,
      n = r.aspectRatio;
    n || (n = e.height / e.width);
    var o = q(e, n, t);
    var c = { x: o.width * 0.5, y: o.height * 0.5 };
    var v = { x: 0, y: 0, width: o.width, height: o.height, center: c };
    var s = typeof r.scaleToFit === "undefined" || r.scaleToFit;
    var u = U(e, Y(v, n), a, s ? i : { x: 0.5, y: 0.5 });
    var l = t * u;
    return {
      widthFloat: o.width / l,
      heightFloat: o.height / l,
      width: Math.round(o.width / l),
      height: Math.round(o.height / l),
    };
  };
  var B = { type: "spring", stiffness: 0.5, damping: 0.45, mass: 10 };
  var j = function createBitmapView(e) {
    return e.utils.createView({
      name: "image-bitmap",
      ignoreRect: true,
      mixins: { styles: ["scaleX", "scaleY"] },
      create: function create(e) {
        var r = e.root,
          t = e.props;
        r.appendChild(t.image);
      },
    });
  };
  var Z = function createImageCanvasWrapper(e) {
    return e.utils.createView({
      name: "image-canvas-wrapper",
      tag: "div",
      ignoreRect: true,
      mixins: {
        apis: ["crop", "width", "height"],
        styles: [
          "originX",
          "originY",
          "translateX",
          "translateY",
          "scaleX",
          "scaleY",
          "rotateZ",
        ],
        animations: {
          originX: B,
          originY: B,
          scaleX: B,
          scaleY: B,
          translateX: B,
          translateY: B,
          rotateZ: B,
        },
      },
      create: function create(r) {
        var t = r.root,
          a = r.props;
        a.width = a.image.width;
        a.height = a.image.height;
        t.ref.bitmap = t.appendChildView(
          t.createChildView(j(e), { image: a.image })
        );
      },
      write: function write(e) {
        var r = e.root,
          t = e.props;
        var a = t.crop.flip;
        var i = r.ref.bitmap;
        i.scaleX = a.horizontal ? -1 : 1;
        i.scaleY = a.vertical ? -1 : 1;
      },
    });
  };
  var K = function createClipView(e) {
    return e.utils.createView({
      name: "image-clip",
      tag: "div",
      ignoreRect: true,
      mixins: {
        apis: [
          "crop",
          "markup",
          "resize",
          "width",
          "height",
          "dirty",
          "background",
        ],
        styles: ["width", "height", "opacity"],
        animations: { opacity: { type: "tween", duration: 250 } },
      },
      didWriteView: function didWriteView(e) {
        var r = e.root,
          t = e.props;
        t.background && (r.element.style.backgroundColor = t.background);
      },
      create: function create(r) {
        var t = r.root,
          a = r.props;
        t.ref.image = t.appendChildView(
          t.createChildView(Z(e), Object.assign({}, a))
        );
        t.ref.createMarkup = function () {
          t.ref.markup ||
            (t.ref.markup = t.appendChildView(
              t.createChildView(O(e), Object.assign({}, a))
            ));
        };
        t.ref.destroyMarkup = function () {
          if (t.ref.markup) {
            t.removeChildView(t.ref.markup);
            t.ref.markup = null;
          }
        };
        var i = t.query("GET_IMAGE_PREVIEW_TRANSPARENCY_INDICATOR");
        i !== null &&
          (t.element.dataset.transparencyIndicator =
            i === "grid" ? i : "color");
      },
      write: function write(e) {
        var r = e.root,
          t = e.props,
          a = e.shouldOptimize;
        var i = t.crop,
          n = t.markup,
          o = t.resize,
          c = t.dirty,
          v = t.width,
          s = t.height;
        r.ref.image.crop = i;
        var u = {
          x: 0,
          y: 0,
          width: v,
          height: s,
          center: { x: v * 0.5, y: s * 0.5 },
        };
        var l = { width: r.ref.image.width, height: r.ref.image.height };
        var h = { x: i.center.x * l.width, y: i.center.y * l.height };
        var d = {
          x: u.center.x - l.width * i.center.x,
          y: u.center.y - l.height * i.center.y,
        };
        var f = Math.PI * 2 + (i.rotation % (Math.PI * 2));
        var p = i.aspectRatio || l.height / l.width;
        var g = typeof i.scaleToFit === "undefined" || i.scaleToFit;
        var m = U(l, Y(u, p), f, g ? i.center : { x: 0.5, y: 0.5 });
        var y = i.zoom * m;
        if (n && n.length) {
          r.ref.createMarkup();
          r.ref.markup.width = v;
          r.ref.markup.height = s;
          r.ref.markup.resize = o;
          r.ref.markup.dirty = c;
          r.ref.markup.markup = n;
          r.ref.markup.crop = X(l, i);
        } else r.ref.markup && r.ref.destroyMarkup();
        var w = r.ref.image;
        if (a) {
          w.originX = null;
          w.originY = null;
          w.translateX = null;
          w.translateY = null;
          w.rotateZ = null;
          w.scaleX = null;
          w.scaleY = null;
        } else {
          w.originX = h.x;
          w.originY = h.y;
          w.translateX = d.x;
          w.translateY = d.y;
          w.rotateZ = f;
          w.scaleX = y;
          w.scaleY = y;
        }
      },
    });
  };
  var J = function createImageView(e) {
    return e.utils.createView({
      name: "image-preview",
      tag: "div",
      ignoreRect: true,
      mixins: {
        apis: ["image", "crop", "markup", "resize", "dirty", "background"],
        styles: ["translateY", "scaleX", "scaleY", "opacity"],
        animations: {
          scaleX: B,
          scaleY: B,
          translateY: B,
          opacity: { type: "tween", duration: 400 },
        },
      },
      create: function create(r) {
        var t = r.root,
          a = r.props;
        t.ref.clip = t.appendChildView(
          t.createChildView(K(e), {
            id: a.id,
            image: a.image,
            crop: a.crop,
            markup: a.markup,
            resize: a.resize,
            dirty: a.dirty,
            background: a.background,
          })
        );
      },
      write: function write(e) {
        var r = e.root,
          t = e.props,
          a = e.shouldOptimize;
        var i = r.ref.clip;
        var n = t.image,
          o = t.crop,
          c = t.markup,
          v = t.resize,
          s = t.dirty;
        i.crop = o;
        i.markup = c;
        i.resize = v;
        i.dirty = s;
        i.opacity = a ? 0 : 1;
        if (!a && !r.rect.element.hidden) {
          var u = n.height / n.width;
          var l = o.aspectRatio || u;
          var h = r.rect.inner.width;
          var d = r.rect.inner.height;
          var f = r.query("GET_IMAGE_PREVIEW_HEIGHT");
          var p = r.query("GET_IMAGE_PREVIEW_MIN_HEIGHT");
          var g = r.query("GET_IMAGE_PREVIEW_MAX_HEIGHT");
          var m = r.query("GET_PANEL_ASPECT_RATIO");
          var y = r.query("GET_ALLOW_MULTIPLE");
          if (m && !y) {
            f = h * m;
            l = m;
          }
          var w = f !== null ? f : Math.max(p, Math.min(h * l, g));
          var E = w / l;
          if (E > h) {
            E = h;
            w = E * l;
          }
          if (w > d) {
            w = d;
            E = d / l;
          }
          i.width = E;
          i.height = w;
        }
      },
    });
  };
  var Q =
    '<svg width="500" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">\n    <defs>\n        <radialGradient id="gradient-__UID__" cx=".5" cy="1.25" r="1.15">\n            <stop offset=\'50%\' stop-color=\'#000000\'/>\n            <stop offset=\'56%\' stop-color=\'#0a0a0a\'/>\n            <stop offset=\'63%\' stop-color=\'#262626\'/>\n            <stop offset=\'69%\' stop-color=\'#4f4f4f\'/>\n            <stop offset=\'75%\' stop-color=\'#808080\'/>\n            <stop offset=\'81%\' stop-color=\'#b1b1b1\'/>\n            <stop offset=\'88%\' stop-color=\'#dadada\'/>\n            <stop offset=\'94%\' stop-color=\'#f6f6f6\'/>\n            <stop offset=\'100%\' stop-color=\'#ffffff\'/>\n        </radialGradient>\n        <mask id="mask-__UID__">\n            <rect x="0" y="0" width="500" height="200" fill="url(#gradient-__UID__)"></rect>\n        </mask>\n    </defs>\n    <rect x="0" width="500" height="200" fill="currentColor" mask="url(#mask-__UID__)"></rect>\n</svg>';
  var $ = 0;
  var ee = function createImageOverlayView(e) {
    return e.utils.createView({
      name: "image-preview-overlay",
      tag: "div",
      ignoreRect: true,
      create: function create(e) {
        var r = e.root,
          t = e.props;
        var a = Q;
        if (document.querySelector("base")) {
          var i = new URL(
            window.location.href.replace(window.location.hash, "")
          ).href;
          a = a.replace(/url\(\#/g, "url(" + i + "#");
        }
        $++;
        r.element.classList.add(
          "filepond--image-preview-overlay-".concat(t.status)
        );
        r.element.innerHTML = a.replace(/__UID__/g, $);
      },
      mixins: {
        styles: ["opacity"],
        animations: { opacity: { type: "spring", mass: 25 } },
      },
    });
  };
  var re = function BitmapWorker() {
    self.onmessage = function (e) {
      createImageBitmap(e.data.message.file).then(function (r) {
        self.postMessage({ id: e.data.id, message: r }, [r]);
      });
    };
  };
  var te = function ColorMatrixWorker() {
    self.onmessage = function (e) {
      var r = e.data.message.imageData;
      var t = e.data.message.colorMatrix;
      var a = r.data;
      var i = a.length;
      var n = t[0];
      var o = t[1];
      var c = t[2];
      var v = t[3];
      var s = t[4];
      var u = t[5];
      var l = t[6];
      var h = t[7];
      var d = t[8];
      var f = t[9];
      var p = t[10];
      var g = t[11];
      var m = t[12];
      var y = t[13];
      var w = t[14];
      var E = t[15];
      var I = t[16];
      var M = t[17];
      var x = t[18];
      var T = t[19];
      var A = 0,
        R = 0,
        C = 0,
        k = 0,
        P = 0;
      for (; A < i; A += 4) {
        R = a[A] / 255;
        C = a[A + 1] / 255;
        k = a[A + 2] / 255;
        P = a[A + 3] / 255;
        a[A] = Math.max(
          0,
          Math.min((R * n + C * o + k * c + P * v + s) * 255, 255)
        );
        a[A + 1] = Math.max(
          0,
          Math.min((R * u + C * l + k * h + P * d + f) * 255, 255)
        );
        a[A + 2] = Math.max(
          0,
          Math.min((R * p + C * g + k * m + P * y + w) * 255, 255)
        );
        a[A + 3] = Math.max(
          0,
          Math.min((R * E + C * I + k * M + P * x + T) * 255, 255)
        );
      }
      self.postMessage({ id: e.data.id, message: r }, [r.data.buffer]);
    };
  };
  var ae = function getImageSize(e, r) {
    var t = new Image();
    t.onload = function () {
      var e = t.naturalWidth;
      var a = t.naturalHeight;
      t = null;
      r(e, a);
    };
    t.src = e;
  };
  var ie = {
    1: function _() {
      return [1, 0, 0, 1, 0, 0];
    },
    2: function _(e) {
      return [-1, 0, 0, 1, e, 0];
    },
    3: function _(e, r) {
      return [-1, 0, 0, -1, e, r];
    },
    4: function _(e, r) {
      return [1, 0, 0, -1, 0, r];
    },
    5: function _() {
      return [0, 1, 1, 0, 0, 0];
    },
    6: function _(e, r) {
      return [0, 1, -1, 0, r, 0];
    },
    7: function _(e, r) {
      return [0, -1, -1, 0, r, e];
    },
    8: function _(e) {
      return [0, -1, 1, 0, 0, e];
    },
  };
  var ne = function fixImageOrientation(e, r, t, a) {
    a !== -1 && e.transform.apply(e, ie[a](r, t));
  };
  var oe = function createPreviewImage(e, r, t, a) {
    r = Math.round(r);
    t = Math.round(t);
    var i = document.createElement("canvas");
    i.width = r;
    i.height = t;
    var n = i.getContext("2d");
    if (a >= 5 && a <= 8) {
      var o = [t, r];
      r = o[0];
      t = o[1];
    }
    ne(n, r, t, a);
    n.drawImage(e, 0, 0, r, t);
    return i;
  };
  var ce = function isBitmap(e) {
    return /^image/.test(e.type) && !/svg/.test(e.type);
  };
  var ve = 10;
  var se = 10;
  var ue = function calculateAverageColor(e) {
    var r = Math.min(ve / e.width, se / e.height);
    var t = document.createElement("canvas");
    var a = t.getContext("2d");
    var i = (t.width = Math.ceil(e.width * r));
    var n = (t.height = Math.ceil(e.height * r));
    a.drawImage(e, 0, 0, i, n);
    var o = null;
    try {
      o = a.getImageData(0, 0, i, n).data;
    } catch (e) {
      return null;
    }
    var c = o.length;
    var v = 0;
    var s = 0;
    var u = 0;
    var l = 0;
    for (; l < c; l += 4) {
      v += o[l] * o[l];
      s += o[l + 1] * o[l + 1];
      u += o[l + 2] * o[l + 2];
    }
    v = le(v, c);
    s = le(s, c);
    u = le(u, c);
    return { r: v, g: s, b: u };
  };
  var le = function averageColor(e, r) {
    return Math.floor(Math.sqrt(e / (r / 4)));
  };
  var he = function cloneCanvas(e, r) {
    r = r || document.createElement("canvas");
    r.width = e.width;
    r.height = e.height;
    var t = r.getContext("2d");
    t.drawImage(e, 0, 0);
    return r;
  };
  var de = function cloneImageData(e) {
    var r;
    try {
      r = new ImageData(e.width, e.height);
    } catch (i) {
      var t = document.createElement("canvas");
      var a = t.getContext("2d");
      r = a.createImageData(e.width, e.height);
    }
    r.data.set(new Uint8ClampedArray(e.data));
    return r;
  };
  var fe = function loadImage(e) {
    return new Promise(function (r, t) {
      var a = new Image();
      a.crossOrigin = "Anonymous";
      a.onload = function () {
        r(a);
      };
      a.onerror = function (e) {
        t(e);
      };
      a.src = e;
    });
  };
  var pe = function createImageWrapperView(e) {
    var r = ee(e);
    var t = J(e);
    var a = e.utils.createWorker;
    var i = function applyFilter(e, r, t) {
      return new Promise(function (i) {
        e.ref.imageData ||
          (e.ref.imageData = t
            .getContext("2d")
            .getImageData(0, 0, t.width, t.height));
        var n = de(e.ref.imageData);
        if (!r || r.length !== 20) {
          t.getContext("2d").putImageData(n, 0, 0);
          return i();
        }
        var o = a(te);
        o.post(
          { imageData: n, colorMatrix: r },
          function (e) {
            t.getContext("2d").putImageData(e, 0, 0);
            o.terminate();
            i();
          },
          [n.data.buffer]
        );
      });
    };
    var n = function removeImageView(e, r) {
      e.removeChildView(r);
      r.image.width = 1;
      r.image.height = 1;
      r._destroy();
    };
    var o = function shiftImage(e) {
      var r = e.root;
      var t = r.ref.images.shift();
      t.opacity = 0;
      t.translateY = -15;
      r.ref.imageViewBin.push(t);
      return t;
    };
    var c = function pushImage(e) {
      var r = e.root,
        a = e.props,
        i = e.image;
      var n = a.id;
      var o = r.query("GET_ITEM", { id: n });
      if (o) {
        var c = o.getMetadata("crop") || {
          center: { x: 0.5, y: 0.5 },
          flip: { horizontal: false, vertical: false },
          zoom: 1,
          rotation: 0,
          aspectRatio: null,
        };
        var v = r.query("GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR");
        var s;
        var u;
        var l = false;
        if (r.query("GET_IMAGE_PREVIEW_MARKUP_SHOW")) {
          s = o.getMetadata("markup") || [];
          u = o.getMetadata("resize");
          l = true;
        }
        var h = r.appendChildView(
          r.createChildView(t, {
            id: n,
            image: i,
            crop: c,
            resize: u,
            markup: s,
            dirty: l,
            background: v,
            opacity: 0,
            scaleX: 1.15,
            scaleY: 1.15,
            translateY: 15,
          }),
          r.childViews.length
        );
        r.ref.images.push(h);
        h.opacity = 1;
        h.scaleX = 1;
        h.scaleY = 1;
        h.translateY = 0;
        setTimeout(function () {
          r.dispatch("DID_IMAGE_PREVIEW_SHOW", { id: n });
        }, 250);
      }
    };
    var v = function updateImage(e) {
      var r = e.root,
        t = e.props;
      var a = r.query("GET_ITEM", { id: t.id });
      if (a) {
        var i = r.ref.images[r.ref.images.length - 1];
        i.crop = a.getMetadata("crop");
        i.background = r.query("GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR");
        if (r.query("GET_IMAGE_PREVIEW_MARKUP_SHOW")) {
          i.dirty = true;
          i.resize = a.getMetadata("resize");
          i.markup = a.getMetadata("markup");
        }
      }
    };
    var s = function didUpdateItemMetadata(e) {
      var r = e.root,
        t = e.props,
        a = e.action;
      if (
        /crop|filter|markup|resize/.test(a.change.key) &&
        r.ref.images.length
      ) {
        var n = r.query("GET_ITEM", { id: t.id });
        if (n)
          if (/filter/.test(a.change.key)) {
            var s = r.ref.images[r.ref.images.length - 1];
            i(r, a.change.value, s.image);
          } else if (/crop|markup|resize/.test(a.change.key)) {
            var u = n.getMetadata("crop");
            var l = r.ref.images[r.ref.images.length - 1];
            if (
              u &&
              u.aspectRatio &&
              l.crop &&
              l.crop.aspectRatio &&
              Math.abs(u.aspectRatio - l.crop.aspectRatio) > 1e-5
            ) {
              var h = o({ root: r });
              c({ root: r, props: t, image: he(h.image) });
            } else v({ root: r, props: t });
          }
      }
    };
    var u = function canCreateImageBitmap(e) {
      var r = window.navigator.userAgent;
      var t = r.match(/Firefox\/([0-9]+)\./);
      var a = t ? parseInt(t[1]) : null;
      return !(a !== null && a <= 58) && "createImageBitmap" in window && ce(e);
    };
    var l = function didCreatePreviewContainer(e) {
      var r = e.root,
        t = e.props;
      var a = t.id;
      var i = r.query("GET_ITEM", a);
      if (i) {
        var n = URL.createObjectURL(i.file);
        ae(n, function (e, t) {
          r.dispatch("DID_IMAGE_PREVIEW_CALCULATE_SIZE", {
            id: a,
            width: e,
            height: t,
          });
        });
      }
    };
    var h = function drawPreview(e) {
      var r = e.root,
        t = e.props;
      var n = t.id;
      var o = r.query("GET_ITEM", n);
      if (o) {
        var v = URL.createObjectURL(o.file);
        var s = function loadPreviewFallback() {
          fe(v).then(l);
        };
        var l = function previewImageLoaded(e) {
          URL.revokeObjectURL(v);
          var a = o.getMetadata("exif") || {};
          var n = a.orientation || -1;
          var s = e.width,
            u = e.height;
          if (s && u) {
            if (n >= 5 && n <= 8) {
              var l = [u, s];
              s = l[0];
              u = l[1];
            }
            var h = Math.max(1, window.devicePixelRatio * 0.75);
            var d = r.query("GET_IMAGE_PREVIEW_ZOOM_FACTOR");
            var f = d * h;
            var p = u / s;
            var g = r.rect.element.width;
            var m = r.rect.element.height;
            var y = g;
            var w = y * p;
            if (p > 1) {
              y = Math.min(s, g * f);
              w = y * p;
            } else {
              w = Math.min(u, m * f);
              y = w / p;
            }
            var E = oe(e, y, w, n);
            var I = function done() {
              var a = r.query("GET_IMAGE_PREVIEW_CALCULATE_AVERAGE_IMAGE_COLOR")
                ? ue(data)
                : null;
              o.setMetadata("color", a, true);
              "close" in e && e.close();
              r.ref.overlayShadow.opacity = 1;
              c({ root: r, props: t, image: E });
            };
            var M = o.getMetadata("filter");
            M ? i(r, M, E).then(I) : I();
          }
        };
        if (u(o.file)) {
          var h = a(re);
          h.post({ file: o.file }, function (e) {
            h.terminate();
            e ? l(e) : s();
          });
        } else s();
      }
    };
    var d = function didDrawPreview(e) {
      var r = e.root;
      var t = r.ref.images[r.ref.images.length - 1];
      t.translateY = 0;
      t.scaleX = 1;
      t.scaleY = 1;
      t.opacity = 1;
    };
    var f = function restoreOverlay(e) {
      var r = e.root;
      r.ref.overlayShadow.opacity = 1;
      r.ref.overlayError.opacity = 0;
      r.ref.overlaySuccess.opacity = 0;
    };
    var p = function didThrowError(e) {
      var r = e.root;
      r.ref.overlayShadow.opacity = 0.25;
      r.ref.overlayError.opacity = 1;
    };
    var g = function didCompleteProcessing(e) {
      var r = e.root;
      r.ref.overlayShadow.opacity = 0.25;
      r.ref.overlaySuccess.opacity = 1;
    };
    var m = function create(e) {
      var t = e.root;
      t.ref.images = [];
      t.ref.imageData = null;
      t.ref.imageViewBin = [];
      t.ref.overlayShadow = t.appendChildView(
        t.createChildView(r, { opacity: 0, status: "idle" })
      );
      t.ref.overlaySuccess = t.appendChildView(
        t.createChildView(r, { opacity: 0, status: "success" })
      );
      t.ref.overlayError = t.appendChildView(
        t.createChildView(r, { opacity: 0, status: "failure" })
      );
    };
    return e.utils.createView({
      name: "image-preview-wrapper",
      create: m,
      styles: ["height"],
      apis: ["height"],
      destroy: function destroy(e) {
        var r = e.root;
        r.ref.images.forEach(function (e) {
          e.image.width = 1;
          e.image.height = 1;
        });
      },
      didWriteView: function didWriteView(e) {
        var r = e.root;
        r.ref.images.forEach(function (e) {
          e.dirty = false;
        });
      },
      write: e.utils.createRoute(
        {
          DID_IMAGE_PREVIEW_DRAW: d,
          DID_IMAGE_PREVIEW_CONTAINER_CREATE: l,
          DID_FINISH_CALCULATE_PREVIEWSIZE: h,
          DID_UPDATE_ITEM_METADATA: s,
          DID_THROW_ITEM_LOAD_ERROR: p,
          DID_THROW_ITEM_PROCESSING_ERROR: p,
          DID_THROW_ITEM_INVALID: p,
          DID_COMPLETE_ITEM_PROCESSING: g,
          DID_START_ITEM_PROCESSING: f,
          DID_REVERT_ITEM_PROCESSING: f,
        },
        function (e) {
          var r = e.root;
          var t = r.ref.imageViewBin.filter(function (e) {
            return e.opacity === 0;
          });
          r.ref.imageViewBin = r.ref.imageViewBin.filter(function (e) {
            return e.opacity > 0;
          });
          t.forEach(function (e) {
            return n(r, e);
          });
          t.length = 0;
        }
      ),
    });
  };
  var ge = function plugin(e) {
    var t = e.addFilter,
      a = e.utils;
    var i = a.Type,
      n = a.createRoute,
      o = a.isFile;
    var c = pe(e);
    t("CREATE_VIEW", function (e) {
      var t = e.is,
        a = e.view,
        i = e.query;
      if (t("file") && i("GET_ALLOW_IMAGE_PREVIEW")) {
        var v = function didLoadItem(e) {
          var t = e.root,
            n = e.props;
          var v = n.id;
          var s = i("GET_ITEM", v);
          if (s && o(s.file) && !s.archived) {
            var u = s.file;
            if (r(u) && i("GET_IMAGE_PREVIEW_FILTER_ITEM")(s)) {
              var l = "createImageBitmap" in (window || {});
              var h = i("GET_IMAGE_PREVIEW_MAX_FILE_SIZE");
              if (!(!l && h && u.size > h)) {
                t.ref.imagePreview = a.appendChildView(
                  a.createChildView(c, { id: v })
                );
                var d = t.query("GET_IMAGE_PREVIEW_HEIGHT");
                d &&
                  t.dispatch("DID_UPDATE_PANEL_HEIGHT", {
                    id: s.id,
                    height: d,
                  });
                var f =
                  !l &&
                  u.size > i("GET_IMAGE_PREVIEW_MAX_INSTANT_PREVIEW_FILE_SIZE");
                t.dispatch("DID_IMAGE_PREVIEW_CONTAINER_CREATE", { id: v }, f);
              }
            }
          }
        };
        var s = function rescaleItem(e, r) {
          if (e.ref.imagePreview) {
            var t = r.id;
            var a = e.query("GET_ITEM", { id: t });
            if (a) {
              var i = e.query("GET_PANEL_ASPECT_RATIO");
              var n = e.query("GET_ITEM_PANEL_ASPECT_RATIO");
              var o = e.query("GET_IMAGE_PREVIEW_HEIGHT");
              if (!(i || n || o)) {
                var c = e.ref,
                  v = c.imageWidth,
                  s = c.imageHeight;
                if (v && s) {
                  var u = e.query("GET_IMAGE_PREVIEW_MIN_HEIGHT");
                  var l = e.query("GET_IMAGE_PREVIEW_MAX_HEIGHT");
                  var h = a.getMetadata("exif") || {};
                  var d = h.orientation || -1;
                  if (d >= 5 && d <= 8) {
                    var f = [s, v];
                    v = f[0];
                    s = f[1];
                  }
                  if (!ce(a.file) || e.query("GET_IMAGE_PREVIEW_UPSCALE")) {
                    var p = 2048 / v;
                    v *= p;
                    s *= p;
                  }
                  var g = s / v;
                  var m = (a.getMetadata("crop") || {}).aspectRatio || g;
                  var y = Math.max(u, Math.min(s, l));
                  var w = e.rect.element.width;
                  var E = Math.min(w * m, y);
                  e.dispatch("DID_UPDATE_PANEL_HEIGHT", {
                    id: a.id,
                    height: E,
                  });
                }
              }
            }
          }
        };
        var u = function didResizeView(e) {
          var r = e.root;
          r.ref.shouldRescale = true;
        };
        var l = function didUpdateItemMetadata(e) {
          var r = e.root,
            t = e.action;
          t.change.key === "crop" && (r.ref.shouldRescale = true);
        };
        var h = function didCalculatePreviewSize(e) {
          var r = e.root,
            t = e.action;
          r.ref.imageWidth = t.width;
          r.ref.imageHeight = t.height;
          r.ref.shouldRescale = true;
          r.ref.shouldDrawPreview = true;
          r.dispatch("KICK");
        };
        a.registerWriter(
          n(
            {
              DID_RESIZE_ROOT: u,
              DID_STOP_RESIZE: u,
              DID_LOAD_ITEM: v,
              DID_IMAGE_PREVIEW_CALCULATE_SIZE: h,
              DID_UPDATE_ITEM_METADATA: l,
            },
            function (e) {
              var r = e.root,
                t = e.props;
              if (r.ref.imagePreview && !r.rect.element.hidden) {
                if (r.ref.shouldRescale) {
                  s(r, t);
                  r.ref.shouldRescale = false;
                }
                if (r.ref.shouldDrawPreview) {
                  requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                      r.dispatch("DID_FINISH_CALCULATE_PREVIEWSIZE", {
                        id: t.id,
                      });
                    });
                  });
                  r.ref.shouldDrawPreview = false;
                }
              }
            }
          )
        );
      }
    });
    return {
      options: {
        allowImagePreview: [true, i.BOOLEAN],
        imagePreviewFilterItem: [
          function () {
            return true;
          },
          i.FUNCTION,
        ],
        imagePreviewHeight: [null, i.INT],
        imagePreviewMinHeight: [44, i.INT],
        imagePreviewMaxHeight: [256, i.INT],
        imagePreviewMaxFileSize: [null, i.INT],
        imagePreviewZoomFactor: [2, i.INT],
        imagePreviewUpscale: [false, i.BOOLEAN],
        imagePreviewMaxInstantPreviewFileSize: [1e6, i.INT],
        imagePreviewTransparencyIndicator: [null, i.STRING],
        imagePreviewCalculateAverageImageColor: [false, i.BOOLEAN],
        imagePreviewMarkupShow: [true, i.BOOLEAN],
        imagePreviewMarkupFilter: [
          function () {
            return true;
          },
          i.FUNCTION,
        ],
      },
    };
  };
  var me =
    typeof window !== "undefined" && typeof window.document !== "undefined";
  me &&
    document.dispatchEvent(
      new CustomEvent("FilePond:pluginloaded", { detail: ge })
    );
  return ge;
});
var t = r;
export { t as default };
