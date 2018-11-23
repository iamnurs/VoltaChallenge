import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { observer, inject } from "mobx-react";
import { width } from "@constants";
import { fetchStation } from "@api";

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
}

@inject("stationsStore")
@observer
export default class StationInfo extends React.Component<IProps> {
  public async componentDidMount() {
    await fetchStation(this.props.navigation.state.params.id);
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text>qwe</Text>
      </View>
    );
  }
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
