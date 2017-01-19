if(classname=='close-icon'){

//  alert("clicked " + classname);
$(".move-to-submenu").remove({"move-to-submenu"});
}//moveto remove code






if ( $(window).width() < 480) {
$(".top-section-contianer").css({"background-image": "url('http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png') ;"});

}
if ( $(window).width() > 480) {
$(".thumbnail").css({"background-image": "url('http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png') ;"});

}




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
      $("#"+sidelinkid).addClass("active");
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
});//});this was missing----------------------------------------------------------------------------
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

























//active code for left nav-header
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

//-------------------------independent code=------------------------------
$(".new-button-container").click(function(e) {
  var classname1 = $(e.target).attr('class').split(' ')[0];
  if(classname1 == 'upload')
  {
  //alert(classname1 + " upload clicked");
}
if(classname1 == 'create-folder')// create folder register added
{
  $(".body").append('<div class="modal-background-filter"></div><div class="open-modal create-folder-modal-container" ><h3>Create Folder</h3><p>Please enter a new name for the item </p><div class="link-share-contianer"><input value="folder name goes here" class="share-link" /></div><div class="button-done" >Create</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');


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
    $("h3").text(classname1);
  }
  else if(classname1 == 'move-to')
  {
    $("h3").text(classname1);
  }
  else if(classname1 == 'get-shareable-link')
  {
      $(".body").append('<div class="modal-background-filter"></div><div class="open-modal shared-modal-container" ><h3>Share with others</h3><div class="link-share-contianer"><input value="link goes here" class="share-link" /></div><div class="or-container"><div class="line-share left"></div><span>or</span><div class="line-share right"></div></div><h4>People<h4><form ><input value="Enter email to share file" class="email-input" /></form><div class="button-done">Share</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
    $("h3").text(classname1);

  }
  else if(classname1 == 'favorite')
  {
    $("h3").text(classname1);
  }
  else if(classname1 == 'rename')
  {
    $(".body").append('<div class="modal-background-filter"></div><div class="open-modal rename-modal-container" ><h3>Rename</h3><p>Please enter a new name for the item </p><div class="link-share-contianer"><input value="file name goes here" class="share-link" /></div><div class="button-done">Save</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
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
