///Variables
var cityArray = [];
var localStorageArray = [];
var clearArray = [];
var geoLat = "";
var geoLon = "";
var dataGeoBadCheck = [];
var newCityRow = $('newCityRow');
var tempCity = "";

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
    //for (i = 0; i < cityArray.length; i++) { // checks for explicit duplicates
    //    if (tempCity == cityArray[i]) {
    //        $("#newCitySearchField").val('');
    //        console.log("1 store");
    //    }
    //    else {
    //    }
    //}
    //console.log("2 store");
    //console.log(tempCity + " temp city storecity");
    cityArray.push(tempCity);
    localStorage.setItem("cityArray", JSON.stringify(cityArray));  // syncing javascript array and local storage, add to local storage
    cityArray = JSON.parse(localStorage.getItem("cityArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local
    $("#newCitySearchField").val('');



}

//------------------sync cities function-------------------------------
function checkCities() {
    if (localStorage.getItem("cityArray") === null) { // if the local storage array is null, we skip syncing.
        return;
    }
    else {
        localStorageArray = JSON.parse(localStorage.getItem("cityArray")); // if not null, make it var local check.
    }
    if (localStorageArray.length > cityArray.length) { // if local storage is not empty, we sync our javascript session array to local one.
        cityArray = localStorageArray;
        console.log(cityArray);
    }
}
checkCities(); //--- syncing runs immediately upon loading the page


//////////////////////////////////////////////////////////////////////////////////////////////////= Fetches =////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------Fetching data from weather API
function fetchWeather() {
    $("#badNewCity").attr("style", "display:none"); // reset bad city alert

    locationInputText = locationInput.val(); // get field value
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
            //console.log(dataGeo);
            //console.log(dataGeo.length + "dataGeoBadCheck");
            dataGeoBadCheck = dataGeo;
            //console.log(dataGeoBadCheck.length);
            if (dataGeoBadCheck.length === 0) { // displays alerts if there is a bad city
                $("#badNewCity").attr("style", "display:inherit");
                //console.log(weatherUrl);
                //console.log("^^^^^^");
                return fetch(weatherUrlEx); // handles bad result by feeding the fetch the default city
            }
            else {
                geoLat = dataGeo[0].lat;
                geoLon = dataGeo[0].lon;
                //console.log(geoLat + " la");
                //console.log(geoLon + " lo");
                weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLat + '&lon=' + geoLon + '&units=metric&appid=86369859ce9d4d2c8dd6eec9149bddeb';
                //console.log(weatherUrl);
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
            console.log(cityArray);
            tempCity = $("#newCitySearchField").val();
            storeCity();
        });
}

//---------------------------------------------Fetch previous city (skips store function)
function fetchPrevious() {
    $("#badNewCity").attr("style", "display:none"); // reset bad city alert

    locationInputText = locationInput.val(); // get field value
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


///-----------------------------------Clear notes function 
function clearCities(event) {
    event.preventDefault();
    cityArray = clearArray; // sets javascript session array to blank
    localStorage.setItem("cityArray", JSON.stringify(cityArray));  // pushes to local store
    $("#newCitySearchField").val('');

}

//--------------------------------------------------------------EVENT LISTENERS
//------------------------------- Save buttons
$("#submitButton").on('click', fetchWeather);
$("#clearButton").on('click', clearCities);
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
*/