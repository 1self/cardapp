<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta content="/images/fav.ico" itemprop="image">
    <meta name="description"
    content="1self reveals the extraordinary events in your everyday life by analysing the personal data you collect">
    <meta property="og:title"
    content="1self - Remarkable you" />
    <meta property="og:description"
    content="1self reveals the extraordinary events in your everyday life by analysing the personal data you collect" />
    <meta property="og:image"
    content="http://www.1self.co/images/1self_logo_fb.png" />
    <link rel="icon" href="/images/fav.ico">
    <link rel="stylesheet" type="text/css" href="/css/one.css">
    <script src="/js/jquery-2.1.4.min.js" type="text/javascript"></script>
    <script src="/js/invite.js" type="text/javascript"></script>

    <title>1self - Remarkable you</title>
  </head>
  <body>
    <div class="header-wrapper">
      <header class="page-nav">
        <div class="logo">
          <a href="/"><img src="/images/logo.png" alt="logo"/></a>
        </div>
        <div class="mobile-only-nav nav-toggle">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <nav class="nav-right" id="collapse-link">
          <a class="nav-link nav-toggle" href="#learn-more" id="lnkLearnMore">LEARN MORE
            <span>
            <img src="/images/link-dot.png" alt=""/>
            </span>
          </a>
          <!-- <a class="nav-link nav-toggle" href="/quest">QUEST
            <span>
            <img src="/images/link-dot.png" alt=""/>
            </span>
          </a>
          <a class="nav-link nav-toggle" href="developer">DEVELOPERS
            <span>
            <img src="/images/link-dot.png" alt=""/>
            </span>
          </a> -->
          <a class="nav-link nav-toggle" href="http://blog.1self.co" target="_blank">BLOG
            <span>
            <img src="/images/link-dot.png" alt=""/>
            </span>
          </a>
          <a class="button signupButton nav-toggle" id="loginButton" href="/auth/signin">Log in</a>
          <a class="button signupButton nav-toggle" id="joinButton" href="#">Join</a>
        </nav>
      </header>
    </div>

    <!-- Conditional content for plugin click through -->
    <div id="landing-wrapper" style="display: none">
      <div class="page-content" style="padding-top: 59px;">
        <div class="banner center" style="padding-top: 10px">
          <h1>Welcome to 1self</h1>
        </div>
        <div class="grid-reset-mobile signup-content">
          <div class="grid-row">
            <div class="grid-cell content" id="sublime-content" style="display: none">
              <h2>Your coding activity data</h2>
              <p>This chart shows you your total active coding duration by day.</p>
              <p>Your data is private and secure. No detail of what you’ve coded or your filenames is sent to 1self.
              </p>
              <div class="join-div">
                <a id="join_button" href="" class="join-button">Join 1self</a>
              </div>
              <p class="why-join"><a href="#learn-more-landing">And <span>do more with your data</span></a></p>
            </div>
            <div class="grid-cell content" id="cyber-dojo-content" style="display: none">
              <h2>Your dojo data</h2>


              <p>Cyber-dojo uses 1self to let you to collect and visualise your dojo data.</p>

              <p>This spinning globe shows dojos happening around the world on <wbr><a href="http://cyber-dojo.org/" target="_blank" class="blue">Cyber-Dojo.org</a></p>
              <div class="join-div">
                <a id="join_button" href="" class="join-button">Join 1self</a>
              </div>
              <p class="why-join"><a href="#learn-more-landing">And <span>do more with your data</span></a></p>

            </div>

            <div class="grid-cell invite">
              <iframe id="landing-frame" style="height: 460px;" ></iframe>
              <div class="red-dot-desktop"><img src="/images/dot-yellow.png" alt=""/></div>
            </div>
          </div>
        </div>
        <div id="learn-more-landing" class="grid-reset-mobile united-data">
          <div class="grid-row">
            <div class="grid-cell content">
              <h2>Do more with your data</h2>
              <p>Join 1self to comment on your data, compare with others and join it with your data from other sources like Github, Hacker News, Stack Overflow, Visual Studio, IntelliJ IDEA and more.
              </p>
              <p>Discover the remarkable you from the data that tells your story</p>
              <div class="join-div">
                <a id="join_button" href="" class="join-button">Join 1self</a>
              </div>
            </div>
            <div class="grid-cell img">
              <img style="width: 472px" src="/images/heatmap_coding.png">
            </div>
          </div>
        </div>
      </div>
      <div class="center what-is">
        <h3>What is 1self?</h3>
        <img src="/images/yellow-arr-down.png" style="height: 50px; position: relative;
  top: 22px;">
      </div>
    </div>
    <!-- end conditional content -->


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
      <div class="banner center">
        <h1>Remarkable you</h1>
        <img src="/images/main-banner.png" alt="banner one self"/>
        <p>1self reveals the extraordinary events in your everyday life by analysing the personal data you collect
        <!-- Discover remarkable things about you
        <span>by connecting your data</span> -->
        </p>
      </div>
      <div id="signup" class="grid-reset-mobile signup-content">
        <div class="grid-row">
          <div class="grid-cell content">
            <div class="yarrow-down-desktop">
              <img src="/images/yellow-arr-down.png" alt=""/>
            </div>
            <h2>Join our beta now</h2>
            <ul>
              <li>Claim your 1self username</li>
              <li>Get 1self free for two years</li>
            </ul>
          </div>
          <div class="grid-cell invite">
            <h3>Hurry, early adopter places are limited!</h3>
            <input type="text" name="username" class="1s_username" id="mce-username" value="" placeholder="Choose your 1self username"/><input  type="submit" value="Join 1self" class="join_username_btn" />
            <div class="red-dot-desktop"><img src="/images/dot-yellow.png" alt=""/></div>
          </div>
        </div>
      </div>
      <div id="learn-more" class="grid-reset-mobile united-data">
        <div class="grid-row">
          <div class="grid-cell content">
            <h2>Your remarkable life</h2>
            <b>Every day you do remarkable things.</b>
            <p>Ok, so perhaps not scaling Everest or curing malaria - not every day. But remarkable nevertheless; those little cheerable wins and I-did-thats. <!-- You know, the ones that whisper &quot;that&apos;s pretty cool, tell someone&quot;. -->
            </p>
            <p>Your fastest commute, a 14-day coding streak, your record number of messages sent, the most loves of your photos or flapping your way to a new high score.
            </p>
            <p>Why collect your remarka-bites? They fuel your curiosity, and when you share them they fuel conversation.</p>
            <p>1self will help you discover your remarkable self, every day.</p>

            <!-- <a class="button" href="/unite-data">TELL ME MORE</a> -->
          </div>
          <div class="grid-cell img">
            <p class="header">Remarkable</p>
            <p class="phonetic">[ri-<bold>mahr</bold>-k<italics>uh</italics>-b<italics>uh</italics> l]</p>
            <div class="remarkable-desc">
              <p class="sub-header">Adjective</p>
              <ol type="1">
                <li>notably or conspicuously unusual; extraordinary: a remarkable change.</li>
                <li>worthy of notice or attention.</li>
              </ol>
              <p class="sub-header">Antonyms</p>
              <ol>
                <li>common</li>
                <li>ordinary</li>
              </ol>
            </div>
            <div class="red-dot-desktop"><img src="/images/dot-red.png" alt=""/></div>
          </div>
        </div>
      </div>
      <div class="grid-reset-mobile build-data" id="cant-build">
        <div class="grid-row">
          <div class="grid-cell img">
            <div class="image-row">
              <div class="image-cell-30 left-cell">
                <img src="/images/slider/understand.svg" alt=""/>
              </div>
              <div class="image-cell-30">
                <img src="/images/slider/stories.svg" alt=""/>
              </div>
              <div class="image-cell-30 right-cell">
                <img src="/images/slider/compare.svg" alt=""/>
              </div>
            </div>
            <div class="clear-float"></div>
            <!-- <img src="/images/united-data.svg" alt="" class="united"/> -->
          </div>
          <div class="grid-cell content">

            <h2>Your remarkable data</h2>
            <b>Your data tells your remarkable life story.</b>
            
            <p>Apps, websites, devices you use, the world around you; they all capture the threads of your story in little blobs of data.
            </p>
            <p>Use 1self to find insights, compare with friends or the world and connect and correlate data from different sources. 1self will weave your data into the story of the remarkable things that you do.
            </p>
            <p>Remarkable is the new, the memorable, the shareable. Remarkable is not ordinary or commonplace and nor are you.</p>
            <!-- <a class="button" href="/unite-data">TELL ME MORE</a> -->
            <div class="red-dot-desktop"><img src="/images/dot-green.png" alt=""/></div>
          </div>
        </div>
      </div>
      <div class="grid-reset-mobile no-profit" id="no-exploit">
        <div class="grid-row">
          <div class="grid-cell empower">
            <h2>1self will never exploit your data</h2>
            <p>Your data will be securely stored and private to you. We&apos;ll never sell or share your data (unless you choose to).
            </p>
            <p class="more-info"><a class="button" href="/info/no-exploit">More info</a></p>
          </div>
        </div>
      </div>
      <div class="seperator y-dwarrow-center">
        <img src="/images/yellow-arr-up.png" alt=""/>
      </div>
      <div class="invite invite-footer">
        <div class="logo-and-tagline">
          
          <h1><img src="/images/logo.png" alt="logo"/> <span>Remarkable you</span></h1>
        </div>
        
        <div class="claim-text">Claim your username. Join our beta </div>
        <input type="text" name="username" class="1s_username" id="mce-username" value="" placeholder="Choose your 1self username"/><input  type="submit" value="Join 1self" class="join_username_btn" />
      </div>
    </div>
    <footer class="footer">
      <ul class="nav relative">
        <li class="heading">1self</li>
        <li class="seperator-left">
          <img src="/images/seperator.png" alt=""/>
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
    <img src="/images/seperator.png" alt=""/>
  </li>
  <li><a href="/info/privacy">privacy policy</a></li>
  <li><a href="/info/no-exploit">pricing</a></li>
</ul>
<ul class="nav">
  <li class="heading">contact</li>
  <li class="seperator-center">
    <img src="/images/seperator.png" alt=""/>
  </li>
  <li>UK office:<br/>
    30 Brock Street, London, NW1 3FG<br/><br/>
    <a href="mailto:team@1self.co">mail: team@1self.co </a>
  </li>
</ul>
<ul class="nav connect">
  <li class="heading">connect</li>
  <li class="seperator-right">
    <img src="/images/seperator.png" alt=""/>
  </li>
  <li>
    <a href="https://twitter.com/1self_co" target="_blank"><span><i class="fa fa-twitter"></i></span></a>
    <a href="mailto:team@1self.co"><span><i class="fa fa-envelope"></i></span></a>
  </li>
</ul>
<div class="copyright">Copyright © 2014 1SELF. All rights reserved.
</div>
</footer>
<script src="/js/app.js" type="text/javascript"></script>
<script src="/js/jquery-2.1.4.min.js"></script>
<script src="/js/analytics.js"></script>
<script>
    var analytics = new Analytics('{{profile.encodedUsername}}');
    analytics.send('send', 'pageview');
    var ev = {};
    ev.eventCategory = 'index';
    ev.eventAction = 'load';
    ev.eventLabel = 'page-load';
    analytics.send( 'event', ev);
    $('.join_email_btn').on('click', function() {
        var inviteEvent = {
          eventCategory: 'index',
          eventAction: 'invite-button',
          eventLabel: 'invite-button-click'
        };

        analytics.send(inviteEvent);
    });
    
    if(window.location.search.match(/referrer/)){
        var referrerEvent = {
            eventCategory:  'index',
            eventAction:  'signup_with_referrer_code',
            eventLabel:  'started'
        };
        
        analytics.send(referrerEvent);
    }
</script>
<!-- UserVoice help tab -->
<script>
// Include the UserVoice JavaScript SDK (only needed once on a page)
UserVoice=window.UserVoice||[];(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/27bdjY5SdHaM9zOzGOCJQ.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s);})();

UserVoice.push(['set', {
accent_color: '#00ad87',
trigger_color: '#454b54',
trigger_background_color: '#cf4b9a'
}]);
UserVoice.push(['identify', {
}]);
UserVoice.push(['addTrigger', { mode: 'contact', trigger_position: 'bottom-right' }]);
UserVoice.push(['autoprompt', {}]);
</script>
</body>
</html>