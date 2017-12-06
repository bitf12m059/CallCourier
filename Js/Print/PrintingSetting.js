$(function () {
    $("#printable").find('.print').on('click', function () {

        $("#printable").print({

            // Use Global styles
            globalStyles: false,

            // Add link with attrbute media=print
            mediaPrint: false,

            //Custom stylesheet
            stylesheet: "http://fonts.googleapis.com/css?family=Inconsolata",

            //Print in a hidden iframe
            iframe: false,

            // Don't print this
            noPrintSelector: ".avoid-this",

            // Add this on top
            append: "Free jQuery Plugins<br/>",

            // Add this at bottom
            prepend: "<br/>jQueryScript.net",

            // Manually add form values
            manuallyCopyFormValues: true,

            // resolves after print and restructure the code for better maintainability
            deferred: $.Deferred(),

            // timeout
            timeout: 250,

            // Custom title
            title: null,

            // Custom document type
            doctype: '<!doctype html>'

        });
    });
});