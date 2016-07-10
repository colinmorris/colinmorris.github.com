var MAX_HISTORY = 100;

var weird = false;
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
    var names_metaindex = weird ? 1 : 0;
    return rand_choice(names[names_metaindex]);
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
