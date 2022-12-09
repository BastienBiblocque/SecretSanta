import { Image, ScrollView, StyleSheet, Text } from "react-native";
import * as React from "react";
import { background } from "../style/background";
import { text } from "../style/text";
import { margin } from "../style/margin";
import { ButtonComp } from "./Button";
import { useNavigation } from "@react-navigation/native";

export function ListEmpty() {
  const navigation = useNavigation();
  return (
    <ScrollView style={background.background}>
      <Image style={styles.image} source={require("../image/box.png")} />
      <Text style={text.text}>
        Vous n’avez pas encore organisé de secret santa
      </Text>
      <ButtonComp
        onPress={() => {
          navigation.navigate("Creation");
        }}
        text="Organiser"
        isPrimary={"true"}
        style={margin.margin}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 16,
    width: 200,
    height: 207,
    alignSelf: "center",
  },
});
