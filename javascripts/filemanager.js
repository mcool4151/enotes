//code for Files and Folder Container and nav bar
function displaynone(){
  $('.sub-groups-text').css({'display':'none'});
  $('.sub-group').css({'display':'none'});
  $('.sug-groups-text').css({'display':'none'});
  $('.sug-group').css({'display':'none'});
  $(".my-group").css({"display":"none"});
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
$(".display-container").on("click",".folder",function(e){
  //alert($(this).attr("name"));

    $(".my-group").css({"display":"none"});
    if(prevsidelinkid == 'trash'){
      $(".body").append('<div class="modal-background-filter"></div><div class="open-modal error-modal-container" ><p>Restore Folder To view Contents</p><div class="okay button-done" id="okay" >OK</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
      //alert("Restore Folder To view Contents"); // TODO Change Later
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
    fetchAndReload();
    if($(window).width() < 480){
      $(".back-arrow").css({"display": "block"});
      $(".left-menu").css({"display": "none"});
    }
});
