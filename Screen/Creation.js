import {Alert, Image, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {ButtonComponent} from "../Component/Button";
import {Controller, useForm} from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from "../Component/Loading";
import {useState} from "react";
import {ErrorMessage} from "../Component/ErrorMessage";
export function CreationScreen({navigation}) {

    //TODO DETECTER QUAND ON REMPLIE UN PRENOM ET NON UNE ADRESSE MAIL ET VICE VERSA
    //TODO EMPECHER ORGANISATEUR DE JOUER
    //TODO MINIMUM 3 JOUEURS

    const [numberOfPlayer, setNumberOfParticipants] = React.useState(['Organisateur', '1', '2', '3']);

    const [isLoading, setIsLoading] = useState(false);

    const addPlayer = () => {
        setNumberOfParticipants([...numberOfPlayer, numberOfPlayer.length.toString()]);
    }
    const { control, handleSubmit, formState: { errors } } = useForm({});

    const checkParticipant =  (evenement) => {
        const allPlayerName = evenement.player.map((player) => player.name);
        if (allPlayerName.length !== new Set(allPlayerName).size) {
            return {title: 'Nom similaire', message: "Les noms des participants doivent être différents"};
        }
        const allPlayerEmail = evenement.player.map((player) => player.email);
        if (allPlayerEmail.length !== new Set(allPlayerEmail).size) {
            return {title: 'Mail similaire', message: "Les mails des participants doivent être différents"};
        }
        return false;
    }

    const onSubmit = (data) => {
        setIsLoading(true);
        const evenement = {
            name: data.name,
            budget: data.budget,
            date: data.date,
        }
        const filterData = filter(data);
        const haveError = checkParticipant(filterData);
        if  (!haveError) {
            evenement['organisateur'] = filterData.organisateur;
            evenement['couples'] = generateCouples(filterData.player);
            saveEvenement(evenement).then();
        } else {
            Alert.alert(
                haveError.title,
                haveError.message,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            setIsLoading(false);
        }
    };

    const filter = (data) => {
        const tmp = [];
        const numberSubscribe = Object.keys(data).length / 2;
        for (let i = 0; i < numberSubscribe; i++) {
            console.log(data['name-' + i])
            console.log(data['email-' + i])
            if (data['name-' + i] && data['email-' + i])
                tmp.push({name: data['name-' + i], email: data['email-' + i]});
        }
        tmp.push({name: data['name-Organisateur'], email: data['email-Organisateur']});
        return {player:tmp, organisateur: data['name-Organisateur']};
    }

    const generateCouples = (data) => {
        const couples = [];
        const shuffledPlayer = data.sort((a, b) => 0.5 - Math.random());
        shuffledPlayer.forEach((player, index)=>{
            if (shuffledPlayer[index+ 1])
                couples.push({giver: shuffledPlayer[index], receiver: shuffledPlayer[index+ 1]});
            else
                couples.push({giver: shuffledPlayer[index], receiver: shuffledPlayer[0]});
        })
        return couples;
    }
    async function saveEvenement(evenement) {
        const secretSantas = await AsyncStorage.getItem('secretSantas');
        const secretSantasArray = secretSantas ? JSON.parse(secretSantas) : [];
        secretSantasArray.push(evenement);
        await AsyncStorage.setItem('secretSantas', JSON.stringify(secretSantasArray));
        await navigation.navigate('ConfirmCreation');
    }

    if  (isLoading) {
        return (
            <Loading/>
        )
    }

    return (
        <ScrollView style={background.background}>
            <Image style={styles.image} source={require('../image/tree.png')}/>
            <View style={{marginRight:30, marginLeft:30}}>
                <Text style={styles.label}>Nom de l'evenement</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name='name'
                />
                {errors.name && <ErrorMessage message="Le nom de l'evenement est requis." />}
                <Text style={styles.label}>Budget</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name='budget'
                />
                {errors.budget && <ErrorMessage message='Le budget est requis.' />}
                {numberOfPlayer.map((item, index) => (
                    <View key={index}>
                        <Text style={{marginTop:40}}>#{item}</Text>
                        <Text style={styles.label}>Nom</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: {value: item === 'Organisateur'},
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name={`name-${item}`}
                        />
                        {errors[`name-${item}`] && <ErrorMessage message='Le nom est requis.' />}
                        <Text style={styles.label}>Email</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: {value: item === 'Organisateur'},
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name={`email-${item}`}
                        />
                        {errors[`email-${item}`] && <ErrorMessage message='Le mail est requis.' />}
                    </View>
                ))}
                <ButtonComponent isPrimary={'false'} onPress={()=>{addPlayer()}} text="Ajouter un participant" style={styles.margin}/>
                <ButtonComponent isPrimary={'true'} onPress={handleSubmit(onSubmit)} text="Créer" style={styles.margin}/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    margin: {
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 30,
        marginRight: 30,
    },
    image: {
        marginTop: 16,
        width: 283,
        height: 200,
        alignSelf: 'center',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#386641',
        marginTop: 10,
    },
    group: {
        margin: 12,
        padding: 10,
    },
    label: {
        paddingTop: 10,
    }
});