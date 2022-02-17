const api = {
  key: "e22f595ab413d7ccc304406cd2ae1f82",
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', search);

function search(event) {
  if (event.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${api.key}`)
    .then(weather => {if(!weather.ok){alert("City Not found"); return null}
      console.log(weather)
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {

  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = weather.dt;
  let date = document.querySelector('.location .date');
  date.innerText = dates(new Date(now*1000));

  let sunrise = weather.sys.sunrise;
  let sunrisetime  = document.querySelector('.current .sunrise');
  sunrisetime.innerText = times(new Date(sunrise*1000));

  let sunset = weather.sys.sunset;
  let sunsettime = document.querySelector('.current .sunset');
  sunsettime.innerText = times(new Date(sunset*1000));

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}°c`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.current .hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  let pressure = document.querySelector('.current .pressure-humidity .pressure');
  pressure.innerText = `Pressure: ${weather.main.pressure}`;

  let humidity = document.querySelector('.current .pressure-humidity .pressure');
  humidity.innerText = `Humidity: ${weather.main.humidity} % `;

  console.log(weather.weather[0].main)
  let c=`url(${weather.weather[0].main}.jpeg)`
  console.log(c)
  document.body.style.backgroundImage = c

}

function dates(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
function times(t) {

  let hour = t.getHours();
  let minute = t.getMinutes();
  let seconds = t.getSeconds();
  return `${hour}:${minute}:${seconds}`;

}