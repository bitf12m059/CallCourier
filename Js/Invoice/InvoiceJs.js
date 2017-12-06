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


var getCodPendingCash = function () {
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

        var url = $("#rptCodPendingCnCash").attr("href");


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

        var url = $("#rptPendingCODPayment").attr("href");

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

var getDetailInvoice = function () {

    showLoader('In Progress..Please wait!', 'warning');
    var invoiceId = $("#InvoiceIdHidden").val();
 
    var url = $("#invoiceDetails").attr("href");
    //var url = $("#rptPendingCODPayment").attr("href");

    if (invoiceId !== "") {
        alert(invoiceId);
        $.ajax({
            url: url,
            type: "Get",
            data: { id: invoiceId },
            success: function (msg) {
                
                alert(invoiceId + 'success');
                alert(url);
                //if (msg === "true") {
                //    //window.open('LoadSheetData', '_blank');
                //window.open(url, '_blank');
                $("#myBookingCollection").html(msg);
                //$("#sample_2").DataTable({
                //    paging: false
                //});
                hideLoader();
                //}
            }
        });
    } else {
        AutoLoader("Please enter date..", "error");
    }

};








