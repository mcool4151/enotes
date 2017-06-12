$("#myfile").change(function (){
  if(ufree==0) {
    //$(".body").append('<div class="modal-background-filter"></div><div class="open-modal error-modal-container" ><p>File Currently Being Uploaded. Please Wait</p><div class="okay button-done" id="okay" >OK</div><div class="close-button close"><i class="close-button ion-close"></i></div></div>');
    displaymessage("File Currently Being Uploaded. Please Wait");
    return;
  }
  ufree = 0;
  var formData = new FormData($('#myform')[0]);
  formData.append("depth",subdir);
  $('#files').prepend('<li class="file" draggable="true" id="uploadfile1"><div class="file-preview"  ></div><div class="file-name" id="uploadfile"><i class="ion-ios-paper folder-icon" ></i><span>uploading</span><i class="dot-icon ion-android-more-vertical " aria-hidden="true"></i></div></li>');
  $.ajax({
    url:base+"manage/upload",
    type:"POST",
    data:formData,
    processData: false,
    contentType: false,
    async: true,
    success:function(result){
      ufree=1;
      if(result == 1){
        fetchAndReload();
        document.getElementById("myfile").value = null;
      }
      else {
      }
    },
    xhr: function() {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener("progress", function(evt) {
        if (evt.lengthComputable) {
          $('.upload-bar').remove();
          var percentComplete = evt.loaded / evt.total;
          percentComplete = parseInt(percentComplete * 96);
          $("<div class=\"upload-bar\"></div>").insertAfter("#uploadfile");
          $("#uploadfile1 .file-preview").css({ 'opacity': '0.2' });
          $("#uploadfile .dot-icon").css({ 'display': 'none' });
          $(".upload-bar").css({ "color":"red","height":"2px","width":percentComplete+"%","background":"orange"  });
        }
      }, false);
      return xhr;
    }
  });
});
