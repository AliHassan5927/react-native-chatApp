import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../../services';
import * as Auth from '../../screens/authFlow';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routes.splash}
    >
      <AuthStack.Screen name={routes.splash} component={Auth.Splash} />
      <AuthStack.Screen name={routes.signin} component={Auth.SignIn} />
      <AuthStack.Screen name={routes.signup} component={Auth.SignUp} />

    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
