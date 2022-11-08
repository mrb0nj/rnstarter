import React from 'react';
import { StyleSheet } from 'react-native';
import { useAtom } from 'jotai';
import { SafeAreaView } from "react-native-safe-area-context";
import { usePocketbase, tokenAtom, userAtom } from '../../hooks/pocketbase';

import { Button, Text } from '@rneui/themed';
import { APP_NAME } from '@env';

const Dashboard = () => {
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
      <Text h2 style={styles.heading}>{APP_NAME} Welcome!</Text>
      <Button title="Sign out" onPress={authSignout} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  heading: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
})

export default Dashboard;
