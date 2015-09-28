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
            <a class="button signupButton nav-toggle" id="loginButton" href="https://app.1self.co/login?intent=website_login">Log in</a>
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
    <div class="build-banner-white">
        <h2>Unleash the data!</h2>

        <p>Unleashing all of our personal data to help us all live smarter lives is a momentous quest and immense task.
            But the impact on each of our lives will be awesome.
        </p>

        <p>All of the data that you create as you go about your life, collected in your own record for your own benefit
            without having to worry about being exploited for it.
        </p>
    </div>
    <div class="grid-reset-mobile any-data">
        <div class="grid-row">
            <div class="grid-cell img">
                <div class="yarrow-down-desktop">
                    <img src="images/yellow-arr-down.png" alt=""/>
                </div>
                <img src="images/any-data.svg" alt="" class="united"/>
            </div>
            <div class="grid-cell content">
                <h2>Any data. Every niche</h2>
                <b>You lead a busy life but whatever you're up to 1self will be there helping you live it smarter.
                </b>

                <p>Apps, websites and devices capture the details about your life and 1self can integrate with them so
                    that your activity data is at your disposal.</p>

                <p>By using 1self you'll be able to choose which data is important or interesting to you.
                </p>
                <!-- <a class="button" href="#">TELL ME MORE</a>
            -->
                <div class="red-dot-desktop"><img src="images/dot-red.png" alt=""/></div>
            </div>
        </div>
    </div>
    <div class="grid-reset-mobile integrity">
        <div class="grid-row">
            <div class="grid-cell content">
                <h2>Integration integrity</h2>

                <p>The apps, websites and devices that you use collect different data in different ways. It'd be
                    impossible for us to create integrations for them all.</p>

                <p>However, large tasks become small when divided amongst many people and that's why 1self lets
                    developers easily build integrations for the data that's interesting to them and to easily integrate
                    their apps, websites and devices.</p>

                <p>In return 1self can help apps, websites and devices be more popular and engaging.
                </p>
            </div>
            <div class="grid-cell img">
                <img src="images/integration.svg" alt="" class="build"/>
            </div>
        </div>
    </div>
    <a href="/#no-exploit" class="seperator next-page">
        <div class="grid">
            <div class="grid-row">
                <div class="grid-cell text-right"><img src="images/next-btn_left.png"></div>
                <div class="grid-cell next-btn">Next - It's your data <span style="font-size:1.2em;">></span></div>
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
