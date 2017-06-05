var myBoxes = $('.modal');
var myBoxes2 = $('.parallax');
var opacity1 =$('.banner');
//$(".left-container").css({"z-index": "100", "visibility": "visible"});

$(window).scroll(function(){
  var scrollTop = $(window).        scrollTop();
    $('.banner').css({ 'opacity': 1-(scrollTop/450) });
    $('.down-arrow').css({ 'opacity': 1-(scrollTop/100) });


  /*  if(scrollTop<1930)
    {
      $(".last-modal").css({"position": "relative","top":"0px"});

    }*/
  //  $('.left').text("test"+current);

    myBoxes.each(function(){
      var $this = $(this);
      var scrollspeed = parseInt($this.    data('scroll-speed'))*10,
      offset = - ((scrollTop*10) / scrollspeed)*2;
      $this.css('transform',   'translateY(' + offset + 'px)');
      $this.css('-webkit-transform',   'translateY(' + offset + 'px)');
      $this.css('-moz-transform',   'translateY(' + offset + 'px)');
      $this.css('-o-transform',   'translateY(' + offset + 'px)');

    });
    myBoxes2.each(function(){
      var $this = $(this);
      var scrollspeed = parseInt($this.    data('scroll-speed'))*10,
      offset = - ((scrollTop*10) / scrollspeed)*2;
      $this.css('transform',   'translateY(' + offset + 'px)');
      $this.css('-webkit-transform',   'translateY(' + offset + 'px)');
      $this.css('-moz-transform',   'translateY(' + offset + 'px)');
      $this.css('-o-transform',   'translateY(' + offset + 'px)');
    });









 });
