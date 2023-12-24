const weatherDash = document.querySelector("#weatherDash")
const citySearch = document.querySelector("#citySearchBtn")
const recentSearch = document.querySelector("#recentSearch")
const citySearchDOM = document.querySelector("#citySearchDOM")
let displayWeather = document.querySelector("#displayWeather")
let displayWeatherTemp = document.querySelector("#displayWeatherTemp")
let displayWeatherTempMax = document.querySelector("#displayWeatherTempMax");
let displayWeatherTempMin = document.querySelector("#displayWeatherTempMin")

let citySearchData = [];







function weatherFxn(cityChosen) {
    
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityChosen},US&limit=1&appid=d06852fbd917e494e3886672e9ac36cf`)
    .then(res => {
        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
    return res.json();
    })
    .then(data => {

        citySearchData = data;
        console.log(data);
        let lat = citySearchData["0"]["lat"]
        let lon = citySearchData["0"]["lon"]
    

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=d06852fbd917e494e3886672e9ac36cf`)
    .then(res => {
        if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
    return res.json();
    })
    .then(data => {
        
        if(data.Response === "False") {
            console.log("this is an invalid response, try again");
            throw new Error("THIS IS AN ERROR");
        }
        weatherSearchData = data;
        console.log(weatherSearchData)
        for(let i = 0; i < 1; i++){
            let day1Div = document.createElement('li')
            day1Div.setAttribute('id', `displayWeatherTemp${i}`);

            
            let dayWeatherTemp = weatherSearchData["list"][i]["main"]["temp"];
            // let dayWeatherTempMax = weatherSearchData["list"][i]["main"]["temp_max"];
            // let dayWeatherTempMin = weatherSearchData["list"][i]["main"]["temp_min"]
            displayWeatherTemp.textContent = dayWeatherTemp;
            // displayWeatherTempMax.textContent = dayWeatherTempMax;
            // displayWeatherTempMin.textContent = dayWeatherTempMin;
        }
    })
})
}

citySearch.addEventListener("click", function (event) {

    event.preventDefault();
    let cityChosen = citySearchDOM.value;
    citySearchDOM.value = '';
    weatherFxn(cityChosen);
});