var active=0;
var folderid;
var classname;
var onscreen=0;
var sidelinkid='saved-notes';
var prevsidelinkid='saved-notes';
var prevforid;
    $("body").click(function(e){
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
$(document).ready(function(){


  /*$(".new").click(function(){


    $(".new-button-container").append('<ul class="folder-submenu-container" ><li class="open-with-main"><i class="ion-arrow-expand icon" ></i><span>Open with</span><i class="ion-arrow-right-b right" aria-hidden="true"></i><ul class="submenu open-with-sub" ><li><i class="ion-plus icon" ></i><span>connect more apps</span></li></ul></li><li><i class="ion-android-exit icon" ></i><span>Move To..</span></li><li><i class="ion-link icon" ></i><span>Get Shareable Link</span></li><li><i class="ion-ios-star icon" ></i><span>Add To Favorite</span></li><li><i class="ion-ios-compose icon" ></i><span>Rename</span></li><li><i class="ion-ios-information icon" ></i><span>View Details</span></li><li><i class="ion-archive icon" ></i><span>Downloads</span></li></ul>');

  });
  $("body").click(function(){


    $( ".new-button-containers" ).remove();

  });*/




$(".upload-button").click(function(e) {
  $(".back-arrow").css({"display": "block"});
  $(".left-menu").css({"display": "none"});
  $(".body").append('<ul class="mobile-submenu-full-cover" ><li><i class="ion-plus icon" ></i><span>Create Folder</span></li><li><i class="ion-ios-paper icon" ></i><span>Upload File</span></li></ul>');
});
$(".search-icon").click(function(e) {
  $(".back-arrow").css({"display": "block"});
  $(".left-menu").css({"display": "none"});
  $(".body").append('<ul class="mobile-submenu-full-cover" ><li><i class="ion-plus icon" ></i><span class="text">result1</span></li><li><i class="ion-ios-paper icon" ></i><span class="text">result 2</span></li><li><i class="ion-ios-folder icon" ></i><span class="text">result3</span></li></ul>');
});

  $("body").click(function(e) {

    classname = $(e.target).attr('class').split(' ')[0];

if(classname == 'new'){
  if(onscreen==0)
  {
  $(".new-button-container").append('<ul class="folder-submenu-container" ><li class="create-folder"><i class="create-folder ion-plus icon" ></i><span class="create-folder">Create Folder</span></li><li class="upload"><i class="upload ion-ios-paper icon" ></i><span class="upload">Upload File</span></li></ul>');
onscreen=1;
}
}
else{
  $( ".folder-submenu-container" ).remove();
  onscreen=0;
}
});
//$( ".folder-submenu-container" ).remove();
/*
$(".dot-icon").click(function(){


  folderid = $(this).parent().prop("id");

});*/
    $("body").click(function(e) {
 classname = $(e.target).attr('class').split(' ')[0];

    //     alert("classname");

    folderid = $(e.target).parent().attr('id');
    //$("h3").text(folderid);
      if(active!=0){
        $( ".folder-submenu-container" ).remove();
        onscreen=0;
        active=0;
      }

      if(classname == 'dot-icon' )
      {
        //alert("entred "+folderid);
        if(active==1)
        {
          $( ".folder-submenu-container" ).remove();
          active=0;
        }
        if(active==0)
        {

          //    $("#"+folderid).append('<ul class="folder-submenu-container" ><li class="open-with open-with-main"><i class="ion-arrow-expand icon" ></i><span class="open-with">Open with</span></li><li class="move-to"><i class="ion-android-exit icon" ></i><span class="move-to">Move To..</span></li><li class="get-shareable-link"><i class="ion-link icon" ></i><span class="get-shareable-link">Get Shareable Link</span></li><li class="favorite"><i class="ion-ios-star icon" ></i><span class="favorite">Add To Favorite</span></li><li class="rename"><i class="ion-ios-compose icon" ></i><span class="rename">Rename</span></li><li class="details"><i class="ion-ios-information icon" ></i><span class="details">View Details</span></li><li class="download"><i class="ion-archive icon" ></i><span class="download">Download</span></li></ul>');

          var classnamefolder = $(e.target).parent().attr('class').split(' ')[1];
          var classnamefile = $(e.target).parent().parent().attr('class').split(' ')[1];

          //$("h3").text(classnamefolder + classnamefile);

          if(classnamefolder=='trash' || classnamefile == 'trash'){
              $("#"+folderid).append('<ul class="folder-submenu-container" ><li class="restore"><i class="ion-ios-undo icon" ></i><span class="restore">Restore </span></li><li class="permanently-delete"><i class="ion-trash-b icon" ></i><span class="permanently-delete">Permanently Delete</span></li></ul>');
              if ( $(window).width() > 480)
              $(".file .folder-submenu-container").css({"margin-top":"20px"});

            }else if(classnamefolder=='shared' || classnamefile == 'shared')
            {
              $("#"+folderid).append('<ul class="folder-submenu-container" ><li class="open-with open-with-main"><i class="ion-arrow-expand icon" ></i><span class="open-with">Open with</span></li><li class="move-to-saved-notes"><i class="ion-android-exit icon" ></i><span class="move-to-saved-notes">Move To Saved Notes</span></li><li class="download"><i class="ion-archive icon" ></i><span class="download">Download</span></li></ul>');
              if ( $(window).width() > 480)
              $(".file .folder-submenu-container").css({"margin-top":"-180px"});

            }
            else if(classnamefolder=='favorite' || classnamefile == 'favorite')
            {
              $("#"+folderid).append('<ul class="folder-submenu-container" ><li class="open-with open-with-main"><i class="ion-arrow-expand icon" ></i><span class="open-with">Open with</span></li><li class="get-shareable-link"><i class="ion-link icon" ></i><span class="get-shareable-link">Get Shareable Link</span></li><li class="favorite-remove"><i class="ion-ios-undo icon" ></i><span class="favorite-remove">Remove From Favorite</span></li><li class="rename"><i class="ion-ios-compose icon" ></i><span class="rename">Rename</span></li><li class="details"><i class="ion-ios-information icon" ></i><span class="details">View Details</span></li><li class="download"><i class="ion-archive icon" ></i><span class="download">Download</span></li></ul>');
              if ( $(window).width() > 480)
              $(".file .folder-submenu-container").css({"margin-top":"-180px"});

            }
            else {
              $("#"+folderid).append('<ul class="folder-submenu-container" ><li class="open-with open-with-main"><i class="ion-arrow-expand icon" ></i><span class="open-with">Open with</span></li><li class="move-to"><i class="ion-android-exit icon" ></i><span class="move-to">Move To..</span></li><li class="get-shareable-link"><i class="ion-link icon" ></i><span class="get-shareable-link">Get Shareable Link</span></li><li class="favorite"><i class="ion-ios-star icon" ></i><span class="favorite">Add To Favorite</span></li><li class="rename"><i class="ion-ios-compose icon" ></i><span class="rename">Rename</span></li><li class="details"><i class="ion-ios-information icon" ></i><span class="details">View Details</span></li><li class="download"><i class="ion-archive icon" ></i><span class="download">Download</span></li><li class="trash"><i class="ion-trash-b icon" ></i><span class="trash">Remove</span></li></ul>');
              if ( $(window).width() > 480)
              $(".file .folder-submenu-container").css({"margin-top":"-220px"});
              prevforid=folderid;
            }
            //  $("#"+folderid).append('<ul class="folder-submenu-container" ><li class="open-with open-with-main"><i class="ion-arrow-expand icon" ></i><span class="open-with">Open with</span></li><li class="move-to"><i class="ion-android-exit icon" ></i><span class="move-to">Move To..</span></li><li class="get-shareable-link"><i class="ion-link icon" ></i><span class="get-shareable-link">Get Shareable Link</span></li><li class="favorite"><i class="ion-ios-star icon" ></i><span class="favorite">Add To Favorite</span></li><li class="rename"><i class="ion-ios-compose icon" ></i><span class="rename">Rename</span></li><li class="details"><i class="ion-ios-information icon" ></i><span class="details">View Details</span></li><li class="download"><i class="ion-archive icon" ></i><span class="download">Download</span></li></ul>');

          active=1;
          if ( $(window).width() < 480) {
          $(".back-arrow").css({"display": "block"});
          $(".left-menu").css({"display": "none"});
          }
        }

      }



     if(classname=='details'){
       $(".details").css({"display": "none"});
       $(".right-container").css({"display": "block"});


       if ( $(window).width() > 1024) {
         $(".display-container").css({"width": "62%"});
         $(".display-container .folder").css({"width": "32%"});
         $(".file-container").css({"width": "100%"});
         $(".file-container .file").css({"width": "32%","height":"170px"});
         $(".file-container .file-preview").css({"height":"120px"});

       }
       else if ( $(window).width() > 480 && $(window).width() < 1024) {
         $(".display-container").css({"width": "55%"});
         $(".display-container .folder").css({"width": "48%"});
         $(".file-container").css({"width": "100%","margin-left":"-30px"});
         $(".file-container .file").css({"width": "48%","height":"150px"});
         $(".file-container .file-preview").css({"height":"100px"});

       }
       else if ( $(window).width() < 1024) {
       $(".back-arrow").css({"display": "block"});
       $(".left-menu").css({"display": "none"});
       $(".close-icon-right-container").css({"display": "none"});
       }
    }





    if(classname=='close-icon-right-container'){
      $(".right-container").css({"display": "none"});

      if ( $(window).width() > 1024) {
        $(".display-container").css({"width": "100%"});
        $(".display-container .folder").css({"width": "24%"});
        $(".file-container").css({"width": "100%"});
        $(".file-container .file").css({"width": "24%","height":"200px"});
        $(".file-container .file-preview").css({"height":"150px"});

      }
      else if ( $(window).width() > 480 && $(window).width() < 1024) {
        $(".display-container").css({"width": "100%"});
        $(".display-container .folder").css({"width": "32%"});
        $(".file-container").css({"width": "100%","margin-left":"-30px"});
        $(".file-container .file").css({"width": "32%","height":"170px"});
        $(".file-container .file-preview").css({"height":"120px"});

      }



   }



  /*    if(classname=='move-to'){

      //   alert("move-to clicked " + classname + prevforid);
      if ( $(window).width() < 480) {
      $(".back-arrow").css({"display": "none"});
      $(".left-menu").css({"display": "block"});
    }
        $("#"+prevforid).append('<ul class="move-to-submenu" ><i class="back-icon ion-arrow-left-c icon"></i><h4 class="move-to-title">Saved Notes</h4><i class="close-icon ion-close-round icon  "></i><div class="li-container"><li class="option-1" id="option-1"><i class="ion-ios-folder icon" ></i><span class="option-1">Avish1</span><i class="ion-android-arrow-dropright right icon" ></i></li><li class="option-1" id="option-1"><i class="ion-ios-folder icon" ></i><span class="option-1">Avish1</span><i class="ion-android-arrow-dropright right icon" ></i></li><li class="option-1" id="option-1"><i class="ion-ios-folder icon" ></i><span class="option-1">Avish1</span><i class="ion-android-arrow-dropright right icon" ></i></li><li class="option-1" id="option-1"><i class="ion-ios-folder icon" ></i><span class="option-1">Avish1</span><i class="ion-android-arrow-dropright right icon" ></i></li><li class="option-1" id="option-1"><i class="ion-ios-folder icon" ></i><span class="option-1">Avish1</span><i class="ion-android-arrow-dropright right icon" ></i></li><li class="option-1" id="option-1"><i class="ion-ios-folder icon" ></i><span class="option-1">Avish1</span><i class="ion-android-arrow-dropright right icon" ></i></li></div><li class="btn-container"><div class="btn btn-move left">Move here</div><div class="btn btn-move right"><i class="ion-plus icon"></i></div></li></ul>');
      }

      if(classname=='close-icon'){

      //  alert("clicked " + classname);
      $(".move-to-submenu").css({"display": "none"});
      }
      if(classname=='back-icon'){

        alert("back icon clicked  " + classname);
    //  $(".move-to-submenu").css({"display": "none"});
      }


      if(classname == 'get-shareable-link')
      {
          $(".body").append('<div class="modal-background-filter"></div><div class="open-modal shared-modal-container" ><h3>Share with others</h3><label class="toggle-switch switch"><input id="checkbox" checked name="hello" type="checkbox"><div class="slider round"></div></label> <div class="link-share-contianer"><input value="link goes here" class="share-link" /></div><div class="or-container"><div class="line-share left"></div><span>or</span><div class="line-share right"></div></div><h4>People<h4><form ><input value="Enter email to share file" class="email-input" /><div class="chip-container"><span class="chip"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span><span class="chip"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span><span class="chip"><i class="ion-person person"></i><span class="shared-email">avishkadakia1996@gmail.com</span><i class="remove-email ion-close"></i></span><span class="chip"><i class="ion-person person"></i><span class="shared-email">Mohammed Udaipurwala</span><i class="remove-email ion-close"></i></span><span class="chip"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span><span class="chip"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span></div></form><ul class="email-id-result"><li>option1</li><li>option1</li><li>option1</li></ul><div class="button-done">Share</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
        //$("h3").text(classname1);

      }*/








    });
});


//
/*&& other !== 'folder-submenu-container'*/
/*
<ul class="folder-submenu-container" >
    <li class="open-with-main"><i class="fa fa-folder icon" ></i><span>Open with</span><i class="fa fa-chevron-right right" aria-hidden="true"></i>
      <ul class="submenu open-with-sub" >
        <li><i class="fa fa-folder icon" ></i><span>connect more apps</span></li>
        <li><i class="fa fa-folder icon" ></i><span>choose application</span></li>
        <li><i class="fa fa-folder icon" ></i><span>choose application</span></li>

      </ul>

    </li>
    <li><i class="fa fa-folder icon" ></i><span>Move To..</span></li>
    <li><i class="fa fa-folder icon" ></i><span>Add Star</span></li>
    <li><i class="fa fa-folder icon" ></i><span>Rename</span>

    </li>
    <li><i class="fa fa-folder icon" ></i><span>View Details</span></li>
    <li><i class="fa fa-folder icon" ></i><span>Downloads</span></li>
</ul>



<ul class="folder-submenu-container" >
<li class="open-with-main"><i class="fa fa-folder icon" ></i><span>Open with</span><i class="fa fa-chevron-right right" aria-hidden="true"></i>
<ul class="submenu open-with-subner" >
<li class="open-with-main"><i class="fa fa-folder icon" ></i><span>Open with</span><i class="fa fa-chevron-right right" aria-hidden="true"></i>
<ul class="submenu open-with-sub" >
<li><i class="fa fa-folder icon" ></i><span>connect more apps</span></li>
<li><i class="fa fa-folder icon" ></i><span>choose application</span></li>
<li><i class="fa fa-folder icon" ></i><span>choose application</span></li>
</ul>
</li>
<li><i class="fa fa-folder icon" ></i><span>Move To..</span></li>
<li><i class="fa fa-folder icon" ></i><span>Add Star</span></li>
<li><i class="fa fa-folder icon" ></i><span>Rename</span>
</li>
<li><i class="fa fa-folder icon" ></i><span>View Details</span></li>
<li><i class="fa fa-folder icon" ></i><span>Downloads</span></li>
</ul>


















<ul class="folder-submenu-container" ><li class="open-with-main"><i class="fa fa-folder icon" ></i><span>Open with</span><i class="fa fa-chevron-right right" aria-hidden="true"></i><ul class="submenu open-with-sub" ><li><i class="fa fa-folder icon" ></i><span>connect more apps</span></li><li><i class="fa fa-folder icon" ></i><span>choose application</span></li><li><i class="fa fa-folder icon" ></i><span>choose application</span></li></ul></li><li><i class="fa fa-folder icon" ></i><span>Move To..</span></li><li><i class="fa fa-folder icon" ></i><span>Add Star</span></li><li><i class="fa fa-folder icon" ></i><span>Rename</span></li><li><i class="fa fa-folder icon" ></i><span>View Details</span></li><li><i class="fa fa-folder icon" ></i><span>Downloads</span></li></ul>
*/





/*
<div class="modal-background-filter"></div>
<div class="shared-modal-container" >
<h3>Share with others</h3>
<div class="link-share-contianer">
<input value="link goes here" class="share-link" />
</div>
<div class="or-container">
<div class="line-share left">
</div>
<span>or</span>
<div class="line-share right">
</div>
</div>
<h4>People<h4>
<form >
<input value="Enter email to share file" class="email-input" />
</form>
<div class="button-done">Share</div>
<div class="close"><i class="ion-close"></i></div>
</div>

<div class="modal-background-filter"></div><div class="shared-modal-container" ><h3>Share with others</h3><div class="link-share-contianer"><input value="link goes here" class="share-link" /></div><div class="or-container"><div class="line-share left"></div><span>or</span><div class="line-share right"></div></div><h4>People<h4><form ><input value="Enter email to share file" class="email-input" /></form><div class="button-done">Share</div><div class="close"><i class="ion-close"></i></div></div>

*/
