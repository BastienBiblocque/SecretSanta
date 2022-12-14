import { Image, ScrollView, Text } from "react-native";
import * as React from "react";
import { background } from "../style/background";
import { text } from "../style/text";
import { margin } from "../style/margin";
import { useState } from "react";
import { ButtonComponent } from "../component/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {image} from "../style/image";

export function SpoilerDetailScreen({ navigation, route }) {
  const { secretSanta } = route.params;

  const [secretSantaDetail] = useState(JSON.parse(secretSanta));

  async function clearDataBase() {
    await AsyncStorage.removeItem("secretSantas");
  }

  return (
    <ScrollView style={background.background}>
      <Image style={[image.image, {width:250, height: 200}]} source={require("../image/skate.png")} />
      <Text style={text.text}>Santa -> Destinataire</Text>
      {secretSantaDetail.couples.map((couple, key) => (
        <Text key={key} style={text.text}>
          {couple.giver.name} -> {couple.receiver.name}
        </Text>
      ))}
      <ButtonComponent
        text="VIDER LA BASE"
        isPrimary={"true"}
        onPress={() => {
          clearDataBase();
          navigation.navigate("Home");
        }}
        style={margin.margin}
      />
    </ScrollView>
  );
}
