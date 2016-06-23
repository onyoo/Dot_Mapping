
$(window).load(function() { // instead of $(document).ready because rails data not loading
  drawDots();
  listenForClicks();
  destroyListener();
});

var colors = [ "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk" ];

function listenForClicks() {
  // sets listener to trigger creating a dot
  $("#target").on('click', function(e) {
    var x = e.clientX - 15;
    var y = e.clientY - 15;
    var color = colors[Math.floor(Math.random() * 10)];

    $.post('/dots', { 'dot': { 'x': x, 'y': y, 'color': color } })
      .success(function(dot) {
        appendDot(dot, x, y, color);
      });

  });
};

function appendDot (dot, x, y, color) {
  $("#previous-dots").append('<canvas class="dots" id="' + dot.id + '" width="30" height="30" data-color="'+color+'" style="position:absolute; left:'+x+'px; top:'+y+'px;">');
  drawDot(document.getElementById(dot.id));
};


function destroyListener() {
  $(document.body).on('click', '.dots', function(e) {
    clickRemove(e);
  });
};


function clickRemove(e) {
  var id = e.currentTarget.id;

  $.ajax({
    url: '/dots/' + id,
    method: 'DELETE'
  }).success(function() {
    removeDot(id);
  }).error(function(e) {
    console.log(e);
  });
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
