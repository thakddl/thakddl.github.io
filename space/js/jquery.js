$(document).ready(function(){
  //document setting
  $(document).on("dragstart selectstart", function(){
    return false;
  });
  //함수 setting
  var sw=false; //메뉴바 활성화 상태 
  function moon_int() //메뉴바 함수
  {
    if(sw==false){
      $("#moon").css("animation", "circle 4s 1 ease-out");
      for(var a=0; a<5; a++){
        $(".gnb li:eq("+a+")").css({"transform":"translateX(0px)", "opacity":"1", "transition-delay":a*0.2+"s"});
      }
    } else{
      $("#moon").css("animation", "scale 4s infinite linear");
      var d = 0;
      for(var a=4; a>-1; a--){
        d++
        $(".gnb li:eq("+a+")").css({"transform":"translateX(300px)", "opacity":"0", "transition-delay":d*0.2+"s"}
        );
      }
    } sw=!sw;
  }

  function fishing() //location mark 
  {
    var ht = $(window).height(); 
    var st = $("body").scrollTop();
    let idx = parseInt(st/ht);
    tar = $(".gnb li").eq(idx);
    tar_idx = tar.index();
    var ofs = tar.offset();
    var ofl = parseInt(ofs.left);
    var oft = parseInt(ofs.top);
    var wd = tar.width();
    $("#float").stop().fadeOut(100);
    $("#fishing").stop().fadeOut(200,function(){
      $("#fishing").css({"left": ofl+wd-10+"px","top":oft-15+"px"}).stop().fadeIn(300);
    });
  }
  
  //moon_int bar on/off
  $("#moon").click(function(){
    var scr = parseInt($("body").width());
    $("#info").fadeOut(500);
    if (scr>=1200){ //데스크탑일때
      if ( sw==false ){
        $("#hide").css("display","block");
        setTimeout(moon_int,10);
        setTimeout(fishing,1600);
      } 
      else { moon_int();
        setTimeout(function(){$("#fishing").fadeOut();},800);
        setTimeout(function(){$("#hide").css("display","none");}, 2000); 
      }
    }
    else { //모바일, 타블렛일때
      if ( sw==false ){
        $("#hide").css("left","0");
        setTimeout(moon_int,10);
        setTimeout(fishing,1600);
      } 
      else { moon_int();
        setTimeout(function(){$("#fishing").fadeOut();},800);
        setTimeout(function(){$("#hide").css("left","100%");}, 2000); 
      }
    }

  });

  //페이지 이동 
  var idx;
  $(window).on("mousewheel", function(e){
    var ht = $(window).height(); 
    if(e.originalEvent.wheelDelta < 0){
      $("#info").fadeOut(500);
      $("body, html").not(":animated").animate({"scrollTop":"+="+ht+"px"}, 900, 'easeOutQuad');
    } else {
      $("html, body").not(":animated").animate({"scrollTop":"-="+ht+"px"}, 900, 'easeOutQuad');
    }
  });
  $(document).keyup(function(event){
    var ht = $(window).height(); 
    if(event.keyCode==40){
      $("#info").fadeOut(500);
      $("body, html").not(":animated").animate({"scrollTop":"+="+ht+"px"}, 900, 'easeOutQuad');
    } else if(event.keyCode==38){
      $("html, body").not(":animated").animate({"scrollTop":"-="+ht+"px"}, 900, 'easeOutQuad');
    }
  });
  // gnb li cilck 
  $(".page").each(function(index){//set page offset.top
    var pgtop = $(this).offset().top;
    $(this).attr("data-top", pgtop);
  });
  $(".gnb li").click(function(){
    var scr = parseInt($("body").width());
    idx = $(this).index();
    let otp = parseInt($(".page_wrap .page").eq(idx).attr("data-top"));
    $("body, html").stop().animate({"scrollTop":otp+"px"}, 900, 'easeOutQuad');
  });
  $("nav").click(function(){
    var scr = parseInt($("body").width());
    if(scr<1200){
      moon_int();
      $("nav").css({"left":"100%"});
      $("#fishing").css("display","none");
    }
  });

  //gnb li mouseover effect
  $(".gnb li").mouseover(function(){
    var ht = $(window).height(); 
    var scr = parseInt($("body").width());
    if(scr>=1200){
      var lf=$(this).offset();
      var wd=$(this).width();
      idx = $(this).index();
      var st = $("body").scrollTop();
      var sc_idx = parseInt(st/ht);
      if( idx==sc_idx ) { $("#float").stop().fadeIn(200).css({"animation":"rotate 2s infinite linear", "left": lf.left-50+"px","top":top+"px"}); }
      else {
        $("#float").stop().fadeIn(200).css({"animation":"float 2s infinite linear", "left": lf.left+wd+10+"px","top":top+"px"});
      }
    }
  });
  $(".gnb li").mouseout(function() {
    $("#float").stop().fadeOut(200);
  });
  
  //scroll effect 
  $("body").scroll(function() { 
    if(sw==true){ setTimeout(function() { fishing(); }, 920); }
    $("#info").fadeOut(500);

    abOfs = $("#about").offset().top;
    if( 0<=abOfs){
      function pl(){
        $("#ab_box").fadeTo(300,1);
        for (id=-1; id<=4; id++ ){
          $("#card > li:eq("+id+")").css("transition-delay",id*0.2+"s");
          $("#card > li:eq("+id+")").addClass("on");
        } 
      }setTimeout(function () { pl(); },600);
    } 
    
    alOfs = $("#ability").offset().top;
    var scr = parseInt($("body").width());
    if(scr>=1200 && 0!=alOfs){
      ring_reset();
    }

    conOfs = $("#contact").offset().top;
      if(0==conOfs){
      $("#rocket").css("animation","rocket 8s ease-out infinite");
    } 
  });
  
  //planets control
  sw2=true;//점수 멈춤 기능
  function ring_reset()//
  { 
    sw2=false;
    var scr = parseInt($("body").width());
    if (scr>=1200){
      $("#ring_tit").text("Cilck planets.");
      $("#ability_box li").stop().css("display","none"); 
      $("#ring_wrap").css({"width":"25vh", "heigth":"25vh", "top":"22%", "left":"15%" });
      $("#planet_box").css({"width":"87%", "transform":"translate(0%)"});
    }
    else {
      $("#ring_tit").text("Cilck planets.");
      $("#ability_box li").stop().css("display","none"); 
    }
  }

  // 링클릭시 ability 화면 리셋
  $("#ring").click(function(){
    ring_reset();
  });

  $(".planet_wrap").click(function(){
    sw2=true;
    var scr = parseInt($("body").width());
    if (scr>=1200){
      $("#ring_wrap").css({"width":"21vh", "heigth":"21vh", "top":"17%", "left":"9%"});
      $("#planet_box").css({"width":"60%", "transform":"translate(25%)"});
    } 
    
    var name = document.getElementById("ring_tit");
    var idx = $(this).index();
    var arr = [95,92,"developing..",88,65,72];
    var score = arr[idx]; var x = 30;
    function counter(){
      if(sw2==false){ return false; }//or x=score;
      else {
        if ( typeof score != typeof x ) { //문자일 경우(숫자가 아닐경우)
          name.innerText = score;
        } else if( x++<score ){
          name.innerText = x+"%";
          setTimeout(counter, 1);
        }
      }  
    } counter();
    
    $("#ability_box li.ability_con:eq("+idx+")").stop().slideDown(1000);
    $("#ability_box li.ability_con:eq("+idx+")").siblings().stop().css("display","none");
  });

  //mobile ability click effect
  $(".ability_works dt").click(function(){
    var scr = parseInt($("body").width());
    if(scr<1200){
      $(".ability_works dd").animate({"height":"20vh"},1000);
    }
  });
  $(".bx").click(function(){
    var scr = parseInt($("body").width());
    if(scr<1200){
      $(".img_box").animate({"margin-top":"0vh"},300);
    }
  });
  $(".planet").click(function(){
    var scr = parseInt($("body").width());
    if(scr<1200){
      $(".ability_works dd").css({"height":"0vh"});
      $(".img_box").animate({"margin-top":"-15vh"},300);
    }
  });

  //works hover effect
  $(".me").mouseover(function(){
    $("#real").css({"display":"block"});
    $("#charlee").css({"display":"none"});

    $("#hover").text("Just tell me your style what you want.").css({"transform":"rotateZ(10deg) translateY(-150%) translateX(15%)", "font-size":"24px"});
  });
  $(".me").mouseout(function(){
    $("#real").css({"display":"none"});
    $("#charlee").css({"display":"block"});
    $("#hover").text("Mouseover Me ! !").css({"transform":"rotateZ(65deg)","font-size":"22px"});
  });

  //works tab
  $(".tab li").click(function(){
    $(this).addClass("on");
    $(this).siblings().removeClass("on");
    var tabIdx = $(this).index();
    if ( tabIdx==0 ){  
      $(".grid__item").removeClass("on");
      $(".grid__item").filter(".re").addClass("on");
    } else if ( tabIdx==1 ){  
      $(".grid__item").removeClass("on");
      $(".grid__item").filter(".mo").addClass("on");
    } else if ( tabIdx==2 ){  
      $(".grid__item").removeClass("on");
      $(".grid__item").filter(".de").addClass("on");
    }
  });
});
