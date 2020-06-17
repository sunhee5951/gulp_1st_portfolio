$(document).ready(function(){

    var $boxs = $('section');
    var $btns = $('#navi li');
    var posArr = [];
    var colors = [];
    var speed = 1000;
    var base = -300;

    $boxs.each(function(){
        posArr.push( $(this).offset().top );
    });
    //console.log(colors);
    
    posArr.push( $boxs.last().offset().top + $boxs.last().outerHeight() );

    $(window).on('scroll',function(){
        var scroll  = $(this).scrollTop();

        $btns.removeClass('on');
        $boxs.removeClass('on');

        for(var i=0; i<posArr.length; i++){
            if(scroll>=posArr[i]-300 && scroll<posArr[i+1]-300){
                $btns.eq(i).addClass('on');
                $boxs.eq(i).addClass('on');
            }
        }
    });

    $btns.on('click',function(e){
        e.preventDefault();
        var target = $(this).children('a').attr('href');
        var target_pos = $(target).offset().top;

        $('html,body').stop().animate({scrollTop : target_pos}, speed);
    });

    $boxs.on('mousewheel',function(event, delta){
        event.preventDefault();

        var i = $(this).index();

        if(delta>0){
            if(i !== 0 ){
                var prev_pos = $(this).prev().offset().top;
                $('html,body').stop().animate({scrollTop : prev_pos},speed);
            }
        }

        if(delta<0){
            if(i !== $boxs.length-1 ){
                var next_pos = $(this).next().offset().top;
                $('html,body').stop().animate({scrollTop : next_pos},speed);
            }            
        }
    })
    

});







