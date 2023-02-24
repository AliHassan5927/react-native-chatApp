import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { appImages, colors, routes } from '../../services';
import * as App from '../../screens/appFlow';
import { Image } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';


const AppStack = createNativeStackNavigator();



const AppNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routes.home}
    >
      <AppStack.Screen name={routes.home} component={App.Home} />
      <AppStack.Screen name={routes.allUsers} component={App.AllUsers} />
      <AppStack.Screen name={routes.chat} component={App.Chat} />
    </AppStack.Navigator>
  );
};



export default AppNavigation;
