const apiKey = "7035a4cad42fa7b109c36a2d829ede0e";
const apiCountryURL = `https://countryflagsapi.com/png/`;
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const errorElement = document.querySelector("#error-message");
const loaderElement = document.querySelector("#loader");
const weatherContainer = document.querySelector("#weather-data");
const mainElement = document.querySelector("#main")

const toggleLoader = () =>{
    loaderElement.classList.toggle("hide");
}

const toggleResponse = () =>{
    loaderElement.classList.toggle("hide");
    errorElement.classList.add("hide");
    weatherContainer.classList.add("hide");
}


const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br` ;
    try{
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
    } finally {}
};


const showWeatherData = async (city) => {
    toggleResponse();
    try {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    mainElement.style.backgroundImage = `url("${apiUnsplash + "city " + city}")`;

    weatherContainer.classList.remove("hide");
    }  catch (e){
        errorElement.classList.remove("hide")
    }
    toggleLoader();
};

searchButton.addEventListener("click", (e)=>{
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value

        showWeatherData(city)
    }
})


