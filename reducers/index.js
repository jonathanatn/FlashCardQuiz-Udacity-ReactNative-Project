import {
      RECEIVE_DECKS,
      ADD_DECK,
      RECEIVE_DECK_CARD,
      ADD_CARD
} from '../actions/index';

function decks(state = {}, action) {
      switch (action.type) {
            case RECEIVE_DECKS:
                  return {
                        ...state,
                        ...action.decks
                  };
            case RECEIVE_DECK_CARD:
                  return {
                        ...state,
                        [action.deck.title]: {
                              ...state[action.deck.title]
                        }
                  };
            case ADD_CARD:
                  // console.log('REDUCER ACTION', action)
                  return {
                        ...state
                  };

            case ADD_DECK:
                  console.log('REDUCER ADDDECK', action);
                  return {
                        ...state,
                        ...action.deck
                  };
            default:
                  return state;
      }
}

export default decks;
