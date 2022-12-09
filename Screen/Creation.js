import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import * as React from "react";
import { background } from "../style/background";
import { ButtonComponent } from "../component/Button";
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loading } from "../component/Loading";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../component/ErrorMessage";
export function CreationScreen({ navigation }) {
  //TODO PERSISTANCE DES DONNES QUAND ON QUITTE L'APPLICATION
  // CHECK HOOKFORM

  const [game, setGame] = useState([{}]);

  const [numberOfPlayer, setNumberOfParticipants] = React.useState([
    "Organisateur",
    "1",
    "2",
    "3",
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const addPlayer = () => {
    setNumberOfParticipants([
      ...numberOfPlayer,
      numberOfPlayer.length.toString(),
    ]);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    console.log(watch());
  }, [watch]);

  const onSubmit = (data) => {
    setIsLoading(true);
    const evenement = {
      name: data.name,
      budget: data.budget,
      date: data.date,
    };
    const filterData = filterForm(data, isEnabled);
    if (filterData.error) {
      Alert.alert(
        "Champs manquant",
        "Vous avez remplis un nom et non une adresse mail ou vice versa",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      setIsLoading(false);
    } else {
      const haveError = checkParticipant(filterData);
      if (!haveError) {
        evenement["organisateur"] = filterData.organisateur;
        evenement["couples"] = generateCouples(filterData.player);
        saveEvenement(evenement).then();
      } else {
        Alert.alert(haveError.title, haveError.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView style={background.background}>
      <Image style={styles.image} source={require("../image/tree.png")} />
      <View style={{ marginRight: 30, marginLeft: 30 }}>
        <Text style={styles.label}>Nom de l'evenement</Text>
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
          name="name"
        />
        {errors.name && (
          <ErrorMessage message="Le nom de l'evenement est requis." />
        )}
        <Text style={styles.label}>Budget</Text>
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
          name="budget"
        />
        {errors.budget && <ErrorMessage message="Le budget est requis." />}

        <View>
          <Text style={{ marginTop: 10, marginBottom: 10 }}>
            L'oganisateur participe au secret santa
          </Text>
          <Switch
            trackColor={{ true: "#BC4749", false: "#767577" }}
            thumbColor={isEnabled ? "#fee374" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        {numberOfPlayer.map((item, index) => (
          <View key={index}>
            <Text style={{ marginTop: 40 }}>#{item}</Text>
            <Text style={styles.label}>Nom</Text>
            <Controller
              control={control}
              rules={{
                required: { value: item === "Organisateur" },
              }}
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
            {errors[`name-${item}`] && (
              <ErrorMessage message="Le nom est requis." />
            )}
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              rules={{
                required: { value: item === "Organisateur" },
              }}
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
            {errors[`email-${item}`] && (
              <ErrorMessage message="Le mail est requis." />
            )}
          </View>
        ))}
        <ButtonComponent
          isPrimary={"false"}
          onPress={() => {
            addPlayer();
          }}
          text="Ajouter un participant"
          style={styles.margin}
        />
        <ButtonComponent
          isPrimary={"true"}
          onPress={handleSubmit(onSubmit)}
          text="Créer"
          style={styles.margin}
        />
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
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#386641",
    marginTop: 10,
  },
  group: {
    margin: 12,
    padding: 10,
  },
  label: {
    paddingTop: 10,
  },
});
