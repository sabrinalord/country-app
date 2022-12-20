const countryCardContainer = document.querySelector('.country-card-container')
const searchByCountryNameInput = document.getElementById('search-by-country-name-form')
const countriesMap = document.querySelectorAll(".country")
let countriesData

fetch('https://restcountries.com/v2/all').then((response) => {
	if (response.ok) {
	  return response.json();
	}
	throw new Error('Something went wrong');
  })
  .then((responseJson) => {
	return countriesData = responseJson
  })
  .catch((error) => {
	console.log(error)
  });

searchByCountryNameInput.addEventListener('submit', function(event){
	event.preventDefault();
	clearSearchErrorMessage();
	let searchQuery = document.getElementById('country-name-input').value;
	validateSearchQuery(searchQuery)
});

const validateSearchQuery = (searchQuery) => {
	let errorContainer = document.getElementById("error-container")
    if (document.querySelector(`[svg-country-name="${searchQuery}"]`)) {
	   let SVGtargetCountry = searchQuery;
	   filterByCountryName(SVGtargetCountry);
   } else {
	errorContainer.textContent = `${searchQuery} is not a valid country`
   }
}

const clearSearchErrorMessage = () => {
	document.getElementById("error-container").textContent = "";
}

for (const countrySVG of countriesMap) {
	countrySVG.addEventListener('click', function(event) {
	  let SVGtargetCountry = event.target.getAttribute("svg-country-name");
	  filterByCountryName(SVGtargetCountry);
  })
}

const filterByCountryName = (SVGtargetCountry) => {
	let filteredCountryJSON = countriesData.filter(country => country.name === SVGtargetCountry);
	displayCountryCard(filteredCountryJSON)
}

const highlightActiveCountries = (filteredCountryArray) => {
	clearHighlightedCountries()
	for (const country of filteredCountryArray) {
		for (const countrySVG of countriesMap) {
			 if(country.name === countrySVG.getAttribute("svg-country-name")) {
				document.querySelector(`[svg-country-name="${country.name}"]`).classList.add("activeCountry");
			 }
		 }
		}
}

const clearHighlightedCountries = () => {
	for (const countrySVG of countriesMap) {
		countrySVG.classList.remove("activeCountry");

	}
}

const displayCountryCard = (filteredCountryJSON) => {
	openModalCountryWrapper();
	highlightActiveCountries(filteredCountryJSON);
	document.querySelector('.modal-country-wrapper').style.opacity="1";
	countryCardContainer.innerHTML = filteredCountryJSON.map(createCountryCardHTML).join('');
}

const createCountryCardHTML = (aCountry) => {
return	`
<div class = "country-card">
	<div class = "flag-container" style="background-image:url(${aCountry.flag})">
       <div class = "title-container"><span class = "title">${aCountry.name}</span>
</div>
	</div>
		<div class = "stat-container"> 
				<p><span class ="subheading">Population:</span> ${aCountry.population.toLocaleString()}</p>
				<p><span class ="subheading">Region:</span> ${aCountry.region}</p>
				<p><span class ="subheading">Sub Region:</span> ${aCountry.subregion}</p>
				<p><span class ="subheading">Languages:</span>
					${aCountry.languages.map(language => {
					return ' ' + language.name;	
					})}
				</p>
				<p><span class ="subheading">Capital:</span> ${aCountry.capital}</p>
				<p><span class ="subheading currency">Currency:</span>
				
				${aCountry.currencies ? 
					aCountry.currencies.map(currency => { 
					return currency.name + "(" + currency.symbol + ")";		
					})
				
					: "Currency unconfirmed"} 
				
				</p>
               
	</div>
</div>
`
}

const filterByLanguage = (event) => {
	event.preventDefault();
	let languageQuery = document.getElementById('language').value;
	let filteredCountryJSON = countriesData.filter(country => 
		country.languages.some(language => language.name.toUpperCase() === languageQuery.toUpperCase())
		)
	displayCountryCard(filteredCountryJSON)
}	
document.getElementById('filter-language').addEventListener('submit', filterByLanguage);

const filterByRegion = (event) => {
	event.preventDefault(); 
	let regionSelect = document.getElementById('region-select')
	regionValue = regionSelect.options[regionSelect.selectedIndex].value;
	filterResults = countriesData.filter(country => country.region.toUpperCase() === regionValue.toUpperCase())
	displayCountryCard(filterResults)
}
document.getElementById('filter-region').addEventListener('change', filterByRegion);


const filterBySubregion = (event) => {
	event.preventDefault();
	let subregionSelect = document.getElementById('subregion-select')
	subregionText = subregionSelect.options[subregionSelect.selectedIndex].text;
	filterResults = countriesData.filter(country => country.subregion.toUpperCase() === subregionText.toUpperCase())
	displayCountryCard(filterResults)
}
document.getElementById('filter-subregion').addEventListener('change', filterBySubregion);


const populationSlider = document.getElementById("populationSlider");
document.getElementById("populationDisplay").innerHTML = populationSlider.value; ;

populationSlider.oninput = function() {
	let populationQuery = populationSlider.value
	document.getElementById("populationDisplay").innerHTML = populationQuery
	filterByPopulationSlider(populationQuery)
}

const filterByPopulationSlider = (populationQuery) => {
	filterResults = countriesData.filter(country => country.population <= populationQuery)
	displayCountryCard(filterResults)
}

const filterByPopulation = () => {
	let populationSelect = document.getElementById('population-select')
	populationValue = populationSelect.options[populationSelect.selectedIndex].value;

	filterResults = countriesData.filter(function(country){
		if (populationValue == "under-5000") {
			return country.population >= 0 && country.population <= 5000}
		else if (populationValue == "5000-50000"){
			return country.population >= 5001 && country.population <= 50000}
		else if (populationValue == "50000-100000"){
			return country.population >= 50001 && country.population <= 100000
		}
		else if (populationValue == "100000-500000"){
			return country.population >= 100001 && country.population <= 500000
		}
		else if (populationValue == "500000-1million"){
			return country.population >= 500001 && country.population <= 100000000
		}
		else if (populationValue == "1million-50million"){
			return country.population >= 100000001 && country.population <= 50000000000
		}
		else if (populationValue == "50million-80million"){
			return country.population >= 50000000001 && country.population <= 80000000000
		}
		else if (populationValue == "80million-100million"){
			return country.population >= 80000000001 && country.population <= 1000000000
		}
		else if (populationValue == "Over-100million"){
			return country.population >= 100000001
		}
	});
	displayCountryCard(filterResults)
}
document.getElementById('filter-population').addEventListener('change', filterByPopulation);