
let countryCardWrapper = document.querySelector('.country-card-wrapper')

//country search variables

const countryNameForm = document.getElementById('filter-name')
let countryNameQuery = ""
const clearIcon = document.querySelector(".clear-icon");


const languageForm = document.getElementById('filter-language')
let languageQuery = ""

const regionForm = document.getElementById('filter-region')
let regionValue = ""

const subregionForm = document.getElementById('filter-subregion')
let subregionValue = ""

const populationForm = document.getElementById('filter-population')
let populationValue = ""

//clickable map
 const countryElements = document.getElementById('countries').childNodes;

 const countryCount = countryElements.length;


//start of fetch call



async function getCountries() {
	let response = await fetch('https://restcountries.eu/rest/v2/all');
	let countriesData = await response.json();
return countriesData 

}


function DisplayAndFilterHTML(countriesData){
	let aCountry = countriesData[0];
	let filterResults = []
	
	
    //clickable map

    for (let i = 0; i < countryCount; i++) {
      countryElements[i].onclick = function() {
		  countryNameForm.reset();
		  countryNameQuery = this.getAttribute('data-name')
		 filterResults = countriesData.filter(country => country.name.toUpperCase() === countryNameQuery.toUpperCase())
    displayFilter(filterResults)
		 lightUpMap()
	
      }
    }
	
	
//end of clickable map
				
	// filter options
	countryNameForm.addEventListener('keyup', watchNameForm)
	
    languageForm.addEventListener('submit', watchLanguageForm)

	
	regionForm.addEventListener('change', watchRegionForm)
	
	subregionForm.addEventListener('change', watchSubRegionForm)
	
	populationForm.addEventListener('change', watchPopulationForm)
	
	
//country name search bar

	function watchNameForm(event){
		event.preventDefault();
		countryNameQuery = document.getElementById('country-name').value

      //hide and display clear icon
			if(countryNameQuery && clearIcon.style.visibility != "visible") {
				clearIcon.style.visibility = "visible";
			} else if(!countryNameQuery) {
			  clearIcon.style.visibility = "hidden";
			}

		filterResults = countriesData.filter(country => country.name.toUpperCase() === countryNameQuery.toUpperCase())
		displayFilter(filterResults)
		 lightUpMap()


		clearIcon.addEventListener("click", () => {
			countryNameQuery = "";
			countryNameForm.reset();
			clearIcon.style.visibility = "hidden";
			filterResults = []
			displayFilter(filterResults)
		})

	}
	
//  end of country name search bar

	
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
	 lightUpMap()
	

}
	
	function watchSubRegionForm(event) {
	event.preventDefault();
	let subregionSelect = document.getElementById('subregion-select')
	subregionText = subregionSelect.options[subregionSelect.selectedIndex].text;
	filterResults = countriesData.filter(country => country.subregion === subregionText)
	displayFilter(filterResults)
	 lightUpMap()
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
	 lightUpMap()
}
		
	function lightUpMap() {
		
		
		
		// nested loop - loop through country map, loop through filter results, check for matches, turn yellow.

		  for (let i = 0; i < countryCount; i++) { 
			  		countryElements[i].classList.remove('highlight')


					for(let j = 0; j < filterResults.length; j++) {
						if(countryElements[i].getAttribute('data-name') == filterResults[j].name) {
							countryElements[i].classList.add('highlight')
							countryElements[i].classList.remove('land')

							
						}
					
					}
		  }
	}
				
				
	  function displayFilter(filterResults){
		if (filterResults.length != 0) {
		countryCardWrapper.innerHTML = filterResults.map(createHTML).join('')
		} else {
		countryCardWrapper.innerHTML = "";
		}
      }

}



function createHTML(aCountry) {
return	`
<div class = "country-card">
	<div class = "flag-container">
		<img class ="flag-image" src="${aCountry.flag}" />
		<h2 class = "title">${aCountry.name}</h2>
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

