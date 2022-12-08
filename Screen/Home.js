import {ActivityIndicator, Button, ScrollView, Text, View} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {CharacterCard} from "../Component/CharacterCard";

export function HomeScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);

    const [animals, setAnimals] = useState([]);

    const fetchData = () => {
        const baseURL = "https://api.got.show/api/show/animals/";
        axios.get(`${baseURL}`).then((response) => {
            setAnimals(response.data);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ScrollView>
            {isLoading ? <ActivityIndicator size="large"/> : (
                animals.map((animal) => (
                    <CharacterCard animal={animal} key={animal.id} />
                ))
            )}
        </ScrollView>
    );
}