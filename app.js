let isMute = false
let audio = new Audio('assets/backgroundMusic.mp3')

// Loading animation when start button pressed
function LoadingAnim() {
    document.getElementById('Pbtn').style.visibility = "hidden"
    document.getElementById('loading').style.animation = "Loading 1s linear forwards";
    document.getElementById('color').style.animation = "progress 5s linear";
    document.getElementById('color').style.animationDelay = "1s";
    setTimeout(() => { 
        document.getElementById('loading').style.visibility = "hidden";
        document.getElementById('setupBackground').style.visibility = "visible";
        document.getElementById('setupBackground').style.animation = "setupBackground 2s linear forwards";
        document.getElementById('title-border').style.animation = "BorderWalk 2s linear forwards";
        document.getElementById("audioBtn").style.visibility = "visible"
        audio.play()
    }, 6000);
    setTimeout(() => {
        document.getElementById('gameBackground').style.visibility = "visible";
    }, 7900);
}


// Audio code

audio.volume = 0.2;

if (typeof audio.loop == 'boolean')
{
    audio.loop = true;
}
else
{
    myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

function muteAudio() {

    if (isMute == false) {
        document.getElementById("audioBtn").src = "assets/mutedIcon.png"
        audio.pause()
        isMute = true
    } else {
        document.getElementById("audioBtn").src = "assets/audioIcon.png"
        isMute = false
        audio.play()
    }
}
// Minesweeper code is in gameApps