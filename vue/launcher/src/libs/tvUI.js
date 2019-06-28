import $ from "jquery"
var tvUI = new function() {
	var toastTimmer;
	this.alert = function(title,content,btn){
		var html = '<div class="tvUI-mask"><div class="tvUI-alert">';
		if(title) html += '<div class="tvUI-alert-title">'+title+'</div>';
		html += '<div class="tvUI-alert-content">'+content+'</div>';
		if(btn){
			html += '<div class="tvUI-alert-btnGroup">';
			$.each(btn,function(k,v){
				var active = v.active?' active':'';
				html += '<button class="tvUI-alert-btn'+active+'" onclick="'+v.fn+'">'+v.name+'</button>';
			});
			html += '</div>';
		}
		html += '</div></div>';
		var box = $(html);
		box.appendTo('body');
		var active = box.find('.active');
		if(active.length==0) active=box.find('.tvUI-alert-btn')[0];
		if(active.length==0) active=box;
		$(":focus").addClass('tvUI-mark');
		active.focus();
		box.on({
			keydown:function(e){
				if(e.keyCode==39){
					$(":focus").next().focus();
				}else if(e.keyCode==37){
					$(":focus").prev().focus();
				}else if(e.keyCode==27){
					tvUI.close();
				}
			}
		});
		
		this.close = function(){
			$('.tvUI-mask').remove();
			$('.tvUI-mark').removeClass('tvUI-mark').focus();
		}
        return this;
	}
	this.toast = function(message,time,param){
		clearTimeout(toastTimmer);
		$('.tvUI-toast').remove();
		var html = $('<div class="tvUI-toast">'+message+'</div>');
		html.appendTo('body').css('margin-left',-html.width()/2).fadeIn('fast');
		if(param){
			for(var key in param){
				html.css(key,param[key]);
			}
		}
		if(time=="Infinity") return;
		toastTimmer=setTimeout(function() {
			html.fadeOut("fast",function(){
				$(this).remove();
			});
		}, time || 3000);
	}

	this.loading = function(message,keyCall){
		$(":focus").addClass('tvUI-mark');
		var MES = $('<h2 tabindex="1">'+message+'</h2>');
		var html = $('<div class="tvUI-loading"></div>');
		html.appendTo('body');
		MES.appendTo(html).keydown(function(e){
			keyCall&&keyCall(e);
		}).focus();
		this.close = function(){
			$('.tvUI-loading').remove();
			$('.tvUI-mark').removeClass('tvUI-mark').focus();
		}
        return this;
	}
};
export default tvUI