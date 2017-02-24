/*
 * 文字、图片向上滚动插件
 * 基于jQuery
 * */
(function ($) {
    $.fn.upScroll = function (options) {
        options = options || {};
        this.css("overflow","hidden");
        var scroll = (function (self) {
            return function(){
                //获取第一个li元素
                var $li = self.find("li:first");
                //获取li元素的高度
                var liH = $li.outerHeight();
                //判断li元素是否有margin值，无则为0
                var mTop = parseInt($li.css("marginTop")) || 0;
                //向上移动距离
                var upDistance = mTop - liH;
                $li.animate({
                    "marginTop":upDistance + "px"
                },options.speed || "slow", function () {
                    self.append($li);
                    //置0
                    $li.css("marginTop",mTop + "px");
                });
            }
        })(this);
        //定时向上滚动
        var timer = setInterval(scroll,options.times || 3000);
        //清除定时器
        this.hover(function () {
            clearInterval(timer);
        }, function () {
            timer = setInterval(scroll,options.timer || 3000);
        });
    }
})(jQuery);