"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector('#queryform > form');
const input = document.querySelector('#locationInput');
const section = document.querySelector('.response');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault(); // Não atualizar página.
    if (!input || !section)
        return;
    const location = input.value;
    if (location.length <= 2) {
        alert('O local precisa ter mais de 2 letras');
        return;
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c30abf77173168a527015fa8c57a5f07&lang=pt_br&units=metric`);
        const data = yield response.json();
        console.log('hello');
        const dataObject = {
            locationName: data.name,
            temperature: Math.round(data.main.temp),
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        };
        section.innerHTML = `
        <div id="data">
            <h2>${dataObject.locationName}</h2>
            <span>${dataObject.temperature}°C</span>
        </div>

        <img src="${dataObject.icon}">

        `;
    }
    catch (err) {
        console.log('erro: ', err);
    }
}));
