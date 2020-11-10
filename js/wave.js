//定义一个池子和fruit一样  用完死亡
var waveObj = function () {

    this.x = [];
    this.y = [];
    this.alive = [];//圆圈活性
    this.r = [];
}
waveObj.prototype.num = 10;
waveObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {

        this.alive[i] = false;
        this.r[i] = 0;
    }
}
waveObj.prototype.draw = function () {
    //console.log("1111")
    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;//阴影大小
    ctx1.shadowColor = "white";//阴影颜色
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            this.r[i] += deltaTime * 0.04;//控制圈圈扩散的快慢
            if (this.r[i] > 50) {
                this.alive[i] = false;//圆圈死亡
                break;//跳出循环
            }
            var alpha = 1 - this.r[i] / 50;//半径变为50时，透明度alpha为零  超过[o,1]默认透明度为0
            //api
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);//绘制圆 以前两个点为原点 第三个值为半径 4  5个值为弧度大小
            ctx1.closePath();//这是闭合路径  告诉程序
            ctx1.strokeStyle = "rgba(255,255,255," + alpha + ")";//描边样式
            ctx1.stroke();//可以描边了  用strokeStyle  描边
            //draw
            //console.log("draw")
        }
    }
    ctx1.restore();
}
//池子
waveObj.prototype.born = function (x, y) {
    for (var i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
            this.alive[i] = true;
            this.r[i] = 10;
            this.x[i] = x;
            this.y[i] = y;
            //console.log("born");
            //born
            return;//只出生一个  return
        }
    }
}