import * as model from './model.js';
import MapView from './views/mapView.js';
import sideBarView from './views/sideBarView.js';



const controller = {
  async init() {
      console.log("Controller initializing...");

      // Step 1: Initialize the Model and save the activities in a variable
      const activities = await model.init();

      // Step 2: Initialize MapView
      this.MapView = new MapView();  // Create an instance of MapView
      const activityLayer= this.MapView.activityLayer

      // Step 3: Add acitivites to map
      this.MapView.addActivities(activities, activityLayer);

      // Step 4: Zoom to the last activity
      this.MapView.zoomToActivity(activities[0])


  }
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded - Initializing Controller");
  controller.init();
});

