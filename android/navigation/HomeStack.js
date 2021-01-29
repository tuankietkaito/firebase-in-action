import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
const Stack = createStackNavigator();
export default function HomeStack() {
  return (
    // <Stack.Navigator>
    //   <Stack.Screen name='Home' component={HomeScreen} />
    // </Stack.Navigator>

    <Stack.Navigator initialRouteName='Chat'>
      {/* <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{ header: () => null }}
      /> */}
      <Stack.Screen name='Chat' component={ChatScreen} />
    </Stack.Navigator>
  );
}