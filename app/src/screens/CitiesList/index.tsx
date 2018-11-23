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
import { CitiesStore } from "@stores";
import { width } from "@constants";

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
  citiesStore?: CitiesStore;
}

@inject("citiesStore")
@observer
export default class CitiesList extends React.Component<IProps> {
  public keyExtractor = item => {
    return item.name;
  };

  public render() {
    const { citiesStore } = this.props;
    return (
      <View style={styles.container}>
        {citiesStore.cities && (
          <FlatList
            data={citiesStore.cities}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        )}
      </View>
    );
  }

  private renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() =>
          this.props.navigation.navigate("Stations", { city: item.name })
        }
      >
        <Text style={styles.cityNames}>
          {item.name}, {item.state}
        </Text>
        <Text>Available stations: {item.stationsNumber}</Text>
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
  cityNames: {
    fontSize: 17,
    color: "#000",
    fontWeight: "bold"
  }
});
