import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  statusName: string;
  statusValue: string | undefined
};

export default function MonsterStatusText({ statusName, statusValue }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.fontStyle}>{statusName}: </Text>
      <Text style={styles.fontValue}>{statusValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fontStyle:{
    fontSize: 16,
  },
  fontValue: {
    fontSize: 16,
    fontWeight: 800
  }
});
