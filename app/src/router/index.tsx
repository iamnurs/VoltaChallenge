import { StackNavigator } from 'react-navigation';
import { Welcome } from '@screens';


const Router = StackNavigator(
  {
    Welcome: {
      screen: Welcome,
    },
  },
  {
    headerMode: 'none',
  }
);

export default Router;
