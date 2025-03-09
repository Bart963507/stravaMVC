import View from "./View.js"

class SideBarView extends View {
	constructor() {
		super() // Call parent constructor
		this.sideBar = document.getElementById("sidebar")
	}

	setImage(activityType) {
		switch (activityType) {
			case "Hike":
				return "pictures/Hike.png"
			case "Run":
				return "pictures/Run.png"
			case "Ride":
				return "pictures/Ride.png"
			case "TrailRun":
				return "pictures/TrailRun.png"
			case "MountainBikeRide":
				return "pictures/MountainBikeRide.png"
			case "Walk":
				return "pictures/Hike.png"
			default:
				return "pictures/Hike.png"
		}
	}

	createSideBarElements(activities) {
		const elements = []
		//Create top bar element for styling
		activities.forEach((activity) => {
			const li = document.createElement("li")
			li.id = activity["id"]
			const html = `
      <div class="top-bar top-bar-${activity.sport_type}"></div>
      <div class="title">
        <p>
        <b>${activity["name"]}</b><br>
        <br>
        <b>Activiteit:</b> ${activity["sport_type"]}<br>
        <b>Datum:</b> ${activity["start_date_local"].slice(0, 10)}<br>
        <b>Afstand:</b> ${Math.round(activity["distance"] / 1000)} KM <br>
        <b>Duur:</b> ${Math.round(activity["moving_time"] / 60)} Minuten <br>
    </div>
    <div class="logo">
    <img src=${this.setImage(activity.sport_type)} width="50" height="50">
    </div>`

			li.innerHTML = html

			elements.push(li)

			//sideInfoDiv.addEventListener("click", () => showDetails(activity));
		})

		return elements
	}
}

export default SideBarView
