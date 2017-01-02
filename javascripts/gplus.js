$(document).ready(function(){
});
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url:base+"gplus/login",
    type:"POST",
    data: { token: id_token},
    success:function(result){
      if(result == 1) window.location.href = "/project/login";
    }
  });
}
