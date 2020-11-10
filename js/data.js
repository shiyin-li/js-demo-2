var dataObj = function () {
    this.fruitNum = 0;//橙色球个数
    this.double = 1;//蓝色小球数量
    this.score = 0;
    this.gameOver = false;
    this.alpha = 0;
}
// dataObj.prototype.reset = function () {

//     this.fruitNum = 0;
//     this.double = 1;
// }
dataObj.prototype.draw = function () {

    var w = can1.width;
    var h = can1.height;
    ctx1.save();//又是这一对API 
    ctx1.shadowBlur = "10"//阴影的大小
    ctx1.shadowColor = "white"//阴影的颜色
    ctx1.fillStyle = "white";//字体颜色
    ctx1.font = "30px Verdana";//字体大小 类型
    ctx1.textAlign = "center";//居中显示 文本  默认是left
    // ctx1.fillText("num:" + this.fruitNum, w * 0.5, h - 50);//文字显现的地方
    // ctx1.fillText("double:" + this.double, w * 0.5, h - 80);
    ctx1.fillText("SCORE:" + this.score, w * 0.5, h - 20);
    if (this.gameOver) {
        this.alpha += deltaTime * 0.005;
        if (this.alpha > 1)
            this.alpha = 1;
        ctx1.fillStyle = "rgba(255,255,255," + this.alpha + ")";//前三个是颜色 最后一个是透明度 可以使它的透明度渐渐改变
        ctx1.fillText("GAMEOVER", w * 0.5, h * 0.5);
        ctx1.restore();
    }

}

dataObj.prototype.addScore = function () {

    this.score += 100 * this.fruitNum * this.double;
    this.fruitNum = 0;//橙色球个数
    this.double = 1
}
