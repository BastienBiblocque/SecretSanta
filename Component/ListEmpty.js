import {Image, ScrollView, StyleSheet, Text} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {text} from "../style/text";
import {ButtonComp} from "./Button";

export function ListEmpty() {
    return (
        <ScrollView style={background.background}>
            <Image style={styles.image} source={require('../image/box.png')}/>
            <Text style={text.text}>Vous n’avez pas encore organisé de secret santa</Text>
            <ButtonComp text="Organiser" isPrimary={'true'} style={styles.margin}/>
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
        width: 200,
        height: 207,
        alignSelf: 'center',
    },
});