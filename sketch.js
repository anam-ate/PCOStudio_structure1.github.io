
//====================================GOOGLE DOC STUFF ==============================================
let data;
let url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRE6dPOO9fLBNiBCVrdCXLxAj1OA5qa2_fiUS7_maSV6gPB2isSMTmswHeRGLWNc1D2tfhCbfYcJsxm/pub?output=csv";

//this happens before the setup and the draw LOAD THE GOOGLE DOC CSV
function preload() {
  data = loadTable(url, "csv", "header");
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//===========================================================================
let rowArray;
let associateDirectorCVs = [];
let associateDCVs = [];
let seniorArchitectsCVs = [];
let architectsCVs = [];
let part2CVs = [];
let part1CVs = [];
let otherApplication = [];
let totalCVCount;
let cvCountPerGroup = [];
let firstInterviews =[];
let firstPlacement =[];
let firstFullTimeJob =[];

let dashOn = false;

let squareColor;
//===============================================================================================
//==================================GRID STUFF ===========================
let pts = [];

const numRows = 2;
const numCols = 4;
let newPts;


let totalCVcount;
let _TotalCVsIn; 

// get midpoint position for each dot
// //you know the lengthofsqures , so you need to * (size of square + distancebetween sqaure)
//SQUARE ARRAY STUFF======================================================================
let numPerRow = 10; // number of squares per row
let distanceBetweenSquares = 5;
let sizeofSquare = 15;
let cvCountLength =[];
let InterviewLength = [];
let placementLength = [];
let offersLength =[];

let widthofDottedSquare = 280;
//===============================================================================================
//===============================================================================================
function setup() 
{
  createCanvas(windowWidth, windowHeight);
  noLoop(); //don't loop the draw function
  //createCanvas(windowWidth, windowHeight);
  
  // get Data from spread sheet
  
  associateDirectorCVs = data.getRow(0).arr;
  associateDCVs = data.getRow(1).arr;
  seniorArchitectsCVs = data.getRow(2).arr;
  architectsCVs = data.getRow(3).arr;
  part2CVs = data.getRow(4).arr;
  part1CVs = data.getRow(5).arr;
  otherApplication = data.getRow(6).arr;
  totalCVCount = data.getRow(7).arr
  totalCVCount = parseInt(totalCVCount[1]);
  
  
  for (let i = 0; i < data.getRowCount(); i++) 
  {
    row = data.getRow(i);
    let cvCountPerGroup1 = row.getString("cv_count");
    let firstInterviews1 = row.getString("1st round_interview");
    let firstPlacement1 = row.getString("1st_placement");
    let firstFullTimeJob1 = row.getString("1st_full time job");

    
    cvCountPerGroup.push(parseInt(cvCountPerGroup1));
    firstInterviews.push(parseInt(firstInterviews1));
    firstPlacement.push(parseInt(firstPlacement1));
    firstFullTimeJob.push(parseInt(firstFullTimeJob1));
    
 
  }
  
  //find the row with the name , and then the first element to give the total of the 
  //amount of cvs that come in 
  let rowCVcount = data.findRow("Total", 0);
  totalCVcount = rowCVcount[1];
  
  //access the key "arr" and then it's values in this case the total amount of people
  totalCVcount = parseInt(rowCVcount['arr'][1]);
  cvCountPerGroup.pop();//remove last element in array
  cvCountPerGroup = cvCountPerGroup.filter(function(value) { //remove NaN from array
  return !isNaN(value);});
  
  firstInterviews = firstInterviews.filter(function(value) { //remove NaN from array
  return !isNaN(value);});
  
  firstPlacement = firstPlacement.filter(function(value) { //remove NaN from array
  return !isNaN(value);});
  
  firstFullTimeJob = firstFullTimeJob.filter(function(value) { //remove NaN from array
  return !isNaN(value);});
}


function draw()
{
  background(255);
  drawTitles("PCO_CV Data",20,10,40,"rgb(0,0,0)");
  drawTitles("Total CV Count: ",10,10,100,"rgb(0,0,0)");
  
  //DRAW SQUARES FOR TOTAL CV COUNT 
  // constructor(startPos,yPos, pitch, lengthOfSquares,colSq)
  _TotalCVCount = new drawSquares(100,70,12,totalCVcount,"rgb(226,179,179)");
  _TotalCVCount.arraySquaresCVcount();
  
  //cv count square
  drawSquare("rgb(209,209,209)",260,90);
  drawTitles("= " + totalCVCount,10,265,110,"rgb(0,0,0)");
  //for each 
  
  //draw points to array information about cvs
  const spacing = windowWidth / (numCols + 1) -50;
  for (let i = 0; i < numRows; i++) 
  {
    for (let j = 0; j < numCols; j++) 
    {
      const x = spacing * (j + 1);
      const y = spacing * (i + 1);
      noStroke(1);
      fill("rgb(194,155,155)");
      //ellipse(x, y, 30,30);// comment this out when done with final position
      pts.push([x,y]);
    }
  }
  
  //==========================================Edit the position of the points==============================
  newPts = pts.slice(0,-1);
  let factor_to_move_bottomRowY = -150;
  let factor_to_move_bottomRowX = 350;
  let factor_to_move_topRowY = -200;
  let factor_to_move_topRowX = 200;
  let last3values = pts.slice(-4); // get the last 3 values of an array
  let first4values = pts.slice(0,4); // get the last 3 values of an array
  //x and y of last 3 values
  last3values[0][1] = last3values[0][1] + factor_to_move_bottomRowY;
  last3values[1][1] = last3values[1][1] + factor_to_move_bottomRowY;
  last3values[2][1] = last3values[2][1] + factor_to_move_bottomRowY;
  last3values[0][0] = last3values[0][0] + factor_to_move_bottomRowX;
  last3values[1][0] = last3values[1][0] + factor_to_move_bottomRowX;
  last3values[2][0] = last3values[2][0] + factor_to_move_bottomRowX;
  
  first4values[0][0] = first4values[0][0] + factor_to_move_topRowX;
  first4values[1][0] = first4values[1][0] + factor_to_move_topRowX;
  first4values[2][0] = first4values[2][0] + factor_to_move_topRowX;
  first4values[3][0] = first4values[3][0] + factor_to_move_topRowX;
  first4values[0][1] = first4values[0][1] + factor_to_move_topRowY;
  first4values[1][1] = first4values[1][1] + factor_to_move_topRowY;
  first4values[2][1] = first4values[2][1] + factor_to_move_topRowY;
  first4values[3][1] = first4values[3][1] + factor_to_move_topRowY;
  
//==========================================================================================
//==========================================================================================
//==========================================================================================

  for(let i = 0; i < newPts.length;i++)
    {
      
      //roles
      let textSizeVariables = 10;
      let figureSize = 20;
      let secondaryText = 10;
      
     
      
      drawTitles(associateDirectorCVs[0],textSizeVariables,newPts[0][0] -50,newPts[0][1] -50,"rgb(0,0,0)");
      drawTitles(associateDCVs[0],textSizeVariables,newPts[1][0] -30,newPts[1][1] -50,"rgb(0,0,0)");
      drawTitles(seniorArchitectsCVs[0],textSizeVariables,newPts[2][0] -70,newPts[2][1] -50,"rgb(0,0,0)");
      drawTitles(architectsCVs[0],textSizeVariables,newPts[3][0] -25,newPts[3][1] -50,"rgb(0,0,0)");
      drawTitles(part2CVs[0],textSizeVariables,newPts[4][0] -105 ,newPts[4][1] -50,"rgb(0,0,0)");
      drawTitles(part1CVs[0],textSizeVariables,newPts[5][0] -105 ,newPts[5][1] -50,"rgb(0,0,0)");
      drawTitles(otherApplication[0],textSizeVariables,newPts[6][0] -25 ,newPts[6][1] -50,"rgb(0,0,0)");
      
      //border around each role
      
      
      //total cv count per group
      
      drawTitles("Total CVs in: " + cvCountPerGroup[i],secondaryText,newPts[i][0] - 40 ,newPts[i][1] + 10,"rgb(0,0,0)");
      _TotalCVsIn = new drawSquares(newPts[i][0] -100,newPts[i][1] +20,12,cvCountPerGroup[i],"rgb(177,101,101)");
      _TotalCVsIn.arraySquares();
   
      //interviews
      drawTitles("1st Interview: " + firstInterviews[i],secondaryText,newPts[i][0] -40 ,newPts[i][1] + 100,"rgb(0,0,0)");
      _Interviews = new drawSquares(newPts[i][0] -100,newPts[i][1] +110,12,firstInterviews[i],"rgb(199,136,136)");
      _Interviews.arraySquares();
      
      // placement

      drawTitles("Placement: " + firstPlacement[i],secondaryText,newPts[i][0] - 40 ,newPts[i][1] + 190,"rgb(0,0,0)");
      _placements = new drawSquares(newPts[i][0] -100,newPts[i][1] +200,12,firstPlacement[i],"rgb(222,183,183)");
      _placements.arraySquares();
      
      //fulltime job
      drawTitles("Full-Time Position: " + firstFullTimeJob[i],secondaryText,newPts[i][0] -50 ,newPts[i][1] + 270,"rgb(0,0,0)")   
      _Offers = new drawSquares(newPts[i][0] -100,newPts[i][1] +280,12,firstFullTimeJob[i],"rgb(235,206,206)");
      _Offers.arraySquares();
   
      
      
      //draw line borders
      drawSquareLineBorder(newPts[i][0] - 140,newPts[i][1] -20);
      //drawSquare("rgb(255,0,0)",newPts[i][0],newPts[i][1] );
    }
}
function drawSquareLineBorder(xPos,yPos)
{
  dashOn = true;
  stroke(210);
  strokeWeight(2);
  fill("rgba(0,0,0,0)");
  setLineDash([2, 5]); //create the dashed line pattern here
  rect(xPos, yPos, widthofDottedSquare, 350,60,60,60,60); // directors
}

function drawSquare(squareColor,xPos,yPos)
{
  dashOn = false;
  noStroke();
  fill(squareColor);
  square(xPos, yPos, 35, 10); // directors
}
//function to draw titles on left hand side
function drawTitles(textString, texSize, xPos, yPos, colorText) 
{
  noStroke();
  dashOn = false;
  textAlign(LEFT); // Set the text alignment to LEFT
  textSize(texSize);
  textWrap(WORD);
  //textAlign(CENTER, TOP);
  fill(colorText);
  text(textString, xPos, yPos);
}

function setLineDash(list) 
{
  if(dashOn == true)
    {
      drawingContext.setLineDash(list);
    }
  else
    {
       drawingContext.setLineDash([0,0]);
    }

}


function arrowLine(startX,startY,arrowAngle,lineLength)
{
  dashOn = false;
  setLineDash([0,0]);
  
  push(); // save the current state of the canvas
  translate(startX, startY); // move the origin to the start of the line
  rotate(radians(arrowAngle)); // rotate the canvas by the arrow angle
  strokeWeight(0.6);
  stroke("rgb(227,188,188)");
  fill("rgb(227,188,188)");
  line(0, 0, lineLength, 0); // draw the line
  let arrowSize = 10;
  noStroke();
  fill("rgb(227,188,188)");
  triangle(lineLength, 0, lineLength - arrowSize, arrowSize / 2, lineLength - arrowSize, -arrowSize / 2); // draw the arrow
  pop(); // restore the previous state of the canvas
}


class drawSquares {
  constructor(startPos,yPos,pitch,lengthOfSquares,colSq) {
    this.startPos = startPos;
    this.pitch = pitch;
    this.lengthOfSquares = lengthOfSquares;
    this.colSq = colSq;
    this.yPos = yPos;
    
  }
 
  createSquare2()
  {
    noStroke();
    squareColor = color(this.colSq);
    squareColor.setAlpha(255); // set the opacity 255 is fully opaque
    fill(squareColor);
  }
  arraySquares() //arrray squares but only a certain count per row
  {  
      for (let i = 0; i < this.lengthOfSquares; i++) 
      { 
          if(this.lengthOfSquares < numPerRow)
          { 
            let numPerRow1 = this.lengthOfSquares;
            let rowWidth = numPerRow1 * (sizeofSquare + distanceBetweenSquares);
            let rowOffset = (widthofDottedSquare-rowWidth)/2 - 45// calculate x-offset to center row
            let x = this.startPos + rowOffset + (i % numPerRow1) * (sizeofSquare + distanceBetweenSquares);
            let y = this.yPos + floor(i / numPerRow1) * (sizeofSquare + distanceBetweenSquares); // calculate y-coordinate of current square
        //draw the square
            this.createSquare2();
            square(x, y, sizeofSquare, 10); // directors
              
          }
        else
          {
            let rowWidth = numPerRow * (sizeofSquare + distanceBetweenSquares) ; // total width of row
            let rowOffset = (widthofDottedSquare - rowWidth)/2 - 100; // calculate x-offset to center row
            let x = this.startPos  + (i % numPerRow) * (sizeofSquare + distanceBetweenSquares);
            let y = this.yPos + floor(i / numPerRow) * (sizeofSquare + distanceBetweenSquares); // calculate y-coordinate of current square
        //draw the square
            this.createSquare2();
            square(x, y, sizeofSquare, 10); // directors
          }
      }

      
  }
  arraySquaresCVcount() //arrray squares but only a certain count per row
  {  
      let numPerRow2 = 10; // number of squares per row
      let sizeofSquare2 = 10;
      let distanceBetweenSquares2 = 5;
      let determinedWidth = this.lengthOfSquares/numPerRow; //
      let halfwayTranslationFactor = widthofDottedSquare/2;
      let countDistance = 0;
      let xDistance;
      for (let i = 0; i < this.lengthOfSquares; i++) 
      {
        let x = this.startPos + (i % numPerRow2) * (sizeofSquare2 + distanceBetweenSquares2);
        let y = this.yPos + floor(i / numPerRow2) * (sizeofSquare2 + distanceBetweenSquares2); // calculate y-coordinate of current square
        
        
        if(determinedWidth <=1)
        {
          xDistance = this.lengthOfSquares[i] * (sizeofSquare2 + distanceBetweenSquares2)/2; //determine width of 1 row under 10 =         
          x = x + xDistance;
          this.createSquare2();
          square(x, y, sizeofSquare2, 12); // directors
        }
        else
          {
            this.createSquare2();
            square(x, y, sizeofSquare2, 12); // directors
          }
        //draw the square
        
  
      }   
      
  }

}
