// Add console.log to check to see if our code is working.
console.log("working");


// Create the tile layers that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/dark-v10",
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Dark: dark
};



// Add GeoJSON data.
let airportData = "https://raw.githubusercontent.com/Jforbus/Mapping_Earthquakes/main/Resources/majorAirports.json";
let torontoData = "https://raw.githubusercontent.com/Jforbus/Mapping_Earthquakes/main/Resources/torontoRoutes.json";

let airports = new L.layerGroup();
let routes = new L.layerGroup();

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

let overlayMaps = {
    Airports: airports,
    Routes: routes
}

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [44, -80],
    zoom: 2,
    layers: [dark, airports, routes]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlayMaps).addTo(map);