song ="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist=0;
scorerightWrist = 0;
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded()
{
    console.log('pose is initialized');
}
function gotPoses(results)
{
    if(results.length > 0){

        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist = " + scoreleftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX + "rightWristY" + rightWristY);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX + "leftWristY" + leftWristY);
    }


}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("#A6EE4A");
    stroke("#A6EE4A");
    if(scorerightWrist > 0.2)
    {
        circle (rightWristX, rightWristY, 20)

        if(rightWristY >0 && rightWristY <= 200)
        document.getElementById("speed").innerHTML =
        "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY >100 && rightWristY <=200)
    {
        document.getElementById("speed").innerHTML =
        "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY >200 && rightWristY <=300)
    {
        document.getElementById("speed").innerHTML =
        "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY >300 && rightWristY <=400)
    {
        document.getElementById("speed").innerHTML =
        "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY >400)
    {
        document.getElementById("speed").innerHTML =
        "Speed = 2.5x";
        song.rate(2.5);
    }
    if(scoreleftWrist > 0.2)
    {
    circle(leftWristX,leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }

    
}

function preload()
{
song = loadSound("electronic-future-beats-117997.mp3");

}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
