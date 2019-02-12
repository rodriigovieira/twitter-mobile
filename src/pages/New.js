import React, { Component } from 'React';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../services/api';

export default class New extends Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    newTweet: '',
  }
  
  handleInputChange = (newTweet) => this.setState({  newTweet });

  handleTweet = async () => {
    const author = await AsyncStorage.getItem('@CloneApp:username');
    const content = this.state.newTweet;

    await api.post('/tweet', { author, content });

    this.props.navigation.pop();
  }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.pop()}>
            <Icon name="close" size={24} color="#4BB0EE"></Icon>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => { }}>
            <Text style={styles.buttonText}>Tweetar</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TextInput
            style={styles.input}
            multiline
            placeholder="What's happening?"
            placeholderTextColor="#999"
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            returnKeyType="send"
            onSubmitEditing={this.handleTweet}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = new StyleSheet({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    heigh: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#4BB0EE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  input: {
    margin: 20,
    fontSize: 16,
    color: '#333',
  }
})
