import React from 'react';
import { Text, View, Image, ActivityIndicator, Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { Camera, Permissions } from 'expo';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { config } from './../config/config';

class SignUp extends React.Component {

  state = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
    errMessage: '',
    loading: false,
    signingUp: false
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _createAccount = async () => {
    if (this.state.password === this.state.password2){

      this.setState({password: this.state.password})

      let data = {
        name: this.state.name,
        lastname: this.state.lastname,
        email: this.state.email,
        password : this.state.password
      }

      let result = await this.props.SignUp(data);

      if (!result){

        this.setState({
          signingUp: false,
          errMessage: this.props.errMessage,
          password: '',
          password2: ''
        })

      } else {

        this.setState({
          email: '',
          name: '',
          lastname: '',
          password: '',
          password2: '',
          errMessage: '',
          loading: false,
          signingUp: false
        })

        Keyboard.dismiss()

        this.props.navigation.navigate('app');
    }
  }
}

  _picture = () => {
    this.props.navigation.navigate('picture')
  }

  static keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

  render() {
    if (this.state.loading == true){
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large"/>
        </View>
      )
    }
     return (
      <View style={{ flex:1, backgroundColor: '#F6F3DA' }}>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={this.keyboardVerticalOffset}>
        <View style={{marginTop: 50, marginBottom: 20, alignItems: 'center'}}>
          <Text style={{fontSize: 40}}>Crea una cuenta</Text>
        </View>
          <FormLabel>Nombre:</FormLabel>
          <FormInput
            value={this.state.name}
            onChangeText={(name)=>{this.setState({name})}}
            inputStyle={{paddingLeft:10}}/>

          <FormLabel>Apellido:</FormLabel>
          <FormInput
            value={this.state.lastname}
            onChangeText={(lastname)=>{this.setState({lastname})}}
            inputStyle={{paddingLeft:10}}/>

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

          <FormLabel>Confirmar contraseña:</FormLabel>
          <FormInput
            value={this.state.password2}
            onChangeText={(password2)=>{this.setState({password2})}}
            secureTextEntry
            inputStyle={{paddingLeft:10}}
          />
        </KeyboardAvoidingView>
        <View style={{paddingTop: 10}}>
          <Text style={{color: 'red'}}>{this.state.errMessage}</Text>
        </View>

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
