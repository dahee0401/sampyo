$(function(){

  const $language = $('header>nav>.lnb>li>a.language');

  const $mainMnu = $('header>nav>.gnb>li');
  const $subMnu = $('.sub');

  const $container = $('section>.slide-container>.slide');
  const $indicator = $('section>.slide-container>.slide-pagination>li>a');
  const $play = $('section>.slide-container>.play');
  const $prev = $('section>.slide-container>.prev');
  const $next = $('section>.slide-container>.next');
  let intervalKey = null;

  let nowIdx = 0;
  

  function slideMove(){
    $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    $container.stop().animate({left:-(nowIdx*940)});
  }

  function nextIdx(){
    if(nowIdx<2){
      nowIdx++;
    }else{
      nowIdx = 0;
    }
  }

  function autoPlay(){
    intervalKey = setInterval(function(){
      nextIdx();
      slideMove();
    },2000);
  }

  function autoStop(){
    clearInterval(intervalKey);
  }

  //menu
  $mainMnu.on('mouseenter',function(){
    nowIdx = $mainMnu.index(this);

    $mainMnu.eq(nowIdx).find('.sub').show();
  });

  $mainMnu.on('mouseleave',function(){
    $subMnu.hide();
  });

  $('header>nav>.gnb>li>a').focus(function(){
    $('.sub').stop().slideUp();
    $(this).parent().find('.sub').stop().slideDown();
  });

  $('.last>a').blur(function(){
    $('.sub').stop().slideUp();
  });//end of menu

  //slide
  $indicator.on('click',function(evt){
    evt.preventDefault();
    nowIdx = $indicator.index(this);

    autoStop();
    slideMove();
    $play.removeClass('on');
  });//end of slide indicator

  $('.slide-container').on('mouseover',function(){
    $prev.stop().animate({left:0}).show();
    $next.stop().animate({right:0}).show();
  });

  $('.slide-container').on('mouseout',function(){
    $prev.stop().animate({left:-42}).hide();
    $next.stop().animate({right:-42}).hide();
  });
  
  $prev.on('click',function(){
    autoStop();

    if(nowIdx>0){
      nowIdx--;
    }else{
      nowIdx = 2;
    }

    slideMove();
    $play.removeClass('on');
  });

  $next.on('click',function(){
    autoStop();

    nextIdx();
    slideMove();
    $play.removeClass('on');
  });//end of slide next/prev

  $play.on('click',function(){ 
    if($play.hasClass('on')==true){
      autoStop();
      $play.removeClass('on');
    }else{
      autoPlay();
      $play.addClass('on');
    }
  });//end of slide play;

  autoPlay();
});

//people slide
$(function(){
  const $container = $('section>.content2>.story-container>.storys>li');
  const $indicator = $('section>.content2>.story-container>.storys>li>h2>a');
  const $play = $('section>.content2>.story-container>.play');
  const $pause = $('section>.content2>.story-container>.pause');
  const nowIdx = 0;
  let intervalkey = null;

 
  function slideMove(){
    $container.filter('.on').stop().fadeOut().removeClass('on');
    $container.eq(nowIdx).stop().fadeIn().addClass('on');
  }

  function nextIdx(){
    if(nowIdx<1){
      nowIdx++;
    }else{
      nowIdx = 0;
    }
  }

  function autoPlay(){
    intervalkey = setInterval(function(){
      nextIdx();

      slideMove();
    },2000);
  }

  function autoStop(){
    clearInterval(intervalkey);
  }


  $indicator.on('click',function(evt){
    evt.preventDefault();
    autoStop();

    if($indicator.parent().hasClass('on') == false){
      nextIdx();
      slideMove();
    }
  });

  $play.on('click',function(){
    autoStop();
    autoPlay();
  });

  $pause.on('click',function(){
    autoStop();
  });

  autoPlay();
});

//familyOpen, top button
$(function(){
  const $famOpen = $('.famOpen');
  const $top = $('.top');

  $famOpen.on('click',function(evt){
    evt.preventDefault();
    $(this).parent().find('ul').fadeToggle();
  });//end of familyOpen

  $top.on('click',function(evt){
    evt.preventDefault();
    $('html, body').stop().animate({scrollTop:0},500);
  });
  //end of top
});