$(document).ready(function(){
  var files = [];
  var folders = [];
  function reloadfiles() {
    $('#files').html(" ");
    $.each(files,function(index,value) {
      $('#files').html($('#files').html() + "<li class=\"file\" draggable=\"true\" id=\"file"+index+"\"><div class=\"file-preview\"  style=\"  background-image: url('http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png') ;\"></div><div class=\"file-name\"><i class=\"ion-ios-paper folder-icon\" ></i><span>"+value+"</span></div></li>");
    });
    $('#files').html($('#files').html() + "<li class=\"fix\" ></li></ul>");
  }
  function reloadfolders() {
    $('.folder-container').html(" ");
    $.each(folders,function (index,value) {
      $('.folder-container').html($('.folder-container').html() + "<li class=\"folder\" draggable=\"true\"  id=\"folder"+index+"\"><i class=\"ion-ios-folder folder-icon\" ></i><span>"+value+"</span><i class=\"dot-icon ion-android-more-vertical \" aria-hidden=\"true\"></i></li>");
    });
    $('.folder-container').html($('.folder-container').html() + "<li class=\"fix\" ></li>");
  }
  function fetchAndReload(){
    $.ajax({
      url:base+"manage/getdir",
      type:"GET",
      async:false,
      success:function(result){
        files = [];
        folders = [];
        list = jQuery.parseJSON(result);
        $.each(list,function(index,value){
          if (value.is_dir == true) folders.push(value.name);
          else files.push(value.name);
        });
        reloadfiles();
        reloadfolders();
      }
    });
  }
  fetchAndReload();
  $("#myfile").change(function (){
    var formData = new FormData($('#myform')[0]);
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
          alert(result);
        }
      }
    });
  });
  var folderClassname;
  var sidelinkid;
  $(".folder").click(function(e){
    folderClassname = $(e.target).attr('class').split(' ')[1];
//    alert("outside folder " +folderClassname);
    if(folderClassname != 'dot-icon' ){
      alert("folderentred ");
    }
    sidelinkid = $(this).prop("id");
      alert( sidelinkid);
  });
/*  $(".left-navigation li").click(function(e){


});*/
});
