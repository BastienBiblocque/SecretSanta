import {Button, Image, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {Formik} from 'formik';
import {ButtonComp} from "../Component/Button";
import {TextInputComp} from "../Component/TextInput";
export function CreationScreen() {



    return (
        <ScrollView style={background.background} >
            <Image style={styles.image} source={require('../image/tree.png')}/>
            <Formik
                initialValues={{ email: '' }}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <TextInputComp
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        <ButtonComp isPrimary={'true'} onPress={handleSubmit} text="Créer" style={styles.margin} />
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    margin: {
        marginTop: 16,
        marginLeft: 30,
        marginRight: 30,
    },
    image: {
        marginTop: 16,
        width: 283,
        height: 200,
        alignSelf: 'center',
    },
});