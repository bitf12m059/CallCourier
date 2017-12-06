jQuery(document).ready(function () {
    $("#MyBookings").addClass('active');
    //var currentdate = new Date();
    //var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
    //var totime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
    $("#sample_2_filter").addClass("pull-right");
    $("#sample_2_paginate").addClass("pull-right");
    getMyBookings();
    
    $("#dateFrom").datepicker({
        format: 'dd/mm/yyyy'
        //startDate: '-100d'   => It is for the start date means User will access the start date 
    }).on('changeDate', function (ev) {
        var dateFrom = $("#dateFrom").val();
        var dateTo = $("#dateTo").val();
        getMyBookings();
        $(this).datepicker('hide');
    });
    $("#dateTo").datepicker({
        format: 'dd/mm/yyyy'
    }).on('changeDate', function (ev) {
        var dateFrom = $("#dateFrom").val();
        var dateTo = $("#dateTo").val();

        getMyBookings();
        $(this).datepicker('hide');
    });
    $("#sample_2").DataTable();
});

var printCN = function(url) {
    window.open(url, '_blank');
};

var getLoadSheet = function() {
    showLoader('In Progress..Please wait!', 'warning');
    var dateFrom = $("#dateFrom").val();
    var dateTo = $("#dateTo").val();
    var url = $("#getLoadSheet").attr("href");
    if (dateFrom !== "" && dateTo !== "") {
        $.ajax({
            url: url,
            type: "POST",
            data: { dateFrom: dateFrom + "", dateTo: dateTo },
            success: function(msg) {
                if (msg === "true") {
                    window.open('LoadSheetData', '_blank');
                    hideLoader();
                }
            }
        });
    } else {
        AutoLoader("Please enter date..", "error");
    }

};

var getMyBookings = function(pageno) {

    if (pageno === undefined) {
        pageno = 1;
    }
    var takeRecords = $("#drpTake option:selected").val();

    $("#hidPageno").val(pageno);
    var dateFrom = $("#dateFrom").val();
    var dateTo = $("#dateTo").val();
    showLoader('In Progress..Please wait!', 'warning');
    var url = $("#getMyBookings").attr("href");
    $.ajax({
        url: url,
        type: "POST",
        data: { dateFrom: dateFrom + "", dateTo: dateTo, pageno: pageno + "", takeRecords: takeRecords + "" },
        success: function(msg) {
            $("#myBookingCollection").html(msg);
            $("#sample_2").DataTable({
                paging: false,
                "order": [[1, "desc"]],
                columnDefs: [
                    { orderable: false, targets: 0 }
                ]
            });
            Metronic.init();
            //Layout.init();
            hideLoader();
        }
    });
};

var cancelBooking = function(url) {
    showLoader('Cancellation in progress.. Please wait!', 'warning');
    $.ajax({
        url: url,
        type: "POST",
        success: function(msg) {
            if (msg != "false") {
                $("#" + msg).html('<span class="label label-danger">Cancelled</span>');
                AutoLoader("Bookoing cancelled successfully..", "success");
            }
        }
    });
};

var printSelectedCns = function() {
    var ids = [];
    $("#myBookingCollection .chk_").each(function() {
        var hasClass = $(this).parent("span").hasClass("checked");
        if (hasClass) {
            ids.push($(this).attr("id"));
        }
    });
    if (ids.length !== 0) {
        var saveCnsUrl = $("#hidSaveCns").val();
        $.ajax({
            url: saveCnsUrl,
            type: "POST",
            data: { cns: ids + "" },
            success: function (msg) {
                if (msg === "true") {
                    var openUrl = $("#hidPrintSelectedCn").val();
                    var openUrlWithParameter = openUrl;
                    window.open(openUrlWithParameter, '_blank');
                } else {
                    AutoLoader("Sorry! Some error is occured....","error");
                }
            }
        });
    } else {
        AutoLoader("Sorry! No CNNo is selected....","error");
    }
};

var selectAll = function (all) {
    if ($(all).is(":checked")) {
        $(".chk_").each(function () {
            $(this).checked = true;
            $(this).parent("span").addClass("checked");
        });
    } else {
        $(".chk_").each(function () {
            $(this).checked = false;
            $(this).parent("span").removeClass("checked");
        });
    }
};

var checkingSelectAll = function () {
    var chkLength = $(".chk_").length;
    var checkedLength = 0;
    $(".chk_").each(function(index,el) {
        var chked = $(el).parent("span").hasClass("checked");
        if (chked) {
            checkedLength = checkedLength + 1;
        }
    });

    if (chkLength === checkedLength) {
        $("#chkSelectAll").checked = true;
        $("#chkSelectAll").parent("span").addClass("checked");
    } else {
        $("#chkSelectAll").checked = false;
        $("#chkSelectAll").parent("span").removeClass("checked");
    }
};
var exportList = function () {
    var dateFrom = $("#dateFrom").val();
    var dateTo = $("#dateTo").val();
    var param = dateFrom + "," + dateTo;
    $("#parameters").val(param);
    $("#formExportMyBookings").submit();
};




