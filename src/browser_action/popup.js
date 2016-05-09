function start_monitor() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "start",
            next_do: $('#next').val()
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

document.addEventListener('DOMContentLoaded', function() {
    var start = document.getElementById('start_button');
    // onClick's logic below:
    start.addEventListener('click', start_monitor);

    var stop = document.getElementById('stop_button');
    // onClick's logic below:
    stop.addEventListener('click', stop_monitor);
});
