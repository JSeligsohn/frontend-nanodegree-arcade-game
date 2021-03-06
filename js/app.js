// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.floor(Math.random() * 150);
    this.y = Math.floor(Math.random() * 200 + 30);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 30*dt;
    if (this.x > 520) {
        this.x = -1000;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function() {
    checkCollision(this);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        this.x -= 30;
    }
    else if (key == 'right') {
        this.x += 30;
    }
    else if (key == 'down') {
        this.y += 30;
    }
    else if (key == 'up') {
        this.y -= 30;
    }
};

checkCollision = function(player) {
    //check boundaries
    if (player.x > 420) {
        player.x = 420;
        console.log('Out of bounds'); //Out of bounds
    }
    else if (player.x < -20) {
        player.x = -10;
        console.log('Out of bounds'); //Out of bounds
    }
    else if (player.y > 435) {
        player.y = 435  ;
        console.log('Out of bounds'); //Out of bounds
    }
    else if (player.y < 15) {
        player.x = 200;
        player.y = 400;
        console.log('Hit water!'); //Hit Water
    }
    //check enemies
    allEnemies.forEach(function(enemy) {
        if ((enemy.y - 60) < player.y & 
            player.y < (enemy.y + 60) & 
            (enemy.x - 60) < player.x & 
            player.x < (enemy.x + 60)) {
                player.x = 200;
                player.y = 400;
                console.log('Hit enemy!'); //Collision with enemy
        };
    });
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [new Enemy()];

for(i=0; i < 15; i++) {
    newEnemy = new Enemy();
    newEnemy.x = newEnemy.x - i*150;
    allEnemies.push(newEnemy);
};

player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
