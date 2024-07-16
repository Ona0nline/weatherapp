// Getting weather api info


// Remember to pass the correct parameter
function getweatherdata(cityname){

  let apikey = "444t95o4afedabca0957fcb3605bfd54"
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${cityname}&key=${apikey}`


// Rather make one singular API call

axios.get(apiurl).then((response) => {
  console.log(response.data)
    displaycity(response);
    displaytemp(response);
    displayhum(response);
    displaywind(response);
    displaytime(response);
    displaycondition(response);
  }).catch(error => {
    console.error("Error fetching weather data:", error);
  });
}


function displaycity(response){
  let cityelement = document.querySelector("h1")
  let cityresponse = response.data.city;
  cityelement.innerHTML = cityresponse;

}

function displaytemp(response){
  let tempelement = document.querySelector(".current-temp");
  let temp = response.data.temperature.current;
  let iconurl = `
  <img class="current-url" src="${response.data.condition.icon_url}"/>
  `
  tempelement.innerHTML = `${iconurl}${Math.round(temp)}°C`;
}

function displayhum(response){
  let humidityelement = document.querySelector(".humidity")
  let humidity = response.data.temperature.humidity;
 
  humidityelement.innerHTML = `Humidity: ${humidity}%`

}

function displaywind(response){
  let windelement = document.querySelector(".wind")
  let wind = response.data.wind.speed;
  windelement.innerHTML = `Wind: ${wind}km/h`
}

function displaytime(response){
  let date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const wordtime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let timeelement = document.querySelector(".time-conditions")
  let time = response.data.time;
  timeelement.innerHTML = `${formattedDate},${wordtime}`
}

function displaycondition(response){
  let conelem = document.querySelector(".description")
  let con = response.data.condition.description;
  conelem.innerHTML = `Conditions: ${con}`
}

// NEED form submission event handling



getweatherdata("Pretoria");

// -------------------------------------------------------------------------------------------------
// Forecast stuff

function formatday(timestamp){
  let date = new Date(timestamp*1000);
  let days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat']

  return days[date.getDay()];

}

function getforecast(citysearch){
  let Apikey = "444t95o4afedabca0957fcb3605bfd54"
  let ApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${citysearch}&key=${Apikey}`
  console.log(`forecast api url: ${ApiUrl}`)

   axios.get(ApiUrl).then(displayforecast).catch(error => {
  console.error("Error fetching weather data:", error);
   
})}

function displayforecast(response){
  console.log(response.data.daily)
  console.log(`Forecast: ${response.data}`)

  
  let forecasthtml = "";

  // Index gets incrememnted everytime we go through the loop
response.data.daily.forEach(function(day, index){

  if(index <5 ){
    
    forecasthtml = forecasthtml +
              `
              <div class="forecast-container">
              <div class="forecast-info">
              <div class="forecast-date">${formatday(day.time)}</div>
            <div class="forecast-icon">
            <img src="${day.condition.icon_url}"/>
            </div>
                  <div class="forecast-temp"><span class="dark">${Math.round(day.temperature.maximum)}&deg;</span> <span class="light">${Math.round(day.temperature.minimum)}&deg;</span></div>
            </div>
          </div>
              </div`      
    
  }
});
  

let forecastelem = document.querySelector("#forecast")
forecastelem.innerHTML=forecasthtml;

}

getforecast("Pretoria")

document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  let cityname = document.querySelector("#search-input").value;
  getweatherdata(cityname);
  getforecast(cityname);
});
// let search_form_element = document.querySelector("#search-input")
// search_form_element.addEventListener("submit",handleSearchSubmit)
console.log("Hey")
