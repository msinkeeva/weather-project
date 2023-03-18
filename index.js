async function getWeather(){
    const city = document.querySelector("#search-input").value
    const weatherContainer = document.querySelector("#weather-container")
    weatherContainer.innerHTML = ""

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ac15e274b11428b3a6fadff93d378d66`
    const response = await fetch(url)
    const weatherData = await response.json()
    console.log(weatherData)

    const tempCelsius = Math.round(weatherData.main.temp-273.15)
    const tempFeelsCelsius = Math.round(weatherData.main.feels_like-273.15)

    const sunrise = weatherData.sys.sunrise
    const sunriseDate = new Date(sunrise * 1000);
    const sunriseHours = "0" + sunriseDate.getHours();
    const sunriseMinutes = "0" + sunriseDate.getMinutes();
    const sunriseSeconds = "0" + sunriseDate.getSeconds();
    const sunriseTime = sunriseHours + ':' + sunriseMinutes.substr(-2) + ':' + sunriseSeconds.substr(-2);

    const sunset = weatherData.sys.sunset
    const sunsetDate = new Date(sunset * 1000);
    const sunsetHours = sunsetDate.getHours();
    const sunsetMinutes = "0" + sunsetDate.getMinutes();
    const sunsetSeconds = "0" + sunsetDate.getSeconds();
    const sunsetTime = sunsetHours + ':' + sunsetMinutes.substr(-2) + ':' + sunsetSeconds.substr(-2);

    const date = new Date(weatherData.dt*1000).toLocaleString()
    const weatherImage = weatherData.weather[0].icon
    weatherContainer.innerHTML = ""
 
        weatherContainer.innerHTML += `
        <div class="weather-block">
        <div class="content">
        <div class="block1">
        <div class="weather-block-header">
        <div>Weather on ${date} in<div class="city-name">${weatherData.name}, ${weatherData.sys.country}</div> </div>
        <div class="city-info">Coordinates lon: ${weatherData.coord.lon}, lat: ${weatherData.coord.lat}</div>    
        </div> 
        <div class="weather-characteristics">
        <div class="part1">
        <div class="row">Weather: <div class="weather-data">${weatherData.weather[0].main}</div></div>
        <div class="row">Description: <div class="weather-data">${weatherData.weather[0].description}</div></div>
        <div class="row">Temperature: <div class="weather-data">${tempCelsius}°C</div></div>
        <div class="row">Feels like:  <div class="weather-data">${tempFeelsCelsius}°C</div></div>  
        <div class="row">Pressure: <div class="weather-data">${weatherData.main.pressure} hPa</div></div> 
        </div>
        <div class="part2">
        <div class="row">Humidity: <div class="weather-data">${weatherData.main.humidity}%</div></div>
        <div class="row">Wind speed: <div class="weather-data">${weatherData.wind.speed}m/s</div></div>     
        <div class="row">Sunrise: <div class="weather-data">${sunriseTime}</div></div>   
        <div class="row">Sunset: <div class="weather-data">${sunsetTime}</div></div>  
        <div class="row">Visibility: <div class="weather-data">${weatherData.visibility}m</div></div>  
        </div>      
        </div>   
        </div>
        <div class="block2">
        <img src="weather Icons/${weatherImage}.png" alt="" id="weather-icon">   
        </div>
        </div> 
        <div class="buttons">
        <div class="buttonFiveDays" onclick="getFiveDaysWeather()"">See the weather for 5 days</div> 
        </div>
        </div>  
 `   
}

async function getFiveDaysWeather(){
    const city = document.querySelector("#search-input").value
    const fiveDaysContainer = document.querySelector("#containerFiveDays")
    fiveDaysContainer.innerHTML = ""

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ac15e274b11428b3a6fadff93d378d66`
    const response = await fetch(url)
    const weatherData = await response.json()
    console.log(weatherData)

    const weatherList = weatherData.list
    console.log(weatherList)
    for (let i = 0; i < weatherList.length; i+=8){
    console.log(123)    
    
    const date = weatherData.list[i].dt_txt.slice(0,-8)
    const weatherImage = weatherData.list[i].weather[0].icon
    const tempCelsiusMax = Math.round(weatherData.list[i].main.temp_max-273.15)    
    const tempCelsiusMin = Math.round(weatherData.list[i].main.temp_min-273.15)  
    const tempFeelsCelsius = Math.round(weatherData.list[i].main.feels_like-273.15)    

    fiveDaysContainer.innerHTML += `
        <div class="weather-block-day">
        <div>
        <div class="day-block-header">
        <div>Weather on ${date}</div>  
        </div> 
        <div class="day-icon">
        <img src="weather Icons/${weatherImage}.png" alt="" id="weather-icon">   
        </div> 
        <div>
        <div>
        <div class="row">Weather: <div class="weather-data">${weatherData.list[i].weather[0].main}</div></div>
        <div class="row">Temperature max: <div class="weather-data">${tempCelsiusMax}°C</div></div>
        <div class="row">Temperature min: <div class="weather-data">${tempCelsiusMin}°C</div></div>
        <div class="row">Feels like:  <div class="weather-data">${tempFeelsCelsius}°C</div></div>  
        <div class="row">Pressure: <div class="weather-data">${weatherData.list[i].main.pressure} hPa</div></div>
        <div class="row">Humidity: <div class="weather-data">${weatherData.list[i].main.humidity}%</div></div>
        <div class="row">Wind speed: <div class="weather-data">${weatherData.list[i].wind.speed}m/s</div></div>     
        </div>      
        </div>   
        </div>
    
        </div>  
 `    
    }    
}

