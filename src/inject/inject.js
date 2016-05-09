var isrunningInterval;
var isdoneInterval;
var finish_message = "";

chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
console.log("running");
            chrome.runtime.onMessage.addListener(
                function(request, sender, sendResponse) {
                    console.log("request:" + request.action);
                    if (request.action == "start") {
                        clearInterval(isrunningInterval);
                        clearInterval(isdoneInterval);
                        check_and_notify();
                        finish_message = request.next_do;
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

            chrome.runtime.sendMessage({
                action: "notify",
                notebook: $('.tb-title').get(0).innerText,
                finish_message: finish_message
            }, function(response) {});
        }
    }, 100);
}
