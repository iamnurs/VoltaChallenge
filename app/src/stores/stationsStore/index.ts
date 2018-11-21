import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import {fetchAllStations} from "@api";
import {IStationParams} from "@types"

class StationsStore {
  @persist
  @observable
  public stations: IStationParams[];


  public rootStore;

  public getStations = async() => {
    const stations = await fetchAllStations()
    this.setStations(stations)
  }

  @action
  public setStations = stations => {
    this.stations = stations;
  };
}

export default StationsStore;
