const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1');
const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const topDomain = document.querySelector('.top-domain');
const currency = document.querySelector('.currency');
const lang = document.querySelector('.lang');
const borderCountries = document.querySelector('.border-countries')
const shimmer = document.querySelector('.shimmer');
const themeChanger = document.querySelector('.theme-changer');




const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`

fetch(url).then((res)=>
    res.json()).then(([country])=> {
    shimmer.style.display = "none"
    flagImage.style.border="1px solid #ddd";

    flagImage.src = country.flags.svg
    countryNameH1.innerText = country.name.common
    if (country.name.nativeName) {
        nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
        nativeName.innerText = country.name.common
    }
    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText = country.region
    subRegion.innerText = country.subregion
    if (country.capital) {
        capital.innerText = country.capital.join(", ")
    }
   
    if (country.currencies) {
        let c = Object.values(country.currencies).map((currency)=> currency.name).join(", ")
        currency.innerText = c 
    }
    

    let l = Object.values(country.languages).join(", ");

    lang.innerText = l
    topDomain.innerText = country.tld.join(", ")

    if(country.borders) {
        country.borders.forEach((border)=> {
            console.log(border)
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=> res.json()).then(([borderCountry])=> {
                //<a href="#">South Georgia</a>&nbsp 
                const borderCountryTag = document.createElement('a');
                borderCountryTag.innerText = borderCountry.name.common
                borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                borderCountries.append(borderCountryTag)
            })
        })
    }
})

let m = localStorage.getItem("mode")
console.log(m)
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