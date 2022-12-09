import { Image, ScrollView, Text, StyleSheet } from "react-native";
import * as React from "react";
import { ButtonComponent } from "../component/Button";
import { useNavigation } from "@react-navigation/native";
import { background } from "../style/background";
import { text } from "../style/text";
import { margin } from "../style/margin";

export function HomeScreen({ navigation }) {
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <ScrollView style={background.background}>
      <Image style={styles.image} source={require("../image/gift.png")} />
      <Text style={text.text}>
        Bienvenue dans notre application d’organisation de secret santa !
      </Text>
      <Text style={text.text}>Mais qu’est-ce qu’un secret santa ?</Text>
      <Text style={text.text}>
        Il s’agit d’un évènement dans lequel les participants offrent un cadeau
        à un autre participant choisi au hasard !
      </Text>
      <Text style={text.text}>
        Commencez par organiser le vôtre dès maintenant :
      </Text>
      <ButtonComponent
        onPress={() => {
          navigateTo("Creation");
        }}
        text="Organiser"
        isPrimary={"true"}
        style={margin.margin}
      />
      <ButtonComponent
        onPress={() => {
          navigateTo("Consultation");
        }}
        text="Consulter"
        isPrimary={"false"}
        style={margin.margin}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 16,
    width: 343,
    height: 215,
    alignSelf: "center",
  },
});
