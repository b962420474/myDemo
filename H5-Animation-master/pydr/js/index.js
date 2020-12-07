var width = window.innerWidth;
var height = window.innerHeight;

// 创建游戏实例
var game = new Phaser.Game(width, height, Phaser.AUTO, '#game');
var states = {
    // 加载场景
    preload: function () {
        this.preload = function () {
            game.stage.backgroundColor = '#000000';
            game.load.crossOrigin = 'anonymous'; // 设置跨域
            game.load.image('startbg', 'img/Interface/startbg.jpg');
            game.load.image('login', 'img/Interface/login.png');
            // 添加进度文字
            var progressText = game.add.text(game.world.centerX, game.world.centerY, '0%', {
                fontSize: '60px',
                fill: '#ffffff'
            });
            progressText.anchor.setTo(0.5, 0.5);
            // 监听加载完一个文件的事件
            game.load.onFileComplete.add(function (progress) {
                progressText.text = progress + '%';
            });
            // 监听加载完毕事件
            game.load.onLoadComplete.add(onLoad);
            // 加载完毕回调方法
            function onLoad() {
                // 已到达最小展示时间，可以进入下一个场景
                game.state.start('created');
            }
        }
    },
    // 开始场景
    created: function () {
        this.create = function () {
            // 添加背景
            var bg = game.add.image(0, 0, 'startbg');
            bg.width = game.world.width;
            bg.height = game.world.height;
            // 添加logo
            game.add.image(game.world.width / 2 - 387 / 2, game.world.height / 2 - 287 / 2 - 80, 'login');
            startRect = {
                x: game.world.width / 2 - 200 / 2,
                y: game.world.height / 2 - 60 / 2 + 100,
                w: 200,
                h: 60
            };
            var bar = game.add.graphics();
            bar.beginFill(16749577, 1);
            bar.drawRect(startRect.x, startRect.y, startRect.w, startRect.h);
            var start = game.add.text(0, 0, '开始游戏', {
                font: "20px arial",
                fill: '#ffffff',
                align: "center",
                boundsAlignH: "center",
                boundsAlignV: "middle",
            });
            start.setTextBounds(startRect.x, startRect.y, startRect.w, startRect.h);
            start.inputEnabled = true;
            down = function () {
                console.log("......");
            }
            start.events.onInputDown.add(down, this);
        }
    },
    // 游戏场景
    play: function () { },
    // 结束场景
    over: function () { }
};

// 添加场景到游戏示例中
Object.keys(states).map(function (key) {
    game.state.add(key, states[key]);
});
game.state.start('preload');