class Grid{
    readonly nbRow : number = 15;
    readonly nbCol : number = 10;
    readonly enemySpawnRow : number = 3;
    
    public readonly size : number = 40;
    
    left : number;
    right : number;
    bottom : number;
    top : number;

    public grid : Array<Case> = [];
    public caseSelected : Case;

    constructor(){
        this.left = (Game.w() / 2) - ((this.nbCol / 2) * this.size);
        this.top = (Game.h() / 2) - ((this.nbRow / 2) * this.size);

        this.right = this.left + (this.nbCol * this.size);
        this.bottom = this.top + (this.nbRow * this.size);

        
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
                        this.left + (i * this.size),
                        this.top - this.size - (j * this.size)
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
            c.mouseHover = c.rectangle.contain(mousePos);
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
            c.selected = c.rectangle.contain(mousePos);
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
    rectangle : Rectangle;
    mouseHover : boolean;
    selected : boolean;
    tower : Tower;

    constructor(pos : Vector2, size : number, enemy : boolean = false){
        this.rectangle = new Rectangle(pos.x, pos.y, size, size);
        this.enemy = enemy;
    }

    public draw(){
        Game.context.beginPath();
        Game.context.rect(this.rectangle.pos.x, this.rectangle.pos.y, this.rectangle.size.x, this.rectangle.size.y);
        Game.context.strokeStyle = !this.enemy ? "#007ACC" : "#ff0000";
        Game.context.lineWidth = 1;
        Game.context.stroke();

        if(this.mouseHover){
            Game.context.fillStyle = "#252526";
            Game.context.fillRect(  this.rectangle.pos.x + 5,
                                    this.rectangle.pos.y + 5,
                                    this.rectangle.size.x - 10,
                                    this.rectangle.size.y - 10);
        }

        if(this.selected){
            Game.context.beginPath();
            Game.context.rect(this.rectangle.pos.x +4 , this.rectangle.pos.y+4, this.rectangle.size.x -8, this.rectangle.size.y-8);
            Game.context.strokeStyle = "#fff";
            Game.context.lineWidth = 1;
            Game.context.stroke();
        }
    }
}