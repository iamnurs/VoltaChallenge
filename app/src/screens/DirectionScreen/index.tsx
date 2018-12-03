import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface IState {
  stationsLoaded: boolean;
}

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324
};

const API_KEY = "AIzaSyANRoSod9IJ7g6AF60Mq-gDWOJtHzDDJWE";

export default class DirecrionScreen extends React.Component<IProps, IState> {
  public state = {
    stationsLoaded: false
  };

  public map: MapView;
  public coordsFitTimeout;

  public componentDidMount() {
    const station = this.props.navigation.getParam("station");
    const destinationCoords = {
      latitude: station.location.coordinates[1],
      longitude: station.location.coordinates[0]
    };
    this.coordsFitTimeout = setTimeout(() => {
      this.map.fitToCoordinates([initialRegion, destinationCoords], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true
      });
    }, 1000);
  }

  public componentWillUnmount() {
    if (this.coordsFitTimeout) {
      clearTimeout(this.coordsFitTimeout);
    }
  }

  public render() {
    const station = this.props.navigation.getParam("station");
    const destinationCoords = {
      latitude: station.location.coordinates[1],
      longitude: station.location.coordinates[0]
    };
    return (
      <View style={styles.container}>
        <MapView
          style={styles.container}
          ref={ref => (this.map = ref)}
          initialRegion={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.09
          }}
        >
          <Marker
            coordinate={initialRegion}
            title="You are here"
          />
          <Marker coordinate={destinationCoords} title={station.name} />
          <MapViewDirections
            origin={initialRegion}
            destination={destinationCoords}
            apikey={API_KEY}
            strokeWidth={3}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
