var request = null;
var db = null;
var da_name;
const open = function (params) {
    request = window.indexedDB.open(params.name);
    return new Promise((resolve,reject)=>{
        request.onerror = function (event) {
            console.log('数据库打开报错');
            reject();
        };
        request.onsuccess = function (event) {
            db = request.result;
            da_name=params.name;
            console.log('数据库打开成功');
            resolve();
        };
        request.onupgradeneeded = function (event) {
            db = event.target.result;
            db.createObjectStore(
                'person',
                { autoIncrement: true }
              );
            console.log("onupgradeneeded..");
        }
    })
}
const insert = function (tb_name, data) {
    return new Promise((resolve, reject) => {
        var r = db.transaction([tb_name], 'readwrite')
            .objectStore(tb_name)
            .add(data);
        r.onsuccess = function (event) {
            console.log('数据写入成功');
            resolve();
        };

        r.onerror = function (event) {
            console.log('数据写入失败');
            reject();
        }
    })
}
const remove = function (tb_name, index) {
    return new Promise((resolve, reject) => {
        var r = db.transaction([tb_name], 'readwrite')
            .objectStore(tb_name)
            .delete(index);

        r.onsuccess = function (event) {
            console.log('数据删除成功');
            resolve();
        };
    })
}

const update = function (tb_name, data) {
    return new Promise((resolve, reject) => {
        var r = db.transaction([tb_name], 'readwrite')
            .objectStore(tb_name)
            .put(data);

        r.onsuccess = function (event) {
            console.log('数据写入成功');
            resolve();
        };

        r.onerror = function (event) {
            console.log('数据写入失败');
            reject();
        }
    })
}
const query = function (tb_name, index) {
    return new Promise((resolve, reject) => {
        var r = db.transaction([tb_name], 'readwrite')
            .objectStore(tb_name)
            .get(index);

        r.onsuccess = function (event) {
            if (r.result) {
                resolve(r.result)
            } else {
                resolve(null)
            }
        };

        r.onerror = function (event) {
            console.log('事务失败');
            reject();
        }
    })
}
const queryAll = function (tb_name) {
    return new Promise((resolve, reject) => {
        var data=[];
        var objectStore = db.transaction(tb_name).objectStore(tb_name)
        objectStore.openCursor().onsuccess = function (event) {
            console.log("--------------");
            var cursor = event.target.result;
            if (cursor) {
                console.log(cursor);
                cursor.continue();
            } else {
                console.log('没有更多数据了！');
            }
        };
    })
}

// open({name:"demodb"}).then(()=>{
//     return insert("pesion",{sdff:454545});
// }).then(()=>{
//     queryAll("person")
// })


function m() { 
    var r = bindThis(function(a, b)
        {
            return this.test + a + b
        }, 
        {test: 2}
        )(2, 3); 
    return r === 7; 
}

function bindThis(f, oTarget) {

    return function(){
        var args=arguments;
        return f.apply(oTarget,args)
    }
}
m();