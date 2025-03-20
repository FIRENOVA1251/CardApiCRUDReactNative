import { WalletCard } from '../types/WalletCard';

let walletCards: WalletCard[] = [
  { id: 1, cardName: 'Visa', cardNumber: '**** **** **** 1234', balance: 1200.50 },
  { id: 2, cardName: 'MasterCard', cardNumber: '**** **** **** 5678', balance: 750.00 },
  { id: 3, cardName: 'Amex', cardNumber: '**** **** **** 9012', balance: 3000.00 },
];

const FAKE_DELAY = 500; // in ms

export const getWalletCards = (): Promise<WalletCard[]> =>
  new Promise(resolve => {
    setTimeout(() => resolve([...walletCards]), FAKE_DELAY);
  });

export const addWalletCard = (card: Omit<WalletCard, 'id'>): Promise<WalletCard> =>
  new Promise(resolve => {
    setTimeout(() => {
      // Calculate new card's card id.
      const newId = Math.max(...walletCards.map(c => c.id)) + 1;
      // Combine new card and its id.
      const newCard: WalletCard = { id: newId, ...card };
      walletCards.push(newCard);
      resolve(newCard);
    }, FAKE_DELAY);
  });

export const updateWalletCard = (updatedCard: WalletCard): Promise<WalletCard> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = walletCards.findIndex(c => c.id === updatedCard.id);
      // If the card exist.
      if (index !== -1) {
        walletCards[index] = updatedCard;
        resolve(updatedCard);
      } else {
        reject(new Error('Card not found'));
      }
    }, FAKE_DELAY);
  });

export const deleteWalletCard = (id: number): Promise<void> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = walletCards.findIndex(c => c.id === id);
      if (index !== -1) {
        walletCards.splice(index, 1);
        resolve();
      } else {
        reject(new Error('Card not found'));
      }
    }, FAKE_DELAY);
  });
