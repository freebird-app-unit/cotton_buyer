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
  Platform,
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
import api_config from '../Api/api';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fieldValidator} from '../helpers/fieldValidator';
import defaultMessages from '../helpers/defaultMessages';
import EncryptedStorage from 'react-native-encrypted-storage';
//svgs
import Home from '../assets/Home';
import Employee from '../assets/Employee';
import EmployeeGray from '../assets/EmployeeGray';
import CustomerIcon from '../assets/CustomerIcon';
import FilterSettings from '../assets/FilterSettings';
import PlusRound from '../assets/PlusRound';
import MinusRound from '../assets/MinusRound';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../helpers/backHandler';
import {Paragraph, Dialog, Portal, Provider} from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from '../components/responsive-ratio';

class DealDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      loading: 'true',
      spinner: false,
      jsonData: {},
      token: '',
      dealDetails: {},
      paymentArray: [],
      transmitArray: [],
      labsArray: [],
      headerArray: [],
      brokerArray: [],
      selectedBroker: {},
      dropdownBrokerPlaceholder: '',
      maxbalesCount: 0,
      dropdownPlaceholder: '',
      dropdownHeaderPlaceholder: '',
      balesCount: 100,
      displayBalesCount: 100,
      balesPrice: '',
      balespriceFocus: false,
      balesPriceError: '',
      selectedPaymentCondition: {},
      selectedTransmitCondition: {},
      selectedLab: {},
      seller_id: '',
      post_notification_id: '',
      post_notification_type: '',
      paymentId: 0,
      transmitId: 0,
      labId: 0,
      headerId: 0,
      brokerId: 0,
      post_data: {},
      makeDealBales: 0,
      makeDealsPrice: '',
      extraNotes: {value: '', error: ''},
      sold_bales: 0,
      remain_bales: 0,
      isPopupShow: false,
    };
  }

  componentDidMount() {
    console.log('Hello: ' + JSON.stringify(this.props.route.params.data));

    this.setState({
      spinner: true,
      seller_id: this.props.route.params.data.sellerId,
      post_notification_id: this.props.route.params.data.post_id,
      post_notification_type: this.props.route.params.data.type,
    });

    // if (cameFrom == 'Search') {
    //   this.setState({
    //     buyer_id: this.props.route.params.data.buyerId,
    //     post_notification_id: this.props.route.params.data.post_id
    //   });
    // } else if (cameFrom == 'Negotiation') {
    //   alert(this.props.route.params.data.buyerId)
    //   this.setState({
    //     buyer_id: this.props.route.params.data.buyerId,
    //     post_notification_id: this.props.route.params.data.post_id
    //   });
    // } else if (cameFrom == 'notification') {
    //   this.setState({
    //     buyer_id: this.props.route.params.data.buyerId,
    //     post_notification_id: this.props.route.params.data.post_id
    //   });
    // } else if (cameFrom == 'multipleNego') {
    //   this.setState({
    //     buyer_id: this.props.route.params.data.buyerId,
    //     post_notification_id: this.props.route.params.data.post_id
    //   });
    // }

    this.getNegotiationDetail(this.props.route.params.data.sellerId);
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

  getNegotiationDetail = async sellerId => {
    try {
      var self = this;
      var url = '';
      let data;

      // data = {
      //   seller_id:sellerId,
      //   buyer_id:await EncryptedStorage.getItem('user_id'),
      //   post_notification_id: this.state.post_notification_id,
      //   type: this.state.post_notification_type
      // };
      //console.log("Negotiation Detail: " + JSON.stringify(data));
      const formData = new FormData();
      let dealBalesCount = 0;
      let dealPrice = 0;

      if (this.props.route.params.cameFrom == 'Renegotiation') {
        url =
          api_config.BASE_URL + api_config.NEGOTIATION_DETAIL_BY_DEAL_NEW_V2;
        data = {
          seller_id: sellerId,
          buyer_id: await EncryptedStorage.getItem('user_id'),
          post_notification_id: this.state.post_notification_id,
          deal_id: this.props.route.params.data.deal_id,
        };
      } else {
        url = api_config.BASE_URL + api_config.NEGOTIATION_DETAIL;
        data = {
          seller_id: sellerId,
          buyer_id: await EncryptedStorage.getItem('user_id'),
          post_notification_id: this.state.post_notification_id,
          type: this.state.post_notification_type,
        };
      }
      formData.append('data', JSON.stringify(data));
      console.log("Negotiation Data: " + JSON.stringify(data))
      axios({
        url: url,
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
            self.getPaymentTransmitLabAPI();
            if (response.data.data.current_no_of_bales == '') {
              self.setState({displayBalesCount: 100});
            } else {
              self.setState({
                displayBalesCount: response.data.data.current_no_of_bales,
              });
            }

            if (response.data.data.current_price == '') {
              self.setState({balesPrice: ''});
            } else {
              self.setState({
                balesPrice: response.data.data.current_price.toString(),
              });
            }
            if(response.data.data.current_no_of_bales == "")
            {
              dealBalesCount = response.data.data.post_bales
            } else {
              dealBalesCount = response.data.data.current_no_of_bales
            }
            if(response.data.data.current_price == "")
            {
              dealPrice = response.data.data.post_price
            } else {
              dealPrice = response.data.data.current_price
            }
            
            self.setState({
              dealDetails: response.data.data,
              extraNotes: {value: response.data.data.notes, error: ''},
              post_data: response.data.data,
              makeDealBales: dealBalesCount,
              makeDealsPrice: dealPrice,
              post_notification_type: response.data.data.negotiation_type,
              post_notification_id: response.data.data.post_notification_id,
              maxbalesCount: response.data.data.post_bales,
              remain_bales: response.data.data.remain_bales,
              sold_bales: response.data.data.sold_bales,
            });
          } else {
            alert(response.data.message);
            self.setState({spinner: false});
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

  getPaymentTransmitLabAPI = () => {
    try {
      var self = this;
      axios({
        url: api_config.BASE_URL + api_config.TRANSMIT_PAYMENT_LAB_LIST,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log(
            'response TRANSMIT_PAYMENT_LAB_LIST:',
            JSON.stringify(response.data),
          );

          if (response.data.status == 200) {
            self.getBrokerList();
            self.setState({
              paymentArray: response.data.data[0].payment_condition,
              transmitArray:response.data.data[0].transmit_condition.map(item => {
                delete item.is_dispatch
                return item;
              }),
              labsArray: response.data.data[0].lab_list,
              headerArray: response.data.data[0].header,
              dropdownHeaderPlaceholder: response.data.data[0].header[0].name,
              headerId: response.data.data[0].header[0].id,
              dropdownPlaceholder:
                response.data.data[0].payment_condition[0].name,
              paymentId: response.data.data[0].payment_condition[0].id,
              dropdownPlaceholderTC:
                response.data.data[0].transmit_condition[0].name,
              transmitId: response.data.data[0].transmit_condition[0].id,
              dropdownPlaceholderLC: response.data.data[0].lab_list[0].name,
              labId: response.data.data[0].lab_list[0].id,
              spinner: false,
            });

            if (self.state.post_data.payment_condition != '') {
              self.selectedPaymentConditionData(
                self.state.post_data.payment_condition,
              );
            }
            if (self.state.post_data.transmit_condition != '') {
              self.selectedTransmitCondition(
                self.state.post_data.transmit_condition,
              );
            }
            if (self.state.post_data.lab != '') {
              self.selectedLab(self.state.post_data.lab);
            }
            if (self.state.post_data.header_name != '') {
              self.selectedHeader(self.state.post_data.header_name);
            }
            
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

  getBrokerList = async () => {
    try {
      var self = this;
      let data = {
        buyer_id: await EncryptedStorage.getItem('user_id'),
        seller_id: this.state.seller_id,
        type: 'buyer',
      };
      console.log("request broker list: " + JSON.stringify(data))
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.BROKER_LIST,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('response Broker_list_v1:', response.data);
          if (response.data.status == 200) {
            self.setState({
              brokerArray: response.data.data.map(item => {
                delete item.type 
                return item
              }),
            });

            if (self.state.post_data.broker_name != '') {
              self.selectedBroker(self.state.post_data.broker_name);
            }else{
            self.setState({
              selectedBroker: response.data.data[0],
              brokerId: response.data.data[0].id,
            });
          }
          } else {
            alert(response.data.message);
            self.setState({spinner: false});
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

  makeDealApply = async () => {
    try {
      var self = this;
      this.setState({spinner: true, isPopupShow: false});
      
      let data = {
        seller_id: this.state.seller_id,
        buyer_id: await EncryptedStorage.getItem('user_id'),
        post_notification_id: self.state.post_notification_id,
        no_of_bales: this.state.makeDealBales,
        type: this.state.post_notification_type,
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
          'cache-control':'no-cache'
        },
      })
        .then(function (response) {
          console.log('make deal response :', response.data);
          self.setState({spinner: false});
          if (response.data.status == 200) {
            alert(response.data.message);
            self.props.navigation.navigate('OTPVerification', response.data.data)
            // self.props.navigation.navigate("HomeScreen");
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          self.setState({
            spinner: false,
            message: 'Something bad happened ' + error,
          }),
          console.log('error',JSON.stringify(error))
            alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
    }
  };

  checkValidation = () => {
    try {
      if (!fieldValidator(this.state.balesPrice)) {
        alert(defaultMessages.en.required.replace('{0}', 'price'));
        return false;
      }
      if (this.state.displayBalesCount == 0) {
        alert(defaultMessages.en.required.replace('{0}', 'bales'));
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  onClickMakeDeal = () => {
    this.setState({isPopupShow: true});
    //this.makeDealApply();
  };

  onClickNegotiate = async () => {
    try {
      if (this.checkValidation()) {
        var self = this;
        self.setState({
          spinner: true,
        });

        let data = {
          seller_id: this.state.seller_id,
          buyer_id: await EncryptedStorage.getItem('user_id'),
          post_notification_id: self.state.post_notification_id,
          negotiation_type: this.state.post_notification_type,
          negotiation_by: 'buyer',
          price: this.state.balesPrice,
          no_of_bales: this.state.displayBalesCount,
          payment_condition: this.state.paymentId,
          transmit_condition: this.state.transmitId,
          lab: this.state.labId,
          broker_id: this.state.brokerId,
          header: this.state.headerId,
          notes: this.state.extraNotes.value,
        };

        console.log('Negotiation data: ' + JSON.stringify(data));
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));

        axios({
          url: api_config.BASE_URL + api_config.NEGOTIATION,
          method: 'POST',
          data: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(function (response) {
            console.log('search to sell response :', response);
            if (response.data.status == 200) {
              //REDIRECT TO SEARCH SCREEN
              self.setState({
                spinner: false,
              });

              alert('Negotiation sent successfully.');
              self.props.navigation.navigate("HomeScreen");
            } else if (response.data.status == 404) {
              self.setState({
                spinner: false,
              });
              alert(response.data.message);
            } else {
              self.setState({
                spinner: false,
              });
              alert(response.data.message);
            }
          })
          .catch(function (error) {
            self.setState({
              spinner: false,
            });
            alert(defaultMessages.en.serverNotRespondingMsg);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onClickMinusIcon = () => {
    try {
      if (this.state.displayBalesCount - this.state.balesCount != 0) {
        if (this.state.displayBalesCount > 0) {
          this.state.displayBalesCount =
            this.state.displayBalesCount - this.state.balesCount;
          this.setState({displayBalesCount: this.state.displayBalesCount});
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  onClickPlusIcon = () => {
    try {
      let maxCount = this.state.remain_bales;
      
      if (this.state.displayBalesCount + this.state.balesCount <= maxCount) {
        this.state.displayBalesCount =
          this.state.displayBalesCount + this.state.balesCount;
        this.setState({displayBalesCount: this.state.displayBalesCount});
      }
    } catch (error) {
      console.log(error);
    }
  };

  changePaymentCondition = selectedItem => {
    try {
      console.log('Selected PC--' + selectedItem.name + '-' + selectedItem.id);
      this.setState({paymentId: selectedItem.id});
    } catch (error) {
      console.log(error);
    }
  };

  changeTransmitCondition = selectedItem => {
    try {
      console.log('Selected TC--' + selectedItem.name + '-' + selectedItem.id);
      this.setState({transmitId: selectedItem.id});
    } catch (error) {
      console.log(error);
    }
  };

  changeLabCondition = selectedItem => {
    try {
      console.log('Selected LC--' + selectedItem.name + '-' + selectedItem.id);
      this.setState({labId: selectedItem.id});
    } catch (error) {
      console.log(error);
    }
  };

  changeHeaderCondition = selectedItem => {
    try {
      console.log('Selected HC--' + selectedItem.name + '-' + selectedItem.id);
      this.setState({headerId: selectedItem.id});
    } catch (error) {
      console.log(error);
    }
  };

  changeBroker = selectedItem => {
    try {
      console.log('Selected HC--' + selectedItem.name + '-' + selectedItem.id);
      this.setState({brokerId: selectedItem.id});
    } catch (error) {
      console.log(error);
    }
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

  selectedPaymentConditionData(payCondition) {
    let setDefaultValue = {};
    this.setState({selectedPaymentCondition: {}});

    this.state.paymentArray.map((el, i) => {
      if (payCondition == el.name) {
        setDefaultValue = {id: el.id, name: el.name};
      }
    });
    //alert("Hello: " + setDefaultValue.id)
    this.setState({
      selectedPaymentCondition: setDefaultValue,
      paymentId: setDefaultValue.id,
    });
  }

  selectedTransmitCondition(transMitCondition) {
    let setDefaultValue = {};

    this.state.transmitArray.map((el, i) => {
      if (transMitCondition == el.name) {
        setDefaultValue = {id: el.id, name: el.name};
      }
    });

    this.setState({
      selectedTransmitCondition: setDefaultValue,
      transmitId: setDefaultValue.id,
    });
  }

  selectedLab(labCondition) {
    let setDefaultValue = {};

    this.state.labsArray.map((el, i) => {
      if (labCondition == el.name) {
        setDefaultValue = {id: el.id, name: el.name};
      }
    });

    this.setState({selectedLab: setDefaultValue, labId: setDefaultValue.id});
  }

  selectedBroker(broker) {
    let setDefaultValue = {};

    this.state.brokerArray.map((el, i) => {
      if (broker == el.name) {
        setDefaultValue = {id: el.id, name: el.name};
      }
    });

    this.setState({
      selectedBroker: setDefaultValue,
      brokerId: setDefaultValue.id,
    });
  }

  selectedHeader(header) {
    let setDefaultValue = {};

    this.state.headerArray.map((el, i) => {
      if (header == el.name) {
        setDefaultValue = {id: el.id, name: el.name};
      }
    });

    this.setState({
      selectedHeader: setDefaultValue,
      headerId: setDefaultValue.id,
    });
  }

  render() {
    var myData = this.state.dealDetails;

    return (
      <Background>
        <View
        style={{
          flex: 1,
          width: '100%',
          // height: '100%',
          position: 'relative',
          // marginTop: -40,
          backgroundColor: 'white',
          }}>

          {/* <View style={{width: '100%', height: 30, marginTop: 40}}>
            <Appbar.Header style={{backgroundColor: 'transparent'}}>
              <Appbar.BackAction
                color="black"
                onPress={() => this.props.navigation.goBack()}
              />
              <Appbar.Content
                style={{alignItems: 'center'}}
                color="black"
                title={myData.product_name}
                titleStyle={{fontSize: 20, fontWeight: 'bold'}}
              />
              <Appbar.Action
                icon={() => (
                  <Icon
                    name="ios-information-circle-outline"
                    size={25}
                    color="black"
                  />
                )}
                color="black"
                onPress={() => {
                  this.props.navigation.navigate('Participant', {
                    prevScrName: 'DealDetails',
                  });
                }}
              />
            </Appbar.Header>
          </View> */}

          <View
            style={{
              width: '100%',
              height: '100%',
              paddingBottom: 0,
              marginTop: 10,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <ScrollView>
          <Spinner visible={this.state.spinner} color="#085cab" />

              <View style={{marginTop: 20}}>
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
                      ₹ {myData.post_price} ({this.state.sold_bales}/
                      {myData.post_bales})
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
                <View
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    height: 35,
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                    Negotiation With: {myData.seller_name}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View style={{flex: 1, height: 60}}>
                    <Text
                      style={{
                        marginLeft: 20,
                        width: '35%',
                        color: theme.colors.textColor,
                      }}>
                      Buy bales
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        width: '65%',
                        height: Platform.OS === 'ios' ? undefined : '100%',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity onPress={() => this.onClickMinusIcon()}>
                        <MinusRound
                          source={require('../assets/ic_me_512.png')}
                          style={{
                            width: 30,
                            height: 30,
                            marginLeft: 10,
                            marginRight: 5,
                          }}
                        />
                      </TouchableOpacity>

                      <Text
                        style={{
                          width: '45%',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    height: Platform.OS === 'ios' ? undefined : '100%',
                    color: theme.colors.textColor,
                    fontFamily: 'Poppins-SemiBold',
                        }}>
                        {this.state.displayBalesCount}
                      </Text>

                      <TouchableOpacity onPress={() => this.onClickPlusIcon()}>
                        <PlusRound
                          style={{
                            width: 30,
                            height: 30,
                            marginLeft: 5,
                            marginRight: 10,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{flex: 1, width: '100%', height: 60}}>
                    <Text style={{width: '35%', color: theme.colors.textColor}}>
                      Price
                    </Text>

                    <View
                      style={{
                        width: '90%',
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TextInput
                        style={{
                          width: '100%',
                          height: 46,
                          fontWeight: 'bold',
                          backgroundColor: '#fff',
                        }}
                        label=""
                        autoFocus={this.state.balespriceFocus}
                        returnKeyType="next"
                        onChangeText={text => this.setState({balesPrice: text})}
                        value={this.state.balesPrice.toString()}
                        error={!!this.state.balesPriceError}
                        errorText={this.state.balesPriceError}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        textContentType="none"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: '5%',
                    marginRight: '5%',
                    marginTop: 15,
                  }}>
                  <View style={{flex: 1, marginRight: 5}}>
                    <Text
                      style={{
                        color: theme.colors.textColor,
                        marginBottom: 5,
                        marginTop: 10,
                      }}>
                      Payment Condition
                    </Text>
                    <SelectDropdown
                      data={this.state.paymentArray}
                      onSelect={(selectedItem, i) => {
                        this.setState({selectedPaymentCondition: selectedItem});
                        this.changePaymentCondition(selectedItem);
                      }}
                      defaultValue={this.state.selectedPaymentCondition}
                      buttonStyle={styles.dropdown3BtnStyle}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={styles.dropdown3BtnChildStyle}>
                            <Text style={styles.dropdown3BtnTxt}>
                              {selectedItem
                                ? selectedItem.name
                                : this.state.dropdownPlaceholder}
                            </Text>
                          </View>
                        );
                      }}
                      renderDropdownIcon={() => {
                        return (
                          <FontAwesome
                            name="chevron-down"
                            color={'black'}
                            size={14}
                            style={{marginRight: 20}}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown3DropdownStyle}
                      rowStyle={styles.dropdown3RowStyle}
                      renderCustomizedRowChild={(item, index) => {
                        return (
                          <View style={styles.dropdown3RowChildStyle}>
                            <Text style={styles.dropdown3RowTxt}>
                              {item.name}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                  <View style={{flex: 1, marginLeft: 5}}>
                    <Text
                      style={{
                        color: theme.colors.textColor,
                        marginBottom: 5,
                        marginTop: 10,
                      }}>
                      Header
                    </Text>
                    <SelectDropdown
                      data={this.state.headerArray}
                      onSelect={(selectedItem, i) => {
                        this.setState({selectedHeader: selectedItem});
                        this.changeHeaderCondition(selectedItem);
                      }}
                      defaultValue={this.state.selectedHeader}
                      buttonStyle={styles.dropdown3BtnStyle}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={styles.dropdown3BtnChildStyle}>
                            <Text style={styles.dropdown3BtnTxt}>
                              {selectedItem
                                ? selectedItem.name
                                : this.state.dropdownHeaderPlaceholder}
                            </Text>
                          </View>
                        );
                      }}
                      renderDropdownIcon={() => {
                        return (
                          <FontAwesome
                            name="chevron-down"
                            color={'black'}
                            size={14}
                            style={{marginRight: 20}}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown3DropdownStyle}
                      rowStyle={styles.dropdown3RowStyle}
                      renderCustomizedRowChild={(item, index) => {
                        return (
                          <View style={styles.dropdown3RowChildStyle}>
                            <Text style={styles.dropdown3RowTxt}>
                              {item.name}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: '5%',
                    marginRight: '5%',
                    marginTop: 5,
                  }}>
                  <View style={{flex: 1, marginRight: 5}}>
                    <Text
                      style={{
                        color: theme.colors.textColor,
                        marginBottom: 5,
                        marginTop: 10,
                      }}>
                      Transmit Condition
                    </Text>
                    <SelectDropdown
                      data={this.state.transmitArray}
                      onSelect={(selectedItem, i) => {
                        this.setState({
                          selectedTransmitCondition: selectedItem,
                        });
                        this.changeTransmitCondition(selectedItem);
                      }}
                      defaultValue={this.state.selectedTransmitCondition}
                      buttonStyle={styles.dropdown3BtnStyle}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={styles.dropdown3BtnChildStyle}>
                            <Text style={styles.dropdown3BtnTxt}>
                              {selectedItem
                                ? selectedItem.name
                                : this.state.dropdownPlaceholderTC}
                            </Text>
                          </View>
                        );
                      }}
                      renderDropdownIcon={() => {
                        return (
                          <FontAwesome
                            name="chevron-down"
                            color={'black'}
                            size={14}
                            style={{marginRight: 20}}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown3DropdownStyle}
                      rowStyle={styles.dropdown3RowStyle}
                      renderCustomizedRowChild={(item, index) => {
                        return (
                          <View style={styles.dropdown3RowChildStyle}>
                            <Text style={styles.dropdown3RowTxt}>
                              {item.name}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>

                  <View style={{flex: 1, marginLeft: 5}}>
                    <Text
                      style={{
                        color: theme.colors.textColor,
                        marginBottom: 5,
                        marginTop: 10,
                      }}>
                      Lab
                    </Text>
                    <SelectDropdown
                      data={this.state.labsArray}
                      onSelect={(selectedItem, i) => {
                        this.setState({selectedLab: selectedItem});
                        this.changeLabCondition(selectedItem);
                      }}
                      defaultValue={this.state.selectedLab}
                      buttonStyle={styles.dropdown3BtnStyle}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={styles.dropdown3BtnChildStyle}>
                            <Text style={styles.dropdown3BtnTxt}>
                              {selectedItem
                                ? selectedItem.name
                                : this.state.dropdownPlaceholderLC}
                            </Text>
                          </View>
                        );
                      }}
                      renderDropdownIcon={() => {
                        return (
                          <FontAwesome
                            name="chevron-down"
                            color={'black'}
                            size={14}
                            style={{marginRight: 20}}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown3DropdownStyle}
                      rowStyle={styles.dropdown3RowStyle}
                      renderCustomizedRowChild={(item, index) => {
                        return (
                          <View style={styles.dropdown3RowChildStyle}>
                            <Text style={styles.dropdown3RowTxt}>
                              {item.name}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: '5%',
                    marginRight: '5%',
                    marginTop: 5,
                  }}>
                  <View style={{flex: 1, marginRight: 5}}>
                    <Text
                      style={{
                        color: theme.colors.textColor,
                        marginBottom: 5,
                        marginTop: 10,
                      }}>
                      Broker
                    </Text>
                    <SelectDropdown
                      data={this.state.brokerArray}
                      onSelect={(selectedItem, i) => {
                        this.setState({selectedBroker: selectedItem});
                        this.changeBroker(selectedItem);
                      }}
                      defaultValue={this.state.selectedBroker}
                      buttonStyle={styles.dropdown3BtnStyle}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={styles.dropdown3BtnChildStyle}>
                            <Text style={styles.dropdown3BtnTxt}>
                              {selectedItem
                                ? selectedItem.name
                                : this.state.dropdownBrokerPlaceholder}
                            </Text>
                          </View>
                        );
                      }}
                      renderDropdownIcon={() => {
                        return (
                          <FontAwesome
                            name="chevron-down"
                            color={'black'}
                            size={14}
                            style={{marginRight: 20}}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown3DropdownStyle}
                      rowStyle={styles.dropdown3RowStyle}
                      renderCustomizedRowChild={(item, index) => {
                        return (
                          <View style={styles.dropdown3RowChildStyle}>
                            <Text style={styles.dropdown3RowTxt}>
                              {item.name}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>

                  <View style={{flex: 1, marginRight: 5}}></View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: '5%',
                    marginRight: '5%',
                    marginTop: 10,
                  }}>
                  <TextInput
                    style={styles.postInput}
                    onChangeText={text =>
                      this.setState({
                        extraNotes: {value: text, error: ''},
                      })
                    }
                    multiline={true}
                    value={this.state.extraNotes.value}
                    numberOfLines={5}
                    label="Notes"
                    underlineColorAndroid="transparent"
                    returnKeyType="next"
                    require={true}
                    error={!!this.state.extraNotes.error}
                    errorText={this.state.extraNotes.error}
                    maxLength={200}
                  />
                </View>
              </View>
              <View
                style={{flexDirection: 'row', marginLeft: '5%', marginTop: 20}}>
                <View style={{flex: 1}}>
                  <Button
                    mode="contained"
                    uppercase={false}
                    contentStyle={{height: 50}}
                    style={{
                      width: '90%',
                      borderColor: theme.colors.primary,
                      borderWidth: 2,
                      backgroundColor: 'white',
                    }}
                    labelStyle={{fontSize: 16, color: theme.colors.primary}}
                    onPress={() => this.onClickMakeDeal()}>
                    Make Deal
                  </Button>
                </View>

                <View style={{flex: 1}}>
                  <Button
                    mode="contained"
                    uppercase={false}
                    contentStyle={{height: 50}}
                    style={{width: '90%'}}
                    labelStyle={{fontSize: 16, color: 'white'}}
                    onPress={() => this.onClickNegotiate()}>
                    Negotiate
                  </Button>
                </View>
              </View>
            </ScrollView>
          </View>
          {this.state.isPopupShow && (
            <Provider>
              <View>
                <Portal>
                  <Dialog visible={this.state.isPopupShow}>
                    <Dialog.Title>Deal Confirmation</Dialog.Title>
                    <Dialog.Content>
                      <Paragraph>
                        Seller Name: {this.state.dealDetails.seller_name}
                      </Paragraph>
                      <Paragraph>
                        Broker Name: {this.state.dealDetails.broker_name}
                      </Paragraph>
                      <Paragraph>Bales: {this.state.makeDealBales}</Paragraph>
                      <Paragraph>Price: {this.state.makeDealsPrice}</Paragraph>
                      <Paragraph>
                        Payment Condition:{' '}
                        {this.state.dealDetails.payment_condition}
                      </Paragraph>
                      <Paragraph>
                        Header: {this.state.dealDetails.header_name}
                      </Paragraph>
                      <Paragraph>
                        Transmit Condition:{' '}
                        {this.state.dealDetails.transmit_condition}
                      </Paragraph>
                      <Paragraph>
                        Lab Condition: {this.state.dealDetails.lab}
                      </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                      <Button
                        onPress={() => this.setState({isPopupShow: false})}
                        color={theme.colors.primary}>
                        Cancel
                      </Button>
                      <Button
                        onPress={() => this.makeDealApply()}
                        color={theme.colors.primary}>
                        Done
                      </Button>
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
              </View>
            </Provider>
          )}
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

  dropdown3BtnStyle: {
    width: '100%',
    height: 45,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'lightgray',
    left: 0,
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthPercentageToDP(2),
  },
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 16,
    marginHorizontal: 0,
    fontFamily:'Poppins-Regular'
  },
  dropdown3DropdownStyle: {backgroundColor: 'white',marginTop:heightPercentageToDP(Platform.OS === 'ios' ? 0 : -4)},
  dropdown3RowStyle: {
    backgroundColor: '#fff',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3RowTxt: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 16,
    marginHorizontal: 0,
    width: '100%',
    fontFamily: 'Poppins-Regular'
  },
  postInput: {
    fontSize: 15,
    width: '100%',
    fontFamily: 'Outrun future',
    backgroundColor: theme.colors.surface,
    textAlignVertical: 'top',
  },
});

export default DealDetails;
