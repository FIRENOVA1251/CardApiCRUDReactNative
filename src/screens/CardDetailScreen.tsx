import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { WalletCard } from '../types/WalletCard';
import { addWalletCard, updateWalletCard } from '../api/FakeWalletCardApi';

interface CardDetailScreenProps {
  route: { params?: { card?: WalletCard } };
  navigation: any;
}

// Define a React Function Component named CardDetailScreen
const CardDetailScreen: React.FC<CardDetailScreenProps> = ({ route, navigation }) => {
  const card: WalletCard | undefined = route.params?.card;
  const [cardName, setCardName] = useState<string>(card ? card.cardName : '');
  const [cardNumber, setCardNumber] = useState<string>(card ? card.cardNumber : '');
  const [balance, setBalance] = useState<string>(card ? card.balance.toString() : '');

  const handleSave = async () => {
    if (!cardName || !cardNumber || !balance) {
      Alert.alert('Validation', 'Please fill in all fields');
      return;
    }
    try {
      if (card) {
        // Update existing card
        await updateWalletCard({
          ...card,
          cardName,
          cardNumber,
          balance: parseFloat(balance),
        });
      } else {
        // Add new card
        await addWalletCard({
          cardName,
          cardNumber,
          balance: parseFloat(balance),
        });
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{card ? 'Edit Card' : 'Add Card'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Card Name"
        value={cardName}
        onChangeText={setCardName}
      />
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Balance"
        value={balance}
        onChangeText={setBalance}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#6200EE',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
