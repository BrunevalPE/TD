class Tower{
    pv : number;
    maxPv : number;
    damage : number;
    attackSpeed : number;
    range : number;

    name : string;

    position : Vector2;
    initialPosition : Vector2;

    icon : HTMLImageElement;

    constructor(obj : any, pos : Vector2){
        this.position = pos;
        this.initialPosition = this.position;

        this.maxPv = obj.pv;
        this.pv = this.maxPv;
        
        this.damage = obj.damage;
        this.attackSpeed = obj.attackSpeed;
        this.range = obj.range;
        
        this.name = obj.name;
        
        this.icon = new Image();
        this.icon.src = obj.icon;
    }

    draw() : void{
        if(this.icon.complete)
            Game.context.drawImage(this.icon, this.position.x, this.position.y, Game.grid.size, Game.grid.size);
    }

    update() : void{
        if(Game.running){
            
        }
    }
}