(function(win,$){
    var excleHelper={
        init:function(param){
            var that=this;
            $.extend(this.defaults,param);
            
            $.each(this.defaults.listTarget,function(i,a){
                var data={};
                $.each($(a).find("td"),function(j,b){
                    console.log($(b).text());
                    data[that.fileds[j]]=$(b).text().trim();
                });
                that.list.push(data);
            });
            that.defaults.export.target.on("click",function(){
                that.download(that.defaults.filename+".csv");
                that.defaults.export.clickfun&&that.defaults.export.clickfun();
            });
        },
        getfileds:function(){
            var that=this;
            $.each(this.defaults.fieldsTarget,function(i,a){
                console.log($(a).text());
                that.fileds.push($(a).text());
            });
        },
        download:function(filename){
            var csv = json2csv.parse(this.list,this.fileds);
            var eleLink = document.createElement('a');
            eleLink.download = filename;
            eleLink.style.display = 'none';
            // 字符内容转变成blob地址
            var blob = new Blob([csv]);
            eleLink.href = URL.createObjectURL(blob);
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            document.body.removeChild(eleLink);
        },
        defaults:{
            filename:"",
            fieldsTarget:null,
            listTarget:null,
            export:{
                target:null,
                clickfun:null,
            }
        },
        fileds:[],
        list:[],
    }
    win.excleHelper=excleHelper;

})(window,jQuery)

