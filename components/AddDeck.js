import React, { Component } from 'react';
import {
      View,
      Text,
      StyleSheet,
      TouchableOpacity,
      TextInput
} from 'react-native';
import { AsyncStorage } from 'react-native';
import {
      saveDeckTitle,
      getDecks,
      getDeck,
      addCardToDeck,
      initDB
} from '../utils/api';
import { connect } from 'react-redux';
import { addDeck, receiveDecks, handleAddQuestion } from '../actions';
import { NavigationActions } from 'react-navigation';

class AddDeck extends Component {
      state = {
            text: ''
      };

      handleSubmit = () => {
            const { dispatch } = this.props;
            const title = this.state.text;

            if (title !== '') {
                  // saveDeckTitle(title).then(resultDeck =>
                  //       dispatch(addDeck(resultDeck))
                  // );
                  saveDeckTitle(title);

                  this.toHome();
            } else {
                  alert('You need to at least one character');
            }
      };

      toHome = () => {
            this.props.navigation.dispatch(
                  NavigationActions.back({ key: 'AddDeck' })
            );
      };

      render() {
            return (
                  <View style={styles.view}>
                        <Text
                              style={{
                                    fontWeight: 'bold',
                                    fontSize: 24,
                                    marginBottom: 30
                              }}
                        >
                              Add a deck
                        </Text>
                        <TextInput
                              style={styles.input}
                              onChangeText={text => this.setState({ text })}
                              value={this.state.text}
                        />
                        <TouchableOpacity
                              style={styles.button}
                              onPress={() => this.handleSubmit()}
                        >
                              <Text style={{ fontSize: 18 }}>Create deck</Text>
                        </TouchableOpacity>
                  </View>
            );
      }
}

export default connect()(AddDeck);

const styles = StyleSheet.create({
      view: {
            flex: 1,
            marginBottom: 30,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20
      },
      input: {
            borderRadius: 5,
            marginBottom: 20,
            height: 40,
            width: 350,
            borderColor: 'gray',
            borderWidth: 1
      },
      button: {
            backgroundColor: 'grey',
            height: 70,
            width: 200,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5
      }
});
