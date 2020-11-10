var babyObj = function () {
    this.x;
    this.y;
    this.angle;
    this.babyTailTimer = 0;//计时器
    this.babyTailCount = 0;//从第零帧开始
    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;
    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
}
babyObj.prototype.init = function () {
    //
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;
}
babyObj.prototype.draw = function () {
    if (!data.gameOver) {
        //ctx1
        this.x = lerpDistance(mom.x, this.x, 0.97);//0.98  运动的快慢 越接近1越慢
        this.y = lerpDistance(mom.y, this.y, 0.97);
        var deltaX = mom.x - this.x;
        var deltaY = mom.y - this.y;
        var beta = Math.atan2(deltaY, deltaX) + Math.PI;//-PI,PI  
        this.angle = lerpAngle(beta, this.angle, 0.6);
    }
    //baby tail counter
    this.babyTailTimer += deltaTime;

    //大于50ms时序列帧生成
    if (this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8;//对8取模使其只加载7张图片
        this.babyTailTimer %= 50;//对50取模使其一直执行
    }
    //baby eye counter
    this.babyEyeTimer += deltaTime;
    //第一张切换到第二张需要Math.random() * 1500 + 2000ms
    //第二张切换到第一张需要200ms  把这个过程当作小鱼眨一次眼
    if (this.babyEyeTimer > this.babyEyeInterval) {
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;
        if (this.babyEyeCount == 1) {
            this.babyEyeInterval = 200;
        }
        else {

            this.babyEyeInterval = Math.random() * 1500 + 2000;
        }
    }
    //baby body counter
    this.babyBodyTimer += deltaTime;
    if (this.babyBodyTimer > 300) {
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 300;
        if (this.babyBodyCount > 19) {
            this.babyBodyCount = 19;
            data.gameOver = true;
            //game over
        }

    }
    ctx1.save();
    //translate
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    //定义临时变量 
    var babyTailCount = this.babyTailCount;
    //引用图片 一张 一张的引用
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);
    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
    var babyEyeCount = this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5 - 5, -babyEye[babyEyeCount].height * 0.5);
    ctx1.restore();
}