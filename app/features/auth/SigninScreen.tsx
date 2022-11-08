import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useAtom } from 'jotai';
import { Text, Input, Button, Divider } from "@rneui/themed"
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from '../../components/Spacer'
import { usePocketbase, tokenAtom, userAtom } from "../../hooks/pocketbase";
import { APP_NAME } from '@env';

import type { SigninScreenProps, AuthErrorPayload, AuthErrors } from '../../types';

const defaultErrors: AuthErrors = {
  username: null,
  email: null,
  password: null,
  passwordConfirm: null,
}

const SigninScreen = ({ navigation }: SigninScreenProps) => {
  const [, setTokenAtom] = useAtom(tokenAtom);
  const [, setUserAtom] = useAtom(userAtom);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<AuthErrors|null>(null);

  const client = usePocketbase();
  const authSignin = async () => {
    try {
      setLoading(true);
      const { token, user } = await client.users.authViaEmail(email, password);

      setTokenAtom(token);
      setUserAtom(user);
    } catch (err: any) {
      const { data }: AuthErrorPayload = err?.data;
      if (data) {
        const error: AuthErrors = { ...defaultErrors, ...data };
        if (!error.email && !error.password) {
          error.email = { code: 'authentication_failed', message: 'Invalid email or password' };
        }
        setErrors(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <Text h2 style={styles.heading}>{APP_NAME} Signin!</Text>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        keyboardType="email-address"
        errorMessage={errors?.email?.message}
      />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        errorMessage={errors?.password?.message}
      />
      <Spacer>
        <Button title="Signin" onPress={authSignin} loading={loading} />
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
