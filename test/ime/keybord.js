(function(win){
    var map={
        alt:{
            "normal":"alt",
            "shift":"alt-shift",
            "alt":"normal",
            "alt-shift":"shift"
        },
        shift:{
            "normal":"shift",
            "shift":"normal",
            "alt":"alt-shift",
            "alt-shift":"alt"
        }
    }
    var $keybord;
    var Keyboard={
        contenttext:"",
        layouts:{},
        lang:'',
        type:'normal',
        hcodes:{
            "{bksp}":"&#xe61f;",
            "{shift}":"Shift",
            "{alt}":"Ctrl + Alt",
            "{}":" ",
            "{change}":"&#xe728;"
        },
        hrpc:{
            "&nbsp;":" ",
            "&lt;" :"<",
            "&gt;" :">",
            "&amp;":"&",
        },
        init:function(lang,callback){
            if(document.getElementById("keyboard")){
                document.getElementById("keyboard").remove();
            }
            var keyDiv=document.createElement("div");
            document.body.appendChild(keyDiv);
            keyDiv.id="keyboard";
            $keybord=document.getElementById("keyboard");
            var layout=this.layouts[lang].lay;
            this.lang=lang;
            var html="",name="normal";
            var div=document.createElement("div");
            var json=layout[name];
            for(var i=0;i<json.length;i++){
                var li=this.html(json[i]);
                html+="<div class='keyrow'>"+li+"</div>";
            }
            div.id="key-"+name;
            div.innerHTML=html;
            keyDiv.appendChild(div);
            this.bind(callback);
        },
        show:function(){
            document.getElementById("key-normal").style.display="block";
            this.shift("normal");
            $keybord.style.display="block";
        },
        hide:function(){
            $keybord.style.display="none";
        },
        html:function(text){
            var html="";
            var keyTexts=text.split(" ");
            for(var i=0;i<keyTexts.length;i++){
                var key=keyTexts[i];
                if(this.hcodes[key]){
                    var c=key.replace(/^\{/gi,"").replace(/\}$/gi,"");
                    key=this.hcodes[key];
                    if(key.trim()==""){
                        html+="<button>&nbsp;</button>";
                    }
                    else{
                        html+="<button class='ctrlkeys "+c+"'>"+key+"</button>";
                    }
                }else if(key=="&nbsp"){
                    html+="<button class=' insert keyspace'>"+key+"</button>";
                }
                else{
                    html+="<button class='insert'>"+key+"</button>";
                }
            }
            return html;
        },
        shift:function(type){
            this.type=type;
            var divs=$keybord.querySelectorAll(".keyrow");
            for(var i=0;i<divs.length;i++){
                var els = divs[i].querySelectorAll("button");
                var text=this.layouts[this.lang].lay[type][i].split(" ");
                for(var j=0;j<els.length;j++){
                    var key=text[j];
                    if(this.hcodes[key]){
                        var c=key.replace(/^\{/gi,"").replace(/\}$/gi,"");
                        key=this.hcodes[key];
                        if(key.trim()==""){
                            key="&nbsp;";
                            els[j].className="";
                        }
                    }
                    else if(key!="&nbsp"){
                        els[j].className="insert";
                    }
                    els[j].innerHTML=key;
                }
            }
        },
        bind:function(callback){
            var that=this;
            $keybord.addEventListener("click",function(e){
                var el = e.target || e.srcElement;
                if(el.tagName.toLowerCase() == "button") {
                    if (el.className.indexOf("insert")!=-1) {
                        var str = el.innerHTML;
                        str = that.hrpc[str] || str;
                        if(that.layouts[lang].transform&&that.layouts[lang].transform[that.contenttext.charAt(that.contenttext.length-1)+str]){
                            callback&&callback("cmd","backspace");
                            str=that.layouts[lang].transform[that.contenttext.charAt(that.contenttext.length-1)+str];
                            that.contenttext=that.contenttext.substring(0,that.contenttext.length-1);
                        }
                        callback&&callback("insert",str);
                        that.contenttext+=str;
                        //console.log(that.contenttext);
                    }
                    else if (el.className.indexOf("bksp")!=-1) {
                        callback&&callback("cmd","backspace");
                        if(that.contenttext.length>0){
                            that.contenttext=that.contenttext.substring(0,that.contenttext.length-1);
                        }
                    }
                    else if(el.className.indexOf("change")!=-1){
                        that.hide();
                        that.contenttext="";
                        callback&&callback("change","");
                    } else if (el.className.indexOf("ctrlkeys")!=-1) {
                        if(el.className.indexOf("alt")!=-1){
                            that.shift(map.alt[that.type]);
                        }
                        else if(el.className.indexOf("shift")!=-1){
                            that.shift(map.shift[that.type]);
                        }
                    }
                }
            });
        }
    };
    Keyboard.layouts['rus']={//俄语
        'name' : 'Russian',
        'lang' : 'rus',
        "lay":{
            'normal' : [
                '\u0451 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                "\u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a",
                '{change} \u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d \\',
                "{shift} \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e . {shift}",
                "{alt} &nbsp {alt}"
            ],
            'shift' : [
                '\u0401 ! " \u2116 ; % : ? * ( ) _ + {bksp}',
                "\u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a",
                '{change} \u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d /',
                "{shift} \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e , {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt' : [
                "\u0463 {} {} {} {} {} {} {} {} {} {} {} = {bksp}",
                "\u0457 \u0479 \u046b \u046d \u0465 \u04a3 \u04af \u04e9 \u0455 \u046f [ ]",
                "{change} \u0473 \u0471 {} {} {} {} \u0461 \u047f \u047b \u047d {} \\",
                "{shift} \u0467 \u0469 {} {} \u0456 \u0475 \u0477 {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt-shift' : [
                '\u0462 {} {} {} {} {} {} {} {} {} {} {} + {bksp}',
                "\u0407 \u0478 \u046a \u046c \u0464 {} {} {} \u0405 \u046e { }",
                "{change} \u0472 \u0470 {} {} {} {} \u0460 \u047e \u047a \u047c {} |",
                "{shift} \u0466 \u0468 {} {} \u0406 \u0474 \u0476 {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ]
        }
    };
    Keyboard.layouts['spa']={//西班牙语
        'name' : 'Spanish',
        'lang' : 'spa',
        "lay":{
            'normal' : [
                "\u00ba 1 2 3 4 5 6 7 8 9 0 ' \u00a1 {bksp}",
                "q w e r t y u i o p ` +",
                "{change} a s d f g h j k l \u00f1 \u00b4 \u00e7",
                "{shift} z x c v b n m , . - {shift}",
                "{alt} &nbsp {alt}"
            ],
            'shift' : [
                '\u00aa ! " \u00b7 $ % &amp; / ( ) = ? \u00bf {bksp}',
                "Q W E R T Y U I O P ^ *",
                "{change} A S D F G H J K L \u00d1 \u00a8 \u00c7",
                "{shift} Z X C V B N M ; : _ {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt' : [
                "\\ | @ # ~ \u20ac \u00ac {} {} {} {} {} {} {bksp}",
                "{} {} \u20ac {} {} {} {} {} {} [ ] }",
                "{change} {} {} {} {} {} {} {} {} {} {} {} {",
                "{shift} {} {} {} {} {} {} {} {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt-shift' : [
                "\\ | @ # ~ \u20ac \u00ac {} {} {} {} {} {} {bksp}",
                "{} {} \u20ac {} {} {} {} {} {} [ ] }",
                "{change} {} {} {} {} {} {} {} {} {} {} {} {",
                "{shift} {} {} {} {} {} {} {} {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ]
        },
        transform:{
            "`A": "\u00c0",
            "\u00a8A": "\u00c4",
            "~A": "\u00c3",
            "\u00b4A": "\u00c1",
            "^A": "\u00c2",
            "\u00b4C": "\u0106",
            "^C": "\u0108",
            "`E": "\u00c8",
            "\u00a8E": "\u00cb",
            "~E": "\u1ebc",
            "\u00b4E": "\u00c9",
            "^E": "\u00ca",
            "\u00b4G": "\u01f4",
            "^G": "\u011c",
            "\u00a8H": "\u1e26",
            "^H": "\u0124",
            "`I": "\u00cc",
            "\u00a8I": "\u00cf",
            "~I": "\u0128",
            "\u00b4I": "\u00cd",
            "^I": "\u00ce",
            "^J": "\u0134",
            "\u00b4K": "\u1e30",
            "\u00b4L": "\u0139",
            "\u00b4M": "\u1e3e",
            "`N": "\u01f8",
            "~N": "\u00d1",
            "\u00b4N": "\u0143",
            "`O": "\u00d2",
            "\u00a8O": "\u00d6",
            "~O": "\u00d5",
            "\u00b4O": "\u00d3",
            "^O": "\u00d4",
            "\u00b4P": "\u1e54",
            "\u00b4R": "\u0154",
            "\u00b4S": "\u015a",
            "^S": "\u015c",
            "`U": "\u00d9",
            "\u00a8U": "\u00dc",
            "~U": "\u0168",
            "\u00b4U": "\u00da",
            "^U": "\u00db",
            "~V": "\u1e7c",
            "`W": "\u1e80",
            "\u00a8W": "\u1e84",
            "\u00b4W": "\u1e82",
            "^W": "\u0174",
            "\u00a8X": "\u1e8c",
            "`Y": "\u1ef2",
            "\u00a8Y": "\u0178",
            "~Y": "\u1ef8",
            "\u00b4Y": "\u00dd",
            "^Y": "\u0176",
            "\u00b4Z": "\u0179",
            "^Z": "\u1e90",
            "`a": "\u00e0",
            "\u00a8a": "\u00e4",
            "~a": "\u00e3",
            "\u00b4a": "\u00e1",
            "^a": "\u00e2",
            "\u00b4c": "\u0107",
            "^c": "\u0109",
            "`e": "\u00e8",
            "\u00a8e": "\u00eb",
            "~e": "\u1ebd",
            "\u00b4e": "\u00e9",
            "^e": "\u00ea",
            "\u00b4g": "\u01f5",
            "^g": "\u011d",
            "\u00a8h": "\u1e27",
            "^h": "\u0125",
            "`i": "\u00ec",
            "\u00a8i": "\u00ef",
            "~i": "\u0129",
            "\u00b4i": "\u00ed",
            "^i": "\u00ee",
            "^j": "\u0135",
            "\u00b4k": "\u1e31",
            "\u00b4l": "\u013a",
            "\u00b4m": "\u1e3f",
            "`n": "\u01f9",
            "~n": "\u00f1",
            "\u00b4n": "\u0144",
            "`o": "\u00f2",
            "\u00a8o": "\u00f6",
            "~o": "\u00f5",
            "\u00b4o": "\u00f3",
            "^o": "\u00f4",
            "\u00b4p": "\u1e55",
            "\u00b4r": "\u0155",
            "\u00b4s": "\u015b",
            "^s": "\u015d",
            "\u00a8t": "\u1e97",
            "`u": "\u00f9",
            "\u00a8u": "\u00fc",
            "~u": "\u0169",
            "\u00b4u": "\u00fa",
            "^u": "\u00fb",
            "~v": "\u1e7d",
            "`w": "\u1e81",
            "\u00a8w": "\u1e85",
            "\u00b4w": "\u1e83",
            "^w": "\u0175",
            "\u00a8x": "\u1e8d",
            "`y": "\u1ef3",
            "\u00a8y": "\u00ff",
            "~y": "\u1ef9",
            "\u00b4y": "\u00fd",
            "^y": "\u0177",
            "\u00b4z": "\u017a",
            "^z": "\u1e91",
            "\u00b4\u00c7": "\u1e08",
            "\u00b4\u00e7": "\u1e09"
        }
    };
    Keyboard.layouts['hin']={//印地语
        'name' : 'Hindi',
        'lang' : 'hin',
        "lay":{
            'normal' : [
                "\u094a 1 2 3 4 5 6 7 8 9 0 - \u0943 {bksp}",
                "\u094c \u0948 \u093e \u0940 \u0942 \u092c \u0939 \u0917 \u0926 \u091c \u0921 \u093c",
                "{change} \u094b \u0947 \u094d \u093f \u0941 \u092a \u0930 \u0915 \u0924 \u091a \u091f \u0949",
                "{shift} \u0946 \u0902 \u092e \u0928 \u0935 \u0932 \u0938 , . \u092f {shift}",
                "{alt} &nbsp {alt}"
            ],
            'shift' : [
                "\u0912 \u090d \u0945 \u094d\u0930 \u0930\u094d \u091c\u094d\u091e \u0924\u094d\u0930 \u0915\u094d\u0937 \u0936\u094d\u0930 ( ) \u0903 \u090b {bksp}",
                "\u0914 \u0910 \u0906 \u0908 \u090a \u092d \u0919 \u0918 \u0927 \u091d \u0922 \u091e",
                "{change} \u0913 \u090f \u0905 \u0907 \u0909 \u092b \u0931 \u0916 \u0925 \u091b \u0920 \u0911",
                "{shift} \u090e \u0901 \u0923 \u0929 \u0934 \u0933 \u0936 \u0937 \u0964 \u095f {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt' : [
                "{} \u0967 \u0968 \u0969 \u096a \u096b \u096c \u096d \u096e \u096f \u0966 {} \u0944 {bksp}",
                "{} {} {} \u0963 {} {} {} \u095a {} \u095b \u095c {}",
                "{change} {} {} {} \u0962 {} {} {} \u0958 {} \u0952 {} {}",
                "{shift} \u0953 {} \u0954 {} {} {} {} \u0970 \u0965 {} {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt-shift' : [
                "{} {} {} {} {} {} {} {} {} {} {} {} \u0960 {bksp}",
                "{} {} {} \u0961 {} {} {} {} {} \u095d {} {}",
                "{change} {} {} {} \u090c {} \u095e {} \u0959 {} {} \u0951 {}",
                "{shift} {} \u0950 {} {} {} {} {} {} \u093d {} {shift}",
                "{alt} &nbsp {alt}"
            ]
        }
    };
    Keyboard.layouts['scc']={//sr_cyrl  塞尔维亚语
        'name' : 'Serbian',
        'lang' : 'scc',
        "lay":{
            'normal' : [
                "` 1 2 3 4 5 6 7 8 9 0 ' + {bksp}",
                "\u0459 \u045a \u0435 \u0440 \u0442 \u0437 \u0443 \u0438 \u043e \u043f \u0448 \u0452",
                "{change} \u0430 \u0441 \u0434 \u0444 \u0433 \u0445 \u0458 \u043a \u043b \u0447 \u045b \u0436",
                "{shift} \u0455 \u045f \u0446 \u0432 \u0431 \u043d \u043c , . - {shift}",
                "{alt} &nbsp {alt}"
            ],
            'shift' : [
                '~ ! " # $ % &amp; / ( ) = ? * {bksp}',
                "\u0409 \u040a \u0415 \u0420 \u0422 \u0417 \u0423 \u0418 \u041e \u041f \u0428 \u0402",
                "{change} \u0410 \u0421 \u0414 \u0424 \u0413 \u0425 \u0408 \u041a \u041b \u0427 \u040b \u0416",
                "{shift} \u0405 \u040f \u0426 \u0412 \u0411 \u041d \u041c ; : _ {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt' : [
                "{} {} {} {} {} {} {} {} {} {} {} {} {} {bksp}",
                "{} {} \u20ac {} {} {} {} {} {} {} {} {}",
                "{change} {} {} {} {} {} {} {} {} {} {} {} {}",
                "{shift} {} {} {} {} {} {} {} &lt; &gt; {} {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt-shift' : [
                "{} {} {} {} {} {} {} {} {} {} {} {} {} {bksp}",
                "{} {} \u20ac {} {} {} {} {} {} {} {} {}",
                "{change} {} {} {} {} {} {} {} {} {} {} {} {}",
                "{shift} {} {} {} {} {} {} {} &lt; &gt; {} {shift}",
                "{alt} &nbsp {alt}"
            ]
        },
        transform: {
            "'\u0433": "\u0453",
            "'\u0413": "\u0403",
            "'\u043a": "\u045c",
            "'\u041a": "\u040c"
        }
    };
    Keyboard.layouts['fra']={//fr  法语
        'name' : 'French',
        'lang' : 'fra',
        "lay":{
            'normal' : [
                "\u00b2 &amp; \u00e9 \" ' ( - \u00e8 _ \u00e7 \u00e0 ) = {bksp}",
                "a z e r t y u i o p ^ $",
                "{change} q s d f g h j k l m \u00f9 *",
                "{shift} w x c v b n , ; : ! {shift}",
                "{alt} &nbsp {alt}"
            ],
            'shift' : [
                '\u00b2 1 2 3 4 5 6 7 8 9 0 \u00b0 + {bksp}',
                "A Z E R T Y U I O P \u00a8 \u00a3",
                "{change} Q S D F G H J K L M % \u00b5",
                "{shift} W X C V B N ? . / \u00a7 {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt' : [
                "{} &lt; ~ # { [ | ` \\ ^ @ ] } {bksp}",
                "{} {} \u20ac {} {} {} {} {} {} {} {} \u00a4",
                "{change} {} {} {} {} {} {} {} {} {} {} {} {}",
                "{shift} {} {} {} {} {} {} {} {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt-shift' : [
                "{} &gt; ~ # { [ | ` \\ ^ @ ] } {bksp}",
                "{} {} \u20ac {} {} {} {} {} {} {} {} \u00a4",
                "{change} {} {} {} {} {} {} {} {} {} {} {} {}",
                "{shift} {} {} {} {} {} {} {} {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ]
        },
        transform: {
            "\u00a8 ": "\u00a8",
            "\u00a8A": "\u00c4",
            "\u00a8E": "\u00cb",
            "\u00a8H": "\u1e26",
            "\u00a8I": "\u00cf",
            "\u00a8O": "\u00d6",
            "\u00a8U": "\u00dc",
            "\u00a8W": "\u1e84",
            "\u00a8X": "\u1e8c",
            "\u00a8Y": "\u0178",
            "\u00a8a": "\u00e4",
            "\u00a8e": "\u00eb",
            "\u00a8h": "\u1e27",
            "\u00a8i": "\u00ef",
            "\u00a8o": "\u00f6",
            "\u00a8t": "\u1e97",
            "\u00a8u": "\u00fc",
            "\u00a8w": "\u1e85",
            "\u00a8x": "\u1e8d",
            "\u00a8y": "\u00ff",
            "^ ": "^",
            "^A": "\u00c2",
            "^C": "\u0108",
            "^E": "\u00ca",
            "^G": "\u011c",
            "^H": "\u0124",
            "^I": "\u00ce",
            "^J": "\u0134",
            "^O": "\u00d4",
            "^S": "\u015c",
            "^U": "\u00db",
            "^W": "\u0174",
            "^Y": "\u0176",
            "^Z": "\u1e90",
            "^a": "\u00e2",
            "^c": "\u0109",
            "^e": "\u00ea",
            "^g": "\u011d",
            "^h": "\u0125",
            "^i": "\u00ee",
            "^j": "\u0135",
            "^o": "\u00f4",
            "^s": "\u015d",
            "^u": "\u00fb",
            "^w": "\u0175",
            "^y": "\u0177",
            "^z": "\u1e91"
        }
    };
    Keyboard.layouts['ita']={//it  意大利语
        'name' : 'Italian',
        'lang' : 'ita',
        "lay":{
            'normal' : [
                "\\ 1 2 3 4 5 6 7 8 9 0 ' \u00ec {bksp}",
                "q w e r t y u i o p \u00e8 +",
                "{change} a s d f g h j k l \u00f2 \u00e0 \u00f9",
                "{shift} z x c v b n m , . - {shift}",
                "{alt} &nbsp {alt}"
            ],
            'shift' : [
                '| ! " \u00a3 $ % &amp; / ( ) = ? ^ {bksp}',
                "Q W E R T Y U I O P \u00e9 *",
                "{change} A S D F G H J K L \u00e7 \u00b0 \u00a7",
                "{shift} Z X C V B N M ; : _ {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt' : [
                "{} &lt; {} # {} {} {} { [ ] } {} {} {bksp}",
                "@ {} \u20ac {} {} {} {} {} {} {} {} ~",
                "{change} {} {} {} {} {} {} {} {} {} {} {} `",
                "{shift} {} {} {} {} {} {} {} {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt-shift' : [
                "{} &gt; {} # {} {} {} { [ ] } {} {} {bksp}",
                "@ {} \u20ac {} {} {} {} {} {} {} {} ~",
                "{change} {} {} {} {} {} {} {} {} {} {} {} `",
                "{shift} {} {} {} {} {} {} {} {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ]
        },
        transform: {
            "` ": "`",
            "`A": "\u00c0",
            "`E": "\u00c8",
            "`I": "\u00cc",
            "`N": "\u01f8",
            "`O": "\u00d2",
            "`U": "\u00d9",
            "`W": "\u1e80",
            "`Y": "\u1ef2",
            "`a": "\u00e0",
            "`e": "\u00e8",
            "`i": "\u00ec",
            "`n": "\u01f9",
            "`o": "\u00f2",
            "`u": "\u00f9",
            "`w": "\u1e81",
            "`y": "\u1ef3",
            "~ ": "~",
            "~A": "\u00c3",
            "~E": "\u1ebc",
            "~I": "\u0128",
            "~N": "\u00d1",
            "~O": "\u00d5",
            "~U": "\u0168",
            "~V": "\u1e7c",
            "~Y": "\u1ef8",
            "~a": "\u00e3",
            "~e": "\u1ebd",
            "~i": "\u0129",
            "~n": "\u00f1",
            "~o": "\u00f5",
            "~u": "\u0169",
            "~v": "\u1e7d",
            "~y": "\u1ef9",
            "^ ": "^",
            "^A": "\u00c2",
            "^C": "\u0108",
            "^E": "\u00ca",
            "^G": "\u011c",
            "^H": "\u0124",
            "^I": "\u00ce",
            "^J": "\u0134",
            "^O": "\u00d4",
            "^S": "\u015c",
            "^U": "\u00db",
            "^W": "\u0174",
            "^Y": "\u0176",
            "^Z": "\u1e90",
            "^a": "\u00e2",
            "^c": "\u0109",
            "^e": "\u00ea",
            "^g": "\u011d",
            "^h": "\u0125",
            "^i": "\u00ee",
            "^j": "\u0135",
            "^o": "\u00f4",
            "^s": "\u015d",
            "^u": "\u00fb",
            "^w": "\u0175",
            "^y": "\u0177",
            "^z": "\u1e91"
        }
    };
    Keyboard.layouts['por']={//pt_pt   葡萄牙语
        'name' : 'Portuguese',
        'lang' : 'por',
        "lay":{
            'normal' : [
                "\\ 1 2 3 4 5 6 7 8 9 0 ' \u00ab {bksp}",
                "q w e r t y u i o p + \u00b4",
                "{change} a s d f g h j k l \u00e7 \u00ba ~",
                "{shift} z x c v b n m , . - {shift}",
                "{alt} &nbsp {alt}"
            ],
            'shift' : [
                '| ! " # $ % &amp; / ( ) = ? \u00bb {bksp}',
                "Q W E R T Y U I O P * `",
                "{change} A S D F G H J K L \u00c7 \u00aa ^",
                "{shift} Z X C V B N M ; : _ {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt' : [
                "{} &lt; @ \u00a3 \u00a7 {} {} { [ ] } {} {} {bksp}",
                "{} {} \u20ac {} {} {} {} {} {} {} \u00a8 {}",
                "{change} {} {} {} {} {} {} {} {} {} {} {} {}",
                "{shift} {} {} {} {} {} {} {} {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt-shift' : [
                "{} &gt; @ \u00a3 \u00a7 {} {} { [ ] } {} {} {bksp}",
                "{} {} \u20ac {} {} {} {} {} {} {} \u00a8 {}",
                "{change} {} {} {} {} {} {} {} {} {} {} {} {}",
                "{shift} {} {} {} {} {} {} {} {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ]
        },
        transform: {
            "` ": "`",
            "`A": "\u00c0",
            "`E": "\u00c8",
            "`I": "\u00cc",
            "`N": "\u01f8",
            "`O": "\u00d2",
            "`U": "\u00d9",
            "`W": "\u1e80",
            "`Y": "\u1ef2",
            "`a": "\u00e0",
            "`e": "\u00e8",
            "`i": "\u00ec",
            "`n": "\u01f9",
            "`o": "\u00f2",
            "`u": "\u00f9",
            "`w": "\u1e81",
            "`y": "\u1ef3",
            "\u00a8 ": "\u00a8",
            "\u00a8A": "\u00c4",
            "\u00a8E": "\u00cb",
            "\u00a8H": "\u1e26",
            "\u00a8I": "\u00cf",
            "\u00a8O": "\u00d6",
            "\u00a8U": "\u00dc",
            "\u00a8W": "\u1e84",
            "\u00a8X": "\u1e8c",
            "\u00a8Y": "\u0178",
            "\u00a8a": "\u00e4",
            "\u00a8e": "\u00eb",
            "\u00a8h": "\u1e27",
            "\u00a8i": "\u00ef",
            "\u00a8o": "\u00f6",
            "\u00a8t": "\u1e97",
            "\u00a8u": "\u00fc",
            "\u00a8w": "\u1e85",
            "\u00a8x": "\u1e8d",
            "\u00a8y": "\u00ff",
            "^ ": "^",
            "^A": "\u00c2",
            "^C": "\u0108",
            "^E": "\u00ca",
            "^G": "\u011c",
            "^H": "\u0124",
            "^I": "\u00ce",
            "^J": "\u0134",
            "^O": "\u00d4",
            "^S": "\u015c",
            "^U": "\u00db",
            "^W": "\u0174",
            "^Y": "\u0176",
            "^Z": "\u1e90",
            "^a": "\u00e2",
            "^c": "\u0109",
            "^e": "\u00ea",
            "^g": "\u011d",
            "^h": "\u0125",
            "^i": "\u00ee",
            "^j": "\u0135",
            "^o": "\u00f4",
            "^s": "\u015d",
            "^u": "\u00fb",
            "^w": "\u0175",
            "^y": "\u0177",
            "^z": "\u1e91",
            "\u00b4 ": "\u00b4",
            "\u00b4A": "\u00c1",
            "\u00b4C": "\u0106",
            "\u00b4E": "\u00c9",
            "\u00b4G": "\u01f4",
            "\u00b4I": "\u00cd",
            "\u00b4K": "\u1e30",
            "\u00b4L": "\u0139",
            "\u00b4M": "\u1e3e",
            "\u00b4N": "\u0143",
            "\u00b4O": "\u00d3",
            "\u00b4P": "\u1e54",
            "\u00b4R": "\u0154",
            "\u00b4S": "\u015a",
            "\u00b4U": "\u00da",
            "\u00b4W": "\u1e82",
            "\u00b4Y": "\u00dd",
            "\u00b4Z": "\u0179",
            "\u00b4a": "\u00e1",
            "\u00b4c": "\u0107",
            "\u00b4e": "\u00e9",
            "\u00b4g": "\u01f5",
            "\u00b4i": "\u00ed",
            "\u00b4k": "\u1e31",
            "\u00b4l": "\u013a",
            "\u00b4m": "\u1e3f",
            "\u00b4n": "\u0144",
            "\u00b4o": "\u00f3",
            "\u00b4p": "\u1e55",
            "\u00b4r": "\u0155",
            "\u00b4s": "\u015b",
            "\u00b4u": "\u00fa",
            "\u00b4w": "\u1e83",
            "\u00b4y": "\u00fd",
            "\u00b4z": "\u017a",
            "\u00b4\u00c7": "\u1e08",
            "\u00b4\u00e7": "\u1e09",
            "~ ": "~",
            "~A": "\u00c3",
            "~E": "\u1ebc",
            "~I": "\u0128",
            "~N": "\u00d1",
            "~O": "\u00d5",
            "~U": "\u0168",
            "~V": "\u1e7c",
            "~Y": "\u1ef8",
            "~a": "\u00e3",
            "~e": "\u1ebd",
            "~i": "\u0129",
            "~n": "\u00f1",
            "~o": "\u00f5",
            "~u": "\u0169",
            "~v": "\u1e7d",
            "~y": "\u1ef9"
        }
    };
    Keyboard.layouts['deu']={//de  德语
        'name' : 'German',
        'lang' : 'deu',
        "lay":{
            'normal' : [
                "^ 1 2 3 4 5 6 7 8 9 0 \u00df \u00b4 {bksp}",
                "q w e r t z u i o p \u00fc +",
                "{change} a s d f g h j k l \u00f6 \u00e4 #",
                "{shift} y x c v b n m , . - {shift}",
                "{alt} &nbsp {alt}"
            ],
            'shift' : [
                '\u00b0 ! \" \u00a7 $ % &amp; / ( ) = ? ` {bksp}',
                "Q W E R T Z U I O P \u00dc *",
                "{change} A S D F G H J K L \u00d6 \u00c4 '",
                "{shift} Y X C V B N M ; : _ {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt' : [
                "{} &lt; \u00b2 \u00b3 {} {} {} { [ ] } \\ {} {bksp}",
                "@ {} \u20ac {} {} {} {} {} {} {} {} ~",
                "{change} {} {} {} {} {} {} {} {} {} {} {} {}",
                "{shift} | {} {} {} {} {} \u00b5 {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt-shift' : [
                "{} &gt; \u00b2 \u00b3 {} {} {} { [ ] } \\ {} {bksp}",
                "@ {} \u20ac {} {} {} {} {} {} {} {} ~",
                "{change} {} {} {} {} {} {} {} {} {} {} {} {}",
                "{shift} | {} {} {} {} {} \u00b5 {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ]
        },
        transform: {
            "` ": "`",
            "`A": "\u00c0",
            "`E": "\u00c8",
            "`I": "\u00cc",
            "`N": "\u01f8",
            "`O": "\u00d2",
            "`U": "\u00d9",
            "`W": "\u1e80",
            "`Y": "\u1ef2",
            "`a": "\u00e0",
            "`e": "\u00e8",
            "`i": "\u00ec",
            "`n": "\u01f9",
            "`o": "\u00f2",
            "`u": "\u00f9",
            "`w": "\u1e81",
            "`y": "\u1ef3",
            "`\u00dc": "\u01db",
            "`\u00fc": "\u01dc",
            "\u00b4 ": "\u00b4",
            "\u00b4A": "\u00c1",
            "\u00b4C": "\u0106",
            "\u00b4E": "\u00c9",
            "\u00b4G": "\u01f4",
            "\u00b4I": "\u00cd",
            "\u00b4K": "\u1e30",
            "\u00b4L": "\u0139",
            "\u00b4M": "\u1e3e",
            "\u00b4N": "\u0143",
            "\u00b4O": "\u00d3",
            "\u00b4P": "\u1e54",
            "\u00b4R": "\u0154",
            "\u00b4S": "\u015a",
            "\u00b4U": "\u00da",
            "\u00b4W": "\u1e82",
            "\u00b4Y": "\u00dd",
            "\u00b4Z": "\u0179",
            "\u00b4a": "\u00e1",
            "\u00b4c": "\u0107",
            "\u00b4e": "\u00e9",
            "\u00b4g": "\u01f5",
            "\u00b4i": "\u00ed",
            "\u00b4k": "\u1e31",
            "\u00b4l": "\u013a",
            "\u00b4m": "\u1e3f",
            "\u00b4n": "\u0144",
            "\u00b4o": "\u00f3",
            "\u00b4p": "\u1e55",
            "\u00b4r": "\u0155",
            "\u00b4s": "\u015b",
            "\u00b4u": "\u00fa",
            "\u00b4w": "\u1e83",
            "\u00b4y": "\u00fd",
            "\u00b4z": "\u017a",
            "\u00b4\u00dc": "\u01d7",
            "\u00b4\u00fc": "\u01d8",
            "^ ": "^",
            "^A": "\u00c2",
            "^C": "\u0108",
            "^E": "\u00ca",
            "^G": "\u011c",
            "^H": "\u0124",
            "^I": "\u00ce",
            "^J": "\u0134",
            "^O": "\u00d4",
            "^S": "\u015c",
            "^U": "\u00db",
            "^W": "\u0174",
            "^Y": "\u0176",
            "^Z": "\u1e90",
            "^a": "\u00e2",
            "^c": "\u0109",
            "^e": "\u00ea",
            "^g": "\u011d",
            "^h": "\u0125",
            "^i": "\u00ee",
            "^j": "\u0135",
            "^o": "\u00f4",
            "^s": "\u015d",
            "^u": "\u00fb",
            "^w": "\u0175",
            "^y": "\u0177",
            "^z": "\u1e91"
        }
    };
    Keyboard.layouts['urd']={//ur  乌尔都语
        'name' : 'Urdu',
        'lang' : 'urd',
        "lay":{
            'normal' : [
                "{} \u06f1 \u06f2 \u06f3 \u06f4 \u06f5 \u06f6 \u06f7 \u06f8 \u06f9 \u06f0 - = {bksp}",
                "\u0642 \u0648 \u0639 \u0631 \u062a \u06d2 \u0621 \u06cc \u06c1 \u067e [ ] \\",
                "{change} \u0627 \u0633 \u062f \u0641 \u06af \u062d \u062c \u06a9 \u0644 \u061b ' {}",
                "{shift} \u0632 \u0634 \u0686 \u0637 \u0628 \u0646 \u0645 \u060c \u06d4 / {shift}",
                "{alt} &nbsp {alt}"
            ],
            'shift' : [
                '\u064b 1 2 3 4 5 6 7 8 9 0 _ + {bksp}',
                "\u0652 \u0651 \u0670 \u0691 \u0679 \u064e \u0626 \u0650 \u06c3 \u064f { } |",
                '{change} \u0622 \u0635 \u0688 {} \u063a \u06be \u0636 \u062e {} : " {}',
                "{shift} \u0630 \u0698 \u062b \u0638 {} \u06ba \u0658 {} \u066b \u061f {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt' : [
                "{} ! @ # {} \u066a {} &amp; * ( ) {} {} {bksp}",
                "{} \u0602 \u0656 \u0613 \u0614 \u0601 \u0654 \u0611 {} \u0657 {} {} {}",
                "{change} \ufdf2 \u0610 \ufdfa {} {} \u0612 \ufdfb {} {} {} {} {}",
                "{shift} \u060f \u060e \u0603 {} \ufdfd \u0600 {} &lt; &gt; {} {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt-shift' : [
                "{} ! @ # {} \u066a {} &amp; * ( ) {} {} {bksp}",
                "{} \u0602 \u0656 \u0613 \u0614 \u0601 \u0654 \u0611 {} \u0657 {} {} {}",
                "{change} \ufdf2 \u0610 \ufdfa {} {} \u0612 \ufdfb {} {} {} {} {}",
                "{shift} \u060f \u060e \u0603 {} \ufdfd \u0600 {} &lt; &gt; {} {shift}",
                "{alt} &nbsp {alt}"
            ]
        }
    };
    Keyboard.layouts['dan']={//da  丹麦
        'name' : 'Danish',
        'lang' : 'dan',
        "lay":{
            'normal' : [
                "\u00bd 1 2 3 4 5 6 7 8 9 0 + \u00b4 {bksp}",
                "q w e r t y u i o p \u00e5 \u00a8",
                "{change} a s d f g h j k l \u00e6 \u00f8 '",
                "{shift} z x c v b n m , . - {shift}",
                "{alt} &nbsp {alt}"
            ],
            'shift' : [
                '\u00a7 ! " # \u00a4 % &amp; / ( ) = ? ` {bksp}',
                "Q W E R T Y U I O P \u00c5 ^",
                "{change} A S D F G H J K L \u00c6 \u00d8 *",
                "{shift} Z X C V B N M ; : _ {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt' : [
                "{} &lt; @ \u00a3 $ {} {} { [ ] } {} | {bksp}",
                "{} {} \u20ac {} {} {} {} {} {} {} {} ~",
                "{change} {} {} {} {} {} {} {} {} {} {} {} {}",
                "{shift} \\ {} {} {} {} {} {} {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt-shift' : [
                "{} &gt; @ \u00a3 $ {} {} { [ ] } {} | {bksp}",
                "{} {} \u20ac {} {} {} {} {} {} {} {} ~",
                "{change} {} {} {} {} {} {} {} {} {} {} {} {}",
                "{shift} \\ {} {} {} {} {} {} {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ]
        },
        transform: {
            "~ ": "~",
            "~A": "\u00c3",
            "~E": "\u1ebc",
            "~I": "\u0128",
            "~N": "\u00d1",
            "~O": "\u00d5",
            "~U": "\u0168",
            "~V": "\u1e7c",
            "~Y": "\u1ef8",
            "~a": "\u00e3",
            "~e": "\u1ebd",
            "~i": "\u0129",
            "~n": "\u00f1",
            "~o": "\u00f5",
            "~u": "\u0169",
            "~v": "\u1e7d",
            "~y": "\u1ef9",
            "\u00a8 ": "\u00a8",
            "\u00a8A": "\u00c4",
            "\u00a8E": "\u00cb",
            "\u00a8H": "\u1e26",
            "\u00a8I": "\u00cf",
            "\u00a8O": "\u00d6",
            "\u00a8U": "\u00dc",
            "\u00a8W": "\u1e84",
            "\u00a8X": "\u1e8c",
            "\u00a8Y": "\u0178",
            "\u00a8a": "\u00e4",
            "\u00a8e": "\u00eb",
            "\u00a8h": "\u1e27",
            "\u00a8i": "\u00ef",
            "\u00a8o": "\u00f6",
            "\u00a8t": "\u1e97",
            "\u00a8u": "\u00fc",
            "\u00a8w": "\u1e85",
            "\u00a8x": "\u1e8d",
            "\u00a8y": "\u00ff",
            "^ ": "^",
            "^A": "\u00c2",
            "^C": "\u0108",
            "^E": "\u00ca",
            "^G": "\u011c",
            "^H": "\u0124",
            "^I": "\u00ce",
            "^J": "\u0134",
            "^O": "\u00d4",
            "^S": "\u015c",
            "^U": "\u00db",
            "^W": "\u0174",
            "^Y": "\u0176",
            "^Z": "\u1e90",
            "^a": "\u00e2",
            "^c": "\u0109",
            "^e": "\u00ea",
            "^g": "\u011d",
            "^h": "\u0125",
            "^i": "\u00ee",
            "^j": "\u0135",
            "^o": "\u00f4",
            "^s": "\u015d",
            "^u": "\u00fb",
            "^w": "\u0175",
            "^y": "\u0177",
            "^z": "\u1e91",
            "\u00b4 ": "\u00b4",
            "\u00b4A": "\u00c1",
            "\u00b4C": "\u0106",
            "\u00b4E": "\u00c9",
            "\u00b4G": "\u01f4",
            "\u00b4I": "\u00cd",
            "\u00b4K": "\u1e30",
            "\u00b4L": "\u0139",
            "\u00b4M": "\u1e3e",
            "\u00b4N": "\u0143",
            "\u00b4O": "\u00d3",
            "\u00b4P": "\u1e54",
            "\u00b4R": "\u0154",
            "\u00b4S": "\u015a",
            "\u00b4U": "\u00da",
            "\u00b4W": "\u1e82",
            "\u00b4Y": "\u00dd",
            "\u00b4Z": "\u0179",
            "\u00b4a": "\u00e1",
            "\u00b4c": "\u0107",
            "\u00b4e": "\u00e9",
            "\u00b4g": "\u01f5",
            "\u00b4i": "\u00ed",
            "\u00b4k": "\u1e31",
            "\u00b4l": "\u013a",
            "\u00b4m": "\u1e3f",
            "\u00b4n": "\u0144",
            "\u00b4o": "\u00f3",
            "\u00b4p": "\u1e55",
            "\u00b4r": "\u0155",
            "\u00b4s": "\u015b",
            "\u00b4u": "\u00fa",
            "\u00b4w": "\u1e83",
            "\u00b4y": "\u00fd",
            "\u00b4z": "\u017a",
            "\u00b4\u00c5": "\u01fa",
            "\u00b4\u00c6": "\u01fc",
            "\u00b4\u00d8": "\u01fe",
            "\u00b4\u00e5": "\u01fb",
            "\u00b4\u00e6": "\u01fd",
            "\u00b4\u00f8": "\u01ff",
            "` ": "`",
            "`A": "\u00c0",
            "`E": "\u00c8",
            "`I": "\u00cc",
            "`N": "\u01f8",
            "`O": "\u00d2",
            "`U": "\u00d9",
            "`W": "\u1e80",
            "`Y": "\u1ef2",
            "`a": "\u00e0",
            "`e": "\u00e8",
            "`i": "\u00ec",
            "`n": "\u01f9",
            "`o": "\u00f2",
            "`u": "\u00f9",
            "`w": "\u1e81",
            "`y": "\u1ef3"
        }
    };
    Keyboard.layouts['ukr']={//乌克兰语      uk_101
        'name' : 'Ukrainian',
        'lang' : 'ukr',
        "lay":{
            'normal' : [
                "' 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
                "\u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u0457",
                "{change} \u0444 \u0456 \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u0454 \u0491",
                "{shift} \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e . {shift}",
                "{alt} &nbsp {alt}"
            ],
            'shift' : [
                '\u20b4 ! " \u2116 ; % : ? * ( ) _ + {bksp}',
                "\u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u0407",
                "{change} \u0424 \u0406 \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u0404 \u0490",
                "{shift} \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e , {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt' : [
                "{} {} {} {} {} {} {} {} {} {} {} {} {} {bksp}",
                "{} {} {} {} {} {} \\ {} {} {} {} {}",
                "{change} {} {} {} {} {} {} {} {} {} {} {} {}",
                "{shift} {} {} {} {} {} {} {} {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ],
            'alt-shift' : [
                "{} {} {} {} {} {} {} {} {} {} {} {} {} {bksp}",
                "{} {} {} {} {} {} / {} {} {} {} {}",
                "{change} {} {} {} {} {} {} {} {} {} {} {} {}",
                "{shift} {} {} {} {} {} {} {} {} {} {} {shift}",
                "{alt} &nbsp {alt}"
            ]
        }
    };
    win.Keyboard=Keyboard;
})(window)
