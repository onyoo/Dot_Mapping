
$(window).load(function() { // instead of $(document).ready because rails data not loading
  drawDots(document.getElementsByClassName('dots'));
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
    var dots = $('.dots');
    var lastDotId;
    if (dots.length > 0) {
      lastDotId = dots[dots.length - 1].id;
    }

    $.post('/dots', { 'dot': { 'x': x, 'y': y, 'color': color }, 'last_dot_id': lastDotId })
      .success(function(allNewDots) {
        appendDots(allNewDots);
      })
      .error(function(e) {
        console.log(e);
      });

  });
};


function destroyListener() {
  $(document.body).on('click', '.dots', function(e) {
    clickRemove(e);
  });
};


function clickRemove(e) {
  var id = e.currentTarget.id;
  var dots = $('.dots');
  var lastDotId = dots[dots.length - 1].id;

  $.ajax({
    url: '/dots/' + id,
    method: 'DELETE',
    data: { 'last_dot_id': lastDotId }
  }).success(function(data) {
    removeDot(data.dot.id);
    appendDots(data.new_dots); // added to address Telmo's question about different users adding dots and having id missmatches
  }).error(function(e) {
    console.log(e);
  });
};


function removeDot(id) {
  $(document.getElementById(id)).remove();
};

function appendDots (dots) {
  for(var i = 0; dots.length > i; i++) {
    var d = dots[i];

    $("#previous-dots").append('<canvas class="dots" id="' + d.id + '" width="30" height="30" data-color="'+d.color+'" style="position:absolute; left:'+d.x+'px; top:'+d.y+'px;">');
    drawDot(document.getElementById(d.id));
  };
};

function drawDots(dots) {
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
