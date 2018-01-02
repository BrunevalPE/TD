class Grid{
    private nbRow : number = 15;
    private nbCol : number = 10;
    private size : number = 40;
    private enemySpawnRow : number = 3;

    private left : number;
    private top : number;

    public grid : Array<Case> = [];

    constructor(){
        this.left = (Game.canvas.width/2) - ((this.nbCol/2)*this.size);
        this.top = (Game.canvas.height/2) - ((this.nbRow/2)*this.size);

        
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
                    CaseState.EnemySpawn)
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
        Game.grid.grid.forEach(c => {
            c.selected = c.rectangle.contain(mousePos);
        });
    }

    public draw(){ // optimize this
        this.grid.forEach(c => {
            c.draw();
        });        
    }
}

class Case{
    state : CaseState;
    rectangle : Rectangle;
    mouseHover : boolean;
    selected : boolean;

    constructor(pos : Vector2, size : number, state : CaseState = null){
        this.rectangle = new Rectangle(pos.x, pos.y, size, size);
        this.state = state ? state : CaseState.Empty;
    }

    public draw(){
        Game.context.beginPath();
        Game.context.rect(this.rectangle.pos.x, this.rectangle.pos.y, this.rectangle.size.x, this.rectangle.size.y);
        Game.context.strokeStyle = this.state != CaseState.EnemySpawn ? "#007ACC" : "#ff0000";
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

enum CaseState{
    Empty,
    Tower,
    EnemySpawn
}