import React from "react";
import { StyleSheet } from "react-native";
import { Text, Button } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAtom } from 'jotai';
import { APP_NAME } from '@env';
import { counterAtom } from './counter'

const HomeScreen = () => {
  const [counter, setCounter] = useAtom(counterAtom);
  const inc = () => setCounter(counter + 1);
  const dec = () => setCounter(counter - 1);
  return (
    <SafeAreaView>
      <Text h2>{APP_NAME}</Text>
      <Text h3>{counter}</Text>
      <Button title="+" onPress={inc} />
      <Button title="-" onPress={dec} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300
  }
});

export default HomeScreen;
