$(document).ready(function() {
    executeOnLoadTasks();
});

function executeOnLoadTasks() { 

    // var service = getQSParam().service;

    if (!service || service === "") {
        window.location.href = '/integrations';
        return false;
    }

    var onGotData = function(integrationJSON) {
        if (!integrationJSON) {
            window.location.href = '/integrations';
            return false;
        }
        renderIntegrationDetail(integrationJSON);
    };

    getIntegrationsInCategories(onGotData, service);

    $('.back-button').click(function() {
        window.history.back();
        return false;
    });

}

function renderIntegrationDetail(integrationJSON) {

    var $integrationDetail = $('.integration-detail');

    $('.page-title').text('Connect ' + integrationJSON.serviceName);

    $integrationDetail.addClass(integrationJSON.identifier);
    $integrationDetail.find('.service').addClass(integrationJSON.identifier);
    $integrationDetail.find('.service-short-description').html(integrationJSON.shortDescription);

    if (integrationJSON.hasConnected) {
        $integrationDetail.find('.integration-detail-bottom').hide();
        $integrationDetail.find('.integration-button').hide();
        $integrationDetail.find('.integration-connected').show();
    } else {
        $integrationDetail.find('.integration-detail-bottom .integration-long-description').html(integrationJSON.longDescription);
        $integrationDetail.find('.integration-detail-bottom .integration-instructions').html(integrationJSON.instructions);

        $buttons = $integrationDetail.find('.integration-button div, .large-connect-button div');

        $buttons.text(integrationJSON.integrationAction);

        $buttons.click(function() {
            
            if (integrationJSON.integrationType === 'hosted')
                window.location.href = window.location.href + '/redirect';
            else
                window.open(integrationJSON.integrationUrl);
            
            return false;
        });        
    }

    $('.integration-detail-container').removeClass('hide');
    $('.integration-loading').addClass('hide');
}
