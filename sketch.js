//Create variables here

var dog
var happyDog
var database
var foodS
var foodStock
var dog1
var dog2
var lastFed

function preload()
{
dog1=loadImage("Dog.png")
dog2=loadImage("happydog.png")
}

function setup() {
  database=firebase.database()
	createCanvas(1000, 400);
  food=new Food()
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  dog=createSprite(800,200,150,150)
  dog.addImage(dog1)
  dog.scale=0.15
  textSize(20)
  
  feed=createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
}


function draw() {  
background(46,139,87)
food.display()
fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed=data.val()
})

fill(255,255,254)
textSize(15)

if(lastFed>=12){
  text("Last Feed:"+lastFed%12+"PM",350,30)
}
else if(lastFed==0){
  text("Last Feed : 12 AM",350,30)
}
else{
  text("Last Feed:"+lastFed+"AM",350,30)
}
drawSprites();

}

function readStock(data){
foodS=data.val()
food.updateFoodStock(foodS)
}

function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(dog2)
  if(food.getFoodStock()<=0){
    food.updateFoodStock(food.getFoodStock()*0)
  }
  else{
    food.updateFoodStock(food.getFoodStock()-1)
  }
  database.ref('/').update({
    Food:food.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}

