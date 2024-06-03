const form = document.querySelector('#queryform > form')
const input: HTMLInputElement | null = document.querySelector('#locationInput')
const section = document.querySelector('.response')

form?.addEventListener('submit', async (event) => {
    event.preventDefault() // Não atualizar página.

    if (!input || !section) return
    const location = input.value


    if (location.length <= 2) {
        alert('O local precisa ter mais de 2 letras')
        return
    }
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c30abf77173168a527015fa8c57a5f07&lang=pt_br&units=metric`)

        const data = await response.json()

        console.log('hello')
        const dataObject = {
        locationName: data.name,
        temperature: Math.round(data.main.temp),
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        }

        section.innerHTML = `
        <div id="data">
            <h2>${dataObject.locationName}</h2>
            <span>${dataObject.temperature}°C</span>
        </div>

        <img src="${dataObject.icon}">

        `
        } catch (err) {
            console.log('erro: ', err)
        } 
    }
    )
