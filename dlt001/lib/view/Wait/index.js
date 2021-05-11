import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import PlanList from './planList';
import PlanAdd from './planAdd';
import SelectPeriod from './selectPeriod';

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
      <WaitStack.Screen
        name="planAdd"
        component={PlanAdd}
        initialParams={{ 'period': null }}
        options={{
          title: '新增方案',
        }}
      />
      <WaitStack.Screen
        name="selectPeriod"
        component={SelectPeriod}
        options={{
          title: '选择期数',
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
