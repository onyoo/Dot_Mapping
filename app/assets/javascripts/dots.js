
$(window).load(function() { // instead of $(document).ready because rails data not loading
  drawDots();
  getId();
  listenForClicks();
  destroyListener();
});

var lastId; // will be set to highest id value
var colors = [ "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk" ];

function getId() {
  // sets ids based on db results
  $.get('dots', function(dots) {
    if (dots.length > 0) {
      lastId = dots[dots.length - 1].id;
    } else {
      lastId = 0;
    };
  });
};

function listenForClicks() {
  // sets listener to trigger creating a dot
  $("#target").on('click', function(e) {
    var x = e.clientX ;
    var y = e.clientY;
    var color = colors[Math.floor(Math.random() * 10)];

    $("#previous-dots").append('<canvas class="dots" id="' + (lastId + 1) + '" width="30" height="30" data-color="'+color+'" style="position:absolute; left:'+x+'px; top:'+y+'px;">');
    drawDot(document.getElementById(lastId + 1));

    $.post('/dots', { 'dot': { 'x': x, 'y': y, 'color': color } });

    var dot = $("#previous-dots")[0].lastChild;
    dot.addEventListener('click', clickRemove, false);

    lastId++;
  });
};


function destroyListener() {
  $('.dots').on('click', function(e) {
    clickRemove(e);
  });
};


function clickRemove(e) {
  var id = e.currentTarget.id;

  $.ajax({
    url: '/dots/' + id,
    method: 'DELETE'
  }).success(removeDot(id));
};


function removeDot(id) {
  $(document.getElementById(id)).remove();
};


function drawDots() {
  var dots = document.getElementsByClassName('dots');

  for (var i = 0; i < dots.length ; i++) {
    drawDot(dots[i]);
  };
};


function drawDot(dot) {
  var ctx = dot.getContext("2d");
  ctx.beginPath();                     //begins path
  ctx.arc(15, 15, 10, 0, 2 * Math.PI); // defines arc to be drawn
  ctx.stroke();                        // actually draws line
  ctx.fillStyle = $(dot).data('color');
  ctx.fill();
};
