import React from "react";
import { View, StyleSheet } from "react-native";

const Spacer = ({ children }) => {
  return (
    <View style={styles.spacer}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  spacer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});

export default Spacer;
