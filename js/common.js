'use strict';




(function($) {

    jQuery('body').on('click', function() {
        hidePreloader();
    });

    // Document load function
    $(window).on('load', function() {

        // Function remove preloader
        hidePreloader();

    })

    $(document).ready(function() {

        // Func video component
        videoComponent();

        // Func scroll to top button
        scrollTop();

        // Func smooth scroll anchor links
        smoothScrollInit();

        // Slider initialization

        sliderInit();

        // Sticky Footer
        stickyFooter();

        $(window).on('resize', function() {
            stickyFooter();
        });

        // Init select2
        if ($('.js-select2').length) {
            $('.js-select2').select2({
                minimumResultsForSearch: -1
            });

        }

        // Init googleMap 
        initGoogleMap();
        initMapMultipleMarkers();

        // init RangeSlider
        rangeSlider();

        // Small header
        scrollHeader();

        // Filter content
        filterInit($('.js-filter-container'));

        // Init drag and drop

        mapDragFilterInit();

        // Init Lightbox

        initLightBox();

        // init Progressbar

        if ($('.js-progress-bars').length) {
            $('.js-progress-bars').waypoint({
                handler: function() {
                    progressBars($(this.element), 4000);
                },
                offset: '80%'
            })
        }

        // Page Helper init

        pageHelpderInit();

        // customHamburger Init 

        customHamburger();

        // Open Map setting

        mapSettings();

        //Btn Open Full map

        btnOpenFullMap();

        //Search result swithc

        searchResultSwitch();

        // init svg animation

        initSvgAnimation();

    });

    function initSvgAnimation() {

        // SVG ANIMATION
        if ($('.js-svg-animation-item').length) {
            $('.js-svg-animation-item').waypoint({
                handler: function() {
                    var thisItem = $(this.element);
                    var thisItemIcon = $(this.element).attr('data-icon');

                    if (!thisItem.hasClass('-animation-init')) {
                        // remove hide class
                        thisItem.addClass('-animation-init');

                        // svg animation init
                        new Vivus(this.element, {
                            duration: 100,
                            file: '../img/svg/svg_animation/' + thisItemIcon,
                            type: 'oneByOne'
                        });
                    }
                },
                offset: '90%'
            })
        }
    }

    function searchResultSwitch() {

        $('.js-search-result-switch a').on('click', function() {

            var typeList = $(this).attr('data-list');

            $('.js-search-result-switch a').removeClass('active');
            $(this).addClass('active');

            $('.search-result').removeClass('active');
            $('.search-result[data-list="' + typeList + '"]').addClass('active');


        });

    }


    function btnOpenFullMap() {

        $('.js-open-full-map').on('click', function() {
            $('.js-full-map').toggleClass('open');
        });

    }

    function mapSettings() {

        $('.js-open-map-filter').on('click', function() {
            $(this).parents('.js-welcome-search-map').toggleClass('open');;
        });

    }

    function customHamburger() {
        // custom hamburger

        $('#header_navbar').on('show.bs.collapse', function() {
            $('.header .js-hamburger').addClass('is-active');
        });

        $('#header_navbar').on('hide.bs.collapse', function() {
            $('.header .js-hamburger').removeClass('is-active');
        })

    }


    function hidePreloader() {
        jQuery(".js-preloader").fadeOut('slow');
    }



    function pageHelpderInit() {
        // WIDTH OF SCROLLBAR
        var widthOfScrollbar;

        function getScrollBarWidth() {
            var $outer = $('<div>').css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo('body'),
                widthWithScroll = $('<div>').css({ width: '100%' }).appendTo($outer).outerWidth();
            $outer.remove();
            widthOfScrollbar = 100 - widthWithScroll;
            return 100 - widthWithScroll;
        };

        getScrollBarWidth();

        $('.-JS_helper_click').on('click', function() {
            $(this).parents('.page-helper').toggleClass('-open');
            $('body').toggleClass('-no_scroll');

            if ($('body').css('padding-right') == widthOfScrollbar + 'px') {

                $('body').css('padding-right', '0px');

            } else {

                $('body').css('padding-right', widthOfScrollbar + 'px');

            }
            if ($('.js-header-bot').css('padding-right') == widthOfScrollbar + 'px') {

                $('.js-header-bot').css('padding-right', '0px');

            } else {
                $('.js-header-bot.-fixed').css('padding-right', widthOfScrollbar + 'px');

            }

        });
    }


    // PROGRESS BARS
    function progressBars(target, duration) {
        if (!target[0].progressBarsInit) {
            target[0].progressBarsInit = true;

            target.find('.js-progress-bar-item').each(function(index) {

                var progressBarPercent = $(this).find('.js-progress-bar-percent').attr('data-progress-percent');

                // progress bar fill animation
                $(this).find('.js-progress-bar-strip').animate({
                    width: progressBarPercent + '%'
                }, duration, 'swing');

                // count up animation
                var options = {
                    useEasing: false,
                    decimal: '.',
                    suffix: '%'
                };

                var numbersAfterComma;

                // find amount of numbers after the decimal point
                if (progressBarPercent.indexOf('.') > 0) {
                    numbersAfterComma = progressBarPercent.length - (progressBarPercent.indexOf('.') + 1);
                } else {
                    numbersAfterComma = 0;
                }

                var countUpElement = $(this).find('.js-progress-bar-percent').get(0),
                    numAnim = new CountUp(countUpElement, 0, progressBarPercent, numbersAfterComma, duration / 1000, options);

                numAnim.start();
            });
        }
    }



    function initLightBox() {

        $('.js-plans-lightbox').slickLightbox({
            itemSelector: '.img'
        });

        $('.js-gallery-block').slickLightbox({
            itemSelector: 'a'
        });

    }



    // SHUFFLE FILTER
    function filterInit(filterContainer) {

        if (filterContainer.length) {
            var filterMainContainer = filterContainer,
                filterContent = filterMainContainer.find('.filter-content'),
                filterNav = filterMainContainer.find('.filter-nav'),
                filterCategoryName = '',
                shuffle = window.shuffle;


            var myShuffle = new Shuffle(filterContent, {
                speed: 400,
                easing: 'ease',
            });



            myShuffle.update();

            // filtering by click
            filterNav.find('a').on('click', function() {

                filterNav.find('a').removeClass('active');
                $(this).addClass('active');
                filterCategoryName = $(this).attr('data-group');

                myShuffle.filter(filterCategoryName, shuffle);

                myShuffle.update();

            });
        }
    }

    function scrollHeader() {
        var distanceY = 10;

        $(window).on('scroll', function() {
            if ($(this).scrollTop() > distanceY) {
                $('.js-header').addClass('-scroll');
            } else {
                $('.js-header').removeClass('-scroll');
            }
        });

        if ($(document).scrollTop() > distanceY) {
            $('.js-header').addClass('-scroll');
        }

        // var lastScrollTop = 100;
        // $(window).scroll(function(event){
        //   var st = $(this).scrollTop();
        //   if (st > lastScrollTop){
        //      $('.js-header').addClass('hide');
        //   } else {
        //      $('.js-header').removeClass('hide');
        //   }
        //   lastScrollTop = st;
        // });


    }

    function rangeSlider() {

        if ($('#js-range-slider').length) {

            var slider = document.getElementById('js-range-slider');

            noUiSlider.create(slider, {
                start: [530, 4860],
                tooltips: true,
                connect: true,
                range: {
                    'min': 0,
                    'max': 10000
                },
                format: wNumb({
                    decimals: 3,
                    thousand: '.',
                    suffix: ' $',
                })
            });
        }

    };

    function sliderInit() {

        $('.js-flat-card-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            dots: true,
            arrows: false

        });

        $('.js-single-slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            asNavFor: '.js-single-slider-nav',
            arrows: true,
            infinite: false,
            nextArrow: '<span class="arrow arrow-next"><i class="icon-right-arrow"></i></span>',
            prevArrow: '<span class="arrow arrow-prev"><i class="icon-left-arrow"></i></span>',
        });

        $('.js-single-slider-for').slickLightbox({
            itemSelector: 'a'
        });

        $('.js-slider-resize').on('click', function() {
            $('.js-single-slider-for .item.slick-current a').click();
        });

        $('.js-single-slider-nav').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            asNavFor: '.js-single-slider-for',
            dots: false,
            focusOnSelect: true,
            arrows: false,
            responsive: [{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 3,
                    }
                },
            ]
        });


        $('.js-welcome-slider').slick({
            dots: true,
            arrows: true,
            nextArrow: '<span class="arrow arrow-next"><i class="icon-right-arrow"></i></span>',
            prevArrow: '<span class="arrow arrow-prev"><i class="icon-left-arrow"></i></span>',
            swipe: false,
            responsive: [{
                    breakpoint: 1300,
                    settings: {
                        arrows: false
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        swipe: true,
                        arrows: false,
                        autoplay: true,
                        autoplaySpeed: 2000,
                    }
                },
            ]
        });

        $('.js-testimonials-slider').slick({
            dots: true,
            arrows: true,
            nextArrow: '<span class="arrow arrow-next"><i class="icon-right-arrow"></i></span>',
            prevArrow: '<span class="arrow arrow-prev"><i class="icon-left-arrow"></i></span>',
            swipe: false,
            responsive: [{
                breakpoint: 991,
                settings: {
                    swipe: true,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 2000,
                }
            }, ]
        });

    }

    function videoComponent() {
        $('.js-video-block').on('click', function() {
            $(this).find('.video-block').fadeOut("fast");
            $(this).addClass('active');
            var iframe = $(this).find('iframe');
            iframe.attr("src", iframe.data("src"));
        });

        $(document).on("mouseenter", ".video-block_play", function() {

            var parent = $(this).parents('.js-video-block');

            console.log(parent);


            TweenMax.to("#circle circle", 2, {
                strokeDashoffset: 100,
                ease: Power2.easeInOut,
                onComplete: function e() {

                    parent.find('.video-block').fadeOut("fast");
                    parent.addClass('active');
                    var iframe = parent.find('iframe');
                    iframe.attr("src", iframe.data("src"));

                }
            }), TweenMax.fromTo(".video-block_play_title", .2, {
                x: "28px",
                opacity: 0
            }, {
                x: "0px",
                opacity: 1,
                ease: Power2.easeOut

            });

            $(document).on("mouseleave", ".video-block_play", function() {


                TweenMax.to("#circle circle", .2, {
                    strokeDashoffset: 515,
                    ease: Power2.easeInOut
                }), TweenMax.to(".video-block_play_title", .2, {
                    x: "20px",
                    opacity: 0,
                    ease: Power2.easeIn
                })
            });

        });

    }

    function scrollTop() {
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 100) {
                $('.js-scroll-top-btn').addClass('-show');
            } else {
                $('.js-scroll-top-btn').removeClass('-show');
            }
        });

        $('.js-scroll-top').on('click', function() {
            $('body,html').animate({
                scrollTop: 0
            }, 1000);

            return false;
        });
    }
    // STICKY FOOTER
    function stickyFooter() {
        // 1) height of footer
        var footerHeight = $('.js-footer').outerHeight();

        // 2) compensation
        $('.js-wrap-for-sticky').css({
            'padding-bottom': footerHeight
        });
    }


    function smoothScrollInit() {

        var animationComplete = true;

        $('a[href^="#"]:not(.js-no-scroll)').on('click', function(e) {
            e.preventDefault();

            // height of header (for offset)
            var headerOffset = $('.js-header').outerHeight(),
                idOfElement = $(this).attr('href');


            if ($(window).width() <= 991) {
                $('.navbar-collapse').collapse('hide');
            }
            if (headerOffset === undefined) {
                headerOffset = 0;
            }

            var top = $(idOfElement).offset().top - headerOffset;

            if (animationComplete) {
                animationComplete = false;

                $('body,html').animate({
                    scrollTop: top
                }, 1000).promise().done(function() {
                    animationComplete = true;
                });
            }
        });
    }

    function initGoogleMap() {
        // // google maps

        if ($('#js-search-map').length) {
            var myCenter = new google.maps.LatLng(51.508742, -0.120850);
            var mapProp = {
                center: myCenter,
                zoom: 15,
                scrollwheel: false,
                disableDefaultUI: true,
                zoomControl: true,
                fullscreenControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER
                }
            };
            var map = new google.maps.Map(document.getElementById("js-search-map"), mapProp);
            var marker = new google.maps.Marker({
                position: myCenter,
                icon: "../img/map-marker.png"
            });
            marker.setMap(map);

        }
        if ($('#js-search-map_2').length) {
            var myCenter = new google.maps.LatLng(51.508742, -0.120850);
            var mapProp = {
                center: myCenter,
                zoom: 15,
                scrollwheel: false,
                disableDefaultUI: true,
                zoomControl: true,
                fullscreenControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER
                }
            };
            var map = new google.maps.Map(document.getElementById("js-search-map_2"), mapProp);
            var marker = new google.maps.Marker({
                position: myCenter,
                icon: "../img/map-marker.png"
            });
            marker.setMap(map);
        }



    }

    function initMapMultipleMarkers() {

        if ($('#js-search-map-style-2').length) {

            var locations = [
                ['New York', 40.745050, -73.997533, 5],
                ['Kanzas City', 39.142629, -94.539157, 5],
                ['Kanzas City', 39.142629, -94.532957, 5],
                ['Kanzas City', 39.142629, -94.533957, 5],
                ['Kanzas City', 39.142629, -95.539957, 5],
                ['Los Angeles', 34.507358, -118.300492, 5],
                ['Mexica', 19.416188, -99.220221, 5],
                ['Winnipeg', 49.896860, -97.134290, 5],
                ['Seatle', 47.605938, -122.317904, 5],
            ];

            var map = new google.maps.Map(document.getElementById('js-search-map-style-2'), {
                disableDefaultUI: true,
                zoomControl: true,
                fullscreenControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
                zoom: 4,
                center: new google.maps.LatLng(39.142629, -85.539157),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var infowindow = new google.maps.InfoWindow();

            var marker, i;

            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map,
                    icon: "./img/map-marker.png"
                });

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent(locations[i][0]);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        }
    }

    function mapDragFilterInit() {


        interact('.js-drag-n-drop')
            .draggable({
                // enable inertial throwing
                inertia: true,
                ignoreFrom: '.form-group',
                // keep the element within the area of it's parent
                restrict: {
                    restriction: ".search-map",
                    endOnly: true,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                },
                // enable autoScroll
                autoScroll: true,

                // call this function on every dragmove event
                onmove: dragMoveListener,
                // call this function on every dragend event
                onend: function(event) {
                    var textEl = event.target.querySelector('p');

                    textEl && (textEl.textContent =
                        'moved a distance of ' +
                        (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                            Math.pow(event.pageY - event.y0, 2) | 0))
                        .toFixed(2) + 'px');
                }
            });

        function dragMoveListener(event) {
            var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }

        // this is used later in the resizing and gesture demos
        window.dragMoveListener = dragMoveListener;

    }

}(jQuery));