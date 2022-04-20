'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  fetch('/fortune')
  .then(response => response.text())
  .then(responseData => {
    document.querySelector('#fortune-text').innerHTML = responseData;
  });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  // TODO: request weather with that URL and show the forecast in #weather-info
  fetch(`${url}?zipcode=${zipcode}`)
    .then(response => response.json())
    .then(responseData => {
      document.querySelector('#weather-info').innerHTML = responseData.forecast;
    });

}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS
function updateMelons(responseData) {
  if (responseData.code === 'OK') {
    document.getElementById('order-status').classList.remove('order-error');
    document.getElementById('order-status').innerText = `${responseData.code} ${responseData.msg}`;
  } else {
    document.getElementById('order-status').classList.add('order-error');
    document.getElementById('order-status').innerText = `${responseData.code} ${responseData.msg}`;
  }
}

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };

  // console.log("####", formInputs);

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(responseData => updateMelons(responseData));
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);


function showDogImage(evt) {
  fetch('https://dog.ceo/api/breeds/image/random')
  .then(response => response.json())
  .then(responseData => {
    if (responseData.status === 'success') {
      const elem = document.createElement("img");
      elem.src = responseData.message;
      document.getElementById('dog-image').appendChild(elem);
    }
  });
}

document.querySelector('#get-dog-image').addEventListener('click', showDogImage);