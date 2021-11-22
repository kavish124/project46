var PLAY=1
var END=0
var gameState=PLAY
var car,car_1;
var obstacle,obstacle_11,obstacle_21,obstacle31,obstacle_41,obstacle_51,obstacle_61,obstacleg;
var invisibleGround;
var invisibleGround2;

var gameover,g_img
var restart,r_img

var boy,boy_run,boy_die;
var ground,ground_img

var Meter;



function preload(){
car_1 = loadAnimation("VdgG-0.png","VdgG-1.png","VdgG-2.png","VdgG-3.png","VdgG-4.png",'VdgG-5.png')
boy_run = loadAnimation("boy-3.png","boy-5.png","boy-7.png",)
ground_img = loadAnimation("ground.png")
obstacle_11 = loadAnimation("stone1.png")
obstacle_21 = loadAnimation("stone2.png")
obstacle_31 = loadAnimation("stone3.png")
obstacle_41 = loadAnimation("1-0.png","1-1.png","1-2.png")
obstacle_51 = loadAnimation("2-0.png","2-1.png","2-2.png")
obstacle_61 = loadAnimation("3-0.png","3-1.png","3-2.png")
g_img = loadAnimation("gameOver.png")
r_img = loadAnimation("restart.png")
boy_die = loadAnimation("die.png")
}


function setup() {
createCanvas(windowWidth,windowHeight)
 
//create sprites
ground = createSprite(width/2,height/2+40,20,20)
ground.addAnimation("img",ground_img)
ground.scale=4

invisibleGround = createSprite(width/2,height/2+150,200,20)

invisibleGround2 = createSprite(width/2-400,height/2+130,200,20)

boy = createSprite(width/2,height/2+50,20,20)
boy.addAnimation("run",boy_run)
boy.scale=0.4
boy.addAnimation("die",boy_die)
boy.setCollider("rectangle",0,0,100,350)
//boy.debug=true

car = createSprite(width/2-400,height/2+70,20,20)
car.addAnimation("1",car_1)
car.scale=0.5
car.setCollider("rectangle",0,0,550,220)
//car.debug=true

gameover = createSprite(width/2,height/2-100,20,20)
gameover.addAnimation("img",g_img)
gameover.visible=false

restart = createSprite(width/2,height/2-50,20,20)
restart.addAnimation("img",r_img)
restart.visible=false

obstacleg=new Group()

Meter=0;
}

function draw() {
background(0)

console.log(boy.y)
textSize(20)
fill("blue")
text(Meter+"-meter",width/2+400,height/2-280)

if (gameState===PLAY){
Meter = Meter+Math.round(frameCount%4==0)

boy.changeAnimation("run",boy_run)

if (keyDown("SPACE")&&boy.y>=265){
 boy.velocityY=-18  
}


createobstacle()

 ground.velocityX=-(6+Math.round(Meter/70))

if(ground.x<=500){
    ground.x=870
  }

  boy.velocityY=boy.velocityY +0.8
  car.velocityY=car.velocityY+0.8
  car.collide(invisibleGround2)
invisibleGround2.visible=false
  boy.collide(invisibleGround)
invisibleGround.visible=false

if (obstacleg.isTouching(boy)){
gameState=END
}
}

if (gameState===END){
        ground.velocityX=0
        obstacleg.setVelocityXEach(0)
gameover.visible=true
restart.visible=true
boy.collide(invisibleGround)
car.collide(invisibleGround2)
boy.changeAnimation("die",boy_die)

}
if (mousePressedOver(restart)){
        reset()
        }


drawSprites()
 
}

function reset(){
gameState=PLAY
obstacleg.destroyEach()
gameover.visible=false
restart.visible=false
Meter=0

}

function createobstacle(){
    if (frameCount % 100 === 0){
        var obstacle = createSprite(width/2+700,height/2+50,10,40);
        obstacle.velocityX = -(6+Math.round(Meter/70));
       //obstacle.debug=true
        
         var rand = Math.round(random(1,6));
         switch(rand) {
                case 1: obstacle.addAnimation("11",obstacle_11);
                        obstacle.scale=0.15   
                        obstacle.y=height/2+100
                        obstacle.setCollider("rectangle",0,0,50,50)
                        break;
                case 2: obstacle.addAnimation("21",obstacle_21);
                        obstacle.scale=0.15    
                        obstacle.y=height/2+100
                        obstacle.setCollider("rectangle",0,0,300,600)
                        break;
                case 3: obstacle.addAnimation("31",obstacle_31);
                        obstacle.scale=0.15
                        obstacle.y=height/2+100
                        obstacle.setCollider("rectangle",0,0,100,100)
                        break;
                case 4: obstacle.addAnimation("41",obstacle_41);
                        obstacle.scale=0.3
                        obstacle.y=height/2+70
                        obstacle.setCollider("rectangle",0,0,700,180)
                        break;
                case 5: obstacle.addAnimation("51",obstacle_51);
                        obstacle.scale=0.3
                        obstacle.y=height/2+70
                        obstacle.setCollider("rectangle",0,0,700,180)
                        break;
                case 6: obstacle.addAnimation("61",obstacle_61);
                        obstacle.scale=0.3
                        obstacle.y=height/2+70
                        obstacle.setCollider("rectangle",0,0,700,180)
                        break;
                default: break;
              }
obstacle.lifetime=300

obstacleg.add(obstacle)

}
}

