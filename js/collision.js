function momFruitsCollision(){
	if(!data.gameOver){
		for(var i = 0;i<fruit.num;i++){
			if(fruit.alive[i]){
				//获取大鱼与果实距离的平方
				var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(l<900){
					//fruit被吃掉
					fruit.dead(i);
					data.fruitNum++;
					if(mom.momBodyCount<7){
						mom.momBodyCount ++;
					}
					if(fruit.fruitType[i] == 'blue'){
						data.double = 2;
					}
					wave.born(fruit.x[i],fruit.y[i])
				}
			}
		}	
	}
}
// 大鱼喂小鱼
function momBabyCollision(){
	if(!data.gameOver){
		var l = calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l<900){
			data.fruitNum>0?baby.babyBodyCount = 0:baby.babyBodyCount = baby.babyBodyCount;
			//scoure updata
			data.addScore()
			data.reset()
			mom.momBodyCount = 0;
			halo.born(baby.x,baby.y);
		}
	}
}

