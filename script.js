const weatherDash = document.querySelector("#weatherDash")
const citySearch = document.querySelector("#citySearchBtn")
const recentSearch = document.querySelector("#recentSearch")
const citySearchDOM = document.querySelector("#citySearchDOM")

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
    

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d06852fbd917e494e3886672e9ac36cf`)
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
    })
})
}

citySearch.addEventListener("click", function (event) {

    event.preventDefault();
    let cityChosen = citySearchDOM.value;
    citySearchDOM.value = '';
    weatherFxn(cityChosen);
});