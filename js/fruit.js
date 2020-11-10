orange = document.getElementById("imgS1")
blue = document.getElementById("imgS2")
var fruitObj = function () {


    this.alive = [];//bool  活性  生死
    this.x = [];//横坐标
    this.y = [];//纵坐标
    this.l = [];//图片的长度
    this.spd = [];//小球移动速度
    this.fruitType = [];//小球的颜色  果实
    this.aneNumber = [];
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNumber[i] = 0;
        this.l[i] = 0;//图片的长度 
        this.fruitType[i] =//orange，blue
            this.spd[i] = Math.random() * 0.017 + 0.003;//[0.03,0.02]

    }

}
//绘制海葵  使海葵以不同的速度向上漂浮并且变大  
fruitObj.prototype.draw = function () {

    for (var i = 0; i < this.num; i++) {
        //draw
        //find an ane,grow,fly up
        if (this.alive[i]) {
            if (this.fruitType[i] == "blue") {
                var pic = blue;//img2是蓝色小球
            }
            else {
                var pic = orange;//img1是橙色小球
            }
            //grow

            if (this.l[i] < 14) {
                var number = this.aneNumber[i];
                this.x[i] = ane.headx[number];
                this.y[i] = ane.heady[number];
                this.l[i] += this.spd[i] * deltaTime;
                //图片大小随时间增长  用deltaTime使其变得平滑
            }
            else {
                this.y[i] -= this.spd[i] * 7 * deltaTime;//果实的y纵坐标  向上飘  以不同的速度 
            }
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5,
                this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);//使果实在海葵的正上方 需要减去果实图片的一半大小 x 和y
            //这里的10是padding
            if (this.y[i] < 10) {
                this.alive[i] = false;

            }
        }
    }
}

//小球出生在海葵上  一次出生一个
fruitObj.prototype.born = function (i) {


    this.aneNumber[i] = Math.floor(Math.random() * ane.num);//随机海葵
    //this.x[i] = ane.rootx[aneID];//海葵的x坐标
    //this.y[i] = ane.heady[aneID];//海葵的纵坐标   div canvas的高度减去海草的高度
    this.l[i] = 0;//小球初始化大小为零
    this.alive[i] = true;
    var ran = Math.random();
    if (ran < 0.1) {
        this.fruitType[i] = "blue";//使蓝色小球少一点
    }
    else {
        this.fruitType[i] = "orange";
    }
}
fruitObj.prototype.dead = function (i) {

    this.alive[i] = false;
}
//监视果实的数量  使屏幕上的果实保证一定的数量
function fruitMonitor() {

    var num = 0
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) num++;
    }
    if (num < 15) {
        //send fruit
        sendFruit();
        return;
    }
}
function sendFruit() {
    for (var i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {
            fruit.born(i);//传回  fruitObj.prototype.born = function (i)
            return;
        }
    }
}
