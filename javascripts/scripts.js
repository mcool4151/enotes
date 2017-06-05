$( window ).resize(function() {
  location.reload();
});

var id = [];

$(document).ready(function(){

  //$(".left-container").css({"z-index": "50", "visibility": "hidden"});
  //  $(".filter").css({"z-index": "50","visibility": "hidden"});
  //  //$("h3").html( "jquery running" )


var lastchipadded="option-2",latestchipadded="option-4";
/*

if(classname=='remove-email')
{
  var id = $(e.target).parent().prop("id");
  $("#"+id).remove();
}
*/
  /*$( "body" ).keyup(function() {

    var key = event.keyCode || event.charCode;
    if( key == 8 || key == 46 )//detect backspace & delete key
    {
      var value=$.trim($(".chip-container input").val());
      if(value.length==0)
      {
        //alert($("#option-2").text());
        $(".chip-container input").val($("#"+lastchipadded).text());
        $("#"+lastchipadded).remove();
      }
    }
    if (key == 13) //detect enter key
    {

     var text;
      text=$(".chip-container input").val();
      $(".chip-container input").val("");
      //alert(text);
      $(".chips-here").append('<span class="chip" id="option-4"><i class="ion-person person"></i><span class="shared-email"></span><i class="remove-email ion-close"></i></span>');
      $("#"+latestchipadded+" span").text(text);


   }
  }); */





  $(".share-option").click(function(){
    $(".log-out-sub-menu").css({"display": "block"});
  });



  $(".ion-log-out").click(function(){
    $(".log-out-sub-menu").css({"display": "block"});
  });
  $(".close").click(function(){
    $(".log-out-sub-menu").css({"display": "none"});

  });
  $("#saved-notes").addClass("active");


  if ( $(window).width() < 1025) {
    $(".folder").click(function(){
      $(".left-container").css({"z-index": "50", "visibility": "hidden"});
      $(".nav-header").css({"display": "none"});
      $(".filter").css({"z-index": "50","visibility": "hidden"});

    });
    $(".nav-header").css({"display": "none"});

    $(".filter").click(function(){
      $(".left-container").css({"z-index": "50", "visibility": "hidden"});
      $(".nav-header").css({"display": "none"});
      $(".filter").css({"z-index": "50","visibility": "hidden"});

    });






    $(".left-menu").click(function(){
      $(".left-container").css({"z-index": "100", "visibility": "visible"});
      $(".filter").css({"z-index": "99","visibility": "visible"});
      $(".nav-header").css({"display": "block"});

    });


    $(".search-icon").click(function(){
      $(".back-arrow1").css({"display": "block"});
      $(".left-menu").css({"display": "none"});
      $(".search-bar").css({"display": "block"});
      $(".search-icon").css({"display": "none"});
    });

    $(".back-arrow1").click(function(){
      if($(".back-arrow").css('display')=='none')
      {$(".left-menu").css({"display": "block"});}



      $(".back-arrow1").css({"display": "none"});
      $(".search-bar").css({"display": "none"});
      $(".search-icon").css({"display": "block"});
      $(".folder-submenu-container").css({"display": "none"});
      $(".mobile-submenu-full-cover").css({"display": "none"});
      $(".right-container").css({"display": "none"});
      $("body").css({"overflow-y": "auto"});


    });


  }
  else {
  }


});
