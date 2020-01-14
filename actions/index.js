import {
      saveDeckTitle,
      getDecks,
      getDeck,
      addCardToDeck,
      initDB
} from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const RECEIVE_DECK_CARD = 'RECEIVE_DECK_CARD';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export function receiveDecks(decks) {
      return {
            type: RECEIVE_DECKS,
            decks
      };
}

export function receiveDeckCard(deck) {
      return {
            type: RECEIVE_DECK_CARD,
            deck
      };
}

export function addDeck(deck) {
      // console.log('ACTION ADDDECK', deck);
      return {
            type: ADD_DECK,
            deck
      };
}

export function addCard(card) {
      // console.log('ACTION ADDCARD', card);
      return {
            type: ADD_CARD,
            card
      };
}
