import React from "react";
import { ActivityIndicator, View, StyleSheet, Alert, Text } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Button } from "react-native-elements";
import Modal from "react-native-modal";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import { observer, inject } from "mobx-react";
import { StationsStore, LocationStore } from "@stores";
import { Map } from "@components";
import { IStationParams } from "@types";
import { requestLocationPermission, findClosestStation } from "@utils";

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
  stationsStore?: StationsStore;
  locationStore?: LocationStore;
}

interface IState {
  stationsLoaded: boolean;
}

@inject("stationsStore")
@inject("locationStore")
@observer
export default class MapScreen extends React.Component<IProps, IState> {
  public state = {
    stationsLoaded: false
  };
  public watchId;

  public async componentDidMount() {
    await requestLocationPermission();
    const { stationsStore, locationStore } = this.props;
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000
    })
      .then(() => {
        locationStore.getLocation();
      })
      .catch(err => {
        Alert.alert(
          "This app requires geolocation. Please turn it on and restart app"
        );
      });
    await stationsStore.getStations();
    this.setState(prevState => ({ stationsLoaded: !prevState.stationsLoaded }));
  }

  public componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  public render() {
    const { stationsStore } = this.props;
    return (
      <View style={styles.container}>
        <Map
          navigation={this.props.navigation}
          loaded={this.state.stationsLoaded}
          stations={stationsStore.stations}
        />
        <Modal isVisible={!this.state.stationsLoaded} style={styles.modal}>
          <ActivityIndicator size="large" />
          <Text>Wait a while, getting stations...</Text>
        </Modal>
        <Button
          title="Find Closest"
          onPress={() => this.handleOnButtonPress(stationsStore.stations)}
          icon={{ name: "directions", type: "font-awesome5" }}
          disabled={!this.state.stationsLoaded}
        />
      </View>
    );
  }

  private handleOnButtonPress = (stations: IStationParams[]) => {
    const { locationStore } = this.props;
    const closestStation = findClosestStation(locationStore.location, stations);
    this.props.navigation.navigate("Directions", { station: closestStation });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});
