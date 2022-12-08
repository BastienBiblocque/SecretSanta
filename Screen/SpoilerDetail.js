import {Image, ScrollView, StyleSheet, Text} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {text} from "../style/text";
import {ButtonComp} from "../Component/Button";

export function SpoilerDetailScreen() {
    const couples = [
        {from: 'John',to: 'Julie',},
        {from: 'Jean',to: 'John',},
        {from: 'Julie',to: 'Pierre',},
        {from: 'Pierre',to: 'Jean',}]
    return (
        <ScrollView style={background.background}>
            <Image style={styles.image} source={require('../image/skate.png')}/>
            <Text style={text.text}>Santa -> Destinataire</Text>
            {couples.map((couple) => (
                <Text style={text.text}>{couple.from} -> {couple.to}</Text>
            ))}
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