function EventTarget() {
    this.handlers = {};
}
EventTarget.prototype = {
    constructor: EventTarget,
    addHandler: function (type, handler) {
        if (typeof this.handlers[type] == "undefined") {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire: function (event) {
        if (!event.target) {
            event.target = this;
        }
        if (this.handlers[event.type] instanceof Array) {
            var handlers = this.handlers[event.type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i](event);
            }
        }
    },
    removeHandler: function (type, handler) {
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                if (handlers[i] === handler) {
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    }
};
function Person(name, age) {
    EventTarget.call(this);
    this.name = name;
    this.age = age;
}
function inheritObject(o){//对象继承封装
    var F = function(){};
    F.prototype = o;
    return new F();
}
function inheritPrototype(subclass,supperclass){//原型继承封装
    var obj =inheritObject(supperclass.prototype);
    obj.constructor = subclass;
    subclass.prototype = obj;
}
inheritPrototype(Person, EventTarget);
Person.prototype.say = function (message) {
    this.fire({ type: "message", message: message });
};
function handleMessage(event) {
    console.log(event.target.name + " says: " + event.message);
}
//创建新 person 
var person = new Person("Nicholas", 29);
//添加一个事件处理程序
person.addHandler("message", handleMessage);
//在该对象上调用 1 个方法，它触发消息事件
person.say("Hi there.");
var e=new EventTarget();