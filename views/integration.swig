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
    <title>1self - Integration</title>
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

        var username = '{{profile.username}}';
        var service = '{{serviceIdentifier}}';
        var registeredOn = "{{profile.registeredOn}}";
        registeredOn = new Date(registeredOn);


    </script>
</head>

<body>
    <!--[if lt IE 9]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
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
        <div class="back-button"><div>&lt; back</div></div>
        <div class="page-title">Connect service</div>
    </header>
    
    <main role="main">
        <div class="background"></div>
        <div class="integrations-content">
            <div class="integration-loading"><i class="fa fa-circle-o-notch fa-spin"></i>&nbsp;&nbsp;Loading - be right with you</div>
            <div class="integration-detail-container hide">
                <div class="integration-detail top-border">
                    <div class="integration-detail-top">
                        <div class="integration-card-left">
                            <div class="content">
                                <div class="service"></div>
                                <p class="service-short-description">Service short description</p>
                            </div>
                        </div>
                        <div class="integration-card-right">
                            <div class="standard-button integration-button"><div>Connect</div></div>
                            <div class="integration-connected">
                                <div><i class="service-tick fa fa-3x fa-check-circle"></i></div>
                                <div>Connected</div>
                            </div>
                            <div class="integration-pending hide"><div><i class="fa fa-2x fa-circle-o-notch fa-spin"></i></div></div>
                        </div>
                    </div>
                    <div class="integration-detail-bottom">
                        <div class="integration-long-description"></div>
                        <div class="integration-instructions-container">
                            <p class="integration-instructions-header">Instructions</p>
                            <p class="integration-instructions"></p>
                        </div>
                        <div class="standard-button large-centered-button large-connect-button"><div>Connect</div></div>
                        <div class="integration-pending hide"><div><i class="fa fa-2x fa-circle-o-notch fa-spin"></i></div></div>
                    </div>
                </div>
            </div>
            <div class="integration-result-container hide">
                <div class="integration-result">
                    <div class="integration-detail-success hide">
                        <div class="integration-success-container">
                            <div class="integration-result-row">
                                <p class="integration-success-header"><i class="fa fa-thumbs-up"></i>&nbsp;&nbsp;Success</p>
                                <p class="integration-success-description">Nice one! [[ serviceName ]] has been successfully integrated. Now you'll start to see the associated data coming into your 1self account.</p>
                            </div>
                            <div class="integration-result-row">
                                <div class="standard-button to-integrations-button left">
                                    <div><i class="fa fa-arrow-left"></i>&nbsp;&nbsp;Back to integrations</div>
                                </div>
                                <div class="to-integrations-text left"><div>- link up more lovely data sources.</div></div>
                            </div>
                            <div class="integration-result-row">
                                <div class="standard-button to-card-stack-button left">
                                    <div><i class="fa fa-arrow-right"></i>&nbsp;&nbsp;To your card stack</div>
                                </div>
                                <div class="to-card-stack-text left"><div>- to see what's waiting for you.</div></div>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="integration-detail-error hide">
                        <div class="integration-error-container">
                            <div class="integration-result-row">
                                <p class="integration-error-header"><i class="fa fa-exclamation-triangle"></i>&nbsp;&nbsp;Something went wrong</p>
                                <p class="integration-error-description"></p>
                            </div>
                            <div class="integration-result-row">
                                <div class="standard-button to-support-button left">
                                    <div><i class="fa fa-medkit"></i>&nbsp;&nbsp;Get support</div>
                                </div>
                                <div class="to-support-text left"><div>- we&apos;re here to help.</div></div>
                            </div>
                            <div class="integration-result-row">
                                <div class="standard-button sub-button to-integrations-button left">
                                    <div><i class="fa fa-arrow-left"></i>&nbsp;&nbsp;Back to integrations</div>
                                </div>
                                <div class="to-integrations-text left"><div>- link up more lovely data sources.</div></div>
                            </div>
                            <div class="integration-result-row">
                                <div class="standard-button sub-button to-card-stack-button left">
                                    <div><i class="fa fa-arrow-right"></i>&nbsp;&nbsp;To your card stack</div>
                                </div>
                                <div class="to-card-stack-text left"><div>- to see what's waiting for you.</div></div>
                            </div>
                            <div class="clear"></div>
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
    <script>
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
        ga('create', 'UA-54838479-1',  {userId: '{{profile.encodedUsername}}'});
        ga('set', 'dimension1', '{{profile.encodedUsername}}');
        ga('send', 'event', gaEvent);
        ga('send', 'pageview');
    </script>
    
    <script src="/js/jquery-2.1.4.min.js"></script>
    <script>
    window.jQuery || document.write('<script src="js/jquery-2.1.4.min.js"><\/script>')
    </script>
    <!-- main script -->
    <script src="/js/main.js"></script>
    <script src="/js/data-load.js"></script>
    <script src="/js/integration.js"></script>
</body>

</html>