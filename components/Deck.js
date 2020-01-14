// View:
// - Delete deck button (And go back home)

// Data:
// - Delete a deck

import React, { Component } from 'react';
import {
      View,
      Text,
      StyleSheet,
      TouchableOpacity,
      TextInput,
      AsyncStorage
} from 'react-native';
import { saveDeckTitle, getDecks } from '../utils/api';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { withNavigationFocus } from 'react-navigation';

class Deck extends Component {
      getData() {
            const { dispatch } = this.props;
            getDecks()
                  .then(decks => dispatch(receiveDecks(decks)))
                  .catch(function(error) {
                        console.log(error.message);
                        throw error;
                  });
      }

      render() {
            const { state, navigate } = this.props.navigation;
            const id = this.props.navigation.state.params.entryId;
            const deck = this.props.decks[id];
            const numberOfCards = Object.keys(deck.questions).length;
            return (
                  <View style={styles.view}>
                        <Text
                              style={{
                                    fontWeight: 'bold',
                                    fontSize: 24,
                                    marginBottom: 5
                              }}
                        >
                              {id}
                        </Text>
                        <Text
                              style={{
                                    marginBottom: 30
                              }}
                        >
                              {numberOfCards} cards in the deck
                        </Text>

                        <TouchableOpacity
                              style={styles.button}
                              key={id}
                              onPress={() =>
                                    this.props.navigation.navigate('AddCard', {
                                          entryId: id
                                    })
                              }
                        >
                              <Text style={{ fontSize: 18 }}>Add card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                              style={styles.button}
                              onPress={() =>
                                    this.props.navigation.navigate('Quiz', {
                                          entryId: id
                                    })
                              }
                        >
                              <Text style={{ fontSize: 18 }}>Start quizz</Text>
                        </TouchableOpacity>
                  </View>
            );
      }
      componentDidUpdate(previousProps) {
            if (!previousProps.isFocused && this.props.isFocused) {
                  this.getData();
            }
      }
}

function mapStateToProps(decks) {
      return {
            decks
      };
}

export default withNavigationFocus(connect(mapStateToProps)(Deck));

const styles = StyleSheet.create({
      view: {
            flex: 1,
            marginBottom: 30,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20
      },
      button: {
            backgroundColor: 'grey',
            height: 70,
            width: 200,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            marginTop: 5
      }
});
