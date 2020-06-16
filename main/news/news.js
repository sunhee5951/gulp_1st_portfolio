$(document).ready(function(){
    /*---------------전역변수 부--------------- */
    var $newsframe = $('#news>.inner>.wrap');
	var $news = $newsframe.find('ul>li');
    var $newsBtn = $newsframe.find('.newsBtn>a');
    
    /*---------------이벤트 바인딩--------------- */
    //뉴스 탭메뉴버튼 클릭
	$newsBtn.on('click',function(e){
		e.preventDefault();
		var $this = $(this);

        activation($this);
        activation2($this);
    });

    /*---------------함수 정의부--------------- */
    function activation(item){
		var target = item.attr('href');

		$news.hide().removeClass('on');
        $(target).show();
        
		setTimeout(function(){
            $(target).addClass('on');
			$news.stop().animate({marginTop : (item* -100)+'%' });
		},500);

		$newsBtn.removeClass('on');
        item.addClass('on');
    }

    function activation2(abc){
		var target = abc.attr('href');
        
        $news.hide().removeClass('abc');
        $(target).show();
		
		setTimeout(function(){
            $(target).addClass('abc');
			$news.stop().animate({marginTop : (abc* -100)+'%' });
		},500);

        $newsBtn.removeClass('abc');
        abc.addClass('abc');
    }
});