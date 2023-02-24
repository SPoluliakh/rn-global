import { View, StyleSheet, Text } from "react-native";

export const HomScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HomScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
