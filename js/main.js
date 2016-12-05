var can1;
var can2;

var ctx1;
var ctx2;
var mx;
var my;
var ane;
var fruit;
var mom;
var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];
var dust ;
var dustPic = [];

var baby;
var babyTail = [];
var babyEye = [];
var babyBody = [];
var data;
var wave;
var hello;
var canWidth;
var canHeight;

var bgPic = new Image();
document.body.onload = game;
function game(){
    init()
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}
//
function init(){
    can1 = document.getElementById('canvas1'); //fishes,dust,UI,circle
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById('canvas2');//background,ane,fruits
    ctx2 = can2.getContext('2d');
    

    bgPic.src = './src/background.jpg';
    canWidth = can1.width;
    canHeight = can1.height;
    ane = new aneObj();
    ane.init();
    fruit = new fruitObj();
    fruit.init();
    mom = new momObj();
    mom.init();
    baby = new babyObj();
    baby.init();

    mx = canWidth * .5;
    my = canHeight * .5;
    for(var i = 0;i<8;i++){
        momTail[i] = new Image();
        momTail[i].src = "./src/bigTail"+ i + ".png";
    }
    for(var i=0;i<2;i++){
        momEye[i] = new Image();
        momEye[i].src = "./src/bigEye"+ i + ".png";
    }
    for(var i =0;i<8;i++){
        momBodyOra[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOra[i].src = './src/bigSwim' + i +'.png';
        momBodyBlue[i].src = './src/bigSwimBlue' + i +'.png';
    }
    for(var i = 0;i<8;i++){
        babyTail[i] = new Image();
        babyTail[i].src = "./src/babyTail"+ i + ".png";
    }
    for(var i=0;i<2;i++){
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye"+ i + ".png";
    }
    for(var i=0;i<20;i++){
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade"+ i + ".png";
    }
    data = new dataObj();
    can1.addEventListener('mousemove',onMouseMove,false);
    wave = new waveObj();
    wave.init()
    halo = new haloObj();
    halo.init()
    for(var i =0;i<7;i++){
        dustPic[i] = new Image();
        dustPic[i].src = "./src/dust" + i +".png";
    }
    dust = new dustObj();
    dust.init();
}

function gameloop(){
    window.requestAnimFrame(gameloop);
    var now = Date.now();
    //没两帧之间的时间间隔
    deltaTime = now - lastTime;
    lastTime = now;
    if(deltaTime > 40)deltaTime = 40;
    //绘制背景
    drawBackground();
    
    ane.draw();
    fruitMonitor(fruit);
    fruit.draw(deltaTime);

    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    baby.draw();
    momFruitsCollision();
    momBabyCollision();
    ctx1.fillStyle = 'white';
    ctx1.font = '25px Verdana';
    ctx1.textAlign = 'center';
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();


}

function onMouseMove(e){
    if(!data.gameOver){
        if(e.offSetX || e.layerX){
            mx = e.offsetX ? e.layerX:e.offSetX;
            my = e.offsetY ? e.layerY:e.offSetY;
        }
    }
}