import { IStationParams } from "@types";

const findClosestStation = (curLocation, stations: IStationParams[]) => {
  let closestStation = stations[0];
  stations.map(item => {
    if (item.status === "active") {
      const distance =
        (item.location.coordinates[0] - curLocation.longitude) ** 2 +
        (item.location.coordinates[1] - curLocation.latitude) ** 2;
      const minDistance =
        (closestStation.location.coordinates[0] - curLocation.longitude) ** 2 +
        (closestStation.location.coordinates[1] - curLocation.latitude) ** 2;
      if (distance < minDistance) {
        closestStation = item;
      }
    }
  });
  return closestStation;
};

export { findClosestStation };
