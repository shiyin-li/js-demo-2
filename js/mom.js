
var momObj = function () {
    this.x;
    this.y;
    this.angle;
    this.momTailTimer = 0;//计时器
    this.momTailCount = 0;//从第零帧开始
    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;
    this.momBodyCount = 0;

}
//大鱼的初始化
momObj.prototype.init = function () {

    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
}
//绘制大鱼
momObj.prototype.draw = function () {

    //lerp,x,y   lerp会使运动更加流畅


    this.x = lerpDistance(mx, this.x, 0.97);//0.98  运动的快慢 越接近1越慢
    this.y = lerpDistance(my, this.y, 0.97);
    //Math.atan2(x,y)
    var deltaX = mx - this.x;
    var deltaY = my - this.y;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;//-PI,PI  
    //lerp angle  返回值是在[-PI,PI]之间
    this.angle = lerpAngle(beta, this.angle, 0.6);
    this.momTailTimer += deltaTime;

    //大于50ms时序列帧生成
    if (this.momTailTimer > 50) {
        this.momTailCount = (this.momTailCount + 1) % 8;//对8取模使其只加载7张图片
        this.momTailTimer %= 50;//对50取模使其一直执行
    }
    //mom eye counter
    this.momEyeTimer += deltaTime;
    //第一张切换到第二张需要Math.random() * 1500 + 2000ms
    //第二张切换到第一张需要200ms  把这个过程当作小鱼眨一次眼
    if (this.momEyeTimer > this.momEyeInterval) {
        this.momEyeCount = (this.momEyeCount + 1) % 2;
        this.momEyeTimer %= this.momEyeInterval;
        if (this.momEyeCount == 1) {
            this.momEyeInterval = 200;
        }
        else {

            this.momEyeInterval = Math.random() * 1500 + 2000;
        }
    }
    ctx1.save();
    ctx1.translate(this.x, this.y);//把原点移到这个位置
    ctx1.rotate(this.angle);//旋转画布 有利于计算角度值
    var momTailCount = this.momTailCount;
    ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);
    var momBodyCount = this.momBodyCount;
    if (data.double == 1) {
        ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
    }
    else {
        ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);
    }

    var momEyeCount = this.momEyeCount;
    ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);

    ctx1.restore();
}