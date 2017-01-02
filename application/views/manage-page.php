<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE HTML>
<html >
<head>
  <meta charset="utf-8">

  <title>e-notes</title>
  <meta name="e-notes" content="">
  <meta name="author" content="Abc,def,ghi">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">

  <link rel="stylesheet" href="<?php echo base_url();?>stylesheets/manage-page-styles.css">

  <!--[if lt IE 9]>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
  <![endif]-->
  <style>

  </style>
</head>

<body><!--change start -->

  <nav>
    <ul class="nav-container main" >

      <li><h2>e-Notes</h2></li>
      <i class="ion-android-search search-icon" aria-hidden="true"></i>

        <form>
  <input type="text" name="search" class="search-bar" placeholder="Search for files , folders , documents pdf..">
  </form>
  <li class="search"><i class="ion-log-out settings-icon hover-effect" aria-hidden="true"></i></li>
    </ul>
    <ul class="nav-container" >
      <li class="new-button-container"><div class="new button ">new</div></li>
      <li class="c-hamburger c-hamburger--htla left-menu"><span></span>
      </li>
      <li class="c-hamburger c-hamburger--htla back-arrow"><span></span>
      </li>
      <li><h2>Saved Notes</h2></li>
            <li class="search"><i class="ion-ios-gear settings-icon hover-effect" aria-hidden="true"></i></li>
      <li class="search"><i class="ion-information-circled info-icon hover-effect" aria-hidden="true"></i></li>
      <li class="search"><i class="ion-android-apps grid-icon hover-effect" aria-hidden="true"></i></li>


      <li class="search"><i class="ion-android-more-vertical sub-menu-icon" aria-hidden="true"></i></li>

      <li class="search">
        <i class="ion-android-search search-icon" aria-hidden="true"></i>

        <form>
  <input type="text" name="search" class="search-bar" placeholder="Search..">
  </form>
      </li>
    </ul>

  </nav><!--navigation bar end -->
  <section class="body">
    <div class="container">
      <div class="filter"></div>
      <div class="left-container">
      <ul class="left-navigation">
        <li class="nav-header" id="delete">
          <div class="filter-nav-header"></div>

          <div class="profile-pic" style="background-image:url('http://gurucul.com/wp-content/uploads/2015/01/default-user-icon-profile.png');" > </div>
          <div class="email-id">avishkadakia@gmail.com</div>

        </li>
          <li class="folder" id="saved-notes"><i class="ion-android-archive folder-icon" ></i><span>Saved Notes</span></li>
          <li class="folder" id="delete"><i class="ion-android-people folder-icon" ></i><span>Shared with me</span></li>
          <li class="folder" id="delete"><i class="ion-ios-clock folder-icon" ></i><span>Recent</span></li>
          <li class="folder" id="delete"><i class="ion-star folder-icon" ></i><span>Favorites</span></li>
          <li class="folder" id="delete"><i class="ion-trash-b folder-icon" ></i><span>Deleted</span></li>
          <li class="line"></li>

          <li class="folder" id="delete"><i class="ion-trash-b folder-icon" ></i><span>Deleted</span></li>

        </ul>

      </div><!--left container end --><!--change end -->
      <div class="center-container">

        <ul class="display-container ">
          <li>
            <h3 class="clearfix">Uploading</h3>
            <ul class="folder-container">
              <li class="folder" draggable="true"  id="folder"><i class="ion-ios-folder folder-icon" ></i><span>Avish1</span><i class="dot-icon ion-android-more-vertical " aria-hidden="true"></i></li>


              <li class="fix"></li>
              <li class="file" draggable="true" id="file3"><div class="file-preview"  style="  background-image: url('http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png') ;"></div><div class="file-name"><i class="ion-ios-paper folder-icon" ></i><span>file1.jpg</span></div></li>
              <li class="file" draggable="true" id="file4"><div class="file-preview"  style="  background-image: url('http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png') ;"></div><div class="file-name"><i class="ion-ios-paper folder-icon" ></i><span>file1.jpg</span></div></li>



              <li class="fix"></li>
            </ul>
          </li>
          <li>
            <h3 class="clearfix">Folders</h3>
            <ul class="folder-container">
              <li class="folder" draggable="true"  id="folder1"><i class="ion-ios-folder folder-icon" ></i><span>Avish1</span><i class="dot-icon ion-android-more-vertical " aria-hidden="true"></i></li>
              <li class="folder" draggable="true"  id="folder2"><i class="ion-ios-folder folder-icon" ></i><span>Avish1</span><i class="dot-icon ion-android-more-vertical " aria-hidden="true"></i></li>
              <li class="folder" draggable="true"  id="folder3"><i class="ion-ios-folder folder-icon" ></i><span>Avish1</span><i class="dot-icon ion-android-more-vertical " aria-hidden="true"></i></li>
              <li class="folder" draggable="true"  id="folder4"><i class="ion-ios-folder folder-icon" ></i><span>Avish1</span><i class="dot-icon ion-android-more-vertical " aria-hidden="true"></i></li>
              <li class="folder" draggable="true"  id="folder5"><i class="ion-ios-folder folder-icon" ></i><span>Avish1</span><i class="dot-icon ion-android-more-vertical " aria-hidden="true"></i></li>
              <li class="folder" draggable="true"  id="folder6"><i class="ion-ios-folder folder-icon" ></i><span>Avish1</span><i class="dot-icon ion-android-more-vertical " aria-hidden="true"></i></li>



              <li class="fix"></li>
            </ul>
          </li>

          <li>
            <h3 class="clearfix">Files</h3>
            <ul class="file-container">
              <li class="file" draggable="true" id="file1"><div class="file-preview"  style="  background-image: url('http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png') ;"></div><div class="file-name"><i class="ion-ios-paper folder-icon" ></i><span>file1.jpg</span></div></li>
              <li class="file" draggable="true" id="file2"><div class="file-preview"  style="  background-image: url('http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png') ;"></div><div class="file-name" draggable="true"><i class="ion-ios-paper folder-icon" ></i><span>file1.jpg</span></div></li>
              <li class="file" draggable="true" id="file3"><div class="file-preview"  style="  background-image: url('http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png') ;"></div><div class="file-name"><i class="ion-ios-paper folder-icon" ></i><span>file1.jpg</span></div></li>
              <li class="file" draggable="true" id="file4"><div class="file-preview"  style="  background-image: url('http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png') ;"></div><div class="file-name"><i class="ion-ios-paper folder-icon" ></i><span>file1.jpg</span></div></li>



              <li class="fix"></li>
            </ul>
          </li>



        </ul>
  <!--files display -->

        <div class="upload-button">+</div><!--upload button -->
      </div><!--center container end -->
      <div class="right-container">
      </div><!--right container end -->
    </div><!--main container end -->






  </section>
  <footer>
<!--    <ul class="footer">
      <li><a href="">about</a></li>
      <li><a href="">help</a></li>
      <li><a href="">terms</a></li>
      <li><a href="">privacy</a></li>
      <li><a href="">setting</a></li>
      <li><a href="">send feedback</a></li>
    </ul>-->
  </footer>



    <script src="http://localhost:35729/livereload.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="jquery-3.1.1.min.js"></script>
<script src="<?php echo base_url();?>javascripts/scripts.js"></script>
<script src="<?php echo base_url();?>javascripts/dropdown-menu.js"></script>
<script src="<?php echo base_url();?>javascripts/submenu.js"></script>

<script>

/* Events fired on the drag target */


document.addEventListener("dragstart", function(event) {
    // The dataTransfer.setData() method sets the data type and the value of the dragged data

    event.dataTransfer.setData("Text", event.target.id);

    // Output some text when starting to drag the p element

    // Change the opacity of the draggable element
    c=document.getElementById(event.target.id).childNodes;
    var ghostImage = c[1].cloneNode(true);




     ghostImage.style.position = "absolute";
     ghostImage.style.backgroundColor="white"
     ghostImage.style.top = "0px";
     ghostImage.style.right = "-1000px";
     ghostImage.style.opacity = "1";
    ghostImage.style.height="30px";
    ghostImage.style.width="200px";
    ghostImage.style.fontWeight="100";
    ghostImage.style.fontSize="15px";
    ghostImage.style.paddingLeft="10px"
    ghostImage.style.paddingTop="6px"
    ghostImage.childNodes[0].style.marginRight="20px"
     document.body.appendChild(ghostImage);

     event.dataTransfer.setDragImage(ghostImage, 0, 0);


});

// While dragging the p element, change the color of the output text
document.addEventListener("drag", function(event) {


});

// Output some text when finished dragging the p element and reset the opacity
document.addEventListener("dragend", function(event) {

    event.target.style.opacity = "1";
    event.target.style.backgroundColor = "white";

});


/* Events fired on the drop target */

// When the draggable p element enters the droptarget, change the DIVS's border style
document.addEventListener("dragenter", function(event) {

    if ( event.target.className == "folder" ) {
        event.target.style.border = "1px solid gray";

    }
});

// By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
document.addEventListener("dragover", function(event) {
    event.preventDefault();

});

// When the draggable p element leaves the droptarget, reset the DIVS's border style
document.addEventListener("dragleave", function(event) {
    if ( event.target.className == "folder" ) {
        event.target.style.border = "";
    }
});

/* On drop - Prevent the browser default handling of the data (default is open as link on drop)
   Reset the color of the output text and DIV's border color
   Get the dragged data with the dataTransfer.getData() method
   The dragged data is the id of the dragged element ("drag1")
   Append the dragged element into the drop element
*/
document.addEventListener("drop", function(event) {
    event.preventDefault();
    if ( event.target.className == "folder" && event.target.id!=event.dataTransfer.getData("Text")) {
        var data = event.dataTransfer.getData("Text");
      //  event.target.parentNode.appendChild(document.getElementById(data));

        var element = document.getElementById(data);
        element.parentNode.removeChild(element);

    }
    event.target.style.border = "";
});

</script>
</body>
</html>
