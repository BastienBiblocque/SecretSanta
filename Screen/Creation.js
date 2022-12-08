import {Image, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from "react";
import {background} from "../style/background";
import {Formik} from 'formik';
import {ButtonComp} from "../Component/Button";
export function CreationScreen({navigation}) {
    function createSecretSanta (values)  {
        navigation.navigate('ConfirmCreation');
    }

    return (
        <ScrollView style={background.background} >
            <Image style={styles.image} source={require('../image/tree.png')}/>
            <Formik
                initialValues={{ email: '', budget:'5' }}
                onSubmit={(values) => {
                    createSecretSanta(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <View style={styles.group}>
                            <Text>Orgnisateur :</Text>
                            <Text>Nom</Text>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}
                            />
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.group}>
                            <Text>#1</Text>
                            <Text>Nom</Text>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}
                            />
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.group}>
                            <Text>#2</Text>
                            <Text>Nom</Text>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}
                            />
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}
                            />
                        </View>
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