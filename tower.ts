class Tower{
    readonly aggroRange : number = 200;
    pv : number;
    maxPv : number;
    damage : number;
    attackSpeed : number;
    range : number;
    hitbox : Circle;

    name : string;

    position : Vector2;
    initialPosition : Vector2;

    icon : HTMLImageElement;

    aggro : boolean = false;
    debug : boolean;
    velocity : Vector2;
    target : Enemy;

    guid : string;
    lastAttack : Date;

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

        this.hitbox = new Circle(this.position, Game.grid.size);
        this.velocity = Vector2.zero();
        this.guid = Guid.NewGuid();
    }

    draw() : void{
        this.update();
        if(this.icon.complete)
            Game.context.drawImage(this.icon, this.position.x, this.position.y, Game.grid.size, Game.grid.size);

        this.drawLife();
        this.debugDisplay();
    }

    drawLife() : void{
        Game.context.beginPath();
        Game.context.fillStyle = "#50D050";
        Game.context.fillRect(this.position.x, this.position.y + 4, 5 + (this.pv/this.maxPv)*30, 2);
        Game.context.stroke();
    }

    update():void{
        if(Game.running){
            this.velocity = Vector2.zero(); 
            Game.enemies.forEach(enemy => {
                if(!this.aggro && this.target == null){ // if no target
                    if(this.position.distance(enemy.position) < this.aggroRange){ // check for target
                        this.target = enemy;
                        this.aggro = true;
                    }
                }else{
                    if(this.target == null){
                        this.aggro = false;
                    }
                    if(this.target.pv <= 0){
                        this.target = null;
                        this.aggro = false;
                    }
                }
            });

            if(this.aggro){
                if(!this.position.isIn(this.target.hitbox)){ 
                    this.velocity = this.position.to(this.target.position).normalize(); 
                    this.position.add(this.velocity);
                }

                if(this.lastAttack == null || ((new Date()).valueOf() - this.lastAttack.valueOf()) > +(1000/ this.attackSpeed)){
                    this.target.pv -= this.damage;
                    this.lastAttack = new Date();
                }
            }
        }
    }

    debugDisplay(){
        if(this.velocity){
            Game.context.beginPath();
            Game.context.strokeStyle = 'yellow';
            Game.context.moveTo(this.position.x, this.position.y);
            Game.context.lineTo(this.position.x + (this.velocity.x *50), this.position.y + (this.velocity.y*50));
            Game.context.stroke();
        }
    }
}