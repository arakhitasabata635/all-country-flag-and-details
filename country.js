const allData = document.querySelector('.all-data')
const body = document.querySelector('body')
const darkMode = document.querySelector('.dark-mode')

let darkState = JSON.parse(localStorage.getItem("darkstate"))
  if(darkState){
    body.classList.add('dark')
  }

const countryURLName = new URLSearchParams(window.location.search).get('name')
fetch(`https://restcountries.com/v3.1/name/${countryURLName}?fullText=true`)
.then((res) => res.json())
.then(([data]) =>{
    allData.innerHTML =`
    <img class="country-img" src= '${data.flags.svg}' />
        <div class=" country-data">
          <h1 class="name">${data.name.common}</h1>
          <div class="country-text">
            <p>Native Name: <span>${Object.values(data.name.nativeName)[0].common}</span></p>
            <p>Population: <span>${data.population.toLocaleString('en-IN')}</span></p>
            <p>Region: <span>${data.region}</span></p>
            <p>Sub Region: <span>${data.subregion}</span></p>
            <p>Capital: <span>${data.capital}</span></p>
            <p>Top Lavel Domain: <span>${data.tld}</span></p>
            <p>Currencies: <span>${Object.values(data.currencies).map((currency) => currency.name).join(', ')}</span></p>
            <p>Languages: <span>${Object.values(data.languages).join(', ')}</span></p>
          </div>
          <div class="border-countries"> <span>Border Countries:</span> </div>
        </div>
    `
    // border
const borderCountriesContainer = document.querySelector('.border-countries')
const borderArray = data.borders
if(borderArray){
    borderArray.forEach(code => {
        fetch(`https://restcountries.com/v3.1/alpha/${code}`)
        .then((res) =>res.json())
        .then(([borderCountries]) => {
        const item= document.createElement('a')
        item.classList.add('border')
        item.href = `/country.html?name=${borderCountries.name.common}`
        item.innerText= `${borderCountries.name.common}`
        borderCountriesContainer.append(item)
        })
    });
}
    
})

  
// dark mode
darkMode.addEventListener('click',()=>{
  darkState = !darkState
  localStorage.setItem("darkstate", JSON.stringify(darkState))
  body.classList.toggle('dark')
})



