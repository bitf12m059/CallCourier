$(document).ready(function () {
    
    Metronic.init(); // init metronic core components
    Layout.init(); // init current layout
    Demo.init(); // init demo features
    //TableManaged.init();
    $('#Dashboard').addClass('active');
    getNewsFeeds();
    //getRecentBooking();
});

var printCN = function(url) {
    window.open(url, '_blank');
    AutoLoader("CN opened in new window..", "success");
};
var cancelBooking = function(url) {
    showLoader("Booking cancellation in progress.. Please wait!", "warning");
    $.ajax({
        url: url,
        type: "POST",
        success: function(msg) {
            if (msg !== "false") {
                $("#" + msg).html('<span class="label label-danger">Cancelled</span>');
                AutoLoader("Bookoing cancelled successfully..", "success");
            }
        }
    });
};

var getRecentBooking = function() {
    showLoader("Please wait....!", "warning");
    var reBookUrl = $("#hidRecentBooking").val();
    $.ajax({
        url: reBookUrl,
        type: "POST",
        success: function (msg) {
            hideLoader();
            $("#divRecentBookings").html(msg);
        }
    });
};

var getNewsFeeds = function () {
    
    showLoader("Please wait....!", "warning");
    var reBookUrl = $("#idFeeds").val();
    
    $.ajax({
        url: reBookUrl,
        type: "GET",
        success: function (msg) {
            hideLoader();
            $("#divNewsFeed").html(msg);
            }
    });
};