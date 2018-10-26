var http = require("http");
var url = require("url");
var fs = require('fs');
 
function start() {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    if(pathname&&pathname!="/"){
        route(pathname,response);
        return;
    }
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }
 
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}
function route(pathname,response) {
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
           console.log(err);
           // HTTP 状态码: 404 : NOT FOUND
           // Content Type: text/plain
           response.writeHead(404, {'Content-Type': 'text/html'});
        }else{             
           // HTTP 状态码: 200 : OK
           // Content Type: text/plain
           var type="text/html";
           if(pathname.substr(1).split('.').length>1){
             type=pathname.substr(1).split('.')[1];
             switch(type){
               case 'html':
               type="text/html";
               break;
               case 'js':
               type="text/js";
               break;
               case 'css':
               type="text/css";
               break;
             }
           }
           response.writeHead(200, {'Content-Type': type});    
           
           // 响应文件内容
           response.write(data.toString());        
        }
        //  发送响应数据
        response.end();
     });   
  }
  start();
exports.start = start;