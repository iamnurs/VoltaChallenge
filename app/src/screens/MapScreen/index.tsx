import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { observer, inject } from "mobx-react";
import { StationsStore } from "@stores";
import { Map } from "@components";

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
  stationsStore?: StationsStore;
}

interface IState {
  stationsLoaded: boolean;
}

@inject("stationsStore")
@observer
export default class MapScreen extends React.Component<IProps, IState> {
  public state = {
    stationsLoaded: false
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
        {!this.state.stationsLoaded && (
          <ActivityIndicator style={styles.indicator} size="large" />
        )}
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
  }
});
