var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var gameState;
var particles = [];
var plinkos = [];
var divisions = [];
var particle;
var turn = 0;

var divisionHeight=300;
var score = 0;
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


    for (var k = 0; k <=width; k = k + 80) {
      divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
    }

    for (var p = 75; p < 400; p = p+100)
    {
      for (var q = 75; q <=width; q=q+50) 
      {
         plinkos.push(new Plinko(q,p));
      }
    }
    for (var p = 125; p < 400; p = p+100)
    {
      for (var q = 50; q <=width; q=q+50) 
      {
         plinkos.push(new Plinko(q,p));
      }
    }

    
}
 


function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,20,30);
  text("Turns remaining : "+(5-turn),600,30);
  for (var t = 20; t<800; t=t+240) {
    text("500", t, 520);
  }
  for (var t = 100; t<800; t=t+240) {
    text("100", t, 520);
  }
  for (var t = 180; t<800; t=t+240) {
    text("200", t, 520);
  }
  fill("yellow");
  line(0, 500, 800, 500);
    Engine.update(engine);
  rect(400, 480, 800, 5);
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }

  if (particle !=null)  {
    particle.display();

    if (particle.body.position.y>520) {
      if ((particle.body.position.x>0 && particle.body.position.x <80) ||
          (particle.body.position.x>240 && particle.body.position.x <320) ||
          (particle.body.position.x>480 && particle.body.position.x <560) ||
          (particle.body.position.x>720 && particle.body.position.x <800)) {
        if (particle.body.position.y >700) {
          score = score+500;
         
        }

      }     
      if ((particle.body.position.x>80 && particle.body.position.x <160) ||
            (particle.body.position.x>320 && particle.body.position.x <400) ||
            (particle.body.position.x>560 && particle.body.position.x <640)) {
         if (particle.body.position.y >700) {
                score = score+100;
          }
      }
     if ((particle.body.position.x>160 && particle.body.position.x <240) ||
              (particle.body.position.x>400 && particle.body.position.x <480) ||
               (particle.body.position.x>640 && particle.body.position.x <720)) {
         if (particle.body.position.y >700) {
                  score = score+200;
         }
        }
      if (particle.body.position.y >700) {
        particle = null;
      }
    }
    if (turn == 5) {
      gameState = "end";
      textSize(100);
      text("GAME OVER!!!", 100, 400);
    }
  }

   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }


  }


function mousePressed() {
  if(gameState!=="end" && mouseY<75 && mouseX > 40){
    turn++;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}