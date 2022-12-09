import {StyleSheet, Text} from "react-native";
import * as React from "react";

export function ErrorMessage(props) {
    return (
        <Text style={styles.errorMessage}>{props.message}</Text>
    );
}

const styles = StyleSheet.create({
    errorMessage: {
        color: '#BC4749',
    },
});