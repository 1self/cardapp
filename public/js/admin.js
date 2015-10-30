$(document).ready(function() {
    executeOnLoadTasks();
});

function executeOnLoadTasks() { 

    $('.get-cards-button').click(function() {

        var $cardsContent = $('.cards-content');
        $('.admin-loading').removeClass('hide');
        $cardsContent.empty();
        $cardsContent.addClass('hide');
        $('.total-cards-content').addClass('hide');

        var username = $('.username-entry').val();
        if (username && username !== '') {
            getCards(username);
            showCards($cardsContent);
        }
    });

}

function showCards($cardsContent) {
    deferred.done(function (cardsArray) {
        buildCardDetail(cardsArray, $cardsContent);
        $cardsContent.removeClass('hide');
        $('.total-cards-content').removeClass('hide');
        $('.admin-loading').addClass('hide');
    });
}

function buildCardDetail(cardsArray, $cardsContent) {
    var $activeDateSection;
    var cardsPerDate;
    var datesCount = 0;

    for (var i = 0; i < cardsArray.length; i++) {
        var cardData = cardsArray[i];
        if (cardData.type === 'date') {
            if ($activeDateSection !== undefined) {
                $activeDateSection.find('.card-qty').text('Cards: ' + cardsPerDate);
            }
            datesCount++;
            cardsPerDate = 0;
            $activeDateSection = addDateSection(cardData, $cardsContent);
        } else {
            if ($activeDateSection === undefined) {
                cardsPerDate = 0;
                datesCount++;
            }
            cardsPerDate++;
            $activeDateSection = addCardDetail(cardData, $cardsContent, $activeDateSection);
        }
    }

    if ($activeDateSection !== undefined) {
        $activeDateSection.find('.card-qty').text('Cards: ' + cardsPerDate);
    }

    $('.total-days').text(datesCount + ' days');
    $('.total-cards').text(cardsArray.length + ' cards');
}

function addDateSection(cardData, $cardsContent) {
    var $dateSection = $('.cards-section.template').clone();
    $dateSection.removeClass('template');
    $dateSection.find('.date-text').text(cardData.cardDate);
    $cardsContent.append($dateSection);
    return $dateSection;
}

function addCardDetail(cardData, $cardsContent, $dateSection) {
    var $cardRow = $('.card-row.template').clone();
    var $separator = $('.card-separator.template').clone();
    $cardRow.removeClass('template');
    $separator.removeClass('template');

    if ($dateSection === undefined) {
        $dateSection = addDateSection(cardData, $cardsContent);
    }

    if (cardData.type === "datasyncing" || cardData.type === "cardsgenerating") {
        setDataSource(cardData);
        $cardRow.find('.service').addClass(cardData.identifier);
        $cardRow.find('.card-text').html(cardData.type);
    } else {
        $cardRow.find('.service').addClass(getDataSource(cardData));

        createCardText(cardData);

        $cardRow.find('.card-text').html(cardData.cardText.description);
        $cardRow.find('.card-comparitor').html(cardData.cardText.comparitor);
    }

    $cardsDiv = $dateSection.find('.cards-for-date');
    $cardsDiv.append($cardRow);
    $cardsDiv.append($separator);

    return $dateSection;
}