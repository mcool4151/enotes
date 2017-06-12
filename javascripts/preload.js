$(document).ready(function (){
  fetchAndReload();
  $('.new').click(function (){
    if(onscreen==0){
      $(".create-menu").append('<ul class="new-dropdown folder-submenu-container" ><li class="create-folder"><i class="create-folder ion-ios-folder icon" ></i><span class="create-folder">Create Folder</span></li><li class="create-group"><i class="create-group ion-android-people icon" ></i><span class="create-group">Create Group</span></li><li class="upload"><i class="upload ion-ios-paper icon" ></i><span class="upload">Upload File</span></li></ul>');
      onscreen=1;
    }
    else {
      $( ".new-dropdown" ).remove();
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
      type:"POST",
      data:{key:quer},
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
      type:"POST",
      data:{key:quer},
      success:function(res){
        function unsubscribe(evt){
          //alert('unsubscribing '+$(evt).name());
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
  });
});
