import { Circle, Vector2, Guid } from './utils.js';
import { Enemy } from './enemy.js';

import { Game } from './game.js';
import { Grid } from './grid.js';

class Tower {
    pv: number;
    maxPv: number;
    damage: number;
    attackSpeed: number;
    range: number;
    hitbox: Circle;

    name: string;

    position: Vector2;
    initialPosition: Vector2;

    icon: HTMLImageElement;

    aggro: boolean = false;
    debug: boolean = false;
    target: Enemy;

    guid: string;
    lastAttack: Date;

    rays: Array<Ray> = new Array();

    constructor(obj: any, pos: Vector2) {
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

        this.hitbox = new Circle(this.position, Grid.size);
        this.guid = Guid.NewGuid();
    }

    draw(): void {
        this.update();

        if (this.pv > 0) {
            if (this.icon.complete) Game.context.drawImage(this.icon, this.position.x, this.position.y, Grid.size, Grid.size);

            this.drawLife();
            this.drawRange();

            if (this.debug) this.debugDisplay();
        }
    }

    drawLife(): void {
        Game.context.beginPath();
        Game.context.fillStyle = '#50D050';
        Game.context.fillRect(this.position.x + 5, this.position.y + 4, (this.pv / this.maxPv) * (Grid.size - (Grid.size / 5)), 2);
        Game.context.stroke();
    }

    takeDamage(damage: number, crit: boolean) {
        Game.interface.createDamage(damage, crit, new Vector2(this.position.x + Grid.size / 2, this.position.y), true);
        this.pv -= damage;
    }

    update(): void {
        if (Game.running) {
            if (this.pv > 0) {
                Game.enemies.forEach((enemy) => {
                    if (this.target == null) {
                        if (this.position.distance(enemy.position) < this.range && !enemy.isDeathState) {
                            this.target = enemy;
                        }
                    } else {
                        if (this.target != null && this.position.distance(this.target.position) > this.position.distance(enemy.position) && !enemy.isDeathState) {
                            this.target = enemy;
                        }
                        if (this.target.pv <= 0) {
                            this.target = null;
                        }
                    }
                });

                if (
                    this.target &&
                    this.position.distance(this.target.position) < this.range &&
                    (this.lastAttack == undefined || new Date().valueOf() - this.lastAttack.valueOf() > +(1000 / this.attackSpeed))
                ) {
                    this.rays.push(new Ray(this, this.target));

                    let crit = Math.random() < 0.2;
                    let damage = Math.floor(this.damage * (1 + Math.random() / 5) * (crit ? 2 : 1));

                    this.target.takeDamage(damage, crit);
                    this.lastAttack = new Date();
                }
            }

            if (Game.enemies.length == 0) {
                this.target = null;
                this.pv = this.maxPv;
            }
            for (let i = 0; i < this.rays.length; i++) {
                if (new Date().valueOf() - this.rays[i].firstDraw.valueOf() > this.rays[i].showTime) {
                    this.rays.splice(i, 1);
                } else {
                    this.rays[i].draw();
                }
            }
        }
    }

    drawRange() {
        Game.context.beginPath();
        Game.context.strokeStyle = 'rgba(255,255,255,0.3)';
        Game.context.arc(this.position.x + Grid.size / 2, this.position.y + Grid.size / 2, this.range, 0, 2 * Math.PI);
        Game.context.stroke();
    }

    debugDisplay() {
        if (this.target) {
            Game.context.beginPath();
            Game.context.strokeStyle = 'purple';
            Game.context.moveTo(this.position.x + Grid.size / 2, this.position.y + Grid.size / 2);
            Game.context.lineTo(this.target.position.x + Grid.size / 2, this.target.position.y + Grid.size / 2);
            Game.context.stroke();
        }
    }
}

class Ray {
    start: Vector2;
    end: Vector2;
    firstDraw: Date;
    showTime: number = 200;

    constructor(tower: Tower, enemy: Enemy) {
        this.start = tower.position;
        this.end = enemy.position;
        this.firstDraw = new Date();
    }

    draw() {
        Game.context.beginPath();
        Game.context.strokeStyle = 'white';
        Game.context.moveTo(this.start.x + Grid.size / 2, this.start.y);
        Game.context.lineTo(this.end.x + Grid.size / 2, this.end.y + Grid.size / 2);
        Game.context.stroke();
    }
}

export { Ray, Tower };
