import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Provider, useAtom } from 'jotai';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { usePocketbase, tokenAtom, userAtom } from './app/hooks/pocketbase';
import { Text } from '@rneui/themed'

import HomeScreen from './app/HomeScreen';
import SignupScreen from './app/features/auth/SignupScreen';
import SigninScreen from './app/features/auth/SigninScreen';

const App = () => {
  const [token] = useAtom(tokenAtom);
  const [user] = useAtom(userAtom);

  const [authenticated, setAuthenticated] = useState(false);

  const client = usePocketbase();

  useEffect(() => {
      const loadFromStorage = async () => {
        // Causes Signup to flash briefly when starting app
        if (!token || !user) {
          setAuthenticated(false);
          return;
        }
        client.authStore.save(token, user);
        await client.users.refresh();
        setAuthenticated(true);
      }
      loadFromStorage();
  }, [token, user]);

  const Stack = createNativeStackNavigator();
  return (
    <Provider>
        <NavigationContainer>
            {!authenticated && (<Stack.Navigator>
              <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }}/>
            </Stack.Navigator>)}
            {authenticated && (<Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            </Stack.Navigator>)}
        </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
