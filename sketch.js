var dog,happydog,database,foodS,foodstock;
var feedPet, addFood;
var fedTime,lastFed;
var foodObj;
function preload()
{
  vpetimg1=loadImage("images/dogImg.png");
  vpetimg2=loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(vpetimg1);
  dog.scale = 0.3;
  foodstock = database.ref('food');
  foodstock.on("value",readstock);
  foodObj = new Food;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM",350,30);
  }else if(lastFed===0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + "AM",350,30);
  }

  foodObj.display();
  drawSprites();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }
 database.ref('/').update({
   food : x
 })
}
function readstock(data){
  foodS = data.val();
}
function feedDog(){
  dog.addImage(vpetimg2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}

