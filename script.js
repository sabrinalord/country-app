
const countryCardContainer = document.querySelector('.country-card-container')
const countryCardWrapper = document.querySelector('.country-card-wrapper')
const countryCardArrow = document.querySelector('.fa-chevron-right')

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
const mapSvg = document.getElementById('map-svg');



//start of fetch call

async function getCountries() {
	let response = await fetch('https://restcountries.eu/rest/v2/all');
	let countriesData = await response.json();
return countriesData 

}

// end of fetch call



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

		// filter options
		countryNameForm.addEventListener('submit', watchNameForm)
		languageForm.addEventListener('submit', watchLanguageForm)
		regionForm.addEventListener('change', watchRegionForm)
		subregionForm.addEventListener('change', watchSubRegionForm)
		populationForm.addEventListener('change', watchPopulationForm)


		  //country name search bar
		function watchNameForm(event){
			event.preventDefault();
			countryNameQuery = document.getElementById('country-name').value

	

			filterResults = countriesData.filter(country => country.name.includes(countryNameQuery) )
			displayFilter(filterResults)
			 lightUpMap()



		}

	//  end of country name search bar


		function watchLanguageForm(event){
		event.preventDefault();
		languageQuery = document.getElementById('languages').value

		filterResults = countriesData.filter(country => country.languages.includes(languageQuery) )
		console.log(countriesData[5].languages.name)

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
			if (filterResults.length > 1) {
			document.querySelector('.country-card-wrapper').style.opacity="1";
			countryCardContainer.innerHTML = filterResults.map(createHTML).join('');
					countryCardWrapper.classList.remove('country-card-single')
					countryCardWrapper.style.display = "flex";
				showHidearrow()

			} 
			  else if (filterResults.length == 1) {
            countryCardWrapper.style.display = "flex";
			document.querySelector('.country-card-wrapper').style.opacity="1";
			countryCardContainer.innerHTML = filterResults.map(createHTML).join('');
			countryCardWrapper.classList.add('country-card-single');
			countryCardArrow.style.display = "none";
			  }
			  else {
			   countryCardWrapper.style.display = "none";
			}
		  }
	
	

	// show or hide the scrolling chevron for country card wrapper
			
		function showHidearrow() {
					if (countryCardContainer.scrollWidth > countryCardContainer.clientWidth){
						  countryCardArrow.style.display = "block";
					}
					else {
						  countryCardArrow.style.display = "none";
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



//draggable svg map
// If browser supports pointer events
if (window.PointerEvent) {
  mapSvg.addEventListener('pointerdown', onPointerDown); // Pointer is pressed
  mapSvg.addEventListener('pointerup', onPointerUp); // Releasing the pointer
  mapSvg.addEventListener('pointerleave', onPointerUp); // Pointer gets out of the SVG area
  mapSvg.addEventListener('pointermove', onPointerMove); // Pointer is moving
} else {
  // Add all mouse events listeners fallback
 mapSvg.addEventListener('mousedown', onPointerDown); // Pressing the mouse
mapSvg.addEventListener('mouseup', onPointerUp); // Releasing the mouse
  mapSvg.addEventListener('mouseleave', onPointerUp); // Mouse gets out of the SVG area
 mapSvg.addEventListener('mousemove', onPointerMove); // Mouse is moving

  // Add all touch events listeners fallback
 mapSvg.addEventListener('touchstart', onPointerDown); // Finger is touching the screen
  mapSvg.addEventListener('touchend', onPointerUp); // Finger is no longer touching the screen
  mapSvg.addEventListener('touchmove', onPointerMove); // Finger is moving
}


// This function returns an object with X & Y values from the pointer event
function getPointFromEvent (event) {
  var point = {x:0, y:0};
  // If event is triggered by a touch event, we get the position of the first finger
  if (event.targetTouches) {
    point.x = event.targetTouches[0].clientX;
    point.y = event.targetTouches[0].clientY;
  } else {
    point.x = event.clientX;
    point.y = event.clientY;
  }
  
  return point;
}

// This variable will be used later for move events to check if pointer is down or not
var isPointerDown = false;

// This variable will contain the original coordinates when the user start pressing the mouse or touching the screen
var pointerOrigin = {
  x: 0,
  y: 0
};



// Function called by the event listeners when user start pressing/touching
function onPointerDown(event) {
  isPointerDown = true; // We set the pointer as down
  
  // We get the pointer position on click/touchdown so we can get the value once the user starts to drag
  const pointerPosition = getPointFromEvent(event);
  pointerOrigin.x = pointerPosition.x;
  pointerOrigin.y = pointerPosition.y;
}

function onPointerUp() {
  // The pointer is no longer considered as down
  isPointerDown = false;

  // We save the viewBox coordinates based on the last pointer offsets
  viewBox.x = newViewBox.x;
  viewBox.y = newViewBox.y;
}

// We save the original values from the viewBox
const viewBox = {
  x: 0,
  y: 50,
  width: 1200,
  height: 800
};

// The distances calculated from the pointer will be stored here
const newViewBox = {
  x: 0,
  y: 50
};

// Function called by the event listeners when user start moving/dragging
function onPointerMove (event) {
  // Only run this function if the pointer is down
  if (!isPointerDown) {
    return;
  }
  // This prevent user to do a selection on the page
  event.preventDefault();

  // Get the pointer position
  const pointerPosition = getPointFromEvent(event);

  // We calculate the distance between the pointer origin and the current position
  // The viewBox x & y values must be calculated from the original values and the distances
  newViewBox.x = viewBox.x - (pointerPosition.x - pointerOrigin.x);
  newViewBox.y = viewBox.y - (pointerPosition.y - pointerOrigin.y);

  // We create a string with the new viewBox values
  // The X & Y values are equal to the current viewBox minus the calculated distances
  const viewBoxString = `${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`;
  // We apply the new viewBox values onto the SVG
  mapSvg.setAttribute('viewBox', viewBoxString);
  
  document.querySelector('.viewbox').innerHTML = viewBoxString;
}



//Filter button and sidebar

const filterBtn = document.querySelector('.filter-icon-btn')

function openSidebar() {
	document.querySelector('.search-wrapper').style.width = "250px";

}

function closeSidebar() {
	document.querySelector('.search-wrapper').style.width = "0px";

}


// country wrapper close

function closeCountryWrapper(){
	countryCardWrapper.style.display = "none";
}

// country wrapper scroll right

function scrollRight(){
	event.preventDefault();
countryCardContainer.scrollBy({	
  left: 500,
  behavior: 'smooth'
	})
	
}

getCountries().then(DisplayAndFilterHTML)

