import { AsyncStorage } from 'react-native';

const DECK_STORAGE = 'Udacity:Flashcard';

export function getDecks() {
      return AsyncStorage.getItem(DECK_STORAGE).then(result =>
            JSON.parse(result)
      );
}

export function saveDeckTitle(title) {
      return AsyncStorage.mergeItem(
            DECK_STORAGE,
            JSON.stringify({
                  [title]: {
                        title,
                        questions: []
                  }
            })
      );
}

export function getDeck(id) {
      return AsyncStorage.getItem(DECK_STORAGE).then(result => {
            const deck = JSON.parse(result);
            return deck[id];
      });
}

export function addCardToDeck(title, card) {
      return getDeck(title).then(result => {
            const questions = result.questions;
            questions.push(card);
            AsyncStorage.mergeItem(
                  DECK_STORAGE,
                  JSON.stringify({
                        [title]: {
                              questions
                        }
                  })
            );
      });
}
