
$(document).ready(function () {
    var started = $(".started");
    var completed = $(".completed");
    var abolished = $(".abolished");

    $.getJSON("/statistics", function(stats){
    started.empty();
    completed.empty();
    abolished.empty();
    started.append(stats.gamesStarted);
    completed.append(stats.gamesCompleted);
    abolished.append(stats.gamesAbolished);
    });
})