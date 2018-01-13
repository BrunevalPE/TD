class Grid{
    readonly nbRow : number = 15;
    readonly nbCol : number = 10;
    readonly enemySpawnRow : number = 3;
    
    public readonly size : number = 40;
    
    left : number;
    top : number;

    public grid : Array<Case> = [];
    public caseSelected : Case;

    constructor(){
        this.left = (Game.w() / 2) - ((this.nbCol / 2) * this.size);
        this.top = (Game.h() / 2) - ((this.nbRow / 2) * this.size);

        
        for(var i = 0; i < this.nbCol; i++){
            for(var j = 0; j < this.nbRow; j++){
                this.grid.push(new Case(
                    new Vector2(
                        this.left + (i*this.size),
                        this.top + (j*this.size)
                    ),
                    this.size)
                );
            }
        }

        for(var i = 0; i < this.nbCol; i++){
            for(var j = 0; j < this.enemySpawnRow; j++){
                this.grid.push(new Case(
                    new Vector2(
                        this.left + (i*this.size),
                        this.top - this.size - (j*this.size)
                    ),
                    this.size,
                    true)
                );
            }
        }
    }

    public mouseMoveEvent(evt : MouseEvent){
        let mousePos = new Vector2(evt.clientX, evt.clientY);
        Game.grid.grid.forEach(c => {
            c.mouseHover = c.Rectangle.contain(mousePos);
        });
    }

    public mouseClickEvent(evt : MouseEvent){
        let mousePos = new Vector2(evt.clientX, evt.clientY);
        if(Game.interface.positionMenu().contain(mousePos)){
            return;
        }
        Game.grid.caseSelected = null;
        Game.grid.grid.forEach(c => {
            if(c.enemy){
                return;
            }
            c.selected = c.Rectangle.contain(mousePos);
            if(c.selected)
            {
                Game.grid.caseSelected = c;
            }
        });
    }

    public draw(){ 
        this.grid.forEach(c => {
            c.draw();
        });        
    }
}

class Case{
    enemy : boolean;
    Rectangle : Rectangle;
    mouseHover : boolean;
    selected : boolean;
    tower : Tower;

    constructor(pos : Vector2, size : number, enemy : boolean = false){
        this.Rectangle = new Rectangle(pos.x, pos.y, size, size);
        this.enemy = enemy;
    }

    public draw(){
        Game.context.beginPath();
        Game.context.rect(this.Rectangle.pos.x, this.Rectangle.pos.y, this.Rectangle.size.x, this.Rectangle.size.y);
        Game.context.strokeStyle = !this.enemy ? "#007ACC" : "#ff0000";
        Game.context.lineWidth = 1;
        Game.context.stroke();

        if(this.mouseHover){
            Game.context.fillStyle = "#252526";
            Game.context.fillRect(  this.Rectangle.pos.x + 5,
                                    this.Rectangle.pos.y + 5,
                                    this.Rectangle.size.x - 10,
                                    this.Rectangle.size.y - 10);
        }

        if(this.selected){
            Game.context.beginPath();
            Game.context.rect(this.Rectangle.pos.x +4 , this.Rectangle.pos.y+4, this.Rectangle.size.x -8, this.Rectangle.size.y-8);
            Game.context.strokeStyle = "#fff";
            Game.context.lineWidth = 1;
            Game.context.stroke();
        }
    }
}