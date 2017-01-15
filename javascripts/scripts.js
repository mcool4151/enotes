$( window ).resize(function() {
  location.reload();
});



$(document).ready(function(){
  //$(".left-container").css({"z-index": "50", "visibility": "hidden"});
//  $(".filter").css({"z-index": "50","visibility": "hidden"});
//  $("h3").html( "jquery running" )
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
  $(".back-arrow").css({"display": "block"});
  $(".left-menu").css({"display": "none"});
  $(".search-bar").css({"display": "block"});
  $(".search-icon").css({"display": "none"});
  });

  $(".back-arrow").click(function(){
  $(".back-arrow").css({"display": "none"});
  $(".left-menu").css({"display": "block"});
  $(".search-bar").css({"display": "none"});
  $(".search-icon").css({"display": "block"});
  $(".folder-submenu-container").css({"display": "none"});
$(".mobile-submenu-full-cover").css({"display": "none"});
  $(".right-container").css({"display": "none"});
  });


}
else {
}


});
