import {StyleSheet, Text, Pressable} from "react-native";
import * as React from "react";
import {useNavigation} from "@react-navigation/native";

export function SecretCard(props) {
    const navigation = useNavigation();
    return (
        <Pressable onPress={()=>navigation.navigate('ConsultationDetail',{secretSanta:JSON.stringify(props.secretSanta)})} style={styles.card}>
            <Text style={styles.text}>{props.secretSanta.name}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 16,
        marginLeft: 30,
        marginRight: 30,
        padding: 16,
        backgroundColor: '#386641',
        borderRadius: 16,
        marginBottom: 16,
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
        marginLeft: 30,
        marginRight: 30,
    }
});