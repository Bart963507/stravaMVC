import View from './View.js';
import { setColor, showDetails, highlightObject, highlightSideInfo } from '../helpers.js';

class MapView extends View {
    constructor() {
        super(); // Call parent constructor
        console.log("loading map");

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

    // Function to remove highlights (already exists)
    removeHighlights(e) {
        const clickedElement = e.originalEvent.target;
        if (clickedElement.id !== "map") return;

        const detailEle = document.querySelector("#detail-view");
        detailEle.style.display = "none";

        this.borderLayer.clearLayers();
    }

    // Function to add layers (already exists)
    addLayers() {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'false'
        }).addTo(this.map);
    }

    /// For each activity add it to the map and create information and the left.
    addActivities(activities, activityLayer){
        const layerArr =[]

        activities.forEach((activity) => {
         const encodedPolyline = activity.map.summary_polyline;
         const coordinates = polyline.decode(encodedPolyline);
         const polylinePath = L.polyline(coordinates, {
            color: setColor(activity.sport_type), 
            ID: activity.id
    })
    
        polylinePath.on("click", (e) => showDetails(activity))
        layerArr.push(polylinePath)
        polylinePath.addTo(activityLayer);
        return layerArr
        })}

    
  zoomToActivity(activity) {
    const encodedPolyline = activity.map.summary_polyline;
    const coordinates = polyline.decode(encodedPolyline);
    this.map.fitBounds(coordinates);
  }
}

export default MapView;
