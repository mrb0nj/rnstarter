import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useAtom } from 'jotai';
import { Text, Input, Button, Divider } from "@rneui/themed"
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from '../../components/Spacer'
import { usePocketbase, tokenAtom, userAtom } from "../../hooks/pocketbase";

import type { SigninScreenProps } from '../../types';
const SigninScreen = ({ navigation }: SigninScreenProps) => {
  const [, setTokenAtom] = useAtom(tokenAtom);
  const [, setUserAtom] = useAtom(userAtom);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const client = usePocketbase();
  const authSignin = async () => {
    try {
      const { token, user } = await client.users.authViaEmail(email, password);

      setTokenAtom(token);
      setUserAtom(user);
    } catch (e) {
      console.error('Signup error', e);
    }
  }

  return (
    <SafeAreaView>
      <Text h2 style={styles.heading}>Signin!</Text>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        keyboardType="email-address"
      />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Spacer>
        <Button title="Signin" onPress={authSignin} />
      </Spacer>
      <Spacer>
        <Divider />
      </Spacer>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text>Not registered?</Text>
        <TouchableOpacity style={{ paddingLeft: 3 }} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Signup</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 10,
  },
  link: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default SigninScreen;
