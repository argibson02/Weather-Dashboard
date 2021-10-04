///Variables
//---city arrays
var cityArray = [];
var localStorageArray = [];
var clearArray = [];

//--temporary geo vars
var geoLat = "";
var geoLon = "";
var dataGeoBadCheck = [];

//--temporary holding vars
var tempCity = "";
var headerName = "";

//------weather object var
var fiveDayObj = {};

// text filed var
var locationInput = $("#newCitySearchField");

//---- url vars
var weatherUrl = '';
var weatherUrlEx = 'https://api.openweathermap.org/data/2.5/onecall?lat=43.0748&lon=-89.3838&units=metric&appid=86369859ce9d4d2c8dd6eec9149bddeb';
var geoUrl = '';
var geoUrlEx = 'http://api.openweathermap.org/geo/1.0/direct?q=madison,wi,usa&limit=5&appid=86369859ce9d4d2c8dd6eec9149bddeb';



///----------------------------------------------------------------------CLOCK
let currentTimeClock = function () {
    let currentTime = moment().format("dddd, MMM Do, YYYY  |  kk:mm:ss");
    $("#currentTimeText").text(currentTime);
};
currentTimeClock();
setInterval(currentTimeClock, 1000);


///---------------storing city functions----------------------------------------------
function storeCity() {
    cityArray.push(tempCity);
    localStorage.setItem("cityArray", JSON.stringify(cityArray));  // syncing javascript array and local storage, add to local storage
    cityArray = JSON.parse(localStorage.getItem("cityArray")); //Array is stored as string in local storage. Grabbing it as an array and re-syncing the javascript array with local
    $("#newCitySearchField").val('');

    $("#newCityBtn").append("<button>" + rawCity + "</button>");
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
            $("#newCityBtn").children().last().attr("id", cityArray[i]); ///////////////////NO TOUCH
        }
    }
}
checkCities(); //--- syncing runs immediately upon loading the page


//------------------------------------------------function to write the cards
function writeCards() {
    $("#cityHeader").html(headerName);

    for (i = 0; i < 6; i++) {
        var date = fiveDayObj[i].date;
        $("#date" + i).html(date);
        var weather = fiveDayObj[i].weather;
        $("#weather" + i).html(weather);
        var temp = fiveDayObj[i].temp;
        $("#temp" + i).html(temp);
        var icon = "http://openweathermap.org/img/wn/" + fiveDayObj[i].icon + "@2x.png";
        console.log(icon);
        $("#icon" + i).attr("src", icon);
        var humidity = fiveDayObj[i].humidity;
        $("#humidity" + i).html(humidity);
        var wind = fiveDayObj[i].wind;
        $("#wind" + i).html(wind);
        var uvi = fiveDayObj[i].uvi;
        $("#uvi" + i).html(uvi);

        if (uvi > 10) {
            $("#uvi" + i).parent().addClass("uvPurple");
        }
        else if (uvi >= 8) {
            $("#uvi" + i).parent().addClass("uvRed");
        }
        else if (uvi >= 6) {
            $("#uvi" + i).parent().addClass("uvOrange");
        }
        else if (uvi >= 3) {
            $("#uvi" + i).parent().addClass("uvYellow");
        }
        else if (uvi >= 0) {
            $("#uvi" + i).parent().addClass("uvGreen");
        } 
    }
    return;
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
        //console.log(locationInputText + "~loc input text");
        //console.log(geoUrl + " geoURL");
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
                //console.log(dataGeo[0]);
                headerName = dataGeo[0].name + " ," + dataGeo[0].state;
                //console.log(headerName);
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
            //currentDayArr = [moment.unix(dataWeather.current.dt).format("dddd, MMM Do, YYYY"), dataWeather.current.weather[0].main, dataWeather.current.weather[0].icon, dataWeather.current.temp,dataWeather.current.humidity, dataWeather.current.wind_speed, dataWeather.current.uvi];
            //console.log(currentDayArr);
            for (i = 0; i < 6; i++) {
                fiveDayObj[i] = 
                    {
                        "humidity": dataWeather.daily[i].humidity,
                        "temp": dataWeather.daily[i].temp.day,
                        "date": moment.unix(dataWeather.daily[i].dt).format("dddd, MMM Do, YYYY"),
                        "weather": dataWeather.daily[i].weather[0].main,
                        "wind": dataWeather.daily[i].wind_speed,
                        "uvi": dataWeather.daily[i].uvi,
                        "icon": dataWeather.daily[i].weather[0].icon,
                    };
                writeCards();
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
    //console.log(locationInputText + "~loc input text");
    //console.log(geoUrl + " geoURL");

    fetch(geoUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (dataGeo) {
            dataGeoBadCheck = dataGeo;
            if (dataGeoBadCheck.length === 0) { // displays alerts if there is a bad city
                $("#badNewCity").attr("style", "display:inherit");
                //console.log(weatherUrl);
                return fetch(weatherUrlEx); // handles bad result by feeding the fetch the default city
            }
            else {
                geoLat = dataGeo[0].lat;
                geoLon = dataGeo[0].lon;
                console.log(dataGeo[0]);
                headerName = dataGeo[0].name + " ," + dataGeo[0].state;
                console.log(headerName);
                weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLat + '&lon=' + geoLon + '&units=metric&appid=86369859ce9d4d2c8dd6eec9149bddeb';
                //console.log(weatherUrl);
                return fetch(weatherUrl);
            }
        })

        .then(function (response) {
            return response.json();
        })
        .then(function (dataWeather) {
            //currentDayArr = [moment.unix(dataWeather.current.dt).format("dddd, MMM Do, YYYY"), dataWeather.current.weather[0].main, dataWeather.current.weather[0].icon, dataWeather.current.temp,dataWeather.current.humidity, dataWeather.current.wind_speed, dataWeather.current.uvi];
                //console.log(currentDayArr);

            for (i = 0; i < 6; i++) {
                fiveDayObj[i] = 
                    {
                        "date": moment.unix(dataWeather.daily[i].dt).format("dddd, MMM Do, YYYY"),
                        "weather": dataWeather.daily[i].weather[0].main,
                        "icon": dataWeather.daily[i].weather[0].icon,
                        "temp": dataWeather.daily[i].temp.day,
                        "humidity": dataWeather.daily[i].humidity,
                        "wind": dataWeather.daily[i].wind_speed,
                        "uvi": dataWeather.daily[i].uvi,
                    };
                writeCards();
            }
            //console.log(fiveDayObj);
        });
    $("#newCitySearchField").val('');
}

//----------------------------------------------fetch for default city
function fetchDefault() {

    fetch(geoUrlEx)
        .then(function (response) {
            return response.json();
        })
        .then(function (dataGeo) {
                headerName = dataGeo[0].name + " ," + dataGeo[0].state;
                return fetch(weatherUrlEx);
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (dataWeather) {
            //console.log(dataWeather);
            //currentDayArr = [moment.unix(dataWeather.current.dt).format("dddd, MMM Do, YYYY"), dataWeather.current.weather[0].main, dataWeather.current.weather[0].icon, dataWeather.current.temp,dataWeather.current.humidity, dataWeather.current.wind_speed, dataWeather.current.uvi];
            //console.log(currentDayArr);
            for (i = 0; i < 6; i++) {
                fiveDayObj[i] = 
                    {
                        "humidity": dataWeather.daily[i].humidity,
                        "temp": dataWeather.daily[i].temp.day,
                        "date": moment.unix(dataWeather.daily[i].dt).format("dddd, MMM Do, YYYY"),
                        "weather": dataWeather.daily[i].weather[0].main,
                        "wind": dataWeather.daily[i].wind_speed,
                        "uvi": dataWeather.daily[i].uvi,
                        "icon": dataWeather.daily[i].weather[0].icon,
                    };
            }
            //console.log(fiveDayObj);
            writeCards();
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
    $("#badNewCity").attr("style", "display:none"); // reset bad city alert
}

//-------------------------------------------------------------- BUTTON EVENT LISTENERS
$("#submitButton").on('click', fetchWeather);
$("#clearButton").on('click', clearCities);
$(".cityBtn").on("click", function () {
    //console.log($(this).attr("id"));
    var cityName = $(this).attr("id");
    //console.log("test");
    //console.log(cityName);
    $("#newCitySearchField").val(cityName);
    fetchPrevious();
});