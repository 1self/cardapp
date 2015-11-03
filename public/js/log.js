var lib1self;
var stream;
var config;

$(document).ready(function() {
    executeOnLoadTasks();
});

function executeOnLoadTasks() { 

	$('.back-button').hide();

	var continueLoad = checkUrlValidity();

	if (continueLoad) {
		setUpUserActivities();
		setUpUserProperties();
	    setUpEventHandlers();

	    setUp1selfLogger();

	    buildUserActivities();
	    buildCategoriesSelect();
	    buildPropertiesSelect();
	}
}

function checkUrlValidity() {
	if (newActivityState === '' || newActivityState === undefined) {
		return true;
	} else {
		window.location.href = '/log';
		return false;
	}
}

/*

/log/new/select-activity-category
/log/new/new-activity-category
/log/new/select-activity-name
/log/new/new-activity-name
/log/new/select-properties
/log/new/new-property
/log/do-log/:activityCategory
/log/do-log/:activityCategory/name/:activityName
/log/do-log/:activityCategory/properties/:properties
/log/do-log/:activityCategory/name/:activityName/properties/:properties

 */

function setUpEventHandlers() {

	window.addEventListener('popstate', function(e) {
		console.log('popstate', window.location.href, e);
		var newState;
		if (e.state) {
			newState = e.state;
		} else {
			newState = { name: '' };
		}
		newState.doPush = false;
		renderNewState(newState);
	});
	
    $('.back-button').click(function() {
    	history.back();
    	return false;
    });

    $('.notification-close').click(function() {
    	$('.notification-row').slideUp();
    	return false;
    });

    $('.bottom-menu .add-new-log-item').click(function() {
    	renderNewState({ name: 'select-activity-category' });
    });

    $('.activity-category .new-category-add').click(function() {
    	renderNewState({ name: 'new-activity-category' });
    	return false;
    });

    $('.activity-category-new .new-category-save').click(function() {
    	var category = $('.activity-category-new input').val();

    	var errorText = validateNewCategoryInput(category);
    	$('.activity-category-error').text(errorText);

    	if (errorText === '') {
			var activity = { activityCategory: category };
			var state = {};
			state.category = category;
			state.name = 'new-activity-name';

			writeDataToHidden('.log-overlay .new-activity-data', activity);
			renderNewState(state);
		}
    	return false;
    });

    $('.activity-name .new-name-add').click(function() {
    	renderNewState({ name: 'new-activity-name' });
    	// hide('.new-activity-section.activity-name');
    	// show('.new-activity-section.activity-name-new');
    	return false;
    });

    $('.activity-name .activity-name-skip, .activity-name-new .activity-name-skip').click(function() {
    	nameClickHandler(null, null);
    	return false;
    });

    $('.activity-name-new .new-name-save').click(function() {
    	var activityName = $('.activity-name-new input').val();

    	var errorText = validateNewNameInput(activityName);
    	$('.activity-name-error').text(errorText);
    	
    	if (errorText === '')
    		nameClickHandler(null, activityName);
    	
    	return false;
    });

    $('.activity-property .new-property-add').click(function() {
    	var activity = getDataFromHidden('.log-overlay .new-activity-data');
    	var state = {};
    	state.name = 'new-property';
    	state.activity = activity;
    	renderNewState(state);
    	return false;
    });

    $('.activity-property-new .new-property-cancel').click(function() {
    	history.back();
    	return false;
    });

    $('.activity-property-new .new-property-save').click(function() {
    	saveNewProperty();
    	return false;
    });

    $('.activity-property .btn-finish').click(function() {
    	addActivityFinish();
    	return false;
    });

    $('.property-log-save').click(function() {
    	logDataFromProperties();
    	return false;
    });

    $('.property-log-cancel').click(function() {
    	history.back();
  //   	hide('.new-activity-section.activity-property-log');
		// hide('.log-overlay');	
		// $('.add-new-log-item').show();
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
    } else if (newState.name === 'new-activity-category') {
    	hide('.new-activity-section.activity-category');
    	hide('.new-activity-section.activity-name-new');
    	show('.new-activity-section.activity-category-new');
    } else if (newState.name === 'select-activity-name') {
    	if (newState.category) {
	    	$('.activity-name .activity-category-text').text('Activity names for "' + newState.category + '"');
			$('.activity-name-new .activity-category-text').text('New activity name for "' + newState.category + '"');
		}
		hide('.new-activity-section.activity-category');
		hide('.new-activity-section.activity-property');
    	hide('.new-activity-section.activity-name-new');
		show('.new-activity-section.activity-name');
    } else if (newState.name === 'new-activity-name') {
    	if (newState.category) {
			$('.activity-name .activity-category-text').text('Activity names for "' + newState.category + '"');
			$('.activity-name-new .activity-category-text').text('New activity name for "' + newState.category + '"');
		}
		hide('.new-activity-section.activity-name');
    	hide('.new-activity-section.activity-category-new');
		hide('.new-activity-section.activity-property');
    	show('.new-activity-section.activity-name-new');
	} else if (newState.name === 'select-properties') {
		if (newState.activity)
			$('.activity-property .activity-text').text(formatActivityText(newState.activity));
		hide('.new-activity-section.activity-name');
		hide('.new-activity-section.activity-name-new');
    	hide('.new-activity-section.activity-property-new');
		show('.new-activity-section.activity-property');
	} else if (newState.name === 'new-property') {
		var headerText = 'New property for: ';
    	headerText += formatActivityText(newState.activity);
    	$('.activity-property-new .new-activity-sub-header').text(headerText);
    	hide('.new-activity-section.activity-property');
    	show('.new-activity-section.activity-property-new');
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

function buildUserActivities(storedUserActivities) {
	$logContent = $('.log-content');

	if (!storedUserActivities)
		storedUserActivities = getUserActivities();
	else
		$('.log-content .log-row').remove();
	
	for (var i = 0; i < storedUserActivities.length; i++) {
		
		var $listItem = $('.log-row.template').clone();
		var $sparkBarContainer = $listItem.find('.spark-bar-container');
		$listItem.removeClass('template');
		$listItem.find('.activity-data').val(encodeURIComponent(JSON.stringify(storedUserActivities[i])));
		$listItem.find('.log-item-name div').text(formatActivityText(storedUserActivities[i]));

		if (storedUserActivities[i].properties && storedUserActivities[i].properties.length > 0)
			$listItem.find('.log-item-button .log-button div').text('Next >');
		else
			$listItem.find('.log-item-button .log-button div').text('Log it');

		$sparkBarContainer.addClass('spark-bar-container-' + i);
		getChartDataUrl(['self'], constructActionTags(storedUserActivities[i]), 'quantity', '090909');
		renderSparkBar($sparkBarContainer);
		
		$listItem.click(logItemClickHandler);
		$logContent.append($listItem);
	}
}

function constructActionTags(activity) {
	var actionTags = [];
	actionTags.push(formatTag(activity.activityCategory));
	if (activity.activityName) actionTags.push(formatTag(activity.activityName));
	return actionTags;
}

function renderSparkBar($targetElement) {

	var onGotData = function(dataset) {
		drawChart(dataset, { lineColour: '#00B597' }, $targetElement, 'spark-bar');
	};

	getData('', onGotData);
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
	var userProperties = getUserProperties();

	var $selectionList = $('.activity-property .selection-list');
	for (var i = 0; i < userProperties.length; i++) {
		addNewPropertyToList($selectionList, userProperties[i], false);
	}
}

function addNewPropertyToList($selectionList, propertyType, selected) {
		var $listItem = $('.list-item.property.template').clone();
		$listItem.removeClass('template');
		$listItem.find('.property-name-text').text(propertyType.typeName);
		$listItem.find('.property-type-text').text(propertyType.type);

		if (selected) {
			$listItem.find('.selector').toggleClass('selected not-selected');
		}

		$listItem.click(propertyClickHandler);
		$selectionList.append($listItem);
}

function buildPropertyLogRows(activityData) {
	$rowContainer = $('.activity-property-log .property-log-rows');
	$rowContainer.empty();
	for (var i = 0; i < activityData.properties.length; i++) {
		var propertyObj = getPropertyObjFromName(activityData.properties[i]);
		var selector = '.property-log-row.' + propertyObj.type + '.template';
		var $listItem = $(selector).clone();
		$listItem.removeClass('template');
		$listItem.find('.property-enter-text').text('Enter ' + activityData.properties[i]);
		$listItem.find('.property-name').val(propertyObj.typeName);
		$listItem.find('.property-type').val(propertyObj.type);
		$rowContainer.append($listItem);
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
		$('.new-activity-section.activity-property-log .new-activity-sub-header').text(formatActivityText(activityData));
		$('.new-activity-section.activity-property-log .activity-data').val(activityDataVal);
		buildPropertyLogRows(activityData);
    	show('.new-activity-section.activity-property-log');
    	show('.log-overlay');
	}
}

function logDataFromProperties() {
	var properties = {};
	var propertyVal;
	var activityData = $('.new-activity-section.activity-property-log .activity-data').val();
	activityData = decodeURIComponent(activityData);
	activityData = JSON.parse(activityData);

	var propertyRows = $('.activity-property-log .property-log-row');

	for (var i = 0; i < propertyRows.length; i++) {
		var $propertyRow = $(propertyRows[i]);
		var errorText;
		var propertyName = $propertyRow.find('.property-name').val();
		var propertyType = $propertyRow.find('.property-type').val();

		if (propertyType === 'numeric') {
			propertyVal = $propertyRow.find('input.log-numeric').val().trim();
			errorText = validateInput(propertyName, propertyVal, propertyType);
			if (errorText === '') {
				propertyVal = +propertyVal;
				properties[propertyName.toLowerCase()] = propertyVal;
			} else {
				$propertyRow.find('.error-text').text(errorText);
			}

		} else if (propertyType === 'timespan') {
			var hh = $propertyRow.find('input[name="hh"]').val().trim();
			var MM = $propertyRow.find('input[name="MM"]').val().trim();
			var ss = $propertyRow.find('input[name="ss"]').val().trim();

			errorText = validateInput(propertyName, hh, propertyType);
			if (errorText === '') {
				hh = hh === '' ? 0 : +hh;
				errorText = validateInput(propertyName, MM, propertyType);
			}
			if (errorText === '') {
				MM = MM === '' ? 0 : +MM;
				errorText = validateInput(propertyName, ss, propertyType);
			}
			if (errorText === '') {
				ss = ss === '' ? 0 : +ss;
				propertyVal = ss + (MM * 60) + (hh * 3600);
				properties[propertyName.toLowerCase()] = propertyVal;
			}

			if (errorText !== '')
				$propertyRow.find('.error-text').text(errorText);

		} else if (propertyType === 'text') {
			propertyVal = $propertyRow.find('textarea.log-text').val().trim();
			errorText = validateInput(propertyName, propertyVal, propertyType);
			if (errorText === '') {
				if (propertyVal !== '') {
					properties[propertyName.toLowerCase()] = propertyVal;
				}
			} else {
				$propertyRow.find('.error-text').text(errorText);
			}
		}
	}

	logTo1Self(activityData, properties);
	doPostLogActions(activityData);
}

function validateInput(propertyName, propertyVal, propertyType) {
	var errorText = '';
	if (propertyType === 'numeric') {
		if (isNaN(propertyVal) || propertyVal === '' || propertyVal === '.') {
			errorText = propertyName + ' must be numeric';
		}
	} else if (propertyType === 'timespan') {
		if (propertyVal !== '') {
			if (isNaN(propertyVal)) {
				errorText = propertyName + ' fields must be numeric';
			}
		}
	} else if (propertyType === 'text') {
		if (propertyVal.length > 140) {
			errorText = 'Maximum ' + propertyName + ' length is 140. Current length is ' + propertyVal.length;
		}
	}
	console.log(errorText, propertyName);
	return errorText;
}

function doPostLogActions(activityData) {

	var $notificationRow = $('.notification-row');
	$notificationRow.find('.notification-name span').text(formatActivityText(activityData));
	hide('.new-activity-section.activity-property-log');
	hide('.log-overlay');
    $('.log-content').animate({
        scrollTop: $notificationRow.offset().top
    }, 500, function() {
    	setTimeout(function() {
    		$notificationRow.slideDown();
			$('.add-new-log-item').show();    	
    	}, 500);
    });

}

function categoryClickHandler(e) {
	var category = $(this).find('.list-item-text').text();
	var activity = { activityCategory: category };
	writeDataToHidden('.log-overlay .new-activity-data', activity);
	buildNamesSelect(category);
	var state = {};
	state.name = 'select-activity-name';
	state.category = category;
	renderNewState(state);
	return false;
}

function nameClickHandler(e, activityName) {
	var activity = getDataFromHidden('.log-overlay .new-activity-data');
	if (activityName === null) {
		activity = { activityCategory: activity.activityCategory };
	} else {
		if (activityName === undefined) {
			activityName = $(this).find('.list-item-text').text();
		}		
		activity.activityName = activityName;
	}

	writeDataToHidden('.log-overlay .new-activity-data', activity);

	var state = {};
	state.name = 'select-properties';
	state.activity = activity;

	renderNewState(state);
	return false;
}

function propertyClickHandler(e) {
	$(this).find('.selector').toggleClass('selected not-selected');
	return false;
}

function saveNewProperty() {
	var propertyType = {};
	propertyType.typeName = $('.activity-property-new input[type="text"]').val();
	propertyType.type = $('.activity-property-new input[name="property-name"]:checked').val();
	var error = validateNewPropertyInput(propertyType);

	if (!error) {
		var storedUserProperties = addPropertyTypeToStorage(propertyType);
		$selectionList = $('.activity-property .selection-list');
		addNewPropertyToList($selectionList, propertyType, true);

		var state = { name: 'select-properties' };
		renderNewState(state);
		// hide('.new-activity-section.activity-property-new');
	 //    show('.new-activity-section.activity-property');	
	}
} 

function addActivityFinish() {
	var activity = getDataFromHidden('.log-overlay .new-activity-data');
	var propertyRows = $('.activity-property .list-item.property');
	var properties = [];
	for (var i = 0; i < propertyRows.length; i++) {
		var $propertyRow = $(propertyRows[i]);
		if ($propertyRow.find('.selector.selected').length > 0) {
			var propertyName = $propertyRow.find('.property-name-text').text();
			properties.push(propertyName);
		}
	}
	if (properties.length > 0) {
		activity.properties = properties;
	}
	var storedActivities = addActivityToStorage(activity);
	buildUserActivities(storedActivities);
	window.location.href = '/log';
	// renderNewState({ name: '' });
	// hide('.new-activity-section.activity-property');
	// hide('.log-overlay');
}

function formatActivityText(activityData) {
	var activityText = activityData.activityCategory;
	if (activityData.activityName) {
		activityText += ' - ' + activityData.activityName;
	}
	return activityText;
}

function getPropertyObjFromName(propertyName) {
	var userProperties = getUserProperties();
	for (var i = 0; i < userProperties.length; i++) {
		if (userProperties[i].typeName === propertyName) {
			return userProperties[i];
		}
	}
	return null;
}

function writeDataToHidden(selector, JSONObj) {
	$(selector).val(encodeURIComponent(JSON.stringify(JSONObj)));
}

function getDataFromHidden(selector) {
	var data = $(selector).val();
	data = decodeURIComponent(data);
	data = JSON.parse(data);
	return data;
}

function setUpUserActivities() {
	if (!localStorage.userActivities) {
		localStorage.userActivities = JSON.stringify(userActivities);
	}
}

function saveUserActivities(userActivities) {
	localStorage.userActivities = JSON.stringify(userActivities);
}

function getUserActivities() {
	var storedUserActivities = localStorage.userActivities;
	if (storedUserActivities)
		storedUserActivities = JSON.parse(storedUserActivities);
	else
		storedUserActivities = [];

	return storedUserActivities;
}

function addActivityToStorage(activity) {
	var storedActivities = getUserActivities();
	storedActivities.push(activity);
	saveUserActivities(storedActivities);
	return storedActivities;
}

function setUpUserProperties() {
	if (!localStorage.userProperties) {
		localStorage.userProperties = JSON.stringify(propertySetup);
	}
}

function saveUserProperties(userProperties) {
	localStorage.userProperties = JSON.stringify(userProperties);
}

function getUserProperties() {
	var storedUserProperties = localStorage.userProperties;
	if (storedUserProperties)
		storedUserProperties = JSON.parse(storedUserProperties);
	else
		storedUserProperties = [];

	return storedUserProperties;
}

function addPropertyTypeToStorage(propertyType) {
	var storedUserProperties = getUserProperties();
	storedUserProperties.push(propertyType);
	saveUserProperties(storedUserProperties);
	return storedUserProperties;
}

function validateNewCategoryInput(category) {
	var errorText = '';
	if (category === '') {
		errorText = 'Please enter a category name';
	}
	return errorText;
}

function validateNewNameInput(name) {
	var errorText = '';
	if (name === '') {
		errorText = 'Please enter an activity name or "skip" to ignore';
	}
	return errorText;
}

function validateNewPropertyInput(propertyType) {
	var error = false;

	if (propertyType.typeName === '') {
		$('.property-name-error').text('Please enter a property name');
		error = true;
	} else {
		$('.property-name-error').text('');
	}

	if (propertyType.type === undefined) {
		$('.property-type-error').text('Please select a property type');
		error = true;
	} else {
		$('.property-type-error').text('');
	}

	return error;
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

	actionTags.push(formatTag(activityData.activityCategory));

	if (activityData.activityName) {
		actionTags.push(formatTag(activityData.activityName));
	}

	eventToLog = createEventToLog(actionTags, properties);

    lib1self.sendEvent(eventToLog, stream);
};

function formatTag(tag) {
	tag = tag.toLowerCase();
	tag = tag.replace(' ', '-');
	return tag;
}

function getChartDataUrl(objectTags, actionTags, sumName, colour) {
    var url = lib1self
        .objectTags(objectTags)
        .actionTags(actionTags)
        .count()
        .barChart()
        .backgroundColor(colour)
        .url(stream);

    console.log(url);
    return url;
}

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

var propertySetup = [
	{ typeName: 'Quantity', type: 'numeric'},
	{ typeName: 'Volume', type: 'numeric'},
	{ typeName: 'Price', type: 'numeric'},
	{ typeName: 'Duration', type: 'timespan'},
	{ typeName: 'Note', type: 'text'}
];

var propertyTypes = [ 'numeric', 'timespan', 'text' ];

var activities = [
	{ activityCategory: 'Drink', names: [ 'Beer', 'Coffee', 'Coke', 'Squash', 'Tea', 'Water', 'Wine'] },
	{ activityCategory: 'Exercise', names: [ 'Press ups', 'Chin ups', 'Sit ups', 'Stretching', 'Yoga' ] },
	{ activityCategory: 'Health', names: [ 'Body temperature', 'Heartrate' ] },
	{ activityCategory: 'Music', names: [ 'Gig attended' ] },
	{ activityCategory: 'Work', names: [ 'Meeting', 'Pomodoro' ] }
];

var userActivities = [
	{ activityCategory: 'Drink', activityName: 'Coffee' },
	{ activityCategory: 'Drink', activityName: 'Tea' },
	{ activityCategory: 'Drink', activityName: 'Water', properties: [ 'Volume' ] },
	{ activityCategory: 'Exercise', activityName: 'Press ups', properties: [ 'Quantity' ] },
	{ activityCategory: 'Exercise', activityName: 'Chin ups', properties: [ 'Quantity' ] },
	{ activityCategory: 'Exercise', properties: [ 'Duration' ] },
	{ activityCategory: 'Work', activityName: 'Meeting', properties: [ 'Duration' ] },
	{ activityCategory: 'Work', activityName: 'Pomodoro' }
];