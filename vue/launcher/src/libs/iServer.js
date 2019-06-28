 import $ from "jquery"
    var iServer = {
        config: function (param) {
            $.extend(Config, param);
            this.setPageConfig();
        },
        global: {
            KEY:{
                38: 'up',
                40: 'down',
                37: 'left',
                39: 'right',
                13: 'ok',
                462: 'return',
                8: 'return',
                27: 'return'
            },
            pageList: {},
            components:{}
        },
        debug: function (str) {
            var debuger = document.getElementById('debuger');
            if (!debuger) {
                debuger = document.createElement("div");
                debuger.style.color = '#fff';
                debuger.style.background = 'rgba(0,0,0,.7)';
                debuger.style.position = 'fixed';
                debuger.style.bottom = 0;
                debuger.style.zIndex = 999;
                debuger.setAttribute('id', 'debuger');
                document.body.appendChild(debuger);
            }
            var p = document.createElement("p");
            p.innerText = str;
            debuger.appendChild(p);
        },
        log: function (msg) {
            if (Config.logSwitch) console.log(msg);
            if (Config.debug) this.debug(msg);
        },
        network: {
            code: {
                Wireless: "&#xe604;",
                wiredNet: "&#xe627;",
                wiredWithoutNet: "&#xe60f;",
                WirelessWithoutNet: "&#xe609;"
            },
            init: function (ele, type,param) {
                if(type==true){
                    this.networkChange(ele,param);
                }
                else{
                    if (param) this.set(param);
                    this.update(ele);
                    var that = this;
                    setInterval(function () {
                        that.update(ele);
                    }, 2000);
                }
            },
            status: 0,
            type: '',
            updateHandle: function (ele) {
                var self=this;
                if (window.iBrowser) {
                    self.status = window.navigator.webkitConnection.bandwidth;
                    self.type = window.navigator.webkitConnection.device;
                    iServer.log("bandwidth:" + self.status);
                    iServer.log("device:" + self.type);
                    if (self.status === 0) {
                        var state = (self.type == 'Wireless' ? this.code.WirelessWithoutNet : this.code.wiredWithoutNet);
                    } else if (self.status === 1) {
                        var state = (self.type == 'Wireless' ? this.code.Wireless : this.code.wiredNet);
                    }
                    ele.html(state);
                }else{
                    ele.html(this.code.Wireless);
                }
            },
            update: function (ele) {
                iServer.sendCommand("checknetwork");
                this.updateHandle && this.updateHandle(ele);
            },
            networkChange: function (ele, param) {
                //iServer.sendCommand("checknetwork");
                var that = this;
                if (param) this.set(param);
                if (window.iBrowser) {
                    window.navigator.webkitConnection.addEventListener("webkitnetworkinfochange", function () {
                        that.updateHandle && that.updateHandle(ele);
                    })
                }
            },
            //设置网络图标
            set: function (param) {
                $.extend(this.code, param)
            },
            checkoutnetwork:function(){
                var state;
                state=(this.status==0?false:true);
                return state;
            }
        },
        sendCommand: function (cmd, arg) {
            iServer.log("command:" + cmd + "-" + arg)
            try {
                return arg ? window.iBrowser.sendCommand(cmd, arg) : window.iBrowser.sendCommand(cmd);
            } catch (e) {
                return false;
            }
        },
        setPageConfig: function () {
            this.PageInteraction.mainPage = Config.mainPage;
        },
        //图片转base64
        getBase64Image:function(img) {
            var canvas = document.createElement("canvas");  
            canvas.width = img.width;  
            canvas.height = img.height;  
            var ctx = canvas.getContext("2d");  
            ctx.drawImage(img, 0, 0, img.width, img.height);  
            var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();  
            var dataURL = canvas.toDataURL("image/"+ext);  
            return dataURL;  
          },
          /**
           * 缓存图片
           * data:缓存的list
           * urlname:图片的url变量名
           * name:缓存之后的变量名
           * baseurl:可能需要添加的图片域名（app从后台获取的没有前面的域名，需要添加）
           * callback:回调
           */
        saveImg:function(data,urlname,name,baseurl,callback){
            var num=0;
            var self=this;
            $.each(data,function(i,a){
                var url=a[urlname];
                if(baseurl){
                  url=baseurl+a[urlname];
                }
                var image = new Image();
                image.onload = function(){
                    var base64 = self.getBase64Image(image);  
                    a[urlname]=base64;
                    num++;
                    if(num==data.length){
                        localStorage[name]=JSON.stringify(data);
                        console.log("缓存"+name+"图片成功");
                    }
                }
                image.setAttribute("crossOrigin",'Anonymous')  
                image.src = url;
            });
            callback&&callback();
        },
        getWindowWith:function(){
            if($(window).width()<=1920){
                return 1280;
            }
            else{
                return 1920;
            }
        },
        zoom:function(){
            var W = $(window).width();
            var H = $(window).height();
            if($(window).width()<=1920){
                $("body").css('zoom', 1280 / 720 > W / H ? W / 1280 : H / 720);
            }
            else{
                $("body").css('zoom', 1920 / 1080 > W / H ? W / 1920 : H / 1080);
            }
        },
        genID:function(length){
            return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
        },
        PageInteraction: null
    };
    var PageInteraction = new function () {
        $.fn.Focus = function () {
            if ($(this).length !== 1) return false;
            $('.Focus').removeClass('Focus');
            $(this).addClass('Focus');
            global.$Focus = $(this);
            return true;
        };
        /***获取对应的数据（一般为视频列表数据）**/
        this.getData = function (list, dataType) {
            if (dataType == null) return list;
            var typeList = dataType.split("-");
            $.each(typeList, function (k, v) {
                list = list[v];
            })
            return list;
        }
        /**获取对应的list渲染方法（一般为生成li标签）**/
        this.call = function (str) {
            var arr = str.trim().split(".");
            var data = window;
            $.each(arr, function (k, v) {
                data = data[v];
            })
            return data;
        }
        $.fn.setData = function (param) {
            var tep = $(this);
            for (var item in param) {
                tep.data(item, param[item]);
            }
        }
        $.fn.getcss=function(name){
            return parseInt(this.css(name).replace('px', ''))
        }
        $.fn.realHeight=function(){
            return this[0].offsetHeight+this.getcss("marginTop")+this.getcss("marginBottom")
        }
        $.fn.realWidth=function(){
            return this[0].offsetWidth+this.getcss("marginLeft")+this.getcss("marginRight")
        }
    }
    iServer.PageInteraction=PageInteraction;
    export default iServer