class Interface{
    private gold : number = 200;
    private menuItems : Array<MenuItem> = [];    
    public readonly menuItemSize : number = 50;
    public readonly menuSize : Vector2 = new Vector2(300, 200);

    public positionMenu = () => { return new Rectangle(Game.w() - this.menuSize.x, Game.h() - this.menuSize.y, this.menuSize.x, this.menuSize.y);} 

    constructor(){
        fetch('data.json').then(r => r.json()).then(json =>{
            let index = 0;
            json.menuItems.forEach(menuItem => {
                this.menuItems.push(new MenuItem(menuItem, index));
                index++;
            });
        })

    }

    public mouseMoveEvent(evt : MouseEvent){
        let mousePos = new Vector2(evt.clientX, evt.clientY);
        Game.interface.menuItems.forEach(mi => {
            mi.mouseHover = mi.getRectangle().contain(mousePos);
        });
    }
    
    public mouseClickEvent(evt : MouseEvent){
        let mousePos = new Vector2(evt.clientX, evt.clientY);
        Game.interface.menuItems.forEach(mi => {
            if(mi.getRectangle().contain(mousePos)){
                mi.buy();
            }
        });
    }
    
    public getGold() : number{
        return this.gold;
    }

    public buy(mi : MenuItem){
        this.gold -= mi.price;
    }

    public draw(){
        this.drawGold();        
        if(Game.grid.caseSelected != null){
            Game.interface.drawBuildMenu();
        }
    }

    private drawGold() : void{
        Game.context.beginPath();
        Game.context.rect(Game.w() - 101, 1, 100, 25);
        Game.context.strokeStyle = "#FFF";
        Game.context.lineWidth = 1;
        Game.context.stroke();
        Game.context.font = "20px Segoe UI";
        Game.context.fillStyle = "#FFF";
        Game.context.fillText("Gold : " + this.gold, (Game.w() - 95), 20);
    }

    public drawBuildMenu(){
        Game.context.beginPath();
        Game.context.rect(this.positionMenu().pos.x, this.positionMenu().pos.y, this.positionMenu().size.x, this.positionMenu().size.y);
        Game.context.strokeStyle = "#FFF";
        Game.context.lineWidth = 1;
        Game.context.stroke();

        let i = 0;
        let j = 0;
        Game.interface.menuItems.forEach(menuItem => {
            menuItem.draw(new Vector2(this.positionMenu().pos.x + (i * this.menuItemSize), this.positionMenu().pos.y + (j * this.menuItemSize)));
            if((i *this.menuItemSize) > 300){
                i = 0;
                j++;
            }else{
                i++;
            }
        });
    }
}