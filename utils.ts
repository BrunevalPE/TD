class Vector2{
    x:number;
    y:number;
    constructor(x:number, y:number){
        this.x = x ? x : 0;
        this.y = y ? y : 0;
    }

    static zero() : Vector2{
        return new Vector2(0,0);
    }

    static distance(a : Vector2, b: Vector2) : number{
        return a.distance(b);
    }

    static substract(a : Vector2, b : Vector2) : Vector2{
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    static add(a : Vector2, b : Vector2) : Vector2{
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    static normalize(a : Vector2) : Vector2{
        let d = Vector2.distance(Vector2.zero(), a);
        return new Vector2(a.x/d, a.y/d);
    }

    distance(b:Vector2) : number{
        return Math.sqrt(
            (this.x - b.x) * (this.x - b.x) +
            (this.y - b.y) * (this.y - b.y)  
        );
    }
    add(b:Vector2) : void{
        this.x += b.x;
        this.y += b.y;
    }
    substract(b:Vector2) : void{
        this.x -= b.x;
        this.y -= b.y;
    }
    to(b:Vector2) : Vector2{
        return Vector2.substract(b,this);
    }
    normalize() : Vector2{
        return Vector2.normalize(this);
    }

}

class Rectangle{
    pos : Vector2;
    size : Vector2;

    constructor(x:number, y: number, w : number, z: number){
        this.pos = new Vector2(x,y);
        this.size = new Vector2(w, z);
    }

    public contain(vec : Vector2){
        if(this.pos.x < vec.x && (this.pos.x + this.size.x) > vec.x &&
           this.pos.y < vec.y && (this.pos.y + this.size.y) > vec.y){
               return true;
        }
        return false;
    }

    public static RectangleContainVector(rectangle : Rectangle, vector : Vector2){
        return rectangle.contain(vector);
    }
}