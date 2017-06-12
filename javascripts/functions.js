function displaymessage(val){
  $(".body").append('<div class="modal-background-filter"></div><div class="open-modal error-modal-container" ><p>'+val+'</p><div class="okay button-done" id="okay" >OK</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
}
$("#logout").click(function (e) {
  window.location.href = base+"/manage/logout";
});
function activeupdate(curent,title){
  $(".active-left-nav").text(title);
  $("#"+prevsidelinkid).removeClass("active");//remove active frm prevously active
  $("#"+curent).addClass("active");//add active current
  prevsidelinkid=curent;//assign current value to prev
}
