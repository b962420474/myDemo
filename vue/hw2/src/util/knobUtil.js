const mapping={
    hour:{
        range:[0,23],
        num:1,
    },
    minute:{
        range:[0,59],
        num:1,
    },
    volume:{
        range:[0,3],
        num:1,
    },
    brightness:{
        range:[0,9],
        num:1,
    },
    weight:{
        range:[100,1500],
        num:100,
    },
    vegetables_weight:{
        range:[150,450],
        num:50,
    },
    defrosting_time:{
        range:[1,600],
        num:1,
    },
    temperature:{
        Standard:{
            range:[30,250],
            num:{
                default:[1,5],
                rex:[100,'default']
            },
        },
        Convection:{
            range:[50,250],
            num:{
                default:[1,5],
                rex:[100,'default']
            },
        },
        ECO:{
            range:[140,240],
            num:{
                default:[1,5],
                rex:[100,'default']
            },
        },
        Fanned:{
            range:[50,250],
            num:{
                default:[1,5],
                rex:[100,'default']
            },
        },
        Grills:{
            range:[150,250],
            num:{
                default:[1,5],
                rex:[100,'default']
            },
        },
        Grill_Fans:{
            range:[50,250],
            num:{
                default:[1,5],
                rex:[100,'default']
            },
        },
        Double_grills:{
            range:[150,250],
            num:{
                default:[1,5],
                rex:[100,'default']
            },
        },
        Bottom:{
            range:[30,220],
            num:{
                default:[1,5],
                rex:[100,'default']
            },
        },
        Slow_cooks:{
            range:[80,120],
            num:{
                default:[1,5],
                rex:[100,'default']
            },
        },
        Preserve:{
            range:[60,100],
            num:{
                default:[1,5],
                rex:[100,'default']
            },
        },
        Warm_plate:{
            range:[30,70],
            num:{
                default:[1,5],
                rex:[100,'default']
            },
        },
        Dry:{
            range:[50,150],
            num:{
                default:[1,5],
                rex:[100,'default']
            },
        },
        Pizzas:{
            range:[50,250],
            num:{
                default:[1,5],
                rex:[100,'default']
            },
        },
    },
    timer:{
        Standard:{
            range:[1,240],
            num:1,
        },
        Convection:{
            range:[1,240],
            num:1,
        },
        ECO:{
            range:[1,240],
            num:1,
        },
        Fanned:{
            range:[1,240],
            num:1,
        },
        Grills:{
            range:[1,240],
            num:1,
        },
        Grill_Fans:{
            range:[1,240],
            num:1,
        },
        Double_grills:{
            range:[1,240],
            num:1,
        },
        Bottom:{
            range:[1,240],
            num:1,
        },
        Slow_cooks:{
            range:[1,600],
            num:1,
        },
        Preserve:{
            range:[1,240],
            num:1,
        },
        Warm_plate:{
            range:[1,240],
            num:1,
        },
        Dry:{
            range:[1,600],
            num:1,
        },
        Pizzas:{
            range:[1,240],
            num:1,
        },
    },
    default:{
        range:[0,100],
        num:1
    }

}
function getData(type){
    if(type.indexOf("/")!=-1){
        const arry=type.split("/");
        let data=mapping;
        arry.forEach(element => {
            data=data[element]
        });
        return data;
    }else{
        return mapping[type];
    }
}
export function ins(type,num){
    const s=getData(type);
    let n
    if(typeof s.num !== 'number'){
        for(var i=0;i<s.num.rex.length;i++){
            if(s.num.rex[i]==="default"||s.num.rex[i]>num){
                n=num+s.num.default[i];
                break;
            }
        }
    }
    else{
        n=num+s.num;
    }
    if(n>s.range[1]){
        n=s.range[1];
    }
    return n;
}
export function reduce(type,num){
    const s=getData(type)
    let n;
    if(typeof s.num !== 'number'){
        for(var i=0;i<s.num.rex.length;i++){
            if(s.num.rex[i]==="default"||s.num.rex[i]>=num){
                n=num-s.num.default[i];
                break;
            }
        }
    }
    else{
        n=num-s.num;
    }
    if(n<s.range[0]){
        n=s.range[0];
    }
    return n;
}
export function update(keyCode,type,num){
    console.log("type:"+type);
    if(keyCode==187){
        return ins(type,num);
      }
      else if(keyCode==189){
        return reduce(type,num);
      }
      return 0;
}