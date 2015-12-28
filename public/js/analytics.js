
// for testing in node, don't load google
// if we're not in the browser.
var window = window || undefined;
var document = document || undefined;

/* jshint ignore:start */
if(window){
    (function(i, s, o, g, r, a, m) {
       i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    
}
/* jshint ignore:end */

var Analytics = function(trackingId, googleAnalytics){
    if(googleAnalytics === undefined){
        googleAnalytics = ga;
    }
   
    googleAnalytics('create', 'UA-54838479-1',  {userId: trackingId});
    googleAnalytics('set', 'dimension1', trackingId);

    function formatLocalDate() {
        var now = new Date(),
            tzo = -now.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function(num) {
                var norm = Math.abs(Math.floor(num));
                return (norm < 10 ? '0' : '') + norm;
            };
        return now.getFullYear() + 
            '-' + pad(now.getMonth()+1) + 
            '-' + pad(now.getDate()) + 
            'T' + pad(now.getHours()) + 
            ':' + pad(now.getMinutes())  + 
            ':' + pad(now.getSeconds())  + 
            ':' + pad(now.getMilliseconds()) + 
            dif + pad(tzo / 60)  + 
            ':' + pad(tzo % 60);
        }

    var send = function(analyticsType, payload, windowLocation, post){
        if(windowLocation === undefined){
            windowLocation = window.location.toString();
        }

        if(post === undefined){
            post = $.post;
        }

        googleAnalytics('send', analyticsType, payload);

        var postWhenAnalyticsReady = function(tracker){
            if(typeof payload !== 'object'){
                payload = {
                    payload: payload
                };
            }

            payload.dateTime = formatLocalDate();
            payload.url = windowLocation;
            payload.clientId = tracker.get('clientId');
            var url = '/analytics';
            payload.trackingId = trackingId;
            post(url, payload);
        };

        // we have to get the analytics library to do the
        // post to the 1self analytics backend because the
        // ga library isn't ready at this point
        googleAnalytics(postWhenAnalyticsReady);
    };

    var result = {
        send: send
    };

    return result;
};

var module = module || undefined;

if(module){
    module.exports = {};
    module.exports.Create = Analytics;
}