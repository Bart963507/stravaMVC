import View from './View.js';
import { generatePopup } from '../helpers.js';

class SideBarView extends View {
    constructor() {
        super(); // Call parent constructor
        this.sideBar = document.getElementById("sidebar");
    
    }

    setImage(activityType){
        switch (activityType) {
          case "Hike":
            return "pictures/Hike.png";
          case "Run":
            return "pictures/Run.png";
          case "Ride":
            return "pictures/Ride.png";
          case "TrailRun":
            return "pictures/TrailRun.png";
          case "MountainBikeRide":
            return "pictures/MountainBikeRide.png";
          case "Walk":
            return "pictures/Hike.png";
          default:
            return "pictures/Hike.png";
      }
    }


createSideBareElement(activities){
//Create top bar element for styling
    activities.forEach((activity) => {
    const topBarDiv = document.createElement("div")
    topBarDiv.classList.add('top-bar', `top-bar-${activity.sport_type}`);

    //Create img elelemnt
    const logo =  Object.assign(document.createElement("img"), {
    src: this.setImage(activity.sport_type),
    width: 50,
    height:50
    });

    const logoDiv = Object.assign(document.createElement("div"), {
    className: "logo",
    });


    // Create title element
    const title = document.createElement("p");
    title.innerHTML = generatePopup(activity)
    const titleDiv = Object.assign(document.createElement("div"), {
    className: "title",
    });

    const sideInfoDiv = Object.assign(document.createElement("li"), {
    id: `activity-${activity["id"]}`,
    class: "sideInfoDiv",
    });

    sideInfoDiv.append(topBarDiv);

    sideInfoDiv.append(titleDiv);
    titleDiv.append(title);

    sideInfoDiv.append(logoDiv);
    logoDiv.append(logo);

    //sideInfoDiv.addEventListener("click", () => showDetails(activity));
    sideInfoDiv.addEventListener("click", () => zoomToActivity(polylinePath, map, activity));
    this.sideBar.append(sideInfoDiv);
})}



}

export default SideBarView;