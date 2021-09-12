let gestureList = [];
let tempPointX = [];
let tempPointY = [];

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  noSmooth();
}

function draw() {
  strokeWeight(1);
  stroke(175);
  background(225);
  noFill();

  for (i = 0; i < gestureList.length; i++) {
    gestureList[i].displayAllCrvs();
    gestureList[i].moveAllCrvs();
  }

  displayCrvs(tempPointX, tempPointY);

 // print(gestureList);
}

function mouseDragged() {
  if (tempPointX.length == 0) {
    tempPointX.push(mouseX);
    tempPointY.push(mouseY);
  }
  if (
    dist(
      tempPointX[tempPointX.length - 1],
      tempPointY[tempPointY.length - 1],
      mouseX,
      mouseY
    ) > 30
  ) {
    tempPointX.push(mouseX);
    tempPointY.push(mouseY);
  }
}

function mouseReleased() {
  myGesture = new gesture(tempPointX, tempPointY);
  gestureList.push(myGesture);
  tempPointX = [];
  tempPointY = [];
}

function gesture(myarrayX, myarrayY) {
  this.curveList = [];
  myCurve = new curveMaker(myarrayX, myarrayY);
  this.curveList.push(myCurve);
  let direction = [random(-10,10),random(-10,10)];


  for (q = 1; q < 10; q++) {

    let modifiedArrayX = [];
    let modifiedArrayY = [];
    for (p = 0; p < myarrayX.length; p++) {
      modifiedArrayX[p] = myarrayX[p] + q * direction[0] + random(-1,1);
      modifiedArrayY[p] = myarrayY[p] + q * direction[1] + random(-1,1);
    }
    anotherCurve1 = new curveMaker(modifiedArrayX, modifiedArrayY);
    this.curveList.push(anotherCurve1);
  }

  //  anotherCurve1 = new curveMaker([0,50,125,200],[0,100,75,140]);

  this.displayAllCrvs = function () {
    for (l = 0; l < this.curveList.length; l++) {
      this.curveList[l].show();
    }
  };

    this.moveAllCrvs = function () {
    for (l = 0; l < this.curveList.length; l++) {
      this.curveList[l].move();
    }
  }

}

function curveMaker(arrX, arrY) {
  this.coordListX = arrX;
  this.coordListY = arrY;

  this.show = function () {
    displayCrvs(this.coordListX, this.coordListY);
  };

  this.move = function () {
    for (k = 0; k < this.coordListX.length; k++) {
      this.coordListX[k] += random(-0.3, 0.3);
      this.coordListY[k] += random(-0.3, 0.3);
    }
  };
}

function displayCrvs(arrX, arrY) {
  coordListX = arrX;
  coordListY = arrY;

  if (coordListX.length > 3) {
    beginShape();
    for (j = 0; j < coordListX.length; j++) {
      curveVertex(coordListX[j], coordListY[j]);
    }
    endShape();
  }
}

function arrayMod(arr, mod) {
  let myArray = [];
  myArray = arr;
  for (j = 0; j < arr.length; j++) {
    myArray[j] = arr[j] + mod;
  }
//  print("mod =" + mod);
  return myArray;
}

function windowResized() {
  resizeCanvas(window.windowWidth, window.windowHeight);
  resetCanvas();
}
