var getQueryParam = function (variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
};

$(document).ready(function () {
    headerResize();

    var showNavigation = function (mode) {
        if ($(document).width() < 801) {
            $('#collapse-link').slideToggle(mode);
        }
    };

    $('.nav-toggle').click(function (e) {
        showNavigation('slow');
    });

    $('.page-content').click(function (e) {
        if ($('#collapse-link').css('display') == 'block') {
            showNavigation('slow');
        }
    });

    $('.back-to-top, .y-dwarrow-center').click(function (event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 500);
        return false;
    });

    $("#signInForm").submit(function(event){
        event.preventDefault();
        checkUserName();
    });

    var service = '';
    $("#signup_with_github").click(function () {
            ga('send', 'event', 'signup', 'signup_with_github');
            service = 'github';
    });
    
    $("#signup_with_facebook").click(function () {
            ga('send', 'event', 'signup', 'signup_with_facebook');
            service = 'facebook';
    });

    $("#joinForm").submit(function(event){
        event.preventDefault();
        join(service);
    });


    $('#joinButton').click(function(event){
        event.preventDefault();
        $('#joinBox').css('top', $(document).scrollTop() + 70 + "px");
        $('#joinBox').show();
    });

    $(".join_username_btn").click(function(event){
        event.preventDefault();
        var username = $(this).siblings(":text").val();
        $('#joinBox').css('top', $(document).scrollTop() + 70 + "px");
        $("#oneselfUsernameJoin").val(username);
        $('#joinBox').show();
        return false;
    });

    $("#join_button").click(function(event){
        event.preventDefault();
        $('#joinBox').css('top', $(document).scrollTop() + 70 + "px");
        $('#joinBox').show();
        return false;
    });

    $('.closeButton').click(function(event){
        event.preventDefault();
        $('#loginBox').hide();
        $('#joinBox').hide();
    });

    $("#signup_go_back").click(function(event) {
        event.preventDefault();
        $("#signupWaitListForm").hide();
        $("#joinForm").show();
    });

    $("#signupWaitListFormLink").click(function(event){
        event.preventDefault();
        $("#signupWaitListForm").show();
        $("#joinForm").hide();
    });

    var appId = getQueryParam("appid");
    var streamid = getQueryParam("streamid");
    var readToken = getQueryParam("readToken");
    var url;

    if (appId === "app-id-598358b6aacda229634d443c9539662b" && streamid !== false && readToken !== false) {
        $("#landing-wrapper").show();
        $("#lnkLearnMore").attr('href', "#learn-more-landing");

        $('#sublime-content').show();

        url = "https://app.1self.co/v1/streams/"+ streamid +"/events/Computer,Software/Develop/sum(duration)/daily/barchart?readToken="+  readToken +"&bgColor=00a2d4";
        $('#landing-frame').attr('src', url);

        var redirectUrl="/dashboard?streamId="+streamid+"&readToken="+readToken;
        var loginHref = "https://app.1self.co/login?intent=login&redirectUrl=" + encodeURIComponent(redirectUrl);
        $("#loginButton").attr('href', loginHref);
        window.redirectUrl = redirectUrl;

    } else if (appId === "123") {
        $("#landing-wrapper").show();
        $("#lnkLearnMore").attr('href', "#learn-more-landing");

        $('#cyber-dojo-content').show();

        url = "https://app.1self.co/v1/apps/app-id-9bb5f1c77f0df722a9b1bc650a41988a";
        url += "/events/cyber-dojo/create/.animatedglobe?token=591ea03f188deb7e2e80977a5b9ca55d9a640e18231ee097af6a65388cd78110&frameBodyColor=rgb(242,174,28)&circleColor=rgb(0,162,212)";
        $('#landing-frame').attr('src', url);


        // <iframe id="animatedglobe" src="https://app.1self.co/v1/apps/app-id-9bb5f1c77f0df722a9b1bc650a41988a/events/cyber-dojo/create/.animatedglobe?token=591ea03f188deb7e2e80977a5b9ca55d9a640e18231ee097af6a65388cd78110" width="100%" scrolling="no" frameborder="0"> </iframe> <script src="https://app.1self.co/js/iframeResizer.min.js"></script> <script> var win = document.getElementById("animatedglobe").contentWindow; document.getElementById("animatedglobe").onload = function() { iFrameResize({ resizedCallback: function(data) { data.iframe.style.height = data.height - 25 + "px"; } }); win.postMessage( window.location.toString(), "https://app.1self.co/v1/apps/app-id-9bb5f1c77f0df722a9b1bc650a41988a/events/cyber-dojo/create/.animatedglobe?token=591ea03f188deb7e2e80977a5b9ca55d9a640e18231ee097af6a65388cd78110" ); return false; } </script>
    }
});

$(window).resize(function () {
    headerResize();
});
$(window).scroll(function () {
    var headerHeight = $(".header-wrapper").height();
    if ($(window).scrollTop() < headerHeight) {
        $(".page-nav").removeClass("shrink");
    }
    else {
        $(".page-nav").addClass("shrink");
    }
});

function headerResize() {
    var headerHeight = $(".header-wrapper").height();
    $(".page-content").css("padding-top", headerHeight + "px");
}

var checkUserName = function(){
    const API_ENDPOINT = "http://app.1self.co";
    var username = $('#oneselfUsername').val();
    var url = API_ENDPOINT + '/v1/user/' + username + "/exists";

    $.get(url)
        .done(function(){
            document.location.href = API_ENDPOINT + "/signup?intent=login&oneselfUsername=" + username;
        })
        .error(function(){
            $('#signinErrorMessage').html("Please enter a valid 1self username");
        });
};



var join = function(service){
    const API_ENDPOINT = "http://app.1self.co";
    var redirectUrl = API_ENDPOINT + "/integrations";
    var username = $('#oneselfUsernameJoin').val();
    $('#joinErrorMessage').html("");
    var re = /^[a-zA-Z0-9_]*$/;
    if (!re.test(username)) {
        $('#joinErrorMessage').html("Username needs to be just letters, numbers or underscore.");
    } else {
        var url = API_ENDPOINT + '/v1/user/' + username + "/exists";
        $.get(url)
            .done(function(){
                $('#joinErrorMessage').html("Ack. Sorry. That username is already taken!");
            })
            .error(function(){
                var params = [
                    'intent=website_signup',
                    'username=' + username,
                    'service=' + service,
                    'redirectUrl=' + (typeof window.redirectUrl === 'undefined' ? redirectUrl : encodeURIComponent(window.redirectUrl))
                ];
                var signupUrl = API_ENDPOINT + "/signup?" + params.join('&');
                document.location.href = signupUrl;
            });
    }

};
