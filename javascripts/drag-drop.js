var propid ;
var parentpropid ;
var classnamedrop ;

document.addEventListener("dragstart", function(event) {
    // The dataTransfer.setData() method sets the data type and the value of the dragged data

    event.dataTransfer.setData("Text", event.target.id);

    // Output some text when starting to drag the p element
    $( ".folder-submenu-container" ).remove();
    $(".move-to-submenu").css({"display": "none"});

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
    ghostImage.childNodes[0].style.marginRight="40px"
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

  propid = $(event.target).prop("id");
  parentpropid = $(event.target).parent().prop("id");
  classnamedrop = $(event.target).attr('class').split(' ')[0];
//$(".display-container .file").text("classnamedrop "+classnamedrop);

//$(".display-container .file").text("classnamedrop "+classnamedrop+" propid " +propid + " parentpropid " + parentpropid);
    if ( event.target.className == "folder" ) {
    $("#"+propid).css({"border": "1px solid gray"});

    }
    if ( event.target.className == "left-nav-bar-text" ) {
  //    $("#"+parentpropid).css({"border": "1px solid gray"});

    }


});

// By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
document.addEventListener("dragover", function(event) {
    event.preventDefault();

});

// When the draggable p element leaves the droptarget, reset the DIVS's border style
document.addEventListener("dragleave", function(event) {
    /*if ( event.target.className == "folder" ) {
        event.target.style.border = "";
    }*/
    propid = $(event.target).prop("id");
    parentpropid = $(event.target).parent().prop("id");
    classnamedrop = $(event.target).attr('class').split(' ')[0];
//    $(".display-container .file").text("classnamedrop "+classnamedrop+" propid " +propid + " parentpropid " + parentpropid);

    if ( event.target.className == "folder" ) {
     $("#"+propid).css({"border": "0px solid gray"});

    }
    if ( event.target.className == "left-nav-bar-text" ) {
  //    $("#"+parentpropid).css({"border": "0px solid gray"});

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
    //  alert(data);
        var element = document.getElementById(data);
        element.parentNode.removeChild(element);

    }
    event.target.style.border = "";
});
