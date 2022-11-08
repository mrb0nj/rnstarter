import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useAtom } from 'jotai';
import { Text, Input, Button, Divider } from "@rneui/themed"
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from '../../components/Spacer'
import type { SignupScreenProps } from '../../types';
import { APP_NAME } from '@env'
import { usePocketbase, tokenAtom, userAtom } from "../../hooks/pocketbase";
import { AuthErrorPayload, AuthErrors } from "../../types";

const defaultErrors: AuthErrors = {
  username: null,
  email: null,
  password: null,
  passwordConfirm: null,
}

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const [, setTokenAtom] = useAtom(tokenAtom);
  const [, setUserAtom] = useAtom(userAtom);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AuthErrors|null>(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');


  const client = usePocketbase();
  const signupUser = async () => {
    try {
      setLoading(true);
      const user = await client.users.create({
        email,
        password,
        passwordConfirm
      });

      const { token } = await client.users.authViaEmail(email, password);
      await client.records.update('profiles', `${user?.profile?.id}`, {
          username
      })

      await client.users.requestVerification(user.email);

      setTokenAtom(token);
      setUserAtom(user);
    } catch(err: any) {
      const { data }: AuthErrorPayload = err.data;
      if (data) {
        const error: AuthErrors = { ...defaultErrors, ...data };
        setErrors(error);
      }
    }

    setLoading(false);
  }

  return (
    <SafeAreaView>
      <Text h2 style={styles.heading}>{APP_NAME} Signup!</Text>
      <Input
        label="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        errorMessage={errors?.username?.message}
      />
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
      <Input
        secureTextEntry
        label="Password again"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        errorMessage={errors?.passwordConfirm?.message}
      />
      <Spacer>
        <Button
          loading={loading}
          title="Signup"
          onPress={signupUser}
        />
      </Spacer>
      <Spacer>
        <Divider />
      </Spacer>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text>Already registered?</Text>
        <TouchableOpacity style={{ paddingLeft: 3 }} onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.link}>Signin</Text>
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
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 10,
  }
});

export default SignupScreen;
