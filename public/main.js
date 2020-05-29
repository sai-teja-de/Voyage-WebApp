// Foursquare API Info
const clientId = 'JIYWL4M4AI1BUFFYMQO3IGREXTPXJMPYRELEGNGHCMLCM01W';
const clientSecret = 'IYX5JXKN4ZSC04AMNDDJHGALWZTQR54KL0AS2AXOSLMRELEC';
const url1 = 'https://api.foursquare.com/v2/venues/explore?near=';
const url2 = 'https://api.foursquare.com/v2/venues/';

// OpenWeather Info
const openWeatherKey = '8743a8bb68a5cbb4b1cb45eae9e19216';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5"), $("#venue6"), $("#venue7"), $("#venue8")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// AJAX functions
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url1}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      console.log(venues);
      return venues;
    }
  } catch (error) {
    console.log(error);
  }
};

const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

//for images & url:
const getVenuesAddon = async (venueId) => {
  const urlToFetch2 = `${url2}${venueId}?client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;
  try {
    const response = await fetch(urlToFetch2);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venueAddon = jsonResponse.response.venue;
     //console.log(venueAddon);
      return venueAddon;
    }
  } catch (error) {
    console.log(error);
  }
};

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(async ($venue, index) => {
    const venue = venues[index];
    const venueId = venue.id;
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let Addon = await getVenuesAddon(venueId);
    let venueRate = Addon.rating;
    let link = Addon.url;
    let venuePhoto =  Addon.bestPhoto;
    let venuePhotoSrc = `${venuePhoto.prefix}width250${venuePhoto.suffix}`

    const venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc, link,venueRate, venuePhotoSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
  const weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css('visibility', 'visible');
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
};

$submit.click(executeSearch);