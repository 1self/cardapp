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
		console.log('gChartParams', gChartParams);
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

	buildSelectionSections(chartParams, userActivities, aggregateOnTypes);

}

function addVersusSection() {
	var newSeries = gChartParams.series[0];
	newSeries.isClone = true;
	gChartParams.series.push(newSeries);
	gChartParams.activeSeries = 1;
	renderPage(gChartParams, true);
}

function buildSelectionSections(chartParams, userActivities, aggregateOnTypes) {
	for (var i = 0; i < chartParams.series.length; i++) {
		var $appendTo;
		if (i === 0) {
			$appendTo = $('.aggregation-options.aggregation-options-0');
		} else {
			$appendTo = $('.aggregation-options.aggregation-options-0').clone();
			$appendTo.removeClass('aggregation-options-0');
			$appendTo.addClass('aggregation-options-' + i);
			$('.aggregation-sections').append($appendTo);
		}

		if (chartParams.activeSeries === i) {
			$appendTo.addClass('expanded');
			$appendTo.removeClass('collapsed');
		} else {
			$appendTo.addClass('collapsed');
			$appendTo.removeClass('expanded');			
		}

		buildActionTags($appendTo, chartParams.series[i].actionTags, userActivities);
	    buildAggregators($appendTo, chartParams.series[i].aggregator, aggregateOnTypes);
	    buildAggregateOns($appendTo, chartParams.series[i].aggregator, aggregateOnTypes);
	    buildChartTypes($appendTo, chartParams.series[i].chartType);	
	}
}

function buildActionTags($appendTo, actionTagParams, userActivities) {
	var $actionTags = $appendTo.find('.action-tags');
	var showInactiveButtons = $appendTo.hasClass('expanded');
	$actionTags.empty();

	var actionTagList = buildActionTagList(userActivities);

	for (var i = 0; i < actionTagList.length; i++) {
		var $button = null;
		var buttonIsActive;

		if (actionTagParams.indexOf(formatTag(actionTagList[i])) < 0) {
			buttonIsActive = true
			$button = $('.standard-button.icon-dot.template').clone();
		} else {
			buttonIsActive = false;
			$button = $('.standard-button.icon-times.template').clone();
		}

		$button.removeClass('template');

		if (showInactiveButtons) {
			$button.click(onActionTagClick);
		}

		if (showInactiveButtons || buttonIsActive) {
			$button.addClass('left');
			$button.find('div span').text(actionTagList[i]);

			$actionTags.append($button);
		}		

	}
}

function getSeriesIdFromButton($button) {
	var seriesId = $button.parents('.aggregation-options').attr('class');
	seriesId = seriesId.replace('aggregation-options', '');
	seriesId = seriesId.replace('expanded', '');
	seriesId = seriesId.replace('aggregation-options-', '').trim();
	seriesId = +seriesId;
	return seriesId;	
}

function onActionTagClick(e) {
	var $button = $(this);
	var actionTag = formatTag($button.find('div span').text());
	console.log($button.parents('.aggregation-options').attr('class'));

	var seriesId = getSeriesIdFromButton($button);

	if ($button.hasClass('selected')) {
		var idx = gChartParams.series[seriesId].actionTags.indexOf(actionTag);
		if (idx >= 0) {
			var removedTags = gChartParams.series[seriesId].actionTags.splice(idx, 1);
		}
	} else {
		gChartParams.series[seriesId].actionTags.push(actionTag);
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

function buildAggregators($appendTo, aggregator, aggregateOnTypes) {
	var $aggregators = $appendTo.find('.aggregators');
	$aggregators.empty();

	for (var i = 0; i < aggregationTypes.length; i++) {
		if (!aggregationTypes[i].requiresVar || aggregateOnTypes.length > 0) {
			var $button = $('.standard-button.no-icon.template').clone();
			$button.removeClass('template');
			$button.addClass('left');
			$button.find('div').text(aggregationTypes[i].typeName);

			if (aggregationTypes[i].typeName !== aggregator.fn) {
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

	var seriesId = getSeriesIdFromButton($(this));

	gChartParams.series[seriesId].aggregator.fn = aggFn;

	if (aggFn !== 'count' && gChartParams.series[seriesId].aggregator.vars.length === 0) {
		var $aggregateOns = $('.aggregate-ons .standard-button.selected');
		if ($aggregateOns.length === 0) {
			$aggregateOns = $('.aggregate-ons .standard-button');
			var $button = $($aggregateOns[0]);
			$button.toggleClass('selected sub-button');
			gChartParams.series[seriesId].aggregator.vars.push(formatTag($button.find('div').text()));
		}
	}
	
	gChartParams.series[seriesId].aggregator.text = buildAggregatorText(gChartParams.series[seriesId].aggregator);

	renderPage(gChartParams, true);
}

function buildAggregateOns($appendTo, aggregator, aggregateOnTypes) {
	var $aggregateOns = $appendTo.find('.aggregate-ons');
	$aggregateOns.empty();

	for (var i = 0; i < aggregateOnTypes.length; i++) {
		var $button = $('.standard-button.no-icon.template').clone();
		$button.removeClass('template');
		$button.addClass('left');
		$button.find('div').text(aggregateOnTypes[i]);

		if (aggregator.vars.indexOf(formatTag(aggregateOnTypes[i])) < 0) {
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
	var actionTags = chartParams.series[0].actionTags;

	for (var i = 0; i < userActivities.length; i++) {
		var activity = userActivities[i];
		if (actionTags.indexOf(formatTag(activity.activityCategory)) >= 0) {
			if (activity.activityName !== undefined) {
				if (actionTags.indexOf(formatTag(activity.activityName)) >= 0) {
					matchedActivity = activity;
					break;
				}
			} else {
				if (actionTags.length === 1) {
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

function buildChartTypes($appendTo, chartType) {
	var $chartTypes = $appendTo.find('.chart-types');
	$chartTypes.empty();

	for (var i = 0; i < availableChartTypes.length; i++) {
		if (availableChartTypes[i].displayType !== 'small') {
			var $button = $('.standard-button.no-icon.template').clone();
			$button.removeClass('template');
			$button.addClass('left');
			$button.addClass(availableChartTypes[i].identifier);
			$button.find('div').text(availableChartTypes[i].name);

			if (chartType !== availableChartTypes[i].identifier) {
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
	var seriesId = getSeriesIdFromButton($button);

	if (!$button.hasClass('selected')) {
		var chartIdentifier = $button.attr('class');

		chartIdentifier = chartIdentifier.replace('standard-button', '');
		chartIdentifier = chartIdentifier.replace('sub-button', '');
		chartIdentifier = chartIdentifier.replace('selected', '');
		chartIdentifier = chartIdentifier.replace('left', '');
		chartIdentifier = chartIdentifier.replace('no-icon', '');
		chartIdentifier = chartIdentifier.replace('icon-times', '');
		chartIdentifier = chartIdentifier.replace('icon-dot', '');
		chartIdentifier = chartIdentifier.trim();

		gChartParams.series[seriesId].chartType = chartIdentifier;
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
	var seriesId = 0;
	var chartDataUrl = getChartDataUrl(chartParams, seriesId);

	var onGotData = function(dataset) {
		var dataConfig = {
			chartType: chartParams.series[seriesId].chartType,
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
	var aggregator = chartParams.series[0].aggregator;
	var label = aggregator.text;
	if (aggregator.vars.length > 0)
		label += ' of ' + aggregator.vars.join(', ');
	else
		label += ' of activities';
	return label;
}

function setPageHeader(chartParams) {
	var headerText = getYAxisLabel(chartParams);
	headerText += ' by day';
	$('.header-row').text(headerText);

	$('.aggregation-options-0 .aggregation-header').text(headerText);
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

		if (paramsArray.length === 14) {
			objectTagsParam1 = paramsArray[10];
			actionTagsParam1 = paramsArray[11];
			aggregatorParam1 = paramsArray[12];
			chartTypeParam1 = paramsArray[13];
		}
	}

	var aggregator = splitAggregator(aggregatorParam);

	// chartParams.objectTags = decodeURIComponent(objectTagsParam).split(',');
	// chartParams.actionTags = decodeURIComponent(actionTagsParam).split(',');
	// chartParams.aggregator = aggregator;
	chartParams.aggregatePeriod = aggregatePeriodParam;
	// chartParams.chartType = chartTypeParam;
	chartParams.fromDate = decodeURIComponent(fromDateParam);
	chartParams.toDate = decodeURIComponent(toDateParam);

	var newSeries = {
		objectTags: decodeURIComponent(objectTagsParam).split(','),
		actionTags: decodeURIComponent(actionTagsParam).split(','),
		aggregator: aggregator,
		chartType: chartTypeParam
	};

	chartParams.series.push(newSeries);

	if (actionTagsParam1 !== undefined && actionTagsParam1 !== '') {

		var aggregator1 = splitAggregator(aggregatorParam1);

		var newSeries1 = {
			objectTags: decodeURIComponent(objectTagsParam1).split(','),
			actionTags: decodeURIComponent(actionTagsParam1).split(','),
			aggregator: aggregator1,
			chartType: chartTypeParam1
		};

		chartParams.series.push(newSeries1);
	}

	chartParams.activeSeries = 0;

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
	url += '/' + encodeURIComponent(chartParams.series[0].objectTags.join(','));
	url += '/' + encodeURIComponent(chartParams.series[0].actionTags.join(','));
	url += '/' + chartParams.series[0].aggregator.text;
	url += '/' + chartParams.aggregatePeriod;
	url += '/' + chartParams.series[0].chartType;
	url += '/' + encodeURIComponent(chartParams.fromDate);
	url += '/' + encodeURIComponent(chartParams.toDate);

	if (chartParams.series.length > 1) {
		url += '/vs';
		url += '/' + encodeURIComponent(chartParams.series[1].objectTags.join(','));
		url += '/' + encodeURIComponent(chartParams.series[1].actionTags.join(','));
		url += '/' + chartParams.series[1].aggregator.text;
		url += '/' + chartParams.series[1].chartType;
	}

	return url;
	// /explore/chart/streams/:streamId/:objectTags/:actionTags/:aggregator/:aggregatePeriod/:chartType/:fromDate/:toDate/vs/:objectTags1/:actionTags1/:aggregator1/:chartType1
}

function parseUrl(url) {
	url = (url.split('/explore/chart/')[1]).split('/');
	return createChartParams(url);
}

function getChartDataUrl(chartParams, seriesId) {

	var series = chartParams.series[seriesId];

    var url = lib1self
        .objectTags(series.objectTags)
        .actionTags(series.actionTags);

    if (series.aggregator.fn === 'count') 
    	url = url.count();
    else if (series.aggregator.fn === 'sum')
    	url = url.sum(series.aggregator.vars.join(','));
    else if (series.aggregator.fn === 'mean')
    	url = url.mean(series.aggregator.vars.join(','));

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

