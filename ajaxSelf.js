/*
 * 客户端请求，服务端响应
 *
 * */
window.$= {};
$.ajax_self = function (options) {

    if(!options || typeof options != 'object') return false;
    //参数处理
    var type = options.type || 'get';
    var url = options.url || location.pathname;
    var async = options.async === false ? false : true;
    var data = options.data || {};
    var dataStr = "";
    for(var key in data){
        dataStr += key+"="+data[key]+"&";
    }
    dataStr = dataStr && dataStr.slice(0,-1);

    //发送请求
    var xhr = new XMLHttpRequest();
    xhr.open(type,type == 'get' ? url+"?"+dataStr : url,async);
    if(type == 'post'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    }
    xhr.send(type == 'get' ? null : dataStr);

    //响应
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var contentType = xhr.getResponseHeader('Content-Type');
                var result = null;
                //响应结果格式的判断
                if(contentType.indexOf('xml') > -1){
                    //xml格式数据
                    result = xhr.responseXML;
                }else if(contentType.indexOf('json') > -1){
                    //json格式数据
                    result = JSON.parse(xhr.responseText);
                }else{
                    //string格式数据
                    result = xhr.responseText;
                }
                //success--响应成功执行回调函数
                options.success&&options.success(result);
            }else{
                //请求失败
                options.error&&options.error({status:xhr.status,statusText:xhr.statusText});
            }
        }
    };


};
