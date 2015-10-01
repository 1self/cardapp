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
            <!-- <a class="nav-link nav-toggle" href="/quest">QUEST
                    <span>
                        <img src="images/link-dot.png" alt=""/>
                    </span>
            </a>
            <a class="nav-link nav-toggle" href="developer">DEVELOPERS
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
<div class="banner quest-banner">
    <h2>Privacy Policy</h2>

    <div class="seperator pink-divider"><img src="images/dot-red.png" alt=""></div>
</div>
<div class="seperator y-uparrow-center">
    <img src="images/yellow-arr-down.png" alt=""/>
</div>
<div class="no-exploit-content privacy">
    <h3>Why we store your data</h3>

    <p>1self provides you with a way to collect, compare, correlate and comment on your data to help you discover the remarkable things in your life. This necessarily means bringing all the data that is siloed in individual apps into a single
        data store. We take all reasonable industry standard measures to ensure that this data stays secure and
        private only to you.
    </p>

    <p>This privacy policy has been compiled to better serve those who are concerned with how their 'Personally
        identifiable information' (PII) is being used online. PII, as used in US privacy law and information
        security, is information that can be used on its own or with other information to identify, contact, or
        locate a single person, or to identify an individual in context. Please read our privacy policy carefully to
        get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable
        Information in accordance with our website.
    </p>

    <h3>What personal information do we collect from the people that visit our blog, website or app?</h3>

    <p>When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address
        or other details to help you with your experience.
    </p>

    <h3>When do we collect information?</h3>

    <p>We collect personally identifiable information from you when you register on our site or enter information on
        our site.
    </p>

    <p>When you use our apps, plugins and integrations activity data is collected and sent securely to 1self in the
        form of events.
    </p>


    <h3>How do we use your information?</h3>

    <p>We may aggregate your data and anonymise it in order to provide
        visualisations to the community. We will ensure that no identifiable information from your activities will
        be used in these visualizations. We do not sell or give any data to 3rd parties.
    </p>
    <p>
    Additionally we may use your data to:
    </p>

    <ul>
        <li>Personalize your experience and to allow us to deliver the type of content and product offerings in
            which you are most interested.
        </li>
        <li>Send you periodic emails regarding your account, data in your account or other products and services.</li>
    </ul>

    <h3>How do we protect visitor information?</h3>

    <p>Your personal information is contained behind secured networks and is only accessible by a limited number of
        persons who have special access rights to such systems, and are required to keep the information
        confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer
        (SSL) technology.
    </p>

    <h3>Do we use 'cookies'?</h3>

    <p>Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive
        through your Web browser (if you allow) that enables the site's or service provider's systems to recognize
        your browser and capture and remember certain information. For instance, we use cookies to help us remember
        that you have logged in to the service. They are also used to help us understand your preferences based
        on previous or current site activity, which enables us to provide you with improved services. We also use
        cookies to help us compile aggregate data about site traffic and site interaction so that we can offer
        better site experiences and tools in the future.
    </p>

    <p>You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off
        all cookies. You do this through your browser (like Internet Explorer) settings. Each browser is a little
        different, so look at your browser's Help menu to learn the correct way to modify your cookies.</p>

    <p>If users disable cookies in their browser:
    </p>

    <p>If you disable cookies off, some features will be disabled It will turn off some of the features that make
        your site experience more efficient and some of our services will not function properly.</p>



    <h3>Third Party Disclosure</h3>

    <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information.
    </p>


    <p>We have not enabled Google AdSense on our site but we may do so in the future. We do use Google Analytics.
    </p>

    <p>COPPA (Children Online Privacy Protection Act)
    </p>

    <p>When it comes to the collection of personal information from children under 13, the Children's Online Privacy
        Protection Act (COPPA) puts parents in control. The Federal Trade Commission, the nation's consumer
        protection agency, enforces the COPPA Rule, which spells out what operators of websites and online services
        must do to protect children's privacy and safety online.
    </p>

    <p>We do not market to children.
    </p>

    CAN SPAM Act
    <p>The CAN-SPAM Act is a law that sets the rules for commercial email, establishes requirements for commercial
        messages, gives recipients the right to have emails stopped from being sent to them, and spells out tough
        penalties for violations.
    </p>

    <p>We collect your email address in order to:
    </p>
    <ul>
        <li>Send information, respond to inquiries, and/or other requests or questions.</li>
        <li>Send you periodic updates about your account or our services.</li>
    </ul>
    <p>To be accordance with CANSPAM we agree to the following:
    </p>
    <ul>
        <li>NOT use false, or misleading subjects or email addresses</li>
        <li>Identify the message as an advertisement in some reasonable way</li>
        <li>Include the physical address of our business or site headquarters</li>
        <li>Monitor third party email marketing services for compliance, if one is used.</li>
        <li>Honor opt-out/unsubscribe requests quickly</li>
        <li>Allow users to unsubscribe by using the link at the bottom of each email</li>
    </ul>

    <h4>If at any time you would like to unsubscribe from receiving future emails, you can follow the instructions
        at the bottom of each email.</h4>

    <h4>Personal Activity Data</h4>

    <p>1self stores your personal activity data. 1self may grant access to this data to employees who require access
        to it in order to complete tasks relating to the operation of 1self. 1self won't share this data outside of
        1self unless you choose to permit it.
    </p>

    <p>Should you disclose personally identifiable information in comments, then share the visualization that those
        comments sit on, that information will become public.
    </p>

    <h4>Password protection</h4>

    <p>We use 3rd parties such as Github and Facebook for authorization and store no password in our system. These 3rd party services provide 2 factor authentication.
        You are responsible for maintaining the secrecy of your password and ensuring that your account is
        secure.
    </p>

    <h4>Deleting your information</h4>

    <p>You can make a request to have all your data deleted at any time. Email team@1self.co, quoting your 1self username.
    </p>

    <h4>How we secure your data</h4>

    <p>he transmission of personal activity data is done using industry standard encryption in the form of SSL.
        Databases are hosted on secure servers with password protected access that only 1self employees have access
        to. Personally identifiable information is separated from your activity data to minimise the number of
        employees who could identify you from the data.
    </p>

    <h3>Contacting Us</h3>

    <p>www.1self.co<br/>
        London<br/>
        UK<br/>
        30 Brock Street<br/>
        London<br/>
        NW1 3FG<br/>
        team@1self.co
    </p>
</div>
<div class="seperator y-dwarrow-center">
    <img src="images/yellow-arr-up.png" alt=""/>
</div>
<div class="invite invite-footer">
    <h1><img src="images/logo.png" alt="logo"/>
        <wbr/>
        Remarkable you
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
        <!-- <li><a href="/quest">quest</a>
        </li> -->
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
        <li>UK office
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
            <a href="https://twitter.com/1self_co"><span><i class="fa fa-twitter"></i></span></a>
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
