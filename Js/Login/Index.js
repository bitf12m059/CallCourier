$(document).ready(function () {
    $(document).keypress(function (e) {
        if (e.which == 13) {
            $("#btnLogin").click();
        }
    });

});
var memberLogin = function (url) {

    if ($("#txtLoginID").val() === "" || $("#txtpassword").val() === "") {
        var loginId = $("#ntxtLoginID").val();
        var password = $("#ntxtpassword").val();
        var newpassword = $("#newtxtpassword").val();
        var confirmtxtpassword = $("#confirmtxtpassword").val();
        var UserName = "username"; var ppassword = "password";
        if (newpassword != confirmtxtpassword) {
            loginId = "";
            password = "";
            UserName = "newpassword";
            ppassword = "confirmpassword"

        }
    } else {
        var loginId = $("#txtLoginID").val();
        var password = $("#txtpassword").val();
    }
    var message = "";
    if (loginId === "" || password === "") {
        AutoLoader("Please enter a valid " + UserName + " and " + ppassword + "...", "error");
        setTimeout(function () {
            hideLoader();
        }, "5000");
    }
    else {
        showLoader("Please Wait...", "warning");
        $.ajax({
            url: url,
            type: "POST",
            data: { loginId: loginId + "", password: password + "", newpassword: newpassword + "" },
            success: function (msg) {
                if (msg == "true") {
                    window.location.href = $("#afterLogin").attr("href");;
                } else {
                    AutoLoader("Username or password is incorrect..", "error");
                }
            }
        });
    }
}
var memberLog = function (event, url) {
    var key = window.event ? event.keyCode : event.which;
    if (key == 13) {
        memberLogin(url);
    }
}

var forgotPassword = function () {
    $("#userLogin").hide();
    $("#forgotPassword").show();
}
var gobackForgot = function () {
    $("#forgotPassword").hide();
    $("#userLogin").show();
}

function validateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
};
var checkEmail = function (url) {
    showLoader("Please wait...", "info");
    var Email = $("#Email").val();

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
    if (Email != "" && validateEmail(Email)) {

        $.ajax({
            url: url,
            type: "POST",
            data: { Email: Email + "", },
            success: function (msg) {
                
            },
            error: function (err) {
                AutoLoader(err.statusText, "error");
            }
        });
    }
    else {
        AutoLoader("Please enter valid email address...", "warning");
    }

}



