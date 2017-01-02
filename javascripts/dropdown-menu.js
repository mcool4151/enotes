$(document).ready(function(){
  var active=0;
var folderid;
  $(".dot-icon").click(function(){


    folderid = $(this).parent().prop("id");

  });
  /*$(".new").click(function(){


    $(".new-button-container").append('<ul class="folder-submenu-container" ><li class="open-with-main"><i class="ion-arrow-expand icon" ></i><span>Open with</span><i class="ion-arrow-right-b right" aria-hidden="true"></i><ul class="submenu open-with-sub" ><li><i class="ion-plus icon" ></i><span>connect more apps</span></li></ul></li><li><i class="ion-android-exit icon" ></i><span>Move To..</span></li><li><i class="ion-link icon" ></i><span>Get Shareable Link</span></li><li><i class="ion-ios-star icon" ></i><span>Add To Favorite</span></li><li><i class="ion-ios-compose icon" ></i><span>Rename</span></li><li><i class="ion-ios-information icon" ></i><span>View Details</span></li><li><i class="ion-archive icon" ></i><span>Downloads</span></li></ul>');

  });
  $("body").click(function(){


    $( ".new-button-containers" ).remove();

  });*/

var classname;
var onscreen=0;



$(".upload-button").click(function(e) {
  $(".back-arrow").css({"display": "block"});
  $(".left-menu").css({"display": "none"});
  $(".body").append('<ul class="mobile-submenu-full-cover" ><li><i class="ion-plus icon" ></i><span>Create Folder</span></li><li><i class="ion-ios-paper icon" ></i><span>Upload File</span></li><li><i class="ion-ios-folder icon" ></i><span>Upload Folder</span></li></ul>');
});
$(".search-icon").click(function(e) {
  $(".back-arrow").css({"display": "block"});
  $(".left-menu").css({"display": "none"});
  $(".body").append('<ul class="mobile-submenu-full-cover" ><li><i class="ion-plus icon" ></i><span>result1</span></li><li><i class="ion-ios-paper icon" ></i><span>result 2</span></li><li><i class="ion-ios-folder icon" ></i><span>result3</span></li></ul>');
});

  $("body").click(function(e) {

    classname = $(e.target).attr('class').split(' ')[0];

if(classname == 'new'){
  if(onscreen==0)
  {
  $(".new-button-container").append('<ul class="folder-submenu-container" ><li><i class="ion-plus icon" ></i><span>Create Folder</span></li><li><i class="ion-ios-paper icon" ></i><span>Upload File</span></li><li><i class="ion-ios-folder icon" ></i><span>Upload Folder</span></li></ul>');
onscreen=1;
}
}
else{
  $( ".folder-submenu-container" ).remove();
  onscreen=0;
}
});
//$( ".folder-submenu-container" ).remove();

    $("body").click(function(e) {
 classname = $(e.target).attr('class').split(' ')[0];

    //     alert("classname");


      if(active!=0){
        $( ".folder-submenu-container" ).remove();
        onscreen=0;
        active=0;
      }
      if(classname == 'dot-icon' /*&& other !== 'folder-submenu-container'*/)
      {
        if(active==1)
        {
          $( ".folder-submenu-container" ).remove();
          active=0;
        }
        if(active==0)
        {
          $("#"+folderid).append('<ul class="folder-submenu-container" ><li class="open-with-main"><i class="ion-arrow-expand icon" ></i><span>Open with</span><i class="ion-arrow-right-b right" aria-hidden="true"></i><ul class="submenu open-with-sub" ><li><i class="ion-plus icon" ></i><span>connect more apps</span></li></ul></li><li><i class="ion-android-exit icon" ></i><span>Move To..</span></li><li><i class="ion-link icon" ></i><span>Get Shareable Link</span></li><li><i class="ion-ios-star icon" ></i><span>Add To Favorite</span></li><li><i class="ion-ios-compose icon" ></i><span>Rename</span></li><li><i class="ion-ios-information icon" ></i><span>View Details</span></li><li><i class="ion-archive icon" ></i><span>Downloads</span></li></ul>');
          active=1;

        }
      }

      /*  if(e.target.id != '#'+folderid) {
          alert("entred" + e.target.id);
          $( ".folder-submenu-container" ).remove();

        }*/
    });



});

//
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
