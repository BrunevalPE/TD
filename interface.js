var Interface = /** @class */ (function () {
    function Interface() {
        this.gold = 200;
    }
    Interface.prototype.GetGold = function () {
        return this.gold;
    };
    Interface.prototype.draw = function () {
        Game.context.beginPath();
        Game.context.rect(Game.canvas.width - 100, 1, 100, 25);
        Game.context.strokeStyle = "#FFF";
        Game.context.lineWidth = 2;
        Game.context.stroke();
        Game.context.font = "20px Segoe UI";
        Game.context.fillStyle = "#FFF";
        Game.context.fillText("Gold : " + this.gold, (Game.canvas.width - 95), 20);
    };
    Interface.prototype.mouseMoveEvent = function (evt) {
    };
    return Interface;
}());
//# sourceMappingURL=interface.js.map