import * as React from 'react';

import {Text, View, DeviceEventEmitter} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as icon from './lib/icon';
import Draw from './lib/view/Draw';
import Wait from './lib/view/Wait';
import Me from './lib/view/Me';
import Login from './lib/view/Login';
import PlanAdd from './lib/view/Wait/planAdd';
import SelectPeriod from './lib/view/Wait/selectPeriod';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconComponent;
          if (route.name === 'draw') {
            iconComponent = focused ? icon.draw('#1DA57A') : icon.draw();
          } else if (route.name === 'wait') {
            iconComponent = focused ? icon.wait('#1DA57A') : icon.wait();
          } else if (route.name === 'me') {
            iconComponent = focused ? icon.me('#1DA57A') : icon.me();
          }
          if (focused) {
            console.log('====================================');
            console.log(111111);
            console.log('====================================');
            DeviceEventEmitter.emit('testName', {param: 1});
          }
          return iconComponent;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#1DA57A',
        inactiveTintColor: '#040000',
      }}>
      <Tab.Screen name="draw" component={Draw} options={{title: '走势'}} />
      <Tab.Screen name="wait" component={Wait} options={{title: '方案'}} />
      <Tab.Screen name="me" component={Me} options={{title: '我的'}} />
    </Tab.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="planAdd"
          component={PlanAdd}
          initialParams={{period: null}}
          options={{
            title: '新增方案',
          }}
        />
        <Stack.Screen
          name="selectPeriod"
          component={SelectPeriod}
          options={{
            title: '选择期数',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
