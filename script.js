///Variables
var timeNow = moment();
var notesArray = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
var localCheck = [];
var localCheckVerify = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
var notesInput = document.getElementById("initialsText");
var geoLat = "";
var geoLon = "";


//textarea variables
var text00 = document.getElementById("text00");

//button variables
var btn00 = document.querySelector("#btn00");


var clearButton = document.querySelector("#clearButton");

var weatherTodayUrl = ''
var weatherTodayUrlex = 'https://api.openweathermap.org/data/2.5/onecall?lat=43.0748&lon=-89.3838&units=metric&appid=86369859ce9d4d2c8dd6eec9149bddeb';
var geoUrl = ''
var geoUrlex = 'http://api.openweathermap.org/geo/1.0/direct?q=madison,wi,usa&limit=5&appid=86369859ce9d4d2c8dd6eec9149bddeb';



//-----------------------------------------------------------------Fetching data from weather API
function fetchWeather() {
    fetch(geoUrlex)
        .then(function (response) {
            return response.json();
        })
        .then(function (dataGeo) {
            console.log(dataGeo);
            console.log(dataGeo[0].name);
            console.log(dataGeo[0].lat);
            console.log(dataGeo[0].lon);
            var geoLat = dataGeo[0].lat;
            var geoLon = dataGeo[0].lon;
            console.log(geoLat + " la");
            console.log(geoLon + " lo");

            return fetch(weatherTodayUrlex);

        })

        .then(function (response) {
            return response.json();
        })
        .then(function (dataWeather) {
            console.log(dataWeather);
            console.log(dataWeather.current);
            console.log(dataWeather.current.humidity);
            console.log(dataWeather.current.temp);
            console.log(dataWeather.current.dt); //unix date
            console.log(dataWeather.current.weather[0].main); // i.e "clouds, sunny"
            console.log(dataWeather.current.wind_speed);
            console.log(dataWeather.current.uvi);

            var fiveDayObj = {};
            for ( i = 1; i < 6; i++) {
                fiveDayObj[i] = [dataWeather.daily[i].humidity, dataWeather.daily[i].temp.day, moment.unix(dataWeather.daily[i].dt).format("dddd, MMM Do, YYYY"), dataWeather.daily[i].weather[0].main, dataWeather.daily[i].wind_speed, dataWeather.daily[i].uvi];
            //console.log(dataWeather.daily[i]);
            //console.log(dataWeather.daily[i].humidity);
            //console.log(dataWeather.daily[i].temp);
            //console.log(dataWeather.daily[i].dt); //unix date
            //console.log(dataWeather.daily[i].weather[0].main); // i.e "clouds, sunny"
            //console.log(dataWeather.daily[i].wind_speed);
            //console.log(dataWeather.daily[i].uvi);
            }   
            console.log(fiveDayObj);
        });
}
fetchWeather();


////-----------------------------------------------------------------Fetching data from geo API
//function fetchGeo() {
//    fetch(geoUrlex)
//        .then(function (response) {
//            return response.json();
//        })
//        .then(function (dataGeo) {
//            console.log(dataGeo);
//            console.log(dataGeo[0].name);
//            console.log(dataGeo[0].lat);
//            console.log(dataGeo[0].lon);
//        });
//}
//fetchGeo();
//

// 43°04′29″N 89°23′03″W   http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=86369859ce9d4d2c8dd6eec9149bddeb
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=86369859ce9d4d2c8dd6eec9149bddeb   --- weather
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=86369859ce9d4d2c8dd6eec9149bddeb    --- geo


///----------------------------------------------------------------------CLOCK
let currentTimeClock = function () {
    let currentTime = moment().format("dddd, MMM Do, YYYY  |  kk:mm:ss");
    $("#currentTimeText").text(currentTime);
};
currentTimeClock();
setInterval(currentTimeClock, 1000);



















//
//function fetchWeather() {
//    fetch(geoUrlex)
//    .then(function (response) {
//        return response.json();
//    })
//    .then(function (dataGeo) {
//        console.log(dataGeo);
//        console.log(dataGeo[0].name);
//        console.log(dataGeo[0].lat);
//        console.log(dataGeo[0].lon);
//        
//    });
//    
//    
//    
//        fetch(weatherTodayUrlex)
//
//        .then(function (response) {
//            return response.json();
//        })
//        .then(function (dataWeather) {
//            console.log(dataWeather);
//            console.log(dataWeather.current);
//            console.log(dataWeather.current.humidity);
//            console.log(dataWeather.current.temp);
//            console.log(dataWeather.current.dt); //unix date
//            console.log(dataWeather.current.weather[0].main); // i.e "clouds, sunny"
//            console.log(dataWeather.current.wind_speed);
//            console.log(dataWeather.current.uvi);
//            
//            console.log(dataWeather);
//            console.log(dataWeather.daily[0]);
//            console.log(dataWeather.daily[0].humidity);
//            console.log(dataWeather.daily[0].temp);
//            console.log(dataWeather.daily[0].dt); //unix date
//            console.log(dataWeather.daily[0].weather[0].main); // i.e "clouds, sunny"
//            console.log(dataWeather.daily[0].wind_speed);
//            console.log(dataWeather.daily[0].uvi);
//            
//        });
//}
//fetchWeather();
//






























//-----------------------------------------------------------------COLOR SWAPPING
/*
function colorSwap() {
    $("#text00").class(".present");
}
colorSwap();
*/
/*
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
*/

/*
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
*/
/*
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
*/

/////-----------------------------------Clear notes function 
//function clearNotes(event) {
//    event.preventDefault();
//    notesArray = localCheckVerify; // sets javascript session array to blank
//    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // pushes to local store
//    checkNotes(); // using the check notes function to clear values in note boxes 
//}

//-------------------------------------- Get Weather function 
//function getWeather {

//}



//--------------------------------------------------------------EVENT LISTENERS
//------------------------------- Save buttons
//$("#submitButton").on('click', getWeather)

//------------------------------- Clear button
//clearButton.addEventListener("click", clearNotes);
