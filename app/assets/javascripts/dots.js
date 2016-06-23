
$(document).ready(function() {
  getId();
  startListening();
});

var counter = 0;
var color =["red, green, blue, black, yellow,"]


function getId() {
  debugger;
};

function startListening() {
  $("#target").on('click', function(e) {
    var x = e.clientX - (counter * 20);
    var y = e.clientY;

    $("#target").append('<img data-id="' + (counter+1) + '" src="/assets/dot.png" width="20" height="20" style="position:relative; left:'+x+'px; top:'+y+'px; ">')

    $.post('/dots', {'dot': {'x': x, 'y': y}})
    counter++;
  });
};

//
// function startListening() {
//   $("#target").on('click', function(e) {
//     var x = e.clientX;
//     var y = e.clientY;
//
//     $("#target").html('<img src="/assets/dot.png" width="20" height="20" style="position:relative;left:'+x+'px; top:'+y+'px; ">')
//   });
// };
