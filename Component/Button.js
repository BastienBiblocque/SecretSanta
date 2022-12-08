import {Pressable, StyleSheet, Text} from "react-native";
import * as React from "react";
import {useEffect} from "react";

export function ButtonComp(props) {
    useEffect(() => {
        if (props.primary) {
            styles.button.backgroundColor = '#1E90FF';
        }
    }, []);

    const styles = StyleSheet.create({
        true: {
            button: {
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 18,
                paddingHorizontal: 32,
                borderRadius: 20,
                elevation: 3,
                backgroundColor: '#386641',
            },
            text: {
                fontSize: 16,
                lineHeight: 21,
                fontWeight: 'bold',
                letterSpacing: 0.25,
                color: 'white',
            },
        },
        false: {
            button: {
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 18,
                paddingHorizontal: 32,
                borderRadius: 20,
                elevation: 3,
                backgroundColor: '#F2E8CF',
                borderStyle: 'solid',
                borderWidth: 3,
                borderColor: '#386641',
            },
            text: {
                fontSize: 16,
                lineHeight: 21,
                fontWeight: 'bold',
                letterSpacing: 0.25,
                color: '#386641',
            },
        }
    });

    return (
        <Pressable onPress={props.onPress} style={{...styles[props.isPrimary].button, ...props.style}}>
            <Text style={styles[props.isPrimary].text}>{props.text}</Text>
        </Pressable>
    );
}

