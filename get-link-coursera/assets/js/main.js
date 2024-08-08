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

        // Tạo một thẻ input tạm thời để lưu giá trị updatedUrl
        var tempInput = document.createElement("input");
        tempInput.value = updatedUrl;
        document.body.appendChild(tempInput);

        // Chọn và sao chép giá trị trong thẻ input tạm thời
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // Đối với thiết bị di động
        document.execCommand("copy");

        // Xóa thẻ input tạm thời sau khi sao chép
        document.body.removeChild(tempInput);

        // Thông báo cho người dùng rằng URL đã được sao chép
        alert("Đã lưu link vào clipboard: " + updatedUrl);
      `
    }, function (results) {
        if (chrome.runtime.lastError) {
            alert("Error occurred: " + chrome.runtime.lastError.message);
        }
    });
});