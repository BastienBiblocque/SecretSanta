import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveEvenement(evenement) {
    const secretSantas = await AsyncStorage.getItem('secretSantas');
    const secretSantasArray = secretSantas ? JSON.parse(secretSantas) : [];
    secretSantasArray.push(evenement);
    await AsyncStorage.setItem('secretSantas', JSON.stringify(secretSantasArray));
    await navigation.navigate('ConfirmCreation');
}