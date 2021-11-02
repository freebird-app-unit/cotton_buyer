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
import {baseUrl} from '../components/Global';
import {fontSizeMyPostCenterText} from '../components/Global';
import {vLineMyPostStyle} from '../components/Global';
import Background from '../components/Background';
import Header from '../components/Header';
import {Card} from 'react-native-elements';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Appbar, Searchbar, Button, Badge} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {theme} from '../core/theme';
import TextInput from '../components/TextInput';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import api_config from '../Api/api';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../helpers/backHandler';

//svgs
import Home from '../assets/Home';
import Employee from '../assets/Employee';
import EmployeeGray from '../assets/EmployeeGray';
import CustomerIcon from '../assets/CustomerIcon';
import FilterSettings from '../assets/FilterSettings';
import defaultMessages from '../helpers/defaultMessages';

class NegotiateDetails extends Component {
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
      items: [
        {label: 'Maharashtra', value: '1'},
        {label: 'Rajasthan', value: '2'},
        {label: 'Punjab', value: '3'},
        {label: 'Karnatak', value: '4'},
      ],
      dealDetails: {},
      negoList: [],
    };
  }

  componentDidMount() {
    console.log(
      'Bhavin Thakkar: ' + JSON.stringify(this.props.route.params.data),
    );
    let post_data;
    let post_notification_id;
    let post_notification_type;
    let seller_id;

    if (this.props.route.params.cameFrom == 'Dashboard') {
      if (this.props.route.params.data.negotiation_type == 'post') {
        post_data = this.props.route.params.data.post_detail;
        post_notification_id = this.props.route.params.data.post_id;
        post_notification_type = this.props.route.params.data.negotiation_type;
      } else {
        post_data = this.props.route.params.data.notification_detail;
        post_notification_id = this.props.route.params.data.notification_id;
        post_notification_type = this.props.route.params.data.negotiation_type;
      }
      seller_id = post_data[0].seller_id;
    } else if (this.props.route.params.cameFrom == 'MultiNego') {
      post_notification_id = this.props.route.params.post_id;
      post_notification_type = this.props.route.params.type;
      seller_id = this.props.route.params.sellerId;
    }

    this.getPostDetailsAPI(post_notification_id, post_notification_type);
    this.getNegotitionDetailsAPI(post_notification_id, seller_id);
    handleAndroidBackButton(this.goToDashboard);
  }

  goToDashboard = () => {
    const navigation = this.props.navigation;
    let canGoBack = navigation.canGoBack();
    return canGoBack
      ? navigation.goBack()
      : navigation.replace(this.props.route.params.prevScrName);
  };

  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }

  getNegotitionDetailsAPI = async (postId, sellerId) => {
    try {
      var buyerId = await EncryptedStorage.getItem('user_id');
      var self = this;
      let data = {
        seller_id: sellerId,
        buyer_id: buyerId,
        post_notification_id: postId,
      };
      console.log('Nego details Bhavin ====>>>>>>: ' + JSON.stringify(data));
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.NEGOTIATION_DETAIL_OLD,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('response Negotiation_DETAILS:', response.data);
          if (response.data.status == 200) {
            self.setState({
              negoList: response.data.data,
              spinner: false,
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

  getPostDetailsAPI = (postId, type) => {
    try {
      console.log('PostId is: ' + postId);
      var self = this;
      let data = {post_notification_id: postId, type: type};

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
          console.log('response POST_DETAILS:', response.data);
          if (response.data.status == 200) {
            self.setState({
              dealDetails: response.data.data[0],
              spinner: false,
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

  setOpenState(openState) {
    this.setState({
      openState,
    });
  }

  setValue(callback) {
    this.setState(state => ({
      value: callback(state.value),
    }));
  }

  setItemsState(callback) {
    this.setState(state => ({
      items: callback(state.items),
    }));
  }

  makeDealApply = async () => {
    try {
      var self = this;
      let data = {
        seller_id: await EncryptedStorage.getItem('user_id'),
        buyer_id: self.props.route.params.data.buyer_id,
        post_notification_id: self.props.route.params.data.post_notification_id,
        no_of_bales: this.state.displayBalesCount,
        type: self.props.route.params.type,
        done_by: 'buyer',
      };
      console.log('make deal params--->' + JSON.stringify(data));

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.MAKE_DEAL,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('make deal response :', response.data);
          self.setState({spinner: false});
          if (response.data.status == 200) {
            alert(response.data.message);
            self.props.navigation.reset({
              isDashboard: true,
              routes: [{name: 'Dashboard'}],
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

  onClickMakeDeal = () => {
    this.makeDealApply();
    // this.props.navigation.navigate('MakeDealDetails')
  };

  _keyExtractor(item, index) {
    return index.toString();
  }

  _renderItem({item, index}) {
    return (
      <View style={{flexDirection: 'row', width: 80}}>
        <View style={{flex: 1}}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              flex: 1,
              color: theme.colors.textColor,
              fontSize: fontSizeMyPostCenterText,
              textAlign: 'center',
              textAlignVertical: 'center',
              textTransform: 'uppercase',
            }}>
            {item.attribute}
          </Text>

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              flex: 1,
              color: theme.colors.textColor,
              fontSize: fontSizeMyPostCenterText,
              fontWeight: 'bold',
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            {item.attribute_value}
          </Text>
        </View>

        <View style={vLineMyPostStyle}></View>
      </View>
    );
  }

  crateProductAttributeUI = () => {
    return this.state.negoList.map((ell, i) => (
      <View>
        {ell.negotiation_by === 'buyer' && (
          <View style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
            <Text
              style={{
                color: theme.colors.textColor,
                width: '100%',
                textAlign: 'right',
                fontWeight: 'bold',
                fontSize: 14,
              }}>
              ({ell.buyer_name})ME
            </Text>
            <Text
              style={{
                color: theme.colors.textColor,
                width: '100%',
                textAlign: 'right',
                fontWeight: 'bold',
                fontSize: 14,
              }}>
              ₹ {ell.current_price} ({ell.current_no_of_bales})
            </Text>
          </View>
        )}

        {ell.negotiation_by === 'seller' && (
          <View style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
            <Text
              style={{
                color: theme.colors.textColor,
                width: '100%',
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 14,
              }}>
              {ell.seller_name}
            </Text>
            <Text
              style={{
                color: theme.colors.textColor,
                width: '100%',
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 14,
              }}>
              ₹ {ell.current_price} ({ell.current_no_of_bales})
            </Text>
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            marginLeft: '5%',
            marginRight: '5%',
            marginTop: 15,
          }}>
          <View style={{flex: 1}}>
            <Text style={{color: theme.colors.textColor, opacity: 0.5}}>
              Payment Condition
            </Text>
            <Text style={{color: theme.colors.textColor}}>
              {ell.payment_condition}
            </Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={{color: theme.colors.textColor, opacity: 0.5}}>
              Header
            </Text>
            <Text style={{color: theme.colors.textColor}}>{ell.header}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginLeft: '5%',
            marginRight: '5%',
            marginTop: 15,
          }}>
          <View style={{flex: 1}}>
            <Text style={{color: theme.colors.textColor, opacity: 0.5}}>
              Transmit Condition
            </Text>
            <Text style={{color: theme.colors.textColor}}>
              {ell.transmit_condition}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: theme.colors.textColor,
                opacity: 0.5,
                fontFamily: 'Poppins-Medium',
              }}>
              Lab
            </Text>
            <Text
              style={{
                color: theme.colors.textColor,
                fontFamily: 'Poppins-Regular',
              }}>
              {ell.lab}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginLeft: '5%',
            marginRight: '5%',
            marginTop: 15,
          }}>
          <View style={{flex: 1}}>
            <Text style={{color: theme.colors.textColor, opacity: 0.5}}>
              Broker Name
            </Text>
            <Text style={{color: theme.colors.textColor}}>
              {ell.broker_name}
            </Text>
          </View>
        </View>

        {ell.notes != '' && (
          <View
            style={{
              flexDirection: 'row',
              marginLeft: '5%',
              marginRight: '5%',
              marginTop: 15,
            }}>
            <View style={{flex: 1}}>
              <Text style={{color: theme.colors.textColor, opacity: 0.5}}>
                Notes
              </Text>
              <Text style={{color: theme.colors.textColor}}>{ell.notes}</Text>
            </View>
          </View>
        )}

        <View
          style={{
            width: '90%',
            left: '5%',
            height: 1,
            marginTop: 10,
            backgroundColor: '#D1D1D1',
          }}></View>
      </View>
    ));
  };

  render() {
    const jsonDashboard = this.state.jsonData;

    var myData = this.state.dealDetails;

    return (
      <Background>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            position: 'relative',
            // marginTop: -40,
            backgroundColor: 'white',
          }}>
          <Spinner visible={this.state.spinner} color="#085cab" />

          

          <View
            style={{
              width: '100%',
              paddingBottom: 30,
              // marginTop: 10,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <ScrollView>
              <View >
                <View
                  style={{
                    width: '100%',
                    backgroundColor: '#F0F5F9',
                    paddingBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '5%',
                      marginRight: '5%',
                      height: 40,
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.blackBG,
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlignVertical: 'center',
                      }}>
                      {myData.product_name}
                    </Text>

                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        width: '50%',
                        height: '100%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'right',
                        alignItems: 'center',
                        color: theme.colors.blackBG,
                        textAlignVertical: 'center',
                      }}>
                      ₹ {myData.price} ({myData.no_of_bales})
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 40,
                    }}>
                    <FlatList
                      style={{flex: 1}}
                      data={myData.attribute_array}
                      keyExtractor={this._keyExtractor.bind(this)}
                      renderItem={this._renderItem.bind(this)}
                      horizontal={true}
                    />
                  </View>
                </View>

                {this.crateProductAttributeUI()}
              </View>
            </ScrollView>

            <View style={{flexDirection: 'row', marginLeft: '5%'}}>
              {/* <View style={{flex:1}}>
                         <Button mode="contained" 
                                        uppercase={false} 
                                        contentStyle={{ height: 50 }} 
                                        style={{ width:'95%', }}  
                                        labelStyle={{fontSize:16,color:'white'}}  
                                        onPress={() => this.onClickMakeDeal()}>
                                    Make Deal
                                  </Button>
                        </View> */}
            </View>
          </View>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    top: 0,
  },
  container2: {
    marginTop: '2%',
    width: '90%',
    height: '86%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'flex-start',
  },
  btnActiveContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  btnCompletedContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    opacity: 0.5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#57a3f5',
    marginLeft: 1,
  },
  buttonContainer2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 1,
    marginRight: 1,
    opacity: 0.4,
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
    width: '90%',
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 35,
    borderColor: '#57a3f5',
    borderWidth: 1,
    elevation: 5,
    alignItems: 'center',
    alignSelf: 'center',
    top: 80,
  },
  allbid: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginTop: '5%',
  },
  bidedItem: {
    height: 120,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 0,
    borderColor: '#57a3f5',
    borderWidth: 1,
    elevation: 5,
    marginLeft: '5%',
    marginTop: 15,
    flexDirection: 'row',
  },
  bidedProduct: {
    width: '60%',
    height: '85%',
    marginLeft: '2%',
    marginTop: '3%',
    alignItems: 'flex-start',
  },
  bidedQuantity: {
    width: '35%',
    height: '85%',
    marginTop: '3%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },

  titleText: {
    flex: 1,
    color: '#2DA3FC',
    fontWeight: 'bold',
  },
  allbidValue: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginTop: '1%',
  },
  titleTextValue: {
    flex: 1,
    color: '#2DA3FC',
    fontSize: 12,
  },
  scrollViewStyle: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  dealTopMainContainer: {
    flexDirection: 'row',
    top: 0,
    marginLeft: '5%',
    marginRight: '5%',
  },

  dealBtnEnable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#69BA53',
    marginLeft: 0,
    marginRight: 5,
    marginTop: 10,
    borderRadius: 5,
  },
  dealBtnDisable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F5F9',
    marginLeft: 5,
    marginRight: 0,
    marginTop: 10,
    borderRadius: 5,
  },
  dealTopBoxTextView: {
    height: 40,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
  dealTopBoxTextViewDisable: {
    height: 40,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    color: '#343434',
  },
});

export default NegotiateDetails;
