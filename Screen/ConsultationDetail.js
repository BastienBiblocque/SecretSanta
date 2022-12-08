import {Image, ScrollView, StyleSheet, Text} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {ButtonComp} from "../Component/Button";
import {text} from "../style/text";

export function ConsultationDetailScreen({navigation}) {
    const resendEmail = () => {
        console.log('send email');
        navigation.navigate('ConfirmationResendMail');
    }
    const participants = [
        {name: 'Jean',email: 'jean@gmail.com',},
        {name: 'Julie',email: 'julie@gmail.com',},
        {name: 'Pierre',email: 'pierre@gmail.com',}]
    return (
        <ScrollView style={background.background}>
            <Image style={styles.image} source={require('../image/santaAndTree.png')}/>
            <Text style={text.text}>Organisateur : john doe</Text>
            <Text style={text.text}>mail : john.doe@gmail.com</Text>
            <Text style={text.text}>Budget : 5€</Text>
            {participants.map((participant) => (
                <Text style={text.text}>{participant.name} - {participant.email}</Text>
            ))}
            <ButtonComp text="Renvoyer les mails" isPrimary={'true'} onPress={() => resendEmail()} style={styles.margin}/>
            <ButtonComp text="Se spoiler" isPrimary={'false'} onPress={() => navigation.navigate('SpoilerDetail')} style={styles.margin}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        marginTop: 16,
        width: 212,
        height: 200,
        alignSelf: 'center',
    },
    margin: {
        marginTop: 16,
        marginLeft: 30,
        marginRight: 30,
    },
});