import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import PlanList from './planList';

const WaitStack = createStackNavigator();
export default function Wait() {
  return (
    <WaitStack.Navigator>
      <WaitStack.Screen
        name="planList"
        component={PlanList}
        options={{
          headerShown: false,
        }}
      />
    </WaitStack.Navigator>
  );
}

const styles = StyleSheet.create({
  myNumWrapper: {
    display: 'flex',
    padding: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#dddddd',
    backgroundColor: 'white',
    paddingBottom: 20,
  },
});
