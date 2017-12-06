$(document).ready(function () {

});
function validateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
};
var registerUser = function () {
    
    showLoader("Saving Data Please Wait....", "info");

    /////////////////////Validation
    var Name = $("#Name").val();
    var LoginID = $("#LoginID").val();
    var UserPassword = $("#UserPassword").val();
    var ConfirmPass = $("#ConfirmPass").val();
    var Email = $("#Email").val();


    if (Name != "") {
        $("#Name").css("border-color", "#ccc");
    }
    else {
        $("#Name").css("border-color", "red");
    }
    if (LoginID != "") {
        $("#LoginID").css("border-color", "#ccc");
    }
    else {
        $("#LoginID").css("border-color", "red");
    }
    if (UserPassword != "") {
        $("#UserPassword").css("border-color", "#ccc");
    }
    else {
        $("#UserPassword").css("border-color", "red");
    }
    if (ConfirmPass != "") {
        $("#ConfirmPass").css("border-color", "#ccc");
    }
    else {
        $("#ConfirmPass").css("border-color", "red");
    }
    if (Email != "") {
        $("#Email").css("border-color", "#ccc");
    }
    else {
        $("#Email").css("border-color", "red");
    }
    if (validateEmail(Email)) {

        $("#Email").css("border-color", "#ccc");
    }
    else {
        $("#Email").css("border-color", "red");
    }
    if (UserPassword != ConfirmPass) {
        $("#ConfirmPass").css("border-color", "red");
        $("#UserPassword").css("border-color", "red");
        
    }

    if (Name != "" && LoginID != "" && UserPassword != "" && UserPassword == ConfirmPass && Email != "" && validateEmail(email)) {

    }
    else {
        AutoLoader("Please fill the hightlighted fields correctly..", "warning");
    }

}




