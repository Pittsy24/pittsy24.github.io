var scrollTime = 500; // Time to scroll to the element in ms

// Select all links with hashes
$('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top,
                    },
                    scrollTime,
                    function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) {
                            // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                    }
                );
            }
        }
    });

var osH1 = new OnScreen({
    tolerance: 300,
    debounce: 0,
    container: window,
});

var osH2 = new OnScreen({
    tolerance: 100,
    debounce: 0,
    container: window,
});

var visible = [true, false, false];

osH1.on("leave", "#intro_text h1", (element, event) => {
    visible[0] = false;
    console.log("Introduction Gone!");
    $("#site_navigation *").removeClass("menuHighlight");
    $($("#site_navigation li>a")[1]).addClass("menuHighlight");
});

osH1.on("enter", "#intro_text h1", (element, event) => {
    visible[0] = true;
    console.log("Introduction Back!");
    $("#site_navigation *").removeClass("menuHighlight");
    $($("#site_navigation li>a")[0]).addClass("menuHighlight");
});

osH2.on("leave", "#about_me h2", (element, event) => {
    visible[1] = false;
    console.log("About Me Gone!");
    $("#site_navigation *").removeClass("menuHighlight");
    $($("#site_navigation li>a")[2]).addClass("menuHighlight");
});

osH2.on("enter", "#about_me h2", (element, event) => {
    visible[1] = true;
    console.log("About Me Back!");
    if (!visible[0]) {
        $("#site_navigation *").removeClass("menuHighlight");
        $($("#site_navigation li>a")[1]).addClass("menuHighlight");
    }
});

osH2.on("leave", "#my_skills h2", (element, event) => {
    visible[2] = false;
    if (!visible[1]) {
        $("#site_navigation *").removeClass("menuHighlight");
        $($("#site_navigation li>a")[3]).addClass("menuHighlight");
    }

    console.log("My Skills Gone!");
});
osH2.on("enter", "#my_skills h2", (element, event) => {
    visible[2] = true;
    console.log("My Skills Back!");
    if (!visible[2]) {
        $("#site_navigation *").removeClass("menuHighlight");
        $($("#site_navigation li>a")[2]).addClass("menuHighlight");
    }
});
