import { Image, ScrollView, StyleSheet, Text } from "react-native";
import * as React from "react";
import { background } from "../style/background";
import { text } from "../style/text";
import { ButtonComponent } from "../Component/Button";

export function ConfirmCreationScreen({ navigation }) {
  return (
    <ScrollView style={background.background}>
      <Image style={styles.image} source={require("../image/sock.png")} />
      <Text style={text.text}>
        Votre secret santa a bien été créé, les participants ont reçu leur
        binôme par mail !
      </Text>
      <Text style={text.text}>Bon réveillon !</Text>
      <ButtonComponent
        onPress={() => {
          navigation.navigate("Consultation");
        }}
        text="Continuer"
        isPrimary={"true"}
        style={styles.margin}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  margin: {
    marginTop: 16,
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    marginTop: 16,
    width: 150,
    height: 234,
    alignSelf: "center",
  },
});
