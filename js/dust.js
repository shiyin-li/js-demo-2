var dustObj = function () {
    this.x = [];
    this.y = [];
    this.alpha;//角度
    this.amp = [];//振幅
    this.NO = [];//

}
dustObj.prototype.num = 50;
dustObj.prototype.init = function () {

    for (var i = 0; i < this.num; i++) {
        this.x[i] = canWidth * Math.random();
        this.y[i] = canHeight * Math.random();
        this.amp[i] = 20 + Math.random() * 25;
        this.NO[i] = Math.floor(Math.random() * 7);//归一[0,7) 随机一张图片
    }
    this.alpha = 0;
}
dustObj.prototype.draw = function () {
    this.alpha += deltaTime * 0.0008;//与海葵一致  使其看起来自然
    var l = Math.sin(this.alpha);
    for (var i = 0; i < this.num; i++) {
        var no = this.NO[i]
        ctx1.drawImage(dustPic[no], this.x[i] + l * this.amp[i], this.y[i]);
    }
}