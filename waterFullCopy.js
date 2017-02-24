/**
 * 瀑布流插件(闭包形式封装)
 * 全局变量局部化，提高性能
 * */
(function($){

    //自定义插件
    $.fn.waterFull = function () {

        //获取父容器
        var $parentBox = $(this);
        //获取父容器宽
        var parWidth = $parentBox.width();
        //获取子容器
        var $childBox = $parentBox.children();
        //获取子容器宽
        var childWidth = $childBox.width();
        //定义列数
        var columns = 5;
        //计算间隙宽
        var spaceW  =  (parWidth-columns*childWidth)/(columns-1);

        //定义数组用于存储子盒子的高度值
        var arrHeight = [];
        //初始化第一行图片
        $childBox.each(function (index,item) {
            var $item = $(item);
            if(index < columns){
                //定位
                $item.css({
                    top:0,
                    left:index*(childWidth+spaceW)
                });
                arrHeight[index] = $item.height();
            }else{
                //求出最矮的子盒子
                var minHeight = arrHeight[0],
                    minIndex = 0;
                for(var i = 0;i < arrHeight.length;i++){
                    if(minHeight > arrHeight[i]){
                        minHeight = arrHeight[i];
                        minIndex = i;
                    }
                }
                $item.css({
                    top:minHeight+spaceW,
                    left:minIndex*(childWidth+spaceW)
                });
                //重置数组
                arrHeight[minIndex] = $item.height()+minHeight+spaceW;
            }
        });
        //撑开父盒子，设置父容器高
        var maxHeight = arrHeight[0];
        for(var i = 0;i < arrHeight.length;i++){
            if(maxHeight < arrHeight[i]){
                maxHeight = arrHeight[i];
            }
        }
        $parentBox.height(maxHeight);
    };

})(jQuery);