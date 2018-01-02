var Grid = /** @class */ (function () {
    function Grid() {
        this.nbRow = 15;
        this.nbCol = 10;
        this.size = 40;
        this.enemySpawnRow = 3;
    }
    Grid.prototype.draw = function () {
        var left = (Game.canvas.width / 2) - ((this.nbCol / 2) * this.size);
        var top = (Game.canvas.height / 2) - ((this.nbRow / 2) * this.size);
        for (var i = 0; i <= this.nbRow; i++) {
            Game.context.beginPath();
            Game.context.moveTo(left, top + (i * this.size));
            Game.context.lineTo(left + (this.size * this.nbCol), top + (i * this.size));
            Game.context.closePath();
            Game.context.stroke();
        }
        for (var j = 0; j <= this.nbCol; j++) {
            Game.context.beginPath();
            Game.context.moveTo(left + (j * this.size), top);
            Game.context.lineTo(left + (j * this.size), top + (this.size * this.nbRow));
            Game.context.closePath();
            Game.context.stroke();
        }
        for (var i = 0; i <= this.enemySpawnRow; i++) {
            Game.context.beginPath();
            Game.context.strokeStyle = "#f00";
            Game.context.moveTo(left, top - (i * this.size));
            Game.context.lineTo(left + (this.size * this.nbCol), top - (i * this.size));
            Game.context.closePath();
            Game.context.stroke();
        }
        for (var j = 0; j <= this.nbCol; j++) {
            Game.context.beginPath();
            Game.context.strokeStyle = "#f00";
            Game.context.moveTo(left + (j * this.size), top - (this.size * this.enemySpawnRow));
            Game.context.lineTo(left + (j * this.size), top);
            Game.context.closePath();
            Game.context.stroke();
        }
    };
    return Grid;
}());
//# sourceMappingURL=grid.js.map