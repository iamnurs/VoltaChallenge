import React, { SFC } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProperties,
  StyleSheet,
  TextStyle,
} from 'react-native';

interface IProps extends TouchableOpacityProperties {
  title: string;
  textStyle?: TextStyle;
}

const PrimaryButton: SFC<IProps> = props => {
  const {
    title = '',
    disabled = false,
    style = null,
    textStyle = null,
  } = props;

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={[styles.container, style]}
    >
      <Text
        style={[styles.title, textStyle]}
        numberOfLines={1}
        ellipsizeMode="middle"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  title: {
    color: 'white',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
  },
});

export default PrimaryButton;
