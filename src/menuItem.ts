import { Vector2, Rectangle } from './utils.js';
import { Game } from './game.js';
import { MessageKind } from './interface.js';
import { data } from './data.js';
import { Tower } from './tower.js';

class MenuItem {
    price: number;
    name: string;
    mouseHover: boolean;
    position: Vector2;
    icon: HTMLImageElement;
    tooltip: TooltipItemMenu;
    index: number;
    initialize: boolean = false;

    constructor(obj: any, index: number) {
        this.price = obj.price;
        this.name = obj.name;
        this.mouseHover = false;
        this.icon = new Image();
        this.icon.src = obj.icon;
        this.tooltip = new TooltipItemMenu(obj.tooltip);
        this.index = index;
    }

    draw(pos: Vector2): void {
        if (!this.initialize) {
            this.initialize = true;
            this.computePosition(this.index);
        }
        Game.context.beginPath();
        Game.context.rect(this.getRectangle().pos.x, this.getRectangle().pos.y, this.getRectangle().size.x, this.getRectangle().size.y);
        Game.context.strokeStyle = '#FFF';
        Game.context.lineWidth = 1;
        Game.context.stroke();
        if (this.icon.complete) Game.context.drawImage(this.icon, this.getRectangle().pos.x, this.getRectangle().pos.y, Game.interface.menuItemSize, Game.interface.menuItemSize);

        if (this.mouseHover) this.showToolTip();
    }

    buy(): void {
        let hasTower = false;
        Game.towers.forEach((t) => {
            if (Game.grid.caseSelected.rectangle.contain(t.initialPosition)) {
                hasTower = true;
            }
        });
        if (!hasTower) {
            if (Game.wavelogic.pending) {
                Game.interface.createMessage("Can't build outside build phase", 2000, MessageKind.Side);
                return;
            }
            if (Game.interface.getGold() >= this.price) {
                data.towers.forEach((towerInfo) => {
                    if (towerInfo.name == this.name) {
                        let tower = new Tower(towerInfo, new Vector2(Game.grid.caseSelected.rectangle.pos.x, Game.grid.caseSelected.rectangle.pos.y));

                        Game.towers.push(tower);
                        Game.grid.caseSelected.tower = tower;

                        Game.interface.buy(this);
                    }
                });
            } else {
                Game.interface.createMessage('Not enought minerals', 2000, MessageKind.Side);
            }
        } else {
            Game.interface.createMessage('Existing tower on spot', 2000, MessageKind.Side);
        }
    }

    showToolTip(): void {
        this.tooltip.draw();
    }

    getRectangle(): Rectangle {
        if (!this.position) return null;
        return new Rectangle(Game.interface.positionMenu().pos.x + this.position.x, Game.interface.positionMenu().pos.y + this.position.y, Game.interface.menuItemSize, Game.interface.menuItemSize);
    }

    computePosition(index: number) {
        var x = index * Game.interface.menuItemSize;
        var y = 0;
        while (x + Game.interface.menuItemSize > Game.interface.menuSize.x) {
            x -= Game.interface.menuSize.x;
            y += Game.interface.menuItemSize;
        }
        this.position = new Vector2(x, y);
    }
}

class TooltipItemMenu {
    title: string;
    price: number;
    description: string;

    constructor(obj: any) {
        this.title = obj.title;
        this.price = obj.price;
        this.description = obj.description;
    }

    tooltipRectangle = () => {
        return new Rectangle(Game.w() - Game.interface.menuSize.x, Game.h() - 300, Game.interface.menuSize.x, 100);
    };

    draw(): void {
        Game.context.beginPath();
        Game.context.rect(this.tooltipRectangle().pos.x, this.tooltipRectangle().pos.y, this.tooltipRectangle().size.x, this.tooltipRectangle().size.y);
        Game.context.strokeStyle = '#FFF';
        Game.context.lineWidth = 1;
        Game.context.stroke();

        Game.context.font = '20px Segoe UI';
        Game.context.fillStyle = '#CA5100';
        Game.context.fillText(this.price + ' gold', this.tooltipRectangle().pos.x + 200, this.tooltipRectangle().pos.y + 20);

        Game.context.font = '20px Segoe UI';
        Game.context.fillStyle = '#FFF';
        Game.context.fillText(this.title + ' :', this.tooltipRectangle().pos.x + 5, this.tooltipRectangle().pos.y + 20);

        Game.context.font = '16px Segoe UI';
        Game.context.fillStyle = '#007ACC';
        Game.context.fillText(this.description, this.tooltipRectangle().pos.x + 5, this.tooltipRectangle().pos.y + 50);
    }
}

export { MenuItem, TooltipItemMenu };
