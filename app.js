
const countryCardContainer = document.querySelector('.country-card-container')
const countryCardArrow = document.querySelector('.fa-chevron-right')
const clearIcon = document.querySelector(".clear-icon")
const searchByCountryNameForm = document.getElementById('search-by-country-name-form')


let countriesData
let countryName = ""
let languageQuery = ""
let regionValue = ""
let subregionValue = ""
let populationValue = ""


async function fetchCountriesJSON() {
	let response = await fetch('https://restcountries.com/v2/all');
	let data = await response.json();
	countriesData = data
return data
}

const countriesMap = document.querySelectorAll(".country");


for (const countrySVG of countriesMap) {
	countrySVG.classList.remove("selectedCountryHighlight");

	countrySVG.addEventListener('click', function(event) {
	  let targetCountry = event.target.getAttribute("svg-country-name");
	  filterCountriesData(targetCountry);
  })
}


searchByCountryNameForm.addEventListener('submit', function(event){
	event.preventDefault();
	let searchQuery = document.getElementById('country-name-input').value;
	validateSearchQuery(searchQuery)
});

const validateSearchQuery = (searchQuery) => {
	var errorContainer = document.getElementById("error-container")

    if (document.querySelector(`[svg-country-name="${searchQuery}"]`)) {
	   let targetCountry = searchQuery;
	   filterCountriesData(targetCountry);
   } else {
	errorContainer.textContent = `${searchQuery} is not a valid country`
   }
}


const filterCountriesData = (targetCountry) => {
	highlightActiveCountry(targetCountry);
	let filteredCountry = countriesData.filter(country => country.name === targetCountry);
	displayCountryCard(filteredCountry)
}

const highlightActiveCountry = (targetCountry) => {
	let country = document.querySelector(`[svg-country-name="${targetCountry}"]`);
	document.querySelector(".activeCountry").classList.remove("activeCountry");
	country.classList.add("activeCountry");
}

const displayCountryCard = (filteredCountry) => {
	document.querySelector('.modal-country-wrapper').style.opacity="1";
	countryCardContainer.innerHTML = filteredCountry.map(createCountryCardHTML).join('');
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
					${aCountry.currencies.map(currency => {
					return ' ' + currency.name + ' (' + currency.symbol + ')';	
					})}
				</p>
               
	</div>
</div>
`
}



// event listeners 
// if user clicks on search - display country
// if user clicks on filter - 


// defineFilters
	// get array of all countries
	// if user clicks on language call filterByLanguage()
	// if user clicks on region call filterByRegion()
		// if user clicks on region call filterBySubRegion()
			// if user clicks on region call filterByPopulation()

// filterByLanguage(allCountries)
	// filteredCountryList = filtered array of countries 

// displayCountries(filteredCountryList)
	// takes target countries


// 		// filter options
// 		searchByCountryNameInput.addEventListener('submit', watchNameForm)
// 		 document.getElementById('filter-language').addEventListener('submit', filterByLanguage)
// 		document.getElementById('filter-region').addEventListener('change', watchRegionForm)
// 		document.getElementById('filter-subregion').addEventListener('change', watchSubRegionForm)
// 		document.getElementById('filter-population').addEventListener('change', filterByPopulation(countriesData))


// 		  //search by country name
// 		function watchNameForm(event){
// 			event.preventDefault();
// 			countryNameQuery = document.getElementById('country-name').value

// 			filterResults = countriesData.filter(country => country.name.toUpperCase().includes(countryNameQuery.toUpperCase()) )
// 			displayHTML(filterResults)
// 			 lightUpMap()
// 		}

// 	   //search by language
		

// 		//filter by region
// 		function watchRegionForm(event) {
// 		event.preventDefault(); 
// 		let regionSelect = document.getElementById('region-select')
// 		regionValue = regionSelect.options[regionSelect.selectedIndex].value;
// 		filterResults = countriesData.filter(country => country.region.toUpperCase() === regionValue.toUpperCase())
// 		displayHTML(filterResults)
// 		 lightUpMap()
// 	}
	
// 	   //filter by subregion
// 		function watchSubRegionForm(event) {
// 		event.preventDefault();
// 		let subregionSelect = document.getElementById('subregion-select')
// 		subregionText = subregionSelect.options[subregionSelect.selectedIndex].text;
// 		filterResults = countriesData.filter(country => country.subregion === subregionText)
// 		displayHTML(filterResults)
// 		 lightUpMap()
// 	}

// 		 //filter by population
	

	

// 	// show or hide the scrolling chevron for country card wrapper
// 		function showHidearrow() {
// 					if (countryCardContainer.scrollWidth > countryCardContainer.clientWidth){
// 						  countryCardArrow.style.display = "block";
// 					}
// 					else {
// 						  countryCardArrow.style.display = "none";
// 					}
// 				}
				

// }

// function filterByLanguage(event){
// 	event.preventDefault();
// 	languageQuery = document.getElementById('language').value;
// 	filterResults = countriesData.filter(country => country.languages.some(language => language.name === languageQuery))
// 	displayHTML(filterResults)
// 	lightUpMap()
// 	}	

// 	function filterByPopulation(countriesData) {
// 		let populationSelect = document.getElementById('population-select')
// 		populationValue = populationSelect.options[populationSelect.selectedIndex].value;

// 				filterResults = countriesData.filter(function(country){
// 					if (populationValue == "very-low") {
// 						return country.population >= 0 && country.population <= 20000}
// 					else if (populationValue == "low"){
// 						return country.population >= 20001 && country.population <= 1000000}

// 					else if (populationValue == "medium"){
// 						return country.population >= 1000001 && country.population <= 5000000
// 					}
// 				  else if (populationValue == "high"){
// 						return country.population >= 5000001 && country.population <= 80000000
// 				  }
// 				  else if (populationValue == "very-high"){
// 						return country.population >= 80000001 && country.population <= 2000000000
// 				  }
// 				}) 

// 		displayHTML(filterResults)
// 		lightUpMap()
// 	}



// function displayHTML(filterResults){
// 	if (filterResults.length > 1) {
// 	document.querySelector('.modal-country-details').style.opacity="1";
// 	countryCardContainer.innerHTML = filterResults.map(createHTML).join('');
// 			ModalCountryDetails.classList.remove('country-card-single')
// 			ModalCountryDetails.style.display = "flex";
// 		showHidearrow()

// 	} 
// 	  else if (filterResults.length == 1) {
// 	ModalCountryDetails.style.display = "flex";
// 	document.querySelector('.modal-country-details').style.opacity="1";
// 	countryCardContainer.innerHTML = filterResults.map(createHTML).join('');
// 	ModalCountryDetails.classList.add('country-card-single');
// 	countryCardArrow.style.display = "none";
// 	  }
// 	  else {
// 	   ModalCountryDetails.style.display = "none";
// 	}  
//   }





// function createHTML(aCountry) {
// return	`
// <div class = "country-card">
// 	<div class = "flag-container" style="background-image:url(${aCountry.flag})">
//        <div class = "title-container"><span class = "title">${aCountry.name}</span>
// </div>
// 	</div>
// 		<div class = "stat-container"> 
// 				<p><span class ="subheading">Population:</span> ${aCountry.population.toLocaleString()}</p>
// 				<p><span class ="subheading">Region:</span> ${aCountry.region}</p>
// 				<p><span class ="subheading">Sub Region:</span> ${aCountry.subregion}</p>
// 				<p><span class ="subheading">Languages:</span>
// 					${aCountry.languages.map(language => {
// 					return ' ' + language.name;	
// 					})}
// 				</p>
// 				<p><span class ="subheading">Capital:</span> ${aCountry.capital}</p>
// 				<p><span class ="subheading currency">Currency:</span>
// 					${aCountry.currencies.map(currency => {
// 					return ' ' + currency.name + ' (' + currency.symbol + ')';	
// 					})}
// 				</p>
               
// 	</div>
// </div>
// `
// }



// //draggable svg map
// // If browser supports pointer events
// if (window.PointerEvent) {
//   mapSvg.addEventListener('pointerdown', onPointerDown); // Pointer is pressed
//   mapSvg.addEventListener('pointerup', onPointerUp); // Releasing the pointer
//   mapSvg.addEventListener('pointerleave', onPointerUp); // Pointer gets out of the SVG area
//   mapSvg.addEventListener('pointermove', onPointerMove); // Pointer is moving
// } else {
//   // Add all mouse events listeners fallback
//  mapSvg.addEventListener('mousedown', onPointerDown); // Pressing the mouse
// mapSvg.addEventListener('mouseup', onPointerUp); // Releasing the mouse
//   mapSvg.addEventListener('mouseleave', onPointerUp); // Mouse gets out of the SVG area
//  mapSvg.addEventListener('mousemove', onPointerMove); // Mouse is moving

//   // Add all touch events listeners fallback
//  mapSvg.addEventListener('touchstart', onPointerDown); // Finger is touching the screen
//   mapSvg.addEventListener('touchend', onPointerUp); // Finger is no longer touching the screen
//   mapSvg.addEventListener('touchmove', onPointerMove); // Finger is moving
// }


// // This function returns an object with X & Y values from the pointer event
// function getPointFromEvent (event) {
//   var point = {x:0, y:0};
//   // If event is triggered by a touch event, we get the position of the first finger
//   if (event.targetTouches) {
//     point.x = event.targetTouches[0].clientX;
//     point.y = event.targetTouches[0].clientY;
//   } else {
//     point.x = event.clientX;
//     point.y = event.clientY;
//   }
  
//   return point;
// }

// // This variable will be used later for move events to check if pointer is down or not
// var isPointerDown = false;

// // This variable will contain the original coordinates when the user start pressing the mouse or touching the screen
// var pointerOrigin = {
//   x: 0,
//   y: 0
// };



// // Function called by the event listeners when user start pressing/touching
// function onPointerDown(event) {
//   isPointerDown = true; // We set the pointer as down
  
//   // Get the pointer position on click/touchdown so we can get the value once the user starts to drag
//   const pointerPosition = getPointFromEvent(event);
//   pointerOrigin.x = pointerPosition.x;
//   pointerOrigin.y = pointerPosition.y;
// }

// function onPointerUp() {
//   // The pointer is no longer considered as down
//   isPointerDown = false;

//   // We save the viewBox coordinates based on the last pointer offsets
//   viewBox.x = newViewBox.x;
//   viewBox.y = newViewBox.y;
// }

// // We save the original values from the viewBox
// const viewBox = {
//   x: 0,
//   y: 50,
//   width: 1200,
//   height: 800
// };

// // The distances calculated from the pointer will be stored here
// const newViewBox = {
//   x: 0,
//   y: 50
// };

// // Function called by the event listeners when user start moving/dragging
// function onPointerMove (event) {
//   // Only run this function if the pointer is down
//   if (!isPointerDown) {
//     return;
//   }
//   // This prevent user to do a selection on the page
//   event.preventDefault();

//   // Get the pointer position
//   const pointerPosition = getPointFromEvent(event);

//   // We calculate the distance between the pointer origin and the current position
//   // The viewBox x & y values must be calculated from the original values and the distances
//   newViewBox.x = viewBox.x - (pointerPosition.x - pointerOrigin.x);
//   newViewBox.y = viewBox.y - (pointerPosition.y - pointerOrigin.y);

//   // We create a string with the new viewBox values
//   // The X & Y values are equal to the current viewBox minus the calculated distances
//   const viewBoxString = `${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`;
//   // We apply the new viewBox values onto the SVG
//   mapSvg.setAttribute('viewBox', viewBoxString);
  
//   document.querySelector('.viewbox').innerHTML = viewBoxString;
// }



// //Open and close the side bar

// function openSidebar() {
// 	document.querySelector('.filter-modal').style.width = "250px";

// }

// function closeSidebar() {
// 	document.querySelector('.filter-modal').style.width = "0px";

// }


// // close the country wrapper
// function closeCountryWrapper(){
// 	ModalCountryDetails.style.display = "none";
// }

// // country wrapper scroll right
// function scrollRight(){
// 	event.preventDefault();
// countryCardContainer.scrollBy({	
//   left: 500,
//   behavior: 'smooth'
// 	})
	
// }

fetchCountriesJSON()
