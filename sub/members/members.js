$(document).ready(function(){

var $form = $('#join');
var $required = $('.required');
var $terms = $('input[name=terms');
var $pwd = $('input[type=password]').eq(0);
var $pwd2 = $('input[type=password]').eq(1);
var $reset = $('input, td, textarea');


//이벤트 핸들러함수 바인딩
$form.on('submit',function(e){
    e.preventDefault();

    $reset.removeClass('red');

    var agreed = $terms.is(':checked');
    var pwd = $pwd.val();
    var pwd2 = $pwd2.val();
    var len = $required.length;

    //약관동의 체크
    check_terms(agreed);

    //필수텍스트요소 반복을 돌면서 체크
    check_text(len);

    //비밀번호 매칭 체크
    check_pwd(pwd,pwd2);

    //위의 체크 결과값이 모두 true이면 회원가입 승인 처리
    if(isAgreed && isPwd && isRequired) confirm();
});
function confirm(){
    alert('회원가입이 완료되었습니다.');
    $required.val('');
    $terms.prop('checked',false);
}

function check_pwd(pwd,pwd2){
    if(pwd !== pwd2){
        alert('비밀번호를 동일하게 입력해주세요.');
        $pwd.addClass('red');
        $pwd2.addClass('red');
        isPwd = false;
    }else{
        isPwd = true;
    }
}

function check_terms(agreed){
    if(!agreed){
        alert('약관을 동의해주세요.');
        $('textarea').addClass('red');
        isAgreed = false;
    }else{
        isAgreed = true;
    }
}

function check_text(len){
    var i=0;
    $required.each(function(){
        var data = $(this).val();
        var txt = $(this).attr('placeholder');
        if(!data){
            alert(txt);
            $(this).addClass('red');
        }else{
            i++;
        }
    })

    if(i !==len){
        isRequired = false;
    }else{
        isRequired = true;
    }
}

});
