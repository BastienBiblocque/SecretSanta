import { Image, ScrollView, Text } from "react-native";
import * as React from "react";
import { background } from "../style/background";
import { text } from "../style/text";
import { ButtonComponent } from "../component/Button";
import {image} from "../style/image";
import {margin} from "../style/margin";

export function ConfirmCreationScreen({ navigation }) {
  return (
    <ScrollView style={background.background}>
      <Image style={[image.image, {width:150, height: 234}]} source={require("../image/sock.png")} />
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
        style={margin.margin}
      />
    </ScrollView>
  );
}
