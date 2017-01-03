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
      $('.folders-text').css({"display": "block"});
      $('.files-text').css({"display": "block"});
      if(value.length > 30) value = value.substring(0,20) + "..." + value.substring(value.length-5,value.length);
      $('#files').html($('#files').html() + "<li class=\"file\" id=\"file"+index+"\" draggable=\"true\" ><div class=\"file-preview\"  style=\"  background-image: url('"+images[index]+"') ;\"></div><div class=\"file-name\" ><i class=\"ion-ios-paper folder-icon\" ></i><span>"+value+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></div></li>");
    });
    if(test == 1) {
      $('.files-text').css({"display": "none"});
    }
    $('#files').html($('#files').html() + "<li class=\"fix\" ></li></ul>");
  }
  function reloadfolders() {
    $('.folder-container').html(" ");
    var test = 1;
    $('.folders-text').css({"display": "block"});
    $.each(folders,function (index,value) {
      test = 0;
      $('.folder-container').html($('.folder-container').html() + "<li class=\"folder\" draggable=\"true\"  id=\"folder"+index+"\"><i class=\"ion-ios-folder folder-icon\" ></i><span class=\"folder-name-text\">"+value+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></li>");
    });
    if(test == 1) $('.folders-text').css({"display": "none"});
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
      else if(sidelinkid == 'trash'){
        subdir = "/deleted";
      }
      else if(sidelinkid == 'recent'){
        subdir = "";
      }
      else if(sidelinkid == 'shared-with-me'){
        subdir = "";
      }
      else {
        //$("h3").text(sidelinkid);
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
    document.getElementById('myfile').click();
  }
});
$("#logout").click(function (e) {
  window.location.href = base+"/manage/logout";
});





//test ----------

var sidelinkid='saved-notes';
var prevsidelinkid='saved-notes';
    $(".folder").click(function(e){
      var folderClassname = $(e.target).attr('class').split(' ')[0];

    //    alert("outside folder " +folderClassname);
     if(folderClassname != 'dot-icon' ){

         sidelinkid = $(this).prop("id");
       if(sidelinkid == "saved-notes"){
          activeupdate(sidelinkid,"Saved Notes");
        }
        else if(sidelinkid == 'favorites'){
          activeupdate(sidelinkid,"Favorites");

        }
        else if(sidelinkid == 'trash'){
          activeupdate(sidelinkid,"Deleted");

        }
        else if(sidelinkid == 'recent'){
          activeupdate(sidelinkid,"Recent");

        }
        else if(sidelinkid == 'shared-with-me'){
          activeupdate(sidelinkid,"Shared with me");

        }

      }
    });

    function activeupdate(curent,title){
      $(".active-left-nav").text(title);
      $("#"+prevsidelinkid).removeClass("active");//remove active frm prevously active
      $("#"+curent).addClass("active");//add active current
      prevsidelinkid=curent;//assign current value to prev

    }









//submenu regiters
$("body").click(function(e) {
  var classname1 = $(e.target).attr('class').split(' ')[0];

  if(classname1 == 'open-with')
  {
    $("h3").text(classname1);
  }
  else if(classname1 == 'move-to')
  {
    $("h3").text(classname1);
  }
  else if(classname1 == 'get-shareable-link')
  {
    $("h3").text(classname1);
  }
  else if(classname1 == 'favorite')
  {
    $("h3").text(classname1);
  }
  else if(classname1 == 'rename')
  {
    $("h3").text(classname1);
  }
  else if(classname1 == 'details')
  {
    $("h3").text(classname1);
  }
  else if(classname1 == 'download')
  {
    $("h3").text(classname1);
  }
/*  if(c
if(classname1 == 'create-folder')// create folder register added
{
alert(classname1 + " create folder clicked");
}*/
});

});
