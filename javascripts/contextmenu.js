$(document).ready(function() {

      if ($("#test").addEventListener) {
        $("#test").addEventListener('contextmenu', function(e) {

            alert("You've tried to open context menu"); //here you draw your own menu

        }, false);
    } else {

      //  document.getElementById("test").attachEvent('oncontextmenu', function() {
      //  $("#test").bind('contextmenu', function() {
            $('body').on('contextmenu', 'a.test', function() {


        //    alert("contextmenu"+event);
            document.getElementById("rmenu").className = "show";
            document.getElementById("rmenu").style.top =  mouseY(event) + 'px';
            document.getElementById("rmenu").style.left = mouseX(event) + 'px';

            window.event.returnValue = false;


        });
    }

});
/*
document.oncontextmenu=RightMouseDown;
document.onmousedown = mouseDown;



function mouseDown(e) {
    if (e.which==3) {//righClick
        alert("Right-click menu goes here");
    }
}
*/
// this is from another SO post...
    $(document).bind("click", function(event) {
        document.getElementById("rmenu").className = "hide";
    });



function mouseX(evt) {
    if (evt.pageX) {
        return evt.pageX;
    } else if (evt.clientX) {
       return evt.clientX + (document.documentElement.scrollLeft ?
           document.documentElement.scrollLeft :
           document.body.scrollLeft);
    } else {
        return null;
    }
}

function mouseY(evt) {
    if (evt.pageY) {
        return evt.pageY;
    } else if (evt.clientY) {
       return evt.clientY + (document.documentElement.scrollTop ?
       document.documentElement.scrollTop :
       document.body.scrollTop);
    } else {
        return null;
    }
}
