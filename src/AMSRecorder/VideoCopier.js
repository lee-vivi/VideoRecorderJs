/**
 * Created by imal365 on 3/7/18.
 */

var VideoCopier = function (videoElement,config) {
    this.videoElement = videoElement;
    this.recrodinterval = null;

    this.frames = [];
    this.quality = config.quality ? config.quality : 1.0;
    this.framerate = config.framerate ? config.framerate : 30;
    this.webp_quality = config.webp_quality ? config.webp_quality : 1.0;

    this.newWidth = canvas.width = parseInt(this.quality * this.videoElement.clientWidth);
    this.newHeight = canvas.height = parseInt(this.quality * this.videoElement.clientHeight);
    this.timer = parseInt(1000 / this.framerate);
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext('2d');
};

VideoCopier.prototype.startCapture = function () {
    var self = this;
    this.reset();
    this.startTime = new Date().getTime();
    this.recrodinterval = setInterval(function () {
        if(self.videoElement.readyState === 4) {
            self.ctx.drawImage(self.videoElement, 0, 0, self.newWidth, self.newHeight);
            var webpqual = (self.webp_quality == 1.0) ? null : self.webp_quality;
            self.frames.push(self.canvas.toDataURL('image/webp', webpqual));
        }
    }, this.timer);
};

VideoCopier.prototype.stopCapture = function () {
    var videoBlob = null;
    if(this.frames.length > 0) {
        this.recrodinterval && clearInterval(this.recrodinterval);
        var spentTime = (new Date().getTime() - this.startTime) / 1000;
        var localframerate = parseInt(frames.length) / spentTime;
        videoBlob = new Whammy.fromImageArray(this.frames, localframerate);
    }
    return videoBlob;
};

VideoCopier.prototype.reset = function () {
    this.frames = [];
    this.recrodinterval && clearInterval(this.recrodinterval);
};


