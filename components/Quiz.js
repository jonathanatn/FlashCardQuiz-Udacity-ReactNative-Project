import React, { Component } from 'react';
import {
      View,
      Text,
      StyleSheet,
      TouchableOpacity,
      TextInput,
      AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import {
      clearLocalNotification,
      setLocalNotification
} from '../utils/notifications';

class Quiz extends Component {
      state = {
            isQuizOver: false,
            quizQuestion: 0,
            correctAnswer: 0,
            isAnswerShown: false
      };

      handleCorrect = () => {
            const id = this.props.navigation.state.params.entryId;
            const questionsLength = this.props.decks[id].questions.length;

            if (this.state.quizQuestion < questionsLength - 1) {
                  this.setState({
                        quizQuestion: this.state.quizQuestion + 1,
                        correctAnswer: this.state.correctAnswer + 1
                  });
            } else {
                  this.setState({
                        isQuizOver: !this.state.isQuizOver,
                        correctAnswer: this.state.correctAnswer + 1
                  });
                  clearLocalNotification().then(setLocalNotification);
            }
            this.setState({
                  isAnswerShown: false
            });
      };

      handleIncorrect = () => {
            const id = this.props.navigation.state.params.entryId;
            const questionsLength = this.props.decks[id].questions.length;

            if (this.state.quizQuestion < questionsLength - 1) {
                  this.setState({
                        quizQuestion: this.state.quizQuestion + 1
                  });
            } else {
                  this.setState({
                        isQuizOver: !this.state.isQuizOver
                  });
                  clearLocalNotification().then(setLocalNotification);
            }
            this.setState({
                  isAnswerShown: false
            });
      };

      handleRestart = () => {
            this.setState({
                  isQuizOver: false,
                  quizQuestion: 0,
                  correctAnswer: 0,
                  isAnswerShown: false
            });
      };

      showAnswer = () => {
            this.setState({
                  isAnswerShown: true
            });
      };

      render() {
            const id = this.props.navigation.state.params.entryId;
            const questions = this.props.decks[id].questions;
            const questionsLength = this.props.decks[id].questions.length;
            console.log(this.props.decks[id]);
            if (this.state.isQuizOver === true) {
                  return (
                        <View style={styles.view}>
                              <Text
                                    style={{ fontSize: 24, fontWeight: 'bold' }}
                              >
                                    Quiz Over
                              </Text>
                              <Text style={{ fontSize: 18, marginBottom: 15 }}>
                                    {this.state.correctAnswer}/{questionsLength}{' '}
                                    correct answers
                              </Text>
                              <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.handleRestart()}
                              >
                                    <Text style={{ fontSize: 18 }}>
                                          Restart quiz
                                    </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                    style={styles.button}
                                    onPress={() =>
                                          this.props.navigation.goBack(null)
                                    }
                              >
                                    <Text style={{ fontSize: 18 }}>
                                          Quit quiz
                                    </Text>
                              </TouchableOpacity>
                        </View>
                  );
            } else if (questionsLength === 0) {
                  return (
                        <View style={styles.view}>
                              <Text style={{ fontSize: 24, marginTop: 15 }}>
                                    Sorry the deck is empty. You need to add
                                    card if you want to launch the quiz
                              </Text>
                        </View>
                  );
            }

            return (
                  <View style={styles.view}>
                        <Text>
                              {this.state.quizQuestion + 1} / {questions.length}
                        </Text>
                        <Text style={{ fontSize: 24, marginTop: 15 }}>
                              {questions[this.state.quizQuestion].question}
                        </Text>
                        <TouchableOpacity onPress={() => this.showAnswer()}>
                              <Text>Show answer</Text>
                        </TouchableOpacity>

                        {this.state.isAnswerShown === true && (
                              <Text style={{ fontSize: 24, marginTop: 15 }}>
                                    {questions[this.state.quizQuestion].answer}
                              </Text>
                        )}

                        <Text />
                        <TouchableOpacity
                              style={styles.button}
                              onPress={() => this.handleCorrect()}
                        >
                              <Text style={{ fontSize: 18 }}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                              style={styles.button}
                              onPress={() => this.handleIncorrect()}
                        >
                              <Text style={{ fontSize: 18 }}>Incorrect</Text>
                        </TouchableOpacity>
                  </View>
            );
      }
}

function mapStateToProps(decks) {
      return {
            decks
      };
}

export default connect(mapStateToProps)(Quiz);

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
