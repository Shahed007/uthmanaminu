// Verde.io plugins

(function($) {
    $.fn.fitImage = function() {
        return this.each(function() {

            var $obj = $(this);
            var $img = $(this).find(".bg").eq(0);
            var $container = $img.parent();

            var imageAspect = $img.data("ratio");
            var containerW = $container.width();
            var containerH = $container.height();
            var containerAspect = containerW / containerH;

            //console.log(containerAspect + " - " + imageAspect);

            if (Math.abs(containerAspect - imageAspect) <= .3) {
                if (containerAspect < imageAspect) {
                    $img.css({
                        width: containerH * imageAspect,
                        height: containerH,
                        top: 0,
                        left: -(containerH * imageAspect - containerW) / 2
                    });
                } else {
                    $img.css({
                        width: containerW,
                        height: containerW / imageAspect,
                        top: -(containerW / imageAspect - containerH) / 2,
                        left: 0
                    });
                }
            } else {
                var offset = 60;
                containerH -= offset * 2;
                containerW -= offset * 2;

                if (containerAspect >= imageAspect) {
                    $img.css({
                        width: containerH * imageAspect,
                        height: containerH,
                        top: offset,
                        left: -(containerH * imageAspect - containerW) / 2 + offset
                    });
                } else {
                    $img.css({
                        width: containerW,
                        height: containerW / imageAspect,
                        top: -(containerW / imageAspect - containerH) / 2 + offset,
                        left: offset
                    });
                }
            }
        });
    };
}(jQuery));

(function($) {
    $.fn.loadAdjacent = function(options, callback) {
        return this.each(function() {

            var $obj = $(this);
            var settings = $.extend({
                prev: false
            }, options);

            if (!settings.prev) {
                var id = $obj.data("next");
                $("#next").find("span").addClass("blink");
            } else {
                var id = $obj.data("prev");
                $("#prev").find("span").addClass("blink");
            }

            $.ajax({
                type: "POST",
                dataType: "html",
                url: verdeVars.siteURL + "/?p=" + id,
                data: ({
                    ajaxLoad: true
                }),
                success: function(data) {

                    if (!settings.prev)
                        $obj.after(data);
                    else
                        $obj.before(data);

                    delete data;

                    $("#next, #prev").find("span").removeClass("blink");

                    if (callback) callback();

                },
                error: function() {
                    console.log("AJAX error");
                    return false;
                }
            });

        });
    };
}(jQuery));


(function($) {
    $.fn.loadFromArchive = function(callback) {
        return this.each(function() {

            var $obj = $(this);
            var id = $(this).data("id");

            $.ajax({
                type: "POST",
                dataType: "html",
                url: verdeVars.siteURL + "/?p=" + id,
                data: ({
                    ajaxLoad: true
                }),
                success: function(data) {

                    $("#sliders").find(".loaded").unLoadImage();
                    $("#sliders").find("article").remove();
                    $("#mask").append(data);

                    delete data;

                    if (callback) callback();

                },
                error: function() {
                    console.log("AJAX error");
                    return false;
                }
            });

        });
    };
}(jQuery));


(function($) {
    $.fn.loadImage = function(callback) {
        return this.each(function() {

            var $obj = $(this);
            var $img = $(this).find("img").eq(0);

            if (!Modernizr.touch || (Modernizr.touch && browser_width >= 768 && window.devicePixelRatio >= 1.5))
                var toLoad = $img.data("large");
            else
                var toLoad = $img.data("medium");

            $("<img />").attr("src", toLoad).imagesLoaded(function() {
                $img.attr("src", toLoad);
                $obj.removeClass("loading").addClass("loaded");
                if (callback) callback();
            });
        });
    };
}(jQuery));

(function($) {
    $.fn.unLoadImage = function() {
        return this.each(function(index) {
            $("img", this).attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
            $(this).removeClass("loaded");
        });
    };
}(jQuery));

// jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(e, t, n, r, i) {
        return jQuery.easing[jQuery.easing.def](e, t, n, r, i)
    },
    easeInQuad: function(e, t, n, r, i) {
        return r * (t /= i) * t + n
    },
    easeOutQuad: function(e, t, n, r, i) {
        return -r * (t /= i) * (t - 2) + n
    },
    easeInOutQuad: function(e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t + n;
        return -r / 2 * (--t * (t - 2) - 1) + n
    },
    easeInCubic: function(e, t, n, r, i) {
        return r * (t /= i) * t * t + n
    },
    easeOutCubic: function(e, t, n, r, i) {
        return r * ((t = t / i - 1) * t * t + 1) + n
    },
    easeInOutCubic: function(e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t * t + n;
        return r / 2 * ((t -= 2) * t * t + 2) + n
    },
    easeInQuart: function(e, t, n, r, i) {
        return r * (t /= i) * t * t * t + n
    },
    easeOutQuart: function(e, t, n, r, i) {
        return -r * ((t = t / i - 1) * t * t * t - 1) + n
    },
    easeInOutQuart: function(e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t * t * t + n;
        return -r / 2 * ((t -= 2) * t * t * t - 2) + n
    },
    easeInQuint: function(e, t, n, r, i) {
        return r * (t /= i) * t * t * t * t + n
    },
    easeOutQuint: function(e, t, n, r, i) {
        return r * ((t = t / i - 1) * t * t * t * t + 1) + n
    },
    easeInOutQuint: function(e, t, n, r, i) {
        if ((t /= i / 2) < 1) return r / 2 * t * t * t * t * t + n;
        return r / 2 * ((t -= 2) * t * t * t * t + 2) + n
    },
    easeInSine: function(e, t, n, r, i) {
        return -r * Math.cos(t / i * (Math.PI / 2)) + r + n
    },
    easeOutSine: function(e, t, n, r, i) {
        return r * Math.sin(t / i * (Math.PI / 2)) + n
    },
    easeInOutSine: function(e, t, n, r, i) {
        return -r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
    },
    easeInExpo: function(e, t, n, r, i) {
        return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
    },
    easeOutExpo: function(e, t, n, r, i) {
        return t == i ? n + r : r * (-Math.pow(2, -10 * t / i) + 1) + n
    },
    easeInOutExpo: function(e, t, n, r, i) {
        if (t == 0) return n;
        if (t == i) return n + r;
        if ((t /= i / 2) < 1) return r / 2 * Math.pow(2, 10 * (t - 1)) + n;
        return r / 2 * (-Math.pow(2, -10 * --t) + 2) + n
    },
    easeInCirc: function(e, t, n, r, i) {
        return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
    },
    easeOutCirc: function(e, t, n, r, i) {
        return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
    },
    easeInOutCirc: function(e, t, n, r, i) {
        if ((t /= i / 2) < 1) return -r / 2 * (Math.sqrt(1 - t * t) - 1) + n;
        return r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
    },
    easeInElastic: function(e, t, n, r, i) {
        var s = 1.70158;
        var o = 0;
        var u = r;
        if (t == 0) return n;
        if ((t /= i) == 1) return n + r;
        if (!o) o = i * .3;
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return -(u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o)) + n
    },
    easeOutElastic: function(e, t, n, r, i) {
        var s = 1.70158;
        var o = 0;
        var u = r;
        if (t == 0) return n;
        if ((t /= i) == 1) return n + r;
        if (!o) o = i * .3;
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return u * Math.pow(2, -10 * t) * Math.sin((t * i - s) * 2 * Math.PI / o) + r + n
    },
    easeInOutElastic: function(e, t, n, r, i) {
        var s = 1.70158;
        var o = 0;
        var u = r;
        if (t == 0) return n;
        if ((t /= i / 2) == 2) return n + r;
        if (!o) o = i * .3 * 1.5;
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        if (t < 1) return -.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) + n;
        return u * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) * .5 + r + n
    },
    easeInBack: function(e, t, n, r, i, s) {
        if (s == undefined) s = 1.70158;
        return r * (t /= i) * t * ((s + 1) * t - s) + n
    },
    easeOutBack: function(e, t, n, r, i, s) {
        if (s == undefined) s = 1.70158;
        return r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n
    },
    easeInOutBack: function(e, t, n, r, i, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= i / 2) < 1) return r / 2 * t * t * (((s *= 1.525) + 1) * t - s) + n;
        return r / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + n
    },
    easeInBounce: function(e, t, n, r, i) {
        return r - jQuery.easing.easeOutBounce(e, i - t, 0, r, i) + n
    },
    easeOutBounce: function(e, t, n, r, i) {
        if ((t /= i) < 1 / 2.75) {
            return r * 7.5625 * t * t + n
        } else if (t < 2 / 2.75) {
            return r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n
        } else if (t < 2.5 / 2.75) {
            return r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n
        } else {
            return r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
        }
    },
    easeInOutBounce: function(e, t, n, r, i) {
        if (t < i / 2) return jQuery.easing.easeInBounce(e, t * 2, 0, r, i) * .5 + n;
        return jQuery.easing.easeOutBounce(e, t * 2 - i, 0, r, i) * .5 + r * .5 + n
    }
});

/*!
 * imagesLoaded PACKAGED v3.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function() {
    function e() {}

    function t(e, t) {
        for (var n = e.length; n--;)
            if (e[n].listener === t) return n;
        return -1
    }

    function n(e) {
        return function() {
            return this[e].apply(this, arguments)
        }
    }
    var i = e.prototype,
        r = this,
        o = r.EventEmitter;
    i.getListeners = function(e) {
        var t, n, i = this._getEvents();
        if ("object" == typeof e) {
            t = {};
            for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
        } else t = i[e] || (i[e] = []);
        return t
    }, i.flattenListeners = function(e) {
        var t, n = [];
        for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
        return n
    }, i.getListenersAsObject = function(e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, i.addListener = function(e, n) {
        var i, r = this.getListenersAsObject(e),
            o = "object" == typeof n;
        for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {
            listener: n,
            once: !1
        });
        return this
    }, i.on = n("addListener"), i.addOnceListener = function(e, t) {
        return this.addListener(e, {
            listener: t,
            once: !0
        })
    }, i.once = n("addOnceListener"), i.defineEvent = function(e) {
        return this.getListeners(e), this
    }, i.defineEvents = function(e) {
        for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
        return this
    }, i.removeListener = function(e, n) {
        var i, r, o = this.getListenersAsObject(e);
        for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
        return this
    }, i.off = n("removeListener"), i.addListeners = function(e, t) {
        return this.manipulateListeners(!1, e, t)
    }, i.removeListeners = function(e, t) {
        return this.manipulateListeners(!0, e, t)
    }, i.manipulateListeners = function(e, t, n) {
        var i, r, o = e ? this.removeListener : this.addListener,
            s = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)
            for (i = n.length; i--;) o.call(this, t, n[i]);
        else
            for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
        return this
    }, i.removeEvent = function(e) {
        var t, n = typeof e,
            i = this._getEvents();
        if ("string" === n) delete i[e];
        else if ("object" === n)
            for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
        else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(e, t) {
        var n, i, r, o, s = this.getListenersAsObject(e);
        for (r in s)
            if (s.hasOwnProperty(r))
                for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, i.setOnceReturnValue = function(e) {
        return this._onceReturnValue = e, this
    }, i._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, i._getEvents = function() {
        return this._events || (this._events = {})
    }, e.noConflict = function() {
        return r.EventEmitter = o, e
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return e
    }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this),
    function(e) {
        function t(t) {
            var n = e.event;
            return n.target = n.target || n.srcElement || t, n
        }
        var n = document.documentElement,
            i = function() {};
        n.addEventListener ? i = function(e, t, n) {
            e.addEventListener(t, n, !1)
        } : n.attachEvent && (i = function(e, n, i) {
            e[n + i] = i.handleEvent ? function() {
                var n = t(e);
                i.handleEvent.call(i, n)
            } : function() {
                var n = t(e);
                i.call(e, n)
            }, e.attachEvent("on" + n, e[n + i])
        });
        var r = function() {};
        n.removeEventListener ? r = function(e, t, n) {
            e.removeEventListener(t, n, !1)
        } : n.detachEvent && (r = function(e, t, n) {
            e.detachEvent("on" + t, e[t + n]);
            try {
                delete e[t + n]
            } catch (i) {
                e[t + n] = void 0
            }
        });
        var o = {
            bind: i,
            unbind: r
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
    }(this),
    function(e, t) {
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(n, i) {
            return t(e, n, i)
        }) : "object" == typeof exports ? module.exports = t(e, require("eventEmitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
    }(this, function(e, t, n) {
        function i(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function r(e) {
            return "[object Array]" === d.call(e)
        }

        function o(e) {
            var t = [];
            if (r(e)) t = e;
            else if ("number" == typeof e.length)
                for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
            else t.push(e);
            return t
        }

        function s(e, t, n) {
            if (!(this instanceof s)) return new s(e, t);
            "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
            var r = this;
            setTimeout(function() {
                r.check()
            })
        }

        function c(e) {
            this.img = e
        }

        function f(e) {
            this.src = e, v[e] = this
        }
        var a = e.jQuery,
            u = e.console,
            h = u !== void 0,
            d = Object.prototype.toString;
        s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function() {
            this.images = [];
            for (var e = 0, t = this.elements.length; t > e; e++) {
                var n = this.elements[e];
                "IMG" === n.nodeName && this.addImage(n);
                for (var i = n.querySelectorAll("img"), r = 0, o = i.length; o > r; r++) {
                    var s = i[r];
                    this.addImage(s)
                }
            }
        }, s.prototype.addImage = function(e) {
            var t = new c(e);
            this.images.push(t)
        }, s.prototype.check = function() {
            function e(e, r) {
                return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
            }
            var t = this,
                n = 0,
                i = this.images.length;
            if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
            for (var r = 0; i > r; r++) {
                var o = this.images[r];
                o.on("confirm", e), o.check()
            }
        }, s.prototype.progress = function(e) {
            this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
            var t = this;
            setTimeout(function() {
                t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
            })
        }, s.prototype.complete = function() {
            var e = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var t = this;
            setTimeout(function() {
                if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                    var n = t.hasAnyBroken ? "reject" : "resolve";
                    t.jqDeferred[n](t)
                }
            })
        }, a && (a.fn.imagesLoaded = function(e, t) {
            var n = new s(this, e, t);
            return n.jqDeferred.promise(a(this))
        }), c.prototype = new t, c.prototype.check = function() {
            var e = v[this.img.src] || new f(this.img.src);
            if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
            if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
            var t = this;
            e.on("confirm", function(e, n) {
                return t.confirm(e.isLoaded, n), !0
            }), e.check()
        }, c.prototype.confirm = function(e, t) {
            this.isLoaded = e, this.emit("confirm", this, t)
        };
        var v = {};
        return f.prototype = new t, f.prototype.check = function() {
            if (!this.isChecked) {
                var e = new Image;
                n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
            }
        }, f.prototype.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, f.prototype.onload = function(e) {
            this.confirm(!0, "onload"), this.unbindProxyEvents(e)
        }, f.prototype.onerror = function(e) {
            this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
        }, f.prototype.confirm = function(e, t) {
            this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
        }, f.prototype.unbindProxyEvents = function(e) {
            n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
        }, s
    });

/*
jQuery Waypoints - v2.0.4
Copyright (c) 2011-2014 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function() {
    var t = [].indexOf || function(t) {
            for (var e = 0, n = this.length; e < n; e++) {
                if (e in this && this[e] === t) return e
            }
            return -1
        },
        e = [].slice;
    (function(t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function(n) {
                return e(n, t)
            })
        } else {
            return e(t.jQuery, t)
        }
    })(this, function(n, r) {
        var i, o, l, s, f, u, c, a, h, d, p, y, v, w, g, m;
        i = n(r);
        a = t.call(r, "ontouchstart") >= 0;
        s = {
            horizontal: {},
            vertical: {}
        };
        f = 1;
        c = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = function() {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                this.element[u] = this.id;
                c[this.id] = this;
                t.bind(y, function() {
                    var t;
                    if (!(e.didScroll || a)) {
                        e.didScroll = true;
                        t = function() {
                            e.doScroll();
                            return e.didScroll = false
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle)
                    }
                });
                t.bind(p, function() {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function() {
                            n[m]("refresh");
                            return e.didResize = false
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle)
                    }
                })
            }
            t.prototype.doScroll = function() {
                var t, e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                if (a && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh")
                }
                n.each(t, function(t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function(t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e)
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e)
                        }
                    });
                    l.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    if (!o) {
                        l.reverse()
                    }
                    return n.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i])
                        }
                    })
                });
                return this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll
                }
            };
            t.prototype.refresh = function() {
                var t, e, r, i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(t, function(t, e) {
                    return n.each(i.waypoints[t], function(t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element)
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(e.contextDimension * i / 100)
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (r.options.onlyOnScroll && l != null || !r.enabled) {
                            return
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([e.backward])
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([e.forward])
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward])
                        }
                    })
                })
            };
            t.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([p, y].join(" "));
                    return delete c[this.id]
                }
            };
            return t
        }();
        l = function() {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function() {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height()
                        }
                        return t - n(this).outerHeight()
                    }
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = this.element[w]) != null ? o : [];
                i.push(this.id);
                this.element[w] = i
            }
            t.prototype.trigger = function(t) {
                if (!this.enabled) {
                    return
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t)
                }
                if (this.options.triggerOnce) {
                    return this.destroy()
                }
            };
            t.prototype.disable = function() {
                return this.enabled = false
            };
            t.prototype.enable = function() {
                this.context.refresh();
                return this.enabled = true
            };
            t.prototype.destroy = function() {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            };
            t.getWaypointsByElement = function(t) {
                var e, r;
                r = t[w];
                if (!r) {
                    return []
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function(t) {
                    return e[t]
                })
            };
            return t
        }();
        d = {
            init: function(t, e) {
                var r;
                if (e == null) {
                    e = {}
                }
                if ((r = e.handler) == null) {
                    e.handler = t
                }
                this.each(function() {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i)
                    }
                    i = n(i);
                    r = c[i[0][u]];
                    if (!r) {
                        r = new o(i)
                    }
                    return new l(t, r, e)
                });
                n[m]("refresh");
                return this
            },
            disable: function() {
                return d._invoke.call(this, "disable")
            },
            enable: function() {
                return d._invoke.call(this, "enable")
            },
            destroy: function() {
                return d._invoke.call(this, "destroy")
            },
            prev: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1])
                    }
                })
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1])
                    }
                })
            },
            _traverse: function(t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical"
                }
                if (e == null) {
                    e = r
                }
                l = h.aggregate(e);
                o = [];
                this.each(function() {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t])
                });
                return this.pushStack(o)
            },
            _invoke: function(t) {
                this.each(function() {
                    var e;
                    e = l.getWaypointsByElement(this);
                    return n.each(e, function(e, n) {
                        n[t]();
                        return true
                    })
                });
                return this
            }
        };
        n.fn[g] = function() {
            var t, r;
            r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (d[r]) {
                return d[r].apply(this, t)
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments)
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r])
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.")
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.")
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function() {
                return n.each(c, function(t, e) {
                    return e.refresh()
                })
            },
            viewportHeight: function() {
                var t;
                return (t = r.innerHeight) != null ? t : i.height()
            },
            aggregate: function(t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = c[n(t)[0][u]]) != null ? i.waypoints : void 0
                }
                if (!e) {
                    return []
                }
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function(t, i) {
                    n.each(e[t], function(t, e) {
                        return i.push(e)
                    });
                    i.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    r[t] = n.map(i, function(t) {
                        return t.element
                    });
                    return r[t] = n.unique(r[t])
                });
                return r
            },
            above: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y
                })
            },
            below: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y
                })
            },
            left: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x
                })
            },
            right: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset > t.oldScroll.x
                })
            },
            enable: function() {
                return h._invoke("enable")
            },
            disable: function() {
                return h._invoke("disable")
            },
            destroy: function() {
                return h._invoke("destroy")
            },
            extendFn: function(t, e) {
                return d[t] = e
            },
            _invoke: function(t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function(e, n) {
                    n[t]();
                    return true
                })
            },
            _filter: function(t, e, r) {
                var i, o;
                i = c[n(t)[0][u]];
                if (!i) {
                    return []
                }
                o = [];
                n.each(i.waypoints[e], function(t, e) {
                    if (r(i, e)) {
                        return o.push(e)
                    }
                });
                o.sort(function(t, e) {
                    return t.offset - e.offset
                });
                return n.map(o, function(t) {
                    return t.element
                })
            }
        };
        n[m] = function() {
            var t, n;
            n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, t)
            } else {
                return h.aggregate.call(null, n)
            }
        };
        n[m].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.load(function() {
            return n[m]("refresh")
        })
    })
}).call(this);

/*! Hammer.JS - v1.0.7dev - 2014-01-15
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */
! function(a, b) {
    "use strict";

    function c() {
        d.READY || (d.event.determineEventTypes(), d.utils.each(d.gestures, function(a) {
            d.detection.register(a)
        }), d.event.onTouch(d.DOCUMENT, d.EVENT_MOVE, d.detection.detect), d.event.onTouch(d.DOCUMENT, d.EVENT_END, d.detection.detect), d.READY = !0)
    }
    var d = function(a, b) {
        return new d.Instance(a, b || {})
    };
    d.defaults = {
        stop_browser_behavior: {
            userSelect: "none",
            touchAction: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    }, d.HAS_POINTEREVENTS = a.navigator.pointerEnabled || a.navigator.msPointerEnabled, d.HAS_TOUCHEVENTS = "ontouchstart" in a, d.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i, d.NO_MOUSEEVENTS = d.HAS_TOUCHEVENTS && a.navigator.userAgent.match(d.MOBILE_REGEX), d.EVENT_TYPES = {}, d.DIRECTION_DOWN = "down", d.DIRECTION_LEFT = "left", d.DIRECTION_UP = "up", d.DIRECTION_RIGHT = "right", d.POINTER_MOUSE = "mouse", d.POINTER_TOUCH = "touch", d.POINTER_PEN = "pen", d.EVENT_START = "start", d.EVENT_MOVE = "move", d.EVENT_END = "end", d.DOCUMENT = a.document, d.plugins = d.plugins || {}, d.gestures = d.gestures || {}, d.READY = !1, d.utils = {
        extend: function(a, c, d) {
            for (var e in c) a[e] !== b && d || (a[e] = c[e]);
            return a
        },
        each: function(a, c, d) {
            var e, f;
            if ("forEach" in a) a.forEach(c, d);
            else if (a.length !== b) {
                for (e = 0, f = a.length; f > e; e++)
                    if (c.call(d, a[e], e, a) === !1) return
            } else
                for (e in a)
                    if (a.hasOwnProperty(e) && c.call(d, a[e], e, a) === !1) return
        },
        hasParent: function(a, b) {
            for (; a;) {
                if (a == b) return !0;
                a = a.parentNode
            }
            return !1
        },
        getCenter: function(a) {
            var b = [],
                c = [];
            return d.utils.each(a, function(a) {
                b.push("undefined" != typeof a.clientX ? a.clientX : a.pageX), c.push("undefined" != typeof a.clientY ? a.clientY : a.pageY)
            }), {
                pageX: (Math.min.apply(Math, b) + Math.max.apply(Math, b)) / 2,
                pageY: (Math.min.apply(Math, c) + Math.max.apply(Math, c)) / 2
            }
        },
        getVelocity: function(a, b, c) {
            return {
                x: Math.abs(b / a) || 0,
                y: Math.abs(c / a) || 0
            }
        },
        getAngle: function(a, b) {
            var c = b.pageY - a.pageY,
                d = b.pageX - a.pageX;
            return 180 * Math.atan2(c, d) / Math.PI
        },
        getDirection: function(a, b) {
            var c = Math.abs(a.pageX - b.pageX),
                e = Math.abs(a.pageY - b.pageY);
            return c >= e ? a.pageX - b.pageX > 0 ? d.DIRECTION_LEFT : d.DIRECTION_RIGHT : a.pageY - b.pageY > 0 ? d.DIRECTION_UP : d.DIRECTION_DOWN
        },
        getDistance: function(a, b) {
            var c = b.pageX - a.pageX,
                d = b.pageY - a.pageY;
            return Math.sqrt(c * c + d * d)
        },
        getScale: function(a, b) {
            return a.length >= 2 && b.length >= 2 ? this.getDistance(b[0], b[1]) / this.getDistance(a[0], a[1]) : 1
        },
        getRotation: function(a, b) {
            return a.length >= 2 && b.length >= 2 ? this.getAngle(b[1], b[0]) - this.getAngle(a[1], a[0]) : 0
        },
        isVertical: function(a) {
            return a == d.DIRECTION_UP || a == d.DIRECTION_DOWN
        },
        stopDefaultBrowserBehavior: function(a, b) {
            b && a && a.style && (d.utils.each(["webkit", "khtml", "moz", "Moz", "ms", "o", ""], function(c) {
                d.utils.each(b, function(b, d) {
                    c && (d = c + d.substring(0, 1).toUpperCase() + d.substring(1)), d in a.style && (a.style[d] = b)
                })
            }), "none" == b.userSelect && (a.onselectstart = function() {
                return !1
            }), "none" == b.userDrag && (a.ondragstart = function() {
                return !1
            }))
        }
    }, d.Instance = function(a, b) {
        var e = this;
        return c(), this.element = a, this.enabled = !0, this.options = d.utils.extend(d.utils.extend({}, d.defaults), b || {}), this.options.stop_browser_behavior && d.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior), d.event.onTouch(a, d.EVENT_START, function(a) {
            e.enabled && d.detection.startDetect(e, a)
        }), this
    }, d.Instance.prototype = {
        on: function(a, b) {
            var c = a.split(" ");
            return d.utils.each(c, function(a) {
                this.element.addEventListener(a, b, !1)
            }, this), this
        },
        off: function(a, b) {
            var c = a.split(" ");
            return d.utils.each(c, function(a) {
                this.element.removeEventListener(a, b, !1)
            }, this), this
        },
        trigger: function(a, b) {
            b || (b = {});
            var c = d.DOCUMENT.createEvent("Event");
            c.initEvent(a, !0, !0), c.gesture = b;
            var e = this.element;
            return d.utils.hasParent(b.target, e) && (e = b.target), e.dispatchEvent(c), this
        },
        enable: function(a) {
            return this.enabled = a, this
        }
    };
    var e = null,
        f = !1,
        g = !1;
    d.event = {
        bindDom: function(a, b, c) {
            var e = b.split(" ");
            d.utils.each(e, function(b) {
                a.addEventListener(b, c, !1)
            })
        },
        onTouch: function(a, b, c) {
            var h = this;
            this.bindDom(a, d.EVENT_TYPES[b], function(i) {
                var j = i.type.toLowerCase();
                if (!j.match(/mouse/) || !g) {
                    j.match(/touch/) || j.match(/pointerdown/) || j.match(/mouse/) && 1 === i.which ? f = !0 : j.match(/mouse/) && !i.which && (f = !1), j.match(/touch|pointer/) && (g = !0);
                    var k = 0;
                    f && (d.HAS_POINTEREVENTS && b != d.EVENT_END ? k = d.PointerEvent.updatePointer(b, i) : j.match(/touch/) ? k = i.touches.length : g || (k = j.match(/up/) ? 0 : 1), k > 0 && b == d.EVENT_END ? b = d.EVENT_MOVE : k || (b = d.EVENT_END), (k || null === e) && (e = i), c.call(d.detection, h.collectEventData(a, b, h.getTouchList(e, b), i)), d.HAS_POINTEREVENTS && b == d.EVENT_END && (k = d.PointerEvent.updatePointer(b, i))), k || (e = null, f = !1, g = !1, d.PointerEvent.reset())
                }
            })
        },
        determineEventTypes: function() {
            var a;
            a = d.HAS_POINTEREVENTS ? d.PointerEvent.getEvents() : d.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], d.EVENT_TYPES[d.EVENT_START] = a[0], d.EVENT_TYPES[d.EVENT_MOVE] = a[1], d.EVENT_TYPES[d.EVENT_END] = a[2]
        },
        getTouchList: function(a) {
            return d.HAS_POINTEREVENTS ? d.PointerEvent.getTouchList() : a.touches ? a.touches : (a.identifier = 1, [a])
        },
        collectEventData: function(a, b, c, e) {
            var f = d.POINTER_TOUCH;
            return (e.type.match(/mouse/) || d.PointerEvent.matchType(d.POINTER_MOUSE, e)) && (f = d.POINTER_MOUSE), {
                center: d.utils.getCenter(c),
                timeStamp: (new Date).getTime(),
                target: e.target,
                touches: c,
                eventType: b,
                pointerType: f,
                srcEvent: e,
                preventDefault: function() {
                    this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(), this.srcEvent.preventDefault && this.srcEvent.preventDefault()
                },
                stopPropagation: function() {
                    this.srcEvent.stopPropagation()
                },
                stopDetect: function() {
                    return d.detection.stopDetect()
                }
            }
        }
    }, d.PointerEvent = {
        pointers: {},
        getTouchList: function() {
            var a = this,
                b = [];
            return d.utils.each(a.pointers, function(a) {
                b.push(a)
            }), b
        },
        updatePointer: function(a, b) {
            return a == d.EVENT_END ? this.pointers = {} : (b.identifier = b.pointerId, this.pointers[b.pointerId] = b), Object.keys(this.pointers).length
        },
        matchType: function(a, b) {
            if (!b.pointerType) return !1;
            var c = b.pointerType,
                e = {};
            return e[d.POINTER_MOUSE] = c === b.MSPOINTER_TYPE_MOUSE || c === d.POINTER_MOUSE, e[d.POINTER_TOUCH] = c === b.MSPOINTER_TYPE_TOUCH || c === d.POINTER_TOUCH, e[d.POINTER_PEN] = c === b.MSPOINTER_TYPE_PEN || c === d.POINTER_PEN, e[a]
        },
        getEvents: function() {
            return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
        },
        reset: function() {
            this.pointers = {}
        }
    }, d.detection = {
        gestures: [],
        current: null,
        previous: null,
        stopped: !1,
        startDetect: function(a, b) {
            this.current || (this.stopped = !1, this.current = {
                inst: a,
                startEvent: d.utils.extend({}, b),
                lastEvent: !1,
                name: ""
            }, this.detect(b))
        },
        detect: function(a) {
            if (this.current && !this.stopped) {
                a = this.extendEventData(a);
                var b = this.current.inst.options;
                return d.utils.each(this.gestures, function(c) {
                    return this.stopped || b[c.name] === !1 || c.handler.call(c, a, this.current.inst) !== !1 ? void 0 : (this.stopDetect(), !1)
                }, this), this.current && (this.current.lastEvent = a), a.eventType == d.EVENT_END && !a.touches.length - 1 && this.stopDetect(), a
            }
        },
        stopDetect: function() {
            this.previous = d.utils.extend({}, this.current), this.current = null, this.stopped = !0
        },
        extendEventData: function(a) {
            var b = this.current.startEvent;
            !b || a.touches.length == b.touches.length && a.touches !== b.touches || (b.touches = [], d.utils.each(a.touches, function(a) {
                b.touches.push(d.utils.extend({}, a))
            }));
            var c, e, f = a.timeStamp - b.timeStamp,
                g = a.center.pageX - b.center.pageX,
                h = a.center.pageY - b.center.pageY,
                i = d.utils.getVelocity(f, g, h);
            return "end" === a.eventType ? (c = this.current.lastEvent && this.current.lastEvent.interimAngle, e = this.current.lastEvent && this.current.lastEvent.interimDirection) : (c = this.current.lastEvent && d.utils.getAngle(this.current.lastEvent.center, a.center), e = this.current.lastEvent && d.utils.getDirection(this.current.lastEvent.center, a.center)), d.utils.extend(a, {
                deltaTime: f,
                deltaX: g,
                deltaY: h,
                velocityX: i.x,
                velocityY: i.y,
                distance: d.utils.getDistance(b.center, a.center),
                angle: d.utils.getAngle(b.center, a.center),
                interimAngle: c,
                direction: d.utils.getDirection(b.center, a.center),
                interimDirection: e,
                scale: d.utils.getScale(b.touches, a.touches),
                rotation: d.utils.getRotation(b.touches, a.touches),
                startEvent: b
            }), a
        },
        register: function(a) {
            var c = a.defaults || {};
            return c[a.name] === b && (c[a.name] = !0), d.utils.extend(d.defaults, c, !0), a.index = a.index || 1e3, this.gestures.push(a), this.gestures.sort(function(a, b) {
                return a.index < b.index ? -1 : a.index > b.index ? 1 : 0
            }), this.gestures
        }
    }, d.gestures.Drag = {
        name: "drag",
        index: 50,
        defaults: {
            drag_min_distance: 10,
            correct_for_drag_min_distance: !0,
            drag_max_touches: 1,
            drag_block_horizontal: !1,
            drag_block_vertical: !1,
            drag_lock_to_axis: !1,
            drag_lock_min_distance: 25
        },
        triggered: !1,
        handler: function(a, b) {
            if (d.detection.current.name != this.name && this.triggered) return b.trigger(this.name + "end", a), this.triggered = !1, void 0;
            if (!(b.options.drag_max_touches > 0 && a.touches.length > b.options.drag_max_touches)) switch (a.eventType) {
                case d.EVENT_START:
                    this.triggered = !1;
                    break;
                case d.EVENT_MOVE:
                    if (a.distance < b.options.drag_min_distance && d.detection.current.name != this.name) return;
                    if (d.detection.current.name != this.name && (d.detection.current.name = this.name, b.options.correct_for_drag_min_distance && a.distance > 0)) {
                        var c = Math.abs(b.options.drag_min_distance / a.distance);
                        d.detection.current.startEvent.center.pageX += a.deltaX * c, d.detection.current.startEvent.center.pageY += a.deltaY * c, a = d.detection.extendEventData(a)
                    }(d.detection.current.lastEvent.drag_locked_to_axis || b.options.drag_lock_to_axis && b.options.drag_lock_min_distance <= a.distance) && (a.drag_locked_to_axis = !0);
                    var e = d.detection.current.lastEvent.direction;
                    a.drag_locked_to_axis && e !== a.direction && (a.direction = d.utils.isVertical(e) ? a.deltaY < 0 ? d.DIRECTION_UP : d.DIRECTION_DOWN : a.deltaX < 0 ? d.DIRECTION_LEFT : d.DIRECTION_RIGHT), this.triggered || (b.trigger(this.name + "start", a), this.triggered = !0), b.trigger(this.name, a), b.trigger(this.name + a.direction, a), (b.options.drag_block_vertical && d.utils.isVertical(a.direction) || b.options.drag_block_horizontal && !d.utils.isVertical(a.direction)) && a.preventDefault();
                    break;
                case d.EVENT_END:
                    this.triggered && b.trigger(this.name + "end", a), this.triggered = !1
            }
        }
    }, d.gestures.Hold = {
        name: "hold",
        index: 10,
        defaults: {
            hold_timeout: 500,
            hold_threshold: 1
        },
        timer: null,
        handler: function(a, b) {
            switch (a.eventType) {
                case d.EVENT_START:
                    clearTimeout(this.timer), d.detection.current.name = this.name, this.timer = setTimeout(function() {
                        "hold" == d.detection.current.name && b.trigger("hold", a)
                    }, b.options.hold_timeout);
                    break;
                case d.EVENT_MOVE:
                    a.distance > b.options.hold_threshold && clearTimeout(this.timer);
                    break;
                case d.EVENT_END:
                    clearTimeout(this.timer)
            }
        }
    }, d.gestures.Release = {
        name: "release",
        index: 1 / 0,
        handler: function(a, b) {
            a.eventType == d.EVENT_END && b.trigger(this.name, a)
        }
    }, d.gestures.Swipe = {
        name: "swipe",
        index: 40,
        defaults: {
            swipe_min_touches: 1,
            swipe_max_touches: 1,
            swipe_velocity: .7
        },
        handler: function(a, b) {
            if (a.eventType == d.EVENT_END) {
                if (b.options.swipe_max_touches > 0 && a.touches.length < b.options.swipe_min_touches && a.touches.length > b.options.swipe_max_touches) return;
                (a.velocityX > b.options.swipe_velocity || a.velocityY > b.options.swipe_velocity) && (b.trigger(this.name, a), b.trigger(this.name + a.direction, a))
            }
        }
    }, d.gestures.Tap = {
        name: "tap",
        index: 100,
        defaults: {
            tap_max_touchtime: 250,
            tap_max_distance: 10,
            tap_always: !0,
            doubletap_distance: 20,
            doubletap_interval: 300
        },
        handler: function(a, b) {
            if (a.eventType == d.EVENT_END && "touchcancel" != a.srcEvent.type) {
                var c = d.detection.previous,
                    e = !1;
                if (a.deltaTime > b.options.tap_max_touchtime || a.distance > b.options.tap_max_distance) return;
                c && "tap" == c.name && a.timeStamp - c.lastEvent.timeStamp < b.options.doubletap_interval && a.distance < b.options.doubletap_distance && (b.trigger("doubletap", a), e = !0), (!e || b.options.tap_always) && (d.detection.current.name = "tap", b.trigger(d.detection.current.name, a))
            }
        }
    }, d.gestures.Touch = {
        name: "touch",
        index: -1 / 0,
        defaults: {
            prevent_default: !1,
            prevent_mouseevents: !1
        },
        handler: function(a, b) {
            return b.options.prevent_mouseevents && a.pointerType == d.POINTER_MOUSE ? (a.stopDetect(), void 0) : (b.options.prevent_default && a.preventDefault(), a.eventType == d.EVENT_START && b.trigger(this.name, a), void 0)
        }
    }, d.gestures.Transform = {
        name: "transform",
        index: 45,
        defaults: {
            transform_min_scale: .01,
            transform_min_rotation: 1,
            transform_always_block: !1
        },
        triggered: !1,
        handler: function(a, b) {
            if (d.detection.current.name != this.name && this.triggered) return b.trigger(this.name + "end", a), this.triggered = !1, void 0;
            if (!(a.touches.length < 2)) switch (b.options.transform_always_block && a.preventDefault(), a.eventType) {
                case d.EVENT_START:
                    this.triggered = !1;
                    break;
                case d.EVENT_MOVE:
                    var c = Math.abs(1 - a.scale),
                        e = Math.abs(a.rotation);
                    if (c < b.options.transform_min_scale && e < b.options.transform_min_rotation) return;
                    d.detection.current.name = this.name, this.triggered || (b.trigger(this.name + "start", a), this.triggered = !0), b.trigger(this.name, a), e > b.options.transform_min_rotation && b.trigger("rotate", a), c > b.options.transform_min_scale && (b.trigger("pinch", a), b.trigger("pinch" + (a.scale < 1 ? "in" : "out"), a));
                    break;
                case d.EVENT_END:
                    this.triggered && b.trigger(this.name + "end", a), this.triggered = !1
            }
        }
    }, "function" == typeof define && define.amd ? define(function() {
        return d
    }) : "object" == typeof module && module.exports ? module.exports = d : a.Hammer = d
}(window);

/*! jQuery plugin for Hammer.JS - v1.0.0 - 2014-01-02
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */
! function(a, b) {
    "use strict";

    function c(a, c) {
        a.event.bindDom = function(a, d, e) {
            c(a).on(d, function(a) {
                var c = a.originalEvent || a;
                c.pageX === b && (c.pageX = a.pageX, c.pageY = a.pageY), c.target || (c.target = a.target), c.which === b && (c.which = c.button), c.preventDefault || (c.preventDefault = a.preventDefault), c.stopPropagation || (c.stopPropagation = a.stopPropagation), e.call(this, c)
            })
        }, a.Instance.prototype.on = function(a, b) {
            return c(this.element).on(a, b)
        }, a.Instance.prototype.off = function(a, b) {
            return c(this.element).off(a, b)
        }, a.Instance.prototype.trigger = function(a, b) {
            var d = c(this.element);
            return d.has(b.target).length && (d = c(b.target)), d.trigger({
                type: a,
                gesture: b
            })
        }, c.fn.hammer = function(b) {
            return this.each(function() {
                var d = c(this),
                    e = d.data("hammer");
                e ? e && b && a.utils.extend(e.options, b) : d.data("hammer", new a(this, b || {}))
            })
        }
    }
    "function" == typeof define && "object" == typeof define.amd && define.amd ? define(["hammer", "jquery"], c) : c(a.Hammer, a.jQuery || a.Zepto)
}(this);

/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 0.6.12
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */
function FastClick(e) {
    "use strict";
    var t, n = this;
    this.trackingClick = false;
    this.trackingClickStart = 0;
    this.targetElement = null;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.lastTouchIdentifier = 0;
    this.touchBoundary = 10;
    this.layer = e;
    if (!e || !e.nodeType) {
        throw new TypeError("Layer must be a document node")
    }
    this.onClick = function() {
        return FastClick.prototype.onClick.apply(n, arguments)
    };
    this.onMouse = function() {
        return FastClick.prototype.onMouse.apply(n, arguments)
    };
    this.onTouchStart = function() {
        return FastClick.prototype.onTouchStart.apply(n, arguments)
    };
    this.onTouchMove = function() {
        return FastClick.prototype.onTouchMove.apply(n, arguments)
    };
    this.onTouchEnd = function() {
        return FastClick.prototype.onTouchEnd.apply(n, arguments)
    };
    this.onTouchCancel = function() {
        return FastClick.prototype.onTouchCancel.apply(n, arguments)
    };
    if (FastClick.notNeeded(e)) {
        return
    }
    if (this.deviceIsAndroid) {
        e.addEventListener("mouseover", this.onMouse, true);
        e.addEventListener("mousedown", this.onMouse, true);
        e.addEventListener("mouseup", this.onMouse, true)
    }
    e.addEventListener("click", this.onClick, true);
    e.addEventListener("touchstart", this.onTouchStart, false);
    e.addEventListener("touchmove", this.onTouchMove, false);
    e.addEventListener("touchend", this.onTouchEnd, false);
    e.addEventListener("touchcancel", this.onTouchCancel, false);
    if (!Event.prototype.stopImmediatePropagation) {
        e.removeEventListener = function(t, n, r) {
            var i = Node.prototype.removeEventListener;
            if (t === "click") {
                i.call(e, t, n.hijacked || n, r)
            } else {
                i.call(e, t, n, r)
            }
        };
        e.addEventListener = function(t, n, r) {
            var i = Node.prototype.addEventListener;
            if (t === "click") {
                i.call(e, t, n.hijacked || (n.hijacked = function(e) {
                    if (!e.propagationStopped) {
                        n(e)
                    }
                }), r)
            } else {
                i.call(e, t, n, r)
            }
        }
    }
    if (typeof e.onclick === "function") {
        t = e.onclick;
        e.addEventListener("click", function(e) {
            t(e)
        }, false);
        e.onclick = null
    }
}
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0;
FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);
FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
FastClick.prototype.needsClick = function(e) {
    "use strict";
    switch (e.nodeName.toLowerCase()) {
        case "button":
        case "select":
        case "textarea":
            if (e.disabled) {
                return true
            }
            break;
        case "input":
            if (this.deviceIsIOS && e.type === "file" || e.disabled) {
                return true
            }
            break;
        case "label":
        case "video":
            return true
    }
    return /\bneedsclick\b/.test(e.className)
};
FastClick.prototype.needsFocus = function(e) {
    "use strict";
    switch (e.nodeName.toLowerCase()) {
        case "textarea":
            return true;
        case "select":
            return !this.deviceIsAndroid;
        case "input":
            switch (e.type) {
                case "button":
                case "checkbox":
                case "file":
                case "image":
                case "radio":
                case "submit":
                    return false
            }
            return !e.disabled && !e.readOnly;
        default:
            return /\bneedsfocus\b/.test(e.className)
    }
};
FastClick.prototype.sendClick = function(e, t) {
    "use strict";
    var n, r;
    if (document.activeElement && document.activeElement !== e) {
        document.activeElement.blur()
    }
    r = t.changedTouches[0];
    n = document.createEvent("MouseEvents");
    n.initMouseEvent(this.determineEventType(e), true, true, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, false, false, false, false, 0, null);
    n.forwardedTouchEvent = true;
    e.dispatchEvent(n)
};
FastClick.prototype.determineEventType = function(e) {
    "use strict";
    if (this.deviceIsAndroid && e.tagName.toLowerCase() === "select") {
        return "mousedown"
    }
    return "click"
};
FastClick.prototype.focus = function(e) {
    "use strict";
    var t;
    if (this.deviceIsIOS && e.setSelectionRange && e.type.indexOf("date") !== 0 && e.type !== "time") {
        t = e.value.length;
        e.setSelectionRange(t, t)
    } else {
        e.focus()
    }
};
FastClick.prototype.updateScrollParent = function(e) {
    "use strict";
    var t, n;
    t = e.fastClickScrollParent;
    if (!t || !t.contains(e)) {
        n = e;
        do {
            if (n.scrollHeight > n.offsetHeight) {
                t = n;
                e.fastClickScrollParent = n;
                break
            }
            n = n.parentElement
        } while (n)
    }
    if (t) {
        t.fastClickLastScrollTop = t.scrollTop
    }
};
FastClick.prototype.getTargetElementFromEventTarget = function(e) {
    "use strict";
    if (e.nodeType === Node.TEXT_NODE) {
        return e.parentNode
    }
    return e
};
FastClick.prototype.onTouchStart = function(e) {
    "use strict";
    var t, n, r;
    if (e.targetTouches.length > 1) {
        return true
    }
    t = this.getTargetElementFromEventTarget(e.target);
    n = e.targetTouches[0];
    if (this.deviceIsIOS) {
        r = window.getSelection();
        if (r.rangeCount && !r.isCollapsed) {
            return true
        }
        if (!this.deviceIsIOS4) {
            if (n.identifier === this.lastTouchIdentifier) {
                e.preventDefault();
                return false
            }
            this.lastTouchIdentifier = n.identifier;
            this.updateScrollParent(t)
        }
    }
    this.trackingClick = true;
    this.trackingClickStart = e.timeStamp;
    this.targetElement = t;
    this.touchStartX = n.pageX;
    this.touchStartY = n.pageY;
    if (e.timeStamp - this.lastClickTime < 200) {
        e.preventDefault()
    }
    return true
};
FastClick.prototype.touchHasMoved = function(e) {
    "use strict";
    var t = e.changedTouches[0],
        n = this.touchBoundary;
    if (Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n) {
        return true
    }
    return false
};
FastClick.prototype.onTouchMove = function(e) {
    "use strict";
    if (!this.trackingClick) {
        return true
    }
    if (this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) {
        this.trackingClick = false;
        this.targetElement = null
    }
    return true
};
FastClick.prototype.findControl = function(e) {
    "use strict";
    if (e.control !== undefined) {
        return e.control
    }
    if (e.htmlFor) {
        return document.getElementById(e.htmlFor)
    }
    return e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
};
FastClick.prototype.onTouchEnd = function(e) {
    "use strict";
    var t, n, r, i, s, o = this.targetElement;
    if (!this.trackingClick) {
        return true
    }
    if (e.timeStamp - this.lastClickTime < 200) {
        this.cancelNextClick = true;
        return true
    }
    this.cancelNextClick = false;
    this.lastClickTime = e.timeStamp;
    n = this.trackingClickStart;
    this.trackingClick = false;
    this.trackingClickStart = 0;
    if (this.deviceIsIOSWithBadTarget) {
        s = e.changedTouches[0];
        o = document.elementFromPoint(s.pageX - window.pageXOffset, s.pageY - window.pageYOffset) || o;
        o.fastClickScrollParent = this.targetElement.fastClickScrollParent
    }
    r = o.tagName.toLowerCase();
    if (r === "label") {
        t = this.findControl(o);
        if (t) {
            this.focus(o);
            if (this.deviceIsAndroid) {
                return false
            }
            o = t
        }
    } else if (this.needsFocus(o)) {
        if (e.timeStamp - n > 100 || this.deviceIsIOS && window.top !== window && r === "input") {
            this.targetElement = null;
            return false
        }
        this.focus(o);
        this.sendClick(o, e);
        if (!this.deviceIsIOS4 || r !== "select") {
            this.targetElement = null;
            e.preventDefault()
        }
        return false
    }
    if (this.deviceIsIOS && !this.deviceIsIOS4) {
        i = o.fastClickScrollParent;
        if (i && i.fastClickLastScrollTop !== i.scrollTop) {
            return true
        }
    }
    if (!this.needsClick(o)) {
        e.preventDefault();
        this.sendClick(o, e)
    }
    return false
};
FastClick.prototype.onTouchCancel = function() {
    "use strict";
    this.trackingClick = false;
    this.targetElement = null
};
FastClick.prototype.onMouse = function(e) {
    "use strict";
    if (!this.targetElement) {
        return true
    }
    if (e.forwardedTouchEvent) {
        return true
    }
    if (!e.cancelable) {
        return true
    }
    if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
        if (e.stopImmediatePropagation) {
            e.stopImmediatePropagation()
        } else {
            e.propagationStopped = true
        }
        e.stopPropagation();
        e.preventDefault();
        return false
    }
    return true
};
FastClick.prototype.onClick = function(e) {
    "use strict";
    var t;
    if (this.trackingClick) {
        this.targetElement = null;
        this.trackingClick = false;
        return true
    }
    if (e.target.type === "submit" && e.detail === 0) {
        return true
    }
    t = this.onMouse(e);
    if (!t) {
        this.targetElement = null
    }
    return t
};
FastClick.prototype.destroy = function() {
    "use strict";
    var e = this.layer;
    if (this.deviceIsAndroid) {
        e.removeEventListener("mouseover", this.onMouse, true);
        e.removeEventListener("mousedown", this.onMouse, true);
        e.removeEventListener("mouseup", this.onMouse, true)
    }
    e.removeEventListener("click", this.onClick, true);
    e.removeEventListener("touchstart", this.onTouchStart, false);
    e.removeEventListener("touchmove", this.onTouchMove, false);
    e.removeEventListener("touchend", this.onTouchEnd, false);
    e.removeEventListener("touchcancel", this.onTouchCancel, false)
};
FastClick.notNeeded = function(e) {
    "use strict";
    var t;
    var n;
    if (typeof window.ontouchstart === "undefined") {
        return true
    }
    n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
    if (n) {
        if (FastClick.prototype.deviceIsAndroid) {
            t = document.querySelector("meta[name=viewport]");
            if (t) {
                if (t.content.indexOf("user-scalable=no") !== -1) {
                    return true
                }
                if (n > 31 && window.innerWidth <= window.screen.width) {
                    return true
                }
            }
        } else {
            return true
        }
    }
    if (e.style.msTouchAction === "none") {
        return true
    }
    return false
};
FastClick.attach = function(e) {
    "use strict";
    return new FastClick(e)
};
if (typeof define !== "undefined" && define.amd) {
    define(function() {
        "use strict";
        return FastClick
    })
} else if (typeof module !== "undefined" && module.exports) {
    module.exports = FastClick.attach;
    module.exports.FastClick = FastClick
} else {
    window.FastClick = FastClick
};

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.9
 *
 * Requires: jQuery 1.2.2+
 */
(function(e) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], e)
    } else if (typeof exports === "object") {
        module.exports = e
    } else {
        e(jQuery)
    }
})(function(e) {
    function a(t) {
        var n = t || window.event,
            o = r.call(arguments, 1),
            u = 0,
            a = 0,
            c = 0,
            h = 0;
        t = e.event.fix(n);
        t.type = "mousewheel";
        if ("detail" in n) {
            c = n.detail * -1
        }
        if ("wheelDelta" in n) {
            c = n.wheelDelta
        }
        if ("wheelDeltaY" in n) {
            c = n.wheelDeltaY
        }
        if ("wheelDeltaX" in n) {
            a = n.wheelDeltaX * -1
        }
        if ("axis" in n && n.axis === n.HORIZONTAL_AXIS) {
            a = c * -1;
            c = 0
        }
        u = c === 0 ? a : c;
        if ("deltaY" in n) {
            c = n.deltaY * -1;
            u = c
        }
        if ("deltaX" in n) {
            a = n.deltaX;
            if (c === 0) {
                u = a * -1
            }
        }
        if (c === 0 && a === 0) {
            return
        }
        if (n.deltaMode === 1) {
            var p = e.data(this, "mousewheel-line-height");
            u *= p;
            c *= p;
            a *= p
        } else if (n.deltaMode === 2) {
            var d = e.data(this, "mousewheel-page-height");
            u *= d;
            c *= d;
            a *= d
        }
        h = Math.max(Math.abs(c), Math.abs(a));
        if (!s || h < s) {
            s = h;
            if (l(n, h)) {
                s /= 40
            }
        }
        if (l(n, h)) {
            u /= 40;
            a /= 40;
            c /= 40
        }
        u = Math[u >= 1 ? "floor" : "ceil"](u / s);
        a = Math[a >= 1 ? "floor" : "ceil"](a / s);
        c = Math[c >= 1 ? "floor" : "ceil"](c / s);
        t.deltaX = a;
        t.deltaY = c;
        t.deltaFactor = s;
        t.deltaMode = 0;
        o.unshift(t, u, a, c);
        if (i) {
            clearTimeout(i)
        }
        i = setTimeout(f, 200);
        return (e.event.dispatch || e.event.handle).apply(this, o)
    }

    function f() {
        s = null
    }

    function l(e, t) {
        return u.settings.adjustOldDeltas && e.type === "mousewheel" && t % 120 === 0
    }
    var t = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        n = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        r = Array.prototype.slice,
        i, s;
    if (e.event.fixHooks) {
        for (var o = t.length; o;) {
            e.event.fixHooks[t[--o]] = e.event.mouseHooks
        }
    }
    var u = e.event.special.mousewheel = {
        version: "3.1.9",
        setup: function() {
            if (this.addEventListener) {
                for (var t = n.length; t;) {
                    this.addEventListener(n[--t], a, false)
                }
            } else {
                this.onmousewheel = a
            }
            e.data(this, "mousewheel-line-height", u.getLineHeight(this));
            e.data(this, "mousewheel-page-height", u.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener) {
                for (var e = n.length; e;) {
                    this.removeEventListener(n[--e], a, false)
                }
            } else {
                this.onmousewheel = null
            }
        },
        getLineHeight: function(t) {
            return parseInt(e(t)["offsetParent" in e.fn ? "offsetParent" : "parent"]().css("fontSize"), 10)
        },
        getPageHeight: function(t) {
            return e(t).height()
        },
        settings: {
            adjustOldDeltas: true
        }
    };
    e.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    })
});