<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta content="images/fav.ico" itemprop="image">
    <meta name="description"
          content="1self lets you collect, compare, correlate and comment on your big data to live a smarter life">
    <meta property="og:title"
          content="1self - live smarter" />
    <meta property="og:description"
          content="1self lets you collect, compare, correlate and comment on your big data to live a smarter life" />
    <meta property="og:image"
      content="http://www.1self.co/images/1self_logo_fb.png" />
    <link rel="icon" href="images/fav.ico">
    <link rel="stylesheet" type="text/css" href="slick/slick.css">
    <link rel="stylesheet" type="text/css" href="css/one.css">
    <link rel="stylesheet" type="text/css" href="css/unite.css">
    <script src="js/jquery-2.1.4.min.js" type="text/javascript"></script>
    <script src="js/invite.js" type="text/javascript"></script>
    <title>1self - live smarter</title>
</head>
<body>
<div class="header-wrapper">
    <header class="page-nav">
        <div class="logo">
            <a href="/"><img src="images/logo.png" alt="logo"/></a>
        </div>
        <div class="mobile-only-nav nav-toggle">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <nav class="nav-right" id="collapse-link">

            <a class="nav-link nav-toggle" href="/#learn-more">LEARN MORE
          <span>
            <img src="images/link-dot.png" alt=""/>
          </span>
            </a>
            <a class="nav-link nav-toggle" href="/quest">QUEST
          <span>
            <img src="images/link-dot.png" alt=""/>
          </span>
            </a>
            <!-- <a class="nav-link nav-toggle" href="developer">DEVELOPERS
          <span>
            <img src="images/link-dot.png" alt=""/>
          </span>
            </a> -->
            <a class="nav-link nav-toggle" href="http://blog.1self.co" target="_blank">BLOG
          <span>
            <img src="images/link-dot.png" alt=""/>
          </span>
            </a>
            <a class="button signupButton nav-toggle" id="loginButton" href="http://app.1self.co/login?intent=website_login">Log in</a>
            <a class="button signupButton nav-toggle" href="/#signup">Join</a>
        </nav>
    </header>
</div>


    <!-- join Box ---------------------------------------------------------------- -->
    <div id="joinBox">
      <div class="joinHeading">Sign up
        <div class="closeButton">X</div>
      </div>
      <form action="https://QuantifiedDev.us8.list-manage.com/subscribe/post?u=6cba468ceea6fc41a7d7db50e&amp;id=4a6bbc5899" class="validate" id="signupWaitListForm" style="display:none;" method="post">
        Tell us your email and we'll tell you as soon as we've got new signup options.
        <input type="email" class="oneselfEmailWaitQueue" id="mce-EMAIL1" name="EMAIL" placeholder="you@email.com" required />
        <button type="submit" onclick="cacheEmail1()">Send</button>
        <div class="signup_go_back_link">
          <a href="#" id="signup_go_back">&lt;&lt; Go back</a>
        </div>
      </form>
      <form id="joinForm" style="display:block;">
        <div class="oneselfUsername">
          Choose your 1self username:  <input type="text" id="oneselfUsernameJoin" name="oneselfUsernameJoin" required />
        </div>
        <div id="joinErrorMessage" class="errorMessage"></div>
        
        <div class="row margin-top-five">
          <div class="signup-details">Now choose a service*</div>
          <input type="hidden" id="service" name="service">
          <div class="row margin-top-five">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <button id="signup_with_github" class="btn btn-lg authservice-button githubbutton authinput" type="submit" value="github">
              <div class="authserviceicon"><i class="fa fa-github-square"> </i></div>
              <div class="authservicetext">Join using GitHub</div></button>
              <div class='buttonclear'></div>
            </div>
          </div>
          <div class="row margin-top-five">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <button  id="signup_with_facebook" class="btn btn-lg authservice-button facebookbutton authinput" type="submit" value="facebook">
              <div class="authserviceicon"><i class="fa fa-facebook-square"></i></div>
              <div class="authservicetext">Join using Facebook</div></button>
              <div class='buttonclear'></div>
            </div>
          </div>
          <div class="join_waitlist_msg">
            I don't want to sign up with GitHub or Facebook
            <a href="#" id="signupWaitListFormLink">Let me know when you have other sign up options.</a>
          </div>
          <div class="joinfooter">* We'll use your email address to talk to you when important things happen. We'll never share it or use it to spam you.</div>
        </div>
      </form>
    </div>
    <!-- ------------------------------------------------------------------------ -->
    
<div class="page-content">
    <div class="banner-white">
        <h2 class="unite-heading"><span class="maroon">1self</span> lets you use your personal data to bring new
            understanding to how you live your life. Entertainment, personal stories you can share, a new level of
            self-awareness and insights that could help you become <br/>
            <span class="maroon">happier, healthier, wealthier and wiser</span>
        </h2>
    </div>
    <div class="grid-reset-mobile enable-smart-life">
        <div class="grid-row">
            <div class="grid-cell content">
                <div class="yarrow-down-desktop">
                    <img src="images/yellow-arr-down.png" alt=""/>
                </div>
                <h2>Enable your smarter life</h2>
                <b>Easily correlate, visualise and<br/>
                    have fun with your data.</b>

                <div>
                    <p class="smarterlifepoint">How often do you check your phone?
                    </p>

                    <p class="smarterlifepoint">How does noise level affect your productivity?
                    </p>

                    <p class="smarterlifepoint">
                        How healthy is your diet?
                    </p>
                </div>
                <!-- <a class="button" href="#">TELL ME MORE</a> -->
            </div>
            <div class="grid-cell img">
                <img src="images/smart-life.svg" alt="" class="build"/>

                <div class="red-dot-desktop"><img src="images/dot-green.png" alt=""/></div>
            </div>
        </div>
    </div>
    <div class="grid-reset-mobile united-data">
        <div class="grid-row">
            <div class="grid-cell img">
                <img src="images/big-data.svg" alt="" class="united"/>
            </div>
            <div class="grid-cell content">
                <h2>Your "Big Data" in 1 place</h2>
                <b>Connect apps, devices, sensors <br/>
                    and services
                </b>

                <p>Your phone, apps, devices, websites you visit and
                    all the things you interact with in the world are collecting
                    data about you. 1self gives you the power to unite your data for your own benefit.
                </p>
                <!-- <a class="button" href="#">TELL ME MORE</a>
            -->
                <div class="red-dot-desktop"><img src="images/dot-red.png" alt=""/></div>
            </div>
        </div>
    </div>
    <div class="content-slider-container">
        <div class="content-slider">
            <div class="slide-content grid-reset-mobile">
                <div class="grid-row">
                    <div class="grid-cell content">
                        <h2>Understand yourself</h2>
                        <b>How well do you really know yourself?</b>

                        <p>
                            How many of hours did you work last week? How much sleep did you get? What did you eat? What
                            did you spend money on?
                        </p>

                        <p>
                            1self can give you the answers to these question and more. By collecting your data in one
                            place you'll understand yourself and what really makes you tick.
                        </p>
                    </div>
                    <div class="grid-cell img">
                        <img src="images/slider/understand.svg" alt=""/>
                    </div>
                </div>
            </div>
            <div class="slide-content grid-reset-mobile">
                <div class="grid-row">
                    <div class="grid-cell content">
                        <h2>Tell stories</h2>

                        <p>
                            Where did you travel? How far did you run? How many gigs have you been to? How long is your
                            commute? Why don't you sleep well on Sundays?
                        </p>

                        <p>
                            With 1self, you can tell stories about your life using the data that describes your
                            activities. Share your data visualisations to start discussion and debate.
                        </p>
                    </div>
                    <div class="grid-cell img">
                        <img src="images/slider/stories.svg" alt=""/>
                    </div>
                </div>
            </div>
            <div class="slide-content grid-reset-mobile">
                <div class="grid-row">
                    <div class="grid-cell content">
                        <h2>Compare with friends or the rest of the world</h2>

                        <p>
                            Do you drink more than other people your age? Where are you in your city's commute time
                            league table? Do you travel more than your friends?

                        </p>

                        <p>
                            You can be curious or you can be competitive. Either way, comparisons give you new ways to
                            consider your activities.
                        </p>
                    </div>
                    <div class="grid-cell img">
                        <img src="images/slider/compare.svg" alt=""/>
                    </div>
                </div>
            </div>
            <div class="slide-content grid-reset-mobile">
                <div class="grid-row">
                    <div class="grid-cell content">
                        <h2>Get insights</h2>
                        <b>
                            Data doesn't tell you much on its own.
                        </b>

                        <p>
                            1self brings your data to life by automatically connecting and correlating it to produce
                            interesting, useful and actionable insights about your life.
                        </p>

                        <p>
                            Maybe, if you go to bed earlier you could earn more money. Or if you took a different route
                            to work you'd be less stressed all day. With 1self you can find out.
                        </p>
                    </div>
                    <div class="grid-cell img">
                        <img src="images/slider/insight.svg" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <a href="/#cant-build" class="seperator next-page">
        <div class="grid">
            <div class="grid-row">
                <div class="grid-cell text-right"><img src="images/next-btn_left.png"></div>
                <div class="grid-cell next-btn">Next - Unleash the data! <span style="font-size:1.2em;">></span></div>
                <div class="grid-cell text-left"><img src="images/next-btn_right.png"></div>
            </div>
        </div>
    </a>

    <div class="invite invite-footer">
        <h1><img src="images/logo.png" alt="logo"/>
            <wbr/>
            live smarter
        </h1>
        <div style="margin-bottom:10px;">Claim your username. Join our beta </div>
        <input type="text" name="username" class="1s_username" id="mce-username" value="" placeholder="Choose your 1self username"/>
        <input  type="submit" value="Join 1self" class="join_username_btn" />

    </div>
</div>

<footer class="footer">
    <ul class="nav relative">
        <li class="heading">1self</li>
        <li class="seperator-left">
            <img src="images/seperator.png" alt=""/>
        </li>
        <li><a href="/">home</a>
        </li>
        <li><a href="/#learn-more">learn more</a>
        </li>
        <li><a href="/quest">quest</a>
        </li>
    </ul>
    <ul class="nav">
        <li class="heading">other things</li>
        <li class="seperator-center">
            <img src="images/seperator.png" alt=""/>
        </li>
        <li><a href="/privacy">privacy policy</a></li>
        <li><a href="/no-exploit">pricing</a></li>
    </ul>
    <ul class="nav">
        <li class="heading">contact</li>
        <li class="seperator-center">
            <img src="images/seperator.png" alt=""/>
        </li>
        <li>UK office:<br/>
            30 Brock Street, London, NW1 3FG<br/><br/>
            <a href="mailto:team@1self.co">mail: team@1self.co </a>
        </li>
    </ul>
    <ul class="nav connect">
        <li class="heading">connect</li>
        <li class="seperator-right">
            <img src="images/seperator.png" alt=""/>
        </li>
        <li>
            <a href="https://twitter.com/1self_co" target="_blank"><span><i class="fa fa-twitter"></i></span></a>
            <a href="mailto:team@1self.co"><span><i class="fa fa-envelope"></i></span></a>
        </li>
    </ul>
    <div class="copyright">Copyright © 2014 1SELF. All rights reserved.
    </div>
</footer>
<script type="text/javascript" src="slick/slick.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $('.content-slider').slick();
    });
</script>
<script src="js/app.js" type="text/javascript"></script>



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
 $('.join_email_btn').on('click', function() {
   ga('send', 'event', 'invite_button', 'invite_button_click');
 });

 if(window.location.search.match(/referrer/)){
   ga('send', 'event', { eventCategory: 'Signup', eventAction: 'signup_with_referrer_code', eventLabel: 'started'});
 }
</script>

<!-- UserVoice help tab -->
<script>
// Include the UserVoice JavaScript SDK (only needed once on a page)
UserVoice=window.UserVoice||[];(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/27bdjY5SdHaM9zOzGOCJQ.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})();

//
// UserVoice Javascript SDK developer documentation:
// https://www.uservoice.com/o/javascript-sdk
//

// Set colors
UserVoice.push(['set', {
  accent_color: '#00ad87',
  trigger_color: '#454b54',
  trigger_background_color: '#cf4b9a'
}]);

// Identify the user and pass traits
// To enable, replace sample data with actual user traits and uncomment the line
UserVoice.push(['identify', {
  //email:      'john.doe@example.com', // User’s email address
  //name:       'John Doe', // User’s real name
  //created_at: 1364406966, // Unix timestamp for the date the user signed up
  //id:         123, // Optional: Unique id of the user (if set, this should not change)
  //type:       'Owner', // Optional: segment your users by type
  //account: {
  //  id:           123, // Optional: associate multiple users with a single account
  //  name:         'Acme, Co.', // Account name
  //  created_at:   1364406966, // Unix timestamp for the date the account was created
  //  monthly_rate: 9.99, // Decimal; monthly rate of the account
  //  ltv:          1495.00, // Decimal; lifetime value of the account
  //  plan:         'Enhanced' // Plan name for the account
  //}
}]);

// Add default trigger to the bottom-right corner of the window:
UserVoice.push(['addTrigger', { mode: 'contact', trigger_position: 'bottom-right' }]);

// Or, use your own custom trigger:
//UserVoice.push(['addTrigger', '#id', { mode: 'contact' }]);

// Autoprompt for Satisfaction and SmartVote (only displayed under certain conditions)
UserVoice.push(['autoprompt', {}]);
</script>


</body>
</html>
