import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StackNavigator, createBottomTabNavigator } from "react-navigation";
import {
  MapScreen,
  StationsList,
  CitiesList,
  StationInfo,
  DirectionScreen
} from "@screens";

const ListStack = StackNavigator({
  Cities: {
    screen: CitiesList,
    navigationOptions: {
      title: "Available Cities"
    }
  },
  Stations: {
    screen: StationsList
  }
});

const TapBar = createBottomTabNavigator(
  {
    Map: {
      screen: MapScreen,
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
    tabBarOptions: {
      style: {
        height: 50
      },
      showLabel: false
    }
  }
);

const Router = StackNavigator({
  Tab: {
    screen: TapBar,
    navigationOptions: {
      header: null
    }
  },
  Directions: {
    screen: DirectionScreen,
    navigationOptions: {
      title: "Directions"
    }
  },
  Info: {
    screen: StationInfo,
    navigationOptions: {
      title: "Station"
    }
  }
});

export default Router;
