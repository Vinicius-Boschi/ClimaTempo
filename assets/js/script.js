let api_key = '36a295a87dabfe671f0f25c54a02cf77'

const input = document.querySelector("#search")
const searchButton = document.querySelector(".main__icon")
const container = document.querySelector(".main__container")

searchButton.addEventListener('click', searchCity)
input.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        searchCity()
        return
    }
})

async function searchCity() {
    const inputValue = input.value
    if (inputValue != '') { 
        cleanAll()
        const citys = await searchCityByName(inputValue)
        citys.forEach(city => renderCity(city))
    }
}

function cleanAll() {
    container.innerHTML = ''
}

async function searchCityByName(title) {
    const url = `http://apiadvisor.climatempo.com.br/api/v1/anl/synoptic/locale/BR?token=${api_key}&query=${title}&language=pt_br-BR`
    const fetchResponse = await fetch(url)
    const { results } = await fetchResponse.json()
    return results
}

async function getClimate() {
    const url = `http://apiadvisor.climatempo.com.br/api/v1/anl/synoptic/locale/BR?token=${api_key}&language=pt_br-BR`
    const fetchResponse = await fetch(url)
    const { results } = await fetchResponse.json()
    return results
}

async function getAllCitys() {
    const citys = await getClimate()
    citys.forEach(city => renderCity(city))
}

window.onload = function() {
    getAllCitys()
}

function renderCity(city) {
    const {name, state, country, climate_temperature, text} = city

    const title = document.createElement('h2')
    title.classList.add('main__title')
    title.textContent = `${country}`
    container.appendChild(title)

    const temp = document.createElement('h1')
    temp.classList.add('main__temp')
    temp.textContent = `${climate_temperature}`
    container.appendChild(temp)

    const infos = document.createElement('div')
    infos.classList.add('main__infos')

    const image = document.createElement('img')
    image.classList.add('main__img')
    image.src = image
    infos.appendChild(image)
    
    const description = document.createElement('span')
    description.classList.add('main__description')
    infos.appendChild(description)

    const textContent = document.createElement('span')
    textContent.classList.add('main__text')
    textContent.textContent = `${text}`
    infos.appendChild(textContent)
    container.appendChild(infos)
}