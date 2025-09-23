$(function() {
    FastClick.attach(document.body);
});

// Ready to go

$(document).ready(function() {

    // Transit animation fallback for older browsers

    if (!$.support.transition)
        $.fn.transition = $.fn.animate;


    // Prevent AJAX caching

    $.ajaxSetup({
        cache: false,
        dataType: "html"
    });


    // Get base URL for use in scripts

    var l = window.location;
    baseURL = l.protocol + "//" + l.host;


    // Fix wrong height on iOS7 iPad Landscape

    var isiPad;
    var isiPhone;
    var isiPod;
    var isiOS7;

    if (navigator.userAgent.match(/iPad/i))
        isiPad = true;

    if (navigator.userAgent.match(/iPhone/i))
        isiPhone = true;

    if (navigator.userAgent.match(/iPod/i))
        isiPod = true;

    if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) && !window.navigator.standalone)
        $("html").addClass("ipad ios7");

    if (isiPad)
        $(".tel").attr("href", $(".tel").attr("href").replace("tel", "skype") + "?call");

  if (isiPad || isiPhone || isiPod)
    $("title").text("Uthman Aminu | Portfolio");


    // Resize handler

    var windowWidth;
    var windowHeight;
    var sideOffset = 0;
    var iScroll = null;
    var caseScroll = null;

    handleResize = function() {

        windowWidth = $(window).width();
        windowHeight = $(window).height();

        if ((Modernizr.mq('(orientation: landscape)') && windowWidth >= 768) || windowWidth >= 1024)
            sideOffset = 228;
        else
            sideOffset = 0;

        if (windowWidth >= 768) {
            transitionDuration = windowWidth / 5 * 2;
            longFadeDuration = 800;
            shortFadeDuration = 500;
        } else {
            transitionDuration = windowWidth;
            longFadeDuration = 600;
            shortFadeDuration = 375;
        }

        if (iScroll !== null)
            setTimeout(function() {
                iScroll.refresh();
            }, 200);

        if (caseScroll !== null)
            setTimeout(function() {
                caseScroll.refresh();
            }, 200);
    }

    if (!Modernizr.touch) {
        $(window).resize(function() {
            handleResize();
        });
    } else {
        $('body').bind('orientationchange', function(event) {
            $("body").addClass("rotating");

            setTimeout(function() {
                handleResize();

                setTimeout(function() {
                    $("body").removeClass("rotating");
                }, shortFadeDuration);
            }, 100);
        });
    }


    // Set global Pageshow variables

    var $allPages = $(".page");
    var $currentPage = $allPages.eq(0);
    var $nextPage;
    var $prevPage;
    var transitionDuration = 800;
    var longFadeDuration = 800;
    var shortFadeDuration = 500;
    var isAnimating = false;


    // Initial resize

    handleResize();


    // Page navigation functions

    nextPage = function() {
        if (!isAnimating && !$(".case-inview").length && $("body").is(".init")) {
            isAnimating = true;

            var hOffset = windowWidth - sideOffset;
            var $oldPage = $currentPage;
            $currentPage = $currentPage.next(".page");

            if (!$currentPage.length)
                $currentPage = $allPages.first();

            destroyIscroll();

            $currentPage.attr("style", "visibility: visible; left: 0;").transition({
                scale: .96
            }, 0);

            $oldPage.transition({
                scale: .96,
                opacity: 0
            }, shortFadeDuration, "easeInOutCubic").promise().done(function() {
                $oldPage.removeAttr("style").removeClass("inview");
                $oldPage.find(".center").removeAttr("style");

                $currentPage.transition({
                    scale: 1,
                    opacity: 1
                }, shortFadeDuration, "easeInOutCubic").promise().done(function() {
                    $currentPage.removeAttr("style").addClass("inview");
                    isAnimating = false;

                    initIscroll();
                });

                $("." + $currentPage.attr("id"), "#dots, #menu").addClass("active");
                $("body").removeClass("about-us what-we-offer case-studies contact-us").addClass($currentPage.attr("id"));
            });

            $(".active").removeClass("active");
        }
    }

    prevPage = function() {
        if (!isAnimating && !$(".case-inview").length && $("body").is(".init")) {
            isAnimating = true;

            var hOffset = windowWidth - sideOffset;
            var $oldPage = $currentPage;
            $currentPage = $currentPage.prev(".page");

            if (!$currentPage.length)
                $currentPage = $allPages.last();

            destroyIscroll();

            $currentPage.attr("style", "visibility: visible; left: 0;").transition({
                scale: .96
            }, 0);

            $oldPage.transition({
                scale: .96,
                opacity: 0
            }, shortFadeDuration, "easeInOutCubic", function() {
                $oldPage.removeAttr("style").removeClass("inview");
                $oldPage.find(".center").removeAttr("style")

                $currentPage.transition({
                    scale: 1,
                    opacity: 1
                }, shortFadeDuration, "easeInOutCubic", function() {
                    $currentPage.removeAttr("style").addClass("inview");
                    isAnimating = false;

                    initIscroll();
                });

                $("." + $currentPage.attr("id"), "#dots, #menu").addClass("active");
                $("body").removeClass("about-us what-we-offer case-studies contact-us").addClass($currentPage.attr("id"));
            });


            $(".active").removeClass("active");
        }
    }

    loadPage = function(id) {
        if (!isAnimating && !$(".case-inview").length && $("body").is(".init")) {
            var hOffset = windowWidth - sideOffset;
            var $oldPage = $currentPage;
            $currentPage = $("#" + id);

            if ($("#menu").is(".menu-inview")) {
                destroyIscroll();

                setTimeout(function() {
                    $oldPage.removeAttr("style").removeClass("inview");
                    $oldPage.find(".center").removeAttr("style")
                    $currentPage.transition({
                        opacity: 0
                    }, 0).addClass("inview");
                    $("#menu-toggle").removeClass("close");

                    $currentPage.transition({
                        opacity: 1
                    }, longFadeDuration, "easeInOutCubic", function() {
                        $currentPage.removeAttr("style");
                    });

                    $("#menu").transition({
                        x: hOffset
                    }, transitionDuration, "easeInOutCubic", function() {
                        $("#menu").removeClass("menu-inview").removeAttr("style");
                        isAnimating = false;

                        initIscroll();
                    });
                }, 100);
            } else {
                destroyIscroll();

                $currentPage.attr("style", "visibility: visible; left: 0;").transition({
                    scale: .96
                }, 0);

                $oldPage.transition({
                    scale: .96,
                    opacity: 0
                }, shortFadeDuration, "easeInOutCubic", function() {
                    $oldPage.removeAttr("style").removeClass("inview");

                    $currentPage.transition({
                        scale: 1,
                        opacity: 1
                    }, shortFadeDuration, "easeInOutCubic", function() {
                        $currentPage.removeAttr("style").addClass("inview");
                        isAnimating = false;

                        initIscroll();
                    });
                });
            }
        }
    }


    // Pageshow navigation toggles

    $("#next-img, #next-img-big").hammer().on("tap", function(e) {
        e.preventDefault();

        nextPage();
    });

    $("#prev-img, #prev-img-big").hammer().on("tap", function(e) {
        e.preventDefault();

        prevPage();
    });


    // Handle keyboard navigation

    $(document).keydown(function(e) {
        switch (e.keyCode) {
            case 39:
                nextPage();

                return false;
                break;
            case 37:
                prevPage();

                return false;
                break;
            case 38:
                e.preventDefault();

                prevPage();

                return false;
                break;
            case 40:
                e.preventDefault();

                nextPage();

                return false;
                break;
            case 27:
                e.preventDefault();

                closeCase();

                return false;
                break;
        }
    });


    // Handle mouse wheel

    var isScrolling = false;
    var scrollTop = 0;
    var lastScrollTop = 0;
    var stopScroll = 0;
    var wheelStop;

    $(document).on("mousewheel", function(e) {

        isScrolling = true;

        handleScroll(e);

        e.preventDefault();
        e.stopPropagation();

    });

    // Scroll interval

    handleScroll = function(e) {
        if (isScrolling) {
            stopScroll += 1;

            if (stopScroll == 1) {
                isScrolling = false;

                clearTimeout(wheelStop);
                scrollTop = $(window).scrollTop();

                if ($("body").is(".intro"))
                    $("#main").trigger("click");
                else {
                    if (e.deltaY < 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX))
                        prevPage();
                    else if (e.deltaY > 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX))
                        nextPage();
                    else if (e.deltaX < 0 && Math.abs(e.deltaX) > Math.abs(e.deltaY))
                        nextPage();
                    else if (e.deltaX > 0 && Math.abs(e.deltaX) > Math.abs(e.deltaY))
                        prevPage();
                }

                wheelStop = setTimeout(function() {
                    stopScroll = 0;
                }, 1500);

                lastScrollTop = scrollTop;
            }
        }
    };


    // Swipe navigation

    if (Modernizr.touch) {
        $(window).on("touchmove touchend", function(e) {
            e.preventDefault();
        });

        $(document).hammer({
            drag_min_distance: 30
        }).on("swipe dragstart", ".page", function(e) {

            if ($("body").is(".intro") && (e.gesture.direction == "right"))
                $("#main").trigger("click");
            else {
                if (e.gesture.direction == "left")
                    nextPage();
                else if (e.gesture.direction == "right")
                    prevPage();
            }

            e.gesture.preventDefault();

        });

        $(document).hammer({
            drag_min_distance: 30
        }).on("swipe dragstart", ".case-inview", function(e) {

            if (e.gesture.direction == "right")
                closeCase();

            e.gesture.preventDefault();
        })

        $(document).hammer({
            drag_min_distance: 30
        }).on("hold", "#sidebar", function(e) {

            if (e.target.id == "sidebar") {
                $("#logo").addClass("hovered");

                setTimeout(function() {
                    $("#logo").removeClass("hovered");
                }, 2000);
            }

            e.gesture.preventDefault();
        })

        $(document).hammer({
            drag_min_distance: 30
        }).on("release", "#sidebar", function(e) {

            $("#logo").removeClass("hovered");

            e.gesture.preventDefault();
        });
    }

    // Menu click

    $(document).on("click", "#menu .button a, #dots a", function(e) {

        if (!isAnimating && !$(this).is(".active")) {
            $("body").removeClass("about-us what-we-offer case-studies contact-us").addClass($(this).data("page"));

            $(".active").removeClass("active");
            $("." + $(this).data("page"), "#dots, #menu").addClass("active").removeClass("hovered");

            loadPage($(this).data("page"));
        }

        e.preventDefault();
        e.stopPropagation();
    });

    if (!Modernizr.touch) {
        $(document).on("mouseenter", "#menu a, #dots a", function() {

            if (!$(this).is(".active")) {
                $("." + $(this).data("page"), "#dots, #menu").addClass("hovered");
            }

        });

        $(document).on("mouseleave", "#menu a, #dots a", function() {

            if (!$(this).is(".active")) {
                $("." + $(this).data("page"), "#dots, #menu").removeClass("hovered");
            }

        });
    }

    // Icons click

    $(document).on("click", "#icons a", function(e) {

        e.stopPropagation();

    });


    // Case study click

    var $caseStudy;

    $(document).on("click", "#list a", function(e) {
        if (!isAnimating) {
            isAnimating = true;

            var hOffset = windowWidth - sideOffset;
            $caseStudy = $("#" + $(this).data("case"));

            $("#menu-toggle").addClass("close");

            $currentPage.transition({
                opacity: 0
            }, shortFadeDuration, "easeInOutCubic");
            $("#menu, #dots").transition({
                opacity: 0
            }, shortFadeDuration, "easeInOutCubic");

            $caseStudy.attr("style", "visibility: visible; opacity: 1;").transition({
                x: -hOffset
            }, transitionDuration, "easeInOutCubic", function() {
                $caseStudy.addClass("case-inview").removeAttr("style");
                isAnimating = false;

                initIscroll(true);
            });
        }

        e.preventDefault();
        e.stopPropagation();
    });

    closeCase = function() {

        if ($(".case-inview").length) {
            isAnimating = true;

            var hOffset = windowWidth - sideOffset;

            destroyIscroll(true);

            $("#menu-toggle").removeClass("close");

            $currentPage.transition({
                opacity: 1
            }, longFadeDuration, "easeInOutCubic");
            $("#menu, #dots").transition({
                opacity: 1
            }, longFadeDuration, "easeInOutCubic");

            $caseStudy.transition({
                x: hOffset
            }, transitionDuration, "easeInOutCubic", function() {

                $caseStudy.removeClass("case-inview").removeAttr("style");
                $caseStudy.find(".center").removeAttr("style")
                isAnimating = false;

                if (iScroll !== null)
                    iScroll.refresh();
            });
        }
    }

    $(document).on("click", ".back-arrow", function(e) {

        closeCase();

        e.preventDefault();
        e.stopPropagation();

    });

    initIscroll = function(isCase) {

        var isCase = typeof isCase !== 'undefined' ? isCase : false;

        if (Modernizr.touch && windowWidth < 768) {
            if (isCase) {
                caseScroll = new IScroll('.case-inview', {
                    scrollbars: "custom",
                    fadeScrollbars: true,
                    eventPassthrough: "horizontal",
                    shrinkScrollbars: "scale"
                });
            } else {
                iScroll = new IScroll('.inview', {
                    scrollbars: "custom",
                    fadeScrollbars: true,
                    eventPassthrough: "horizontal",
                    shrinkScrollbars: "scale"
                });
            }
        }
    }

    destroyIscroll = function(isCase) {

        var isCase = typeof isCase !== 'undefined' ? isCase : false;

        if (Modernizr.touch && windowWidth < 768) {
            if (isCase && caseScroll !== null) {
                caseScroll.destroy();
                caseScroll = null;
            } else if (iScroll !== null) {
                iScroll.destroy();
                iScroll = null;
            }
        }
    }


    // Mobile menu

    $(document).on("click", "#menu-toggle", function(e) {
        if (!isAnimating) {
            isAnimating = true;

            var hOffset = windowWidth;

            if ($(".case-inview").length) {
                closeCase();
            } else if ($("#menu").is(".menu-inview")) {
                $currentPage.transition({
                    opacity: 1
                }, longFadeDuration, "easeInOutCubic");

                $("#menu-toggle").removeClass("close");

                $("#menu").transition({
                    x: hOffset
                }, transitionDuration, "easeInOutCubic", function() {
                    $("#menu").removeClass("menu-inview").removeAttr("style");
                    isAnimating = false;
                });
            } else {
                $currentPage.transition({
                    opacity: 0
                }, shortFadeDuration, "easeInOutCubic");

                $("#menu-toggle").addClass("close");

                $("#menu").attr("style", "visibility: visible;").transition({
                    x: -hOffset
                }, transitionDuration, "easeInOutCubic", function() {
                    $("#menu").addClass("menu-inview").removeAttr("style");
                    isAnimating = false;
                });
            }
        }

        e.preventDefault();
        e.stopPropagation();
    });


    // Intro click

    animateIntro = function() {

        $("#description").remove();
        $("#main").removeAttr("style").removeClass("clickable clicked");
        $("body").removeClass("intro").addClass("init");

        $("#pages").transition({
            scale: .96
        }, 0).transition({
            scale: 1,
            opacity: 1
        }, shortFadeDuration, "easeInOutCubic", function() {

            initIscroll();

            $("#title, #menu, #icons, #dots").attr("style", "visibility: visible;").transition({
                opacity: 1
            }, longFadeDuration, "easeInOutCubic").promise().done(function() {
                $("body").removeClass("hidden");
                $("#pages").removeAttr("style");

                isAnimating = false;
            });
        });

    }

    $(document).on("click touchstart", ".clickable", function(e) {

        if (!isAnimating) {
            isAnimating = true;

            if (Modernizr.csstransitions)
                var timingFn = "cubic-bezier(1.000, 0.000, 0.500, 1)";
            else
                var timingFn = "easeInOutCubic";

            if ((Modernizr.mq('(orientation: landscape)') && windowWidth >= 768) || windowWidth >= 1024)
                $("#main").addClass("clicked").transition({
                    x: windowWidth
                }, transitionDuration, timingFn, function() {
                    animateIntro();
                });
            else if (Modernizr.mq('(orientation: portrait)') || windowWidth < 768)
                $("#main").addClass("clicked").transition({
                    y: windowHeight
                }, transitionDuration, timingFn, function() {
                    animateIntro();
                });

            $("#logo").removeClass("clickable")
        }

        e.preventDefault();
        e.stopPropagation();
    });

    $("a[rel=external], a[href^='http:']:not([href*='" + window.location.host + "']), a[href^='https:']:not([href*='" + window.location.host + "'])").each(function() {
        $(this).attr("target", "_blank");
    });

});