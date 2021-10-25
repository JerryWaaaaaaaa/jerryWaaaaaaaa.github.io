var canvas;
var canvasWidth;
var canvasHeight;
var moduleWidth;
var moduleHeight;

var tileMapList = [];
var tinyTrees = [1,2,3,4,5,6];
var bigTreesOffset = [7,9,11,19,21,23,31];
var tinyStones = [33,34,35,36,39,40,41,42,43,44,45,46];
var lakeOffset = [47,63,81];

var myFont;

var theWorld;
var thePlayer;
var theZombie = [];
var bullets = [];

var bloods = [];

var pieces = [];
var piecesImage = [];

var explosions = [];

var boxRow;
var boxCol;
var preBoxRow;
var preBoxCol;

var offsetX;
var offsetY;

var scareSound;
var scareSoundPower;

var startImage;
var startButton;
var settingButton;
var settingMenu;
var backButton;
var easy;
var medium;
var hard;
var endButton;
var endImage;
var arrow;

// game-related virables
var bgMusic;
var footStep;
var glockReload;
var glockShot;
var M4A1Reload;
var M4A1Shot;
var RPGReload;
var RPGShot;
var hurtSound;
var piecesSound;
var zombiesSound = [];
var boxSound;
var buttonHover;
var buttonClick;

var wordArray;
var mostRecentWord;

// for lootbox
var boxExist;
var boxLocation;

// for difficulty setting
var maxZombie;
var difficulty;
var levelString = "EASY";

// for pre-game & game start
var start = false;
var over = false;
var bgPlayed = false;
var preScore;
var score;

// for pre-game interface buttons
var button1HoverPlayed = false;
var button2HoverPlayed = false;
var button3HoverPlayed = false;
var button4HoverPlayed = false;
var button5HoverPlayed = false;
var button6HoverPlayed = false;
var settingMenuOpen = false;
var buttonClickPlayed = false;

// for loading interface
var loadCounter = 0; // count how many files have loaded
var loaded = false; // count if all files are loaded
var maxFile = 36; // quantity of all files to be load

var worldParameters = {
  tileSize: 25,
  tileFolder: 'tiles',
  numTiles: 100,
  tileMap: tileMapList,
  solidTiles: {0:false, 1:false, 2:false, 3:false, 4:false, 5:false, 6:false, 96:false, 97:false, 98:false, 99:false}
};

function gameLoadImage(index, varName, fileName){
    varName = loadImage(fileName, imageLoaded);
    function imageLoaded(){
      loadCounter ++;
      console.log(loadCounter + " " + fileName, loaded);
      if(loadCounter >= maxFile){
        loaded = true;
      }
    }
    return varName;
}

function gameLoadFont(index, varName, fileName){
    varName = loadFont(fileName, fontLoaded);
    function fontLoaded(){
      loadCounter ++;
      console.log(loadCounter + " " + fileName, loaded);
      if(loadCounter >= maxFile){
        loaded = true;
      }
    }
    return varName;
}

function gameLoadSound(index, varName, fileName){
    varName = loadSound(fileName, soundLoaded);
    function soundLoaded(){
      loadCounter ++;
      console.log(loadCounter + " " + fileName, loaded);
      if(loadCounter >= maxFile){
        loaded = true;
      }
    }
    return varName;
}

function preload(){
  canvasHeight = windowHeight*0.8;
  canvasWidth = canvasHeight*16/9;
  moduleWidth = canvasWidth/50;
  moduleHeight = moduleWidth;
}

function windowResized(){
    canvasHeight = windowHeight*0.8;
    canvasWidth = canvasHeight*16/9;
    moduleWidth = canvasWidth/50;
    moduleHeight = moduleWidth;
    resizeCanvas(canvasWidth,canvasHeight);
}

function setup(){
    canvasHeight = windowHeight*0.8;
    canvasWidth = canvasHeight*16/9;
    moduleWidth = canvasWidth/50;
    moduleHeight = moduleWidth;
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.id("myCanvas");
    canvas.parent("canvasBox");
    background(233,168,109);


    //startImage = loadImage("tiles/begin.png");
    startImage = gameLoadImage(loadCounter, startImage, "tiles/begin.jpg");
    // startButton = loadImage("tiles/startButton.png");
    startButton = gameLoadImage(loadCounter, startButton, "tiles/startButton.png");
    // settingButton = loadImage("tiles/setting.png");
    settingButton = gameLoadImage(loadCounter, settingButton, "tiles/setting.png");
    // settingMenu = loadImage("tiles/settingMenu.png");
    settingMenu = gameLoadImage(loadCounter, settingMenu, "tiles/settingMenu.png");
    // backButton = loadImage("tiles/back.png");
    backButton = gameLoadImage(loadCounter, backButton, "tiles/back.png");
    // easy = loadImage("tiles/easy.png");
    easy = gameLoadImage(loadCounter, backButton, "tiles/easy.png");
    // medium = loadImage("tiles/medium.png");
    medium = gameLoadImage(loadCounter, backButton, "tiles/medium.png");
    // hard = loadImage("tiles/hard.png");
    hard = gameLoadImage(loadCounter, backButton, "tiles/hard.png");
    // endImage = loadImage("tiles/end.png");
    endImage = gameLoadImage(loadCounter, backButton, "tiles/end.jpg");
    // endButton = loadImage("tiles/endButton.png");
    endButton = gameLoadImage(loadCounter, backButton, "tiles/endButton.png");
    // arrow = loadImage("tiles/arrow.png");
    arrow = gameLoadImage(loadCounter, backButton, "tiles/arrow.png");
    for(var i = 0; i < 7; i ++ ){
        // var fileName = loadImage("tiles/pieces-" + i + ".png");
        // piecesImage[i] = fileName;
        piecesImage[i] = gameLoadImage(loadCounter, piecesImage[i], "tiles/pieces-" + i + ".png");
    }

    // myFont = loadFont("fonts/Montserrat-Medium.ttf");
    myFont = gameLoadFont(loadCounter, myFont, "fonts/ArchitectsDaughter-Regular.ttf");

    // bgMusic = loadSound("music/background.wav");
    bgMusic = gameLoadSound(loadCounter, bgMusic, "music/background.wav");
    // footStep = loadSound("music/footstep.wav");
    footStep = gameLoadSound(loadCounter, footStep, "music/footstep.wav");
    // glockReload = loadSound("music/glockReload.wav");
    glockReload = gameLoadSound(loadCounter, glockReload, "music/glockReload.wav");
    // glockShot = loadSound("music/glockShot.wav");
    glockShot = gameLoadSound(loadCounter, glockShot, "music/glockShot.wav");
    // M4A1Reload = loadSound("music/m4a1Reload.mp3");
    M4A1Reload = gameLoadSound(loadCounter, M4A1Reload, "music/m4a1Reload.mp3");
    // M4A1Shot = loadSound("music/m4a1Shot.wav");
    M4A1Shot = gameLoadSound(loadCounter, M4A1Shot, "music/m4a1Shot.wav");
    // RPGReload = loadSound("music/rpgReload.wav");
    RPGReload = gameLoadSound(loadCounter, RPGReload, "music/rpgReload.wav");
    // RPGShot = loadSound("music/rpgShot.wav");
    RPGShot = gameLoadSound(loadCounter, RPGShot, "music/rpgShot.wav");
    // hurtSound = loadSound("music/hurt.wav");
    hurtSound = gameLoadSound(loadCounter, hurtSound, "music/hurt.wav");
    // piecesSound = loadSound("music/pieces.wav");
    piecesSound = gameLoadSound(loadCounter, piecesSound, "music/pieces.wav");
    // boxSound = loadSound("music/box.wav");
    boxSound = gameLoadSound(loadCounter, boxSound, "music/box.wav");
    // buttonHover = loadSound("music/buttonHover.wav");
    buttonHover = gameLoadSound(loadCounter, buttonHover, "music/buttonHover.wav");
    // buttonClick = loadSound("music/buttonClick.wav");
    buttonClick = gameLoadSound(loadCounter, buttonClick, "music/buttonClick.wav");
    for(var i = 0; i < 4; i ++ ){
    //   var fileName = loadSound("music/zombie" + i + ".wav");
    //   zombiesSound.push(fileName);
        zombiesSound[i] = gameLoadSound(loadCounter, zombiesSound[i], "music/zombie" + i + ".wav");
    }

    // preset of the sound detection
    scareSound = new p5.SpeechRec();
    scareSound.continuous = true;
    scareSound.interimResults = true;
    scareSound.onResult = parseResult;
    scareSound.start();
    reset();

}

function draw(){
    if(!loaded){
      cursor(ARROW);
      background(253,247,226);
      push();
      translate(canvasWidth/2, canvasHeight/2);
      noStroke();
      var rectWidth = map(loadCounter, 0, maxFile, 0, canvasWidth/2);
      fill(255,247,225);
      rect(-canvasWidth/4,-15,canvasWidth/2,30);
      fill(52,19,18);
      rect(-canvasWidth/4,-15,rectWidth,30);
      pop();
    }else if(loaded){
      // before game starts
      if(!start && !over){
        cursor(ARROW);
        if(!settingMenuOpen){
          image(startImage,0,0,canvasWidth, canvasHeight);
          // start Button
          // hovered
          if(mouseX > canvasWidth * 0.45 && mouseX < canvasWidth * 0.45 + canvasWidth * 0.2 && mouseY > canvasHeight * 0.55 && mouseY < canvasHeight * 0.55 + canvasWidth * 0.2 * 0.35){
            image(startButton, canvasWidth * 0.45, canvasHeight * 0.55, canvasWidth * 0.2, canvasWidth * 0.2 * 0.35);
            if(!button1HoverPlayed){
              buttonHover.play();
              button1HoverPlayed = true;
            }
          }else{
            push();
            tint(255,240);
            image(startButton, canvasWidth * 0.45, canvasHeight * 0.55, canvasWidth * 0.2, canvasWidth * 0.2 * 0.35);
            pop();
            button1HoverPlayed = false;
          }
          // setting button
          if(mouseX > canvasWidth * 0.68 && mouseX < canvasWidth * 0.68 + canvasWidth * 0.2 && mouseY > canvasHeight * 0.55 && mouseY < canvasHeight * 0.55 + canvasWidth * 0.2 * 0.35){
            image(settingButton, canvasWidth * 0.68, canvasHeight * 0.55, canvasWidth * 0.2, canvasWidth * 0.2 * 0.35);
            if(!button2HoverPlayed){
              buttonHover.play();
              button2HoverPlayed = true;
            }
          }else{
            push();
            tint(255,240);
            image(settingButton, canvasWidth * 0.68, canvasHeight * 0.55, canvasWidth * 0.2, canvasWidth * 0.2 * 0.35);
            pop();
            button2HoverPlayed = false;
          }
        }
        // textFont(myFont,30);
        // fill(52,19,18);
        // text('Move Your Character\nUP-"W" Left-"A" Down-"S" Right-"D"', canvasWidth * 0.45, canvasHeight * 0.75);

        // setting interface
        if(settingMenuOpen){
          push();
          image(startImage,0,0,canvasWidth, canvasHeight);
          noStroke();
          fill(255,247,224,230);
          rect(0,0,canvasWidth, canvasHeight);
          pop();

          image(settingMenu, canvasWidth/2 - canvasWidth/4, canvasHeight/2 - canvasHeight * 0.44, canvasWidth/2, canvasHeight * 0.88);
          // back button
          if(mouseX > canvasWidth*0.18 && mouseX < canvasWidth*0.18 + canvasWidth * 0.06 && mouseY > canvasHeight/2 - canvasHeight * 0.4 && mouseY < canvasHeight/2 - canvasHeight * 0.4 + canvasWidth * 0.06){
            image(backButton, canvasWidth*0.18, canvasHeight/2 - canvasHeight * 0.4, canvasWidth * 0.06, canvasWidth * 0.06);
            if(!button3HoverPlayed){
              buttonHover.play();
              button3HoverPlayed = true;
            }
          }else{
            button3HoverPlayed = false;
            push();
            tint(255,240);
            image(backButton, canvasWidth*0.18, canvasHeight/2 - canvasHeight * 0.4, canvasWidth * 0.06, canvasWidth * 0.06);
            pop();
          }
          // easy button
          if(mouseX > canvasWidth/2 - canvasWidth * 0.16 /2 && mouseX < canvasWidth/2 - canvasWidth * 0.16 /2 + canvasWidth * 0.16 && mouseY > canvasHeight * 0.48 && mouseY < canvasHeight * 0.48 + canvasWidth * 0.2 * 0.3){
            image(easy, canvasWidth/2 - canvasWidth * 0.16 /2, canvasHeight * 0.48, canvasWidth * 0.16, canvasWidth * 0.2 * 0.3);
            if(!button4HoverPlayed){
              buttonHover.play();
              button4HoverPlayed = true;
            }
          }else{
            button4HoverPlayed = false;
            push();
            tint(255,220);
            image(easy, canvasWidth/2 - canvasWidth * 0.16 /2, canvasHeight * 0.48, canvasWidth * 0.16, canvasWidth * 0.2 * 0.3);
            pop();
          }
          // medium button
          if(mouseX > canvasWidth/2 - canvasWidth * 0.16 /2 && mouseX < canvasWidth/2 - canvasWidth * 0.16 /2 + canvasWidth * 0.16 && mouseY > canvasHeight * 0.48  + canvasWidth * 0.2 * 0.3&& mouseY < canvasHeight * 0.48 + canvasWidth * 0.2 * 0.3 + canvasWidth * 0.2 * 0.3){
            image(medium, canvasWidth/2 - canvasWidth * 0.16 /2, canvasHeight * 0.48 + canvasWidth * 0.2 * 0.3, canvasWidth * 0.16, canvasWidth * 0.2 * 0.3);
            if(!button5HoverPlayed){
              buttonHover.play();
              button5HoverPlayed = true;
            }
          }else{
            button5HoverPlayed = false;
            push();
            tint(255,220);
            image(medium, canvasWidth/2 - canvasWidth * 0.16 /2, canvasHeight * 0.48 + canvasWidth * 0.2 * 0.3, canvasWidth * 0.16, canvasWidth * 0.2 * 0.3);
            pop();
          }
          // hard button
          if(mouseX > canvasWidth/2 - canvasWidth * 0.16 /2 && mouseX < canvasWidth/2 - canvasWidth * 0.16 /2 + canvasWidth * 0.16 && mouseY > canvasHeight * 0.48  + canvasWidth * 0.2 * 0.3 * 2 && mouseY < canvasHeight * 0.48 + canvasWidth * 0.2 * 0.3 + canvasWidth * 0.2 * 0.3 * 2){
            image(hard, canvasWidth/2 - canvasWidth * 0.16 /2, canvasHeight * 0.48 + canvasWidth * 0.2 * 0.3 * 2, canvasWidth * 0.16, canvasWidth * 0.2 * 0.3);
            if(!button6HoverPlayed){
              buttonHover.play();
              button6HoverPlayed = true;
            }
          }else{
            button6HoverPlayed = false;
            push();
            tint(255,220);
            image(hard, canvasWidth/2 - canvasWidth * 0.16 /2, canvasHeight * 0.48 + canvasWidth * 0.2 * 0.3 * 2, canvasWidth * 0.16, canvasWidth * 0.2 * 0.3);
            pop();
          }
          textFont(myFont,32);
          fill(52,19,18);
          text("CURRENT LEVEL\n" + levelString, canvasWidth * 0.5, canvasHeight * 0.4);
          textAlign(CENTER);
        }
      }

      // game starts
      if(start && !over){
          noCursor();
          if(!bgPlayed){
            bgMusic.loop();
            bgPlayed = true;
          }
          background(233,168,109);
          //print(frameRate());

          updateDifficulty();

          // draw the map
          theWorld.displayWorld();
          offsetX = theWorld.offsetX;
          offsetY = theWorld.offsetY;

          // draw bullets
          push();
          translate(thePlayer.x, thePlayer.y);
          for(var i = 0; i < bullets.length; i ++ ){
            bullets[i].updatePosition();
            bullets[i].checkEdge();
            bullets[i].checkHit();
            bullets[i].display();
            if(!bullets[i].life){
              bullets.splice(1, i);
            }
          }
          pop();

          // draw the bloods
          if(bloods.length > 0){
            for(var i = 0; i < bloods.length; i ++ ){
              bloods[i].update();
              bloods[i].display();
              if(!bloods[i].life){
                bloods.splice(i,1);
              }
            }
          }

          // draw the pieces
          if(pieces.length > 0){
            for(var i = 0; i < pieces.length; i ++ ){
              pieces[i].update();
              pieces[i].checkLife();
              pieces[i].display();
              if(!pieces[i].life){
                pieces.splice(i,1);
              }
            }
          }

          //draw the shadows
          image(thePlayer.shadow, thePlayer.x, thePlayer.y, thePlayer.size, thePlayer.size);
          for(var i = 0; i < theZombie.length; i ++ ){
            image(theZombie[i].shadow, theZombie[i].x, theZombie[i].y, theZombie[i].size, theZombie[i].size);
          }

          // draw player
          thePlayer.checkWeapon();
          thePlayer.fire();
          thePlayer.move();
          thePlayer.checkLife();
          thePlayer.updateImage();
          thePlayer.display();

          // draw zoombies
          for(var i = 0; i < theZombie.length; i ++ ){
            theZombie[i].updatePosition();
            theZombie[i].checkOverlapping();
            //use voice to kill zombies
              if(mostRecentWord == "quit"){
                var p = random(0,1);
                if(p < scareSoundPower){
                  theZombie[i].life = false;
                  scareSoundPower = 0;
                }
              }
            theZombie[i].checkLife();
            theZombie[i].checkSpeed();
            theZombie[i].updateImage();
            theZombie[i].display();
            if(!theZombie[i].life){
              theZombie.splice(i,1);
            }
          }
          // add new zombie
          if(frameCount%100 == 0 && theZombie.length < maxZombie){
            var z = new Zombie();
            theZombie.push(z);
          }
          var index = floor(random(0,4));
          if(frameCount%100 == 0){
            zombiesSound[index].play();
          }

          // random lootbox
          if(frameCount%1000 == 0){
            boxExist = false;
            theWorld.tileMap[preBoxRow][preBoxCol] = 0;
            theWorld.tileMap[preBoxRow][preBoxCol + 1] = 0;
            theWorld.tileMap[preBoxRow + 1][preBoxCol] = 0;
            theWorld.tileMap[preBoxRow + 1][preBoxCol + 1] = 0;
            if(random(0,1) > 0.5){
              randomLootbox();
            }
          }

          // draw explosion of RPG
          for(var i = 0; i < explosions.length; i ++ ){
            explosions[i].update();
            explosions[i].checkLife();
            explosions[i].display();
            if(!explosions[i].life){
              explosions.splice(i,1);
            }
          }

          // draw the lootbox indicator
          updateBoxLocation();
          if(boxExist){
            push();
              var original = createVector(0, -10);
              var boxLo = boxLocation.copy().sub(canvasWidth/2,canvasHeight/2);
              var angle = original.angleBetween(boxLo);
              translate(canvasWidth/2, canvasHeight/2);
              if(boxLocation.x < canvasWidth/2){
                rotate(TWO_PI - angle);
              }else if(boxLocation.x > canvasWidth/2){
                rotate(angle);
              }
              image(arrow,0, -thePlayer.size * 0.8, arrow.width/4, arrow.height/4);
            pop();
          }

          // draw the bullet cool down bar
          var coolTime = map(thePlayer.timeCounter, thePlayer.coolTime, 0, 0, 100);
          var coolTimeFill = 20;
          noStroke();
          fill(coolTimeFill);
          rect(50,120,coolTime,10);

          // display the score
          textFont(myFont,18);
          fill(20);
          var length0 = textWidth("Score") + 10;
          text("Score",50,40);
          text(score, 50 + length0, 40);
          // display bullet number
          textFont(myFont,20);
          fill(20);
          var length1 = textWidth("Glock18") + 10;
          var length2 = textWidth("M4A1") + 10;
          var length3 = textWidth("RPG") + 10;
          text("Glock18",50,60);
          text(thePlayer.oneNumber,50 + length1,60);
          text("M4A1",50,80);
          text(thePlayer.twoNumber,50 + length1,80);
          text("RPG",50,100);
          text(thePlayer.threeNumber,50 + length1,100);

          // draw the health bar of the Player
          var health = map(thePlayer.health, 0, 100, 0, 100);
          var healthFillR = map(health, 0, 100, 250, 0);
          var healthFillG = map(health, 0, 100, 0, 150);
          fill(20);
          rect(50,140,100,10);
          fill(healthFillR, healthFillG, 0);
          rect(50,140,health,10);
      }

      // game ends
      if(!start && over){
        cursor(ARROW);
        image(endImage,0,0,canvasWidth, canvasHeight);
        // show final score
        textFont(myFont,40);
        fill(52,19,18);
        text("Your Final Score is: " + score, canvasWidth * 0.54, canvasHeight * 0.5);
        // text(score, canvasWidth * 0.54, canvasHeight * 0.55);
        if(mouseX > canvasWidth * 0.54 && mouseX < canvasWidth * 0.63 + canvasWidth * 0.2 && mouseY > canvasHeight * 0.58 && mouseY < canvasHeight * 0.58 + canvasWidth * 0.2 * 0.35){

          image(endButton, canvasWidth * 0.54, canvasHeight * 0.58, canvasWidth * 0.2, canvasWidth * 0.2 * 0.35);

          if(!buttonHoverPlayed){
            buttonHover.play();
            buttonHoverPlayed = true;
          }
        }else{
          push();
          tint(255,240);
          image(endButton, canvasWidth * 0.54, canvasHeight * 0.58, canvasWidth * 0.2, canvasWidth * 0.2 * 0.35);
          pop();
          buttonHoverPlayed = false;
        }
      }
    }
}

function getTileMapList(){
  // set up basic background
  for(var i = 0; i < 60; i ++ ){
    var emptyArray = [];
    tileMapList.push(emptyArray);
    for(var j = 0; j < 60; j ++ ){
      tileMapList[i].push(0);
    }
  }
  // set up margin
  for(var i = 0; i < tileMapList[0].length; i += 2){
    var offset = random(bigTreesOffset);
    tileMapList[0][i] = offset;
    tileMapList[0][i+1] = offset+1;
    tileMapList[1][i] = offset+6;
    tileMapList[1][i+1] = offset+7;
    var offset2 = random(bigTreesOffset);
    tileMapList[tileMapList.length - 2][i] = offset2;
    tileMapList[tileMapList.length - 2][i+1] = offset2+1;
    tileMapList[tileMapList.length - 1][i] = offset2+6;
    tileMapList[tileMapList.length - 1][i+1] = offset2+7;
  }

  for(var i = 2; i < tileMapList.length - 2; i += 2){
    var offset = random(bigTreesOffset);
    tileMapList[i][0] = offset;
    tileMapList[i][1] = offset+1;
    tileMapList[i+1][0] = offset+6;
    tileMapList[i+1][1] = offset+7;
    var offset2 = random(bigTreesOffset);
    tileMapList[i][tileMapList[i].length - 2] = offset2;
    tileMapList[i][tileMapList[i].length - 1] = offset2+1;
    tileMapList[i+1][tileMapList[i].length - 2] = offset2+6;
    tileMapList[i+1][tileMapList[i].length - 1] = offset2+7;
  }

  // set up tiny bush
  for(var i = 3; i < tileMapList.length-3; i ++ ){
    var indexNumber = int(random(0,6));
    var indexes = new Array(indexNumber);
    for(var j = 0; j < indexes.length - 1; j ++ ){
      var k = int(random(3,tileMapList[i].length - 4));
      if(random(0,100)<50){
        tileMapList[i-1][k] = random(tinyTrees);
        tileMapList[i-1][k + 1] = random(tinyTrees);
      }
      tileMapList[i][k] = random(tinyTrees);
      tileMapList[i][k + 1] = random(tinyTrees);
      tileMapList[i][k + 2] = random(tinyTrees);
      if(random(0,100)>50){
        tileMapList[i+1][k] = random(tinyTrees);
        tileMapList[i+1][k - 1] = random(tinyTrees);
      }
    }
  }

  //set up tiny tinyStones
  for(var i = 3; i < tileMapList.length-3; i ++ ){
    var indexNumber = int(random(0,4));
    var indexes = new Array(indexNumber);
    for(var j = 0; j < indexes.length - 1; j ++ ){
      var k = floor(random(2,tileMapList[i].length - 4));
      tileMapList[i][k] = random(tinyStones);
      tileMapList[i+1][k+1] = random(tinyStones);
    }
  }

  //set up the lake
  var indexNumber1 = int(random(4,10));
  var indexNumber2 = int(random(15,18));
  var indexNumber3 = int(random(tileMapList.length - 14,tileMapList.length - 8));
  var indexes = [indexNumber1,indexNumber2,indexNumber3];

  for(var i = 0; i < indexes.length; i ++ ){
    var j = int(random(4,tileMapList.length-8));
    var k = indexes[i];
    tileMapList[j][k] = random(lakeOffset);
    // lake 1
    if(tileMapList[j][k] == 47){
      for(var l = 0; l < 4; l ++ ){
          tileMapList[j + l][k] = 47 + 4*l;
          tileMapList[j + l][k + 1] = 48 + 4*l;
          tileMapList[j + l][k + 2] = 49 + 4*l;
          tileMapList[j + l][k + 3] = 50 + 4*l;
      }
    }
    // lake 2
    else if(tileMapList[j][k] == 63){
      for(var l = 0; l < 7; l ++ ){
        if(l < 3){
          tileMapList[j+ l][k] = 63 + 2*l;
          tileMapList[j + l][k + 1] = 64 + 2*l;
        }else if(l >= 3){
          tileMapList[j + l][k - 1] = 69 + 3*(l-3);
          tileMapList[j + l][k] = 70 + 3*(l-3);
          tileMapList[j + l][k + 1] = 71 + 3*(l-3);
        }
      }
    }
    // lake 3
    else if(tileMapList[j][k] == 81){
      for(var l = 0; l < 2; l ++ ){
        tileMapList[j + l][k] = 81 + 3*l;
        tileMapList[j + l][k + 1] = 82 + 3*l;
        tileMapList[j + l][k + 2] = 83 + 3*l;
      }
    }
  }

  //set up big bushes
  for(var i = 2; i < tileMapList.length-4; i += 2 ){
    var indexNumber = int(random(0,4));
    var indexes = new Array(indexNumber);
    for(var j = 0; j < indexes.length - 1; j ++ ){
      var k = int(random(2,tileMapList[i].length - 4));
      // check if overlap with the lake
      while(tileMapList[i][k] >= 47 || tileMapList[i+1][k+1] >= 47){
        var k = int(random(2,tileMapList[i].length - 4));
      }
      // check if overlap other big bushes
      while((tileMapList[i][k] >= 7 && tileMapList[i][k] <= 32) || (tileMapList[i][k] >= 37 && tileMapList[i][k] <= 38)){
        var k = int(random(2,tileMapList[i].length - 4));
      }
      while((tileMapList[i + 1][k + 1] >= 7 && tileMapList[i + 1][k + 1] <= 32) || (tileMapList[i + 1][k + 1] >= 37 && tileMapList[i + 1][k + 1] <= 38)){
        var k = int(random(2,tileMapList[i].length - 4));
      }

      tileMapList[i][k] = random(bigTreesOffset);
      tileMapList[i][k + 1] = tileMapList[i][k] + 1;
      tileMapList[i+1][k] = tileMapList[i][k] + 6;
      tileMapList[i+1][k+1] = tileMapList[i][k] + 7;
    }
  }
}

class Bullets{
  constructor(mode, x, y, direction, speed){
    // store the weapon mode
    this.mode = mode;

    // store the position of the bullet
    // and the offset position of the bullet
    this.position = createVector(x, y);

    // store the moving speed of the bullets
    this.speed = speed;

    // store the direction when the bullet is fired
    this.direction = direction;

    // to check if the bullet should still be displayed
    this.life = true;
  }

  display(){
    if(this.life){
      if(this.mode == 1){
        noStroke();
        fill(50);
        ellipse(this.position.x, this.position.y, 3, 3);
      }
      else if(this.mode == 2){
        noStroke();
        fill(50);
        ellipse(this.position.x, this.position.y, 2, 2);
      }
      else if(this.mode == 3){
        noStroke();
        fill(50);
        ellipse(this.position.x, this.position.y, 5, 5);
      }
    }
  }

  updatePosition(){
    if(this.direction == "up"){
      this.position.y -= this.speed;
    }
    else if(this.direction == "down"){
      this.position.y += this.speed;
    }
    else if(this.direction == "left"){
      this.position.x -= this.speed;
    }
    else if(this.direction == "right"){
      this.position.x += this.speed;
    }
  }

  checkEdge(){
    if(this.position.x < -1500 || this.position.x > canvasWidth + 1500){
      this.life = false;
    }
    if(this.position.y < -1500 || this.position.y > canvasHeight + 1500){
      this.life = false;
    }
  }

  checkHit(){
    if(this.life){
      for(var i = 0; i < theZombie.length; i ++ ){
        var disX = this.position.x + thePlayer.x - theZombie[i].x;
        var disY = this.position.y + thePlayer.y - theZombie[i].y;
        if(disX >= 0 && disX <= theZombie[i].size && disY >= 0 && disY <= theZombie[i].size){
          //print("Zombie got hit!");
          if(!theZombie[i].attacked){
            theZombie[i].attacked = true;
            theZombie[i].speed = theZombie[i].speed * 0.4;
            if(this.mode == 1){
              theZombie[i].health -= 50;
            }
            else if(this.mode == 2){
              theZombie[i].health -= 20;
            }
            else if(this.mode == 3){
              theZombie[i].health -= 250;
              var e = new Explosion(this.position.x + thePlayer.x, this.position.y + thePlayer.y);
              explosions.push(e);
              // damage range
              for(var j = 0; j < theZombie.length; j ++ ){
                if(!(i == j)){
                  var dis = dist(theZombie[i].x, theZombie[i].y, theZombie[j].x, theZombie[j].y);
                  if(dis <= theZombie[i].size * 3){
                    theZombie[j].health -= 200;
                  }
                }
              }
            }
          }
          this.life = false;
        }
      }
    }
  }

}

class Pieces{
  constructor(x, y, index){
        this.p = createVector(x, y);
        this.v = createVector(random(-3, 3), random(-3, 3));
        this.size = theWorld.tileSize * 2;
        this.r = int(random(25, this.size/2.5));
        this.lifeTime = 30;
        this.life = true;
        this.image = piecesImage[index];
        this.opacity = 255;
    }

    update(){
        this.p.add(this.v);
        this.opacity -= 5;
        if(this.opacity <= 0){
          this.opacity = 0;
        }
    }

    checkLife(){
      this.lifeTime -= 1;
      if(this.lifeTime <= 0){
        this.life = false;
      }
      //print(this.lifeTime);
    }

    display(){
      if(this.life){
        push();
        tint(255, this.opacity);
        image(this.image, this.p.x + this.size/2, this.p.y + this.size/2, this.r, this.r);
        pop();
      }
    }

    moveUp(val){
      this.p.y -= val;
    }
    moveDown(val){
      this.p.y += val;
    }
    moveLeft(val){
      this.p.x -= val;
    }
    moveRight(val){
      this.p.x += val;
    }
}

class Blood{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.opacity = 255;
    this.blood = [];
    this.blood[0] = loadImage('tiles/tiles-130.png');
    this.blood[1] = loadImage('tiles/tiles-131.png');
    this.currentImage = random(this.blood);
    this.size = theWorld.tileSize * 2;
    this.life = true;
  }

  display(){
    if(this.life){
      push();
        tint(255, this.opacity);
        image(this.currentImage, this.x, this.y, this.size, this.size);
      pop();
    }
  }

  update(){
    this.opacity -= 0.5;
    if(this.opacity <= 0){
      this.life = false;
    }
  }

  moveBloodUp(val){
    this.y -= val;
  }
  moveBloodDown(val){
    this.y += val;
  }
  moveBloodLeft(val){
    this.x -= val;
  }
  moveBloodRight(val){
    this.x += val;
  }

}

class Explosion{
  constructor(x, y){
        this.p = createVector(x, y);
        this.size = theWorld.tileSize * 8;
        this.r = 0;
        this.life = true;
        this.opacity = 255;
    }

    update(){
        this.r += 0.2 * (this.size - this.r);
        this.opacity = map((this.size - this.r), this.size, 0, 255, 0);
    }

    checkLife(){
      if(this.r >= this.size * 0.9){
        this.life = false;
      }
    }

    display(){
      if(this.life){
        push();
          fill(250,180,70,this.opacity);
          ellipse(this.p.x, this.p.y, this.r, this.r);
        pop();
      }
    }

    moveUp(val){
      this.p.y -= val;
    }
    moveDown(val){
      this.p.y += val;
    }
    moveLeft(val){
      this.p.x -= val;
    }
    moveRight(val){
      this.p.x += val;
    }
}

function parseResult(){
  console.log(scareSound.resultString);
  wordArray = scareSound.resultString.split(' ');
  mostRecentWord = wordArray[wordArray.length - 1];
  for(var i = 0; i < theZombie.length; i ++ ){
    // use voice to kill zombies
      if(mostRecentWord == "quit"){
        theZombie[i].life = false;
      }
  }
}

function updateDifficulty(){
  if(score > 50 & (score - preScore) > 10){
    maxZombie += 1;
    if(maxZombie >= difficulty){
      maxZombie = difficulty;
    }
    preScore = score;
    print(maxZombie);
  }
}

// move the bullets with the world
function bulletMoveRight(val) {
  // visit every bullet that is currently in existance and tell them to move to the right
  for(var i = 0; i < bullets.length; i ++ ){
    bullets[i].position.x += val;
  }
}
function bulletMoveLeft(val) {
  // visit every bullet that is currently in existance and tell them to move to the left
  for(var i = 0; i < bullets.length; i ++ ){
    bullets[i].position.x -= val;
  }
}
function bulletMoveUp(val) {
  // visit every bullet that is currently in existance and tell them to move up
  for(var i = 0; i < bullets.length; i ++ ){
    bullets[i].position.y -= val;
  }
}
function bulletMoveDown(val) {
  // visit every bullet that is currently in existance and tell them to move down
  for(var i = 0; i < bullets.length; i ++ ){
    bullets[i].position.y += val;
  }
}

function randomLootbox(){
  boxRow = int(random(3,theWorld.tileMap.length - 3));
  boxCol = int(random(3,theWorld.tileMap[1].length - 3));
  preBoxRow = boxRow;
  preBoxCol = boxCol;
  if(theWorld.tileMap[boxRow][boxCol] == 0 && theWorld.tileMap[boxRow][boxCol + 1] == 0 && theWorld.tileMap[boxRow + 1][boxCol] == 0 && theWorld.tileMap[boxRow + 1][boxCol + 1] == 0){
    boxExist = true;
    theWorld.tileMap[boxRow][boxCol] = 96;
    theWorld.tileMap[boxRow][boxCol + 1] = 97;
    theWorld.tileMap[boxRow + 1][boxCol] = 98;
    theWorld.tileMap[boxRow + 1][boxCol + 1] = 99;
    updateBoxLocation();
  }else{
    randomLootbox();
  }
}

function updateBoxLocation(){
  boxLocation.x = boxCol * theWorld.tileSize + offsetX + theWorld.tileSize;
  boxLocation.y = boxRow * theWorld.tileSize + offsetY + theWorld.tileSize;
}

function mousePressed(){
  if(!start && !over){
    if(!settingMenuOpen){
      // start button
      if(mouseX > canvasWidth * 0.45 && mouseX < canvasWidth * 0.45 + canvasWidth * 0.2 && mouseY > canvasHeight * 0.55 && mouseY < canvasHeight * 0.55 + canvasWidth * 0.2 * 0.35){
        image(startButton, canvasWidth * 0.45, canvasHeight * 0.55, canvasWidth * 0.2, canvasWidth * 0.2 * 0.35);
        buttonClick.play();
        start = true;
      }
      // setting button
      if(mouseX > canvasWidth * 0.68 && mouseX < canvasWidth * 0.68 + canvasWidth * 0.2 && mouseY > canvasHeight * 0.55 && mouseY < canvasHeight * 0.55 + canvasWidth * 0.2 * 0.35){
        image(settingButton, canvasWidth * 0.68, canvasHeight * 0.55, canvasWidth * 0.2, canvasWidth * 0.2 * 0.35);
        buttonClick.play();
        settingMenuOpen = true;
      }
    }

    if(settingMenuOpen){
      // back button
      if(mouseX > canvasWidth*0.18 && mouseX < canvasWidth*0.18 + canvasWidth * 0.06 && mouseY > canvasHeight/2 - canvasHeight * 0.4 && mouseY < canvasHeight/2 - canvasHeight * 0.4 + canvasWidth * 0.06){
        settingMenuOpen = false;
        buttonClick.play();
      }
      // easy button
      if(mouseX > canvasWidth/2 - canvasWidth * 0.16 /2 && mouseX < canvasWidth/2 - canvasWidth * 0.16 /2 + canvasWidth * 0.16 && mouseY > canvasHeight * 0.48 && mouseY < canvasHeight * 0.48 + canvasWidth * 0.2 * 0.3){
        difficulty = 15;
        levelString = "EASY";
        buttonClick.play();
        image(easy, canvasWidth/2 - canvasWidth * 0.16 /2, canvasHeight * 0.48, canvasWidth * 0.16, canvasWidth * 0.2 * 0.3);
      }
      // medium button
      if(mouseX > canvasWidth/2 - canvasWidth * 0.16 /2 && mouseX < canvasWidth/2 - canvasWidth * 0.16 /2 + canvasWidth * 0.16 && mouseY > canvasHeight * 0.48  + canvasWidth * 0.2 * 0.3&& mouseY < canvasHeight * 0.48 + canvasWidth * 0.2 * 0.3 + canvasWidth * 0.2 * 0.3){
        difficulty = 23;
        levelString = "MEDIUM";
        buttonClick.play();
        image(medium, canvasWidth/2 - canvasWidth * 0.16 /2, canvasHeight * 0.48 + canvasWidth * 0.2 * 0.3, canvasWidth * 0.16, canvasWidth * 0.2 * 0.3);
      }
      // hard button
      if(mouseX > canvasWidth/2 - canvasWidth * 0.16 /2 && mouseX < canvasWidth/2 - canvasWidth * 0.16 /2 + canvasWidth * 0.16 && mouseY > canvasHeight * 0.48  + canvasWidth * 0.2 * 0.3 * 2 && mouseY < canvasHeight * 0.48 + canvasWidth * 0.2 * 0.3 + canvasWidth * 0.2 * 0.3 * 2){
        difficulty = 30;
        levelString = "HARD";
        buttonClick.play();
        image(hard, canvasWidth/2 - canvasWidth * 0.16 /2, canvasHeight * 0.48 + canvasWidth * 0.2 * 0.3 * 2, canvasWidth * 0.16, canvasWidth * 0.2 * 0.3);
      }
    }

  }

  if(!start && over){
    if(mouseX > canvasWidth * 0.54 && mouseX < canvasWidth * 0.54 + canvasWidth * 0.2 && mouseY > canvasHeight * 0.575 && mouseY < canvasHeight * 0.575 + canvasWidth * 0.2 * 0.35){
      image(endButton, canvasWidth * 0.54, canvasHeight * 0.58, canvasWidth * 0.2, canvasWidth * 0.2 * 0.35);
      buttonClick.play();
      over = false;
      clearAll();
      reset();
    }
  }
}

function clearAll(){
  if(bullets.length > 0){
    bullets.splice(0, bullets.length);
  }
  if(pieces.length > 0){
    pieces.splice(0, pieces.length);
  }
  if(explosions.length > 0){
    explosions.splice(0, explosions.length);
  }
  if(bloods.length > 0){
    bloods.splice(0, bloods.length);
  }
  if(theZombie.length > 0){
    theZombie.splice(0, theZombie.length);
  }
  tileMapList.splice(0, tileMapList.length);
  print(bullets.length, pieces.length, explosions.length, bloods.length, tileMapList.length);
}

function reset(){
  print("reset!");
  buttonHoverPlayed = false;
  buttonClickPlayed = false;

  getTileMapList();
  theWorld = new OverheadWorld(worldParameters);
  thePlayer = new Player(canvasWidth/2 - 25, canvasHeight/2 - 25, theWorld);
  offsetX = 0;
  offsetY = 0;
  // preset of score
  score = 0;
  preScore = 0;
  maxZombie = 6;
  difficulty = 1;
  scareSoundPower = 1;

  boxExist = false;
  boxLocation = createVector(0,0);

  for(var i = 0; i < 3; i ++ ){
    var zombie = new Zombie();
    theZombie.push(zombie);
  }

  randomLootbox();
  boxExist = false;
  theWorld.tileMap[boxRow][boxCol] = 0;
  theWorld.tileMap[boxRow][boxCol + 1] = 0;
  theWorld.tileMap[boxRow + 1][boxCol] = 0;
  theWorld.tileMap[boxRow + 1][boxCol + 1] = 0;

  bgMusic.stop();

}
