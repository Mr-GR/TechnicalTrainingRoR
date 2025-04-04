var e =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof self !== "undefined"
    ? self
    : global;
var t = {};
(function (e, r) {
  r(t);
})(0, function (t) {
  var r = function isNode(e) {
    return e instanceof HTMLElement;
  };
  var n = function createStore(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    var n = Object.assign({}, e);
    var i = [];
    var a = [];
    var o = function getState() {
      return Object.assign({}, n);
    };
    var s = function processActionQueue() {
      var e = [].concat(i);
      i.length = 0;
      return e;
    };
    var u = function processDispatchQueue() {
      var e = [].concat(a);
      a.length = 0;
      e.forEach(function (e) {
        var t = e.type,
          r = e.data;
        l(t, r);
      });
    };
    var l = function dispatch(e, t, r) {
      if (!r || document.hidden) {
        v[e] && v[e](t);
        i.push({ type: e, data: t });
      } else a.push({ type: e, data: t });
    };
    var c = function query(e) {
      var t;
      for (
        var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), i = 1;
        i < r;
        i++
      )
        n[i - 1] = arguments[i];
      return d[e] ? (t = d)[e].apply(t, n) : null;
    };
    var f = {
      getState: o,
      processActionQueue: s,
      processDispatchQueue: u,
      dispatch: l,
      query: c,
    };
    var d = {};
    t.forEach(function (e) {
      d = Object.assign({}, e(n), {}, d);
    });
    var v = {};
    r.forEach(function (e) {
      v = Object.assign({}, e(l, c, n), {}, v);
    });
    return f;
  };
  var i = function defineProperty(e, t, r) {
    typeof r !== "function"
      ? Object.defineProperty(e, t, Object.assign({}, r))
      : (e[t] = r);
  };
  var a = function forin(e, t) {
    for (var r in e) e.hasOwnProperty(r) && t(r, e[r]);
  };
  var o = function createObject(e) {
    var t = {};
    a(e, function (r) {
      i(t, r, e[r]);
    });
    return t;
  };
  var s = function attr(e, t) {
    var r =
      arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (r === null) return e.getAttribute(t) || e.hasAttribute(t);
    e.setAttribute(t, r);
  };
  var u = "http://www.w3.org/2000/svg";
  var l = ["svg", "path"];
  var c = function isSVGElement(e) {
    return l.includes(e);
  };
  var f = function createElement(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (typeof t === "object") {
      r = t;
      t = null;
    }
    var n = c(e) ? document.createElementNS(u, e) : document.createElement(e);
    t && (c(e) ? s(n, "class", t) : (n.className = t));
    a(r, function (e, t) {
      s(n, e, t);
    });
    return n;
  };
  var d = function appendChild(e) {
    return function (t, r) {
      typeof r !== "undefined" && e.children[r]
        ? e.insertBefore(t, e.children[r])
        : e.appendChild(t);
    };
  };
  var v = function appendChildView(e, t) {
    return function (e, r) {
      typeof r !== "undefined" ? t.splice(r, 0, e) : t.push(e);
      return e;
    };
  };
  var p = function removeChildView(e, t) {
    return function (r) {
      t.splice(t.indexOf(r), 1);
      r.element.parentNode && e.removeChild(r.element);
      return r;
    };
  };
  var E = (function () {
    return (
      typeof window !== "undefined" && typeof window.document !== "undefined"
    );
  })();
  var _ = function isBrowser() {
    return E;
  };
  var T = _() ? f("svg") : {};
  var I =
    "children" in T
      ? function (e) {
          return e.children.length;
        }
      : function (e) {
          return e.childNodes.length;
        };
  var m = function getViewRect(e, t, r, n) {
    var i = r[0] || e.left;
    var a = r[1] || e.top;
    var o = i + e.width;
    var s = a + e.height * (n[1] || 1);
    var u = {
      element: Object.assign({}, e),
      inner: { left: e.left, top: e.top, right: e.right, bottom: e.bottom },
      outer: { left: i, top: a, right: o, bottom: s },
    };
    t.filter(function (e) {
      return !e.isRectIgnored();
    })
      .map(function (e) {
        return e.rect;
      })
      .forEach(function (e) {
        g(u.inner, Object.assign({}, e.inner));
        g(u.outer, Object.assign({}, e.outer));
      });
    h(u.inner);
    u.outer.bottom += u.element.marginBottom;
    u.outer.right += u.element.marginRight;
    h(u.outer);
    return u;
  };
  var g = function expandRect(e, t) {
    t.top += e.top;
    t.right += e.left;
    t.bottom += e.top;
    t.left += e.left;
    t.bottom > e.bottom && (e.bottom = t.bottom);
    t.right > e.right && (e.right = t.right);
  };
  var h = function calculateRectSize(e) {
    e.width = e.right - e.left;
    e.height = e.bottom - e.top;
  };
  var R = function isNumber(e) {
    return typeof e === "number";
  };
  /**
   * Determines if position is at destination
   * @param position
   * @param destination
   * @param velocity
   * @param errorMargin
   * @returns {boolean}
   */ var O = function thereYet(e, t, r) {
    var n =
      arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0.001;
    return Math.abs(e - t) < n && Math.abs(r) < n;
  };
  var y = function spring() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = e.stiffness,
      r = t === void 0 ? 0.5 : t,
      n = e.damping,
      i = n === void 0 ? 0.75 : n,
      a = e.mass,
      s = a === void 0 ? 10 : a;
    var u = null;
    var l = null;
    var c = 0;
    var f = false;
    var d = function interpolate(e, t) {
      if (!f)
        if (R(u) && R(l)) {
          var n = -(l - u) * r;
          c += n / s;
          l += c;
          c *= i;
          if (O(l, u, c) || t) {
            l = u;
            c = 0;
            f = true;
            p.onupdate(l);
            p.oncomplete(l);
          } else p.onupdate(l);
        } else {
          f = true;
          c = 0;
        }
    };
    /**
     * Set new target value
     * @param value
     */ var v = function setTarget(e) {
      R(e) && !R(l) && (l = e);
      if (u === null) {
        u = e;
        l = e;
      }
      u = e;
      if (l !== u && typeof u !== "undefined") f = false;
      else {
        f = true;
        c = 0;
        p.onupdate(l);
        p.oncomplete(l);
      }
    };
    var p = o({
      interpolate: d,
      target: {
        set: v,
        get: function get() {
          return u;
        },
      },
      resting: {
        get: function get() {
          return f;
        },
      },
      onupdate: function onupdate(e) {},
      oncomplete: function oncomplete(e) {},
    });
    return p;
  };
  var D = function easeInOutQuad(e) {
    return e < 0.5 ? 2 * e * e : (4 - 2 * e) * e - 1;
  };
  var S = function tween() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = e.duration,
      r = t === void 0 ? 500 : t,
      n = e.easing,
      i = n === void 0 ? D : n,
      a = e.delay,
      s = a === void 0 ? 0 : a;
    var u = null;
    var l;
    var c;
    var f = true;
    var d = false;
    var v = null;
    var p = function interpolate(e, t) {
      if (!f && v !== null) {
        u === null && (u = e);
        if (!(e - u < s)) {
          l = e - u - s;
          if (l >= r || t) {
            l = 1;
            c = d ? 0 : 1;
            E.onupdate(c * v);
            E.oncomplete(c * v);
            f = true;
          } else {
            c = l / r;
            E.onupdate((l >= 0 ? i(d ? 1 - c : c) : 0) * v);
          }
        }
      }
    };
    var E = o({
      interpolate: p,
      target: {
        get: function get() {
          return d ? 0 : v;
        },
        set: function set(e) {
          if (v !== null) {
            if (e < v) {
              v = 1;
              d = true;
            } else {
              d = false;
              v = e;
            }
            f = false;
            u = null;
          } else {
            v = e;
            E.onupdate(e);
            E.oncomplete(e);
          }
        },
      },
      resting: {
        get: function get() {
          return f;
        },
      },
      onupdate: function onupdate(e) {},
      oncomplete: function oncomplete(e) {},
    });
    return E;
  };
  var A = { spring: y, tween: S };
  var b = function createAnimator(e, t, r) {
    var n = e[t] && typeof e[t][r] === "object" ? e[t][r] : e[t] || e;
    var i = typeof n === "string" ? n : n.type;
    var a = typeof n === "object" ? Object.assign({}, n) : {};
    return A[i] ? A[i](a) : null;
  };
  var P = function addGetSet(e, t, r) {
    var n = arguments.length > 3 && arguments[3] !== void 0 && arguments[3];
    t = Array.isArray(t) ? t : [t];
    t.forEach(function (t) {
      e.forEach(function (e) {
        var i = e;
        var a = function getter() {
          return r[e];
        };
        var o = function setter(t) {
          return (r[e] = t);
        };
        if (typeof e === "object") {
          i = e.key;
          a = e.getter || a;
          o = e.setter || o;
        }
        (t[i] && !n) || (t[i] = { get: a, set: o });
      });
    });
  };
  var L = function animations(e) {
    var t = e.mixinConfig,
      r = e.viewProps,
      n = e.viewInternalAPI,
      i = e.viewExternalAPI;
    var o = Object.assign({}, r);
    var animations = [];
    a(t, function (e, t) {
      var a = b(t);
      if (a) {
        a.onupdate = function (t) {
          r[e] = t;
        };
        a.target = o[e];
        var s = {
          key: e,
          setter: function setter(e) {
            a.target !== e && (a.target = e);
          },
          getter: function getter() {
            return r[e];
          },
        };
        P([s], [n, i], r, true);
        animations.push(a);
      }
    });
    return {
      write: function write(e) {
        var t = document.hidden;
        var r = true;
        animations.forEach(function (n) {
          n.resting || (r = false);
          n.interpolate(e, t);
        });
        return r;
      },
      destroy: function destroy() {},
    };
  };
  var M = function addEvent(e) {
    return function (t, r) {
      e.addEventListener(t, r);
    };
  };
  var C = function removeEvent(e) {
    return function (t, r) {
      e.removeEventListener(t, r);
    };
  };
  var w = function listeners(e) {
    e.mixinConfig, e.viewProps, e.viewInternalAPI;
    var t = e.viewExternalAPI,
      r = (e.viewState, e.view);
    var n = [];
    var i = M(r.element);
    var a = C(r.element);
    t.on = function (e, t) {
      n.push({ type: e, fn: t });
      i(e, t);
    };
    t.off = function (e, t) {
      n.splice(
        n.findIndex(function (r) {
          return r.type === e && r.fn === t;
        }),
        1
      );
      a(e, t);
    };
    return {
      write: function write() {
        return true;
      },
      destroy: function destroy() {
        n.forEach(function (e) {
          a(e.type, e.fn);
        });
      },
    };
  };
  var N = function apis(e) {
    var t = e.mixinConfig,
      r = e.viewProps,
      n = e.viewExternalAPI;
    P(t, n, r);
  };
  var G = function isDefined(e) {
    return e != null;
  };
  var F = {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    originX: 0,
    originY: 0,
  };
  var U = function styles(e) {
    var t = e.mixinConfig,
      r = e.viewProps,
      n = e.viewInternalAPI,
      i = e.viewExternalAPI,
      a = e.view;
    var o = Object.assign({}, r);
    var s = {};
    P(t, [n, i], r);
    var u = function getOffset() {
      return [r.translateX || 0, r.translateY || 0];
    };
    var l = function getScale() {
      return [r.scaleX || 0, r.scaleY || 0];
    };
    var c = function getRect() {
      return a.rect ? m(a.rect, a.childViews, u(), l()) : null;
    };
    n.rect = { get: c };
    i.rect = { get: c };
    t.forEach(function (e) {
      r[e] = typeof o[e] === "undefined" ? F[e] : o[e];
    });
    return {
      write: function write() {
        if (B(s, r)) {
          V(a.element, r);
          Object.assign(s, Object.assign({}, r));
          return true;
        }
      },
      destroy: function destroy() {},
    };
  };
  var B = function propsHaveChanged(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return true;
    for (var r in t) if (t[r] !== e[r]) return true;
    return false;
  };
  var V = function applyStyles(e, t) {
    var r = t.opacity,
      n = t.perspective,
      i = t.translateX,
      a = t.translateY,
      o = t.scaleX,
      s = t.scaleY,
      u = t.rotateX,
      l = t.rotateY,
      c = t.rotateZ,
      f = t.originX,
      d = t.originY,
      v = t.width,
      p = t.height;
    var E = "";
    var _ = "";
    (G(f) || G(d)) &&
      (_ += "transform-origin: " + (f || 0) + "px " + (d || 0) + "px;");
    G(n) && (E += "perspective(" + n + "px) ");
    (G(i) || G(a)) &&
      (E += "translate3d(" + (i || 0) + "px, " + (a || 0) + "px, 0) ");
    (G(o) || G(s)) &&
      (E += "scale3d(" + (G(o) ? o : 1) + ", " + (G(s) ? s : 1) + ", 1) ");
    G(c) && (E += "rotateZ(" + c + "rad) ");
    G(u) && (E += "rotateX(" + u + "rad) ");
    G(l) && (E += "rotateY(" + l + "rad) ");
    E.length && (_ += "transform:" + E + ";");
    if (G(r)) {
      _ += "opacity:" + r + ";";
      r === 0 && (_ += "visibility:hidden;");
      r < 1 && (_ += "pointer-events:none;");
    }
    G(p) && (_ += "height:" + p + "px;");
    G(v) && (_ += "width:" + v + "px;");
    var T = e.elementCurrentStyle || "";
    if (_.length !== T.length || _ !== T) {
      e.style.cssText = _;
      e.elementCurrentStyle = _;
    }
  };
  var q = { styles: U, listeners: w, animations: L, apis: N };
  var x = function updateRect() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!t.layoutCalculated) {
      e.paddingTop = parseInt(r.paddingTop, 10) || 0;
      e.marginTop = parseInt(r.marginTop, 10) || 0;
      e.marginRight = parseInt(r.marginRight, 10) || 0;
      e.marginBottom = parseInt(r.marginBottom, 10) || 0;
      e.marginLeft = parseInt(r.marginLeft, 10) || 0;
      t.layoutCalculated = true;
    }
    e.left = t.offsetLeft || 0;
    e.top = t.offsetTop || 0;
    e.width = t.offsetWidth || 0;
    e.height = t.offsetHeight || 0;
    e.right = e.left + e.width;
    e.bottom = e.top + e.height;
    e.scrollTop = t.scrollTop;
    e.hidden = t.offsetParent === null;
    return e;
  };
  var Y = function createView() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = e.tag,
      r = t === void 0 ? "div" : t,
      n = e.name,
      i = n === void 0 ? null : n,
      a = e.attributes,
      s = a === void 0 ? {} : a,
      u = e.read,
      l = u === void 0 ? function () {} : u,
      c = e.write,
      E = c === void 0 ? function () {} : c,
      _ = e.create,
      T = _ === void 0 ? function () {} : _,
      g = e.destroy,
      h = g === void 0 ? function () {} : g,
      R = e.filterFrameActionsForChild,
      O =
        R === void 0
          ? function (e, t) {
              return t;
            }
          : R,
      y = e.didCreateView,
      D = y === void 0 ? function () {} : y,
      S = e.didWriteView,
      A = S === void 0 ? function () {} : S,
      b = e.ignoreRect,
      P = b !== void 0 && b,
      L = e.ignoreRectUpdate,
      M = L !== void 0 && L,
      C = e.mixins,
      w = C === void 0 ? [] : C;
    return function (e) {
      var t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var n = f(r, "filepond--" + i, s);
      var a = window.getComputedStyle(n, null);
      var u = x();
      var c = null;
      var _ = false;
      var g = [];
      var R = [];
      var y = {};
      var S = {};
      var b = [E];
      var L = [l];
      var C = [h];
      var N = function getElement() {
        return n;
      };
      var G = function getChildViews() {
        return g.concat();
      };
      var F = function getReference() {
        return y;
      };
      var U = function createChildView(e) {
        return function (t, r) {
          return t(e, r);
        };
      };
      var B = function getRect() {
        if (c) return c;
        c = m(u, g, [0, 0], [1, 1]);
        return c;
      };
      var V = function getStyle() {
        return a;
      };
      var Y = function _read() {
        c = null;
        g.forEach(function (e) {
          return e._read();
        });
        var e = !(M && u.width && u.height);
        e && x(u, n, a);
        var r = { root: Q, props: t, rect: u };
        L.forEach(function (e) {
          return e(r);
        });
      };
      var k = function _write(e, r, n) {
        var i = r.length === 0;
        b.forEach(function (a) {
          var o = a({
            props: t,
            root: Q,
            actions: r,
            timestamp: e,
            shouldOptimize: n,
          });
          o === false && (i = false);
        });
        R.forEach(function (t) {
          var r = t.write(e);
          r === false && (i = false);
        });
        g.filter(function (e) {
          return !!e.element.parentNode;
        }).forEach(function (t) {
          var a = t._write(e, O(t, r), n);
          a || (i = false);
        });
        g.forEach(function (t, a) {
          if (!t.element.parentNode) {
            Q.appendChild(t.element, a);
            t._read();
            t._write(e, O(t, r), n);
            i = false;
          }
        });
        _ = i;
        A({ props: t, root: Q, actions: r, timestamp: e });
        return i;
      };
      var j = function _destroy() {
        R.forEach(function (e) {
          return e.destroy();
        });
        C.forEach(function (e) {
          e({ root: Q, props: t });
        });
        g.forEach(function (e) {
          return e._destroy();
        });
      };
      var H = {
        element: { get: N },
        style: { get: V },
        childViews: { get: G },
      };
      var W = Object.assign({}, H, {
        rect: { get: B },
        ref: { get: F },
        is: function is(e) {
          return i === e;
        },
        appendChild: d(n),
        createChildView: U(e),
        linkView: function linkView(e) {
          g.push(e);
          return e;
        },
        unlinkView: function unlinkView(e) {
          g.splice(g.indexOf(e), 1);
        },
        appendChildView: v(n, g),
        removeChildView: p(n, g),
        registerWriter: function registerWriter(e) {
          return b.push(e);
        },
        registerReader: function registerReader(e) {
          return L.push(e);
        },
        registerDestroyer: function registerDestroyer(e) {
          return C.push(e);
        },
        invalidateLayout: function invalidateLayout() {
          return (n.layoutCalculated = false);
        },
        dispatch: e.dispatch,
        query: e.query,
      });
      var X = {
        element: { get: N },
        childViews: { get: G },
        rect: { get: B },
        resting: {
          get: function get() {
            return _;
          },
        },
        isRectIgnored: function isRectIgnored() {
          return P;
        },
        _read: Y,
        _write: k,
        _destroy: j,
      };
      var z = Object.assign({}, H, {
        rect: {
          get: function get() {
            return u;
          },
        },
      });
      Object.keys(w)
        .sort(function (e, t) {
          return e === "styles" ? 1 : t === "styles" ? -1 : 0;
        })
        .forEach(function (e) {
          var r = q[e]({
            mixinConfig: w[e],
            viewProps: t,
            viewState: S,
            viewInternalAPI: W,
            viewExternalAPI: X,
            view: o(z),
          });
          r && R.push(r);
        });
      var Q = o(W);
      T({ root: Q, props: t });
      var Z = I(n);
      g.forEach(function (e, t) {
        Q.appendChild(e.element, Z + t);
      });
      D(Q);
      return o(X);
    };
  };
  var k = function createPainter(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 60;
    var n = "__framePainter";
    if (!window[n]) {
      window[n] = { readers: [e], writers: [t] };
      var i = window[n];
      var a = 1e3 / r;
      var o = null;
      var s = null;
      var u = null;
      var l = null;
      var c = function setTimerType() {
        if (document.hidden) {
          u = function requestTick() {
            return window.setTimeout(function () {
              return f(performance.now());
            }, a);
          };
          l = function cancelTick() {
            return window.clearTimeout(s);
          };
        } else {
          u = function requestTick() {
            return window.requestAnimationFrame(f);
          };
          l = function cancelTick() {
            return window.cancelAnimationFrame(s);
          };
        }
      };
      document.addEventListener("visibilitychange", function () {
        l && l();
        c();
        f(performance.now());
      });
      var f = function tick(e) {
        s = u(tick);
        o || (o = e);
        var t = e - o;
        if (!(t <= a)) {
          o = e - (t % a);
          i.readers.forEach(function (e) {
            return e();
          });
          i.writers.forEach(function (t) {
            return t(e);
          });
        }
      };
      c();
      f(performance.now());
      return {
        pause: function pause() {
          l(s);
        },
      };
    }
    window[n].readers.push(e);
    window[n].writers.push(t);
  };
  var j = function createRoute(e, t) {
    return function (r) {
      var n = r.root,
        i = r.props,
        a = r.actions,
        o = a === void 0 ? [] : a,
        s = r.timestamp,
        u = r.shouldOptimize;
      o.filter(function (t) {
        return e[t.type];
      }).forEach(function (t) {
        return e[t.type]({
          root: n,
          props: i,
          action: t.data,
          timestamp: s,
          shouldOptimize: u,
        });
      });
      t &&
        t({ root: n, props: i, actions: o, timestamp: s, shouldOptimize: u });
    };
  };
  var H = function insertBefore(e, t) {
    return t.parentNode.insertBefore(e, t);
  };
  var W = function insertAfter(e, t) {
    return t.parentNode.insertBefore(e, t.nextSibling);
  };
  var X = function isArray(e) {
    return Array.isArray(e);
  };
  var z = function isEmpty(e) {
    return e == null;
  };
  var Q = function trim(e) {
    return e.trim();
  };
  var Z = function toString(e) {
    return "" + e;
  };
  var $ = function toArray(e) {
    var t =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
    return z(e)
      ? []
      : X(e)
      ? e
      : Z(e)
          .split(t)
          .map(Q)
          .filter(function (e) {
            return e.length;
          });
  };
  var K = function isBoolean(e) {
    return typeof e === "boolean";
  };
  var J = function toBoolean(e) {
    return K(e) ? e : e === "true";
  };
  var ee = function isString(e) {
    return typeof e === "string";
  };
  var te = function toNumber(e) {
    return R(e) ? e : ee(e) ? Z(e).replace(/[a-z]+/gi, "") : 0;
  };
  var re = function toInt(e) {
    return parseInt(te(e), 10);
  };
  var ne = function toFloat(e) {
    return parseFloat(te(e));
  };
  var ie = function isInt(e) {
    return R(e) && isFinite(e) && Math.floor(e) === e;
  };
  var ae = function toBytes(e) {
    var t =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
    if (ie(e)) return e;
    var r = Z(e).trim();
    if (/MB$/i.test(r)) {
      r = r.replace(/MB$i/, "").trim();
      return re(r) * t * t;
    }
    if (/KB/i.test(r)) {
      r = r.replace(/KB$i/, "").trim();
      return re(r) * t;
    }
    return re(r);
  };
  var oe = function isFunction(e) {
    return typeof e === "function";
  };
  var se = function toFunctionReference(e) {
    var t = self;
    var r = e.split(".");
    var n = null;
    while ((n = r.shift())) {
      t = t[n];
      if (!t) return null;
    }
    return t;
  };
  var ue = {
    process: "POST",
    patch: "PATCH",
    revert: "DELETE",
    fetch: "GET",
    restore: "GET",
    load: "GET",
  };
  var le = function createServerAPI(e) {
    var t = {};
    t.url = ee(e) ? e : e.url || "";
    t.timeout = e.timeout ? parseInt(e.timeout, 10) : 0;
    t.headers = e.headers ? e.headers : {};
    a(ue, function (r) {
      t[r] = ce(r, e[r], ue[r], t.timeout, t.headers);
    });
    t.process = e.process || ee(e) || e.url ? t.process : null;
    t.remove = e.remove || null;
    delete t.headers;
    return t;
  };
  var ce = function createAction(e, t, r, n, i) {
    if (t === null) return null;
    if (typeof t === "function") return t;
    var a = {
      url: r === "GET" || r === "PATCH" ? "?" + e + "=" : "",
      method: r,
      headers: i,
      withCredentials: false,
      timeout: n,
      onload: null,
      ondata: null,
      onerror: null,
    };
    if (ee(t)) {
      a.url = t;
      return a;
    }
    Object.assign(a, t);
    if (ee(a.headers)) {
      var o = a.headers.split(/:(.+)/);
      a.headers = { header: o[0], value: o[1] };
    }
    a.withCredentials = J(a.withCredentials);
    return a;
  };
  var fe = function toServerAPI(e) {
    return le(e);
  };
  var de = function isNull(e) {
    return e === null;
  };
  var ve = function isObject(e) {
    return typeof e === "object" && e !== null;
  };
  var pe = function isAPI(e) {
    return (
      ve(e) &&
      ee(e.url) &&
      ve(e.process) &&
      ve(e.revert) &&
      ve(e.restore) &&
      ve(e.fetch)
    );
  };
  var Ee = function getType(e) {
    return X(e)
      ? "array"
      : de(e)
      ? "null"
      : ie(e)
      ? "int"
      : /^[0-9]+ ?(?:GB|MB|KB)$/gi.test(e)
      ? "bytes"
      : pe(e)
      ? "api"
      : typeof e;
  };
  var _e = function replaceSingleQuotes(e) {
    return e
      .replace(/{\s*'/g, '{"')
      .replace(/'\s*}/g, '"}')
      .replace(/'\s*:/g, '":')
      .replace(/:\s*'/g, ':"')
      .replace(/,\s*'/g, ',"')
      .replace(/'\s*,/g, '",');
  };
  var Te = {
    array: $,
    boolean: J,
    int: function int(e) {
      return Ee(e) === "bytes" ? ae(e) : re(e);
    },
    number: ne,
    float: ne,
    bytes: ae,
    string: function string(e) {
      return oe(e) ? e : Z(e);
    },
    function: function _function(e) {
      return se(e);
    },
    serverapi: fe,
    object: function object(e) {
      try {
        return JSON.parse(_e(e));
      } catch (e) {
        return null;
      }
    },
  };
  var Ie = function convertTo(e, t) {
    return Te[t](e);
  };
  var me = function getValueByType(e, t, r) {
    if (e === t) return e;
    var n = Ee(e);
    if (n !== r) {
      var i = Ie(e, r);
      n = Ee(i);
      if (i === null)
        throw (
          'Trying to assign value with incorrect type to "' +
          option +
          '", allowed type: "' +
          r +
          '"'
        );
      e = i;
    }
    return e;
  };
  var ge = function createOption(e, t) {
    var r = e;
    return {
      enumerable: true,
      get: function get() {
        return r;
      },
      set: function set(n) {
        r = me(n, e, t);
      },
    };
  };
  var he = function createOptions(e) {
    var t = {};
    a(e, function (r) {
      var n = e[r];
      t[r] = ge(n[0], n[1]);
    });
    return o(t);
  };
  var Re = function createInitialState(e) {
    return {
      items: [],
      listUpdateTimeout: null,
      itemUpdateTimeout: null,
      processingQueue: [],
      options: he(e),
    };
  };
  var Oe = function fromCamels(e) {
    var t =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "-";
    return e
      .split(/(?=[A-Z])/)
      .map(function (e) {
        return e.toLowerCase();
      })
      .join(t);
  };
  var ye = function createOptionAPI(e, t) {
    var r = {};
    a(t, function (t) {
      r[t] = {
        get: function get() {
          return e.getState().options[t];
        },
        set: function set(r) {
          e.dispatch("SET_" + Oe(t, "_").toUpperCase(), { value: r });
        },
      };
    });
    return r;
  };
  var De = function createOptionActions(e) {
    return function (t, r, n) {
      var i = {};
      a(e, function (e) {
        var r = Oe(e, "_").toUpperCase();
        i["SET_" + r] = function (i) {
          try {
            n.options[e] = i.value;
          } catch (e) {}
          t("DID_SET_" + r, { value: n.options[e] });
        };
      });
      return i;
    };
  };
  var Se = function createOptionQueries(e) {
    return function (t) {
      var r = {};
      a(e, function (e) {
        r["GET_" + Oe(e, "_").toUpperCase()] = function (r) {
          return t.options[e];
        };
      });
      return r;
    };
  };
  var Ae = { API: 1, DROP: 2, BROWSE: 3, PASTE: 4, NONE: 5 };
  var be = function getUniqueId() {
    return Math.random().toString(36).substring(2, 11);
  };
  function _AwaitValue(t) {
    (this || e).wrapped = t;
  }
  function _AsyncGenerator(t) {
    var r, n;
    function send(e, t) {
      return new Promise(function (i, a) {
        var o = { key: e, arg: t, resolve: i, reject: a, next: null };
        if (n) n = n.next = o;
        else {
          r = n = o;
          resume(e, t);
        }
      });
    }
    function resume(e, r) {
      try {
        var n = t[e](r);
        var i = n.value;
        var a = i instanceof _AwaitValue;
        Promise.resolve(a ? i.wrapped : i).then(
          function (e) {
            a ? resume("next", e) : settle(n.done ? "return" : "normal", e);
          },
          function (e) {
            resume("throw", e);
          }
        );
      } catch (e) {
        settle("throw", e);
      }
    }
    function settle(e, t) {
      switch (e) {
        case "return":
          r.resolve({ value: t, done: true });
          break;
        case "throw":
          r.reject(t);
          break;
        default:
          r.resolve({ value: t, done: false });
          break;
      }
      r = r.next;
      r ? resume(r.key, r.arg) : (n = null);
    }
    (this || e)._invoke = send;
    typeof t.return !== "function" && ((this || e).return = void 0);
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
  function _objectWithoutPropertiesLoose(e, t) {
    if (e == null) return {};
    var r = {};
    var n = Object.keys(e);
    var i, a;
    for (a = 0; a < n.length; a++) {
      i = n[a];
      t.indexOf(i) >= 0 || (r[i] = e[i]);
    }
    return r;
  }
  function _objectWithoutProperties(e, t) {
    if (e == null) return {};
    var r = _objectWithoutPropertiesLoose(e, t);
    var n, i;
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      for (i = 0; i < a.length; i++) {
        n = a[i];
        t.indexOf(n) >= 0 ||
          (Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]));
      }
    }
    return r;
  }
  function _toConsumableArray(e) {
    return _arrayWithoutHoles(e) || _iterableToArray(e) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(e) {
    if (Array.isArray(e)) {
      for (var t = 0, r = new Array(e.length); t < e.length; t++) r[t] = e[t];
      return r;
    }
  }
  function _iterableToArray(e) {
    if (
      Symbol.iterator in Object(e) ||
      Object.prototype.toString.call(e) === "[object Arguments]"
    )
      return Array.from(e);
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }
  var Pe = function arrayRemove(e, t) {
    return e.splice(t, 1);
  };
  var Le = function run(e, t) {
    t ? e() : document.hidden ? Promise.resolve(1).then(e) : setTimeout(e, 0);
  };
  var Me = function on() {
    var e = [];
    var t = function off(t, r) {
      Pe(
        e,
        e.findIndex(function (e) {
          return e.event === t && (e.cb === r || !r);
        })
      );
    };
    var r = function fire(t, r, n) {
      e.filter(function (e) {
        return e.event === t;
      })
        .map(function (e) {
          return e.cb;
        })
        .forEach(function (e) {
          return Le(function () {
            return e.apply(void 0, _toConsumableArray(r));
          }, n);
        });
    };
    return {
      fireSync: function fireSync(e) {
        for (
          var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1;
          i < t;
          i++
        )
          n[i - 1] = arguments[i];
        r(e, n, true);
      },
      fire: function fire(e) {
        for (
          var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1;
          i < t;
          i++
        )
          n[i - 1] = arguments[i];
        r(e, n, false);
      },
      on: function on(t, r) {
        e.push({ event: t, cb: r });
      },
      onOnce: function onOnce(r, n) {
        e.push({
          event: r,
          cb: function cb() {
            t(r, n);
            n.apply(void 0, arguments);
          },
        });
      },
      off: t,
    };
  };
  var Ce = function copyObjectPropertiesToObject(e, t, r) {
    Object.getOwnPropertyNames(e)
      .filter(function (e) {
        return !r.includes(e);
      })
      .forEach(function (r) {
        return Object.defineProperty(
          t,
          r,
          Object.getOwnPropertyDescriptor(e, r)
        );
      });
  };
  var we = [
    "fire",
    "process",
    "revert",
    "load",
    "on",
    "off",
    "onOnce",
    "retryLoad",
    "extend",
    "archive",
    "archived",
    "release",
    "released",
    "requestProcessing",
    "freeze",
  ];
  var Ne = function createItemAPI(e) {
    var t = {};
    Ce(e, t, we);
    return t;
  };
  var Ge = function removeReleasedItems(e) {
    e.forEach(function (t, r) {
      t.released && Pe(e, r);
    });
  };
  var Fe = {
    INIT: 1,
    IDLE: 2,
    PROCESSING_QUEUED: 9,
    PROCESSING: 3,
    PROCESSING_COMPLETE: 5,
    PROCESSING_ERROR: 6,
    PROCESSING_REVERT_ERROR: 10,
    LOADING: 7,
    LOAD_ERROR: 8,
  };
  var Ue = { INPUT: 1, LIMBO: 2, LOCAL: 3 };
  var Be = function getNonNumeric(e) {
    return /[^0-9]+/.exec(e);
  };
  var Ve = function getDecimalSeparator() {
    return Be((1.1).toLocaleString())[0];
  };
  var qe = function getThousandsSeparator() {
    var e = Ve();
    var t = (1e3).toLocaleString();
    var r = (1e3).toString();
    return t !== r ? Be(t)[0] : e === "." ? "," : ".";
  };
  var xe = {
    BOOLEAN: "boolean",
    INT: "int",
    NUMBER: "number",
    STRING: "string",
    ARRAY: "array",
    OBJECT: "object",
    FUNCTION: "function",
    ACTION: "action",
    SERVER_API: "serverapi",
    REGEX: "regex",
  };
  var Ye = [];
  var ke = function applyFilterChain(e, t, r) {
    return new Promise(function (n, i) {
      var a = Ye.filter(function (t) {
        return t.key === e;
      }).map(function (e) {
        return e.cb;
      });
      if (a.length !== 0) {
        var o = a.shift();
        a.reduce(function (e, t) {
          return e.then(function (e) {
            return t(e, r);
          });
        }, o(t, r))
          .then(function (e) {
            return n(e);
          })
          .catch(function (e) {
            return i(e);
          });
      } else n(t);
    });
  };
  var je = function applyFilters(e, t, r) {
    return Ye.filter(function (t) {
      return t.key === e;
    }).map(function (e) {
      return e.cb(t, r);
    });
  };
  var He = function addFilter(e, t) {
    return Ye.push({ key: e, cb: t });
  };
  var We = function extendDefaultOptions(e) {
    return Object.assign(Qe, e);
  };
  var Xe = function getOptions() {
    return Object.assign({}, Qe);
  };
  var ze = function setOptions(e) {
    a(e, function (e, t) {
      Qe[e] && (Qe[e][0] = me(t, Qe[e][0], Qe[e][1]));
    });
  };
  var Qe = {
    id: [null, xe.STRING],
    name: ["filepond", xe.STRING],
    disabled: [false, xe.BOOLEAN],
    className: [null, xe.STRING],
    required: [false, xe.BOOLEAN],
    captureMethod: [null, xe.STRING],
    allowSyncAcceptAttribute: [true, xe.BOOLEAN],
    allowDrop: [true, xe.BOOLEAN],
    allowBrowse: [true, xe.BOOLEAN],
    allowPaste: [true, xe.BOOLEAN],
    allowMultiple: [false, xe.BOOLEAN],
    allowReplace: [true, xe.BOOLEAN],
    allowRevert: [true, xe.BOOLEAN],
    allowRemove: [true, xe.BOOLEAN],
    allowProcess: [true, xe.BOOLEAN],
    allowReorder: [false, xe.BOOLEAN],
    allowDirectoriesOnly: [false, xe.BOOLEAN],
    storeAsFile: [false, xe.BOOLEAN],
    forceRevert: [false, xe.BOOLEAN],
    maxFiles: [null, xe.INT],
    checkValidity: [false, xe.BOOLEAN],
    itemInsertLocationFreedom: [true, xe.BOOLEAN],
    itemInsertLocation: ["before", xe.STRING],
    itemInsertInterval: [75, xe.INT],
    dropOnPage: [false, xe.BOOLEAN],
    dropOnElement: [true, xe.BOOLEAN],
    dropValidation: [false, xe.BOOLEAN],
    ignoredFiles: [[".ds_store", "thumbs.db", "desktop.ini"], xe.ARRAY],
    instantUpload: [true, xe.BOOLEAN],
    maxParallelUploads: [2, xe.INT],
    allowMinimumUploadDuration: [true, xe.BOOLEAN],
    chunkUploads: [false, xe.BOOLEAN],
    chunkForce: [false, xe.BOOLEAN],
    chunkSize: [5e6, xe.INT],
    chunkRetryDelays: [[500, 1e3, 3e3], xe.ARRAY],
    server: [null, xe.SERVER_API],
    fileSizeBase: [1e3, xe.INT],
    labelFileSizeBytes: ["bytes", xe.STRING],
    labelFileSizeKilobytes: ["KB", xe.STRING],
    labelFileSizeMegabytes: ["MB", xe.STRING],
    labelFileSizeGigabytes: ["GB", xe.STRING],
    labelDecimalSeparator: [Ve(), xe.STRING],
    labelThousandsSeparator: [qe(), xe.STRING],
    labelIdle: [
      'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
      xe.STRING,
    ],
    labelInvalidField: ["Field contains invalid files", xe.STRING],
    labelFileWaitingForSize: ["Waiting for size", xe.STRING],
    labelFileSizeNotAvailable: ["Size not available", xe.STRING],
    labelFileCountSingular: ["file in list", xe.STRING],
    labelFileCountPlural: ["files in list", xe.STRING],
    labelFileLoading: ["Loading", xe.STRING],
    labelFileAdded: ["Added", xe.STRING],
    labelFileLoadError: ["Error during load", xe.STRING],
    labelFileRemoved: ["Removed", xe.STRING],
    labelFileRemoveError: ["Error during remove", xe.STRING],
    labelFileProcessing: ["Uploading", xe.STRING],
    labelFileProcessingComplete: ["Upload complete", xe.STRING],
    labelFileProcessingAborted: ["Upload cancelled", xe.STRING],
    labelFileProcessingError: ["Error during upload", xe.STRING],
    labelFileProcessingRevertError: ["Error during revert", xe.STRING],
    labelTapToCancel: ["tap to cancel", xe.STRING],
    labelTapToRetry: ["tap to retry", xe.STRING],
    labelTapToUndo: ["tap to undo", xe.STRING],
    labelButtonRemoveItem: ["Remove", xe.STRING],
    labelButtonAbortItemLoad: ["Abort", xe.STRING],
    labelButtonRetryItemLoad: ["Retry", xe.STRING],
    labelButtonAbortItemProcessing: ["Cancel", xe.STRING],
    labelButtonUndoItemProcessing: ["Undo", xe.STRING],
    labelButtonRetryItemProcessing: ["Retry", xe.STRING],
    labelButtonProcessItem: ["Upload", xe.STRING],
    iconRemove: [
      '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"/></svg>',
      xe.STRING,
    ],
    iconProcess: [
      '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z" fill="currentColor" fill-rule="evenodd"/></svg>',
      xe.STRING,
    ],
    iconRetry: [
      '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"/></svg>',
      xe.STRING,
    ],
    iconUndo: [
      '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M9.185 10.81l.02-.038A4.997 4.997 0 0 1 13.683 8a5 5 0 0 1 5 5 5 5 0 0 1-5 5 1 1 0 0 0 0 2A7 7 0 1 0 7.496 9.722l-.21-.842a.999.999 0 1 0-1.94.484l.806 3.23c.133.535.675.86 1.21.73l3.233-.803a.997.997 0 0 0 .73-1.21.997.997 0 0 0-1.21-.73l-.928.23-.002-.001z" fill="currentColor" fill-rule="nonzero"/></svg>',
      xe.STRING,
    ],
    iconDone: [
      '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fill-rule="nonzero"/></svg>',
      xe.STRING,
    ],
    oninit: [null, xe.FUNCTION],
    onwarning: [null, xe.FUNCTION],
    onerror: [null, xe.FUNCTION],
    onactivatefile: [null, xe.FUNCTION],
    oninitfile: [null, xe.FUNCTION],
    onaddfilestart: [null, xe.FUNCTION],
    onaddfileprogress: [null, xe.FUNCTION],
    onaddfile: [null, xe.FUNCTION],
    onprocessfilestart: [null, xe.FUNCTION],
    onprocessfileprogress: [null, xe.FUNCTION],
    onprocessfileabort: [null, xe.FUNCTION],
    onprocessfilerevert: [null, xe.FUNCTION],
    onprocessfile: [null, xe.FUNCTION],
    onprocessfiles: [null, xe.FUNCTION],
    onremovefile: [null, xe.FUNCTION],
    onpreparefile: [null, xe.FUNCTION],
    onupdatefiles: [null, xe.FUNCTION],
    onreorderfiles: [null, xe.FUNCTION],
    beforeDropFile: [null, xe.FUNCTION],
    beforeAddFile: [null, xe.FUNCTION],
    beforeRemoveFile: [null, xe.FUNCTION],
    beforePrepareFile: [null, xe.FUNCTION],
    stylePanelLayout: [null, xe.STRING],
    stylePanelAspectRatio: [null, xe.STRING],
    styleItemPanelAspectRatio: [null, xe.STRING],
    styleButtonRemoveItemPosition: ["left", xe.STRING],
    styleButtonProcessItemPosition: ["right", xe.STRING],
    styleLoadIndicatorPosition: ["right", xe.STRING],
    styleProgressIndicatorPosition: ["right", xe.STRING],
    styleButtonRemoveItemAlign: [false, xe.BOOLEAN],
    files: [[], xe.ARRAY],
    credits: [["https://pqina.nl/", "Powered by PQINA"], xe.ARRAY],
  };
  var Ze = function getItemByQuery(e, t) {
    if (z(t)) return e[0] || null;
    if (ie(t)) return e[t] || null;
    typeof t === "object" && (t = t.id);
    return (
      e.find(function (e) {
        return e.id === t;
      }) || null
    );
  };
  var $e = function getNumericAspectRatioFromString(e) {
    if (z(e)) return e;
    if (/:/.test(e)) {
      var t = e.split(":");
      return t[1] / t[0];
    }
    return parseFloat(e);
  };
  var Ke = function getActiveItems(e) {
    return e.filter(function (e) {
      return !e.archived;
    });
  };
  var Je = { EMPTY: 0, IDLE: 1, ERROR: 2, BUSY: 3, READY: 4 };
  var et = null;
  var tt = function canUpdateFileInput() {
    if (et === null)
      try {
        var e = new DataTransfer();
        e.items.add(new File(["hello world"], "This_Works.txt"));
        var t = document.createElement("input");
        t.setAttribute("type", "file");
        t.files = e.files;
        et = t.files.length === 1;
      } catch (e) {
        et = false;
      }
    return et;
  };
  var rt = [Fe.LOAD_ERROR, Fe.PROCESSING_ERROR, Fe.PROCESSING_REVERT_ERROR];
  var nt = [Fe.LOADING, Fe.PROCESSING, Fe.PROCESSING_QUEUED, Fe.INIT];
  var it = [Fe.PROCESSING_COMPLETE];
  var at = function isItemInErrorState(e) {
    return rt.includes(e.status);
  };
  var ot = function isItemInBusyState(e) {
    return nt.includes(e.status);
  };
  var st = function isItemInReadyState(e) {
    return it.includes(e.status);
  };
  var ut = function isAsync(e) {
    return (
      ve(e.options.server) &&
      (ve(e.options.server.process) || oe(e.options.server.process))
    );
  };
  var lt = function queries(e) {
    return {
      GET_STATUS: function GET_STATUS() {
        var t = Ke(e.items);
        var r = Je.EMPTY,
          n = Je.ERROR,
          i = Je.BUSY,
          a = Je.IDLE,
          o = Je.READY;
        return t.length === 0
          ? r
          : t.some(at)
          ? n
          : t.some(ot)
          ? i
          : t.some(st)
          ? o
          : a;
      },
      GET_ITEM: function GET_ITEM(t) {
        return Ze(e.items, t);
      },
      GET_ACTIVE_ITEM: function GET_ACTIVE_ITEM(t) {
        return Ze(Ke(e.items), t);
      },
      GET_ACTIVE_ITEMS: function GET_ACTIVE_ITEMS() {
        return Ke(e.items);
      },
      GET_ITEMS: function GET_ITEMS() {
        return e.items;
      },
      GET_ITEM_NAME: function GET_ITEM_NAME(t) {
        var r = Ze(e.items, t);
        return r ? r.filename : null;
      },
      GET_ITEM_SIZE: function GET_ITEM_SIZE(t) {
        var r = Ze(e.items, t);
        return r ? r.fileSize : null;
      },
      GET_STYLES: function GET_STYLES() {
        return Object.keys(e.options)
          .filter(function (e) {
            return /^style/.test(e);
          })
          .map(function (t) {
            return { name: t, value: e.options[t] };
          });
      },
      GET_PANEL_ASPECT_RATIO: function GET_PANEL_ASPECT_RATIO() {
        var t = /circle/.test(e.options.stylePanelLayout);
        var r = t ? 1 : $e(e.options.stylePanelAspectRatio);
        return r;
      },
      GET_ITEM_PANEL_ASPECT_RATIO: function GET_ITEM_PANEL_ASPECT_RATIO() {
        return e.options.styleItemPanelAspectRatio;
      },
      GET_ITEMS_BY_STATUS: function GET_ITEMS_BY_STATUS(t) {
        return Ke(e.items).filter(function (e) {
          return e.status === t;
        });
      },
      GET_TOTAL_ITEMS: function GET_TOTAL_ITEMS() {
        return Ke(e.items).length;
      },
      SHOULD_UPDATE_FILE_INPUT: function SHOULD_UPDATE_FILE_INPUT() {
        return e.options.storeAsFile && tt() && !ut(e);
      },
      IS_ASYNC: function IS_ASYNC() {
        return ut(e);
      },
      GET_FILE_SIZE_LABELS: function GET_FILE_SIZE_LABELS(e) {
        return {
          labelBytes: e("GET_LABEL_FILE_SIZE_BYTES") || void 0,
          labelKilobytes: e("GET_LABEL_FILE_SIZE_KILOBYTES") || void 0,
          labelMegabytes: e("GET_LABEL_FILE_SIZE_MEGABYTES") || void 0,
          labelGigabytes: e("GET_LABEL_FILE_SIZE_GIGABYTES") || void 0,
        };
      },
    };
  };
  var ct = function hasRoomForItem(e) {
    var t = Ke(e.items).length;
    if (!e.options.allowMultiple) return t === 0;
    var r = e.options.maxFiles;
    return r === null || t < r;
  };
  var ft = function limit(e, t, r) {
    return Math.max(Math.min(r, e), t);
  };
  var dt = function arrayInsert(e, t, r) {
    return e.splice(t, 0, r);
  };
  var vt = function insertItem(e, t, r) {
    if (z(t)) return null;
    if (typeof r === "undefined") {
      e.push(t);
      return t;
    }
    r = ft(r, 0, e.length);
    dt(e, r, t);
    return t;
  };
  var pt = function isBase64DataURI(e) {
    return /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(
      e
    );
  };
  var Et = function getFilenameFromURL(e) {
    return ("" + e).split("/").pop().split("?").shift();
  };
  var _t = function getExtensionFromFilename(e) {
    return e.split(".").pop();
  };
  var Tt = function guesstimateExtension(e) {
    if (typeof e !== "string") return "";
    var t = e.split("/").pop();
    return /svg/.test(t)
      ? "svg"
      : /zip|compressed/.test(t)
      ? "zip"
      : /plain/.test(t)
      ? "txt"
      : /msword/.test(t)
      ? "doc"
      : /[a-z]+/.test(t)
      ? t === "jpeg"
        ? "jpg"
        : t
      : "";
  };
  var It = function leftPad(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return (t + e).slice(-t.length);
  };
  var mt = function getDateString() {
    var e =
      arguments.length > 0 && arguments[0] !== void 0
        ? arguments[0]
        : new Date();
    return (
      e.getFullYear() +
      "-" +
      It(e.getMonth() + 1, "00") +
      "-" +
      It(e.getDate(), "00") +
      "_" +
      It(e.getHours(), "00") +
      "-" +
      It(e.getMinutes(), "00") +
      "-" +
      It(e.getSeconds(), "00")
    );
  };
  var gt = function getFileFromBlob(e, t) {
    var r =
      arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    var n =
      arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    var i =
      typeof r === "string"
        ? e.slice(0, e.size, r)
        : e.slice(0, e.size, e.type);
    i.lastModifiedDate = new Date();
    e._relativePath && (i._relativePath = e._relativePath);
    ee(t) || (t = mt());
    if (t && n === null && _t(t)) i.name = t;
    else {
      n = n || Tt(i.type);
      i.name = t + (n ? "." + n : "");
    }
    return i;
  };
  var ht = function getBlobBuilder() {
    return (window.BlobBuilder =
      window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder);
  };
  var Rt = function createBlob(e, t) {
    var r = ht();
    if (r) {
      var n = new r();
      n.append(e);
      return n.getBlob(t);
    }
    return new Blob([e], { type: t });
  };
  var Ot = function getBlobFromByteStringWithMimeType(e, t) {
    var r = new ArrayBuffer(e.length);
    var n = new Uint8Array(r);
    for (var i = 0; i < e.length; i++) n[i] = e.charCodeAt(i);
    return Rt(r, t);
  };
  var yt = function getMimeTypeFromBase64DataURI(e) {
    return (/^data:(.+);/.exec(e) || [])[1] || null;
  };
  var Dt = function getBase64DataFromBase64DataURI(e) {
    var t = e.split(",")[1];
    return t.replace(/\s/g, "");
  };
  var St = function getByteStringFromBase64DataURI(e) {
    return atob(Dt(e));
  };
  var At = function getBlobFromBase64DataURI(e) {
    var t = yt(e);
    var r = St(e);
    return Ot(r, t);
  };
  var bt = function getFileFromBase64DataURI(e, t, r) {
    return gt(At(e), t, null, r);
  };
  var Pt = function getFileNameFromHeader(e) {
    if (!/^content-disposition:/i.test(e)) return null;
    var t = e
      .split(/filename=|filename\*=.+''/)
      .splice(1)
      .map(function (e) {
        return e.trim().replace(/^["']|[;"']{0,2}$/g, "");
      })
      .filter(function (e) {
        return e.length;
      });
    return t.length ? decodeURI(t[t.length - 1]) : null;
  };
  var Lt = function getFileSizeFromHeader(e) {
    if (/content-length:/i.test(e)) {
      var t = e.match(/[0-9]+/)[0];
      return t ? parseInt(t, 10) : null;
    }
    return null;
  };
  var Mt = function getTranfserIdFromHeader(e) {
    if (/x-content-transfer-id:/i.test(e)) {
      var t = (e.split(":")[1] || "").trim();
      return t || null;
    }
    return null;
  };
  var Ct = function getFileInfoFromHeaders(e) {
    var t = { source: null, name: null, size: null };
    var r = e.split("\n");
    var n = true;
    var i = false;
    var a = void 0;
    try {
      for (
        var o, s = r[Symbol.iterator]();
        !(n = (o = s.next()).done);
        n = true
      ) {
        var u = o.value;
        var l = Pt(u);
        if (l) t.name = l;
        else {
          var c = Lt(u);
          if (c) t.size = c;
          else {
            var f = Mt(u);
            f && (t.source = f);
          }
        }
      }
    } catch (e) {
      i = true;
      a = e;
    } finally {
      try {
        n || s.return == null || s.return();
      } finally {
        if (i) throw a;
      }
    }
    return t;
  };
  var wt = function createFileLoader(e) {
    var t = {
      source: null,
      complete: false,
      progress: 0,
      size: null,
      timestamp: null,
      duration: 0,
      request: null,
    };
    var r = function getProgress() {
      return t.progress;
    };
    var n = function abort() {
      t.request && t.request.abort && t.request.abort();
    };
    var i = function load() {
      var e = t.source;
      o.fire("init", e);
      e instanceof File
        ? o.fire("load", e)
        : e instanceof Blob
        ? o.fire("load", gt(e, e.name))
        : pt(e)
        ? o.fire("load", bt(e))
        : a(e);
    };
    var a = function loadURL(r) {
      if (e) {
        t.timestamp = Date.now();
        t.request = e(
          r,
          function (e) {
            t.duration = Date.now() - t.timestamp;
            t.complete = true;
            e instanceof Blob && (e = gt(e, e.name || Et(r)));
            o.fire("load", e instanceof Blob ? e : e ? e.body : null);
          },
          function (e) {
            o.fire(
              "error",
              typeof e === "string" ? { type: "error", code: 0, body: e } : e
            );
          },
          function (e, r, n) {
            n && (t.size = n);
            t.duration = Date.now() - t.timestamp;
            if (e) {
              t.progress = r / n;
              o.fire("progress", t.progress);
            } else t.progress = null;
          },
          function () {
            o.fire("abort");
          },
          function (e) {
            var r = Ct(typeof e === "string" ? e : e.headers);
            o.fire("meta", {
              size: t.size || r.size,
              filename: r.name,
              source: r.source,
            });
          }
        );
      } else
        o.fire("error", { type: "error", body: "Can't load URL", code: 400 });
    };
    var o = Object.assign({}, Me(), {
      setSource: function setSource(e) {
        return (t.source = e);
      },
      getProgress: r,
      abort: n,
      load: i,
    });
    return o;
  };
  var Nt = function isGet(e) {
    return /GET|HEAD/.test(e);
  };
  var Gt = function sendRequest(e, t, r) {
    var n = {
      onheaders: function onheaders() {},
      onprogress: function onprogress() {},
      onload: function onload() {},
      ontimeout: function ontimeout() {},
      onerror: function onerror() {},
      onabort: function onabort() {},
      abort: function abort() {
        i = true;
        o.abort();
      },
    };
    var i = false;
    var a = false;
    r = Object.assign(
      { method: "POST", headers: {}, withCredentials: false },
      r
    );
    t = encodeURI(t);
    Nt(r.method) &&
      e &&
      (t =
        "" +
        t +
        encodeURIComponent(typeof e === "string" ? e : JSON.stringify(e)));
    var o = new XMLHttpRequest();
    var s = Nt(r.method) ? o : o.upload;
    s.onprogress = function (e) {
      i || n.onprogress(e.lengthComputable, e.loaded, e.total);
    };
    o.onreadystatechange = function () {
      if (!(o.readyState < 2) && (o.readyState !== 4 || o.status !== 0) && !a) {
        a = true;
        n.onheaders(o);
      }
    };
    o.onload = function () {
      o.status >= 200 && o.status < 300 ? n.onload(o) : n.onerror(o);
    };
    o.onerror = function () {
      return n.onerror(o);
    };
    o.onabort = function () {
      i = true;
      n.onabort();
    };
    o.ontimeout = function () {
      return n.ontimeout(o);
    };
    o.open(r.method, t, true);
    ie(r.timeout) && (o.timeout = r.timeout);
    Object.keys(r.headers).forEach(function (e) {
      var t = unescape(encodeURIComponent(r.headers[e]));
      o.setRequestHeader(e, t);
    });
    r.responseType && (o.responseType = r.responseType);
    r.withCredentials && (o.withCredentials = true);
    o.send(e);
    return n;
  };
  var Ft = function createResponse(e, t, r, n) {
    return { type: e, code: t, body: r, headers: n };
  };
  var Ut = function createTimeoutResponse(e) {
    return function (t) {
      e(Ft("error", 0, "Timeout", t.getAllResponseHeaders()));
    };
  };
  var Bt = function hasQS(e) {
    return /\?/.test(e);
  };
  var Vt = function buildURL() {
    var e = "";
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n];
    r.forEach(function (t) {
      e += Bt(e) && Bt(t) ? t.replace(/\?/, "&") : t;
    });
    return e;
  };
  var qt = function createFetchFunction() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var t = arguments.length > 1 ? arguments[1] : void 0;
    if (typeof t === "function") return t;
    if (!t || !ee(t.url)) return null;
    var r =
      t.onload ||
      function (e) {
        return e;
      };
    var n =
      t.onerror ||
      function (e) {
        return null;
      };
    return function (i, a, o, s, u, l) {
      var c = Gt(
        i,
        Vt(e, t.url),
        Object.assign({}, t, { responseType: "blob" })
      );
      c.onload = function (e) {
        var n = e.getAllResponseHeaders();
        var o = Ct(n).name || Et(i);
        a(
          Ft(
            "load",
            e.status,
            t.method === "HEAD" ? null : gt(r(e.response), o),
            n
          )
        );
      };
      c.onerror = function (e) {
        o(
          Ft(
            "error",
            e.status,
            n(e.response) || e.statusText,
            e.getAllResponseHeaders()
          )
        );
      };
      c.onheaders = function (e) {
        l(Ft("headers", e.status, null, e.getAllResponseHeaders()));
      };
      c.ontimeout = Ut(o);
      c.onprogress = s;
      c.onabort = u;
      return c;
    };
  };
  var xt = { QUEUED: 0, COMPLETE: 1, PROCESSING: 2, ERROR: 3, WAITING: 4 };
  var Yt = function processFileChunked(e, t, r, n, i, a, o, s, u, l, c) {
    var f = [];
    var d = c.chunkTransferId,
      v = c.chunkServer,
      p = c.chunkSize,
      E = c.chunkRetryDelays;
    var _ = { serverId: d, aborted: false };
    var T =
      t.ondata ||
      function (e) {
        return e;
      };
    var I =
      t.onload ||
      function (e, t) {
        return t === "HEAD" ? e.getResponseHeader("Upload-Offset") : e.response;
      };
    var m =
      t.onerror ||
      function (e) {
        return null;
      };
    var g = function requestTransferId(a) {
      var s = new FormData();
      ve(i) && s.append(r, JSON.stringify(i));
      var u =
        typeof t.headers === "function"
          ? t.headers(n, i)
          : Object.assign({}, t.headers, { "Upload-Length": n.size });
      var l = Object.assign({}, t, { headers: u });
      var c = Gt(T(s), Vt(e, t.url), l);
      c.onload = function (e) {
        return a(I(e, l.method));
      };
      c.onerror = function (e) {
        return o(
          Ft(
            "error",
            e.status,
            m(e.response) || e.statusText,
            e.getAllResponseHeaders()
          )
        );
      };
      c.ontimeout = Ut(o);
    };
    var h = function requestTransferOffset(r) {
      var n = Vt(e, v.url, _.serverId);
      var i =
        typeof t.headers === "function"
          ? t.headers(_.serverId)
          : Object.assign({}, t.headers);
      var a = { headers: i, method: "HEAD" };
      var s = Gt(null, n, a);
      s.onload = function (e) {
        return r(I(e, a.method));
      };
      s.onerror = function (e) {
        return o(
          Ft(
            "error",
            e.status,
            m(e.response) || e.statusText,
            e.getAllResponseHeaders()
          )
        );
      };
      s.ontimeout = Ut(o);
    };
    var R = Math.floor(n.size / p);
    for (var O = 0; O <= R; O++) {
      var y = O * p;
      var D = n.slice(y, y + p, "application/offset+octet-stream");
      f[O] = {
        index: O,
        size: D.size,
        offset: y,
        data: D,
        file: n,
        progress: 0,
        retries: _toConsumableArray(E),
        status: xt.QUEUED,
        error: null,
        request: null,
        timeout: null,
      };
    }
    var S = function completeProcessingChunks() {
      return a(_.serverId);
    };
    var A = function canProcessChunk(e) {
      return e.status === xt.QUEUED || e.status === xt.ERROR;
    };
    var b = function processChunk(t) {
      if (!_.aborted) {
        t = t || f.find(A);
        if (t) {
          t.status = xt.PROCESSING;
          t.progress = null;
          var r =
            v.ondata ||
            function (e) {
              return e;
            };
          var i =
            v.onerror ||
            function (e) {
              return null;
            };
          var a = Vt(e, v.url, _.serverId);
          var s =
            typeof v.headers === "function"
              ? v.headers(t)
              : Object.assign({}, v.headers, {
                  "Content-Type": "application/offset+octet-stream",
                  "Upload-Offset": t.offset,
                  "Upload-Length": n.size,
                  "Upload-Name": n.name,
                });
          var l = (t.request = Gt(
            r(t.data),
            a,
            Object.assign({}, v, { headers: s })
          ));
          l.onload = function () {
            t.status = xt.COMPLETE;
            t.request = null;
            M();
          };
          l.onprogress = function (e, r, n) {
            t.progress = e ? r : null;
            L();
          };
          l.onerror = function (e) {
            t.status = xt.ERROR;
            t.request = null;
            t.error = i(e.response) || e.statusText;
            P(t) ||
              o(
                Ft(
                  "error",
                  e.status,
                  i(e.response) || e.statusText,
                  e.getAllResponseHeaders()
                )
              );
          };
          l.ontimeout = function (e) {
            t.status = xt.ERROR;
            t.request = null;
            P(t) || Ut(o)(e);
          };
          l.onabort = function () {
            t.status = xt.QUEUED;
            t.request = null;
            u();
          };
        } else
          f.every(function (e) {
            return e.status === xt.COMPLETE;
          }) && S();
      }
    };
    var P = function retryProcessChunk(e) {
      if (e.retries.length === 0) return false;
      e.status = xt.WAITING;
      clearTimeout(e.timeout);
      e.timeout = setTimeout(function () {
        b(e);
      }, e.retries.shift());
      return true;
    };
    var L = function updateTotalProgress() {
      var e = f.reduce(function (e, t) {
        return e === null || t.progress === null ? null : e + t.progress;
      }, 0);
      if (e === null) return s(false, 0, 0);
      var t = f.reduce(function (e, t) {
        return e + t.size;
      }, 0);
      s(true, e, t);
    };
    var M = function processChunks() {
      var e = f.filter(function (e) {
        return e.status === xt.PROCESSING;
      }).length;
      e >= 1 || b();
    };
    var C = function abortChunks() {
      f.forEach(function (e) {
        clearTimeout(e.timeout);
        e.request && e.request.abort();
      });
    };
    _.serverId
      ? h(function (e) {
          if (!_.aborted) {
            f.filter(function (t) {
              return t.offset < e;
            }).forEach(function (e) {
              e.status = xt.COMPLETE;
              e.progress = e.size;
            });
            M();
          }
        })
      : g(function (e) {
          if (!_.aborted) {
            l(e);
            _.serverId = e;
            M();
          }
        });
    return {
      abort: function abort() {
        _.aborted = true;
        C();
      },
    };
  };
  var kt = function createFileProcessorFunction(e, t, r, n) {
    return function (i, a, o, s, u, l, c) {
      if (i) {
        var f = n.chunkUploads;
        var d = f && i.size > n.chunkSize;
        var v = f && (d || n.chunkForce);
        if (i instanceof Blob && v) return Yt(e, t, r, i, a, o, s, u, l, c, n);
        var p =
          t.ondata ||
          function (e) {
            return e;
          };
        var E =
          t.onload ||
          function (e) {
            return e;
          };
        var _ =
          t.onerror ||
          function (e) {
            return null;
          };
        var T =
          typeof t.headers === "function"
            ? t.headers(i, a) || {}
            : Object.assign({}, t.headers);
        var I = Object.assign({}, t, { headers: T });
        var m = new FormData();
        ve(a) && m.append(r, JSON.stringify(a));
        (i instanceof Blob ? [{ name: null, file: i }] : i).forEach(function (
          e
        ) {
          m.append(
            r,
            e.file,
            e.name === null ? e.file.name : "" + e.name + e.file.name
          );
        });
        var g = Gt(p(m), Vt(e, t.url), I);
        g.onload = function (e) {
          o(Ft("load", e.status, E(e.response), e.getAllResponseHeaders()));
        };
        g.onerror = function (e) {
          s(
            Ft(
              "error",
              e.status,
              _(e.response) || e.statusText,
              e.getAllResponseHeaders()
            )
          );
        };
        g.ontimeout = Ut(s);
        g.onprogress = u;
        g.onabort = l;
        return g;
      }
    };
  };
  var jt = function createProcessorFunction() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var t = arguments.length > 1 ? arguments[1] : void 0;
    var r = arguments.length > 2 ? arguments[2] : void 0;
    var n = arguments.length > 3 ? arguments[3] : void 0;
    return typeof t === "function"
      ? function () {
          for (var e = arguments.length, i = new Array(e), a = 0; a < e; a++)
            i[a] = arguments[a];
          return t.apply(void 0, [r].concat(i, [n]));
        }
      : t && ee(t.url)
      ? kt(e, t, r, n)
      : null;
  };
  var Ht = function createRevertFunction() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var t = arguments.length > 1 ? arguments[1] : void 0;
    if (typeof t === "function") return t;
    if (!t || !ee(t.url))
      return function (e, t) {
        return t();
      };
    var r =
      t.onload ||
      function (e) {
        return e;
      };
    var n =
      t.onerror ||
      function (e) {
        return null;
      };
    return function (i, a, o) {
      var s = Gt(i, e + t.url, t);
      s.onload = function (e) {
        a(Ft("load", e.status, r(e.response), e.getAllResponseHeaders()));
      };
      s.onerror = function (e) {
        o(
          Ft(
            "error",
            e.status,
            n(e.response) || e.statusText,
            e.getAllResponseHeaders()
          )
        );
      };
      s.ontimeout = Ut(o);
      return s;
    };
  };
  var Wt = function getRandomNumber() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    return e + Math.random() * (t - e);
  };
  var Xt = function createPerceivedPerformanceUpdater(e) {
    var t =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
    arguments.length > 2 && arguments[2] !== void 0 && arguments[2];
    var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 25;
    var n =
      arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 250;
    var i = null;
    var a = Date.now();
    var o = function tick() {
      var o = Date.now() - a;
      var s = Wt(r, n);
      o + s > t && (s = o + s - t);
      var u = o / t;
      if (u >= 1 || document.hidden) e(1);
      else {
        e(u);
        i = setTimeout(tick, s);
      }
    };
    t > 0 && o();
    return {
      clear: function clear() {
        clearTimeout(i);
      },
    };
  };
  var zt = function createFileProcessor(e, t) {
    var r = {
      complete: false,
      perceivedProgress: 0,
      perceivedPerformanceUpdater: null,
      progress: null,
      timestamp: null,
      perceivedDuration: 0,
      duration: 0,
      request: null,
      response: null,
    };
    var n = t.allowMinimumUploadDuration;
    var i = function process(t, i) {
      var a = function progressFn() {
        r.duration !== 0 &&
          r.progress !== null &&
          l.fire("progress", l.getProgress());
      };
      var o = function completeFn() {
        r.complete = true;
        l.fire("load-perceived", r.response.body);
      };
      l.fire("start");
      r.timestamp = Date.now();
      r.perceivedPerformanceUpdater = Xt(
        function (e) {
          r.perceivedProgress = e;
          r.perceivedDuration = Date.now() - r.timestamp;
          a();
          r.response && r.perceivedProgress === 1 && !r.complete && o();
        },
        n ? Wt(750, 1500) : 0
      );
      r.request = e(
        t,
        i,
        function (e) {
          r.response = ve(e)
            ? e
            : { type: "load", code: 200, body: "" + e, headers: {} };
          r.duration = Date.now() - r.timestamp;
          r.progress = 1;
          l.fire("load", r.response.body);
          (!n || (n && r.perceivedProgress === 1)) && o();
        },
        function (e) {
          r.perceivedPerformanceUpdater.clear();
          l.fire("error", ve(e) ? e : { type: "error", code: 0, body: "" + e });
        },
        function (e, t, n) {
          r.duration = Date.now() - r.timestamp;
          r.progress = e ? t / n : null;
          a();
        },
        function () {
          r.perceivedPerformanceUpdater.clear();
          l.fire("abort", r.response ? r.response.body : null);
        },
        function (e) {
          l.fire("transfer", e);
        }
      );
    };
    var a = function abort() {
      if (r.request) {
        r.perceivedPerformanceUpdater.clear();
        r.request.abort && r.request.abort();
        r.complete = true;
      }
    };
    var o = function reset() {
      a();
      r.complete = false;
      r.perceivedProgress = 0;
      r.progress = 0;
      r.timestamp = null;
      r.perceivedDuration = 0;
      r.duration = 0;
      r.request = null;
      r.response = null;
    };
    var s = n
      ? function () {
          return r.progress ? Math.min(r.progress, r.perceivedProgress) : null;
        }
      : function () {
          return r.progress || null;
        };
    var u = n
      ? function () {
          return Math.min(r.duration, r.perceivedDuration);
        }
      : function () {
          return r.duration;
        };
    var l = Object.assign({}, Me(), {
      process: i,
      abort: a,
      getProgress: s,
      getDuration: u,
      reset: o,
    });
    return l;
  };
  var Qt = function getFilenameWithoutExtension(e) {
    return e.substring(0, e.lastIndexOf(".")) || e;
  };
  var Zt = function createFileStub(e) {
    var t = [e.name, e.size, e.type];
    if (e instanceof Blob || pt(e)) t[0] = e.name || mt();
    else if (pt(e)) {
      t[1] = e.length;
      t[2] = yt(e);
    } else if (ee(e)) {
      t[0] = Et(e);
      t[1] = 0;
      t[2] = "application/octet-stream";
    }
    return { name: t[0], size: t[1], type: t[2] };
  };
  var $t = function isFile(e) {
    return !!(e instanceof File || (e instanceof Blob && e.name));
  };
  var Kt = function deepCloneObject(e) {
    if (!ve(e)) return e;
    var t = X(e) ? [] : {};
    for (var r in e)
      if (e.hasOwnProperty(r)) {
        var n = e[r];
        t[r] = n && ve(n) ? deepCloneObject(n) : n;
      }
    return t;
  };
  var Jt = function createItem() {
    var e =
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    var t =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var r =
      arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    var n = be();
    var i = {
      archived: false,
      frozen: false,
      released: false,
      source: null,
      file: r,
      serverFileReference: t,
      transferId: null,
      processingAborted: false,
      status: t ? Fe.PROCESSING_COMPLETE : Fe.INIT,
      activeLoader: null,
      activeProcessor: null,
    };
    var a = null;
    var s = {};
    var u = function setStatus(e) {
      return (i.status = e);
    };
    var l = function fire(e) {
      if (!i.released && !i.frozen) {
        for (
          var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1;
          n < t;
          n++
        )
          r[n - 1] = arguments[n];
        O.fire.apply(O, [e].concat(r));
      }
    };
    var c = function getFileExtension() {
      return _t(i.file.name);
    };
    var f = function getFileType() {
      return i.file.type;
    };
    var d = function getFileSize() {
      return i.file.size;
    };
    var v = function getFile() {
      return i.file;
    };
    var p = function load(t, r, n) {
      i.source = t;
      O.fireSync("init");
      if (i.file) O.fireSync("load-skip");
      else {
        i.file = Zt(t);
        r.on("init", function () {
          l("load-init");
        });
        r.on("meta", function (t) {
          i.file.size = t.size;
          i.file.filename = t.filename;
          if (t.source) {
            e = Ue.LIMBO;
            i.serverFileReference = t.source;
            i.status = Fe.PROCESSING_COMPLETE;
          }
          l("load-meta");
        });
        r.on("progress", function (e) {
          u(Fe.LOADING);
          l("load-progress", e);
        });
        r.on("error", function (e) {
          u(Fe.LOAD_ERROR);
          l("load-request-error", e);
        });
        r.on("abort", function () {
          u(Fe.INIT);
          l("load-abort");
        });
        r.on("load", function (t) {
          i.activeLoader = null;
          var r = function success(t) {
            i.file = $t(t) ? t : i.file;
            e === Ue.LIMBO && i.serverFileReference
              ? u(Fe.PROCESSING_COMPLETE)
              : u(Fe.IDLE);
            l("load");
          };
          var a = function error(e) {
            i.file = t;
            l("load-meta");
            u(Fe.LOAD_ERROR);
            l("load-file-error", e);
          };
          i.serverFileReference ? r(t) : n(t, r, a);
        });
        r.setSource(t);
        i.activeLoader = r;
        r.load();
      }
    };
    var E = function retryLoad() {
      i.activeLoader && i.activeLoader.load();
    };
    var _ = function abortLoad() {
      if (i.activeLoader) i.activeLoader.abort();
      else {
        u(Fe.INIT);
        l("load-abort");
      }
    };
    var T = function process(e, t) {
      if (i.processingAborted) i.processingAborted = false;
      else {
        u(Fe.PROCESSING);
        a = null;
        if (i.file instanceof Blob) {
          e.on("load", function (e) {
            i.transferId = null;
            i.serverFileReference = e;
          });
          e.on("transfer", function (e) {
            i.transferId = e;
          });
          e.on("load-perceived", function (e) {
            i.activeProcessor = null;
            i.transferId = null;
            i.serverFileReference = e;
            u(Fe.PROCESSING_COMPLETE);
            l("process-complete", e);
          });
          e.on("start", function () {
            l("process-start");
          });
          e.on("error", function (e) {
            i.activeProcessor = null;
            u(Fe.PROCESSING_ERROR);
            l("process-error", e);
          });
          e.on("abort", function (e) {
            i.activeProcessor = null;
            i.serverFileReference = e;
            u(Fe.IDLE);
            l("process-abort");
            a && a();
          });
          e.on("progress", function (e) {
            l("process-progress", e);
          });
          var r = function success(t) {
            i.archived || e.process(t, Object.assign({}, s));
          };
          var n = console.error;
          t(i.file, r, n);
          i.activeProcessor = e;
        } else
          O.on("load", function () {
            process(e, t);
          });
      }
    };
    var I = function requestProcessing() {
      i.processingAborted = false;
      u(Fe.PROCESSING_QUEUED);
    };
    var m = function abortProcessing() {
      return new Promise(function (e) {
        if (i.activeProcessor) {
          a = function abortProcessingRequestComplete() {
            e();
          };
          i.activeProcessor.abort();
        } else {
          i.processingAborted = true;
          u(Fe.IDLE);
          l("process-abort");
          e();
        }
      });
    };
    var g = function revert(e, t) {
      return new Promise(function (r, n) {
        var a =
          i.serverFileReference !== null ? i.serverFileReference : i.transferId;
        if (a !== null) {
          e(
            a,
            function () {
              i.serverFileReference = null;
              i.transferId = null;
              r();
            },
            function (e) {
              if (t) {
                u(Fe.PROCESSING_REVERT_ERROR);
                l("process-revert-error");
                n(e);
              } else r();
            }
          );
          u(Fe.IDLE);
          l("process-revert");
        } else r();
      });
    };
    var h = function setMetadata(e, t, r) {
      var n = e.split(".");
      var i = n[0];
      var a = n.pop();
      var o = s;
      n.forEach(function (e) {
        return (o = o[e]);
      });
      if (JSON.stringify(o[a]) !== JSON.stringify(t)) {
        o[a] = t;
        l("metadata-update", { key: i, value: s[i], silent: r });
      }
    };
    var R = function getMetadata(e) {
      return Kt(e ? s[e] : s);
    };
    var O = Object.assign(
      {
        id: {
          get: function get() {
            return n;
          },
        },
        origin: {
          get: function get() {
            return e;
          },
          set: function set(t) {
            return (e = t);
          },
        },
        serverId: {
          get: function get() {
            return i.serverFileReference;
          },
        },
        transferId: {
          get: function get() {
            return i.transferId;
          },
        },
        status: {
          get: function get() {
            return i.status;
          },
        },
        filename: {
          get: function get() {
            return i.file.name;
          },
        },
        filenameWithoutExtension: {
          get: function get() {
            return Qt(i.file.name);
          },
        },
        fileExtension: { get: c },
        fileType: { get: f },
        fileSize: { get: d },
        file: { get: v },
        relativePath: {
          get: function get() {
            return i.file._relativePath;
          },
        },
        source: {
          get: function get() {
            return i.source;
          },
        },
        getMetadata: R,
        setMetadata: function setMetadata(e, t, r) {
          if (ve(e)) {
            var n = e;
            Object.keys(n).forEach(function (e) {
              h(e, n[e], t);
            });
            return e;
          }
          h(e, t, r);
          return t;
        },
        extend: function extend(e, t) {
          return (y[e] = t);
        },
        abortLoad: _,
        retryLoad: E,
        requestProcessing: I,
        abortProcessing: m,
        load: p,
        process: T,
        revert: g,
      },
      Me(),
      {
        freeze: function freeze() {
          return (i.frozen = true);
        },
        release: function release() {
          return (i.released = true);
        },
        released: {
          get: function get() {
            return i.released;
          },
        },
        archive: function archive() {
          return (i.archived = true);
        },
        archived: {
          get: function get() {
            return i.archived;
          },
        },
        setFile: function setFile(e) {
          return (i.file = e);
        },
      }
    );
    var y = o(O);
    return y;
  };
  var er = function getItemIndexByQuery(e, t) {
    return z(t)
      ? 0
      : ee(t)
      ? e.findIndex(function (e) {
          return e.id === t;
        })
      : -1;
  };
  var tr = function getItemById(e, t) {
    var r = er(e, t);
    if (!(r < 0)) return e[r] || null;
  };
  var rr = function fetchBlob(e, t, r, n, i, a) {
    var o = Gt(null, e, { method: "GET", responseType: "blob" });
    o.onload = function (r) {
      var n = r.getAllResponseHeaders();
      var i = Ct(n).name || Et(e);
      t(Ft("load", r.status, gt(r.response, i), n));
    };
    o.onerror = function (e) {
      r(Ft("error", e.status, e.statusText, e.getAllResponseHeaders()));
    };
    o.onheaders = function (e) {
      a(Ft("headers", e.status, null, e.getAllResponseHeaders()));
    };
    o.ontimeout = Ut(r);
    o.onprogress = n;
    o.onabort = i;
    return o;
  };
  var nr = function getDomainFromURL(e) {
    e.indexOf("//") === 0 && (e = location.protocol + e);
    return e
      .toLowerCase()
      .replace("blob:", "")
      .replace(/([a-z])?:\/\//, "$1")
      .split("/")[0];
  };
  var ir = function isExternalURL(e) {
    return (
      (e.indexOf(":") > -1 || e.indexOf("//") > -1) &&
      nr(location.href) !== nr(e)
    );
  };
  var ar = function dynamicLabel(e) {
    return function () {
      return oe(e) ? e.apply(void 0, arguments) : e;
    };
  };
  var or = function isMockItem(e) {
    return !$t(e.file);
  };
  var sr = function listUpdated(e, t) {
    clearTimeout(t.listUpdateTimeout);
    t.listUpdateTimeout = setTimeout(function () {
      e("DID_UPDATE_ITEMS", { items: Ke(t.items) });
    }, 0);
  };
  var ur = function optionalPromise(e) {
    for (
      var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1;
      n < t;
      n++
    )
      r[n - 1] = arguments[n];
    return new Promise(function (t) {
      if (!e) return t(true);
      var n = e.apply(void 0, r);
      if (n == null) return t(true);
      if (typeof n === "boolean") return t(n);
      typeof n.then === "function" && n.then(t);
    });
  };
  var lr = function sortItems(e, t) {
    e.items.sort(function (e, r) {
      return t(Ne(e), Ne(r));
    });
  };
  var cr = function getItemByQueryFromState(e, t) {
    return function () {
      var r =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var n = r.query,
        i = r.success,
        a = i === void 0 ? function () {} : i,
        o = r.failure,
        s = o === void 0 ? function () {} : o,
        u = _objectWithoutProperties(r, ["query", "success", "failure"]);
      var l = Ze(e.items, n);
      l
        ? t(l, a, s, u || {})
        : s({ error: Ft("error", 0, "Item not found"), file: null });
    };
  };
  var fr = function actions(e, t, r) {
    return {
      ABORT_ALL: function ABORT_ALL() {
        Ke(r.items).forEach(function (e) {
          e.freeze();
          e.abortLoad();
          e.abortProcessing();
        });
      },
      DID_SET_FILES: function DID_SET_FILES(t) {
        var n = t.value,
          i = n === void 0 ? [] : n;
        var a = i.map(function (e) {
          return { source: e.source ? e.source : e, options: e.options };
        });
        var o = Ke(r.items);
        o.forEach(function (t) {
          a.find(function (e) {
            return e.source === t.source || e.source === t.file;
          }) || e("REMOVE_ITEM", { query: t, remove: false });
        });
        o = Ke(r.items);
        a.forEach(function (t, r) {
          o.find(function (e) {
            return e.source === t.source || e.file === t.source;
          }) ||
            e(
              "ADD_ITEM",
              Object.assign({}, t, { interactionMethod: Ae.NONE, index: r })
            );
        });
      },
      DID_UPDATE_ITEM_METADATA: function DID_UPDATE_ITEM_METADATA(n) {
        var i = n.id,
          a = n.action,
          o = n.change;
        if (!o.silent) {
          clearTimeout(r.itemUpdateTimeout);
          r.itemUpdateTimeout = setTimeout(function () {
            var n = tr(r.items, i);
            if (t("IS_ASYNC")) {
              n.origin === Ue.LOCAL &&
                e("DID_LOAD_ITEM", {
                  id: n.id,
                  error: null,
                  serverFileReference: n.source,
                });
              var s = function upload() {
                setTimeout(function () {
                  e("REQUEST_ITEM_PROCESSING", { query: i });
                }, 32);
              };
              var u = function revert(e) {
                n.revert(
                  Ht(r.options.server.url, r.options.server.revert),
                  t("GET_FORCE_REVERT")
                )
                  .then(e ? s : function () {})
                  .catch(function () {});
              };
              var l = function abort(e) {
                n.abortProcessing().then(e ? s : function () {});
              };
              if (n.status === Fe.PROCESSING_COMPLETE)
                return u(r.options.instantUpload);
              if (n.status === Fe.PROCESSING) return l(r.options.instantUpload);
              r.options.instantUpload && s();
            } else
              ke("SHOULD_PREPARE_OUTPUT", false, {
                item: n,
                query: t,
                action: a,
                change: o,
              }).then(function (r) {
                var a = t("GET_BEFORE_PREPARE_FILE");
                a && (r = a(n, r));
                r &&
                  e(
                    "REQUEST_PREPARE_OUTPUT",
                    {
                      query: i,
                      item: n,
                      success: function success(t) {
                        e("DID_PREPARE_OUTPUT", { id: i, file: t });
                      },
                    },
                    true
                  );
              });
          }, 0);
        }
      },
      MOVE_ITEM: function MOVE_ITEM(e) {
        var t = e.query,
          n = e.index;
        var i = Ze(r.items, t);
        if (i) {
          var a = r.items.indexOf(i);
          n = ft(n, 0, r.items.length - 1);
          a !== n && r.items.splice(n, 0, r.items.splice(a, 1)[0]);
        }
      },
      SORT: function SORT(n) {
        var i = n.compare;
        lr(r, i);
        e("DID_SORT_ITEMS", { items: t("GET_ACTIVE_ITEMS") });
      },
      ADD_ITEMS: function ADD_ITEMS(r) {
        var n = r.items,
          i = r.index,
          a = r.interactionMethod,
          o = r.success,
          s = o === void 0 ? function () {} : o,
          u = r.failure,
          l = u === void 0 ? function () {} : u;
        var c = i;
        if (i === -1 || typeof i === "undefined") {
          var f = t("GET_ITEM_INSERT_LOCATION");
          var d = t("GET_TOTAL_ITEMS");
          c = f === "before" ? 0 : d;
        }
        var v = t("GET_IGNORED_FILES");
        var p = function isValidFile(e) {
          return $t(e) ? !v.includes(e.name.toLowerCase()) : !z(e);
        };
        var E = n.filter(p);
        var _ = E.map(function (t) {
          return new Promise(function (r, n) {
            e("ADD_ITEM", {
              interactionMethod: a,
              source: t.source || t,
              success: r,
              failure: n,
              index: c++,
              options: t.options || {},
            });
          });
        });
        Promise.all(_).then(s).catch(l);
      },
      /**
       * @param source
       * @param index
       * @param interactionMethod
       */
      ADD_ITEM: function ADD_ITEM(n) {
        var i = n.source,
          a = n.index,
          o = a === void 0 ? -1 : a,
          s = n.interactionMethod,
          u = n.success,
          l = u === void 0 ? function () {} : u,
          c = n.failure,
          f = c === void 0 ? function () {} : c,
          d = n.options,
          v = d === void 0 ? {} : d;
        if (z(i)) f({ error: Ft("error", 0, "No source"), file: null });
        else if (
          !$t(i) ||
          !r.options.ignoredFiles.includes(i.name.toLowerCase())
        ) {
          if (!ct(r)) {
            if (
              r.options.allowMultiple ||
              (!r.options.allowMultiple && !r.options.allowReplace)
            ) {
              var p = Ft("warning", 0, "Max files");
              e("DID_THROW_MAX_FILES", { source: i, error: p });
              f({ error: p, file: null });
              return;
            }
            var E = Ke(r.items)[0];
            if (
              E.status === Fe.PROCESSING_COMPLETE ||
              E.status === Fe.PROCESSING_REVERT_ERROR
            ) {
              var _ = t("GET_FORCE_REVERT");
              E.revert(Ht(r.options.server.url, r.options.server.revert), _)
                .then(function () {
                  _ &&
                    e("ADD_ITEM", {
                      source: i,
                      index: o,
                      interactionMethod: s,
                      success: l,
                      failure: f,
                      options: v,
                    });
                })
                .catch(function () {});
              if (_) return;
            }
            e("REMOVE_ITEM", { query: E.id });
          }
          var T =
            v.type === "local"
              ? Ue.LOCAL
              : v.type === "limbo"
              ? Ue.LIMBO
              : Ue.INPUT;
          var I = Jt(T, T === Ue.INPUT ? null : i, v.file);
          Object.keys(v.metadata || {}).forEach(function (e) {
            I.setMetadata(e, v.metadata[e]);
          });
          je("DID_CREATE_ITEM", I, { query: t, dispatch: e });
          var m = t("GET_ITEM_INSERT_LOCATION");
          r.options.itemInsertLocationFreedom ||
            (o = m === "before" ? -1 : r.items.length);
          vt(r.items, I, o);
          oe(m) && i && lr(r, m);
          var g = I.id;
          I.on("init", function () {
            e("DID_INIT_ITEM", { id: g });
          });
          I.on("load-init", function () {
            e("DID_START_ITEM_LOAD", { id: g });
          });
          I.on("load-meta", function () {
            e("DID_UPDATE_ITEM_META", { id: g });
          });
          I.on("load-progress", function (t) {
            e("DID_UPDATE_ITEM_LOAD_PROGRESS", { id: g, progress: t });
          });
          I.on("load-request-error", function (t) {
            var n = ar(r.options.labelFileLoadError)(t);
            if (t.code >= 400 && t.code < 500) {
              e("DID_THROW_ITEM_INVALID", {
                id: g,
                error: t,
                status: { main: n, sub: t.code + " (" + t.body + ")" },
              });
              f({ error: t, file: Ne(I) });
            } else e("DID_THROW_ITEM_LOAD_ERROR", { id: g, error: t, status: { main: n, sub: r.options.labelTapToRetry } });
          });
          I.on("load-file-error", function (t) {
            e("DID_THROW_ITEM_INVALID", {
              id: g,
              error: t.status,
              status: t.status,
            });
            f({ error: t.status, file: Ne(I) });
          });
          I.on("load-abort", function () {
            e("REMOVE_ITEM", { query: g });
          });
          I.on("load-skip", function () {
            I.on("metadata-update", function (t) {
              $t(I.file) && e("DID_UPDATE_ITEM_METADATA", { id: g, change: t });
            });
            e("COMPLETE_LOAD_ITEM", {
              query: g,
              item: I,
              data: { source: i, success: l },
            });
          });
          I.on("load", function () {
            var n = function handleAdd(n) {
              if (n) {
                I.on("metadata-update", function (t) {
                  e("DID_UPDATE_ITEM_METADATA", { id: g, change: t });
                });
                ke("SHOULD_PREPARE_OUTPUT", false, { item: I, query: t }).then(
                  function (n) {
                    var a = t("GET_BEFORE_PREPARE_FILE");
                    a && (n = a(I, n));
                    var o = function loadComplete() {
                      e("COMPLETE_LOAD_ITEM", {
                        query: g,
                        item: I,
                        data: { source: i, success: l },
                      });
                      sr(e, r);
                    };
                    n
                      ? e(
                          "REQUEST_PREPARE_OUTPUT",
                          {
                            query: g,
                            item: I,
                            success: function success(t) {
                              e("DID_PREPARE_OUTPUT", { id: g, file: t });
                              o();
                            },
                          },
                          true
                        )
                      : o();
                  }
                );
              } else e("REMOVE_ITEM", { query: g });
            };
            ke("DID_LOAD_ITEM", I, { query: t, dispatch: e })
              .then(function () {
                ur(t("GET_BEFORE_ADD_FILE"), Ne(I)).then(n);
              })
              .catch(function (t) {
                if (!t || !t.error || !t.status) return n(false);
                e("DID_THROW_ITEM_INVALID", {
                  id: g,
                  error: t.error,
                  status: t.status,
                });
              });
          });
          I.on("process-start", function () {
            e("DID_START_ITEM_PROCESSING", { id: g });
          });
          I.on("process-progress", function (t) {
            e("DID_UPDATE_ITEM_PROCESS_PROGRESS", { id: g, progress: t });
          });
          I.on("process-error", function (t) {
            e("DID_THROW_ITEM_PROCESSING_ERROR", {
              id: g,
              error: t,
              status: {
                main: ar(r.options.labelFileProcessingError)(t),
                sub: r.options.labelTapToRetry,
              },
            });
          });
          I.on("process-revert-error", function (t) {
            e("DID_THROW_ITEM_PROCESSING_REVERT_ERROR", {
              id: g,
              error: t,
              status: {
                main: ar(r.options.labelFileProcessingRevertError)(t),
                sub: r.options.labelTapToRetry,
              },
            });
          });
          I.on("process-complete", function (t) {
            e("DID_COMPLETE_ITEM_PROCESSING", {
              id: g,
              error: null,
              serverFileReference: t,
            });
            e("DID_DEFINE_VALUE", { id: g, value: t });
          });
          I.on("process-abort", function () {
            e("DID_ABORT_ITEM_PROCESSING", { id: g });
          });
          I.on("process-revert", function () {
            e("DID_REVERT_ITEM_PROCESSING", { id: g });
            e("DID_DEFINE_VALUE", { id: g, value: null });
          });
          e("DID_ADD_ITEM", { id: g, index: o, interactionMethod: s });
          sr(e, r);
          var h = r.options.server || {},
            R = h.url,
            O = h.load,
            y = h.restore,
            D = h.fetch;
          I.load(
            i,
            wt(
              T === Ue.INPUT
                ? ee(i) && ir(i) && D
                  ? qt(R, D)
                  : rr
                : T === Ue.LIMBO
                ? qt(R, y)
                : qt(R, O)
            ),
            function (e, r, n) {
              ke("LOAD_FILE", e, { query: t }).then(r).catch(n);
            }
          );
        }
      },
      REQUEST_PREPARE_OUTPUT: function REQUEST_PREPARE_OUTPUT(e) {
        var r = e.item,
          n = e.success,
          i = e.failure,
          a = i === void 0 ? function () {} : i;
        var o = { error: Ft("error", 0, "Item not found"), file: null };
        if (r.archived) return a(o);
        ke("PREPARE_OUTPUT", r.file, { query: t, item: r }).then(function (e) {
          ke("COMPLETE_PREPARE_OUTPUT", e, { query: t, item: r }).then(
            function (e) {
              if (r.archived) return a(o);
              n(e);
            }
          );
        });
      },
      COMPLETE_LOAD_ITEM: function COMPLETE_LOAD_ITEM(n) {
        var i = n.item,
          a = n.data;
        var o = a.success,
          s = a.source;
        var u = t("GET_ITEM_INSERT_LOCATION");
        oe(u) && s && lr(r, u);
        e("DID_LOAD_ITEM", {
          id: i.id,
          error: null,
          serverFileReference: i.origin === Ue.INPUT ? null : s,
        });
        o(Ne(i));
        if (i.origin !== Ue.LOCAL)
          if (i.origin !== Ue.LIMBO)
            t("IS_ASYNC") &&
              r.options.instantUpload &&
              e("REQUEST_ITEM_PROCESSING", { query: i.id });
          else {
            e("DID_COMPLETE_ITEM_PROCESSING", {
              id: i.id,
              error: null,
              serverFileReference: s,
            });
            e("DID_DEFINE_VALUE", { id: i.id, value: i.serverId || s });
          }
        else e("DID_LOAD_LOCAL_ITEM", { id: i.id });
      },
      RETRY_ITEM_LOAD: cr(r, function (e) {
        e.retryLoad();
      }),
      REQUEST_ITEM_PREPARE: cr(r, function (t, r, n) {
        e(
          "REQUEST_PREPARE_OUTPUT",
          {
            query: t.id,
            item: t,
            success: function success(n) {
              e("DID_PREPARE_OUTPUT", { id: t.id, file: n });
              r({ file: t, output: n });
            },
            failure: n,
          },
          true
        );
      }),
      REQUEST_ITEM_PROCESSING: cr(r, function (n, i, a) {
        var o = n.status === Fe.IDLE || n.status === Fe.PROCESSING_ERROR;
        if (o) {
          if (n.status !== Fe.PROCESSING_QUEUED) {
            n.requestProcessing();
            e("DID_REQUEST_ITEM_PROCESSING", { id: n.id });
            e("PROCESS_ITEM", { query: n, success: i, failure: a }, true);
          }
        } else {
          var s = function processNow() {
            return e("REQUEST_ITEM_PROCESSING", {
              query: n,
              success: i,
              failure: a,
            });
          };
          var u = function process() {
            return document.hidden ? s() : setTimeout(s, 32);
          };
          n.status === Fe.PROCESSING_COMPLETE ||
          n.status === Fe.PROCESSING_REVERT_ERROR
            ? n
                .revert(
                  Ht(r.options.server.url, r.options.server.revert),
                  t("GET_FORCE_REVERT")
                )
                .then(u)
                .catch(function () {})
            : n.status === Fe.PROCESSING && n.abortProcessing().then(u);
        }
      }),
      PROCESS_ITEM: cr(r, function (n, i, a) {
        var o = t("GET_MAX_PARALLEL_UPLOADS");
        var s = t("GET_ITEMS_BY_STATUS", Fe.PROCESSING).length;
        if (s !== o) {
          if (n.status !== Fe.PROCESSING) {
            var u = function processNext() {
              var t = r.processingQueue.shift();
              if (t) {
                var n = t.id,
                  i = t.success,
                  a = t.failure;
                var o = Ze(r.items, n);
                o && !o.archived
                  ? e(
                      "PROCESS_ITEM",
                      { query: n, success: i, failure: a },
                      true
                    )
                  : processNext();
              }
            };
            n.onOnce("process-complete", function () {
              i(Ne(n));
              u();
              var a = r.options.server;
              var o = r.options.instantUpload;
              if (o && n.origin === Ue.LOCAL && oe(a.remove)) {
                var s = function noop() {};
                n.origin = Ue.LIMBO;
                r.options.server.remove(n.source, s, s);
              }
              var l =
                t("GET_ITEMS_BY_STATUS", Fe.PROCESSING_COMPLETE).length ===
                r.items.length;
              l && e("DID_COMPLETE_ITEM_PROCESSING_ALL");
            });
            n.onOnce("process-error", function (e) {
              a({ error: e, file: Ne(n) });
              u();
            });
            var l = r.options;
            n.process(
              zt(
                jt(l.server.url, l.server.process, l.name, {
                  chunkTransferId: n.transferId,
                  chunkServer: l.server.patch,
                  chunkUploads: l.chunkUploads,
                  chunkForce: l.chunkForce,
                  chunkSize: l.chunkSize,
                  chunkRetryDelays: l.chunkRetryDelays,
                }),
                {
                  allowMinimumUploadDuration: t(
                    "GET_ALLOW_MINIMUM_UPLOAD_DURATION"
                  ),
                }
              ),
              function (r, i, a) {
                ke("PREPARE_OUTPUT", r, { query: t, item: n })
                  .then(function (t) {
                    e("DID_PREPARE_OUTPUT", { id: n.id, file: t });
                    i(t);
                  })
                  .catch(a);
              }
            );
          }
        } else r.processingQueue.push({ id: n.id, success: i, failure: a });
      }),
      RETRY_ITEM_PROCESSING: cr(r, function (t) {
        e("REQUEST_ITEM_PROCESSING", { query: t });
      }),
      REQUEST_REMOVE_ITEM: cr(r, function (r) {
        ur(t("GET_BEFORE_REMOVE_FILE"), Ne(r)).then(function (t) {
          t && e("REMOVE_ITEM", { query: r });
        });
      }),
      RELEASE_ITEM: cr(r, function (e) {
        e.release();
      }),
      REMOVE_ITEM: cr(r, function (n, i, a, o) {
        var s = function removeFromView() {
          var t = n.id;
          tr(r.items, t).archive();
          e("DID_REMOVE_ITEM", { error: null, id: t, item: n });
          sr(e, r);
          i(Ne(n));
        };
        var u = r.options.server;
        if (n.origin === Ue.LOCAL && u && oe(u.remove) && o.remove !== false) {
          e("DID_START_ITEM_REMOVE", { id: n.id });
          u.remove(
            n.source,
            function () {
              return s();
            },
            function (t) {
              e("DID_THROW_ITEM_REMOVE_ERROR", {
                id: n.id,
                error: Ft("error", 0, t, null),
                status: {
                  main: ar(r.options.labelFileRemoveError)(t),
                  sub: r.options.labelTapToRetry,
                },
              });
            }
          );
        } else {
          ((o.revert && n.origin !== Ue.LOCAL && n.serverId !== null) ||
            (r.options.chunkUploads && n.file.size > r.options.chunkSize) ||
            (r.options.chunkUploads && r.options.chunkForce)) &&
            n.revert(
              Ht(r.options.server.url, r.options.server.revert),
              t("GET_FORCE_REVERT")
            );
          s();
        }
      }),
      ABORT_ITEM_LOAD: cr(r, function (e) {
        e.abortLoad();
      }),
      ABORT_ITEM_PROCESSING: cr(r, function (t) {
        t.serverId
          ? e("REVERT_ITEM_PROCESSING", { id: t.id })
          : t.abortProcessing().then(function () {
              var n = r.options.instantUpload;
              n && e("REMOVE_ITEM", { query: t.id });
            });
      }),
      REQUEST_REVERT_ITEM_PROCESSING: cr(r, function (n) {
        if (r.options.instantUpload) {
          var i = function handleRevert(t) {
            t && e("REVERT_ITEM_PROCESSING", { query: n });
          };
          var a = t("GET_BEFORE_REMOVE_FILE");
          if (!a) return i(true);
          var o = a(Ne(n));
          if (o == null) return i(true);
          if (typeof o === "boolean") return i(o);
          typeof o.then === "function" && o.then(i);
        } else e("REVERT_ITEM_PROCESSING", { query: n });
      }),
      REVERT_ITEM_PROCESSING: cr(r, function (n) {
        n.revert(
          Ht(r.options.server.url, r.options.server.revert),
          t("GET_FORCE_REVERT")
        )
          .then(function () {
            var t = r.options.instantUpload || or(n);
            t && e("REMOVE_ITEM", { query: n.id });
          })
          .catch(function () {});
      }),
      SET_OPTIONS: function SET_OPTIONS(t) {
        var r = t.options;
        var n = Object.keys(r);
        var i = dr.filter(function (e) {
          return n.includes(e);
        });
        var a = [].concat(
          _toConsumableArray(i),
          _toConsumableArray(
            Object.keys(r).filter(function (e) {
              return !i.includes(e);
            })
          )
        );
        a.forEach(function (t) {
          e("SET_" + Oe(t, "_").toUpperCase(), { value: r[t] });
        });
      },
    };
  };
  var dr = ["server"];
  var vr = function formatFilename(e) {
    return e;
  };
  var pr = function createElement(e) {
    return document.createElement(e);
  };
  var Er = function text(e, t) {
    var r = e.childNodes[0];
    if (r) t !== r.nodeValue && (r.nodeValue = t);
    else {
      r = document.createTextNode(t);
      e.appendChild(r);
    }
  };
  var _r = function polarToCartesian(e, t, r, n) {
    var i = (((n % 360) - 90) * Math.PI) / 180;
    return { x: e + r * Math.cos(i), y: t + r * Math.sin(i) };
  };
  var Tr = function describeArc(e, t, r, n, i, a) {
    var o = _r(e, t, r, i);
    var s = _r(e, t, r, n);
    return ["M", o.x, o.y, "A", r, r, 0, a, 0, s.x, s.y].join(" ");
  };
  var Ir = function percentageArc(e, t, r, n, i) {
    var a = 1;
    i > n && i - n <= 0.5 && (a = 0);
    n > i && n - i >= 0.5 && (a = 0);
    return Tr(e, t, r, Math.min(0.9999, n) * 360, Math.min(0.9999, i) * 360, a);
  };
  var mr = function create(e) {
    var t = e.root,
      r = e.props;
    r.spin = false;
    r.progress = 0;
    r.opacity = 0;
    var n = f("svg");
    t.ref.path = f("path", { "stroke-width": 2, "stroke-linecap": "round" });
    n.appendChild(t.ref.path);
    t.ref.svg = n;
    t.appendChild(n);
  };
  var gr = function write(e) {
    var t = e.root,
      r = e.props;
    if (r.opacity !== 0) {
      r.align && (t.element.dataset.align = r.align);
      var n = parseInt(s(t.ref.path, "stroke-width"), 10);
      var i = t.rect.element.width * 0.5;
      var a = 0;
      var o = 0;
      if (r.spin) {
        a = 0;
        o = 0.5;
      } else {
        a = 0;
        o = r.progress;
      }
      var u = Ir(i, i, i - n, a, o);
      s(t.ref.path, "d", u);
      s(t.ref.path, "stroke-opacity", r.spin || r.progress > 0 ? 1 : 0);
    }
  };
  var hr = Y({
    tag: "div",
    name: "progress-indicator",
    ignoreRectUpdate: true,
    ignoreRect: true,
    create: mr,
    write: gr,
    mixins: {
      apis: ["progress", "spin", "align"],
      styles: ["opacity"],
      animations: {
        opacity: { type: "tween", duration: 500 },
        progress: { type: "spring", stiffness: 0.95, damping: 0.65, mass: 10 },
      },
    },
  });
  var Rr = function create(e) {
    var t = e.root,
      r = e.props;
    t.element.innerHTML = (r.icon || "") + "<span>" + r.label + "</span>";
    r.isDisabled = false;
  };
  var Or = function write(e) {
    var t = e.root,
      r = e.props;
    var n = r.isDisabled;
    var i = t.query("GET_DISABLED") || r.opacity === 0;
    if (i && !n) {
      r.isDisabled = true;
      s(t.element, "disabled", "disabled");
    } else if (!i && n) {
      r.isDisabled = false;
      t.element.removeAttribute("disabled");
    }
  };
  var yr = Y({
    tag: "button",
    attributes: { type: "button" },
    ignoreRect: true,
    ignoreRectUpdate: true,
    name: "file-action-button",
    mixins: {
      apis: ["label"],
      styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
      animations: {
        scaleX: "spring",
        scaleY: "spring",
        translateX: "spring",
        translateY: "spring",
        opacity: { type: "tween", duration: 250 },
      },
      listeners: true,
    },
    create: Rr,
    write: Or,
  });
  var Dr = function toNaturalFileSize(e) {
    var t =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ".";
    var r =
      arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e3;
    var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    var i = n.labelBytes,
      a = i === void 0 ? "bytes" : i,
      o = n.labelKilobytes,
      s = o === void 0 ? "KB" : o,
      u = n.labelMegabytes,
      l = u === void 0 ? "MB" : u,
      c = n.labelGigabytes,
      f = c === void 0 ? "GB" : c;
    e = Math.round(Math.abs(e));
    var d = r;
    var v = r * r;
    var p = r * r * r;
    return e < d
      ? e + " " + a
      : e < v
      ? Math.floor(e / d) + " " + s
      : e < p
      ? Sr(e / v, 1, t) + " " + l
      : Sr(e / p, 2, t) + " " + f;
  };
  var Sr = function removeDecimalsWhenZero(e, t, r) {
    return e
      .toFixed(t)
      .split(".")
      .filter(function (e) {
        return e !== "0";
      })
      .join(r);
  };
  var Ar = function create(e) {
    var t = e.root,
      r = e.props;
    var n = pr("span");
    n.className = "filepond--file-info-main";
    s(n, "aria-hidden", "true");
    t.appendChild(n);
    t.ref.fileName = n;
    var i = pr("span");
    i.className = "filepond--file-info-sub";
    t.appendChild(i);
    t.ref.fileSize = i;
    Er(i, t.query("GET_LABEL_FILE_WAITING_FOR_SIZE"));
    Er(n, vr(t.query("GET_ITEM_NAME", r.id)));
  };
  var br = function updateFile(e) {
    var t = e.root,
      r = e.props;
    Er(
      t.ref.fileSize,
      Dr(
        t.query("GET_ITEM_SIZE", r.id),
        ".",
        t.query("GET_FILE_SIZE_BASE"),
        t.query("GET_FILE_SIZE_LABELS", t.query)
      )
    );
    Er(t.ref.fileName, vr(t.query("GET_ITEM_NAME", r.id)));
  };
  var Pr = function updateFileSizeOnError(e) {
    var t = e.root,
      r = e.props;
    ie(t.query("GET_ITEM_SIZE", r.id))
      ? br({ root: t, props: r })
      : Er(t.ref.fileSize, t.query("GET_LABEL_FILE_SIZE_NOT_AVAILABLE"));
  };
  var Lr = Y({
    name: "file-info",
    ignoreRect: true,
    ignoreRectUpdate: true,
    write: j({
      DID_LOAD_ITEM: br,
      DID_UPDATE_ITEM_META: br,
      DID_THROW_ITEM_LOAD_ERROR: Pr,
      DID_THROW_ITEM_INVALID: Pr,
    }),
    didCreateView: function didCreateView(e) {
      je("CREATE_VIEW", Object.assign({}, e, { view: e }));
    },
    create: Ar,
    mixins: {
      styles: ["translateX", "translateY"],
      animations: { translateX: "spring", translateY: "spring" },
    },
  });
  var Mr = function toPercentage(e) {
    return Math.round(e * 100);
  };
  var Cr = function create(e) {
    var t = e.root;
    var r = pr("span");
    r.className = "filepond--file-status-main";
    t.appendChild(r);
    t.ref.main = r;
    var n = pr("span");
    n.className = "filepond--file-status-sub";
    t.appendChild(n);
    t.ref.sub = n;
    wr({ root: t, action: { progress: null } });
  };
  var wr = function didSetItemLoadProgress(e) {
    var t = e.root,
      r = e.action;
    var n =
      r.progress === null
        ? t.query("GET_LABEL_FILE_LOADING")
        : t.query("GET_LABEL_FILE_LOADING") + " " + Mr(r.progress) + "%";
    Er(t.ref.main, n);
    Er(t.ref.sub, t.query("GET_LABEL_TAP_TO_CANCEL"));
  };
  var Nr = function didSetItemProcessProgress(e) {
    var t = e.root,
      r = e.action;
    var n =
      r.progress === null
        ? t.query("GET_LABEL_FILE_PROCESSING")
        : t.query("GET_LABEL_FILE_PROCESSING") + " " + Mr(r.progress) + "%";
    Er(t.ref.main, n);
    Er(t.ref.sub, t.query("GET_LABEL_TAP_TO_CANCEL"));
  };
  var Gr = function didRequestItemProcessing(e) {
    var t = e.root;
    Er(t.ref.main, t.query("GET_LABEL_FILE_PROCESSING"));
    Er(t.ref.sub, t.query("GET_LABEL_TAP_TO_CANCEL"));
  };
  var Fr = function didAbortItemProcessing(e) {
    var t = e.root;
    Er(t.ref.main, t.query("GET_LABEL_FILE_PROCESSING_ABORTED"));
    Er(t.ref.sub, t.query("GET_LABEL_TAP_TO_RETRY"));
  };
  var Ur = function didCompleteItemProcessing(e) {
    var t = e.root;
    Er(t.ref.main, t.query("GET_LABEL_FILE_PROCESSING_COMPLETE"));
    Er(t.ref.sub, t.query("GET_LABEL_TAP_TO_UNDO"));
  };
  var Br = function clear(e) {
    var t = e.root;
    Er(t.ref.main, "");
    Er(t.ref.sub, "");
  };
  var Vr = function error(e) {
    var t = e.root,
      r = e.action;
    Er(t.ref.main, r.status.main);
    Er(t.ref.sub, r.status.sub);
  };
  var qr = Y({
    name: "file-status",
    ignoreRect: true,
    ignoreRectUpdate: true,
    write: j({
      DID_LOAD_ITEM: Br,
      DID_REVERT_ITEM_PROCESSING: Br,
      DID_REQUEST_ITEM_PROCESSING: Gr,
      DID_ABORT_ITEM_PROCESSING: Fr,
      DID_COMPLETE_ITEM_PROCESSING: Ur,
      DID_UPDATE_ITEM_PROCESS_PROGRESS: Nr,
      DID_UPDATE_ITEM_LOAD_PROGRESS: wr,
      DID_THROW_ITEM_LOAD_ERROR: Vr,
      DID_THROW_ITEM_INVALID: Vr,
      DID_THROW_ITEM_PROCESSING_ERROR: Vr,
      DID_THROW_ITEM_PROCESSING_REVERT_ERROR: Vr,
      DID_THROW_ITEM_REMOVE_ERROR: Vr,
    }),
    didCreateView: function didCreateView(e) {
      je("CREATE_VIEW", Object.assign({}, e, { view: e }));
    },
    create: Cr,
    mixins: {
      styles: ["translateX", "translateY", "opacity"],
      animations: {
        opacity: { type: "tween", duration: 250 },
        translateX: "spring",
        translateY: "spring",
      },
    },
  });
  var xr = {
    AbortItemLoad: {
      label: "GET_LABEL_BUTTON_ABORT_ITEM_LOAD",
      action: "ABORT_ITEM_LOAD",
      className: "filepond--action-abort-item-load",
      align: "LOAD_INDICATOR_POSITION",
    },
    RetryItemLoad: {
      label: "GET_LABEL_BUTTON_RETRY_ITEM_LOAD",
      action: "RETRY_ITEM_LOAD",
      icon: "GET_ICON_RETRY",
      className: "filepond--action-retry-item-load",
      align: "BUTTON_PROCESS_ITEM_POSITION",
    },
    RemoveItem: {
      label: "GET_LABEL_BUTTON_REMOVE_ITEM",
      action: "REQUEST_REMOVE_ITEM",
      icon: "GET_ICON_REMOVE",
      className: "filepond--action-remove-item",
      align: "BUTTON_REMOVE_ITEM_POSITION",
    },
    ProcessItem: {
      label: "GET_LABEL_BUTTON_PROCESS_ITEM",
      action: "REQUEST_ITEM_PROCESSING",
      icon: "GET_ICON_PROCESS",
      className: "filepond--action-process-item",
      align: "BUTTON_PROCESS_ITEM_POSITION",
    },
    AbortItemProcessing: {
      label: "GET_LABEL_BUTTON_ABORT_ITEM_PROCESSING",
      action: "ABORT_ITEM_PROCESSING",
      className: "filepond--action-abort-item-processing",
      align: "BUTTON_PROCESS_ITEM_POSITION",
    },
    RetryItemProcessing: {
      label: "GET_LABEL_BUTTON_RETRY_ITEM_PROCESSING",
      action: "RETRY_ITEM_PROCESSING",
      icon: "GET_ICON_RETRY",
      className: "filepond--action-retry-item-processing",
      align: "BUTTON_PROCESS_ITEM_POSITION",
    },
    RevertItemProcessing: {
      label: "GET_LABEL_BUTTON_UNDO_ITEM_PROCESSING",
      action: "REQUEST_REVERT_ITEM_PROCESSING",
      icon: "GET_ICON_UNDO",
      className: "filepond--action-revert-item-processing",
      align: "BUTTON_PROCESS_ITEM_POSITION",
    },
  };
  var Yr = [];
  a(xr, function (e) {
    Yr.push(e);
  });
  var kr = function calculateFileInfoOffset(e) {
    if (Qr(e) === "right") return 0;
    var t = e.ref.buttonRemoveItem.rect.element;
    return t.hidden ? null : t.width + t.left;
  };
  var jr = function calculateButtonWidth(e) {
    var t = e.ref.buttonAbortItemLoad.rect.element;
    return t.width;
  };
  var Hr = function calculateFileVerticalCenterOffset(e) {
    return Math.floor(e.ref.buttonRemoveItem.rect.element.height / 4);
  };
  var Wr = function calculateFileHorizontalCenterOffset(e) {
    return Math.floor(e.ref.buttonRemoveItem.rect.element.left / 2);
  };
  var Xr = function getLoadIndicatorAlignment(e) {
    return e.query("GET_STYLE_LOAD_INDICATOR_POSITION");
  };
  var zr = function getProcessIndicatorAlignment(e) {
    return e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION");
  };
  var Qr = function getRemoveIndicatorAligment(e) {
    return e.query("GET_STYLE_BUTTON_REMOVE_ITEM_POSITION");
  };
  var Zr = {
    buttonAbortItemLoad: { opacity: 0 },
    buttonRetryItemLoad: { opacity: 0 },
    buttonRemoveItem: { opacity: 0 },
    buttonProcessItem: { opacity: 0 },
    buttonAbortItemProcessing: { opacity: 0 },
    buttonRetryItemProcessing: { opacity: 0 },
    buttonRevertItemProcessing: { opacity: 0 },
    loadProgressIndicator: { opacity: 0, align: Xr },
    processProgressIndicator: { opacity: 0, align: zr },
    processingCompleteIndicator: { opacity: 0, scaleX: 0.75, scaleY: 0.75 },
    info: { translateX: 0, translateY: 0, opacity: 0 },
    status: { translateX: 0, translateY: 0, opacity: 0 },
  };
  var $r = {
    buttonRemoveItem: { opacity: 1 },
    buttonProcessItem: { opacity: 1 },
    info: { translateX: kr },
    status: { translateX: kr },
  };
  var Kr = {
    buttonAbortItemProcessing: { opacity: 1 },
    processProgressIndicator: { opacity: 1 },
    status: { opacity: 1 },
  };
  var Jr = {
    DID_THROW_ITEM_INVALID: {
      buttonRemoveItem: { opacity: 1 },
      info: { translateX: kr },
      status: { translateX: kr, opacity: 1 },
    },
    DID_START_ITEM_LOAD: {
      buttonAbortItemLoad: { opacity: 1 },
      loadProgressIndicator: { opacity: 1 },
      status: { opacity: 1 },
    },
    DID_THROW_ITEM_LOAD_ERROR: {
      buttonRetryItemLoad: { opacity: 1 },
      buttonRemoveItem: { opacity: 1 },
      info: { translateX: kr },
      status: { opacity: 1 },
    },
    DID_START_ITEM_REMOVE: {
      processProgressIndicator: { opacity: 1, align: Qr },
      info: { translateX: kr },
      status: { opacity: 0 },
    },
    DID_THROW_ITEM_REMOVE_ERROR: {
      processProgressIndicator: { opacity: 0, align: Qr },
      buttonRemoveItem: { opacity: 1 },
      info: { translateX: kr },
      status: { opacity: 1, translateX: kr },
    },
    DID_LOAD_ITEM: $r,
    DID_LOAD_LOCAL_ITEM: {
      buttonRemoveItem: { opacity: 1 },
      info: { translateX: kr },
      status: { translateX: kr },
    },
    DID_START_ITEM_PROCESSING: Kr,
    DID_REQUEST_ITEM_PROCESSING: Kr,
    DID_UPDATE_ITEM_PROCESS_PROGRESS: Kr,
    DID_COMPLETE_ITEM_PROCESSING: {
      buttonRevertItemProcessing: { opacity: 1 },
      info: { opacity: 1 },
      status: { opacity: 1 },
    },
    DID_THROW_ITEM_PROCESSING_ERROR: {
      buttonRemoveItem: { opacity: 1 },
      buttonRetryItemProcessing: { opacity: 1 },
      status: { opacity: 1 },
      info: { translateX: kr },
    },
    DID_THROW_ITEM_PROCESSING_REVERT_ERROR: {
      buttonRevertItemProcessing: { opacity: 1 },
      status: { opacity: 1 },
      info: { opacity: 1 },
    },
    DID_ABORT_ITEM_PROCESSING: {
      buttonRemoveItem: { opacity: 1 },
      buttonProcessItem: { opacity: 1 },
      info: { translateX: kr },
      status: { opacity: 1 },
    },
    DID_REVERT_ITEM_PROCESSING: $r,
  };
  var en = Y({
    create: function create(e) {
      var t = e.root;
      t.element.innerHTML = t.query("GET_ICON_DONE");
    },
    name: "processing-complete-indicator",
    ignoreRect: true,
    mixins: {
      styles: ["scaleX", "scaleY", "opacity"],
      animations: {
        scaleX: "spring",
        scaleY: "spring",
        opacity: { type: "tween", duration: 250 },
      },
    },
  });
  var tn = function create(e) {
    var t = e.root,
      r = e.props;
    var n = Object.keys(xr).reduce(function (e, t) {
      e[t] = Object.assign({}, xr[t]);
      return e;
    }, {});
    var i = r.id;
    var o = t.query("GET_ALLOW_REVERT");
    var s = t.query("GET_ALLOW_REMOVE");
    var u = t.query("GET_ALLOW_PROCESS");
    var l = t.query("GET_INSTANT_UPLOAD");
    var c = t.query("IS_ASYNC");
    var f = t.query("GET_STYLE_BUTTON_REMOVE_ITEM_ALIGN");
    var d;
    c
      ? u && !o
        ? (d = function buttonFilter(e) {
            return !/RevertItemProcessing/.test(e);
          })
        : !u && o
        ? (d = function buttonFilter(e) {
            return !/ProcessItem|RetryItemProcessing|AbortItemProcessing/.test(
              e
            );
          })
        : u ||
          o ||
          (d = function buttonFilter(e) {
            return !/Process/.test(e);
          })
      : (d = function buttonFilter(e) {
          return !/Process/.test(e);
        });
    var v = d ? Yr.filter(d) : Yr.concat();
    if (l && o) {
      n.RevertItemProcessing.label = "GET_LABEL_BUTTON_REMOVE_ITEM";
      n.RevertItemProcessing.icon = "GET_ICON_REMOVE";
    }
    if (c && !o) {
      var p = Jr.DID_COMPLETE_ITEM_PROCESSING;
      p.info.translateX = Wr;
      p.info.translateY = Hr;
      p.status.translateY = Hr;
      p.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
    }
    if (c && !u) {
      [
        "DID_START_ITEM_PROCESSING",
        "DID_REQUEST_ITEM_PROCESSING",
        "DID_UPDATE_ITEM_PROCESS_PROGRESS",
        "DID_THROW_ITEM_PROCESSING_ERROR",
      ].forEach(function (e) {
        Jr[e].status.translateY = Hr;
      });
      Jr.DID_THROW_ITEM_PROCESSING_ERROR.status.translateX = jr;
    }
    if (f && o) {
      n.RevertItemProcessing.align = "BUTTON_REMOVE_ITEM_POSITION";
      var E = Jr.DID_COMPLETE_ITEM_PROCESSING;
      E.info.translateX = kr;
      E.status.translateY = Hr;
      E.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
    }
    s || (n.RemoveItem.disabled = true);
    a(n, function (e, r) {
      var n = t.createChildView(yr, {
        label: t.query(r.label),
        icon: t.query(r.icon),
        opacity: 0,
      });
      v.includes(e) && t.appendChildView(n);
      if (r.disabled) {
        n.element.setAttribute("disabled", "disabled");
        n.element.setAttribute("hidden", "hidden");
      }
      n.element.dataset.align = t.query("GET_STYLE_" + r.align);
      n.element.classList.add(r.className);
      n.on("click", function (e) {
        e.stopPropagation();
        r.disabled || t.dispatch(r.action, { query: i });
      });
      t.ref["button" + e] = n;
    });
    t.ref.processingCompleteIndicator = t.appendChildView(
      t.createChildView(en)
    );
    t.ref.processingCompleteIndicator.element.dataset.align = t.query(
      "GET_STYLE_BUTTON_PROCESS_ITEM_POSITION"
    );
    t.ref.info = t.appendChildView(t.createChildView(Lr, { id: i }));
    t.ref.status = t.appendChildView(t.createChildView(qr, { id: i }));
    var _ = t.appendChildView(
      t.createChildView(hr, {
        opacity: 0,
        align: t.query("GET_STYLE_LOAD_INDICATOR_POSITION"),
      })
    );
    _.element.classList.add("filepond--load-indicator");
    t.ref.loadProgressIndicator = _;
    var T = t.appendChildView(
      t.createChildView(hr, {
        opacity: 0,
        align: t.query("GET_STYLE_PROGRESS_INDICATOR_POSITION"),
      })
    );
    T.element.classList.add("filepond--process-indicator");
    t.ref.processProgressIndicator = T;
    t.ref.activeStyles = [];
  };
  var rn = function write(e) {
    var t = e.root,
      r = e.actions,
      n = e.props;
    nn({ root: t, actions: r, props: n });
    var i = r
      .concat()
      .filter(function (e) {
        return /^DID_/.test(e.type);
      })
      .reverse()
      .find(function (e) {
        return Jr[e.type];
      });
    if (i) {
      t.ref.activeStyles = [];
      var o = Jr[i.type];
      a(Zr, function (e, r) {
        var n = t.ref[e];
        a(r, function (r, i) {
          var a = o[e] && typeof o[e][r] !== "undefined" ? o[e][r] : i;
          t.ref.activeStyles.push({ control: n, key: r, value: a });
        });
      });
    }
    t.ref.activeStyles.forEach(function (e) {
      var r = e.control,
        n = e.key,
        i = e.value;
      r[n] = typeof i === "function" ? i(t) : i;
    });
  };
  var nn = j({
    DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING:
      function DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING(e) {
        var t = e.root,
          r = e.action;
        t.ref.buttonAbortItemProcessing.label = r.value;
      },
    DID_SET_LABEL_BUTTON_ABORT_ITEM_LOAD:
      function DID_SET_LABEL_BUTTON_ABORT_ITEM_LOAD(e) {
        var t = e.root,
          r = e.action;
        t.ref.buttonAbortItemLoad.label = r.value;
      },
    DID_SET_LABEL_BUTTON_ABORT_ITEM_REMOVAL:
      function DID_SET_LABEL_BUTTON_ABORT_ITEM_REMOVAL(e) {
        var t = e.root,
          r = e.action;
        t.ref.buttonAbortItemRemoval.label = r.value;
      },
    DID_REQUEST_ITEM_PROCESSING: function DID_REQUEST_ITEM_PROCESSING(e) {
      var t = e.root;
      t.ref.processProgressIndicator.spin = true;
      t.ref.processProgressIndicator.progress = 0;
    },
    DID_START_ITEM_LOAD: function DID_START_ITEM_LOAD(e) {
      var t = e.root;
      t.ref.loadProgressIndicator.spin = true;
      t.ref.loadProgressIndicator.progress = 0;
    },
    DID_START_ITEM_REMOVE: function DID_START_ITEM_REMOVE(e) {
      var t = e.root;
      t.ref.processProgressIndicator.spin = true;
      t.ref.processProgressIndicator.progress = 0;
    },
    DID_UPDATE_ITEM_LOAD_PROGRESS: function DID_UPDATE_ITEM_LOAD_PROGRESS(e) {
      var t = e.root,
        r = e.action;
      t.ref.loadProgressIndicator.spin = false;
      t.ref.loadProgressIndicator.progress = r.progress;
    },
    DID_UPDATE_ITEM_PROCESS_PROGRESS: function DID_UPDATE_ITEM_PROCESS_PROGRESS(
      e
    ) {
      var t = e.root,
        r = e.action;
      t.ref.processProgressIndicator.spin = false;
      t.ref.processProgressIndicator.progress = r.progress;
    },
  });
  var an = Y({
    create: tn,
    write: rn,
    didCreateView: function didCreateView(e) {
      je("CREATE_VIEW", Object.assign({}, e, { view: e }));
    },
    name: "file",
  });
  var sn = function create(e) {
    var t = e.root,
      r = e.props;
    t.ref.fileName = pr("legend");
    t.appendChild(t.ref.fileName);
    t.ref.file = t.appendChildView(t.createChildView(an, { id: r.id }));
    t.ref.data = false;
  };
  var un = function didLoadItem(e) {
    var t = e.root,
      r = e.props;
    Er(t.ref.fileName, vr(t.query("GET_ITEM_NAME", r.id)));
  };
  var ln = Y({
    create: sn,
    ignoreRect: true,
    write: j({ DID_LOAD_ITEM: un }),
    didCreateView: function didCreateView(e) {
      je("CREATE_VIEW", Object.assign({}, e, { view: e }));
    },
    tag: "fieldset",
    name: "file-wrapper",
  });
  var cn = { type: "spring", damping: 0.6, mass: 7 };
  var dn = function create(e) {
    var t = e.root,
      r = e.props;
    [
      { name: "top" },
      {
        name: "center",
        props: { translateY: null, scaleY: null },
        mixins: {
          animations: { scaleY: cn },
          styles: ["translateY", "scaleY"],
        },
      },
      {
        name: "bottom",
        props: { translateY: null },
        mixins: { animations: { translateY: cn }, styles: ["translateY"] },
      },
    ].forEach(function (e) {
      vn(t, e, r.name);
    });
    t.element.classList.add("filepond--" + r.name);
    t.ref.scalable = null;
  };
  var vn = function createSection(e, t, r) {
    var n = Y({
      name: "panel-" + t.name + " filepond--" + r,
      mixins: t.mixins,
      ignoreRectUpdate: true,
    });
    var i = e.createChildView(n, t.props);
    e.ref[t.name] = e.appendChildView(i);
  };
  var pn = function write(e) {
    var t = e.root,
      r = e.props;
    if (t.ref.scalable === null || r.scalable !== t.ref.scalable) {
      t.ref.scalable = !K(r.scalable) || r.scalable;
      t.element.dataset.scalable = t.ref.scalable;
    }
    if (r.height) {
      var n = t.ref.top.rect.element;
      var i = t.ref.bottom.rect.element;
      var a = Math.max(n.height + i.height, r.height);
      t.ref.center.translateY = n.height;
      t.ref.center.scaleY = (a - n.height - i.height) / 100;
      t.ref.bottom.translateY = a - i.height;
    }
  };
  var En = Y({
    name: "panel",
    read: function read(e) {
      var t = e.root,
        r = e.props;
      return (r.heightCurrent = t.ref.bottom.translateY);
    },
    write: pn,
    create: dn,
    ignoreRect: true,
    mixins: { apis: ["height", "heightCurrent", "scalable"] },
  });
  var _n = function createDragHelper(e) {
    var t = e.map(function (e) {
      return e.id;
    });
    var r = void 0;
    return {
      setIndex: function setIndex(e) {
        r = e;
      },
      getIndex: function getIndex() {
        return r;
      },
      getItemIndex: function getItemIndex(e) {
        return t.indexOf(e.id);
      },
    };
  };
  var Tn = { type: "spring", stiffness: 0.75, damping: 0.45, mass: 10 };
  var In = "spring";
  var mn = {
    DID_START_ITEM_LOAD: "busy",
    DID_UPDATE_ITEM_LOAD_PROGRESS: "loading",
    DID_THROW_ITEM_INVALID: "load-invalid",
    DID_THROW_ITEM_LOAD_ERROR: "load-error",
    DID_LOAD_ITEM: "idle",
    DID_THROW_ITEM_REMOVE_ERROR: "remove-error",
    DID_START_ITEM_REMOVE: "busy",
    DID_START_ITEM_PROCESSING: "busy processing",
    DID_REQUEST_ITEM_PROCESSING: "busy processing",
    DID_UPDATE_ITEM_PROCESS_PROGRESS: "processing",
    DID_COMPLETE_ITEM_PROCESSING: "processing-complete",
    DID_THROW_ITEM_PROCESSING_ERROR: "processing-error",
    DID_THROW_ITEM_PROCESSING_REVERT_ERROR: "processing-revert-error",
    DID_ABORT_ITEM_PROCESSING: "cancelled",
    DID_REVERT_ITEM_PROCESSING: "idle",
  };
  var gn = function create(e) {
    var t = e.root,
      r = e.props;
    t.ref.handleClick = function (e) {
      return t.dispatch("DID_ACTIVATE_ITEM", { id: r.id });
    };
    t.element.id = "filepond--item-" + r.id;
    t.element.addEventListener("click", t.ref.handleClick);
    t.ref.container = t.appendChildView(t.createChildView(ln, { id: r.id }));
    t.ref.panel = t.appendChildView(
      t.createChildView(En, { name: "item-panel" })
    );
    t.ref.panel.height = null;
    r.markedForRemoval = false;
    if (t.query("GET_ALLOW_REORDER")) {
      t.element.dataset.dragState = "idle";
      var n = function grab(e) {
        if (e.isPrimary) {
          var n = false;
          var i = { x: e.pageX, y: e.pageY };
          r.dragOrigin = { x: t.translateX, y: t.translateY };
          r.dragCenter = { x: e.offsetX, y: e.offsetY };
          var a = _n(t.query("GET_ACTIVE_ITEMS"));
          t.dispatch("DID_GRAB_ITEM", { id: r.id, dragState: a });
          var o = function drag(e) {
            if (e.isPrimary) {
              e.stopPropagation();
              e.preventDefault();
              r.dragOffset = { x: e.pageX - i.x, y: e.pageY - i.y };
              var o =
                r.dragOffset.x * r.dragOffset.x +
                r.dragOffset.y * r.dragOffset.y;
              if (o > 16 && !n) {
                n = true;
                t.element.removeEventListener("click", t.ref.handleClick);
              }
              t.dispatch("DID_DRAG_ITEM", { id: r.id, dragState: a });
            }
          };
          var s = function drop(e) {
            if (e.isPrimary) {
              r.dragOffset = { x: e.pageX - i.x, y: e.pageY - i.y };
              l();
            }
          };
          var u = function cancel() {
            l();
          };
          var l = function reset() {
            document.removeEventListener("pointercancel", u);
            document.removeEventListener("pointermove", o);
            document.removeEventListener("pointerup", s);
            t.dispatch("DID_DROP_ITEM", { id: r.id, dragState: a });
            n &&
              setTimeout(function () {
                return t.element.addEventListener("click", t.ref.handleClick);
              }, 0);
          };
          document.addEventListener("pointercancel", u);
          document.addEventListener("pointermove", o);
          document.addEventListener("pointerup", s);
        }
      };
      t.element.addEventListener("pointerdown", n);
    }
  };
  var hn = j({
    DID_UPDATE_PANEL_HEIGHT: function DID_UPDATE_PANEL_HEIGHT(e) {
      var t = e.root,
        r = e.action;
      t.height = r.height;
    },
  });
  var Rn = j(
    {
      DID_GRAB_ITEM: function DID_GRAB_ITEM(e) {
        var t = e.root,
          r = e.props;
        r.dragOrigin = { x: t.translateX, y: t.translateY };
      },
      DID_DRAG_ITEM: function DID_DRAG_ITEM(e) {
        var t = e.root;
        t.element.dataset.dragState = "drag";
      },
      DID_DROP_ITEM: function DID_DROP_ITEM(e) {
        var t = e.root,
          r = e.props;
        r.dragOffset = null;
        r.dragOrigin = null;
        t.element.dataset.dragState = "drop";
      },
    },
    function (e) {
      var t = e.root,
        r = e.actions,
        n = e.props,
        i = e.shouldOptimize;
      t.element.dataset.dragState === "drop" &&
        t.scaleX <= 1 &&
        (t.element.dataset.dragState = "idle");
      var a = r
        .concat()
        .filter(function (e) {
          return /^DID_/.test(e.type);
        })
        .reverse()
        .find(function (e) {
          return mn[e.type];
        });
      if (a && a.type !== n.currentState) {
        n.currentState = a.type;
        t.element.dataset.filepondItemState = mn[n.currentState] || "";
      }
      var o =
        t.query("GET_ITEM_PANEL_ASPECT_RATIO") ||
        t.query("GET_PANEL_ASPECT_RATIO");
      if (o) i || (t.height = t.rect.element.width * o);
      else {
        hn({ root: t, actions: r, props: n });
        !t.height &&
          t.ref.container.rect.element.height > 0 &&
          (t.height = t.ref.container.rect.element.height);
      }
      i && (t.ref.panel.height = null);
      t.ref.panel.height = t.height;
    }
  );
  var On = Y({
    create: gn,
    write: Rn,
    destroy: function destroy(e) {
      var t = e.root,
        r = e.props;
      t.element.removeEventListener("click", t.ref.handleClick);
      t.dispatch("RELEASE_ITEM", { query: r.id });
    },
    tag: "li",
    name: "item",
    mixins: {
      apis: [
        "id",
        "interactionMethod",
        "markedForRemoval",
        "spawnDate",
        "dragCenter",
        "dragOrigin",
        "dragOffset",
      ],
      styles: [
        "translateX",
        "translateY",
        "scaleX",
        "scaleY",
        "opacity",
        "height",
      ],
      animations: {
        scaleX: In,
        scaleY: In,
        translateX: Tn,
        translateY: Tn,
        opacity: { type: "tween", duration: 150 },
      },
    },
  });
  var getItemsPerRow = function (e, t) {
    return Math.max(1, Math.floor((e + 1) / t));
  };
  var yn = function getItemIndexByPosition(e, t, r) {
    if (r) {
      var n = e.rect.element.width;
      var i = t.length;
      var a = null;
      if (i === 0 || r.top < t[0].rect.element.top) return -1;
      var o = t[0];
      var s = o.rect.element;
      var u = s.marginLeft + s.marginRight;
      var l = s.width + u;
      var c = getItemsPerRow(n, l);
      if (c === 1) {
        for (var f = 0; f < i; f++) {
          var d = t[f];
          var v = d.rect.outer.top + d.rect.element.height * 0.5;
          if (r.top < v) return f;
        }
        return i;
      }
      var p = s.marginTop + s.marginBottom;
      var E = s.height + p;
      for (var _ = 0; _ < i; _++) {
        var T = _ % c;
        var I = Math.floor(_ / c);
        var m = T * l;
        var g = I * E;
        var h = g - s.marginTop;
        var R = m + l;
        var O = g + E + s.marginBottom;
        if (r.top < O && r.top > h) {
          if (r.left < R) return _;
          a = _ !== i - 1 ? _ : null;
        }
      }
      return a !== null ? a : i;
    }
  };
  var Dn = {
    height: 0,
    width: 0,
    get getHeight() {
      return (this || e).height;
    },
    set setHeight(t) {
      ((this || e).height !== 0 && t !== 0) || ((this || e).height = t);
    },
    get getWidth() {
      return (this || e).width;
    },
    set setWidth(t) {
      ((this || e).width !== 0 && t !== 0) || ((this || e).width = t);
    },
    setDimensions: function setDimensions(t, r) {
      ((this || e).height !== 0 && t !== 0) || ((this || e).height = t);
      ((this || e).width !== 0 && r !== 0) || ((this || e).width = r);
    },
  };
  var Sn = function create(e) {
    var t = e.root;
    s(t.element, "role", "list");
    t.ref.lastItemSpanwDate = Date.now();
  };
  /**
   * Inserts a new item
   * @param root
   * @param action
   */ var An = function addItemView(e) {
    var t = e.root,
      r = e.action;
    var n = r.id,
      i = r.index,
      a = r.interactionMethod;
    t.ref.addIndex = i;
    var o = Date.now();
    var s = o;
    var u = 1;
    if (a !== Ae.NONE) {
      u = 0;
      var l = t.query("GET_ITEM_INSERT_INTERVAL");
      var c = o - t.ref.lastItemSpanwDate;
      s = c < l ? o + (l - c) : o;
    }
    t.ref.lastItemSpanwDate = s;
    t.appendChildView(
      t.createChildView(On, {
        spawnDate: s,
        id: n,
        opacity: u,
        interactionMethod: a,
      }),
      i
    );
  };
  var bn = function moveItem(e, t, r) {
    var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
    if (e.dragOffset) {
      e.translateX = null;
      e.translateY = null;
      e.translateX = e.dragOrigin.x + e.dragOffset.x;
      e.translateY = e.dragOrigin.y + e.dragOffset.y;
      e.scaleX = 1.025;
      e.scaleY = 1.025;
    } else {
      e.translateX = t;
      e.translateY = r;
      if (Date.now() > e.spawnDate) {
        e.opacity === 0 && Pn(e, t, r, n, i);
        e.scaleX = 1;
        e.scaleY = 1;
        e.opacity = 1;
      }
    }
  };
  var Pn = function introItemView(e, t, r, n, i) {
    if (e.interactionMethod === Ae.NONE) {
      e.translateX = null;
      e.translateX = t;
      e.translateY = null;
      e.translateY = r;
    } else if (e.interactionMethod === Ae.DROP) {
      e.translateX = null;
      e.translateX = t - n * 20;
      e.translateY = null;
      e.translateY = r - i * 10;
      e.scaleX = 0.8;
      e.scaleY = 0.8;
    } else if (e.interactionMethod === Ae.BROWSE) {
      e.translateY = null;
      e.translateY = r - 30;
    } else if (e.interactionMethod === Ae.API) {
      e.translateX = null;
      e.translateX = t - 30;
      e.translateY = null;
    }
  };
  /**
   * Removes an existing item
   * @param root
   * @param action
   */ var Ln = function removeItemView(e) {
    var t = e.root,
      r = e.action;
    var n = r.id;
    var i = t.childViews.find(function (e) {
      return e.id === n;
    });
    if (i) {
      i.scaleX = 0.9;
      i.scaleY = 0.9;
      i.opacity = 0;
      i.markedForRemoval = true;
    }
  };
  var Mn = function getItemHeight(e) {
    return (
      e.rect.element.height +
      e.rect.element.marginBottom * 0.5 +
      e.rect.element.marginTop * 0.5
    );
  };
  var Cn = function getItemWidth(e) {
    return (
      e.rect.element.width +
      e.rect.element.marginLeft * 0.5 +
      e.rect.element.marginRight * 0.5
    );
  };
  var wn = function dragItem(t) {
    var r = t.root,
      n = t.action;
    var i = n.id,
      a = n.dragState;
    var o = r.query("GET_ITEM", { id: i });
    var s = r.childViews.find(function (e) {
      return e.id === i;
    });
    var u = r.childViews.length;
    var l = a.getItemIndex(o);
    if (s) {
      var c = {
        x: s.dragOrigin.x + s.dragOffset.x + s.dragCenter.x,
        y: s.dragOrigin.y + s.dragOffset.y + s.dragCenter.y,
      };
      var f = Mn(s);
      var d = Cn(s);
      var v = Math.floor(r.rect.outer.width / d);
      v > u && (v = u);
      var p = Math.floor(u / v + 1);
      Dn.setHeight = f * p;
      Dn.setWidth = d * v;
      var E = {
        y: Math.floor(c.y / f),
        x: Math.floor(c.x / d),
        getGridIndex: function getGridIndex() {
          return c.y > Dn.getHeight || c.y < 0 || c.x > Dn.getWidth || c.x < 0
            ? l
            : (this || e).y * v + (this || e).x;
        },
        getColIndex: function getColIndex() {
          var e = r.query("GET_ACTIVE_ITEMS");
          var t = r.childViews.filter(function (e) {
            return e.rect.element.height;
          });
          var n = e.map(function (e) {
            return t.find(function (t) {
              return t.id === e.id;
            });
          });
          var i = n.findIndex(function (e) {
            return e === s;
          });
          var a = Mn(s);
          var o = n.length;
          var u = o;
          var l = 0;
          var f = 0;
          var d = 0;
          for (var v = 0; v < o; v++) {
            l = Mn(n[v]);
            d = f;
            f = d + l;
            if (c.y < f) {
              if (i > v) {
                if (c.y < d + a) {
                  u = v;
                  break;
                }
                continue;
              }
              u = v;
              break;
            }
          }
          return u;
        },
      };
      var _ = v > 1 ? E.getGridIndex() : E.getColIndex();
      r.dispatch("MOVE_ITEM", { query: s, index: _ });
      var T = a.getIndex();
      if (T === void 0 || T !== _) {
        a.setIndex(_);
        if (T === void 0) return;
        r.dispatch("DID_REORDER_ITEMS", {
          items: r.query("GET_ACTIVE_ITEMS"),
          origin: l,
          target: _,
        });
      }
    }
  };
  var Nn = j({ DID_ADD_ITEM: An, DID_REMOVE_ITEM: Ln, DID_DRAG_ITEM: wn });
  /**
   * Write to view
   * @param root
   * @param actions
   * @param props
   */ var Gn = function write(e) {
    var t = e.root,
      r = e.props,
      n = e.actions,
      i = e.shouldOptimize;
    Nn({ root: t, props: r, actions: n });
    var a = r.dragCoordinates;
    var o = t.rect.element.width;
    var s = t.childViews.filter(function (e) {
      return e.rect.element.height;
    });
    var u = t
      .query("GET_ACTIVE_ITEMS")
      .map(function (e) {
        return s.find(function (t) {
          return t.id === e.id;
        });
      })
      .filter(function (e) {
        return e;
      });
    var l = a ? yn(t, u, a) : null;
    var c = t.ref.addIndex || null;
    t.ref.addIndex = null;
    var f = 0;
    var d = 0;
    var v = 0;
    if (u.length !== 0) {
      var p = u[0].rect.element;
      var E = p.marginTop + p.marginBottom;
      var _ = p.marginLeft + p.marginRight;
      var T = p.width + _;
      var I = p.height + E;
      var m = getItemsPerRow(o, T);
      if (m === 1) {
        var g = 0;
        var h = 0;
        u.forEach(function (e, t) {
          if (l) {
            var r = t - l;
            h =
              r === -2
                ? 0.25 * -E
                : r === -1
                ? 0.75 * -E
                : r === 0
                ? E * 0.75
                : r === 1
                ? E * 0.25
                : 0;
          }
          if (i) {
            e.translateX = null;
            e.translateY = null;
          }
          e.markedForRemoval || bn(e, 0, g + h);
          var n = e.rect.element.height + E;
          var a = n * (e.markedForRemoval ? e.opacity : 1);
          g += a;
        });
      } else {
        var R = 0;
        var O = 0;
        u.forEach(function (e, t) {
          t === l && (f = 1);
          t === c && (v += 1);
          e.markedForRemoval && e.opacity < 0.5 && (d -= 1);
          var r = t + v + f + d;
          var n = r % m;
          var a = Math.floor(r / m);
          var o = n * T;
          var s = a * I;
          var u = Math.sign(o - R);
          var p = Math.sign(s - O);
          R = o;
          O = s;
          if (!e.markedForRemoval) {
            if (i) {
              e.translateX = null;
              e.translateY = null;
            }
            bn(e, o, s, u, p);
          }
        });
      }
    }
  };
  /**
   * Filters actions that are meant specifically for a certain child of the list
   * @param child
   * @param actions
   */ var Fn = function filterSetItemActions(e, t) {
    return t.filter(function (t) {
      return !t.data || !t.data.id || e.id === t.data.id;
    });
  };
  var Un = Y({
    create: Sn,
    write: Gn,
    tag: "ul",
    name: "list",
    didWriteView: function didWriteView(e) {
      var t = e.root;
      t.childViews
        .filter(function (e) {
          return e.markedForRemoval && e.opacity === 0 && e.resting;
        })
        .forEach(function (e) {
          e._destroy();
          t.removeChildView(e);
        });
    },
    filterFrameActionsForChild: Fn,
    mixins: { apis: ["dragCoordinates"] },
  });
  var Bn = function create(e) {
    var t = e.root,
      r = e.props;
    t.ref.list = t.appendChildView(t.createChildView(Un));
    r.dragCoordinates = null;
    r.overflowing = false;
  };
  var Vn = function storeDragCoordinates(e) {
    var t = e.root,
      r = e.props,
      n = e.action;
    t.query("GET_ITEM_INSERT_LOCATION_FREEDOM") &&
      (r.dragCoordinates = {
        left: n.position.scopeLeft - t.ref.list.rect.element.left,
        top:
          n.position.scopeTop -
          (t.rect.outer.top +
            t.rect.element.marginTop +
            t.rect.element.scrollTop),
      });
  };
  var qn = function clearDragCoordinates(e) {
    var t = e.props;
    t.dragCoordinates = null;
  };
  var xn = j({ DID_DRAG: Vn, DID_END_DRAG: qn });
  var Yn = function write(e) {
    var t = e.root,
      r = e.props,
      n = e.actions;
    xn({ root: t, props: r, actions: n });
    t.ref.list.dragCoordinates = r.dragCoordinates;
    if (r.overflowing && !r.overflow) {
      r.overflowing = false;
      t.element.dataset.state = "";
      t.height = null;
    }
    if (r.overflow) {
      var i = Math.round(r.overflow);
      if (i !== t.height) {
        r.overflowing = true;
        t.element.dataset.state = "overflow";
        t.height = i;
      }
    }
  };
  var kn = Y({
    create: Bn,
    write: Yn,
    name: "list-scroller",
    mixins: {
      apis: ["overflow", "dragCoordinates"],
      styles: ["height", "translateY"],
      animations: { translateY: "spring" },
    },
  });
  var jn = function attrToggle(e, t, r) {
    var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "";
    r ? s(e, t, n) : e.removeAttribute(t);
  };
  var Hn = function resetFileInput(e) {
    if (e && e.value !== "") {
      try {
        e.value = "";
      } catch (e) {}
      if (e.value) {
        var t = pr("form");
        var r = e.parentNode;
        var n = e.nextSibling;
        t.appendChild(e);
        t.reset();
        n ? r.insertBefore(e, n) : r.appendChild(e);
      }
    }
  };
  var Wn = function create(e) {
    var t = e.root,
      r = e.props;
    t.element.id = "filepond--browser-" + r.id;
    s(t.element, "name", t.query("GET_NAME"));
    s(t.element, "aria-controls", "filepond--assistant-" + r.id);
    s(t.element, "aria-labelledby", "filepond--drop-label-" + r.id);
    Xn({ root: t, action: { value: t.query("GET_ACCEPTED_FILE_TYPES") } });
    zn({ root: t, action: { value: t.query("GET_ALLOW_MULTIPLE") } });
    Qn({ root: t, action: { value: t.query("GET_ALLOW_DIRECTORIES_ONLY") } });
    Zn({ root: t });
    $n({ root: t, action: { value: t.query("GET_REQUIRED") } });
    Kn({ root: t, action: { value: t.query("GET_CAPTURE_METHOD") } });
    t.ref.handleChange = function (e) {
      if (t.element.value) {
        var n = Array.from(t.element.files).map(function (e) {
          e._relativePath = e.webkitRelativePath;
          return e;
        });
        setTimeout(function () {
          r.onload(n);
          Hn(t.element);
        }, 250);
      }
    };
    t.element.addEventListener("change", t.ref.handleChange);
  };
  var Xn = function setAcceptedFileTypes(e) {
    var t = e.root,
      r = e.action;
    t.query("GET_ALLOW_SYNC_ACCEPT_ATTRIBUTE") &&
      jn(t.element, "accept", !!r.value, r.value ? r.value.join(",") : "");
  };
  var zn = function toggleAllowMultiple(e) {
    var t = e.root,
      r = e.action;
    jn(t.element, "multiple", r.value);
  };
  var Qn = function toggleDirectoryFilter(e) {
    var t = e.root,
      r = e.action;
    jn(t.element, "webkitdirectory", r.value);
  };
  var Zn = function toggleDisabled(e) {
    var t = e.root;
    var r = t.query("GET_DISABLED");
    var n = t.query("GET_ALLOW_BROWSE");
    var i = r || !n;
    jn(t.element, "disabled", i);
  };
  var $n = function toggleRequired(e) {
    var t = e.root,
      r = e.action;
    r.value
      ? t.query("GET_TOTAL_ITEMS") === 0 && jn(t.element, "required", true)
      : jn(t.element, "required", false);
  };
  var Kn = function setCaptureMethod(e) {
    var t = e.root,
      r = e.action;
    jn(t.element, "capture", !!r.value, r.value === true ? "" : r.value);
  };
  var Jn = function updateRequiredStatus(e) {
    var t = e.root;
    var r = t.element;
    if (t.query("GET_TOTAL_ITEMS") > 0) {
      jn(r, "required", false);
      jn(r, "name", false);
    } else {
      jn(r, "name", true, t.query("GET_NAME"));
      var n = t.query("GET_CHECK_VALIDITY");
      n && r.setCustomValidity("");
      t.query("GET_REQUIRED") && jn(r, "required", true);
    }
  };
  var ei = function updateFieldValidityStatus(e) {
    var t = e.root;
    var r = t.query("GET_CHECK_VALIDITY");
    r && t.element.setCustomValidity(t.query("GET_LABEL_INVALID_FIELD"));
  };
  var ti = Y({
    tag: "input",
    name: "browser",
    ignoreRect: true,
    ignoreRectUpdate: true,
    attributes: { type: "file" },
    create: Wn,
    destroy: function destroy(e) {
      var t = e.root;
      t.element.removeEventListener("change", t.ref.handleChange);
    },
    write: j({
      DID_LOAD_ITEM: Jn,
      DID_REMOVE_ITEM: Jn,
      DID_THROW_ITEM_INVALID: ei,
      DID_SET_DISABLED: Zn,
      DID_SET_ALLOW_BROWSE: Zn,
      DID_SET_ALLOW_DIRECTORIES_ONLY: Qn,
      DID_SET_ALLOW_MULTIPLE: zn,
      DID_SET_ACCEPTED_FILE_TYPES: Xn,
      DID_SET_CAPTURE_METHOD: Kn,
      DID_SET_REQUIRED: $n,
    }),
  });
  var ri = { ENTER: 13, SPACE: 32 };
  var ni = function create(e) {
    var t = e.root,
      r = e.props;
    var n = pr("label");
    s(n, "for", "filepond--browser-" + r.id);
    s(n, "id", "filepond--drop-label-" + r.id);
    s(n, "aria-hidden", "true");
    t.ref.handleKeyDown = function (e) {
      var r = e.keyCode === ri.ENTER || e.keyCode === ri.SPACE;
      if (r) {
        e.preventDefault();
        t.ref.label.click();
      }
    };
    t.ref.handleClick = function (e) {
      var r = e.target === n || n.contains(e.target);
      r || t.ref.label.click();
    };
    n.addEventListener("keydown", t.ref.handleKeyDown);
    t.element.addEventListener("click", t.ref.handleClick);
    ii(n, r.caption);
    t.appendChild(n);
    t.ref.label = n;
  };
  var ii = function updateLabelValue(e, t) {
    e.innerHTML = t;
    var r = e.querySelector(".filepond--label-action");
    r && s(r, "tabindex", "0");
    return t;
  };
  var ai = Y({
    name: "drop-label",
    ignoreRect: true,
    create: ni,
    destroy: function destroy(e) {
      var t = e.root;
      t.ref.label.addEventListener("keydown", t.ref.handleKeyDown);
      t.element.removeEventListener("click", t.ref.handleClick);
    },
    write: j({
      DID_SET_LABEL_IDLE: function DID_SET_LABEL_IDLE(e) {
        var t = e.root,
          r = e.action;
        ii(t.ref.label, r.value);
      },
    }),
    mixins: {
      styles: ["opacity", "translateX", "translateY"],
      animations: {
        opacity: { type: "tween", duration: 150 },
        translateX: "spring",
        translateY: "spring",
      },
    },
  });
  var oi = Y({
    name: "drip-blob",
    ignoreRect: true,
    mixins: {
      styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
      animations: {
        scaleX: "spring",
        scaleY: "spring",
        translateX: "spring",
        translateY: "spring",
        opacity: { type: "tween", duration: 250 },
      },
    },
  });
  var si = function addBlob(e) {
    var t = e.root;
    var r = t.rect.element.width * 0.5;
    var n = t.rect.element.height * 0.5;
    t.ref.blob = t.appendChildView(
      t.createChildView(oi, {
        opacity: 0,
        scaleX: 2.5,
        scaleY: 2.5,
        translateX: r,
        translateY: n,
      })
    );
  };
  var ui = function moveBlob(e) {
    var t = e.root,
      r = e.action;
    if (t.ref.blob) {
      t.ref.blob.translateX = r.position.scopeLeft;
      t.ref.blob.translateY = r.position.scopeTop;
      t.ref.blob.scaleX = 1;
      t.ref.blob.scaleY = 1;
      t.ref.blob.opacity = 1;
    } else si({ root: t });
  };
  var li = function hideBlob(e) {
    var t = e.root;
    t.ref.blob && (t.ref.blob.opacity = 0);
  };
  var ci = function explodeBlob(e) {
    var t = e.root;
    if (t.ref.blob) {
      t.ref.blob.scaleX = 2.5;
      t.ref.blob.scaleY = 2.5;
      t.ref.blob.opacity = 0;
    }
  };
  var fi = function write(e) {
    var t = e.root,
      r = e.props,
      n = e.actions;
    di({ root: t, props: r, actions: n });
    var i = t.ref.blob;
    if (n.length === 0 && i && i.opacity === 0) {
      t.removeChildView(i);
      t.ref.blob = null;
    }
  };
  var di = j({ DID_DRAG: ui, DID_DROP: ci, DID_END_DRAG: li });
  var vi = Y({
    ignoreRect: true,
    ignoreRectUpdate: true,
    name: "drip",
    write: fi,
  });
  var pi = function setInputFiles(e, t) {
    try {
      var r = new DataTransfer();
      t.forEach(function (e) {
        e instanceof File
          ? r.items.add(e)
          : r.items.add(new File([e], e.name, { type: e.type }));
      });
      e.files = r.files;
    } catch (e) {
      return false;
    }
    return true;
  };
  var Ei = function create(e) {
    var t = e.root;
    return (t.ref.fields = {});
  };
  var _i = function getField(e, t) {
    return e.ref.fields[t];
  };
  var Ti = function syncFieldPositionsWithItems(e) {
    e.query("GET_ACTIVE_ITEMS").forEach(function (t) {
      e.ref.fields[t.id] && e.element.appendChild(e.ref.fields[t.id]);
    });
  };
  var Ii = function didReorderItems(e) {
    var t = e.root;
    return Ti(t);
  };
  var mi = function didAddItem(e) {
    var t = e.root,
      r = e.action;
    var n = t.query("GET_ITEM", r.id);
    var i = n.origin === Ue.LOCAL;
    var a = !i && t.query("SHOULD_UPDATE_FILE_INPUT");
    var o = pr("input");
    o.type = a ? "file" : "hidden";
    o.name = t.query("GET_NAME");
    o.disabled = t.query("GET_DISABLED");
    t.ref.fields[r.id] = o;
    Ti(t);
  };
  var gi = function didLoadItem(e) {
    var t = e.root,
      r = e.action;
    var n = _i(t, r.id);
    if (n) {
      r.serverFileReference !== null && (n.value = r.serverFileReference);
      if (t.query("SHOULD_UPDATE_FILE_INPUT")) {
        var i = t.query("GET_ITEM", r.id);
        pi(n, [i.file]);
      }
    }
  };
  var hi = function didPrepareOutput(e) {
    var t = e.root,
      r = e.action;
    t.query("SHOULD_UPDATE_FILE_INPUT") &&
      setTimeout(function () {
        var e = _i(t, r.id);
        e && pi(e, [r.file]);
      }, 0);
  };
  var Ri = function didSetDisabled(e) {
    var t = e.root;
    t.element.disabled = t.query("GET_DISABLED");
  };
  var Oi = function didRemoveItem(e) {
    var t = e.root,
      r = e.action;
    var n = _i(t, r.id);
    if (n) {
      n.parentNode && n.parentNode.removeChild(n);
      delete t.ref.fields[r.id];
    }
  };
  var yi = function didDefineValue(e) {
    var t = e.root,
      r = e.action;
    var n = _i(t, r.id);
    if (n) {
      r.value === null
        ? n.removeAttribute("value")
        : n.type != "file" && (n.value = r.value);
      Ti(t);
    }
  };
  var Di = j({
    DID_SET_DISABLED: Ri,
    DID_ADD_ITEM: mi,
    DID_LOAD_ITEM: gi,
    DID_REMOVE_ITEM: Oi,
    DID_DEFINE_VALUE: yi,
    DID_PREPARE_OUTPUT: hi,
    DID_REORDER_ITEMS: Ii,
    DID_SORT_ITEMS: Ii,
  });
  var Si = Y({
    tag: "fieldset",
    name: "data",
    create: Ei,
    write: Di,
    ignoreRect: true,
  });
  var Ai = function getRootNode(e) {
    return "getRootNode" in e ? e.getRootNode() : document;
  };
  var bi = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff"];
  var Pi = ["css", "csv", "html", "txt"];
  var Li = { zip: "zip|compressed", epub: "application/epub+zip" };
  var Mi = function guesstimateMimeType() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    e = e.toLowerCase();
    return bi.includes(e)
      ? "image/" + (e === "jpg" ? "jpeg" : e === "svg" ? "svg+xml" : e)
      : Pi.includes(e)
      ? "text/" + e
      : Li[e] || "";
  };
  var Ci = function requestDataTransferItems(e) {
    return new Promise(function (t, r) {
      var n = Yi(e);
      if (n.length && !wi(e)) return t(n);
      Ni(e).then(t);
    });
  };
  var wi = function hasFiles(e) {
    return !!e.files && e.files.length > 0;
  };
  var Ni = function getFiles(e) {
    return new Promise(function (t, r) {
      var n = (e.items ? Array.from(e.items) : [])
        .filter(function (e) {
          return Gi(e);
        })
        .map(function (e) {
          return Fi(e);
        });
      n.length
        ? Promise.all(n)
            .then(function (e) {
              var r = [];
              e.forEach(function (e) {
                r.push.apply(r, e);
              });
              t(
                r
                  .filter(function (e) {
                    return e;
                  })
                  .map(function (e) {
                    e._relativePath || (e._relativePath = e.webkitRelativePath);
                    return e;
                  })
              );
            })
            .catch(console.error)
        : t(e.files ? Array.from(e.files) : []);
    });
  };
  var Gi = function isFileSystemItem(e) {
    if (qi(e)) {
      var t = xi(e);
      if (t) return t.isFile || t.isDirectory;
    }
    return e.kind === "file";
  };
  var Fi = function getFilesFromItem(e) {
    return new Promise(function (t, r) {
      Vi(e) ? Ui(xi(e)).then(t).catch(r) : t([e.getAsFile()]);
    });
  };
  var Ui = function getFilesInDirectory(e) {
    return new Promise(function (t, r) {
      var n = [];
      var i = 0;
      var a = 0;
      var o = function resolveIfDone() {
        a === 0 && i === 0 && t(n);
      };
      var s = function readEntries(e) {
        i++;
        var t = e.createReader();
        var s = function readBatch() {
          t.readEntries(function (e) {
            if (e.length !== 0) {
              e.forEach(function (e) {
                if (e.isDirectory) readEntries(e);
                else {
                  a++;
                  e.file(function (t) {
                    var r = Bi(t);
                    e.fullPath && (r._relativePath = e.fullPath);
                    n.push(r);
                    a--;
                    o();
                  });
                }
              });
              readBatch();
            } else {
              i--;
              o();
            }
          }, r);
        };
        s();
      };
      s(e);
    });
  };
  var Bi = function correctMissingFileType(e) {
    if (e.type.length) return e;
    var t = e.lastModifiedDate;
    var r = e.name;
    var n = Mi(_t(e.name));
    if (!n.length) return e;
    e = e.slice(0, e.size, n);
    e.name = r;
    e.lastModifiedDate = t;
    return e;
  };
  var Vi = function isDirectoryEntry(e) {
    return qi(e) && (xi(e) || {}).isDirectory;
  };
  var qi = function isEntry(e) {
    return "webkitGetAsEntry" in e;
  };
  var xi = function getAsEntry(e) {
    return e.webkitGetAsEntry();
  };
  var Yi = function getLinks(e) {
    var t = [];
    try {
      t = ji(e);
      if (t.length) return t;
      t = ki(e);
    } catch (e) {}
    return t;
  };
  var ki = function getLinksFromTransferURLData(e) {
    var t = e.getData("url");
    return typeof t === "string" && t.length ? [t] : [];
  };
  var ji = function getLinksFromTransferMetaData(e) {
    var t = e.getData("text/html");
    if (typeof t === "string" && t.length) {
      var r = t.match(/src\s*=\s*"(.+?)"/);
      if (r) return [r[1]];
    }
    return [];
  };
  var Hi = [];
  var Wi = function eventPosition(e) {
    return {
      pageLeft: e.pageX,
      pageTop: e.pageY,
      scopeLeft: e.offsetX || e.layerX,
      scopeTop: e.offsetY || e.layerY,
    };
  };
  var Xi = function createDragNDropClient(e, t, r) {
    var n = zi(t);
    var i = {
      element: e,
      filterElement: r,
      state: null,
      ondrop: function ondrop() {},
      onenter: function onenter() {},
      ondrag: function ondrag() {},
      onexit: function onexit() {},
      onload: function onload() {},
      allowdrop: function allowdrop() {},
    };
    i.destroy = n.addListener(i);
    return i;
  };
  var zi = function getDragNDropObserver(e) {
    var t = Hi.find(function (t) {
      return t.element === e;
    });
    if (t) return t;
    var r = Qi(e);
    Hi.push(r);
    return r;
  };
  var Qi = function createDragNDropObserver(e) {
    var t = [];
    var r = { dragenter: ea, dragover: ta, dragleave: na, drop: ra };
    var n = {};
    a(r, function (r, i) {
      n[r] = i(e, t);
      e.addEventListener(r, n[r], false);
    });
    var i = {
      element: e,
      addListener: function addListener(o) {
        t.push(o);
        return function () {
          t.splice(t.indexOf(o), 1);
          if (t.length === 0) {
            Hi.splice(Hi.indexOf(i), 1);
            a(r, function (t) {
              e.removeEventListener(t, n[t], false);
            });
          }
        };
      },
    };
    return i;
  };
  var Zi = function elementFromPoint(e, t) {
    "elementFromPoint" in e || (e = document);
    return e.elementFromPoint(t.x, t.y);
  };
  var $i = function isEventTarget(e, t) {
    var r = Ai(t);
    var n = Zi(r, {
      x: e.pageX - window.pageXOffset,
      y: e.pageY - window.pageYOffset,
    });
    return n === t || t.contains(n);
  };
  var Ki = null;
  var Ji = function setDropEffect(e, t) {
    try {
      e.dropEffect = t;
    } catch (e) {}
  };
  var ea = function dragenter(e, t) {
    return function (e) {
      e.preventDefault();
      Ki = e.target;
      t.forEach(function (t) {
        var r = t.element,
          n = t.onenter;
        if ($i(e, r)) {
          t.state = "enter";
          n(Wi(e));
        }
      });
    };
  };
  var ta = function dragover(e, t) {
    return function (e) {
      e.preventDefault();
      var r = e.dataTransfer;
      Ci(r).then(function (n) {
        var i = false;
        t.some(function (t) {
          var a = t.filterElement,
            o = t.element,
            s = t.onenter,
            u = t.onexit,
            l = t.ondrag,
            c = t.allowdrop;
          Ji(r, "copy");
          var f = c(n);
          if (f)
            if ($i(e, o)) {
              i = true;
              if (t.state === null) {
                t.state = "enter";
                s(Wi(e));
                return;
              }
              t.state = "over";
              if (a && !f) {
                Ji(r, "none");
                return;
              }
              l(Wi(e));
            } else {
              a && !i && Ji(r, "none");
              if (t.state) {
                t.state = null;
                u(Wi(e));
              }
            }
          else Ji(r, "none");
        });
      });
    };
  };
  var ra = function drop(e, t) {
    return function (e) {
      e.preventDefault();
      var r = e.dataTransfer;
      Ci(r).then(function (r) {
        t.forEach(function (t) {
          var n = t.filterElement,
            i = t.element,
            a = t.ondrop,
            o = t.onexit,
            s = t.allowdrop;
          t.state = null;
          if (!n || $i(e, i)) {
            if (!s(r)) return o(Wi(e));
            a(Wi(e), r);
          }
        });
      });
    };
  };
  var na = function dragleave(e, t) {
    return function (e) {
      Ki === e.target &&
        t.forEach(function (t) {
          var r = t.onexit;
          t.state = null;
          r(Wi(e));
        });
    };
  };
  var ia = function createHopper(e, t, r) {
    e.classList.add("filepond--hopper");
    var n = r.catchesDropsOnPage,
      i = r.requiresDropOnElement,
      a = r.filterItems,
      o =
        a === void 0
          ? function (e) {
              return e;
            }
          : a;
    var s = Xi(e, n ? document.documentElement : e, i);
    var u = "";
    var l = "";
    s.allowdrop = function (e) {
      return t(o(e));
    };
    s.ondrop = function (e, r) {
      var n = o(r);
      if (t(n)) {
        l = "drag-drop";
        c.onload(n, e);
      } else c.ondragend(e);
    };
    s.ondrag = function (e) {
      c.ondrag(e);
    };
    s.onenter = function (e) {
      l = "drag-over";
      c.ondragstart(e);
    };
    s.onexit = function (e) {
      l = "drag-exit";
      c.ondragend(e);
    };
    var c = {
      updateHopperState: function updateHopperState() {
        if (u !== l) {
          e.dataset.hopperState = l;
          u = l;
        }
      },
      onload: function onload() {},
      ondragstart: function ondragstart() {},
      ondrag: function ondrag() {},
      ondragend: function ondragend() {},
      destroy: function destroy() {
        s.destroy();
      },
    };
    return c;
  };
  var aa = false;
  var oa = [];
  var sa = function handlePaste(e) {
    var t = document.activeElement;
    if (t && /textarea|input/i.test(t.nodeName)) {
      var r = false;
      var n = t;
      while (n !== document.body) {
        if (n.classList.contains("filepond--root")) {
          r = true;
          break;
        }
        n = n.parentNode;
      }
      if (!r) return;
    }
    Ci(e.clipboardData).then(function (e) {
      e.length &&
        oa.forEach(function (t) {
          return t(e);
        });
    });
  };
  var ua = function listen(e) {
    if (!oa.includes(e)) {
      oa.push(e);
      if (!aa) {
        aa = true;
        document.addEventListener("paste", sa);
      }
    }
  };
  var la = function unlisten(e) {
    Pe(oa, oa.indexOf(e));
    if (oa.length === 0) {
      document.removeEventListener("paste", sa);
      aa = false;
    }
  };
  var ca = function createPaster() {
    var e = function cb(e) {
      t.onload(e);
    };
    var t = {
      destroy: function destroy() {
        la(e);
      },
      onload: function onload() {},
    };
    ua(e);
    return t;
  };
  var fa = function create(e) {
    var t = e.root,
      r = e.props;
    t.element.id = "filepond--assistant-" + r.id;
    s(t.element, "role", "status");
    s(t.element, "aria-live", "polite");
    s(t.element, "aria-relevant", "additions");
  };
  var da = null;
  var va = null;
  var pa = [];
  var Ea = function assist(e, t) {
    e.element.textContent = t;
  };
  var _a = function clear(e) {
    e.element.textContent = "";
  };
  var Ta = function listModified(e, t, r) {
    var n = e.query("GET_TOTAL_ITEMS");
    Ea(
      e,
      r +
        " " +
        t +
        ", " +
        n +
        " " +
        (n === 1
          ? e.query("GET_LABEL_FILE_COUNT_SINGULAR")
          : e.query("GET_LABEL_FILE_COUNT_PLURAL"))
    );
    clearTimeout(va);
    va = setTimeout(function () {
      _a(e);
    }, 1500);
  };
  var Ia = function isUsingFilePond(e) {
    return e.element.parentNode.contains(document.activeElement);
  };
  var ma = function itemAdded(e) {
    var t = e.root,
      r = e.action;
    if (Ia(t)) {
      t.element.textContent = "";
      var n = t.query("GET_ITEM", r.id);
      pa.push(n.filename);
      clearTimeout(da);
      da = setTimeout(function () {
        Ta(t, pa.join(", "), t.query("GET_LABEL_FILE_ADDED"));
        pa.length = 0;
      }, 750);
    }
  };
  var ga = function itemRemoved(e) {
    var t = e.root,
      r = e.action;
    if (Ia(t)) {
      var n = r.item;
      Ta(t, n.filename, t.query("GET_LABEL_FILE_REMOVED"));
    }
  };
  var ha = function itemProcessed(e) {
    var t = e.root,
      r = e.action;
    var n = t.query("GET_ITEM", r.id);
    var i = n.filename;
    var a = t.query("GET_LABEL_FILE_PROCESSING_COMPLETE");
    Ea(t, i + " " + a);
  };
  var Ra = function itemProcessedUndo(e) {
    var t = e.root,
      r = e.action;
    var n = t.query("GET_ITEM", r.id);
    var i = n.filename;
    var a = t.query("GET_LABEL_FILE_PROCESSING_ABORTED");
    Ea(t, i + " " + a);
  };
  var Oa = function itemError(e) {
    var t = e.root,
      r = e.action;
    var n = t.query("GET_ITEM", r.id);
    var i = n.filename;
    Ea(t, r.status.main + " " + i + " " + r.status.sub);
  };
  var ya = Y({
    create: fa,
    ignoreRect: true,
    ignoreRectUpdate: true,
    write: j({
      DID_LOAD_ITEM: ma,
      DID_REMOVE_ITEM: ga,
      DID_COMPLETE_ITEM_PROCESSING: ha,
      DID_ABORT_ITEM_PROCESSING: Ra,
      DID_REVERT_ITEM_PROCESSING: Ra,
      DID_THROW_ITEM_REMOVE_ERROR: Oa,
      DID_THROW_ITEM_LOAD_ERROR: Oa,
      DID_THROW_ITEM_INVALID: Oa,
      DID_THROW_ITEM_PROCESSING_ERROR: Oa,
    }),
    tag: "span",
    name: "assistant",
  });
  var Da = function toCamels(e) {
    var t =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "-";
    return e.replace(new RegExp(t + ".", "g"), function (e) {
      return e.charAt(1).toUpperCase();
    });
  };
  var Sa = function debounce(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 16;
    var r = !(arguments.length > 2 && arguments[2] !== void 0) || arguments[2];
    var n = Date.now();
    var i = null;
    return function () {
      for (var a = arguments.length, o = new Array(a), s = 0; s < a; s++)
        o[s] = arguments[s];
      clearTimeout(i);
      var u = Date.now() - n;
      var l = function fn() {
        n = Date.now();
        e.apply(void 0, o);
      };
      u < t ? r || (i = setTimeout(l, t - u)) : l();
    };
  };
  var Aa = 1e6;
  var ba = function prevent(e) {
    return e.preventDefault();
  };
  var Pa = function create(e) {
    var t = e.root,
      r = e.props;
    var n = t.query("GET_ID");
    n && (t.element.id = n);
    var i = t.query("GET_CLASS_NAME");
    i &&
      i
        .split(" ")
        .filter(function (e) {
          return e.length;
        })
        .forEach(function (e) {
          t.element.classList.add(e);
        });
    t.ref.label = t.appendChildView(
      t.createChildView(
        ai,
        Object.assign({}, r, {
          translateY: null,
          caption: t.query("GET_LABEL_IDLE"),
        })
      )
    );
    t.ref.list = t.appendChildView(t.createChildView(kn, { translateY: null }));
    t.ref.panel = t.appendChildView(
      t.createChildView(En, { name: "panel-root" })
    );
    t.ref.assistant = t.appendChildView(
      t.createChildView(ya, Object.assign({}, r))
    );
    t.ref.data = t.appendChildView(t.createChildView(Si, Object.assign({}, r)));
    t.ref.measure = pr("div");
    t.ref.measure.style.height = "100%";
    t.element.appendChild(t.ref.measure);
    t.ref.bounds = null;
    t.query("GET_STYLES")
      .filter(function (e) {
        return !z(e.value);
      })
      .map(function (e) {
        var r = e.name,
          n = e.value;
        t.element.dataset[r] = n;
      });
    t.ref.widthPrevious = null;
    t.ref.widthUpdated = Sa(function () {
      t.ref.updateHistory = [];
      t.dispatch("DID_RESIZE_ROOT");
    }, 250);
    t.ref.previousAspectRatio = null;
    t.ref.updateHistory = [];
    var a = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    var o = "PointerEvent" in window;
    if (t.query("GET_ALLOW_REORDER") && o && !a) {
      t.element.addEventListener("touchmove", ba, { passive: false });
      t.element.addEventListener("gesturestart", ba);
    }
    var s = t.query("GET_CREDITS");
    var u = s.length === 2;
    if (u) {
      var l = document.createElement("a");
      l.className = "filepond--credits";
      l.setAttribute("aria-hidden", "true");
      l.href = s[0];
      l.tabindex = -1;
      l.target = "_blank";
      l.rel = "noopener noreferrer";
      l.textContent = s[1];
      t.element.appendChild(l);
      t.ref.credits = l;
    }
  };
  var La = function write(e) {
    var t = e.root,
      r = e.props,
      n = e.actions;
    Va({ root: t, props: r, actions: n });
    n.filter(function (e) {
      return /^DID_SET_STYLE_/.test(e.type);
    })
      .filter(function (e) {
        return !z(e.data.value);
      })
      .map(function (e) {
        var r = e.type,
          n = e.data;
        var i = Da(r.substring(8).toLowerCase(), "_");
        t.element.dataset[i] = n.value;
        t.invalidateLayout();
      });
    if (!t.rect.element.hidden) {
      if (t.rect.element.width !== t.ref.widthPrevious) {
        t.ref.widthPrevious = t.rect.element.width;
        t.ref.widthUpdated();
      }
      var i = t.ref.bounds;
      if (!i) {
        i = t.ref.bounds = wa(t);
        t.element.removeChild(t.ref.measure);
        t.ref.measure = null;
      }
      var a = t.ref,
        o = a.hopper,
        s = a.label,
        u = a.list,
        l = a.panel;
      o && o.updateHopperState();
      var c = t.query("GET_PANEL_ASPECT_RATIO");
      var f = t.query("GET_ALLOW_MULTIPLE");
      var d = t.query("GET_TOTAL_ITEMS");
      var v = f ? t.query("GET_MAX_FILES") || Aa : 1;
      var p = d === v;
      var E = n.find(function (e) {
        return e.type === "DID_ADD_ITEM";
      });
      if (p && E) {
        var _ = E.data.interactionMethod;
        s.opacity = 0;
        f
          ? (s.translateY = -40)
          : _ === Ae.API
          ? (s.translateX = 40)
          : _ === Ae.BROWSE
          ? (s.translateY = 40)
          : (s.translateY = 30);
      } else if (!p) {
        s.opacity = 1;
        s.translateX = 0;
        s.translateY = 0;
      }
      var T = Ma(t);
      var I = Ca(t);
      var m = s.rect.element.height;
      var g = !f || p ? 0 : m;
      var h = p ? u.rect.element.marginTop : 0;
      var R = d === 0 ? 0 : u.rect.element.marginBottom;
      var O = g + h + I.visual + R;
      var y = g + h + I.bounds + R;
      u.translateY = Math.max(0, g - u.rect.element.marginTop) - T.top;
      if (c) {
        var D = t.rect.element.width;
        var S = D * c;
        if (c !== t.ref.previousAspectRatio) {
          t.ref.previousAspectRatio = c;
          t.ref.updateHistory = [];
        }
        var A = t.ref.updateHistory;
        A.push(D);
        var b = 2;
        if (A.length > b * 2) {
          var P = A.length;
          var L = P - 10;
          var M = 0;
          for (var C = P; C >= L; C--) {
            A[C] === A[C - 2] && M++;
            if (M >= b) return;
          }
        }
        l.scalable = false;
        l.height = S;
        var w = S - g - (R - T.bottom) - (p ? h : 0);
        I.visual > w ? (u.overflow = w) : (u.overflow = null);
        t.height = S;
      } else if (i.fixedHeight) {
        l.scalable = false;
        var N = i.fixedHeight - g - (R - T.bottom) - (p ? h : 0);
        I.visual > N ? (u.overflow = N) : (u.overflow = null);
      } else if (i.cappedHeight) {
        var G = O >= i.cappedHeight;
        var F = Math.min(i.cappedHeight, O);
        l.scalable = true;
        l.height = G ? F : F - T.top - T.bottom;
        var U = F - g - (R - T.bottom) - (p ? h : 0);
        O > i.cappedHeight && I.visual > U
          ? (u.overflow = U)
          : (u.overflow = null);
        t.height = Math.min(i.cappedHeight, y - T.top - T.bottom);
      } else {
        var B = d > 0 ? T.top + T.bottom : 0;
        l.scalable = true;
        l.height = Math.max(m, O - B);
        t.height = Math.max(m, y - B);
      }
      t.ref.credits &&
        l.heightCurrent &&
        (t.ref.credits.style.transform =
          "translateY(" + l.heightCurrent + "px)");
    }
  };
  var Ma = function calculateListItemMargin(e) {
    var t = e.ref.list.childViews[0].childViews[0];
    return t
      ? { top: t.rect.element.marginTop, bottom: t.rect.element.marginBottom }
      : { top: 0, bottom: 0 };
  };
  var Ca = function calculateListHeight(e) {
    var t = 0;
    var r = 0;
    var n = e.ref.list;
    var i = n.childViews[0];
    var a = i.childViews.filter(function (e) {
      return e.rect.element.height;
    });
    var o = e
      .query("GET_ACTIVE_ITEMS")
      .map(function (e) {
        return a.find(function (t) {
          return t.id === e.id;
        });
      })
      .filter(function (e) {
        return e;
      });
    if (o.length === 0) return { visual: t, bounds: r };
    var s = i.rect.element.width;
    var u = yn(i, o, n.dragCoordinates);
    var l = o[0].rect.element;
    var c = l.marginTop + l.marginBottom;
    var f = l.marginLeft + l.marginRight;
    var d = l.width + f;
    var v = l.height + c;
    var p = typeof u !== "undefined" && u >= 0 ? 1 : 0;
    var E = o.find(function (e) {
      return e.markedForRemoval && e.opacity < 0.45;
    })
      ? -1
      : 0;
    var _ = o.length + p + E;
    var T = getItemsPerRow(s, d);
    if (T === 1)
      o.forEach(function (e) {
        var n = e.rect.element.height + c;
        r += n;
        t += n * e.opacity;
      });
    else {
      r = Math.ceil(_ / T) * v;
      t = r;
    }
    return { visual: t, bounds: r };
  };
  var wa = function calculateRootBoundingBoxHeight(e) {
    var t = e.ref.measureHeight || null;
    var r = parseInt(e.style.maxHeight, 10) || null;
    var n = t === 0 ? null : t;
    return { cappedHeight: r, fixedHeight: n };
  };
  var Na = function exceedsMaxFiles(e, t) {
    var r = e.query("GET_ALLOW_REPLACE");
    var n = e.query("GET_ALLOW_MULTIPLE");
    var i = e.query("GET_TOTAL_ITEMS");
    var a = e.query("GET_MAX_FILES");
    var o = t.length;
    if (!n && o > 1) {
      e.dispatch("DID_THROW_MAX_FILES", {
        source: t,
        error: Ft("warning", 0, "Max files"),
      });
      return true;
    }
    a = n ? a : 1;
    if (!n && r) return false;
    var s = ie(a);
    if (s && i + o > a) {
      e.dispatch("DID_THROW_MAX_FILES", {
        source: t,
        error: Ft("warning", 0, "Max files"),
      });
      return true;
    }
    return false;
  };
  var Ga = function getDragIndex(e, t, r) {
    var n = e.childViews[0];
    return yn(n, t, {
      left: r.scopeLeft - n.rect.element.left,
      top:
        r.scopeTop -
        (e.rect.outer.top +
          e.rect.element.marginTop +
          e.rect.element.scrollTop),
    });
  };
  var Fa = function toggleDrop(e) {
    var t = e.query("GET_ALLOW_DROP");
    var r = e.query("GET_DISABLED");
    var n = t && !r;
    if (n && !e.ref.hopper) {
      var i = ia(
        e.element,
        function (t) {
          var r =
            e.query("GET_BEFORE_DROP_FILE") ||
            function () {
              return true;
            };
          var n = e.query("GET_DROP_VALIDATION");
          return (
            !n ||
            t.every(function (t) {
              return (
                je("ALLOW_HOPPER_ITEM", t, { query: e.query }).every(function (
                  e
                ) {
                  return e === true;
                }) && r(t)
              );
            })
          );
        },
        {
          filterItems: function filterItems(t) {
            var r = e.query("GET_IGNORED_FILES");
            return t.filter(function (e) {
              return !$t(e) || !r.includes(e.name.toLowerCase());
            });
          },
          catchesDropsOnPage: e.query("GET_DROP_ON_PAGE"),
          requiresDropOnElement: e.query("GET_DROP_ON_ELEMENT"),
        }
      );
      i.onload = function (t, r) {
        var n = e.ref.list.childViews[0];
        var i = n.childViews.filter(function (e) {
          return e.rect.element.height;
        });
        var a = e
          .query("GET_ACTIVE_ITEMS")
          .map(function (e) {
            return i.find(function (t) {
              return t.id === e.id;
            });
          })
          .filter(function (e) {
            return e;
          });
        ke("ADD_ITEMS", t, { dispatch: e.dispatch }).then(function (t) {
          if (Na(e, t)) return false;
          e.dispatch("ADD_ITEMS", {
            items: t,
            index: Ga(e.ref.list, a, r),
            interactionMethod: Ae.DROP,
          });
        });
        e.dispatch("DID_DROP", { position: r });
        e.dispatch("DID_END_DRAG", { position: r });
      };
      i.ondragstart = function (t) {
        e.dispatch("DID_START_DRAG", { position: t });
      };
      i.ondrag = Sa(function (t) {
        e.dispatch("DID_DRAG", { position: t });
      });
      i.ondragend = function (t) {
        e.dispatch("DID_END_DRAG", { position: t });
      };
      e.ref.hopper = i;
      e.ref.drip = e.appendChildView(e.createChildView(vi));
    } else if (!n && e.ref.hopper) {
      e.ref.hopper.destroy();
      e.ref.hopper = null;
      e.removeChildView(e.ref.drip);
    }
  };
  var Ua = function toggleBrowse(e, t) {
    var r = e.query("GET_ALLOW_BROWSE");
    var n = e.query("GET_DISABLED");
    var i = r && !n;
    if (i && !e.ref.browser)
      e.ref.browser = e.appendChildView(
        e.createChildView(
          ti,
          Object.assign({}, t, {
            onload: function onload(t) {
              ke("ADD_ITEMS", t, { dispatch: e.dispatch }).then(function (t) {
                if (Na(e, t)) return false;
                e.dispatch("ADD_ITEMS", {
                  items: t,
                  index: -1,
                  interactionMethod: Ae.BROWSE,
                });
              });
            },
          })
        ),
        0
      );
    else if (!i && e.ref.browser) {
      e.removeChildView(e.ref.browser);
      e.ref.browser = null;
    }
  };
  var Ba = function togglePaste(e) {
    var t = e.query("GET_ALLOW_PASTE");
    var r = e.query("GET_DISABLED");
    var n = t && !r;
    if (n && !e.ref.paster) {
      e.ref.paster = ca();
      e.ref.paster.onload = function (t) {
        ke("ADD_ITEMS", t, { dispatch: e.dispatch }).then(function (t) {
          if (Na(e, t)) return false;
          e.dispatch("ADD_ITEMS", {
            items: t,
            index: -1,
            interactionMethod: Ae.PASTE,
          });
        });
      };
    } else if (!n && e.ref.paster) {
      e.ref.paster.destroy();
      e.ref.paster = null;
    }
  };
  var Va = j({
    DID_SET_ALLOW_BROWSE: function DID_SET_ALLOW_BROWSE(e) {
      var t = e.root,
        r = e.props;
      Ua(t, r);
    },
    DID_SET_ALLOW_DROP: function DID_SET_ALLOW_DROP(e) {
      var t = e.root;
      Fa(t);
    },
    DID_SET_ALLOW_PASTE: function DID_SET_ALLOW_PASTE(e) {
      var t = e.root;
      Ba(t);
    },
    DID_SET_DISABLED: function DID_SET_DISABLED(e) {
      var t = e.root,
        r = e.props;
      Fa(t);
      Ba(t);
      Ua(t, r);
      var n = t.query("GET_DISABLED");
      n
        ? (t.element.dataset.disabled = "disabled")
        : t.element.removeAttribute("data-disabled");
    },
  });
  var qa = Y({
    name: "root",
    read: function read(e) {
      var t = e.root;
      t.ref.measure && (t.ref.measureHeight = t.ref.measure.offsetHeight);
    },
    create: Pa,
    write: La,
    destroy: function destroy(e) {
      var t = e.root;
      t.ref.paster && t.ref.paster.destroy();
      t.ref.hopper && t.ref.hopper.destroy();
      t.element.removeEventListener("touchmove", ba);
      t.element.removeEventListener("gesturestart", ba);
    },
    mixins: { styles: ["height"] },
  });
  var xa = function createApp() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var t = null;
    var r = Xe();
    var i = n(Re(r), [lt, Se(r)], [fr, De(r)]);
    i.dispatch("SET_OPTIONS", { options: e });
    var a = function visibilityHandler() {
      document.hidden || i.dispatch("KICK");
    };
    document.addEventListener("visibilitychange", a);
    var s = null;
    var u = false;
    var l = false;
    var c = null;
    var f = null;
    var d = function resizeHandler() {
      u || (u = true);
      clearTimeout(s);
      s = setTimeout(function () {
        u = false;
        c = null;
        f = null;
        if (l) {
          l = false;
          i.dispatch("DID_STOP_RESIZE");
        }
      }, 500);
    };
    window.addEventListener("resize", d);
    var v = qa(i, { id: be() });
    var p = false;
    var E = false;
    var _ = {
      _read: function _read() {
        if (u) {
          f = window.innerWidth;
          c || (c = f);
          if (!l && f !== c) {
            i.dispatch("DID_START_RESIZE");
            l = true;
          }
        }
        E && p && (p = v.element.offsetParent === null);
        if (!p) {
          v._read();
          E = v.rect.element.hidden;
        }
      },
      _write: function _write(e) {
        var t = i.processActionQueue().filter(function (e) {
          return !/^SET_/.test(e.type);
        });
        if (!p || t.length) {
          g(t);
          p = v._write(e, t, l);
          Ge(i.query("GET_ITEMS"));
          p && i.processDispatchQueue();
        }
      },
    };
    var T = function createEvent(e) {
      return function (t) {
        var r = { type: e };
        if (!t) return r;
        t.hasOwnProperty("error") &&
          (r.error = t.error ? Object.assign({}, t.error) : null);
        t.status && (r.status = Object.assign({}, t.status));
        t.file && (r.output = t.file);
        if (t.source) r.file = t.source;
        else if (t.item || t.id) {
          var n = t.item ? t.item : i.query("GET_ITEM", t.id);
          r.file = n ? Ne(n) : null;
        }
        t.items && (r.items = t.items.map(Ne));
        /progress/.test(e) && (r.progress = t.progress);
        if (t.hasOwnProperty("origin") && t.hasOwnProperty("target")) {
          r.origin = t.origin;
          r.target = t.target;
        }
        return r;
      };
    };
    var I = {
      DID_DESTROY: T("destroy"),
      DID_INIT: T("init"),
      DID_THROW_MAX_FILES: T("warning"),
      DID_INIT_ITEM: T("initfile"),
      DID_START_ITEM_LOAD: T("addfilestart"),
      DID_UPDATE_ITEM_LOAD_PROGRESS: T("addfileprogress"),
      DID_LOAD_ITEM: T("addfile"),
      DID_THROW_ITEM_INVALID: [T("error"), T("addfile")],
      DID_THROW_ITEM_LOAD_ERROR: [T("error"), T("addfile")],
      DID_THROW_ITEM_REMOVE_ERROR: [T("error"), T("removefile")],
      DID_PREPARE_OUTPUT: T("preparefile"),
      DID_START_ITEM_PROCESSING: T("processfilestart"),
      DID_UPDATE_ITEM_PROCESS_PROGRESS: T("processfileprogress"),
      DID_ABORT_ITEM_PROCESSING: T("processfileabort"),
      DID_COMPLETE_ITEM_PROCESSING: T("processfile"),
      DID_COMPLETE_ITEM_PROCESSING_ALL: T("processfiles"),
      DID_REVERT_ITEM_PROCESSING: T("processfilerevert"),
      DID_THROW_ITEM_PROCESSING_ERROR: [T("error"), T("processfile")],
      DID_REMOVE_ITEM: T("removefile"),
      DID_UPDATE_ITEMS: T("updatefiles"),
      DID_ACTIVATE_ITEM: T("activatefile"),
      DID_REORDER_ITEMS: T("reorderfiles"),
    };
    var m = function exposeEvent(e) {
      var t = Object.assign({ pond: N }, e);
      delete t.type;
      v.element.dispatchEvent(
        new CustomEvent("FilePond:" + e.type, {
          detail: t,
          bubbles: true,
          cancelable: true,
          composed: true,
        })
      );
      var r = [];
      e.hasOwnProperty("error") && r.push(e.error);
      e.hasOwnProperty("file") && r.push(e.file);
      var n = ["type", "error", "file"];
      Object.keys(e)
        .filter(function (e) {
          return !n.includes(e);
        })
        .forEach(function (t) {
          return r.push(e[t]);
        });
      N.fire.apply(N, [e.type].concat(r));
      var a = i.query("GET_ON" + e.type.toUpperCase());
      a && a.apply(void 0, r);
    };
    var g = function routeActionsToEvents(e) {
      e.length &&
        e
          .filter(function (e) {
            return I[e.type];
          })
          .forEach(function (e) {
            var t = I[e.type];
            (Array.isArray(t) ? t : [t]).forEach(function (t) {
              e.type === "DID_INIT_ITEM"
                ? m(t(e.data))
                : setTimeout(function () {
                    m(t(e.data));
                  }, 0);
            });
          });
    };
    var h = function setOptions(e) {
      return i.dispatch("SET_OPTIONS", { options: e });
    };
    var O = function getFile(e) {
      return i.query("GET_ACTIVE_ITEM", e);
    };
    var y = function prepareFile(e) {
      return new Promise(function (t, r) {
        i.dispatch("REQUEST_ITEM_PREPARE", {
          query: e,
          success: function success(e) {
            t(e);
          },
          failure: function failure(e) {
            r(e);
          },
        });
      });
    };
    var D = function addFile(e) {
      var t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return new Promise(function (r, n) {
        b([{ source: e, options: t }], { index: t.index })
          .then(function (e) {
            return r(e && e[0]);
          })
          .catch(n);
      });
    };
    var S = function isFilePondFile(e) {
      return e.file && e.id;
    };
    var A = function removeFile(e, t) {
      if (typeof e === "object" && !S(e) && !t) {
        t = e;
        e = void 0;
      }
      i.dispatch("REMOVE_ITEM", Object.assign({}, t, { query: e }));
      return i.query("GET_ACTIVE_ITEM", e) === null;
    };
    var b = function addFiles() {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return new Promise(function (e, r) {
        var n = [];
        var a = {};
        if (X(t[0])) {
          n.push.apply(n, t[0]);
          Object.assign(a, t[1] || {});
        } else {
          var o = t[t.length - 1];
          typeof o !== "object" ||
            o instanceof Blob ||
            Object.assign(a, t.pop());
          n.push.apply(n, t);
        }
        i.dispatch("ADD_ITEMS", {
          items: n,
          index: a.index,
          interactionMethod: Ae.API,
          success: e,
          failure: r,
        });
      });
    };
    var P = function getFiles() {
      return i.query("GET_ACTIVE_ITEMS");
    };
    var L = function processFile(e) {
      return new Promise(function (t, r) {
        i.dispatch("REQUEST_ITEM_PROCESSING", {
          query: e,
          success: function success(e) {
            t(e);
          },
          failure: function failure(e) {
            r(e);
          },
        });
      });
    };
    var M = function prepareFiles() {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      var n = Array.isArray(t[0]) ? t[0] : t;
      var i = n.length ? n : P();
      return Promise.all(i.map(y));
    };
    var C = function processFiles() {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      var n = Array.isArray(t[0]) ? t[0] : t;
      if (!n.length) {
        var i = P().filter(function (e) {
          return (
            !(e.status === Fe.IDLE && e.origin === Ue.LOCAL) &&
            e.status !== Fe.PROCESSING &&
            e.status !== Fe.PROCESSING_COMPLETE &&
            e.status !== Fe.PROCESSING_REVERT_ERROR
          );
        });
        return Promise.all(i.map(L));
      }
      return Promise.all(n.map(L));
    };
    var w = function removeFiles() {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      var n = Array.isArray(t[0]) ? t[0] : t;
      var i;
      typeof n[n.length - 1] === "object"
        ? (i = n.pop())
        : Array.isArray(t[0]) && (i = t[1]);
      var a = P();
      if (!n.length)
        return Promise.all(
          a.map(function (e) {
            return A(e, i);
          })
        );
      var o = n
        .map(function (e) {
          return R(e) ? (a[e] ? a[e].id : null) : e;
        })
        .filter(function (e) {
          return e;
        });
      return o.map(function (e) {
        return A(e, i);
      });
    };
    var N = Object.assign({}, Me(), {}, _, {}, ye(i, r), {
      /**
       * Override options defined in options object
       * @param options
       */
      setOptions: h,
      /**
       * Load the given file
       * @param source - the source of the file (either a File, base64 data uri or url)
       * @param options - object, { index: 0 }
       */
      addFile: D,
      /**
       * Load the given files
       * @param sources - the sources of the files to load
       * @param options - object, { index: 0 }
       */
      addFiles: b,
      /**
       * Returns the file objects matching the given query
       * @param query { string, number, null }
       */
      getFile: O,
      /**
       * Upload file with given name
       * @param query { string, number, null  }
       */
      processFile: L,
      /**
       * Request prepare output for file with given name
       * @param query { string, number, null  }
       */
      prepareFile: y,
      /**
       * Removes a file by its name
       * @param query { string, number, null  }
       */
      removeFile: A,
      moveFile: function moveFile(e, t) {
        return i.dispatch("MOVE_ITEM", { query: e, index: t });
      },
      getFiles: P,
      processFiles: C,
      removeFiles: w,
      prepareFiles: M,
      sort: function sort(e) {
        return i.dispatch("SORT", { compare: e });
      },
      browse: function browse() {
        var e = v.element.querySelector("input[type=file]");
        e && e.click();
      },
      destroy: function destroy() {
        N.fire("destroy", v.element);
        i.dispatch("ABORT_ALL");
        v._destroy();
        window.removeEventListener("resize", d);
        document.removeEventListener("visibilitychange", a);
        i.dispatch("DID_DESTROY");
      },
      insertBefore: function insertBefore$1(e) {
        return H(v.element, e);
      },
      insertAfter: function insertAfter$1(e) {
        return W(v.element, e);
      },
      appendTo: function appendTo(e) {
        return e.appendChild(v.element);
      },
      replaceElement: function replaceElement(e) {
        H(v.element, e);
        e.parentNode.removeChild(e);
        t = e;
      },
      restoreElement: function restoreElement() {
        if (t) {
          W(t, v.element);
          v.element.parentNode.removeChild(v.element);
          t = null;
        }
      },
      /**
       * Returns true if the app root is attached to given element
       * @param element
       */
      isAttachedTo: function isAttachedTo(e) {
        return v.element === e || t === e;
      },
      element: {
        get: function get() {
          return v.element;
        },
      },
      status: {
        get: function get() {
          return i.query("GET_STATUS");
        },
      },
    });
    i.dispatch("DID_INIT");
    return o(N);
  };
  var Ya = function createAppObject() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var t = {};
    a(Xe(), function (e, r) {
      t[e] = r[0];
    });
    var r = xa(Object.assign({}, t, {}, e));
    return r;
  };
  var ka = function lowerCaseFirstLetter(e) {
    return e.charAt(0).toLowerCase() + e.slice(1);
  };
  var ja = function attributeNameToPropertyName(e) {
    return Da(e.replace(/^data-/, ""));
  };
  var Ha = function mapObject(e, t) {
    a(t, function (t, r) {
      a(e, function (n, i) {
        var a = new RegExp(t);
        var o = a.test(n);
        if (o) {
          delete e[n];
          if (r !== false)
            if (ee(r)) e[r] = i;
            else {
              var s = r.group;
              ve(r) && !e[s] && (e[s] = {});
              e[s][ka(n.replace(a, ""))] = i;
            }
        }
      });
      r.mapping && mapObject(e[r.group], r.mapping);
    });
  };
  var Wa = function getAttributesAsObject(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var r = [];
    a(e.attributes, function (t) {
      r.push(e.attributes[t]);
    });
    var n = r
      .filter(function (e) {
        return e.name;
      })
      .reduce(function (t, r) {
        var n = s(e, r.name);
        t[ja(r.name)] = n === r.name || n;
        return t;
      }, {});
    Ha(n, t);
    return n;
  };
  var Xa = function createAppAtElement(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var r = {
      "^class$": "className",
      "^multiple$": "allowMultiple",
      "^capture$": "captureMethod",
      "^webkitdirectory$": "allowDirectoriesOnly",
      "^server": {
        group: "server",
        mapping: {
          "^process": { group: "process" },
          "^revert": { group: "revert" },
          "^fetch": { group: "fetch" },
          "^restore": { group: "restore" },
          "^load": { group: "load" },
        },
      },
      "^type$": false,
      "^files$": false,
    };
    je("SET_ATTRIBUTE_TO_OPTION_MAP", r);
    var n = Object.assign({}, t);
    var i = Wa(
      e.nodeName === "FIELDSET" ? e.querySelector("input[type=file]") : e,
      r
    );
    Object.keys(i).forEach(function (e) {
      if (ve(i[e])) {
        ve(n[e]) || (n[e] = {});
        Object.assign(n[e], i[e]);
      } else n[e] = i[e];
    });
    n.files = (t.files || []).concat(
      Array.from(e.querySelectorAll("input:not([type=file])")).map(function (
        e
      ) {
        return { source: e.value, options: { type: e.dataset.type } };
      })
    );
    var a = Ya(n);
    e.files &&
      Array.from(e.files).forEach(function (e) {
        a.addFile(e);
      });
    a.replaceElement(e);
    return a;
  };
  var za = function createApp() {
    return r(arguments.length <= 0 ? void 0 : arguments[0])
      ? Xa.apply(void 0, arguments)
      : Ya.apply(void 0, arguments);
  };
  var Qa = ["fire", "_read", "_write"];
  var Za = function createAppAPI(e) {
    var t = {};
    Ce(e, t, Qa);
    return t;
  };
  /**
   * Replaces placeholders in given string with replacements
   * @param string - "Foo {bar}""
   * @param replacements - { "bar": 10 }
   */ var $a = function replaceInString(e, t) {
    return e.replace(/(?:{([a-zA-Z]+)})/g, function (e, r) {
      return t[r];
    });
  };
  var Ka = function createWorker(e) {
    var t = new Blob(["(", e.toString(), ")()"], {
      type: "application/javascript",
    });
    var r = URL.createObjectURL(t);
    var n = new Worker(r);
    return {
      transfer: function transfer(e, t) {},
      post: function post(e, t, r) {
        var i = be();
        n.onmessage = function (e) {
          e.data.id === i && t(e.data.message);
        };
        n.postMessage({ id: i, message: e }, r);
      },
      terminate: function terminate() {
        n.terminate();
        URL.revokeObjectURL(r);
      },
    };
  };
  var Ja = function loadImage(e) {
    return new Promise(function (t, r) {
      var n = new Image();
      n.onload = function () {
        t(n);
      };
      n.onerror = function (e) {
        r(e);
      };
      n.src = e;
    });
  };
  var eo = function renameFile(e, t) {
    var r = e.slice(0, e.size, e.type);
    r.lastModifiedDate = e.lastModifiedDate;
    r.name = t;
    return r;
  };
  var to = function copyFile(e) {
    return eo(e, e.name);
  };
  var ro = [];
  var no = function createAppPlugin(e) {
    if (!ro.includes(e)) {
      ro.push(e);
      var t = e({
        addFilter: He,
        utils: {
          Type: xe,
          forin: a,
          isString: ee,
          isFile: $t,
          toNaturalFileSize: Dr,
          replaceInString: $a,
          getExtensionFromFilename: _t,
          getFilenameWithoutExtension: Qt,
          guesstimateMimeType: Mi,
          getFileFromBlob: gt,
          getFilenameFromURL: Et,
          createRoute: j,
          createWorker: Ka,
          createView: Y,
          createItemAPI: Ne,
          loadImage: Ja,
          copyFile: to,
          renameFile: eo,
          createBlob: Rt,
          applyFilterChain: ke,
          text: Er,
          getNumericAspectRatioFromString: $e,
        },
        views: { fileActionButton: yr },
      });
      We(t.options);
    }
  };
  var io = function isOperaMini() {
    return (
      Object.prototype.toString.call(window.operamini) === "[object OperaMini]"
    );
  };
  var ao = function hasPromises() {
    return "Promise" in window;
  };
  var oo = function hasBlobSlice() {
    return "slice" in Blob.prototype;
  };
  var so = function hasCreateObjectURL() {
    return "URL" in window && "createObjectURL" in window.URL;
  };
  var uo = function hasVisibility() {
    return "visibilityState" in document;
  };
  var lo = function hasTiming() {
    return "performance" in window;
  };
  var co = function hasCSSSupports() {
    return "supports" in (window.CSS || {});
  };
  var fo = function isIE11() {
    return /MSIE|Trident/.test(window.navigator.userAgent);
  };
  var vo = (function () {
    var e =
      _() && !io() && uo() && ao() && oo() && so() && lo() && (co() || fo());
    return function () {
      return e;
    };
  })();
  var po = { apps: [] };
  var Eo = "filepond";
  var _o = function fn() {};
  t.Status = {};
  t.FileStatus = {};
  t.FileOrigin = {};
  t.OptionTypes = {};
  t.create = _o;
  t.destroy = _o;
  t.parse = _o;
  t.find = _o;
  t.registerPlugin = _o;
  t.getOptions = _o;
  t.setOptions = _o;
  if (vo()) {
    k(
      function () {
        po.apps.forEach(function (e) {
          return e._read();
        });
      },
      function (e) {
        po.apps.forEach(function (t) {
          return t._write(e);
        });
      }
    );
    var To = function dispatch() {
      document.dispatchEvent(
        new CustomEvent("FilePond:loaded", {
          detail: {
            supported: vo,
            create: t.create,
            destroy: t.destroy,
            parse: t.parse,
            find: t.find,
            registerPlugin: t.registerPlugin,
            setOptions: t.setOptions,
          },
        })
      );
      document.removeEventListener("DOMContentLoaded", dispatch);
    };
    document.readyState !== "loading"
      ? setTimeout(function () {
          return To();
        }, 0)
      : document.addEventListener("DOMContentLoaded", To);
    var Io = function updateOptionTypes() {
      return a(Xe(), function (e, r) {
        t.OptionTypes[e] = r[1];
      });
    };
    t.Status = Object.assign({}, Je);
    t.FileOrigin = Object.assign({}, Ue);
    t.FileStatus = Object.assign({}, Fe);
    t.OptionTypes = {};
    Io();
    t.create = function create() {
      var e = za.apply(void 0, arguments);
      e.on("destroy", t.destroy);
      po.apps.push(e);
      return Za(e);
    };
    t.destroy = function destroy(e) {
      var t = po.apps.findIndex(function (t) {
        return t.isAttachedTo(e);
      });
      if (t >= 0) {
        var r = po.apps.splice(t, 1)[0];
        r.restoreElement();
        return true;
      }
      return false;
    };
    t.parse = function parse(e) {
      var r = Array.from(e.querySelectorAll("." + Eo));
      var n = r.filter(function (e) {
        return !po.apps.find(function (t) {
          return t.isAttachedTo(e);
        });
      });
      return n.map(function (e) {
        return t.create(e);
      });
    };
    t.find = function find(e) {
      var t = po.apps.find(function (t) {
        return t.isAttachedTo(e);
      });
      return t ? Za(t) : null;
    };
    t.registerPlugin = function registerPlugin() {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      t.forEach(no);
      Io();
    };
    t.getOptions = function getOptions$1() {
      var e = {};
      a(Xe(), function (t, r) {
        e[t] = r[0];
      });
      return e;
    };
    t.setOptions = function setOptions$1(e) {
      if (ve(e)) {
        po.apps.forEach(function (t) {
          t.setOptions(e);
        });
        ze(e);
      }
      return t.getOptions();
    };
  }
  t.supported = vo;
  Object.defineProperty(t, "__esModule", { value: true });
});
const r = t.Status,
  n = t.FileStatus,
  i = t.FileOrigin,
  a = t.OptionTypes,
  o = t.create,
  s = t.destroy,
  u = t.parse,
  l = t.find,
  c = t.registerPlugin,
  f = t.getOptions,
  d = t.setOptions,
  v = t.supported,
  p = t.__esModule;
export {
  i as FileOrigin,
  n as FileStatus,
  a as OptionTypes,
  r as Status,
  p as __esModule,
  o as create,
  t as default,
  s as destroy,
  l as find,
  f as getOptions,
  u as parse,
  c as registerPlugin,
  d as setOptions,
  v as supported,
};
