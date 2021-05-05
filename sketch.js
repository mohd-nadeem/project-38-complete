var bananaImg, bananaGroup;
var obstaclesImg, obstaclesGroup;
var scene, backImg, score, ground;
var player, monkey;
var gameState;
var monkeyStillImg;

function preload() {

  backImg = loadImage("jungle.png");

  player = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  obstaclesImg = loadImage("stone.png");
  bananaImg = loadImage("banana.png");

  monkeyStillImg = loadAnimation("Monkey_01.png");
}

function setup() {
  createCanvas(displayWidth - 20, 500);

  scene = createSprite(displayWidth / 2, 0, displayWidth, 400);
  scene.addImage(backImg);
  scene.scale = 2;

  monkey = createSprite(40, 280, 20, 20);
  monkey.addAnimation("Player", player);
  monkey.addAnimation("Still", monkeyStillImg);
  monkey.scale = 0.1;

  ground = createSprite(displayWidth / 2, 320, 800000, 5);
  ground.visible = false;
  // ground.velocityX = 2;

  obstaclesGroup = new Group();
  bananaGroup = new Group();

  gameState = 1;
}

function draw() {
  background("black");

  if (scene.x < 0) {
    scene.x = scene.width / 2;
  }
  
  if (keyDown("space") && monkey.y >= 250) {
    monkey.velocityY = -17;
  }

  monkey.velocityY = monkey.velocityY + 0.9;

  monkey.velocityX = 2;
  camera.position.x = monkey.x;

  monkey.collide(ground);

  if (frameCount % 300 === 0) {
    var stone = createSprite(4230, 280, 20, 20);
    stone.addImage(obstaclesImg);
    stone.scale = 0.2;
    stone.velocityX = -10;
    obstaclesGroup.add(stone);
  }

  if (World.frameCount % 80 === 0) {
    var banana = createSprite(4230, random(110, 190), 20, 20);
    banana.addImage(bananaImg);
    banana.scale = 0.06;
    banana.velocityX = -14;
    bananaGroup.add(banana);
  }

  if (monkey.x > 3700) {
    gameState = 2;
  }

  if (obstaclesGroup.isTouching(monkey)) {
    gameState = 0;
  }

  if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    //score = score + 2;
  }

  switch (score) {
    case 10:
      monkey.scale = 0.12;
      break;
    case 20:
      monkey.scale = 0.14;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.18;
      break;
    case 50:
      monkey.scale = 0.20;
      break;
    default:
      break;
  }
  drawSprites();
  if (gameState === 0) {
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    monkey.changeAnimation("Still", monkeyStillImg);
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    camera.position.x = monkey.x;
    textSize(34);
    text("Game Over", displayWidth / 2, 250)
  }

 

  if(gameState === 2) {
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    monkey.changeAnimation("Still", monkeyStillImg);
    textSize(34);
    text("You Win", 3700, 200);
  }
    
}