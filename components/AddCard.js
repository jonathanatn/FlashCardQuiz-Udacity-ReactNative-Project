import React, { Component } from 'react';
import {
      View,
      Text,
      StyleSheet,
      TouchableOpacity,
      TextInput,
      AsyncStorage
} from 'react-native';
import { addCardToDeck } from '../utils/api';
import { connect } from 'react-redux';
import { addCard } from '../actions';

class AddCard extends Component {
      state = {
            question: '',
            answer: ''
      };

      handleSubmit = () => {
            const { dispatch } = this.props;
            const question = this.state.question;
            const answer = this.state.answer;
            const id = this.props.navigation.state.params.entryId;

            const card = {
                  question,
                  answer
            };

            if (question !== '' && answer !== '') {
                  addCardToDeck(id, card).then(result =>
                        dispatch(addCard(result))
                  );
                  this.toHome();
            } else {
                  alert('You need to fill both question and answer');
            }
      };

      toHome = () => {
            this.props.navigation.goBack(this.props.navigation.state.key);
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
                              Add card
                        </Text>
                        <Text style={{ fontSize: 18, marginBottom: 5 }}>
                              Question:
                        </Text>
                        <TextInput
                              style={styles.input}
                              onChangeText={question =>
                                    this.setState({ question })
                              }
                              value={this.state.question}
                        />
                        <Text style={{ fontSize: 18, marginBottom: 5 }}>
                              Answer:
                        </Text>
                        <TextInput
                              style={styles.input}
                              onChangeText={answer => this.setState({ answer })}
                              value={this.state.answer}
                        />
                        <TouchableOpacity
                              style={styles.button}
                              onPress={() => this.handleSubmit()}
                        >
                              <Text style={{ fontSize: 18 }}>Add card</Text>
                        </TouchableOpacity>
                  </View>
            );
      }
}

export default connect()(AddCard);

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
