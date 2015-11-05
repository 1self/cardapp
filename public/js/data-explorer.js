var lib1self;
var stream;
var config;

$(document).ready(function() {
    executeOnLoadTasks();
});

function executeOnLoadTasks() { 

	var continueLoad = checkUrlValidity();

	if (continueLoad) {
	    setUpEventHandlers();
	    setUp1selfLogger();

	    renderChart();
	}
}

function checkUrlValidity() {
	return true;
	// if (newActivityState === '' || newActivityState === undefined) {
	// 	return true;
	// } else {
	// 	window.location.href = '/log';
	// 	return false;
	// }
}



function setUpEventHandlers() {

	// window.addEventListener('popstate', function(e) {
	// 	console.log('popstate', window.location.href, e);
	// 	var newState;
	// 	if (e.state) {
	// 		newState = e.state;
	// 	} else {
	// 		newState = { name: '' };
	// 	}
	// 	newState.doPush = false;
	// 	renderNewState(newState);
	// });
	
    $('.back-button').click(function() {
    	history.back();
    	return false;
    });

}

function renderNewState(newState) {
	var urlRoot = window.location.href;
	urlRootArray = urlRoot.split('/log');
	urlRoot = urlRootArray[0] + '/log';
    var newUrl;
    var doPush = newState.doPush === undefined ? true : false;

    if (!doPush) {
    	doPush = false;
    	newState.name = '';
    	if (urlRootArray.length > 1 && urlRootArray[1].indexOf('/new/') >= 0) {
    		newState.name = urlRootArray[1].split('/new/')[1];
    	}
    }

    if (newState.name === '') {
		hide('.page-title-add');
		show('.page-title');
		hide('.log-overlay');
		hide('.new-activity-section.activity-category');
    	hide('.new-activity-section.activity-property');
		$('.back-button').hide();
		doPush = false;
    } else if (newState.name === 'select-activity-category') {
    	hide('.new-activity-section.activity-category-new');
		hide('.new-activity-section.activity-name');
    	show('.new-activity-section.activity-category');
    	show('.log-overlay');
    	$('.back-button').show();
    	hide('.page-title');
    	show('.page-title-add');
	}

	if (doPush) {
		newUrl = urlRoot + '/new/' + newState.name;
    	history.pushState(newState, newState.name, newUrl);
    }
}

function isVisible(classId) {
	return !$(classId).hasClass('hide');
}

function show(classId) {
	$(classId).removeClass('hide');
}

function hide(classId) {
	$(classId).addClass('hide');
}

function constructActionTags(activity) {
	var actionTags = [];
	actionTags.push(formatTag(activity.activityCategory));
	if (activity.activityName) actionTags.push(formatTag(activity.activityName));
	return actionTags;
}

function renderChart() {
	var chartDataUrl = getChartDataUrl();

	var onGotData = function(dataset) {
		var dataConfig = {
			chartType: chartTypeParam,
			xAxis: { parseFormat: "%m/%d/%Y", showAxis: true },
			yAxis: { showAxis: true },
			lineColour: '#00B597',
			margin: { top: 0, right: 0, bottom: 0, left: 0 }
		};
		drawChart(dataset, dataConfig, $('.data-explorer .chart'));
	};

	console.log('dataUrl: ', chartDataUrl);

	getData(chartDataUrl, onGotData);
}



function setUp1selfLogger() {
	config = {
        appId: "app-id-weblogae4feb02fh3hfy37c83c4k74gy",
        appSecret: "app-secret",
        "appName": "co.1self.web-log",
        "appVersion": "0.0.1"
    };
    lib1self = new Lib1selfClient(config, "staging");
    lib1self.fetchStream(function(err, response) {
        stream = response;
    });	
}

function getChartDataUrl() {

	var actionTags = decodeURIComponent(actionTagsParam).split(',');
	var objectTags = decodeURIComponent(objectTagsParam).split(',');

    var url = lib1self
        .objectTags(objectTags)
        .actionTags(actionTags)
        .count()
        .json()
        // .backgroundColor(colour)
        .url(stream);

    url += '&from=' + decodeURIComponent(fromDateParam);
    url += '&to=' + decodeURIComponent(toDateParam);

    return url;
}

// var createEventToLog = function(actionTags, properties) {
//     var eventToLog = {
//         "source": config.appName,
//         "version": config.appVersion,
//         "objectTags": ["self"],
//         "actionTags": actionTags
//         // "properties": {
//         //     "quantity": quantity
//         // }
//     };

//     if (properties) {
//     	eventToLog.properties = properties;
//     }

//     return eventToLog;
// };

// function createDate(daysAgo) {
// 	var now = new XDate();
// 	var tonight = new XDate(now.getFullYear(), now.getMonth(), now.getDate());
// 	tonight.addDays(1);
// 	tonight.addDays(daysAgo);
// 	var dateStr = tonight.toISOString();
// 	dateStr = dateStr.split('Z');
// 	dateStr = dateStr[0] + '.000Z';
// 	return dateStr;
// }

