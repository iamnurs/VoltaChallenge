import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { NavigationScreenProp, NavigationState } from 'react-navigation';

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
}

export default class Welcome extends React.Component<IProps> {
  public render() {
    return (
      <View style={styles.container}>
        <Text>Welcome</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
