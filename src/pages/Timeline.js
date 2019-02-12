import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../services/api';

import Tweet from '../components/Tweet';

export default class Timeline extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Start',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <Icon
          name="add-circle-outline"
          size={24}
          color="#4BB0EE"
          style={{ marginRight: 20 }}
        />
      </TouchableOpacity>
    )
  })

  state = {
    tweets: [],
  }

  async componentDidMount() {
    this.subscribeToEvents();

    const response = await api.get('tweets');

    this.setState({ tweets: response.data })
  }

  subscribeToEvents = () => {
    const io = socket('http://api.clone.rodrigovieira.work');

    io.on('tweet', data => {
      this.setState({ tweets: [data, ...this.state.tweets] })
    })

    io.on('like', data => {
      this.setState({
        tweets: this.state.tweets.map(value => value._id === data._id ? data : value)
      })
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({ item }) => <Tweet tweet={item} />}
        />
      </View>
    )
  }
}

const styles = new StyleSheet({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  }
})
