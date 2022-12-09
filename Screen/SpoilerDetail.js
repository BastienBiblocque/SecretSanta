import {Image, ScrollView, StyleSheet, Text} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {text} from "../style/text";
import {useState} from "react";
import {ButtonComponent} from "../Component/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function SpoilerDetailScreen({route}) {
    const { secretSanta } = route.params;

    const [secretSantaDetail] = useState(JSON.parse(secretSanta));

    async function clearDataBase() {
        await AsyncStorage.removeItem('secretSantas')
    }

    return (
        <ScrollView style={background.background}>
            <Image style={styles.image} source={require('../image/skate.png')}/>
            <Text style={text.text}>Santa -> Destinataire</Text>
            {secretSantaDetail.couples.map((couple, key) => (
                <Text key={key} style={text.text}>{couple.giver.name} -> {couple.receiver.name}</Text>
            ))}
            <ButtonComponent text="VIDER LA BASE" isPrimary={'true'} onPress={() => clearDataBase()} style={styles.margin}/>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        marginTop: 16,
        width: 250,
        height: 200,
        alignSelf: 'center',
    },
    margin: {
        marginTop: 16,
        marginLeft: 30,
        marginRight: 30,
    },
});