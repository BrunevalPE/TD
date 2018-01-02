
class Game{

    static canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("c");
    static context : CanvasRenderingContext2D  = Game.canvas.getContext("2d");

    static _FPS : number = 60;

    static inc :number = 0;
    
    static towers : Array<Tower> = new Array();
    static grid : Grid;
    static interface : Interface;

    public static draw(){
        Game.inc++;
        Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.context.fillStyle = "#1E1E1E";
        Game.context.fillRect(0,0, Game.canvas.width, Game.canvas.height);
        
        Game.grid.draw();
        Game.interface.draw();

        Game.towers.forEach(element => {
            element.draw();
        });

        requestAnimationFrame(Game.draw);
    }

    public static resize(){
        Game.canvas.width  = window.innerWidth;
        Game.canvas.height = window.innerHeight;
    }

    public static start(){
        Game.canvas.width  = window.innerWidth;
        Game.canvas.height = window.innerHeight;
        window.addEventListener('resize', Game.resize, false);

        Game.towers.push(new Tower(new Vector2(50,50)));

        Game.grid = new Grid();

        Game.interface = new Interface();

        Game.canvas.addEventListener('mousemove', Game.interface.mouseMoveEvent, false);
        Game.canvas.addEventListener('mousemove', Game.grid.mouseMoveEvent, false);
        Game.canvas.addEventListener('click', Game.grid.mouseClickEvent, false);

        requestAnimationFrame(Game.draw);
    }
}

class Vector2{
    x:number;
    y:number;
    constructor(x:number, y:number){
        this.x = x ? x : 0;
        this.y = y ? y : 0;
    }
}

class Rectangle{
    pos : Vector2;
    size : Vector2;

    constructor(x:number, y: number, w : number, z: number){
        this.pos = new Vector2(x,y);
        this.size = new Vector2(w, z);
    }

    public contain(vec : Vector2){
        if(this.pos.x < vec.x && (this.pos.x + this.size.x) > vec.x &&
           this.pos.y < vec.y && (this.pos.y + this.size.y) > vec.y){
               return true;
        }
        return false;
    }

    public static RectangleContainVector(rectangle : Rectangle, vector : Vector2){
        return rectangle.contain(vector);
    }
}

class Tower{
    pv : number;
    maxPv : number;
    damage : number;
    attackSpeed : number;

    position: Vector2;


    constructor(pos : Vector2){
        this.position = pos;
    }

    public update(){

    }

    public draw(){
        Game.context.beginPath();
        Game.context.fillStyle = "#000";
        Game.context.strokeStyle = "#369";
        Game.context.arc(this.position.x, this.position.y, 10, 0, 2*Math.PI);
        Game.context.stroke();
    }
}

window.addEventListener('load', function(){
    Game.start();
}, false);