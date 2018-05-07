//variables for tracking color
var colors;
var capture;
var trackingData;

//variables for speech recognition
var myRec = new p5.SpeechRec('en-US', parseResult); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)

function setup() {
  createCanvas(windowWidth, windowHeight);

  capture = createCapture(VIDEO); //capture the webcam
  capture.position(0, 0) //move the capture to the top left
  capture.style('opacity', 0) // use this to hide the capture later on (change to 0 to hide)...
  capture.id("myVideo"); //give the capture an ID so we can use it in the tracker below.

  colors = new tracking.ColorTracker(['magenta']);
  tracking.track('#myVideo', colors); // start the tracking of the colors above on the camera in p5

  //start detecting the colortracking
  colors.on('track', function(event) { //this happens each time the tracking happens
    trackingData = event.data // break the trackingjs data into a global so we can access it with p5
  });

  //start recording speech, show result
  myRec.onResult = showResult;
  myRec.start();

}

//voice recognition code
function showResult() {
  if (myRec.resultValue === true && trackingData) { //if voice is recording and there is tracking data to look at
    for (var i = 0; i < trackingData.length; i++) {
      background(0);
      textSize(42);
      fill(255);
      // textAlign(CENTER);
      if (trackingData[i].x > 200) {
        text(myRec.resultString, 10, trackingData[i].y, 400);
        textAlign(LEFT);
      } else if (trackingData[i].x <= 200) {
        text(myRec.resultString, 830, trackingData[i].y, 410);
        textAlign(RIGHT);
      }
      // text(myRec.resultString, width / 2, height / 2);
      console.log(myRec.resultString);
    }
  }
}

//more voice recognition code
function parseResult() {
  // recognition system will often append words into phrases.
  // so hack here is to only use the last word:
  var mostrecentword = myRec.resultString.split(' ').pop();
  if (mostrecentword.indexOf("left") !== -1) {
    dx = -1;
    dy = 0;
  } else if (mostrecentword.indexOf("right") !== -1) {
    dx = 1;
    dy = 0;
  } else if (mostrecentword.indexOf("up") !== -1) {
    dx = 0;
    dy = -1;
  } else if (mostrecentword.indexOf("down") !== -1) {
    dx = 0;
    dy = 1;
  } else if (mostrecentword.indexOf("clear") !== -1) {
    background(255);
  }
  console.log(mostrecentword);
}

// function draw() {
//   background(0);

// }