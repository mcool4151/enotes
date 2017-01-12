var active=0;
var folderid;
var classname;
var onscreen=0;
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

$(".dot-icon").click(function(){


  folderid = $(this).parent().prop("id");

});
    $("body").click(function(e) {
 classname = $(e.target).attr('class').split(' ')[0];

    //     alert("classname");


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
          $(".trash").append('<ul class="folder-submenu-container" ><li class="move-to"><i class="ion-ios-undo icon" ></i><span class="restore">Restore </span></li><li class="pemanently-delete"><i class="ion-trash-b icon" ></i><span class="move-to">Permanently Delete</span></li></ul>');
        //  $("#"+folderid).append('<ul class="folder-submenu-container" ><li class="open-with open-with-main"><i class="ion-arrow-expand icon" ></i><span class="open-with">Open with</span></li><li class="move-to"><i class="ion-android-exit icon" ></i><span class="move-to">Move To..</span></li><li class="get-shareable-link"><i class="ion-link icon" ></i><span class="get-shareable-link">Get Shareable Link</span></li><li class="favorite"><i class="ion-ios-star icon" ></i><span class="favorite">Add To Favorite</span></li><li class="rename"><i class="ion-ios-compose icon" ></i><span class="rename">Rename</span></li><li class="details"><i class="ion-ios-information icon" ></i><span class="details">View Details</span></li><li class="download"><i class="ion-archive icon" ></i><span class="download">Download</span></li></ul>');


          active=1;

        }
      }

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
