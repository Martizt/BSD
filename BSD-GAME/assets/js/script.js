////doesnt allow for arrow keys and space bar to move the screen
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


//========================VARIABLES BELOW=======================//
var board = document.getElementById("board");
var instructions = document.getElementById("instructions");


const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var lives = 3;
var health = 100
var score = 0;
var start = 0;
var round = 1;

const gravityVal = 3.5;

let playerSpeed = 7;
let playerJump = 7;
const allySpeed = 7;

const attackSpeed = 20;
let enemySpeed = 5;
let speedMultiplier = 5;

let playerImage = new Image();
let allyOneImage = new Image();
let allyTwoImage = new Image();
let playerAttackImage = new Image();

let enemyImage = new Image();
let enemyAttackImage = new Image();
let backGround = new Image();

playerImage.src = "assets/media/kunikida.png";
allyOneImage.src = "assets/media/dazai.png";
allyTwoImage.src = "assets/media/atsushi.png";
playerAttackImage.src = "assets/media/kuniattack.png";
enemyImage.src = "assets/media/kyouka.png";
enemyAttackImage.src = "assets/media/attack1.png";
backGround.src = "assets/media/bg1.png"

let player = new gameObjects(playerImage, 150, 410, 120,220);
let ally1 = new gameObjects(allyOneImage, 75, 410, 120,220);
let ally2 = new gameObjects(allyTwoImage, 0, 410, 120,220);
let pattack = new gameObjects(playerAttackImage, -50, player.y, 50,40);
let enemy = new gameObjects(enemyImage, 1050, 410, 200, 220);
let attack = new gameObjects(enemyAttackImage, 1050, Math.floor(Math.random() * 550), 130, 105);
let backgroundpic = new gameObjects(backGround, 0,0, canvas.width, canvas.height)
let gamerInput = new GamerInput("None"); 


//========================FUNCTIONS BELOW=======================//



////======PLAYER & ALLIES FUNCTIONS=======////


//player movement function
function playerMVMT()
{
    //only allows the player tio jump when they havent jumped
    if (gamerInput.action === "Up")
    {
        player.y -= playerJump * 2;
    }
    if (gamerInput.action === "Down")
    {
        player.y += playerSpeed;
    }
    if (gamerInput.action === "Left")
    {
        player.x -= playerSpeed;
    }
    if (gamerInput.action === "Right")
    {
        player.x += playerSpeed;
    }

}
//player attacking the enemy
/*function playerAttacks(){

    if (gamerInput.action === "Attack")
    {
        pattack.x = player.x + 40;
        pattack.y = player.y + 80;
        pattack.x += attackSpeed;
    }

}
*/
//changes the character sprites
function characterChange(){

    if (gamerInput.action === "Kuni")
    {
        playerImage.src = "assets/media/kunikida.png";
        allyOneImage.src = "assets/media/dazai.png";
        allyTwoImage.src = "assets/media/atsushi.png";
        playerAttackImage.src = "assets/media/kuniattack.png";
        playerSpeed = 7;
        playerJump = 7;
    }
    if (gamerInput.action === "Dazai")
    {
        playerImage.src = "assets/media/dazai.png";
        allyOneImage.src = "assets/media/atsushi.png";
        allyTwoImage.src = "assets/media/kunikida.png";
        playerAttackImage.src = "assets/media/susattack.png";
        playerSpeed = 5;
        playerJump = 14;
    }
    if (gamerInput.action === "Atsushi")
    {
        playerImage.src = "assets/media/atsushi.png";
        allyOneImage.src = "assets/media/kunikida.png";
        allyTwoImage.src = "assets/media/dazai.png";
        playerAttackImage.src = "assets/media/susattack.png";
        playerSpeed = 14;
        playerJump = 5;
    }


    if (round == 2)
    {
        enemyImage.src = "assets/media/akutagawa.png";
        enemyAttackImage.src = "assets/media/attack2.png";
        backGround.src = "assets/media/bg2.png";
    }

    if (round == 3)
    {
        enemyImage.src = "assets/media/chuuya.png";
        enemyAttackImage.src = "assets/media/attack3.png";
        backGround.src = "assets/media/bg3.png";
    }

}
//ensures the allies follow
function alliesFollow(){
    //ally
    if (ally1.y < player.y)
    {
        ally1.y += allySpeed;
    }
    if (ally1.y > player.y)
    {
        ally1.y -= allySpeed;
    }
    if (ally1.x < player.x - 75)
    {
        ally1.x += allySpeed;
    }
    if (ally1.x > player.x + 75)
    {
        ally1.x -= allySpeed;
    }

    //ally two
    if (ally2.y < ally1.y)
    {
        ally2.y += allySpeed;
    }
    if (ally2.y > ally1.y)
    {
        ally2.y -= allySpeed - 0.5;
    }
    if (ally2.x < ally1.x - 75)
    {
        ally2.x += allySpeed - 0.5;
    }
    if (ally2.x > ally1.x + 75)
    {
        ally2.x -= allySpeed - 0.5;
    }


}




////======ENEMY FUNCTIONS=======////


//enemy fires at a random y coord, while starting at the same x
function enemyFire(){

    if (attack.x > -150)
    {
        attack.x -= enemySpeed;
    }
    if (attack.x <= -150)
    {
        attack.x = 1050;
        attack.y = Math.floor(Math.random() * 550);
        enemySpeed = Math.floor(Math.random() * 20) + speedMultiplier;
        score += 1;
    }

}
//makes the enemy jump to the attack
function enemyMove(){

    if (attack.x == enemy.x)
    {
        enemy.y = attack.y;
    }
}
//checks the collision of the enemy attack to player, causes appropriate damage
function takeDamage(){
    if(attack.x >= player.x -60 && attack.x <= player.x + 60 && attack.y >= player.y - 110&& attack.y <= player.y + 110)
    {
        health-=round;
    }
}
//increases difficulty
function changeSpeed(){
    if(score == 20){
        speedMultiplier = 7; 
    }
    if(score == 50){
        speedMultiplier = 10; 
    }
    if(score == 100){
        speedMultiplier = 13;
        round = 2; 
    }
    //failsafe round switcher
    if(score == 101){
        speedMultiplier = 13;
        round = 2; 
    }
    if(score == 150){
        speedMultiplier = 15;
    }
    if(score == 200){
        speedMultiplier = 18;
    }
    if(score == 250){
        speedMultiplier = 20;
        round = 3;
    }
    //failsafe round switcher
    if(score == 251){
        speedMultiplier = 20;
        round = 3;
    }
    if(score == 500){
        speedMultiplier = 25;
    }

}




////======OTHER IN GAME FUNCTIONS=======////


//applies gravity to the player and enemy
function gravity(){

    if (player.y < canvas.height)
    {
        player.y += gravityVal;
    }
    if (enemy.y < canvas.height)
    {
        enemy.y += gravityVal;
    }

}
//applies a border to the player and enemy
function border(){

    if (player.y + 220 >= canvas.height -10)
    {
        player.y = canvas.height - 230;
    }
    if (player.y <= 0)
    {
        player.y = 0;
    }
    if (player.x + 120 >= canvas.width/1.3)
    {
        player.x = canvas.width/1.3 -120 ;
    }
    if (player.x <= 0)
    {
        player.x = 0;
    }
 
    //border for enemy
    if (enemy.y + 220 >= canvas.height -10)
    {
        enemy.y = canvas.height - 230;
    }
    if (enemy.y <= 0)
    {
        enemy.y = 0;
    }


}
//scrolling background to be amde
function background(){
}
//resets the game
function reset(){
    
    if (gamerInput.action === "Reset")
    {
        location.reload();
    }
    
}
//starts the game
function startGame(){
    if (gamerInput.action === "Start")
    {
        start = 1;
        instructions.innerHTML = "";
    }
}
//pauses the game
function pauseGame(){
    if (gamerInput.action === "Pause")
    {
        start = 0;
        instructions.innerHTML = "PAUSED";
    }
}
//changes hp
function changeHP()
{
    if(health <=0)
    {
        lives -= 1;
        health = 100;
    }

    if (gamerInput.action === "LowerHP")
    {
        lives -= 1;
    }
    
    if (gamerInput.action === "HigherHP")
    {
        lives += 1;
    }
}


////======OTHER FUNCTIONS=======////


function gameLoop()
{
    if (lives <= 0)
    {
        start = 0;
    }
   
    update(); 
    draw();
    requestAnimationFrame(gameLoop);
    
    
}
//updates the game
function update(){

    startGame();
    pauseGame();
    if (start === 1) 
    {
    
    playerMVMT();
    //playerAttacks(); //to fix
    characterChange();
    alliesFollow();
    gravity();
    reset();
    

    enemyFire();
    enemyMove();
    changeSpeed();

    takeDamage();
    }

    border();
    background();

    setTimeout(changeHP(), 5000); //to fix
    board.innerHTML = "Lives:   " + lives + " === HP:   " + health + " === Round: " + round + " === Score:   " + score;

}
//draws objects on the canvas
function draw(){
   // Clear Canvas
   context.drawImage(
                     backgroundpic.spritesheet,
                     backgroundpic.x,
                     backgroundpic.y,
                     backgroundpic.width,
                     backgroundpic.height
                     )
    context.drawImage(
                     attack.spritesheet, 
                     attack.x,
                     attack.y,
                     attack.width,
                     attack.height
                     )
   context.drawImage(
                    enemy.spritesheet, 
                    enemy.x,
                    enemy.y,
                    enemy.width,
                    enemy.height
                    )

    if (lives >= 3)
    {
        context.drawImage
        (
            ally2.spritesheet, 
            ally2.x,
            ally2.y,
            ally2.width,
            ally2.height
        )
    }
    if (lives >= 2)
    {
        context.drawImage
        (
            ally1.spritesheet, 
            ally1.x,
            ally1.y,
            ally1.width,
            ally1.height
        )
    }
    if (lives >= 1)   
    {   
        context.drawImage
        (
            player.spritesheet, 
            player.x,
            player.y,
            player.width,
            player.height
        )

        context.drawImage
        (
            pattack.spritesheet, 
            pattack.x,
            pattack.y,
            pattack.width,
            pattack.height
        )
    }




}

function gameObjects(spritesheet, x, y, width, height){
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}
//this function allows for the actual movement of the player
function GamerInput(input){
    //input is passed from input functions, left, right etc.
    this.action = input;
}
//This function calls out to gamerinput about what key was pressed
function input(event) 
{

    //listens for any keydown events, aka the input from the user.
    if (event.type === "keydown")
    {
        //accounts for the 4 directional keys, and a default of none.
        switch (event.keyCode) 
        {
            case 37: // Left Arrow
                gamerInput = new GamerInput("Left");
                break;

            case 38: // Up Arrow
                gamerInput = new GamerInput("Up");
                break; 

            case 39: // Right Arrow
                gamerInput = new GamerInput("Right");
                break;

            case 40: // Down Arrow
                gamerInput = new GamerInput("Down");
                break;
        
            case 82: //r
                gamerInput = new GamerInput("Reset");        
                break;

            case 32: //spaceebar
                gamerInput = new GamerInput("Attack");        
                break;

            case 13: //enter
                gamerInput = new GamerInput("Start");        
                break;
            
            case 80: //p
                gamerInput = new GamerInput("Pause");        
                break;

            case 49: //num 1
                gamerInput = new GamerInput("Kuni");
                break; 

            case 50: //num 2
                gamerInput = new GamerInput("Dazai");
                break;

            case 51: //num 3
                gamerInput = new GamerInput("Atsushi");        
                break; 

            case 173: //minus/underscore
                gamerInput = new GamerInput("LowerHP");        
                break; 

            case 61: //plus/equals
                gamerInput = new GamerInput("HigherHP");        
                break; 

            default:
                gamerInput = new GamerInput("None");
        }
    }

    //if no key is pressed, do nothing.
    else
    {
        gamerInput = new GamerInput("None");
    }
}



//========================DECLERATIONS BELOW=======================//

window.requestAnimationFrame(gameLoop);

window.addEventListener('keydown',input);
window.addEventListener('keyup',input);

