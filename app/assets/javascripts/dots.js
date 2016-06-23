
$(window).load(function() { // instead of $(document).ready because rails data not loading
  getId();
  createListener();
  destroyListener();
});

var lastId;

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

    $("#previous-dots").append('<canvas class="dot" id="' + (lastId + 1) + '" width="30" height="30" style="position:absolute; left:'+x+'px; top:'+y+'px; background-color:red;">');

    $.post('/dots', {'dot': {'x': x, 'y': y}});
    var dot = $("#previous-dots")[0].lastChild;
    dot.addEventListener('click', clickRemove, false)

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

//
// function startListening() {
//   $("#target").on('click', function(e) {
//     var x = e.clientX;
//     var y = e.clientY;
//
//     $("#target").html('<img src="/assets/dot.png" width="20" height="20" style="position:relative;left:'+x+'px; top:'+y+'px; ">')
//   });
// };
