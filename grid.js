var Grid = /** @class */ (function () {
    function Grid() {
        this.nbRow = 15;
        this.nbCol = 10;
        this.size = 40;
        this.enemySpawnRow = 3;
        this.grid = [];
        this.left = (Game.canvas.width / 2) - ((this.nbCol / 2) * this.size);
        this.top = (Game.canvas.height / 2) - ((this.nbRow / 2) * this.size);
        for (var i = 0; i < this.nbCol; i++) {
            for (var j = 0; j < this.nbRow; j++) {
                this.grid.push(new Case(new Vector2(this.left + (i * this.size), this.top + (j * this.size)), this.size));
            }
        }
        for (var i = 0; i < this.nbCol; i++) {
            for (var j = 0; j < this.enemySpawnRow; j++) {
                this.grid.push(new Case(new Vector2(this.left + (i * this.size), this.top - this.size - (j * this.size)), this.size, CaseState.EnemySpawn));
            }
        }
    }
    Grid.prototype.mouseMoveEvent = function (evt) {
        var mousePos = new Vector2(evt.clientX, evt.clientY);
        Game.grid.grid.forEach(function (c) {
            c.mouseHover = c.rectangle.contain(mousePos);
        });
    };
    Grid.prototype.mouseClickEvent = function (evt) {
        var mousePos = new Vector2(evt.clientX, evt.clientY);
        Game.grid.grid.forEach(function (c) {
            c.selected = c.rectangle.contain(mousePos);
        });
    };
    Grid.prototype.draw = function () {
        this.grid.forEach(function (c) {
            c.draw();
        });
    };
    return Grid;
}());
var Case = /** @class */ (function () {
    function Case(pos, size, state) {
        if (state === void 0) { state = null; }
        this.rectangle = new Rectangle(pos.x, pos.y, size, size);
        this.state = state ? state : CaseState.Empty;
    }
    Case.prototype.draw = function () {
        Game.context.beginPath();
        Game.context.rect(this.rectangle.pos.x, this.rectangle.pos.y, this.rectangle.size.x, this.rectangle.size.y);
        Game.context.strokeStyle = this.state != CaseState.EnemySpawn ? "#007ACC" : "#ff0000";
        Game.context.lineWidth = 1;
        Game.context.stroke();
        if (this.mouseHover) {
            Game.context.fillStyle = "#252526";
            Game.context.fillRect(this.rectangle.pos.x + 5, this.rectangle.pos.y + 5, this.rectangle.size.x - 10, this.rectangle.size.y - 10);
        }
        if (this.selected) {
            Game.context.beginPath();
            Game.context.rect(this.rectangle.pos.x + 4, this.rectangle.pos.y + 4, this.rectangle.size.x - 8, this.rectangle.size.y - 8);
            Game.context.strokeStyle = "#fff";
            Game.context.lineWidth = 1;
            Game.context.stroke();
        }
    };
    return Case;
}());
var CaseState;
(function (CaseState) {
    CaseState[CaseState["Empty"] = 0] = "Empty";
    CaseState[CaseState["Tower"] = 1] = "Tower";
    CaseState[CaseState["EnemySpawn"] = 2] = "EnemySpawn";
})(CaseState || (CaseState = {}));
//# sourceMappingURL=grid.js.map