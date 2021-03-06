<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]> <html class="lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]> <html class="lt-ie9"> <![endif]-->
<!--[if IE 9]>    <html class="no-js lt-ie10" lang="en"> <![endif]-->
<!--[if gt IE 9]><!-->
<html class="no-js gt-ie9 non-ie integrations" lang="en">
<!--<![endif]-->
<html>
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> within htacess-->
    <title>1self - Your Integrations</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <!--icons -->
    <link rel="apple-touch-icon" sizes="57x57" href="apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <!--icons -->
    <!--Android address bar styling -->
    <meta name="theme-color" content="#ffffff">
    <script src="/js/modernizr.custom.19789.js"></script>
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/font-awesome/css/font-awesome.min.css">
    <script src="/js/utils.js"></script>
    <!--[if lt IE 9]> <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script> <![endif]-->

    <script>

        var offline = false;
        var username = '{{profile.username}}';
        var registeredOn = "{{profile.registeredOn}}";
        registeredOn = new Date(registeredOn);


    </script>
</head>

<body>
    <!--[if lt IE 9]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <div class="overlay hide">
        <div class="overlay-content">
            <p class="welcome-header"></p>
            <p>Great news! You've qualified to get 1self free for 2 years.</p>
            <p>Now, let's start finding remarkable things about you.</p>
            <hr>
            <p class="welcome-sub-header">How 1self works</p>
            <p>1self works by enabling you to link up data from all areas of your life.</p>
            <p>1self is compatible with many of your favourite apps and services. You just need to pick which services and apps you want to connect with 1self. Then 1self will help you find your remarkable information.</p>
            <hr>
            <p>Let's begin by connecting some data sources. The more you connect, the more 1self will be able to find remarkable things about you.</p>
            <div class="standard-button get-started-button"><div>Start connecting</div></div>
        </div>
    </div>

    <div class="nav-overlay hide">
        <div class="navigation-container">
            <div class="navigation-content">
                <div>
                    <div class="navigation-item" href="/card-stack">Card stack</div>
                    <div class="navigation-item" href="/integrations">Integrations</div>
                    <div class="navigation-item hide dashboard-nav" href="/dashboard">Dashboard</div>
                    <div class="navigation-item" href="/profile">Profile</div>
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
        Your integrations
    </header>
    
    <main role="main">
        <div class="background"></div>
        <div class="integrations-content">
            <div class="integrations-section-header">
                <p>
                    Below are the available integrations for 1self. Take a look through and select which services to link up. 
                </p>
                <p class="small">
                    Remember, your data is safe and private with 1self.
                </p>
            </div>
            <div class="integration-loading"><i class="fa fa-circle-o-notch fa-spin"></i>&nbsp;&nbsp;Loading - just a tic</div>

            <div class="integrations-section template">
                <a class="section-header-anchor">
                <div class="section-header">
                    Productivity
                </div>
                <div class="section-content-collapse">
                    <div class="service-container template">
                        <div class="service-container-inner">
                            <div class="service"></div>
                        </div>
                        <i class="service-tick fa fa-check-circle"></i>
                    </div>
                </div>
                <div class="section-content-expand">
                    <div class="integration-card-container template">
                        <div class="integration-card top-border">
                            <div class="integration-card-left">
                                <div class="content">
                                    <div class="service"></div>
                                    <p class="service-name">Service Name</p>
                                    <p class="service-short-description">Service short description</p>
                                </div>
                            </div>
                            <div class="integration-card-right">
                                <div class="standard-button integration-button"><div>Connect</div></div>
                                <div class="integration-connected">
                                    <div><i class="service-tick fa fa-3x fa-check-circle"></i></div>
                                    <div>Connected</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

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
            </div>
        </div>
    </footer>

    <!-- Analytics -->
     <script src="/js/jquery-2.1.4.min.js"></script>
    <script>
    window.jQuery || document.write('<script src="js/jquery-2.1.4.min.js"><\/script>');
    </script>
    <script src="/js/analytics.js"></script>
    <script>
        var analytics = new Analytics('{{profile.encodedUsername}}');
        analytics.send('send', 'pageview');
        var ev = {};
        ev.eventCategory = 'integrations';
        ev.eventAction = 'load';
        ev.eventLabel = 'page-load';
        analytics.send( 'event', ev);
    </script>
    <!-- main script -->
    <script src="js/main.js"></script>
    <script src="js/data-load.js"></script>
    <script src="js/integrations.js"></script>
</body>

</html>