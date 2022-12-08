import {Image, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {ButtonComp} from "../Component/Button";
import {Controller, useForm} from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
export function CreationScreen({navigation}) {

    const [numberOfPlayer, setNumberOfParticipants] = React.useState(['Organisateur', '1', '2', '3']);
    const addPlayer = () => {
        setNumberOfParticipants([...numberOfPlayer, numberOfPlayer.length.toString()]);
    }
    const { control, handleSubmit, formState: { errors } } = useForm({});

    async function saveEvenement(evenement) {
        const secretSantas = await AsyncStorage.getItem('secretSantas');
        const secretSantasArray = secretSantas ? JSON.parse(secretSantas) : [];
        secretSantasArray.push(evenement);
        await AsyncStorage.setItem('secretSantas', JSON.stringify(secretSantasArray));
    }

    const onSubmit = (data) => {
        const evenement = {
            name: data.name,
            budget: data.budget,
            date: data.date,
        }
        const filterData = filter(data);
        evenement['organisateur'] = filterData.organisateur;
        evenement['couples'] = generateCouples(filterData.player);
        saveEvenement(evenement).then();
    };

    const filter = (data) => {
        const tmp = [];
        const numberSubscribe = Object.keys(data).length / 2;
        for (let i = 0; i < numberSubscribe; i++) {
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

    return (
        <ScrollView style={background.background}>
            <Image style={styles.image} source={require('../image/tree.png')}/>
            <View style={{marginRight:30, marginLeft:30}}>
                <Text>Nom de l'evenement</Text>
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
                {errors.name && <Text>This is required.</Text>}
                <Text>Budget</Text>
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
                {errors.budget && <Text>This is required.</Text>}
                {numberOfPlayer.map((item, index) => (
                    <View key={index}>
                        <Text style={{marginTop:40}}>#{item}</Text>
                        <Text>Nom</Text>
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
                            name={`name-${item}`}
                        />
                        <Text>Email</Text>
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
                            name={`email-${item}`}
                        />
                    </View>
                ))}
                <ButtonComp isPrimary={'false'} onPress={()=>{addPlayer()}} text="Add" style={styles.margin}/>
                <ButtonComp isPrimary={'true'} onPress={handleSubmit(onSubmit)} text="Créer" style={styles.margin}/>
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