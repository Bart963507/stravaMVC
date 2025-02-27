import * as model from './model.js';
import MapView from './views/mapView.js';
import SideBarView from './views/sideBarView.js';
import { zoomToActivity } from './helpers.js';



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

      // Step 6: Zoom to the last activity
      zoomToActivity(activities[0])

      this.SideBarView = new SideBarView();

      this.SideBarView.createSideBareElement(activities)

  }
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded - Initializing Controller");
  controller.init();
});

