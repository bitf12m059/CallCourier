$(document).ready(function () {
    $('#API').addClass('active');
});
var filedownload = function (fileName) {
    //var vl = $(elem).text();
    var fileUrl = "../Contents/" + fileName;
    //var fileName = vl;
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileUrl;
        save.target = '_blank';
        save.download = fileName || fileUrl;
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0,
            false, false, false, false, 0, null);
        save.dispatchEvent(evt);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }
    else if (!!window.ActiveXObject && document.execCommand) {
        var _window = window.open(fileUrl, "_blank");
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileUrl);
        _window.close();
    }
}