
let countriesWrapper = document.querySelector('.countries-wrapper')

const countryNameForm = document.getElementById('filter-name')
let countryNameQuery = ""

const languageForm = document.getElementById('filter-language')
let languageQuery = ""

const regionForm = document.getElementById('filter-region')
let regionValue = ""

const subregionForm = document.getElementById('filter-subregion')
let subregionValue = ""

const populationForm = document.getElementById('filter-population')
let populationValue = ""





async function getCountries() {
	let response = await fetch('https://restcountries.eu/rest/v2/all');
	let countriesData = await response.json();
    console.log(countriesData)
return countriesData 

}


function DisplayAndFilterHTML(countriesData){
	let aCountry = countriesData[0];
	let filterResults = []
	
	// display all countries as default
	countriesWrapper.innerHTML = countriesData.map(createHTML).join('')
	
	
    //clickable map
   const countryElements = document.getElementById('countries').childNodes;
    const countryCount = countryElements.length;
    for (let i = 0; i < countryCount; i++) {
      countryElements[i].onclick = function() {
		  countryNameQuery = this.getAttribute('data-name')
		 filterResults = countriesData.filter(country => country.name.toUpperCase() === countryNameQuery.toUpperCase())
    displayFilter(filterResults)
	
	
      }
    }


//end of clickable map
				
	// filter options
	countryNameForm.addEventListener('submit', watchNameForm)
	
    languageForm.addEventListener('submit', watchLanguageForm)

	
	regionForm.addEventListener('change', watchRegionForm)
	
	subregionForm.addEventListener('change', watchSubRegionForm)
	
	populationForm.addEventListener('change', watchPopulationForm)


	function watchNameForm(event){
	event.preventDefault();
    countryNameQuery = document.getElementById('country-name').value
    filterResults = countriesData.filter(country => country.name.toUpperCase() === countryNameQuery.toUpperCase())
    displayFilter(filterResults)

	}	
	
    function watchLanguageForm(event){
	event.preventDefault();
    languageQuery = document.getElementById('language').value
    filterResults = countriesData.filter(function(country) {
		if (country.languages.includes(languageQuery)) 
		{console.log("hi")}}
	)
    displayFilter(filterResults)

	}		
	
	function watchRegionForm(event) {
	event.preventDefault();
	let regionSelect = document.getElementById('region-select')
	regionValue = regionSelect.options[regionSelect.selectedIndex].value;
	filterResults = countriesData.filter(country => country.region.toUpperCase() === regionValue.toUpperCase())
	displayFilter(filterResults)
}
	
	function watchSubRegionForm(event) {
	event.preventDefault();
	let subregionSelect = document.getElementById('subregion-select')
	subregionText = subregionSelect.options[subregionSelect.selectedIndex].text;
	filterResults = countriesData.filter(country => country.subregion === subregionText)
	displayFilter(filterResults)
}
	
	function watchPopulationForm(event) {
	event.preventDefault();
		
	let populationSelect = document.getElementById('population-select')
	populationValue = populationSelect.options[populationSelect.selectedIndex].value;
	
		
			filterResults = countriesData.filter(function(country){
				if (populationValue == "very-low") {
					return country.population >= 0 && country.population <= 20000}
				else if (populationValue == "low"){
					return country.population >= 20001 && country.population <= 1000000}

				else if (populationValue == "medium"){
					return country.population >= 1000001 && country.population <= 5000000
				}
			  else if (populationValue == "high"){
					return country.population >= 5000001 && country.population <= 80000000
			  }
			  else if (populationValue == "very-high"){
					return country.population >= 80000001 && country.population <= 2000000000
			  }


			}) 
	

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

