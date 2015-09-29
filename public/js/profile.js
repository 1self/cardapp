$(document).ready(function() {
    executeOnLoadTasks();
});

function executeOnLoadTasks() { 

    // var service = getQSParam().service;

    // if (!service || service === "") {
    //     window.location.href = '/integrations';
    //     return false;
    // }

    // var onGotData = function(integrationJSON) {
    //     if (!integrationJSON) {
    //         window.location.href = '/integrations';
    //         return false;
    //     }
    //     renderIntegrationDetail(integrationJSON);
    // };

    // getIntegrationsInCategories(onGotData, service);

    $('.logout-button').click(function() {
        window.location.href = '/logout';
        return false;
    });

}

// function renderProfileDetail() {



// }
