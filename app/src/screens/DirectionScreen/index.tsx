import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { observer, inject } from "mobx-react";
import { LocationStore } from "@stores";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "@constants";

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
  locationStore?: LocationStore;
}

const API_KEY = "AIzaSyANRoSod9IJ7g6AF60Mq-gDWOJtHzDDJWE";

@inject("locationStore")
@observer
export default class DirecrionScreen extends React.Component<IProps> {
  public map: MapView;
  public coordsFitTimeout;

  public componentDidMount() {
    const station = this.props.navigation.getParam("station");
    const { locationStore } = this.props;
    const destinationCoords = {
      latitude: station.location.coordinates[1],
      longitude: station.location.coordinates[0]
    };
    this.coordsFitTimeout = setTimeout(() => {
      this.map.fitToCoordinates([locationStore.location, destinationCoords], {
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
    const { locationStore } = this.props;
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
            latitude: locationStore.location.latitude,
            longitude: locationStore.location.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
        >
          <Marker
            coordinate={locationStore.location}
            title="You are here"
            pinColor="violet"
          />
          <Marker coordinate={destinationCoords} title={station.name} />
          <MapViewDirections
            origin={locationStore.location}
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
