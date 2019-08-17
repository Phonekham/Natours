console.log("hello from client side");
const locations = JSON.parse(document.getElementById("map").dataset.locations);

mapboxgl.accessToken =
  "pk.eyJ1IjoicGhvbmVraGFtIiwiYSI6ImNqeGlwZDNsdTBxamIzeG10OGg0YnRtZ3oifQ.6IMNjVL6bLc-AGGbNse2VA";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/phonekham/cjzf77m8v0xkl1cmn7rfoknut",
  scrollZoom: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // create marker
  const el = document.createElement("div");
  el.className = "marker";
  // add marker
  new mapboxgl.Marker({
    element: el,
    anchor: "bottom"
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);
  // extend the map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 200,
    left: 100,
    right: 100
  }
});
