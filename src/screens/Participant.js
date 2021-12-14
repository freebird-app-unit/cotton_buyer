import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AppState,
  TouchableWithoutFeedback
} from 'react-native';
import { baseUrl } from '../components/Global';
import { fontSizeMyPostCenterText } from '../components/Global';
import { vLineMyPostStyle } from '../components/Global';
import Background from '../components/Background';
import Header from '../components/Header';
import {Card} from 'react-native-elements';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Appbar,Searchbar,Button,Badge} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {theme} from '../core/theme';
import TextInput from '../components/TextInput';

//svgs
import Home from '../assets/Home';
import Employee from '../assets/Employee';
import EmployeeGray from '../assets/EmployeeGray';
import CustomerIcon from '../assets/CustomerIcon';
import FilterSettings from '../assets/FilterSettings';
import ParticipantCall from '../assets/ParticipantCall';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from '../helpers/backHandler'

class Participant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      loading: 'true',
      spinner: false,
      jsonData: {},
      token: '',
      openState: false,
      value: null,
      items: [{label: 'Maharashtra', value: '1'}, {label: 'Rajasthan', value: '2'}, {label: 'Punjab', value: '3'}, {label: 'Karnatak', value: '4'},],
    };

    // this.setValue = this.setValue.bind(this);
    // this.setOpenState = this.setOpenState.bind(this);
    // this.setItemsState = this.setItemsState.bind(this);
    
  }

  componentDidMount() {
    handleAndroidBackButton(this.goToDashboard);
  }

  goToDashboard = () => {
    const navigation = this.props.navigation;
    let canGoBack = navigation.canGoBack();
    return canGoBack ? navigation.goBack() : navigation.replace(this.props.route.params.prevScrName);
  }

  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }

  setOpenState(openState) {
    this.setState({
      openState
    });
  }

  setValue(callback) {
    this.setState(state => ({
      value: callback(state.value)
    }));
  }

  setItemsState(callback) {
    this.setState(state => ({
      items: callback(state.items)
    }));
  }

  


  onClickMakeDeal=()=>{


  }

  onClickNegotiate=()=>{

    
  }



  render() {
    const jsonDashboard = this.state.jsonData;
   

    return (
      <Background>
        
        <View
          style={{
            flex: 1,
            width: '100%',
            height:'100%',
            position: 'relative',
            marginTop: -40,
            backgroundColor:'white'
          }}>

          <Spinner
            visible={this.state.spinner}
            color="#085cab" />

              {/* <View style={{width: '100%',height:55, marginTop: 40}}>
                <Appbar.Header style={{backgroundColor: 'transparent'}} >
                    <Appbar.BackAction color='black' onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content
                      style={{alignItems: 'center'}}
                      color="black"
                      title="Participant"
                      titleStyle={{fontSize:20,fontWeight:'bold'}}
                    />
                    <Appbar.Action icon={() => <Icon name="ios-information-circle-outline" size={0} color="black" />} color="black" onPress={() => {

                      

                    }} />
                  </Appbar.Header>
              </View> */}




 <View style={{width: '100%',paddingBottom:30, marginTop:10,backgroundColor: 'white',borderTopLeftRadius:20,borderTopRightRadius:20}}>
              <ScrollView>
                    <View style={{marginTop:20}}>



            <View style={{flexDirection:'row',marginLeft:'5%',marginRight:'5%',marginTop:15}}>

                    <View style={{flex:1}}>
                                <Text style={{color:theme.colors.textColor,fontSize:14,opacity:.5}}>Me</Text>
                                <Text style={{color:theme.colors.textColor,fontSize:14}}>John Deo</Text>
                    </View>

                    

            </View>


         <View style={{flexDirection:'row',marginLeft:'5%',marginRight:'5%',marginTop:15,}}>

                    <View style={{flex:1}}>
                                <Text style={{color:theme.colors.textColor,fontSize:14}}>Broker Name</Text>
                                <Text style={{color:theme.colors.textColor,fontSize:14}}>Maria Smith</Text>
                    </View>

                    <View style={{flex:1}}>
                            <TouchableOpacity onPress={() => alert('calling') }>
                                  <ParticipantCall  style={{width:30,height:30,alignSelf:'flex-end'}} />
                            </TouchableOpacity>
                    </View>

            </View>


           <View style={{flexDirection:'row',marginLeft:'5%',marginRight:'5%',marginTop:15}}>

                    <View style={{flex:1}}>
                                <Text style={{color:theme.colors.textColor,fontSize:14}}>Seller Name</Text>
                                <Text style={{color:theme.colors.textColor,fontSize:14}}>Martin Parker</Text>
                    </View>

                    <View style={{flex:1}}>
                             <TouchableOpacity onPress={() => alert('calling') }>
                                  <ParticipantCall  style={{width:30,height:30,alignSelf:'flex-end'}} />
                            </TouchableOpacity>
                    </View>

            </View>


                <View style={{flexDirection:'row',marginLeft:'5%',marginRight:'5%',marginTop:15}}>

                    <View style={{flex:1}}>
                                <Text style={{color:theme.colors.textColor,fontSize:14}}>Broker Name</Text>
                                <Text style={{color:theme.colors.textColor,fontSize:14}}>John Smith</Text>
                    </View>

                    <View style={{flex:1}}>
                             <TouchableOpacity onPress={() => alert('calling') }>
                                  <ParticipantCall  style={{width:30,height:30,alignSelf:'flex-end'}} />
                            </TouchableOpacity>
                    </View>

            </View>





                    </View>
              </ScrollView>





                  






              </View>
















              </View>

      </Background>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    top:0
  },
  container2:{
    marginTop:'2%',
    width:'90%',
    height:'86%',
    marginLeft:'5%',
    marginRight:'5%',
    backgroundColor: 'white',
    borderColor:'white',
    borderWidth: 1,
    borderRadius:20,
    alignItems:'flex-start',
  },
   btnActiveContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    borderBottomWidth :2,
    borderBottomColor: theme.colors.primary
  },
  btnCompletedContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    borderBottomWidth :1,
    borderBottomColor:'gray',
    opacity:.5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    borderBottomWidth :2,
    borderBottomColor: '#57a3f5',
    marginLeft:1,
  },
  buttonContainer2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    marginLeft:1,
    marginRight:1,
    opacity:.4
  },
  spinnerTextStyle: {
    color: '#000',
  },
  module_parent_view: {
    width: '100%',
  },
  module_label_header: {
    fontWeight: 'bold',
    fontSize: 20,
    justifyContent: 'center',
    color: '#2DA3FC',
  },
  module_card2: {
    height: 70,
    width:'90%',
    position:'absolute',
    backgroundColor: 'white',
    borderRadius: 35,
    borderColor: '#57a3f5',
    borderWidth:1,
    elevation: 5,
    alignItems:'center',
    alignSelf:'center',
    top:80
  },
  allbid:{
    flexDirection: 'row',
    marginLeft:'5%',
    marginTop:'5%'
  },
  bidedItem:{
      height: 120,
      width:'90%',
      backgroundColor: 'white',
      borderRadius: 0,
      borderColor: '#57a3f5',
      borderWidth:1,
      elevation: 5,
      marginLeft:'5%',
      marginTop:15,
      flexDirection: 'row',
  },
  bidedProduct:{
    width:'60%',
    height:'85%',
    marginLeft:'2%',
    marginTop:'3%',
    alignItems:'flex-start',
    
  },
  bidedQuantity:{
    width:'35%',
    height:'85%',
    marginTop:'3%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center'
  },

  titleText:{
    flex: 1,
    color:'#2DA3FC',
    fontWeight:'bold'
  },
  allbidValue:{
    flexDirection: 'row',
    marginLeft:'5%',
    marginTop:'1%'
  },
   titleTextValue:{
    flex: 1,
    color:'#2DA3FC',
    fontSize:12
  },
  scrollViewStyle: {
    width: '100%',
    flex: 1,
    backgroundColor:'white'
  },
    dealTopMainContainer: {
    flexDirection: 'row',
    top:0,
    marginLeft:'5%',
    marginRight:'5%'
  },

  dealBtnEnable: {
    flex: 1,
    width:'100%',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#69BA53',
    marginLeft:0,
    marginRight:5,
    marginTop:10,
    borderRadius:5,
  },
    dealBtnDisable: {
    flex: 1,
    width:'100%',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#F0F5F9',
    marginLeft:5,
    marginRight:0,
    marginTop:10,
    borderRadius:5,
  },
  dealTopBoxTextView:{
    height:40,
    width:'100%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    color:'white'
  },
  dealTopBoxTextViewDisable:{
    height:40,
    width:'100%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    color:'#343434'
  },

});

export default Participant;
