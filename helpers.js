import { getActivity } from "./model.js"

export const setColor = function (activity) {
	switch (activity) {
		case "Hike":
			return "red"
		case "Run":
			return "blue"
		case "Ride":
			return "green"
		case "TrailRun":
			return "purple"
		case "MountainBikeRide":
			return "lightblue"
		default:
			return "black"
	}
}

// THIS NEEDS REFACTOR
export async function showDetails(activity, layerArr, borderLayer) {
	const detailEle = document.querySelector("#detail-view")
	const flexContainer = document.querySelector(".flex-container")
	const statsDiv = document.querySelector(".stats")

	//Clear the information of previous activity
	flexContainer.innerHTML = ""
	statsDiv.innerHTML = ""

	//Show the detail pane
	detailEle.style.display = "flex"
	statsDiv.innerHTML = generatePopup(activity)

	detailEle.append(statsDiv)

	console.log(activity["id"])

	const fullActivity = await getActivity(activity["id"])

	if (fullActivity.photos.count > 0) {
		flexContainer.style.display = "flex"
		const photos = await getPhotos(activity["id"])
		photos.forEach((photo) => {
			const picture = photo.urls["5000"]
			const imgElement = document.createElement("div")
			imgElement.innerHTML = `
                <div class="gallery">
                    <img src= ${picture}>
                </div>
                `
			flexContainer.append(imgElement)
		})
	} else {
		flexContainer.style.display = "none"
	}

	highlightObject(activity, layerArr, borderLayer)
}

// Function to highlight a polyline
export const highlightObject = function (activity, layerArr, borderLayer) {
	console.log(layerArr)

	// Find the layer stored in the layer array
	const clickedLayer = layerArr.find(
		(layer) => layer.polyline.options["ID"] === activity.id
	)

	// Clear the layer where the highlights are stored in
	borderLayer.clearLayers()

	//Add the outline to the map
	const highlightLayer = L.geoJSON(clickedLayer.polyline.toGeoJSON(), {
		style: {
			weight: 7,
			opacity: 1,
			color: "black",
		},
	}).addTo(borderLayer)

	//Add the inner polyline to the map
	const border = L.geoJSON(clickedLayer.polyline.toGeoJSON(), {
		style: {
			weight: 5,
			opacity: 1,
			color: "#39ff14",
		},
	}).addTo(borderLayer)
}

export const highlightSideInfo = function (activity) {
	const clickedLayer = layerArr.find(
		(layer) => layer.options["ID"] === activity.id
	)
	const clickedLayerID = clickedLayer.options.ID
	const sideInfoID = `activity-${clickedLayerID}`

	const sideInfoEle = document.querySelector(`#${sideInfoID}`)

	const parent = sideInfoEle.parentElement
	const parentChildren = [...parent.children]

	parentChildren.forEach((child) => (child.style.border = "none"))

	sideInfoEle.style.border = "thick solid #0000FF"
}
