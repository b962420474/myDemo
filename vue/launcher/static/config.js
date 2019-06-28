'use strict';
var global={
    mapping:{
        "russia":{
            movie:{
                type:"russia",
                children:['megogo','ivi']
            },
            search:{
                children:{
                    'megogo':true,
                    'ivi':true
                }
            }
        },
        "india":{
            movie:{
                type:"india",
                children:['yupptv','erosnow']
            },
            search:{
                children:{
                    yupptv:true,
                    erosnow:true,
                    hungama:true
                }
            }
        },
        "SouthAmerica":{
            //movie:{},
            cast:false
        }
    },
    config:{
        animate:0,
        device:3563,
        country:"russia",
        mapping:this.mapping
    },
    appConfig:{
        appnative:1,
        list:[
            // {
            //     app_type: "loadappnative",        
            //     app_icon: "./static/launcher3/img/a1.png",
            //     app_name: "YouTube",
            //     app_url: 'Cobalt YTTV'
            // },
            // {
            //     app_type: "loadappnative",        
            //     app_icon: "./static/launcher3/img/kids.png",
            //     app_name: "YouTube",
            //     app_url: 'YouTube Kids'
            // },
            {
                app_type: "loadappwebui",        
                app_icon: "./static/launcher3/img/a1.png",
                app_name: "YouTube",
                app_url: 'http://launcher.iservernetwork.com/ytbtv2'
            },
            {
                app_type: "loadappwebui",        
                app_icon: "./static/launcher3/img/app-popbox.png",
                app_name: "popbox",
                app_url: 'http://launcher.iservernetwork.com/popbox'
            },
            {
                app_type: "loadappwebui",       
                app_icon: "./static/launcher3/img/app-ted.png",
                app_name: "ted",
                app_url: 'http://launcher.iservernetwork.com/ted'
            },
            {
                app_type: "loadappwebui",        
                app_icon: "./static/launcher3/img/a16.png",
                app_name: "arte",
                app_url: 'http://www.arte.tv/hbbtvv2/notv/html5/index.html'
            },
            // {
            //     app_type: "loadappwebui",        
            //     app_icon: "./static/launcher3/img/megogo.png",
            //     app_name: "megogo",
            //     app_url: 'http://zeasn-app.megogo.net/'
            // },
            {
                app_type: "loadappwebui",        
                app_icon: "./static/launcher3/img/Zing TV.png",
                app_name: "Zing TV",
                app_url: 'http://tv.zing.vn/smarttv/sonyceb.html#home'
            },
            // {
            //     app_type: "loadappwebui",        
            //     app_icon: "./static/launcher3/img/Euronews.png",
            //     app_name: "Euronews",
            //     app_url: 'http://www.euronews.com/_partners/philips/'
            // },
            // {
            //     app_type: "loadappwebui",        
            //     app_icon: "./static/launcher3/img/a20.png",
            //     app_name: "ivi",
            //     app_url: 'http://stb.ivi.ru/'
            // },
            // {
            //     app_type: "loadappwebui",        
            //     app_icon: "./static/launcher3/img/tvzavr.png",
            //     app_name: "tvzavr",
            //     app_url: 'http://services.tvzavr.ru/alliance/?overrideParams=true&platform=zea'
            // },
            {
                app_type: "openbrowser",        
                app_icon: "./static/launcher3/img/app-browser.png",
                app_name: "openbrowser",
                app_url: 'lan/owb.html'
            },
            {
                app_type: "loadappwebui",        
                app_icon: "./static/launcher3/img/app-facebook.png",
                app_name: "facebook",
                app_url: 'http://m.facebook.com'
            },
            {
                app_type: "loadappwebui",        
                app_icon: "./static/launcher3/img/app-twiter.png",
                app_name: "twitter",
                app_url: 'https://mobile.twitter.com/'
            },
            // {
            //     app_type: "loadappwebui",        
            //     app_icon: "./static/launcher3/img/Al Jazeera.png",
            //     app_name: "aljazeera",
            //     app_url: 'http://apps.store.zeasn.com/aljazeera/'
            // },
            // {
            //     app_type: "loadappwebui",        
            //     app_icon: "./static/launcher3/img/hungama.png",
            //     app_name: "hungama",
            //     app_url: 'http://zeasn.tvapps.hungama.com'
            // },
            // {
            //     app_type: "loadappwebui",        
            //     app_icon: "./static/launcher3/img/YuppTV.png",
            //     app_name: "YuppTV",
            //     app_url: 'https://www.yupptv.com/v2/zeasn/index.html'
            // },
            // {
            //     app_type: "loadappwebui",        
            //     app_icon: "./static/launcher3/img/Erosnow.png",
            //     app_name: "Erosnow",
            //     app_url: 'https://erosnowhtml.erosnow.com/main.html#d4'
            // },
            {
                app_type: "frame",        
                app_icon: "./static/launcher3/img/miracast.png",
                app_name: "miracast",
                app_url: 'frames/airplay/miracast.html'
            },
            {
                app_type: "frame",        
                app_icon: "./static/launcher3/img/airfly.png",
                app_name: "airplay",
                app_url: 'frames/airplay/airplay.html'
            },
            {
                app_type: "frame",        
                app_icon: "./static/launcher3/img/dlna.png",
                app_name: "dlna",
                app_url: 'frames/airplay/dlna.html'
            },
        ],
        nativeList:[

        ]
    }
}