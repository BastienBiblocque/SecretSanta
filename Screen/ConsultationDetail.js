import {Image, ScrollView, StyleSheet, Text} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {ButtonComponent} from "../Component/Button";
import {text} from "../style/text";
import {useState} from "react";
import {Loading} from "../Component/Loading";

export function ConsultationDetailScreen({route, navigation}) {

    const [isLoading, setIsLoading] = useState(false);
    const resendEmail = () => {
        setIsLoading(true);
        //navigation.navigate('ConfirmationResendMail');
    }

    const { secretSanta } = route.params;

    const [secretSantaDetail] = useState(JSON.parse(secretSanta));

    if  (isLoading) {
        return (
            <Loading/>
        )
    }


    return (
        <ScrollView style={background.background}>
            <Image style={styles.image} source={require('../image/santaAndTree.png')}/>
            <Text style={text.text}>Organisateur : {secretSantaDetail.organisateur}</Text>
            <Text style={text.text}>Budget : {secretSantaDetail.budget}</Text>
            {secretSantaDetail.couples.map((couple) => (
                <Text style={text.text}>{couple.giver.name} - {couple.giver.email}</Text>
            ))}
            <ButtonComponent text="Renvoyer les mails" isPrimary={'true'} onPress={() => resendEmail()} style={styles.margin}/>
            <ButtonComponent text="Se spoiler" isPrimary={'false'} onPress={() => navigation.navigate('SpoilerDetail',{secretSanta:secretSanta})} style={styles.margin}/>
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

const sendEmailBasique = (organisateur, destinataireEmail, destinataireNom, heureuxElu, budget) => {


    const payloadBody = {
        "service_id": "service_96bgpzc",
        "template_id": "template_x0fk83r",
        "user_id": "25pqutaWVYNTz_XTC",
        "accessToken": "BSPbjtyoSwHDTI6M1UpAo",
        "template_params": {
            "to_mail": destinataireEmail,
            "organiser": organisateur,
            "santa": destinataireNom,
            "destinataire": heureuxElu,
            "budget": budget
        }
    };

    const fullPayload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payloadBody)
    };

    console.log(fullPayload);
    try{
        // fetch("https://api.emailjs.com/api/v1.0/email/send", fullPayload)
        // .then(response => console.log(response))
    }
    catch(e){
        console.log(e);
    }
}

let mailsSent = 0;
const sendAllEmailsWithSetInterval = (organisateurNom, participantsListe, HeureuxElusListe, budget) => {
    mailsSent = 0;
    let task = setInterval(
        () => {sendEmailWithSetInterval(organisateurNom, participantsListe, HeureuxElusListe, budget)},
        1100
    )
    let participant = {
        email : participantsListe[mailsSent].email,
        name : participantsListe[mailsSent].name
    }
}

const sendEmailWithSetInterval = (organisateur, destinataireEmail, destinataireNom, heureuxElu, budget) => {


    const payloadBody = {
        "service_id": "service_96bgpzc",
        "template_id": "template_x0fk83r",
        "user_id": "25pqutaWVYNTz_XTC",
        "accessToken": "BSPbjtyoSwHDTI6M1UpAo",
        "template_params": {
            "to_mail": destinataireEmail,
            "organiser": organisateur,
            "santa": destinataireNom,
            "destinataire": heureuxElu,
            "budget": budget
        }
    };

    const fullPayload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payloadBody)
    };

    console.log(fullPayload);
    try{
        // fetch("https://api.emailjs.com/api/v1.0/email/send", fullPayload)
        // .then(response => console.log(response))
    }
    catch(e){
        console.log(e);
    }
}