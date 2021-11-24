window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

//========================VARIABLES BELOW=======================//
var health = document.getElementById("health");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var lives = 3;
const gravityVal = 8;
const playerSpeed = 12;
const playerJump = 10;
const allySpeed = 8;
const enemySpeed = 10;

let playerImage = new Image();
let allyOneImage = new Image();
let allyTwoImage = new Image();

let enemyImage = new Image();
let enemyAttackImage = new Image();
let backGround = new Image();

playerImage.src = "assets/media/kunikida.png";
allyOneImage.src = "assets/media/dazai.png";
allyTwoImage.src = "assets/media/atsushi.png";
enemyImage.src = "assets/media/akutagawa.png";
enemyAttackImage.src = "assets/media/attack.png";
backGround.src = "assets/media/background.png"

let player = new gameObjects(playerImage, 150, 410, 120,220);
let ally1 = new gameObjects(allyOneImage, 75, 410, 120,220);
let ally2 = new gameObjects(allyTwoImage, 0, 410, 120,220);
let enemy = new gameObjects(enemyImage, 1050, 410, 200, 220);
let attacks = [9];
let attack = new gameObjects(enemyAttackImage, 1050, Math.floor(Math.random() * 550), 130, 105);
let backgroundpic = new gameObjects(backGround, 0,0, canvas.width, canvas.height)
let gamerInput = new GamerInput("None"); 


//========================FUNCTIONS BELOW=======================//


function gameLoop(){
    update(); 
    draw();
    requestAnimationFrame(gameLoop);
}

//updates the game
function update(){

    playerMVMT();
    characterChange();
    alliesFollow();
    gravity();


    enemyFire();


    border();
    background();

    setTimeout(changeHP(), 5000); //to fix
    health.innerHTML = "HP: " + lives;

}

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
//changes the character sprites
function characterChange(){

    if (gamerInput.action === "Kuni")
    {
        playerImage.src = "assets/media/kunikida.png";
        allyOneImage.src = "assets/media/dazai.png";
        allyTwoImage.src = "assets/media/atsushi.png";
    }
    if (gamerInput.action === "Dazai")
    {
        playerImage.src = "assets/media/dazai.png";
        allyOneImage.src = "assets/media/atsushi.png";
        allyTwoImage.src = "assets/media/kunikida.png";
    }
    if (gamerInput.action === "Atsushi")
    {
        playerImage.src = "assets/media/atsushi.png";
        allyOneImage.src = "assets/media/kunikida.png";
        allyTwoImage.src = "assets/media/dazai.png";
    }

}
//ensures the allies follow
function alliesFollow(){
    //ally
    if (ally1.y < player.y)
    {
        ally1.y += allySpeed *2;
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
        ally2.y += (allySpeed *2);
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
//applies gravity to the player
function gravity(){

    if (player.y < canvas.height)
    {
        player.y += gravityVal;
    }

}
//applies a border to the player
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
}


////======ENEMY FUNCTIONS=======////
//allows for enemies to follow the player
function enemyFire(){

    if (attack.x > -150)
    {
        attack.x -= enemySpeed;
    }

}

////======OTHER FUNCTIONS=======////
function background(){


}

function changeHP()
{

    if (gamerInput.action === "LowerHP")
    {
        lives -= 1;
    }
    
    if (gamerInput.action === "HigherHP")
    {
        lives += 1;
    }
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

