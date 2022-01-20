function LoadingAnim() {
    document.getElementById('Pbtn').style.visibility = "hidden"
    document.getElementById('loading').style.animation = "Loading 1s linear forwards";
    document.getElementById('color').style.animation = "progress 5s linear";
    document.getElementById('color').style.animationDelay = "1s";
    setTimeout(() => { 
        document.getElementById('loading').style.visibility = "hidden";
        document.getElementById('gameBackground').style.visibility = "visible";
        console.log('howdy')
        document.getElementById('gameBackground').style.animation = "GameBackground 2s linear forwards";
        document.getElementById('title-border').style.animation = "BorderWalk 2s linear forwards";
    }, 6000);
}