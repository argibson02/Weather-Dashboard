///Variables
var timeNow = moment();
var notesArray = ["","","","","","","","","","","","","","","","","","","","","","","",""];
var localCheck = [];
var localCheckVerify = ["","","","","","","","","","","","","","","","","","","","","","","",""];
var notesInput = document.getElementById("initialsText");

//textarea variables
//var text00 = $("#text00"); my jQuery ones don't work
var text00 = document.getElementById("text00");
var text01 = document.getElementById("text01");
var text02 = document.getElementById("text02");
var text03 = document.getElementById("text03");
var text04 = document.getElementById("text04");
var text05 = document.getElementById("text05");
var text06 = document.getElementById("text06");
var text07 = document.getElementById("text07");
var text08 = document.getElementById("text08");
var text09 = document.getElementById("text09");
var text10 = document.getElementById("text10");
var text11 = document.getElementById("text11");
var text12 = document.getElementById("text12");
var text13 = document.getElementById("text13");
var text14 = document.getElementById("text14");
var text15 = document.getElementById("text15");
var text16 = document.getElementById("text16");
var text17 = document.getElementById("text17");
var text18 = document.getElementById("text18");
var text19 = document.getElementById("text19");
var text20 = document.getElementById("text20");
var text21 = document.getElementById("text21");
var text22 = document.getElementById("text22");
var text23 = document.getElementById("text23");

//button variables
var btn00 = document.querySelector("#btn00");
var btn01 = document.querySelector("#btn01");
var btn02 = document.querySelector("#btn02");
var btn03 = document.querySelector("#btn03");
var btn04 = document.querySelector("#btn04");
var btn05 = document.querySelector("#btn05");
var btn06 = document.querySelector("#btn06");
var btn07 = document.querySelector("#btn07");
var btn08 = document.querySelector("#btn08");
var btn09 = document.querySelector("#btn09");
var btn10 = document.querySelector("#btn10");
var btn11 = document.querySelector("#btn11");
var btn12 = document.querySelector("#btn12");
var btn13 = document.querySelector("#btn13");
var btn14 = document.querySelector("#btn14");
var btn15 = document.querySelector("#btn15");
var btn16 = document.querySelector("#btn16");
var btn17 = document.querySelector("#btn17");
var btn18 = document.querySelector("#btn18");
var btn19 = document.querySelector("#btn19");
var btn20 = document.querySelector("#btn20");
var btn21 = document.querySelector("#btn21");
var btn22 = document.querySelector("#btn22");
var btn23 = document.querySelector("#btn23");

var clearButton = document.querySelector("#clearButton");

//-----------------------------------------------------------------
fetch('https://api.github.com/repos/nodejs/node/issues?per_page=5')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });


///----------------------------------------------------------------------CLOCK
let currentTimeClock = function () {
    let currentTime = moment().format("dddd, MMM Do, YYYY  |  kk:mm:ss");
    $("#currentTimeText").text(currentTime);
};
currentTimeClock();
setInterval(currentTimeClock, 1000);



//-----------------------------------------------------------------COLOR SWAPPING
/*
function colorSwap() {
    $("#text00").class(".present");
}
colorSwap();
*/

function colorSwap() {
    let todayHours = moment().hour();

    function compareTime00() {
        if (todayHours > text00Hour) {
            text00.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text00Hour) {
            text00.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text00.setAttribute("class", "present col-8 input-field description");
        }
    }
    
}
colorSwap();



//-------------------------------------------------------------------------STORAGE
//--------------------Function for syncing notes with local
function checkNotes() {
    if (localStorage.getItem("notesArray") === null) { // if the local storage array is null, we skip syncing.
        return;
    }
    else if (localStorage.getItem("notesArray") === "") { // if the local storage array is an empty string, we skip syncing.
        return;
    }
    else {
        localCheck = JSON.parse(localStorage.getItem("notesArray")); // if not null, make it var local check.
    }

    if (localCheck !== localCheckVerify) { // if local storage is not empty, we sync our javascript session array to local one.
        notesArray = localCheck;
        text00.value = notesArray[00];
        text01.value = notesArray[01];
        text02.value = notesArray[02];
        text03.value = notesArray[03];
        text04.value = notesArray[04];
        text05.value = notesArray[05];
        text06.value = notesArray[06];
        text07.value = notesArray[07];
        text08.value = notesArray[08];
        text09.value = notesArray[09];
        text10.value = notesArray[10];
        text11.value = notesArray[11];
        text12.value = notesArray[12];
        text13.value = notesArray[13];
        text14.value = notesArray[14];
        text15.value = notesArray[15];
        text16.value = notesArray[16];
        text17.value = notesArray[17];
        text18.value = notesArray[18];
        text19.value = notesArray[19];
        text20.value = notesArray[20];
        text21.value = notesArray[21];
        text22.value = notesArray[22];
        text23.value = notesArray[23];
    }
}
checkNotes(); //---runs immediately upon loading the page

///---------------storing notes functions
function storeNotes00(event) {
    event.preventDefault();
    var notesHandOff = text00.value;
    notesArray[0] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local
}
"notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}

/////-----------------------------------Clear notes function 
//function clearNotes(event) {
//    event.preventDefault();
//    notesArray = localCheckVerify; // sets javascript session array to blank
//    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // pushes to local store
//    checkNotes(); // using the check notes function to clear values in note boxes 
//}


//--------------------------------------------------------------EVENT LISTENERS
//------------------------------- Save buttons
$("#submitButton")

//------------------------------- Clear button
//clearButton.addEventListener("click", clearNotes);
