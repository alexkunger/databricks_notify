function start_monitor() {
    var ifttt_token;
    chrome.storage.sync.get({
        ifttt_token: ""
    }, function(items) {
        ifttt_token = items.ifttt_token;
				if (ifttt_token == "") {
					alert("Please set your ifttt Maker token in options.");
				}
    });

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "start",
            next_do: $('#next').val(),
            ifttt_token: ifttt_token
        }, function(response) {
            //noop
        });
    });
}

function stop_monitor() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "stop"
        }, function(response) {
            //noop
        });
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("request:" + request.action);
        if (request.action == "send_ifttt") {
            clearInterval(isrunningInterval);
            clearInterval(isdoneInterval);
            check_and_notify();
        } else if (request.action == "stop") {
            clearInterval(isrunningInterval);
            clearInterval(isdoneInterval);
        }
    });

document.addEventListener('DOMContentLoaded', function() {
    var start = document.getElementById('start_button');
    // onClick's logic below:
    start.addEventListener('click', start_monitor);

    var stop = document.getElementById('stop_button');
    // onClick's logic below:
    stop.addEventListener('click', stop_monitor);
});
