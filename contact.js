document.addEventListener("DOMContentLoaded", function () {
  // Initialiseer map
  const map = L.map("map").setView([51.2194, 4.4025], 13);

  // OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  // Marker Ellermanstraat 33, Antwerpen
  const ellermanMarker = L.marker([51.2228, 4.4120]).addTo(map)
    .bindPopup("<b>Ellermanstraat 33</b><br>Onze winkellocatie 1");

  // Marker August Michielstraat 21, Antwerpen
  const augustMarker = L.marker([51.2180, 4.4035]).addTo(map)
    .bindPopup("<b>August Michielstraat 21</b><br>Onze winkellocatie 2");

  // Zoom zodat beide markers zichtbaar zijn
  const group = new L.featureGroup([ellermanMarker, augustMarker]);
  map.fitBounds(group.getBounds().pad(0.2));
});
