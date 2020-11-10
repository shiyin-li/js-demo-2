var can1;
var can2;

var ctx1;
var ctx2;

var lastTime;//上一帧now的时间
var deltaTime;//两帧之间的时间差

var bgPic = new Image();//背景图

var canWidth;
var canHeight;

var ane;//海葵

var fruit;//小球  果实 

var mom;//大鱼
var baby;//小鱼
var mx;//鼠标的x坐标
var my;//鼠标的y坐标
//小鱼
var babyTail = [];//摇尾巴
var babyEye = [];//眨眼睛
var babyBody = [];// 身体变白
//大鱼
var momTail = [];//摇尾巴
var momEye = [];//眨眼睛
var momBodyOra = [];//橙色身体
var momBodyBlue = [];//蓝色身体

var data;//计算数据

var wave;//大鱼吃果实的涟漪
var halo;//大鱼喂小鱼的涟漪 
var dust;//漂浮物
var dustPic = [];//漂浮物绘制
document.body.onload = game;
function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameLoop();
}
function init() {
    // 通过getElementById获得 canvas context即画布 
    can1 = document.getElementById("canvas1");//fishes,dust,ui,circle
    ctx1 = can1.getContext('2d');//加2d
    can2 = document.getElementById("canvas2");//background,ane海草，fruits
    ctx2 = can2.getContext('2d');
    can1.addEventListener('mousemove', onMouseMove, false);//定义
    bgPic.src = "src/background.jpg";

    canWidth = can1.width;
    canHeight = can1.height;
    ane = new aneObj();//画海葵
    ane.init();
    fruit = new fruitObj();//画球球
    fruit.init();
    mom = new momObj();
    mom.init();
    baby = new babyObj();
    baby.init();
    data = new dataObj();

    wave = new waveObj();
    wave.init();
    halo = new haloObj();
    halo.init();
    dust = new dustObj();
    dust.init();
    mx = canWidth * 0.5;//在屏幕上对应的x
    my = canHeight * 0.5;//在屏幕上对应的y
    //生成序列帧
    for (var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "src/babyTail" + i + ".png";
    }
    for (var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = "src/babyEye" + i + ".png";
    }
    for (var i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src = "src/babyFade" + i + ".png";
    }
    for (var i = 0; i < 8; i++) {
        momTail[i] = new Image();
        momTail[i].src = "src/bigTail" + i + ".png";
    }
    for (var i = 0; i < 2; i++) {
        momEye[i] = new Image();
        momEye[i].src = "src/bigEye" + i + ".png";
    }
    for (var i = 0; i < 8; i++) {
        momBodyOra[i] = new Image();
        momBodyOra[i].src = "src/bigSwim" + i + ".png";
        momBodyBlue[i] = new Image();
        momBodyBlue[i].src = "src/bigSwimBlue" + i + ".png";
    }
    for (var i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = "src/dust" + i + ".png";
    }
}

function gameLoop() {
    window.requestAnimationFrame(gameLoop);//setInterval,setTimeout
    //console.log("Loop")
    var now = Date.now();//返回的值是一个真实的绝对值  数
    deltaTime = now - lastTime;//每两帧之间的时间间隔 保证游戏连贯
    lastTime = now;
    if (deltaTime > 40) deltaTime = 40;//优化代码  防止球球变得巨大
    //console.log("deltaTime")
    //console.log(deltaTime)

    drawBackground();
    fruitMonitor();
    ane.draw();
    fruit.draw();

    ctx1.clearRect(0, 0, canWidth, canHeight);//清空上次画布重新绘制
    mom.draw();
    baby.draw();
    momFruitsCollision();
    momBabyCollision();
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}

function onMouseMove(e) {

    if (!data.gameOver) {
        if (e.offSetX || e.layerX) {
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
            // console.log("mx");
            // console.log(mx);
        }

    }
}