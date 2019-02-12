import React from 'react';
import socket from 'socket.io-client';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import api from '../services/api';

import Icon from 'react-native-vector-icons/Ionicons';

export default class Tweet extends React.Component {
  handleLike = () => {
    const { _id } = this.props.tweet;

    api.post(`tweet/${_id}`);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.author}>
          {this.props.tweet.author}
        </Text>
        <Text style={styles.content}>
          {this.props.tweet.content}
        </Text>

        <TouchableOpacity onPress={this.handleLike} style={styles.likeButton}> 
          <Icon name="ios-heart-empty" size={20} color="#999" />
          <Text style={styles.likeText}>{this.tweet.likes}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = new StyleSheet({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C2022',
  },

  content: {
    fontSize: 15,
    lineHeight: 20,
    color: '#1C2022',
    marginVertical: 10,
  },

  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  likeText: {
    color: '#999',
    marginLeft: 5,
  }
})