jQuery(document).ready(function () {
 
    $("#dateFrom").datepicker({
        format: 'dd/mm/yyyy'
    }).on('changeDate', function (ev) {
        $(this).datepicker('hide');
       });
});

var Check = function () { 
var details = $("detailsID").val();
if (details === "")
{
    alert('enter details');
};

}