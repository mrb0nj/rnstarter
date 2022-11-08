import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { useAtom } from 'jotai';
import { SafeAreaView } from "react-native-safe-area-context";
import { usePocketbase, tokenAtom, userAtom } from './hooks/pocketbase';

const HomeScreen = () => {
  const client = usePocketbase();
  const [, setToken] = useAtom(tokenAtom);
  const [, setUser] = useAtom(userAtom);

  const authSignout = () => {
    client.authStore.clear();
    setToken('');
    setUser(null);
  }

  return (
    <SafeAreaView>
      <Button title="Sign out" onPress={authSignout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300
  }
});

export default HomeScreen;
