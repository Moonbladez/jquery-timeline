/*  JavaScript Document                      */


let timelineWidth = 0;
let panelWidth = 0;
let firstRun = true;
let totalPanels = 0;
let currentPanel = 0;

$(document).ready(function () {
    panelWidth = $(".timeline .panel").width();
    timelineWidth = $(".timeline").width();
    totalPanels = $(".timeline .panel").length;
    adjustLayout();
    setInterval(checkWindowSize, 1000);
});

function adjustLayout() {
    $(".timeline .panel").each(function (index) {
        let newX = panelWidth * index;
        $(this).css("left", newX + "px");

        let newLabel = $(this).find(".label").html();
        $(".timeline nav").append('<a href="#">' + newLabel + "</a>");
    });

    currentPanel = $(".timeline nav a:last-child()").index();

    activateNavigation();


}

function activateNavigation() {
    $(".timeline nav a").on("click", function () {
        currentPanel = $(this).index();
        timelineWidth = $(".timeline").width();

        $(".timeline nav a").removeClass("selected");
        $(this).addClass("selected");

        let timelineOffset = (timelineWidth - panelWidth) * .5;
        let newPosition = ((currentPanel * panelWidth) * -1) + timelineOffset;

        $(".panel_slider").animate({
            left: newPosition + "px"
        }, 1000);

        let backgroundWidth = $(".timeline .background_slider img").width();
        let moveAmount = (backgroundWidth - timelineWidth) / totalPanels;

        if (currentPanel != 0) {
            var multiplier = currentPanel + 1;
        } else {
            var multiplier = 0;
        }
        let newBackgroundPosition = (moveAmount * multiplier) * -1;
        $(".background_slider img.background").animate({
            left: newBackgroundPosition + "px"
        }, 1000);


    });

} /* function activateNavigation */


function checkWindowSize() {
    var newTimelineWidth = $(".timeline").width();

    timelineWidth = newTimelineWidth;

    if (firstRun == true) {
        $(".timeline nav a:nth-child(" + (currentPanel + 1) + ")").trigger("click");
        firstRun = false;
    }
}