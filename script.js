const weatherDash = document.querySelector("#weatherDash")
const citySearch = document.querySelector("#citySearchBtn")
let recentSearch = document.querySelector("#recentSearch")
const citySearchDOM = document.querySelector("#citySearchDOM")
let displayWeather = document.querySelector("#displayWeather")
let bodyWeatherInfo = document.getElementsByClassName('body-weather-info')
let citySearchData;
let flexResultBody;




displayRecentSearches();

function weatherFxn(cityChosen) {

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityChosen},US&limit=1&appid=d06852fbd917e494e3886672e9ac36cf`)
        .then(res => {
            if (!res.ok) {
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
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {

                    if (data.Response === "False") {
                        console.log("this is an invalid response, try again");
                        throw new Error("THIS IS AN ERROR");
                    }
                    weatherSearchData = data;
                    console.log(weatherSearchData)
                    // displayWeather.textContent = "Showing Weather in: " + weatherSearchData["city"]["name"] + ", " + weatherSearchData["city"]["country"];
                    flexResultBody = document.createElement('div');
                    flexResultBody.classList.add('body-weather-info');
                    document.body.appendChild(flexResultBody);

                    for (let i = 0; i < weatherSearchData.list.length; i += 8) {
                        const flexContainer = document.createElement('div');
                        flexContainer.classList.add('weather-info-container');
                        // Create new DOM elements for each iteration
                        let weatherDescEmoji;
                        const displayDate = document.createElement('div');
                        const displayIcon = document.createElement('div');
                        const displayWeatherTemp = document.createElement('div');
                        const displayWeatherHum = document.createElement('div');
                        const displayWeatherWind = document.createElement('div');
                        const weatherDesc = weatherSearchData['list'][i]['weather'][0]['description']

                                const dateString = weatherSearchData["list"][i]['dt_txt'];
                                const [datePart] = dateString.split(' ');
                                const [year, month, day] = datePart.split('-');
                                const formattedDate = `${month}/${day}/${year}`;

                                if (weatherDesc.includes('clear')) {
                                    weatherDescEmoji= "&#9728;";
                                  } else if (weatherDesc.includes('clouds') || weatherDesc.includes('overcast')) {
                                    weatherDescEmoji= '&#127780;';
                                  } else if (weatherDesc.includes('rain')) {
                                    weatherDescEmoji= '&#127783;';
                                  } else if (weatherDesc.includes('snow')) {
                                    weatherDescEmoji= '&#10054;';
                                  } else if (weatherDesc.includes('thunderstorm')) {
                                    weatherDescEmoji= '&#127785;';
                                  } else {
                                    weatherDescEmoji= '&#127752;'; // return a default icon class
                                  }
                        
                        displayDate.textContent = formattedDate;
                        displayIcon.innerHTML = weatherDescEmoji;
                        displayWeatherTemp.textContent = "Avg Temp: " + weatherSearchData["list"][i]["main"]["temp"] + " °F";
                        displayWeatherHum.textContent = "Humidity: " + weatherSearchData["list"][i]["main"]['humidity'] + "%";
                        displayWeatherWind.textContent = "Wind: " + weatherSearchData["list"][i]["wind"]['speed'] + "MPH";

                        // Append the elements to a container in the DOM
                        flexResultBody.appendChild(flexContainer);
                        flexContainer.appendChild(displayDate);
                        flexContainer.appendChild(displayIcon);
                        flexContainer.appendChild(displayWeatherTemp);
                        flexContainer.appendChild(displayWeatherHum);
                        flexContainer.appendChild(displayWeatherWind);
                    }


                })
        })
}

citySearch.addEventListener("click", function (event) {

    event.preventDefault();
    
    let cityChosen = citySearchDOM.value;
    citySearchDOM.value = '';
    weatherFxn(cityChosen);
    saveSearchTerm(cityChosen);
    displayRecentSearches();


});

// Function to save a city to recent search

function saveSearchTerm(searchTerm) {
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

    // Check if search term already exists in recent searches
    if (recentSearches.indexOf(searchTerm) === -1) {
        // Add the new search term to the beginning of the recent searches array
        recentSearches.unshift(searchTerm);

        // Keep only the most recent 8 searches
        recentSearches = recentSearches.slice(0, 8);

        // Save the updated recent searches array to local storage
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
}

// Function to display recent searches on the webpage
function displayRecentSearches() {
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    let recentSearchesContainer = document.getElementById('recentSearchesContainer');

    // Clear previous content
    recentSearchesContainer.innerHTML = '';

    // Display each recent search as a button
    recentSearches.forEach(function (searchTerm) {
        const historyItem = document.createElement('button');
        historyItem.classList.add('history-item');
        historyItem.textContent = searchTerm;
        historyItem.addEventListener('click', function() {
            weatherFxn(searchTerm);
        });
        recentSearchesContainer.appendChild(historyItem);
    });
}
