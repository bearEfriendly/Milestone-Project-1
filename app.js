function LoadingAnim() {
    console.log("howdy")
    document.getElementById('Pbtn').style.visibility = "hidden"
    document.getElementById('loading').style.animation = "Loading .5s linear forwards";
    document.getElementById('color').style.animation = "progress 5s linear forwards";
    document.getElementById('color').style.animationDelay = "1s";

}