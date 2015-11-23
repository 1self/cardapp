<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]> <html class="lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]> <html class="lt-ie9"> <![endif]-->
<!--[if IE 9]>    <html class="no-js lt-ie10" lang="en"> <![endif]-->
<!--[if gt IE 9]><!-->
<html class="no-js gt-ie9 non-ie" lang="en">
<!--<![endif]-->
<html>
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> within htacess-->
    <title>1Self - Card Stack</title>
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
    <script src="js/modernizr.custom.19789.js"></script>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
    <script src="js/utils.js"></script>
    <script src="js/xdate.js"></script>

    <script>

        var offline = false;
        var username = '{{profile.username}}';
        var registeredOn = "{{profile.registeredOn}}";
        registeredOn = new Date(registeredOn);


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

    <main role="main">
        <div id="viewport">
            <ul class="stack">
                <div class="loading-div-top">&nbsp;</div>
                <div class="loading-div-bottom">
                    <i class="fa fa-circle-o-notch fa-spin"></i><span> Loading your cards...</span>
                </div>
                <div class="no-cards-div-bottom hide">
                    <div>
                        <span>No cards right now</span>
                    </div>
                    <div>
                        <span ><a href="" id="replayToday">Show me today's cards again</a><br>no, wait<br><a href="" id="replayWeek">show me this last week's</a></span>
                    </div>
                </div>
                <div class="no-more-cards-div-bottom hide">
                    <i class="fa fa-flag-checkered"></i><br><span><large>Great flipping effort!</large><br>You've finished all of your cards.<br>Why not <a href="/integrations">add more integrations</a> for more cards next time?</span>
                </div>
            </ul>
        </div>
        <div class="card-count"><span class="card-number-text"></span><sup>/<span class="out-of-text"></span></sup></div>
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
                <div class="bottom-menu">
                    <div class="previous hide">
                    </div>
                    <div class="next hide">
                    </div>
                </div>
            </div>
        </div>
    </footer>

<!-- ---------------------------- Templates ---------------------------- -->

    <li class="li-template card-hide">
        <input type="hidden" class="cardData">
        <div class="card-container manual-flip">
        </div>
    </li>

    <div class="card-template card top-ten-card bottom-ten-card card-hide">
        <div class="front">
            <div class="headline">
                <div class="service-container">
                    <div class="service"></div>
                </div>
                <p class="event-date"></p>
                <p class="headline-description"></p>
                <p class="headline-comparitor"></p>
                <br style="clear: both;" />
            </div>
            <div class="chart-container">
                <div class="chart">
                    <iframe src="" scrolling="no" frameBorder="0" class="chart-iframe"></iframe>
                </div>
                <div class="chart-overlay"></div>
            </div>
            <div class="card-menu">
                <div class="more"><div><span><i class="fa fa-info-circle"></i>&nbsp;&nbsp;More info</span></div></div>
            </div>
        </div>
        <div class="back">
            <div class="headline">
                <div class="service-container">
                    <div class="service"></div>
                </div>
                <p class="event-date"></p>
                <p class="headline-description"></p>
                <p class="headline-comparitor"></p>
                <p class="headline-info">
                    <a class="infoLink" target="_blank"></a>&nbsp;&nbsp;<i class="fa fa-external-link"></i>
                </p>
                <br style="clear: both;" />
            </div>
            <div class="chart">
                <iframe src="" scrolling="no" frameBorder="0" class="chart-iframe"></iframe>
            </div>
            <div class="card-menu">
                <div class="more-back"></div>
            </div>
        </div>
    </div>

    <div class="card-template card date-card card-hide">
        <div class="front">
            <div class="gradient-overlay"></div>
            <div class="texture-overlay"></div>
            <div class="card-content">
                <div class="event-date"></div>
<!--                 <div class="summary-list">
                    <div class="summary-item">
                        <div class="summary-item-logo strava"></div>
                        <div class="summary-item-text">Strava - 3 cards</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-item-logo visitcounter"></div>
                        <div class="summary-item-text">Visit Counter - 3 cards</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-item-logo googlefit"></div>
                        <div class="summary-item-text">Google Fit - 3 cards</div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>

    <div class="card-template card pending-card card-hide">
        <div class="front">
            <div class="card-content">
                <div class="card-content-inner">
                    <div class="pending-card-logo"></div>
                    <div class="pending-card-text"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="card-template card intro-card intro-card-0 card-hide">
        <div class="front">
            <div class="gradient-overlay"></div>
            <div class="texture-overlay"></div>
            <div class="card-content">
                <div class="intro-counter"></div>
                <div class="intro-header">Welcome to your card stack!</div>
                <div class="intro-content">
                    <p>This is your card stack. Whenever 1self finds remarkable things about you it&apos;ll drop a card onto the stack.</p>
                    <p>You can then swipe through the stack to see the remarkable info.</p>
                    <img class="swipe-helper" src="img/icons/swipe-helper.gif">
                    <p>Try swiping this card off to the left or right to get to the next card.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="card-template card intro-card intro-card-1 card-hide">
        <div class="front">
            <div class="gradient-overlay"></div>
            <div class="texture-overlay"></div>
            <div class="card-content">
                <div class="intro-counter"></div>
                <div class="intro-header">Nice swiping!</div>
                <div class="intro-content">
                    <p>You can also navigate through the card stack using the buttons at the bottom of the screen.</p>
                    <p>Hit &gt; for the next card.</p>
                    <p>Or &lt; for the previous card.</p>
                    <p>Give them a try and I'll see you on card 3 :)</p>
                </div>
            </div>
        </div>
    </div>
    <div class="card-template card intro-card intro-card-2 card-hide">
        <div class="front">
            <div class="gradient-overlay"></div>
            <div class="texture-overlay"></div>
            <div class="card-content">
                <div class="intro-counter"></div>
                <div class="intro-header">The fabled &quot;Card 3&quot;</div>
                <div class="intro-content">
                    <p>You made it! Nice one.</p>
                    <p>Talking of &quot;Card 3&quot; down in the bottom right you can see which card you&apos;re on and how many more remarkable insights are in your stack.</p>
                    <p>Keep swiping for your next card.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="card-template card intro-card intro-card-3 card-hide">
        <div class="front">
            <div class="gradient-overlay"></div>
            <div class="texture-overlay"></div>
            <div class="card-content">
                <div class="intro-counter"></div>
                <div class="intro-header">Excellent work <i class="fa fa-thumbs-o-up"></i></div>
                <div class="intro-content">
                    <p>Some cards have a front side and a back side</p>
                    <p>The back side will allow you to explore your remarkable data in more detail.</p>
                    <p>You can flip over the card to see the back by hitting the &quot;More info&quot; button.</p>
                    <p>Give it a try below.</p>
                </div>
                <div class="card-menu">
                    <div class="more"><div><span><i class="fa fa-info-circle"></i>&nbsp;&nbsp;More info</span></div></div>
                </div>
            </div>
        </div>
        <div class="back">
            <div class="card-content">
                <div class="intro-header">At last! The back of Card 4.</div>
                <div class="intro-content">
                    <p>Here on the back of the card you can interact more deeply with your data.</p>
                    <p>Try zooming and panning the sample data below.</p>
                    <p>When you&apos;re done, hit the return button in the bottom right corner to flip back to the front of the card.</p>
                </div>
            </div>
            <div class="chart">
                <iframe src="chart.html?lineColour=00b197&highlightCondition=top10&highlightDates=2015-05-06&vaxis=true&haxis=true&displayTooltips=true&doTransitions=false&offline=true" scrolling="no" frameBorder="0" class="chart-iframe"></iframe>
            </div>
            <div class="card-menu">
                <div class="more-back"></div>
            </div>
        </div>
    </div>
    <div class="card-template card intro-card intro-card-4 card-hide">
        <div class="front">
            <div class="gradient-overlay"></div>
            <div class="texture-overlay"></div>
            <div class="card-content">
                <div class="intro-counter"></div>
                <div class="intro-header"><i class="fa fa-check-circle"></i> That's it for the intro</div>
                <div class="intro-content">
                    <p>We hope you enjoy the remarkable things about you in your card stack</p>
                    <p>Oh, before you get on with your cards...</p>
                    <p>What do you call somebody with a nose but no body?</p>
                </div>
                <div class="card-menu">
                    <div class="more"><div><span>More info</span></div></div>
                </div>
            </div>
        </div>
        <div class="back">
            <div class="card-content">
                <div class="intro-header">Nobody Knows!</div>
                <div class="intro-content nose">
                    <p><img src="img/icons/nose.png"></p>
                </div>
                <div class="intro-content">
                    <p>&nbsp;</p>
                    <p class="left">Er, sorry. Carry on. :p</p>
                </div>
            </div>
            <div class="card-menu">
                <div class="more-back"></div>
            </div>
        </div>
    </div>

<!-- ---------------------------- End templates ---------------------------- -->

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
        ga('create', 'UA-54838479-1', 'auto');
        ga('send', 'pageview');
    </script>
    
    <script src="js/jquery-2.1.4.min.js"></script>
    <script>
    window.jQuery || document.write('<script src="js/jquery-2.1.4.min.js"><\/script>')
    </script>
    <script src="js/swing.min.js"></script>
    <script src="js/classList.js"></script>
    <script src="js/moment.min.js"></script>
    <script src="js/data-source-elements.js"></script>
    <script src="js/main.js"></script>
    <script src="js/data-load.js"></script>
    <script src="js/card-elements.js"></script>
    <script src="js/build-stack.js"></script>
</body>

</html>