import {Image, ScrollView, StyleSheet, Text} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {ButtonComp} from "../Component/Button";
import {text} from "../style/text";

export function ConsultationDetailScreen({navigation}) {

    const resendEmail = () => {
        participants.forEach((participant) => {
            setTimeout(()=>{return }, 1500);
            console.log("ORGANISATEUR OSCOUR", participant.email, participant.name, "HEUREUX ELU OSCOUR", "BUDGET OSCOUR");
            
        })
        //sendEmail();
        //navigation.navigate('ConfirmationResendMail');
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

const sendEmail = (organisateur, destinataireEmail, destinataireNom, heureuxElu, budget) => {

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
        fetch("https://api.emailjs.com/api/v1.0/email/send", fullPayload)
        .then(response => console.log(response))
    }
    catch(e){
        console.log(e);
    }
}