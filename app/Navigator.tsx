import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeDashboard from './features/home/Dashboard';

const Navigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeDashboard} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Navigator;
