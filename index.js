
function displaycity(response){
  let cityelement = document.querySelector("h1")
  cityresponse = response.data.city;
  cityelement.innerHTML = cityresponse;

}

function displaytemp(response){
  let tempelement = document.querySelector(".current-temp");
  let temp = response.data.temperature.current;
  tempelement.innerHTML = `${temp}°C`;
}

function displayhum(response){
  let humidityelement = document.querySelector(".humidity")
  let humidity = response.data.temperature.humidity;
  humidityelement.innerHTML = `${humidity}%`

}

function displaywind(response){
  let windelement = document.querySelector(".wind")
  let wind = response.data.wind.speed;
  windelement.innerHTML = `${wind}km/h`
}

function displaytime(response){
  let timeelement = document.querySelector(".time-conditions")
  let time = response.data.time;
  let conditions = response.data.conditions.description;
  timeelement.innerHTML = `${time}`

}

function getweatherdata(cityname){

  let apikey = "444t95o4afedabca0957fcb3605bfd54"
let apiurl = "https://api.shecodes.io/weather/v1/current?query={#search-input}&key={apikey}"

axios.get(apiurl).then(displaycity);
axios.get(apiurl).then(displaytemp);
axios.get(apiurl).then(displayhum);
axios.get(apiurl).then(displaywind);
axios.get(apiurl).then(displaytime);
}

