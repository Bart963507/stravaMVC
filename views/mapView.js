import View from './View.js';
import { setColor, showDetails, highlightObject, highlightSideInfo } from '../helpers.js';


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


    getMap() {
        return this.map; // Provide access to the map
    }
    
    // Function to remove highlights (already exists)
    removeHighlights(e) {
        const clickedElement = e.originalEvent.target;
        if (clickedElement.id !== "map") return;

        const detailEle = document.querySelector("#detail-view");
        detailEle.style.display = "none";

        this.borderLayer.clearLayers();
    }

    // Function to add layers 
    addLayers() {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'false'
        }).addTo(this.map);
    }

    renderPolyLines(coordinatesArr, activitiesArr){
        const polyLineArr =[] // These are the polylines that are rendered on the map
        coordinatesArr.forEach((coordinates) => {
            const activity = activitiesArr.find((stravaActivity) => stravaActivity.id === coordinates.activityID);
            const polylinePath = L.polyline(coordinates["coords"], {
            color: setColor(activity.sport_type), 
            ID: activity.id
        })
        polylinePath.addTo(this.activityLayer);
        polyLineArr.push({
            "activityID":activity.id,
            "polyline":polylinePath})
    })
        return polyLineArr
    }

    addHandler(polyLineArr, activitiesArr){
        console.log(polyLineArr)
        polyLineArr.forEach((polyLine) => {
            const activity = activitiesArr.find((stravaActivity) => stravaActivity.id === polyLine.activityID)
            polyLine["polyline"].on("click", (e) => showDetails(activity, polyLineArr, this.borderLayer))
        })
    }
}

export default MapView;
