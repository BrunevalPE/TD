class Enemy{
    readonly aggroRange : number = 300;
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
    lastAttack : Date;
    gold : number;
    leaked : boolean = false;
    damagesTook : Array<Damage> = new Array();
    deathTime : Date;
    sizeSpread : number = 10;
    isDeathState : boolean = false;

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
        this.gold = obj.gold;
    }

    draw() : void{
        if(this.isDeathState){
            this.drawDeath();
        }else{
            this.update();
            Game.context.beginPath();
            Game.context.fillStyle = "#000";
            Game.context.strokeStyle = "#FF0000";
            Game.context.arc(this.position.x + (Game.grid.size/2), this.position.y + (Game.grid.size/2), 10, 0, 2*Math.PI);
            Game.context.stroke();
    
            this.drawLife();
        }
        //this.debugDisplay();
    }

    drawLife() : void{
        Game.context.beginPath();
        Game.context.fillStyle = "#50D050";
        Game.context.fillRect(this.position.x, this.position.y + 4, 5 + (this.pv/this.maxPv)*30, 2);
        Game.context.stroke();
    }

    drawDeath() : void{
        Game.context.beginPath();
        let angle = (2*Math.PI)/30;
        let totalAngle = 0;

        for (let i = 0; i < 15; i++) {
            Game.context.beginPath();
            Game.context.arc(this.position.x + Game.grid.size / 2,this.position.y + Game.grid.size / 2,this.sizeSpread, totalAngle, totalAngle+angle);
            Game.context.strokeStyle = "#FF0000";
            Game.context.stroke();
            totalAngle+=angle*2;
        }

        this.sizeSpread++;
    }

    move() : void{
        this.velocity = Vector2.zero(); 
        Game.towers.forEach(tower => {
            if(!this.aggro && this.target == null){ // if no target
                if(this.position.distance(tower.position) < this.aggroRange && tower.pv > 0){ // check for target
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
                if(this.position.x < Game.grid.left){
                    this.position.x = Game.grid.left;
                }else if((this.position.x + Game.grid.size) > Game.grid.right){
                    this.position.x = Game.grid.right - Game.grid.size;
                }
            }
        }
    }

    takeDamage(damage:number, crit : boolean){
        Game.interface.createDamage(damage,crit, new Vector2(this.position.x+Game.grid.size/2, this.position.y), false);
        this.pv -= damage;
    }

    update():void{
        if(Game.running){
            this.move();
            if(this.pv < 0 || this.leaked) {
                this.deathTime = new Date();
                this.isDeathState = true;
            }
            if(this.target && 
                this.target.pv > 0 &&
                this.position.distance(this.target.position) < this.range &&
                (this.lastAttack == undefined || ((new Date()).valueOf() - this.lastAttack.valueOf()) > +(1000/ this.attackSpeed))){

                let crit = Math.random() < 0.2;
                let damage = Math.floor((this.damage * (1 + Math.random()/5)) * ( crit ? 2 : 1));

                this.target.takeDamage(damage, crit);
                
                this.target.pv -= this.damage;
                this.lastAttack = new Date();
            }
            if(!this.leaked && this.position.y > Game.grid.bottom){
                Game.interface.createMessage("leak", 5000, MessageKind.Side);
                this.leaked = true;
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

