var lib1self;
var stream;
var config;
var gChartParams;
var availableChartTypes = getAvailableChartTypes();

var aggregationTypes = [
		{ typeName: 'count', requiresVar: false },
		{ typeName: 'sum', requiresVar: true },
		{ typeName: 'mean', requiresVar: true }
	];

$(document).ready(function() {
    executeOnLoadTasks();
});

function executeOnLoadTasks() { 

	var continueLoad = checkUrlValidity();

	if (continueLoad) {
	    setUpEventHandlers();
	    setUp1selfLogger();

		gChartParams = createChartParams();

		renderPage(gChartParams, false);
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

// https://api-staging.1self.co/v1/streams/MVIBQAXRNFXHIYQR/events/exercise/self/count/daily/type/json?readToken=5577db06e6b0fa0ed1f24b56b40e64431dd691d6d252&bgColor=&from=undefined&to=undefined


function setUpEventHandlers() {

	window.addEventListener('popstate', function(e) {
		console.log('popstate', window.location.href, e);
		gChartParams = parseUrl(window.location.href);
		renderPage(gChartParams);
	});
	
    $('.back-button').click(function() {
    	history.back();
    	return false;
    });

}

function renderPage(chartParams, doPushState) {

	if (doPushState) {
		var urlRoot = window.location.href;
		var url = urlRoot.split('/explore')[0];
		url += getExplorePageUrl(chartParams);
    	history.pushState(null, null, url);		
	}

	var aggregateOnTypes = getAggregateOnTypes(chartParams);

	renderChart(chartParams);
    buildAggregators(chartParams, aggregateOnTypes);
    buildAggregateOns(chartParams, aggregateOnTypes);
    buildChartTypes(chartParams);
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

function buildAggregators(chartParams, aggregateOnTypes) {
	var $aggregators = $('.aggregators');
	$aggregators.empty();

	for (var i = 0; i < aggregationTypes.length; i++) {
		if (!aggregationTypes[i].requiresVar || aggregateOnTypes.length > 0) {
			var $button = $('.standard-button.template').clone();
			$button.removeClass('template');
			$button.addClass('left');
			$button.find('div').text(aggregationTypes[i].typeName);

			if (aggregationTypes[i].typeName !== chartParams.aggregator.fn) {
				$button.addClass('sub-button');
			} else {
				$button.addClass('selected');
			}

			$button.click(onAggregatorClick);
			$aggregators.append($button);			
		}

	}
}

function onAggregatorClick(e) {
	var aggFn = $(this).find('div').text();

	gChartParams.aggregator.fn = aggFn;

	if (aggFn !== 'count' && gChartParams.aggregator.vars.length === 0) {
		var $aggregateOns = $('.aggregate-ons .standard-button.selected');
		if ($aggregateOns.length === 0) {
			$aggregateOns = $('.aggregate-ons .standard-button');
			var $button = $($aggregateOns[0]);
			$button.toggleClass('selected sub-button');
			gChartParams.aggregator.vars.push(formatTag($button.find('div').text()));
		}
	}

	renderPage(gChartParams, true);
}

function buildAggregateOns(chartParams, aggregateOnTypes) {
	var $aggregateOns = $('.aggregate-ons');
	$aggregateOns.empty();

	for (var i = 0; i < aggregateOnTypes.length; i++) {
		var $button = $('.standard-button.template').clone();
		$button.removeClass('template');
		$button.addClass('left');
		$button.find('div').text(aggregateOnTypes[i]);

		if (chartParams.aggregator.vars.indexOf(formatTag(aggregateOnTypes[i])) < 0) {
			$button.addClass('sub-button');
		} else {
			$button.addClass('selected');
		}

		$button.click(onAggregateOnClick);
		$aggregateOns.append($button);
	}
}

function onAggregateOnClick(e) {
	// var aggFn = $(this).find('div').text();

	// gChartParams.aggregator.fn = aggFn;

	// renderPage(gChartParams, true);
}

function getAggregateOnTypes(chartParams) {
	var userActivities = getUserActivities();
	var matchedActivity;

	for (var i = 0; i < userActivities.length; i++) {
		var activity = userActivities[i];
		if (chartParams.actionTags.indexOf(formatTag(activity.activityCategory)) >= 0) {
			if (activity.activityName !== undefined) {
				if (chartParams.actionTags.indexOf(formatTag(activity.activityName)) >= 0) {
					matchedActivity = activity;
					break;
				}
			} else {
				if (chartParams.actionTags.length === 1) {
					matchedActivity = activity;
					break;
				}
			}
		}
	}

	if (matchedActivity !== undefined && matchedActivity.properties !== undefined) {
		return matchedActivity.properties;
	} else {
		return [];
	}
}

function buildChartTypes(chartParams) {
	var $chartTypes = $('.chart-types');
	$chartTypes.empty();

	for (var i = 0; i < availableChartTypes.length; i++) {
		if (availableChartTypes[i].displayType !== 'small') {
			var $button = $('.standard-button.template').clone();
			$button.removeClass('template');
			$button.addClass('left');
			$button.addClass(availableChartTypes[i].identifier);
			$button.find('div').text(availableChartTypes[i].name);

			if (chartParams.chartType !== availableChartTypes[i].identifier) {
				$button.addClass('sub-button');
			} else {
				$button.addClass('selected');
			}

			$button.click(onChartTypeClick);
			$chartTypes.append($button);			
		}

	}
}

function onChartTypeClick(e) {
	var $button = $(this);

	if (!$button.hasClass('selected')) {
		var chartIdentifier = $button.attr('class');

		console.log(chartIdentifier);

		chartIdentifier = chartIdentifier.replace('standard-button', '');
		chartIdentifier = chartIdentifier.replace('sub-button', '');
		chartIdentifier = chartIdentifier.replace('selected', '');
		chartIdentifier = chartIdentifier.replace('left', '');
		chartIdentifier = chartIdentifier.trim();

		console.log(chartIdentifier);

		gChartParams.chartType = chartIdentifier;
		renderPage(gChartParams, true);		
	}

}

function getUserActivities() {
	var storedUserActivities = localStorage.userActivities;
	if (storedUserActivities)
		storedUserActivities = JSON.parse(storedUserActivities);
	else
		storedUserActivities = [];

	return storedUserActivities;
}

// [{"activityCategory":"Drink","activityName":"Coffee"},{"activityCategory":"Drink","activityName":"Tea"},{"activityCategory":"Drink","activityName":"Water","properties":["Volume"]},{"activityCategory":"Exercise","activityName":"Press ups","properties":["Quantity"]},{"activityCategory":"Exercise","activityName":"Chin ups","properties":["Quantity"]},{"activityCategory":"Exercise","properties":["Duration"]},{"activityCategory":"Work","activityName":"Meeting","properties":["Duration"]},{"activityCategory":"Work","activityName":"Pomodoro"},{"activityCategory":"test spaces cat","activityName":"mre test spaces","properties":["here too ?"]},{"activityCategory":"Exercise","activityName":"Stretching","properties":["Note"]}]

// function isVisible(classId) {
// 	return !$(classId).hasClass('hide');
// }

// function show(classId) {
// 	$(classId).removeClass('hide');
// }

// function hide(classId) {
// 	$(classId).addClass('hide');
// }

// function constructActionTags(activity) {
// 	var actionTags = [];
// 	actionTags.push(formatTag(activity.activityCategory));
// 	if (activity.activityName) actionTags.push(formatTag(activity.activityName));
// 	return actionTags;
// }

function renderChart(chartParams) {
	var chartDataUrl = getChartDataUrl(chartParams);

	var onGotData = function(dataset) {
		var dataConfig = {
			chartType: chartParams.chartType,
			xAxis: { parseFormat: "%m/%d/%Y", showAxis: true },
			yAxis: { showAxis: true },
			lineColour: '#00B597',
			margin: { top: 0, right: 0, bottom: 0, left: 0 }
		};
		$('.chart').empty();
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

function createChartParams(paramsArray) {
	var chartParams = {};

	if (paramsArray !== undefined) {
		objectTagsParam = paramsArray[2];
		actionTagsParam = paramsArray[3];
		aggregatorParam = paramsArray[4];
		aggregatePeriodParam = paramsArray[5];
		chartTypeParam = paramsArray[6];
		fromDateParam = paramsArray[7];
		toDateParam = paramsArray[8];
	}

	var aggregator = splitAggregator(aggregatorParam);

	chartParams.objectTags = decodeURIComponent(objectTagsParam).split(',');
	chartParams.actionTags = decodeURIComponent(actionTagsParam).split(',');
	chartParams.aggregator = aggregator;
	chartParams.aggregatePeriod = aggregatePeriodParam;
	chartParams.chartType = chartTypeParam;
	chartParams.fromDate = decodeURIComponent(fromDateParam);
	chartParams.toDate = decodeURIComponent(toDateParam);

	console.log('chartParams', chartParams);

	return chartParams;
}

function splitAggregator(strAggregator) {
	var aggregator = {};
	aggregator.text = strAggregator;

	var splitAgg = strAggregator.split('(');

	if (splitAgg.length === 1) {
		aggregator.fn = strAggregator;
		aggregator.vars = [];
	} else {
		aggregator.text = strAggregator;
		aggregator.fn = splitAgg[0];
		aggregator.vars = (splitAgg[1].split(')')[0]).split(',');
	}

	return aggregator;
}

function getExplorePageUrl(chartParams) {

	var url = '/explore/chart/streams';
	url += '/' + stream.streamid();
	url += '/' + encodeURIComponent(chartParams.objectTags.join(','));
	url += '/' + encodeURIComponent(chartParams.actionTags.join(','));
	url += '/' + chartParams.aggregator.text;
	url += '/' + chartParams.aggregatePeriod;
	url += '/' + chartParams.chartType;
	url += '/' + encodeURIComponent(chartParams.fromDate);
	url += '/' + encodeURIComponent(chartParams.toDate);

	return url;
	// /explore/chart/streams/:streamId/:objectTags/:actionTags/:aggregator/:aggregatePeriod/:chartType/:fromDate/:toDate
}

function parseUrl(url) {
	url = (url.split('/explore/chart/')[1]).split('/');
	return createChartParams(url);
}

function getChartDataUrl(chartParams) {

	var actionTags = decodeURIComponent(actionTagsParam).split(',');
	var objectTags = decodeURIComponent(objectTagsParam).split(',');

    var url = lib1self
        .objectTags(chartParams.objectTags)
        .actionTags(chartParams.actionTags);

    if (chartParams.aggregator.fn === 'count') 
    	url = url.count();
    else if (chartParams.aggregator.fn === 'sum')
    	url = url.sum(chartParams.aggregator.vars.join(','));
    else if (chartParams.aggregator.fn === 'mean')
    	url = url.mean(chartParams.aggregator.vars.join(','));

    url = url
    	.json()
        .url(stream);

    url += '&from=' + chartParams.fromDate;
    url += '&to=' + chartParams.toDate;

    return url;
}

function formatTag(tag) {
	tag = tag.toLowerCase();
	var regex = new RegExp(' ', 'g');
	tag = tag.replace(regex, '-');
	return tag;
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

