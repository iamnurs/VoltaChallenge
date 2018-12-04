import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { observer, inject } from "mobx-react";
import { IStationParams } from "@types";
import { LocationStore } from "@stores";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "@constants";

interface IProps {
  loaded?: boolean;
  stations?: IStationParams[];
  locationStore?: LocationStore;
}

@inject("locationStore")
@observer
class Map extends React.Component<IProps> {
  public map: MapView;

  public componentDidUpdate() {
    const { locationStore } = this.props;
    if (locationStore.location) {
      this.map.animateToRegion(
        {
          latitude: locationStore.location.latitude,
          longitude: locationStore.location.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        1000
      );
    }
  }

  public render() {
    const { loaded = false, stations = [], locationStore } = this.props;
    return (
      <MapView style={styles.map} ref={ref => (this.map = ref)}>
        {locationStore.location && (
          <Marker
            coordinate={locationStore.location}
            title="You are here"
            pinColor="violet"
          />
        )}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  indicator: {
    position: "absolute",
    alignSelf: "center"
  }
});

export default Map;
