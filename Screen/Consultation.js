import {ScrollView} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {useState} from "react";
import {ListFilled} from "../Component/ListFilled";
import {ListEmpty} from "../Component/ListEmpty";

export function ConsultationScreen() {
    const [secretSantas, setSecretSantas] = useState(null);
    return (
        <ScrollView style={background.background}>
            {secretSantas ? <ListFilled/> : <ListEmpty/>}
        </ScrollView>
    );
}