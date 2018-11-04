var name;
function submit(){
	var msg=$("#msg").val();
	$("#msg").val("");
	websocket.send({"msg":msg,"name":name});
}
function onmessage(data){
	setMessageInnerHTML(data);
	
}
function setMessageInnerHTML(innerHTML){
	show(innerHTML);
	} 
function show(data){
	if(data!=""){
	   var html="<li class='room-chat-item'><span class='room-chat-user-name'>"+data.name+"：</span><span class='room-chat-content'>"
	    +data.msg+"</span></li>";
	    $(".list").append(html);
	 }
}
function set(){
	if($('#name123').val()!=""){
		$("#name").html($('#name123').val());
	}
}
ref = setInterval(function(){
    if($("#name").text()!=""){
		clearInterval(ref);
		name=$("#name").text();
		websocket.open();
		$('.tip').hide();

	};
},1000);