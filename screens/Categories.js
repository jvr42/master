import React from 'react';
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { config } from './../config/config';


class Categories extends React.Component {

  render() {
      console.log(this.props)
      return (
      <View style={styles.container}>
        <Text>{this.props.operation}</Text>
        <Button title="volver..." onPress={()=>this.props.navigation.navigate('main')}/>
      </View>
      );
  }
}


const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    operation: state.operation
  }
}

export default connect(mapStateToProps, actions)(Categories)



const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
