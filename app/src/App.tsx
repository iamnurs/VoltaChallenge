import React, { SFC } from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import Router from './router';
// import rootStore from './stores';
// import packageJson from '../package.json';

// rootStore.settingsStore.setVersion(packageJson.version);

configure({ enforceActions: true, computedRequiresReaction: true });
const App: SFC = () => {
  return (
    <Provider>
      <Router />
    </Provider>
  );
};

export default App;
