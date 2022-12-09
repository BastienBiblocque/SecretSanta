import {ScrollView} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {useEffect, useState} from "react";
import {ListFilled} from "../component/ListFilled";
import {ListEmpty} from "../component/ListEmpty";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ConsultationScreen() {
    const [secretSantas, setSecretSantas] = useState(null);
    useEffect( () => {
        const getSecretSantas = async () => {
            await AsyncStorage.getItem('secretSantas').then((secretSantas)=>{
                const secretSantasArray = secretSantas ? JSON.parse(secretSantas) : [];
                setSecretSantas(secretSantasArray);
            });
        }
        getSecretSantas();
    },[]);

    return (
        <ScrollView style={background.background}>
            {secretSantas?.length ? <ListFilled secretSantas={secretSantas}/> : <ListEmpty/>}
        </ScrollView>
    );
}