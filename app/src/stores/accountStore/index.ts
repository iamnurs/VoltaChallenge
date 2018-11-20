import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

class AccountStore {
  @persist
  @observable
  public currentLanguage: string;
  @observable public currentVersion: string;

  @persist
  @observable
  public pinCode;

  public rootStore;

  @action
  public setCode = pinCode => {
    this.pinCode = pinCode;
  };

  @action
  public setVersion = version => {
    this.currentVersion = version;
  };
}

export default AccountStore;
