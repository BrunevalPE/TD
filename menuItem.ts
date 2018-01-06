abstract class MenuItem{
    public tooltipRectangle = () => { return new Rectangle(Game.w() - 300, Game.h() - 300, 300, 100); }

    abstract price : number;
    abstract name : string;
    abstract description : string;
    abstract mouseHover : boolean;
    abstract position : Vector2;
    
    abstract draw(pos : Vector2) : void;
    abstract buy() : void;
    abstract showToolTip() : void;
    abstract getRectangle() : Rectangle;
}


class BasicTowerMenuItem extends MenuItem{
    price: number;
    name: string;
    description: string;
    position : Vector2;
    
    mouseHover : boolean;

    constructor(pos: Vector2){
        super();
        this.price = 25;
        this.name = "A1";
        this.description = "Just a basic tower";
        this.position = pos;
    }

    draw(): void {
        Game.context.beginPath();
        Game.context.rect(this.getRectangle().pos.x, this.getRectangle().pos.y, this.getRectangle().size.x, this.getRectangle().size.y);
        Game.context.strokeStyle = "#FFF";
        Game.context.lineWidth = 1;
        Game.context.stroke();
        Game.context.font = "20px Segoe UI";
        Game.context.fillStyle = "#FFF";
        Game.context.fillText(this.name, this.getRectangle().pos.x + 5, this.getRectangle().pos.y + 20);

        if(this.mouseHover){
            this.showToolTip();
        }

    }
    buy(): void {
        if(Game.interface.getGold() >= this.price){
            let towerPosition = new Vector2(Game.grid.caseSelected.rectangle.pos.x, Game.grid.caseSelected.rectangle.pos.y);
            towerPosition.x += (Game.grid.size / 2);
            towerPosition.y += (Game.grid.size / 2);
            
            let tower = new BasicTower(towerPosition);
            
            Game.towers.push(tower);
            Game.grid.caseSelected.tower = tower;
             
            Game.interface.buy(this);
        }else{
            alert("Not enought minerals");
        }
    }
    showToolTip(): void {
        Game.context.beginPath();
        Game.context.rect(this.tooltipRectangle().pos.x, this.tooltipRectangle().pos.y, this.tooltipRectangle().size.x, this.tooltipRectangle().size.y);
        Game.context.strokeStyle = "#FFF";
        Game.context.lineWidth = 1;
        Game.context.stroke();
        Game.context.font = "20px Segoe UI";
        Game.context.fillStyle = "#FFF";
        Game.context.fillText(this.name + " :" , this.tooltipRectangle().pos.x + 10, this.tooltipRectangle().pos.y + 20);
        Game.context.fillText(this.description, this.tooltipRectangle().pos.x + 10, this.tooltipRectangle().pos.y + 50);
    }

    getRectangle(): Rectangle{ 
        return new Rectangle(Game.interface.positionMenu().pos.x + this.position.x, 
                             Game.interface.positionMenu().pos.y + this.position.y,
                             Game.interface.menuItemSize,
                             Game.interface.menuItemSize)
    };
}