class Grid{
    private nbRow : number = 15;
    private nbCol : number = 10;
    private size : number = 40;
    private enemySpawnRow : number = 3;
    
    constructor(){

    }

    public draw(){ // optimize this
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