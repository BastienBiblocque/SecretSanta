import {ActivityIndicator, ScrollView} from "react-native";
import * as React from "react";
import {background} from "../style/background";

export function Loading(props) {
    return (
        <ScrollView style={background.background}>
            <ActivityIndicator style={{marginTop:300}} size="large" color="#0000ff" />
        </ScrollView>
    );
}