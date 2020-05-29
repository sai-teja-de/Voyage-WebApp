const createVenueHTML = (name, location, iconSource, vlink, vrate , photoSrc) => {
    return `<h2><img class="venueimage" src="${iconSource}"/></h2> 
    <br>
    <h2><a href=${vlink} target="_blank" rel="noopener noreferrer">${name}</a> </h2>
    <br>  
    <img class="venuephoto" src="${photoSrc}"/>
    <h4>Rating: ${vrate}</h4>
    <h3>Address:</h3>
    <p>${location.address}</p>
    <p>${location.city}</p>
    <p>${location.country}</p>`;
  }

  const createWeatherHTML = (currentDay) => {
    console.log(currentDay)
    return `<h2>${weekDays[(new Date()).getDay()]}</h2>
      <br>
      <h2>Temperature: ${kelvinToCelsius(currentDay.main.temp)}&deg;C</h2>
      <p>(${kelvinToCelsius(currentDay.main.temp_max)}&deg;C-${kelvinToCelsius(currentDay.main.temp_min)}&deg;C)<p>
      <br>
      <h2>Humidity:  ${currentDay.main.humidity}</h2>
      <br>
      <h2>Condition: ${currentDay.weather[0].description}</h2>
      <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
  }
  
  const kelvinToCelsius = k => (k - 273.15).toFixed(0);
    