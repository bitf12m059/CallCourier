$(document).ready(function () {
    CallOnLoad();
    LoadUserInfo();
    $('#Weight').keypress(function (event) {
        if (event.which == 8 || event.which == 0) {
            return true;
        }
        if (event.which < 46 || event.which > 59) {
            return false;
            //event.preventDefault();
        } // prevent if not number/dot

        if (event.which == 46 && $(this).val().indexOf('.') != -1) {
            return false;
            //event.preventDefault();
        } // prevent if already dot
    });
});

var CallOnLoad = function () {
    $("#MyBoxName").val("N/A");
    $("#MyBoxId").val("1");
    $("#greenBoxDiv").addClass("hide");
    $("#Fragile").val("false")
    $('#Holiday').val("false");
    $("#codAmountField").addClass('hide');
    if ($("#SelOrigin").val() == "") {
        $("#SelOrigin").val("Domestic");
    }
    if ($("#DestCountryId").val() == "") {
        $("#DestCountryId").val("1");
    }
    $('#Booking').addClass('active');
    $("#rdDom").click();
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode != 86 || charCode != 118))
        return false;
    return true;
}

var checkGreenBox = function () {
    var chkY = $('#chkGreenBox').is(":checked");
    if (chkY == true) {
        $("#greenBoxDiv").removeClass("hide");
    }
    else {
        $("#greenBoxDiv").addClass("hide");
        $("#MyBoxName").val("N/A");
        $("#MyBoxId").val("1");
    }

}

var saveServiceType = function () {
    var sttext = $("#drpServiceType :selected").text();
    if (sttext != "COD") {
        $("#codAmountField").addClass('hide');
    }
    else {
        $("#codAmountField").removeClass('hide');
    }

    var stId = $("#drpServiceType :selected").val();
    $("#ServiceTypeName").val(sttext);
    $("#ServiceTypeId").val(stId);
}

var myBoxVal = function () {
    var val = $("#drpMyBox :selected").val();
    var txt = $("#drpMyBox :selected").text();
    $("#MyBoxName").val(txt);
    $("#MyBoxId").val(val);
}

var selDestCity = function () {
    var val = $("#drpDestCity :selected").val();
    var txt = $("#drpDestCity :selected").text();
    $("#DestCityName").val(txt);
    $("#DestCountryId").val(val);
}

var checkRadio = function (event) {
    var id = $(event).attr("id");

    if (id == "rdDom") {
        $("#SelOrigin").val("Domestic");
    }
    else if (id == "rdInter") {
        $("#SelOrigin").val("International");
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode != 86 || charCode != 118))
        return false;
    return true;
}

var LoadUserInfo = function () {
    showLoader("Loading...", "info");
    var url = $("#loadUserInfo").attr("href");
    $.ajax({
        url: url,
        type: "GET",
        success: function (msg) {
            if (msg !== "false") {
                var obj = $.parseJSON(msg);
                $("#CourierID").html(obj.CourierID);
                $("#AccountNo").val(obj.AccountCodeID);
                $("#drpMyBox").html(obj.MyBoxName);
                $("#ShipperName").val(obj.ShipperName);
                $("#ShipperCellNo").val(obj.ShipperCellNo);
                $("#ShipperArea").val(obj.ShipperArea);
                $("#ShipperCity").val(obj.ShipperCity);
                $("#ShipperAddress").val(obj.ShipperAddress);
                $("#drpServiceType").html(obj.ServiceTypeName);
                $("#drpDestCity").html(obj.DestCityName);
                $("#Origin").val(obj.Origin);
                $("#BookingDate").val(obj.strDateNow);
                $("#ShipperLandLineNo").val(obj.ShipperLandLineNo);
                $("#ShipperEmail").val(obj.ShipperEmail);
                $("#LoginID").val(obj.LoginID);
                hideLoader();
            } else {
                AutoLoader("Loading Error...", "error");
            }
        }
    });
}

var saveBooking = function () {
    showLoader("Calculating Rates... Please Wait!", "info");
    var LoginID = $("#LoginID").val();
    var ConsigneeName = $("#ConsigneeName").val();
    var ConsigneeRefNo = $("#ConsigneeRefNo").val();
    var ConsigneeCellNo = $("#ConsigneeCellNo").val();
    var Address = $("#Address").val();
    var Origin = $("#Origin").val();
    var DestCountryId = $("#drpDestCity :selected").val();
    var ServiceTypeId = $("#drpServiceType  :selected").val();
    var Pcs = $("#Pcs").val();
    var Weight = $("#Weight").val();
    var Description = $("#Description").val();
    //var SelOrigin = $("#SelOrigin").val();
    var CodAmount = $("#CodAmount").val();
    var Holiday = $('#chkHoliday').is(":checked");
    var SpecialHandling = $('#chkSpecialHand').is(":checked");
    var MyBoxId = $("#drpMyBox  :selected").val();
    var remarks = $("#txtRemarks").val();
    if ($('#chkGreenBox').is(" :checked")) {
        MyBoxId = "1";
    }
    var status = true;
    $("#ConsigneeName").css("border-color", "#ccc");
    $("#ConsigneeRefNo").css("border-color", "#ccc");
    $("#ConsigneeCellNo").css("border-color", "#ccc");
    $("#Address").css("border-color", "#ccc");
    $("#Origin").css("border-color", "#ccc");
    $("#drpDestCity").css("border-color", "#ccc");
    $("#drpServiceType").css("border-color", "#ccc");
    $("#Pcs").css("border-color", "#ccc");
    $("#Weight").css("border-color", "#ccc");
    $("#Description").css("border-color", "#ccc");
    $("#CodAmount").css("border-color", "#ccc");
    if ($("#drpServiceType :selected").text() == "COD") {
        if ($("#CodAmount").val() == "") {
            $("#CodAmount").css("border-color", "red");
            status = false;
        }
    }
    if (ConsigneeName === "") {
        $("#ConsigneeName").css("border-color", "red");
        status = false;
    }
    if (ConsigneeRefNo === "") {
        $("#ConsigneeRefNo").css("border-color", "red");
        status = false;
    }
    if (ConsigneeRefNo.length > 10) {
        $("#ConsigneeRefNo").css("border-color", "red");
        $("#ConsigneeRefNo").val("Less then 10 digits");
        status = false;
    }
    if (ConsigneeCellNo === "") {
        $("#ConsigneeCellNo").css("border-color", "red");
        status = false;
    }
    if (ConsigneeCellNo.length < 10 || ConsigneeCellNo.length > 15) {
        $("#ConsigneeCellNo").css("border-color", "red");
        status = false;
    }
    if (Address === "") {
        $("#Address").css("border-color", "red");
        status = false;
    }
    if (Origin === "") {
        $("#Origin").css("border-color", "red");
        status = false;
    }
    if (DestCountryId === "0") {
        $("#drpDestCity").css("border-color", "red");
        status = false;
    }
    if (ServiceTypeId === "0") {
        $("#drpServiceType").css("border-color", "red");
        status = false;
    }
    if (Pcs === "") {
        $("#Pcs").css("border-color", "red");
        status = false;
    }
    if (Weight === "" || Weight === "0") {
        $("#Weight").css("border-color", "red");
        status = false;
    }
    if (Description === "") {
        $("#Description").css("border-color", "red");
        status = false;
    }
    var url = $("#saveBooking").attr("href");
  
    if (status) {
  
        $("#SaveandPrint").prop("disabled", true);
        $.ajax({
            url: "../api/CallCourier/SaveInternationalBooking",
            type: "GET",
            data: {
                loginId: LoginID, ConsigneeName: ConsigneeName + "", ConsigneeRefNo: ConsigneeRefNo + "", ConsigneeCellNo: ConsigneeCellNo + "",
                Address: Address + "", Origin: Origin + "", DestCountry: DestCountryId + "",
                ServiceTypeId: ServiceTypeId + "", Pcs: Pcs + "", Weight: Weight + "",
                Description: Description + "", CodAmount: CodAmount + "", SpecialHandling: SpecialHandling + "",
                MyBoxId: MyBoxId + "", Holiday: Holiday, remarks: remarks + ""
            },
            success: function (msg) {
          
                $("#SaveandPrint").prop("disabled", false);
           
                if (msg.Response !== "false") {
                    if (msg.CNNO !== "" && msg.CNNO !== "null" && msg.CNNO !== null) {
                        var gst = msg.GstPer;
                        if (gst === "" || gst === null || gst === "undefined") {
                            $("#popCNNo").html(msg.CNNO);
                            $("#CNNo").html(msg.CNNO);
                       
                            //$("#popServiceCharges").html(msg.Amount);
                            //$("#popCashHandlingCharges").html("0");
                            //$("#popSupplementaryCharges").html(msg.SpecialHandling);
                            //$("#popGstAmount").html("0");
                            //$("#popAmount").html(msg.Amount);
                            $('#myModal').modal('show');
                            ClearAll();
                            hideLoader();
                        }
                        else {
          
                            $("#popCNNo").html(msg.CNNO);
                            $("#CNNo").html(msg.CNNO);
                            //$("#popServiceCharges").html(msg.Amount);
                            //$("#popCashHandlingCharges").html("0");
                            //$("#popSupplementaryCharges").html(msg.SpecialHandling);
                            //$("#popGstAmount").html(msg.GstPer);
                            //var amount = parseInt(msg.Amount);
                            //var gst = parseInt(msg.GstPer);
                            //var addToamount = (gst / 100) * amount;
                            //var result = addToamount + amount;
                            //$("#popAmount").html(result);
                            $('#myModal').modal('show');
                            ClearAll();
                            hideLoader();
                        }
                    } else {
          
                        showLoader("Sorry an error has been occured", "error");
                        setTimeout(function () {
                            hideLoader();
                        }, 5000);
                    }
                } else {
                  
                    showLoader("Sorry an error has been occured", "error");
                    setTimeout(function () {
                        hideLoader();
                    }, 5000);
                }
            }
        });
    }
    else {
        AutoLoader("Please fill the hightlighted fields correctly..", "warning");
        $("#SaveandPrint").removeClass("disabled");
    }
}

var printCN = function () {
    var CNNo = $("#popCNNo").html();

    if (CNNo != "") {
        var aa = $("#afterSave").attr("href");
        urrrr = aa + "/" + CNNo
        window.open(urrrr, '_blank');
    }
    else {
        AutoLoader("Please save booking first..", "warning");
    }
}

var ClearAll = function () {
    $("#ConsigneeName").val("");
    $("#ConsigneeRefNo").val("");
    $("#ConsigneeCellNo").val("");
    $("#Address").val("");
    $("#Pcs").val("");
    $("#Weight").val("");
    $("#Description").val("");
    $("#CodAmount").val("");
    $("#ServiceCharges").val("");
    $("#CashHandlingCharges").val("");
    $("#printCN").addClass("disabled");
    $("#drpDestCity").val('0');
    $("#DestCityName").val('');
    $("#DestCountryId").val('');
    $("#ConsigneeName").css("border-color", "#ccc");
    $("#ConsigneeRefNo").css("border-color", "#ccc");
    $("#ConsigneeCellNo").css("border-color", "#ccc");
    $("#Address").css("border-color", "#ccc");
    $("#Origin").css("border-color", "#ccc");
    $("#drpDestCity").css("border-color", "#ccc");
    $("#drpServiceType").css("border-color", "#ccc");
    $("#Pcs").css("border-color", "#ccc");
    $("#Weight").css("border-color", "#ccc");
    $("#Description").css("border-color", "#ccc");
    $("#txtRemarks").val("");
}


