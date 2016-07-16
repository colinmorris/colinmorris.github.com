var MAX_HISTORY = 100;
var ANIMATION_DELAY = 200;

var weird = false;
var names = [];
var gen_history = []
var next_name_indices = [-1, -1];

function save_history(generated) {
    if (gen_history.length > MAX_HISTORY) {
        gen_history.pop();
        $("#history>li:last").remove();
    }
    gen_history.unshift(generated);
    var classname = weird ? "hist-weird" : "hist-nonweird";
    $("#history").prepend("<li class='" + classname + "'>" + generated + "</li>");

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

function refresh_name() {
    var name = rand_name();
    var g = $("#generated");
    g.fadeOut(ANIMATION_DELAY);
    g.queue(function(next) {
        g.text(name);
        next();
    });
    g.fadeIn(ANIMATION_DELAY);
    
    save_history(name);
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
            $("#generated").removeClass("loading");
        }});

    $("#thebutton").click(function(event) {
        refresh_name();
    });

    $("#weirdness-checkbox").change(function() {
       weird = this.checked; 
       refresh_name();
    });

    $('[data-toggle="tooltip"]').tooltip();

});
