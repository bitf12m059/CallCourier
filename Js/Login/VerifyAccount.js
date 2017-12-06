$(document).ready(function () {

});

var changePassword = function (url) {

    var NewPassword = $("#NewPassword").val();
    var ConfirmPassword = $("#ConfirmPassword").val();

    if (NewPassword != "") {
        $("#NewPassword").css("border-color", "#ccc");
    }
    else {
        $("#NewPassword").css("border-color", "red");
    }
    if (ConfirmPassword != "") {
        $("#ConfirmPassword").css("border-color", "#ccc");
    }
    else {
        $("#ConfirmPassword").css("border-color", "red");
    }

    if (NewPassword != ConfirmPassword) {

    }
    else {

       
    }
    if (NewPassword != "" && ConfirmPassword != "") {
        $.ajax({
            url: url,
            type: "Post",
            data: { FranchiseID: FranchiseID },
            success: function (msg) {
                if (msg !== "false") {

                } else {

                }
            }
        });
    }
    else {

    }
   
}

var cancelButtonClick = function () {
    
    window.location.href = "/Login";

}