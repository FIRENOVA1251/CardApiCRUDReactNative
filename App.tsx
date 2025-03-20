import React from 'react';
//top-level component that manages app's navigation state
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CardListScreen from './src/screens/CardListScreen';
import CardDetailScreen from './src/screens/CardDetailScreen';
import { WalletCard } from './src/types/WalletCard';

// Define Routes
export type RootStackParamList = {
  CardList: undefined;
  // It optionally accepts an object that may contain a card property of type WalletCard. 
  // If no parameter is passed, it can also be undefined.
  CardDetail: { card?: WalletCard } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CardList">
        <Stack.Screen name="CardList" component={CardListScreen} options={{ title: 'Wallet Cards' }} />
        <Stack.Screen name="CardDetail" component={CardDetailScreen} options={{ title: 'Card Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Entry point for React Native application.
export default App;
