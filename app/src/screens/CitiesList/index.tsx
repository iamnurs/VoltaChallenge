import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { SearchBar, Icon } from "react-native-elements";
import { observer, inject } from "mobx-react";
import { CitiesStore } from "@stores";
import { width } from "@constants";
import { ICityParams } from "@types";

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
  citiesStore?: CitiesStore;
}

interface IState {
  cities: ICityParams[];
}

@inject("citiesStore")
@observer
export default class CitiesList extends React.Component<IProps, IState> {
  public static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: !navigation.getParam("isSearching") ? (
        <Text style={styles.title}>Available Cities</Text>
      ) : (
        <SearchBar
          lightTheme={true}
          round={true}
          autoFocus={true}
          containerStyle={styles.searchBarContainer}
          inputStyle={styles.searchBar}
          onChangeText={navigation.getParam("onSearchText")}
          placeholder="Type your city ..."
          onFocus={navigation.getParam("onStartSearch")}
          onSubmitEditing={() => navigation.setParams({ isSearching: false })}
          onEndEditing={() => navigation.setParams({ isSearching: false })}
        />
      ),
      headerRight: !navigation.getParam("isSearching") && (
        <Icon
          color="#000"
          type="ionicon"
          name="md-search"
          onPress={() => navigation.setParams({ isSearching: true })}
          containerStyle={styles.searchIcon}
          size={25}
        />
      )
    };
  };
  public state = {
    cities: []
  };

  public keyExtractor = item => {
    return item.name;
  };

  public componentDidMount() {
    const { citiesStore } = this.props;
    this.setState({ cities: citiesStore.cities });
    this.props.navigation.setParams({
      onSearchText: this.onSearchText,
      onStartSearch: this.onStartSearch
    });
  }

  public render() {
    const { citiesStore } = this.props;
    return (
      citiesStore.cities && (
        <View style={styles.container}>
          {this.state.cities.length === 0 ? (
            <Text style={styles.error}>
              Unfortunately your city does not have Volta stations
            </Text>
          ) : (
            <FlatList
              data={this.state.cities}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
          )}
        </View>
      )
    );
  }

  private renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() =>
          this.props.navigation.navigate("Stations", {
            city: item.name,
            state: item.state
          })
        }
      >
        <Text style={styles.cityNames}>
          {item.name}, {item.state}
        </Text>
        <Text>Available stations: {item.stationsNumber}</Text>
      </TouchableOpacity>
    );
  };

  private onStartSearch = () => {
    const { citiesStore } = this.props;
    this.setState({ cities: citiesStore.cities });
  };

  private onSearchText = text => {
    const { citiesStore } = this.props;
    const loweredText = text.toLowerCase();
    const newList = this.state.cities.filter(item => {
      return item.name.toLowerCase().match(loweredText);
    });
    if (!text || text === "") {
      this.setState({ cities: citiesStore.cities });
    } else if (!newList.length) {
      this.setState({ cities: [] });
    } else {
      this.setState({ cities: newList });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    flex: 1,
    width
  },
  searchBar: {
    height: 40
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
  },
  showSearch: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center"
  },
  searchIcon: {
    marginRight: 10
  },
  showSearchText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#000"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10
  },
  error: {
    color: "#000"
  }
});
