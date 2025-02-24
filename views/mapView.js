import View from './View.js';

class MapView extends View {
    constructor() {
        super(); // Call parent constructor


        // Initialize map
        this.map = L.map('map').setView([51.505, -0.09], 13);

        // Initialize layers
        this.borderLayer = L.layerGroup().addTo(this.map);
        this.activityLayer = L.layerGroup().addTo(this.map);

        // Attach event listener
        this.map.on("click", (e) => this.removeHighlights(e));

        // Add tile layer
        this.addLayers();
    }

    removeHighlights(e) {
        const clickedElement = e.originalEvent.target;
        if (clickedElement.id !== "map") return;

        const detailEle = document.querySelector("#detail-view");
        detailEle.style.display = "none";

        this.borderLayer.clearLayers();
    }

    addLayers() {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'false'
        }).addTo(this.map);
    }
}

export default MapView;
