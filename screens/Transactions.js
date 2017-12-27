import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { config } from './../config/config';

class Transactions extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.user.name}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, actions)(Transactions);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
