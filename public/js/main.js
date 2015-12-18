  $(document).keydown(function (e) {
      var keyCode = e.keyCode || e.which,
      arrow = {left: 37, up: 38, right: 39, down: 40 };

      switch (keyCode) {
          case arrow.left:
              $('.previous').trigger('click');
          break;
          case arrow.right:
              $('.next').trigger('click');
          break;
          case arrow.down:
              $('.topOfMain .more').trigger('click');
          break;
          case arrow.up:
              $('.topOfMain .more-back').trigger('click');
          break;
          default: return; // allow other keys to be handled
      }
      e.preventDefault();
      // prevent default action (eg. page moving up/down)
      // but consider accessibility (eg. user may want to use keys to choose a radio button)
  });   
// Menu


(function() {
  showDashboardNav();

  var getCardData = function(cardElem){
      var cardData = cardElem.find('.cardData');
      cardData = decodeURIComponent(cardData.val());
      cardData = JSON.parse(cardData);
      return cardData;
  };

  var getEventLabel = function(cardData, index){
      var result = cardData.type + '/';
      result += cardData.cardDate + '/';
      if(cardData.objectTags){
          result += cardData.objectTags + '/' + cardData.actionTags + '/';
      }
      result += (index - globalCardsArray.length);

      return result;
  };

  $(".flyout-btn").click(function() {
    console.log('click 1');
    $(".flyout-btn").toggleClass("btn-rotate");
    $(".nav-overlay").toggleClass("open hide");
    // $(".flyout").find("a").removeClass();
    $('.nav-icon').toggleClass('open');

    $li = $('.topOfMain');
    var menuEvent = {
      eventCategory: 'navigation',
      eventAction: 'menu-button-click',
      eventLabel: getEventLabel(getCardData($li), $li.attr('cardIndex') )
    };
    analytics.send('event', menuEvent);

    return $(".flyout").removeClass("flyout-init fade").toggleClass("expand");
  });

  $('.removed-from-deck').delay(1000).remove();

  $(".nav-overlay .navigation-content").find(".navigation-item").click(function (e) {
    console.log('click 6');
    e.preventDefault();                   // prevent default anchor behavior
    var goTo = this.getAttribute("href"); // store anchor href

    if (goTo.substr(0, 1) === '/')
      window.location.href = goTo;
    else
      window.open(goTo);
  });  

}).call(this);

function showDashboardNav() {
  var lastPrevUserDate = new Date('2015-10-14T20:50:40.640Z');
  if (registeredOn && registeredOn < lastPrevUserDate) { // registeredOn is declared in the html page
      $('.dashboard-nav').removeClass('hide');
  }  
}

function clickPulse(x, y, $pulseElem) {
    
    var clickY = y - $pulseElem.offset().top;
    var clickX = x - $pulseElem.offset().left;
    var setX = parseInt(clickX);
    var setY = parseInt(clickY);

    $pulseElem.find("svg.click-circle").remove();
    $pulseElem.append('<svg class="click-circle"><circle cx="'+setX+'" cy="'+setY+'" r="'+100+'"></circle></svg>');


    var c = $pulseElem.find("circle");
    c.animate(
        {
          "r" : $pulseElem.outerWidth()
        }, 200, function() { $pulseElem.find("svg.click-circle").remove(); }
    );  
}




