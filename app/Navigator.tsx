import React, { useState, useEffect }  from 'react';
import { StyleSheet } from 'react-native';
import { useAtom } from 'jotai';
import { usePocketbase, tokenAtom, userAtom } from './hooks/pocketbase';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import DashboardScreen from '../app/features/home/DashboardScreen';
import SignupScreen from '../app/features/auth/SignupScreen';
import SigninScreen from '../app/features/auth/SigninScreen';

import { RootStackParamList } from './types';

const HomeScreen = () => {
  const [token] = useAtom(tokenAtom);
  const [user] = useAtom(userAtom);

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const client = usePocketbase();
  useEffect(() => {
    if (!token || !user) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    const loadFromStorage = async () => {
      try {
        client.authStore.save(token, user);
        await client.users.refresh();
        setAuthenticated(true);
      } catch(e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadFromStorage();
  }, [token, user]);

  if (loading) return null;

  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
        {!authenticated && (<Stack.Navigator>
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>)}
        {authenticated && (<Stack.Navigator>
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>)}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300
  }
});

export default HomeScreen;
