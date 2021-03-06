// Set up moment locale
moment.locale('en', {
    calendar : {
        lastDay : '[Yesterday]',
        sameDay : '[Today]',
        nextDay : '[Tomorrow]',
        lastWeek : 'dddd ll',
        nextWeek : 'dddd ll',
        sameElse : 'dddd ll'
    }
});

function markCardRead(username, cardElem, cardReloadCount) {

    var cardId = cardElem.getAttribute('cardId');
    if (cardId) {
        var now = new Date();

        var localISODate = formatLocalDateInISOWithOffset(now);

        var apiUrl = "/cards/" + cardId;

        var viewDuration = now.getTime() - cardElem.cardVisibleAt;

        var dataBody = {   "read" : true, 
                            "readInfo" : 
                                            { 
                                                viewDuration:       viewDuration,
                                                cardIndex:          +cardElem.getAttribute('cardIndex'),
                                                cardReloadCount:    cardReloadCount,
                                                clientReadDate:     localISODate
                                            }
                        };

        console.log('markCardRead url:', apiUrl, ", dataBody: ", dataBody);

        if (!offline) {
            $.ajax({
                        url: apiUrl,
                        data: JSON.stringify(dataBody),
                        type: "PATCH",
                        contentType: "application/json"

            }).done(function (data) {
                console.log('markCardRead', username, cardId, data);

            }).fail(function (data) {
                console.log('ERROR markCardRead', username, cardId, data);
            });
        }
    } else {
            var cardData = $(cardElem).find('.cardData');
            cardData = decodeURIComponent(cardData.val());
            cardData = JSON.parse(cardData);
            if (cardData.type === "intro") {
                markIntroCardSeen(cardData);
            }
    }
}

function replayToday(username, readSettings){
    var replayEvent = {
        eventCategory: 'card-stack',
        eventAction: 'replay-today',
        eventLabel: ''
    };
    analytics.send('event', replayEvent);

    if (!offline) {
        $.ajax({
            url: "/cards/replay",
            data: JSON.stringify({}),
            type: "POST",
            contentType: "application/json"
        })
        .done(function (data) {
            console.log('markTodaysCardsUnread: done', username, data);
        })
        .fail(function (data) {
            console.log('ERROR markCardRead', username, cardId, data);
        });
    }
}

function replayCards(username){
    console.log("replayCards: marking todays cards as unread url:", apiUrl);
    var apiUrl = "/cards";
    var dataBody = {  };
    markCardsAsRead(username, dataBody);
}

function markLastWeeksCardsUnread(username){
    console.log("markLastWeeksCardsUnread: marking last week''s cards as unread url:", apiUrl);
    var apiUrl = "/cards";
    var dataBody = { "read": false, "filter": "lastWeek" };
    markCardsAsRead(username, dataBody);
}

function getSeenIntroCards() {
    var seenIntroCards = tryParseJSON(localStorage.introCards);
    if (!seenIntroCards || !seenIntroCards.seen)
        seenIntroCards = { seen: [] };
    return seenIntroCards;
}

function saveSeenIntroCards(seenIntroCards) {
    localStorage.introCards = JSON.stringify(seenIntroCards);
}

function markIntroCardSeen(cardData) {
    var seenIntroCards = getSeenIntroCards();
    if (seenIntroCards.seen.indexOf(cardData.introCardId) < 0) {
        seenIntroCards.seen.push(cardData.introCardId);
    }
    saveSeenIntroCards(seenIntroCards);
}

function createCardText(cardData) {
    var cardText = {};
    

    if (cardData.type === "top10" || cardData.type === "bottom10") {

        var template1 = '{{value}} {{action_pl}}'; // e.g. [Yesterday]: [6th] [fewest] [commit]s in [a day] [ever]
        var template2 = '{{value}} {{action_pp}} {{property}}'; // [Yesterday]: [6th] [most] [commit]ted [file changes] in [a day] [ever]
        var template3 = '{{value}} {{objects}} {{action_pl}}'; // [Yesterday]: [6th] [fewest] [music track] [listen]s in [a day] [ever]
        var template4 = '{{value}} {{action_pl}} to {{objects}}'; // 3 pushes to Github
        // var template4 = '{{comparitor}} {{action_pl}} to {{property}} in {{eventPeriod}} {{comparisonPeriod}}'; // [Yesterday]: [6th] [fewest] [listen]s [to Royksopp] in [a day] [ever]
        // var template5 = '{{comparitor}} {{objects}} {{property}} in {{eventPeriod}} {{comparisonPeriod}}'; // [Yesterday]: [6th] [fewest] [computer desktop] [all distracting percent] in [a day] [ever]
        var template5 = '{{value}} {{property}} {{objects}}'; // [9hrs] [total] [computer time]
        var template6 = '{{value}} {{action_pl}} to {{property}}'; // [Yesterday]: [13] [listens] to [Four Tet]<br>Your [6th] [fewest] in [a day]
        var template7 = '{{value}} of your {{objects}} was {{property}}'; // [Yesterday]: [1.2%] of your [computer use] was [business]<br>Your [6th] [fewest] in [a day]
        var template8 = '{{value}} {{property}}'; // [Yesterday]: [2609] [steps]<br>Your [6th] [fewest] in [a day]
        var template9 = '{{value}} {{objects}} {{property}}'; // [Yesterday]: [34] [google] [visits]<br>Your [6th] [fewest] in [a day]

        var templateDefault = '{{value}} {{{objects}}} {{{action_pp}}} {{{property}}}'; // [Yesterday]: [1.2] {objects} {actions} {properties}<br>Your [6th] [fewest] in [a day]


        var propertiesObj = buildPropertiesTextAndGetValue(cardData.properties.sum);

        var supplantObject = {
            eventDate: stripAtDetail(dateRangetext(cardData.startRange, cardData.endRange)),
            comparitor: createComparitorText(cardData.position, cardData.type),
            eventPeriod: "a day",
            comparisonPeriod: "",
            value: propertiesObj.value
        };

        cardText.comparitor = ("Your {{comparitor}} in {{eventPeriod}} {{comparisonPeriod}}").supplant(supplantObject);

        if (cardData.actionTags[0] === "commit" || cardData.actionTags[1] === "push") {
            if (cardData.properties.sum.__count__) {
                supplantObject.action_pl = displayTags(pluralise(cardData.actionTags, propertiesObj.value));
                cardText.description = template1.supplant(supplantObject);

            } else {
                if (propertiesObj.actionOverride)
                    supplantObject.action_pp = propertiesObj.actionOverride;
                else
                    supplantObject.action_pp = displayTags(pastParticiple(cardData.actionTags));
                supplantObject.property = propertiesObj.propertiesText;
                cardText.description = template2.supplant(supplantObject);

            }
        } else if (cardData.actionTags[0] === "push") {
            if (cardData.properties.sum.__count__) {
                supplantObject.action_pl = displayTags(pluralise(cardData.actionTags,propertiesObj.value));
                supplantObject.objects = customFormatObjTags(displayTags(cardData.objectTags));
                cardText.description = template4.supplant(supplantObject);

            } else {
                supplantObject.action_pp = displayTags(pastParticiple(cardData.actionTags));
                supplantObject.property = propertiesObj.propertiesText;
                cardText.description = template2.supplant(supplantObject);

            }
        } else if (cardData.actionTags[0] === "listen") {
            if (cardData.properties.sum.__count__) {
                supplantObject.action_pl = customFormatActionTags(displayTags(cardData.actionTags));
                supplantObject.objects = customFormatObjTags(displayTags(cardData.objectTags));
                cardText.description = template3.supplant(supplantObject);

            } else {
                supplantObject.action_pl = displayTags(pluralise(cardData.actionTags, propertiesObj.value));
                supplantObject.property = propertiesObj.propertiesText;
                cardText.description = template6.supplant(supplantObject);

            }
        } else if (cardData.actionTags[0] === "use") {
            if (cardData.properties.sum && cardData.properties.sum['total-duration']) {
                supplantObject.property = propertiesObj.propertiesText;
                supplantObject.objects = customFormatObjTags(displayTags(cardData.objectTags));
                supplantObject.cardDate = cardData.cardDate;
                cardText.description = template5.supplant(supplantObject);
            } else {
                supplantObject.property = "&quot;" + propertiesObj.propertiesText + "&quot;";
                supplantObject.objects = customFormatObjTags(displayTags(cardData.objectTags));
                supplantObject.cardDate = cardData.cardDate;
                cardText.description = template7.supplant(supplantObject);
            }
            cardText.extraInfo = {};
            cardText.extraInfo.text = 'More info at RescueTime.com';
            cardText.extraInfo.link = ("https://www.rescuetime.com/dashboard/for/the/day/of/{{cardDate}}").supplant(supplantObject);

        } else if (cardData.actionTags[0] === "develop") {
            if (cardData.chart.indexOf('.duration') > 0) {
                supplantObject.property = "coding";
            } else {
                supplantObject.property = "coding sessions";
            }
            cardText.description = template8.supplant(supplantObject);

        } else if (cardData.actionTags[0] === "exercise") {

            if (cardData.actionTags[1] === "walk") {
                if (cardData.chart.indexOf('steps') > 0) {
                    supplantObject.property = propertiesObj.propertiesText;
                } else {
                    supplantObject.property = "walks";
                }
                cardText.description = template8.supplant(supplantObject);
            } else if (cardData.actionTags[1] === "ride") {
                if (cardData.propertyName === "distance.sum") {
                    supplantObject.property = "metres ridden";
                    cardText.description = template8.supplant(supplantObject);
                }
            }

        } else if (cardData.actionTags[0] === "browse" && cardData.chart.indexOf('times-visited') > 0) {
            supplantObject.property = propertiesObj.propertiesText;
            supplantObject.objects = customFormatObjTags(displayTags(cardData.objectTags));
            cardText.description = template9.supplant(supplantObject);

        } else if (cardData.actionTags[0] === "sample" && (cardData.objectTags.indexOf('twitter') >= 0 || cardData.objectTags.indexOf('instagram') >= 0)) {
            if (cardData.objectTags.indexOf('follower') >= 0) {
                supplantObject.action_pl = 'followers';
            } else if (cardData.objectTags.indexOf('following') >= 0) {
                supplantObject.action_pl = 'following';
            }
            cardText.description = template1.supplant(supplantObject);
            cardText.comparitor = ("Your {{comparitor}}").supplant(supplantObject);
        } else if (cardData.actionTags[0] === "publish" && cardData.objectTags.indexOf('twitter') >= 0) {
            if (cardData.properties.sum.__count__) {
                supplantObject.action_pl = 'tweets';
            } else if (cardData.properties.sum.retweets) {
                supplantObject.action_pl = "retweets of your tweets";
            } else if (cardData.properties.sum.favorites) {
                supplantObject.action_pl = "likes of your tweets";
            }
            cardText.description = template1.supplant(supplantObject);
        } else if (cardData.actionTags[0] === "publish" && cardData.objectTags.indexOf('instagram') >= 0) {
            if (cardData.properties.sum.__count__) {
                supplantObject.action_pl = 'instagrams';
            } else if (cardData.properties.sum.comments) {
                supplantObject.action_pl = "comments on your photos";
            } else if (cardData.properties.sum.likes) {
                supplantObject.action_pl = "likes of your photos";
            }
            cardText.description = template1.supplant(supplantObject);
        }

        if (!cardText.description) {
            supplantObject.property = propertiesObj.propertiesText;
            supplantObject.action_pp = displayTags(pastParticiple(cardData.actionTags));
            supplantObject.objects = displayTags(cardData.objectTags);
            cardText.description = templateDefault.supplant(supplantObject);
        } 

        cardData.cardText = cardText;
    }
}

function buildPropertiesTextAndGetValue (propertiesObject) {
    // debugger;
    var returnString = '';
    var objectKey = Object.keys(propertiesObject)[0];
    var prevObjectKey;
    var returnObj = {};
    var isDuration = false;
    var isPercent = false;
    var stringArray = [];

    // 2 committed file changes in repo 1self/visit-counter

    while (objectKey && objectKey !== "__count__") {
        var propertyText = unhyphenate(customFormatProperty(objectKey));
        propertiesObject = propertiesObject[objectKey];
        prevObjectKey = objectKey;

        if (objectKey.indexOf('duration') >= 0) {
            isDuration = true;
        } else if (objectKey.indexOf('percent') >= 0 || objectKey.indexOf('productivity-pulse') >= 0) {
            isPercent = true;
        }

        if (typeof propertiesObject === 'object' && propertiesObject !== null)
            objectKey = Object.keys(propertiesObject)[0];
        else
            objectKey = null;

        if (propertyText !== "") {
            returnString += propertyText;
            stringArray.push(propertyText);
            if (objectKey && objectKey !== "__count__") {
                returnString += ": ";
            }
        }
    }

    if (stringArray[0] === "repo") {
        if (stringArray.length === 3) {
            returnString = stringArray[2] + ' in ' + stringArray[0] + ' ' + stringArray[1];
        } else if (stringArray.length === 2) {
            returnString = ' to ' + stringArray[0] + ' ' + stringArray[1];
        } else if (stringArray.length === 5) {
            returnString = stringArray[4] + ' to ' + stringArray[3];
            returnString += ' ' + stringArray[2] + ' in ' + stringArray[0] + ' ' + stringArray[1];
            // returnObj.actionOverride = "commit";
        }
    }


    returnObj.propertiesText = returnString.trim();

    if (objectKey === "__count__") {
        returnObj.value = propertiesObject[objectKey];
    } else {
        returnObj.value = propertiesObject;
    }

    if (returnObj.value && returnObj.value.toString() !== '1' && returnObj.actionOverride) {
        returnObj.actionOverride += 's';
    }

    if (isDuration)
        if (returnObj.value <= 60) {
            returnObj.value = Math.round(returnObj.value) + "s";
        } else if (returnObj.value > 60 && returnObj.value <= 3600) {
            returnObj.value = Math.floor(returnObj.value / 60) + 'm ' + Math.round(returnObj.value % 60) + 's';
        } else {
            returnObj.value = Math.floor(returnObj.value / 3600) + 'h ' + Math.round((returnObj.value % 3600) / 60) + 'm';
        }
    else if (isPercent)
        returnObj.value = setPrecision(returnObj.value, 3) + '%';
    else
        returnObj.value = setPrecision(returnObj.value, 4);

    return returnObj;
}

String.prototype.supplant = function(o) {
    return this.replace(
        /\{\{([^{}]*)\}\}/g,
        function(a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

function createComparitorText(position, type) {
    var comparitorText = '';

    comparitorText = (type === "top10" ? "most" : "fewest");

    if (position > 0)
        comparitorText = ordinal_suffix_of(position + 1, true) + ' ' + comparitorText;

    return comparitorText;
}

function displayTags(tagArray) {
    var returnString = '';

    for (var i in tagArray) {
        returnString += tagArray[i] + " ";
    }

    return returnString.trim();
}

function pluralise(stringArray, value) {

    if (value !== 1) {
        var lastItem = stringArray[stringArray.length - 1];
        
        var plural;
        if (lastItem === "push")
            plural = "es";
        else
            plural = "s";

        lastItem += plural;

        stringArray[stringArray.length - 1] = lastItem;
    }

    return stringArray;
}

function pastParticiple(stringArray) {
    var toReturn = [];
    for (var i in stringArray) {
        var pp;
        if (stringArray[i] === "commit")
            pp = "ted";
        else if (stringArray[i] === "github")
            pp = '';
        else if (stringArray[i] === "push")
            pp = 'ed';
        else
            pp = "s";
        toReturn.push(stringArray[i] + pp);
    }
    return toReturn;
}

function unhyphenate(toUnhyphenate) {
        return toUnhyphenate.replace(/\^/g, '.').replace(/-/g, ' ');
}

function customFormatProperty(propertyText) {
    if (propertyText === "artist-name")
        return "";
    else if (propertyText === "album-name")
        return "tracks from the album";
    else if (propertyText.indexOf('percent') >= 0)
        return propertyText.replace('percent', '').trim();
    else if (propertyText.indexOf('duration') >= 0)
        return propertyText.replace('duration', '').trim();
    else if (propertyText.indexOf('times-visited') >= 0)
        return propertyText.replace('times-visited', 'visits').trim();
    else
        return propertyText;
}

function customFormatObjTags(objTagsString) {
    if (objTagsString === "computer desktop") 
        return "computer time";
    else if (objTagsString === "music")
        return "music tracks";
    else if (objTagsString.indexOf('github') >= 0)
        return "Github";
    else
        return objTagsString;
}

function customFormatActionTags(actionTagsString) {
    if (actionTagsString === "listen") 
        return "listened to";
    else
        return actionTagsString;
}

function setPrecision(numberToSet, precision) {
    // var returnString = numberToSet.toPrecision(precision) + '';
    // while (returnString.indexOf('.') >= 0 && (returnString.charAt(returnString.length - 1) === '0' || returnString.charAt(returnString.length - 1) === '.')) {
    //     returnString = returnString.substring(0, returnString.length - 1);
    // }
    // return returnString;
    return sigFigs(numberToSet, precision);
}

function stripAtDetail(stringToStrip) {
    stringArr = stringToStrip.split(' at ');
    stringArr[0] = stringArr[0].replace('Last ', '');
    return stringArr[0];
}


function dateRangetext(cardType, startRange, endRange) {
    var rangeText;
    var xd;

    if (cardType === "date") {
        xd = new XDate(startRange);
        rangeText = xd.toString("dddd, MMM d");
    } else {
        if (startRange === endRange) {
            // single moment
            startRange = moment(startRange);
            rangeText = startRange.calendar(); //'Yesterday';
        } else {
            // range of time
            startRange = moment(startRange);
            endRange = moment(endRange);
            rangeText = startRange.format('lll') + ' - ' + endRange.format('lll');
        }

        stripAtDetail(rangeText);
    }

    return rangeText;
}

function setSourceElements (cardData) {
    cardData.dataSource = getDataSource(cardData);
}


function renderThumbnailMedia($cardLi, cardData) {

    if (cardData.thumbnailMedia) {
        $iframe = $cardLi.find(".front .chart-iframe");
        if (!$iframe.attr('src') || $iframe.attr('src') === "") {
            var iFrameSrc = cardData.thumbnailMedia;
            iFrameSrc += '?lineColour=' + stripHash(getPrimaryColour(cardData.dataSource));
            iFrameSrc += '&highlightCondition=' + cardData.type;
            iFrameSrc += '&highlightDates=' + getHighlightDates(cardData);
            iFrameSrc += '&doTransitions=true';
            iFrameSrc += '&dataSrc=' + encodeURIComponent(cardData.chart);
            $iframe.attr("src", iFrameSrc);
        }
    }
}


function renderMainMedia($cardLi, cardData) {

    if (cardData.thumbnailMedia) {
        $iframe = $cardLi.find(".back .chart-iframe");
        if (!$iframe.attr('src') || $iframe.attr('src') === "") {
            var iFrameSrc = cardData.thumbnailMedia;
            iFrameSrc += '?lineColour=' + stripHash(getPrimaryColour(cardData.dataSource));
            iFrameSrc += '&highlightCondition=' + cardData.type;
            iFrameSrc += '&highlightDates=' + getHighlightDates(cardData);
            iFrameSrc += '&vaxis=true&haxis=true';
            iFrameSrc += '&displayTooltips=true';
            iFrameSrc += '&doTransitions=false';
            iFrameSrc += '&dataSrc=' + encodeURIComponent(cardData.chart);
            $iframe.attr("src", iFrameSrc);
        }
    }
}

