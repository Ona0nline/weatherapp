console.log("Am i here?")
function displaycity(response){
  let cityelement = document.querySelector("h1")
  let cityresponse = response.data.city;
  cityelement.innerHTML = cityresponse;

}

function displaytemp(response){
  let tempelement = document.querySelector(".current-temp");
  console.log(tempelement);
  let temp = response.data.temperature.current;
  tempelement.innerHTML = `${temp}°C`;
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
  console.log(date.getDay());

  let timeelement = document.querySelector(".time-conditions")
  let time = response.data.time;
  timeelement.innerHTML = `${formattedDate},${wordtime}`
}

function displaycondition(response){
  let conelem = document.querySelector(".description")
  let con = response.data.condition.description;
  conelem.innerHTML = `Conditions: ${con}`
  console.log(`Description: ${response.data.condition.description}`)

}



// Remember to pass the correct parameter
function getweatherdata(cityname){

  let apikey = "444t95o4afedabca0957fcb3605bfd54"
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${cityname}&key=${apikey}`
console.log("API URL:", apiurl); 

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

// NEED form submission event handling

document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  let cityname = document.querySelector("#search-input").value;
  getweatherdata(cityname);
});

getweatherdata("Pretoria")

