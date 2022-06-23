let api_key = '92adc081'

const input = document.querySelector("input")
const searchButton = document.querySelector(".main__icon")
// const container = document.querySelector(".main__container")

searchButton.addEventListener('click', searchCity)
input.addEventListener('keyup', function(event) {
    if (event.keyCode == 13) {
        searchCity()
        return
    }
})

async function searchCity() {
    const inputValue = input.value
    console.log(inputValue)
    if (inputValue != '') { 
        const getCitys = await searchCityByName(inputValue)
        Array.from(getCitys).forEach(city => renderCity(allCitys))
    }
}

async function searchCityByName(city_name) {
    const url = `https://api.hgbrasil.com/weather?format=json-cors&key=${api_key}&city_name=${city_name}`
    const fetchResponse = await fetch(url)
    const { results } = await fetchResponse.json()
    console.log(results)
    return results
}

async function getClimate() {
    const url = `https://api.hgbrasil.com/weather?format=json-cors&key=${api_key}`
    const fetchResponse = await fetch(url)      
    const { results } = await fetchResponse.json()
    return results
}

async function getAllCitys() {
    const getCitys = await getClimate() 
    Array.from(getCitys).forEach(city => renderCity(allCitys))
}

window.onload = function() {
    getAllCitys()
}

function renderCity(allCitys) {
    const { temp, description, city , humidity, wind_speedy} = allCitys

    document.querySelector(".main__title").innerHTML = "Temperatura em" + city
    document.querySelector(".main__description").innerHTML = description
    document.querySelector(".main__temp").innerHTML = temp + "°C"
    document.querySelector(".main__humidity").innerHTML = "Humidade: " + humidity + "%"
    document.querySelector(".main__wind").innerHTML = "Vento: " + wind_speedy + " km/h"
}