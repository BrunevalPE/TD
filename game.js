var Game = /** @class */ (function () {
    function Game() {
    }
    Game.draw = function () {
        Game.inc++;
        Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.context.fillStyle = "#1E1E1E";
        Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.grid.draw();
        Game.interface.draw();
        Game.towers.forEach(function (element) {
            element.draw();
        });
        requestAnimationFrame(Game.draw);
        // test com
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
        Game.interface = new Interface();
        Game.canvas.addEventListener('mousemove', Game.interface.mouseMoveEvent, false);
        Game.canvas.addEventListener('mousemove', Game.grid.mouseMoveEvent, false);
        Game.canvas.addEventListener('click', Game.grid.mouseClickEvent, false);
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
var Rectangle = /** @class */ (function () {
    function Rectangle(x, y, w, z) {
        this.pos = new Vector2(x, y);
        this.size = new Vector2(w, z);
    }
    Rectangle.prototype.contain = function (vec) {
        if (this.pos.x < vec.x && (this.pos.x + this.size.x) > vec.x &&
            this.pos.y < vec.y && (this.pos.y + this.size.y) > vec.y) {
            return true;
        }
        return false;
    };
    Rectangle.RectangleContainVector = function (rectangle, vector) {
        return rectangle.contain(vector);
    };
    return Rectangle;
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
window.addEventListener('load', function () {
    Game.start();
}, false);
//# sourceMappingURL=game.js.map