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

    $('.to-integrations-button').click(function() {
        window.location.href = '/integrations';
        return false;
    });

    $('.to-card-stack-button').click(function() {
        window.location.href = '/card-stack';
        return false;
    });

}

function renderIntegrationDetail(integrationJSON) {

    var $integrationDetail = $('.integration-detail');
    var isSuccessfulInstall = getQSParam().success === "true";
    var errorInstall = getQSParam().error;
    var showResult = false;

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

            $integrationDetail.find('.integration-button').hide();
            $integrationDetail.find('.large-connect-button').hide();
            $integrationDetail.find('.integration-pending').removeClass('hide');
            
            if (integrationJSON.integrationType === 'hosted')
                window.location.href = "/integrations/" + integrationJSON.identifier + '/redirect';
            else
                window.open(integrationJSON.integrationUrl);
            
            return false;
        });        
    }

    if (isSuccessfulInstall) {
        var serviceText = $('.integration-success-description').first().text();
        serviceText = serviceText.split('[[ serviceName ]]');
        serviceText = serviceText[0] + integrationJSON.serviceName + serviceText[1];
        $('.integration-success-description').first().text(serviceText);

        $integrationDetail.find('.integration-detail-bottom').hide();
        $('.integration-detail-success').removeClass('hide');
        showResult = true;

    } else if (errorInstall) {
        var errorText = 'Ack. Something went wrong integrating  ' + integrationJSON.serviceName + '. Click the &ldquo;' + integrationJSON.integrationAction + '&rdquo; button above to try again. Or if you prefer, choose one of the options below.';
        $('.integration-error-description').first().html(errorText);
        $integrationDetail.find('.integration-detail-bottom').hide();
        $('.integration-detail-error').removeClass('hide');
        showResult = true;
    }

    $('.integration-detail-container').removeClass('hide');
    
    if (showResult) {
        $('.integration-result-container').removeClass('hide');
    }
    $('.integration-loading').addClass('hide');
}
