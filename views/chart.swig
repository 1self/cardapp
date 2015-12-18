<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/chart.css">
    <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
    <script src="/js/jquery-2.1.4.min.js"></script>
    <script src="/js/d3.min.js"></script>
    <script src="/js/chartDrawing.js"></script>
    <script src="/js/utils.js"></script>
    <script src="/js/analytics.js"></script>
</head>

<body>
    <div class="outerContainer">
        <div class="mainContainer">
            <div class="chart-loading">
                <div class="chart-loading-inner">
                    <div class="chart-loading-spinner"><i class="fa fa-4x fa-circle-o-notch fa-spin"></i></div>
                    <div class="chart-loading-text">Chart loading...</div>
                </div>
            </div>
        </div>
    </div>
    <script>
        var analytics = new Analytics('{{profile.encodedUsername}}');
        analytics.send('send', 'pageview');
    </script>
    <script src="/js/chart.js"></script>
</body>

</html>
