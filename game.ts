class Game{

    static canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("c");
    static context : CanvasRenderingContext2D  = Game.canvas.getContext("2d");

    static readonly FPS : number = 60;
    
    static towers : Array<Tower> = new Array();
    static grid : Grid;
    static interface : Interface;

    static w = () => {return Game.canvas.width;}
    static h = () => {return Game.canvas.height;}

    public static draw(){
        Game.context.clearRect(0, 0, Game.w(), Game.h());
        Game.context.fillStyle = "#1E1E1E";
        Game.context.fillRect(0,0, Game.w(), Game.h());
        
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
        console.log("resize");
    }

    public static start(){
        Game.canvas.width  = window.innerWidth;
        Game.canvas.height = window.innerHeight;
        
        Game.grid = new Grid();
        
        Game.interface = new Interface();

        window.addEventListener('resize', Game.resize, false);
        
        Game.canvas.addEventListener('mousemove', Game.grid.mouseMoveEvent, false);
        Game.canvas.addEventListener('click', Game.grid.mouseClickEvent, false);

        Game.canvas.addEventListener('mousemove', Game.interface.mouseMoveEvent, false);
        Game.canvas.addEventListener('click', Game.interface.mouseClickEvent, false);

        requestAnimationFrame(Game.draw);
    }
}

window.addEventListener('load', function(){
    Game.start();
}, false);