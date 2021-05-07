import * as React from 'react';

import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as icon from './lib/icon';
import Draw from './lib/view/Draw';
import Wait from './lib/view/Wait';

function Me() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Me!</Text>
    </View>
  );
}
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
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
            return iconComponent;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#1DA57A',
          inactiveTintColor: '#040000',
        }}>
        <Tab.Screen name="draw" component={Draw} />
        <Tab.Screen name="wait" component={Wait} />
        <Tab.Screen name="me" component={Me} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
