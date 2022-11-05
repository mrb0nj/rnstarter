import React from "react";
import { StyleSheet, Button, Image } from "react-native";
import { Text } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { increment, incrementByAmount } from "../store/counter";
import { useGetPokemonByNameQuery } from "../store/pokemon";

const HomeScreen = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(increment());
  }

  const addAmount = (value: number) => {
    dispatch(incrementByAmount(value));
  }

  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');
  return (
    <SafeAreaView>
      <Text>Count is: {count}</Text>
      <Button title="Increment" onPress={handleClick} />
      <Button title="Increment By 10" onPress={() => addAmount(10)} />
      {error ? (
        <Text>Oh no, there was an error</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <>
          <Text h3>
            {data.species.name}
          </Text>
          <Image style={styles.image} source={{ uri: data.sprites.front_shiny}} />
        </>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300
  }
});

export default HomeScreen;
