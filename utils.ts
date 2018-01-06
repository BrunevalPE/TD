class Vector2{
    x:number;
    y:number;
    constructor(x:number, y:number){
        this.x = x ? x : 0;
        this.y = y ? y : 0;
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