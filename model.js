import { settings , params } from "./config.js";

 export const getAuth = async function(){

    const body = {
      "client_id": settings["CLIENT_ID"],
      "client_secret": settings["CLIENT_SECRET"],
      "grant_type": "refresh_token",
      "refresh_token": settings["REFRESH_TOKEN"],
      "f": "json"
    }

    try{
         // Make the GET request using fetch
        const request = await fetch("https://www.strava.com/oauth/token", {
            method: 'POST',
            body:  JSON.stringify(body),
            headers:{
                "Content-Type": "application/json"
            }
    })
     // Parse the response body
    const response = await request.json();
    const accessToken = response["access_token"]
    // return the accestoken 
    return accessToken

} catch (err) {
 console.error('Network error:', err);
 return null
    }
}


// Define the Strava API endpoint for fetching activities
const url = "https://www.strava.com/api/v3/athlete/activities";
console.log(params.PER_PAGE)
const requestParams = { per_page: params["PER_PAGE"], page: params["PAGE"] };
const queryString = new URLSearchParams(requestParams).toString();
const fullUrl = `${url}?${queryString}`;


export const getActivities = async function (accessToken) {
  try {

    // Make the GET request using fetch
    const request = await fetch(fullUrl, {
      method: "GET",
      params: requestParams,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
};


export const init = async function (){
  const accessToken = await getAuth();
  return (await getActivities(accessToken));
}





export const getActivity = async function (activityID) {
  try {
    const accessToken = await getAuth();
    const activityUrl = `https://www.strava.com/api/v3/activities/${activityID}`
    // Make the GET request using fetch
    const request = await fetch(activityUrl, {
      method: "GET",
      params: requestParams,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getPhotos = async function (activityID) {
  try {
    const accessToken = await getAuth();
    const activityUrl = `https://www.strava.com/api/v3/activities/${activityID}/photos?size=5000`
    // Make the GET request using fetch
    const request = await fetch(activityUrl, {
      method: "GET",
      params: requestParams,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
};


export const generatePolyLines = function (activities){
  const coordinatesArr =[] // These are the coordinates of the encoded polylines that are decoded
  activities.forEach((activity) => {
      const encodedPolyline = activity.map.summary_polyline;
      const coordinates = polyline.decode(encodedPolyline);
      coordinatesArr.push({
          "activityID":activity.id,
          "coords":coordinates
      })
  })
  return coordinatesArr
}