var fnr;
var oldname;
$(document).ready(function(){
  var files = [];
  var folders = [];
  var images = [];
  var defaultimg = "http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png";
  var folderid;
  var newname;
  function reloadfiles() {
    $('#files').html(" ");
    var test = 1;
    $.each(files,function(index,value) {
      fullname = value;
      test = 0;
      $('.folders-text').css({"display": "block"});
      $('.files-text').css({"display": "block"});
      if ( $(window).width() < 480) {
        if(value.length > 10) value = value.substring(0,9) + "..." + value.substring(value.length-4,value.length);
      }
      else if($(window).width() < 1025){
        if(value.length > 15) value = value.substring(0,9) + "..." + value.substring(value.length-4,value.length);
      }
      else {
        if(value.length > 15) value = value.substring(0,13) + "..." + value.substring(value.length-5,value.length);
      }
      $('#files').html($('#files').html() + "<li class=\"file\" id=\"file"+index+"\" draggable=\"true\" name=\""+fullname+"\"><div class=\"file-preview\"  style=\"  background-image: url('"+images[index]+"') ;\"></div><div class=\"file-name\" id=\"file-name"+index+"\"><i class=\"ion-ios-paper folder-icon\" ></i><span>"+value+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></div></li>");
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
      fullname = value
      test = 0;
      if ( $(window).width() < 480) {
        if(value.length > 10) value = value.substring(0,9) + "..." + value.substring(value.length-4,value.length);
      }
      else if($(window).width() < 1025){
        if(value.length > 15) value = value.substring(0,9) + "..." + value.substring(value.length-4,value.length);
      }
      else {
        if(value.length > 30) value = value.substring(0,20) + "..." + value.substring(value.length-5,value.length);
      }
      $('.folder-container').html($('.folder-container').html() + "<li class=\"folder\" draggable=\"true\"  id=\"folder"+index+"\" name=\""+fullname+"\"><i class=\"ion-ios-folder folder-icon\" ></i><span class=\"folder-name-text\">"+value+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></li>");
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
        images = [];
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
  fnr = fetchAndReload;
  $("#myfile").change(function (){
    var formData = new FormData($('#myform')[0]);
    formData.append("depth",subdir);
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
  $("body").click(function(e){
    folderClassname = $(e.target).attr('class').split(' ')[0];
    if(folderClassname=="folder"  || folderClassname=="left-nav-bar-text")
    {
    if(folderClassname != 'dot-icon' ){
      sidelinkid = $(e.target).prop("id");
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
        files = [];
        folders = [];
        reloadfiles();
        reloadfolders();
        return;
      }
      else if(sidelinkid == 'shared-with-me'){
        files = [];
        folders = [];
        reloadfiles();
        reloadfolders();
        return;
      }
      else {
  //      alert("entred" + sidelinkid);
  //      $("h3").text($("#"+sidelinkid).attr('name'));
        if(subdir == "") subdir = $("#"+sidelinkid).attr('name');
        else subdir += ("/"+$("#"+sidelinkid).attr('name'));
      }
      fetchAndReload();
    }
    sidelinkid = $(this).prop("id");
  }
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
    $(".body").click(function(e){
      var folderClassname = $(e.target).attr('class').split(' ')[0];

    //    alert("outside folder " +folderClassname);
     if(folderClassname != 'dot-icon' ){

         sidelinkid = $(e.target).prop("id");
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

  if(classname1 == 'open-with'+"open-with")
  {
    $("h3").text(classname1);
  }
  else if(classname1 == 'move-to')
  {
    $("h3").text(classname1+"open-with");
  }
  else if(classname1 == 'get-shareable-link')
  {
    $("h3").text(classname1+"open-with");
  }
  else if(classname1 == 'favorite')
  {
    $("h3").text("folderid "+ $("#"+folderid).parent().attr('name'));
  //  alert("folderid "+ $("#"+folderid).attr('name'));
    if(subdir == "") src = $("#"+folderid).parent().attr('name');
    else src = subdir+"/"+$("#"+folderid).parent().attr('name');
    dest = "favourites";
  //  move(src,dest);
  }
  else if(classname1 == 'rename')
  {
    if(subdir == "") {
      //
    }
    else {
      //
    }
  }
  else if(classname1 == 'details')
  {
    $("h3").text(classname1);
  }
  else if(classname1 == 'download')
  {
    //$("h3").text(classname1);
  }
  else if(classname1 == 'trash')
  {
    if(subdir == "") src = $("#"+data).text();
    else src = subdir+"/"+$("#"+data).text();
    dest = "deleted";
    move(src,dest);
  }
  });
/*  if(c
if(classname1 == 'create-folder')// create folder register added
{
alert(classname1 + " create folder clicked");
}*/
$(".new-button-container").click(function(e) {
  var classname1 = $(e.target).attr('class').split(' ')[0];
  if(classname1 == 'upload')
  {
  //alert(classname1 + " upload clicked");
}
if(classname1 == 'create-folder')// create folder register added
{
  $(".body").append('<div class="modal-background-filter"></div><div class="open-modal create-folder-modal-container" ><h3>Create Folder</h3><p>Please enter a new name for the item </p><div class="link-share-contianer"><input id="nameto" placeholder="folder name goes here" class="share-link" /></div><div class="button-done" id="crtbtn">Create</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
  $( "#crtbtn" ).click(function() {
    name = $("#nameto").val();
    $.ajax({
      url:base+"manage/createdir",
      type:"POST",
      async:false,
      data:{depth:subdir,name:name},
      success:function(result){
        fnr();
        $( ".modal-background-filter" ).remove();
        $( ".open-modal" ).remove();
      }
    });
  });
}
});







$("body").click(function(e) {
  var classname1 = $(e.target).attr('class').split(' ')[0];
  if(classname1 == 'close-button'){
  $( ".modal-background-filter" ).remove();
    $( ".open-modal" ).remove();
  }
  if(classname1 == 'open-with')
  {
    $("h3").text(classname1+"open-with");
  }
  else if(classname1 == 'move-to')
  {
    $("h3").text(classname1+"open-with");
  }
  else if(classname1 == 'get-shareable-link')
  {
      $(".body").append('<div class="modal-background-filter"></div><div class="open-modal shared-modal-container" ><h3>Share with others</h3><div class="link-share-contianer"><input value="link goes here" class="share-link" /></div><div class="or-container"><div class="line-share left"></div><span>or</span><div class="line-share right"></div></div><h4>People<h4><form ><input value="Enter email to share file" class="email-input" /></form><div class="button-done">Share</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
    //$("h3").text(classname1);

  }
  else if(classname1 == 'favorite'){
    if(subdir == "") src = oldname;
    else src = subdir+"/"+oldname;
    dest = "favourites";
    move(src,dest);
    fnr();
  }
  else if(classname1 == 'rename')
  {
    $(".body").append('<div class="modal-background-filter"></div><div class="open-modal rename-modal-container" ><h3>Rename</h3><p>Please enter a new name for the item </p><div class="link-share-contianer"><input id="newname" placeholder="file name goes here" class="share-link" /></div><div class="button-done" id="rname">Save</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
    //$("h3").text(classname1);
    $("#rname").click(function(e){
      var src,dest;
      newname = $("#newname").val();
      src = oldname;
      dest = newname;
      $.ajax({
        url:base+"manage/rename",
        type:"POST",
        async:false,
        data:{src:src,dest:dest,depth:subdir},
        success:function(result){
          $( ".modal-background-filter" ).remove();
          $( ".open-modal" ).remove();
          fnr();
        }
      });
    });
  }
  else if(classname1 == 'details')
  {
    $("h3").text(classname1+"open-with");
  }
  else if(classname1 == 'download'){
    $.ajax({
      url:base+"manage/setdownload",
      type:"POST",
      async:false,
      data:{name:oldname,depth:subdir},
      success:function(result){
        if(result == 1) window.location.href=base+"/manage/download";
        else alert("error While Setting download params");
      }
    });
  }
/*  if(c
if(classname1 == 'create-folder')// create folder register added
{
alert(classname1 + " create folder clicked");
}*/
});
});
$("body").click(function(e) {
classname = $(e.target).attr('class').split(' ')[0];

//     alert("classname");


//$("h3").text(folderid);

  if(classname == 'dot-icon' )
  {
    //console.log("%o",$(e.target).parent().attr('id'));
      folderid = $(e.target).parent().attr('id');
      if($("#"+folderid).attr('class') == "file-name"){
        oldname = $(e.target).parent().parent().attr('name');
      }
      else oldname = $("#"+folderid).attr('name');
    }


});
function move(src,dest){
  $.ajax({
    url:base+"manage/move",
    type:"POST",
    async:false,
    data:{dest:dest,src:src},
    success:function(result){
      fnr();
    }
  });
}
