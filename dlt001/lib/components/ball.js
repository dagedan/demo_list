import React from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';

const Ball = ({num, type}) => {
  return (
    <View style={[styles.redball, type !== 'red' && styles.buleball]}>
      <Text style={styles.num}>{num}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  redball: {
    width: 30,
    height: 30,
    borderStyle: 'solid',
    borderColor: 'red',
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: 'red',
    overflow: 'hidden',
    marginLeft: 10,
    display: 'flex',
  },
  num: {
    fontFamily: 'System',
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 20,
    textAlignVertical: 'center',
    ...Platform.select({
      ios: {lineHeight: 30},
      android: {},
    }),
  },
  buleball: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
});
export default Ball;
