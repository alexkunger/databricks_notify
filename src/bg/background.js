chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "notify") {
            var ifttt_token;
            chrome.storage.sync.get({
                ifttt_token: ""
            }, function(items) {
                ifttt_token = items.ifttt_token;
                if (ifttt_token == "") {
                    alert("Please set your ifttt Maker token in options.");
                }

                $.ajax({
                    type: 'POST',
                    url: 'https://maker.ifttt.com/trigger/dbend/with/key/' + ifttt_token,
                    data: {
                        value1: request.notebook,
                        value2: request.finish_message
                    },
                    crossDomain: true,
                    dataType: "jsonp"
                });
            });
        }
        sendResponse();
    });
