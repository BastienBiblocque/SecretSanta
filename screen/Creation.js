import {Image, ScrollView, Switch, Text, View} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {ButtonComponent} from "../component/Button";
import {useFieldArray, useForm} from "react-hook-form";
import {Loading} from "../component/Loading";
import {useState} from "react";
import {filterPlayers} from "../utils/filterPlayers";
import {checkParticipant} from "../utils/checkParticipant";
import {generateCouples} from "../utils/generateCouple";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {sendAllEmailsWithSetInterval} from "../utils/SendMails";
import {form} from "../style/form";
import {image} from "../style/image";
import {AlertCreate} from "../component/Alerte";
import {FormController} from "../component/FormController";

export function CreationScreen({navigation}) {

    const [isLoading, setIsLoading] = useState(false);

    const {control, value, formState: {errors,}, handleSubmit} = useForm({
        defaultValues: {
            players: [{name: "", email: ""}, {name: "", email: ""}, {name: "", email: ""}],
        }
    });

    const {fields, append,} = useFieldArray({control, name: "players"});

    const [isOrganisateurPlayer, setIsOrganisateurPlayer] = useState(true);
    const toggleSwitch = () => setIsOrganisateurPlayer(previousState => !previousState);

    const onSubmit = (data) => {
        setIsLoading(true);

        const filterData = filterPlayers(data.players);

        if (filterData.error) {
            AlertCreate('Champs manquant', 'Vous avez remplis un nom et non une adresse mail ou vice versa');
            setIsLoading(false);
        } else {
            if (isOrganisateurPlayer)
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
                    <FormController label="Nom de l'evenement" required={true} name="name" control={control}
                                    value={value} errorMessage="Le nom de l'evenement est requis." errors={errors.name} />

                    <FormController label="Budget" required={true} name="budget" control={control}
                                    value={value} errorMessage="Le budget est requis." errors={errors.budget} />

                </View>
                <View>
                    <FormController label="Nom de l'organisateur" required={true} name="organisateurName" control={control}
                                    value={value} errorMessage="Le nom de l'organisateur est requis." errors={errors.organisateurName} />

                    <FormController label="Email de l'organisateur" required={true} name="organisateurEmail" control={control}
                                    value={value} errorMessage="Le mail de l'organisateur est requis." errors={errors.organisateurEmail} />

                    <View>
                        <Text style={{marginTop: 10, marginBottom: 10, color: '#386641'}}>L'organisateur participe au
                            secret santa</Text>
                        <Switch
                            trackColor={{true: "#BC4749", false: "#767577"}}
                            thumbColor={isOrganisateurPlayer ? "#fee374" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isOrganisateurPlayer}
                        />
                    </View>
                </View>
                {fields.map((item, index) => {
                    return (
                        <View key={index}>
                            <FormController label={`#${index + 1} nom`} required={false} name={`players.${index}.name`}
                                            control={control} value={value} errorMessage="" errors={null} />

                            <FormController label={`#${index + 1} email`} required={false} name={`players.${index}.email`}
                                            control={control} value={value} errorMessage="" errors={null} />

                        </View>
                    );
                })}
                <ButtonComponent isPrimary={'false'} onPress={() => {append({firstName: '', lastName: ''});}}
                                 text="Ajouter un participant" style={form.margin}/>
                <ButtonComponent isPrimary={'true'} onPress={handleSubmit(onSubmit)} text="Créer" style={form.margin}/>
            </View>
        </ScrollView>
    );
}
