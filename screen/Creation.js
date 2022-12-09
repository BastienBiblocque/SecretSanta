import {Image, ScrollView, Switch, Text, TextInput, View} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {ButtonComponent} from "../component/Button";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {Loading} from "../component/Loading";
import {useState} from "react";
import {ErrorMessage} from "../component/ErrorMessage";
import {filterPlayers} from "../utils/filterPlayers";
import {checkParticipant} from "../utils/checkParticipant";
import {generateCouples} from "../utils/generateCouple";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {sendAllEmailsWithSetInterval} from "../utils/SendMails";
import {form} from "../style/form";
import {image} from "../style/image";
import {AlertCreate} from "../component/Alerte";

export function CreationScreen({navigation}) {

    //TODO PERSISTANCE DES DONNES QUAND ON QUITTE L'APPLICATION

    const [isLoading, setIsLoading] = useState(false);

    const {control, value, formState: {errors,}, handleSubmit} = useForm({
        defaultValues: {
            players: [{name: "", email: ""}, {name: "", email: ""}, {name: "", email: ""}],
        }
    });

    const {fields, append,} = useFieldArray({control, name: "players"});

    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const onSubmit = (data) => {
        setIsLoading(true);

        const filterData = filterPlayers(data.players);

        if (filterData.error) {
            AlertCreate('Champs manquant', 'Vous avez remplis un nom et non une adresse mail ou vice versa');
            setIsLoading(false);
        } else {
            if (isEnabled)
                filterData.push({email: data.organisateurEmail, name: data.organisateurName});
            const evenement = {
                name: data.name,
                budget: data.budget,
                organisateur: {email: data.organisateurEmail, name: data.organisateurName},
                players: filterData,
            }
            const haveError = checkParticipant(evenement.players);
            if (haveError) {
                AlertCreate(haveError.title, haveError.message)
                setIsLoading(false);
            } else {
                evenement['couples'] = generateCouples(evenement.players);
                saveEvenement(evenement).then()
            }
        }
    };

    async function saveEvenement(evenement) {
        await AsyncStorage.getItem('secretSantas').then(async (secretSantas) => {
                const secretSantasArray = secretSantas ? JSON.parse(secretSantas) : [];
                secretSantasArray.push(evenement);
                await AsyncStorage.setItem('secretSantas', JSON.stringify(secretSantasArray)).then(() => {
                    sendAllEmailsWithSetInterval(evenement, setIsLoading, navigation, 'ConfirmCreation');
                })
            }
        );
    }

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    return (
        <ScrollView style={background.background}>
            <Image style={[image.image, {width: 283, height: 200}]} source={require('../image/tree.png')}/>
            <View style={{marginRight: 30, marginLeft: 30}}>
                <View>
                    <Text style={form.label}>Nom de l'evenement</Text>
                    <Controller
                        name={`name`}
                        control={control}
                        value={value}
                        rules={{required: true}}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={form.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.name && <ErrorMessage message="Le nome de l'evenement est requis."/>}

                    <Text style={form.label}>Budget</Text>
                    <Controller
                        name={`budget`}
                        control={control}
                        value={value}
                        rules={{required: true}}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={form.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.budget && <ErrorMessage message="Le budget est requis."/>}

                </View>
                <View>
                    <Text style={form.label}>Nom de l'organisateur</Text>
                    <Controller
                        name={`organisateurName`}
                        control={control}
                        value={value}
                        rules={{required: true}}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={form.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.organisateurName && <ErrorMessage message="Le nom de l'organisateur est requis."/>}
                    <Text style={form.label}>Email de l'organisateur</Text>
                    <Controller
                        name={`organisateurEmail`}
                        control={control}
                        value={value}
                        rules={{required: true}}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={form.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.organisateurEmail && <ErrorMessage message="Le nom de l'organisateur est requis."/>}
                    <View>
                        <Text style={{marginTop: 10, marginBottom: 10, color: '#386641'}}>L'organisateur participe au
                            secret santa</Text>
                        <Switch
                            trackColor={{true: "#BC4749", false: "#767577"}}
                            thumbColor={isEnabled ? "#fee374" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
                {fields.map((item, index) => {
                    return (
                        <View key={index}>
                            <Text style={form.label}>#{index + 1} nom</Text>
                            <Controller
                                name={`players.${index}.name`}
                                control={control}
                                value={value}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={form.input}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors[`players.${index}.name`] &&
                                <ErrorMessage message="Le nom de l'organisateur est requis."/>}

                            <Text style={form.label}>#{index + 1} email</Text>
                            <Controller
                                name={`players.${index}.email`}
                                control={control}
                                value={value}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={form.input}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors[`players.${index}.email`] &&
                                <ErrorMessage message="Le nom de l'organisateur est requis."/>}

                        </View>
                    );
                })}
                <ButtonComponent isPrimary={'false'} onPress={() => {
                    append({firstName: '', lastName: ''});
                }} text="Ajouter un participant" style={form.margin}/>
                <ButtonComponent isPrimary={'true'} onPress={handleSubmit(onSubmit)} text="Créer" style={form.margin}/>
            </View>
            <ButtonComponent isPrimary={'true'} onPress={() => {
                AlertCreate('test', 'test')
            }} text="alert" style={form.margin}/>

        </ScrollView>
    );
}
