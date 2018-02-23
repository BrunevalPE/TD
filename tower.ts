class Tower{
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
    debug : boolean = true;
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
        this.guid = Guid.NewGuid();
    }

    draw() : void{
        this.update();
        
        if(this.pv > 0){
            if(this.icon.complete)
                Game.context.drawImage(this.icon, this.position.x, this.position.y, Game.grid.size, Game.grid.size);

            this.drawLife();
        
            if(this.debug)
                this.debugDisplay();
        }
    }

    drawLife() : void{
        Game.context.beginPath();
        Game.context.fillStyle = "#50D050";
        Game.context.fillRect(this.position.x + 5, this.position.y + 4, (this.pv/this.maxPv)*30, 2);
        Game.context.stroke();
    }

    update():void{
        if(Game.running){
            if(this.pv > 0){
                Game.enemies.forEach(enemy => {
                    if(this.target == null){
                        if(this.position.distance(enemy.position) < this.range){
                            this.target = enemy;
                        }    
                    }else{
                        if(this.target != null && this.position.distance(this.target.position) > this.position.distance(enemy.position)){
                            this.target = enemy;
                        }
                        if(this.target.pv <= 0){
                            this.target = null;
                        }
                    }
                });
                
                if(this.target && 
                    this.position.distance(this.target.position) < this.range &&
                   (this.lastAttack == undefined || ((new Date()).valueOf() - this.lastAttack.valueOf()) > +(1000/ this.attackSpeed))){
                    this.target.pv -= this.damage;
                    this.lastAttack = new Date();
                }
            }
            
            if(Game.enemies.length == 0){
                this.target = null;
                this.pv = this.maxPv;
            }
        }
    }

    debugDisplay(){
        if(this.target){
            Game.context.beginPath();
            Game.context.strokeStyle = 'purple';
            Game.context.moveTo(this.position.x + (Game.grid.size /2), this.position.y + (Game.grid.size /2));
            Game.context.lineTo(this.target.position.x + (Game.grid.size /2), this.target.position.y + (Game.grid.size /2));
            Game.context.stroke();
        }
        Game.context.beginPath();
        Game.context.strokeStyle = 'white';
        Game.context.arc(this.position.x + (Game.grid.size /2),this.position.y + (Game.grid.size /2),this.range,0,2*Math.PI);
        Game.context.stroke();
    }
}