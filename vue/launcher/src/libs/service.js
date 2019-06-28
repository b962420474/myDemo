import $ from "jquery"
import tvUI from "./tvUI.js"
    /**俄罗斯参数**/
    var requestPublicParam={
        'objecttype':"VOD",
        'version':'v1.0.18',
        "hash":'',
        'format':'json',
        // 'mac':window.iBrowser?window.iBrowser.deviceMAC:'00:30:1B:BA:02:DB'
        'mac':'00:30:1B:BA:02:DB'
    };
    var russiaHOST=" https://acc-recommend.zeasn.tv/api";
    var deviceid='0x00301bb';
    var productid=467;
    var requestHeader={
        'Accept-Language':'en-US'
    };
    function getParam(param){
        getHash();
        $.extend(param,requestPublicParam,{usertoken:sessionStorage.usertoken,mandevid:sessionStorage.mandevid});
        return param;
    }
    function getHash(){
        requestPublicParam.hash=new Date().getTime();
        return requestPublicParam;
    }
    function russiaPost(url,param){
        param=getParam(param);
        return ajax(russiaHOST+url,param);
    }
    function formPost(URL, PARAMS) {
        var temp = document.createElement("form");
        temp.action = URL;
        temp.method = "post";
        temp.style.display = "none";
        for (var x in PARAMS) {
            var opt = document.createElement("textarea");
            opt.name = x;
            opt.value = PARAMS[x];
            temp.appendChild(opt);
        }
        document.body.appendChild(temp);
        temp.submit();
        return temp;
    }
    /**印度参数* */
    var HOST="https://smarttv.zeasn.tv/BluePortServlets/";
    var ajax=function(url,data,headers){
        return $.ajax({
            type: "post",
            url:url,
            dataType: "json",
            data: data,
            timeout:30000,
            headers : headers||requestHeader
        }).fail(failajax);
    }
    var zeansIndiaAjax=function(url,data,headers){
        return ajax(HOST+url,data,headers);
    }
    function failajax(error){
        if(error.statusText=="abort"){
            return false;
        }
        else if(error.statusText=="timeout"){
            tvUI.toast("error message:timeout")
        }
        else if(error.readyState==0){
            tvUI.toast("please check your network")
        }
        else{
            tvUI.toast("error code:"+error.status);
        }
    }
    var iserverHost="http://ota.iservernetwork.com/";
    var iServerAjax=function(url,data,headers){
        return ajax(iserverHost+url,data,headers);
    }
    var service={
        //印度
        indiaUsertoken:function(){
            var p={
                productId:556,
                categoryId :"de39f50b8cf711e9b49b06ddd286bf14",
                deviceId:'0x8c6',
                manufacturerId:'zeasn',
                mac:window.iBrowser?window.iBrowser.deviceMAC:'00:00:00:00:00:00',
                areaCode:"Global",
                langCode:"en"
            }
            return zeansIndiaAjax("linux/app/regist",p)
        },
        columnList:function(queryToken){
            var p={
                queryToken:queryToken
            }
            return zeansIndiaAjax("launcher/columnList",p)
        },
        template:function(queryToken,columnid){
            var p={
                queryToken:queryToken,
                columnid:columnid,
            }
            return zeansIndiaAjax("launcher/template",p)
        },

        //俄罗斯
        russiaUsertoken:function(){
            var p={
                'providersgroup':'RU',
                'manufacturerid':'0x8c6',
                'deviceid':deviceid,
                'productid':productid
            };
            return russiaPost("/api/usertoken",p);
        },
        getIvi:function(){
            var param={"supplierid":10011,'number':10};
            return russiaPost("/api/supplieritems",param);
        },
        getMegogo:function(){
            var param={"supplierid":10049,'number':10};
            return russiaPost("/api/supplieritems",param);
        },
        search:function(param,callback){
            post({url:'/api/search',data:param},callback);
        },
        zeanSearch:function(text,supplierid){
            var p={"text":text,'descriptionsearch':'yes','supplierid':supplierid,"pagesize":10};
            return russiaPost("/api/search",p);
        },
        titlesearch:function(text){
            var p={"text":text,'number':10};
            return russiaPost("/api/titlesearch",p);
        },
        loadingpage:function(objectid){
            var p={"objecttype":"VOD","objectid":objectid};
            p=getParam(p);
            formPost(russiaHOST+'/api/loadingpage',p);
        },
        getRecomand:function(){
            var p={
                oem_name:window.iBrowser?window.iBrowser.deviceVendor:'',
                length:window.global.config.device==3563?14:30,
                pageToken:'CDIQAQ',
                brand_name:window.iBrowser?window.iBrowser.deviceBrand:'',
                model_name:window.iBrowser?window.iBrowser.deviceModel:''
            }
            return iServerAjax("index.php/Rec/Recommand/RecommandVideosV2",p);
        }
    }
    export default service
