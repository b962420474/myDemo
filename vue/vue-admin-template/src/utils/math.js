export function getMax(array){
    var max=array[0];
    array.forEach(element => {
        if(max<element){
            max=element;
        }
    });
    return max;
}
export function getMaxN(a){
    let i=0;
    if(a>=1){
        while(a>=10){
            i++;
            a=a%10;
        }
        return i
    }
    else{
        while(a<1){
            i--;
            a=a*10;
            console.log(a);
        }
        return i
    }
}
export function getSum(array){
    return array.reduce((num,total)=>{
        return num+total;
    })
}
export function getTextSize(x,y,start,end,r){
    let rad=start+(end-start)/2;
    return {
        x:x+r*Math.cos(rad),
        y:y+r*Math.sin(rad),
        rad:rad
    }
}