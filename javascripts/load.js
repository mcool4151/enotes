$(document).ready(function(){
  var files = [];
  var folders = [];
  var images = [];
  var defaultimg = "http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png";
  function reloadfiles() {
    $('#files').html(" ");
    var test = 1;
    $.each(files,function(index,value) {
      test = 0;
      $('#files').html($('#files').html() + "<li class=\"file\" draggable=\"true\" id=\"file"+index+"\"><div class=\"file-preview\"  style=\"  background-image: url('"+images[index]+"') ;\"></div><div class=\"file-name\"><i class=\"ion-ios-paper folder-icon\" ></i><span>"+value+"</span></div></li>");
    });
    if(test == 1) $('#files').html($('#files').html() + "No Files Here");
    $('#files').html($('#files').html() + "<li class=\"fix\" ></li></ul>");
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
  function fetchAndReload(){
    $.ajax({
      url:base+"manage/getdir",
      type:"GET",
      async:false,
      data:{depth:subdir},
      success:function(result){
        files = [];
        folders = [];
        list = jQuery.parseJSON(result);
        $.each(list,function(index,value){
          if (value.is_dir == true) folders.push(value.name);
          else {
            files.push(value.name);
            if(value.is_img == true) images.push(value.link);
            else images.push(defaultimg);
          }
        });
        reloadfiles();
        reloadfolders();
      }
    });
  }
  fetchAndReload();
  $("#myfile").change(function (){
    var formData = new FormData($('#myform')[0]);
    $.ajax({
      url:base+"manage/upload",
      type:"POST",
      data:formData,
      processData: false,
      contentType: false,
      async: true,
      success:function(result){
        if(result == 1){
          fetchAndReload();
        }
        else {
          alert(result);
        }
      }
    });
  });
  var folderClassname;
  var sidelinkid;
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
    sidelinkid = $(this).prop("id");
  });
/*  $(".left-navigation li").click(function(e){


});*/
$(".new-button-container").click(function(e) {
  var classname1 = $(e.target).attr('class').split(' ')[0];
  if(classname1 == 'upload'){
    alert("Not working");
    document.getElementById('myfile').click();
  }
});
$("#logout").click(function (e) {
  window.location.href = base+"/manage/logout";
});
});
