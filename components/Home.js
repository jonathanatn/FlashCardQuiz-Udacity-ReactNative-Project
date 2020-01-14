import React, { Component } from 'react';
import {
      View,
      Text,
      StyleSheet,
      TouchableOpacity,
      ScrollView,
      AsyncStorage
} from 'react-native';
import { saveDeckTitle, getDecks } from '../utils/api';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { withNavigationFocus } from 'react-navigation';

const DECK_STORAGE = 'Udacity:Flashcard';

class Home extends Component {
      state = {
            decks: {}
      };

      componentDidMount() {
            this.getData();
      }

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
            const decks = this.props.decks;

            return (
                  <ScrollView>
                        {Object.keys(decks).map(result => (
                              <TouchableOpacity
                                    key={result}
                                    onPress={() =>
                                          this.props.navigation.navigate(
                                                'Deck',
                                                { entryId: result }
                                          )
                                    }
                              >
                                    <View style={styles.deckItem}>
                                          <Text style={{ fontSize: 18 }}>
                                                {result}
                                          </Text>
                                          <Text>
                                                {
                                                      Object.keys(
                                                            decks[result]
                                                                  .questions
                                                      ).length
                                                }{' '}
                                                questions
                                          </Text>
                                    </View>
                              </TouchableOpacity>
                        ))}
                        <Text />
                        <Text />
                        <Text />
                  </ScrollView>
            );
      }

      componentDidUpdate(previousProps) {
            if (!previousProps.isFocused && this.props.isFocused) {
                  this.getData();
            }
      }

      clearAsyncStorage = async () => {
            AsyncStorage.clear();
      };
}

function mapStateToProps(decks) {
      return {
            decks
      };
}

export default withNavigationFocus(connect(mapStateToProps)(Home));

const styles = StyleSheet.create({
      deckItem: {
            backgroundColor: '#D3D3D3',
            height: 100,
            margin: 5,
            paddingLeft: 20,
            borderRadius: 5,
            justifyContent: 'center'
      }
});
