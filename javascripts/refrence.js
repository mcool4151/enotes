
alert("entred");
$(document).ready(function(){
    /*$(document).mousemove(function(e){
      elementclass = $(e.target).attr('class').split(' ')[0];
      elementid = $(e.target).prop("id");
      var1(elementclass + elementid);
      if(classname=="folder"  || classname=="left-nav-bar-text" || classname=="folder-name-text")
      {
        if(classname != 'dot-icon' ){

          var1(classname + sidelinkid);
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
            //edit this
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
            });//till here
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
            //edit this
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
            });//till here
            return;
          }
          else if(prevsidelinkid == 'trash'){
            //edit this
            $(".my-group").css({"display":"none"});
            {
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
                          $('.file-contaiThe problem is that .click only works for elements already on the page. You have to use something like on if you are wiring up future elements

ner').css({'display':'block'});
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
      else if(classname == 'new'){
        newdropdown();
      }


      //for id
      if(elementid = "logout")
      {
      window.location.href = base+"/manage/logout";
    }
    });
    //button clicks

    });*/

var count=0;

    $(".new").on("click", function(e){
      count ++;
      alert(count);

    });
    $(".new").on("click",".create-folder", function(){
      count ++;
      alert(count);
    });
});
