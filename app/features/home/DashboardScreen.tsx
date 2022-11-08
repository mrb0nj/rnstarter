import React from 'react';
import { useAtom } from 'jotai';
import { SafeAreaView } from "react-native-safe-area-context";
import { usePocketbase, tokenAtom, userAtom } from '../../hooks/pocketbase';

import { Button } from '@rneui/themed';

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
      <Button title="Sign out" onPress={authSignout} />
    </SafeAreaView>
  );
};

export default Dashboard;
