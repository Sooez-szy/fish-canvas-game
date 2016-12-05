var fruitObj = function(){
    this.alive = [];
    this.x = [];
    this.y = [];
    this.aneNo = [];
    this.l = [];
    this.speed = [];
    this.fruitType = [];
    this.orange = new Image();
    this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function(){
    for(var i = 0;i<this.num;i++){
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.aneNo[i] = 0;
        //每个果实设置随机速度
        this.speed[i] = Math.random() * 0.017+ 0.003;
        this.born(i)
    }
    this.orange.src = './src/fruit.png';
    this.blue.src = './src/blue.png';
}
fruitObj.prototype.draw = function(deltaTime){
    for(var i=0;i<this.num;i++){
        //判断 果实是否为 存活状态
        if(this.alive[i]){
            if(this.fruitType[i]=='blue'){
                var pic = this.blue;
            }else if(this.fruitType[i]=='orange'){
                var pic = this.orange;
            }
            if(this.l[i] <= 14){
                //设置果实大小
                this.x[i] = ane.headx[this.aneNo[i]];
                this.y[i] = ane.heady[this.aneNo[i]];
                this.l[i] += this.speed[i]* deltaTime;
            }else{
                //设置果实上升位置
                this.y[i] -= this.speed[i] * 7 * deltaTime;
            }
            //绘制果实
            ctx2.drawImage(pic,this.x[i] - this.l[i] * .5 ,this.y[i] - this.l[i] * .5 ,this.l[i] ,this.l[i])
            //果实快要脱离屏幕时 让alive状态变为false
            if(this.y[i] < 10){
                this.alive[i] = false;
            }
        }
        
    }
}

//计算果实出生位置
fruitObj.prototype.born = function(i){
    this.aneNo[i] = Math.floor(Math.random()*ane.num);
    this.l[i] = 0;
    this.alive[i] = true;
    var ran = Math.random();
    if(ran < 0.1){
        this.fruitType[i] = 'blue';
    }else{
        this.fruitType[i] = 'orange';
    }

}
fruitObj.prototype.dead = function(i){
    this.alive[i] = false;
}


//判断当前果实的个数
function fruitMonitor(fruit){
    var num = 0;
    for(var i = 0;i<fruit.num;i++){
        if(fruit.alive[i]) num++
    }
    if(num < 15){
        sendFruit(fruit)
        return;
    }
}

function sendFruit(fruit){
    for(var i =0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}

