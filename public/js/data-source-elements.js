function getDataSource (cardData) {
    if (cardData.actionTags && cardData.objectTags) {

        if (cardData.actionTags[0] === "use") {
            return 'rescuetime';
        }

        else if (cardData.actionTags[0] === "listen") {
            return 'lastfm';
        }

        else if (cardData.actionTags[1] === "ride") {
        	return 'strava';
        }
            
        else if (cardData.actionTags[0] === "exercise") {
            return 'googlefit';
        }
            
        else if (cardData.actionTags[0] === "browse") {
            return 'visitcounter';
        }
            
        else if (cardData.actionTags[0] === "develop") {
            return 'sublime';
        }
            
        else if (cardData.objectTags[0] === "tweets" || cardData.objectTags.indexOf('twitter') >= 0) {
            return 'twitter';
        }
            
        else if (cardData.objectTags.indexOf('instagram') >= 0) {
            return 'instagram';
        }
            
        else if (cardData.objectTags.indexOf("github") >= 0 || cardData.actionTags.indexOf("github") >= 0) {
            return 'github';
        }
        else {
            return 'unknown-data-source';
        }
    }
}

function setDataSource(cardData) {
	if (cardData.source) {
		if (cardData.source === '1self-GitHub') {
            cardData.identifier = 'github';
            cardData.serviceName = 'Github';
        } else if (cardData.source === '1self-google-fit') {
            cardData.identifier = 'googlefit';
            cardData.serviceName = 'Google Fit';
        } else if (cardData.source === '1self-rescuetime') {
            cardData.identifier = 'rescuetime';
            cardData.serviceName = 'RescueTime';
        } else if (cardData.source === '1self-strava') {
            cardData.identifier = 'strava';
            cardData.serviceName = 'Strava';
        } else if (cardData.source === 'last.fm') {
            cardData.identifier = 'lastfm';
            cardData.serviceName = 'Last.fm';
        } else if (cardData.source === '1self-twitter') {
            cardData.identifier = 'twitter';
            cardData.serviceName = 'Twitter';
        } else if (cardData.source === '1self-instagram') {
            cardData.identifier = 'instagram';
            cardData.serviceName = 'Instagram';
        } else {
        	cardData.identifier = 'unknown-data-source';
        	cardData.serviceName = '';
        }
	}
}

function getPrimaryColour(dataSourceName) {
	if (dataSourceName === "foursquare")
		return "#fa4778";

	if (dataSourceName === "github")
		return "#000000";

	if (dataSourceName === "googlefit")
		return "#DC493C";

	if (dataSourceName === "hackernews")
		return "#F46507";

	if (dataSourceName === "instagram")
		return "#175A83";

	if (dataSourceName === "intellij")
		return "#1A5CAB";

	if (dataSourceName === "lastfm")
		return "#DD2649";

	if (dataSourceName === "rescuetime")
		return "#a52011";

	if (dataSourceName === "stackoverflow")
		return "#F47920";

	if (dataSourceName === "strava")
		return "#F26122";

	if (dataSourceName === "sublime")
		return "#ff8100";

	if (dataSourceName === "twitter")
		return "#4D97D4";

	if (dataSourceName === "visitcounter")
		return "#0EB6EA";

	if (dataSourceName === "visualstudio")
		return "#6A207D";

	if (dataSourceName === "unknown-data-source")
		return "#0097C4";

	return "#999999";
}


