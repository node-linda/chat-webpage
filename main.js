var socket = io.connect('http://node-linda-base.herokuapp.com:80');
var linda = new Linda().connect(socket);

var ts = linda.tuplespace('chatroom01');

linda.io.on('connect', function(){
  print('socket.io connect!!');

  ts.watch({type:"chat"}, function(err, tuple){
    if(err) return;
    print(tuple.data.user + " : " + tuple.data.message);
  });

});

$(function(){
  $("#btn_post").click(post);
  $("#input_message").keydown(function(e){
    if(e.keyCode == 13) post();
  });
});

var post = function(){
  var tuple = {
    type: "chat",
    user: $("#input_user").val(),
    message: $("#input_message").val()
  };
  $("#input_message").val('');
  ts.write(tuple);
};

var print = function(msg){
  // console.log(msg);
  if(typeof msg === 'object') msg = JSON.stringify(msg);
  $("#log").prepend( $("<li>").text(msg).fadeIn(400) );
};
