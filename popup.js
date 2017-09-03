chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action === 'pageParsingComplete') {
        proccessPageText(request.source);
    }
});

function onWindowLoad() {
    chrome.tabs.executeScript(null, {
        file: 'parsePageTextContent.js'
    }, function() {
        if (chrome.runtime.lastError) {
            updateDisplay('There was an error injecting script : \n' + chrome.runtime.lastError.message);
        }
    });

}

window.onload = onWindowLoad;

function updateDisplay(displayValue) {
    $('#parsedTextDiv').text(displayValue);
}

function proccessPageText(pageTxt) {
    updateDisplay('Checking for deals...');
    updateDisplay(createListOfKeywordsFromPageTxt(pageTxt));
    // $.ajax({
    //     url: 'https://backflipp.wishabi.com/flipp/items/search?locale=en-us&postal_code=75056&q=printer'
    // }).then(function(data) {
    //     $('#parsedTextDiv').text(data);
    // });
}

function createListOfKeywordsFromPageTxt(pageTxt) {
    // List of words to ignore
    var ignoreList = { add: true, and: true, information: true, large: true, nutrition: true, servings: true,
        small: true, sprinkle: true, stir: true, the: true, them: true, total: true, 'with': true, knead: true, each: true,
        roll: true };

    pageTxt = pageTxt.replace(/[&\/\\#,+()$~%.'":*?<>{}_@;\-\r\n]/g, ' ');
    var wordArray = pageTxt.split(' ');
    var wordMap = {};

    $.each(wordArray, function (index, word) {
        if (word.length > 2 && !wordMap[word.toLowerCase()] && !ignoreList[word.toLowerCase()]) {
            wordMap[word.toLowerCase()] = true;
        }
    });

    return Object.keys(wordMap);
}