import { PermissionsAndroid, Alert } from "react-native";

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Access Location Permission",
        message: "This app requires permission to access your location"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.DENIED) {
      Alert.alert("Sorry, but app needs permission to access your location");
    }
  } catch (err) {
    Alert.alert("Sorry, but app needs permission to access your location");
  }
};

export { requestLocationPermission };
