import {Alert, Image, ScrollView, StyleSheet, Switch, Text, TextInput, View} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {ButtonComponent} from "../Component/Button";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {Loading} from "../Component/Loading";
import {useState} from "react";
import {ErrorMessage} from "../Component/ErrorMessage";
import {filterPlayers} from "../utils/filterPlayers";
import {checkParticipant} from "../utils/checkParticipant";
import {generateCouples} from "../utils/generateCouple";
import AsyncStorage from "@react-native-async-storage/async-storage";
export function CreationScreen({navigation}) {

    //TODO PERSISTANCE DES DONNES QUAND ON QUITTE L'APPLICATION

    const [isLoading, setIsLoading] = useState(false);

    const { control, value, formState: { errors,  }, handleSubmit} = useForm({
        defaultValues: {
            players: [{ name: "", email: "" },{ name: "", email: "" },{ name: "", email: "" }],
        }
    });

    const {
        fields,
        append,
    } = useFieldArray({
        control,
        name: "players"
    });

    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    function displayErrorAlert(haveError) {
        Alert.alert(
            haveError.title,
            haveError.message,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )
    }

    const onSubmit = (data) => {
        setIsLoading(true);
        const filterData = filterPlayers(data.players);

        if (filterData.error)
            displayAlertForNotAllData()
        else {
            if (isEnabled)
                filterData.push({email: data.organisateurEmail, name:data.organisateurName});
            const evenement = {
                name: data.name,
                budget: data.budget,
                organisateur: {email: data.organisateurEmail, name:data.organisateurName},
                players: filterData,
            }
            const haveError = checkParticipant(evenement.players);
            if (haveError)
                displayErrorAlert(haveError);
            else {
                evenement['couples'] = generateCouples(evenement.players);
                saveEvenement(evenement).then();
            }
        }
    };
    async function saveEvenement(evenement) {
        const secretSantas = await AsyncStorage.getItem('secretSantas').then(async () => {
                const secretSantasArray = secretSantas ? JSON.parse(secretSantas) : [];
                secretSantasArray.push(evenement);
                await AsyncStorage.setItem('secretSantas', JSON.stringify(secretSantasArray)).then(async () => {
                    await navigation.navigate('ConfirmCreation');
                })
            }
        );
    }

    function displayAlertForNotAllData() {
        Alert.alert(
            'Champs manquant',
            'Vous avez remplis un nom et non une adresse mail ou vice versa',
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )
        setIsLoading(false);
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
                <View>
                    <Text style={styles.label}>Nom de l'evenement</Text>
                    <Controller
                        name={`name`}
                        control={control}
                        value={value}
                        rules={{required: true}}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.name && <ErrorMessage message="Le nome de l'evenement est requis." />}

                    <Text style={styles.label}>Budget</Text>
                    <Controller
                        name={`budget`}
                        control={control}
                        value={value}
                        rules={{required: true}}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.budget && <ErrorMessage message="Le budget est requis." />}

                </View>
                <View>
                    <Text style={styles.label}>Nom de l'organisateur</Text>
                    <Controller
                        name={`organisateurName`}
                        control={control}
                        value={value}
                        rules={{required: true}}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.organisateurName && <ErrorMessage message="Le nom de l'organisateur est requis." />}
                    <Text style={styles.label}>Email de l'organisateur</Text>
                    <Controller
                        name={`organisateurEmail`}
                        control={control}
                        value={value}
                        rules={{required: true}}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.organisateurEmail && <ErrorMessage message="Le nom de l'organisateur est requis." />}
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
                </View>
                {fields.map((item, index) => {
                    return (
                        <View>
                            <Text style={styles.label}>#{index + 1} nom</Text>
                            <Controller
                                name={`players.${index}.name`}
                                control={control}
                                value={value}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors[`players.${index}.name`] && <ErrorMessage message="Le nom de l'organisateur est requis." />}

                            <Text style={styles.label}>#{index + 1} email</Text>
                            <Controller
                                name={`players.${index}.email`}
                                control={control}
                                value={value}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors[`players.${index}.email`] && <ErrorMessage message="Le nom de l'organisateur est requis." />}

                        </View>
                    );
                })}
                <ButtonComponent isPrimary={'false'} onPress={()=>{append({ firstName: '', lastName: '' });}} text="Ajouter un participant" style={styles.margin}/>
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
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#386641",
    marginTop: 10,
  },
  group: {
    margin: 12,
    padding: 10,
  },
  label: {
    paddingTop: 10,
  },
});