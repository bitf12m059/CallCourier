$(document).ready(function () {
    $('#Booking').addClass('active');

});
function getExt(filename) {
    var ext = filename.split('.').pop();
    if (ext === filename) return "";
    return ext;
}

$("#btnHideShow").click(function () {
    $("#formatDetails").slideToggle();
    var hidSho = $("#btnHideShow").val();
    if (hidSho === "Show Details") {
        $("#btnHideShow").val("Hide Details");
    }
    else {
        $("#btnHideShow").val("Show Details");
    }
});

var uploadExcelFile = function () {
    showLoader("Please wait file is uploading", "info");
    $("#btnUploadFile").addClass("disabled");
    var file = $("#excelFile").val();
    if (file !== "") {
        var ex = getExt(file);
        if (ex === "xls" || ex === "xlsx") {
            var fileUpload = $("#excelFile").get(0);
            var files = fileUpload.files;
            var data = new FormData();
            for (var i = 0; i < files.length; i++) {
                data.append(files[i].name, files[i]);
            }
            $.ajax({
                url: "../../FileUpload.ashx",
                type: "POST",
                data: data,
                contentType: false,
                processData: false,
                success: function (msg) {
                    if (msg !== "false") {                        
                        SaveBooking(msg);
                    } else {
                        AutoLoader("Sorry file is not uploaded. Try again", "error");
                    }
                },
                error: function (err) {
                    AutoLoader(err.statusText, "error");
                }
            });
        }
        else {
            AutoLoader("Please select excel file...", "error");
        }
    }
    else {
        AutoLoader("Please select file..", "warning");
        $("#btnUploadFile").removeClass("disabled");
    }
}




var contineFile = function (saveUrl) {
    showLoader("Loading Imported Bookings..Pleas wait", "info");
    var file = $("#excelFileHidden").val();
    $.ajax({
        url: saveUrl,
        type: "POST",
        data: { file: file },
        success: function (msg) {
            $("#excelFileHidden").val("");
            deleteExcelFile(file);
            if (msg === "false") {  
                AutoLoader("An error has been occured while saving record...", "error");
            } else {
                var data = msg.split(",");
                $("#stepNo").html("Step 2/2");
                var message = "Item/s saved = " + data[0] + "<br />" + "Item/s not saved = " + data[1] + "<br />" + "Item/s duplicate found = " + data[2];
                $("#errorMessageDiv").html("<h4 style='color:green;'>Your file is imported succesfully</h4>" + message);
                deleteExcelFile(file)
                getImportBookings(data[0]);
                $("#showImportBooking").removeClass("hide");
                $("#nextStep").addClass("disabled");
                $('#myModal').modal('show');
            }
        }
    });
}
var getImportBookings = function (count) {
    showLoader("Loading Imported Bookings..Pleas wait", "info");
    var url = $("#getImportBookings").attr("href");
    $.ajax({
        url: url,
        type: "POST",
        data: { count: count },
        success: function (msg) {
            $("#importBookingGrid").html(msg);
            hideLoader();
        }
    });
}
var deleteExcelFile = function (file) {
    var url = $("#afterImport").attr("href");
    $.ajax({
        url: url,
        type: "POST",
        data: { Image: file + "" },
        success: function (msg) {

        }
    });
}

var clearSelectedFile = function() {
    $("#excelFile").val();
    $("#excelFile").html("");
}

var SaveBooking = function (file) {
    $("#excelFileHidden").val(file);
    var url = $("#readExcelFile").attr("href");
    
    showLoader("Please wait reading data from file..", "info");
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
            $("#divProgress").parent().show();
            var progress = Math.round(evt.loaded * 100 / evt.total);
            $("#divProgress").css("width", progress + "%");
            $("#divProgress").text(progress + "% Completed");
            console.log(progress);
        }
    }, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#btnUploadFile").removeClass("disabled");
            var msg = xhr.responseText;
            hideLoader();
            $("#divProgress").css("width", 0 + "%");
            $("#divProgress").text(0 + "% Completed");
            $("#divProgress").parent().hide();
            if (msg === "false") {
                AutoLoader("Error", "error");
            }
            else if (msg === "true") {
                $("#nextStep").removeClass("disabled");
                $("#stepNo").html("Step 1/2");
                $("#errorMessageDiv").html("<h4 style='color:green;'>Your file seems perfect, Please proceed to next step..</h4>");
                $('#myModal').modal('show');
            }
            else {
                $("#nextStep").addClass("disabled");
                deleteExcelFile(file);
                $("#stepNo").html("Step 1/2");
                $("#btnUploadFile").prop("disabled, false");
                $("#errorMessageDiv").html("<h4 style='color:red;'>Following errors are found in your file</h4>" + msg);
                $('#myModal').modal('show');
            }
        }
    };
    xhr.open("POST", url +"?file=" + file);
    xhr.send();

        
    
};