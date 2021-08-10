
let countriesWrapper = document.querySelector('.countries-wrapper');
const countryNameForm = document.getElementById('filter-name')
let countryNameQuery = ""

const regionForm = document.getElementById('filter-region')
let regionValue = ""


// ---------  Filters -------------------

async function getCountries() {
	let response = await fetch('https://restcountries.eu/rest/v2/all');
	let countriesData = await response.json();
    
return countriesData 

}


//take the countries data. If the query is empty, then display all. 
//If it is not empty, only display the filtered results

function DisplayAndFilterHTML(countriesData){
	let aCountry = countriesData[0];
	let filterResults = []
	
	// display all countries as default
	countriesWrapper.innerHTML = countriesData.map(createHTML).join('')
				
		
	regionForm.addEventListener('submit', watchRegionForm)

	countryNameForm.addEventListener('submit', watchNameForm)


	function watchNameForm(event){
	event.preventDefault();
    countryNameQuery = document.getElementById('country-name').value
    filterResults = countriesData.filter(country => country.name.toUpperCase() === countryNameQuery.toUpperCase())
    displayFilter(filterResults)

	}			
	
	function watchRegionForm(event) {
	event.preventDefault();
	let regionSelect = document.getElementById('region-select')
	regionValue = regionSelect.options[regionSelect.selectedIndex].value;
	filterResults = countriesData.filter(country => country.region.toUpperCase() === regionValue.toUpperCase())
	displayFilter(filterResults)
}
				
				
	  function displayFilter(filterResults){
		if (filterResults.length != 0) {
		countriesWrapper.innerHTML = filterResults.map(createHTML).join('')
		} else {
		countriesWrapper.innerHTML = countriesData.map(createHTML).join('')
		}
      }

}





function createHTML(aCountry) {
return	`
<div class = "country-card">
   <div class = "flag-container">
<h2 class = "title">${aCountry.name}</h2>
<img class ="flag-image" src="${aCountry.flag}" />
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
				<p><span class ="subheading">Currency:</span>
					${aCountry.currencies.map(currency => {
					return ' ' + currency.name + ' (' + currency.symbol + ')';	
					})}
				</p>
               
	</div>
</div>
`
}




// is search criteria is empty display all countries
// else listen for a click and display countries based on search criteria

//watchForm();

getCountries().then(DisplayAndFilterHTML)

