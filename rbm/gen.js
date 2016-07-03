var MAX_HISTORY = 12;

var enabled_temps = [0, 1];
var names = [];
var hearted = [];
var gen_history = []

function save_history(generated) {
    if (gen_history.length > MAX_HISTORY) {
        gen_history.pop();
        $("#history>li:last").remove();
    }
    gen_history.unshift(generated);
    $("#history").prepend("<li>" + generated + "</li>");

}

function toggle_heart(event) {
    // Unlike
    if ($(this).hasClass("happy")) {
        hearted.pop();
        $("#hearts>li:last").remove();
    // Like
    } else {
        var text = $("#generated").text();
        hearted.push(text);
        // dedupe?
        $("#hearts").append("<li>" + text + "</li>");
    }
    $(this).toggleClass("happy");
    // TODO:animation?
    $(this).find("span.glyphicon").toggleClass("glyphicon-heart glyphicon-heart-empty");
}

function rand_choice(arr) {
        var index = Math.floor(Math.random() * (arr.length-1) );
        return arr[index];
}

function rand_name() {
    var names_metaindex = rand_choice(enabled_temps);
    return rand_choice(names[names_metaindex]);
}

function weirdness_button_clicked(event) {
    // There always needs to be at least one source enabled. If the only one
    // currently enabled just got clicked, squelch it.
    var key = parseInt($(this).data("key"));
    if (enabled_temps.length == 1 && $(this).data("key") == enabled_temps[0]) {
        console.log("Suppressing click on last source");
        event.stopPropagation();
        return;
    }
    var metaindex = enabled_temps.indexOf(key);
    if (metaindex === -1) {
        enabled_temps.push(key);
    } else {
        enabled_temps.splice(metaindex, 1);
    }
}

$( document ).ready(function() {
    var data_url = $("body").data("namesource");
    $.ajax({
        url: data_url,
        dataType: "json",
        error: function(xhr, status, error) {},
        success: function(data, status) {
            names = data.names;
            $("#generated").text(rand_name());
        }});

    $("#thebutton").click(function(event) {
        // TODO: animation?
        var name = rand_name();
        $("#generated").text(name);
        $("#heart").removeClass("happy");
        $("#heartglyph").removeClass("glyphicon-heart");
        $("#heartglyph").addClass("glyphicon-heart-empty");
        save_history(name);
    });

    $("#heart").click(toggle_heart);

    $(".weirdness-button").click(weirdness_button_clicked);

    $(".nav-tabs a").click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        });

});
