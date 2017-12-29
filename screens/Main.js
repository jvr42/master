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
      <View style={{flex: 1, backgroundColor: '#F6F3DA'}}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => this._logout()}>
              <Icon
                iconStyle={{marginTop: 20, opacity: 1,paddingRight: 15}}
                name='log-out'
                type='feather'
                color='#ffffff'
                size={25}
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
            <TouchableOpacity onPress={() => {/*this.props.createCredit(); */this.props.navigation.navigate('categories')}}>
              <Image style={styles.btns} source={require('./../assets/plus.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {/*this.props.createDebit(); */this.props.navigation.navigate('categories')}}>
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
  }
}

export default connect(mapStateToProps, actions)(Main);

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#24BAB6',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  headerText: {

  },
  headerBtn:{
    backgroundColor: 'transparent'
  },
  btns: {
    width: 150,
    height:150,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.3
  },
  welcomeContainer: {
    marginTop: 100,
    alignItems: 'center',
    margin: 20,
  },
  welcomeText:{
    fontSize: 45,
    fontWeight: 'bold'
  },
  questionContainer: {
    alignItems: 'center'
  },
  questionText:{
    fontSize: 19,
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
