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
        window.location.href = '/integrations';
        return false;
    });

}

function renderIntegrationDetail(integrationJSON) {

    var $integrationDetail = $('.integration-detail');
    var isSuccessfulInstall = getQSParam().success === "true";
    var errorInstall = getQSParam().error;

    $('.page-title').text('Connect ' + integrationJSON.serviceName);

    $integrationDetail.addClass(integrationJSON.identifier);
    $integrationDetail.find('.service').addClass(integrationJSON.identifier);
    $integrationDetail.find('.service-short-description').html(integrationJSON.shortDescription);

    if (integrationJSON.hasConnected) {
        $integrationDetail.find('.integration-detail-bottom').hide();
        $integrationDetail.find('.integration-button').hide();
        $integrationDetail.find('.integration-connected').show();
    } else if (!isSuccessfulInstall) {
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

    if (isSuccessfulInstall) {
        var serviceText = $integrationDetail.find('.integration-success-description').first().text();
        serviceText = serviceText.split('[[ serviceName ]]');
        serviceText = serviceText[0] + integrationJSON.serviceName + serviceText[1];
        $integrationDetail.find('.integration-success-description').first().text(serviceText);

        $integrationDetail.find('.integration-detail-bottom').hide();
        $integrationDetail.find('.integration-detail-success').removeClass('hide');

    } else if (errorInstall) {
        var errorText = 'Ack. Something went wrong integrating  ' + integrationJSON.serviceName + '. Click the &ldquo;' + integrationJSON.integrationAction + '&rdquo; button above to try again. Or if you prefer, choose one of the options below.';
        $integrationDetail.find('.integration-error-description').first().html(errorText);
        $integrationDetail.find('.integration-detail-bottom').hide();
        $integrationDetail.find('.integration-detail-error').removeClass('hide');
    }
    
    $('.integration-detail-container').removeClass('hide');
    $('.integration-loading').addClass('hide');
}
