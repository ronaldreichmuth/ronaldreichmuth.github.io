! function(t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return e(t, a)
    }) : "object" == typeof exports ? e(t, require("jquery")) : e(t, t.jQuery || t.Zepto)
}(this, function(t, e) {
    "use strict";

    function a(t) {
        if (E && "none" === t.css("animation-name") && "none" === t.css("-webkit-animation-name") && "none" === t.css("-moz-animation-name") && "none" === t.css("-o-animation-name") && "none" === t.css("-ms-animation-name")) return 0;
        var e, a, n, o, i = t.css("animation-duration") || t.css("-webkit-animation-duration") || t.css("-moz-animation-duration") || t.css("-o-animation-duration") || t.css("-ms-animation-duration") || "0s",
            s = t.css("animation-delay") || t.css("-webkit-animation-delay") || t.css("-moz-animation-delay") || t.css("-o-animation-delay") || t.css("-ms-animation-delay") || "0s",
            r = t.css("animation-iteration-count") || t.css("-webkit-animation-iteration-count") || t.css("-moz-animation-iteration-count") || t.css("-o-animation-iteration-count") || t.css("-ms-animation-iteration-count") || "1";
        for (i = i.split(", "), s = s.split(", "), r = r.split(", "), o = 0, a = i.length, e = Number.NEGATIVE_INFINITY; a > o; o++) n = parseFloat(i[o]) * parseInt(r[o], 10) + parseFloat(s[o]), n > e && (e = n);
        return n
    }

    function n() {
        if (e(document.body).height() <= e(window).height()) return 0;
        var t, a, n = document.createElement("div"),
            o = document.createElement("div");
        return n.style.visibility = "hidden", n.style.width = "100px", document.body.appendChild(n), t = n.offsetWidth, n.style.overflow = "scroll", o.style.width = "100%", n.appendChild(o), a = o.offsetWidth, n.parentNode.removeChild(n), t - a
    }

    function o() {
        if (!N) {
            var t, a, o = e("html"),
                i = l("is-locked");
            o.hasClass(i) || (a = e(document.body), t = parseInt(a.css("padding-right"), 10) + n(), a.css("padding-right", t + "px"), o.addClass(i))
        }
    }

    function i() {
        if (!N) {
            var t, a, o = e("html"),
                i = l("is-locked");
            o.hasClass(i) && (a = e(document.body), t = parseInt(a.css("padding-right"), 10) - n(), a.css("padding-right", t + "px"), o.removeClass(i))
        }
    }

    function s(t, e, a, n) {
        var o = l("is", e),
            i = [l("is", O.CLOSING), l("is", O.OPENING), l("is", O.CLOSED), l("is", O.OPENED)].join(" ");
        t.$bg.removeClass(i).addClass(o), t.$overlay.removeClass(i).addClass(o), t.$wrapper.removeClass(i).addClass(o), t.$modal.removeClass(i).addClass(o), t.state = e, !a && t.$modal.trigger({
            type: e,
            reason: n
        }, [{
            reason: n
        }])
    }

    function r(t, n, o) {
        var i = 0,
            s = function(t) {
                t.target === this && i++
            },
            r = function(t) {
                t.target === this && 0 === --i && (e.each(["$bg", "$overlay", "$wrapper", "$modal"], function(t, e) {
                    o[e].off(v + " " + $)
                }), n())
            };
        e.each(["$bg", "$overlay", "$wrapper", "$modal"], function(t, e) {
            o[e].on(v, s).on($, r)
        }), t(), 0 === a(o.$bg) && 0 === a(o.$overlay) && 0 === a(o.$wrapper) && 0 === a(o.$modal) && (e.each(["$bg", "$overlay", "$wrapper", "$modal"], function(t, e) {
            o[e].off(v + " " + $)
        }), n())
    }

    function d(t) {
        t.state !== O.CLOSED && (e.each(["$bg", "$overlay", "$wrapper", "$modal"], function(e, a) {
            t[a].off(v + " " + $)
        }), t.$bg.removeClass(t.settings.modifier), t.$overlay.removeClass(t.settings.modifier).hide(), t.$wrapper.hide(), i(), s(t, O.CLOSED, !0))
    }

    function c(t) {
        var e, a, n, o, i = {};
        for (t = t.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ","), e = t.split(","), o = 0, a = e.length; a > o; o++) e[o] = e[o].split(":"), n = e[o][1], ("string" == typeof n || n instanceof String) && (n = "true" === n || ("false" === n ? !1 : n)), ("string" == typeof n || n instanceof String) && (n = isNaN(n) ? n : +n), i[e[o][0]] = n;
        return i
    }

    function l() {
        for (var t = g, e = 0; e < arguments.length; ++e) t += "-" + arguments[e];
        return t
    }

    function m() {
        var t, a, n = location.hash.replace("#", "");
        if (n) {
            try {
                a = e('[data-remodal-id="' + n + '"]')
            } catch (o) {}
            a && a.length && (t = e[h].lookup[a.data(h)], t && t.settings.hashTracking && t.open())
        } else u && u.state === O.OPENED && u.settings.hashTracking && u.close()
    }

    function p(t, a) {
        var n = e(document.body),
            o = this;
        o.settings = e.extend({}, C, a), o.index = e[h].lookup.push(o) - 1, o.state = O.CLOSED, o.$overlay = e("." + l("overlay")), o.$overlay.length || (o.$overlay = e("<div>").addClass(l("overlay") + " " + l("is", O.CLOSED)).hide(), n.append(o.$overlay)), o.$bg = e("." + l("bg")).addClass(l("is", O.CLOSED)), o.$modal = t.addClass(g + " " + l("is-initialized") + " " + o.settings.modifier + " " + l("is", O.CLOSED)).attr("tabindex", "-1"), o.$wrapper = e("<div>").addClass(l("wrapper") + " " + o.settings.modifier + " " + l("is", O.CLOSED)).hide().append(o.$modal), n.append(o.$wrapper), o.$wrapper.on("click." + g, '[data-remodal-action="close"]', function(t) {
            t.preventDefault(), o.close()
        }), o.$wrapper.on("click." + g, '[data-remodal-action="cancel"]', function(t) {
            t.preventDefault(), o.$modal.trigger(y.CANCELLATION), o.settings.closeOnCancel && o.close(y.CANCELLATION)
        }), o.$wrapper.on("click." + g, '[data-remodal-action="confirm"]', function(t) {
            t.preventDefault(), o.$modal.trigger(y.CONFIRMATION), o.settings.closeOnConfirm && o.close(y.CONFIRMATION)
        }), o.$wrapper.on("click." + g, function(t) {
            var a = e(t.target);
            a.hasClass(l("wrapper")) && o.settings.closeOnOutsideClick && o.close()
        })
    }
    var u, f, h = "remodal",
        g = t.REMODAL_GLOBALS && t.REMODAL_GLOBALS.NAMESPACE || h,
        v = e.map(["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"], function(t) {
            return t + "." + g
        }).join(" "),
        $ = e.map(["animationend", "webkitAnimationEnd", "MSAnimationEnd", "oAnimationEnd"], function(t) {
            return t + "." + g
        }).join(" "),
        C = e.extend({
            hashTracking: !0,
            closeOnConfirm: !0,
            closeOnCancel: !0,
            closeOnEscape: !0,
            closeOnOutsideClick: !0,
            modifier: ""
        }, t.REMODAL_GLOBALS && t.REMODAL_GLOBALS.DEFAULTS),
        O = {
            CLOSING: "closing",
            CLOSED: "closed",
            OPENING: "opening",
            OPENED: "opened"
        },
        y = {
            CONFIRMATION: "confirmation",
            CANCELLATION: "cancellation"
        },
        E = function() {
            var t = document.createElement("div").style;
            return void 0 !== t.animationName || void 0 !== t.WebkitAnimationName || void 0 !== t.MozAnimationName || void 0 !== t.msAnimationName || void 0 !== t.OAnimationName
        }(),
        N = /iPad|iPhone|iPod/.test(navigator.platform);
    p.prototype.open = function() {
        var t, a = this;
        a.state !== O.OPENING && a.state !== O.CLOSING && (t = a.$modal.attr("data-remodal-id"), t && a.settings.hashTracking && (f = e(window).scrollTop(), location.hash = t), u && u !== a && d(u), u = a, o(), a.$bg.addClass(a.settings.modifier), a.$overlay.addClass(a.settings.modifier).show(), a.$wrapper.show().scrollTop(0), a.$modal.focus(), r(function() {
            s(a, O.OPENING)
        }, function() {
            s(a, O.OPENED)
        }, a))
    }, p.prototype.close = function(t) {
        var a = this;
        a.state !== O.OPENING && a.state !== O.CLOSING && (a.settings.hashTracking && a.$modal.attr("data-remodal-id") === location.hash.substr(1) && (location.hash = "", e(window).scrollTop(f)), r(function() {
            s(a, O.CLOSING, !1, t)
        }, function() {
            a.$bg.removeClass(a.settings.modifier), a.$overlay.removeClass(a.settings.modifier).hide(), a.$wrapper.hide(), i(), s(a, O.CLOSED, !1, t)
        }, a))
    }, p.prototype.getState = function() {
        return this.state
    }, p.prototype.destroy = function() {
        var t, a = e[h].lookup;
        d(this), this.$wrapper.remove(), delete a[this.index], t = e.grep(a, function(t) {
            return !!t
        }).length, 0 === t && (this.$overlay.remove(), this.$bg.removeClass(l("is", O.CLOSING) + " " + l("is", O.OPENING) + " " + l("is", O.CLOSED) + " " + l("is", O.OPENED)))
    }, e[h] = {
        lookup: []
    }, e.fn[h] = function(t) {
        var a, n;
        return this.each(function(o, i) {
            n = e(i), null == n.data(h) ? (a = new p(n, t), n.data(h, a.index), a.settings.hashTracking && n.attr("data-remodal-id") === location.hash.substr(1) && a.open()) : a = e[h].lookup[n.data(h)]
        }), a
    }, e(document).ready(function() {
        e(document).on("click", "[data-remodal-target]", function(t) {
            t.preventDefault();
            var a = t.currentTarget,
                n = a.getAttribute("data-remodal-target"),
                o = e('[data-remodal-id="' + n + '"]');
            e[h].lookup[o.data(h)].open()
        }), e(document).find("." + g).each(function(t, a) {
            var n = e(a),
                o = n.data("remodal-options");
            o ? ("string" == typeof o || o instanceof String) && (o = c(o)) : o = {}, n[h](o)
        }), e(document).on("keydown." + g, function(t) {
            u && u.settings.closeOnEscape && u.state === O.OPENED && 27 === t.keyCode && u.close()
        }), e(window).on("hashchange." + g, m)
    })
}), $(document).ready(function() {
    $(document).on("closed", ".remodal", function() {
        $("[data-remodal-id]").remove()
    }), $("[video-modal]").on("click", function() {
        $("[data-remodal-id]").remove();
        var t = $("#video-modal-template").html(),
            e = $(t).find("iframe").attr("src", "https://www.youtube.com/embed/" + $(this).attr("video-modal") + "?autoplay=1").end().appendTo("body");
        e.remodal().open()
    })
});
