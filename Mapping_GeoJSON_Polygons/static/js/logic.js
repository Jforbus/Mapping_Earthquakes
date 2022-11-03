// Add console.log to check to see if our code is working.
console.log("working");


// Create the tile layers that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/satellite-streets-v11",
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Streets: streets,
    Satellite: satelliteStreets
};



// Add GeoJSON data.
let airportData = "https://raw.githubusercontent.com/Jforbus/Mapping_Earthquakes/main/Resources/majorAirports.json";
let torontoData = "https://raw.githubusercontent.com/Jforbus/Mapping_Earthquakes/main/Resources/torontoRoutes.json";
let torontoHoods = "https://raw.githubusercontent.com/Jforbus/Mapping_Earthquakes/main/Resources/torontoNeighborhoods.json"

let airports = L.layerGroup();
let routes = L.layerGroup();
let hoods = L.layerGroup();

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, { onEachFeature: function(feature, layer){
    layer.bindPopup("<h3>Airport Code: " + feature.properties.faa + "</h3><hr><h4>Airport Name: " + feature.properties.name + "</h4>")}
}).addTo(airports)
});

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data,{
    style: {
        color: 'red',
        weight: 2
    }}).addTo(routes)
});

d3.json(torontoHoods).then(function(data) {
    console.log(data);
    L.geoJson(data).addTo(hoods)
})

let overlayMaps = {
    Airports: airports,
    Routes: routes,
    Neighborhoods: hoods
}

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets, airports, routes, hoods]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlayMaps).addTo(map);