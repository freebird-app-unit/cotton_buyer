import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AppState,
  TouchableWithoutFeedback,
  FlatList,
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
import Download from '../assets/Download';
import axios from 'axios';
import api_config from '../Api/api';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from '../helpers/backHandler'

class MyPostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      loading: 'true',
      spinner: false,
      jsonData: {},
      token: '',
      postDate:'',
      attribute_array:{},
    };
    
  }

  componentDidMount() {
    //alert("Hello: " + JSON.stringify(this.props.route.params.data));
    let post_id ;

    if(this.props.route.params.status == 'active') {
      this.getPostDetailsAPI(this.props.route.params.data.id,this.props.route.params.data.type);
    } else {
      if(this.props.route.params.data.type == "notification") {
        this.getPostDetailsAPI(this.props.route.params.data.notification_id,this.props.route.params.data.type);
      } else {
        this.getPostDetailsAPI(this.props.route.params.data.post_id,this.props.route.params.data.type);
      }
      
    }
    handleAndroidBackButton(this.goToDashboard);
  }

  goToDashboard = () => {
    const navigation = this.props.navigation;
    let canGoBack = navigation.canGoBack();
    return canGoBack ? navigation.goBack() : navigation.replace('Dashboard');
  }

  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }

  getPostDetailsAPI = (postId,type) => {
    try {
      
      console.log('PostId is: ' + postId);
      var self = this;
      let data = {post_notification_id: postId,type:type};

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.POST_DETAILS,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('response POST_DETAILS:', JSON.stringify(response.data.data[0].attribute_array));
          if (response.data.status == 200) {
            self.setState({
              attribute_array: response.data.data[0].attribute_array,
              spinner: false,
              postDate: response.data.data[0].date
            });
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          self.setState({
            spinner: false,
            message: 'Something bad happened ' + error,
          }),
          alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
    }
  };


      _keyExtractor (item, index) {
    return index.toString();
  }

   _renderItem ({ item, index }) {
    return (<View style={{flexDirection:'row',width:80}}><View style={{flex:1}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            textAlign:'center',
                            textAlignVertical:'center',textTransform: 'uppercase'}}>{item.attribute}</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            fontWeight:'bold',
                            textAlign:'center',
                            textAlignVertical:'center'}}>{item.attribute_value}</Text>

                  </View>

                  <View style={vLineMyPostStyle}></View>

                  </View>

                  );
  }

  createNotificationListUI = (notificationArray) => {
    
    return notificationArray.map((el, i) => (
      <View style={{flex:1,marginLeft:'5%',marginRight:'5%',height:30,marginTop:10,height:'auto'}}>
              <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:14,
                            
                            textAlignVertical:'center'}}>{el.name}</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:14,
                            opacity:.5,
                            textAlignVertical:'center'}}>{el.city}</Text>
              </View>
    ));
  }


  render() {
    const jsonDashboard = this.state.jsonData;
   

    return (
   
         





 <ScrollView>
          <Spinner
            visible={this.state.spinner}
            color="#085cab" />

                    <View style={{marginTop:20}}>



           <View style={{width:'100%'}}>

              <View style={{flexDirection: 'row',marginLeft:'5%',marginRight:'5%',height:40,alignItems:'center'}}>
                    
                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.primary,
                            fontSize:16,
                            fontWeight:'bold',
                            textAlignVertical:'center'}}>{this.props.route.params.data.product_name}</Text>



                        
              </View>

              <View style={{flexDirection: 'row',marginLeft:'5%',marginTop:10,marginRight:'5%',height:40}}>


                   <FlatList style={{ flex: 1 }}
                        data={this.state.attribute_array}
                        keyExtractor={this._keyExtractor.bind(this)}
                        renderItem={this._renderItem.bind(this)}
                        horizontal={true}
                      />


                {/*   <View style={{flex:1}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            textAlign:'center',
                            textAlignVertical:'center'}}>UHML(mm)</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            fontWeight:'bold',
                            textAlign:'center',
                            textAlignVertical:'center'}}>28.7</Text>

                  </View>

                  <View style={vLineMyPostStyle}></View>

                  <View style={{flex:1}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            textAlign:'center',
                            textAlignVertical:'center'}}>MIC(mm)</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            fontWeight:'bold',
                            textAlign:'center',
                            textAlignVertical:'center'}}>100-200</Text>

                  </View>

                  <View style={vLineMyPostStyle}></View>

                  <View style={{flex:1}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            textAlign:'center',
                            textAlignVertical:'center'}}>RD(mm)</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            fontWeight:'bold',
                            textAlign:'center',
                            textAlignVertical:'center'}}>28.5</Text>

                  </View>

                  <View style={vLineMyPostStyle}></View>

                   <View style={{flex:1}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:12,
                            textAlign:'center',
                            textAlignVertical:'center'}}>CG(mm)</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            fontWeight:'bold',
                            textAlign:'center',
                            textAlignVertical:'center'}}>30.0</Text>

                  </View>

                  <View style={vLineMyPostStyle}></View>

                  <View style={{flex:1}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            textAlign:'center',
                            textAlignVertical:'center'}}>SFI(mm)</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            fontWeight:'bold',
                            textAlign:'center',
                            textAlignVertical:'center'}}>31.2</Text>

                  </View> */}

                    
                  
              </View>


              
              


          
          </View>





         

              <View style={{flex:1,marginLeft:'5%',marginRight:'5%',height:'auto',marginTop:20}}>
                    
                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:16,
                            fontWeight:'bold',
                            textAlignVertical:'center'}}>Bales/ Price</Text>

              </View>

   




           <View style={{flex:1,marginLeft:'5%',marginRight:'5%',height:'auto'}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:12,
                            opacity:.5,
                            textAlignVertical:'center'}}>Post Bales</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:12,
                            textAlignVertical:'center'}}>{this.props.route.params.data.no_of_bales}</Text>

                  </View>

                   

 

                   

           <View style={{flex:1,marginLeft:'5%',marginTop:10,marginRight:'5%',height:40}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:12,
                            opacity:.5,
                            textAlignVertical:'center'}}>Post Price</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:12,
                            textAlignVertical:'center'}}>₹ {this.props.route.params.data.price}</Text>

                  </View>


              <View style={{flex:1,marginLeft:'5%',marginRight:'5%',height:30,marginTop:10,height:'auto'}}>
                    
                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:16,
                            fontWeight:'bold',
                            textAlignVertical:'center'}}>Post</Text>

              </View>

           <View style={{flexDirection: 'row', width: '100%'}}>
           <View
                    style={{
                      flex: 1,
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 40,
                    }}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:12,
                            opacity:.5,
                            textAlignVertical:'center'}}>Post at</Text>

                    {this.props.route.params.status == "completed" ? (<Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:12,
                            textAlignVertical:'center'}}>{this.props.route.params.data.created_at}</Text>) : (<Text numberOfLines={1} 
                              ellipsizeMode='tail' 
                              style={{flex: 1,
                                color:theme.colors.textColor,
                                fontSize:12,
                                textAlignVertical:'center'}}>{this.state.postDate}</Text>)}
                    </View>
                    <View
                    style={{
                      flex: 1,
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 40,
                    }}>
                    {this.props.route.params.status != "active" ? <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.textColor,
                        fontSize: 12,
                        opacity: 0.5,
                        textAlignVertical: 'center',
                        fontFamily:'Poppins-Medium'
                      }}>
                      {this.props.route.params.status == "completed" ? 'Update at' : 'Cancel at'}
                    </Text>: null} 

                    {this.props.route.params.status == "completed" ? (<Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:12,
                            textAlignVertical:'center'}}>{this.props.route.params.data.updated_at}</Text>) : (<Text numberOfLines={1} 
                              ellipsizeMode='tail' 
                              style={{flex: 1,
                                color:theme.colors.textColor,
                                fontSize:12,
                                textAlignVertical:'center'}}>{this.props.route.params.data.updated_at}</Text>)}
                  </View>
                  </View>
                  

 
                  {this.props.route.params.data.type == 'notification' && (<View style={{flex:1,marginLeft:'5%',marginRight:'5%',height:30,marginTop:10,height:'auto'}}>
                    
                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:16,
                            fontWeight:'bold',
                            textAlignVertical:'center'}}>Notification to Seller</Text>

                  </View>) }
                  {this.props.route.params.data.type == 'notification' ? 
                  
                   this.createNotificationListUI(this.props.route.params.data.seller_array) : null}

                    </View>
              </ScrollView>
            
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

export default MyPostDetails;
