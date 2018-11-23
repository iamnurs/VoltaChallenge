import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import { Welcome, StationsList, CitiesList, StationInfo } from "@screens";

const ListStack = StackNavigator({
  Cities: {
    screen: CitiesList,
    navigationOptions: {
      title: "Available Cities"
    }
  },
  Stations: {
    screen: StationsList
  },
  Info: {
    screen: StationInfo,
    navigationOptions: {
      title: "Station"
    }
  }
});

const TapBar = TabNavigator(
  {
    Map: {
      screen: Welcome,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="map" size={24} color={tintColor} />
        )
      }
    },
    Stations: {
      screen: ListStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="list-ul" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        height: 50
      },
      showLabel: false
    }
  }
);

const Router = StackNavigator(
  {
    Tab: {
      screen: TapBar
    }
  },
  {
    headerMode: "none"
  }
);

export default Router;
