export const setColor = function(activity) {
    switch (activity) {
      case "Hike":
        return "red";
      case "Run":
        return "blue";
      case "Ride":
        return "green";
      case "TrailRun":
        return "purple";
      case "MountainBikeRide":
        return "lightblue";
      default:
        return "black";
    }
  }