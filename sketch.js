var heli
var nuke
var mountain
var bestCloud;
var bullet;
var explo
var bg;
var life = 3;
var heart_1;
var heart_2;
var heart_3;
var score = 0;
var bullets = 120;
var gameState = "fight";
var win;
var lose;
var explosion;



function preload(){
    helicopter = loadImage("heli-1.png");
    mountain = loadImage("mountain.png");
    missile = loadImage("missile.png");
    bestCloud = loadImage("best_cloud.png");
    bulletboi = loadImage("bullet.png");
    explos = loadImage("explo.png");
    heart_1 = loadImage("heart 1.png");
    heart_2 = loadImage("heart 2.png");
    heart_3 = loadImage("heart 3.png");
    win = loadSound("win.mp3");
    lose = loadSound("lose.mp3");
    explosion = loadSound("explosion.mp3");
}

function setup(){

    createCanvas(1500,800);

    bulletGroup = new Group();
    missileGroup = new Group();

    bg = createSprite(165,485,1,1);
    bg.addImage(mountain);
    bg.scale = 3;


    heli = createSprite(165,485,50,50);
    heli.addImage(helicopter);
    heli.scale = 0.6;

    explo = createSprite(-3,-70,50,50);
    explo.addImage(explos);
    explo.scale = 0.6;
    explo.visiblity = false;

    heart1 = createSprite(displayWidth-880,40,20,20);
    heart1.visible = true;
    heart1.addImage("heart1",heart_1);
    heart1.scale = 0.4;

    heart2 = createSprite(displayWidth-790,40,20,20);
    heart2.visible = true;
    heart2.addImage("heart2",heart_2);
    heart2.scale = 0.4;

    heart3 = createSprite(displayWidth-700,40,20,20);
    heart3.visible = true;
    heart3.addImage("heart3",heart_3);
    heart3.scale = 0.4;




}

function draw(){

    spawnClouds();
    drawSprites();
    spawnMissile();

    
    
    if (gameState === "fight"){

        if(life === 3){
            heart3.visible = true;
            heart2.visible = true;
            heart1.visible = true;
        }
        if(life === 2){
            heart3.visible = false;
            heart2.visible = true;
            heart1.visible = true;
        }
        if(life === 1){
            heart3.visible = false;
            heart2.visible = false;
            heart1.visible = true;
        }

        if(life === 0){
            heart3.visible = false;
            heart2.visible = false;
            heart1.visible = false;
            gameState = "lost";
            
        
        }

        if(score === 100){
            gameState = "won"
        }

        if(bullets === 0){
            gameState = "bullet"
        }
        

    
    
    if (keyDown(UP_ARROW)){
        heli.velocityY = -10;
    }

    if(keyDown(DOWN_ARROW)){
        heli.velocityY = 10;
    }

    if (keyDown(RIGHT_ARROW)){
        shootBullet();
    }

    if (missileGroup.isTouching(bulletGroup)){
        for(var i=0; i < missileGroup.length; i++){

            if(missileGroup[i].isTouching(bulletGroup)){
            
                score = score + 5;
                explosion.play();
                bulletGroup.destroyEach();
                missileGroup[i].addImage(explos);
                missileGroup[i].velocityX = 0;
                setTimeout(function(){
                    missileGroup[i].destroy();
                },1)
                
            
            
            
            

            }
        }

    }

    if(missileGroup.isTouching(heli)){
        for(var i=0; i < missileGroup.length; i++){

            if(missileGroup[i].isTouching(heli)){
                missileGroup[i].destroy();
                life = life - 1;
                
                
            }
        }
    
    
}
heli.debug = true;
text("Bullets " + bullets,20,20);
text("Score " + score,20,40);
text("Lives " + life,20,60);

}//if codition game state fight closed

    if (gameState == "lost"){

        textSize(100);
        fill("red");
        text("You Lost!",400,400);
        lose.play();
        missileGroup.destroyEach();
        heli.destroy();
    }

    else if(gameState == "won"){

        textSize(100);
        fill("yellow");
        text("You Won!",400,400);
        win.play();
        missileGroup.destroyEach();
        heli.destroy();

    }

    else if(gameState == "bullet"){
        textSize(100);
        fill("orange");
        text("You ran out'a bullets!",400,400);
        missileGroup.destroyEach();
        heli.destroy();
        bulletGroup.destroyEach();
    }
}

function spawnClouds(){

    if(frameCount % 100 === 0){

    cloud = createSprite(1300,100,50,50);
    cloud.y = Math.round(random(70,180));
    cloud.addImage(bestCloud);
    cloud.scale = 0.7;
    cloud.velocityX = -4;
    cloud.depth = heli.depth;
    heli.depth = heli.depth +1;
    cloud.lifetime = 1300/4;
    

    }
}

function spawnMissile(){

    if(frameCount % 70 == 0){

    nuke = createSprite(1300,390,50,50);
    nuke.addImage(missile);
    nuke.scale = 0.4;
    nuke.velocityX = -15;
    nuke.y = Math.round(random(200,700));
    nuke.depth = heli.depth;
    heli.depth = heli.depth +1;
    nuke.lifetime = 1300/9;
    missileGroup.add(nuke);
    nuke.setCollider("rectangle",0,0,250,150)
    nuke.debug = true;
    }
}

function shootBullet(){
    bullet = createSprite(180,heli.y,50,50);
    bullet.addImage(bulletboi);
    bullet.scale = 0.17;
    bullet.velocityX = 100;
    bulletGroup.add(bullet);
    bullets = bullets - 1;
}



