import {Image, ScrollView, StyleSheet} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {SecretCard} from "./SecretCard";

export function ListFilled(props) {
    return (
        <ScrollView style={background.background}>
            <Image style={styles.image} source={require('../image/santa.png')}/>
            {props.secretSantas.map((secretSanta, index) => (
                <SecretCard key={index} secretSanta={secretSanta}/>
            ))}
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
        width: 100,
        height: 200,
        alignSelf: 'center',
    },
});