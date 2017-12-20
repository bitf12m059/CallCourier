$(document).ready(function () {

    $("#UpdateShipperAdviceForm").hide();
});

var printCN = function (url) {
    window.open(url, '_blank');
};

var getLoadSheet = function () {

    showLoader('In Progress..Please wait!', 'warning');
    var dateFrom = $("#dateFrom").val();
    var dateTo = $("#dateTo").val();
    var url = $("#getLoadSheet").attr("href");
    if (dateFrom !== "" && dateTo !== "") {
        $.ajax({
            url: url,
            type: "POST",
            data: { dateFrom: dateFrom + "", dateTo: dateTo },
            success: function (msg) {
                if (msg === "true") {
                    window.open('NewLoadSheetData', '_blank');
                    hideLoader();
                }
            }
        });
    } else {
        AutoLoader("Please enter date..", "error");
    }

};
var getDatafromFile = function () {
    var url = $("#getMyBookingsGoGreen").attr("href");
    var filePath = $('#filePath').val();
    if (filePath !== "") {
        $.ajax({
            url: url,
            type: "POST",
            data: { filePath: filePath },
            success: function (msg) {
                if (msg === "true") {
                    window.open('NewLoadSheetData', '_blank');
                    hideLoader();
                }
            }
        });
    } else {
        AutoLoader("Please enter date..", "error");
    }

}
var getShipperRecord = function (myclickCn)
{
    var CNNO, CNStatus, reasonStatus, branchRemarks, ReasonCode, OtherInst, CallbackTime;
    var url = $("#UshipperAdvice").attr("href");
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].onclick = function () {
            var rowTD = this.getElementsByTagName('td');
            CNNO = rowTD[0].textContent; CNStatus = rowTD[1].textContent; reasonStatus = rowTD[2].textContent;
            branchRemarks = rowTD[3].textContent; ReasonCode = rowTD[4].textContent; OtherInst = rowTD[5].textContent;
            CallbackTime = rowTD[6].textContent;
            
            $("#cnno").val(CNNO);
            $("#CNStatus").val(CNStatus);
            $("#reasonStatus").val(reasonStatus);
            $("#BranchRemarks").val(branchRemarks);
            $("#ReasonCode").val(ReasonCode);
            $("#OtherInst").val(OtherInst);
            $("#callbackTime").val(CallbackTime);
            $("#UshipperAdviceDiv").hide();
            $("#UpdateShipperAdviceForm").show();
            
        };
    }
}
var getMyBookingsNew = function (pageno) {

    if (pageno === undefined) {
        pageno = 1;
    }
    var takeRecords = $("#drpTake option:selected").val();
    var old = 1;

    $("#hidPageno").val(pageno);
    var dateFrom = $("#dateFrom").val();
    var dateTo = $("#dateTo").val();
    var CNNOFrom = $("#CNNfrom").val().trim();
    var CNNOTo = $("#CNNTo").val().trim();

    var sCNNOFrom = $("#sCNNfrom").val().trim();
    var sCNNOTo = $("#sCNNTo").val().trim();
    showLoader('In Progress..Please wait!', 'warning');
    var url = $("#getMyBookingsGoGreen").attr("href");
    $.ajax({
        url: url,
        type: "POST",
        data: { dateFrom: dateFrom + "", dateTo: dateTo, pageno: pageno + "", takeRecords: takeRecords + "", old: old, CNNOFrom: CNNOFrom, CNNOTo: CNNOTo, sCNNOFrom: sCNNOFrom, sCNNOTo: sCNNOTo },
        success: function (msg) {

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
            document.getElementById('sCNNfrom').value = null;
            document.getElementById('CNNfrom').value = null;
            document.getElementById('sCNNTo').value = null;
            document.getElementById('CNNTo').value = null;
        }
    });
};
var getUpdateShipperRecord = function () {
    showLoader('Shipper Advice in progress.. Please wait!', 'warning');
    var CNNO= $("#cnno").val();
    var CNStatus= $("#CNStatus").val();
    var reasonStatus=$("#reasonStatus").val();
    var branchRemarks=$("#BranchRemarks").val();
    var ReasonCode= $("#ReasonCode").val();
    var OtherInst= $("#OtherInst").val();
    var CallbackTime = $("#callbackTime").val();
    var url = $("#UshipperAdvice").attr("href");
    $.ajax({
        url: url,
        type: "POST",
        data: { CNNO: CNNO + "", CNStatus: CNStatus, reasonStatus: reasonStatus + "", branchRemarks: branchRemarks + "", ReasonCode: ReasonCode, OtherInst: OtherInst, CallbackTime: CallbackTime },
        success: function (msg) {

            if (msg === "true") {
                window.open('ShipperAdvice', '_blank');
                hideLoader();
            }
        }
    });
};

var printSelectedSheet = function () {

    var dateFrom = $("#dateFrom").val();
    var dateTo = $("#dateTo").val();


    var ids = [];
    $("#myBookingCollection .chk_").each(function () {
        var hasClass = $(this).parent("span").hasClass("checked");
        if (hasClass) {
            ids.push($(this).attr("id"));
        }
    });
    if (ids.length !== 0) {
        var saveCnsUrl = $("#hidSaveSheets").val();
        $.ajax({
            url: saveCnsUrl,
            type: "POST",
            data: { cns: ids + "", dateFrom: dateFrom + "", dateTo: dateTo },
            success: function (msg) {
                if (msg === "true") {
                    var openUrl = $("#hidPrintSelectedLoadsheet").val();
                    var openUrlWithParameter = openUrl;
                    window.open(openUrlWithParameter, '_blank');
                } else {
                    AutoLoader("Sorry! Some error is occured....", "error");
                }
            }
        });
    } else {
        AutoLoader("Sorry! No CNNo is selected....", "error");
    }
};

var printSelectedCns = function () {
    var ids = [];
    $("#myBookingCollection .chk_").each(function () {
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
                    AutoLoader("Sorry! Some error is occured....", "error");
                }
            }
        });
    } else {
        AutoLoader("Sorry! No CNNo is selected....", "error");
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
    $(".chk_").each(function (index, el) {
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




