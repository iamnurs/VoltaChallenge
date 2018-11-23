import { observable, action } from "mobx";
import { persist } from "mobx-persist";
import { ICityParams, IStationParams } from "@types";

class CitiesStore {
  @persist
  @observable
  public cities: ICityParams[] = [];

  public rootStore;

  public getCities = (stations: IStationParams[]) => {
    let cities: ICityParams[] = [];

    stations.map(item => {
      if (item.city) {
        const city = cities.find(
          element => element.name === item.city && element.state === item.state
        );
        if (!city) {
          const tempCity = {
            name: item.city,
            stationsNumber: 1,
            latitude: item.location.coordinates[1],
            longitude: item.location.coordinates[0],
            state: item.state
          };
          cities = [...cities, tempCity];
        } else {
          city.stationsNumber += 1;
        }
      }
    });

    cities.sort((first, second) => first.name.localeCompare(second.name));
    this.setCities(cities);
  };

  @action
  public setCities = cities => {
    this.cities = cities;
  };
}

export default CitiesStore;
