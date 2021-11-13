var car,carEmpty,carFull
var road,roadImg;
var obstacle,garbage;
var obstacle1,obstacle2,obstacle3;
var garbage1,garbage2;
var obstaclesGroup,garbageGroup;
var blast;
var gameOver,gameOverImg,restart,restartImg;
var crashSound;
var popSound;
var musicSong;
var garbagePickedUp = 0;

var gameState = 1;

var wall1,wall2;

function preload(){
  carEmpty = loadImage("car.png");
  carFull = loadImage("car2.png");
  roadImg = loadImage("track.jpg");

  //obstacles
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");

  //gameOver
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png")

  //garbage
  garbage1 = loadImage("garbage1.png");
  garbage2 = loadImage("garbage2.png");
  garbage3 = loadImage("garbage3.png");

  //pop
  popSound = loadSound("pop.wav");

  //music
  musicSong = loadSound("music.mp3");

  //blast
   crashSound = loadSound("crash.wav")
   blast = loadAnimation("./blast/blast1.png","./blast/blast2.png","./blast/blast3.png","./blast/blast4.png","./blast/blast5.png","/blast/blast6.png","./blast/blast7.png","./blast/blast8.png","./blast/blast9.png","./blast/blast10.png","./blast/blast11.png","./blast/blast12.png","./blast/blast13.png","./blast/blast14.png","./blast/blast15.png","./blast/blast16.png","./blast/blast17.png","./blast/blast18.png","./blast/blast19.png","./blast/blast20.png","./blast/blast21.png","./blast/blast22.png","./blast/blast23.png","./blast/blast24.png")
}

function setup() {
  createCanvas(800,800);

   frameRate(50);

    musicSong.play();
    musicSong.setVolume(0.5);

  blast.looping =false;

//road
  road= createSprite(420,400,800,800)
  road.addImage(roadImg,"road");
  road.scale=1.1;

  //car
  car = createSprite(400,600,10,10)
  car.addImage(carFull,"car");
  car.addAnimation("carBlast",blast);
  car.scale=1.1;

  obstaclesGroup=new Group();
  garbageGroup=new Group();
  
  //gameOver
  gameOver = createSprite(400,400)
  gameOver.addImage("gameover",gameOverImg);

  restart = createSprite(400,550,10,50);
  restart.addImage("restart",restartImg);
  restart.scale=0.1;

  //walls
  wall1=createSprite(5,400,10,800);
  wall2=createSprite(795,400,10,800);

  car.setCollider("rectangle",0,10,60,60);
}

function draw() {
  background("blue"); 

  console.log("gamestate="+gameState)

  if(gameState===1){
   if(keyDown("LEFT_ARROW")){
   car.x=car.x-(12 + 2* garbagePickedUp/100)
 } 
  
 if(keyDown("RIGHT_ARROW")){
   car.x=car.x+(12 + 2* garbagePickedUp/100);
 }

  gameOver.visible=false;
  restart.visible=false;

  road.velocityY = (20 + 10* garbagePickedUp/100);
  
 SpawnObstacles();
 SpawnGarbage();
}
if(road.y>1600){
  road.y=width/2;
 }

 blast.frameDelay=10;

//car.debug=true;

if(gameState===0){

  car.scale=2.4;
  road.velocityY=0;
  car.velocityY=0;
  gameOver.visible=true;
  restart.visible=true;

  if(mousePressedOver(restart)) {
    location.reload();
  }

}

car.collide(wall1);
car.collide(wall2);

 if(obstaclesGroup.isTouching(car)){
   garbageGroup.destroyEach();
   car.changeAnimation("carBlast",blast);
   obstaclesGroup.destroyEach();
   car.scale=1.3;
   crashSound.play();
   gameState= 0;
 }


 if(garbageGroup.isTouching(car)){
   garbageGroup.destroyEach();
   garbagePickedUp=garbagePickedUp+1
   popSound.play();
 }
 
  drawSprites();
  textSize(20);
  fill(255);
  text("Garbage_Collected: "+ garbagePickedUp,10,30);
  
}

function SpawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(400,-50,60,60);
    obstacle.x=Math.round(random(600,10))
    obstacle.scale=0.2;
    obstacle.velocityY = (10 + 10* garbagePickedUp/100);
    obstacle.lifetime=120;

    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;

      default: break;
    }
    obstaclesGroup.add(obstacle);
  }
} 

function SpawnGarbage(){
  if (frameCount % 60 === 0){
    var garbage = createSprite(400,0,60,60);
    garbage.x=Math.round(random(500,50))
    garbage.scale=0.13;
    garbage.velocityY = (20 + 5* garbagePickedUp/100);
    garbage.lifetime=60;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: garbage.addImage(garbage1);
              break;
      case 2: garbage.addImage(garbage2);
              break;
      case 3: garbage.addImage(garbage3);
              break;

      default: break;
    }
    garbageGroup.add(garbage);
  }
} 

