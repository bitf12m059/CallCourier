

$.getScript('../Js/Print/jquery.PrintArea.js', function () {
    $.getScript('../Js/Print/PrintingSetting.js', function () {
        // script is now loaded and executed.
        // put your dependent JS here.
        $(function () {
            $("#printable").find("#print").on('click', function () {
                $.print("#printable");
            });
        });
    });
});



