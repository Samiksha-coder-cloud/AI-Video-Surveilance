objects = [];
status1 = "";
video = "";

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(500, 360);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 500, 360);

    if (status1 != "") {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("update_Status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected: " + objects.length;
            percent = floor(objects[i].confidence * 100);
            fill("#ff0000");
            text(objects[i].label + " " + percent + " %", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("update_Status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model is Loaded");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}