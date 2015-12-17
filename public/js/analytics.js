/* jshint ignore:start */
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
/* jshint ignore:end */

var Analytics = function(trackingId){
    ga('create', 'UA-54838479-1',  {userId: '{{profile.encodedUsername}}'});
    ga('set', 'dimension1', '{{profile.encodedUsername}}');

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
            dif + pad(tzo / 60)  + 
            ':' + pad(tzo % 60);
        }

    var send = function(analyticsType, payload){
        ga('send', analyticsType, payload);
        payload.dateTime = formatLocalDate();
        var url = '/analytics';
        payload.trackingId = trackingId;
        $.post(url, payload);
    };

    var result = {
        send: send
    };

    return result;
};
