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
	
    $('.add-versus').click(function() {
    	addVersusSection();
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

	var userActivities = getUserActivities();

	var aggregateOnTypes = getAggregateOnTypes(chartParams, userActivities);

	renderChart(chartParams);
	setPageHeader(chartParams);
	buildActionTags(chartParams, userActivities);
    buildAggregators(chartParams, aggregateOnTypes);
    buildAggregateOns(chartParams, aggregateOnTypes);
    buildChartTypes(chartParams);
}

function buildActionTags(chartParams, userActivities) {
	var $actionTags = $('.action-tags');
	$actionTags.empty();

	var actionTagList = buildActionTagList(userActivities);

	for (var i = 0; i < actionTagList.length; i++) {
		var $button;

		if (chartParams.actionTags.indexOf(formatTag(actionTagList[i])) < 0) {
			$button = $('.standard-button.icon-dot.template').clone();
		} else {
			$button = $('.standard-button.icon-times.template').clone();
		}

		$button.removeClass('template');
		$button.addClass('left');
		$button.find('div span').text(actionTagList[i]);

		$button.click(onActionTagClick);
		$actionTags.append($button);			

	}
}

function onActionTagClick(e) {
	var $button = $(this);
	var actionTag = formatTag($button.find('div span').text());

	if ($button.hasClass('selected')) {
		var idx = gChartParams.actionTags.indexOf(actionTag);
		if (idx >= 0) {
			var removedTags = gChartParams.actionTags.splice(idx, 1);
		}
	} else {
		gChartParams.actionTags.push(actionTag);
	}

	renderPage(gChartParams, true);

}

function buildActionTagList(userActivities) {
	var actionTagList = [];
	for (var i = 0; i < userActivities.length; i++) {
		var activity = userActivities[i];
		if (actionTagList.indexOf(activity.activityCategory) < 0) {
			actionTagList.push(activity.activityCategory);
		}
		if (activity.activityName !== undefined && actionTagList.indexOf(activity.activityName) < 0) {
			actionTagList.push(activity.activityName);
		}
	}
	return actionTagList;
}

function buildAggregators(chartParams, aggregateOnTypes) {
	var $aggregators = $('.aggregators');
	$aggregators.empty();

	for (var i = 0; i < aggregationTypes.length; i++) {
		if (!aggregationTypes[i].requiresVar || aggregateOnTypes.length > 0) {
			var $button = $('.standard-button.no-icon.template').clone();
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
	
	gChartParams.aggregator.text = buildAggregatorText(gChartParams.aggregator);

	renderPage(gChartParams, true);
}

function buildAggregateOns(chartParams, aggregateOnTypes) {
	var $aggregateOns = $('.aggregate-ons');
	$aggregateOns.empty();

	for (var i = 0; i < aggregateOnTypes.length; i++) {
		var $button = $('.standard-button.no-icon.template').clone();
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

function getAggregateOnTypes(chartParams, userActivities) {
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
			var $button = $('.standard-button.no-icon.template').clone();
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
		chartIdentifier = chartIdentifier.replace('no-icon', '');
		chartIdentifier = chartIdentifier.replace('icon-times', '');
		chartIdentifier = chartIdentifier.replace('icon-dot', '');
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
			yAxis: { showAxis: true, label: getYAxisLabel(chartParams) },
			lineColour: '#00B597',
			margin: { top: 10, right: 10, bottom: 10, left: 10 }
		};
		$('.chart').empty();
		drawChart(dataset, dataConfig, $('.data-explorer .chart'));
	};

	console.log('dataUrl: ', chartDataUrl);

	getData(chartDataUrl, onGotData);
}

function getYAxisLabel(chartParams) {
	var label = chartParams.aggregator.text;
	if (chartParams.aggregator.vars.length > 0)
		label += ' of ' + chartParams.aggregator.vars.join(', ');
	else
		label += ' of activities';
	return label;
}

function setPageHeader(chartParams) {
	var headerText = getYAxisLabel(chartParams);
	headerText += ' by day';
	$('.header-row').text(headerText);
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
	var chartParams = { series: [] };

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

	var newSeries = {
		objectTags: decodeURIComponent(objectTagsParam).split(','),
		actionTags: decodeURIComponent(actionTagsParam).split(','),
		aggregator: aggregator,
		chartType: chartTypeParam
	};

	chartParams.series.push(newSeries);

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

function buildAggregatorText(aggregator) {
	return aggregator.fn + '(' + aggregator.vars.join(',') + ')';
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

