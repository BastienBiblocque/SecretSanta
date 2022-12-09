import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {HomeScreen} from './screen/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ConfirmationResendMailScreen} from "./screen/ConfirmationResendMail";
import {ConfirmCreationScreen} from "./screen/ConfirmCreation";
import {CreationScreen} from "./screen/Creation";
import {ConsultationDetailScreen} from "./screen/ConsultationDetail";
import {ConsultationScreen} from "./screen/Consultation";
import {SpoilerDetailScreen} from "./screen/SpoilerDetail";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerStyle: { backgroundColor: '#BC4749'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold'},
        }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'HUBAPI' }} />
          <Stack.Screen name="ConfirmationResendMail" component={ConfirmationResendMailScreen} options={{ title: 'Confirmation' }} />
          <Stack.Screen name="ConfirmCreation" component={ConfirmCreationScreen} options={{ title: 'Confirmation' }} />
          <Stack.Screen name="Consultation" component={ConsultationScreen} options={{ title: 'Vos Secret Santa' }} />
          <Stack.Screen name="ConsultationDetail" component={ConsultationDetailScreen} options={{ title: 'Détail' }} />
          <Stack.Screen name="Creation" component={CreationScreen} options={{ title: 'Créer un secret santa'}} />
          <Stack.Screen name="SpoilerDetail" component={SpoilerDetailScreen} options={{ title: 'Spoiler' }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
