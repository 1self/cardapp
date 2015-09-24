$(document).ready(function() {
    executeOnLoadTasks();
});

function executeOnLoadTasks() { 

    var onGotData = function(integrationsJSON) {
        renderIntegrationsList(integrationsJSON);
    };

    getIntegrationsInCategories(onGotData);

    if (localStorage.seenIntegrationIntro) {
        $('.overlay').hide();
    } else {
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
    console.log(integrationsJSON);

    var $integrationsContent = $('.integrations-content');
    var $sectionTemplate = $('.integrations-section.template');
    var $smallServiceTemplate = $('.section-content-collapse .service-container.template');
    var $integrationCardTemplate = $('.integration-card-container.template');

    integrationsJSON.forEach(function (category) {
        var $categorySection = buildCategorySection(category, $sectionTemplate, $smallServiceTemplate, $integrationCardTemplate);
        $integrationsContent.append($categorySection);

        $categorySection.click(function() {
            var $clickedSection = $(this);
            // console.log($clickedSection);
            $clickedSection.find('.section-content-collapse').slideToggle();
            $clickedSection.find('.section-content-expand').slideToggle();

            var sections = $('.integrations-section');
            // console.log(sections);
            for (var i = 0; i < sections.length; i++) {
                var $section = $(sections[i]);
                if ($section.find('.section-header').text() !== $clickedSection.find('.section-header').text()) {
                    $section.find('.section-content-collapse').slideDown();
                    $section.find('.section-content-expand').slideUp();
                }
            }
        });
    });

    $('.template').remove();
}

function buildCategorySection(category, $sectionTemplate, $smallServiceTemplate, $integrationCardTemplate) {
    var $section = $sectionTemplate.clone();
    $section.removeClass('template');

    $section.find('.section-header').text(category.category);

    category.integrations.forEach(function (integration) {
        var $collapseItem = buildServiceCollapseItem(integration, $smallServiceTemplate);
        var $card = buildIntegrationCard(integration, $integrationCardTemplate);
        $section.find('.section-content-collapse').append($collapseItem);
        $section.find('.section-content-expand').append($card);
    });

    return $section;
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
        $card.find('.integration-button div').text(integration.buttonText);       
    }

    $card.click(function() {
        window.location.href = 'integration.html?service=' + integration.identifier;
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