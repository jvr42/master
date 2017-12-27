import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { config } from './../config/config';

class Main extends React.Component {

  state = {}

  componentWillMount(){
    console.log(this.props)
  }

  _logout = () => {
    this.props.navigation.navigate('login');
  }

  render() {
      return (
      <View style={{flex: 1}}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => this._logout()}>
              <Icon
                iconStyle={{marginTop: 35, opacity: 0.5}}
                name='log-out'
                type='feather'
                color='#000000'
                size={40}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Hola { this.props.user.name }!</Text>
          </View>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>¿Qué operación quieres realizar?</Text>
          </View>
          <View style={styles.btnsContainer}>
            <TouchableOpacity onPress={() => {this.props.createCredit(); this.props.navigation.navigate('categories')}}>
              <Image style={styles.btns} source={require('./../assets/plus.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.createDebit(); this.props.navigation.navigate('categories')}}>
              <Image style={styles.btns} source={require('./../assets/minus.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.ammountContainer}>
            <Text style={styles.ammountText}>${this.props.user.balance}</Text>
          </View>
      </View>
      );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.token
  }
}

export default connect(mapStateToProps, actions)(Main);

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'transparent',
    height: 80,
    alignItems: 'flex-end',
    paddingRight: 15
  },
  headerText: {

  },
  headerBtn:{
    backgroundColor: 'transparent'
  },
  btns: {
    width: 180,
    height:180,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.3
  },
  welcomeContainer: {
    marginTop: 60,
    alignItems: 'center',
    margin: 20,
  },
  welcomeText:{
    fontSize: 30
  },
  questionContainer: {
    alignItems: 'center'
  },
  questionText:{
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20
  },
  ammountContainer: {
    marginTop: 50,
    alignItems: 'center'
  },
  ammountText:{
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  btnsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
