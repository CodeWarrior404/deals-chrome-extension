chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action === 'pageParsingComplete') {
        updateDisplay(request.source);
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
    var parsedTextDiv = document.querySelector('#parsedTextDiv');
    parsedTextDiv.innerText = displayValue;
}