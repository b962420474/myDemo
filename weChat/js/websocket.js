/**
 * 
 */
var websocket=new function(){
    var ws;
    //ws.bufferedAmount  //表示已在WebSocket上发送但尚未写入网络的字节数。它对于调节发送速率很有用。 
    this.send=function(param){
            console.info('发送数据：' + JSON.stringify(param));  
            ws.send(JSON.stringify(param)); 
    }
    this.open=function(){
        var that=this;
        var url = 'ws://localhost:8080/weChat/websocket?name='+name;  
        ws = new WebSocket(url);
        ws.onopen = function (e) {  
            console.log('链接打开');  
            //e  Event 对象  
            console.info(e);  
            //that.send({"msg":name+"加入房间","name":"系统"}); 
            //e.target  --- 当前事件触发对象，也就是 new的WebSocket 对象  
        } 
        ws.onmessage = function (e) {  
            //e MessageEvent 对象  
            //e.data 从服务器发送过来的数据  
            console.info(e);  
            console.info('接受到数据：' + e.data);  
            onmessage(JSON.parse(e.data));
        }  
        ws.onclose = function (e) {  
            console.info(e);  
            console.log('closed');  
        }  
        ws.onerror = function (e) {  
            console.info(e);  
            console.log('发生异常');  
    }  
    }  
    
}