$(".new-button-container").click(function(e) {
  var classname1 = $(e.target).attr('class').split(' ')[0];
  if(classname1 == 'upload')
  {
  alert(classname1 + " class clicked");
}
});
// Folder update code
$(".folder").click(function(e){
  folderClassname = $(e.target).attr('class').split(' ')[0];
//    alert("outside folder " +folderClassname);
  if(folderClassname != 'dot-icon' ){
    sidelinkid = $(this).prop("id");
    if(sidelinkid == "saved-notes"){
      subdir = "";
    }
    else if(sidelinkid == 'favorites'){
      subdir = "/favourites";
    }
    else if(sidelinkid == 'delete'){
      subdir = "/deleted";
    }
    else if(sidelinkid == 'recent'){
      subdir = "";
    }
    else if(sidelinkid == 'shared-with-me'){
      subdir = "";
    }
    else {
      if(subdir == "") subdir = $("#"+sidelinkid).text();
      else subdir += ("/"+$("#"+sidelinkid).text());
    }
    fetchAndReload();
  }
  function reloadfolders() {
    $('.folder-container').html(" ");
    var test = 1;
    $.each(folders,function (index,value) {
      test = 0;
      $('.folder-container').html($('.folder-container').html() + "<li class=\"folder\" draggable=\"true\"  id=\"folder"+index+"\"><i class=\"ion-ios-folder folder-icon\" ></i><span>"+value+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></li>");
    });
    if(test == 1) $('.folder-container').html($('.folder-container').html() + "No Folders Here");
    $('.folder-container').html($('.folder-container').html() + "<li class=\"fix\" ></li>");
  }
  function reloadfolders() {
    $('.folder-container').html(" ");
    var test = 1;
    $.each(folders,function (index,value) {
      test = 0;
      $('.folder-container').html($('.folder-container').html() + "<li class=\"folder\" draggable=\"true\"  id=\"folder"+index+"\"><i class=\"ion-ios-folder folder-icon\" ></i><span>"+value+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></li>");
    });
    if(test == 1) $('.folder-container').html($('.folder-container').html() + "No Folders Here");
    $('.folder-container').html($('.folder-container').html() + "<li class=\"fix\" ></li>");
  }
