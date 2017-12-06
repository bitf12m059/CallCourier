$(document).ready(function () {

    alert("in document");



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
    //var url = $("#rptSaleInvoiceSummary").attr("href");
    //$.ajax({
    //    url: url,
    //    type: "Get",
    //    data: { dateFrom: "05/08/2016" + "", dateTo: "05/08/2016", client: 321659, codAmount: 0, Receiveable: 0, NetReceiveable: 0, datecheck: 0 },
    //    success: function (msg) {
    //        alert("first ajax");
    //        $("#myBookingCollection").html(msg);
    //        hideLoader();
    //        //}
    //    }
    //});


   

  


});
//function closeProductOverlay(event) {
//    alert("focusin");
//    //$("#codAmount").attr('disabled', false);

//    $("#codAmount").prop('disabled', false);
//    $("#TotalReceiveableInclGST").prop('disabled', true);
//    $("#NetReceiveable").prop('disabled', true);
//}

$("#tempdivcodAmount").attr('style', 'position:absolute;left:0; right:0; top:0; bottom:0;');
$("#tempdivcodAmount").click(function () {
    alert("focusin");
    $("#codAmount").removeAttr('readonly');
    $("#tempdivcodAmount").attr('style', 'position:relative;left:0; right:0; top:0; bottom:0;');

    $("#codAmount").attr('style', 'height: 28px;');

    //$("#codAmount").prop('disabled', false);
    $("#TotalReceiveableInclGST").attr('readonly', 'readonly');
    $("#TotalReceiveableInclGST").attr('style', 'height: 28px;background-color:#f0f4f8');
    //$("#TotalReceiveableInclGST").val() = 0;

    $("#NetReceiveable").attr('readonly', 'readonly');
    $("#NetReceiveable").attr('style', 'height: 28px;background-color:#f0f4f8');
    //$("#NetReceiveable").val() = 0;

    
    $("#divtempReceiveable").attr('style', 'position:absolute;left:0; right:0; top:0; bottom:0;');
    $("#tempNetReceiveable").attr('style', 'position:absolute;left:0; right:0; top:0; bottom:0;');
});

//$("#divcodAmount").click(function () {
//    alert("focusin");
//    $("#codAmount").attr('disabled', false);

//    //$("#codAmount").prop('disabled', false);
//    $("#TotalReceiveableInclGST").prop('disabled', true);
//    $("#NetReceiveable").prop('disabled', true);

    
//});

$("#divtempReceiveable").attr('style', 'position:absolute;left:0; right:0; top:0; bottom:0;');
//$("#divTotalReceiveableInclGST").click(function () {
$("#divtempReceiveable").click(function () {
    $("#TotalReceiveableInclGST").removeAttr('readonly');
    $("#divtempReceiveable").attr('style', 'position:relative;left:0; right:0; top:0; bottom:0;');
  
    $("#TotalReceiveableInclGST").attr('style', 'height: 28px;');

    $("#codAmount").attr('readonly', 'readonly');
    $("#codAmount").attr('style', 'height: 28px;background-color:#f0f4f8');
    //$("#codAmount").val() = 0;

    $("#NetReceiveable").attr('readonly', 'readonly');
    $("#NetReceiveable").attr('style', 'height: 28px;background-color:#f0f4f8');
    //$("#NetReceiveable").val() = 0;

    $("#tempdivcodAmount").attr('style', 'position:absolute;left:0; right:0; top:0; bottom:0;');
    $("#tempNetReceiveable").attr('style', 'position:absolute;left:0; right:0; top:0; bottom:0;');
    



    //alert("focusin");
});


$("#tempNetReceiveable").attr('style', 'position:absolute;left:0; right:0; top:0; bottom:0;');
    //$("#divNetReceiveable").click(function () {
$("#tempNetReceiveable").click(function () {
    $("#NetReceiveable").removeAttr('readonly');
    $("#tempNetReceiveable").attr('style', 'position:relative;left:0; right:0; top:0; bottom:0;');

    $("#NetReceiveable").attr('style', 'height: 28px;');


    $("#codAmount").attr('readonly', 'readonly');
    $("#codAmount").attr('style', 'height: 28px;background-color:#f0f4f8');
    //$("#codAmount").val() = 0;

    $("#TotalReceiveableInclGST").attr('readonly', 'readonly');
    $("#TotalReceiveableInclGST").attr('style', 'height: 28px;background-color:#f0f4f8');
    //$("#TotalReceiveableInclGST").val() = 0;


    $("#tempdivcodAmount").attr('style', 'position:absolute;left:0; right:0; top:0; bottom:0;');
    $("#divtempReceiveable").attr('style', 'position:absolute;left:0; right:0; top:0; bottom:0;');
    

});

$("#datecheck").change(function () {
    if (this.checked) {
        $("#dateFrom").attr('disabled', false);
        $("#dateTo").attr('disabled', false);

            alert("closeProductOverlay");
        //Do stuff
    }
    else {
        $("#dateFrom").attr('disabled', 'disabled');
        $("#dateTo").attr('disabled', 'disabled');
        alert("'disabled'");
        //Do stuff
    }
});
//var closeProductOverlay = function () {
//    alert("closeProductOverlay");
//}
var getSaleInvoiceSummary = function () {
    alert('getSaleInvoiceSummary');
    alert('getCodPendingCashDelivery');
    showLoader('In Progress..Please wait!', 'warning');
    var dateFrom = $("#dateFrom").val();
    var dateTo = $("#dateTo").val();
    var client = 321659;
    //var datecheck = $("#datecheck :checked").val();
    if ($("#datecheck").is(":checked")) {
        var datecheck = 1;
        // it is checked
    }
    else {
        var datecheck = 0;
        alert("datecheck false");
        // it is checked
    }
   

   
    var codamount = $("#codAmount").val();
    var totalReceiveableInclGST = $("#TotalReceiveableInclGST").val();
    var netReceiveable = $("#NetReceiveable").val();
    alert("values" + codamount + totalReceiveableInclGST + netReceiveable);
 var isDisabledcodAmount = $('#codAmount').attr('readonly');
    var isDisabledTotalReceiveableInclGST = $('#TotalReceiveableInclGST').attr('readonly');
    var isDisabledNetReceiveable = $('#NetReceiveable').attr('readonly');
    alert('attr' + 'value of cod' + codamount + isDisabledcodAmount + totalReceiveableInclGST+  isDisabledTotalReceiveableInclGST +netReceiveable+ isDisabledNetReceiveable);
    if (isDisabledcodAmount == undefined)
    {
        alert('undefined cod');
        var codamount = $("#codAmount").val();
        if (codamount == '' || codamount== " " || codamount==null)
        {
            alert("EMpty"+codamount +"codamount");
            codamount=0;
        }
         var totalReceiveableInclGST = $("#TotalReceiveableInclGST").val();
         totalReceiveableInclGST = 0;
         var netReceiveable = $("#NetReceiveable").val();
         netReceiveable = 0;
         //$("#codAmount").val() = 0;
         alert("isDisabledcodAmount" + codamount);
    }
    if (isDisabledTotalReceiveableInclGST == undefined) {
        alert('undefined TotalReceiveableInclGST');
     var codamount = $("#codAmount").val();
     codamount = 0;
     var totalReceiveableInclGST = $("#TotalReceiveableInclGST").val();
     if (totalReceiveableInclGST == '' || totalReceiveableInclGST == " " || totalReceiveableInclGST == null) {
         alert("EMpty" + totalReceiveableInclGST + "codamount");
         totalReceiveableInclGST = 0;
     }
     var netReceiveable = $("#NetReceiveable").val();
     netReceiveable = 0;
     alert("isDisabledTotalReceiveableInclGST" + totalReceiveableInclGST);
    }
    if (isDisabledNetReceiveable == undefined) {
        alert('undefined NetReceiveable');
     var codamount = $("#codAmount").val();
     codamount = 0;
     var totalReceiveableInclGST = $("#TotalReceiveableInclGST").val();
     totalReceiveableInclGST = 0;

     var netReceiveable = $("#NetReceiveable").val();
     if (netReceiveable == '' || netReceiveable == " " || netReceiveable == null) {
         alert("EMpty" + netReceiveable + "codamount");
         netReceiveable = 0;
     }
     alert("isDisabledNetReceiveable" + netReceiveable);
    
    }
    if (isDisabledcodAmount != undefined && isDisabledTotalReceiveableInclGST != undefined && isDisabledNetReceiveable != undefined)
    {
        alert("cod amount empty");
        codamount = 0;
        totalReceiveableInclGST = 0;
        netReceiveable = 0;

    }
        //var totalReceiveableInclGST = $("#TotalReceiveableInclGST").val();
    //var netReceiveable = $("#NetReceiveable").val();
    var val = "";

    var url = $("#rptSaleInvoiceSummary").attr("href");


    //if (dateFrom !== "" && dateTo !== "" && client !== "" && codamount !== "") {
    if (client !== "") {
        $.ajax({
            url: url,
            type: "Get",
            data: { dateFrom: dateFrom + "", dateTo: dateTo, client: client, codAmount: codamount, Receiveable: totalReceiveableInclGST, NetReceiveable: netReceiveable , datecheck: datecheck },
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