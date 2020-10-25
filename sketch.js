var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, fruit, monster, fruitGroup, enemyGroup, score, randomFruit;
var swordImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameOverImage;
var score=0;
function preload() {
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png", " alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage=loadImage("gameover.png")
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
  gameOverSound=loadSound("gameover.mp3");
}

function setup(){
  createCanvas(600,600);
  sword=createSprite(30,30, 30,30);
  sword.addImage(swordImage);
  sword.scale=0.5;
  fruitGroup= new Group();
  EnemyGroup=new Group();
}

function draw() {
background("lightblue")
  if(gameState==PLAY){
    sword.x=mouseX;
  sword.y=mouseY;
  fruits();
  Enemy();
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    knifeSwooshSound.play();
    score=score+2;
  }
    if(EnemyGroup.isTouching(sword)){
      gameState=END
      gameOverSound.play();
    }
  }
  if(gameState==END){
    sword.addImage(gameOverImage)
    sword.x=200;
    sword.y=200;
  }
  
  text("score"+score, 200,50);
  drawSprites();
}
function fruits(){
  if(World.frameCount%80==0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
    } else if(r==2){
      fruit.addImage(fruit2);
    }else if(r==3){
      fruit.addImage(fruit3);
     } else {
       fruit.addImage(fruit4);
     }
    fruit.y=Math.round(random(50,340));
    
    fruit.setLifetime=100;
    position=Math.round(random(1,2));
    if(position==1)
      {
        fruit.x=400;
        fruit.velocityX=-(7+(score/4));
      }
          else
        {
          if(position==2){
            fruit.x=0;
            
            fruit.velocityX=(7+(score/4));
          }
      }
    fruitGroup.add(fruit);
  }
}
function Enemy(){
  if(World.frameCount%200==0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    EnemyGroup.add(monster);
  }
}
