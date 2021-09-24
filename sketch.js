var hypnoticBall, database;
var BG;
var position;

function preload(){
  BALLON = loadImage("B-1.gif");
  BACK= loadImage ("12.gif");
}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(1800,700);


  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.addImage(BALLON);
  hypnoticBall.scale=2;


  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  background(BACK);
  textSize(35)
  stroke("black")
  strokeWeight(10)
  fill("blue")
  text("USE ARROW KEYS",50,650);

   if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('ball/position').set({
    x:hypnoticBall.x+ x,
    y:hypnoticBall.y+ y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
