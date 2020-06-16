$(document).ready(function(){

    /*---------------전역변수 부--------------- */
    //content 
	var $contentframe = $('#content>.inner>.wrap');
	var $contentbtns = $contentframe.find('.contentBox>ul>li>a');
	var $picBox = $contentframe.find('.picBox>ul>li');
    var $picDiv = $contentframe.find('.picBox>div');
    

     /*---------------이벤트 바인딩--------------- */
    //컨텐트 클릭 이벤트
	$contentbtns.on('click',function(e){
		e.preventDefault();

		var $this = $(this);

		activation($this);

    });
    
     /*---------------함수 정의부--------------- */
    function activation(item){
		var target = item.attr('href');

		//버튼 활성화
		$picBox.hide().removeClass('on');
		$(target).show();
		
		setTimeout(function(){
			$(target).addClass('on');
		},500);

		$contentbtns.removeClass('on');
		item.addClass('on');
	}
});