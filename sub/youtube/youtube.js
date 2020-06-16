$(document).ready(function(){

    /*---------------------------전역변수 부--------------------------- */
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems'; //api url주소
    var key ='AIzaSyCJblw-A3xN5oTiED0i6oC9Q6MJwNslYxY';     //발급받은 api키값
    var playlistId = 'PLvcHdaVY7tD-5pPTEq0M7qUNf3qZqyHVR';   //유투브 채널의 playlist


    var options = {
        part: 'snippet',
        key: key,                   //api키값
        maxResults: 10,         //유투브영상을 총 몇개 불러올껀지
        playlistId: playlistId   //불러올 playlist가 무엇인지
    }

    /*--------------------------이벤트 바인딩------------------------- */
    call_data();

    //youtube영상 li값을 클릭하면 실행되는 이벤트
    $('body').on('click','#list>li',function(){
        var vid_id = $(this).attr('data-vid');     // li의 속성값 videoId 값을 담음
        var vid_tit = $(this).find('h2').text();    //youtube제목을 담음
        var vid_des = $(this).find('p').text();    //youtube영상의 설명글 담음
        create_pop(vid_id, vid_tit, vid_des);     //create_pop()에 인수값을 넣어 실행
    });

    //span태그 close를 누르면 실행되는 이벤트
    $('body').on('click','.pop span',function(){    //close누르면 
        $('.pop').fadeOut(500,function(){           // .pop은 0.5초뒤에 서서히 사라지면서 제거됨
            $(this).remove();
        })
    })

    /*------------------------함수 정의부-------------------------- */
    //레이어팝업 생성
    function create_pop(id, tit, des){
        $('body').append(                //.pop 팝업을 동적으로 append해서 만듬
            $('<aside class="pop">')
                .css({
                    width:1000, padding:60, boxSizing:'border-box',
                    position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:4, backgroundColor:'#000'
                })
                .append(
                    $('<iframe>')
                        .attr({
                            width:'100%', height:600, src:'https://www.youtube.com/embed/'+id,
                            frameborder:0, allowfullscreen:true
                        }),
                        $('<h2>').text(tit).css('color','#fff'),
                        $('<p>').text(des).css('color','#fff'),
                        $('<span>')
                            .text('close')
                                .css({
                                    position:'absolute', top:20, right:20, fontSize:12,
                                    color:'#fff', cursor:'pointer'
                                })
                )
        )
    }

    //youtube 데이터 호출
    function call_data(){
        $.ajax({
            url : URL,                  //어떤 주소에서 불러올것인지
            dataType : 'jsonp',     //데이터타입 지정
            data : options           //data에 지정한 객체options 넣음
        })
        .success(function(data){    //데이터가 성공적으로 호출 시
            create_list(data);          //create_list()함수 실행
        })
        .error(function(){              //데이터 호출 실패 시
            alert('Fail to load Youtube data!!');      //경고창
        })
    }

    //youtube 리스트 생성
    function create_list(data){
        //console.log(data);
        $(data.items).each(function(index, item){       //each문 이용
            var thumb = item.snippet.thumbnails.medium.url;     //썸네일 이미지 주소값
            var title = item.snippet.title;                    // youtube제목
            var details = item.snippet.description;     // youtube영상의 설명글
            var details_len = details.length;              // 설명글의 길이
            var result = '';
            var vid_id = item.snippet.resourceId.videoId;   //동영상의 id값 
            var date = item.snippet.publishedAt.substring(0,10);    //실제 유튜브가 올라간날짜

            if(details_len>50){     //만약 설명글의 길이가 50이 넘으면
                result = details.substring(0,50)+'...';     //50자가 넘는 글자는 '...'으로 출력
            }else{                     //넘지않으면
                result = details;   //그대로 출력
            }

            // #list요소에 동적으로 li를 append
            $('#list').append(
                $('<li>')
                    .attr('data-vid', vid_id)

                    .append(
                        $('<div class="pic">').css({backgroundImage:'url('+thumb+')'}),
                        $('<div class="details">')
                            .append(
                                $('<h2>').text(title),
                                $('<p>').text(result),
                                $('<span>').text(date)
                            )
                    )
            )
        })
    }
})