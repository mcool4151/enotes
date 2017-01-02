$(".new-button-container").click(function(e) {
  var classname1 = $(e.target).attr('class').split(' ')[0];
  if(classname1 == 'upload')
  {
  alert(classname1 + " class clicked");
}
});
