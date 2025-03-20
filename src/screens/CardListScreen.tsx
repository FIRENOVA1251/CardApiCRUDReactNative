// useState is used to define and manage the component's state, for example, to store card data and the loading state.
// useEffect is used to set up side effects during the component's lifecycle, such as background timed refreshes.
// useCallback is used to wrap callback functions to prevent them from being recreated on every re-render, 
// which helps optimize performance.
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { WalletCard } from '../types/WalletCard';
import { getWalletCards, deleteWalletCard } from '../api/FakeWalletCardApi';
import { useFocusEffect } from '@react-navigation/native';

interface CardListScreenProps {
  navigation: any;
}

// Define a React Function Component named CardListScreen
const CardListScreen: React.FC<CardListScreenProps> = ({ navigation }) => {

  // This state variable will store the list of wallet cards fetched from the API.
  const [cards, setCards] = useState<WalletCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCards = async () => {
    setLoading(true);
    try {
      // await is used to pause the execution of an async function until a Promise is resolved.
      const data = await getWalletCards();
      setCards(data);
    } catch (error) {
      console.error('Error fetching cards', error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh cards when the screen is focused
  // Automatically calls fetchCards to retrieve the latest data when the user navigates back from another screen.
  useFocusEffect(
    // Wraps the call to fetchCards to ensure that the callback is not recreated 
    // when its dependencies remain unchanged, optimizing performance.
    useCallback(() => {
      fetchCards();
    }, [])
  );

  // Background refresh: simulate with a timer (for demo, refresh every 60 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCards();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteWalletCard(id);
      fetchCards();
    } catch (error) {
      console.error('Error deleting card', error);
    }
  };

  // Card Item.
  const renderItem = ({ item }: { item: WalletCard }) => (
    // Make it clickable
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CardDetail', { card: item })}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.cardName}</Text>
        <Text>{item.cardNumber}</Text>
        <Text>Balance: ${item.balance.toFixed(1)}</Text>
      </View>
      <Button title="Delete" onPress={() => handleDelete(item.id)} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Card List</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CardDetail')}>
        <Text style={styles.addButtonText}>+ Add Card</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff'
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#c4c4c4',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6200EE',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
