p5.disableFriendlyErrors = true; // disables FES
//standard screen resolution 2560x1440
let minAge = 20;
let maxAge = 60;
let minYears = 0.0;
let maxYears = 20.0;

let ageSlider;
let serviceSlider;

let shouldUpdate = true;
let sliderMoving = null; // null = no slider is being moved, "age" = ageSlider is being moved, "service" = serviceSlider is being moved


//===========================VARIABLES=============================
var directors = [];
var directorsFee = [];
var directorGender = [];
var directorAge = [];
var directorService = [];
//------------------------------------------------------------------
var AssociateDirectors = [];
var AssociateDirectorsFee = [];
var AssociateDirectorsGender = [];
var AssociateDirectorsAge = [];
var AssociateDirectorsService = [];
//----------------------------------------------------------------
var Associates = [];
var AssociatesFee = [];
var AssociatesGender = [];
var AssociatesAge = [];
var AssociatesService = [];
//----------------------------------------------------------------
var SeniorArchitects = [];
var SeniorArchitectsFee = [];
var SeniorArchitectsGender = [];
var SeniorArchitectsAge = [];
var SeniorArchitectsService = [];
//----------------------------------------------------------------
var Architects = [];
var ArchitectsFee = [];
var ArchitectsGender = [];
var ArchitectsAge = [];
var ArchitectsService = [];
//----------------------------------------------------------------
var Part2 = [];
var Part2Fee = [];
var Part2Gender = [];
var Part2Age = [];
var Part2Service = [];
//----------------------------------------------------------------
var Part1 = [];
var Part1Fee = [];
var Part1Gender = [];
var Part1Age = [];
var Part1Service = [];
//----------------------------------------------------------------
var others = [];
var othersFee = [];
var othersGender = [];
var othersAge = [];
var othersService = [];


let textTitlePcoStrucX;  
let textTitlePcoStrucY;
let squareSize = 50;
let squarePitch = 60;
let widthDirectors;
let widthAssociateDirectors;
let widthSeniorArchitects;
let widthArchitects;
let widthPart2;
let widthPart1;
let widthSupportTeam;

let directorsFeeWork =  { counter: 0 };
let AssociateDirectorsFeeWork = { counter: 0 };
let AssociatesFeeWork = { counter: 0 };
let SeniorArchitectsFeeWork = { counter: 0 };
let ArchitectsFeeWork = { counter: 0 };
let Part2FeeWork = { counter: 0 };
let Part1FeeWork = { counter: 0 };
let othersFeeWork = { counter: 0 };

let directorsGenderType =  { femaleCount: 0, maleCount: 0, otherCount: 0 };
let AssociateDirectorsGenderType =  { femaleCount: 0, maleCount: 0, otherCount: 0 };
let AssociatesGenderType =  { femaleCount: 0, maleCount: 0, otherCount: 0 };
let SeniorArchitectsGenderType =  { femaleCount: 0, maleCount: 0, otherCount: 0 };
let ArchitectsGenderType =  { femaleCount: 0, maleCount: 0, otherCount: 0 };
let Part2GenderType =  { femaleCount: 0, maleCount: 0, otherCount: 0 };
let Part1GenderType =  { femaleCount: 0, maleCount: 0, otherCount: 0 };
let othersGenderType =  { femaleCount: 0, maleCount: 0, otherCount: 0 };









let canvas;
//=========================button stuff and google doc stuff===================
let buttonAllOn;
let buttonFee_NonFee;
let buttonFemale;


let female1 = "rgb(101,147,133)";
let male1 = "rgb(196,218,208)";
let other1 = "rgb(124,142,123)";
let midpointPosControl = 1500;

let squareColor;
var header;
let data;
let url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6k2EdVhzVIbpLqJ1B_Rlgeh7NjFWRezyfJh4QYtEZ5vTKYDqBwSEVnWseuJjPyPgxR6mTMpmtEJ2y/pub?output=csv";

//============================================================================

//this happens before the setup and the draw LOAD THE GOOGLE DOC CSV
function preload() {
  data = loadTable(url, "csv", "header");
}

//=======================================================================

//happens once at the start following preload
function setup() {
  //createCanvas(1920, 1080);
  createCanvas(windowWidth, windowHeight);


  //createCanvas(windowWidth, windowHeight);
  //==============================TEXT STUFF=======================
  textTitlePcoStrucX = windowWidth-windowWidth +195;
  textTitlePcoStrucY = windowHeight-windowHeight + 20;
  //-------------------------------------------------------------------------
  buttonAllOn = createButton("All On");
  buttonAllOn.size(50, 50);
  buttonAllOn.position(midpointPosControl, 20);
  //-------------------------------------------------------------------------
  buttonFee_NonFee = createButton("Fee&NoFee");
  buttonFee_NonFee.size(100, 50);
  buttonFee_NonFee.position(1550, 20);
  //-------------------------------------------------------------------------
  buttonGender = createButton("Gender");
  buttonGender.size(100, 50);
  buttonGender.position(1500, 80);
  //-------------------------------------------------------------------------
  
  
  //-------------------------------------------------------------------------

  noLoop(); //don't loop the draw function
  
  //store information from google doc in individual lists
  for (let i = 0; i < data.getRowCount(); i++) {
    let row = data.getRow(i);
    let name = row.getString("Name");
    let role = row.getString("Role");
    let fee_Nofee = row.getString("Fee/NoFee");
    let gender = row.getString("Gender");
    let age = row.getString("Age");
    let service = row.getString("Service");
    let serviceArray = service.split(",");
    
    if (role === "Director") {
      directors = directors.concat(name);
      directorsFee = directorsFee.concat(fee_Nofee);
      directorGender = directorGender.concat(gender);
      directorAge = directorAge.concat(parseInt(age));
      directorService.push(parseFloat(service));

    }
    if (role === "Associate Director") {
      AssociateDirectors = AssociateDirectors.concat(name);
      AssociateDirectorsFee = AssociateDirectorsFee.concat(fee_Nofee);
      AssociateDirectorsGender = AssociateDirectorsGender.concat(gender);
      AssociateDirectorsAge = AssociateDirectorsAge.concat(parseInt(age));
      AssociateDirectorsService = AssociateDirectorsService.concat(parseFloat(service));
          
    }
    if (role === "Associate") {
      Associates = Associates.concat(name);
      AssociatesFee = AssociatesFee.concat(fee_Nofee);
      AssociatesGender = AssociatesGender.concat(gender);
      AssociatesAge = AssociatesAge.concat(parseInt(age));
      AssociatesService = AssociatesService.concat(parseFloat(service));
      
    }
    if (role === "Senior Architect" || role === "Senior Designer" )  {
      SeniorArchitects = SeniorArchitects.concat(name);
      SeniorArchitectsFee = SeniorArchitectsFee.concat(fee_Nofee);
      SeniorArchitectsGender = SeniorArchitectsGender.concat(gender);
      SeniorArchitectsAge = SeniorArchitectsAge.concat(parseInt(age));
      SeniorArchitectsService =         SeniorArchitectsService.concat(parseFloat(service));
    }
    if (role === "Architect") {
      Architects = Architects.concat(name);
      ArchitectsFee = ArchitectsFee.concat(fee_Nofee);
      ArchitectsGender = ArchitectsGender.concat(gender);
      ArchitectsAge = ArchitectsAge.concat(parseInt(age));
      ArchitectsService = ArchitectsService.concat(parseFloat(service));
    }
    if (role === "Architectural Assistant Part 2" || role === "Interiors Assistant Part 2") {
      Part2 = Part2.concat(name);
      Part2Fee = Part2Fee.concat(fee_Nofee);
      Part2Gender = Part2Gender.concat(gender);
      Part2Age = Part2Age.concat(parseInt(age));
      Part2Service = Part2Service.concat(parseFloat(service));
    }
    if (role === "Architectural Assistant Part 1" || role === "Interiors Assistant Part 1" ) {
      Part1 = Part1.concat(name);
      Part1Fee = Part1Fee.concat(fee_Nofee);
      Part1Gender = Part1Gender.concat(gender);
      Part1Age = Part1Age.concat(parseInt(age));
      Part1Service = Part1Service.concat(parseFloat(service));
    }
    if (
      role != "Architectural Assistant Part 1" &&
      role != "Architectural Assistant Part 2" &&
      role != "Senior Architect" &&
      role != "Architect" &&
      role != "Associate Director" &&
      role != "Associate" &&
      role != "Director" &&
      role != "Interiors Assistant Part 2" &&
      role != "Interiors Assistant Part 1" &&
      role != "Senior Designer" 
    ) {
      others = others.concat(name);
      othersFee = othersFee.concat(fee_Nofee);
      othersGender = othersGender.concat(gender);
      othersAge = othersAge.concat(parseInt(age));
      othersService = othersService.concat(parseFloat(service));
    } 
  }

  widthDirectors = (directors.length *(squareSize + squarePitch ));
  widthAssociateDirectors = (AssociateDirectors.length *(squareSize + squarePitch ));
  widthAssociate = (Associates.length * (squareSize + squarePitch));
  widthSeniorArchitects = (SeniorArchitects.length * (squareSize + squarePitch));
  widthArchitects = (Architects.length * (squareSize + squarePitch));
  widthPart2 = (Part2.length * (squareSize + squarePitch));
  widthPart1 = (Part1.length * (squareSize + squarePitch));
  widthSupportTeam = (others.length * (squareSize + squarePitch));
  

  //FEE WORK 
  
  countFeeWork(directorsFee,directorsFeeWork);
  countFeeWork(AssociateDirectorsFee,AssociateDirectorsFeeWork);
  countFeeWork(AssociatesFee,AssociatesFeeWork);
  countFeeWork(SeniorArchitectsFee,SeniorArchitectsFeeWork);
  countFeeWork(ArchitectsFee,ArchitectsFeeWork);
  countFeeWork(Part2Fee,Part2FeeWork);
  countFeeWork(Part1Fee,Part1FeeWork);
  countFeeWork(othersFee,othersFeeWork);
  
  //GENDER SPLIT
  countGender(directorGender,directorsGenderType);
  countGender(AssociateDirectorsGender,AssociateDirectorsGenderType);
  countGender(AssociatesGender,AssociatesGenderType);
  countGender(SeniorArchitectsGender,SeniorArchitectsGenderType);
  countGender(ArchitectsGender,ArchitectsGenderType);
  countGender(Part2Gender,Part2GenderType);
  countGender(Part1Gender,Part1GenderType);
  countGender(othersGender,othersGenderType);
  
  //==================================CREATE A RANGE SLIDER ============================================
  noStroke();
  ageSlider = document.getElementById('ageSlider');
  noUiSlider.create(ageSlider, {
    start: [minAge, maxAge],
    connect: true,
    range: {
      'min': minAge,
      'max': maxAge
    },
    step: 2,
    pips: {
      mode: 'steps',
      //values: [],
      density: 5,
      stepped: true
    }
  });
  
  ageSlider.noUiSlider.on('start', function() {
  sliderMoving = "age";
});

ageSlider.noUiSlider.on('end', function() {
  sliderMoving = null;
  //draw();
});
  //ageSlider.noUiSlider.on('slide', updateAgeRange);
  
  
  //service1 serviceSlider
  //=====================================CREATE SERVICE SLIDER ========================================
  
  noStroke();
  serviceSlider = document.getElementById('serviceSlider');
  noUiSlider.create(serviceSlider, {
    start: [minYears, maxYears],
    connect: true,
    range: {
      'min': minYears,
      'max': maxYears
    },
    step: 1,
    pips: {
      mode: 'steps',
      //values: [],
      density: 5,
      stepped: true
    }
  });
  
    serviceSlider.noUiSlider.on('start', function() {
    sliderMoving = "service";
  });

  serviceSlider.noUiSlider.on('end', function() {
    sliderMoving = null;
    //draw();
  });
  //serviceSlider.noUiSlider.on('slide', updateServiceRange);
    ageSlider.noUiSlider.on('update', function() {
    if (shouldUpdate && sliderMoving === "age") {
      console.log("age called");
      updateAgeRange();
    }
  });

  serviceSlider.noUiSlider.on('update', function() {
    if (shouldUpdate && sliderMoving === "service") {
      console.log("service called");
      updateServiceRange();
    }
  });
//===================================================================================================
  
}

function draw() {

  titles();    
  justClassInstances();
  _Directors.arraySquares();
  _AssociateDirectors.arraySquares();
  _SeniorArchitects.arraySquares();
  _Architects.arraySquares();
  _Associates.arraySquares();
  _Part2.arraySquares();
  _Part1.arraySquares();
  _Other.arraySquares();
  buttonFee_NonFee.mouseClicked(turnOffNoFeeSquares);
  buttonAllOn.mouseClicked(allOn);
  buttonGender.mouseClicked(GenderButton);


  
  if (shouldUpdate && sliderMoving === "age") 
    {
      titlesOffset();
    ageSquares();
    }
  if (shouldUpdate && sliderMoving === "service") {
    titlesOffset();
    serviceSquares();
  }
}

//function to draw titles on left hand side
function drawTitles(textString, texSize, xPos, yPos, colorText) {
  textSize(texSize);
  textAlign(CENTER); // Set the text alignment to LEFT
  fill(colorText);
  text(textString, xPos, yPos);
}
//function to draw workers
//50,60,director,"rgba(202,167,167,1.0)",yPos 1000,

class drawWorkers {
  constructor(startPos, pitch, typeRole, colSq, yPos, feeRole,gender,age,services) {
    this.startPos = startPos;
    this.pitch = pitch;
    this.typeRole = typeRole;
    this.colSq = colSq;
    this.yPos = yPos;
    this.feeRole = feeRole;
    this.gender = gender;
    this.age = age;
    this.services = services;
  }
 
  createSquare(alphaVal)
  {
    noStroke();
    squareColor = color(this.colSq);
    squareColor.setAlpha(alphaVal); // set the opacity 255 is fully opaque
    fill(squareColor);
  }
  
  createSquare2(col,alphaVal)
  {
    noStroke();
    squareColor = color(col);
    squareColor.setAlpha(alphaVal); // set the opacity 255 is fully opaque
    fill(squareColor);
  }
  
  arrayFeeSquares() 
  {  
    
        let start = this.startPos; //x position of director squares
        let distanceBetweenSquares = this.pitch;
        //turn squares all white first
        
        for (let i = 0; i < this.feeRole.length; i++) 
        {
          
          if (this.feeRole[i] == "NoFee") 
          {
            this.createSquare(100);
            square(start + (i*this.pitch), this.yPos, squareSize, 10); // directors
            textSize(9);
            fill("rgb(255,255,255)");
            textWrap(WORD);
            textAlign(CENTER, TOP);
            let stringNew = this.typeRole[i].split(" ");
            stringNew = stringNew.join("\n");
      
            text(stringNew,start + i*this.pitch +24 , this.yPos + 16);
            
          }
          else
          {
            this.createSquare(200);
            square(start + (i*this.pitch) , this.yPos, squareSize, 10); // directors
            textSize(9);
            fill("rgb(255,255,255)");
            textWrap(WORD);
            textAlign(CENTER, TOP);
            let stringNew = this.typeRole[i].split(" ");
            stringNew = stringNew.join("\n");
            text(stringNew,start + i*this.pitch +24, this.yPos + 16);
          }
         
      }
  }
  
  arrayFemaleSquares()
  {
    
        let start = this.startPos; //x position of director squares
        let distanceBetweenSquares = this.pitch;
    
       
        for (let i = 0; i < this.gender.length; i++) 
        {
          if (this.gender[i] == "female") 
          {
            this.createSquare2(female1,255);
            square(start + (i*this.pitch), this.yPos, squareSize, 10); // directors
            textSize(9);
            fill("rgb(255,255,255)");
            textWrap(WORD);
            textAlign(CENTER, TOP);
            let stringNew = this.typeRole[i].split(" ");
            stringNew = stringNew.join("\n");
      
            text(stringNew,start + i*this.pitch +24 , this.yPos + 16);
          }
          if (this.gender[i] == "male") 
          {
            this.createSquare2(male1,255);
            square(start + (i*this.pitch), this.yPos, 50, 10); // directors
            textSize(9);
            fill("rgb(255,255,255)");
            textWrap(WORD);
            textAlign(CENTER, TOP);
            let stringNew = this.typeRole[i].split(" ");
            stringNew = stringNew.join("\n");
      
            text(stringNew,start + i*this.pitch +24 , this.yPos + 16);
          }
          if (this.gender[i] == "other") 
          {
            this.createSquare2(other1,255);
            square(start + (i*this.pitch), this.yPos, squareSize, 10); // directors
            textSize(9);
            fill("rgb(255,255,255)");
            textWrap(WORD);
            textAlign(CENTER, TOP);
            let stringNew = this.typeRole[i].split(" ");
            stringNew = stringNew.join("\n");
      
            text(stringNew,start + i*this.pitch +24 , this.yPos + 16);
        }
          
      
    }
  }
    
  
  
  arraySquares() 
  {  
        
      let start = this.startPos; //x position of director squares
      let distanceBetweenSquares = this.pitch;
    
    
      for (let i = 0; i < this.typeRole.length; i++) 
      {
     
        this.createSquare(255);
        square(start + (i*this.pitch), this.yPos, squareSize, 10); // directors
        textSize(9);
        fill("rgb(255,255,255)");
        textWrap(WORD);
        textAlign(CENTER, TOP);
        let stringNew = this.typeRole[i].split(" ");
        stringNew = stringNew.join("\n");

        text(stringNew,start + i*this.pitch +24 , this.yPos + 16);

      }
      
  }
  
 arrayAges()
  {
      //document.getElementById('slider').noUiSlider.on('update',this.updateAgeRange);
      //console.log(this.updateAgeRange());
      let start = this.startPos ; //x position of director squares
      let distanceBetweenSquares = this.pitch;
      
      for (let i = 0; i < this.age.length; i++) 
      {
          if (this.age[i]>= minAge && this.age[i] <= maxAge) 
          {
            
            this.createSquare(255);
            square(start + (i*this.pitch), this.yPos, squareSize, 10); // directors
            textSize(9);
            fill("rgb(255,255,255)");
            textWrap(WORD);
            textAlign(CENTER, TOP);
            let stringNew = this.typeRole[i].split(" ");
            stringNew = stringNew.join("\n");
            text(stringNew,start + i*this.pitch +24 , this.yPos + 16);
          }
          else
          {
           
            this.createSquare(10);
            square(start + (i*this.pitch), this.yPos, squareSize, 10); // directors
            textSize(9);
            fill("rgb(153,153,153)");
            textWrap(WORD);
            textAlign(CENTER, TOP);
            let stringNew = this.typeRole[i].split(" ");
            stringNew = stringNew.join("\n");
            text(stringNew,start + i*this.pitch +24 , this.yPos + 16);
          }
        
        }
    } 
  
  arrayServices()
  {
      //document.getElementById('slider').noUiSlider.on('update',this.updateAgeRange);
      //console.log(this.updateAgeRange());
      let start = this.startPos; //x position of director squares
   
      
      for (let i = 0; i < this.services.length; i++) 
      {
          if (this.services[i]>= minYears && this.services[i] <= maxYears) 
          {
            
            this.createSquare(255);
            square(start + (i*this.pitch), this.yPos, squareSize, 10); // directors
            textSize(9);
            fill("rgb(255,255,255)");
            textWrap(WORD);
            textAlign(CENTER, TOP);
            let stringNew = this.typeRole[i].split(" ");
            stringNew = stringNew.join("\n");
            text(stringNew,start + i*this.pitch +24 , this.yPos + 16);
          }
          else
          {
           
            this.createSquare(10);
            square(start + (i*this.pitch), this.yPos, squareSize, 10); // directors
            textSize(9);
            fill("rgb(153,153,153)");
            textWrap(WORD);
            textAlign(CENTER, TOP);
            let stringNew = this.typeRole[i].split(" ");
            stringNew = stringNew.join("\n");
            text(stringNew,start + i*this.pitch +24 , this.yPos + 16);
          }
        
        }
    } 
  

}

function GenderButton()
{
  textSize(10);
   titlesOffsetComment("Female: " + directorsGenderType.femaleCount + " Male: " + directorsGenderType.maleCount + " Other: " + directorsGenderType.otherCount,
                     "Female: " + AssociateDirectorsGenderType.femaleCount + " Male: " + AssociateDirectorsGenderType.maleCount + " Other: " + AssociateDirectorsGenderType.otherCount,
                     "Female: " + AssociatesGenderType.femaleCount + " Male: " + AssociatesGenderType.maleCount + " Other: " + AssociatesGenderType.otherCount,
                     "Female: " + SeniorArchitectsGenderType.femaleCount + " Male: " + SeniorArchitectsGenderType.maleCount + " Other: " + SeniorArchitectsGenderType.otherCount,
                     "Female: " + ArchitectsGenderType.femaleCount + " Male: " + ArchitectsGenderType.maleCount + " Other: " + ArchitectsGenderType.otherCount,
                     "Female: " + Part2GenderType.femaleCount + " Male: " + Part2GenderType.maleCount + " Other: " + Part2GenderType.otherCount,
                     "Female: " + Part1GenderType.femaleCount + " Male: " + Part1GenderType.maleCount + " Other: " + Part1GenderType.otherCount,
                     "Female: " + othersGenderType.femaleCount + " Male: " + othersGenderType.maleCount + " Other: " + othersGenderType.otherCount)

  //titlesOffset();
  _Directors.arrayFemaleSquares();   
  _AssociateDirectors.arrayFemaleSquares();
  _Associates.arrayFemaleSquares();
  _SeniorArchitects.arrayFemaleSquares();
  _Architects.arrayFemaleSquares();
  _Part2.arrayFemaleSquares();
  _Part1.arrayFemaleSquares();
  _Other.arrayFemaleSquares();
  
}
  
function allOn()
{
  titlesOffset();
  _Directors.arraySquares();   
  _AssociateDirectors.arraySquares();
  _Associates.arraySquares();
  _SeniorArchitects.arraySquares();
  _Architects.arraySquares();
  _Part2.arraySquares();
  _Part1.arraySquares();
  _Other.arraySquares();

}
function turnOffNoFeeSquares()
{
  //titlesOffsetComment(commentD,commentAD,commentA,commentSA,commentAR,commentP2,commentP1,commentS)
  textSize(10); // Set the font size to 24
  titlesOffsetComment("Fee: " + directorsFeeWork.counter + "/" + directorsFee.length ,
                     "Fee: " + AssociateDirectorsFeeWork.counter + "/" + AssociateDirectorsFee.length,
                     "Fee: " + AssociatesFeeWork.counter  + "/" + AssociatesFee.length,
                     "Fee: " + SeniorArchitectsFeeWork.counter  + "/" + SeniorArchitectsFee.length,
                     "Fee: " + ArchitectsFeeWork.counter  + "/" + ArchitectsFee.length,
                     "Fee: " + Part2FeeWork.counter  + "/" + Part2Fee.length,
                     "Fee: " + Part1FeeWork.counter  + "/" + Part1Fee.length,
                     "Fee: " + othersFeeWork.counter  + "/" + othersFee.length)
  //titlesOffset();
  _Directors.arrayFeeSquares();   
  _AssociateDirectors.arrayFeeSquares();
  _Associates.arrayFeeSquares();
  _SeniorArchitects.arrayFeeSquares();
  _Architects.arrayFeeSquares();
  _Part2.arrayFeeSquares();
  _Part1.arrayFeeSquares();
  _Other.arrayFeeSquares();

}


//300,400,500,600,700,800,900,1000
function updateAgeRange() 
{
  if (sliderMoving === "age") {
  let range = ageSlider.noUiSlider.get();
  minAge = range[0];
  maxAge = range[1];
  //console.log("age:",range);
    //if the service slider is not moving age slider is 
    draw();
  }
  
}

function updateServiceRange() 
{
  if (sliderMoving === "service") {
  let range = serviceSlider.noUiSlider.get();
  minYears = range[0];
  maxYears = range[1];
  //console.log("service:",range);
    //if the age slider is not moving service slider is 
  
    draw();
  }
  
}

function ageSquares()
{
  titlesOffset();
  _Directors.arrayAges();   
  _AssociateDirectors.arrayAges();
  _Associates.arrayAges();
  _SeniorArchitects.arrayAges();
  _Architects.arrayAges();
  _Part2.arrayAges();
  _Part1.arrayAges();
  _Other.arrayAges();
}

function serviceSquares()
{
  titlesOffset();
  _Directors.arrayServices();   
  _AssociateDirectors.arrayServices();
  _Associates.arrayServices();
  _SeniorArchitects.arrayServices();
  _Architects.arrayServices();
  _Part2.arrayServices();
  _Part1.arrayServices();
  _Other.arrayServices();
}



function drawSquare(squareColor,xPos,yPos)
{
  noStroke();
  fill(squareColor);
  square(xPos, yPos, 10, 3); // directors
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



let heightTitle = 930;
let reductionHeightTitle = 100;
let textSizeMainTitle = 20;
let squaresYTrans = 85;
let weird = 3.8;



function justClassInstances()
{
  
    
    //==========================DRAW WORKERS SQUARES===================
    //Directors
    _Directors = new drawWorkers((windowWidth/2) - (widthDirectors/weird), squarePitch, directors, "rgba(219,177,177,1.0)", squaresYTrans * 2.5,directorsFee,directorGender,directorAge,directorService);
    //Associate Directors
    _AssociateDirectors = new drawWorkers((windowWidth/2) - ( widthAssociateDirectors/weird), squarePitch, AssociateDirectors, "rgba(219,177,177,1)", squaresYTrans * 3.5,AssociateDirectorsFee,AssociateDirectorsGender,AssociateDirectorsAge,AssociateDirectorsService);
    //Associate
    _Associates = new drawWorkers(windowWidth/2 - (widthAssociate/weird), squarePitch, Associates, "rgba(219,177,177,1)", squaresYTrans * 4.5,AssociatesFee,AssociatesGender,AssociatesAge,AssociatesService);
    //senior architects
    _SeniorArchitects = new drawWorkers(windowWidth/2 - (widthSeniorArchitects/weird), squarePitch, SeniorArchitects, "rgba(219,177,177,1)", squaresYTrans * 5.5,SeniorArchitectsFee,SeniorArchitectsGender,SeniorArchitectsAge,SeniorArchitectsService);
    //architect
    _Architects = new drawWorkers(windowWidth/2 - (widthArchitects/weird), squarePitch, Architects, "rgba(219,177,177,1)", squaresYTrans * 6.5,ArchitectsFee,ArchitectsGender,ArchitectsAge,ArchitectsService);
    //part 2
    _Part2 = new drawWorkers(windowWidth/2 - (widthPart2/weird), squarePitch, Part2, "rgba(219,177,177,1)", squaresYTrans *  7.5,Part2Fee,Part2Gender,Part2Age,Part2Service);
    //part 1
    _Part1 = new drawWorkers(windowWidth/2 - (widthPart1/weird), squarePitch, Part1, "rgba(219,177,177,1)", squaresYTrans * 8.5,Part1Fee,Part1Gender,Part1Age,Part1Service);
    //others
    _Other = new drawWorkers(windowWidth/2 - (widthSupportTeam/weird), squarePitch, others, "rgba(219,177,177,1)", squaresYTrans * 9.5,othersFee,othersGender,othersAge,othersService);
  
}

function titles()
{
  background(250);
  let xPos = windowWidth/2 //800;
  drawSquare(female1,1620,85);
  drawSquare(male1,1620,100);
  drawSquare(other1,1620,115);
  drawTitles("Female", 10, 1680, 95, "rgb(0,0,0)"); //88
  drawTitles("Male", 10, 1680, 110, "rgb(0,0,0)");
  drawTitles("Prefer not to say", 10, 1680, 125, "rgb(0,0,0)");
  
  //constructor(startPos, pitch, typeRole, colSq, yPos, feeRole,gender,age) 
  drawTitles("Directors" , 15, xPos , heightTitle - 7.5 * reductionHeightTitle + 15 , "rgb(0,0,0)");
  drawTitles("Associate Directors",15,xPos,heightTitle - 6.4 * reductionHeightTitle - 5 ,"rgb(0,0,0)");
  drawTitles("Associate",15,xPos,heightTitle - 5.5 * reductionHeightTitle - 10 ,"rgb(0,0,0)");
  drawTitles("Senior Architect/Senior Designer" ,15,xPos,heightTitle - 4.6 * reductionHeightTitle -15,"rgb(0,0,0)");
  drawTitles("Architect",15,xPos,heightTitle - 3.6 * reductionHeightTitle - 30,"rgb(0,0,0)");
  drawTitles("Part2 Architectural Assistant/ Interiors Assistant 2",15,xPos,heightTitle - 2.6 * reductionHeightTitle -45,"rgb(0,0,0)");
  drawTitles("Part1 Architectural Assistant/ Interiors Assistant 1",15,xPos,heightTitle - reductionHeightTitle -120 ,"rgb(0,0,0)");
  drawTitles("Support Team",15,xPos,heightTitle -135 ,"rgb(0,0,0)");
  
  drawTitles("PCO_Studio", textSizeMainTitle, 80, 40, "rgb(0,0,0)");
  drawTitles("Age", 10, 1450, 155, "rgb(0,0,0)");//155
  drawTitles("Service", 10, 1440, 230, "rgb(0,0,0)");


}

function titlesOffset()
{
  background(250);
  let xPos = windowWidth/2 //800;
  drawSquare(female1,1620,85);
  drawSquare(male1,1620,100);
  drawSquare(other1,1620,115);
  drawTitles("Female", 10, 1680, 87, "rgb(0,0,0)"); //95
  drawTitles("Male", 10, 1680, 102, "rgb(0,0,0)");  //110
  drawTitles("Prefer not to say", 10, 1680, 117, "rgb(0,0,0)"); //125
  
  //constructor(startPos, pitch, typeRole, colSq, yPos, feeRole,gender,age) 
  drawTitles("Directors", 15, xPos , heightTitle - 7.5 * reductionHeightTitle + 3.5, "rgb(0,0,0)"); 
  drawTitles("Associate Directors",15,xPos,heightTitle - 6.4 * reductionHeightTitle - 16.7 ,"rgb(0,0,0)");
  drawTitles("Associate",15,xPos,heightTitle - 5.5 * reductionHeightTitle -21.5,"rgb(0,0,0)");
  drawTitles("Senior Architect/Senior Designer" ,15,xPos,heightTitle - 4.6 * reductionHeightTitle -26.8,"rgb(0,0,0)");
  drawTitles("Architect",15,xPos,heightTitle - 3.6 * reductionHeightTitle-41.5,"rgb(0,0,0)");
  drawTitles("Part2 Architectural Assistant/ Interiors Assistant 2" ,15,xPos,heightTitle - 2.6 * reductionHeightTitle -56.4 ,"rgb(0,0,0)");
  drawTitles("Part1 Architectural Assistant/ Interiors Assistant 1",15,xPos,heightTitle - reductionHeightTitle -70 -61.5,"rgb(0,0,0)");
  drawTitles("Support Team",15,xPos,heightTitle -146.5 ,"rgb(0,0,0)");
  
  drawTitles("PCO_Studio", textSizeMainTitle, 80, 24.7, "rgb(0,0,0)");
  drawTitles("Age", 10, 1450, 147, "rgb(0,0,0)");//155
  drawTitles("Service", 10, 1440, 222, "rgb(0,0,0)");


}
function titlesOffsetComment(commentD,commentAD,commentA,commentSA,commentAR,commentP2,commentP1,commentS)
{
  background(250);
  let xPos = windowWidth/2 //800;
  drawSquare(female1,1620,85);
  drawSquare(male1,1620,100);
  drawSquare(other1,1620,115);
  drawTitles("Female", 10, 1680, 87, "rgb(0,0,0)"); //95
  drawTitles("Male", 10, 1680, 102, "rgb(0,0,0)");  //110
  drawTitles("Prefer not to say", 10, 1680, 117, "rgb(0,0,0)"); //125
  
  //constructor(startPos, pitch, typeRole, colSq, yPos, feeRole,gender,age) 
  drawTitles("Directors: " + commentD, 15, xPos , heightTitle - 7.5 * reductionHeightTitle + 3.5, "rgb(0,0,0)"); 
  drawTitles("Associate Directors: " + commentAD,15,xPos,heightTitle - 6.4 * reductionHeightTitle - 16.7 ,"rgb(0,0,0)");
  drawTitles("Associate: " + commentA,15,xPos,heightTitle - 5.5 * reductionHeightTitle -21.5,"rgb(0,0,0)");
  drawTitles("Senior Architect/Senior Designer: " + commentSA ,15,xPos,heightTitle - 4.6 * reductionHeightTitle -26.8,"rgb(0,0,0)");
  drawTitles("Architect: " + commentAR,15,xPos,heightTitle - 3.6 * reductionHeightTitle-41.5,"rgb(0,0,0)");
  drawTitles("Part2 Architectural Assistant/ Interiors Assistant 2: " + commentP2,15,xPos,heightTitle - 2.6 * reductionHeightTitle -56.4 ,"rgb(0,0,0)");
  drawTitles("Part1 Architectural Assistant/ Interiors Assistant 1: " + commentP1,15,xPos,heightTitle - reductionHeightTitle -70 -61.5,"rgb(0,0,0)");
  drawTitles("Support Team: " + commentS,15,xPos,heightTitle -146.5 ,"rgb(0,0,0)");
  
  drawTitles("PCO_Studio", textSizeMainTitle, 80, 24.7, "rgb(0,0,0)");
  drawTitles("Age", 10, 1450, 147, "rgb(0,0,0)");//155
  drawTitles("Service", 10, 1440, 222, "rgb(0,0,0)");


}

function countFeeWork(typePersonArray,counterObj)
{

  for (let i = 0; i < typePersonArray.length; i++) 
  {
   if (typePersonArray[i] === "Fee")
     {
    
       counterObj.counter++
     }
    
  }
  return counterObj.counter;    
}
  
function countGender(typePersonArray, genderCounts) {
  for (let i = 0; i < typePersonArray.length; i++) {
    if (typePersonArray[i] === "female") {
      genderCounts.femaleCount++;
    }
    else if (typePersonArray[i] === "male") {
      genderCounts.maleCount++;
    }
    else if (typePersonArray[i] === "other") {
      genderCounts.otherCount++;
    }
  }
  return genderCounts;
}
