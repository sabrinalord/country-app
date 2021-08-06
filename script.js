
const countryNameForm = document.getElementById('country-name-form')
const urlBase = 'https://restcountries.eu/rest/v2/'
let countryName = ""
let countriesWrapper = document.querySelector('.countries-wrapper');



// ---------  Filters -------------------


	
countryNameForm.addEventListener("submit", event => {
	event.preventDefault();
	let country = countryNameForm.elements[0].value

})

async function getCountries() {
	let response = await fetch('https://restcountries.eu/rest/v2/all');
	let data = await response.json();	
	return data;

}



function createHTML(aCountry) {
return	`
<div class = "country-card">
   <div class = "flag-container">
<h2 class = "title">${aCountry.name}</h2>
<img class ="flag-image" src="${aCountry.flag}" />
</div>
		<div class = "stat-container"> 
			
				
				<p><span class ="subheading">Population:</span> ${aCountry.population}</p>
				<p><span class ="subheading">Sub Region:</span> ${aCountry.subregion}</p>
				<p><span class ="subheading">Languages:</span>
					${aCountry.languages.map(language => {
					return ' ' + language.name;	
					})}
				</p>
				<p><span class ="subheading">Capital:</span> ${aCountry.capital}</p>
				<p><span class ="subheading">Currency:</span>
					${aCountry.currencies.map(currency => {
					return ' ' + currency.name + ' (' + currency.symbol + ')';	
					})}
				</p>
               
	</div>
</div>
`
}

function displayHTML(countries){
let aCountry = countries[20];
	countriesWrapper.innerHTML = countries.map(createHTML).join('');

}

getCountries().then(displayHTML)


