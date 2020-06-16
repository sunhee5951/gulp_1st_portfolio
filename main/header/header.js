$(document).ready(function(){	

    /*---------------전역변수 부--------------- */
    var $skip_a = $('#skip a');
    var $header = $('#header');
    var $gnb = $('#gnb');
    var $gnb_li = $gnb.children('li');
    var $gnb_li_a = $gnb_li.children('a');
    var $gnb_li_ul = $gnb_li.children('ul');
    var $gnb_li_ul_li_a = $gnb_li_ul.find('a');

    var ht_max = 0;
    var ht_header = $header.height();
    var bgColor = $gnb_li_ul_li_a.css('background-color');
    var speed = 500;
    var doneClose = true;


    /*---------------이벤트 바인딩--------------- */

    //헤더클릭 이벤트
    $('.btnCall').on('click',function(){        
        if( $(this).hasClass('on') ){
            $(this).removeClass('on');
            $('.gnbMenu').removeClass('on');
        }else{
            $(this).addClass('on');
            $('.gnbMenu').addClass('on');
        }        
    });

    //스킵네비 이벤트
    $skip_a.on('focusin',function(){
        $(this).addClass('on');
    });
    $skip_a.on('focusout',function(){
        $(this).removeClass('on');
    });
    
    //로딩시 bgSub의 높이값 설정
    getSubMaxHeight();

    //gnb영역에 마우스 오버시 2depth. bgGnb 보임
    $header.on('mouseenter',openSub);    

    //gnb영역에 마우스 아웃시 2depth, bgGnb안보임
    $header.on('mouseleave', closeSub);   

    //gnb 1depth a태그에 포커스(탭키) 이벤트 연결   
    $gnb_li_a.on('focusin',openSub);    
    $gnb_li.last().find('a').last().on('focusout',closeSub);   

    //1depth메뉴 활성화 유지    
    $gnb_li.on('mouseenter',function(){
        $(this).children('a').addClass('on');
    });
    $gnb_li.on('mouseleave',function(){
        $(this).children('a').removeClass('on');
    });   


     /*---------------함수 정의부--------------- */
     
    function getSubMaxHeight(){
        $gnb_li.each(function(i){
            var current_ht = $(this).children('ul').height();
            ht_max = Math.max(ht_max, current_ht);        
        });       
    }

    function openSub(){
        var isBgGnb = $('.bgGnb').length;

        if(!isBgGnb){
            $('header>.inner').prepend(
                $('<div class="bgGnb">').css({
                    width:'100%', height:ht_max,
                    backgroundColor:bgColor,
                    position:'absolute', top:ht_header, left:'0%',
                    zIndex:'1', display:'none'
                })
            );
        }  
        
        if(doneClose){
            doneClose = false;
            $gnb_li_ul.stop().slideDown(speed);
            $('.bgGnb').stop().slideDown(speed);
        }
        
    }

    function closeSub(){
        $gnb_li_ul.slideUp(speed-300);
        $('.bgGnb').slideUp(speed,function(){
            $(this).remove();
            doneClose = true;
        });
    }  
   
 
	
});
