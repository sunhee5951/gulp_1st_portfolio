window.onload = function(){
    /*------------------------전역변수 부------------------------ */
        
        var mapContainer = document.getElementById('map');  //카카오맵에 표시될 DOM지정
    
        //지도를 생성할 때 필요한 기본옵션, 표시할 지역의 경도, 위도, 줌레벨 설정하여 인스턴스 생성
        var mapOption = { 
            center: new kakao.maps.LatLng(37.5117979,127.0571645), //지도의 중심좌표
            level: 4    //지도의 레벨(확대, 축소 정도)
        };
    
        //map 인스턴스 생성
        var map = new kakao.maps.Map(mapContainer, mapOption); 
    
        //마커옵션 생성
        var markerOptions = [
            {
                title: '본점',
                latlng: new daum.maps.LatLng(37.5117979,127.0571645),   //위도와 경도
                imgSrc : '../../img/sub/location/img/map.png',              //마커이미지 주소
                imgSize : new daum.maps.Size(246,108),                     //마커이미지의 크기
                imgPos : {offset: new kakao.maps.Point(123, 54)},       //마커이미지의 옵션, 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
                button : document.getElementById('branch1')
            },
            {
                title: '지점',
                latlng: new daum.maps.LatLng(37.505814,126.7509743),    //위도와 경도
                imgSrc : '../../img/sub/location/img/map2.png',             //마커이미지 주소
                imgSize : new daum.maps.Size(246,108),                     //마커이미지의 크기
                imgPos : {offset: new kakao.maps.Point(123, 54)},      //마커이미지의 옵션, 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
                button : document.getElementById('branch2')
            },
        ];
    /*------------------------이벤트 바인딩--------------------------- */
        //좌표값과 마커이미지 갯수만큼 반복을 돌며 마커생성하고 버튼 이벤트 연결
        for(var i=0; i<markerOptions.length; i++){
            new daum.maps.Marker({
                map : map,                                      //마커를 표시할 지도
                position : markerOptions[i].latlng,     //마커를 표시할 위치
                title : markerOptions[i].title,             //마커의 타이틀
                image : new daum.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)    // 마커이미지에 주소,크기,이미지좌표를 담음
            });    
    
            if(markerOptions[i].button){
                (function(index){
                    markerOptions[index].button.onclick = function(){   //마커옵션을 클릭했을때
                        moveTo(markerOptions[index].latlng);    //moveTo()함수실행
                        //console.log(index);
                    }
                })(i); 
            }
        }    
    
    /*--------------------함수 정의부----------------------- */
        function moveTo(target){
            var moveLatLan = target;
            map.setCenter(moveLatLan);  //지도의 중심좌표를 결과값으로 받은 위치로 이동
            return false;
        }
       
    
        //스카이뷰 컨트롤 표시
        var mapTypeControl = new daum.maps.MapTypeControl();    //일반지도와 스카이뷰로 지도타입을 전환할 수 있는 지도타입 컨트롤을 생성
        map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT); // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // daum.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    
    
        //줌 컨트롤 표시
        var zoomControl = new daum.maps.ZoomControl(); // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        map.addControl(zoomControl, daum.maps.ControlPosition.BOTTOMRIGHT);
    
    
        //드래그기능
        setDraggable(true);     // 활성화           
        function setDraggable(draggable) {// 버튼 클릭에 따라 지도 이동 기능을 막거나 풀고 싶은 경우에는 map.setDraggable 함수를 사용합니다
            map.setDraggable(draggable);    // 마우스 드래그로 지도 이동 가능여부를 설정
        }
    
    
        //줌기능
        setZoomable(false); //비활성화
        function setZoomable(zoomable) {          
            // 버튼 클릭에 따라 지도 확대, 축소 기능을 막거나 풀고 싶은 경우에는 map.setZoomable 함수를 사용합니다
            map.setZoomable(zoomable);    //마우스 휠로 지도 확대,축소 가능여부를 설정
        }
    
        
    
    
        //버튼클릭시 교통정보 표시 
        /*   
        var t_on = document.getElementById('t_on');
        var t_off = document.getElementById('t_off');
    
        t_on.onclick = function(){
            map.addOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC);
            return false;
        }
        t_off.onclick = function(){
            map.removeOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC); 
            return false;
        } 
        */
    
        
        
    
       
        
    
    }