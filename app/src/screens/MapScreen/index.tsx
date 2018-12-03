import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Button } from "react-native-elements";
import { LatLng } from "react-native-maps";
import { observer, inject } from "mobx-react";
import { StationsStore } from "@stores";
import { Map } from "@components";
import { IStationParams } from "@types";

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
  stationsStore?: StationsStore;
}

interface IState {
  stationsLoaded: boolean;
  curLocation: LatLng;
}

@inject("stationsStore")
@observer
export default class MapScreen extends React.Component<IProps, IState> {
  public state = {
    stationsLoaded: false,
    curLocation: { latitude: 37.78825, longitude: -122.4324 }
  };

  public async componentDidMount() {
    const { stationsStore } = this.props;
    await stationsStore.getStations();
    this.setState(prevState => ({ stationsLoaded: !prevState.stationsLoaded }));
  }

  public render() {
    const { stationsStore } = this.props;
    return (
      <View style={styles.container}>
        <Map
          loaded={this.state.stationsLoaded}
          stations={stationsStore.stations}
        />
        <Button
          title="Find Closest"
          onPress={() => this.findClosestStation(stationsStore.stations)}
          icon={{ name: "directions", type: "font-awesome5" }}
          style={styles.button}
        />
        {!this.state.stationsLoaded && (
          <ActivityIndicator style={styles.indicator} size="large" />
        )}
      </View>
    );
  }

  private findClosestStation = (stations: IStationParams[]) => {
    let closestStation = stations[0];
    stations.map(item => {
      if (item.status === "active") {
        const distance =
          (item.location.coordinates[0] - this.state.curLocation.longitude) **
            2 +
          (item.location.coordinates[1] - this.state.curLocation.latitude) ** 2;
        const minDistance =
          (closestStation.location.coordinates[0] -
            this.state.curLocation.longitude) **
            2 +
          (closestStation.location.coordinates[1] -
            this.state.curLocation.latitude) **
            2;
        if (distance < minDistance) {
          closestStation = item;
        }
      }
    });

    this.props.navigation.navigate("Directions", { station: closestStation });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  indicator: {
    position: "absolute",
    alignSelf: "center"
  },
  button: {
    position: "absolute"
  }
});
