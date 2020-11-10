var aneObj = function () {
    //start  point, control point,end point


    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.amp = [];//振幅
    this.alpha = 0;

}
aneObj.prototype.num = 50;
aneObj.prototype.init = function () {

    for (var i = 0; i < this.num; i++) {
        this.rootx[i] = i * 16 + Math.random() * 20;// 随机数取值范围[0,1)
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 250 + Math.random() * 50;
        this.amp[i] = Math.random() * 20 + 30;
    }

}
aneObj.prototype.draw = function () {

    this.alpha += deltaTime * 0.0008;

    var l = Math.sin(this.alpha);//[-1,1]
    ctx2.save();//与  ctx2.restore();成对  样式只在这两个api间起作用 超出这两个之间样式就会消失
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;//线宽
    ctx2.lineCap = "round";
    ctx2.strokeStyle = '#3b154e';//线的颜色
    for (var i = 0; i < this.num; i++) {
        //beginPath,moveTo,lineTO,stroke,strokeStyle,lintWidth,lineCap,globalAlpha
        ctx2.beginPath();//绘画开始
        ctx2.moveTo(this.rootx[i], canHeight);//告诉场景到某个位置
        this.headx[i] = this.rootx[i] + l * this.amp[i]
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);//画线段到某个位置
        ctx2.stroke();//绘画结束
    }
    ctx2.restore();
}
