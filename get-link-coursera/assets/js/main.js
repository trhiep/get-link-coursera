chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(tab.id, {
        code: `
        var currentUrl = window.location.href;
        var textareas = document.querySelectorAll("textarea");
        var inputString = textareas[0].id;
        var tildeIndex = inputString.indexOf("~");
        var postID = inputString.substring(0, tildeIndex);
        var updatedUrl = currentUrl.replace(/submit$/, "review");
        updatedUrl += "/" + postID;
        alert(updatedUrl);
      `
    }, function (results) {
        if (chrome.runtime.lastError) {
            alert("Error occurred: " + chrome.runtime.lastError.message);
        }
    });
});