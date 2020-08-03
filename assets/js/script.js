$("document").ready(function() {
    $("#theme-toggle").click(function() {
        var lightDarkSwitch = $("#stylesheet");
        if (lightDarkSwitch.attr("href", "assets/css/style.css")) {
            lightDarkSwitch.attr("href", "assets/css/style-dark.css");
        }  else {
            lightDarkSwitch.attr("href", "assets/css/style.css");
        };
    });
console.log($("#stylesheet").attr("href"));
    $( ".right-card" ).on("click", function() {
        $(this).toggleClass("flip");
      });
});