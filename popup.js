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
    $.ajax({
        url: 'https://backflipp.wishabi.com/flipp/items/search?locale=en-us&postal_code=75056&q=printer'
    }).then(function(data) {
        $('#parsedTextDiv').text(data);
    });
}