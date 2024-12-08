const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')

const themeChanger = document.querySelector('.theme-changer');

let allCountriesData

fetch('https://restcountries.com/v3.1/all').then((res)=>
res.json()).then((data) => {
    renderCountries(data)
    allCountriesData = data
});

filterByRegion.addEventListener('change', (e)=> {
    console.log(e.target.value)
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`).then((res)=>
        res.json()
        ).then(renderCountries)
})

function renderCountries(data) {
    countriesContainer.innerHTML = ""
    data.forEach(country => {
        const countryCard = document.createElement('a')

        countryCard.classList.add('country-card');
        countryCard.href = `/country.html?name=${country.name.common}`
        const cardHTML = `
                <div class="country-img">
                <img src="${country.flags.svg}" alt="${country.name.common} flag"/>
                </div>
                <div class="card-text">
                    <h3 class="country-title">${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital}</p>
                </div>
`

        countryCard.innerHTML = cardHTML;

        countriesContainer.append(countryCard);
        console.log(country)

    });
}



searchInput.addEventListener('input', (e) => {
    console.log(e.target.value)
    console.log(allCountriesData)
    const filteredCountries = allCountriesData.filter((country)=> country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    console.log(filteredCountries)
    renderCountries(filteredCountries)
})

    let m = localStorage.getItem("mode")
    if (m == "dark") {
        document.body.classList.add("dark")
        themeChanger.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode'
    }
    

themeChanger.addEventListener('click', (e)=> {
    document.body.classList.toggle('dark');
    let c = document.body.classList.contains('dark');
    console.log(c)
    if (c) {
        themeChanger.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode'
        localStorage.setItem("mode", "dark");
    } else {
        themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode'
        localStorage.setItem("mode", "");
    }
})