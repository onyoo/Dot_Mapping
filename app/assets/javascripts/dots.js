
$(window).load(function() { // instead of $(document).ready because rails data not loading
  getId();
  createListener();
  destroyListener();
  
});

var lastId;
var colors = [ "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk" ]

function getId() {
  $.get('dots', function(dots) {
    if (dots.length > 0) {
      lastId = dots[dots.length - 1].id;
    } else {
      lastId = 0;
    };
  });
};

function createListener() {
  $("#target").on('click', function(e) {
    var x = e.clientX ;
    var y = e.clientY;
    var color = colors[Math.floor(Math.random() * 10)];

    $("#previous-dots").append('<canvas class="dot" id="' + (lastId + 1) + '" width="30" height="30" style="position:absolute; left:'+x+'px; top:'+y+'px; background-color:' + color + ';">');

    $.post('/dots', { 'dot': { 'x': x, 'y': y, 'color': color } });

    var dot = $("#previous-dots")[0].lastChild;
    dot.addEventListener('click', clickRemove, false);

    lastId++;
  });
};

function destroyListener() {
  $('.dot').on('click', function(e) {
    clickRemove(e);
  });
};

function clickRemove(e) {
  var id = e.currentTarget.id;
  $.ajax({
    url: '/dots/' + id,
    method: 'DELETE'
  })
  .success(removeDot(id));
};

function removeDot(id) {
  $(document.getElementById(id)).remove();
};
