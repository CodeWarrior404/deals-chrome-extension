function parseDOM(root) {
    var parsedValue = parseNode(root.firstChild);
    console.log(parsedValue);
    return parsedValue;
}

function parseNode(node) {
    var parsedText = '';
    var currentNode = node;
    while (currentNode) {
        if (currentNode.nodeName !== 'SCRIPT' && currentNode.nodeName !== 'STYLE') {
            if (currentNode.nodeType === Node.TEXT_NODE) {
                parsedText += ' ';
                parsedText += currentNode.nodeValue;
            } else {
                var childNode = currentNode.firstChild;
                parsedText += ' ';
                parsedText += parseNode(childNode);
            }
        }
        currentNode = currentNode.nextSibling;
    }
    return parsedText;
}

chrome.runtime.sendMessage({
    action: 'pageParsingComplete',
    source: parseDOM(document)
});