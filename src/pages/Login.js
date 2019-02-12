import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Text,
  AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
  state = {
    username: '',
  }

  async componentDidMount () {
    const username = await AsyncSotrage.getItem('@CloneApp:username');
     
    if (!username) return;

    this.setState({ username })
  }

  handleusername = (username) => this.setState({ username })

  handleLogin = async () => {
    if (!this.state.username) return;

    await AsyncStorage.setItem('@CloneApp:username', this.state.username);

    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.content}>
          <View>
            <Icon name="twitter" size={64} color="#4BB0EE" />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={this.handleusername}
            onSubmitEditing={this.handleLogin}
            value={this.state.username}
            returnKeyType="send"
          />

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: 'strech',
    marginTop: 30,
  },

  button: {
    height: 44,
    alignSelf: 'strech',
    marginTop: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
})
