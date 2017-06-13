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
function appendCreateMenu(){
  $(".create-menu").append('<ul class="new-dropdown folder-submenu-container" ><li class="create-folder"><i class="create-folder ion-ios-folder icon" ></i><span class="create-folder">Create Folder</span></li><li class="create-group"><i class="create-group ion-android-people icon" ></i><span class="create-group">Create Group</span></li><li class="upload"><i class="upload ion-ios-paper icon" ></i><span class="upload">Upload File</span></li></ul>');
}
function removeCreateMenu(){
  $( ".new-dropdown" ).remove();
}
function getShortName(shortname){
  if ( $(window).width() < 480) {
    if(shortname.length > 10) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
  }
  else if($(window).width() < 1025){
    if(shortname.length > 15) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
  }
  else {
    if(shortname.length > 30) shortname = shortname.substring(0,20) + "..." + shortname.substring(shortname.length-5,shortname.length);
  }
  return shortname;
}
function appendFolder(value,exclass,index,shortname){
  $('.folder-container').append("<li data-index=\""+value.id+"\" class=\"folder "+exclass+"\" draggable=\"true\"  id=\"folder"+index+"\" name=\""+value.id+"\"><i class=\"ion-ios-folder folder-icon\" ></i><span class=\"folder-name-text\" id=\"folder"+index+"\" >"+shortname+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></li>");
}
function appendFile(value,exclass,index,img,shortname){
  $('#files').append("<li data-index=\""+value.id+"\" class=\"file "+exclass+"\" id=\"file"+index+"\" draggable=\"true\" name=\""+value.id+"\"><div class=\"file-preview\"  style=\"  background-image: url('"+img+"') ;\"></div><div class=\"file-name\" id=\"file-name"+index+"\"><i class=\"ion-ios-paper folder-icon\" ></i><span>"+shortname+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></div></li>");
}
function showFolderText(){
  $('.folders-text').css({"display": "block"});
}
function hideFolderText(){
  $('.folders-text').css({"display": "none"});
}
function showFolderContainer(){
  $('.folder-container').css({"display": "block"});
}
function showFileText(){
  $('.files-text').css({"display": "block"});
}
function hideFileText(){
  $('.files-text').css({"display": "none"});
}
function showMyGroupContainer(){
  $('.my-group').css({"display": "block"});
}
function appendMyGroup(value,index,shortname){
  $('.my-group').append("<li data-index=\""+value.id+"\" class=\"folder\" draggable=\"true\"  id=\"mfolder"+index+"\" name=\""+value.name+"\"><i class=\"ion-ios-folder folder-icon\" ></i><span class=\"folder-name-text\" id=\"folder"+index+"\">"+shortname+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></li>");
}
function showSubGroupText(){
  $('.sub-groups-text').css({'display':'block'});
}
function showSubGroupContainer(){
  $('.sub-group').css({'display':'block'});
}
function hideSubGroupText(){
  $('.sub-groups-text').css({'display':'none'});
}
function hideSubGroupContainer(){
  $('.sub-group').css({'display':'none'});
}
function appendSubGroup(index,value,shortname){
  $('.sub-group').append('<li class="folder" id="sgroup'+index+'" name="'+value.name+'"><i class="ion-ios-folder folder-icon" ></i><span class="folder-name-text">'+shortname+'</span><label class="toggle-switch switch"><input checked type="checkbox" checked name="'+value.name+'" onchange="unsubscribe(this)"><div class="slider round"></div></label></li>');
}
function emptySubgroupContainer(){
  $('.sub-group').empty();
}
function hideSugGroupText(){
  $('.sug-groups-text').css({'display':'none'});
}
function hideSugGroupContainer(){
  $('.sug-group').css({'display':'none'});
}
function emptySugGroupContainer(){
  $('.sug-group').empty();
}
function showSugGroupText(){
  $('.sug-groups-text').css({'display':'block'});
}
function showSugGroupContainer(){
  $('.sug-group').css({'display':'block'});
}
function appendSugGroup(index,value,shortname){
  $('.sug-group').append('<li class="folder" id="rgroup'+index+'" name="'+value.name+'"><i class="ion-ios-folder folder-icon" ></i><span class="folder-name-text">'+shortname+'</span><label class="toggle-switch switch"><input type="checkbox" name="'+value.name+'" onchange="subscribe(this)"><div class="slider round"></div></label></li>');
}
function hideMobileSubmenu(){
  $(".mobile-submenu-full-cover").css({"display": "none"});
}
function showMessage(message){
  $(".body").append('<div class="modal-background-filter"></div><div class="open-modal error-modal-container" ><p>'+message+'</p><div class="okay button-done" id="okay" >OK</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
}
function appendGroupMenu(){
  $(".body").append('<form id="myform"><div class="modal-background-filter"></div><div class="open-modal group-modal-container " ><h3>Create Group</h3><p>Please enter details to create group </p><div class="input-container"><input class="namebox" autocomplete="off" placeholder="Name" id="members" style="text-transform: none"><div class="chip-container memb" ><span class="chips-here memb"><span class="chip" id="option-1"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span></span><input autocomplete="off" style="text-transform: none" placeholder="Members" name="browser" class="members" list="friend-email1" ><datalist class="email-suggestion" id="friend-email1"></datalist></div><textarea rows="4" placeholder="Description"></textarea><div class="chip-container" ><span class="chips-here"><span class="chip" id="option-1"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span></span><input autocomplete="off" placeholder="Tags (e.g., engennering,CM4G,Mumbai University)" name="browser" id="members"></div></div><div class="button-done">Create</div><div class="close"><i class="close-button ion-close"></i></div></div></form>');
}
