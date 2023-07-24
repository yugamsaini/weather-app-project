//to fetch two tabs := your weather and search weather
const userTab = document.querySelector("[data-userWeather]")
const searchTab = document.querySelector("[data-searchWeather]")
const userContainer = document.querySelector(".weather-container")

const grantAccessContainer = document.querySelector(".grant-location-container")
const searchForm = document.querySelector("[data-searchForm]")
const loadingScreen = document.querySelector(".loading-container")
const userInfoContainer = document.querySelector(".user-info-container")

//initially variables need

let currentTab = userTab;
const API_KEY = "d48450a03aa081ca76948307bb813229";
currentTab.classList.add("current-tab")


function switchTab(clickedTab){
    //agr dono tab different hai to
    if(clickedTab != currentTab){
        //current tab mein se color hata do pehle
        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            //kya search form wala container is invisible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }else{
            //pehle mai search wale tab pr tha ab your weather wale tab pr switch
            searchForm.classList.remove("active")
            userInfoContainer.classList.remove("active");
            //ab mai your weather tab mein aa gya hu to weather bhi display krna pdegea
            //so let check first local storage for cordinates if we have saved them there
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", ()=>{
    //pass clicked tab as input
    switchTab(userTab);
});

searchTab.addEventListener("click", ()=>{
    //pass clicked tab as input
    switchTab(searchTab);
});

//it checks if cordinates are already in session storage
function getfromSessionStorage(){
    const localCordinates = sessionStorage.getItem("user-cordinates");
    if(!localCordinates){
        //agr nhi mile cordinates
        grantAccessContainer.classList.add("active");
    } else {
        const cordinates = JSON.parse(localCordinates);
        fetchUserWeatherInfo(cordinates);
    }
}

async function fetchUserWeatherInfo(cordinates){
    const {lat,lon} = cordinates;
    //make grant container invisible\
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //api call 
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        //ab data aa gya isliye loader ko hata do
        
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch(err){
        loadingScreen.classList.remove("active");
    }
}

function renderWeatherInfo(weatherInfo){
    //first we have to fetch the elements
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]")

    //fetch weather info from weather info object and put in ui elements
    
}