class Interface{
    private gold : number = 200;
    private menuItems : Array<MenuItem> = [];    
    
    private bigMessage : Message = null;
    private sideMessage : Message = null;
    private messages : Array<Message> = [];
    
    public readonly menuItemSize : number = 50;
    public readonly menuSize : Vector2 = new Vector2(300, 200);

    public positionMenu = () => { return new Rectangle(Game.w() - this.menuSize.x, Game.h() - this.menuSize.y, this.menuSize.x, this.menuSize.y);} 

    constructor(){
        let index = 0;
        data.menuItems.forEach(menuItem => {
            this.menuItems.push(new MenuItem(menuItem, index));
            index++;
        });
    }

    public mouseMoveEvent(evt : MouseEvent){
        let mousePos = new Vector2(evt.clientX, evt.clientY);
        Game.interface.menuItems.forEach(mi => {
            if(mi.initialize){
                mi.mouseHover = mi.getRectangle().contain(mousePos);
            }
        });
    }
    
    public mouseClickEvent(evt : MouseEvent){
        let mousePos = new Vector2(evt.clientX, evt.clientY);
        Game.interface.menuItems.forEach(mi => {
            if(mi.initialize){
                if(mi.getRectangle().contain(mousePos)){
                    mi.buy();
                }
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

        this.drawTexts();
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

    public drawTexts(){
        for(let i = 0; i < this.messages.length; i++){
            if(this.messages[i].alpha <- 0){
                this.messages.splice(i,1);
            }
            if(this.messages[i]){
                this.messages[i].draw();
            }
        }   
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
 // use list instead of 2 var
    public createMessage(message:string, showTime : number, kind : MessageKind){
        this.messages.push(new Message(message, showTime, kind));
    }
}

class Message{
    public text : string;
    public alpha : number = 1;
    public timer : number; // ms
    public kind : MessageKind;


    font : string;
    r : string;
    g : string;
    b: string;
    position: Vector2;

    private lastRender : Date;
    private startTimer : Date;

    constructor(text : string, timer : number, kind : MessageKind) {
        this.text = text;
        this.timer = timer;
        this.kind = kind;
        this.startTimer = new Date();

        switch(this.kind){
            case MessageKind.Big:
                this.font = "40px Segoe UI";
                this.r = "255";
                this.g = "204";
                this.b = "0";

                this.position = new Vector2((Game.w()/2) - (text.length*10), 100);
                break;

            case MessageKind.Side:
                this.font = "20px Segoe UI";
                this.r = "255";
                this.g = "204";
                this.b = "0";

                this.position = new Vector2(25, Game.h()*0.5);
                break;

            case MessageKind.BigCountDown:
                this.font = "40px Segoe UI";
                this.r = "255";
                this.g = "204";
                this.b = "0";

                this.position = new Vector2((Game.w()/2) - (text.length*10), 100);
                break;
        }
    }

    public draw(){
        let subText = '';
        Game.context.font = this.font;
        Game.context.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`;
        if(this.lastRender){
            let ellapsedTime = (new Date()).valueOf() - this.lastRender.valueOf();
            let remainTime = this.timer - ellapsedTime;
            if(this.kind != MessageKind.BigCountDown){
                if(remainTime < 0){
                    this.alpha = 0;
                }else{
                    this.alpha -= (ellapsedTime/this.timer);
                }
            }else{
                let remainTime = (new Date()).valueOf() - this.startTimer.valueOf();
                subText = ' ' + Math.floor(((this.timer-remainTime)/1000)).toString();
                if((this.timer - remainTime) < 0 ){
                    this.alpha = 0;
                }
            }
        }
        this.lastRender = new Date();
        Game.context.fillText(this.text + subText, this.position.x, this.position.y);
    }

}

enum MessageKind{
    Big,
    Side,
    BigCountDown
}