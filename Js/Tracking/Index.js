$(document).ready(function() {
   // $('#li-Tracking').addClass('active');
    var tr = $("#hidCnNo").val();
    if (tr !== "") {
        $("#txtTrackingNumber").val(tr);
        searchTrackingNumber();
        //searchTrackingHistory();
    }
});

var searchTrackingNumber = function () {
    
    var trUrl = $("#hidSearchTracking").val();
    var tracking = $("#txtTrackingNumber").val();
    
    if (tracking !== "") {
        showLoader("Please wait....", "warning");
        $("#divRecordRow").show();
        
        $.ajax({
            url: trUrl,
            type: "POST",
            data: { cnNo: tracking + "" },
            success: function (msg) {
                //hideLoader();
                searchTrackingHistory();
                if (msg === "NotFound") {
                    AutoLoader("CN number not found", "error");

                } else if (msg === "false") {
                    $("#divNotFound").hide();
                    AutoLoader("Sorry some error has been occured...", "error");
                } else {
                    $("#divNotFound").hide();
                    $("#divAllTrackInfo").show();
                    var j = $.parseJSON(msg);
                    $("#lblOrigon").text(j.HomeBranch);
                    $("#lblConsignCity").text(j.ConsigneeCity);
                    $("#lblBookingDate").text(j.TransactionDate);
                    $("#lblShipperName").text(j.ShipperName);
                    $("#ConsignName").text(j.ConsigneeName);
                    $("#lblConsignAddress").text(j.ConsigneeAddress);
                    $("#lblConsignContact").text(j.ContactNo);
                    $("#lblCurrentStatus").text(j.CurrentStatus);
                    $("#lblDeliveredOn").text(j.DeliveredOn);
                    $("#lblShipmentBookLocation").text(j.ShipmentBookLocation);
                    $("#lblCNNo").text(tracking);
                    if (j.CurrentStatus === "Delivered") {
                        $("#lblReceivedBy").show();
                        $("#lblReceivedByName").show();
                        $("#lblReceivedByName").text(j.ReceiverName + "(" + j.Relation + ")");
                    } else if (j.CurrentStatus === "Delivered") {
                        $("#lblReceivedBy").show();
                        $("#lblReceivedByName").show();
                        $("#lblReceivedByName").text(j.ReceiverName + "(" + j.Relation + ")");
                    } else {
                        $("#lblReceivedBy").hide();
                        $("#lblReceivedByName").hide();
                    }
                    $("#trackingDetail_").removeClass("hide");
                }
            },
            error: function (err) {
                AutoLoader(err.statusText, "error");
            }
        });
    } else {
        $("#divRecordRow").hide();
    }
};

var searchTrackingHistory = function() {
    var trUrl = $("#hidTrackingHistory").val();
    var tracking = $("#txtTrackingNumber").val();
    if (tracking !== "") {
        
        $.ajax({
            url: trUrl,
            type: "POST",
            data: { cnNo: tracking + "" },
            success: function (msg) {
                hideLoader();
                if (msg.res  === "false") {
                    $("#divTrackingHistory").html("No result ...");
                } else {
                    $("#divTrackingHistory").html(msg);
                }
            },
            error: function(err) {
                AutoLoader(err.statusText, "error");
            }
        });
    }
};