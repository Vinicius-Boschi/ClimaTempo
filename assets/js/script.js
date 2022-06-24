const input = document.querySelector("input")
const searchButton = document.querySelector(".main__icon")

let results = {
    fetchResults: function(city) { 
        fetch(`https://weather.contrateumdev.com.br/api/weather/city/?city=${city}`) 
        .then((response) => {
            if (!response.ok) { 
                alert("Nenhuma informação encontrada!")
                throw new Error("Nenhuma informação encontrada!")
            }
            return response.json()
        })
        .then((data) => this.displayResults(data))
    },

    displayResults: function(data, day) { 
        const { name } = data 
        const { icon, description } = data.weather[0]
        const { temp, humidity , temp_min, temp_max} = data.main
        const { speed } = data.wind
        const { country } = data.sys
        let now = new Date()
        date.textContent = date(now)

        document.querySelector(".main__title").textContent = `${name}, ${country}`
        document.querySelector(".main__img").src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".main__description").textContent = description
        document.querySelector(".main__temp").textContent = temp.toFixed(0) + "°C"
        document.querySelector(".main__temp_min").textContent = "Miníma " + temp_min.toFixed(0) + "°C"
        document.querySelector(".main__temp_max").textContent = "Máxima " + temp_max.toFixed(0) + "°C"
        document.querySelector(".main__humidity").textContent = "Umidade: " + humidity + "%"
        document.querySelector(".main__wind").textContent = "Vento: " + speed.toFixed(0) + " km/h"
        document.querySelector("input").value = ''
    },

    search: function() { 
        this.fetchResults(input.value)
    },
}

function date(d) {
    let days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    document.querySelector(".main__date").textContent = `${day}, ${date}/${month}/${year}`
}

searchButton.addEventListener('click', search) 
input.addEventListener('keyup', function(event) { 
    if (event.keyCode == 13) { 
        results.search()
        return 
    }
})

results.fetchResults("São Paulo")