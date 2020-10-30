class Food{
    constructor(){
        this.image = loadImage("images/Milk.png");
        var foodStock;
        var lastFed;
    }
    display(){
        image(this.image)
    }
};