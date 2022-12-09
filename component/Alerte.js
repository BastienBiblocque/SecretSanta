import {Alert} from "react-native";
import * as React from "react";

export function AlertCreate(titre, message) {
    Alert.alert(
        titre,
        message,
        [{ text: "OK", onPress: () => console.log('press') }]
    )
}