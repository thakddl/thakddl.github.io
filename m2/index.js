$(document).ready(function(){
    var a = parseInt($(".vs_box li").width())
    function vsAni(){
        $(".vs_box").not(":animated").animate({"margin-left":-a+"px"}, 1000,
        function(){
            $(".vs_box li").eq(0).appendTo($(".vs_box"));
            $(".vs_box").css("margin-left", 0 );
        });
    } setInterval(function(){ vsAni(); }, 2000);
    var b = parseInt($(".slide_box li").width())
    function slideAni(){
        $(".slide_box").not(":animated").animate({"margin-left":-b+"px"}, 1000,
        function(){
            $(".slide_box li").eq(0).appendTo($(".slide_box"));
            $(".slide_box").css("margin-left","0px");
        });
    }
    setInterval(function(){ slideAni(); }, 2000);
    $("#gnb .menu li a").on("click",function(){
        var tar = parseInt($(this).attr("data-index"));
        var ofs = $("#page"+tar).offset();
        var sc = ofs.top;
        console.log(sc);
        $("body, html").animate({scrollTop:sc-80} ,500);
        $("#ck1").prop("checked",false);
    }); 
});