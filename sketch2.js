//===================================POSITION OF POINTS ON GRID ============================
let pts = [];
let uniqueProjectsArray; // array of project titles no repeats
AllProjects = []; // all projects for each individual 
AllNames = [];
AllRadi = [];
let dictionaryArray = [];

let items; 
let groupData;

let row;
let radi;
let project;
let role;
let name;


let orderedNames =[];
let orderedProjects = [];
let orderedRadi = [];
let arraysRadi = [];
let arraysNames = [];

//ORDER===============================
let totalPeopleInProject =[];
let countPeople = 1; // count must always be a minimum of 1 or else it doesn't exist in the array anyway
let nextGroupOfPeopleId = 0;
let nextPointId = 0;
let arrayDictValue;
let sortedKeys = [];
let keys;

//==========================================================================================
//pulsing circles
let diameter = 100; // starting diameter
let maxDiameter = 200; // maximum diameter
let pulseSpeed = 6; // speed of pulsing
let brightness = 0; // starting brightness
let maxBrightness = 255; // maximum brightness


//====================================GOOGLE DOC STUFF ==============================================
let data;
let url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6k2EdVhzVIbpLqJ1B_Rlgeh7NjFWRezyfJh4QYtEZ5vTKYDqBwSEVnWseuJjPyPgxR6mTMpmtEJ2y/pub?output=csv";

//============================================================================

//this happens before the setup and the draw LOAD THE GOOGLE DOC CSV
function preload() {
  data = loadTable(url, "csv", "header");
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() 
{
  noLoop(); //don't loop the draw function
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < data.getRowCount(); i++) 
  {
    row = data.getRow(i);
    radi = row.getString("Radius");
    project = row.getString("Projects");

    
    role = row.getString("Role");
    name = row.getString("Name");
    AllProjects = AllProjects.concat(project);
    AllRadi = AllRadi.concat(parseInt(radi));
    AllNames = AllNames.concat(name);

     
  }
  
   //create array of dictionaries for the name, project and radi
  for (let i = 0; i < AllProjects.length; i++)
      {
        let combinedDictionary = {
          names: AllNames[i],
          project: AllProjects[i],
          radius: AllRadi[i]
          
        };
        dictionaryArray.push(combinedDictionary);
      }
}

function draw() 
{
  
  mainDiagram();

 
}

//==================================================================================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
//==================================================================================


function polarArray1(circleCount,pointX,pointY,namesArray,radiArrays)
{
   //totalPeopleInProject has the numbers to splice each array into smaller arrays
  
  for(let i = 0; i < circleCount; i++)
  {
    
    let diameter = radiArrays[i]; // get diameter from array
    
    if(diameter == 7) //director
      {
        resetMatrix();
        let angle = (TWO_PI/circleCount) * i;
        translate(sin(angle) * 35,cos(angle) * 35);
        noStroke(1);
        fill("rgba(219,186,200,0.51)");
        ellipse(pointX,pointY,diameter *5);
        
      }
    if(diameter == 6) //associate director
      {
        resetMatrix();
        let angle = (TWO_PI/circleCount) * i;
        translate(sin(angle) * 45,cos(angle) * 45);
        noStroke(1);
        fill("rgba(224,124,124,0.47)");
        ellipse(pointX,pointY,diameter * 7.8);
        
      }
    if(diameter == 5) //associate
      {
        resetMatrix();
        let angle = (TWO_PI/circleCount) * i;
        translate(sin(angle) * 65,cos(angle) * 65);
        noStroke(1);
        fill("rgb(179,159,159)");
        ellipse(pointX,pointY,diameter * 7.6);
       
      }
    if(diameter == 4) //senior architect
      {
        resetMatrix();
        let angle = (TWO_PI/circleCount) * i;
        translate(sin(angle) * 76,cos(angle) * 76);
        noStroke(1);
        fill("rgb(161,181,192)");
        ellipse(pointX,pointY,diameter * 7.4);
     
      }
    if(diameter == 3) //architect
      {
        resetMatrix();
        let angle = (TWO_PI/circleCount) * i;
        translate(sin(angle) * 87,cos(angle) * 87);
        noStroke(1);
        fill("rgb(225,221,195)");
        ellipse(pointX,pointY,diameter * 7.2);
       
      }
    if(diameter == 2) //part 2
      {
        resetMatrix();
        let angle = (TWO_PI/circleCount) * i;
        translate(sin(angle) * 100,cos(angle) * 100);
        noStroke(1);
        fill("rgb(197,213,180)");
        ellipse(pointX,pointY,diameter * 7);
       
      }
    if(diameter == 1) //part 1
      {
        resetMatrix();
        let angle = (TWO_PI/circleCount) * i;
        translate(sin(angle) * 111,cos(angle) * 111);
        noStroke(1);
        fill("rgb(221,143,143)");
        ellipse(pointX,pointY,diameter * 6.8);
     
      }
    textWrap(WORD);
    textAlign(CENTER, TOP);
    textSize(8);
    fill("rgb(0,0,0)");
    let stringNew = namesArray[i].split(" ");
    stringNew = stringNew.join("\n");
    text(stringNew,pointX,pointY -6);
  }
  

}
function mainDiagram()
{
  
  background(250);
 
  drawTitles("PCO_Projects", 20, 10, 40, ("rgb(0,0,0)")); 
  //grid stuff

    //====================================LAYOUT GRID FOR PROJECTS ===========================
   //===============================DATA GROUPED======================================
    //group key and values in array of dictionaries by project 
  groupData = dictionaryArray.reduce(function(result,item)
  {
    (result[item.project] = result[item.project]||[]).push(item);
    return result;
  }, {});
  //sort the projects keys-all the projects
  sortedKeys = Object.keys(groupData).sort();
  
  //if the grid size of points is not long enough to show all the projects then increase the grid size
   //ARRAY POINTS AND LABLES FOR EACH PROJECT
  //space of the points and how many points on the grid
  let numPoints = ceil(sortedKeys.length/4);
  
  let rows = 5;
  let cols = 7;
  let spacingX = 170;
  let spacingY = 250;
  let availableWidth = width - 2 * spacingX;
  let availableHeight = windowHeight - 2 * spacingY;
  let xStart = spacingX + (availableWidth - (cols - 1) * spacingX) / 2;
  let yStart = spacingY + (availableHeight - (rows - 1) * spacingY) / 2;
  

  
  for (let r = 0; r < rows; r++)
  {
    for (let c = 0; c < cols; c++) 
    {
      let x = xStart + c * spacingX;
      let y = yStart + r * spacingY;
      if (x < spacingX || x > width - spacingX || y < spacingY || y > windowHeight - spacingY) {
        continue; // skip points outside the border
      }
      pts.push([x, y]);
    }
  }

  console.log(pts);

  //MOVE ALL POINTS IN THE X COORDINATE BY /////200?>
  for(let i = 0; i < pts.length; i++) 
    {
        pts[i][0] = pts[i][0] - 50;
        pts[i][1] = pts[i][1] + 50;
        
    }

  //================================ITERATE OVER SORTED KEYS AND VALUES IN 
  for (let i = 0; i < sortedKeys.length; i++) 
  {
    keys = sortedKeys[i];
    arrayDictValue = groupData[keys];
    totalPeopleInProject.push(arrayDictValue.length);
    
    for(let j = 0; j < arrayDictValue.length; j++)
      {
        let dict = arrayDictValue[j];
        let radi2 = dict.radius;
        let name2 = dict.names;
        let project2 = dict.project;
        
        orderedNames.push(name2);
        orderedProjects.push(project2);
        orderedRadi.push(radi2);   
      }
  }
  if( pts.length > sortedKeys.length)
    {
    
      letNumtoSubtractPtArray =  pts.length - sortedKeys.length;
   
      pts.splice(pts.length - letNumtoSubtractPtArray, letNumtoSubtractPtArray);
    }
 
//draw the circles with the project titles
  //console.log(sortedKeys);
  for(let x = 0; x < sortedKeys.length; x ++ )
  {
      
      noStroke(1);
      fill("rgb(255,255,255)");
      //circle(pts[x][0], pts[x][1], 100); //get the x and y value from the array of tuples   
      textWrap(WORD);
      textAlign(CENTER, TOP);
      textSize(10);
      fill("rgb(0,0,0)");
      
      let nameParts = sortedKeys[x].split(" ");
      let name1 = nameParts[0] + "\n" + nameParts[1];

      text(name1,pts[x][0], pts[x][1] - 5 );
  
      stroke(210);
      strokeWeight(2);
      fill("rgba(0,0,0,0)");
      setLineDash([2, 5]); //create the dashed line pattern here
      //draw orbit tracks
      //ellipse(pts[x][0] , pts[x][1] , 60, 60); //for the highest position radi 7
      //ellipse(pts[x][0] , pts[x][1] , 100, 100); //6
      //ellipse(pts[x][0], pts[x][1] , 125, 125); //5
      //ellipse(pts[x][0], pts[x][1] , 150, 150); //4
      //ellipse(pts[x][0] , pts[x][1] , 175, 175); //3
      //ellipse(pts[x][0] , pts[x][1] , 200, 200); //2
      ellipse(pts[x][0] , pts[x][1] , 225, 225); //1
 
  }
  //totalPeopleInProject has the numbers to splice each array into smaller arrays
 
  for(let j = 0; j < totalPeopleInProject.length; j++)
  {      
      let subArrayRadi = orderedRadi.splice(0,totalPeopleInProject[j]); 
      let subArrayNames = orderedNames.splice(0,totalPeopleInProject[j]);
      arraysRadi.push(subArrayRadi);//create a new array of arrays numbersArray long   
      arraysNames.push(subArrayNames); //create a new array of arrays numbersArray long
  }

        //if the curent length of people in array totalpeople does == count people then draw polar array
        //then go to the next point 
  for(let individualProject = 0; individualProject < orderedProjects.length;individualProject ++)
    {
        
        //if the project is the same as the last draw a circle 
        if(totalPeopleInProject[nextGroupOfPeopleId] == countPeople) //if the current project == current same project
          {
                    
     //function polarArray1(circleCount,pointX,pointY,radi,overallRadi,names,radiArray)
            polarArray1(countPeople,pts[nextPointId][0],pts[nextPointId][1],arraysNames[nextGroupOfPeopleId],arraysRadi[nextGroupOfPeopleId]);
            
            totalPeopleInProject[nextGroupOfPeopleId];
            nextGroupOfPeopleId += 1;  
            
            nextPointId  += 1; //go to the next point id in pts array 
            countPeople = 1; 
          }
        else
          {
            countPeople += 1;
          }
      }
}

function setLineDash(list) 
{
  drawingContext.setLineDash(list);
}

//function to draw titles on left hand side
function drawTitles(textString, texSize, xPos, yPos, colorText) {
  textSize(texSize);
  fill(colorText);
  text(textString, xPos, yPos);
}