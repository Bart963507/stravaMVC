import * as model from './model.js';
import MapView from './views/mapView.js';
import SideBarView from './views/sideBarView.js';

function zoomToActivity(activity, map) {
  const encodedPolyline = activity.map.summary_polyline;
  const coordinates = polyline.decode(encodedPolyline);
  map.fitBounds(coordinates);
}


const controller = {
  async init() {
      console.log("Controller initializing...");

      // Step 1: Initialize the Model and save the activities in a variable
      const activities = await model.init();

      // Step 2: Initialize MapView
      this.MapView = new MapView();  // Create an instance of MapView
      const activityLayer= this.MapView.activityLayer

      // Step 3: Generate the polylines from the strava activities
      const coordinatesArr = model.generatePolyLines(activities);
  
      // Step 4: Render the polylines on the map
      const polyLineArr = this.MapView.renderPolyLines(coordinatesArr, activities);

      // Step 5: Add eventhandlers to each rendered polyline
      this.MapView.addHandler(polyLineArr, activities)

      // Step 6: Set the map variable
      this.map = this.MapView.map

      // Step 6: Zoom to the last activity
      zoomToActivity(activities[0], this.map)

      this.SideBarView = new SideBarView();

      const sideBarElements = this.SideBarView.createSideBarElements(activities)
      console.log(sideBarElements)

      const sideBar = document.querySelector('#sidebar')

      sideBarElements.forEach((sideBarElement, index) => {
        sideBarElement.addEventListener("click", () => zoomToActivity(activities[index], this.map));
        sideBar.append(sideBarElement);
    });

      
    

      

  }
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded - Initializing Controller");
  controller.init();
});


