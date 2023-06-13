let input = document.querySelector("#location");
let label = document.querySelector("label");
let temp = document.querySelector(".temp");
let descr = document.querySelector(".descr");
let pressure = document.querySelector(".pressure span");
let humidity = document.querySelector(".humidity span");
let windspeed = document.querySelector(".wind-speed span");
let sunset = document.querySelector(".sunset span");
let sunrise = document.querySelector(".sunrise span");
let icon = document.querySelector(".icon");
let card = document.querySelector(".card");
card.classList.add("empty");
let searchBtn = document.querySelector(".search");
searchBtn.addEventListener("click", () => {
    if(input.value.trim().length == 0){
        input.value = ""
        return
    }
    card.classList.remove("empty")
    card.classList.remove("error")
    card.classList.add("loader")
    let url =
        `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=aa57a53f55a1f4baa176f8d5974fccfe&units=metric&lang=ru`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let newdata = {
                temp: Math.round(data.main.temp),
                descr: data.weather[0].description,
                pressure: data.main.pressure*0.75,
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                sunset: new Date(data.sys.sunset * 1000).toTimeString(),
                sunrise: new Date(data.sys.sunrise * 1000).toTimeString(),
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
            };
            temp.innerHTML = newdata.temp + "°";
            descr.innerHTML = newdata.descr;
            pressure.innerHTML = newdata.pressure;
            humidity.innerHTML = newdata.humidity;
            windspeed.innerHTML = newdata.windspeed;
            sunset.innerHTML = newdata.sunset;
            sunrise.innerHTML = newdata.sunrise;
            icon.src = newdata.icon;
            console.log(data);
        }).catch(()=>{
            card.classList.add("error")
        }).finally(()=>{
            card.classList.remove("loader")
        })

});
input.addEventListener("change", () => {
    if (input.value.length > 0) {
        label.classList.add("ontop");
    } else {
        label.classList.remove("ontop");
    }
});