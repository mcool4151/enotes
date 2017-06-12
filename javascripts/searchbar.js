$(".search-bar").keyup(function(event){
  var ew = event.which;
  if (ew == 13){
    quer = $(this).val();
    if($(window).width()<1025){
      $('.left-menu').click();
    }
    $('#group').click();
    quer='';
  }
});
