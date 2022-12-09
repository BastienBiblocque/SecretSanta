import { Image, ScrollView, Text } from "react-native";
import * as React from "react";
import { background } from "../style/background";
import { text } from "../style/text";
import { margin } from "../style/margin";
import { ButtonComponent } from "../component/Button";
import {image} from "../style/image";

export function ConfirmationResendMailScreen({ navigation }) {
  return (
    <ScrollView style={background.background}>
      <Image style={[image.image, {width:150, height: 301}]} source={require("../image/snowman.png")} />
      <Text style={text.text}>Les mails ont été envoyés avec succès.</Text>
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
