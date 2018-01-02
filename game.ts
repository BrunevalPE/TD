
class Game{

    static canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("c");
    static context : CanvasRenderingContext2D  = Game.canvas.getContext("2d");

    static _FPS : number = 60;

    static inc :number = 0;
    
    static towers : Array<Tower> = new Array();
    static grid : Grid;

    public static draw(){
        Game.inc++;
        Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.context.fillStyle = "#1E1E1E";
        Game.context.fillRect(0,0, Game.canvas.width, Game.canvas.height);

        Game.context.fillStyle = "#000";
        Game.context.fillText("Inc Value = " + Game.inc, 50, 50);
        
        Game.grid.draw();

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

class Grid{
    private nbRow : number = 15;
    private nbCol : number = 10;
    private size : number = 40;
    private enemySpawnRow : number = 3;
    constructor(){

    }

    public draw(){
        let left = (Game.canvas.width/2) - ((this.nbCol/2)*this.size);
        let top = (Game.canvas.height/2) - ((this.nbRow/2)*this.size);
        for (let i = 0; i <= this.nbRow; i++) {
            Game.context.beginPath();
            Game.context.moveTo(left,top+(i*this.size));
            Game.context.lineTo(left+(this.size*this.nbCol),top+(i*this.size));
            Game.context.closePath(); 
            Game.context.stroke();
        }
        for(let j = 0; j <= this.nbCol; j++){
            Game.context.beginPath();
            Game.context.moveTo(left+(j*this.size),top);
            Game.context.lineTo(left+(j*this.size),top+(this.size*this.nbRow));
            Game.context.closePath(); 
            Game.context.stroke();
        }
        for (let i = 0; i <= this.enemySpawnRow; i++) {
            Game.context.beginPath();
            Game.context.strokeStyle = "#f00";
            Game.context.moveTo(left,top-(i*this.size));
            Game.context.lineTo(left+(this.size*this.nbCol),top-(i*this.size));
            Game.context.closePath(); 
            Game.context.stroke();
        }
        for(let j = 0; j <= this.nbCol; j++){
            Game.context.beginPath();
            Game.context.strokeStyle = "#f00";
            Game.context.moveTo(left+(j*this.size),top-(this.size*this.enemySpawnRow));
            Game.context.lineTo(left+(j*this.size),top);
            Game.context.closePath(); 
            Game.context.stroke();
        }
        
    }
}
Game.start();