abstract class Tower{
    abstract pv : number;
    abstract maxPv : number;
    abstract damage : number;
    abstract attackSpeed : number;
    abstract name : string;
    abstract position: Vector2;

    constructor(pos : Vector2){
        this.position = pos;
    }

    public abstract draw() : void;
}


class BasicTower extends Tower{
    pv: number;
    maxPv: number;
    damage: number;
    attackSpeed: number;
    position: Vector2;
    name : string;

    constructor(pos : Vector2){
        super(pos);
        this.maxPv = 200;
        this.pv = this.maxPv;
        this.damage = 10;
        this.attackSpeed = 1.5;
        this.position = pos;
        this.name = "Basic Tower";
    }
    
    public draw() : void{
        Game.context.beginPath();
        Game.context.fillStyle = "#000";
        Game.context.strokeStyle = "#369";
        Game.context.arc(this.position.x, this.position.y, 10, 0, 2*Math.PI);
        Game.context.stroke();
    }
}