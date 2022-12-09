import {Text, TextInput, View} from "react-native";
import * as React from "react";
import {form} from "../style/form";
import {Controller} from "react-hook-form";
import {ErrorMessage} from "./ErrorMessage";

export function FormController(props) {
    return (
        <View>
            <Text style={form.label}>{props.label}</Text>
            <Controller
                name={props.name}
                control={props.control}
                value={props.value}
                rules={{required: props.required}}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        style={form.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {props.errors && <ErrorMessage message={props.errorMessage}/>}
        </View>
    );
}