import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { observer, inject } from "mobx-react";
import { Card, Button } from "react-native-elements";
import { StationsStore } from "@stores";

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
  stationsStore?: StationsStore;
}

@inject("stationsStore")
@observer
export default class StationInfo extends React.Component<IProps> {
  public render() {
    const { stationsStore } = this.props;
    const station = stationsStore.stations.find(
      item => item.id === this.props.navigation.getParam("id")
    );
    return (
      <View style={styles.container}>
        <Card title="Name">
          <Text>{station.name}</Text>
        </Card>
        <Card title="Street Address">
          <Text>{station.street_address}</Text>
        </Card>
        <Card title="Status">
          <Text>{station.status}</Text>
        </Card>
        <Button
          title="Show Directions"
          onPress={() => true}
          icon={{ name: "directions", type: "font-awesome5" }}
          containerViewStyle={styles.button}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    marginTop: 10
  }
});
