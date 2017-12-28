import React from 'react';
import { Text, View, Image, ActivityIndicator, Keyboard, Alert, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button} from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { config } from './../config/config';

class Login extends React.Component {

  state = {
    email: 'jvr42@hotmail.com',
    password: 'admin',
    errMessage: '',
    loading: false,
    signinIn: false
  }

  _login = async () => {

    if (this.state.email == '' || this.state.email.trim() == '' || this.state.password == '')
    {
      Alert.alert('Error','Ingresa tus datos para continuar.');
      return;
    }

    this.setState({signinIn: true, errMessage: ''})

    let data = {
      email: this.state.email,
      password: this.state.password
    }

    let result = await this.props.Login(data);

    if (!result){

      this.setState({
        signinIn: false,
        errMessage: this.props.errMessage,
        password: ''
      })

    } else {

      this.setState({
        email: '',
        password: '',
        errMessage: '',
        loading: false,
        signinIn: false
      })

      Keyboard.dismiss()

      this.props.navigation.navigate('app');
    }

  }

  renderSigninIn(){
    if (this.state.signinIn == false){
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
    if (this.state.loading == true){
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large"/>
        </View>
      )
    }
     return (
      <View style={{ flex: 1, paddingTop:80, backgroundColor: '#F6F3DA'}}>

        <View style={{marginBottom: 20, alignItems: 'center'}}>
        <Image style={{height: 150, width: 150, alignItems: 'center'}}
          source={require('./../assets/logo.png')}/>
        </View>

        <FormLabel>Correo Electrónico:</FormLabel>
        <FormInput
          value={this.state.email}
          onChangeText={(email)=>{this.setState({email})}}
          inputStyle={{paddingLeft:10}}/>

        <FormLabel>Contraseña:</FormLabel>
        <FormInput
          value={this.state.password}
          onChangeText={(password)=>{this.setState({password})}}
          secureTextEntry
          inputStyle={{paddingLeft:10}}
        />

        <View style={{paddingTop: 10, alignItems: 'center'}}>
          <Text style={{color: 'red'}}>{this.state.errMessage}</Text>
        </View>

        {this.renderSigninIn()}

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    errMessage: state.auth.errMessage,
    token: state.auth.token
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
