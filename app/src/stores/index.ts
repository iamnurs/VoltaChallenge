import StationsStore from "./stationsStore";
import CitiesStore from "./citiesStore";

class RootStore {
  public stationsStore: StationsStore;
  public citiesStore: CitiesStore;

  constructor() {
    this.citiesStore = new CitiesStore();
    this.stationsStore = new StationsStore(this.citiesStore);
  }
}

const rootStore = new RootStore();

export default rootStore;
export { StationsStore, CitiesStore };
