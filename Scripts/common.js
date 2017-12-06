function IsNumeric(event) {
    var key = window.event ? event.keyCode : event.which;
    if (key === 46) {
        return true;
    }
    if (event.keyCode === 8 || event.keyCode === 46
     || event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 9) {
        return true;
    }
    else if (key < 48 || key > 57) {
        return false;
    }
    else return true;
}

function IsAlphabetic(event) {
    var key = window.event ? event.keyCode : event.which;

    if (key === 46 || key === 32) {
        return true;
    }
    if (event.keyCode === 8 || event.keyCode === 46
     || event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 9) {


        return true;
    }
    
    else if (key < 65 || key > 90) {
        if (key > 96 && key < 123) {
            return true;
        } else {
            return false;
        }
        

    } 
    else return true;
}

function IsPhoneNumber(event) {
    var key = window.event ? event.keyCode : event.which;

    if (key === 46 || key === 43 ) {
        return true;
    }
    if (event.keyCode === 8 || event.keyCode === 46
     || event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 107 || event.keyCode === 9) {


        return true;
    }
    else if (key < 48 || key > 57 ) {
        return false;
    }
    else return true;
}

function validateEmail(email) {
    var result = "";

    if (email != "") {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!(filter.test(email)))
            return false;
        else
            return true;
    }
    else
        return false;
}
function showLoader(message, type) {


    if (type === "info") {
        $("#static-loader").addClass("info_");
    }
    else if (type === "warning") {
        $("#static-loader").addClass("warning_");
    }
    else if (type === "success") {
        $("#static-loader").addClass("success_");
    }
    else if (type === "error") {
        $("#static-loader").addClass("error_");
    }
    else {

        $("#static-loader").addClass("info_");
    }

    $("#static-loader").html(message);
    $("#static-loader").slideDown();

}
function hideLoader() {
    $("#static-loader").slideUp(function () {
        $("#static-loader").html('');
        $("#static-loader").removeClass("warning_");
        $("#static-loader").removeClass("success_");
        $("#static-loader").removeClass("error_");
        $("#static-loader").removeClass("info_");
    });
}
function AutoLoader(message, type) {
    showLoader(message, type);
    setTimeout(function () {
        hideLoader();
    }, "5000");
}

function wordCountKeyPress(event, elem, maxWords) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46
     || event.keyCode === 37 || event.keyCode === 39) {
        return true;
    } else {
        var wordcount = 0;
        wordcount = $(elem).val().split(/\b[\s,\.-:;]*/).length;
        if (wordcount > maxWords) {
            return false;
        } else {
            return true;
        }
    }
    
}

function wordCount(value, maxWords) {
    var wordcount = 0;
    wordcount = value.split(/\b[\s,\.-:;]*/).length;
    if (wordcount > maxWords) {
        return false;
    } else {
        return true;
    }
}

function randomString(stringLength) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var randomstring = "";
    for (var i = 0; i < stringLength; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}

function randomInteger(stringLength) {
    var chars = "0123456789";
    var randomstring = "";
    for (var i = 0; i < stringLength; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}