$(document).ready(function(){

    /*---------------------------전역변수 부--------------------------- */
    var url_basic = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9e0ce87b85e23ab90b03f10fd2d8cc4b&tags=handsome&format=json&nojsoncallback=1";

    var url_search = 'https://www.flickr.com/services/rest/?method=flickr.photos.search';   //검색 url

    var url_popular = "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList";    //인기 이미지 url

    var key = '0b06ca1f28966ea49c07175e2164c97c';   //발급받은 api 키값

    var version = navigator.userAgent; 
    //console.log(version);

    /*--------------------------이벤트 바인딩------------------------- */
    if(  /edge/i.test(version) && /chrome/i.test(version)  ){
        $('body').addClass('edge');
    }
    if(  /trident/i.test(version)  ){
        $('body').addClass('ie_old');
    }
    if(  /chrome/i.test(version) &&  !/edge/i.test(version) ){
        $('body').addClass('chrome');
    }

    setTimeout(function(){
        var $grid = $('.imgList').isotope({   // 모션적용될 박스의 부모태그 선택자
            itemSelector : "article",  //모션적용될 박스선택자
            columnWidth : "article",   //넓이값을 구할 박스선택자
            transitionDuration : '0.8s', //모션속도
            percentPosition : true  //박스넓이값이 고정: false, 퍼센트 : true
        });

        $('.gallery').addClass('on');
    },1000);

    getFlickr(url_popular,key);

    // imgPop 팝업 생성하는 이벤트
    $('body').on('click', '.imgList a', function(e){        //.imgList 안쪽에 a태그를 클릭하면
        e.preventDefault();
        var imgSrc = $(this).attr('href');                      //클릭한 요소의 href값을 imgSrc에 담음
        create_pop(imgSrc);
    });

    // .imgPop close버튼을 눌렀을때 팝업닫힘 이벤트
    $('body').on('click', '.imgPop span',function(){
        remove_pop();
    });

    //검색버튼 눌렀을때 실행되는 이벤트
    $('.search button').on('click',function(){
        var tags = $('.search input[type=text]').val();     // input[type=text]을 찾아서 value값을 구해서 tags에 담음 
        getFlickr(url_search,key, tags);                          //getFlickr 함수 실행
        $('.search input[type=text]').val('');                   // getFlickr함수 실행 후 기존에 검색한 내용 지워짐
    });

    /*------------------------함수 정의부-------------------------- */

    function getFlickr(url,key, tags){ // getFlickr함수를 만들어 인수로 url, key, tags값을 받음
        $.ajax({                                //ajax객체로 데이터받음
            url : url,
            dataType : 'json',              //데이터타입은 json
            data : {                            //옵션값을 데이터객체로 따로 관리
                api_key : key,
                tags : tags,                //검색을 위해 tags받음
                privacy_filter : "5",     //모든 privacy이미지 불러옴
                per_page : "20",        //불러올 이미지 갯수
                tagmode : "any",        //any는 명령어를 2개넣었을때 하나만 있어도찾아줌
                format : "json",
                nojsoncallback : "1"
            }
        })
        .success(function(data){    //데이터가 성공적으로 불러지는지
            //console.log(data.photos.photo);
            var item = data.photos.photo; //item에 data라는 파라미터 안쪽에있는 photos의photo를 담음

            $('.imgList a').empty();        //검색기능을 위해 기존의 모든 태그이미지 지움


            $(item).each(function(index){   //위에서 담은 값을 제이쿼리에 담아 each문 돌림
                var farm = this.farm;           //이미지가 모아져있는 공간번호
                var server = this.server;      //이미지가 있는 위치
                var imgId = this.id;             //이미지의 고유 주소
                var imgSec = this.secret;    //이미지의 고유 비밀번호
                var tit = this.title;              //이미지의 제목

                $('.imgList')
                    .append(
                        $('<article>')
                            .append(
                                $('<div>')
                                    .append(
                                        $('<a>')    //a태그안쪽에  append로 <img>, <h2>만듬
                                            .attr('href','https://farm'+farm+'.staticflickr.com/'+server+'/'+imgId+'_'+imgSec+'_b.jpg')     //이미지의 고유 링크주소 넣음, 뒤에 _b는 이미지 사이즈 'big'을 뜻함
                                            .append(
                                                $('<img>')
                                                    .attr('src', 'https://farm'+farm+'.staticflickr.com/'+server+'/'+imgId+'_'+imgSec+'_m.jpg'),    //_m은 이미지사이즈 미디움을 뜻함
                                                    $('<h2>').text(tit)     //이미지의 제목 넣음
                                            )
                                    )
                                
                            )
                    );

            })
        })
        .error(function(){      //데이터 불러오는데 실패시 경고창
            alert('Fail to load Flickr Data!!!');
        })
    }
    function create_pop(src){
        $('body').append(       //이미지를 누르면 뜨는 팝업만듬
            $('<div class="imgPop">')
                .append(
                    $('<img>')
                        .attr('src', src),
                    $('<span>').text('close')   //닫기버튼
                )
                .hide()         
                .fadeIn()   //서서히 나타나게 하기위해 fadeIn사용
                .css('display','flex')  //fadeIn으로 인해 display:block이 되므로 다시 display값을 flex로 덮음
        )
    }
    function remove_pop(){
        $('.imgPop').fadeOut(500, function(){   //콜백함수를 이용해 .imgPop이 0.5초뒤에 사라지면서 제거됨
            $(this).remove();
        })
    }
})

/*
            //flickr image 주소 구조
            https://farm66.staticflickr.com/4000/1234_5678_b.jpg
            _s : 74,
            _t : 100,
            _m : 240,
            _b : 1025,
            _h : 1600,
            _k : 2048
*/