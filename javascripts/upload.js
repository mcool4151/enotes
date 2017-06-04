//alert("entred");
//$("#file:after").css({ 'border-color':  });
$(document).ready(function(){
    $("#file0").click(function(){
  //    alert("entred2");
        $("<div class=\"upload-bar\">abc</div>").insertAfter("#file-name0");
        $("#file0 .file-preview").css({ 'opacity': '0.2' });
        $(".upload-bar").css({ "color":"red","height":"2px","width":"20%","background":"orange"  });
    });
});
