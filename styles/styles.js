import { StyleSheet, Platform } from 'react-native';

const header = ''
if (Platform.OS === 'android'){
  header = {
    marginTop: 22,
    height: 50,
    backgroundColor: '#F6F6F6',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.3
  }
}
else{
  header = {
    height: 50,
    backgroundColor: '#F6F6F6',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.3
  }  
}

export default styles = StyleSheet.create({
  verMovimientosContainer:{
    marginTop: 50,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#C4C4C4'
   },
  categoryContainer:{
    margin:15,
    alignItems:'center',
    justifyContent:'center'
  },
  operationContainer:{
    margin:15,
    alignItems:'center',
    justifyContent:'center'   
  },
  categoryText:{
    fontSize: 60,
    color: 'black'
  },
  ingresarText:{
    fontSize: 30,
    color: 'white'
  },
  ingresarBtnContainer:{
    padding: 10,
    height: 60,
    marginLeft:10,
    marginRight: 10,
    backgroundColor: 'green',
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.3,
  },
  categoryTextStyle:{
    fontSize: 30
  },
  categoryStyle:{
    alignItems: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.3,
    padding: 20,
    margin:5
  },
  categoriesListStyle:{
    flex:1
  },
  operationText:{
    fontSize: 30
  },
  operationTextContainer:{
    padding: 25,
    alignItems: 'center' 
  },
  categoriaTextInputContainer:{
    padding: 10
  },
  categoriaTextInput:{
    backgroundColor: '#ffffff',
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft:20,
    fontSize: 30,
    marginBottom: 5
  },
  questionText:{
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  operations:{
    paddingTop: 30,
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around' 
  },
  plusBtn:{
    width: 150, 
    height: 150,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.3
  },
  header,
  headerText:{
    fontSize: 20,
    color: '#000000'
  },
  container: {
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    paddingTop: 10,
    fontSize: 29,
    fontWeight: 'bold',
    color: '#ffffff' 
  }
});