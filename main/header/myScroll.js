(function($){

    $.defaults = {
        btns : '#navi>li',
        speed : 1000,
        base : 0,
        active : 'on'
    }

    $.fn.myScroll = function(option){
        option = $.extend(null,$.defaults, option);
        new MyScroll(this, option);
        return this;
    }

    function MyScroll(selector, option){
        var self = this;
        self.option = option;
        self.init(selector);
        //처음 로딩시 동적으로 만들어지는 DOM의 시간을 벌어주기 위해 1초뒤에 섹션별 offset.top값을 저장
        setTimeout(function(){
            self.setPos();
        },1000);
        //this.setPos();
        self.bindingEvent();
    }    

    MyScroll.prototype.init = function(selector){
        this.$body = $('html,body');
        this.$footer = $('#footer');
        this.$boxs = $(selector);             
        this.$btns = $(this.option.btns);
        this.len = this.$btns.length;
        this.speed = this.option.speed;
        this.base = this.option.base;
        this.active = this.option.active;
        this.pos = [];
    }

    MyScroll.prototype.setPos = function(){
        var self = this;
        self.pos = [];
        
        //소수점으로 쪼개질 경우 정수로 변환
        $(self.$boxs).each(function(){
            self.pos.push( parseInt($(this).offset().top));           
        }); 
        self.pos.push(parseInt(self.$footer.offset().top + self.$footer.height()));
        //console.log(self.pos);
    
    }  

    MyScroll.prototype.bindingEvent = function(){
        var self = this;

        $(window).on('resize',function(){
            self.setPos();
        });

        $(window).on('scroll',function(){
            var scroll = $(window).scrollTop();
            self.activation(scroll);
        });

        self.$btns.on('click',function(e){
            e.preventDefault();
            var target = $(this).children('a').attr('href');
            self.moveScroll(target);
        })
    }

    MyScroll.prototype.activation = function(scroll){
        this.$btns.removeClass(this.active);
        this.$boxs.removeClass(this.active);

        for(var i=0; i<this.len; i++){
            if(scroll>=this.pos[i]+this.base && scroll<this.pos[i+1]+this.base){
                this.$btns.eq(i).addClass(this.active);
                this.$boxs.eq(i).addClass(this.active);
            }
        }
    }

    MyScroll.prototype.moveScroll = function(target){
        var target_pos = parseInt($(target).offset().top);
        console.log(target_pos);
        this.$body.stop().animate({scrollTop : target_pos},this.speed);
    }

})(jQuery);