import StationsStore from './stationsStore';

class RootStore {
  public stationsStore: StationsStore;

  constructor() {
    this.stationsStore = new StationsStore();
  }
}

const rootStore = new RootStore();

export default rootStore;
export { StationsStore };
