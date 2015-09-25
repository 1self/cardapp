var cacheEmail1 = function () {
    localStorage.signupEmail = $('#mce-EMAIL1')[0].value;
};

var cacheEmail2 = function () {
    localStorage.signupEmail = $('#mce-EMAIL2')[0].value;
};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function () {
    //return;
    // enable this when api is launched
    var referrer = getParameterByName("referrer");
    if (typeof(referrer) == "undefined" || referrer === "")
        return;

    localStorage.referrer = referrer;
});
