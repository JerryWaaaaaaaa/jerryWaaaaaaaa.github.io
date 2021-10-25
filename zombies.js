class Zombie{
  constructor(){
    // save the position of the zoombies
    this.x = random(offsetX, theWorld.tileSize * (theWorld.tileMap.length - 4) + offsetX);
    this.y = random(offsetY, theWorld.tileSize * (theWorld.tileMap.length - 4) + offsetY);

    // store the moving speed of the zombies
    this.speed = 1;
    this.initial_speed = 1;

    // store the sensors of the zoombies
    this.left;
    this.right;
    this.top;
    this.bottom;

    this.initial = false;

    // save the distance between zombie and player
    this.preDisX = this.x - thePlayer.x;
    this.preDisY = this.y - thePlayer.y;
    this.disX = this.x - thePlayer.x;
    this.disY = this.y - thePlayer.y;
    this.attack = false;

    // save the state of being attacked
    this.attacked = false;

    // set up attack interval time
    this.attackTimeout = 40;

    // save the direction of the movement
    this.direction;

    this.size = theWorld.tileSize * 2;

    this.health = 100;

    this.life = true;

    // if the zombie is a boss
    this.boss = false;

    // save the images of the zoobies
    this.artworkLeft1 = loadImage('tiles/tiles-55-left.png');
    this.artworkRight1 = loadImage('tiles/tiles-55-right.png');
    this.artworkUp1 = loadImage('tiles/tiles-55-up.png');
    this.artworkDown1= loadImage('tiles/tiles-55-down.png');
    this.artworkLeft2 = loadImage('tiles/tiles-56-left.png');
    this.artworkRight2 = loadImage('tiles/tiles-56-right.png');
    this.artworkUp2 = loadImage('tiles/tiles-56-up.png');
    this.artworkDown2 = loadImage('tiles/tiles-56-down.png');
    this.artworkLeft3 = loadImage('tiles/tiles-57-left.png');
    this.artworkRight3 = loadImage('tiles/tiles-57-right.png');
    this.artworkUp3 = loadImage('tiles/tiles-57-up.png');
    this.artworkDown3= loadImage('tiles/tiles-57-down.png');
    this.artworkLeft4 = loadImage('tiles/tiles-58-left.png');
    this.artworkRight4 = loadImage('tiles/tiles-58-right.png');
    this.artworkUp4 = loadImage('tiles/tiles-58-up.png');
    this.artworkDown4 = loadImage('tiles/tiles-58-down.png');
    this.shadow = loadImage('tiles/tiles-87.png');


    this.currentImage1;
    this.currentImage2;
    this.currentImage = [this.currentImage1, this.currentImage2];

    // if it's left foot
    this.leftFeet = true;

    // the speed of backup
    this.backUpSpeed = 3;
  }

  display(){
    if(this.life){
      push();
      if(this.attacked){
        tint(255,200);
        this.attacked = false;
      }
      if(this.leftFeet){
        image(this.currentImage[0], this.x, this.y, this.size, this.size);
        if(frameCount%20 == 0){
          this.leftFeet = !this.leftFeet;
        }
      }else if(!this.leftFeet){
        image(this.currentImage[1], this.x, this.y, this.size, this.size);
        if(frameCount%20 == 0){
          this.leftFeet = !this.leftFeet;
        }
      }
      pop();
    }
  }


  checkLife(){
    if(this.health <= 0){
      this.life = false;
    }
    if(!this.life){
      if(!this.boss){
        score += 1;
      }
      else if(this.boss){
        score += 10;
      }
      var b = new Blood(this.x, this.y);
        bloods.push(b);
        piecesSound.play();
      for(var i = 0; i < 7; i ++ ){
        var p = new Pieces(this.x, this.y, i);
        pieces.push(p);
      }
    }
  }

  checkSpeed(){
    if(frameCount%50 == 0 && this.speed != this.initial_speed){
      this.speed = this.initial_speed;
    }
  }

  updatePosition(){
    this.refreshSensors();
    // check the direction to go when the zombie generates
    if(!this.initial){
      this.initialDirection();
      this.checkBoss();
    }

    // update distance
    this.disX = this.x - thePlayer.x;
    this.disY = this.y - thePlayer.y;

    // update position according to the direction
    // ditect if the tile is accessable to walk
    if(!this.attack){
      this.move();
    }

    // change direction when approaching the player
    // when aproaching vertically
    if(abs(this.disX) <= this.size/2 && abs(this.disY) > this.size/2){
      if(this.disY > 0){
        this.direction = "up";
      }
      else if(this.disY < 0){
        this.direction = "down";
      }
    }
    // when approaching horizontally
    else if(abs(this.disY) <= this.size/2 && abs(this.disX) > this.size/2){
      if(this.disX > 0){
        this.direction = "left";
      }
      else if(this.disX < 0){
        this.direction = "right";
      }
    }
    // when approaching both way
    // count an attack
    else if(abs(this.disX) <= this.size/2 && abs(this.disY) <= this.size/2){
      if(!this.attack){
        this.attack = true;
        thePlayer.health -= 10;
        hurtSound.play();
        thePlayer.attacked = true;
        //print("attack!");
      }
    }

    // we will let the zombie back up a little when it's attacking
    this.refreshSensors();
    if(this.attack){
      this.attackTimeout --;
      this.checkTiles();
      // if(this.direction == "up"){
      //     var tile = theWorld.getTile(this.bottom[0], this.bottom[1]);
      //
      //     if(tile == 0 || tile == 96 || tile == 97 || tile == 98 || tile == 99){
      //       //this.y += this.backUpSpeed / abs(this.disY);
      //       this.y += this.backUpSpeed;
      //     }
      //     else if(tile == 1 || tile == 2 || tile == 3 || tile == 4 || tile == 5 || tile == 6){
      //       //this.y += this.backUpSpeed / (2 * abs(this.disY));
      //       this.y += this.backUpSpeed / 2;
      //     }
      //     else{
      //       this.y += 0;
      //     }
      // }
      // if(this.direction == "down"){
      //     var tile = theWorld.getTile(this.top[0], this.top[1]);
      //
      //     if(tile == 0 || tile == 96 || tile == 97 || tile == 98 || tile == 99){
      //       //this.y -= this.backUpSpeed / abs(this.disY);
      //       this.y -= this.backUpSpeed;
      //     }
      //     else if(tile == 1 || tile == 2 || tile == 3 || tile == 4 || tile == 5 || tile == 6){
      //       //this.y -= this.backUpSpeed / (2 * abs(this.disY));
      //       this.y -= this.backUpSpeed / 2;
      //     }
      //     else{
      //       this.y -= 0;
      //     }
      // }
      // if(this.direction == "left"){
      //     var tile = theWorld.getTile(this.right[0], this.right[1]);
      //
      //     if(tile == 0 || tile == 96 || tile == 97 || tile == 98 || tile == 99){
      //       //this.x += this.backUpSpeed / abs(this.disX);
      //       this.x += this.backUpSpeed;
      //     }
      //     else if(tile == 1 || tile == 2 || tile == 3 || tile == 4 || tile == 5 || tile == 6){
      //       //this.x += this.backUpSpeed / (2 * abs(this.disX));
      //       this.x += this.backUpSpeed / 2;
      //     }
      //     else{
      //       this.x += 0;
      //     }
      // }
      // if(this.direction == "right"){
      //     var tile = theWorld.getTile(this.left[0], this.left[1]);
      //
      //     if(tile == 0 || tile == 96 || tile == 97 || tile == 98 || tile == 99){
      //       //this.x -= this.backUpSpeed / abs(this.disX);
      //       this.x -= this.backUpSpeed;
      //     }
      //     else if(tile == 1 || tile == 2 || tile == 3 || tile == 4 || tile == 5 || tile == 6){
      //       //this.x -= this.backUpSpeed / (2 * abs(this.disX));
      //       this.x -= this.backUpSpeed / 2;
      //     }
      //     else{
      //       this.x -= 0;
      //     }
      // }

      if(this.attackTimeout <= 0){
        this.attackTimeout = 40;
        this.attack = false;
      }
    }

  }

  checkOverlapping(){
    // making sure that the zombie is not overlapping with the player
    if(abs(this.disX) <= this.size/2 && abs(this.disY) <= this.size/2 && !(this.disX == 0) && !(this.disY == 0)){
      if(this.direction == "left" || this.direction == "right"){
        this.x = thePlayer.x + this.size/2 * (this.disX/abs(this.disX));
        //this.x += this.disX/abs(this.disX);
      }else if(this.direction == "up" || this.direction == "down"){
        this.y = thePlayer.y + this.size/2 * (this.disY/abs(this.disY));
        //this.y += this.disY/abs(this.disY);
      }
    }
    // making sure that the zombie is not overlapping with ohter zombies
    for(var j = 0; j < theZombie.length; j ++ ){
        var disX = abs(this.x - theZombie[j].x);
        var disY = abs(this.y - theZombie[j].y);
        if(!(disX == 0) && !(disY == 0)){
          var dirX = (this.x - theZombie[j].x)/disX;
          var dirY = (this.y - theZombie[j].y)/disY;
          if(disX <= this.size && disY <= this.size){
            //print("overlap");
            if(this.direction == "up" || this.direction == "down"){
              //this.y = theZombie[j].y + this.size/2 * dirY;
              this.y += 1 * dirY;
              this.checkTiles();
            }
            else if(this.direction == "left" || this.direction == "right"){
              //this.x = theZombie[j].x + this.size/2 * dirX;
              this.x += 1 * dirX;
              this.checkTiles();
            }
          }
        }
    }
  }

  updateImage(){
    if(!this.boss){
      if(this.direction == "up"){
        this.currentImage1 = this.artworkUp1;
        this.currentImage2 = this.artworkUp2;
      }
      if(this.direction == "down"){
        this.currentImage1 = this.artworkDown1;
        this.currentImage2 = this.artworkDown2;
      }
      if(this.direction == "left"){
        this.currentImage1 = this.artworkLeft1;
        this.currentImage2 = this.artworkLeft2;
      }
      if(this.direction == "right"){
        this.currentImage1 = this.artworkRight1;
        this.currentImage2 = this.artworkRight2;
      }
    }
    else{
      if(this.direction == "up"){
        this.currentImage1 = this.artworkUp3;
        this.currentImage2 = this.artworkUp4;
      }
      if(this.direction == "down"){
        this.currentImage1 = this.artworkDown3;
        this.currentImage2 = this.artworkDown4;
      }
      if(this.direction == "left"){
        this.currentImage1 = this.artworkLeft3;
        this.currentImage2 = this.artworkLeft4;
      }
      if(this.direction == "right"){
        this.currentImage1 = this.artworkRight3;
        this.currentImage2 = this.artworkRight4;
      }
    }
    this.currentImage[0] = this.currentImage1;
    this.currentImage[1] = this.currentImage2;
  }

  // functions for internal use

  initialDirection(){
    this.initial = true;
    if(abs(this.preDisX) > abs(this.preDisY)){
        if(this.preDisX > 0){
          this.direction = "left";
        }
        else if(this.preDisX < 0){
          this.direction = "right";
        }
    }
      // move y than x to move
    else if(abs(this.preDisX) < abs(this.preDisY)){
        if(this.preDisY > 0){
          this.direction = "up";
        }
        else if(this.preDisY < 0){
          this.direction = "down";
        }
    }
  }

  checkBoss(){
      if(random(0,1) < 0.1){
        this.boss = true;
        this.health = 400;
        this.speed = 2.4;
        this.initial_speed = 2.4;
      }
  }

  move(){
    this.refreshSensors();
    if(this.direction == "up"){
      var tile = theWorld.getTile(this.top[0], this.top[1]);
      if(tile == 0 || tile == 96 || tile == 97 || tile == 98 || tile == 99){
        this.y -= this.speed;
      }else if(tile == 1 || tile == 2 || tile == 3 || tile == 4 || tile == 5 || tile == 6){
        this.y -= this.speed/2;
      }else{
        if(this.disX < 0){
          this.direction = "right";
        }else if(this.disX > 0){
          this.direction = "left";
        }
      }
    }
    if(this.direction == "down"){
      var tile = theWorld.getTile(this.bottom[0], this.bottom[1]);
      if(tile == 0 || tile == 96 || tile == 97 || tile == 98 || tile == 99){
        this.y += this.speed;
      }else if(tile == 1 || tile == 2 || tile == 3 || tile == 4 || tile == 5 || tile == 6){
        this.y += this.speed/2;
      }else{
        if(this.disX < 0){
          this.direction = "right";
        }else if(this.disX > 0){
          this.direction = "left";
        }
      }
    }
    if(this.direction == "left"){
      var tile = theWorld.getTile(this.left[0], this.left[1]);
      if(tile == 0 || tile == 96 || tile == 97 || tile == 98 || tile == 99){
        this.x -= this.speed;
      }else if(tile == 1 || tile == 2 || tile == 3 || tile == 4 || tile == 5 || tile == 6){
        this.x -= this.speed/2;
      }else{
        if(this.disY < 0){
          this.direction = "down";
        }else if(this.disY > 0){
          this.direction = "up";
        }
      }
    }
    if(this.direction == "right"){
      var tile = theWorld.getTile(this.right[0], this.right[1]);
      if(tile == 0 || tile == 96 || tile == 97 || tile == 98 || tile == 99){
        this.x += this.speed;
      }else if(tile == 1 || tile == 2 || tile == 3 || tile == 4 || tile == 5 || tile == 6){
        this.x += this.speed/2;
      }else{
        if(this.disY < 0){
          this.direction = "down";
        }else if(this.disY > 0){
          this.direction = "up";
        }
      }
    }
  }

  checkTiles(){
    this.refreshSensors();
    var tile =
    [theWorld.getTile(this.top[0], this.top[1]),
    theWorld.getTile(this.bottom[0], this.bottom[1]),
    theWorld.getTile(this.left[0], this.left[1]),
    theWorld.getTile(this.right[0], this.right[1])
    ];
    //if(this.direction == "up"){
    for(var i = 0; i < tile.length; i ++ ){
      if(tile[i] == 0 || tile[i] == 96 || tile[i] == 97 || tile[i] == 98 || tile[i] == 99){
      }else if(tile[i] == 1 || tile[i] == 2 || tile[i] == 3 || tile[i] == 4 || tile[i] == 5 || tile[i] == 6){
      }else{
        if(!(tile[i] == -1)){
          if(i == 0){
            this.y = this.top[1];
          }
          else if(i == 1){
            this.y = this.bottom[1] - this.size;
          }
          else if(i == 2){
            this.x = this.left[0];
          }
          else if(i == 3){
            this.x = this.right[0] - this.size;
          }
        }else{
          this.life = false;
        }
      }
    }
  }

  refreshSensors() {
    this.left = [this.x, this.y + this.size/2];
    this.right = [this.x + this.size, this.y + this.size / 2];
    this.top = [this.x + this.size / 2, this.y];
    this.bottom = [this.x + this.size / 2, this.y + this.size];
  }
}
