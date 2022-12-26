let hrEl = document.querySelector(".hours");
let minEl = document.querySelector(".minutes");
let secEl = document.querySelector(".seconds");
let amPmEl = document.querySelector(".amPm");

let today = document.querySelector(".day");
let date = document.querySelector(".date");
let month = document.querySelector(".month");

let locationEl = document.querySelector(".locationEl");
let currentWeatherEl = document.querySelector(".currentWeatherEl");
let futureWeatherEl = document.querySelector(".futureWeatherEl");
let tableEl = document.querySelector(".table-striped");

let formEl = document.querySelector(".form");
let formInp = document.querySelector(".input");

const digitalClock = () => {
  const time = new Date();
  let hrs = time.getHours();
  const mins = time.getMinutes();
  const secs = time.getSeconds();

  // checking am pm
  if (hrs > 12) {
    hrs = hrs - 12;
    amPmEl.innerText = "PM";
  } else {
    amPmEl.innerText = "AM";
  }

  // add zero in front of elements if they are less than 10
  hrEl.innerText = hrs < 10 ? "0" + hrs : hrs;
  minEl.innerText = mins < 10 ? "0" + mins : mins;
  secEl.innerText = secs < 10 ? "0" + secs : secs;
};

setInterval(() => {
  digitalClock();
}, 1000);
digitalClock();

const setDate = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateAndTime = new Date();
  today.innerText = days[dateAndTime.getDay()];
  //   date.innerText = dateAndTime.getDate();
  month.innerText = dateAndTime.getMonth() + 1;
};
setDate();

const weatherDetails = (city) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4d1d405e39mshaba9aa484f12d2ep1d8c8ejsnc2601d5c6156",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  fetch(
    `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`,
    options
  )
    .then((response) => response.json())
    .then(
      (data) => (
        ({ maxtemp_c, mintemp_c, maxwind_mph, avghumidity } =
          data.forecast.forecastday[1].day),
        ({
          icon: currIcon,

          text: currCond,
        } = data.current.condition),
        ({
          temp_c: currTempC,
          temp_f: currTempF,
          feelslike_c,
          humidity,
          wind_degree,
          wind_mph,
          wind_kph,
        } = data.current),
        ({ text, icon } = data.forecast.forecastday[1].day.condition),
        ({ sunrise, sunset } = data.forecast.forecastday[1].astro),
        (locationEl.innerHTML = ` <div class="card mb-4 rounded-3 shadow-sm">
                                    <div class="card-header py-3 location-card-header">
                                        <h4 class="my-0 fw-bolder text-white locationHeading">Location</h4>
                                    </div>
                                    <div class="card-body locationCard">
                                        <h4 class="location">${data.location.name}</h4>
                                            <ul class="list-unstyled mt-3 mb-4">
                                                <li class="country"><span>Country</span> : ${data.location.country}</li>
                                                <li class="region"><span>Region</span> : ${data.location.region}</li>
                                                <li class="localTime"><span>Local time</span> : ${data.location.localtime}</li>
                                                <li class="timeZone">
                                                <span>Time zone</span> : ${data.location.tz_id}
                                                 </li>
                                            </ul>
                                    </div>
                                </div>`),
        (currentWeatherEl.innerHTML = `<div class="card mb-4 rounded-3 shadow-sm">
                                <div class="card-header py-3">
                                <h4 class="my-0 fw-normal">Current Weather Forecast</h4>
                                </div>
                                <div class="card-body">
                                <h1 class="card-title pricing-card-title"></h1>
                                <div class="tempDiv">
                                <img class="conditionImg" src=${currIcon} alt="Weather conditon" />
                                <h4 class="temperature currenTemp">${currTempC} <sup>o</sup>C</h4>
                                <span class="conditionName"> ${currCond}</span>
                                </div>
                                    <ul class="list-unstyled mt-3 mb-4">
                                    <li class="fahrenheit"> <span>Fahrenheit</span> : ${currTempF} <sup>o</sup>F</li>
                                        <li class="feelsLike">
                                        <span>Feels Like</span> : ${feelslike_c} <sup>o</sup>C
                                        </li>
                                        <li class="humidity"><span>Humidity</span> : ${humidity}</li>
                                        <li class="windDegree"><span>Wind speed</span> : ${wind_degree}<span> degree</span></li>
                                        <li class="windmph"><span>Wind speed</span> : ${wind_mph}<span> mph</span></li>
                                        <li class="windkph"><span>Wind speed</span> : ${wind_kph}<span> kph</span></li>
                                        </ul>
                                    </div>
                                    </div>`),
        (futureWeatherEl.innerHTML = `<div class="card mb-4 rounded-3 shadow-sm">
                                    <div class="card-header py-3">
                                    <h4 class="my-0 fw-normal">Future Weather Forecast</h4>
                                    </div>
                                    <div class="card-body">
                                    <h1 class="card-title pricing-card-title"></h1>
                                    <div class="tempDiv">
                                    <img class="conditionImg" src=${icon} alt="Weather conditon" />
                                    <h4 class="temperature currenTemp">${maxtemp_c} <sup>o</sup>C</h4>
                                    <span class="conditionName"> ${text}</span>
                                    </div>
                                      <ul class="list-unstyled mt-3 mb-4">
                                         <li> <span>Maximum</span> : ${maxtemp_c} <sup>o</sup>C</li>
                                             <li>
                                             <span>Minimum Temp</span> : ${mintemp_c} <sup>o</sup>C
                                             </li>
                                             <li class="humidity"><span>Average Humidity</span> : ${avghumidity}</li>
                                             <li class="windmph"><span>Wind speed</span> : ${maxwind_mph}<span> mph</span></li>
                                             <li class="windDegree"><span>Sunrise</span> : ${sunrise}</li>
                                             <li class="windkph"><span>Sunset</span> : ${sunset}</li>
                                             </ul>
                                             </div>
                                        </div>`),
        (tableEl.innerHTML = `   <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Max Temperature</th>
          <th scope="col">Min Temperature</th>
          <th scope="col">Rain Chances</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">${data.forecast.forecastday[0].date}</th>
          <td>${data.forecast.forecastday[0].day.maxtemp_c} <sup>o</sup> C</td>
          <td>${data.forecast.forecastday[0].day.mintemp_c} <sup>o</sup> C</td>
          <td>${data.forecast.forecastday[0].day.daily_chance_of_rain}%</td>
        </tr>
        <tr>
        <th scope="row">${data.forecast.forecastday[1].date}</th>
        <td>${data.forecast.forecastday[1].day.maxtemp_c} <sup>o</sup> C</td>
        <td>${data.forecast.forecastday[1].day.mintemp_c} <sup>o</sup> C</td>
        <td>${data.forecast.forecastday[1].day.daily_chance_of_rain}%</td>
      </tr>
      <tr>
      <th scope="row">${data.forecast.forecastday[2].date}</th>
      <td>${data.forecast.forecastday[2].day.maxtemp_c} <sup>o</sup> C</td>
      <td>${data.forecast.forecastday[2].day.mintemp_c} <sup>o</sup> C</td>
      <td>${data.forecast.forecastday[2].day.daily_chance_of_rain}%</td>
    </tr>
      </tbody>`)
      )
    );
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (formInp.value === "") {
    return;
  } else {
    weatherDetails(formInp.value);
  }
});

weatherDetails("Delhi");
