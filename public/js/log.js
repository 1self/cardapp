var lib1self;
var stream;
var config;

$(document).ready(function() {
    executeOnLoadTasks();
});

function executeOnLoadTasks() { 

	$('.back-button').hide();

    setUpEventHandlers();

    buildUserActivities();
    buildCategoriesSelect();
    buildPropertiesSelect();

    setUp1selfLogger();
}

function setUpEventHandlers() {

	
    $('.back-button').click(function() {
    	goBack();
    	return false;
    });
	
    $('.log-row').click(function() {
    	console.log(this);

    });

    $('.bottom-menu .add-new-log-item').click(function() {
    	show('.new-activity-section.activity-category');
    	show('.log-overlay');
    	$('.back-button').show();
    	hide('.page-title');
    	show('.page-title-add');
    });

    $('.notification-close').click(function() {
    	$('.notification-row').slideUp();
    	return false;
    });

    $('.activity-category .new-category-add').click(function() {
    	hide('.new-activity-section.activity-category');
    	show('.new-activity-section.activity-category-new');
    	return false;
    });

    $('.activity-category-new .new-category-save').click(function() {
    	hide('.new-activity-section.activity-category-new');
    	show('.new-activity-section.activity-name-new');
    	return false;
    });

    $('.activity-name .new-name-add').click(function() {
    	hide('.new-activity-section.activity-name');
    	show('.new-activity-section.activity-name-new');
    	return false;
    });

    $('.activity-name-new .new-name-save').click(function() {
    	hide('.new-activity-section.activity-name-new');
    	show('.new-activity-section.activity-property');
    	return false;
    });

    $('.activity-property .new-property-add').click(function() {
    	hide('.new-activity-section.activity-property');
    	show('.new-activity-section.activity-property-new');
    	return false;
    });

    $('.activity-property-new .new-property-save').click(function() {
    	hide('.new-activity-section.activity-property-new');
    	show('.new-activity-section.activity-property');
    	return false;
    });

    $('.activity-property .btn-finish').click(function() {
    	hide('.new-activity-section.activity-property');
    	hide('.log-overlay');
    	show('.new-activity-section.activity-category');
    	return false;
    });

    $('.property-log-save').click(function() {
    	logDataFromProperties();
    	return false;
    });

    $('.property-log-cancel').click(function() {
    	hide('.new-activity-section.activity-property-log');
		hide('.log-overlay');	
		$('.add-new-log-item').show();
    	return false;
    });


}

function goBack() {
	if (isVisible('.new-activity-section.activity-category')) {
		hide('.page-title-add');
		show('.page-title');
		hide('.log-overlay');
		hide('.new-activity-section.activity-category');
		$('.back-button').hide();
	} else if (isVisible('.new-activity-section.activity-category-new')) {
		show('.new-activity-section.activity-category');
		hide('.new-activity-section.activity-category-new');
	} else if (isVisible('.new-activity-section.activity-name')) {
		show('.new-activity-section.activity-category');
		hide('.new-activity-section.activity-name');
	} else if (isVisible('.new-activity-section.activity-name-new')) {
		show('.new-activity-section.activity-name');
		hide('.new-activity-section.activity-name-new');
	} else if (isVisible('.new-activity-section.activity-property')) {
		show('.new-activity-section.activity-name');
		hide('.new-activity-section.activity-property');
	} else if (isVisible('.new-activity-section.activity-property-new')) {
		show('.new-activity-section.activity-property');
		hide('.new-activity-section.activity-property-new');
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

function buildUserActivities() {
	$logContent = $('.log-content');
	for (var i = 0; i < userActivities.length; i++) {
		
		var activityText = userActivities[i].activityCategory;
		if (userActivities[i].activityName)
			activityText += ' - ' + userActivities[i].activityName;

		var $listItem = $('.log-row.template').clone();
		$listItem.removeClass('template');
		$listItem.find('.activity-data').val(encodeURIComponent(JSON.stringify(userActivities[i])));
		$listItem.find('.log-item-name div').text(activityText);
		$listItem.click(logItemClickHandler);
		$logContent.append($listItem);
	}
}

function buildCategoriesSelect() {
	$selectionList = $('.activity-category .selection-list');
	for (var i = 0; i < activities.length; i++) {
		var $listItem = $('.list-item.no-select.template').clone();
		$listItem.removeClass('template');
		$listItem.find('.list-item-text').text(activities[i].activityCategory);
		$listItem.click(categoryClickHandler);
		$selectionList.append($listItem);
	}
}

function buildNamesSelect(category) {
	$selectionList = $('.activity-name .selection-list');
	$selectionList.empty();
	var names;
	for (var i = 0; i < activities.length; i++) {
		if (activities[i].activityCategory === category) {
			names = activities[i].names;
			break;
		}
	}
	for (var j = 0; j < names.length; j++) {
		var $listItem = $('.list-item.no-select.template').clone();
		$listItem.removeClass('template');
		$listItem.find('.list-item-text').text(names[j]);
		$listItem.click(nameClickHandler);
		$selectionList.append($listItem);
	}
}

function buildPropertiesSelect() {
	$selectionList = $('.activity-property .selection-list');
	for (var i = 0; i < propertyTypes.length; i++) {
		var $listItem = $('.list-item.property.template').clone();
		$listItem.removeClass('template');
		$listItem.find('.property-name-text').text(propertyTypes[i].typeName);
		$listItem.find('.property-type-text').text(propertyTypes[i].type);
		$listItem.click(propertyClickHandler);
		$selectionList.append($listItem);
	}
}

function logItemClickHandler(properties) {
	var activityDataVal = $(this).find('.activity-data').val();
	var activityData;
	activityData = decodeURIComponent(activityDataVal);
	activityData = JSON.parse(activityData);

	if (!activityData.properties) {
		logTo1Self(activityData);
		doPostLogActions(activityData);
	} else {
		$('.add-new-log-item').hide();
		$('.new-activity-section.activity-property-log .activity-data').val(activityDataVal);
    	show('.new-activity-section.activity-property-log');
    	show('.log-overlay');
	}
}

function logDataFromProperties() {
	var activityData = $('.new-activity-section.activity-property-log .activity-data').val();
	activityData = decodeURIComponent(activityData);
	activityData = JSON.parse(activityData);

	var q = $('.property-log-row.quantity input').val();
	var properties = { quantity: q };
	logTo1Self(activityData, properties);
	doPostLogActions(activityData);
}

function doPostLogActions(activityData) {
	var activityText = activityData.activityCategory;
	if (activityData.activityName) {
		activityText += ' - ' + activityData.activityName;
	}

	var $notificationRow = $('.notification-row');
	$notificationRow.find('.notification-name span').text(activityText);
	hide('.new-activity-section.activity-property-log');
	hide('.log-overlay');	
	$notificationRow.slideDown();
	$('.add-new-log-item').show();
}

function categoryClickHandler() {
	var category = $(this).find('.list-item-text').text();
	buildNamesSelect(category);
	$('.activity-category-text').text(category);
	hide('.new-activity-section.activity-category');
	show('.new-activity-section.activity-name');
	return false;
}

function nameClickHandler() {
	hide('.new-activity-section.activity-name');
	show('.new-activity-section.activity-property');
	return false;
}

function propertyClickHandler() {
	$(this).find('.selector').toggleClass('selected not-selected');
	return false;
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

var createEventToLog = function(actionTags, properties) {
    var eventToLog = {
        "source": config.appName,
        "version": config.appVersion,
        "objectTags": ["self"],
        "actionTags": actionTags
        // "properties": {
        //     "quantity": quantity
        // }
    };

    if (properties) {
    	eventToLog.properties = properties;
    }

    return eventToLog;
};

var logTo1Self = function(activityData, properties) {
	var actionTags = [];
	var eventToLog;

	actionTags.push(activityData.activityCategory);

	if (activityData.activityName) {
		actionTags.push(activityData.activityName);
	}

	eventToLog = createEventToLog(actionTags, properties);

    lib1self.sendEvent(eventToLog, stream);
};

var viewViz = function(actionTags) {
    var url = lib1self
        .objectTags(["self"])
        .actionTags(actionTags)
        .sum("quantity")
        .barChart()
        .backgroundColor("ddcc19")
        .url(stream);
    console.info(url);
    $(".logActivityTemplate").hide();
    window.open(url, "_system", "location=no");
};

var propertyTypes = [
	{ typeName: 'Quantity', type: 'numeric'},
	{ typeName: 'Volume', type: 'numeric'},
	{ typeName: 'Price', type: 'numeric'},
	{ typeName: 'Duration', type: 'timespan'}
];

var activities = [
	{ activityCategory: 'Drink', names: [ 'Beer', 'Coffee', 'Squash', 'Tea', 'Water', 'Wine'] },
	{ activityCategory: 'Fitness', names: [ 'Press ups', 'Chin ups', 'Sit ups' ] },
	{ activityCategory: 'Health', names: [ 'Heartrate', 'Body temperature' ] },
	{ activityCategory: 'Music', names: [ 'Gig attended' ] },
	{ activityCategory: 'Work', names: [ 'Pomodoro', 'Meeting' ] }
];

var userActivities = [
	{ activityCategory: 'Drink', activityName: 'Coffee' },
	{ activityCategory: 'Drink', activityName: 'Tea' },
	{ activityCategory: 'Drink', activityName: 'Water' },
	{ activityCategory: 'Fitness', activityName: 'Press ups', properties: [ 'Quantity' ] },
	{ activityCategory: 'Fitness', activityName: 'Chin ups', properties: [ 'Quantity' ] }
];