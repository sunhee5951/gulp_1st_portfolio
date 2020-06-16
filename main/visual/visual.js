$(document).ready(function(){

	/*---------------전역변수 부--------------- */

    var slideInfo = [
        {imgSrc:'img/main/visual/img/photo1.jpg'},
        {imgSrc:'img/main/visual/img/photo5.jpg'},
        {imgSrc:'img/main/visual/img/photo3.jpg'}
    ]
    var $visualframe = $('#visual');
	var $btns = $visualframe.find('.navi>li');
	var $panel = $visualframe.find('.panel');
	var $motionBox = $visualframe.find('#motionBox>div');
	var speed = 1000;
    var isAnimated = true;
	

	/*---------------이벤트 바인딩--------------- */

    //비주얼 로딩 이밴트
	createList($panel,slideInfo);

    //비주얼 클릭 이벤트
	$btns.on('click',function(){
		var i = $(this).index();
		var isOn = $(this).hasClass('on');	
		
		if(isAnimated && !isOn){			
			moveSlide(i);
			isAnimated = false;		
		}
							
	});
    
	 /*---------------함수 정의부--------------- */
	 
     function createList(target,data){
		for(var i=0; i<data.length; i++){
			var imgSrc = data[i].imgSrc;
	
			target.append(
				$('<li>')
					.css({
						backgroundImage : 'url('+imgSrc+')'
					})
			)
		}
	}

    function moveSlide(index){
		$panel.children('li').removeClass('on');
		$motionBox.removeClass('on');
		$panel.stop().animate({marginLeft : (index* -100)+'%' },speed,function(){
			$panel.children('li').eq(index).addClass('on');
			$motionBox.eq(index).addClass('on');
			isAnimated = true;
		});
		$btns.removeClass('on');
		$btns.eq(index).addClass('on');	
		

	}	

})