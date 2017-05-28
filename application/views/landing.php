<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE HTML>
<html >
<head>
  <meta charset="utf-8">
  <script type="text/javascript">
    var base = "<?php echo base_url(); ?>";
  </script>
  <title>e-notes</title>
  <meta name="e-notes" content="">
  <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
  <script src="https://apis.google.com/js/api:client.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
  <script src="https://apis.google.com/js/api:client.js"></script>
  <script src="https://apis.google.com/js/platform.js" async defer></script>
  <link rel="stylesheet" href="<?php echo base_url(); ?>stylesheets/landing-page-styles.css">

  <!--[if lt IE 9]>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
  <![endif]-->
  <script type="text/javascript">
  var googleUser = {};
  var startApp = function() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '884000251920-jsnc6o4o8buh4ek1s208avhj3p5atm07.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      //attachSignin(document.getElementById('mysignin'));
      $('.google-login').each(function(i, obj) {
        attachSignin(obj);
      });
    });
  };
  function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
          onSignIn(googleUser);
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
  </script>

</head>

<body><!--change start -->

<nav>
  <div class="mobile-nav-container">
    <div class="nav-company-name">e-notes</div>
    <div>
      <div style="visibility:hidden" class="c-hamburger c-hamburger--htx mobile-menu"><span></span>
      </div>



    </div>
    <ul class="mobile-submenu">
      <li class="banner-logo" style="background-image:url(<?php echo base_url(); ?>/images/logo.png);">
</li>
      <li class="active"><span>home</span></li>
      <!--<li><span>home</span></li>
      <li><span>home</span></li>
      <li><span>home</span></li>-->
      <li>
        <div class="login-button-container">
        <div class="google-login button ">Google</div><span>or</span>
        <a href="<?php echo $fburl; ?>"><div class="facebook-login button ">Facebook</div></a>
      </div>
      </li>
    </ul>
  </div>
  <div class="modal desktop-nav-bar" >
    <!--<div><a href="<?php echo base_url();?>/termsncondn">Terms and Conditions</a></div>
    <div >Sign-in</div>
    <div >Help</div>
    <div >Using e-notes</div>
    <div >Home</div>-->
    <div class="left">e-notes</div>
  </div>
</nav>



<div class="parallax bg-one" style="background-image: url('<?php echo base_url(); ?>/images/banner-1.jpg');">
<div class="image-filter"></div>
<i class="fa fa-angle-down down-arrow" aria-hidden="true"></i>

</div>

<div class="modal banner" >
  <div class="banner-logo" style="background-image:url(<?php echo base_url();?>/images/logo.png);"></div>
  <h2>Save &#38; Share knowledge here</h2>
  <div class="login-button-container">
  <div class="google-login button" id="mysignin">Google +</div><span>or</span>
  <a href="<?php echo $fburl; ?>"><div class="facebook-login button ">Facebook</div></a>
</div>
</div>


<div class="modal files-supported" >
    <div class="file-img" style="background-image:url(<?php echo base_url();?>/images/files.png);">
    </div>
    <div class="text-container">
    <h3>Save any file</h3>
    <p>You can keep notes, photon, designs, drawings, recordings, videos – anything.</p>
  </div>
</div>
<div class="parallax bg-two" style="background-image: url('<?php echo base_url();?>/images/banner-2.jpg');"><div class="image-filter"></div></div>

<div class="modal shared-files" >
    <div class="shared-img" style="background-image:url(<?php echo base_url();?>/images/share.jpg);">
    </div>
    <div class="text-container">
    <h3>Share files &#38; folders</h3>
    <p>You can keep notes, photon, designs, drawings, recordings, videos – anything.</p>
  </div>
</div>
<div class="parallax bg-two" style="background-image: url('<?php echo base_url();?>/images/banner-3.jpg');"><div class="image-filter"></div></div>

<div class="modal last-modal" >
  <div class="banner-logo" style="background-image:url(<?php echo base_url();?>/images/logo.png);"></div>
  <h2>Get started with US now for free </h2>
  <div class="login-button-container">
  <div class="google-login button ">Google +</div><span>or</span>
  <a href="<?php echo $fburl; ?>"><div class="facebook-login button ">Facebook</div></a>
</div>
</div>
<div class="modal footer" >
  <div>e-notes</div>
  <div><a href="<?php echo base_url(); ?>/termsncondn">Privacy and Terms</a></div>
  <div class="right">&#169; 2017 All copyrights reserved</div>
</div>


<footer>
</footer>


    <script src="http://localhost:35729/livereload.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

    <script src="<?php echo base_url();?>javascripts/landingpage.js"></script>
    <script src="<?php echo base_url();?>javascripts/gplus.js"></script>
    <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>

<script>

$(document).ready(function(){
var flag=0;
  $( ".mobile-menu" ).click(function(){
    if(flag==0){
    $( ".mobile-menu" ).addClass("is-active");
    flag=1;
  }

    else
    {
        $( ".mobile-menu" ).removeClass("is-active");
      flag=0;
    }
  });

  $( ".mobile-menu" ).click(function() {
$(".mobile-submenu").toggle();
  });




});

$(window).scroll(function () {
    var scroll= $(window).scrollTop();
if(scroll> 579){
  $(".desktop-nav-bar").css({"background-color": "#fff", "border-bottom": "1px solid #f2f2f2"});
  $(".desktop-nav-bar div").css({"color": "#000"});
}
if(scroll< 579){
  $(".desktop-nav-bar").css({"background-color": "transparent", "border-bottom": "0px solid #f2f2f2"});
  $(".desktop-nav-bar div").css({"color": "#fff"});
}
});



</script>
<script>startApp();</script>

</body>
</html>
