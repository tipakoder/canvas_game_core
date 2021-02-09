var defaultFont = "Roboto";

CanvasRenderingContext2D.prototype.rectangle = function(data) {
    if(data.round === undefined)
    {
        this.beginPath();
        this.fillStyle = data.color;
        this.fillRect(data.x, data.y, data.w, data.h);
        this.closePath();
    }
    else
    {
        if (data.w < 2 * data.round) data.round = data.w / 2;
        if (data.h < 2 * data.round) data.round = data.h / 2;
        this.fillStyle = data.color;
        this.beginPath();
        this.moveTo(data.x + data.round, data.y);
        this.arcTo(data.x + data.w, data.y, data.x + data.w, data.y + data.h, data.round);
        this.arcTo(data.x + data.w, data.y + data.h, data.x, data.y+data.h, data.round);
        this.arcTo(data.x, data.y + data.h, data.x, data.y, data.round);
        this.arcTo(data.x, data.y, data.x + data.w, data.y, data.round);
        this.closePath();
        this.fill();
    }
};

CanvasRenderingContext2D.prototype.text = function(data) {
    this.beginPath();
    this.fillStyle = data.color;
    this.setFont({
        fontSize: data.fontSize, 
        fontFamily: data.fontFamily, 
        fontStyle: data.fontStyle
    });
    this.textAlign = data.align;
    this.fillText(data.text, data.x, data.y + data.fontSize+4, data.w); 
    this.closePath();
};

CanvasRenderingContext2D.prototype.setFont = function(data) {
    this.font = data.fontStyle + " " + data.fontSize + "px " + data.fontFamily + " sans-serif";
};

CanvasRenderingContext2D.prototype.getSymbolWidth = function(data) {
    this.setFont({
        fontSize: data.fontSize, 
        fontFamily: data.fontFamily, 
        fontStyle: data.fontStyle
    });
    return Math.round(this.measureText(data.value).width);
};

CanvasRenderingContext2D.prototype.setAction = function(data) {
    let path = new Path2D();
    path.rect(data.position.x, data.position.y, data.size.w, data.size.h);
    path.closePath();
    return {
        path: path,
        function: data.function
    };
};