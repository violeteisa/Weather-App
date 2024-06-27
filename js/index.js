// today variables

let todayName=document.getElementById('todayName')
let todayNumber=document.getElementById('todayNumber')
let todayMonth=document.getElementById('todayMonth')
let todayLocation=document.getElementById('todayLocation')
let weatherTemp=document.getElementById('weatherTemp')
let todayStatusImage=document.getElementById('todayStatusImage')
let todayStatus=document.getElementById('todayStatus')
let humidity=document.getElementById('humidity')
let wind=document.getElementById('wind')
let windDirection=document.getElementById('windDirection')


// next days variables
let nextDayName=document.getElementsByClassName('nextDayName')
let nextDayMaxTemp=document.getElementsByClassName('nextDayMaxTemp')
let nextDayMinTemp=document.getElementsByClassName('nextDayMinTemp')
let nextDayStatusImage=document.getElementsByClassName('nextDayStatusImage')
let nextDayStatus=document.getElementsByClassName('nextDayStatus')

// input
let searchInput =document.getElementById('search')
let date = new Date('2024-06-27')
// console.log(date.getDate())
// console.log(date.toLocaleDateString('en-us',{weekday:"long"}))
// console.log(date.toLocaleDateString('en-us',{month:"long"}))

// FETCH API DATA
async function getWeatherData(cityName){
    let response= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=43a20f7862074d399f9215520242406&q=${cityName}&days=3`)
    let data= await response.json()
    return data
}


// display Data for today
function displayTodayData(data){
    let todayDate= new Date()
    todayNumber.innerHTML=todayDate.getDate()
    todayMonth.innerHTML=todayDate.toLocaleDateString("en-us",{month:"long"})
    todayName.innerHTML=todayDate.toLocaleDateString("en-us",{weekday:"long"})
    todayLocation.innerHTML=data.location.name
    weatherTemp.innerHTML=data.current.temp_c + "<sup>o</sup> C"
    todayStatusImage.setAttribute("src", data.current.condition.icon)
    todayStatus.innerHTML=data.current.condition.text
    humidity.innerHTML=data.current.humidity+"%"
    wind.innerHTML=data.current.wind_kph+"km/h"
    windDirection.innerHTML=data.current.wind_dir



}

// display Data for next days
function displayNextDay(data){
    let forecastData= data.forecast.forecastday
    for(let i = 0; i<2;i++){
        let nextDate= new Date(forecastData[i+1].date)
        nextDayName[i].innerHTML=nextDate.toLocaleDateString("en-us",{weekday:"long"})
        nextDayMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c + "<sup>o</sup> C";
        nextDayMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c + "<sup>o</sup> C";
        nextDayStatusImage[i].setAttribute("src",forecastData[i + 1].day.condition.icon)
        nextDayStatus[i].innerHTML=forecastData[i + 1].day.condition.text
    }
}

//  start app
//!handle error by set default value of parameter .. once open set city : cairo and get all data of cairo 
    async function start(city="cairo"){
    let weatherData= await getWeatherData(city) //!get data from api
    //handle Error "undefined"
    //!if true  --> call 2 functions 
    //! if false  --> don't show error (no function calling)
    if(!weatherData.error){
        displayTodayData(weatherData)
        displayNextDay(weatherData)
    }  
    



}
start()
//! searchInput.value to start then from start to getWeatherData()
searchInput.addEventListener("input",function(){
    start(searchInput.value)
})



