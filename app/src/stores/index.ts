import AccountStore from './accountStore';

class RootStore {
  public accountStore: AccountStore;

  constructor() {
    this.accountStore = new AccountStore();
  }
}

const rootStore = new RootStore();

export default rootStore;
export { AccountStore };
