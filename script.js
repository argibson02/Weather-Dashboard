///Variables
var cityArray = [];
var geoLat = "";
var geoLon = "";
var dataGeoBadCheck = [];
var newCityRow = $('newCityRow')

//textarea variables
var locationInput = $("#newCitySearchField");

//button variables
//var clearButton = document.querySelector("#clearButton");

var weatherUrl = '';
var weatherUrlEx = 'https://api.openweathermap.org/data/2.5/onecall?lat=43.0748&lon=-89.3838&units=metric&appid=86369859ce9d4d2c8dd6eec9149bddeb';
var geoUrl = '';


///----------------------------------------------------------------------CLOCK
let currentTimeClock = function () {
    let currentTime = moment().format("dddd, MMM Do, YYYY  |  kk:mm:ss");
    $("#currentTimeText").text(currentTime);
};
currentTimeClock();
setInterval(currentTimeClock, 1000);


///---------------storing city functions----------------------------------------------
function storeCity() {
    var locationText = locationInput.val();
    cityArray.push(locationText);
    localStorage.setItem("cityArray", JSON.stringify(cityArray));  // syncing javascript array and local storage, add to local storage
    cityArray = JSON.parse(localStorage.getItem("cityArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local
}



//////////////////////////////////////////////////////////////////////////////////////////////////= Fetches =////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------Fetching data from weather API
function fetchWeather() {
    $("#badNewCity").attr("style", "display:none"); // reset bad city alert

    locationInputText = locationInput.val();// get field value
    if (locationInputText === "") { // does nothing on empty strings
        return;
    }
    else {
        locationInputText = locationInputText.trim(); //remove trailing spaces
        locationInputText = locationInputText.split(" ").join(""); //remove spaces between words
        geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + locationInputText + '&limit=1&appid=86369859ce9d4d2c8dd6eec9149bddeb';
        console.log(locationInputText + "~loc input text");
        console.log(geoUrl + " geoURL");
    }

    fetch(geoUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (dataGeo) {
            console.log(dataGeo);
            console.log(dataGeo.length + "dataGeoBadCheck");
            dataGeoBadCheck = dataGeo;
            console.log(dataGeoBadCheck.length);
            if (dataGeoBadCheck.length === 0) { // displays alerts if there is a bad city
                $("#badNewCity").attr("style", "display:inherit");
                console.log(weatherUrl);
                console.log("^^^^^^");
                return fetch(weatherUrlEx); // handles bad result by feeding the fetch the default city
            }
            else {
                storeCity();
                geoLat = dataGeo[0].lat;
                geoLon = dataGeo[0].lon;
                console.log(geoLat + " la");
                console.log(geoLon + " lo");
                weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLat + '&lon=' + geoLon + '&units=metric&appid=86369859ce9d4d2c8dd6eec9149bddeb';
                console.log(weatherUrl);
                return fetch(weatherUrl);
            }
        })


        .then(function (response) {
            return response.json();
        })
        .then(function (dataWeather) {
            //console.log(dataWeather);
            currentDayArr = [dataWeather.current.humidity, dataWeather.current.temp, moment.unix(dataWeather.current.dt).format("dddd, MMM Do, YYYY"), dataWeather.current.weather[0].main, dataWeather.current.wind_speed, dataWeather.current.uvi];
            //console.log(dataWeather.current);
            //console.log(dataWeather.current.humidity);
            //console.log(dataWeather.current.temp);
            //console.log(dataWeather.current.dt); //unix date
            //console.log(dataWeather.current.weather[0].main); // i.e "clouds, sunny"
            //console.log(dataWeather.current.wind_speed);
            //console.log(dataWeather.current.uvi);
            console.log(currentDayArr);

            fiveDayObj = {};
            for (i = 1; i < 6; i++) {
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
    $("#newCitySearchField").val('');
}

//---------------------------------------------Fetch previous city (skips store function)
function fetchPrevious() {
    $("#badNewCity").attr("style", "display:none"); // reset bad city alert

    locationInputText = locationInput.val();// get field value
    locationInputText = locationInputText.trim(); //remove trailing spaces
    locationInputText = locationInputText.split(" ").join(""); //remove spaces between words
    geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + locationInputText + '&limit=1&appid=86369859ce9d4d2c8dd6eec9149bddeb';
    console.log(locationInputText + "~loc input text");
    console.log(geoUrl + " geoURL");

    fetch(geoUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (dataGeo) {
            dataGeoBadCheck = dataGeo;
            if (dataGeoBadCheck.length === 0) { // displays alerts if there is a bad city
                $("#badNewCity").attr("style", "display:inherit");
                console.log(weatherUrl);
                return fetch(weatherUrlEx); // handles bad result by feeding the fetch the default city
            }
            else {
                geoLat = dataGeo[0].lat;
                geoLon = dataGeo[0].lon;
                weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLat + '&lon=' + geoLon + '&units=metric&appid=86369859ce9d4d2c8dd6eec9149bddeb';
                console.log(weatherUrl);
                return fetch(weatherUrl);
            }
        })

        .then(function (response) {
            return response.json();
        })
        .then(function (dataWeather) {
            currentDayArr = [dataWeather.current.humidity, dataWeather.current.temp, moment.unix(dataWeather.current.dt).format("dddd, MMM Do, YYYY"), dataWeather.current.weather[0].main, dataWeather.current.wind_speed, dataWeather.current.uvi];
            console.log(currentDayArr);

            fiveDayObj = {};
            for (i = 1; i < 6; i++) {
                fiveDayObj[i] = [dataWeather.daily[i].humidity, dataWeather.daily[i].temp.day, moment.unix(dataWeather.daily[i].dt).format("dddd, MMM Do, YYYY"), dataWeather.daily[i].weather[0].main, dataWeather.daily[i].wind_speed, dataWeather.daily[i].uvi];
            }
            console.log(fiveDayObj);
        });
    $("#newCitySearchField").val('');
}

//----------------------------------------------fetch for default city
function fetchDefault() {
    fetch(weatherUrlEx)
        .then(function (response) {
            return response.json();
        })
        .then(function (dataWeather) {
            currentDayArr = [dataWeather.current.humidity, dataWeather.current.temp, moment.unix(dataWeather.current.dt).format("dddd, MMM Do, YYYY"), dataWeather.current.weather[0].main, dataWeather.current.wind_speed, dataWeather.current.uvi];

            fiveDayObj = {};
            for (i = 1; i < 6; i++) {
                fiveDayObj[i] = [dataWeather.daily[i].humidity, dataWeather.daily[i].temp.day, moment.unix(dataWeather.daily[i].dt).format("dddd, MMM Do, YYYY"), dataWeather.daily[i].weather[0].main, dataWeather.daily[i].wind_speed, dataWeather.daily[i].uvi];
            }
        });
}
fetchDefault();





//--------------------------------------------------------------EVENT LISTENERS
//------------------------------- Save buttons
$("#submitButton").on('click', fetchWeather);
$(".cityBtn").on("click", function () {
    var cityName = $(this).attr("id");
    console.log("test");
    console.log(cityName);
    $("#newCitySearchField").val(cityName);
    fetchPrevious();
});






//-----------------------------------------------------------------COLOR SWAPPING
/*
function colorSwap() {
    $("#text00").class(".present");
}
colorSwap();

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
*/

/////-----------------------------------Clear notes function 
//function clearNotes(event) {
//    event.preventDefault();
//    notesArray = localCheckVerify; // sets javascript session array to blank
//    localStorage.setItem("notesArray", JSON.stringify(notesArray));  // pushes to local store
//    checkNotes(); // using the check notes function to clear values in note boxes 
//