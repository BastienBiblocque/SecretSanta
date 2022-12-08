import {Image, ScrollView, StyleSheet, Text} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {ButtonComp} from "../Component/Button";
import {text} from "../style/text";
import {useState} from "react";

export function ConsultationDetailScreen({route, navigation}) {
    const resendEmail = () => {
        navigation.navigate('ConfirmationResendMail');
    }

    const { secretSanta } = route.params;

    const [secretSantaDetail] = useState(JSON.parse(secretSanta));


    return (
        <ScrollView style={background.background}>
            <Image style={styles.image} source={require('../image/santaAndTree.png')}/>
            <Text style={text.text}>Organisateur : {secretSantaDetail.organisateur}</Text>
            <Text style={text.text}>Budget : {secretSantaDetail.budget}</Text>
            {secretSantaDetail.couples.map((couple) => (
                <Text style={text.text}>{couple.giver.name} - {couple.giver.email}</Text>
            ))}
            <ButtonComp text="Renvoyer les mails" isPrimary={'true'} onPress={() => resendEmail()} style={styles.margin}/>
            <ButtonComp text="Se spoiler" isPrimary={'false'} onPress={() => navigation.navigate('SpoilerDetail',{secretSanta:secretSanta})} style={styles.margin}/>
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