function Player(x, y, world) {
  // store the player position
  this.x = x;
  this.y = y;

  // store a reference to our "world" object - we will ask the world to tell us about
  // tiles that are in our path
  this.world = world;

  // store the weapon that the player is holding
  // 1 for handgun, 2 for raffle, 3 for RPG
  this.weaponMode = 1;
  this.weapon1Changed = true;
  this.weapon2Changed = false;
  this.weapon3Changed = false;
  this.sound1Played = false;
  this.sound2Played = false;
  this.sound3Played = false;
  this.currentShotSound = glockShot;

  // define bulletSpeed
  this.bulletSpeed = 4;
  this.oneNumber = 100;
  this.twoNumber = 100;
  this.threeNumber = 10;

  // store the player direction
  this.direction = "up";

  // load & store our artwork
  // defaut weapon mode is handgun
  this.artworkLeft = loadImage('tiles/tiles-54-left.png');
  this.artworkRight = loadImage('tiles/tiles-54-right.png');
  this.artworkUp = loadImage('tiles/tiles-54-up.png');
  this.artworkDown = loadImage('tiles/tiles-54-down.png');
  this.shadow = loadImage('tiles/tiles-87.png');

  this.oneLeft = loadImage('tiles/tiles-54-left.png');
  this.oneRight = loadImage('tiles/tiles-54-right.png');
  this.oneUp = loadImage('tiles/tiles-54-up.png');
  this.oneDown = loadImage('tiles/tiles-54-down.png');
  this.twoLeft = loadImage('tiles/tiles-52-left.png');
  this.twoRight = loadImage('tiles/tiles-52-right.png');
  this.twoUp = loadImage('tiles/tiles-52-up.png');
  this.twoDown = loadImage('tiles/tiles-52-down.png');
  this.threeLeft = loadImage('tiles/tiles-53-left.png');
  this.threeRight = loadImage('tiles/tiles-53-right.png');
  this.threeUp = loadImage('tiles/tiles-53-up.png');
  this.threeDown = loadImage('tiles/tiles-53-down.png');

  // assume we are pointing to the up
  this.currentImage = this.artworkUp;

  // define our speed
  this.speed = 3;

  // define player size
  this.size = this.world.tileSize * 2;

  // store the cool down time of the weapon
  this.timeCounter = 15;
  this.coolTime = 15;

  // store the state of being attacked
  this.attacked = false;

  // store the health of the Player
  this.health = 100;

  // display our player
  this.display = function() {
    imageMode(CORNER);

    push();
    // draw the tint to the player when it's attacked
    if(this.attacked){
      tint(255,200);
      this.attacked = false;
    }
    // always draw the player in the center of the screen
    image(this.currentImage, this.x, this.y, this.size, this.size);
    pop();


    push();
      if(this.health <= 40){
        var o = map(this.health, 0, 40, 200, 100);
        tint(110,10,10,o);
        image(this.currentImage, this.x, this.y, this.size, this.size);
      }
    pop();
  }

  // display "sensor" positions
  this.displaySensor = function(direction) {
    fill(255);
    if (direction == "up") {
      //ellipse(this.top[0], this.top[1], 20, 20);
    } else if (direction == "down") {
      //ellipse(this.bottom[0], this.bottom[1], 20, 20);
    } else if (direction == "right") {
      //ellipse(this.right[0], this.right[1], 20, 20);
    } else if (direction == "left") {
      //ellipse(this.left[0], this.left[1], 20, 20);
    }
  }

  // set our sensor positions (computed based on the position of the character and the
  // size of our graphic)
  this.refreshSensors = function() {
    this.left = [this.x, this.y + this.size/2];
    this.right = [this.x + this.size, this.y + this.size / 2];
    this.top = [this.x + this.size / 2, this.y];
    this.bottom = [this.x + this.size / 2, this.y + this.size];
  }

  // check which weapon mode the player is on
  this.checkWeapon = function() {
    // check if the weapon mode is switched
    if(keyIsDown(49)){
      this.weapon1Changed = true;
      this.weapon2Changed = false;
      this.weapon3Changed = false;
      this.sound2Played = false;
      this.sound3Played = false;
      this.weaponMode = 1;
      this.bulletSpeed = 4;
      this.coolTime = 15;
      this.currentShotSound = glockShot;
    }else if(keyIsDown(50)){
      this.weapon1Changed = false;
      this.weapon2Changed = true;
      this.weapon3Changed = false;
      this.sound1Played = false;
      this.sound3Played = false;
      this.weaponMode = 2;
      this.bulletSpeed = 5;
      this.coolTime = 4;
      this.currentShotSound = M4A1Shot;
    }else if(keyIsDown(51)){
      this.weapon1Changed = false;
      this.weapon2Changed = false;
      this.weapon3Changed = true;
      this.sound1Played = false;
      this.sound2Played = false;
      this.weaponMode = 3;
      this.bulletSpeed = 6;
      this.coolTime = 40;
      this.currentShotSound = RPGShot;
    }
    if(this.weapon1Changed){
      if(!this.sound1Played){
        glockReload.play();
        this.sound1Played = true;
      }
    }else if(this.weapon2Changed){
      if(!this.sound2Played){
        M4A1Reload.play();
        this.sound2Played = true;
      }
    }else if(this.weapon3Changed){
      if(!this.sound3Played){
        RPGReload.play();
        this.sound3Played = true;
      }
    }
    // change artwork
    if(this.weaponMode == 1){
      this.artworkLeft = this.oneLeft;
      this.artworkRight = this.oneRight;
      this.artworkUp = this.oneUp;
      this.artworkDown = this.oneDown;
    }
    else if(this.weaponMode == 2){
      this.artworkLeft = this.twoLeft;
      this.artworkRight = this.twoRight;
      this.artworkUp = this.twoUp;
      this.artworkDown = this.twoDown;
    }
    else if(this.weaponMode == 3){
      this.artworkLeft = this.threeLeft;
      this.artworkRight = this.threeRight;
      this.artworkUp = this.threeUp;
      this.artworkDown = this.threeDown;
    }

  }

  // check the number of bullets player have
  this.checkBullet = function(){
    if(this.weaponMode == 1){
      if(this.oneNumber > 0){
        this.oneNumber --;
        return true;
      }else if(this.oneNumber <= 0){
        this.oneNumber = 0;
        return false;
      }
    }
    else if(this.weaponMode == 2){
      if(this.twoNumber > 0){
        this.twoNumber --;
        return true;
      }else if(this.twoNumber <= 0){
        this.twoNumber = 0;
        return false;
      }
    }
    else if(this.weaponMode == 3){
      if(this.threeNumber > 0){
        this.threeNumber --;
        return true;
      }else if(this.threeNumber <= 0){
        this.threeNumber = 0;
        return false;
      }
    }
  }

  // fire a bullet
  this.fire = function() {
    this.timeCounter -- ;
    if(keyIsDown(74)){
        if(this.timeCounter <= 0){
          var ifFire = this.checkBullet();
          if(ifFire){
            this.currentShotSound.play();
            //All bullets now are placed at 0,0 (assuming they are spawing right on top of the player)
            if(this.direction == "up"){
              var bullet = new Bullets(this.weaponMode, this.size*0.9, 0, this.direction, this.bulletSpeed);
              bullets.push(bullet);
            }else if(this.direction == "down"){
              var bullet = new Bullets(this.weaponMode, this.size*0.1, this.size, this.direction, this.bulletSpeed);
              bullets.push(bullet);
            }else if(this.direction == "right"){
              var bullet = new Bullets(this.weaponMode, this.size, this.size*0.9, this.direction, this.bulletSpeed);
              bullets.push(bullet);
            }else if(this.direction == "left"){
              var bullet = new Bullets(this.weaponMode, 0, this.size*0.1, this.direction, this.bulletSpeed);
              bullets.push(bullet);
            }
          }
          this.timeCounter = this.coolTime;
        }
    }
    if(this.timeCounter < 0){
      this.timeCounter = 0;
    }
  }

  this.updateImage = function(){
    //refresh artwork on screen according to the direction
    if(this.direction == "up"){
      this.currentImage = this.artworkUp;
      this.displaySensor(this.direction);
    }else if(this.direction == "down"){
      this.currentImage = this.artworkDown;
      this.displaySensor(this.direction);
    }else if(this.direction == "right"){
      this.currentImage = this.artworkRight;
      this.displaySensor(this.direction);
    }else if(this.direction == "left"){
      this.currentImage = this.artworkLeft;
      this.displaySensor(this.direction);
    }
  }

  // move our character
  this.move = function() {
    // refresh our "sensors" - these will be used for movement & collision detection
    this.refreshSensors();

    // move the character with WASD
    // The four directional arrows
    if (keyIsDown(LEFT_ARROW) || keyIsDown(97) || keyIsDown(65)) {
      // change direction mode
      this.direction = "left";

      // see which tile is to our left
      var tile = world.getTile(this.left[0], this.left[1]);

      // is this tile solid?
      if (!world.isTileSolid(tile)) {
        // request that the WORLD move to the right
        if(tile == 0 || tile == 96 || tile == 97 || tile == 98 || tile == 99){
          this.world.moveRight(this.speed);
          bulletMoveRight(this.speed);
          for(var i = 0; i < bloods.length; i ++ ){
            bloods[i].moveBloodRight(this.speed);
          }
          for(var i = 0; i < pieces.length; i ++ ){
            pieces[i].moveRight(this.speed);
          }
          for(var i = 0; i < theZombie.length; i ++ ){
            theZombie[i].x += this.speed;
          }
          if(!(tile == 0)){
            this.lootBoxReward();
          }
        }else if(tile == 1 || tile == 2 || tile == 3 || tile == 4 || tile == 5 || tile == 6){
          this.world.moveRight(this.speed/2);
          bulletMoveRight(this.speed/2);
          for(var i = 0; i < bloods.length; i ++ ){
            bloods[i].moveBloodRight(this.speed/2);
          }
          for(var i = 0; i < theZombie.length; i ++ ){
            theZombie[i].x += this.speed/2;
          }
          for(var i = 0; i < pieces.length; i ++ ){
            pieces[i].moveRight(this.speed/2);
          }
        }
      }

    }
    else if (keyIsDown(RIGHT_ARROW) || keyIsDown(100) || keyIsDown(68)) {
      // change direction mode
      this.direction = "right";

      // see which tile is to our right
      var tile = world.getTile(this.right[0], this.right[1]);

      // is this tile solid?
      if (!world.isTileSolid(tile)) {
        // request that the WORLD move to the left
        if(tile == 0 || tile == 96 || tile == 97 || tile == 98 || tile == 99){
          this.world.moveLeft(this.speed);
          bulletMoveLeft(this.speed);
          for(var i = 0; i < bloods.length; i ++ ){
            bloods[i].moveBloodLeft(this.speed);
          }
          for(var i = 0; i < pieces.length; i ++ ){
            pieces[i].moveLeft(this.speed);
          }
          for(var i = 0; i < theZombie.length; i ++ ){
            theZombie[i].x -= this.speed;
          }
          if(!(tile == 0)){
            this.lootBoxReward();
          }
        }else if(tile == 1 || tile == 2 || tile == 3 || tile == 4 || tile == 5 || tile == 6){
          this.world.moveLeft(this.speed/2);
          bulletMoveLeft(this.speed/2);
          for(var i = 0; i < bloods.length; i ++ ){
            bloods[i].moveBloodLeft(this.speed/2);
          }
          for(var i = 0; i < pieces.length; i ++ ){
            pieces[i].moveLeft(this.speed/2);
          }
          for(var i = 0; i < theZombie.length; i ++ ){
            theZombie[i].x -= this.speed/2;
          }
        }
      }

    }
    else if (keyIsDown(DOWN_ARROW) || keyIsDown(115) || keyIsDown(83)) {
      // change direction mode
      this.direction = "down";

      // see which tile is below us
      var tile = world.getTile(this.bottom[0], this.bottom[1]);

      // is this tile solid?
      if (!world.isTileSolid(tile)) {
        // request that the WORLD move up
        if(tile == 0 || tile == 96 || tile == 97 || tile == 98 || tile == 99){
          this.world.moveUp(this.speed);
          bulletMoveUp(this.speed);
          for(var i = 0; i < bloods.length; i ++ ){
            bloods[i].moveBloodUp(this.speed);
          }
          for(var i = 0; i < pieces.length; i ++ ){
            pieces[i].moveUp(this.speed);
          }
          for(var i = 0; i < theZombie.length; i ++ ){
            theZombie[i].y -= this.speed;
          }
          if(!(tile == 0)){
            this.lootBoxReward();
          }
        }else if(tile == 1 || tile == 2 || tile == 3 || tile == 4 || tile == 5 || tile == 6){
          this.world.moveUp(this.speed/2);
          bulletMoveUp(this.speed/2);
          for(var i = 0; i < bloods.length; i ++ ){
            bloods[i].moveBloodUp(this.speed/2);
          }
          for(var i = 0; i < pieces.length; i ++ ){
            pieces[i].moveUp(this.speed/2);
          }
          for(var i = 0; i < theZombie.length; i ++ ){
            theZombie[i].y -= this.speed/2;
          }
        }
      }

    }
    else if (keyIsDown(UP_ARROW) || keyIsDown(119) || keyIsDown(87)) {
      // change direction mode
      this.direction = "up";

      // see which tile is below us
      var tile = world.getTile(this.top[0], this.top[1]);

      // is this tile solid?
      if (!world.isTileSolid(tile)) {
        // request that the WORLD move down
        if(tile == 0 || tile == 96 || tile == 97 || tile == 98 || tile == 99){
          this.world.moveDown(this.speed);
          bulletMoveDown(this.speed);
          for(var i = 0; i < bloods.length; i ++ ){
            bloods[i].moveBloodDown(this.speed);
          }
          for(var i = 0; i < pieces.length; i ++ ){
            pieces[i].moveDown(this.speed);
          }
          for(var i = 0; i < theZombie.length; i ++ ){
            theZombie[i].y += this.speed;
          }
          if(!(tile == 0)){
            this.lootBoxReward();
          }
        }else if(tile == 1 || tile == 2 || tile == 3 || tile == 4 || tile == 5 || tile == 6){
          this.world.moveDown(this.speed/2);
          bulletMoveDown(this.speed/2);
          for(var i = 0; i < bloods.length; i ++ ){
            bloods[i].moveBloodDown(this.speed/2);
          }
          for(var i = 0; i < pieces.length; i ++ ){
            pieces[i].moveDown(this.speed/2);
          }
          for(var i = 0; i < theZombie.length; i ++ ){
            theZombie[i].y += this.speed/2;
          }
        }
      }
    }
  }

  this.lootBoxReward = function(){
    boxExist = false;
    boxSound.play();
    var possibility = random(0,100);
    if(possibility < 40){
      this.oneNumber += int(random(18,25)) * 10;
    }else if(possibility > 40 && possibility < 65){
      this.twoNumber += int(random(18,25)) * 10;
    }else if(possibility > 65 && possibility < 85){
      this.threeNumber += int(random(1,4)) * 10;
    }else if(possibility > 85){
      // add health
      this.health += int(random(4,7)) * 10;
      if(this.health >= 100){
        this.health = 100;
      }
    }

    // resetLootbox
    this.world.tileMap[preBoxRow][preBoxCol] = 0;
    this.world.tileMap[preBoxRow][preBoxCol + 1] = 0;
    this.world.tileMap[preBoxRow + 1][preBoxCol] = 0;
    this.world.tileMap[preBoxRow + 1][preBoxCol + 1] = 0;
  }

  this.checkLife = function(){
    if(this.health < 0){
      this.health = 0;
      start = false;
      over = true;
      bgPlayed = false;
      bgMusic.pause();
    }
  }
}
