import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert
} from 'react-native';
import { FormLabel, FormInput, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { config } from './../config/config';

import { FlatList, RectButton } from 'react-native-gesture-handler';

import AppleStyleSwipeableRow from './GestureHandler/AppleStyleSwipeableRow';
import GmailStyleSwipeableRow from './GestureHandler/GmailStyleSwipeableRow';

const Row = ({ item }) => (
  <RectButton style={styles.rectButton} onPress={() => {}}>
    <Text style={styles.fromText}>{item.name}</Text>
  </RectButton>
);

const SwipeableRow = ({ item, index }) => {
  return (
    <AppleStyleSwipeableRow>
      <Row item={item} />
    </AppleStyleSwipeableRow>
  );
};

class Categories extends React.Component {

  state = {processing: false, categoryName: ''}

  createCategory = async () => {
    if (this.state.categoryName != '' && this.state.categoryName.trim() != ''){
      this.setState({processing: true})
      await this.props.createCategory(this.props.token, this.props.user._id, this.state.categoryName)
      this.setState({processing: false, categoryName: ''})
      Keyboard.dismiss();
    } else {
      Alert.alert("Error", "Ingresa un nombre para la categoria.")
    }
  }

  _logout = () => {
    this.props.navigation.navigate('login');
  }

  renderCreateCategory = () => {
    if (this.state.processing == false){
      return (
        <Button buttonStyle={styles.btn}
          title="CREAR CATEGORIA"
          onPress={()=>{
              this.createCategory();
            }
          }
        />
      );
    } else {
      return (
        <ActivityIndicator style={{marginTop: 10}} size="small"/>
      );
    }
  }

  render() {
      return (
        <View style={{flex: 1, backgroundColor: '#F6F3DA'}}>
        <View style={styles.headerContainer}>
          <View style={{flex: 1, alignItems: 'flex-start', paddingLeft:9}}>
            <TouchableOpacity onPress={() => {this.props.navigation.goBack(); Keyboard.dismiss()}}>
              <Icon
                iconStyle={{marginTop: 20, opacity: 1}}
                name='chevron-left'
                type='entypo'
                color='#ffffff'
                size={35}
              />
            </TouchableOpacity>
          </View>
        </View>

        <KeyboardAvoidingView behavior="position"
          style={styles.formContainer}
          keyboardVerticalOffset={20}>

          <FormLabel>Crear categoria:</FormLabel>
          <FormInput
            inputStyle={{color:'black'}}
            value={this.state.categoryName}
            onChangeText={(categoryName)=>{this.setState({categoryName})}}
          />

          {this.renderCreateCategory()}
        </KeyboardAvoidingView>

        <FlatList
          style={{flex: 1}}
          data={this.props.categories}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) => <SwipeableRow item={item} index={index} />}
          keyExtractor={(item, index) => index}
        />

        </View>
      );
  }
}



const mapStateToProps = state => {
  return {
    categories: state.auth.user.categories.reverse(),
    user: state.auth.user,
    token: state.auth.token,
    operation: state.operation
  }
}

export default connect(mapStateToProps, actions)(Categories)

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#24BAB6',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {

  },
  headerBtn:{
    backgroundColor: 'transparent'
  },
  btn:{
    backgroundColor: '#58D68D',
    marginTop: 10
  },
  formContainer:{
    marginBottom: 20,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    fontSize: 35,
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  }
});
