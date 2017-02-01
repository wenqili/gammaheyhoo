var a, b;
window.addEventListener('deviceorientation', function(event) {
    a = event.gamma / 90 * 255;
    b = event.gamma / 90 * 255;
});

var canvasWidth;
var hooPlaying = false;
var heyPlaying = false;
var words = "";
var angP = 0;
var angV = 0;
var angA = 0;

function preload() {
    hoo = loadSound('audio/hoo.mp3');
    hey = loadSound('audio/hey.mp3');
}

function setup() {
    canvasWidth = getContainerWidth(container);
    var mycanvas = createCanvas(canvasWidth, windowHeight);
    mycanvas.parent("container");
    background(255);
}

function draw() {
    hooPlaying = hoo.isPlaying();
    if (a > 180 && heyPlaying == false && hooPlaying == false) {
        hoo.play();
        words = "Hoooooooo!";
    }

    heyPlaying = hey.isPlaying();
    if (a < -180 && heyPlaying == false && hooPlaying == false) {
        hey.play();
        words = "Heeeeeeee!";

    }


    canvasWidth = getContainerWidth(container);
    a = Math.floor(a);
    background(255, 255, 0);
    textAlign(CENTER);
    textSize(32);
    fill(0);
    text("Gamma: " + a, width / 2, 100);

    a = map(a, -255, 255, 125, 255);

    fill(255 - a, 255, a);
    noStroke();

    push();
    translate(width / 2, height / 2);
    rotate(angP);
    rectMode(CENTER);
    rect(0, 0, width / 2+angP*5, width / 2+angP*5);
    pop();

    if (words == "Hoooooooo!") {
        fill(0);
    } else if (words == "Heeeeeeee!") {
        fill(255);
    }
    text(words, width / 2, height / 2);
    if (heyPlaying) {
        angA = 0.2;
    } else if (hooPlaying) {
        angA = -0.2;
    }
    angV += angA;
    angP += angV;
    angA = 0;
    angV = 0;
}

function getContainerWidth(container) {
    var containerStyle = window.getComputedStyle(container);
    var containerWidth = containerStyle.width;
    containerWidth = containerWidth.substr(0, containerWidth.length - 2);
    return containerWidth;
}

function windowResized() {
    resizeCanvas(canvasWidth, windowHeight);
}
