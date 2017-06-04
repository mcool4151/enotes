
var menuDisplayed = false;
var elementid,elementclickedparentparent,elementclickedparent,elementclicked,menuBox = null;
var elementidparent;
$(document).mousedown(function(ev){
  if(menuDisplayed == true){
    menuBox.style.display = "none";
    $( ".folder-submenu-container" ).remove();

    //        var folderClassname = $(e.target).attr('class').split(' ')[0];

  }
  if(ev.which == 3)
  {
    elementclicked = $(ev.target).attr("class").split(' ');
    //  elementclickedparent = $(ev.target).parent().attr("class").split(' ');
    elementclickedparentparent = $(ev.target).parent().attr("class").split(' ');
    elementid = $(ev.target).attr('id');
    elementidparent = $(ev.target).parent().attr('id');
    //  $("h2").text(elementclicked);
    if(menuDisplayed == true){
      //alert("inside right click 1");
      menuBox.style.display = "none";
      $( ".folder-submenu-container" ).remove();
      //        var folderClassname = $(e.target).attr('class').split(' ')[0];
    }
  }


});

window.addEventListener("contextmenu", function() {

  arguments[0].preventDefault();
  var left = arguments[0].clientX;
  var top = arguments[0].clientY;

  if(elementclickedparentparent=="folder,"||elementclickedparentparent=="file,"||elementclicked=="folder,"||elementclicked=="file,")
  {
    $("body").append('<ul class="folder-submenu-container" ><li class="open-with open-with-main"><i class="ion-arrow-expand icon" ></i><span class="open-with">Open with</span></li><li class="move-to"><i class="ion-android-exit icon" ></i><span class="move-to">Move To..</span></li><li class="get-shareable-link"><i class="ion-link icon" ></i><span class="get-shareable-link">Get Shareable Link</span></li><li class="favorite"><i class="ion-ios-star icon" ></i><span class="favorite">Add To Favorite</span></li><li class="rename"><i class="ion-ios-compose icon" ></i><span class="rename">Rename</span></li><li class="details"><i class="ion-ios-information icon" ></i><span class="details">View Details</span></li><li class="download"><i class="ion-archive icon" ></i><span class="download">Download</span></li><li class="trash"><i class="ion-trash-b icon" ></i><span class="trash">Remove</span></li></ul>');
    menuBox = window.document.querySelector(".folder-submenu-container");
    menuBox.style.left = left + "px";
    menuBox.style.top = top + "px";
    menuBox.style.display = "block";
    menuDisplayed = true;


  }
//  $("h2").text(" id " + elementid + elementidparent + " class " + elementclicked + elementclickedparentparent);
$("h2").text(elementclickedparentparent);

  if(elementclickedparentparent=="file,trash"||elementclickedparentparent=="folder,trash"||elementclicked=="file,trash"||elementclicked=="folder,trash")
  {
  //  alert("entred ");
    $(".body").append('<ul class="folder-submenu-container" ><li class="restore"><i class="ion-ios-undo icon" ></i><span class="restore">Restore </span></li><li class="permanently-delete"><i class="ion-trash-b icon" ></i><span class="permanently-delete">Permanently Delete</span></li></ul>');
    menuBox = window.document.querySelector(".folder-submenu-container");
    menuBox.style.left = left + "px";
    menuBox.style.top = top + "px";
    menuBox.style.display = "block";
    menuDisplayed = true;


  }
  if(elementclickedparentparent=="file,shared"||elementclickedparentparent=="folder,shared"||elementclicked=="file,shared"||elementclicked=="folder,shared")
  {

    $(".body").append('<ul class="folder-submenu-container" ><li class="open-with open-with-main"><i class="ion-arrow-expand icon" ></i><span class="open-with">Open with</span></li><li class="move-to"><i class="ion-android-exit icon" ></i><span class="move-to">Move To..</span></li><li class="download"><i class="ion-archive icon" ></i><span class="download">Download</span></li></ul>');
    menuBox = window.document.querySelector(".folder-submenu-container");
    menuBox.style.left = left + "px";
    menuBox.style.top = top + "px";
    menuBox.style.display = "block";
    menuDisplayed = true;


  }

  if(elementclickedparentparent=="file,favorite"||elementclickedparentparent=="folder,favorite"||elementclicked=="file,favorite"||elementclicked=="folder,favorite")
  {

    $(".body").append('<ul class="folder-submenu-container" ><li class="open-with open-with-main"><i class="ion-arrow-expand icon" ></i><span class="open-with">Open with</span></li><li class="move-to"><i class="ion-android-exit icon" ></i><span class="move-to">Move To..</span></li><li class="get-shareable-link"><i class="ion-link icon" ></i><span class="get-shareable-link">Get Shareable Link</span></li><li class="favorite"><i class="ion-ios-undo icon" ></i><span class="favorite">Remove From Favorite</span></li><li class="rename"><i class="ion-ios-compose icon" ></i><span class="rename">Rename</span></li><li class="details"><i class="ion-ios-information icon" ></i><span class="details">View Details</span></li><li class="download"><i class="ion-archive icon" ></i><span class="download">Download</span></li><li class="trash"><i class="ion-trash-b icon" ></i><span class="trash">Remove</span></li></ul>');
    menuBox = window.document.querySelector(".folder-submenu-container");
    menuBox.style.left = left + "px";
    menuBox.style.top = top + "px";
    menuBox.style.display = "block";
    menuDisplayed = true;


  }
  if(elementclickedparentparent=="file,group"||elementclickedparentparent=="folder,group"||elementclicked=="file,group"||elementclicked=="folder,group")
  {

    $(".body").append('<ul class="folder-submenu-container group-submenu-container" ><li class="move-to"><i class="ion-android-exit icon" ></i><span class="move-to">Move To Saved Notes</span></li><li class="download"><i class="ion-archive icon" ></i><span class="download">Download</span></li></ul>');

    menuBox = window.document.querySelector(".folder-submenu-container");
    menuBox.style.left = left + "px";
    menuBox.style.top = top + "px";
    menuBox.style.display = "block";
    menuDisplayed = true;


  }





}, false);
