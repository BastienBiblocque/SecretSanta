import {Image, ScrollView, StyleSheet, Text} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {ButtonComponent} from "../component/Button";
import {text} from "../style/text";
import {useState} from "react";
import {Loading} from "../component/Loading";
import {sendAllEmailsWithSetInterval} from "../utils/SendMails"
import {image} from "../style/image";

export function ConsultationDetailScreen({route, navigation}) {

    const [isLoading, setIsLoading] = useState(false);
    const { secretSanta } = route.params;
    const [secretSantaDetail] = useState(JSON.parse(secretSanta));

    const resendEmail = () => {
        setIsLoading(true);
        sendAllEmailsWithSetInterval(secretSantaDetail, setIsLoading, navigation, 'ConfirmationResendMail');
    }

    if  (isLoading) {
        return (
            <Loading/>
        )
    }

    return (
        <ScrollView style={background.background}>
            <Image style={[image.image, {width:212, height: 200}]} source={require('../image/santaAndTree.png')}/>
            <Text style={text.text}>Organisateur : {secretSantaDetail.organisateur.name}</Text>
            <Text style={text.text}>Budget : {secretSantaDetail.budget}</Text>
            {secretSantaDetail.couples.map((couple, key) => (
                <Text key={key} style={text.text}>{couple.giver.name} - {couple.giver.email}</Text>
            ))}
            <ButtonComponent text="Renvoyer les mails" isPrimary={'true'} onPress={() => resendEmail()} style={styles.margin}/>
            <ButtonComponent text="Se spoiler" isPrimary={'false'} onPress={() => navigation.navigate('SpoilerDetail',{secretSanta:secretSanta})} style={styles.margin}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    margin: {
        marginTop: 16,
        marginLeft: 30,
        marginRight: 30,
    },
});