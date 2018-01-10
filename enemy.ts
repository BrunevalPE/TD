class Enemy{
    private readonly aggroRange : 100;
    pv : number;
    maxPv : number;
    attackSpeed : number;
    damage : number;
    range : number;
    name : string;
    position : Vector2;

    constructor(obj : any, position:Vector2){
        this.pv = obj.pv;
        this.maxPv = this.pv;

        this.damage = obj.damage;
        this.attackSpeed = obj.attackSpeed;
        this.range = obj.range;
        this.name = obj.name;
        this.position = position;
    }

    draw() : void{
        this.update();

        Game.context.beginPath();
        Game.context.fillStyle = "#000";
        Game.context.strokeStyle = "#FF0000";
        Game.context.arc(this.position.x + (Game.grid.size/2), this.position.y + (Game.grid.size/2), 10, 0, 2*Math.PI);
        Game.context.stroke();

        this.drawLife();
    }

    drawLife() : void{
        Game.context.beginPath();
        Game.context.fillStyle = "#50D050";
        Game.context.fillRect(this.position.x, this.position.y + 4, 5 + (this.pv/this.maxPv)*30, 2);
        Game.context.stroke();
    }

    update():void{
        if(Game.running){
            let aggro = false;
            Game.towers.forEach(tower => {
                if(this.position.distance(tower.position) < 100){
                    this.position.add(this.position.to(tower.position).normalize());
                    aggro = true;
                }
            });
            if(!aggro){
                this.position.add(new Vector2(0,1));
            }
        }
    }
}