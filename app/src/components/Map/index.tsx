import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, MapViewProps } from "react-native-maps";
import { IStationParams } from "@types";

interface IProps extends MapViewProps {
  loaded: boolean;
  stations: IStationParams[];
}

export default class Map extends React.Component<IProps> {
  public keyExtractor = (item: IStationParams): string => {
    return item.id;
  };

  public render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.container}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.09,
            longitudeDelta: 0.09
          }}
        >
          {this.props.loaded &&
            this.props.stations.map(station => (
              <Marker
                key={this.keyExtractor(station)}
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  indicator: {
    position: "absolute",
    alignSelf: "center"
  }
});
