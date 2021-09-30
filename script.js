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

// color box variables 
var text00Hour = 0; 
var text01Hour = 1;
var text02Hour = 2;
var text03Hour = 3;
var text04Hour = 4;
var text05Hour = 5;
var text06Hour = 6;
var text07Hour = 7;
var text08Hour = 8;
var text09Hour = 9;
var text10Hour = 10;
var text11Hour = 11;
var text12Hour = 12;
var text13Hour = 13;
var text14Hour = 14;
var text15Hour = 15;
var text16Hour = 16;
var text17Hour = 17;
var text18Hour = 18;
var text19Hour = 19;
var text20Hour = 20;
var text21Hour = 21;
var text22Hour = 22;
var text23Hour = 23;

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

//Needs:
//- clock running with moment.js and updating every second   ---DONE
//- event listeners on all buttons --- DONE, but could be jQuery ones
//- notes and send to local storage ---DONE
//- retrieve from local storage -- DONE
//- change text area background colors dynamically by hour
//


///----------------------------------------------------------------------CLOCK
let currentTimeClock = function () {
    let currentTime = moment().format("dddd, DD-MM-YYYY, kk:mm:ss");
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
    function compareTime01() {
        if (todayHours > text01Hour) {
            text01.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text01Hour) {
            text01.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text01.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime02() {
        if (todayHours > text02Hour) {
            text02.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text02Hour) {
            text02.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text02.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime03() {
        if (todayHours > text03Hour) {
            text03.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text03Hour) {
            text03.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text03.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime04() {
        if (todayHours > text04Hour) {
            text04.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text04Hour) {
            text04.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text04.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime05() {
        if (todayHours > text05Hour) {
            text05.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text05Hour) {
            text05.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text05.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime06() {
        if (todayHours > text06Hour) {
            text06.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text06Hour) {
            text06.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text06.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime07() {
        if (todayHours > text07Hour) {
            text07.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text07Hour) {
            text07.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text07.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime08() { // keep
        if (todayHours > text08Hour) {
            text08.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text08Hour) {
            text08.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text08.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime09() {
        if (todayHours > text09Hour) {
            text09.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text09Hour) {
            text09.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text09.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime10() {
        if (todayHours > text10Hour) {
            text10.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text10Hour) {
            text10.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text10.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime11() {
        if (todayHours > text11Hour) {
            text11.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text11Hour) {
            text11.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text11.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime12() {
        if (todayHours > text12Hour) {
            text12.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text12Hour) {
            text12.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text12.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime13() {
        if (todayHours > text13Hour) {
            text13.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text13Hour) {
            text13.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text13.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime14() {
        if (todayHours > text14Hour) {
            text14.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text14Hour) {
            text14.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text14.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime15() {
        if (todayHours > text15Hour) {
            text15.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text15Hour) {
            text15.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text15.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime16() {
        if (todayHours > text16Hour) {
            text16.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text16Hour) {
            text16.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text16.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime17() {
        if (todayHours > text17Hour) {
            text17.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text17Hour) {
            text17.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text17.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime18() {
        if (todayHours > text18Hour) {
            text18.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text18Hour) {
            text18.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text18.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime19() {
        if (todayHours > text19Hour) {
            text19.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text19Hour) {
            text19.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text19.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime20() {
        if (todayHours > text20Hour) {
            text20.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text20Hour) {
            text20.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text20.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime21() {
        if (todayHours > text21Hour) {
            text21.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text21Hour) {
            text21.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text21.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime22() {
        if (todayHours > text22Hour) {
            text22.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text22Hour) {
            text22.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text22.setAttribute("class", "present col-8 input-field description");
        }
    }
    function compareTime23() {
        if (todayHours > text23Hour) {
            text23.setAttribute("class", "past col-8 input-field description");
        }
        else if (todayHours < text23Hour) {
            text23.setAttribute("class", "future col-8 input-field description");
        }
        else {
            text23.setAttribute("class", "present col-8 input-field description");
        }
    }

    compareTime00();
    compareTime01();
    compareTime02();
    compareTime03();
    compareTime04();
    compareTime05();
    compareTime06();
    compareTime07();
    compareTime08();
    compareTime09();
    compareTime10();
    compareTime11();
    compareTime12();
    compareTime13();
    compareTime14();
    compareTime15();
    compareTime16();
    compareTime17();
    compareTime18();
    compareTime19();
    compareTime20();
    compareTime21();
    compareTime22();
    compareTime23();
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
function storeNotes01(event) {
    event.preventDefault();
    var notesHandOff = text01.value;
    notesArray[1] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes02(event) {
    event.preventDefault();
    var notesHandOff = text02.value;
    notesArray[2] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes03(event) {
    event.preventDefault();
    var notesHandOff = text03.value;
    notesArray[3] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes04(event) {
    event.preventDefault();
    var notesHandOff = text04.value;
    notesArray[4] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes05(event) {
    event.preventDefault();
    var notesHandOff = text05.value;
    notesArray[5] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes06(event) {
    event.preventDefault();
    var notesHandOff = text06.value;
    notesArray[6] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes07(event) {
    event.preventDefault();
    var notesHandOff = text07.value;
    notesArray[7] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes08(event) {
    event.preventDefault();
    var notesHandOff = text08.value;
    notesArray[8] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes09(event) {
    event.preventDefault();
    var notesHandOff = text09.value;
    notesArray[9] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes10(event) {
    event.preventDefault();
    var notesHandOff = text10.value;
    notesArray[10] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes11(event) {
    event.preventDefault();
    var notesHandOff = text11.value;
    notesArray[11] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes12(event) {
    event.preventDefault();
    var notesHandOff = text12.value;
    notesArray[12] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes13(event) {
    event.preventDefault();
    var notesHandOff = text13.value;
    notesArray[13] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes14(event) {
    event.preventDefault();
    var notesHandOff = text14.value;
    notesArray[14] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes15(event) {
    event.preventDefault();
    var notesHandOff = text15.value;
    notesArray[15] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes16(event) {
    event.preventDefault();
    var notesHandOff = text16.value;
    notesArray[16] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes17(event) {
    event.preventDefault();
    var notesHandOff = text17.value;
    notesArray[17] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes18(event) {
    event.preventDefault();
    var notesHandOff = text18.value;
    notesArray[18] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes19(event) {
    event.preventDefault();
    var notesHandOff = text19.value;
    notesArray[19] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes20(event) {
    event.preventDefault();
    var notesHandOff = text20.value;
    notesArray[20] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes21(event) {
    event.preventDefault();
    var notesHandOff = text21.value;
    notesArray[21] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes22(event) {
    event.preventDefault();
    var notesHandOff = text22.value;
    notesArray[22] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}
function storeNotes23(event) {
    event.preventDefault();
    var notesHandOff = text23.value;
    notesArray[23] = notesHandOff;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // syncing javascript array and local storage, add to local storage
    notesArray = JSON.parse(localStorage.getItem("notesArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local;
}

///-----------------------------------Clear notes function 
function clearNotes(event) {
    event.preventDefault();
    notesArray = localCheckVerify; // sets javascript session array to blank
    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // pushes to local store
    checkNotes(); // using the check notes function to clear values in note boxes 
}


//--------------------------------------------------------------EVENT LISTENERS
//------------------------------- Save buttons
btn00.addEventListener("click", storeNotes00);
btn01.addEventListener("click", storeNotes01);
btn02.addEventListener("click", storeNotes02);
btn03.addEventListener("click", storeNotes03);
btn04.addEventListener("click", storeNotes04);
btn05.addEventListener("click", storeNotes05);
btn06.addEventListener("click", storeNotes06);
btn07.addEventListener("click", storeNotes07);
btn08.addEventListener("click", storeNotes08);
btn09.addEventListener("click", storeNotes09);
btn10.addEventListener("click", storeNotes10);
btn11.addEventListener("click", storeNotes11);
btn12.addEventListener("click", storeNotes12);
btn13.addEventListener("click", storeNotes13);
btn14.addEventListener("click", storeNotes14);
btn15.addEventListener("click", storeNotes15);
btn16.addEventListener("click", storeNotes16);
btn17.addEventListener("click", storeNotes17);
btn18.addEventListener("click", storeNotes18);
btn19.addEventListener("click", storeNotes19);
btn20.addEventListener("click", storeNotes20);
btn21.addEventListener("click", storeNotes21);
btn22.addEventListener("click", storeNotes22);
btn23.addEventListener("click", storeNotes23);

//------------------------------- Clear button
clearButton.addEventListener("click", clearNotes);

// jquesy event listners that dont work
//$('btn00').click(storeNotes00);
//$('btn01').click(storeNotes01);
//$('btn02').click(storeNotes02);
//$('btn03').click(storeNotes03);
//$('btn04').click(storeNotes04);
//$('btn05').click(storeNotes05);
//$('btn06').click(storeNotes06);
//$('btn07').click(storeNotes07);
//$('btn08').click(storeNotes08);
//$('btn09').click(storeNotes09);
//$('btn10').click(storeNotes10);
//$('btn11').click(storeNotes11);
//$('btn12').click(storeNotes12);
//$('btn13').click(storeNotes13);
//$('btn14').click(storeNotes14);
//$('btn15').click(storeNotes15);
//$('btn16').click(storeNotes16);
//$('btn17').click(storeNotes17);
//$('btn18').click(storeNotes18);
//$('btn19').click(storeNotes19);
//$('btn20').click(storeNotes20);
//$('btn21').click(storeNotes21);
//$('btn22').click(storeNotes22);
//$('btn23').click(storeNotes23);
//

//00
//01
//02
//03
//04
//05
//06
//07
//08
//09
//10
//11
//12
//13
//14
//15
//16
//17
//18
//19
//20
//21
//22
//23
//