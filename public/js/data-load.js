var deferred; // = $.Deferred();

function getCards() {

    deferred = $.Deferred();

    var url;

    if (offline) {
        url = "offline_json/offline.json";
    } else {
        // Get the ajax requests out of the way early because they
        // are typically longest to complete

        var minStdDev = getQSParam().minStdDev;
        var maxStdDev = getQSParam().maxStdDev;

        url = '/data/cards';        
        url += '?extraFiltering=true';
        url += minStdDev ? '&minStdDev=' + minStdDev : '';
        url += maxStdDev ? '&maxStdDev=' + maxStdDev : '';
    }

    console.log(url);

    $.getJSON(url,
            function() {
                console.log("accessed api for cards");
            })
        .done(function(data) {

            console.log('card data', data);
            // window.cardData = data;
            deferred.resolve(data);
        })
        .fail(function(data) {
            console.log('error getting cards', data);

        });
}

function getIntegrationsInCategories(callback, serviceIdentifier) {

    var url = '/data/integrations';

    $.getJSON(url,
            function() {
                console.log("accessed api for integrations");
            })
        .done(function(data) {

            console.log('integrations data', data);
            if (!serviceIdentifier) {
                callback(data);
            } else {
                var singleIntegrationJSON;
                data.some(function (category) {
                    category.integrations.forEach(function (integration) {
                        if (integration.identifier === serviceIdentifier) {
                            singleIntegrationJSON = integration;
                            return singleIntegrationJSON; // break out of some loop if set
                        }
                    });
                    return singleIntegrationJSON; // break out of some loop if set
                });
                callback(singleIntegrationJSON);
            }
        })
        .fail(function(data) {
            console.log('error getting integrations', data);

        });
}




