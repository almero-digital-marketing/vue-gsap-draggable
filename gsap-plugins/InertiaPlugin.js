! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function(e) {
    "use strict";

    function m() {
        return n || "undefined" != typeof window && (n = window.gsap)
    }

    function p(t) {
        return s(t).id
    }

    function q(t) {
        return f[p("string" == typeof t ? g(t)[0] : t)]
    }

    function r(t) {
        var e, n = a;
        if (.05 <= t - i)
            for (i = t; n;)((e = n.g(n.t, n.p)) !== n.v1 || .2 < t - n.t1) && (n.v2 = n.v1, n.v1 = e, n.t2 = n.t1, n.t1 = t), n = n._next
    }

    function t() {
        (n = m()) && (g = n.utils.toArray, o = n.utils.getUnit, s = n.core.getCache, c = n.ticker, l = 1)
    }

    function u(t, e, n, i) {
        this.t = t, this.p = e, this.g = t._gsap.get, this.rCap = d[n || o(this.g(t, e))], this.v1 = this.v2 = 0, this.t1 = this.t2 = c.time, i && ((this._next = i)._prev = this)
    }
    var n, l, g, o, a, c, i, s, f = {},
        d = {
            deg: 360,
            rad: 2 * Math.PI
        },
        h = function() {
            function VelocityTracker(e, n) {
                l || t(), this.target = g(e)[0], (f[p(this.target)] = this)._props = {}, n && this.add(n)
            }
            VelocityTracker.register = function register(e) {
                n = e, t()
            };
            var e = VelocityTracker.prototype;
            return e.get = function get(t, e) {
                var n, i, r = this._props[t] || console.warn("Not tracking " + t + " velocity.");
                return n = parseFloat(e ? r.v1 : r.g(r.t, r.p)) - parseFloat(r.v2), (i = r.rCap) && (n %= i) !== n % (i / 2) && (n = n < 0 ? n + i : n - i),
                    function _round(t) {
                        return Math.round(1e4 * t) / 1e4
                    }(n / ((e ? r.t1 : c.time) - r.t2))
            }, e.getAll = function getAll() {
                var t, e = {},
                    n = this._props;
                for (t in n) e[t] = this.get(t);
                return e
            }, e.isTracking = function isTracking(t) {
                return t in this._props
            }, e.add = function add(t, e) {
                t in this._props || (a || (c.add(r), i = c.time), a = this._props[t] = new u(this.target, t, e, a))
            }, e.remove = function remove(t) {
                var e, n, i = this._props[t];
                i && (e = i._prev, n = i._next, e && (e._next = n), n ? n._prev = e : a === i && (c.remove(r), a = 0), delete this._props[t])
            }, e.kill = function kill(t) {
                for (var e in this._props) this.remove(e);
                t || delete f[p(this.target)]
            }, VelocityTracker.track = function track(e, n, i) {
                l || t();
                for (var r, o, a = [], c = g(e), s = n.split(","), u = (i || "").split(","), f = c.length; f--;) {
                    for (r = q(c[f]) || new VelocityTracker(c[f]), o = s.length; o--;) r.add(s[o], u[o] || u[0]);
                    a.push(r)
                }
                return a
            }, VelocityTracker.untrack = function untrack(t, e) {
                var n = (e || "").split(",");
                g(t).forEach(function(t) {
                    var e = q(t);
                    e && (n.length ? n.forEach(function(t) {
                        return e.remove(t)
                    }) : e.kill(1))
                })
            }, VelocityTracker.isTracking = function isTracking(t, e) {
                var n = q(t);
                return n && n.isTracking(e)
            }, VelocityTracker.getVelocity = function getVelocity(t, e) {
                var n = q(t);
                return n && n.isTracking(e) ? n.get(e) : console.warn("Not tracking velocity of " + e)
            }, VelocityTracker
        }();
    h.getByTarget = q, m() && n.registerPlugin(h);

    function J() {
        return v || "undefined" != typeof window && (v = window.gsap) && v.registerPlugin && v
    }

    function L(t) {
        return "number" == typeof t
    }

    function M(t) {
        return "object" == typeof t
    }

    function N(t) {
        return "function" == typeof t
    }

    function Q() {
        return String.fromCharCode.apply(null, arguments)
    }

    function U(t) {
        return t
    }

    function Y(t) {
        return Math.round(1e4 * t) / 1e4
    }

    function Z(t, e, n) {
        for (var i in e) i in t || i === n || (t[i] = e[i]);
        return t
    }

    function $(t) {
        var e, n, i = {};
        for (e in t) i[e] = M(n = t[e]) && !B(n) ? $(n) : n;
        return i
    }

    function _(t, e, n, i, r) {
        var o, a, c, s, u = e.length,
            f = 0,
            l = R;
        if (M(t)) {
            for (; u--;) {
                for (c in o = e[u], a = 0, t) a += (s = o[c] - t[c]) * s;
                a < l && (f = u, l = a)
            }
            if ((r || R) < R && r < Math.sqrt(l)) return t
        } else
            for (; u--;)(a = (o = e[u]) - t) < 0 && (a = -a), a < l && i <= o && o <= n && (f = u, l = a);
        return e[f]
    }

    function aa(t, e, n, i, r, o, a) {
        if ("auto" === t.end) return t;
        var c, s, u = t.end;
        if (n = isNaN(n) ? R : n, i = isNaN(i) ? -R : i, M(e)) {
            if (c = e.calculated ? e : (N(u) ? u(e, a) : _(e, u, n, i, o)) || e, !e.calculated) {
                for (s in c) e[s] = c[s];
                e.calculated = !0
            }
            c = c[r]
        } else c = N(u) ? u(e, a) : B(u) ? _(e, u, n, i, o) : parseFloat(u);
        return n < c ? c = n : c < i && (c = i), {
            max: c,
            min: c,
            unitFactor: t.unitFactor
        }
    }

    function ba(t, e, n) {
        return isNaN(t[e]) ? n : +t[e]
    }

    function ca(t, e) {
        return .05 * e * t / k
    }

    function da(t, e, n) {
        return Math.abs((e - t) * k / n / .05)
    }

    function fa(t, e, n, i) {
        if (e.linkedProps) {
            var r, o, a, c, s, u, f = e.linkedProps.split(","),
                l = {};
            for (r = 0; r < f.length; r++)(a = e[o = f[r]]) && (c = L(a.velocity) ? a.velocity : (s = s || C(t)) && s.isTracking(o) ? s.get(o) : 0, u = Math.abs(c / ba(a, "resistance", i)), l[o] = parseFloat(n(t, o)) + ca(c, u));
            return l
        }
    }

    function ha() {
        (v = J()) && (y = v.parseEase, x = v.utils.toArray, P = v.utils.getUnit, V = v.core.getCache, O = v.utils.clamp, w = y("power3"), k = w(.05), F = v.core.PropTween, v.config({
            resistance: 100,
            unitFactors: {
                time: 1e3,
                totalTime: 1e3,
                progress: 1e3,
                totalProgress: 1e3
            }
        }), b = v.config(), v.registerPlugin(h), T = 1)
    }
    var v, T, y, x, w, b, P, F, V, k, O, A, C = h.getByTarget,
        E = "InertiaPlugin",
        j = Q(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
        I = true,
        B = Array.isArray,
        R = 1e10,
        W = {
            resistance: 1,
            checkpoint: 1,
            preventOvershoot: 1,
            linkedProps: 1,
            radius: 1,
            duration: 1
        },
        S = {
            version: "3.8.0",
            name: "inertia",
            register: function register(t) {
                v = t, ha()
            },
            init: function init(t, e, n, i, r) {
                T || ha();
                var o = C(t);
                if ("auto" === e) {
                    if (!o) return void console.warn("No inertia tracking on " + t + ". InertiaPlugin.track(target) first.");
                    e = o.getAll()
                }
                this.target = t, this.tween = n, A = e;
                var a, c, s, u, f, l, p, g, d, h = t._gsap,
                    v = h.get,
                    m = e.duration,
                    y = M(m),
                    w = e.preventOvershoot || y && 0 === m.overshoot,
                    Q = ba(e, "resistance", b.resistance),
                    k = L(m) ? m : function _calculateTweenDuration(t, e, n, i, r, o) {
                        if (void 0 === n && (n = 10), void 0 === i && (i = .2), void 0 === r && (r = 1), void 0 === o && (o = 0), function _isString(t) {
                                return "string" == typeof t
                            }(t) && (t = x(t)[0]), !t) return 0;
                        var a, c, s, u, f, l, p, g, d, h, v = 0,
                            m = R,
                            y = e.inertia || e,
                            w = V(t).get,
                            Q = ba(y, "resistance", b.resistance);
                        for (a in h = fa(t, y, w, Q), y) W[a] || (c = y[a], M(c) || ((g = g || C(t)) && g.isTracking(a) ? c = L(c) ? {
                            velocity: c
                        } : {
                            velocity: g.get(a)
                        } : (u = +c || 0, s = Math.abs(u / Q))), M(c) && (u = L(c.velocity) ? c.velocity : (g = g || C(t)) && g.isTracking(a) ? g.get(a) : 0, s = O(i, n, Math.abs(u / ba(c, "resistance", Q))), l = (f = parseFloat(w(t, a)) || 0) + ca(u, s), "end" in c && (c = aa(c, h && a in h ? h : l, c.max, c.min, a, y.radius, u), o && (A === e && (A = y = $(e)), y[a] = Z(c, y[a], "end"))), "max" in c && l > +c.max + 1e-10 ? (d = c.unitFactor || b.unitFactors[a] || 1, (p = f > c.max && c.min !== c.max || -15 < u * d && u * d < 45 ? i + .1 * (n - i) : da(f, c.max, u)) + r < m && (m = p + r)) : "min" in c && l < c.min - 1e-10 && (d = c.unitFactor || b.unitFactors[a] || 1, (p = f < c.min && c.min !== c.max || -45 < u * d && u * d < 15 ? i + .1 * (n - i) : da(f, c.min, u)) + r < m && (m = p + r)), v < p && (v = p)), v < s && (v = s));
                        return m < v && (v = m), n < v ? n : v < i ? i : v
                    }(t, e, y && m.max || 10, y && m.min || .2, y && "overshoot" in m ? +m.overshoot : w ? 0 : 1, !0);
                for (a in e = A, A = 0, d = fa(t, e, v, Q), e) W[a] || (c = e[a], N(c) && (c = c(i, t, r)), L(c) ? f = c : M(c) && !isNaN(c.velocity) ? f = +c.velocity : o && o.isTracking(a) ? f = o.get(a) : console.warn("ERROR: No velocity was defined for " + t + " property: " + a), l = ca(f, k), g = 0, s = v(t, a), u = P(s), s = parseFloat(s), M(c) && (p = s + l, "end" in c && (c = aa(c, d && a in d ? d : p, c.max, c.min, a, e.radius, f)), "max" in c && +c.max < p ? w || c.preventOvershoot ? l = c.max - s : g = c.max - s - l : "min" in c && +c.min > p && (w || c.preventOvershoot ? l = c.min - s : g = c.min - s - l)), this._props.push(a), this._pt = new F(this._pt, t, a, s, 0, U, 0, h.set(t, a, this)), this._pt.u = u || 0, this._pt.c1 = l, this._pt.c2 = g);
                return n.duration(k), I
            },
            render: function render(t, e) {
                var n = e._pt;
                for (t = w(e.tween._time / e.tween._dur); n;) n.set(n.t, n.p, Y(n.s + n.c1 * t + n.c2 * t * t) + n.u, n.d, t), n = n._next
            }
        };
    "track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function(t) {
        return S[t] = h[t]
    }), J() && v.registerPlugin(S), e.InertiaPlugin = S, e.VelocityTracker = h, e.default = S;
    if (typeof(window) === "undefined" || window !== e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    } else {
        delete e.default
    }
});