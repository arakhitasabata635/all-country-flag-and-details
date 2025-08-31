
const countryCointainer = document.querySelector('.country .container')
const select = document.querySelector('select')
const input = document.querySelector('.search-input')
const body = document.querySelector('body')
const darkMode = document.querySelector('.dark-mode')
let allCountry;

 if(!localStorage.getItem("darkstate")){
  localStorage.setItem("darkstate", JSON.stringify(false))
  }
  let darkState = JSON.parse(localStorage.getItem("darkstate"))
  if(darkState){
    body.classList.add('dark')
  } 
  
function createCuntry(country){
  countryCointainer.innerHTML = ''
country.forEach((countryDetails) => {
  const countryCard = document.createElement('a')
          countryCard.classList.add('country-div')
          countryCard.href= `./country.html?name=${countryDetails.name.common}`
          countryCard.innerHTML= `
          <div class="img-container">
          <img src="${countryDetails.flags.svg}">
        </div>
          <div class="country-details">
            <h3 class="name">${countryDetails.name.common}</h3>
            <p>Population: <span>${countryDetails.population.toLocaleString('en-IN')}</span></p>
            <p>Region: <span>${countryDetails.region}</span></p>
            <p>Capital: <span>${countryDetails.capital?.[0]}</span></p>
          </div>
          `
          countryCointainer.append(countryCard)
    });
}

// all data home page
fetch('https://restcountries.com/v3.1/independent')
.then((res)=> res.json())
.then((data) => {
  allCountry= data
  createCuntry(data)
});
// filter data
select.addEventListener('change', ()=>{
countryCointainer.innerHTML = ''
fetch(`https://restcountries.com/v3.1/region/${select.value}`)
.then((res)=> res.json())
.then((data) => createCuntry(data));
})
// search input
let typingTimer 
 input.addEventListener('input', (e)=> {
    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
     const filteredCountry= allCountry.filter((country)=> country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
     if(filteredCountry[0] === undefined){
      countryCointainer.innerHTML = 'no country found &#128532;'
      countryCointainer.style = `   font-size: 28px; font-weight: 500;margin-top: 150px;`
     }
     else {
      countryCointainer.style = `   font-size: initial; font-weight: initial;margin-top: initial;`
     createCuntry(filteredCountry)
     }
    }, 500);
  })

// dark mode
darkMode.addEventListener('click',()=>{
  darkState = !darkState
  localStorage.setItem("darkstate", JSON.stringify(darkState))
  body.classList.toggle('dark')
})



