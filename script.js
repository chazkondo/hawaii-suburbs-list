// Replace this URL with the actual Overpass Turbo query URL
const overpassUrl = 'https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];area[name="Hawaii"]->.searchArea;(relation["boundary"="administrative"](area.searchArea);node["place"="city"](area.searchArea);node["place"="town"](area.searchArea);node["place"="suburb"](area.searchArea););out body;>;out skel qt;';

fetch(overpassUrl)
  .then(response => response.json())
  .then(data => {
    const parsedData = parseData(data);
    displayLocations(parsedData);
  })
  .catch(error => console.error('Error fetching data:', error));

function parseData(data) {
  const places = {
    cities: [],
    towns: [],
    suburbs: []
  };

  data.elements.forEach(element => {
    if (element.type === 'node' && element.tags) {
      if (element.tags.place === 'city') {
        places.cities.push(element);
      } else if (element.tags.place === 'town') {
        places.towns.push(element);
      } else if (element.tags.place === 'suburb') {
        places.suburbs.push(element);
      }
    }
  });

  return places;
}

function displayLocations(places) {
  const citiesList = document.getElementById('citiesList');
  const townsList = document.getElementById('townsList');
  const suburbsList = document.getElementById('suburbsList');

  places.cities.forEach(city => {
    const listItem = document.createElement('li');
    listItem.textContent = city.tags.name;
    citiesList.appendChild(listItem);
  });

  places.towns.forEach(town => {
    const listItem = document.createElement('li');
    listItem.textContent = town.tags.name;
    townsList.appendChild(listItem);
  });

  places.suburbs.forEach(suburb => {
    const listItem = document.createElement('li');
    listItem.textContent = suburb.tags.name;
    suburbsList.appendChild(listItem);
  });
}
