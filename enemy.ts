class Enemy{
    readonly aggroRange : number = 100;
    pv : number;
    maxPv : number;
    attackSpeed : number;
    damage : number;
    range : number;
    name : string;
    position : Vector2;
    hitbox : Circle;
    aggro : boolean = false;
    debug : boolean;
    velocity : Vector2;
    target : Tower;
    guid : string;

    constructor(obj : any, position:Vector2){
        this.pv = obj.pv;
        this.maxPv = this.pv;

        this.damage = obj.damage;
        this.attackSpeed = obj.attackSpeed;
        this.range = obj.range;
        this.name = obj.name;
        this.position = position;

        this.hitbox = new Circle(this.position, Game.grid.size/2);
        this.velocity = Vector2.zero();
        this.guid = Guid.NewGuid();
    }

    draw() : void{
        this.update();

        Game.context.beginPath();
        Game.context.fillStyle = "#000";
        Game.context.strokeStyle = "#FF0000";
        Game.context.arc(this.position.x + (Game.grid.size/2), this.position.y + (Game.grid.size/2), 10, 0, 2*Math.PI);
        Game.context.stroke();

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
            Game.towers.forEach(tower => {
                if(!this.aggro && this.target == null){ // if no target
                    if(this.position.distance(tower.position) < this.aggroRange){ // check for target
                        this.target = tower;
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

            if(!this.aggro){
                this.position.add(new Vector2(0,1));
            }else{
                if(!this.position.isIn(this.target.hitbox)){ 
                    this.velocity = this.position.to(this.target.position).normalize(); 
    
                    for(var enemy of Game.enemies){ 
                        if(this != enemy && this.position.isIn(enemy.hitbox)){ 
                            let bumpVel = this.position.to(enemy.position).normalize();
                            bumpVel.inverse();
                            bumpVel.scale(2);
                            this.position.add(bumpVel);
                            let tempvel = new Vector2(this.velocity.x, this.velocity.y);
                            tempvel.rotate(-Math.PI/2);
                            this.position.add(tempvel);
                        }
                    }
    
                    this.position.add(this.velocity);
                }
            }
            if(this.pv <= 0){
                for(var i = 0; i < Game.enemies.length; i++){
                    if(Game.enemies[i].guid == this.guid){
                        Game.enemies.splice(i,1);
                        break;
                    }
                }
            }
        }
    }

    debugDisplay(){
        Game.context.beginPath();
        Game.context.strokeStyle = 'yellow';
        Game.context.moveTo(this.position.x, this.position.y);
        Game.context.lineTo(this.position.x + (this.velocity.x *50), this.position.y + (this.velocity.y*50));
        Game.context.stroke();
    }
}