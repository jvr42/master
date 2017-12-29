import React from 'react';
import { Text, View, Image, ActivityIndicator, Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, Alert } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { Camera, Permissions } from 'expo';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { config } from './../config/config';

class SignUp extends React.Component {

  _createAccount = async () => {
    if (this.props.password == this.props.password2){
      let userInfo = {
        name: this.props.name,
        lastname: this.props.lastname,
        email: this.props.email,
        password: this.props.password
      }
      let result = await this.props.SignUp(userInfo)
      if (result){
        this.props.navigation.navigate('main')
      }
    } else {
      Alert.alert("Error", "Las contraseñas no coinciden")
    }
  }

  renderSignupBtns = () => {
    if (this.props.loading == false){
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around' }}>
          <View>
            <Button
              large
              title='CANCELAR'
              buttonStyle={[styles.btns,{backgroundColor: '#EB330E'}]}
              onPress={() => {this.props.navigation.goBack()}}
            />
          </View>
          <View>
            <Button
              large
              title='CREAR'
              buttonStyle={[styles.btns,,{backgroundColor: 'green'}]}
              onPress={() => {this._createAccount()}}
            />
          </View>
        </View>
      );
    } else {
      return (<ActivityIndicator size="large" color="black" />);
    }
  }

  static keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

  render() {
     return (
      <View style={{ flex:1, backgroundColor: '#F6F3DA' }}>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={this.keyboardVerticalOffset}>
        <View style={{marginTop: 50, marginBottom: 20, alignItems: 'center'}}>
          <Text style={{fontSize: 40}}>Crea una cuenta</Text>
        </View>
          <FormLabel>Nombre:</FormLabel>
          <FormInput
            value={this.props.name}
            onChangeText={(name)=>{this.props.signupUpdate({prop: 'name', value: name })}}
            inputStyle={{paddingLeft:10}}/>

          <FormLabel>Apellido:</FormLabel>
          <FormInput
            value={this.props.lastname}
            onChangeText={(lastname)=>{this.props.signupUpdate({prop: 'lastname', value: lastname})}}
            inputStyle={{paddingLeft:10}}/>

          <FormLabel>Correo Electrónico:</FormLabel>
          <FormInput
            value={this.props.email}
            onChangeText={(email)=>{this.props.signupUpdate({prop: 'email', value: email})}}
            inputStyle={{paddingLeft:10}}/>

          <FormLabel>Contraseña:</FormLabel>
          <FormInput
            value={this.props.password}
            onChangeText={(password)=>{this.props.signupUpdate({prop: 'password', value: password})}}
            secureTextEntry
            inputStyle={{paddingLeft:10}}
          />

          <FormLabel>Confirmar contraseña:</FormLabel>
          <FormInput
            value={this.props.password2}
            onChangeText={(password2)=>{this.props.signupUpdate({prop: 'password2', value: password2})}}
            secureTextEntry
            inputStyle={{paddingLeft:10}}
          />
        </KeyboardAvoidingView>
        <View style={{paddingTop: 10}}>
          <Text style={{color: 'red'}}>{this.props.errMessage}</Text>
        </View>

        {this.renderSignupBtns()}

      </View>
    );
  }
}

const mapStateToProps = state => {
  let { name, lastname, email, password, password2, loading, errMessage } = state.signup
  return {
    name, lastname, email, password, password2, loading, errMessage
  }
}

export default connect(mapStateToProps, actions)(SignUp);

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
