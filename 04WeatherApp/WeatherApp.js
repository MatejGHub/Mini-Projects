let container = document.querySelector('.container')
let search = document.querySelector('.search-box button')
let weatherBox = document.querySelector('.weather-box')
let weatherDetails = document.querySelector('.weather-details')
let error404 = document.querySelector('.not-found')

search.addEventListener('click', () => {

  const APIkey = '6ab467e6149af4532a021d5e374b2ce2';
  const city = document.querySelector('.search-box input').value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {

  if (json.cod == '404'){
    container.style.height = '350px';
    weatherBox.classList.remove('active')
    weatherDetails.classList.remove('active')
    error404.classList.add('active')
    return;
  } 

    container.style.height = '555px';
    weatherBox.classList.add('active')
    weatherDetails.classList.add('active')
    error404.classList.remove('active')


  const image = document.querySelector('.weather-box img')
  const temperature = document.querySelector('.weather-box .temperature')
  const description = document.querySelector('.weather-box .description')
  const humidity = document.querySelector('.weather-details .humidity span')
  const wind = document.querySelector('.weather-details .wind span')

  switch(json.weather[0].main){
    case 'Clear':
      image.src="Images/clear.png";
      break;
    case 'Cloudy':
      image.src="Images/cloud.png";
      break;
    case 'Mist':
      image.src="Images/mist.png";
      break;
    case 'Rain':
      image.src="Images/rain.png";
      break;
    case 'Mist':
      image.src="Images/mist.png";
      break;
    case 'Haze':
      image.src="Images/mist.png";
      break;

    default:
      image.src="Images/cloud.png";
  }

    temperature.innerHTML = `${Math.round(json.main.temp)} <span>°C</span>`;
    humidity.innerHTML = `${json.main.humidity}<span>%</span>`;
    wind.innerHTML = `${json.wind.speed}<span>km/h</span>`;
    description.innerHTML = `${json.weather[0].description}`;

  })
})