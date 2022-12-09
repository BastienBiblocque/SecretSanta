import {Alert} from "react-native";
import * as React from "react";

export function AlertComponent(props) {
    return (
        Alert.alert(
            props.title,
            props.message,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )
    );
}