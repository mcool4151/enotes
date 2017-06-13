$(document).ready(function (){
  fetchAndReload();
  $('.new').click(function (){
    if(onscreen==0){
      appendCreateMenu();
      onscreen=1;
    }
    else {
      removeCreateMenu();
      onscreen=0;
    }
  });
  $("#saved-notes").click(function(){
    displaynone();
    clearnavbar();
    subdir = "";
    activeupdate(sidelinkid,"Saved Notes");
    fetchAndReload();
  });
  $("#favorites").click(function(){
    displaynone();
    clearnavbar();
    subdir = "";
    getfav();
    activeupdate(sidelinkid,"Favorites");
  });
  $("#trash").click(function(){
    displaynone();
    clearnavbar();
    subdir = "";
    activeupdate(sidelinkid,"Deleted");
    getdel();
  });
  $("#recent").click(function(){
    displaynone();
    clearnavbar();
    files = [];
    folders = [];
    reloadfiles();
    reloadfolders();
    activeupdate(sidelinkid,"Recent");
  });
  $("#shared-with-me").click(function(){
    displaynone();
    clearnavbar();
    files = [];
    folders = [];
    reloadfiles();
    reloadfolders();
    clearnavbar();
    activeupdate(sidelinkid,"Shared with me");
    $.ajax({
      url:base+"manage/getsharedwithme",
      success:function(res){
        list = jQuery.parseJSON(res);
        hideFolderText();
        hideFileText();
        $.each(list,function(index,value){
          exclass = "shared";
          shortname = getShortName(value.name);
          if(value.is_dir == true){
            showFolderText();
            showFolderContainer();
            appendFolder(value,exclass,index,shortname);
          }else {
            $('.files-text').css({"display": "block"});
            appendFile(value,exclass,index,img,shortname);
          }
        });
      }
    });
    return;
  });
  $("#group").click(function(){
    clearnavbar();
    subdir = "";
    files = [];
    folders = [];
    reloadfiles();
    reloadfolders();
    displaynone();
    activeupdate(sidelinkid,"Groups");
    $('.my-group').empty();
    $.ajax({
      url:base+'manage/getmygroups',
      async:false,
      type:"POST",
      data:{key:quer},
      success:function(res){
        groups = jQuery.parseJSON(res);
        $.each(groups,function(index,value){
          exclass = "shared";
          shortname = getShortName(value.name);
          showMyGroupContainer();
          appendMyGroup(value,index,shortname);
        });
      }
    });
    $.ajax({
      url:base+'manage/getsubgroups',
      async:false,
      type:"POST",
      data:{key:quer},
      success:function(res){
        hideSubGroupText();
        hideSubGroupContainer();
        emptySubgroupContainer();
        groups = jQuery.parseJSON(res);
        $.each(groups,function(index,value){
          exclass = "shared";
          shortname = getShortName(value.name);
          showSubGroupText();
          showSubGroupContainer();
          appendSubGroup(index,value,shortname);
        });
      }
    });
    $.ajax({
      url:base+'manage/getrestgroups',
      async:false,
      type:"POST",
      data:{key:quer},
      success:function(res){
        hideSugGroupText();
        hideSugGroupContainer();
        emptySugGroupContainer();
        groups = jQuery.parseJSON(res);
        $.each(groups,function(index,value){
          exclass = "shared";
          shortname = getShortName(value.name);
          showSugGroupText();
          showSugGroupContainer();
          appendSugGroup(index,value,shortname)
        });
      }
    });
    return;
  });
  $(".upload").click(function(){
    hideMobileSubmenu();
    if(prevsidelinkid != 'saved-notes'){
      showMessage("You can only upload files in saved-notes. To Share a folder with Group/User browse to saved-notes and share the required document");
      return;
    }
    document.getElementById('myfile').click();
  });
  $(".create-group").click(function(){
    hideMobileSubmenu();
    appendGroupMenu();
    $('.members').keyup(function(event){
      $.ajax({
        url:base+"manage/getmembers",
        type:"POST",
        data:{key:$(this).val()},
        success: function(result){
          //alert(result);
          $(".email-suggestion").empty();
          var obj = jQuery.parseJSON(result);
          for(i=0;i<obj.length;i++){
            //alert("entered");
            $("#friend-email1").append('<option value="'+obj[i]+'">'+obj[i]+'</option>');
          }
        }
      });
    });
    $('.namebox').keypress(function(event){
      var ew = event.which;
      if(ew == 32 || ew == 95 || ew == 127 || ew == 8 || ew == 0) return true;
      if(48 <= ew && ew <= 57) return true;
      if(65 <= ew && ew <= 90) return true;
      if(97 <= ew && ew <= 122) return true;
      return false;
    });
    $(".button-done").on('click',function(){
      //alert($( ".chip-container:not(.memb) input" ).val().length);
      /*if($(".chip-container.memb input").val().length != 0){
        $(".chip-container.memb input").trigger( $.Event("keydown", {keyCode: 13}));
      }*/
      if($('.namebox').val().trim().length == 0){
        $("#myform p").text('Please Enter a name');
        $("#myform p").css({'color':'red'});
        return;
      }
      if($( ".chip-container:not(.memb) input" ).val().length != 0){
        var e = $.Event("keydown", {keyCode: 13});
        $( ".chip-container:not(.memb) input" ).trigger(e);
      }
      if($(".chip-container:not(.memb) .shared-email").length == 0){
        $("#myform p").text('Please Add some tags');
        $("#myform p").css({'color':'red'});
        return;
      }
      var tags=undefined;
      $(".chip-container:not(.memb) .shared-email").each(function(){
        if(tags == undefined) tags=$(this).text();
        else tags=tags +','+$(this).text();
      });
      $.ajax({
        url:base+"manage/creategroup",
        type:"POST",
        data:{uniqname:$("#members").val(),desc:$("textarea").val(),tags:tags},
        success:function(result){
          if(result!=1) {
            $("#myform p").text("Group "+$("#members").val()+" Already Exists");
            $("#myform p").css({'color':'red'});
            return;
            //exit();
          }
          $(".chip-container.memb .shared-email").each(function(){
            $.ajax({
              url:base+"manage/addtogroup",
              type:"POST",
              data:{group:$("#members").val(),email:$(this).text()},
              success:function(result){
                //alert("entered");
              }
            });
          });
          $("#myform p").text('Group '+$("#members").val()+' Created');
          $("#myform p").css({'color':'green'});
        }
      });
    });
    $(".chip-container .chips-here span").remove();
    $( ".chip-container.memb input" ).keydown(function(event) {
      lastchipadded = $(".chip-container.memb .chips-here span").last();
      var key = event.keyCode || event.charCode;
      if( key == 8 || key == 46 ){
        //detect backspace & delete key
        var value=$.trim($(".chip-container.memb input").val());
        if(value.length==0){
          $(".chip-container.memb input").val($(lastchipadded).text());
          $(lastchipadded).parent().remove();
        }
      }
      if (key == 13){
        //alert("entered");
        //detect enter key
        var text;
        text=$(".chip-container.memb input").val();
        $.ajax({
          url:base+"manage/checkuser",
          type:"POST",
          data:{uemail:text},
          success:function(result){
            if(result != 1) {
              $("#myform p").text("Entered user not found");
              $("#myform p").css({'color':'red'});
              return;
            }
            $(".chips-here.memb").append('<span class="chip"><i class="ion-person person"></i><span class="shared-email">'+text+'</span><i class="remove-email ion-close"></i></span>');
            $(".chip-container .chips-here span");
            $(".chip-container.memb input").val("");
          }
        });
      }
    });
    $( ".chip-container:not(.memb) input" ).keydown(function(event) {
      lastchipadded = $(".chip-container:not(.memb) .chips-here span").last();
      var key = event.keyCode || event.charCode;
      if( key == 8 || key == 46 ){
        //detect backspace & delete key
        var value=$.trim($(".chip-container:not(.memb) input").val());
        if(value.length==0){
          $(".chip-container.memb:not(.memb) input").val($(lastchipadded).text());
          $(lastchipadded).parent().remove();
        }
      }
      if (key == 13){
        //detect enter key
        var text;
        text=$(".chip-container:not(.memb) input").val();
        $(".chip-container:not(.memb) input").val("");
        $(".chips-here:not(.memb)").append('<span class="chip"><i class="ion-person person"></i><span class="shared-email">'+text+'</span><i class="remove-email ion-close"></i></span>');
      }
    });
  });
  $(".create-folder").click(function(){
    $(".mobile-submenu-full-cover").css({"display": "none"});
    //$(".back-arrow1").click();
    if(prevsidelinkid != 'saved-notes'){
      $(".body").append('<div class="modal-background-filter"></div><div class="open-modal error-modal-container" ><p>You can only create folder in saved-notes. To Share a folder with Group/User browse to saved-notes and share the required document</p><div class="okay button-done" id="okay" >OK</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');

    //  alert("You can only create folder in saved-notes. To Share a folder with Group/User browse to saved-notes and share the required document"); // TODO Change Later
      return;
    }
    // create folder register added
    $(".body").append('<div class="modal-background-filter"></div><div class="open-modal create-folder-modal-container" ><h3>Create Folder</h3><p>Please enter a new name for the item </p><div class="link-share-contianer"><input id="nameto" placeholder="folder name goes here" class="share-link" /></div><div class="button-done" id="crtbtn">Create</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
    $('#nameto').keypress(function(event){
      if(event.which == 13) $( "#crtbtn" ).click();
      if(event.which == 47 || event.which == 92 ||
         event.which == 34 || event.which == 39 ||
         event.which == 94 || event.which == 96
      )return false;
      else return true;
    });
    $( "#crtbtn" ).click(function() {
      name = $("#nameto").val();
      name = $.trim(name);
      if(name == '' || name == '.' || name == '..'){ //TODO FIX {}<>
        $(".create-folder-modal-container p").text("Please Enter a valid name");
        $(".create-folder-modal-container p").css({'color':'red'});
        return;
      }
      if(name.length > 20){
        $(".create-folder-modal-container p").text("Name Limit 20 Characters");
        $(".create-folder-modal-container p").css({'color':'red'});
        return;
      }
      $.ajax({
        url:base+"manage/createdir",
        type:"POST",
        async:false,
        data:{depth:subdir,name:name},
        success:function(result){
          if(result!=1) {
            $(".create-folder-modal-container p").text('Error while creating folder');
            $(".create-folder-modal-container p").css({'color':'red'});
            return;
          }
          fnr();
          $( ".modal-background-filter" ).remove();
          $( ".open-modal" ).remove();
          if ( $(window).width() < 480) {
            $(".back-arrow").css({"display": "none"});
            $(".left-menu").css({"display": "block"});
          }
        }
      });
    });
  });
});
