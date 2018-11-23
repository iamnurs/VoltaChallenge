import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { observer, inject } from "mobx-react";
import { StationsStore } from "@stores";
import { width } from "@constants";

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
  stationsStore?: StationsStore;
}

@inject("stationsStore")
@observer
export default class StationsList extends React.Component<IProps> {
  public static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.city
    };
  };

  public keyExtractor = item => {
    return item.name;
  };

  public render() {
    const { stationsStore } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={stationsStore.stations.filter(
            item => item.city === this.props.navigation.state.params.city
          )}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }

  private renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => this.props.navigation.navigate("Info", { id: item.id })}
      >
        <Text style={styles.stationNames}>{item.name}</Text>
        <Text>{item.street_address}</Text>
      </TouchableOpacity>
    );
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
  wrapper: {
    paddingLeft: 10,
    borderBottomWidth: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    width
  },
  stationNames: {
    fontSize: 17,
    color: "#000",
    fontWeight: "bold"
  }
});
