jQuery(document).ready(function () {
    $("#MyBookings").addClass('active');

    $("#dateFrom").datepicker({
        format: 'dd/mm/yyyy'
        //startDate: '-100d'   => It is for the start date means User will access the start date 
    }).on('changeDate', function (ev) {
        var dateFrom = $("#dateFrom").val();
        var dateTo = $("#dateTo").val();
        $(this).datepicker('hide');
    });
    $("#dateTo").datepicker({
        format: 'dd/mm/yyyy'
    }).on('changeDate', function (ev) {
        var dateFrom = $("#dateFrom").val();
        var dateTo = $("#dateTo").val();

        $(this).datepicker('hide');
    });
    //$("#sample_2").DataTable();
});



var getBookingStatusDetail = function () {

    showLoader('In Progress..Please wait!', 'warning');
    var dateFrom = $("#dateFrom").val();
    var dateTo = $("#dateTo").val();
    var client = $("#branch :selected").val();
    var url = $("#rptGetBookingStatusDetail").attr("href");
    //var url = $("#rptPendingCODPayment").attr("href");

    if (dateFrom !== "" && dateTo !== "" && client !== "") {
        $.ajax({
            url: url,
            type: "Get",
            data: { dateFrom: dateFrom + "", dateTo: dateTo, client: client },
            success: function (msg) {

                //if (msg === "true") {
                //    //window.open('LoadSheetData', '_blank');
                $("#myBookingCollection").html(msg);
                hideLoader();
                //}
            }
        });
    } else {
        AutoLoader("Please enter date..", "error");
    }

};

var getClientBusinessCODPayment = function () {

    showLoader('In Progress..Please wait!', 'warning');
    var dateFrom = $("#dateFrom").val();
    var dateTo = $("#dateTo").val();
    var client = $("#branch :selected").val();
    var val = "";
    var vv = $("#chkSummary").is(':checked');

    if (vv) {
        val = "Summary";
    } else {
        val = "Detail";
    }
    if (val === "Summary") {

        var url = $("#rptClientBusinessCODPaymentSummary").attr("href");


        if (dateFrom !== "" && dateTo !== "" && client !== "") {
            $.ajax({
                url: url,
                type: "Get",
                data: { dateFrom: dateFrom + "", dateTo: dateTo, client: client },
                success: function (msg) {

                    $("#myBookingCollection").html(msg);
                    //$("#sample_2").DataTable({
                    //    paging: false,
                    //    "order": [[1, "desc"]],
                    //    columnDefs: [
                    //        { orderable: false, targets: 0 }
                    //    ]
                    //});
                    hideLoader();
                    //}
                }
            });
        } else {
            AutoLoader("Please enter date..", "error");
        }

    };
    if (val === "Detail") {

        var url = $("#rptClientBusinessCOD").attr("href");

        if (dateFrom !== "" && dateTo !== "" && client !== "") {
            $.ajax({
                url: url,
                type: "Get",
                data: { dateFrom: dateFrom + "", dateTo: dateTo, client: client },
                success: function (msg) {

                    $("#myBookingCollection").html(msg);
                    hideLoader();
                    //}
                }
            });
        } else {
            AutoLoader("Please enter date..", "error");
        }

    };

};


var getCodPendingCashDelivery = function () {
    showLoader('In Progress..Please wait!', 'warning');
    var dateFrom = $("#dateFrom").val();
    var dateTo = $("#dateTo").val();
    var client = $("#branch :selected").val();
    var val = "";
    var vv = $("#chkCnCash").is(':checked');

    if (vv) {
        val = "Cash";
    } else {
        val = "Payment";
    }
    if (val === "Cash") {

        var url = $("#rptCodPendingCnCashDelivery").attr("href");


        if (dateFrom !== "" && dateTo !== "" && client !== "") {
            $.ajax({
                url: url,
                type: "Get",
                data: { dateFrom: dateFrom + "", dateTo: dateTo, client: client },
                success: function (msg) {

                    $("#myBookingCollection").html(msg);
                    hideLoader();
                    //}
                }
            });
        } else {
            AutoLoader("Please enter date..", "error");
        }

    };
    if (val === "Payment") {
        var url = $("#rptPendingCODPaymentDelivery").attr("href");

        if (dateFrom !== "" && dateTo !== "" && client !== "") {
            $.ajax({
                url: url,
                type: "Get",
                data: { dateFrom: dateFrom + "", dateTo: dateTo, client: client },
                success: function (msg) {

                    $("#myBookingCollection").html(msg);
                    hideLoader();
                    //}
                }
            });
        } else {
            AutoLoader("Please enter date..", "error");
        }

    };

}


var getSaleInvoiceSummary = function () {
    alert('getCodPendingCashDelivery');
    showLoader('In Progress..Please wait!', 'warning');
    var dateFrom = $("#dateFrom").val();
    var dateTo = $("#dateTo").val();
    var client = $("#branch :selected").val();
    var codamount = $("#codAmount").val();
    var totalReceiveableInclGST = $("#TotalReceiveableInclGST").val();
    var netReceiveable = $("#NetReceiveable").val();
    var val = "";

    var url = $("#rptSaleInvoiceSummary").attr("href");


    if (dateFrom !== "" && dateTo !== "" && client !== "" && codamount !== "") {
        $.ajax({
            url: url,
            type: "Get",
            data: { dateFrom: dateFrom + "", dateTo: dateTo, client: client, codAmount: codamount, Receiveable: totalReceiveableInclGST, NetReceiveable: netReceiveable },
            success: function (msg) {

                $("#myBookingCollection").html(msg);
                hideLoader();
                //}
            }
        });
    } else {
        AutoLoader("Please enter date..", "error");
    }

};



