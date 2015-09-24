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

        url = API_HOST + '/v1/users/';
        url += username + '/cards';
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

// $(function() {
//     getCards();

// });

function getIntegrationsInCategories(callback, serviceIdentifier) {
    var integrationJSON = [];

    integrationJSON.push(integrationCatTemplate('Productivity', ['RescueTime', 'Visit Counter', 'GitHub']));
    integrationJSON.push(integrationCatTemplate('Software Development', ['GitHub', 'Sublime', 'Intelli J', 'Visual Studio', 'StackOverflow']));
    integrationJSON.push(integrationCatTemplate('Social', ['Twitter', 'Instagram', 'Foursquare', 'Hacker News']));
    integrationJSON.push(integrationCatTemplate('Music', ['Last.fm', 'Spotify', 'Google Play Music']));
    integrationJSON.push(integrationCatTemplate('Fitness', ['Google Fit', 'Strava']));

    if (!serviceIdentifier) {
        callback(integrationJSON);
    } else {
        var singleIntegrationJSON;
        integrationJSON.some(function (category) {
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
}

function integrationCatTemplate(categoryName, integrations) {
    var catTemplate = {
        category: categoryName,
        integrations: []
    };

    for (var i = 0; i < integrations.length; i++) {
        catTemplate.integrations.push(integrationTemplate(integrations[i], (i % 2 === 0)));
    }

    return catTemplate;
}

function integrationTemplate(serviceName, hasConnected) {

    var identifier = formatIdentifier(serviceName);
    var descriptions = serviceDescriptions(identifier);

    descriptions.serviceName = serviceName;
    descriptions.hasConnected = hasConnected;

    return descriptions;
}

function formatIdentifier(serviceName) {
    var identifier = serviceName.toLowerCase();
    identifier = identifier.replace('.', '');
    identifier = identifier.replace(/ /g, '');
    return identifier;
}

function serviceDescriptions(serviceIdentifier) {
    var returnDesc;
    var descriptions = [
        {   identifier: 'rescuetime',
            shortDescription: 'Find your ideal work-life balance and understand how you spend your computer time',
            longDescription: 'RescueTime is a popular app that helps improve your time management in order to stay more productive and happy at your computer.'
                                + '<br>RescueTime is developed independently to 1self by a seprate company.'
                                + '<br>By using the 1self RescueTime integration you&apos;ll be able to get even deeper insights into your digital behavior.',
            instructions: '<b>I do not have a RescueTime account</b>'
                                + '<br>If you do not have a RescueTime account then you need to <a href="http://www.rescuetime.com" target="_blank">go to RescueTime.com</a> to register. '
                                + 'After registering be sure to download and install the RescueTime application. '
                                + 'Once complete, return to this page (we&apos;ll keep it open in this tab for you).'
                                + '<br><a href="http://www.rescuetime.com" target="_blank">Register at RescueTime</a>'
                                + '<br><br>'
                                + '<b>I have a RescueTime account</b>'
                                + '<br>Great! Just click the &quot;Connect&quot; button below.',
            buttonText: 'Connect',
            buttonHref: 'https://packagecontrol.io/packages/1Self'
        },
        {   identifier: 'visitcounter',
            shortDescription: 'Find out how often and when you visit popular websites or others that you choose to track with this Chrome browser extension',
            longDescription: 'Visit Counter gives you amazing insights into your browsing behavior. Find out which websites you visit most and when you visit them.'
                                + '<br>Visit Counter is developed by 1self. It will only log visits to the websites that you want logged and will entirely ignore all others.',
            instructions: 'Simply click the &quot;Connect&quot; button below to be taken to the Chrome web store where you can download and install the extension.',
            buttonText: 'Connect',
            buttonHref: 'https://packagecontrol.io/packages/1Self'
        },
        {   identifier: 'github',
            shortDescription: 'Your coding activity visualized. See which hours of which days you&apos;re most active. Correlate your pushes with your IDE activity.',
            longDescription: 'The 1self GitHub integration brings you extra insights and extra visualizations on your data.'
                                + 'You&apos;ll also get auto-generated insights that will give you new awareness of your development behavior',
            instructions: 'Simply click the &quot;Connect&quot; button below to integrate your GitHub data.',
            buttonText: 'Connect',
            buttonHref: 'https://packagecontrol.io/packages/1Self'
        },
        {   identifier: 'lastfm',
            shortDescription: 'What do you listen to and when do you listen? How does it correlate with your other activities? The 1self last.fm integration will let you find out.',
            longDescription: 'Do you listen while you work? Are you someone who enjoys musical evenings? Is it all about creating the relaxed Sunday vibe?'
                                + '<br>With the 1self Last.fm integration you&apos;ll get automatic insights about your listening behavior and be able to correlate it with your other activities.',
            instructions: '<b>I do not have a Last.fm account</b>'
                                + '<br>If you do not have a Last.fm account then you need to <a href="http://last.fm" target="_blank">go to Last.fm</a> to register. '
                                + 'Once complete, return to this page (we&apos;ll keep it open in this tab for you).'
                                + '<br><a href="http://last.fm" target="_blank">Register at Last.fm</a>'
                                + '<br><br>'
                                + '<b>I have a Last.fm account</b>'
                                + '<br>Great! Just click the &quot;Connect&quot; button below.',
            buttonText: 'Connect',
            buttonHref: 'https://packagecontrol.io/packages/1Self'
        },
        {   identifier: 'sublime',
            shortDescription: 'Your coding activity visualized. See which hours of which days you&apos;re actively coding. Correlate your coding activity with your GitHub commits.',
            longDescription: 'The 1self Sublime Text plugin tracks when you&apos;re actively coding - that is when you&apos;re actually typing code. '
                                + 'For the first time you&apos;ll be able to see how much coding you do in a day and compare it with your other daily activities.'
                                + 'You&apos;ll also get auto-generated insights that will give you new awareness of your development behavior',
            instructions: '<b>I have Package Control</b>'
                                + '<br>Great! Just search in package control for &quot;1self&quot; and follow the usual install procedure.'
                                + '<br><br>'
                                + '<b>I don&apos;t have Package Control</b>'
                                + '<br>Package Control takes Sublime Text to another level by giving you easy access to lots of plugins so we heartily recommend that you get it. '
                                + 'If you do so then you can follow the instructions above.'
                                + '<br>For more information on the 1self Sublime Text plugin and on Package Control click the &quot;Download&quot; buton below.',
            buttonText: 'Download',
            buttonHref: 'https://packagecontrol.io/packages/1Self'
        },
        {   identifier: 'spotify',
            shortDescription: 'Get the stats behind your Spotify listening behavior. What do you listen to and when do you listen? How does it correlate with your other activities?',
            longDescription: 'With 1self you can visualize and analyze your Spotify listening. '
                                + 'Do you listen while you work? Are you someone who enjoys musical evenings? Is it all about creating the relaxed Sunday vibe? '
                                + 'You&apos;ll also get auto-generated insights that will give you new awareness of your musical enjoyment',
            instructions: 'Spotify listening logging works via Last.fm. Last.fm is a fantastic service that lets you collect your listening behavior from all of your favorite sources. '
                                + 'It also happens to be the only way to get your listening data out of Spotify because Spotify have built an integration with Last.fm into the Spotify app.'
                                + '<br><br>'
                                + '<b>I don&apos;t have a Last.fm account</b>'
                                + '<br>It&apos;s dead easy to register for Last.fm. Simply <a href="https://secure.last.fm/join" target="_blank">go to the Last.fm registration page</a> and create your account. '
                                + 'Once complete, return to this page (we&apos;ll keep it open in this tab for you).'
                                + '<br><a href="https://secure.last.fm/join" target="_blank">Register for a Last.fm account</a>'
                                + '<br><br>'
                                + '<b>I have a Last.fm account</b>'
                                + '<br>Great! You just need to connect up your Spotify app to scrobble to Last.fm. '
                                + '(Scrobbling means to take your data from one source (Spotify) and send it to another source (Last.fm)). '
                                + '<br>To connect your Spotify account to Last.fm navigate to your profile settings. Exactly how to do this depends on the version of the Spotify app you&apos;re using. '
                                + 'The most likely place is within your profile (click on your avatar) there is a settings section (click on the cog). '
                                + 'Once you&apos;re within profile settings you should see a switch to enable Last.fm scrobbling. '
                                + 'Flick the switch and enter your Last.fm username and password. '
                                + '<br>The last step is really simple. Just click the button below to link your Last.fm account with 1self. Phew! :)',
            buttonText: 'Connect',
            buttonHref: 'https://packagecontrol.io/packages/1Self'
        },
        {   identifier: 'googleplaymusic',
            shortDescription: 'Get the stats behind your Google Play listening behavior. What do you listen to and when do you listen? How does it correlate with your other activities?',
            longDescription: 'With 1self you can visualize and analyze your Google Play listening. '
                                + 'Do you listen while you work? Are you someone who enjoys musical evenings? Is it all about creating the relaxed Sunday vibe? '
                                + 'You&apos;ll also get auto-generated insights that will give you new awareness of your musical enjoyment',
            instructions: 'Google Play listening logging works via Last.fm. Last.fm is a fantastic service that lets you collect your listening behavior from all of your favorite sources. '
                                + 'It&apos;s also the easiest way to get your listening behavior out of Google Play Music.'
                                + '<br><br>'
                                + '<b>I don&apos;t have a Last.fm account</b>'
                                + '<br>It&apos;s dead easy to register for Last.fm. Simply <a href="https://secure.last.fm/join" target="_blank">go to the Last.fm registration page</a> and create your account. '
                                + 'Once complete, return to this page (we&apos;ll keep it open in this tab for you).'
                                + '<br><a href="https://secure.last.fm/join" target="_blank">Register for a Last.fm account</a>'
                                + '<br><br>'
                                + '<b>I have a Last.fm account</b>'
                                + '<br>Great! You just need to <a href="https://play.google.com/store/apps/details?id=fm.last.android&hl=en_GB" target="_blank">download and install the official Last.fm app</a> onto your phone. '
                                + '<br><a href="https://play.google.com/store/apps/details?id=fm.last.android&hl=en_GB" target="_blank">Get the Last.fm app</a>'
                                + '<br>The last step is really simple. Just click the button below to link your Last.fm account with 1self. Phew! :)',
            buttonText: 'Connect',
            buttonHref: 'https://packagecontrol.io/packages/1Self'
        },
        {   identifier: 'googlefit',
            shortDescription: 'Auto-insights on your activity data. Google Fit can track your steps and other activities but you&apos;ll never look at the Google Fit app. 1self will bring your fitness data to you.',
            longDescription: 'By linking up your Google Fit data with 1self you’ll be able to see your fitness data in context with the rest of your life. '
                                + 'Do you do more walking on days where you listen to music? Are you healthier when you’re not at work? '
                                + 'All of this and more is possible by integrating Google Fit data with 1self.',
            instructions: 'Simply click the &quot;Connect&quot; button below to integrate your Google Fit data.',
            buttonText: 'Connect',
            buttonHref: 'https://packagecontrol.io/packages/1Self'
        },
        {   identifier: 'strava',
            shortDescription: 'Auto-insights on your cycling data. Find out where your ride ranked out of all you rides. Highest max speed, distance ridden, metres climbed. The 1self Strava integration will give you easy access to all that and more.',
            longDescription: 'By linking up Strava with 1self you’ll be able to see new views on your data and also get automatically generated insights to give you another level of awareness about your rides. '
                                + 'Teamed with Strava, 1self will tell you where the ride you just did ranked in terms of your top speed, your distance climbed, your average speed and how far you&apos;ve ridden. '
                                + 'You&apos;ll be able to see that information over different periods (week, month, year, all time) and compare with your friends.',
            instructions: 'Simply click the &quot;Connect&quot; button below to integrate Strava with 1self.',
            buttonText: 'Connect',
            buttonHref: 'https://packagecontrol.io/packages/1Self'
        }
    ];

    for (var i = 0; i < descriptions.length; i++) {
        if (descriptions[i].identifier === serviceIdentifier) {
            returnDesc = descriptions[i];
            break;
        }
    }

    if (!returnDesc) {
        returnDesc = {
            identifier: serviceIdentifier,
            shortDescription: "blah blah " + serviceIdentifier + " shortDescription",
            longDescription: "blah blah " + serviceIdentifier + "  longDescription. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus lorem et mollis tempus. Vivamus at semper augue.. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus lorem et mollis tempus. Vivamus at semper augue.. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus lorem et mollis tempus. Vivamus at semper augue.",
            instructions: "default instructions",
            buttonText: 'Button',
            buttonHref: 'https://packagecontrol.io/packages/1Self'
        };
    }

    return returnDesc;
}





