
let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let MinMaxTemp = document.querySelector(".min-max");
let weatherType = document.querySelector(".weather");
let date=document.querySelector(".date");
let humid=document.querySelector(".humidity");
let wind=document.querySelector(".wind");
let weathericon=document.getElementById("1");
const todayDate= new Date();
const kelvin = 273;

function dateManage(dateArg){
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months=["January","February","March","April","May","June","July","August",
    "September","October","November","December"];

    let year= dateArg.getFullYear();
    let month=months[dateArg.getMonth()];
    let date=dateArg.getDate();
    let day=days[dateArg.getDay()];
    return `${date} ${month} (${day}),${year}`;
}

var form=document.getElementById('register');
var cit;
form.addEventListener('submit',function(event){
    event.preventDefault();

    cit =document.getElementById("cityname").value;
    console.log(cit);
    fetching();
});
function fetching(){
    
    const api = "26e09a7c321453eda4b376762236682e";

	// API URL
	const base =`https://api.openweathermap.org/data/2.5/weather?q=${cit}&appid=26e09a7c321453eda4b376762236682e`
        
    fetch(base).then((response) => {
	    return response.json();
	})
	.then((data) => {
	    console.log(data);
        city.textContent=data.name+","+data.sys.country;
    	temp.textContent =Math.floor(data.main.temp - kelvin) + "°C";
        MinMaxTemp.textContent = Math.floor(data.main.temp_min-kelvin) + "°C/" + Math.ceil(data.main.temp_max-kelvin)+"°C";
        weatherType.textContent=data.weather[0].main;
	humid.innerText="Humidity: "+data.main.humidity+"%";
        wind.innerText="Wind speed: "+ (data.wind.speed*(18/5)).toFixed(2)+" km/hr";
        date.innerText=dateManage(todayDate);
    });
    var h=weatherType.textContent;
    document.querySelector('.weather-body').style.display="block";
    weathericon.classList.remove("fa-wind");
    if(h=='Clear'||h=='Sunny'){
	weathericon.classList.add("fa-sun");
        document.body.style.backgroundImage="url(sunnyweather.jpg)";
    }
    else if(h=='Haze'||h=='Clouds'||h=='Mist'){
	weathericon.classList.add("fa-cloud");
        document.body.style.backgroundImage="url(weather-clouds-sky-cloud-cover.jpg)";
    }
    else if(h=='Smoke'){
	weathericon.classList.add("fa-smog");
        document.body.style.backgroundImage="url(smoke.jpg)";
    }
    else if(h=="Rain"){
	weathericon.classList.add("fa-cloud-rain");
        document.body.style.backgroundImage="url(rainyweather.jpg)";
    }
    else if(h=="Windy"){
	weathericon.classList.add("fa-wind");
        document.body.style.backgroundImage="url(weather-clouds-sky-cloud-cover.jpg)";
    }
    else if(h=="Storm"||h=="Thunderstorm"){
	weathericon.classList.add("fa-cloud-bolt");
        document.body.style.backgroundImage="url(stormyweather.jpg)";
    }
    else if(h=="Snow"){
	weathericon.classList.add("fa-snow");
        document.body.style.backgroundImage="url(snow.jpg)";
    }
    else{
        document.body.style.backgroundImage="url(wallpaper2.jpg)";
    }
}

