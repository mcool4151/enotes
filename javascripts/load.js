var oldname;
$(document).ready(function(){
  var files = [];
  var folders = [];
  var images = [];
  var paths = [];
  var fpaths = [];
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
        files = [];
        folders = [];
        images = [];
        paths = [];
        fpaths = [];
        list = jQuery.parseJSON(result);
        $.each(list,function(index,value){
          if (value.is_dir == true) {
            folders.push(value.name);
            paths.push(value.path);
          }
          else {
            files.push(value.name);
            fpaths.push(value.path);
            if(value.is_img == true) images.push(value.link);
            else images.push(defaultimg);
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
        files = [];
        folders = [];
        images = [];
        paths = [];
        fpaths = [];
        list = jQuery.parseJSON(result);
        $.each(list,function(index,value){
          if (value.is_dir == true) {
            folders.push(value.name);
            paths.push(value.path);
          }
          else {
            files.push(value.name);
            fpaths.push(value.path);
            if(value.is_img == true) images.push(value.link);
            else images.push(defaultimg);
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
        fullname = fpaths[index];
        exclass = "favorite";
      }
      else if(prevsidelinkid == 'trash'){
        fullname = fpaths[index];
        exclass = "trash";
      }
      else {
        exclass = "";
        fullname = value;
      }
      test = 0;
      $('.folders-text').css({"display": "block"});
      $('.folder-container').css({"display": "block"});
      $('.files-text').css({"display": "block"});
      if ( $(window).width() < 480) {
        if(value.length > 10) value = value.substring(0,9) + "..." + value.substring(value.length-4,value.length);
      }
      else if($(window).width() < 1025){
        if(value.length > 15) value = value.substring(0,9) + "..." + value.substring(value.length-4,value.length);
      }
      else {
        if(value.length > 15) value = value.substring(0,13) + "..." + value.substring(value.length-5,value.length);
      }
      $('#files').html($('#files').html() + "<li class=\"file "+exclass+"\" id=\"file"+index+"\" draggable=\"true\" name=\""+fullname+"\"><div class=\"file-preview\"  style=\"  background-image: url('"+images[index]+"') ;\"></div><div class=\"file-name\" id=\"file-name"+index+"\"><i class=\"ion-ios-paper folder-icon\" ></i><span>"+value+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></div></li>");
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
        fullname = paths[index];
        exclass = "favorite";
      }
      else if(prevsidelinkid == 'trash'){
        fullname = paths[index];
        exclass = "trash";
      }
      else {
        exclass = "";
        fullname = value;
      }
      test = 0;
      if ( $(window).width() < 480) {
        if(value.length > 10) value = value.substring(0,9) + "..." + value.substring(value.length-4,value.length);
      }
      else if($(window).width() < 1025){
        if(value.length > 15) value = value.substring(0,9) + "..." + value.substring(value.length-4,value.length);
      }
      else {
        if(value.length > 30) value = value.substring(0,20) + "..." + value.substring(value.length-5,value.length);
      }
      $('.folder-container').html($('.folder-container').html() + "<li class=\"folder "+exclass+"\" draggable=\"true\"  id=\"folder"+index+"\" name=\""+fullname+"\"><i class=\"ion-ios-folder folder-icon\" ></i><span class=\"folder-name-text\" id=\"folder"+index+"\" >"+value+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></li>");
    });
    if(test == 1){ $('.folders-text').css({"display": "none"});$('.folder-container').css({"display": "none"});}
    $('.folder-container').html($('.folder-container').html() + "<li class=\"fix\" ></li>");
  }
  function fetchAndReload(){
    $.ajax({
      url:base+"manage/getdir",
      type:"GET",
      async:false,
      data:{depth:subdir},
      success:function(result){
        files = [];
        folders = [];
        images = [];
        paths = [];
        fpaths = [];
        list = jQuery.parseJSON(result);
        $.each(list,function(index,value){
          if (value.is_dir == true) folders.push(value.name);
          else {
            files.push(value.name);
            if(value.is_img == true) images.push(value.link);
            else images.push(defaultimg);
          }
        });
        foldercount = folders.length;
        filecount = files.length;
      //  alert("Folder count:"+filecount);
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
        }
        else {
        }
      }
    });
  });
  var folderClassname;
  var sidelinkid;
  $("body").click(function(e){
    folderClassname = $(e.target).attr('class').split(' ')[0];
    if(folderClassname=="folder"  || folderClassname=="left-nav-bar-text" || folderClassname=="folder-name-text")
    {
    if(folderClassname != 'dot-icon' ){
      sidelinkid = $(e.target).prop("id");
      if(sidelinkid == "saved-notes"){
        clearnavbar();
        subdir = "";
      }
      else if(sidelinkid == 'favorites'){
        clearnavbar();
        subdir = "";
        getfav();
        return;
      }
      else if(sidelinkid == 'trash'){
        clearnavbar();
        subdir = "";
        getdel();
        return;
      }
      else if(sidelinkid == 'recent'){
        clearnavbar();
        files = [];
        folders = [];
        reloadfiles();
        reloadfolders();
        return;
      }
      else if(sidelinkid == 'shared-with-me'){
        clearnavbar();
        files = [];
        folders = [];
        reloadfiles();
        reloadfolders();
        return;
      }
      else {
        //      alert("entred" + sidelinkid);
        //      $("h3").text($("#"+sidelinkid).attr('name'));
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
        else updatenavbar($("#"+sidelinkid).attr('name'),subdir);
        activeupdate("saved-notes","Saved Notes");
      }
      fetchAndReload();
    }
    sidelinkid = $(this).prop("id");
  }
  });
/*  $(".left-navigation li").click(function(e){


});*/
$(".new-button-container").click(function(e) {
  var classname1 = $(e.target).attr('class').split(' ')[0];
  if(classname1 == 'upload'){
    document.getElementById('myfile').click();
  }
});
$("#logout").click(function (e) {
  window.location.href = base+"/manage/logout";
});





//test ----------

    $(".body").click(function(e){
      var folderClassname = $(e.target).attr('class').split(' ')[0];

    //    alert("outside folder " +folderClassname);
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









//submenu regiters
$("body").click(function(e) {
  var classname1 = $(e.target).attr('class').split(' ')[0];

  if(classname1 == 'open-with'+"open-with")
  {
    $("h3").text(classname1);
  }
  else if(classname1 == 'move-to')
  {
    $("h3").text(classname1+"open-with");
  }
  else if(classname1 == 'get-shareable-link')
  {
    $("h3").text(classname1+"open-with");
  }
  else if(classname1 == 'favorite')
  {
    //$("h3").text("folderid "+ $("#"+folderid).parent().attr('name'));
  //  alert("folderid "+ $("#"+folderid).attr('name'));
    /*if(subdir == "") src = $("#"+folderid).parent().attr('name');
    else src = subdir+"/"+$("#"+folderid).parent().attr('name');
    dest = "favourites";
    flipfav(src);
    return;*/
    //move(src,dest);

  }
  else if(classname1 == 'rename')
  {
    if(subdir == "") {
      //
    }
    else {
      //
    }
  }
  else if(classname1 == 'details')
  {
    $("h3").text(classname1);
  }
  else if(classname1 == 'download')
  {
    //$("h3").text(classname1);
  }
  else if(classname1 == 'trash')
  {
    if(subdir == "") src = $("#"+data).text();
    else src = subdir+"/"+$("#"+data).text();
    dest = "deleted";
    move(src,dest);
  }
  });
/*  if(c
if(classname1 == 'create-folder')// create folder register added
{
alert(classname1 + " create folder clicked");
}*/
$(".new-button-container").click(function(e) {
  var classname1 = $(e.target).attr('class').split(' ')[0];
  if(classname1 == 'upload')
  {
  //alert(classname1 + " upload clicked");
}
if(classname1 == 'create-group')
{
  $(".body").append('<div class="modal-background-filter"></div><div class="open-modal group-modal-container " ><h3>Create Group</h3><p>Please enter details to create group </p><div class="input-container"><input autocomplete="off" placeholder="Name" id="members"><div class="chip-container" ><span class="chips-here"></span><input autocomplete="off" placeholder="Members" name="browser" id="members"></div><textarea rows="4" placeholder="Description"></textarea><div class="chip-container" ><span class="chips-here"><span class="chip" id="option-1"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span></span><input autocomplete="off" placeholder="Tags (e.g., engennering,CM4G,Mumbai University)" name="browser" id="members"></div></div><div class="button-done">Share</div><div class="close"><i class="close-button ion-close"></i></div></div>');
  /*
incase u want to read full html code

  <div class="modal-background-filter"></div>
  <div class="open-modal group-modal-container " >
    <h3>Create Group</h3>
    <p>Please enter details to create group </p>
    <div class="input-container">
      <input autocomplete="off" placeholder="Name" id="members">
      <div class="chip-container" >
        <span class="chips-here">
        </span>
        <input autocomplete="off" placeholder="Members" name="browser" id="members">
      </div>
      <textarea rows="4" placeholder="Description"></textarea>
      <div class="chip-container" >
        <span class="chips-here">
         <span class="chip" id="option-1"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span>
      </span>
        <input autocomplete="off" placeholder="Tags (e.g., engennering,CM4G,Mumbai University)" name="browser" id="members">
      </div>
      </div>
      <div class="button-done">Share</div>
      <div class="close"><i class="close-button ion-close"></i></div>
    </div>


    */
}
if(classname1 == 'create-folder')// create folder register added
{
  $(".body").append('<div class="modal-background-filter"></div><div class="open-modal create-folder-modal-container" ><h3>Create Folder</h3><p>Please enter a new name for the item </p><div class="link-share-contianer"><input id="nameto" placeholder="folder name goes here" class="share-link" /></div><div class="button-done" id="crtbtn">Create</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
  $( "#crtbtn" ).click(function() {
    name = $("#nameto").val();
    $.ajax({
      url:base+"manage/createdir",
      type:"POST",
      async:false,
      data:{depth:subdir,name:name},
      success:function(result){
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
  var classname1 = $(e.target).attr('class').split(' ')[0];
  if(classname1 == 'close-button'){
  $( ".modal-background-filter" ).remove();
    $( ".open-modal" ).remove();
  }
  if(classname1 == 'open-with')
  {
    $("h3").text(classname1+"open-with");
  }
  else if(classname1 == 'move-to')
  {
    $("h3").text(classname1+"open-with");
  }
  else if(classname1 == 'get-shareable-link')
  {
    /*
    update share code
    if(classname == 'get-shareable-link')
    {
        $(".body").append('<div class="modal-background-filter"></div><div class="open-modal shared-modal-container" ><h3>Share with others</h3><label class="toggle-switch switch"><input id="checkbox" checked name="hello" type="checkbox"><div class="slider round"></div></label> <div class="link-share-contianer"><input value="link goes here" class="share-link" /></div><div class="or-container"><div class="line-share left"></div><span>or</span><div class="line-share right"></div></div><h4>People<h4><div class="chip-container" ><span class="chips-here"><span class="chip" id="option-1"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span><span class="chip" id="option-2"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span><span class="chip" id="option-1"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span><span class="chip" id="option-1"><i class="ion-person person"></i><span class="shared-email">Avish Kadakia</span><i class="remove-email ion-close"></i></span></span><input type="text" placeholder="Entre email here" list="friend-email" autocomplete="off"  name="browser" id="members"><datalist id="friend-email"><option value="Avish Kakia">avishladalia1996@gmail.com</option><option value="medium">$20 USD</option><option value="large">$25 USD</option></datalist></div><div class="button-done">Share</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
      //$("h3").text(classname1);

    }*/
      $(".body").append('<div class="modal-background-filter"></div><div class="open-modal shared-modal-container" ><h3>Share with others</h3><label class="toggle-switch switch"><input id="checkbox" checked name="hello" type="checkbox"><div class="slider round"></div></label><div class="link-share-contianer"><input id="linkbox" readonly disabled placeholder="Enable Slider to Get shared link" onClick="this.setSelectionRange(0, this.value.length)"  class="share-link" /></div><div class="or-container"><div class="line-share left"></div><span>or</span><div class="line-share right"></div></div><h4>People<h4><form ><input value="Enter email to share file" class="email-input" /></form><div class="button-done">Share</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
      $('#checkbox').attr('checked',false);
      if(subdir == "") src = oldname;
      else src = subdir+"/"+oldname;
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
      });
    //$("h3").text(classname1);

  }
  else if(classname1 == 'favorite'){
    if(subdir == "") src = oldname;
    else src = subdir+"/"+oldname;
    dest = "favourites";
    //move(src,dest);
    //fnr();
    flipfav(src);
    if(prevsidelinkid == 'favorites'){
      getfav();
    }
  }
  else if(classname1 == 'rename')
  {
    $(".body").append('<div class="modal-background-filter"></div><div class="open-modal rename-modal-container" ><h3>Rename</h3><p>Please enter a new name for the item </p><div class="link-share-contianer"><input id="newname" placeholder="file name goes here" class="share-link" /></div><div class="button-done" id="rname">Save</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
    //$("h3").text(classname1);
    $("#rname").click(function(e){
      var src,dest;
      newname = $("#newname").val();
      src = oldname;
      dest = newname;
      $.ajax({
        url:base+"manage/rename",
        type:"POST",
        async:false,
        data:{src:src,dest:dest,depth:subdir},
        success:function(result){
          $( ".modal-background-filter" ).remove();
          $( ".open-modal" ).remove();
          fnr();
        }
      });
    });
  }
  else if(classname1 == 'details')
  {
    $("h3").text(classname1+"open-with");
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
/*  if(c
if(classname1 == 'create-folder')// create folder register added
{
alert(classname1 + " create folder clicked");
}*/
});
});
$("body").click(function(e) {
classname = $(e.target).attr('class').split(' ')[0];

//     alert("classname");


//$("h3").text(folderid);

  if(classname == 'dot-icon' )
  {
    //console.log("%o",$(e.target).parent().attr('id'));
      folderid = $(e.target).parent().attr('id');
      if($("#"+folderid).attr('class') == "file-name"){
        oldname = $(e.target).parent().parent().attr('name');
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
        //(".back-icon").css({"display": "none"});
        if(classname=='close-icon'){

        //  alert("clicked " + classname);
        $(".move-to-submenu").css({"display": "none"});
        }
        if(classname=='back-icon'){

          //alert("back icon clicked  " + classname);
      //  $(".move-to-submenu").css({"display": "none"});
        }
        if(classname=='btn-move'){
          src = $(".btn-move").parent().parent().parent().attr("name");
          if(subdir != "") src = subdir+'/'+src;
          dest = $(".btn-move").attr("name");
          move(src,dest);
          return;
          //alert("btn move clicked  " + classname);
      //  $(".move-to-submenu").css({"display": "none"});
        }
});
function move(src,dest){
  $.ajax({
    url:base+"manage/move",
    type:"POST",
    async:false,
    data:{dest:dest,src:src},
    success:function(result){
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
      //
    }
  });
}
ff = flipfav;
function flipdel(file){
  $.ajax({
    url:base+"manage/flipdel",
    data:{path:file},
    type:"POST",
    async:false,
    success:function(result){
      //
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
          //wait for it
        }
      });
      $(".btn-move").attr("name",dir);
    }
  });
}
