var isrunningInterval;
var isdoneInterval;
var finish_message = "";
var ifttt_token = "";

chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            chrome.runtime.onMessage.addListener(
                function(request, sender, sendResponse) {
                    console.log("request:" + request.action);
                    if (request.action == "start") {
                        clearInterval(isrunningInterval);
                        clearInterval(isdoneInterval);
                        check_and_notify();
                        finish_message = request.next_do;
                        ifttt_token = request.ifttt_token;
                    } else if (request.action == "stop") {
                        clearInterval(isrunningInterval);
                        clearInterval(isdoneInterval);
                    }
                });
        }
    }, 10);
});

var running = false;

function check_and_notify() {
    isrunningInterval = setInterval(function() {
        var running_cells = $('.progress-bar').length + $('.progress-bar-shadow').length;
        if (running_cells > 0) {
            running = true;
            clearInterval(isrunningInterval);
            console.log("start_monitor");
        }
    }, 100);
    isdoneInterval = setInterval(function() {
        var running_cells = $('.progress-bar').length + $('.progress-bar-shadow').length;
        if (running && running_cells == 0) {
            running = false;
            clearInterval(isdoneInterval);
            console.log("running_done");
            $.ajax({
                type: 'POST',
                url: 'https://maker.ifttt.com/trigger/dbend/with/key/' + ifttt_token,
                data: {
                    value1: $('.tb-title').get(0).innerText,
                    value2: finish_message
                },
                crossDomain: true
            });
        }
    }, 100);
}
