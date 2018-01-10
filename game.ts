class Game{
    static canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("c");
    static context : CanvasRenderingContext2D  = Game.canvas.getContext("2d");

    static readonly FPS : number = 60;
    
    static towers : Array<Tower> = new Array();
    static enemies :Array<Enemy> = new Array();
    static grid : Grid;
    static interface : Interface;

    static running : boolean = false;

    static w = () => {return Game.canvas.width;}
    static h = () => {return Game.canvas.height;}

    static draw(){
        Game.context.clearRect(0, 0, Game.w(), Game.h());
        Game.context.fillStyle = "#1E1E1E";
        Game.context.fillRect(0,0, Game.w(), Game.h());
        
        Game.grid.draw();
        Game.interface.draw();

        Game.towers.forEach(tower => {
            tower.draw();
        });

        Game.enemies.forEach(enemy => {
            enemy.draw();
        });

        requestAnimationFrame(Game.draw);
    }

    static resize(){
        Game.canvas.width  = window.innerWidth;
        Game.canvas.height = window.innerHeight;
    }

    static start(){
        Game.canvas.width  = window.innerWidth;
        Game.canvas.height = window.innerHeight;
        
        Game.grid = new Grid();
        
        Game.interface = new Interface();

        window.addEventListener('resize', Game.resize, false);
        
        Game.canvas.addEventListener('mousemove', Game.grid.mouseMoveEvent, false);
        Game.canvas.addEventListener('click', Game.grid.mouseClickEvent, false);

        Game.canvas.addEventListener('mousemove', Game.interface.mouseMoveEvent, false);
        Game.canvas.addEventListener('click', Game.interface.mouseClickEvent, false);

        setTimeout(() => {
            Game.spawnEnemies();
            Game.running = true;
        }, 5000);

        requestAnimationFrame(Game.draw);
    }

    static spawnEnemies(){
        fetch('data.json').then(r => r.json()).then(json =>{
            json.enemies.forEach(enemy => {
                if(enemy.wave == 1){
                    for(var i = 0; i < Game.grid.nbCol; i++){
                        for(var j = 0; j < Game.grid.enemySpawnRow; j++){
                                this.enemies.push(
                                    new Enemy(enemy,
                                            new Vector2(
                                                Game.grid.left + (i*Game.grid.size),
                                                Game.grid.top - Game.grid.size - (j*Game.grid.size)
                                            )
                                ));
                        }
                    }
                }
            });
        })
    }
}

window.addEventListener('load', function(){
    Game.start();
}, false);