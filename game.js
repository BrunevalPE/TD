var Game = /** @class */ (function () {
    function Game() {
    }
    Game.draw = function () {
        Game.inc++;
        Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.context.fillStyle = "#1E1E1E";
        Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.context.fillStyle = "#000";
        Game.context.fillText("Inc Value = " + Game.inc, 50, 50);
        Game.grid.draw();
        Game.towers.forEach(function (element) {
            element.draw();
        });
        requestAnimationFrame(Game.draw);
    };
    Game.resize = function () {
        Game.canvas.width = window.innerWidth;
        Game.canvas.height = window.innerHeight;
    };
    Game.start = function () {
        Game.canvas.width = window.innerWidth;
        Game.canvas.height = window.innerHeight;
        window.addEventListener('resize', Game.resize, false);
        Game.towers.push(new Tower(new Vector2(50, 50)));
        Game.grid = new Grid();
        requestAnimationFrame(Game.draw);
    };
    Game.canvas = document.getElementById("c");
    Game.context = Game.canvas.getContext("2d");
    Game._FPS = 60;
    Game.inc = 0;
    Game.towers = new Array();
    return Game;
}());
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
    }
    return Vector2;
}());
var Tower = /** @class */ (function () {
    function Tower(pos) {
        this.position = pos;
    }
    Tower.prototype.update = function () {
    };
    Tower.prototype.draw = function () {
        Game.context.beginPath();
        Game.context.fillStyle = "#000";
        Game.context.strokeStyle = "#369";
        Game.context.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
        Game.context.stroke();
    };
    return Tower;
}());
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
Game.start();
//# sourceMappingURL=game.js.map