import {Image, ScrollView, StyleSheet, Text} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {text} from "../style/text";
import {ButtonComponent} from "../Component/Button";

export function ConfirmationResendMailScreen({navigation}) {
    return (
        <ScrollView style={background.background}>
            <Image style={styles.image} source={require('../image/snowman.png')}/>
            <Text style={text.text}>Les mails ont été envoyés avec succès.</Text>
            <ButtonComponent onPress={()=> {navigation.navigate('Consultation');}} text="Continuer" isPrimary={'true'} style={styles.margin}/>
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
        width: 150,
        height: 301,
        alignSelf: 'center',
    },
});