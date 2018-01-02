class Interface{
    private gold : number = 200;

    constructor(){

    }

    public GetGold() : number{
        return this.gold;
    }

    public draw(){
        Game.context.beginPath();
        Game.context.rect(Game.canvas.width-100,1,100,25);
        Game.context.strokeStyle = "#FFF";
        Game.context.lineWidth = 2;
        Game.context.stroke();
        Game.context.font = "20px Segoe UI";
        Game.context.fillStyle = "#FFF";
        Game.context.fillText("Gold : " + this.gold, (Game.canvas.width-95), 20);
    }

    public mouseMoveEvent(evt:MouseEvent){
        
    }
}