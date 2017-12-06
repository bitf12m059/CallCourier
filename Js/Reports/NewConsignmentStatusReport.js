jQuery(document).ready(function () {
    $("#Reports").addClass('active');
    $("#hidRadio").val("Summary");
    $("#dateFrom").datepicker({
        format: 'dd/mm/yyyy'
    }).on('changeDate', function (ev) {
        $(this).datepicker('hide');
        getConStatusReport();
    });
    $("#dateTo").datepicker({
        format: 'dd/mm/yyyy'
    }).on('changeDate', function (ev) {
        $(this).datepicker('hide');
        getConStatusReport();
    });
    getConStatusReport();
});

var getConStatusReport = function (pageno, summaryType) {
    if (pageno === undefined) {
        pageno = 1;
    }
    var val = "";
    var vv = $("#chkDetails").is(':checked');

    if (vv) {
        val = "Detail";
    } else {
        val = "Summary";
        $("#hidSearchPaging").val("");
    }
    var takeRecord = $("#drpTake option:selected").val();
    var neworold = 1;
    var ssss = $("#hidSearchPaging").val();
    if (ssss !== "") {
        summaryType = ssss;
    } else if (summaryType !== "" && summaryType !== undefined) {
        $("#hidSearchPaging").val(summaryType);
        val = "Detail";
        $("#chkSummary").prop("checked", false); //.parent().removeClass('checked');
        $("#chkDetails").prop("checked", true); //.parent().addClass('checked');

        $("#chkSummary").parent().removeClass('checked');
        $("#chkDetails").parent().addClass('checked');
    }
    var searchBy = $("#searchBy :selected").val();
    var url = $("#getReportUrl").attr("href");
    var dateFrom = $("#dateFrom").val();
    var dateTo = $("#dateTo").val();
    var searchText = $("#searchText").val();
    if (searchText !== "" && searchBy === "0") {
        AutoLoader("Please select search type...", "warning");
    } else {
        if (val === "Summary") {
            showLoader('In Progress..Please wait!', 'warning');
            $.ajax({
                url: url,
                type: "GET",
                data: {
                    dateFrom: dateFrom + "",
                    dateTo: dateTo + "",
                    type: val + "",
                    searchText: searchText + "",
                    summaryType: summaryType + "",
                    searchBy: searchBy + "",
                    pageno: pageno + "",
                    takeRecord: takeRecord + "",
                    neworold: neworold
                },
                success: function (msg) {
                    if (searchBy === "1") {
                        $("#searchByItemName").html("Consignee Name");
                    } else if (searchBy === "2") {
                        $("#searchByItemName").html("CNNo");
                    } else if (searchBy === "3") {
                        $("#searchByItemName").html("Contact Number");
                    }
                    $("#myBookingCollection").html(msg);
                    $("#sample_2").DataTable({
                        paging: false,
                        "order": [[1, "desc"]]
                    });
                    hideLoader();
                }
            });
        }
        else if (val === "Detail" && searchText === "") {
            showLoader('In Progress..Please wait!', 'warning');
            $.ajax({
                url: url,
                type: "GET",
                data: {
                    dateFrom: dateFrom + "",
                    dateTo: dateTo + "",
                    type: val + "",
                    searchText: searchText + "",
                    summaryType: summaryType + "",
                    searchBy: searchBy + "",
                    pageno: pageno + "",
                    takeRecord: takeRecord + "",
                    neworold: neworold
                },
                success: function (msg) {
                    if (searchBy === "1") {
                        $("#searchByItemName").html("Consignee Name");
                    } else if (searchBy === "2") {
                        $("#searchByItemName").html("CNNo");
                    } else if (searchBy === "3") {
                        $("#searchByItemName").html("Contact Number");
                    }
                    $("#myBookingCollection").html(msg);
                    $("#sample_2").DataTable({
                        paging: false,
                        "order": [[1, "desc"]]
                    });
                    hideLoader();
                }
            });
        }
        else if (val === "Detail" && searchText.length > 3) {
            showLoader('In Progress..Please wait!', 'warning');
            $.ajax({
                url: url,
                type: "GET",
                data: {
                    dateFrom: dateFrom + "",
                    dateTo: dateTo + "",
                    type: val + "",
                    searchText: searchText + "",
                    summaryType: summaryType + "",
                    searchBy: searchBy + "",
                    pageno: pageno + "",
                    takeRecord: takeRecord + ""
                    , neworold: neworold
                },
                success: function (msg) {
                    if (searchBy === "1") {
                        $("#searchByItemName").html("Consignee Name");
                    } else if (searchBy === "2") {
                        $("#searchByItemName").html("CNNo");
                    } else if (searchBy === "3") {
                        $("#searchByItemName").html("Contact Number");
                    }
                    $("#myBookingCollection").html(msg);
                    $("#sample_2").DataTable({
                        paging: false,
                        "order": [[1, "desc"]]
                    });
                    hideLoader();
                }
            });
        }


    }

};

var getDetailGrid = function (event) {
    showLoader('In Progress..Please wait!', 'warning');
    var searchText = $("#searchText").val();
    var summaryType = $(event).attr("id");
    var url = $("#getReportUrl").attr("href");
    var dateFrom = $("#dateFrom").val();
    var dateTo = $("#dateTo").val();
    var searchBy = $("#searchBy :selected").val();
    $.ajax({
        url: url,
        type: "GET",
        data: {
            dateFrom: dateFrom + "",
            dateTo: dateTo + "",
            type: "Detail" + "",
            searchText: searchText + "",
            summaryType: summaryType + "",
            searchBy: searchBy + ""
        },
        success: function (msg) {
            $("#myBookingCollection").html(msg);
            $("#sample_2").DataTable({
                paging: false
            });
            $("#chkDetails").parent().addClass('checked');
            $("#chkSummary").parent().removeClass('checked');
            hideLoader();
        }
    });
};

var exportList = function () {
    var val = "";
    var vv = $("#chkDetails").is(':checked');
    if (vv) {
        val = "Detail";
    } else {
        val = "Summary";
    }
    var summaryType = $("#hidSearchPaging").val();
    var dateFrom = $("#dateFrom").val();
    var dateTo = $("#dateTo").val();

    var param = dateFrom + "," + dateTo + "," + val + "," + summaryType;
    $("#parameters").val(param);
    $("#formExport").submit();
};