<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]> <html class="lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]> <html class="lt-ie9"> <![endif]-->
<!--[if IE 9]>    <html class="no-js lt-ie10" lang="en"> <![endif]-->
<!--[if gt IE 9]><!-->
<html class="no-js gt-ie9 non-ie data-explorer" lang="en">
<!--<![endif]-->
<html>
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> within htacess-->
    <title>1Self Data Explorer</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <!--icons -->
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <!--icons -->
    <!--Android address bar styling -->
    <meta name="theme-color" content="#ffffff">
    <script src="/js/modernizr.custom.19789.js"></script>
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/lib1self-charting.css">
    <link rel="stylesheet" href="/font-awesome/css/font-awesome.min.css">
    <script src="/js/utils.js"></script>

    <script>

      var registeredOn;
      var username = '{{loggedInUsername}}';
      var loggedInUsername = username;

      var chartUsernameParam = '{{chartUsername}}';
      var streamIdParam = '{{streamId}}';
      var objectTagsParam = '{{objectTags}}';
      var actionTagsParam = '{{actionTags}}';
      var aggregatorParam = '{{aggregator}}';
      var aggregatePeriodParam = '{{aggregatePeriod}}';
      var chartTypeParam = '{{chartType}}';
      var fromDateParam = '{{fromDate}}';
      var toDateParam = '{{toDate}}';
      var objectTagsParam1 = '{{objectTags1}}';
      var actionTagsParam1 = '{{actionTags1}}';
      var aggregatorParam1 = '{{aggregator1}}';
      var chartTypeParam1 = '{{chartType1}}';
      var readTokenParam = '{{readToken}}';
      var trackingId = '{{trackingId}}';

      console.log(streamIdParam);
      console.log(readTokenParam);
    
    </script>
    <!--[if lt IE 9]> <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script> <![endif]-->
</head>

<body>
    <!--[if lt IE 9]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <div class="nav-overlay hide">
        <div class="navigation-container">
            <div class="navigation-content">
                <div>
                    <div class="navigation-item hide logged-out" href="https://app-staging.1self.co/signup">Join 1self</div>
                    <div class="navigation-item hide logged-out" href="https://app-staging.1self.co/login">Log in</div>
                    <div class="navigation-item hide logged-in" href="/card-stack">Card stack</div>
                    <div class="navigation-item hide logged-in" href="/integrations">Integrations</div>
                    <div class="navigation-item hide dashboard-nav" href="/dashboard">Dashboard</div>
                    <div class="navigation-item hide logged-in" href="/profile">Profile</div>
                    <hr class="navigation-spacer">
                    <div class="navigation-item" href="http://blog.1self.co">1self blog</div>
                    <div class="navigation-item" href="http://1self.uservoice.com">Support &amp; feedback</div>
                </div>
            </div>
            <div class="navigation-padding">
            </div>
        </div>
    </div>

    

    <header role="banner">
      <div class="back-button hide"><i class="fa fa-arrow-left"></i>&nbsp;&nbsp;Back</div>
      <div class="page-title">Explore your data</div>
    </header>
    
    <main role="main">
        <div class="background"></div>

        <div class="main-content">
          <div class="chart-row">
            <div class="chart"></div>
          </div>
          <div class="chart-options-row">
            <div class="aggregation-sections clear">

            </div>
            <div class="versus-button-section hide">
              <div class="standard-button add-versus"><div>Add versus</div></div>
            </div>
          </div>
        </div>
    </main>

              <div class="aggregation-options template">
                <div class="aggregation-header"></div>
                <div class="action-tags"></div>
                <div class="aggregators"></div>
                <div class="aggregate-ons"></div>
                <div class="aggregation-periods">
                  <div class="standard-button"><div>Daily</div></div>
                </div>
                <div class="chart-types"></div>
              </div>

    <div class="standard-button no-icon template"><div></div></div>
    <div class="standard-button icon-times selected template"><div><span></span>&nbsp;<i class="fa fa-times"></i></div></div>
    <div class="standard-button icon-dot sub-button template"><div><span></span>&nbsp;<i class="fa fa-circle"></i></div></div>

    <footer>
        <div class="wrap">
            <div class="menu-wrap">
                <div class="flyout-wrap">
                    <div class="flyout-btn">
                        <div class="nav-icon">
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                    </div>
                </div>
                <div class="bottom-menu">
                    <div class="previous hide">
                    </div>
                    <div class="hide">
                    </div>
                </div>
            </div>
        </div>
    </footer>


    <!-- Analytics -->
    <script src="/js/jquery-2.1.4.min.js"></script>
    <script>
        var analytics = new Analytics('{{profile.encodedUsername}}');
        analytics.send('send', 'pageview');
        var ev = {};
        ev.eventCategory = 'data-explorer';
        ev.eventAction = 'load';
        ev.eventLabel = 'page-load';
        analytics.send( 'event', ev);
    </script>
    <script src="/js/d3.min.js"></script>
    <script src="/js/xdate.js"></script>
    <script src="/js/lib1self-client.js"></script>
    <script src="/js/lib1self-charting.js"></script>
    <script src="/js/main.js"></script>
    <script src="/js/data-explorer.js"></script>
   
</body>

</html>