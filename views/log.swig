<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]> <html class="lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]> <html class="lt-ie9"> <![endif]-->
<!--[if IE 9]>    <html class="no-js lt-ie10" lang="en"> <![endif]-->
<!--[if gt IE 9]><!-->
<html class="no-js gt-ie9 non-ie log" lang="en">
<!--<![endif]-->
<html>
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> within htacess-->
    <title>1Self</title>
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

    <script>

      var username = '{{profile.username}}';
      var registeredOn = "{{profile.registeredOn}}";
      var newActivityState = '{{newActivityState}}';

      console.log('uname is: ', username);
    
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
      <div class="page-title">Select row to log that activity</div>
      <div class="page-title-add hide">Adding new loggable activity</div>
    </header>
    
    <main role="main">
        <div class="background"></div>

        <div class="log-overlay hide">
          <input type="hidden" class="new-activity-data">
          <div class="new-activity-section activity-category hide">
            <div class="new-activity-sub-header">Select activity category</div>
            <div class="new-activity-content">
              <div class="selection-list"></div>
              <div class="button-row">
                <div class="add-new-text">Nothing that matches?</div>
                <div class="standard-button sub-button new-category-add">
                  <div>
                    <i class="fa fa-plus"></i>&nbsp;&nbsp;Add new category
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="new-activity-section activity-category-new hide">
            <div class="new-activity-sub-header">Enter category name</div>
            <div class="new-activity-content">
              <div class="activity-category-error error-text"></div>
              <input type="text" maxlength="25" placeholder="E.g. Health">
              <div class="button-row">
                <div class="standard-button new-category-save">
                  <div>
                    <i class="fa fa-check"></i>&nbsp;&nbsp;Save
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="new-activity-section activity-name hide">
            <div class="new-activity-sub-header">Select activity name</div>
            <div class="new-activity-sub-header-note">Optional. This can be left blank and logging will be done at category level</div>
            <div class="new-activity-content">
              <div class="new-activity-sub-header activity-category-text"></div>
              <div class="selection-list">      
              </div>
              <div class="button-row">
                <div class="left">
                  <div class="add-new-text">Nothing that matches?</div>
                  <div class="standard-button sub-button new-name-add">
                    <div>
                      <i class="fa fa-plus"></i>&nbsp;&nbsp;Add new name
                    </div>
                  </div>
                </div>
                <div class="left">
                  <div class="add-new-text">Or</div>
                  <div class="standard-button sub-button activity-name-skip">
                    <div>
                      <i class="fa fa-fast-forward"></i>&nbsp;&nbsp;Skip this
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="new-activity-section activity-name-new hide">
            <div class="new-activity-sub-header">Enter activity name</div>
            <div class="new-activity-content">
              <div class="new-activity-sub-header activity-category-text"></div>
              <div class="activity-name-error error-text"></div>
              <input type="text" maxlength="25" size="25" placeholder="E.g. 'sit-up' or 'coffee'">
              <div class="button-row">
                <div class="left">
                  <div class="standard-button new-name-save">
                    <div>
                      <i class="fa fa-check"></i>&nbsp;&nbsp;Save
                    </div>
                  </div>
                </div>
                <div class="left">
                  <div class="standard-button sub-button activity-name-skip">
                    <div>
                      <i class="fa fa-fast-forward"></i>&nbsp;&nbsp;Skip this
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="new-activity-section activity-property hide">
            <div class="new-activity-sub-header activity-text"></div>
            <div class="new-activity-sub-header">Select extra properties</div>
            <div class="new-activity-sub-header-note">Optional - choose none, one or some. These can be used to add extra information when you log an activity.</div>
            <div class="new-activity-content">
              <div class="selection-list"></div>
              <div class="button-row">
                <div class="left">
                  <div class="add-new-text">Something else?</div>
                  <div class="standard-button sub-button new-property-add">
                    <div>
                      <i class="fa fa-plus"></i>&nbsp;&nbsp;Add new property
                    </div>
                  </div>
                </div>
                <div class="left">
                  <div class="add-new-text">Or</div>
                  <div class="standard-button btn-finish">
                    <div>
                      <i class="fa fa-check"></i>&nbsp;&nbsp;Finish
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="new-activity-section activity-property-new hide">
            <div class="new-activity-sub-header">New property for </div>
            <div class="new-activity-content">
              <div class="input-header-text">Enter property name</div>
              <div class="property-name-error error-text"></div>
              <input type="text" maxlength="25" placeholder="E.g. 'quantity'">
              <div class="input-header-text">Select property type</div>
              <div class="property-type-error error-text"></div>
              <div class="radio-input">
                <input type="radio" name="property-name" value="numeric">
                <span>Numeric</span>
              </div>
              <div class="radio-input">
              <input type="radio" name="property-name" value="text">
                <span>Text</span>
              </div>
              <div class="radio-input">
              <input type="radio" name="property-name" value="timespan">
                <span>Timespan</span>
              </div>
              <div class="button-row">
                <div class="standard-button new-property-save left">
                  <div>
                    <i class="fa fa-check"></i>&nbsp;&nbsp;Save
                  </div>
                </div>
                <div class="standard-button sub-button new-property-cancel left">
                  <div>
                    <i class="fa fa-times"></i>&nbsp;&nbsp;Cancel
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="new-activity-section activity-property-log hide">
            <input type="hidden" class="activity-data">
            <div class="new-activity-sub-header">Fitness - Press ups</div>
            <div class="new-activity-content">
              <div class="property-log-rows">
              </div>
              <div class="button-row">
                <div class="standard-button property-log-save left">
                  <div>
                    <i class="fa fa-check"></i>&nbsp;&nbsp;Log it
                  </div>
                </div>
                <div class="standard-button sub-button property-log-cancel left">
                  <div>
                    <i class="fa fa-times"></i>&nbsp;&nbsp;Cancel
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="log-content">
          <div class="notification-row">
            <input type="hidden" class="activity-data">
            <div class="notification-success left">
              <div><i class="fa fa-check"></i>&nbsp;&nbsp;Logged!
              </div>
            </div>
            <div class="notification-name left">
              <div><span></span>
              </div>
            </div>
           <!--  <div class="notification-undo left">
              <div><span><i class="fa fa-undo"></i>&nbsp;&nbsp;Undo</span>
              </div>
            </div> -->
            <div class="notification-close right">
              <div><i class="fa fa-times"></i></div>
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
                <div class="bottom-menu">
                    <div class="previous hide">
                    </div>
                    <div class="standard-button add-new-log-item">
                      <div>
                        <i class="fa fa-plus"></i>&nbsp;&nbsp;Add new activity
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Templates -->

                <div class="list-item no-select template"><div class="list-item-text"></div></div>

                <div class="list-item property template">
                  <div class="selector not-selected"><i class="fa fa-check"></i></div>
                  <div>
                    <span class="property-name-text"></span>
                    <span class="property-type-text"></span>
                  </div>
                </div>


          <div class="log-row template">
            <input type="hidden" class="activity-data">
            <div class="log-item-name left"><div></div></div>
            <div class="log-item-button right">
              <div>
                <div class="standard-button log-button"><div></div></div>
              </div>
            </div>
            <div class="spark-histogram-box right">
              <div class="spark-histogram-container"></div>
              <div class="spark-histogram-container-cover"></div>
            </div>
            <div class="clear"></div>
          </div>


              <div class="property-log-row numeric template">
                <input type="hidden" class="property-name">
                <input type="hidden" class="property-type">
                <div class="property-enter-text"></div>
                <div class="error-text"></div>
                <input maxlength="7" type="number" class="log-numeric">
              </div>

              <div class="property-log-row timespan template">
                <input type="hidden" class="property-name">
                <input type="hidden" class="property-type">
                <div class="property-enter-text"></div>
                <div class="error-text"></div>
                <input max="23" type="number" name="hh" size="2" placeholder="HH" class="log-timespan"> :
                <input max="59" type="number" name="MM" size="2" placeholder="MM" class="log-timespan"> :
                <input max="59" type="number" name="ss" size="2" placeholder="SS" class="log-timespan">
              </div>

              <div class="property-log-row text template">
                <input type="hidden" class="property-name">
                <input type="hidden" class="property-type">
                <div class="property-enter-text"></div>
                <div class="error-text"></div>
                <textarea class="log-text"></textarea>
              </div>

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
    
    <script src="/js/jquery-2.1.4.min.js"></script>
    <script>
    window.jQuery || document.write('<script src="/js/jquery-2.1.4.min.js"><\/script>')
    </script>
    <script src="/js/d3.min.js"></script>
    <script src="/js/xdate.js"></script>
    <script src="/js/lib1self-client.js"></script>
    <script src="/js/lib1self-charting.js"></script>
    <script src="/js/main.js"></script>
    <script src="/js/log.js"></script>
   
</body>

</html>