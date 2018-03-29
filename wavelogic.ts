class WaveLogic{
    enemies : Array<any>;
    actualWave : number = 1;
    pending : boolean = false;

    private timeBetweenWave : number = 20000; // ms

    constructor(){
        this.enemies = data.enemies;
    }
    
    public start(){
        this.disclaime();
        Game.running = true;
    }

    private disclaime(){
        Game.interface.createMessage(`Wave ${this.actualWave} in :`, this.timeBetweenWave, MessageKind.BigCountDown);
        setTimeout(() => {
            this.spawnEnemies(); 
            this.actualWave++;
         }, this.timeBetweenWave);
    }

    private spawnEnemies(){
        data.enemies.forEach(enemy => {
            if(enemy.wave == this.actualWave){
                for(var i = 0; i < Game.grid.nbCol; i++){
                    for(var j = 0; j < Game.grid.enemySpawnRow; j++){
                        Game.enemies.push(
                                new Enemy(enemy,
                                    new Vector2(
                                        Game.grid.left + (i*Game.grid.size),
                                        Game.grid.top - Game.grid.size - (j*Game.grid.size)
                                    )
                                ));
                    }
                }
            }
        });
        this.pending = true;
    }

    public update(){
        if(this.pending && Game.enemies.length == 0){
            this.waveDone();
            this.pending = false;
        }
    }

    private waveDone(){
        if(this.actualWave >= data.enemies.length){
            Game.interface.createMessage('End.', 1000000, MessageKind.Big);
        }else{
            this.disclaime();
        }
    }
}