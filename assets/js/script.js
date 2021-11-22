
console.log ("Hello there")

const sound = document.getElementById("sound");

setInterval(function(){ 
    
    sound.addEventListener('ended', function(){ //once the audio plays once, it will go again
        this.currentTime=0; //sets it to 0
        this.play(); //plays

    },false)

}, 3000);
