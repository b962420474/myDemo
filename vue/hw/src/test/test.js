
import i18n from '@/util/i18n'
const a = [
    {
        path: "healthy",
    },
    {
        path: "pizza",
        params: {
            head: {
                title: i18n.t("Standard"),
                backurl: "/healthy"
            },
            mwo: false
        },
        mn: "heating?Standard"
    },
    {
        path: "healthy",
    },
    {
        path: "pizza",
        params: {
            head: {
                title: i18n.t("convection"),
                backurl: "/healthy"
            },
            mwo: false
        },
        mn: "heating?Convection"
    },
    {
        path: "healthy",
    },
    {
        path: "pizza",
        params: {
            head: {
                title: i18n.t("ECO"),
                backurl: "/healthy"
            },
            mwo: false
        },
        mn: "heating?ECO"
    },
    {
        path: "healthy",
    },
    {
        path: "pizza",
        params: {
            head: {
                title: i18n.t("fanned"),
                backurl: "/healthy"
            },
            mwo: false
        },
        mn: "heating?Fanned"
    },
    {
        path: "healthy",
    },
    {
        path: "pizza",
        params: {
            head: {
                title: i18n.t("grill"),
                backurl: "/healthy"
            },
            mwo: false
        },
        mn: "heating?Grills"
    },
    {
        path: "healthy",
    },
    {
        path: "pizza",
        params: {
            head: {
                title: i18n.t("grill_Fan"),
                backurl: "/healthy"
            },
            mwo: false
        },
        mn: "heating?Grill_Fans"
    },
    {
        path: "healthy",
    },
    {
        path: "pizza",
        params: {
            head: {
                title: i18n.t("double_grill"),
                backurl: "/healthy"
            },
            mwo: false
        },
        mn: "heating?Double_grills"
    },
    {
        path: "healthy",
    },
    {
        path: "pizza",
        params: {
            head: {
                title: i18n.t("bottom"),
                backurl: "/healthy"
            },
            mwo: false
        },
        mn: "heating?Bottom"
    },
    {
        path: "healthy",
    },
    {
        path: "pizza",
        params: {
            head: {
                title: i18n.t("slow_cook"),
                backurl: "/healthy"
            },
            mwo: false
        },
        mn: "heating?Slow_cooks"
    },
    {
        path: "healthy",
    },
    {
        path: "pizza",
        params: {
            head: {
                title: i18n.t("preserve"),
                backurl: "/healthy"
            },
            mwo: false
        },
        mn: "heating?Preserve"
    },
    {
        path: "healthy",
    },
    {
        path: "pizza",
        params: {
            head: {
                title: i18n.t("warm_plate"),
                backurl: "/healthy"
            },
            mwo: false
        },
        mn: "heating?Warm_plate"
    },
    {
        path: "healthy",
    },
    {
        path: "pizza",
        params: {
            head: {
                title: i18n.t("dry"),
                backurl: "/healthy"
            },
            mwo: false
        },
        mn: "heating?Dry"
    },
    {
        path: "healthy",
    },
    {
        path: "pizza",
        params: {
            head: {
                title: i18n.t("Pizza"),
                backurl: "/healthy"
            },
            mwo: false
        },
        mn: "heating?Pizzas"
    },
    {
        path: "healthy",
    },
    {
        path: "main",
    },
    {
        path: "defrost",
    },
    {
        path: "defrostItem",
        params: {
            "title":i18n.t("meat"),
            "imgurl":require("../assets/img/DSLayerButton0_BackgroundImage.png"),
            "backurl":"/defrost"
        },
        mn: "defrost?meat"
    },
    {
        path: "defrost",
    },
    {
        path: "defrostItem",
        params: {
            "title":i18n.t("defrost"),
            "imgurl":require("../assets/img/DSLayerButton1_BackgroundImage.png"),
            "backurl":"/bird"
        },
        mn: "defrost?meat"
    },
    {
        path: "defrost",
    },
    {
        path: "defrostItem",
        params: {
            "title":i18n.t("fish"),
            "imgurl":require("../assets/img/DSLayerButton2_BackgroundImage.png"),
            "backurl":"/defrost"
        },
        mn: "defrost?fish"
    },
    {
        path: "defrost",
    },
    {
        path: "defrostItem",
        params: {
            "title":i18n.t("Vegetables"),
            "imgurl":require("../assets/img/DSLayerButton3_BackgroundImage.png"),
            "backurl":"/defrost"
        },
        mn: "defrost?vegetables"
    },
    {
        path: "defrost",
    },
    {
        path: "defrostItem",
        params: {
            "title":i18n.t("Manual"),
            "imgurl":require("../assets/img/DSLayerButton4_BackgroundImage.png"),
            "backurl":"/defrost"
        },
        mn: "defrost?manual"
    },
    {
        path: "main",
    },
    {
        path: "presets",
    },
    {
        path: "presetsItem",
    },
    {
        path: "healthyOption",
    },
    {
        path: "heatingItem",
        params: {
            "imgurl":require("../assets/img/HSLayerDMFrstStandardSmallButton_BackgroundImage.png"),
        },
        mn: "presets?heating-Standard"
    },
    {
        path: "healthyOption",
    },
    {
        path: "heatingItem",
        params: {
            "imgurl":require("../assets/img/HSLayerDMFrstConvectionSmallButton_BackgroundImage.png"),
        },
        mn: "presets?heating-Convection"
    },
    {
        path: "healthyOption",
    },
    {
        path: "heatingItem",
        params: {
            "imgurl":require("../assets/img/HSLayerDMScndPizzaSmallButton_BackgroundImage.png"),
        },
        mn: "presets?heating-Pizzas"
    },
    {
        path: "healthyOption",
    },
    {
        path: "heatingItem",
        params: {
            "imgurl":require("../assets/img/HSLayerDMFrstEcoSmallButton_BackgroundImage.png"),
        },
        mn: "presets?heating-ECO"
    },
    {
        path: "healthyOption",
    },
    {
        path: "heatingItem",
        params: {
            "imgurl":require("../assets/img/HSLayerDMFrstFannedSmallButton_BackgroundImage.png"),
        },
        mn: "presets?heating-Fanned"
    },
    {
        path: "healthyOption",
    },
    {
        path: "heatingItem",
        params: {
            "imgurl":require("../assets/img/HSLayerDMFrstGrillSmallButton_BackgroundImage.png"),
        },
        mn: "presets?heating-Grills"
    },
    {
        path: "healthyOption",
    },
    {
        path: "heatingItem",
        params: {
            "imgurl":require("../assets/img/HSLayerDMFrstGrillFanSmallButton_BackgroundImage.png"),
        },
        mn: "presets?heating-Grill_Fans"
    },
    {
        path: "healthyOption",
    },
    {
        path: "heatingItem",
        params: {
            "imgurl":require("../assets/img/HSLayerDMFrstDoubleGrillSmallButton_BackgroundImage.png"),
        },
        mn: "presets?heating-Double_grills"
    },
    {
        path: "healthyOption",
    },
    {
        path: "heatingItem",
        params: {
            "imgurl":require("../assets/img/HSLayerDMFrstBottomSmallButton_BackgroundImage.png"),
        },
        mn: "presets?heating-Bottom"
    },
    {
        path: "healthyOption",
    },
    {
        path: "heatingItem",
        params: {
            "imgurl":require("../assets/img/HSLayerDMScndSlowCookSmallButton_BackgroundImage.png"),
        },
        mn: "presets?heating-Slow_cooks"
    },
    {
        path: "healthyOption",
    },
    {
        path: "heatingItem",
        params: {
            "imgurl":require("../assets/img/HSLayerDMScndPreserveSmallButton_BackgroundImage.png"),
        },
        mn: "presets?heating-Preserve"
    },
    {
        path: "healthyOption",
    },
    {
        path: "heatingItem",
        params: {
            "imgurl":require("../assets/img/HSLayerDMScndWarmPlateSmallButton_BackgroundImage.png"),
        },
        mn: "presets?heating-Warm_plate"
    },
    {
        path: "healthyOption",
    },
    {
        path: "heatingItem",
        params: {
            "imgurl":require("../assets/img/HSLayerDMScndDrySmallButton_BackgroundImage.png"),
        },
        mn: "presets?heating-Dry"
    },
    {
        path: "presetsItem",
    },
    {
        path: "defrostOption",
    },
    {
        path: "defrostItem",
        params: {
            "imgurl":require("../assets/img/DSLayerButton0_BackgroundImage.png"),
            title:i18n.t("presets"),
            "backurl":"/defrostOption",
        },
        mn: "presets?defrost-meat"
    },
    {
        path: "defrostOption",
    },
    {
        path: "defrostItem",
        params: {
            "imgurl":require("../assets/img/DSLayerButton1_BackgroundImage.png"),
            title:i18n.t("presets"),
            "backurl":"/defrostOption",
        },
        mn: "presets?defrost-bird"
    },
    {
        path: "defrostOption",
    },
    {
        path: "defrostItem",
        params: {
            "imgurl":require("../assets/img/DSLayerButton2_BackgroundImage.png"),
            title:i18n.t("presets"),
            "backurl":"/defrostOption",
        },
        mn: "presets?defrost-fishss"
    },
    {
        path: "defrostOption",
    },
    {
        path: "defrostItem",
        params: {
            "imgurl":require("../assets/img/DSLayerButton3_BackgroundImage.png"),
            title:i18n.t("presets"),
            "backurl":"/defrostOption",
        },
        mn: "presets?defrost-vegetables"
    },
    {
        path: "defrostOption",
    },
    {
        path: "defrostItem",
        params: {
            "imgurl":require("../assets/img/DSLayerButton4_BackgroundImage.png"),
            title:i18n.t("presets"),
            "backurl":"/defrostOption",
        },
        mn: "presets?defrost-manual"
    },
    {
        path: "main",
    },
    {
        path: "settings",
    },
    {
        mn: "setting?setTime"
    },
    {
        mn: "setting?date"
    },
    {
        mn: "setting?language"
    },
    {
        mn: "setting?voice/brightness"
    },
    {
        mn: "setting?voice/volume"
    },
    {
        mn: "setting?setting"
    },
    {
        path: "main",
    },
]
var b = [];

function checke(router) {
    if (b.length < 1) {
        b = a.concat();
    }
    const msg = b[0].params ? { message: b[0].params } : {};
    console.log({ name: b[0].path, params: msg });
    b[0].path?router.push({ name: b[0].path, params: msg }):false;
    try {
        b[0].mn ? document.getElementsByTagName("object")[0].route(b[0].mn) : false;
    }
    catch (e) {
        console.log("route:"+b[0].mn);
    }
    finally {
        b.shift();
    }

}

export default function test(router) {
    setInterval(() => {
        checke(router);
    }, 2000);
}