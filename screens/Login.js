import React from 'react';
import { Text, View, Image, ActivityIndicator, Keyboard, Alert, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button} from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { config } from './../config/config';

class Login extends React.Component {

  _login = async () => {
    let result = await this.props.Login({email: this.props.email, password: this.props.password});
    if (result){
      this.props.navigation.navigate('main')
    }
  }

  renderSigninIn(){
    if (this.props.loading == false){
      return (
        <View>
          <Button
            large
            title='INICIA SESION'
            buttonStyle={[{ marginTop:10, backgroundColor: 'green' }, styles.btns]}
            onPress={() => {this._login()}}
          />
          <Button
            large
            title='CREA UNA CUENTA'
            buttonStyle={[{ marginTop:10, backgroundColor: 'blue' }, styles.btns]}
            onPress={() => {this.props.navigation.navigate('signup')}}
          />
        </View>
      )
    } else {
       return (
      <ActivityIndicator size="small"/>
      )
    }
  }

  render() {
     return (
      <View style={{ flex: 1, paddingTop:80, backgroundColor: '#F6F3DA'}}>

        <View style={{marginBottom: 20, alignItems: 'center'}}>
        <Image style={{height: 150, width: 150, alignItems: 'center'}}
          source={require('./../assets/logo.png')}/>
        </View>

        <FormLabel>Correo Electrónico:</FormLabel>
        <FormInput
          value={this.props.email}
          onChangeText={(email)=>{this.props.loginUpdate({prop: 'email', value: email})}}
          inputStyle={{paddingLeft:10}}/>

        <FormLabel>Contraseña:</FormLabel>
        <FormInput
          value={this.props.password}
          onChangeText={(password)=>{this.props.loginUpdate({prop: 'password', value: password})}}
          secureTextEntry
          inputStyle={{paddingLeft:10}}
        />

        <View style={{paddingTop: 10, alignItems: 'center'}}>
          <Text style={{color: 'red'}}>{this.props.errMessage}</Text>
        </View>

        {this.renderSigninIn()}

      </View>
    );
  }
}

const mapStateToProps = state => {
  let { email, password, loading, errMessage, user } = state.auth
  return {
    email, password, loading, errMessage, user
  }
}

export default connect(mapStateToProps, actions)(Login);

const styles = StyleSheet.create({
  btns: {
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5
  }
});
