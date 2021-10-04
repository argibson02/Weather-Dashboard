///Variables
var cityArray = [];
var localStorageArray = [];
var clearArray = [];
var geoLat = "";
var geoLon = "";
var dataGeoBadCheck = [];
var newCityRow = $('newCityRow');
var tempCity = "";
//var fiveDayObj = {};

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

    var addBtn = $("#newCityBtn").append("<button>" + rawCity + "</button>");
    $("#newCityBtn").children().attr("class", "row btn btn-info m-1 mb-2 w-100 cityBtn");
    $("#newCityBtn").children().last().attr("id", rawCity);
    console.log(cityArray);
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
        for (i = 0; i < cityArray.length; i++) {
            $("#newCityBtn").append("<button>" + cityArray[i] + "</button>");
            $("#newCityBtn").children().attr("class", "row btn btn-info m-1 mb-2 w-100 cityBtn");
            $("#newCityBtn").children().last().attr("id", cityArray[i]);
            //addBtn.attr("id", cityArray[i]);
            //console.log($("#newCityBtn").eq([i]));
            //$("#newCityBtn").eq([i]).attr("class", "row btn btn-info m-1 mb-2 w-75 cityBt");
            //$("#newCityBtn").eq([i]).attr(;
        }
    }

}
checkCities(); //--- syncing runs immediately upon loading the page


function generateIcon() {

}



function generateCards() {

    for (i = 1; i < 6; i++) {
        $("#cardHolder").children().attr("class", "row btn btn-info m-1 mb-2 w-100 cityBtn");
        $("#cardHolder").children().last().attr("id", rawCity);





        //fiveDayObj[i].humidity
        //fiveDayObj[i].temp
        //fiveDayObj[i].date
        //fiveDayObj[i].weather
        //fiveDayObj[i].wind
        //fiveDayObj[i].uvi




    }

}



//////////////////////////////////////////////////////////////////////////////////////////////////= Fetches =////////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------------------------------------------Fetching data from weather API
function fetchWeather() {
    $("#badNewCity").attr("style", "display:none"); // reset bad city alert

    locationInputText = locationInput.val(); // get field value
    if (locationInputText === "") { // does nothing on empty strings
        return;
    }
    else {
        rawCity = locationInputText;
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
            dataGeoBadCheck = dataGeo;
            if (dataGeoBadCheck.length === 0) { // displays alerts if there is a bad city
                $("#badNewCity").attr("style", "display:inherit");
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
            currentDayArr = [dataWeather.current.humidity, dataWeather.current.temp, moment.unix(dataWeather.current.dt).format("dddd, MMM Do, YYYY"), dataWeather.current.weather[0].main, dataWeather.current.wind_speed, dataWeather.current.uvi,dataWeather.current.weather[0].icon];
            console.log(currentDayArr);

            for (i = 1; i < 6; i++) {
                fiveDayObj[i] = 
                    {
                        "humidity": dataWeather.daily[i].humidity,
                        "temp": dataWeather.daily[i].temp.day,
                        "date": moment.unix(dataWeather.daily[i].dt).format("dddd, MMM Do, YYYY"),
                        "weather": dataWeather.daily[i].weather[0].main,
                        "wind": dataWeather.daily[i].wind_speed,
                        "uvi": dataWeather.daily[i].uvi,
                        "icon": dataWeather.daily[i].weather[0].icon,
                    }
                //generateCards();
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
            currentDayArr = [dataWeather.current.humidity, dataWeather.current.temp, moment.unix(dataWeather.current.dt).format("dddd, MMM Do, YYYY"), dataWeather.current.weather[0].main, dataWeather.current.wind_speed, dataWeather.current.uvi,dataWeather.current.weather[0].icon];
            console.log(currentDayArr);

            for (i = 1; i < 6; i++) {
                fiveDayObj[i] = 
                    {
                        "humidity": dataWeather.daily[i].humidity,
                        "temp": dataWeather.daily[i].temp.day,
                        "date": moment.unix(dataWeather.daily[i].dt).format("dddd, MMM Do, YYYY"),
                        "weather": dataWeather.daily[i].weather[0].main,
                        "wind": dataWeather.daily[i].wind_speed,
                        "uvi": dataWeather.daily[i].uvi,
                        "icon": dataWeather.daily[i].weather[0].icon,
                    }
                //generateCards();
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
            currentDayArr = [dataWeather.current.humidity, dataWeather.current.temp, moment.unix(dataWeather.current.dt).format("dddd, MMM Do, YYYY"), dataWeather.current.weather[0].main, dataWeather.current.wind_speed, dataWeather.current.uvi,dataWeather.current.weather[0].icon];
            
            for (i = 1; i < 6; i++) {
                fiveDayObj[i] = 
                    {
                        "humidity": dataWeather.daily[i].humidity,
                        "temp": dataWeather.daily[i].temp.day,
                        "date": moment.unix(dataWeather.daily[i].dt).format("dddd, MMM Do, YYYY"),
                        "weather": dataWeather.daily[i].weather[0].main,
                        "wind": dataWeather.daily[i].wind_speed,
                        "uvi": dataWeather.daily[i].uvi,
                        "icon": dataWeather.daily[i].weather[0].icon,
                    }
                //generateCards();
            }
            console.log(fiveDayObj);
        });
}
fetchDefault();


///-----------------------------------Clear notes function 
function clearCities(event) {
    event.preventDefault();
    cityArray = clearArray; // sets javascript session array to blank
    localStorage.setItem("cityArray", JSON.stringify(cityArray));  // pushes to local store
    $("#newCitySearchField").val('');
    $("#newCityBtn").empty();

}

//--------------------------------------------------------------EVENT LISTENERS
//------------------------------- Save buttons
$("#submitButton").on('click', fetchWeather);
$("#clearButton").on('click', clearCities);
$(".cityBtn").on("click", function () {
    console.log($(this).attr("id"));
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
    for (i = 0; i < 5; i++) {
        var uvi = $(".")

        if (todayHours > text00Hour) {
            text00.setAttribute("class", "uvBox uvPurple cardLine");
        }
        else if (todayHours < text00Hour) {
            text00.setAttribute("class", "fuvBox uvPurple cardLine");
        }
        else {
            text00.setAttribute("class", "uvBox uvPurple cardLine");
        }
    }

}
colorSwap();
*/