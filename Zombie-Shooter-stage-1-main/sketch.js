var shooter,shooterImmg1
var shooterimg2
var shooterImg3
var background_img
var bg
var zombie;
var zombieimg;
var heart1,heart2,heart3;
var heart1img,heart2img,heart3img;
var zombieGroup;
var bullets=60;
var bulletGroup;
var gameState="fight"
var life=3
var lose,win,explosion
var score=0

function preload(){
shooterImg1=loadImage("assets/shooter_1.png");
shooterImg2=loadImage("assets/shooter_2.png");
shooterImg3=loadImage("assets/shooter_3.png");
background_img=loadImage("assets/bg.jpeg");
zombieimg=loadImage("assets/zombie.png");
heart1img=loadImage("assets/heart_1.png");
heart2img=loadImage("assets/heart_2.png");
heart3img=loadImage("assets/heart_3.png");

lose=loadSound("assets/lose.mp3");
win=loadSound("assets/win.mp3");
explosion=loadSound("assets/explosion.mp3");

}
function setup(){
createCanvas (windowWidth,windowHeight);
bg=createSprite(displayWidth/2,displayHeight/2,20,20);
bg.addImage(background_img);
bg.scale=1.1;

shooter=createSprite(displayWidth-1000,displayHeight-350,50,50)
shooter.addImage(shooterImg3);
shooter.scale=.3
shooter.debug=true
shooter.setCollider("rectangle",0,0,300,300)

heart1=createSprite(displayWidth-150,40,20,20)
heart1.visibile=false;
heart1.addImage(heart1img);
heart1.scale=.4



heart2=createSprite(displayWidth-110,40,20,20)
heart2.visibile=false;
heart2.addImage(heart2img);
heart2.scale=.4


heart3=createSprite(displayWidth-150,40,20,20)
heart3.addImage(heart3img);
heart3.scale=.4
heart3.visibile=false;

bulletGroup=new Group()
zombieGroup=new Group()

}
function draw(){
background(255);

if(gameState==="fight"){

  if(life===3){
    heart3.visible =true;
    heart2.visible =false;
    heart1.visible =false;
  }

  if(life===2){
    heart3.visible =false;
    heart2.visible =true;
    heart1.visible =false;
  }

  if(life===1){
    heart3.visible =false;
    heart2.visible =false;
    heart1.visible =true;
  }

  if(life===0){
    heart3.visible =false;
    heart2.visible =false;
    heart1.visible =false;
    gameState="lost";
  }

  if (score===100){
    gameState="won";
    win.play();
  }

if(keyDown("UP_ARROW")) {
shooter.y=shooter.y-10
}
if(keyDown("DOWN_ARROW")) {
  shooter.y=shooter.y+10
  }
 
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i++)
    { if(zombieGroup[i].isTouching(bulletGroup))
      { zombieGroup[i].destroy() 
      bulletGroup.destroyEach();
      score=score+10
     // gameState="won"    
      } 
    }
  }
  
    if(zombieGroup.isTouching(shooter)){
      lose.play();
      for(var i=0;i<zombieGroup.length;i++)
      { if(zombieGroup[i].isTouching(shooter))
        { zombieGroup[i].destroy() } }
       life=life-1;

    }

   if(keyWentDown("LEFT_ARROW")){
bullet=createSprite(displayWidth-1150,shooter.y-30,20,20)
bullet.velocityX=20;
bulletGroup.add(bullet);
shooter.depth=bullet.depth;
shooter.depth=shooter.depth+2;
shooter.addImage(shooterImg3);
bullets=bullets-1;
explosion.play();
    } 

 if(keyWentUp("LEFT_ARROW")){
  shooter.addImage(shooterImg2);
    } 

if(bullets===0){
  gameState="bullet";
  lose.play();
}

    spawnZombie();}
    drawSprites();
  
    textSize(20)
    fill("white")
    text("bullets= "+bullets,displayWidth-210,displayHeight/2-250)
    text("score= "+score,displayWidth-200,displayHeight/2-220)
    text("life= "+life,displayWidth-210,displayHeight/2-280)

    if(gameState==="lost"){
      textSize(100);
      fill("red")
      text("**You Lost**",400,400)
      zombieGroup.destroyEach();
      shooter.destroy();
    }

   else if(gameState==="won"){
      textSize(100);
      fill("green")
      text("You WON!!",400,400)
      zombieGroup.destroyEach();
      shooter.destroy();
    }

    else if(gameState==="bullet"){
      textSize(75);
      fill("blue")
      text("**You Ran Out Of Bullets** ",300,400)
      zombieGroup.destroyEach();
      shooter.destroy();
      bulletGroup.destroyEach();
      
    }

}
function spawnZombie(){
  if (frameCount%50===0){
   zombie=createSprite(random(500,1100),random(300,500),40,40);
   zombie.addImage(zombieimg);
   zombie.scale=.15;
   zombie.velocityX=-3;
   zombie.debug=true
zombie.setCollider("rectangle",0,0,400,400)
zombie.lifetime=400;
zombieGroup.add(zombie);
  }
}