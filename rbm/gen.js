var MAX_HISTORY = 100;

var weird = false;
var names = [];
var hearted = [];
var gen_history = []
var next_name_indices = [-1, -1];

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

function rand_name() {
    // Choose a random starting point for each subarray, and walk forward one-by-one. 
    // In this way, it's virtually impossible to see dupes in one session (though it introduces
    // the rare but catastrophic possibility that someone has a second session where they just
    // see dupe after dupe after dupe).
    var names_metaindex = weird ? 1 : 0;
    var maxidx = names[names_metaindex].length - 1;
    if (next_name_indices[names_metaindex] == -1) {
        next_name_indices[names_metaindex] = Math.floor(Math.random() * maxidx );
    }
    var name = names[names_metaindex][next_name_indices[names_metaindex]];
    next_name_indices[names_metaindex] = next_name_indices[names_metaindex] == maxidx ? 0 : next_name_indices[names_metaindex] + 1; 
    return name;
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

    $("#weirdness-checkbox").change(function() {
       weird = this.checked; 
    });

    $(".nav-tabs a").click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        });

});
