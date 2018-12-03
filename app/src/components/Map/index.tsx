import React, { FunctionComponent } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, LatLng } from "react-native-maps";
import { IStationParams } from "@types";

interface IProps {
  loaded?: boolean;
  stations?: IStationParams[];
  curLocation?: LatLng;
}

const Map: FunctionComponent<IProps> = props => {
  const {
    loaded = false,
    stations = [],
    curLocation = { latitude: 37.78825, longitude: -122.4324 }
  } = props;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: curLocation.latitude,
          longitude: curLocation.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09
        }}
      >
        <Marker
          coordinate={curLocation}
          title="You are here"
          pinColor="violet"
        />
        {loaded &&
          stations.map(station => (
            <Marker
              key={station.id}
              coordinate={{
                latitude: station.location.coordinates[1],
                longitude: station.location.coordinates[0]
              }}
              title={station.name}
              description={station.status}
            />
          ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  indicator: {
    position: "absolute",
    alignSelf: "center"
  }
});

export default Map;
