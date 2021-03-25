// function distance(lat1, lon1, lat2, lon2) {
//   var p = 0.017453292519943295;    // Math.PI / 180
//   var c = Math.cos;
//   var a = 0.5 - c((lat2 - lat1) * p)/2 + 
//           c(lat1 * p) * c(lat2 * p) * 
//           (1 - c((lon2 - lon1) * p))/2;

//   return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
// }

// //or:
// function degreesToRadians(degrees) {
//   return degrees * Math.PI / 180;
// }

// function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
//   var earthRadiusKm = 6371;

//   var dLat = degreesToRadians(lat2-lat1);
//   var dLon = degreesToRadians(lon2-lon1);

//   lat1 = degreesToRadians(lat1);
//   lat2 = degreesToRadians(lat2);

//   var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//           Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//   return earthRadiusKm * c;
// }

//distanceInKmBetweenEarthCoordinates(51.5, 0, 38.8, -77.1) // From London to Arlington 5918.185064088764

//3:

    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calcCrow(lat1, lon1, lat2, lon2) 
    {
      let R = 6371; // km
      let dLat = toRad(lat2-lat1);
      let dLon = toRad(lon2-lon1);
      let lat_1 = toRad(lat1);
      let lat_2 = toRad(lat2);

      let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat_1) * Math.cos(lat_2); 
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      let d = R * c;
      return d;
    }
    // Converts numeric degrees to radians
    function toRad(Value) 
    {return Value * Math.PI / 180}

    module.exports={calcCrow,toRad}