// Home Page 1 

$(function () {
    var owl = $('.featured-products-con .owl-carousel');

    function initializeCarousel(marginValue) {
        owl.owlCarousel('destroy'); // Destroy existing instance if any
        owl.owlCarousel({
            margin: marginValue,
            nav: false,
            loop: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4500,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 3
                },
                1450: {
                    items: 4
                }
            }
        });
    }

    function adjustMargin() {
        if (window.innerWidth <= 1200) {
            initializeCarousel(15);
        } else if (window.innerWidth <= 991) {
            initializeCarousel(20);
        } else {
            initializeCarousel(30); // Default margin for larger screens
        }
    }

    // Initial call to set the correct margin
    adjustMargin();

    // Adjust carousel on window resize
    $(window).on('resize', function () {
        adjustMargin();
    });
});



$(document).ready(function () {
    var owl = $('.testimonials-con .owl-carousel');
    owl.owlCarousel({
        margin: 30,
        nav: false,
        loop: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 4500,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            }
        }
    })
})

$(document).ready(function () {
    var owl = $('.explore-products .owl-carousel');
    owl.owlCarousel({
        margin: 30,
        nav: false,
        loop: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 4500,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    })
})
$(document).ready(function () {
    // Button click -> trigger hidden file input
    $("#uploadBtn").click(function () {
        $("#fileInput").click();
    });

    // Show selected file name
    $("#fileInput").change(function () {
        let file = this.files[0];
        if (file) {
            $("#fileName").text("Selected file: " + file.name);
        } else {
            $("#fileName").text("");
        }
    });
});