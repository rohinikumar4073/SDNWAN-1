!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e(require("react")) : "function" == typeof define && define.amd ? define(["react"], e) : "object" == typeof exports ? exports.ReactDnD = e(require("react")) : t.ReactDnD = e(t.React)
}(this, function(t) {
    return function(t) {
        function e(r) {
            if (n[r])
                return n[r].exports;
            var o = n[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return t[r].call(o.exports, o, o.exports, e),
            o.loaded = !0,
            o.exports
        }
        var n = {};
        return e.m = t,
        e.c = n,
        e.p = "",
        e(0)
    }([function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t["default"] : t
        }
        e.__esModule = !0;
        var o = n(42);
        e.DragDropContext = r(o);
        var i = n(43);
        e.DragLayer = r(i);
        var a = n(44);
        e.DragSource = r(a);
        var u = n(45);
        e.DropTarget = r(u)
    }
    , function(t, e, n) {
        "use strict";
        var r = function(t, e, n, r, o, i, a, u) {
            if (!t) {
                var s;
                if (void 0 === e)
                    s = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                else {
                    var c = [n, r, o, i, a, u]
                      , f = 0;
                    s = new Error(e.replace(/%s/g, function() {
                        return c[f++]
                    })),
                    s.name = "Invariant Violation"
                }
                throw s.framesToPop = 1,
                s
            }
        }
        ;
        t.exports = r
    }
    , function(t, e, n) {
        function r(t) {
            if (!a(t) || d.call(t) != u || i(t))
                return !1;
            var e = o(t);
            if (null === e)
                return !0;
            var n = f.call(e, "constructor") && e.constructor;
            return "function" == typeof n && n instanceof n && c.call(n) == l
        }
        var o = n(90)
          , i = n(37)
          , a = n(12)
          , u = "[object Object]"
          , s = Object.prototype
          , c = Function.prototype.toString
          , f = s.hasOwnProperty
          , l = c.call(Object)
          , d = s.toString;
        t.exports = r
    }
    , function(t, e) {
        function n(t) {
            var e = typeof t;
            return "number" == e || "boolean" == e || "string" == e && "__proto__" != t || null == t
        }
        t.exports = n
    }
    , function(t, e, n) {
        var r = n(20)
          , o = n(38)
          , i = r(o, "Map");
        t.exports = i
    }
    , function(t, e) {
        var n = Array.isArray;
        t.exports = n
    }
    , function(e, n) {
        e.exports = t
    }
    , function(t, e, n) {
        "use strict";
        function r(t, e) {}
        e.__esModule = !0,
        e["default"] = r,
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t) {
            var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]
              , n = e.publishSource
              , r = void 0 === n ? !0 : n
              , o = e.clientOffset
              , i = void 0 === o ? null : o
              , a = e.getSourceClientOffset;
            d["default"](h["default"](t), "Expected sourceIds to be an array.");
            var u = this.getMonitor()
              , s = this.getRegistry();
            d["default"](!u.isDragging(), "Cannot call beginDrag while dragging.");
            for (var c = 0; c < t.length; c++)
                d["default"](s.getSource(t[c]), "Expected sourceIds to be registered.");
            for (var f = null , c = t.length - 1; c >= 0; c--)
                if (u.canDragSource(t[c])) {
                    f = t[c];
                    break
                }
            if (null !== f) {
                var l = null ;
                i && (d["default"]("function" == typeof a, "When clientOffset is provided, getSourceClientOffset must be a function."),
                l = a(f));
                var p = s.getSource(f)
                  , g = p.beginDrag(u, f);
                d["default"](y["default"](g), "Item must be an object."),
                s.pinSource(f);
                var m = s.getSourceType(f);
                return {
                    type: v,
                    itemType: m,
                    item: g,
                    sourceId: f,
                    clientOffset: i,
                    sourceClientOffset: l,
                    isSourcePublic: r
                }
            }
        }
        function i(t) {
            var e = this.getMonitor();
            if (e.isDragging())
                return {
                    type: m
                }
        }
        function a(t) {
            var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]
              , n = e.clientOffset
              , r = void 0 === n ? null : n;
            d["default"](h["default"](t), "Expected targetIds to be an array."),
            t = t.slice(0);
            var o = this.getMonitor()
              , i = this.getRegistry();
            d["default"](o.isDragging(), "Cannot call hover while not dragging."),
            d["default"](!o.didDrop(), "Cannot call hover after drop.");
            for (var a = o.getItemType(), u = 0; u < t.length; u++) {
                var s = t[u];
                d["default"](t.lastIndexOf(s) === u, "Expected targetIds to be unique in the passed array.");
                var c = i.getTarget(s);
                d["default"](c, "Expected targetIds to be registered.");
                var l = i.getTargetType(s);
                f["default"](l, a) && c.hover(o, s)
            }
            return {
                type: b,
                targetIds: t,
                clientOffset: r
            }
        }
        function u() {
            var t = this
              , e = this.getMonitor()
              , n = this.getRegistry();
            d["default"](e.isDragging(), "Cannot call drop while not dragging."),
            d["default"](!e.didDrop(), "Cannot call drop twice during one drag operation.");
            var r = e.getTargetIds().filter(e.canDropOnTarget, e);
            r.reverse(),
            r.forEach(function(r, o) {
                var i = n.getTarget(r)
                  , a = i.drop(e, r);
                d["default"]("undefined" == typeof a || y["default"](a), "Drop result must either be an object or undefined."),
                "undefined" == typeof a && (a = 0 === o ? {} : e.getDropResult()),
                t.store.dispatch({
                    type: _,
                    dropResult: a
                })
            })
        }
        function s() {
            var t = this.getMonitor()
              , e = this.getRegistry();
            d["default"](t.isDragging(), "Cannot call endDrag while not dragging.");
            var n = t.getSourceId()
              , r = e.getSource(n, !0);
            return r.endDrag(t, n),
            e.unpinSource(),
            {
                type: D
            }
        }
        e.__esModule = !0,
        e.beginDrag = o,
        e.publishDragSource = i,
        e.hover = a,
        e.drop = u,
        e.endDrag = s;
        var c = n(33)
          , f = r(c)
          , l = n(1)
          , d = r(l)
          , p = n(5)
          , h = r(p)
          , g = n(23)
          , y = r(g)
          , v = "dnd-core/BEGIN_DRAG";
        e.BEGIN_DRAG = v;
        var m = "dnd-core/PUBLISH_DRAG_SOURCE";
        e.PUBLISH_DRAG_SOURCE = m;
        var b = "dnd-core/HOVER";
        e.HOVER = b;
        var _ = "dnd-core/DROP";
        e.DROP = _;
        var D = "dnd-core/END_DRAG";
        e.END_DRAG = D
    }
    , function(t, e) {
        "use strict";
        function n(t) {
            return {
                type: a,
                sourceId: t
            }
        }
        function r(t) {
            return {
                type: u,
                targetId: t
            }
        }
        function o(t) {
            return {
                type: s,
                sourceId: t
            }
        }
        function i(t) {
            return {
                type: c,
                targetId: t
            }
        }
        e.__esModule = !0,
        e.addSource = n,
        e.addTarget = r,
        e.removeSource = o,
        e.removeTarget = i;
        var a = "dnd-core/ADD_SOURCE";
        e.ADD_SOURCE = a;
        var u = "dnd-core/ADD_TARGET";
        e.ADD_TARGET = u;
        var s = "dnd-core/REMOVE_SOURCE";
        e.REMOVE_SOURCE = s;
        var c = "dnd-core/REMOVE_TARGET";
        e.REMOVE_TARGET = c
    }
    , function(t, e, n) {
        function r(t, e) {
            for (var n = t.length; n--; )
                if (o(t[n][0], e))
                    return n;
            return -1
        }
        var o = n(101);
        t.exports = r
    }
    , function(t, e, n) {
        var r = n(20)
          , o = r(Object, "create");
        t.exports = o
    }
    , function(t, e) {
        function n(t) {
            return !!t && "object" == typeof t
        }
        t.exports = n
    }
    , function(t, e) {
        "use strict";
        function n(t, e) {
            if (t === e)
                return !0;
            var n = Object.keys(t)
              , r = Object.keys(e);
            if (n.length !== r.length)
                return !1;
            for (var o = Object.prototype.hasOwnProperty, i = 0; i < n.length; i++) {
                if (!o.call(e, n[i]) || t[n[i]] !== e[n[i]])
                    return !1;
                var a = t[n[i]]
                  , u = e[n[i]];
                if (a !== u)
                    return !1
            }
            return !0
        }
        e.__esModule = !0,
        e["default"] = n,
        t.exports = e["default"]
    }
    , function(t, e) {
        "use strict";
        function n(t) {
            return Boolean(t && "function" == typeof t.dispose)
        }
        e.__esModule = !0,
        e["default"] = n,
        t.exports = e["default"]
    }
    , function(t, e, n) {
        function r(t) {
            var e = -1
              , n = t ? t.length : 0;
            for (this.__data__ = new o; ++e < n; )
                this.push(t[e])
        }
        var o = n(71)
          , i = n(86);
        r.prototype.push = i,
        t.exports = r
    }
    , function(t, e, n) {
        function r(t, e) {
            return !!t.length && o(t, e, 0) > -1
        }
        var o = n(81);
        t.exports = r
    }
    , function(t, e) {
        function n(t, e, n) {
            for (var r = -1, o = t.length; ++r < o; )
                if (n(e, t[r]))
                    return !0;
            return !1
        }
        t.exports = n
    }
    , function(t, e) {
        function n(t, e) {
            for (var n = -1, r = t.length, o = Array(r); ++n < r; )
                o[n] = e(t[n], n, t);
            return o
        }
        t.exports = n
    }
    , function(t, e, n) {
        function r(t, e) {
            var n = t.__data__;
            if (o(e)) {
                var r = n.__data__
                  , a = "string" == typeof e ? r.string : r.hash;
                return a[e] === i
            }
            return n.has(e)
        }
        var o = n(3)
          , i = "__lodash_hash_undefined__";
        t.exports = r
    }
    , function(t, e, n) {
        function r(t, e) {
            var n = t[e];
            return o(n) ? n : void 0
        }
        var o = n(105);
        t.exports = r
    }
    , function(t, e, n) {
        function r(t) {
            return i(t) && o(t)
        }
        var o = n(103)
          , i = n(12);
        t.exports = r
    }
    , function(t, e, n) {
        function r(t) {
            var e = o(t) ? s.call(t) : "";
            return e == i || e == a
        }
        var o = n(23)
          , i = "[object Function]"
          , a = "[object GeneratorFunction]"
          , u = Object.prototype
          , s = u.toString;
        t.exports = r
    }
    , function(t, e) {
        function n(t) {
            var e = typeof t;
            return !!t && ("object" == e || "function" == e)
        }
        t.exports = n
    }
    , function(t, e, n) {
        function r(t, e) {
            if ("function" != typeof t)
                throw new TypeError(a);
            return e = u(void 0 === e ? t.length - 1 : i(e), 0),
            function() {
                for (var n = arguments, r = -1, i = u(n.length - e, 0), a = Array(i); ++r < i; )
                    a[r] = n[e + r];
                switch (e) {
                case 0:
                    return t.call(this, a);
                case 1:
                    return t.call(this, n[0], a);
                case 2:
                    return t.call(this, n[0], n[1], a)
                }
                var s = Array(e + 1);
                for (r = -1; ++r < e; )
                    s[r] = n[r];
                return s[e] = a,
                o(t, this, s)
            }
        }
        var o = n(73)
          , i = n(107)
          , a = "Expected a function"
          , u = Math.max;
        t.exports = r
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e) {
            return e === t ? !0 : null !== e && null !== t && a["default"](e, t)
        }
        e.__esModule = !0,
        e["default"] = o;
        var i = n(13)
          , a = r(i);
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        function a(t) {
            var e = t.DecoratedComponent
              , n = t.createHandler
              , r = t.createMonitor
              , a = t.createConnector
              , d = t.registerHandler
              , h = t.containerDisplayName
              , y = t.getType
              , v = t.collect
              , b = t.options
              , _ = b.arePropsEqual
              , D = void 0 === _ ? g["default"] : _
              , x = e.displayName || e.name || "Component";
            return function(t) {
                function g(e, i) {
                    o(this, g),
                    t.call(this, e, i),
                    this.handleChange = this.handleChange.bind(this),
                    this.handleChildRef = this.handleChildRef.bind(this),
                    m["default"]("object" == typeof this.context.dragDropManager, "Could not find the drag and drop manager in the context of %s. Make sure to wrap the top-level component of your app with DragDropContext. Read more: http://gaearon.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context", x, x),
                    this.manager = this.context.dragDropManager,
                    this.handlerMonitor = r(this.manager),
                    this.handlerConnector = a(this.manager.getBackend()),
                    this.handler = n(this.handlerMonitor),
                    this.disposable = new l.SerialDisposable,
                    this.receiveProps(e),
                    this.state = this.getCurrentState(),
                    this.dispose()
                }
                return i(g, t),
                g.prototype.getHandlerId = function() {
                    return this.handlerId
                }
                ,
                g.prototype.getDecoratedComponentInstance = function() {
                    return this.decoratedComponentInstance
                }
                ,
                g.prototype.shouldComponentUpdate = function(t, e) {
                    return !D(t, this.props) || !p["default"](e, this.state)
                }
                ,
                s(g, null , [{
                    key: "DecoratedComponent",
                    value: e,
                    enumerable: !0
                }, {
                    key: "displayName",
                    value: h + "(" + x + ")",
                    enumerable: !0
                }, {
                    key: "contextTypes",
                    value: {
                        dragDropManager: c.PropTypes.object.isRequired
                    },
                    enumerable: !0
                }]),
                g.prototype.componentDidMount = function() {
                    this.isCurrentlyMounted = !0,
                    this.disposable = new l.SerialDisposable,
                    this.currentType = null ,
                    this.receiveProps(this.props),
                    this.handleChange()
                }
                ,
                g.prototype.componentWillReceiveProps = function(t) {
                    D(t, this.props) || (this.receiveProps(t),
                    this.handleChange())
                }
                ,
                g.prototype.componentWillUnmount = function() {
                    this.dispose(),
                    this.isCurrentlyMounted = !1
                }
                ,
                g.prototype.receiveProps = function(t) {
                    this.handler.receiveProps(t),
                    this.receiveType(y(t))
                }
                ,
                g.prototype.receiveType = function(t) {
                    if (t !== this.currentType) {
                        this.currentType = t;
                        var e = d(t, this.handler, this.manager)
                          , n = e.handlerId
                          , r = e.unregister;
                        this.handlerId = n,
                        this.handlerMonitor.receiveHandlerId(n),
                        this.handlerConnector.receiveHandlerId(n);
                        var o = this.manager.getMonitor()
                          , i = o.subscribeToStateChange(this.handleChange, {
                            handlerIds: [n]
                        });
                        this.disposable.setDisposable(new l.CompositeDisposable(new l.Disposable(i),new l.Disposable(r)))
                    }
                }
                ,
                g.prototype.handleChange = function() {
                    if (this.isCurrentlyMounted) {
                        var t = this.getCurrentState();
                        p["default"](t, this.state) || this.setState(t)
                    }
                }
                ,
                g.prototype.dispose = function() {
                    this.disposable.dispose(),
                    this.handlerConnector.receiveHandlerId(null )
                }
                ,
                g.prototype.handleChildRef = function(t) {
                    this.decoratedComponentInstance = t,
                    this.handler.receiveComponent(t)
                }
                ,
                g.prototype.getCurrentState = function() {
                    var t = v(this.handlerConnector.hooks, this.handlerMonitor);
                    return t
                }
                ,
                g.prototype.render = function() {
                    return f["default"].createElement(e, u({}, this.props, this.state, {
                        ref: this.handleChildRef
                    }))
                }
                ,
                g
            }(c.Component)
        }
        e.__esModule = !0;
        var u = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
            }
            return t
        }
          , s = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n),
                r && t(e, r),
                e
            }
        }();
        e["default"] = a;
        var c = n(6)
          , f = r(c)
          , l = n(58)
          , d = n(13)
          , p = r(d)
          , h = n(28)
          , g = r(h)
          , y = n(2)
          , v = (r(y),
        n(1))
          , m = r(v);
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e) {
            return "string" == typeof t || "symbol" == typeof t || e && a["default"](t) && t.every(function(t) {
                return o(t, !1)
            })
        }
        e.__esModule = !0,
        e["default"] = o;
        var i = n(5)
          , a = r(i);
        t.exports = e["default"]
    }
    , function(t, e) {
        "use strict";
        function n(t, e) {
            if (t === e)
                return !0;
            if ("object" != typeof t || null === t || "object" != typeof e || null === e)
                return !1;
            var n = Object.keys(t)
              , r = Object.keys(e);
            if (n.length !== r.length)
                return !1;
            for (var o = Object.prototype.hasOwnProperty, i = 0; i < n.length; i++) {
                if (!o.call(e, n[i]))
                    return !1;
                var a = t[n[i]]
                  , u = e[n[i]];
                if (a !== u || "object" == typeof a || "object" == typeof u)
                    return !1
            }
            return !0
        }
        e.__esModule = !0,
        e["default"] = n,
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t) {
            if ("string" != typeof t.type) {
                var e = t.type.displayName || t.type.name || "the component";
                throw new Error("Only native element nodes can now be passed to React DnD connectors. " + ("You can either wrap " + e + " into a <div>, or turn it into a ") + "drag source or a drop target itself.")
            }
        }
        function i(t) {
            return function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? null : arguments[0]
                  , n = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                if (!c.isValidElement(e)) {
                    var r = e;
                    return void t(r, n)
                }
                var i = e;
                o(i);
                var a = n ? function(e) {
                    return t(e, n)
                }
                : t;
                return s["default"](i, a)
            }
        }
        function a(t) {
            var e = {};
            return Object.keys(t).forEach(function(n) {
                var r = t[n]
                  , o = i(r);
                e[n] = function() {
                    return o
                }
            }),
            e
        }
        e.__esModule = !0,
        e["default"] = a;
        var u = n(54)
          , s = r(u)
          , c = n(6);
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(t) {
            return t && t.constructor === Symbol ? "symbol" : typeof t
        }
        function a(t) {
            d["default"]("function" == typeof t.canDrag, "Expected canDrag to be a function."),
            d["default"]("function" == typeof t.beginDrag, "Expected beginDrag to be a function."),
            d["default"]("function" == typeof t.endDrag, "Expected endDrag to be a function.")
        }
        function u(t) {
            d["default"]("function" == typeof t.canDrop, "Expected canDrop to be a function."),
            d["default"]("function" == typeof t.hover, "Expected hover to be a function."),
            d["default"]("function" == typeof t.drop, "Expected beginDrag to be a function.")
        }
        function s(t, e) {
            return e && h["default"](t) ? void t.forEach(function(t) {
                return s(t, !1)
            }) : void d["default"]("string" == typeof t || "symbol" === ("undefined" == typeof t ? "undefined" : i(t)), e ? "Type can only be a string, a symbol, or an array of either." : "Type can only be a string or a symbol.")
        }
        function c(t) {
            var e = y["default"]().toString();
            switch (t) {
            case _.SOURCE:
                return "S" + e;
            case _.TARGET:
                return "T" + e;
            default:
                d["default"](!1, "Unknown role: " + t)
            }
        }
        function f(t) {
            switch (t[0]) {
            case "S":
                return _.SOURCE;
            case "T":
                return _.TARGET;
            default:
                d["default"](!1, "Cannot parse handler ID: " + t)
            }
        }
        e.__esModule = !0;
        var l = n(1)
          , d = r(l)
          , p = n(5)
          , h = r(p)
          , g = n(69)
          , y = r(g)
          , v = n(9)
          , m = n(40)
          , b = r(m)
          , _ = {
            SOURCE: "SOURCE",
            TARGET: "TARGET"
        }
          , D = function() {
            function t(e) {
                o(this, t),
                this.store = e,
                this.types = {},
                this.handlers = {},
                this.pinnedSourceId = null ,
                this.pinnedSource = null
            }
            return t.prototype.addSource = function(t, e) {
                s(t),
                a(e);
                var n = this.addHandler(_.SOURCE, t, e);
                return this.store.dispatch(v.addSource(n)),
                n
            }
            ,
            t.prototype.addTarget = function(t, e) {
                s(t, !0),
                u(e);
                var n = this.addHandler(_.TARGET, t, e);
                return this.store.dispatch(v.addTarget(n)),
                n
            }
            ,
            t.prototype.addHandler = function(t, e, n) {
                var r = c(t);
                return this.types[r] = e,
                this.handlers[r] = n,
                r
            }
            ,
            t.prototype.containsHandler = function(t) {
                var e = this;
                return Object.keys(this.handlers).some(function(n) {
                    return e.handlers[n] === t
                })
            }
            ,
            t.prototype.getSource = function(t, e) {
                d["default"](this.isSourceId(t), "Expected a valid source ID.");
                var n = e && t === this.pinnedSourceId
                  , r = n ? this.pinnedSource : this.handlers[t];
                return r
            }
            ,
            t.prototype.getTarget = function(t) {
                return d["default"](this.isTargetId(t), "Expected a valid target ID."),
                this.handlers[t]
            }
            ,
            t.prototype.getSourceType = function(t) {
                return d["default"](this.isSourceId(t), "Expected a valid source ID."),
                this.types[t]
            }
            ,
            t.prototype.getTargetType = function(t) {
                return d["default"](this.isTargetId(t), "Expected a valid target ID."),
                this.types[t]
            }
            ,
            t.prototype.isSourceId = function(t) {
                var e = f(t);
                return e === _.SOURCE
            }
            ,
            t.prototype.isTargetId = function(t) {
                var e = f(t);
                return e === _.TARGET
            }
            ,
            t.prototype.removeSource = function(t) {
                var e = this;
                d["default"](this.getSource(t), "Expected an existing source."),
                this.store.dispatch(v.removeSource(t)),
                b["default"](function() {
                    delete e.handlers[t],
                    delete e.types[t]
                })
            }
            ,
            t.prototype.removeTarget = function(t) {
                var e = this;
                d["default"](this.getTarget(t), "Expected an existing target."),
                this.store.dispatch(v.removeTarget(t)),
                b["default"](function() {
                    delete e.handlers[t],
                    delete e.types[t]
                })
            }
            ,
            t.prototype.pinSource = function(t) {
                var e = this.getSource(t);
                d["default"](e, "Expected an existing source."),
                this.pinnedSourceId = t,
                this.pinnedSource = e
            }
            ,
            t.prototype.unpinSource = function() {
                d["default"](this.pinnedSource, "No source is pinned at the time."),
                this.pinnedSourceId = null ,
                this.pinnedSource = null
            }
            ,
            t
        }();
        e["default"] = D,
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e, n) {
            switch (void 0 === t && (t = d),
            e.type) {
            case f.HOVER:
                break;
            case l.ADD_SOURCE:
            case l.ADD_TARGET:
            case l.REMOVE_TARGET:
            case l.REMOVE_SOURCE:
                return d;
            case f.BEGIN_DRAG:
            case f.PUBLISH_DRAG_SOURCE:
            case f.END_DRAG:
            case f.DROP:
            default:
                return p
            }
            var r = e.targetIds
              , o = n.targetIds
              , i = u["default"](r, o)
              , a = !1;
            if (0 === i.length) {
                for (var s = 0; s < r.length; s++)
                    if (r[s] !== o[s]) {
                        a = !0;
                        break
                    }
            } else
                a = !0;
            if (!a)
                return d;
            var c = o[o.length - 1]
              , h = r[r.length - 1];
            return c !== h && (c && i.push(c),
            h && i.push(h)),
            i
        }
        function i(t, e) {
            return t === d ? !1 : t === p || "undefined" == typeof e ? !0 : c["default"](e, t).length > 0
        }
        e.__esModule = !0,
        e["default"] = o,
        e.areDirty = i;
        var a = n(110)
          , u = r(a)
          , s = n(102)
          , c = r(s)
          , f = n(8)
          , l = n(9)
          , d = []
          , p = []
    }
    , function(t, e, n) {
        "use strict";
        function r(t, e) {
            return t === e ? !0 : t && e && t.x === e.x && t.y === e.y
        }
        function o(t, e) {
            switch (void 0 === t && (t = c),
            e.type) {
            case s.BEGIN_DRAG:
                return {
                    initialSourceClientOffset: e.sourceClientOffset,
                    initialClientOffset: e.clientOffset,
                    clientOffset: e.clientOffset
                };
            case s.HOVER:
                return r(t.clientOffset, e.clientOffset) ? t : u({}, t, {
                    clientOffset: e.clientOffset
                });
            case s.END_DRAG:
            case s.DROP:
                return c;
            default:
                return t
            }
        }
        function i(t) {
            var e = t.clientOffset
              , n = t.initialClientOffset
              , r = t.initialSourceClientOffset;
            return e && n && r ? {
                x: e.x + r.x - n.x,
                y: e.y + r.y - n.y
            } : null
        }
        function a(t) {
            var e = t.clientOffset
              , n = t.initialClientOffset;
            return e && n ? {
                x: e.x - n.x,
                y: e.y - n.y
            } : null
        }
        e.__esModule = !0;
        var u = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
            }
            return t
        }
        ;
        e["default"] = o,
        e.getSourceClientOffset = i,
        e.getDifferenceFromInitialOffset = a;
        var s = n(8)
          , c = {
            initialSourceClientOffset: null ,
            initialClientOffset: null ,
            clientOffset: null
        }
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e) {
            return a["default"](t) ? t.some(function(t) {
                return t === e
            }) : t === e
        }
        e.__esModule = !0,
        e["default"] = o;
        var i = n(5)
          , a = r(i);
        t.exports = e["default"]
    }
    , function(t, e, n) {
        function r(t, e, n, r) {
            var l = -1
              , d = i
              , p = !0
              , h = t.length
              , g = []
              , y = e.length;
            if (!h)
                return g;
            n && (e = u(e, s(n))),
            r ? (d = a,
            p = !1) : e.length >= f && (d = c,
            p = !1,
            e = new o(e));
            t: for (; ++l < h; ) {
                var v = t[l]
                  , m = n ? n(v) : v;
                if (p && m === m) {
                    for (var b = y; b--; )
                        if (e[b] === m)
                            continue t;
                    g.push(v)
                } else
                    d(e, m, r) || g.push(v)
            }
            return g
        }
        var o = n(15)
          , i = n(16)
          , a = n(17)
          , u = n(18)
          , s = n(35)
          , c = n(19)
          , f = 200;
        t.exports = r
    }
    , function(t, e) {
        function n(t) {
            return function(e) {
                return t(e)
            }
        }
        t.exports = n
    }
    , function(t, e, n) {
        function r(t, e) {
            return o ? void 0 !== t[e] : a.call(t, e)
        }
        var o = n(11)
          , i = Object.prototype
          , a = i.hasOwnProperty;
        t.exports = r
    }
    , function(t, e) {
        function n(t) {
            var e = !1;
            if (null != t && "function" != typeof t.toString)
                try {
                    e = !!(t + "")
                } catch (n) {}
            return e
        }
        t.exports = n
    }
    , function(t, e, n) {
        (function(t, r) {
            var o = n(87)
              , i = {
                "function": !0,
                object: !0
            }
              , a = i[typeof e] && e && !e.nodeType ? e : void 0
              , u = i[typeof t] && t && !t.nodeType ? t : void 0
              , s = o(a && u && "object" == typeof r && r)
              , c = o(i[typeof self] && self)
              , f = o(i[typeof window] && window)
              , l = o(i[typeof this] && this)
              , d = s || f !== (l && l.window) && f || c || l || Function("return this")();
            t.exports = d
        }
        ).call(e, n(112)(t), function() {
            return this
        }())
    }
    , function(t, e) {
        function n() {}
        t.exports = n
    }
    , function(t, e, n) {
        "use strict";
        function r() {
            if (s.length)
                throw s.shift()
        }
        function o(t) {
            var e;
            e = u.length ? u.pop() : new i,
            e.task = t,
            a(e)
        }
        function i() {
            this.task = null
        }
        var a = n(41)
          , u = []
          , s = []
          , c = a.makeRequestCallFromTimer(r);
        t.exports = o,
        i.prototype.call = function() {
            try {
                this.task.call()
            } catch (t) {
                o.onerror ? o.onerror(t) : (s.push(t),
                c())
            } finally {
                this.task = null ,
                u[u.length] = this
            }
        }
    }
    , function(t, e) {
        (function(e) {
            "use strict";
            function n(t) {
                u.length || (a(),
                s = !0),
                u[u.length] = t
            }
            function r() {
                for (; c < u.length; ) {
                    var t = c;
                    if (c += 1,
                    u[t].call(),
                    c > f) {
                        for (var e = 0, n = u.length - c; n > e; e++)
                            u[e] = u[e + c];
                        u.length -= c,
                        c = 0
                    }
                }
                u.length = 0,
                c = 0,
                s = !1
            }
            function o(t) {
                var e = 1
                  , n = new l(t)
                  , r = document.createTextNode("");
                return n.observe(r, {
                    characterData: !0
                }),
                function() {
                    e = -e,
                    r.data = e
                }
            }
            function i(t) {
                return function() {
                    function e() {
                        clearTimeout(n),
                        clearInterval(r),
                        t()
                    }
                    var n = setTimeout(e, 0)
                      , r = setInterval(e, 50)
                }
            }
            t.exports = n;
            var a, u = [], s = !1, c = 0, f = 1024, l = e.MutationObserver || e.WebKitMutationObserver;
            a = "function" == typeof l ? o(r) : i(r),
            n.requestFlush = a,
            n.makeRequestCallFromTimer = i
        }
        ).call(e, function() {
            return this
        }())
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        function a(t) {
            y["default"].apply(void 0, ["DragDropContext", "backend"].concat(s.call(arguments)));
            var e = void 0;
            e = "object" == typeof t && "function" == typeof t["default"] ? t["default"] : t,
            h["default"]("function" == typeof e, "Expected the backend to be a function or an ES6 module exporting a default function. Read more: http://gaearon.github.io/react-dnd/docs-drag-drop-context.html");
            var n = {
                dragDropManager: new d.DragDropManager(e)
            };
            return function(t) {
                var e = t.displayName || t.name || "Component";
                return function(r) {
                    function a() {
                        o(this, a),
                        r.apply(this, arguments)
                    }
                    return i(a, r),
                    a.prototype.getDecoratedComponentInstance = function() {
                        return this.refs.child
                    }
                    ,
                    a.prototype.getManager = function() {
                        return n.dragDropManager
                    }
                    ,
                    a.prototype.getChildContext = function() {
                        return n
                    }
                    ,
                    a.prototype.render = function() {
                        return l["default"].createElement(t, u({}, this.props, {
                            ref: "child"
                        }))
                    }
                    ,
                    c(a, null , [{
                        key: "DecoratedComponent",
                        value: t,
                        enumerable: !0
                    }, {
                        key: "displayName",
                        value: "DragDropContext(" + e + ")",
                        enumerable: !0
                    }, {
                        key: "childContextTypes",
                        value: {
                            dragDropManager: f.PropTypes.object.isRequired
                        },
                        enumerable: !0
                    }]),
                    a
                }(f.Component)
            }
        }
        e.__esModule = !0;
        var u = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
            }
            return t
        }
          , s = Array.prototype.slice
          , c = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n),
                r && t(e, r),
                e
            }
        }();
        e["default"] = a;
        var f = n(6)
          , l = r(f)
          , d = n(64)
          , p = n(1)
          , h = r(p)
          , g = n(7)
          , y = r(g);
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        function a(t) {
            var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
            return D["default"].apply(void 0, ["DragLayer", "collect[, options]"].concat(s.call(arguments))),
            b["default"]("function" == typeof t, 'Expected "collect" provided as the first argument to DragLayer to be a function that collects props to inject into the component. ', "Instead, received %s. Read more: http://gaearon.github.io/react-dnd/docs-drag-layer.html", t),
            b["default"](v["default"](e), 'Expected "options" provided as the second argument to DragLayer to be a plain object when specified. Instead, received %s. Read more: http://gaearon.github.io/react-dnd/docs-drag-layer.html', e),
            function(n) {
                var r = e.arePropsEqual
                  , a = void 0 === r ? g["default"] : r
                  , s = n.displayName || n.name || "Component";
                return function(e) {
                    function r(t, n) {
                        o(this, r),
                        e.call(this, t),
                        this.handleChange = this.handleChange.bind(this),
                        this.manager = n.dragDropManager,
                        b["default"]("object" == typeof this.manager, "Could not find the drag and drop manager in the context of %s. Make sure to wrap the top-level component of your app with DragDropContext. Read more: http://gaearon.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context", s, s),
                        this.state = this.getCurrentState()
                    }
                    return i(r, e),
                    r.prototype.getDecoratedComponentInstance = function() {
                        return this.refs.child
                    }
                    ,
                    r.prototype.shouldComponentUpdate = function(t, e) {
                        return !a(t, this.props) || !p["default"](e, this.state)
                    }
                    ,
                    c(r, null , [{
                        key: "DecoratedComponent",
                        value: n,
                        enumerable: !0
                    }, {
                        key: "displayName",
                        value: "DragLayer(" + s + ")",
                        enumerable: !0
                    }, {
                        key: "contextTypes",
                        value: {
                            dragDropManager: f.PropTypes.object.isRequired
                        },
                        enumerable: !0
                    }]),
                    r.prototype.componentDidMount = function() {
                        this.isCurrentlyMounted = !0;
                        var t = this.manager.getMonitor();
                        this.unsubscribeFromOffsetChange = t.subscribeToOffsetChange(this.handleChange),
                        this.unsubscribeFromStateChange = t.subscribeToStateChange(this.handleChange),
                        this.handleChange()
                    }
                    ,
                    r.prototype.componentWillUnmount = function() {
                        this.isCurrentlyMounted = !1,
                        this.unsubscribeFromOffsetChange(),
                        this.unsubscribeFromStateChange()
                    }
                    ,
                    r.prototype.handleChange = function() {
                        if (this.isCurrentlyMounted) {
                            var t = this.getCurrentState();
                            p["default"](t, this.state) || this.setState(t)
                        }
                    }
                    ,
                    r.prototype.getCurrentState = function() {
                        var e = this.manager.getMonitor();
                        return t(e)
                    }
                    ,
                    r.prototype.render = function() {
                        return l["default"].createElement(n, u({}, this.props, this.state, {
                            ref: "child"
                        }))
                    }
                    ,
                    r
                }(f.Component)
            }
        }
        e.__esModule = !0;
        var u = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
            }
            return t
        }
          , s = Array.prototype.slice
          , c = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n),
                r && t(e, r),
                e
            }
        }();
        e["default"] = a;
        var f = n(6)
          , l = r(f)
          , d = n(13)
          , p = r(d)
          , h = n(28)
          , g = r(h)
          , y = n(2)
          , v = r(y)
          , m = n(1)
          , b = r(m)
          , _ = n(7)
          , D = r(_);
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e, n) {
            var r = arguments.length <= 3 || void 0 === arguments[3] ? {} : arguments[3];
            l["default"].apply(void 0, ["DragSource", "type, spec, collect[, options]"].concat(i.call(arguments)));
            var o = t;
            "function" != typeof t && (u["default"](O["default"](t), 'Expected "type" provided as the first argument to DragSource to be a string, or a function that returns a string given the current props. Instead, received %s. Read more: http://gaearon.github.io/react-dnd/docs-drag-source.html', t),
            o = function() {
                return t
            }
            ),
            u["default"](c["default"](e), 'Expected "spec" provided as the second argument to DragSource to be a plain object. Instead, received %s. Read more: http://gaearon.github.io/react-dnd/docs-drag-source.html', e);
            var a = v["default"](e);
            return u["default"]("function" == typeof n, 'Expected "collect" provided as the third argument to DragSource to be a function that returns a plain object of props to inject. Instead, received %s. Read more: http://gaearon.github.io/react-dnd/docs-drag-source.html', n),
            u["default"](c["default"](r), 'Expected "options" provided as the fourth argument to DragSource to be a plain object when specified. Instead, received %s. Read more: http://gaearon.github.io/react-dnd/docs-drag-source.html', n),
            function(t) {
                return p["default"]({
                    connectBackend: function(t, e) {
                        return t.connectDragSource(e)
                    },
                    containerDisplayName: "DragSource",
                    createHandler: a,
                    registerHandler: g["default"],
                    createMonitor: b["default"],
                    createConnector: D["default"],
                    DecoratedComponent: t,
                    getType: o,
                    collect: n,
                    options: r
                })
            }
        }
        e.__esModule = !0;
        var i = Array.prototype.slice;
        e["default"] = o;
        var a = n(1)
          , u = r(a)
          , s = n(2)
          , c = r(s)
          , f = n(7)
          , l = r(f)
          , d = n(26)
          , p = r(d)
          , h = n(52)
          , g = r(h)
          , y = n(47)
          , v = r(y)
          , m = n(48)
          , b = r(m)
          , _ = n(46)
          , D = r(_)
          , x = n(27)
          , O = r(x);
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e, n) {
            var r = arguments.length <= 3 || void 0 === arguments[3] ? {} : arguments[3];
            l["default"].apply(void 0, ["DropTarget", "type, spec, collect[, options]"].concat(i.call(arguments)));
            var o = t;
            "function" != typeof t && (u["default"](O["default"](t, !0), 'Expected "type" provided as the first argument to DropTarget to be a string, an array of strings, or a function that returns either given the current props. Instead, received %s. Read more: http://gaearon.github.io/react-dnd/docs-drop-target.html', t),
            o = function() {
                return t
            }
            ),
            u["default"](c["default"](e), 'Expected "spec" provided as the second argument to DropTarget to be a plain object. Instead, received %s. Read more: http://gaearon.github.io/react-dnd/docs-drop-target.html', e);
            var a = v["default"](e);
            return u["default"]("function" == typeof n, 'Expected "collect" provided as the third argument to DropTarget to be a function that returns a plain object of props to inject. Instead, received %s. Read more: http://gaearon.github.io/react-dnd/docs-drop-target.html', n),
            u["default"](c["default"](r), 'Expected "options" provided as the fourth argument to DropTarget to be a plain object when specified. Instead, received %s. Read more: http://gaearon.github.io/react-dnd/docs-drop-target.html', n),
            function(t) {
                return p["default"]({
                    connectBackend: function(t, e) {
                        return t.connectDropTarget(e)
                    },
                    containerDisplayName: "DropTarget",
                    createHandler: a,
                    registerHandler: g["default"],
                    createMonitor: b["default"],
                    createConnector: D["default"],
                    DecoratedComponent: t,
                    getType: o,
                    collect: n,
                    options: r
                })
            }
        }
        e.__esModule = !0;
        var i = Array.prototype.slice;
        e["default"] = o;
        var a = n(1)
          , u = r(a)
          , s = n(2)
          , c = r(s)
          , f = n(7)
          , l = r(f)
          , d = n(26)
          , p = r(d)
          , h = n(53)
          , g = r(h)
          , y = n(50)
          , v = r(y)
          , m = n(51)
          , b = r(m)
          , _ = n(49)
          , D = r(_)
          , x = n(27)
          , O = r(x);
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t) {
            function e() {
                c && (c(),
                c = null ),
                o && i && (c = t.connectDragSource(o, i, u))
            }
            function n() {
                d && (d(),
                d = null ),
                o && f && (d = t.connectDragPreview(o, f, l))
            }
            function r(t) {
                t !== o && (o = t,
                e(),
                n())
            }
            var o = void 0
              , i = void 0
              , u = void 0
              , c = void 0
              , f = void 0
              , l = void 0
              , d = void 0
              , p = a["default"]({
                dragSource: function(t, n) {
                    t === i && s["default"](n, u) || (i = t,
                    u = n,
                    e())
                },
                dragPreview: function(t, e) {
                    t === f && s["default"](e, l) || (f = t,
                    l = e,
                    n())
                }
            });
            return {
                receiveHandlerId: r,
                hooks: p
            }
        }
        e.__esModule = !0,
        e["default"] = o;
        var i = n(29)
          , a = r(i)
          , u = n(25)
          , s = r(u);
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(t) {
            Object.keys(t).forEach(function(e) {
                u["default"](c.indexOf(e) > -1, 'Expected the drag source specification to only have some of the following keys: %s. Instead received a specification with an unexpected "%s" key. Read more: http://gaearon.github.io/react-dnd/docs-drag-source.html', c.join(", "), e),
                u["default"]("function" == typeof t[e], "Expected %s in the drag source specification to be a function. Instead received a specification with %s: %s. Read more: http://gaearon.github.io/react-dnd/docs-drag-source.html", e, e, t[e])
            }),
            f.forEach(function(e) {
                u["default"]("function" == typeof t[e], "Expected %s in the drag source specification to be a function. Instead received a specification with %s: %s. Read more: http://gaearon.github.io/react-dnd/docs-drag-source.html", e, e, t[e])
            });
            var e = function() {
                function e(t) {
                    o(this, e),
                    this.monitor = t,
                    this.props = null ,
                    this.component = null
                }
                return e.prototype.receiveProps = function(t) {
                    this.props = t
                }
                ,
                e.prototype.receiveComponent = function(t) {
                    this.component = t
                }
                ,
                e.prototype.canDrag = function() {
                    return t.canDrag ? t.canDrag(this.props, this.monitor) : !0;
                }
                ,
                e.prototype.isDragging = function(e, n) {
                    return t.isDragging ? t.isDragging(this.props, this.monitor) : n === e.getSourceId()
                }
                ,
                e.prototype.beginDrag = function() {
                    var e = t.beginDrag(this.props, this.monitor, this.component);
                    return e
                }
                ,
                e.prototype.endDrag = function() {
                    t.endDrag && t.endDrag(this.props, this.monitor, this.component)
                }
                ,
                e
            }();
            return function(t) {
                return new e(t)
            }
        }
        e.__esModule = !0,
        e["default"] = i;
        var a = n(1)
          , u = r(a)
          , s = n(2)
          , c = (r(s),
        ["canDrag", "beginDrag", "canDrag", "isDragging", "endDrag"])
          , f = ["beginDrag"];
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(t) {
            return new f(t)
        }
        e.__esModule = !0,
        e["default"] = i;
        var a = n(1)
          , u = r(a)
          , s = !1
          , c = !1
          , f = function() {
            function t(e) {
                o(this, t),
                this.internalMonitor = e.getMonitor()
            }
            return t.prototype.receiveHandlerId = function(t) {
                this.sourceId = t
            }
            ,
            t.prototype.canDrag = function() {
                u["default"](!s, "You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://gaearon.github.io/react-dnd/docs-drag-source-monitor.html");
                try {
                    return s = !0,
                    this.internalMonitor.canDragSource(this.sourceId)
                } finally {
                    s = !1
                }
            }
            ,
            t.prototype.isDragging = function() {
                u["default"](!c, "You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://gaearon.github.io/react-dnd/docs-drag-source-monitor.html");
                try {
                    return c = !0,
                    this.internalMonitor.isDraggingSource(this.sourceId)
                } finally {
                    c = !1
                }
            }
            ,
            t.prototype.getItemType = function() {
                return this.internalMonitor.getItemType()
            }
            ,
            t.prototype.getItem = function() {
                return this.internalMonitor.getItem()
            }
            ,
            t.prototype.getDropResult = function() {
                return this.internalMonitor.getDropResult()
            }
            ,
            t.prototype.didDrop = function() {
                return this.internalMonitor.didDrop()
            }
            ,
            t.prototype.getInitialClientOffset = function() {
                return this.internalMonitor.getInitialClientOffset()
            }
            ,
            t.prototype.getInitialSourceClientOffset = function() {
                return this.internalMonitor.getInitialSourceClientOffset()
            }
            ,
            t.prototype.getSourceClientOffset = function() {
                return this.internalMonitor.getSourceClientOffset()
            }
            ,
            t.prototype.getClientOffset = function() {
                return this.internalMonitor.getClientOffset()
            }
            ,
            t.prototype.getDifferenceFromInitialOffset = function() {
                return this.internalMonitor.getDifferenceFromInitialOffset()
            }
            ,
            t
        }();
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t) {
            function e() {
                u && (u(),
                u = null ),
                r && o && (u = t.connectDropTarget(r, o, i))
            }
            function n(t) {
                t !== r && (r = t,
                e())
            }
            var r = void 0
              , o = void 0
              , i = void 0
              , u = void 0
              , c = a["default"]({
                dropTarget: function(t, n) {
                    t === o && s["default"](n, i) || (o = t,
                    i = n,
                    e())
                }
            });
            return {
                receiveHandlerId: n,
                hooks: c
            }
        }
        e.__esModule = !0,
        e["default"] = o;
        var i = n(29)
          , a = r(i)
          , u = n(25)
          , s = r(u);
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(t) {
            Object.keys(t).forEach(function(e) {
                u["default"](c.indexOf(e) > -1, 'Expected the drop target specification to only have some of the following keys: %s. Instead received a specification with an unexpected "%s" key. Read more: http://gaearon.github.io/react-dnd/docs-drop-target.html', c.join(", "), e),
                u["default"]("function" == typeof t[e], "Expected %s in the drop target specification to be a function. Instead received a specification with %s: %s. Read more: http://gaearon.github.io/react-dnd/docs-drop-target.html", e, e, t[e])
            });
            var e = function() {
                function e(t) {
                    o(this, e),
                    this.monitor = t,
                    this.props = null ,
                    this.component = null
                }
                return e.prototype.receiveProps = function(t) {
                    this.props = t
                }
                ,
                e.prototype.receiveMonitor = function(t) {
                    this.monitor = t
                }
                ,
                e.prototype.receiveComponent = function(t) {
                    this.component = t
                }
                ,
                e.prototype.canDrop = function() {
                    return t.canDrop ? t.canDrop(this.props, this.monitor) : !0
                }
                ,
                e.prototype.hover = function() {
                    t.hover && t.hover(this.props, this.monitor, this.component)
                }
                ,
                e.prototype.drop = function() {
                    if (t.drop) {
                        var e = t.drop(this.props, this.monitor, this.component);
                        return e
                    }
                }
                ,
                e
            }();
            return function(t) {
                return new e(t)
            }
        }
        e.__esModule = !0,
        e["default"] = i;
        var a = n(1)
          , u = r(a)
          , s = n(2)
          , c = (r(s),
        ["canDrop", "hover", "drop"]);
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(t) {
            return new c(t)
        }
        e.__esModule = !0,
        e["default"] = i;
        var a = n(1)
          , u = r(a)
          , s = !1
          , c = function() {
            function t(e) {
                o(this, t),
                this.internalMonitor = e.getMonitor()
            }
            return t.prototype.receiveHandlerId = function(t) {
                this.targetId = t
            }
            ,
            t.prototype.canDrop = function() {
                u["default"](!s, "You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://gaearon.github.io/react-dnd/docs-drop-target-monitor.html");
                try {
                    return s = !0,
                    this.internalMonitor.canDropOnTarget(this.targetId)
                } finally {
                    s = !1
                }
            }
            ,
            t.prototype.isOver = function(t) {
                return this.internalMonitor.isOverTarget(this.targetId, t)
            }
            ,
            t.prototype.getItemType = function() {
                return this.internalMonitor.getItemType()
            }
            ,
            t.prototype.getItem = function() {
                return this.internalMonitor.getItem()
            }
            ,
            t.prototype.getDropResult = function() {
                return this.internalMonitor.getDropResult()
            }
            ,
            t.prototype.didDrop = function() {
                return this.internalMonitor.didDrop()
            }
            ,
            t.prototype.getInitialClientOffset = function() {
                return this.internalMonitor.getInitialClientOffset()
            }
            ,
            t.prototype.getInitialSourceClientOffset = function() {
                return this.internalMonitor.getInitialSourceClientOffset()
            }
            ,
            t.prototype.getSourceClientOffset = function() {
                return this.internalMonitor.getSourceClientOffset()
            }
            ,
            t.prototype.getClientOffset = function() {
                return this.internalMonitor.getClientOffset()
            }
            ,
            t.prototype.getDifferenceFromInitialOffset = function() {
                return this.internalMonitor.getDifferenceFromInitialOffset()
            }
            ,
            t
        }();
        t.exports = e["default"]
    }
    , function(t, e) {
        "use strict";
        function n(t, e, n) {
            function r() {
                o.removeSource(i)
            }
            var o = n.getRegistry()
              , i = o.addSource(t, e);
            return {
                handlerId: i,
                unregister: r
            }
        }
        e.__esModule = !0,
        e["default"] = n,
        t.exports = e["default"]
    }
    , function(t, e) {
        "use strict";
        function n(t, e, n) {
            function r() {
                o.removeTarget(i)
            }
            var o = n.getRegistry()
              , i = o.addTarget(t, e);
            return {
                handlerId: i,
                unregister: r
            }
        }
        e.__esModule = !0,
        e["default"] = n,
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e) {
            var n = t.ref;
            return a["default"]("string" != typeof n, "Cannot connect React DnD to an element with an existing string ref. Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. Read more: https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute"),
            n ? u.cloneElement(t, {
                ref: function(t) {
                    e(t),
                    n && n(t)
                }
            }) : u.cloneElement(t, {
                ref: e
            })
        }
        e.__esModule = !0,
        e["default"] = o;
        var i = n(1)
          , a = r(i)
          , u = n(6);
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        var r = function(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
          , o = function(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        ;
        e.__esModule = !0;
        var i = n(14)
          , a = r(i)
          , u = function() {
            function t() {
                for (var e = arguments.length, n = Array(e), r = 0; e > r; r++)
                    n[r] = arguments[r];
                o(this, t),
                Array.isArray(n[0]) && 1 === n.length && (n = n[0]);
                for (var i = 0; i < n.length; i++)
                    if (!a["default"](n[i]))
                        throw new Error("Expected a disposable");
                this.disposables = n,
                this.isDisposed = !1
            }
            return t.prototype.add = function(t) {
                this.isDisposed ? t.dispose() : this.disposables.push(t)
            }
            ,
            t.prototype.remove = function(t) {
                if (this.isDisposed)
                    return !1;
                var e = this.disposables.indexOf(t);
                return -1 === e ? !1 : (this.disposables.splice(e, 1),
                t.dispose(),
                !0)
            }
            ,
            t.prototype.dispose = function() {
                if (!this.isDisposed) {
                    for (var t = this.disposables.length, e = new Array(t), n = 0; t > n; n++)
                        e[n] = this.disposables[n];
                    this.isDisposed = !0,
                    this.disposables = [],
                    this.length = 0;
                    for (var n = 0; t > n; n++)
                        e[n].dispose()
                }
            }
            ,
            t
        }();
        e["default"] = u,
        t.exports = e["default"]
    }
    , function(t, e) {
        "use strict";
        var n = function(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
          , r = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n),
                r && t(e, r),
                e
            }
        }();
        e.__esModule = !0;
        var o = function() {}
          , i = function() {
            function t(e) {
                n(this, t),
                this.isDisposed = !1,
                this.action = e || o
            }
            return t.prototype.dispose = function() {
                this.isDisposed || (this.action.call(null ),
                this.isDisposed = !0)
            }
            ,
            r(t, null , [{
                key: "empty",
                enumerable: !0,
                value: {
                    dispose: o
                }
            }]),
            t
        }();
        e["default"] = i,
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        var r = function(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
          , o = function(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        ;
        e.__esModule = !0;
        var i = n(14)
          , a = r(i)
          , u = function() {
            function t() {
                o(this, t),
                this.isDisposed = !1,
                this.current = null
            }
            return t.prototype.getDisposable = function() {
                return this.current
            }
            ,
            t.prototype.setDisposable = function() {
                var t = void 0 === arguments[0] ? null : arguments[0];
                if (null != t && !a["default"](t))
                    throw new Error("Expected either an empty value or a valid disposable");
                var e = this.isDisposed
                  , n = void 0;
                e || (n = this.current,
                this.current = t),
                n && n.dispose(),
                e && t && t.dispose()
            }
            ,
            t.prototype.dispose = function() {
                if (!this.isDisposed) {
                    this.isDisposed = !0;
                    var t = this.current;
                    this.current = null ,
                    t && t.dispose()
                }
            }
            ,
            t
        }();
        e["default"] = u,
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        var r = function(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        ;
        e.__esModule = !0;
        var o = n(14)
          , i = r(o);
        e.isDisposable = i["default"];
        var a = n(56)
          , u = r(a);
        e.Disposable = u["default"];
        var s = n(55)
          , c = r(s);
        e.CompositeDisposable = c["default"];
        var f = n(57)
          , l = r(f);
        e.SerialDisposable = l["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            if (t && t.__esModule)
                return t;
            var e = {};
            if (null != t)
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e["default"] = t,
            e
        }
        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        e.__esModule = !0;
        var a = n(111)
          , u = o(a)
          , s = n(66)
          , c = o(s)
          , f = n(8)
          , l = r(f)
          , d = n(60)
          , p = o(d)
          , h = n(30)
          , g = (o(h),
        function() {
            function t(e) {
                i(this, t);
                var n = u["default"](c["default"]);
                this.store = n,
                this.monitor = new p["default"](n),
                this.registry = this.monitor.registry,
                this.backend = e(this),
                n.subscribe(this.handleRefCountChange.bind(this))
            }
            return t.prototype.handleRefCountChange = function() {
                var t = this.store.getState().refCount > 0;
                t && !this.isSetUp ? (this.backend.setup(),
                this.isSetUp = !0) : !t && this.isSetUp && (this.backend.teardown(),
                this.isSetUp = !1)
            }
            ,
            t.prototype.getMonitor = function() {
                return this.monitor
            }
            ,
            t.prototype.getBackend = function() {
                return this.backend
            }
            ,
            t.prototype.getRegistry = function() {
                return this.registry
            }
            ,
            t.prototype.getActions = function() {
                function t(t) {
                    return function() {
                        var r = t.apply(e, arguments);
                        "undefined" != typeof r && n(r)
                    }
                }
                var e = this
                  , n = this.store.dispatch;
                return Object.keys(l).filter(function(t) {
                    return "function" == typeof l[t]
                }).reduce(function(e, n) {
                    return e[n] = t(l[n]),
                    e
                }, {})
            }
            ,
            t
        }());
        e["default"] = g,
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        e.__esModule = !0;
        var i = n(1)
          , a = r(i)
          , u = n(33)
          , s = r(u)
          , c = n(5)
          , f = r(c)
          , l = n(30)
          , d = r(l)
          , p = n(32)
          , h = n(31)
          , g = function() {
            function t(e) {
                o(this, t),
                this.store = e,
                this.registry = new d["default"](e)
            }
            return t.prototype.subscribeToStateChange = function(t) {
                var e = this
                  , n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]
                  , r = n.handlerIds;
                a["default"]("function" == typeof t, "listener must be a function."),
                a["default"]("undefined" == typeof r || f["default"](r), "handlerIds, when specified, must be an array of strings.");
                var o = this.store.getState().stateId
                  , i = function() {
                    var n = e.store.getState()
                      , i = n.stateId;
                    try {
                        var a = i === o || i === o + 1 && !h.areDirty(n.dirtyHandlerIds, r);
                        a || t()
                    } finally {
                        o = i
                    }
                }
                ;
                return this.store.subscribe(i)
            }
            ,
            t.prototype.subscribeToOffsetChange = function(t) {
                var e = this;
                a["default"]("function" == typeof t, "listener must be a function.");
                var n = this.store.getState().dragOffset
                  , r = function() {
                    var r = e.store.getState().dragOffset;
                    r !== n && (n = r,
                    t())
                }
                ;
                return this.store.subscribe(r)
            }
            ,
            t.prototype.canDragSource = function(t) {
                var e = this.registry.getSource(t);
                return a["default"](e, "Expected to find a valid source."),
                this.isDragging() ? !1 : e.canDrag(this, t)
            }
            ,
            t.prototype.canDropOnTarget = function(t) {
                var e = this.registry.getTarget(t);
                if (a["default"](e, "Expected to find a valid target."),
                !this.isDragging() || this.didDrop())
                    return !1;
                var n = this.registry.getTargetType(t)
                  , r = this.getItemType();
                return s["default"](n, r) && e.canDrop(this, t)
            }
            ,
            t.prototype.isDragging = function() {
                return Boolean(this.getItemType())
            }
            ,
            t.prototype.isDraggingSource = function(t) {
                var e = this.registry.getSource(t, !0);
                if (a["default"](e, "Expected to find a valid source."),
                !this.isDragging() || !this.isSourcePublic())
                    return !1;
                var n = this.registry.getSourceType(t)
                  , r = this.getItemType();
                return n !== r ? !1 : e.isDragging(this, t)
            }
            ,
            t.prototype.isOverTarget = function(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]
                  , n = e.shallow
                  , r = void 0 === n ? !1 : n;
                if (!this.isDragging())
                    return !1;
                var o = this.registry.getTargetType(t)
                  , i = this.getItemType();
                if (!s["default"](o, i))
                    return !1;
                var a = this.getTargetIds();
                if (!a.length)
                    return !1;
                var u = a.indexOf(t);
                return r ? u === a.length - 1 : u > -1
            }
            ,
            t.prototype.getItemType = function() {
                return this.store.getState().dragOperation.itemType
            }
            ,
            t.prototype.getItem = function() {
                return this.store.getState().dragOperation.item
            }
            ,
            t.prototype.getSourceId = function() {
                return this.store.getState().dragOperation.sourceId
            }
            ,
            t.prototype.getTargetIds = function() {
                return this.store.getState().dragOperation.targetIds
            }
            ,
            t.prototype.getDropResult = function() {
                return this.store.getState().dragOperation.dropResult
            }
            ,
            t.prototype.didDrop = function() {
                return this.store.getState().dragOperation.didDrop
            }
            ,
            t.prototype.isSourcePublic = function() {
                return this.store.getState().dragOperation.isSourcePublic
            }
            ,
            t.prototype.getInitialClientOffset = function() {
                return this.store.getState().dragOffset.initialClientOffset
            }
            ,
            t.prototype.getInitialSourceClientOffset = function() {
                return this.store.getState().dragOffset.initialSourceClientOffset
            }
            ,
            t.prototype.getClientOffset = function() {
                return this.store.getState().dragOffset.clientOffset
            }
            ,
            t.prototype.getSourceClientOffset = function() {
                return p.getSourceClientOffset(this.store.getState().dragOffset)
            }
            ,
            t.prototype.getDifferenceFromInitialOffset = function() {
                return p.getDifferenceFromInitialOffset(this.store.getState().dragOffset)
            }
            ,
            t
        }();
        e["default"] = g,
        t.exports = e["default"]
    }
    , function(t, e) {
        "use strict";
        function n(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        e.__esModule = !0;
        var r = function() {
            function t() {
                n(this, t)
            }
            return t.prototype.canDrag = function() {
                return !0
            }
            ,
            t.prototype.isDragging = function(t, e) {
                return e === t.getSourceId()
            }
            ,
            t.prototype.endDrag = function() {}
            ,
            t
        }();
        e["default"] = r,
        t.exports = e["default"]
    }
    , function(t, e) {
        "use strict";
        function n(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        e.__esModule = !0;
        var r = function() {
            function t() {
                n(this, t)
            }
            return t.prototype.canDrop = function() {
                return !0
            }
            ,
            t.prototype.hover = function() {}
            ,
            t.prototype.drop = function() {}
            ,
            t
        }();
        e["default"] = r,
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(t) {
            return new s(t)
        }
        e.__esModule = !0,
        e["default"] = i;
        var a = n(39)
          , u = r(a)
          , s = function() {
            function t(e) {
                o(this, t),
                this.actions = e.getActions()
            }
            return t.prototype.setup = function() {
                this.didCallSetup = !0
            }
            ,
            t.prototype.teardown = function() {
                this.didCallTeardown = !0
            }
            ,
            t.prototype.connectDragSource = function() {
                return u["default"]
            }
            ,
            t.prototype.connectDragPreview = function() {
                return u["default"]
            }
            ,
            t.prototype.connectDropTarget = function() {
                return u["default"]
            }
            ,
            t.prototype.simulateBeginDrag = function(t, e) {
                this.actions.beginDrag(t, e)
            }
            ,
            t.prototype.simulatePublishDragSource = function() {
                this.actions.publishDragSource()
            }
            ,
            t.prototype.simulateHover = function(t, e) {
                this.actions.hover(t, e)
            }
            ,
            t.prototype.simulateDrop = function() {
                this.actions.drop()
            }
            ,
            t.prototype.simulateEndDrag = function() {
                this.actions.endDrag()
            }
            ,
            t
        }();
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t["default"] : t
        }
        e.__esModule = !0;
        var o = n(59);
        e.DragDropManager = r(o);
        var i = n(61);
        e.DragSource = r(i);
        var a = n(62);
        e.DropTarget = r(a);
        var u = n(63);
        e.createTestBackend = r(u)
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e) {
            switch (void 0 === t && (t = f),
            e.type) {
            case a.BEGIN_DRAG:
                return i({}, t, {
                    itemType: e.itemType,
                    item: e.item,
                    sourceId: e.sourceId,
                    isSourcePublic: e.isSourcePublic,
                    dropResult: null ,
                    didDrop: !1
                });
            case a.PUBLISH_DRAG_SOURCE:
                return i({}, t, {
                    isSourcePublic: !0
                });
            case a.HOVER:
                return i({}, t, {
                    targetIds: e.targetIds
                });
            case a.PUBLISH_DRAG_SOURCE:
                return i({}, t, {
                    isSourcePublic: !0
                });
            case u.REMOVE_TARGET:
                return -1 === t.targetIds.indexOf(e.targetId) ? t : i({}, t, {
                    targetIds: c["default"](t.targetIds, e.targetId)
                });
            case a.DROP:
                return i({}, t, {
                    dropResult: e.dropResult,
                    didDrop: !0,
                    targetIds: []
                });
            case a.END_DRAG:
                return i({}, t, {
                    itemType: null ,
                    item: null ,
                    sourceId: null ,
                    dropResult: null ,
                    didDrop: !1,
                    isSourcePublic: null ,
                    targetIds: []
                });
            default:
                return t
            }
        }
        e.__esModule = !0;
        var i = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
            }
            return t
        }
        ;
        e["default"] = o;
        var a = n(8)
          , u = n(9)
          , s = n(109)
          , c = r(s)
          , f = {
            itemType: null ,
            item: null ,
            sourceId: null ,
            targetIds: [],
            dropResult: null ,
            didDrop: !1,
            isSourcePublic: null
        };
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        e.__esModule = !0;
        var o = n(32)
          , i = r(o)
          , a = n(65)
          , u = r(a)
          , s = n(67)
          , c = r(s)
          , f = n(31)
          , l = r(f)
          , d = n(68)
          , p = r(d);
        e["default"] = function(t, e) {
            return void 0 === t && (t = {}),
            {
                dirtyHandlerIds: l["default"](t.dirtyHandlerIds, e, t.dragOperation),
                dragOffset: i["default"](t.dragOffset, e),
                refCount: c["default"](t.refCount, e),
                dragOperation: u["default"](t.dragOperation, e),
                stateId: p["default"](t.stateId)
            }
        }
        ,
        t.exports = e["default"]
    }
    , function(t, e, n) {
        "use strict";
        function r(t, e) {
            switch (void 0 === t && (t = 0),
            e.type) {
            case o.ADD_SOURCE:
            case o.ADD_TARGET:
                return t + 1;
            case o.REMOVE_SOURCE:
            case o.REMOVE_TARGET:
                return t - 1;
            default:
                return t
            }
        }
        e.__esModule = !0,
        e["default"] = r;
        var o = n(9);
        t.exports = e["default"]
    }
    , function(t, e) {
        "use strict";
        function n() {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
            return t + 1
        }
        e.__esModule = !0,
        e["default"] = n,
        t.exports = e["default"]
    }
    , function(t, e) {
        "use strict";
        function n() {
            return r++
        }
        e.__esModule = !0,
        e["default"] = n;
        var r = 0;
        t.exports = e["default"]
    }
    , function(t, e, n) {
        function r() {}
        var o = n(11)
          , i = Object.prototype;
        r.prototype = o ? o(null ) : i,
        t.exports = r
    }
    , function(t, e, n) {
        function r(t) {
            var e = -1
              , n = t ? t.length : 0;
            for (this.clear(); ++e < n; ) {
                var r = t[e];
                this.set(r[0], r[1])
            }
        }
        var o = n(95)
          , i = n(96)
          , a = n(97)
          , u = n(98)
          , s = n(99);
        r.prototype.clear = o,
        r.prototype["delete"] = i,
        r.prototype.get = a,
        r.prototype.has = u,
        r.prototype.set = s,
        t.exports = r
    }
    , function(t, e, n) {
        var r = n(20)
          , o = n(38)
          , i = r(o, "Set");
        t.exports = i
    }
    , function(t, e) {
        function n(t, e, n) {
            var r = n.length;
            switch (r) {
            case 0:
                return t.call(e);
            case 1:
                return t.call(e, n[0]);
            case 2:
                return t.call(e, n[0], n[1]);
            case 3:
                return t.call(e, n[0], n[1], n[2])
            }
            return t.apply(e, n)
        }
        t.exports = n
    }
    , function(t, e) {
        function n(t, e) {
            for (var n = -1, r = t.length, o = 0, i = []; ++n < r; ) {
                var a = t[n];
                e(a, n, t) && (i[o++] = a)
            }
            return i
        }
        t.exports = n
    }
    , function(t, e) {
        function n(t, e) {
            for (var n = -1, r = e.length, o = t.length; ++n < r; )
                t[o + n] = e[n];
            return t
        }
        t.exports = n
    }
    , function(t, e, n) {
        function r(t, e) {
            var n = o(t, e);
            if (0 > n)
                return !1;
            var r = t.length - 1;
            return n == r ? t.pop() : a.call(t, n, 1),
            !0
        }
        var o = n(10)
          , i = Array.prototype
          , a = i.splice;
        t.exports = r
    }
    , function(t, e, n) {
        function r(t, e) {
            var n = o(t, e);
            return 0 > n ? void 0 : t[n][1]
        }
        var o = n(10);
        t.exports = r
    }
    , function(t, e, n) {
        function r(t, e) {
            return o(t, e) > -1
        }
        var o = n(10);
        t.exports = r
    }
    , function(t, e, n) {
        function r(t, e, n) {
            var r = o(t, e);
            0 > r ? t.push([e, n]) : t[r][1] = n
        }
        var o = n(10);
        t.exports = r
    }
    , function(t, e, n) {
        function r(t) {
            return o(t) ? t : []
        }
        var o = n(21);
        t.exports = r
    }
    , function(t, e, n) {
        function r(t, e, n) {
            if (e !== e)
                return o(t, n);
            for (var r = n - 1, i = t.length; ++r < i; )
                if (t[r] === e)
                    return r;
            return -1
        }
        var o = n(94);
        t.exports = r
    }
    , function(t, e, n) {
        function r(t, e, n) {
            for (var r = n ? a : i, l = t[0].length, d = t.length, p = d, h = Array(d), g = 1 / 0, y = []; p--; ) {
                var v = t[p];
                p && e && (v = u(v, s(e))),
                g = f(v.length, g),
                h[p] = !n && (e || l >= 120 && v.length >= 120) ? new o(p && v) : void 0
            }
            v = t[0];
            var m = -1
              , b = h[0];
            t: for (; ++m < l && y.length < g; ) {
                var _ = v[m]
                  , D = e ? e(_) : _;
                if (!(b ? c(b, D) : r(y, D, n))) {
                    for (p = d; --p; ) {
                        var x = h[p];
                        if (!(x ? c(x, D) : r(t[p], D, n)))
                            continue t
                    }
                    b && b.push(D),
                    y.push(_)
                }
            }
            return y
        }
        var o = n(15)
          , i = n(16)
          , a = n(17)
          , u = n(18)
          , s = n(35)
          , c = n(19)
          , f = Math.min;
        t.exports = r
    }
    , function(t, e) {
        function n(t) {
            return function(e) {
                return null == e ? void 0 : e[t]
            }
        }
        t.exports = n
    }
    , function(t, e, n) {
        function r(t, e, n) {
            var r = -1
              , l = i
              , d = t.length
              , p = !0
              , h = []
              , g = h;
            if (n)
                p = !1,
                l = a;
            else if (d >= f) {
                var y = e ? null : s(t);
                if (y)
                    return c(y);
                p = !1,
                l = u,
                g = new o
            } else
                g = e ? [] : h;
            t: for (; ++r < d; ) {
                var v = t[r]
                  , m = e ? e(v) : v;
                if (p && m === m) {
                    for (var b = g.length; b--; )
                        if (g[b] === m)
                            continue t;
                    e && g.push(m),
                    h.push(v)
                } else
                    l(g, m, n) || (g !== h && g.push(m),
                    h.push(v))
            }
            return h
        }
        var o = n(15)
          , i = n(16)
          , a = n(17)
          , u = n(19)
          , s = n(88)
          , c = n(100)
          , f = 200;
        t.exports = r
    }
    , function(t, e, n) {
        function r(t, e, n) {
            for (var r = -1, u = t.length; ++r < u; )
                var s = s ? o(i(s, t[r], e, n), i(t[r], s, e, n)) : t[r];
            return s && s.length ? a(s, e, n) : []
        }
        var o = n(75)
          , i = n(34)
          , a = n(84);
        t.exports = r
    }
    , function(t, e, n) {
        function r(t) {
            var e = this.__data__;
            if (o(t)) {
                var n = e.__data__
                  , r = "string" == typeof t ? n.string : n.hash;
                r[t] = i
            } else
                e.set(t, i)
        }
        var o = n(3)
          , i = "__lodash_hash_undefined__";
        t.exports = r
    }
    , function(t, e) {
        function n(t) {
            return t && t.Object === Object ? t : null
        }
        t.exports = n
    }
    , function(t, e, n) {
        var r = n(72)
          , o = n(39)
          , i = r && 2 === new r([1, 2]).size ? function(t) {
            return new r(t)
        }
        : o;
        t.exports = i
    }
    , function(t, e, n) {
        var r = n(83)
          , o = r("length");
        t.exports = o
    }
    , function(t, e) {
        function n(t) {
            return r(Object(t))
        }
        var r = Object.getPrototypeOf;
        t.exports = n
    }
    , function(t, e, n) {
        function r(t, e) {
            return o(t, e) && delete t[e]
        }
        var o = n(36);
        t.exports = r
    }
    , function(t, e, n) {
        function r(t, e) {
            if (o) {
                var n = t[e];
                return n === i ? void 0 : n
            }
            return u.call(t, e) ? t[e] : void 0
        }
        var o = n(11)
          , i = "__lodash_hash_undefined__"
          , a = Object.prototype
          , u = a.hasOwnProperty;
        t.exports = r
    }
    , function(t, e, n) {
        function r(t, e, n) {
            t[e] = o && void 0 === n ? i : n
        }
        var o = n(11)
          , i = "__lodash_hash_undefined__";
        t.exports = r
    }
    , function(t, e) {
        function n(t, e, n) {
            for (var r = t.length, o = e + (n ? 0 : -1); n ? o-- : ++o < r; ) {
                var i = t[o];
                if (i !== i)
                    return o
            }
            return -1
        }
        t.exports = n
    }
    , function(t, e, n) {
        function r() {
            this.__data__ = {
                hash: new o,
                map: i ? new i : [],
                string: new o
            }
        }
        var o = n(70)
          , i = n(4);
        t.exports = r
    }
    , function(t, e, n) {
        function r(t) {
            var e = this.__data__;
            return u(t) ? a("string" == typeof t ? e.string : e.hash, t) : o ? e.map["delete"](t) : i(e.map, t)
        }
        var o = n(4)
          , i = n(76)
          , a = n(91)
          , u = n(3);
        t.exports = r
    }
    , function(t, e, n) {
        function r(t) {
            var e = this.__data__;
            return u(t) ? a("string" == typeof t ? e.string : e.hash, t) : o ? e.map.get(t) : i(e.map, t)
        }
        var o = n(4)
          , i = n(77)
          , a = n(92)
          , u = n(3);
        t.exports = r
    }
    , function(t, e, n) {
        function r(t) {
            var e = this.__data__;
            return u(t) ? a("string" == typeof t ? e.string : e.hash, t) : o ? e.map.has(t) : i(e.map, t)
        }
        var o = n(4)
          , i = n(78)
          , a = n(36)
          , u = n(3);
        t.exports = r
    }
    , function(t, e, n) {
        function r(t, e) {
            var n = this.__data__;
            return u(t) ? a("string" == typeof t ? n.string : n.hash, t, e) : o ? n.map.set(t, e) : i(n.map, t, e),
            this
        }
        var o = n(4)
          , i = n(79)
          , a = n(93)
          , u = n(3);
        t.exports = r
    }
    , function(t, e) {
        function n(t) {
            var e = -1
              , n = Array(t.size);
            return t.forEach(function(t) {
                n[++e] = t
            }),
            n
        }
        t.exports = n
    }
    , function(t, e) {
        function n(t, e) {
            return t === e || t !== t && e !== e
        }
        t.exports = n
    }
    , function(t, e, n) {
        var r = n(18)
          , o = n(80)
          , i = n(82)
          , a = n(24)
          , u = a(function(t) {
            var e = r(t, o);
            return e.length && e[0] === t[0] ? i(e) : []
        });
        t.exports = u
    }
    , function(t, e, n) {
        function r(t) {
            return null != t && a(o(t)) && !i(t)
        }
        var o = n(89)
          , i = n(22)
          , a = n(104);
        t.exports = r
    }
    , function(t, e) {
        function n(t) {
            return "number" == typeof t && t > -1 && t % 1 == 0 && r >= t
        }
        var r = 9007199254740991;
        t.exports = n
    }
    , function(t, e, n) {
        function r(t) {
            return null == t ? !1 : o(t) ? d.test(f.call(t)) : a(t) && (i(t) ? d : s).test(t)
        }
        var o = n(22)
          , i = n(37)
          , a = n(12)
          , u = /[\\^$.*+?()[\]{}|]/g
          , s = /^\[object .+?Constructor\]$/
          , c = Object.prototype
          , f = Function.prototype.toString
          , l = c.hasOwnProperty
          , d = RegExp("^" + f.call(l).replace(u, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        t.exports = r
    }
    , function(t, e, n) {
        function r(t) {
            return "symbol" == typeof t || o(t) && u.call(t) == i
        }
        var o = n(12)
          , i = "[object Symbol]"
          , a = Object.prototype
          , u = a.toString;
        t.exports = r
    }
    , function(t, e, n) {
        function r(t) {
            if (!t)
                return 0 === t ? t : 0;
            if (t = o(t),
            t === i || t === -i) {
                var e = 0 > t ? -1 : 1;
                return e * a
            }
            var n = t % 1;
            return t === t ? n ? t - n : t : 0
        }
        var o = n(108)
          , i = 1 / 0
          , a = 1.7976931348623157e308;
        t.exports = r
    }
    , function(t, e, n) {
        function r(t) {
            if ("number" == typeof t)
                return t;
            if (a(t))
                return u;
            if (i(t)) {
                var e = o(t.valueOf) ? t.valueOf() : t;
                t = i(e) ? e + "" : e
            }
            if ("string" != typeof t)
                return 0 === t ? t : +t;
            t = t.replace(s, "");
            var n = f.test(t);
            return n || l.test(t) ? d(t.slice(2), n ? 2 : 8) : c.test(t) ? u : +t
        }
        var o = n(22)
          , i = n(23)
          , a = n(106)
          , u = NaN
          , s = /^\s+|\s+$/g
          , c = /^[-+]0x[0-9a-f]+$/i
          , f = /^0b[01]+$/i
          , l = /^0o[0-7]+$/i
          , d = parseInt;
        t.exports = r
    }
    , function(t, e, n) {
        var r = n(34)
          , o = n(21)
          , i = n(24)
          , a = i(function(t, e) {
            return o(t) ? r(t, e) : []
        });
        t.exports = a
    }
    , function(t, e, n) {
        var r = n(74)
          , o = n(85)
          , i = n(21)
          , a = n(24)
          , u = a(function(t) {
            return o(r(t, i))
        });
        t.exports = u
    }
    , function(t, e, n) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function o(t, e, n) {
            function r() {
                h === p && (h = p.slice())
            }
            function i() {
                return d
            }
            function s(t) {
                if ("function" != typeof t)
                    throw new Error("Expected listener to be a function.");
                var e = !0;
                return r(),
                h.push(t),
                function() {
                    if (e) {
                        e = !1,
                        r();
                        var n = h.indexOf(t);
                        h.splice(n, 1)
                    }
                }
            }
            function c(t) {
                if (!(0,
                a["default"])(t))
                    throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
                if ("undefined" == typeof t.type)
                    throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
                if (g)
                    throw new Error("Reducers may not dispatch actions.");
                try {
                    g = !0,
                    d = l(d, t)
                } finally {
                    g = !1
                }
                for (var e = p = h, n = 0; n < e.length; n++)
                    e[n]();
                return t
            }
            function f(t) {
                if ("function" != typeof t)
                    throw new Error("Expected the nextReducer to be a function.");
                l = t,
                c({
                    type: u.INIT
                })
            }
            if ("function" == typeof e && "undefined" == typeof n && (n = e,
            e = void 0),
            "undefined" != typeof n) {
                if ("function" != typeof n)
                    throw new Error("Expected the enhancer to be a function.");
                return n(o)(t, e)
            }
            if ("function" != typeof t)
                throw new Error("Expected the reducer to be a function.");
            var l = t
              , d = e
              , p = []
              , h = p
              , g = !1;
            return c({
                type: u.INIT
            }),
            {
                dispatch: c,
                subscribe: s,
                getState: i,
                replaceReducer: f
            }
        }
        e.__esModule = !0,
        e.ActionTypes = void 0,
        e["default"] = o;
        var i = n(2)
          , a = r(i)
          , u = e.ActionTypes = {
            INIT: "@@redux/INIT"
        }
    }
    , function(t, e) {
        t.exports = function(t) {
            return t.webpackPolyfill || (t.deprecate = function() {}
            ,
            t.paths = [],
            t.children = [],
            t.webpackPolyfill = 1),
            t
        }
    }
    ])
});
