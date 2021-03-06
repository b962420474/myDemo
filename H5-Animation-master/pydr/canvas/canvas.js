var HGAME=new Object();
var METHOD = new Object();
function CEvent(target,e){
    this.isPropagation=true;
    this.target=target;
    this.x=e.offsetX;
    this.y=e.offsetY;
    this.offsetX=this.x-target.left;
    this.offsetY=this.y-target.top;
}
CEvent.prototype.stopPropagation=function(){
    this.isPropagation=false;
}
function Canvas(el) {
    this.canvas = el;
    this.events={
        startX:0,
        startY:0
    }
    this.cxt = this.canvas.getContext("2d");
    this.canvas.addEventListener("mouseup", (e) => {
        bind(e, this, "mouseup");
        if (!isMove) {
            bind(e, this, "click");
        }
        isMove = false;
        isDown = false;
    })
    this.canvas.addEventListener("mousedown", (e) => {
        isDown = true;
        this.events.startX=e.clientX;
        this.events.startY=e.clientY
        bind(e, this, "mousedown")
    })
    this.canvas.addEventListener("mousemove", (e) => {
        if (isDown&&(this.events.startX !== e.clientX || this.events.startY !== e.clientY)) {
            console.log("move..");
            isMove = true;
            bind(e, this, "mousemove")
        }
    })
}
function bind(e, m, name) {
    self = m;
    const x = e.offsetX;
    const y = e.offsetY;
    var target=null;
    self.body&&self.body.children&&(target=EventCapture(self.body.children,x,y));
    if(target==null) return;
    var event=new CEvent(target,e);
    target&&target.events[name]&&target.events[name].call(target,event);
    while(target&&target.parent!=null&&event.isPropagation){
        event=new CEvent(target.parent,e);
        target.parent.events[name]&&target.parent.events[name].call(target.parent,event);
        target=target.parent;
    }
}
function EventCapture(doms,x,y){
    var target=null;
    for(var i=0;i<doms.length;i++){
        if (doms[i].isPointInPath(x, y)){
            target=doms[i];
            if(doms[i].children.length>0){
                var ct=EventCapture(doms[i].children,x,y)
                target=ct!=null?ct:target;
            }
            break;
        }
    }
    return target;
}
isMove = false;
isDown = false;
Canvas.prototype.init = function () {
    this.body = null;
    this.clear();
}
Canvas.prototype.clear = function () {
    this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
Canvas.prototype.createCImage = function (option) {
    option.canvas = this.canvas;
    var c = new CImage(option)
    return c;
}
Canvas.prototype.createDiv = function (option) {
    option.canvas = this.canvas;
    var div=new CDiv(option);
    return div;
}
Canvas.prototype.createbody = function ({background,background_url}) {
    const option={
        left: 0,
        top: 0,
        background:background
    }
    option.canvas = this.canvas;
    option.width=this.canvas.width;
    option.height=this.canvas.height;
    var div=new CDiv(option);
    this.body=div;
    div.render();
    if(background_url){
        var c = this.createCImage({
            url: background_url
        });
        div.add(c);
    }
    return div;
}
class CClass {
    constructor({ canvas,left=0,top=0, width = 0, height = 0,border = 0, margin = 0,position="absolute", background}) {
        this.background = background
        this.canvas = canvas
        this.border = border
        this.margin = margin
        this.width = width
        this.height = height
        this.dataset = {};
        this.parent=null;
        this.children=[];
        this.left=left;
        this.top=top;
        this.index=0;
        this.position=position;
        this.cxt=this.canvas.getContext('2d');
        this.cxt.beginPath();
        this.cxt.lineWidth=this.border;
        this.background?this.cxt.fillStyle=this.background:null;
        this.events={};
    }
    add(c){
        this.children.push(c);
        c.index=this.children.length-1;
        c.parent=this;
        c.render();
    }
    data(key, value) {
        if (value) {
            this.dataset[key] = value;
        }
        else {
            return this.dataset[key];
        }
    }
    calposition(){
        var parentLeft=this.parent?this.parent.left:0;
        var parentTop=this.parent?this.parent.top:0;
        this.left+=this.border/2;
        this.top+=this.border/2;
        switch(this.position){
            case "relative":
                if(!this.display||this.display=="inline-block"){
                    var left=this.left;
                    var top=this.top;
                    this.left=this.left+parentLeft+this.margin+(2*this.margin+this.width)*this.index;
                    this.top=this.top+parentTop+this.margin;
                    if(this.left+this.width>this.parent.width+parentLeft){
                        var index=Math.floor((this.left+this.width-parentLeft)/this.parent.width);
                        var num=Math.floor(this.parent.width/(this.width+this.margin*2))
                        this.left=left+parentLeft+this.margin+(2*this.margin+this.width)*(this.index-num*index);
                        this.top=top+parentTop+this.margin+(2*this.margin+this.height)*index;
                    }
                }
                else if(this.display=="block"){
                    this.left=this.left+parentLeft+this.margin;
                    this.top=this.top+parentTop+this.margin+(2*this.margin+this.height)*this.index;
                }
            break;
            case "absolute":
            default:
                this.left=this.left+parentLeft;
                this.top=this.top+parentTop;
        }
    }
    clear(){
        this.cxt.clearRect(this.left,this.top,this.width,this.height);
    }
    addEventListener(name,fnc){
        this.events[name]=fnc;
    }
    removeEventListener(name){
        this.events[name]=null;
    }
}
class CDiv extends CClass {
    constructor({ canvas,left=0,top=0, width = 0, height = 0,border = 0, margin = 0, background,position,border_radis=0}) {
        super({ canvas: canvas,left:left,top:top, border: border, margin: margin, width: width, height: height, background: background,position });
        this.border_radis=border_radis;
    }
    render(){
        this.calposition();
        if(this.border_radis){
            var min=Math.min(this.width,this.height);
            var r=this.border_radis=Math.min(min,this.border_radis);
            this.cxt.moveTo(this.left,this.top+r);
            this.cxt.lineTo(this.left,this.top+this.height-r);
            this.cxt.arcTo(this.left,this.top+this.height,this.left+r,this.top+this.height,r);
            this.cxt.lineTo(this.left+this.width-r,this.top+this.height);
            this.cxt.arcTo(this.left+this.width,this.top+this.height,this.left+this.width,this.top+this.height-r,r);
            this.cxt.lineTo(this.left+this.width,this.top+r);
            this.cxt.arcTo(this.left+this.width,this.top,this.left+this.width-r,this.top,r);
            this.cxt.lineTo(this.left+r,this.top);
            this.cxt.arcTo(this.left,this.top,this.left,this.top+r,r);
            this.cxt.stroke();
        }
        else{
            this.cxt.rect(this.left,this.top,this.width,this.height);
        }
        if(this.background){
            this.cxt.fill();
        }
    }
    isPointInPath(x, y){
        return x > this.left && x < this.left + this.width && y > this.top && y < this.top + this.height;
    }
    setText(){

    }
}
class CButton extends CDiv {
    constructor({ canvas,left=0,top=0, width = 0, height = 0,border = 0, margin = 0, background,position}) {
        super({ canvas: canvas,left:left,top:top, border: border, margin: margin, width: width, height: height, background: background,position });
    }
    render(){
        this.calposition();
        this.cxt.rect(this.left,this.top,this.width,this.height);
        if(this.background){
            this.cxt.fill();
        }
    }
    isPointInPath(x, y){
        return x > this.left && x < this.left + this.width && y > this.top && y < this.top + this.height;
    }
    setText(){

    }
}
class CImage extends CClass{
    constructor({ img, x, y, w, border = 0, margin = 0,background = 'rgba(255, 255, 255, 0)', canvas,position }){
        super({ canvas: canvas,left:x,top:y, border: border, margin: margin,background: background,position })
        this.img = img;
        this.width = w ? w : this.img.width;
        this.height = this.width / this.img.width * this.img.height;
    }
    render(){
        this.calposition();
        this.canvas.getContext('2d').drawImage(this.img, this.left, this.top, this.width, this.height);
    }
    isPointInPath(x, y){
        return x > this.left && x < this.left + this.width && y > this.top && y < this.top + this.height;
    }
}
