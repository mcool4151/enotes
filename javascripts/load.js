
function displaynone(){
  $('.sub-groups-text').css({'display':'none'});
  $('.sub-group').css({'display':'none'});
  $('.sug-groups-text').css({'display':'none'});
  $('.sug-group').css({'display':'none'});
  $(".my-group").css({"display":"none"});
}
$(document).ready(function(){
  var list = undefined;
  var files = [];
  var upload = 1;
  var folders = [];
  var defaultimg = "http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png";
  var folderid;
  var newname;
  function updatesubdir(v){
    alert(v);
  }
  function getdel(){
    $.ajax({
      url:base+"manage/getdel",
      type:"GET",
      async:false,
      success:function(result){
        list = undefined;
        files = [];
        folders = [];
        list = jQuery.parseJSON(result);
        $.each(list,function(index,value){
          value.index = index;
          if (value.is_dir == true) {
            folders.push(value);
          }
          else {
            files.push(value);
          }
        });
        reloadfiles();
        reloadfolders();
      }
    });
  }
  gd = getdel;
  function getfav(){
    $.ajax({
      url:base+"manage/getfav",
      type:"GET",
      async:false,
      success:function(result){
        list = undefined;
        files = [];
        folders = [];
        list = jQuery.parseJSON(result);
        $.each(list,function(index,value){
          value.index = index;
          if (value.is_dir == true) {
            folders.push(value);
          }
          else {
            files.push(value);
          }
        });
        reloadfiles();
        reloadfolders();
      }
    });
  }
  gf = getfav;
  function reloadfiles() {
    $('#files').html(" ");
    var test = 1;
    $.each(files,function(index,value) {
      if(prevsidelinkid == 'favorites') {
        fullname = value.path;
        exclass = "favorite";
      }
      else if(value.is_fav == true){
        fullname = value.name;
        exclass = 'favorite';
      }
      else if(prevsidelinkid == 'trash'){
        fullname = value.path;
        exclass = "trash";
      }
      else {
        exclass = "";
        fullname = value.name;
      }
      if(value.is_img == true){
        img = value.link;
      }else img = defaultimg;
      tmpval = value.name;
      test = 0;
      $('.folders-text').css({"display": "block"});
      $('.folder-container').css({"display": "block"});
      $('.files-text').css({"display": "block"});
      if ( $(window).width() < 480) {
        if(tmpval.length > 10) tmpval = tmpval.substring(0,9) + "..." + tmpval.substring(tmpval.length-4,tmpval.length);
      }
      else if($(window).width() < 1025){
        if(tmpval.length > 15) tmpval = tmpval.substring(0,9) + "..." + tmpval.substring(tmpval.length-4,tmpval.length);
      }
      else {
        if(tmpval.length > 15) tmpval = tmpval.substring(0,13) + "..." + tmpval.substring(tmpval.length-5,tmpval.length);
      }
      $('#files').html($('#files').html() + "<li data-index=\""+value.index+"\" class=\"file "+exclass+"\" id=\"file"+index+"\" draggable=\"true\" name=\""+fullname+"\"><div class=\"file-preview\"  style=\"  background-image: url('"+img+"') ;\"></div><div class=\"file-name\" id=\"file-name"+index+"\"><i class=\"ion-ios-paper folder-icon\" ></i><span>"+tmpval+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></div></li>");
    });
    if(test == 1) {
      $('.files-text').css({"display": "none"});
    }
    $('#files').html($('#files').html() + "<li class=\"fix\" ></li></ul>");
  }
  function reloadfolders() {
    $('.folder-container').html(" ");
    var test = 1;
    $('.folders-text').css({"display": "block"});
    $('.folder-container').css({"display": "block"});
    $.each(folders,function (index,value) {
      if(prevsidelinkid == 'favorites') {
        fullname = value.path;
        exclass = "favorite";
      }
      else if(value.is_fav == 1){
        fullname = value.name;
        exclass = 'favorite';
      }
      else if(prevsidelinkid == 'trash'){
        fullname = value.path;
        exclass = "trash";
      }
      else {
        exclass = "";
        fullname = value.name;
      }
      tmpval = value.name;
      test = 0;
      if ( $(window).width() < 480) {
        if(value.length > 10) tmpval = tmpval.substring(0,9) + "..." + tmpval.substring(tmpval.length-4,tmpval.length);
      }
      else if($(window).width() < 1025){
        if(value.length > 15) tmpval = tmpval.substring(0,9) + "..." + tmpval.substring(tmpval.length-4,tmpval.length);
      }
      else {
        if(value.length > 30) tmpval = tmpval.substring(0,20) + "..." + tmpval.substring(tmpval.length-5,tmpval.length);
      }
      $('.folder-container').html($('.folder-container').html() + "<li data-index=\""+value.index+"\" class=\"folder "+exclass+"\" draggable=\"true\"  id=\"folder"+index+"\" name=\""+fullname+"\"><i class=\"ion-ios-folder folder-icon\" ></i><span class=\"folder-name-text\" id=\"folder"+index+"\" >"+tmpval+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></li>");
    });
    if(test == 1){ $('.folders-text').css({"display": "none"});$('.folder-container').css({"display": "none"});}
    $('.folder-container').html($('.folder-container').html() + "<li class=\"fix\" ></li>");
  }
  function updateDataSets(){
    $.ajax({
      url:base+"manage/getdir",
      type:"GET",
      async:false,
      data:{depth:subdir},
      success:function(result){
        list = undefined;
        files = [];
        folders = [];
        list = jQuery.parseJSON(result);
        $.each(list,function(index,value){
          value.index = index;
          if (value.is_dir == true) folders.push(value);
          else {
            files.push(value);
          }
        });
        foldercount = folders.length;
        filecount = files.length;
      }
    });
  }
  function fetchAndReload(){
    $.ajax({
      url:base+"manage/getdir",
      type:"GET",
      async:false,
      data:{depth:subdir},
      success:function(result){
        list = undefined;
        files = [];
        folders = [];
        list = jQuery.parseJSON(result);
        $.each(list,function(index,value){
          value.index = index;
          if (value.is_dir == true) folders.push(value);
          else {
            files.push(value);
          }
        });
        foldercount = folders.length;
        filecount = files.length;
        reloadfiles();
        reloadfolders();
      }
    });
  }
  fetchAndReload();
  fnr = fetchAndReload;
  $("#myfile").change(function (){
    var formData = new FormData($('#myform')[0]);
    formData.append("depth",subdir);
    $.ajax({
      url:base+"manage/upload",
      type:"POST",
      data:formData,
      processData: false,
      contentType: false,
      async: true,
      success:function(result){
        if(result == 1){
          fetchAndReload();
          document.getElementById("myfile").value = null;
        }
        else {
        }
      },
      uploadProgress: function(event, position, total, percentComplete) {
        if(upload == 1){
          alert("1");
          $('#files').prepend('<li class="file" draggable="true" id="file12" ><div class="file-preview"  style="  background-image: url(\'http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png\') ;"></div><div class="upload file-name" id="file1"><i class="ion-ios-paper folder-icon" ></i><span>file1.jpg</span><i class="dot-icon ion-android-more-vertical " aria-hidden="true"></i></div></li>');
          upload = 0;
        }
        $("<div class=\"upload-bar\"></div>").insertAfter($("#files li:first-child"));
        $("#files li:first-child").css({ 'opacity': '0.2' });
        $(".upload-bar").css({ "color":"red","height":"2px","width":percentComplete,"background":"orange"  });
      }
    });
  });
  var folderClassname;
  var sidelinkid;
  $(".back-arrow").click(function(){
    //alert('executed');
    tmp = subdir.lastIndexOf("/");
    if(tmp == -1) {
      subdir = '';
      $(".back-arrow").css({"display": "none"});
      $(".left-menu").css({"display": "block"});
      clearnavbar();
    }
    else {
      subdir = subdir.substring(0,tmp);
      if(subdir.lastIndexOf("/") == -1) updatenavbar(subdir,subdir);
      else updatenavbar(subdir.substring(subdir.lastIndexOf("/")-1,subdir.length),subdir);
    }
    //alert('Subdir is :'+subdir);
    fetchAndReload();
    //clearnavbar();
  });
  $("body").click(function(e){


  if(classname == 'new'){
  if(onscreen==0)
  {
  $(".create-menu").append('<ul class="new-dropdown folder-submenu-container" ><li class="create-folder"><i class="create-folder ion-ios-folder icon" ></i><span class="create-folder">Create Folder</span></li><li class="create-group"><i class="create-group ion-android-people icon" ></i><span class="create-group">Create Group</span></li><li class="upload"><i class="upload ion-ios-paper icon" ></i><span class="upload">Upload File</span></li></ul>');
  onscreen=1;
  }
  }
  else{
  $( ".new-dropdown" ).remove();
  onscreen=0;
  }
    folderClassname = $(e.target).attr('class').split(' ')[0];
    if(folderClassname=="folder"  || folderClassname=="left-nav-bar-text" || folderClassname=="folder-name-text")
    {
      if(folderClassname != 'dot-icon' ){
        sidelinkid = $(e.target).prop("id");
        if(sidelinkid == "saved-notes"){
          displaynone();
          clearnavbar();
          subdir = "";
        }
        else if(sidelinkid == 'favorites'){
          displaynone();
          clearnavbar();
          subdir = "";
          getfav();
          return;
        }
        else if(sidelinkid == 'trash'){
          displaynone();
          clearnavbar();
          subdir = "";
          getdel();
          return;
        }
        else if(sidelinkid == 'recent'){
          displaynone();
          clearnavbar();
          files = [];
          folders = [];
          reloadfiles();
          reloadfolders();
          return;
        }
        else if(sidelinkid == 'shared-with-me'){
          displaynone();
          clearnavbar();
          files = [];
          folders = [];
          reloadfiles();
          reloadfolders();
          clearnavbar();
          $.ajax({
            url:base+"manage/getsharedwithme",
            success:function(res){
              list = jQuery.parseJSON(res);
              $('.folders-text').css({"display": "none"});
              $('.files-text').css({"display": "none"});
              $.each(list,function(index,value){
                exclass = "shared";
                shortname = value.name;
                if ( $(window).width() < 480) {
                  if(shortname.length > 10) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
                }
                else if($(window).width() < 1025){
                  if(shortname.length > 15) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
                }
                else {
                  if(shortname.length > 30) shortname = shortname.substring(0,20) + "..." + shortname.substring(shortname.length-5,shortname.length);
                }
                if(value.is_dir == true){
                  $('.folders-text').css({"display": "block"});
                  $('.folder-container').css({"display": "block"});
                  $('.folder-container').append("<li data-index=\""+value.id+"\" class=\"folder "+exclass+"\" draggable=\"true\"  id=\"folder"+index+"\" name=\""+value.id+"\"><i class=\"ion-ios-folder folder-icon\" ></i><span class=\"folder-name-text\" id=\"folder"+index+"\" >"+shortname+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></li>");
                }else {
                  $('.files-text').css({"display": "block"});
                  $('#files').append("<li data-index=\""+value.id+"\" class=\"file "+exclass+"\" id=\"file"+index+"\" draggable=\"true\" name=\""+value.id+"\"><div class=\"file-preview\"  style=\"  background-image: url('"+img+"') ;\"></div><div class=\"file-name\" id=\"file-name"+index+"\"><i class=\"ion-ios-paper folder-icon\" ></i><span>"+shortname+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></div></li>");
                }
              });
            }
          });
          return;
        }
        else if(sidelinkid == 'group'){
          clearnavbar();
          subdir = "";
          files = [];
          folders = [];
          reloadfiles();
          reloadfolders();
          displaynone();
          $('.my-group').empty();
          $.ajax({
            url:base+'manage/getmygroups',
            async:false,
            success:function(res){
              groups = jQuery.parseJSON(res);
              $.each(groups,function(index,value){
                exclass = "shared";
                shortname = value.name;
                if ( $(window).width() < 480) {
                  if(shortname.length > 10) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
                }
                else if($(window).width() < 1025){
                  if(shortname.length > 15) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
                }
                else {
                  if(shortname.length > 30) shortname = shortname.substring(0,20) + "..." + shortname.substring(shortname.length-5,shortname.length);
                }
                $('.my-group').css({"display": "block"});
                $('.my-group').append("<li data-index=\""+value.id+"\" class=\"folder\" draggable=\"true\"  id=\"mfolder"+index+"\" name=\""+value.name+"\"><i class=\"ion-ios-folder folder-icon\" ></i><span class=\"folder-name-text\" id=\"folder"+index+"\">"+shortname+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></li>");
              });
            }
          });
          $.ajax({
            url:base+'manage/getsubgroups',
            async:false,
            success:function(res){
              $('.sub-groups-text').css({'display':'none'});
              $('.sub-group').css({'display':'none'});
              $('.sub-group').empty();
              groups = jQuery.parseJSON(res);
              $.each(groups,function(index,value){
                exclass = "shared";
                shortname = value.name;
                if ( $(window).width() < 480) {
                  if(shortname.length > 10) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
                }
                else if($(window).width() < 1025){
                  if(shortname.length > 15) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
                }
                else {
                  if(shortname.length > 30) shortname = shortname.substring(0,20) + "..." + shortname.substring(shortname.length-5,shortname.length);
                }
                $('.sub-groups-text').css({'display':'block'});
                $('.sub-group').css({'display':'block'});
                $('.sub-group').append('<li class="folder" id="sgroup'+index+'" name="'+value.name+'"><i class="ion-ios-folder folder-icon" ></i><span class="folder-name-text">'+shortname+'</span><label class="toggle-switch switch"><input checked type="checkbox" checked name="'+value.name+'" onchange="unsubscribe(this)"><div class="slider round"></div></label></li>');
              });
            }
          });
          $.ajax({
            url:base+'manage/getrestgroups',
            async:false,
            success:function(res){
              function unsubscribe(evt){
                alert('unsubscribing '+$(evt).name());
              }
              $('.sug-groups-text').css({'display':'none'});
              $('.sug-group').css({'display':'none'});
              $('.sug-group').empty();
              groups = jQuery.parseJSON(res);
              $.each(groups,function(index,value){
                exclass = "shared";
                shortname = value.name;
                if ( $(window).width() < 480) {
                  if(shortname.length > 10) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
                }
                else if($(window).width() < 1025){
                  if(shortname.length > 15) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
                }
                else {
                  if(shortname.length > 30) shortname = shortname.substring(0,20) + "..." + shortname.substring(shortname.length-5,shortname.length);
                }
                $('.sug-groups-text').css({'display':'block'});
                $('.sug-group').css({'display':'block'});
                $('.sug-group').append('<li class="folder" id="rgroup'+index+'" name="'+value.name+'"><i class="ion-ios-folder folder-icon" ></i><span class="folder-name-text">'+shortname+'</span><label class="toggle-switch switch"><input type="checkbox" name="'+value.name+'" onchange="subscribe(this)"><div class="slider round"></div></label></li>');
              });
            }
          });
          return;
        }
        else {
          $(".my-group").css({"display":"none"});
          if(prevsidelinkid == 'trash'){
            alert("Restore Folder To view Contents");
            return;
          }
          if(subdir == "") subdir = $("#"+sidelinkid).attr('name');
          else subdir += ("/"+$("#"+sidelinkid).attr('name'));
          if(prevsidelinkid == 'favorites'){
            str = $("#"+sidelinkid).attr('name').split("/");
            clearnavbar();
            for(i=0,tmp="",name="";i<str.length;i++){
              if(tmp == "") tmp = str[i];
              else tmp = tmp + "/" + str[i];
              updatenavbar(str[i],tmp);
            }
          }
          else if(prevsidelinkid == 'shared-with-me'){
            updatenavbar($("#"+sidelinkid).text(),subdir);
            window.openshared = function(){
              id = subdir.split('/')[0];
              depth = subdir.replace(id,'');
              $('.file-container').empty();
              $('.file-container').css({'display':'block'});
              $('.folder-container').empty();
              $.ajax({
                url:base+'manage/openshared',
                data:{subdir:depth,id:id},
                type:"POST",
                success:function(res){
                  list = jQuery.parseJSON(res);
                  $('.folders-text').css({"display": "none"});
                  $('.files-text').css({"display": "none"});
                  $.each(list,function(index,value){
                    exclass = "shared";
                    shortname = value.name;
                    if(value.is_img == true) img = value.link;
                    else img = defaultimg;
                    if ( $(window).width() < 480) {
                      if(shortname.length > 10) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
                    }
                    else if($(window).width() < 1025){
                      if(shortname.length > 15) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
                    }
                    else {
                      if(shortname.length > 30) shortname = shortname.substring(0,20) + "..." + shortname.substring(shortname.length-5,shortname.length);
                    }
                    if(value.is_dir == true){
                      $('.folders-text').css({"display": "block"});
                      $('.folder-container').css({"display": "block"});
                      $('.folder-container').append("<li data-index=\""+value.id+"\" class=\"folder "+exclass+"\" draggable=\"true\"  id=\"folder"+index+"\" name=\""+value.name+"\"><i class=\"ion-ios-folder folder-icon\" ></i><span class=\"folder-name-text\" id=\"folder"+index+"\" >"+shortname+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></li>");
                    }else {
                      $('.files-text').css({"display": "block"});
                      $('#files').append("<li data-index=\""+value.id+"\" class=\"file "+exclass+"\" id=\"file"+index+"\" draggable=\"true\" name=\""+value.name+"\"><div class=\"file-preview\"  style=\"  background-image: url('"+img+"') ;\"></div><div class=\"file-name\" id=\"file-name"+index+"\"><i class=\"ion-ios-paper folder-icon\" ></i><span>"+shortname+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></div></li>");
                    }
                  });
                }
              });
            }
            window.openshared();
            return;
          }
          else if(prevsidelinkid == 'group'){
            updatenavbar($("#"+sidelinkid).text(),subdir);
            displaynone();
            window.loadgroup = function(){
              if(subdir.split('/').length == 1){
                //loadGroupcontent
                grp = subdir.split('/')[0];
                $.ajax({
                  url:base+'manage/showgroup',
                  type:"POST",
                  data:{uniqName:grp},
                  success:function(res){
                    $('.my-group').css({'display':'none'});
                    $('.folder-container').empty();
                    $('.file-container').empty();
                    $('.folders-text').css({"display": "none"});
                    $('.files-text').css({"display": "none"});
                    files = $.parseJSON(res);
                    $.each(files,function(index,value){
                      exclass = "group";
                      shortname = value.name;
                      if ( $(window).width() < 480) {
                        if(shortname.length > 10) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
                      }
                      else if($(window).width() < 1025){
                        if(shortname.length > 15) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
                      }
                      else {
                        if(shortname.length > 30) shortname = shortname.substring(0,20) + "..." + shortname.substring(shortname.length-5,shortname.length);
                      }
                      if(value.is_dir == true){
                        $('.folders-text').css({"display": "block"});
                        $('.folder-container').css({'display':'block'});
                        $('.folder-container').append("<li data-index=\""+value.index+"\" class=\"folder "+exclass+"\" draggable=\"true\"  id=\"folder"+index+"\" name=\""+value.id+"\"><i class=\"ion-ios-folder folder-icon\" ></i><span class=\"folder-name-text\" id=\"folder"+index+"\" >"+shortname+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></li>")
                      }
                      else {
                        if(value.is_img == true) img =value.link;
                        else img = defaultimg;
                        $('.file-container').css({'display':'block'});
                        $('.files-text').css({"display": "block"});
                        $('.file-container').append("<li data-index=\""+value.id+"\" class=\"file "+exclass+"\" id=\"file"+index+"\" draggable=\"true\" name=\""+value.name+"\"><div class=\"file-preview\"  style=\"  background-image: url('"+img+"') ;\"></div><div class=\"file-name\" id=\"file-name"+index+"\"><i class=\"ion-ios-paper folder-icon\" ></i><span>"+shortname+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></div></li>");
                      }
                    });
                  },
                });
                return;
              }
              grp = subdir.split('/')[0];
              id = subdir.split('/')[1];
              gsub = subdir.replace(grp,'');
              gsub = gsub.replace('/'+id,'');
              $.ajax({
                url:base+'manage/opengroup',
                type:"POST",
                data:{depth:gsub,sid:id},
                success:function(res){
                  $('.my-group').css({'display':'none'});
                  $('.folder-container').empty();
                  $('.file-container').empty();
                  $('.folders-text').css({"display": "none"});
                  $('.files-text').css({"display": "none"});
                  files = $.parseJSON(res);
                  $.each(files,function(index,value){
                    exclass = "group";
                    shortname = value.name;
                    if ( $(window).width() < 480) {
                      if(shortname.length > 10) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
                    }
                    else if($(window).width() < 1025){
                      if(shortname.length > 15) shortname = shortname.substring(0,9) + "..." + shortname.substring(shortname.length-4,shortname.length);
                    }
                    else {
                      if(shortname.length > 30) shortname = shortname.substring(0,20) + "..." + shortname.substring(shortname.length-5,shortname.length);
                    }
                    if(value.is_dir == true){
                      $('.folders-text').css({"display": "block"});
                      $('.folder-container').css({'display':'block'});
                      $('.folder-container').append("<li data-index=\""+value.index+"\" class=\"folder "+exclass+"\" draggable=\"true\"  id=\"folder"+index+"\" name=\""+value.name+"\"><i class=\"ion-ios-folder folder-icon\" ></i><span class=\"folder-name-text\" id=\"folder"+index+"\" >"+shortname+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></li>")
                    }
                    else {
                      if(value.is_img == true) img = value.link;
                      else img = defaultimg;
                      $('.file-container').css({'display':'block'});
                      $('.files-text').css({"display": "block"});
                      $('#files').append("<li data-index=\""+value.id+"\" class=\"file "+exclass+"\" id=\"file"+index+"\" draggable=\"true\" name=\""+value.name+"\"><div class=\"file-preview\"  style=\"  background-image: url('"+img+"') ;\"></div><div class=\"file-name\" id=\"file-name"+index+"\"><i class=\"ion-ios-paper folder-icon\" ></i><span>"+shortname+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></div></li>");
                    }
                  });
                },
              });
            }
            window.loadgroup();
            return;
          }
          else updatenavbar($("#"+sidelinkid).attr('name'),subdir);
          activeupdate("saved-notes","Saved Notes");
        }
        fetchAndReload();
        if($(window).width() < 480){
          $(".back-arrow").css({"display": "block"});
          $(".left-menu").css({"display": "none"});
        }
      }
      sidelinkid = $(this).prop("id");
    }
  });
  $(".create-menu").click(function(e) {

    var classname1 = $(e.target).attr('class').split(' ')[0];
    //alert(classname1);
    if(classname1 == 'upload'){
      if(prevsidelinkid != 'saved-notes'){
        alert('You can only upload files in saved-notes. To Share a folder with Group/User browse to saved-notes and share the required document');
        return;
      }
      document.getElementById('myfile').click();
    }
  });
  $("#logout").click(function (e) {
    window.location.href = base+"/manage/logout";
  });
  $(".body").click(function(e){
    var folderClassname = $(e.target).attr('class').split(' ')[0];
    if(folderClassname != 'dot-icon' ){
      sidelinkid = $(e.target).prop("id");
      if(sidelinkid == "saved-notes"){
        activeupdate(sidelinkid,"Saved Notes");
      }
      else if(sidelinkid == 'favorites'){
        subdir='';
        activeupdate(sidelinkid,"Favorites");
      }
      else if(sidelinkid == 'trash'){
        subdir='';
        activeupdate(sidelinkid,"Deleted");
      }
      else if(sidelinkid == 'recent'){
        activeupdate(sidelinkid,"Recent");
      }
      else if(sidelinkid == 'group'){
        activeupdate(sidelinkid,"Groups");
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
  $("body").click(function(e) {
    var classname1 = $(e.target).attr('class').split(' ')[0];
    if(classname1 == 'remove-email'){
      email = $(e.target).parent().text();
      filename = oldname;
      $.ajax({
        url:base+'manage/removeshared',
        type:"POST",
        async:true,
        data:{email:email,file:filename},
        success:function(result){
          if(result != 1) console.log('error: while removing user:'+email+' On file:'+filename);
        }
      });
    }
    else if(classname1 == 'details')
    {
      data = $(".details").parent().parent().attr('data-index');
      if(data == undefined) data = $(".details").parent().parent().parent().attr('data-index');
      data = list[data];
      $(".current-name").text(data.name);
      if(data.is_dir == true) $(".thumbnail").css({"display":"none"});
      else $(".thumbnail").css({"display":"block"});
      $(".file-info-container").html(' ');
      $(".file-info-container").append('<li><span class="parameter">Last Modified</span><span class="description">'+data.lmd+'</span></li>');
      $(".file-info-container").append('<li><span class="parameter">Is Favorite</span><span     class="description">'+((data.is_fav == 1)?'Yes':'No')+'</span></li>');
      $(".file-info-container").append('<li><span class="parameter">Shared By Link</span><span class="description">'+((data.is_slink == 1)?'Yes':'No')+'</span></li>');
      $(".file-info-container").append('<li><span class="parameter">Size</span><span class="description">'+data.size+'</span></li>');
    }
    else if(classname1 == 'trash'){
      data = $(".trash").parent().parent().attr('name');
      if(data == undefined) data = $(".trash").parent().parent().parent().attr('name');
      if(subdir == "") src = data;
      else src = subdir+"/"+ data;
      dest = "deleted";
      fd(src);
      fnr();
      return;
    }
    else if(classname1 == 'restore'){
      data = $(".restore").parent().parent().attr('name');
      if(data == undefined) data = $(".restore").parent().parent().parent().attr('name');
      if(subdir == "") src = data;
      else src = subdir+"/"+ data;
      fd(src);
      getdel();
      return;
    }
    else if(classname1 == 'permanently-delete'){
      tdata = $(".restore").parent().parent().attr('name');
      if(tdata == undefined) tdata = $(".restore").parent().parent().parent().attr('name');
      $.ajax({
        url:base+'manage/forevdel',
        data:{file:tdata},
        type:"POST",
        success:function(res){
          getdel();
        }
      });
    }
  });
  $(".create-menu,body").click(function(e) {
    var classname1 = $(e.target).attr('class').split(' ')[0];
//    alert(classname1);
    if(classname1 == 'upload'){
      if(prevsidelinkid != 'saved-notes'){
        alert('You can only upload files in saved-notes. To Share a folder with Group/User browse to saved-notes and share the required document');
        return;
      }
      document.getElementById('myfile').click();
    }
    if(classname1 == 'create-group'){
      $(".body").append('<form id="myform"><div class="modal-background-filter"></div><div class="open-modal group-modal-container " ><h3>Create Group</h3><p>Please enter details to create group </p><div class="input-container"><input class="namebox" autocomplete="off" placeholder="Name" id="members" style="text-transform: none"><div class="chip-container memb" ><span class="chips-here memb"><span class="chip" id="option-1"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span></span><input autocomplete="off" style="text-transform: none" placeholder="Members" name="browser" id="members"></div><textarea rows="4" placeholder="Description"></textarea><div class="chip-container" ><span class="chips-here"><span class="chip" id="option-1"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span></span><input autocomplete="off" placeholder="Tags (e.g., engennering,CM4G,Mumbai University)" name="browser" id="members"></div></div><div class="button-done">Create</div><div class="close"><i class="close-button ion-close"></i></div></div></form>');
      $('.namebox').keypress(function(event){
        var ew = event.which;
        if(ew == 32 || ew == 95 || ew == 127 || ew == 8 || ew == 0) return true;
        if(48 <= ew && ew <= 57) return true;
        if(65 <= ew && ew <= 90) return true;
        if(97 <= ew && ew <= 122) return true;
        return false;
      });
      $(".button-done").on('click',function(){
        if($('.namebox').val().trim().length == 0){
          alert('Please Enter a name');
          return;
        }
        if($(".chip-container:not(.memb) .shared-email").length == 0){
          alert('Please Add some tags');
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
              alert(result);
              exit();
            }
            $(".chip-container.memb .shared-email").each(function(){
              $.ajax({
                url:base+"manage/addtogroup",
                type:"POST",
                data:{group:$("#members").val(),email:$(this).text()},
                success:function(result){
                }
              });
            });
            $( ".modal-background-filter" ).remove();
            $( ".open-modal" ).remove();
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
          //detect enter key
          var text;
          text=$(".chip-container.memb input").val();
          $.ajax({
            url:base+"manage/checkuser",
            type:"POST",
            data:{uemail:text},
            success:function(result){
              if(result != 1) {
                alert("Entered user not found");
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
    }

    if(classname1 == 'create-folder'){

      $(".mobile-submenu-full-cover").css({"display": "none"});

      if(prevsidelinkid != 'saved-notes'){
        alert("You can only create folder in saved-notes. To Share a folder with Group/User browse to saved-notes and share the required document");
        return;
      }
      // create folder register added
      $(".body").append('<div class="modal-background-filter"></div><div class="open-modal create-folder-modal-container" ><h3>Create Folder</h3><p>Please enter a new name for the item </p><div class="link-share-contianer"><input id="nameto" placeholder="folder name goes here" class="share-link" /></div><div class="button-done" id="crtbtn">Create</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
      $('#nameto').keypress(function(event){
        if(event.which == 47 || event.which == 92 ||
           event.which == 34 || event.which == 39 ||
           event.which == 94 || event.which == 96
        )return false;
        else return true;
      });
      $( "#crtbtn" ).click(function() {
        name = $("#nameto").val();
        name = $.trim(name);
        if(name == '' || name == '.' || name == '..'){
          alert("Please Enter a valid name");
          return;
        }
        $.ajax({
          url:base+"manage/createdir",
          type:"POST",
          async:false,
          data:{depth:subdir,name:name},
          success:function(result){
            if(result!=1) {
              alert(result);
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
    }
  });
  $("body").click(function(e) {
  //  alert("entred");

    var classname1 = $(e.target).attr('class').split(' ')[0];
      //  alert(classname1);
    if(classname1 == 'close-button'){
      $( ".modal-background-filter" ).remove();
      $( ".open-modal" ).remove();
    }
    if(classname1 == 'open-with'){
    }
    else if(classname1 == 'move-to'){
    }
    else if(classname1 == 'get-shareable-link'){
      $(".body").append('<div class="modal-background-filter"></div><div class="open-modal shared-modal-container" ><h3>Share with others</h3><label class="toggle-switch switch"><input id="checkbox" checked name="hello" type="checkbox"><div class="slider round"></div></label> <div class="link-share-contianer"><input id="linkbox" readonly disabled placeholder="Enable Slider to Get shared link" onClick="this.setSelectionRange(0, this.value.length)"  class="share-link" /></div><div class="or-container"><div class="line-share left"></div><span>or</span><div class="line-share right"></div></div><h4>People/Group<h4><div class="chip-container" ><span class="chips-here"><span class="chip" id="option-1"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span><span class="chip" id="option-2"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span><span class="chip" id="option-1"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span><span class="chip" id="option-1"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span></span><input type="text" style="text-transform: none" placeholder="Enter email here" list="friend-email" autocomplete="off"  name="browser" id="members"><datalist id="friend-email"></datalist></div><div class="button-done">Done</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
      $(".chip-container .chips-here span").remove();
      $('#checkbox').attr('checked',false);
      $('.button-done').on('click',function(){
        $( ".modal-background-filter" ).remove();
        $( ".open-modal" ).remove();
      });
      if(subdir == "") src = oldname;
      else src = subdir+"/"+oldname;
      $( ".chip-container input" ).keyup(function(event) {
        lastchipadded = $(".chip-container .chips-here span").last();
        var key = event.keyCode || event.charCode;
        if( key == 8 || key == 46 ){
          //detect backspace & delete key
          var value=$.trim($(".chip-container input").val());
          if(value.length==0){
            //alert($("#option-2").text());
            $(".chip-container input").val($(lastchipadded).text());
            $(lastchipadded).parent().remove();
          }
        }
        if (key == 13){
          //detect enter key
          var text;
          text=$(".chip-container input").val();
          if(subdir == "") src = oldname;
          else src = subdir+"/"+oldname;
          $.ajax({
            url:base+"manage/sharewith",
            type:"POST",
            data:{uemail:text,file:src},
            success:function(result){
              if(result != 1) {
                alert(result);
                return;
              }
              $(".chips-here").append('<span class="chip"><i class="ion-person person"></i><span class="shared-email"></span><i class="remove-email ion-close"></i></span>');
              $(".chip-container .chips-here span").last().text(text);
              $(".chip-container input").val("");
            }
          });
        }
      });
      function checkshared(){
        $.ajax({
          url:base+"manage/checkshared",
          type:"POST",
          async:false,
          data:{file:src},
          success:function(result){
            res = jQuery.parseJSON(result);
            if(res.isShared){
              $('#checkbox').attr('checked',true);
              $('#linkbox').prop("disabled", false);
              $('#linkbox').val(base+"shared/open/"+res.link);
            }
            else{
              $('#checkbox').attr('checked',false);
              $('#linkbox').prop("disabled", true);
              $('#linkbox').val('');
            }
          }
        });
      }
      function getsharedwithlist(){
        $.ajax({
          url:base+"manage/getsharedwithlist",
          type:"POST",
          async:false,
          data:{file:src},
          success: function(result){
            res = jQuery.parseJSON(result);
            $.each(res,function(index,value){
              $(".chips-here").append('<span class="chip"><i class="ion-person person"></i><span class="shared-email">'+value.email+'</span><i class="remove-email ion-close"></i></span>');
            });
          }
        });
      }
      function getsharedwithgrouplist(){
        $.ajax({
          url:base+"manage/getsharedwithgrouplist",
          type:"POST",
          data:{file:src},
          success: function(result){
            res = jQuery.parseJSON(result);
            $.each(res,function(index,value){
              $(".chips-here").append('<span class="chip"><i class="ion-android-people"></i><span class="shared-email">'+value.uniqName+'</span><i class="remove-email ion-close"></i></span>');
            });
          }
        });
      }
      getsharedwithlist();
      getsharedwithgrouplist();
      checkshared();
      $('#checkbox').change(function (){
        if($(this).is(":checked")){
          $.ajax({
            url:base+"manage/addtoshared",
            type:"POST",
            async:false,
            data:{file:src},
            success:function(result){
              checkshared();
            }
          });
        }
        else {
          $.ajax({
            url:base+"manage/remshared",
            type:"POST",
            async:false,
            data:{file:src},
            success:function(result){
              checkshared();
            }
          });
        }
        updateDataSets();
      });
    }
    else if(classname1 == 'favorite'){
      if(subdir == "") src = oldname;
      else src = subdir+"/"+oldname;
      dest = "favourites";
      flipfav(src);
      if(prevsidelinkid == 'favorites'){
        getfav();
      }
      fnr();
    }
    else if(classname1 == 'rename'){
      $(".body").append('<div class="modal-background-filter"></div><div class="open-modal rename-modal-container" ><h3>Rename</h3><p>Please enter a new name for the item </p><div class="link-share-contianer"><input id="newname" placeholder="file name goes here" class="share-link" /></div><div class="button-done" id="rname">Save</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
      $("#rname").click(function(e){
        var src,dest;
        newname = $("#newname").val();
        newname = $.trim(newname);
        if(newname == '' || (newname.indexOf('/') >= 0) || (newname.indexOf("\\") >= 0)){
          alert("Please Enter a valid name");
          return;
        }
        src = oldname;
        dest = newname;
        $.ajax({
          url:base+"manage/rename",
          type:"POST",
          async:false,
          data:{src:src,dest:dest,depth:subdir},
          success:function(result){
            if(result != 1){
              alert('Error while renaming');
              console.log(result);
            }
            $( ".modal-background-filter" ).remove();
            $( ".open-modal" ).remove();
            fnr();
          }
        });
      });
    }
    else if(classname1 == 'details'){
    }
    else if(classname1 == 'download'){
      $.ajax({
        url:base+"manage/setdownload",
        type:"POST",
        async:false,
        data:{name:oldname,depth:subdir},
        success:function(result){
          if(result == 1) window.location.href=base+"/manage/download";
          else alert("error While Setting download params");
        }
      });
    }
  });
});
$("body").click(function(e) {
  classname = $(e.target).attr('class').split(' ')[0];
  //alert(classname);
  if(menuDisplayed == true  ){
    menuBox.style.display = "none";
  //  $( ".folder-submenu-container" ).remove();

    //        var folderClassname = $(e.target).attr('class').split(' ')[0];

  }
  if(classname == 'dot-icon' ){
    folderid = $(e.target).parent().attr('id');
    if($("#"+folderid).attr('class') == "file-name"){
      oldname = $(e.target).parent().parent().attr('name');
      if($(window).width() > 1024){
        oldname = $(e.target).parent().parent().attr('name');
      }
    }
    else oldname = $("#"+folderid).attr('name');
  }

  if(classname=='move-to'){

    //alert("move-to clicked " + classname + prevforid);
    if ( $(window).width() < 480) {
      $(".back-arrow").css({"display": "none"});
      $(".left-menu").css({"display": "block"});
    }
    $("#"+prevforid).append('<ul class=" move-to-submenu" ><i class="back-icon ion-arrow-left-c icon" onclick="parseme(this)" name=""></i><h4 class="move-to-title">Saved Notes</h4><i class="close-icon ion-close-round icon"></i><div class="li-container"><li  onclick="parseme(this)"><i class="ion-ios-folder icon" ></i><span class="option-1">Folder</span><i class="ion-android-arrow-dropright right icon" ></i></li></div><li class="btn-container"><div class="btn-move btn left" name="">Move here</div><div class="btn btn-move right"><i class="ion-plus icon"></i></div></li></ul>');
    open("");
  }
  if(classname=='close-icon'){
    $(".move-to-submenu").css({"display": "none"});
  }
  if(classname=='back-icon'){
  }
  if(classname=='btn-move'){
    src = $(".btn-move").parent().parent().parent().attr("name");
    if(src == undefined) src = $(".btn-move").parent().parent().parent().parent().attr("name");
    if(subdir != "") src = subdir+'/'+src;
    dest = $(".btn-move").attr("name");
    if(prevsidelinkid == 'group'){
      gid = src.split('/')[0];
      sid = src.split('/')[1];
      depth = src.replace(gid,'');
      depth = depth.replace('/'+sid,'');
      $.ajax({
        url:base+'manage/copygroup',
        data:{sid:sid,depth:depth,dest:dest},
        type:"POST",
        success:function(res){
          if(res != 1) alert('Invalid operation');
          $('.move-to-submenu').remove();
        }
      });
      return;
    }
    if(prevsidelinkid == 'shared-with-me'){
      sid = src.split('/')[0];
      depth = src.replace(sid,'');
      $.ajax({
        url:base+'manage/copyshared',
        data:{sid:sid,depth:depth,dest:dest},
        type:"POST",
        success:function(res){
          $('.move-to-submenu').remove();
        }
      });
      return;
    }
    move(src,dest);
    return;
  }
});
function move(src,dest){
  $.ajax({
    url:base+"manage/move",
    type:"POST",
    async:false,
    data:{dest:dest,src:src},
    success:function(result){
      if(result != 1){
        alert("Error While Moving");
        console.log(result);
      }
      fnr();
    }
  });
}
function flipfav(file){
  $.ajax({
    url:base+"manage/flipfav",
    data:{path:file},
    type:"POST",
    async:false,
    success:function(result){
    }
  });
}
ff = flipfav;
function flipdel(file){
  type = (prevsidelinkid == 'trash'?1:0);
  $.ajax({
    url:base+"manage/flipdel",
    data:{path:file,type:type},
    type:"POST",
    async:false,
    success:function(result){
      if(result!=1) alert(result);
    }
  });
}
fd = flipdel;
function parseme(obj){
  open($(obj).attr("name"));
}
function open(dir){
  var arr;
  if(dir == ""){
    $(".back-icon").css({"display" : "none"});
  }
  else {
    arr = dir.split('/');
    arr.pop();
    if(!($.isArray(arr))) {
      arr = "";
    }
    else arr = arr.join('/');
    $(".back-icon").css({"display" : "block"});
    $(".back-icon").attr("name",arr);
  }
  $.ajax({
    url:base+"manage/getdir",
    type:"GET",
    async:false,
    data:{depth:dir},
    success:function(result){
      $(".li-container").empty();
      list = jQuery.parseJSON(result);
      $.each(list,function(index,value){
        if (value.is_dir == true) {
          name = value.name;
          if(dir != "")path = dir+'/'+name;
          else path = name;
          $(".li-container").append('<li  onclick="parseme(this)" name="'+path+'"><i class="ion-ios-folder icon" ></i><span class="option-1">'+name+'</span><i class="ion-android-arrow-dropright right icon" ></i></li>');
        }
        else {
        }
      });
      $(".btn-move").attr("name",dir);
    }
  });
}
