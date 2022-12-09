import {Alert, Image, ScrollView, StyleSheet, Switch, Text, TextInput, View} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {ButtonComponent} from "../component/Button";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from "../component/Loading";
import {useEffect, useState} from "react";
import {ErrorMessage} from "../component/ErrorMessage";
export function OldCreationScreen({navigation}) {

    //TODO PERSISTANCE DES DONNES QUAND ON QUITTE L'APPLICATION
    // CHECK HOOKFORM

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "gameForm", // unique name for your Field Array
    });

    const [game, setGame] = useState({name:'', budget:'', organisateurPlay:true,
        orgnisateur:{name:'',email:''},participants:[{name:'',email:''},{name:'',email:''},{name:'',email:''}]});

    const [isLoading, setIsLoading] = useState(false);

    const addPlayer = () => {
        setGame([numberOfPlayer, numberOfPlayer.length.toString()]);
    }
    const { control, handleSubmit, formState: { errors,  }, watch } = useForm({defaultValues:game.participants});

    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(()=>{
        console.log('watch', watch());
    },[watch])

    const onSubmitv1 = (data) => {
        setIsLoading(true);
        const evenement = {
            name: data.name,
            budget: data.budget,
            date: data.date,
        }
        const filterData = filterForm(data, isEnabled);
        if (filterData.error) {
            Alert.alert(
                'Champs manquant',
                'Vous avez remplis un nom et non une adresse mail ou vice versa',
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
            setIsLoading(false);
        } else{
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
                )
                setIsLoading(false);
            }
        }
    };
    const onSubmit = (data) => {
        console.log(isEnabled);
        console.log(data)
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

                <View>
                    <Text style={{marginTop:10, marginBottom:10}}>L'oganisateur participe au secret santa</Text>
                    <Switch
                        trackColor={{ true: "#BC4749", false: "#767577" }}
                        thumbColor={isEnabled ? "#fee374" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View>
                    <Text style={{marginTop:40}}>Organisateur</Text>
                    <Text style={styles.label}>Nom</Text>
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
                        name='nameOrganisateur'
                    />
                    {errors.nameOrganisateur && <ErrorMessage message="Le nom de l'organisateur est requis." />}
                    <Text style={styles.label}>Email</Text>
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
                        name='emailOrganisateur'
                    />
                    {errors.emailOrganisateur && <ErrorMessage message="Le mail de l'organisateur est requis." />}
                </View>
                {game.participants.map((participant, index) => (
                    <View key={index}>
                        <Text style={{marginTop:40}}>#{index}</Text>
                        <Text style={styles.label}>Nom</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name={`name-${index}`}
                        />
                        {errors[`name-${index}`] && <ErrorMessage message='Le nom est requis.' />}
                        <Text style={styles.label}>Email</Text>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name={`email-${index}`}
                        />
                        {errors[`email-${index}`] && <ErrorMessage message='Le mail est requis.' />}
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