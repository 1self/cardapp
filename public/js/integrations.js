$(document).ready(function() {
    executeOnLoadTasks();
});

function executeOnLoadTasks() { 

    var onGotData = function(integrationsJSON) {
        renderIntegrationsList(integrationsJSON);

        renderSectionExpansion();
    };

    window.addEventListener("popstate", function(e) {
        console.log('popstate', location.pathname, e);
        renderSectionExpansion();
    });

    getIntegrationsInCategories(onGotData);

    if (localStorage.seenIntegrationIntro) {
        // $('.overlay').hide();
    } else {
        $('.overlay').removeClass('hide');
        $('.overlay').addClass('on-top');

        $('.welcome-header').text('Welcome, ' + username + '!');

        $('.get-started-button').click(function() {
            $('.overlay.on-top').fadeOut();

            setTimeout(function() {
                addHighlightGlow($('.integrations-section-header'), 3000);
            }, 1500);

            localStorage.seenIntegrationIntro = true;
        });    
    }
}

function renderIntegrationsList(integrationsJSON) {

    var $integrationsContent = $('.integrations-content');
    var $sectionTemplate = $('.integrations-section.template');
    var $smallServiceTemplate = $('.section-content-collapse .service-container.template');
    var $integrationCardTemplate = $('.integration-card-container.template');

    integrationsJSON.forEach(function (category) {
        var $categorySection = buildCategorySection(category, $sectionTemplate, $smallServiceTemplate, $integrationCardTemplate);
        $integrationsContent.append($categorySection);

        $categorySection.click(function() {
            var $clickedSection = $(this);
            var headerText = $clickedSection.find('.section-header').text();

            var ev = {};
            ev.eventCategory = 'integrations';
            ev.eventAction = 'explore';
            ev.eventLabel = headerText;
            analytics.send( 'event', ev);
        
            var newHash = formatHash(headerText);

            if (window.location.hash === '#' + newHash)
                renderSectionExpansion();
            else
                window.location.hash = newHash;
        });
    });

    $('.template').remove();
    $('.integration-loading').addClass('hide');
}

function renderSectionExpansion() {
    var $scrollToSection;
    var expandedSection;

    if (window.location.hash !== undefined && window.location.hash !== '') {
        expandedSection = window.location.hash;
        expandedSection = expandedSection.split('#');
        expandedSection = expandedSection[1];
        expandedSection = unFormatHash(expandedSection);
    }

    var sections = $('.integrations-section');

    for (var i = 0; i < sections.length; i++) {
        var $section = $(sections[i]);
        if (expandedSection === undefined || $section.find('.section-header').text().toLowerCase() !== expandedSection) {
            if ($section.find('.section-content-expand').is(':visible')) {
                $section.find('.section-content-collapse').slideDown();
                $section.find('.section-content-expand').slideUp();                
            }
        } else if (expandedSection !== undefined && $section.find('.section-header').text().toLowerCase() === expandedSection) {
            $section.find('.section-content-collapse').slideToggle();
            $section.find('.section-content-expand').slideToggle();
            $scrollToSection = $section;
        }
    }

    if ($scrollToSection !== undefined) {
        $('.integrations-content').animate({
            scrollTop: $scrollToSection.offset().top - 30
        }, 500);
    }
}

function buildCategorySection(category, $sectionTemplate, $smallServiceTemplate, $integrationCardTemplate) {
    var $section = $sectionTemplate.clone();
    $section.removeClass('template');

    $section.find('.section-header').text(category.categoryName);
    $section.find('.section-header-anchor').prop('name', formatHash(category.categoryName));

    category.integrations.forEach(function (integration) {
        var $collapseItem = buildServiceCollapseItem(integration, $smallServiceTemplate);
        var $card = buildIntegrationCard(integration, $integrationCardTemplate);
        $section.find('.section-content-collapse').append($collapseItem);
        $section.find('.section-content-expand').append($card);
    });

    return $section;
}

function formatHash(toFormat) {
    toFormat = toFormat.replace(' ', '-').toLowerCase();
    toFormat = encodeURIComponent(toFormat);
    return toFormat;
}

function unFormatHash(toUnFormat) {
    toUnFormat = decodeURIComponent(toUnFormat);
    toUnFormat = toUnFormat.replace('-', ' ').toLowerCase();
    return toUnFormat;
}

function buildServiceCollapseItem(integration, $smallServiceTemplate) {
    var $element = $smallServiceTemplate.clone();
    $element.removeClass('template');
    $element.find('.service').addClass(integration.identifier);
    if (integration.hasConnected)
        $element.find('.service-tick').show();
    return $element;
}

function buildIntegrationCard(integration, $integrationCardTemplate) {
    var $cardContainer = $integrationCardTemplate.clone();
    $cardContainer.removeClass('template');

    var $card = $cardContainer.find('.integration-card');
    $card.addClass('flex');
    $card.addClass(integration.identifier);
    $card.find('.service').addClass(integration.identifier);
    $card.find('.content p.service-name').text(integration.serviceName);
    $card.find('.content p.service-short-description').html(integration.shortDescription);

    if (integration.hasConnected) {
        $card.find('.integration-connected').show();
        $card.find('.integration-button').hide(); 
    } else {
        $card.find('.integration-button div').text(integration.integrationAction);       
    }

    $card.click(function() {
        window.location.href = '/integrations/' + integration.identifier;
        return false;
    });

    return $cardContainer;
}

function addHighlightGlow($glowElement, glowLength) {
    $glowElement.addClass('glow-border');
    setTimeout(function() {
        $glowElement.toggleClass('glow-border glow-border-off');
    }, glowLength);
}