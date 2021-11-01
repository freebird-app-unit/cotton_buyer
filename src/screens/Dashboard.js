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
  Alert,
  BackHandler,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {baseUrl} from '../components/Global';
import {fontSizeMyPostCenterText} from '../components/Global';
import {vLineMyPostStyle} from '../components/Global';
import Background from '../components/Background';
import Header from '../components/Header';
import {Card, CheckBox} from 'react-native-elements';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Appbar, Searchbar, Button, Badge} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {theme} from '../core/theme';
import TextInput from '../components/TextInput';
import EncryptedStorage from 'react-native-encrypted-storage';
import defaultMessages from '../helpers/defaultMessages';
import {fieldValidator} from '../helpers/fieldValidator';
//svgs
import Home from '../assets/Home';
import NoRecordsFound_Icon from '../assets/NoRecodsFound';
import SearchToSell_Icon from '../assets/SearchToSell';
import PostToSell_Icon from '../assets/PostToSell';
import MyPost_Icon from '../assets/MyPost';
import MyContracts_Icon from '../assets/MyContracts';
import Logout_Icon from '../assets/Logout';
import Bell_Icon from '../assets/Bell';
import MyPostGreen_Icon from '../assets/MyPostGreen';
import History_Icon from '../assets/History';
import Newsfeed_Icon from '../assets/NewsFeed';
import MCX_Icon from '../assets/MCX';
import Calculator_Icon from '../assets/Calculator';
import ChangePassword_Icon from '../assets/ChangePassword';
import Profile_Icon from '../assets/Profile';
import Reports_Icon from '../assets/Reports';
import TransactionTracking_Icon from '../assets/TransactionTracking';
import NotificationToBuyer_Icon from '../assets/NotificationToBuyer';
import Employee from '../assets/Employee';
import EmployeeGray from '../assets/EmployeeGray';
import CustomerIcon from '../assets/CustomerIcon';
import FilterSettings from '../assets/FilterSettings';
import MPIcon1 from '../assets/MPIcon1';
import MPIcon2 from '../assets/MPIcon2';
import PlusRound from '../assets/PlusRound';
import MinusRound from '../assets/MinusRound';
import SetPassword from '../assets/SetPassword';
import axios from 'axios';
import api_config from '../Api/api';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TickRound from '../assets/TickRound';
import UntickRound from '../assets/UntickRound';
import CalculatorView from '../components/CalculatorView';
import NewsFeedView from '../components/NewsFeedView';
import Wallet from '../components/Wallet';
import Profile from '../components/Profile';
import Brokers from '../components/Brokers';
import io from "socket.io-client";

import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../helpers/backHandler';
import {exitAlert} from '../helpers/customAlert';
import RNFetchBlob from 'rn-fetch-blob';

const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 5000,
  transports: ['websocket']/// you need to explicitly tell it to use websockets
};

const socket = io.connect('http://165.232.181.91:3000/', connectionConfig ); //live

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      selectedIDs: [],
      appState: AppState.currentState,
      loading: 'true',
      userID: 0,
      spinner: false,
      jsonData: {},
      token: '',
      isHomeVisible: true,
      isCustomerVisible: true,
      isAllBid: true,
      isBided: false,
      isDeal: false,
      isMenuOpen: false,
      isProfile:false,
      isBroker: false,

      ProfileData:[],
      openState: false,
      deValue: null,
      deOpenState: false,
      buyForOpenState: false,
      buyForValue: null,
      deName: 'Domestic',
      buyForDropDownValue: 'Self',
      deList: [
        {label: 'Domestic', value: 'Domestic'},
        {label: 'Export', value: 'Export'},
      ],
      buyForList: [
        {label: 'Self', value: 'Self'},
        {label: 'Other', value: 'Other'},
      ],
      isShowBuyForDrpDown: true,
      isShowSpinningName: false,
      myActivePost: {},
      arrNegotiationList: {},
      arrNotificationList: {},
      myContractListArray: {},
      balesPriceError: '',
      balesPrice: '',
      txtSpinningMillName: '',
      value: null,
      productItem: [],
      dropdownPlaceholder: '',
      productAttributeList: {},
      balesCount: 100,
      displayBalesCount: 100,
      items: [
        {label: 'Maharashtra', value: '1'},
        {label: 'Rajasthan', value: '2'},
        {label: 'Punjab', value: '3'},
        {label: 'Karnatak', value: '4'},
      ],
      isPostToBuy: false,
      isSearchToBuy: false,
      isNotificationToSeller: false,
      isDashboard: true,
      isMyContracts: false,
      isCalculator: false,
      isNewsFeed: false,
      selectedProductID: 0,
      selectedProductName: '',
      inputData: [],
      selectedAttributeItem: [],
      nonRequiredAttribute: [],
      requiredAttribute: [],
      attributeArry: [],
      isMyPostActiveClicked: true,
      titleOfScreen: 'Dashboard',
      dealTabStyle1: {
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
      dealTabStyle2: {
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
      dealTabTextBox1: {
        height: 40,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: 'white',
      },
      dealTabTextBox2: {
        height: 40,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: theme.colors.textColor,
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
      btnActiveTextColor: theme.colors.primary,
      btnCompletedTextColor: 'gray',
    };

    this.setValue = this.setValue.bind(this);
    this.setOpenState = this.setOpenState.bind(this);
    this.setItemsState = this.setItemsState.bind(this);

    this.setDEValue = this.setDEValue.bind(this);
    this.setDEOpenState = this.setDEOpenState.bind(this);
    this.setDEItemsState = this.setDEItemsState.bind(this);

    this.setBuyForValue = this.setBuyForValue.bind(this);
    this.setBuyForOpenState = this.setBuyForOpenState.bind(this);
    this.setBuyForItemsState = this.setBuyForItemsState.bind(this);

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.socketing()
    });
  }


  onclickProfile = async () => {
    let data = await EncryptedStorage.getItem('user_data');

    this.setState({
      isMenuOpen: false,
      isDashboard: false,
      isPostToBuy: false,
      isSearchToBuy: false,
      isNotificationToSeller: false,
      isMyPost: false,
      isMyContracts: false,
      isCalculator: false,
      isNewsFeed: false,
      isProfile:true,
      isBroker:false,
      titleOfScreen: 'Profile',
      attributeArry: [],
      inputData: [],
      txtSpinningMillName: '',
      displayBalesCount: 100,
      spinner: false
    })
    this.ProfileData(JSON.parse(data));
  }

  ProfileData = async (item) => {
    // let i = JSON.parse(item)
    console.log('item.api_token', item)
    try {
      var self = this;
      let data = {
        user_id: await EncryptedStorage.getItem('user_id'),
      };
      // console.log("getNegotiationListData");
      // console.log('Negotiation Request Param: ' + JSON.stringify(data));
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.PROFILE_BUYER,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + item.api_token
        },
      })
        .then(function (response) {
          // console.log(
          //   'my negotiation list response :>>>>>>>>>>>>>>>>>>>',
          //   response.data.data, response
          // );
          if (response.data.status == 200) {
            self.setState({ ProfileData: response.data.data, spinner: false, });
          } else {
            console.log('hi_______',response.data.message);
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
  }

  socketing = async () => {
    // console.log('hellow socket')
    //  let data = await EncryptedStorage.getItem('user_data');
    //  console.log('data', data)

    //  let p = JSON.parse(data)
    // // socket.on('connect', () => console.log('connected socket'))
    // socket.connect();
    // socket.on('connect', () => console.log('connected socket'))

    // // socket.on('error', console.log('error'))
    // // socket.on('connect_error', (err) => console.log('error>>>>>>>', err))


    // socket.emit('channel', 'NotificationToSeller' + p.user_id, (res) => {
    //   alert('response<>>>socket', res);
    // });

    // socket.on("NotificationSeller", (content) => {

    //   console.log('content >>> socket', content)

    // });
   
  }

  async componentDidMount() {
    let data = await EncryptedStorage.getItem('user_data');
    let p = JSON.parse(data);
    console.log('data.user',p.user_id)
    
// socket.connect();
    socket.on('connect', () => console.log('connected socket'))
    this.socketing()
    // socket.on('error', console.log('error'))
    // socket.on('connect_error', console.log('error>>>>>>>'))

   




    console.log('data>>>>>>>>>>>>', data)

    this.ProfileData(JSON.parse(data));
    this.setState({
      spinner: !this.state.spinner,
      isDashboard: true,
    });
    this.getNegotiationListData();
    this.getNotificationListData();
    this.getProductListAPI();
    this.getMyActivePost();
    handleAndroidBackButton(exitAlert);
  }

  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }

  getNegotiationListData = async () => {
    try {
      var self = this;
      self.setState({
        seller_id: await EncryptedStorage.getItem('user_id'),
        user_type: 'buyer',
      });
      let data = {
        buyer_id: await EncryptedStorage.getItem('user_id'),
        offset:'0',
        limit: '50'
      };
      // console.log("getNegotiationListData");
      // console.log('Negotiation Request Param: ' + JSON.stringify(data));
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.NEGOTIATION_LIST,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          // console.log(
          //   'my negotiation list response :',
          //   JSON.stringify(response.data.data),
          // );
          self.setState({
            arrNegotiationList: {},
            spinner: false,
          });
          if (response.data.status == 200) {
            self.setState({arrNegotiationList: response.data.data});
          } else {
            console.log(response.data.message);
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

  getNotificationListData = async () => {
    try {
      var self = this;
      self.setState({
        userID: await EncryptedStorage.getItem('user_id'),
      });
      let data = {seller_id: await EncryptedStorage.getItem('user_id')};

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.NOTIFICATION_LIST,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          // console.log(
          //   'my notification list response :',
          //   JSON.stringify(response),
          // );
          self.setState({
            arrNotificationList: {},
            spinner: false,
          });
          if (response.data.status == 200) {
            self.setState({arrNotificationList: response.data.data});
          } else {
            console.log(response.data.message);
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

  getMyActivePost = async () => {
    try {
      var self = this;
      let data = {buyer_id: await EncryptedStorage.getItem('user_id')};

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.MY_ACTIVE_POST,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          // console.log(
          //   'my active post list response :',
          //   JSON.stringify(response.data.data),
          // );
          self.setState({
            spinner: false,
          });
          self.setState({myActivePost: {}});
          if (response.data.status == 200) {
            self.setState({myActivePost: response.data.data});
          } else {
            // alert(response.data.message);
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

  getMyCompletedPost = async () => {
    try {
      var self = this;
      let data = {
        buyer_id: await EncryptedStorage.getItem('user_id'),
        user_type: 'buyer',
        type: 'post',
      };

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.COMPLETED_DEALS,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          // console.log(
          //   'my completed post list response :',
          //   JSON.stringify(response.data.data),
          // );
          self.setState({myActivePost: [], spinner: false});
          if (response.data.status == 200) {
            self.setState({myActivePost: response.data.data});
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

  onClickMyPostDetails = (obj, status) => {
    console.log('MypostDetails -' + JSON.stringify(obj));
    this.props.navigation.navigate('MyPostDetails', {
      data: obj,
      status: status,
    });
  };

  getProductListAPI = () => {
    try {
      var self = this;
      axios({
        url: api_config.BASE_URL + api_config.PRODUCT_LIST,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('response :', response.data);
          if (response.data.status == 200) {
            let productList = response.data.data;
            let firstProductID = '';
            var arrProductList = [];
            self.setState({
              items: [],
            });
            for (let i = 0; i < productList.length; i++) {
              if (i == 0) {
                self.setState({
                  dropdownPlaceholder: productList[i].name,
                  selectedProductName: productList[i].name,
                });
                firstProductID = productList[i].id;
              }
              arrProductList.push({
                label: productList[i].name,
                value: productList[i].id,
              });
            }
            self.setState({productItem: arrProductList});
            self.getProductAttributeAPI(firstProductID);
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

  getProductAttributeAPI = productID => {
    try {
      this.setState({selectedProductID: productID});

      var self = this;
      let data = {product_id: productID};

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.PRODUCT_ATTRIBUTE_LIST,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          // console.log(
          //   'response PRODUCT_ATTRIBUTE_LIST:',
          //   JSON.stringify(response.data),
          // );
          if (response.data.status == 200) {
            self.setState({
              productAttributeList: response.data.data,
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

  onclickMenu = () => {
    this.setState({
      isMenuOpen: true,
    });
  };

  onClickVerifyOtp = () => {};

  onClickHome = async () => {
    let data = await EncryptedStorage.getItem('user_data');

    this.setState({
      isMenuOpen: false,
      isDashboard: true,
      isPostToBuy: false,
      isSearchToBuy: false,
      isNotificationToSeller: false,
      isMyPost: false,
      isMyContracts: false,
      isCalculator:false,
      isNewsFeed:false,
      isProfile:false,
      isBroker:false,
      titleOfScreen: 'Dashboard',
      attributeArry: [],
      inputData: [],
      txtSpinningMillName: '',
      displayBalesCount: 100,
      spinner: true
    });
    this.getNegotiationListData();
    this.getNotificationListData();
    this.getProductListAPI();
    this.getMyActivePost();
    this.ProfileData(JSON.parse(data));

  };

  onClickHomeClose = () => {
    this.setState({
      isMenuOpen: false,
    });
  };

  onClickChangePassword = () => {
    this.setState({
      isMenuOpen: false,
    });
    this.props.navigation.navigate('ChangePasswordScreen');
  };

  logout = async () => {
    try {
      var self = this;

      self.setState({
        spinner: true,
      });

      let data = {
        user_id: await EncryptedStorage.getItem('user_id'),
      };

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.LOGOUT_BUYER,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          self.setState({
            spinner: false,
          });
          if (response.data.status == 200) {
            self.logoutSuccess();
          }
        })
        .catch(function (error) {
          self.setState({
            spinner: false,
            message: 'Something bad happened ' + error,
          }),
            alert('Something went wrong');
        });
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  logoutSuccess = async () => {
    await EncryptedStorage.setItem('isLogout', JSON.stringify(true));
    await EncryptedStorage.setItem('user_id',null)
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };

  onClickLogout = async () => {
    Alert.alert(
      'E-Cotton',
      defaultMessages.en.confirmationDialog.replace('{1}', 'logout'),
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.logout()},
      ],
    );
  };

  setOpenState(openState) {
    this.setState({
      openState,
    });
  }

  setDEOpenState(deOpenState) {
    this.setState({
      deOpenState,
    });
  }

  setBuyForOpenState(buyForOpenState) {
    this.setState({
      buyForOpenState,
    });
  }

  setValue(callback) {
    this.setState(state => ({
      value: callback(state.value),
    }));
  }

  setDEValue(callback) {
    this.setState(state => ({
      deValue: callback(state.deValue),
    }));
  }

  setBuyForValue(callback) {
    this.setState(state => ({
      buyForValue: callback(state.buyForValue),
    }));
  }

  setItemsState(callback) {
    this.setState(state => ({
      items: callback(state.items),
    }));
  }

  setDEItemsState(callback) {
    this.setState(state => ({
      deList: callback(state.deList),
    }));
  }

  setBuyForItemsState(callback) {
    this.setState(state => ({
      buyForList: callback(state.deList),
    }));
  }

  setProductItemsState(callback) {
    this.setState(state => ({
      productItem: callback(state.items),
    }));
  }

  onPostPressed = () => {
    this.setState({
      isAllBid: false,
      isBided: false,
      isDeal: true,
    });
  };

  onClickActive = () => {
    this.setState({
      isMyPostActiveClicked: true,
      isMyPostCompletedClicked: false,
      myActivePost: [],
      spinner: true,
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
      btnActiveTextColor: theme.colors.primary,
      btnCompletedTextColor: 'gray',
    });

    this.getMyActivePost();
  };

  onClickCompleted = () => {
    this.setState({
      isMyPostActiveClicked: false,
      isMyPostCompletedClicked: true,
      spinner: true,
      myActivePost: [],
      btnActiveContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        opacity: 0.5,
      },
      btnCompletedContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.primary,
      },
      btnActiveTextColor: 'gray',
      btnCompletedTextColor: theme.colors.primary,
    });
    this.getMyCompletedPost();
  };

  onClickMinusPTB = () => {
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

  onClickPlusPTB = () => {
    try {
      this.state.displayBalesCount =
        this.state.displayBalesCount + this.state.balesCount;
      this.setState({displayBalesCount: this.state.displayBalesCount});
    } catch (error) {
      console.log(error);
    }
  };

  onClickMinusSTB = () => {};

  onClickPlusSTB = () => {};

  onClickMinusNTS = () => {};

  onClickPlusNTS = () => {};

  onClickPostToBuy = () => {
    this.setState({
      isMenuOpen: false,
      isDashboard: false,
      isPostToBuy: true,
      isSearchToBuy: false,
      isNotificationToSeller: false,
      isMyPost: false,
      isMyContracts: false,
      isCalculator:false,
      isNewsFeed:false,
      titleOfScreen: 'Post to buy',
      attributeArry: [],
      inputData: [],
      balesPrice: '',
      displayBalesCount: 100,
    });

    this.setDEFlages({label: 'Domestic', value: 'Export'});

    this.state.productItem.map((el, i) => {
      if (i == 0) {
        return (
          this.setState({dropdownPlaceholder: el.label}),
          this.getProductAttributeAPI(el.value)
        );
      }
    });
  };

  setProductState = (productName, productID) => {
    this.setState(
      {
        dropdownPlaceholder: productName,
        selectedProductID: productID,
        selectedProductName: productName,
      },
      this.success(),
    );
  };

  success = () => {
    //alert("Done: " + this.state.dropdownPlaceholder)
  };

  onClickSearchToBuy = () => {
    this.setState({
      isMenuOpen: false,
      isDashboard: false,
      isPostToBuy: false,
      isSearchToBuy: true,
      isNotificationToSeller: false,
      isMyPost: false,
      isMyContracts: false,
      isCalculator:false,
      isNewsFeed:false,
      isProfile: false, isBroker: false,
      titleOfScreen: 'Search to Buy',
      balesPrice: '',
      displayBalesCount: 100,
    });
    handleAndroidBackButton(this.setDashboardFlag);
  };

  onClickCalculator = () => {
    this.setState({
      isMenuOpen: false,
      isDashboard: false,
      isPostToBuy: false,
      isSearchToBuy: false,
      isCalculator: true,
      isNotificationToSeller: false,
      isMyPost: false,
      isMyContracts: false,
      isProfile: false, isBroker: false,
      isNewsFeed: false,
      titleOfScreen: 'Calculator',
      balesPrice: '',
      displayBalesCount: 100,
    });
    handleAndroidBackButton(this.setDashboardFlag);
  };

  onClickNewsFeed = () => {
    this.setState({
      isMenuOpen: false,
      isDashboard: false,
      isPostToBuy: false,
      isSearchToBuy: false,
      isCalculator: false,
      isNewsFeed: true,
      isProfile: false, isBroker: false,
      isNotificationToSeller: false,
      isMyPost: false,
      isMyContracts: false,
      titleOfScreen: 'News Feed',
      balesPrice: '',
      displayBalesCount: 100,
    });
    handleAndroidBackButton(this.setDashboardFlag);
  };

  // onClickNewsFeed = () => {
  //   this.setState({
  //     isMenuOpen: false,
  //     isDashboard: false,
  //     isPostToBuy: false,
  //     isSearchToBuy: false,
  //     isCalculator: false,
  //     isNewsFeed: true,
  //     isNotificationToSeller: false,
  //     isMyPost: false,
  //     isMyContracts: false,
  //     titleOfScreen: 'News Feed',
  //     balesPrice: '',
  //     displayBalesCount: 100,
  //   });
  //   handleAndroidBackButton(this.setDashboardFlag);
  // };

  onClickNotificationToSeller = () => {
    this.setState({
      isMenuOpen: false,
      isDashboard: false,
      isPostToBuy: false,
      isSearchToBuy: false,
      isNotificationToSeller: true,
      isMyPost: false,
      isProfile: false, isBroker: false,
      isMyContracts: false,
      isCalculator:false,
      isNewsFeed:false,
      titleOfScreen: 'Notification to Seller',
      balesPrice: '',
      displayBalesCount: 100,
    });
    handleAndroidBackButton(this.setDashboardFlag);
  };

  onClickMyPost = () => {
    this.setState({
      isMyPostActiveClicked: true,
      isMyPostCompletedClicked: false,
      isMenuOpen: false,
      isDashboard: false,
      isPostToBuy: false,
      isSearchToBuy: false,
      isNotificationToSeller: false,
      isMyPost: true,
      isMyContracts: false,
      isProfile: false, isBroker: false,
      isCalculator:false,
      titleOfScreen: 'My Post',
      attributeArry: [],
      inputData: [],
      myActivePost: [],
      spinner: true,
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
      btnActiveTextColor: theme.colors.primary,
      btnCompletedTextColor: 'gray',
    });
    handleAndroidBackButton(this.setDashboardFlag);
    this.getMyActivePost();
  };

  setDashboardFlag = () => {
    this.setState({
      isMenuOpen: false,
      isDashboard: true,
      isPostToBuy: false,
      isSearchToBuy: false,
      isNotificationToSeller: false,
      isMyPost: false,
      isProfile: false, isBroker: false,
      isMyContracts: false,
      isCalculator:false,
      isNewsFeed:false,
      titleOfScreen: 'Dashboard',
    });
    handleAndroidBackButton(exitAlert);
  };
  onclickBroker = () => {

    this.setState({
      isMenuOpen: false,
      isDashboard: false,
      isPostToBuy: false,
      isSearchToBuy: false,
      isNotificationToSeller: false,
      isMyPost: false,
      isMyContracts: false,
      isWallet: false,
      isBroker: true,
      isCalculator: false,
      isNewsFeed: false,
      isProfile: false,
      titleOfScreen: 'Broker',
      attributeArry: [],
      inputData: [],
      txtSpinningMillName: '',
      displayBalesCount: 100,
      spinner: false
    })

  }

  onClickMyContracts = () => {
    this.setState({
      isMenuOpen: false,
      isDashboard: false,
      isPostToBuy: false,
      isSearchToBuy: false,
      isNotificationToSeller: false,
      isMyPost: false,
      isProfile: false, isBroker: false,
      isMyContracts: true,
      titleOfScreen: 'My Contract',
      myContractListArray: {},
    });
    handleAndroidBackButton(this.setDashboardFlag);
    this.getMyContracts();
  };

  getMyContracts = async () => {
    try {
      var self = this;
      self.setState({
        spinner: true,
      });

      let data = {
        seller_buyer_id: await EncryptedStorage.getItem('user_id'),
        user_type: 'buyer',
      };

      console.log('My Contract Request---' + JSON.stringify(data));

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.MY_CONTRACT,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('search to sell response :' + JSON.stringify(response));

          if (response.data.status == 200) {
            //REDIRECT TO SEARCH SCREEN
            self.setState({
              spinner: false,
            });
            if (response.data.data.length > 0) {
              self.setState({myContractListArray: response.data.data});
            }
          } else if (response.data.status == 404) {
            self.setState({
              spinner: false,
            });
          } else {
            self.setState({
              spinner: false,
            });
            alert(response.message);
          }
        })
        .catch(function (error) {
          self.setState({
            spinner: false,
          });
          alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  onClickDownload = async (pdfURL) => {
    
    if(pdfURL == "") {
      alert("PDF not available")
      this.setState({spinner:false})
      return
    }
    
    if (Platform.OS === 'ios') {
      this.downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          this.setState({spinner: true})
          this.downloadFile(pdfURL);
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error','Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++"+err);
      }
    }
  };

  downloadFile = (pdfURL) => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = pdfURL;    
    // Function to get extention of the file url
    let file_ext = this.getFileExtention(FILE_URL);
   
    file_ext = '.' + file_ext[0];
   
    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir+
          '/file_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,   
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', res.data);
        this.setState({spinner: false})
        const android = RNFetchBlob.android;
        android.actionViewIntent(res.data, 'application/pdf');
        console.log('File Downloaded Successfully.');
      });
  }

  getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
             /[^.]+$/.exec(fileUrl) : undefined;
  };

  onClickRespond = el => {
    
    let data = {};
    if(el.negotiation_type == 'post') {
      data = { 
        cameFrom: 'Negotiation',
        post_id: el.post_detail[0].post_notification_id,
        sellerId: el.post_detail[0].seller_id,
        current_price: el.post_detail[0].current_price,
        current_no_of_bales: el.post_detail[0].current_no_of_bales,
        payment_condition: el.post_detail[0].payment_condition,
        transmit_condition: el.post_detail[0].transmit_condition,
        lab: el.post_detail[0].lab,
        type: el.negotiation_type
      };
    } else {
      data = {
        cameFrom: 'Negotiation',
        post_id: el.notification_detail[0].post_notification_id,
        sellerId: el.notification_detail[0].seller_id,
        current_price: el.notification_detail[0].current_price,
        current_no_of_bales: el.notification_detail[0].current_no_of_bales,
        payment_condition: el.notification_detail[0].payment_condition,
        transmit_condition: el.notification_detail[0].transmit_condition,
        lab: el.notification_detail[0].lab,
        type: el.negotiation_type
      };
    }
    this.props.navigation.navigate('DealDetails', {
      data: data,
      cameFrom: 'Negotiation',
      type: el.negotiation_type,
      prevScrName: 'Dashboard',
    });
  };

  onClickNotificationView = el => {
    
    let data = {
      cameFrom: 'Notification',
      post_id: el.notification_id,
      type: 'notification',
      sellerId: el.seller_buyer_id,
      current_price: el.price,
      current_no_of_bales: el.no_of_bales,
      payment_condition: '',
      transmit_condition: '',
      lab: '',
    };
    this.props.navigation.navigate('DealDetails', {
      data: data,
      cameFrom:'notification',
      type: 'notification',
      prevScrName: 'Dashboard',
    });
  };

  onClickWaitingForResponse = el => {
    console.log('Waiting for response clicked: ' + JSON.stringify(el));
    this.props.navigation.navigate('NegotiateDetails', {
      data: el,
      cameFrom: 'Dashboard',
      type: el.negotiation_type,
      post_id: el.post_notification_id,
      sellerId: el.seller_id,
      prevScrName: 'Dashboard',
    });
  };

  getRequiredAttributeArray = () => {
    try {
      let inputDataArray = this.state.inputData;
      let selectedItemArray = this.state.selectedIDs;
      let tempArray = [];

      for (var i = 0; i < inputDataArray.length; i++) {
        if (selectedItemArray.length > 0) {
          let index = selectedItemArray.indexOf(inputDataArray[i].itemId);
          console.log(
            'Index: ' +
              inputDataArray[i].itemId +
              ':' +
              JSON.stringify(selectedItemArray),
          );
          if (index !== -1) {
            // tempArray.push({
            //   attribute: inputDataArray[i].attribute,
            //   attribute_value: inputDataArray[i].attribute_value,
            // });
            tempArray.push({
              attribute: inputDataArray[i].attribute,
              from: inputDataArray[i].from,
              to: inputDataArray[i].to,
            });
          }
        }
      }
      return tempArray;
    } catch (error) {
      console.log(error);
    }
  };

  getNonRequiredAttributeArray = () => {
    try {
      let inputDataArray = this.state.inputData;
      let selectedItemArray = this.state.selectedIDs;
      let tempArray = [];

      for (var i = 0; i < inputDataArray.length; i++) {
        if (selectedItemArray.length > 0) {
          console.log(
            'selectedItemArray: ' + JSON.stringify(selectedItemArray),
          );
          let index = selectedItemArray.indexOf(inputDataArray[i].itemId);
          if (index == -1) {
            // tempArray.push({
            //   attribute: inputDataArray[i].attribute,
            //   attribute_value: inputDataArray[i].attribute_value,
            // });
            tempArray.push({
              attribute: inputDataArray[i].attribute,
              from: inputDataArray[i].from,
              to: inputDataArray[i].to,
            });
          }
        } else {
          // tempArray.push({
          //   attribute: inputDataArray[i].attribute,
          //   attribute_value: inputDataArray[i].attribute_value,
          // });
          tempArray.push({
            attribute: inputDataArray[i].attribute,
            from: inputDataArray[i].from,
            to: inputDataArray[i].to,
          });
        }
      }
      return tempArray;
    } catch (error) {
      console.log(error);
    }
  };

  onClickSearchSelectSeller = async () => {
    try {
      if (this.checkValidation()) {
        var self = this;
        self.setState({
          spinner: true,
        });

        var productName = this.state.selectedProductName;
        let requiredArray = this.getRequiredAttributeArray();
        let nonRequiredArray = this.getNonRequiredAttributeArray();
        let attributeArray = {attribute_array: this.getProductAttributeArray()};
        console.log('Bhavin Thakkar: ' + JSON.stringify(attributeArray));

        let data = {
          seller_buyer_id: await EncryptedStorage.getItem('user_id'),
          product_id: this.state.selectedProductID,
          no_of_bales: this.state.displayBalesCount,
          required: nonRequiredArray,
          non_required: requiredArray,
        };

        console.log('user id --->' + data.seller_buyer_id);
        console.log('request of search to buy---' + JSON.stringify(data));
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));

        axios({
          url: api_config.BASE_URL + api_config.SEARCH_TO_BUY,
          method: 'POST',
          data: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(function (response) {
            console.log('search to sell response :' + JSON.stringify(response));

            if (response.data.status == 200) {
              //REDIRECT TO SEARCH SCREEN
              self.setState({
                spinner: false,
              });
              if (response.data.data.length > 0) {
                self.props.navigation.navigate('SearchSelectSeller', {
                  data: response.data,
                  info: attributeArray,
                  pn: productName,
                  bales: self.state.displayBalesCount,
                });
                // self.setState({
                //   selectedIDs: [],
                // });
              } else {
                alert('No search data available');
              }
            } else if (response.data.status == 404) {
              self.setState({
                spinner: false,
              });
              alert('No search data available');
            } else {
              self.setState({
                spinner: false,
              });
              alert(response.message);
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

  onClickSelectSeller = async () => {
    //this.props.navigation.navigate('NotificationSelectSeller');
    /*
      {"seller_buyer_id":"2",
      "product_id":"1",
      "price":"50000",
      "no_of_bales":"50",
      "d_e":"export",
      "buy_for":"other",
      "spinning_meal_name":"test",
      "country_id":"1",
      "state_id":"1",
      "city_id":"1",
      "station_id":"1",
      "sellers":[{"id":"1","type":"default"}],
      "attribute_array":[{"attribute":"uhml","attribute_value":"28.3"},
      {"attribute":"rd","attribute_value":"21.3"}]}
      */
    try {
      if (this.checkValidation()) {
        let data = {
          type: 'notification',
          seller_buyer_id: await EncryptedStorage.getItem('user_id'),
          product_id: this.state.selectedProductID,
          price: this.state.balesPrice,
          no_of_bales: this.state.displayBalesCount,
          attribute_array: this.getProductAttributeArray(),
          d_e: this.state.deName,
          buy_for: this.state.buyForDropDownValue,
          spinning_meal_name: this.state.txtSpinningMillName,
        };

        await EncryptedStorage.setItem(
          'notification_product_detail',
          JSON.stringify(data),
        );
        this.props.navigation.navigate('NotificationSelectSeller', {
          dataObj: data,
        });
        this.setState({isDashboard: true});
      }
    } catch (error) {
      console.log(error);
    }
  };

  onClickNotification = () => {
    this.setState({
      dealTabStyle2: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#69BA53',
        marginLeft: 5,
        marginRight: 0,
        marginTop: 10,
        borderRadius: 5,
      },
      dealTabStyle1: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F5F9',
        marginLeft: 0,
        marginRight: 5,
        marginTop: 10,
        borderRadius: 5,
      },
      dealTabTextBox2: {
        height: 40,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: 'white',
      },
      dealTabTextBox1: {
        height: 40,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: theme.colors.textColor,
      },
    });

    this.setState({spinner: true});
    this.getNotificationListData();
  };

  onClickNegotiation = () => {
    this.setState({
      dealTabStyle1: {
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
      dealTabStyle2: {
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
      dealTabTextBox1: {
        height: 40,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: 'white',
      },
      dealTabTextBox2: {
        height: 40,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: theme.colors.textColor,
      },
    });
    this.setState({spinner: true});
    this.getNegotiationListData();
  };

  getNotificationListData = async () => {
    try {
      var self = this;
      self.setState({
        userID: await EncryptedStorage.getItem('user_id'),
      });
      let data = {buyer_id: await EncryptedStorage.getItem('user_id')};
      
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.NOTIFICATION_LIST,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          // console.log(
          //   'my notification list response :',
          //   JSON.stringify(response),
          // );
          self.setState({
            arrNotificationList: {},
            spinner: false,
          });
          if (response.data.status == 200) {
            self.setState({arrNotificationList: response.data.data});
          } else {
            console.log(response.data.message);
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

  createDashboardNotificationListUI = () => {
    try {
      console.log(
        'createDashboardNotificationListUI' +
          JSON.stringify(this.state.arrNotificationList),
      );
      //let = await EncryptedStorage.getItem('user_id');
      if (this.state.arrNotificationList.length > 0) {
        return this.state.arrNotificationList.map((el, i) => (
          <View style={{backgroundColor: 'white'}}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <View
                style={{
                  flex: 1,
                  marginLeft: '5%',
                  marginRight: '5%',
                  height: 40,
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    flex: 1,
                    marginTop: 18,
                    color: theme.colors.textColor,
                    fontSize: 16,
                    textAlignVertical: 'center',
                  }}>
                  {el.product_name}
                </Text>
              </View>
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
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    flex: 1,
                    color: theme.colors.textColor,
                    fontSize: 12,
                    opacity: 0.5,
                    textAlignVertical: 'center',
                  }}>
                  Send by
                </Text>

                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    flex: 1,
                    color: theme.colors.textColor,
                    fontSize: 12,
                    textAlignVertical: 'center',
                  }}>
                  {el.send_by}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  marginLeft: '5%',
                  marginTop: 10,
                  marginRight: '5%',
                  height: 40,
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    flex: 1,
                    color: theme.colors.textColor,
                    fontSize: 12,
                    opacity: 0.5,
                    textAlignVertical: 'center',
                  }}>
                  Price
                </Text>

                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    flex: 1,
                    color: theme.colors.textColor,
                    fontSize: 12,
                    textAlignVertical: 'center',
                  }}>
                  ₹ {el.price} ({el.no_of_bales})
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  width: '100%',
                  marginLeft: '1%',
                  marginTop: 10,
                  marginRight: '5%',
                  height: 35,
                }}>
                <TouchableOpacity
                  onPress={() => this.onClickNotificationView(el)}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      width: '100%',
                      height: '100%',
                      fontSize: 14,
                      textAlign: 'center',
                      alignItems: 'center',
                      color: 'white',
                      borderRadius: 5,
                      backgroundColor: '#69BA53',
                      textAlignVertical: 'center',
                    }}>
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
      }

      return (
        <View
          style={{
            height: '90%',
            flex: 1,
            flexDirection: 'column',
            //backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40%',
          }}>
          <NoRecordsFound_Icon />
          <Text>Sorry, no records available</Text>
        </View>
      );
    } catch (error) {
      console.log(error);
    }
  };

  onClickMultipleNegotiation = (el) => {
    this.props.navigation.navigate('MultipleNegotiationList', {
      data: el,
      prevScrName: 'Dashboard',
    });
  }

  createDashboardInNegotiationListUI = () => {
    try {
      console.log(
        'Negotiation list: ' + JSON.stringify(this.state.arrNegotiationList),
      );
      if (this.state.arrNegotiationList.length > 0) {
        return this.state.arrNegotiationList.map((el, i) => (
          //alert(el.best_price),
          <View>
            {el.best_price === '' ? (
              <View>
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View
                    style={{
                      flex: 1,
                      marginLeft: '5%',
                      marginRight: '5%',
                      height: 40,
                    }}>
                    {el.negotiation_type == 'notification' ? (
                      <View
                        style={{
                          flex: 1,
                          height: 40,
                          marginLeft: '5%',
                          marginRight: '5%',
                        }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            flex: 1,
                            marginTop: 18,
                            color: theme.colors.textColor,
                            fontSize: 16,
                            textAlignVertical: 'center',
                          }}>
                          {el.product_name}
                        </Text>
                      </View>
                    ) : (
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          marginTop: 18,
                          color: theme.colors.textColor,
                          fontSize: 16,
                          textAlignVertical: 'center',
                        }}>
                        {el.product_name}
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      flex: 1,
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 40,
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.textColor,
                        fontSize: 12,
                        opacity: 0.5,
                        textAlignVertical: 'center',
                      }}>
                      Prev
                    </Text>
                    {el.negotiation_type == 'notification' ? (
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          color: theme.colors.textColor,
                          fontSize: 12,
                          textAlignVertical: 'center',
                        }}>
                        ₹ {el.notification_detail[0].prev_price} (
                        {el.notification_detail[0].prev_no_of_bales})
                      </Text>
                    ) : (
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          color: theme.colors.textColor,
                          fontSize: 12,
                          textAlignVertical: 'center',
                        }}>
                        ₹ {el.post_detail[0].prev_price} (
                        {el.post_detail[0].prev_no_of_bales})
                      </Text>
                    )}
                  </View>

                  {el.negotiation_type == 'notification' ? (
                    el.notification_detail[0].negotiation_by == 'buyer' ? (
                      <View
                        style={{
                          flex: 1.2,
                          width: '100%',
                          marginLeft: '1%',
                          marginTop: 10,
                          marginRight: '5%',
                          height: 35,
                        }}>
                        <TouchableOpacity
                          onPress={() => this.onClickWaitingForResponse(el)}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              width: '100%',
                              height: '100%',
                              fontSize: 10,
                              textAlign: 'center',
                              alignItems: 'center',
                              color: '#69BA53',
                              borderRadius: 5,
                              textAlignVertical: 'center',
                            }}>
                            Waiting for response
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          width: '100%',
                          marginLeft: '5%',
                          marginTop: 10,
                          marginRight: '5%',
                          height: 35,
                        }}>
                        <TouchableOpacity
                          onPress={() => this.onClickRespond(el)}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              width: '100%',
                              height: '100%',
                              fontSize: 14,
                              textAlign: 'center',
                              alignItems: 'center',
                              color: 'white',
                              borderRadius: 5,
                              backgroundColor: '#69BA53',
                              textAlignVertical: 'center',
                            }}>
                            Respond
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )
                  ) : el.post_detail[0].negotiation_by == 'buyer' ? (
                    <View
                      style={{
                        flex: 1.2,
                        width: '100%',
                        marginLeft: '1%',
                        marginTop: 10,
                        marginRight: '5%',
                        height: 35,
                      }}>
                      <TouchableOpacity
                        onPress={() => this.onClickWaitingForResponse(el)}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            width: '100%',
                            height: '100%',
                            fontSize: 10,
                            textAlign: 'center',
                            alignItems: 'center',
                            color: '#69BA53',
                            borderRadius: 5,
                            textAlignVertical: 'center',
                          }}>
                          Waiting for response
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        width: '100%',
                        marginLeft: '5%',
                        marginTop: 10,
                        marginRight: '5%',
                        height: 35,
                      }}>
                      <TouchableOpacity onPress={() => this.onClickRespond(el)}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            width: '100%',
                            height: '100%',
                            fontSize: 14,
                            textAlign: 'center',
                            alignItems: 'center',
                            color: 'white',
                            borderRadius: 5,
                            backgroundColor: '#69BA53',
                            textAlignVertical: 'center',
                          }}>
                          Respond
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
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
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.textColor,
                        fontSize: 12,
                        opacity: 0.5,
                        textAlignVertical: 'center',
                      }}>
                      Posted by
                    </Text>

                    {el.negotiation_type == 'notification' ? (
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          color: theme.colors.textColor,
                          fontSize: 12,
                          textAlignVertical: 'center',
                        }}>
                        {el.name}
                      </Text>
                    ) : (
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          color: theme.colors.textColor,
                          fontSize: 12,
                          textAlignVertical: 'center',
                        }}>
                        {el.name}
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      flex: 1,
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 40,
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.textColor,
                        fontSize: 12,
                        fontWeight: 'bold',

                        textAlignVertical: 'center',
                      }}>
                      New
                    </Text>
                    {el.negotiation_type == 'notification' ? (
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          color: theme.colors.textColor,
                          fontSize: 12,
                          fontWeight: 'bold',
                          textAlignVertical: 'center',
                        }}>
                        {el.notification_detail[0].current_price} (
                        {el.notification_detail[0].current_no_of_bales})
                      </Text>
                    ) : (
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          color: theme.colors.textColor,
                          fontSize: 12,
                          fontWeight: 'bold',
                          textAlignVertical: 'center',
                        }}>
                        {el.post_detail[0].current_price} (
                        {el.post_detail[0].current_no_of_bales})
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      flex: 1,
                      width: '100%',
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 35,
                    }}></View>
                </View>
                <View
                  style={{
                    width: '90%',
                    left: '5%',
                    height: 1,
                    marginTop: 10,
                    backgroundColor: '#D1D1D1',
                  }}></View>
              </View>
            ) : (
              <TouchableOpacity onPress={() => this.onClickMultipleNegotiation(el)}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginLeft: '5%',
                      marginRight: '5%',
                    }}>
                    <Text
                      style={{
                        color: theme.colors.textColor,
                        fontSize: 16,
                        margin: 0,
                        fontWeight: 'bold',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {el.product_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: theme.colors.primary,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {el.count} Negotiation
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        marginLeft: '5%',
                        marginRight: '5%',
                        width:'30%',
                      }}>
                      <Text
                        style={{
                          color: theme.colors.textColor,
                          fontSize: 12,
                          marginTop: 10,
                          opacity: 0.5,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Best Deal
                      </Text>
                      <Text
                        style={{
                          color: theme.colors.textColor,
                          fontSize: 12,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {el.best_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        marginLeft: '5%',
                        marginRight: '5%',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          color: theme.colors.textColor,
                          fontSize: 12,
                          opacity: 0.5,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Base
                      </Text>
                      <Text
                        style={{
                          color: theme.colors.textColor,
                          fontSize: 12,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {el.price} ({el.no_of_bales})
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        marginLeft: '5%',
                        marginRight: '5%',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          color: theme.colors.textColor,
                          fontSize: 12,
                          fontFamily: 'Poppins-Bold',
                        }}>
                        Deal
                      </Text>
                      <Text
                        style={{
                          color: theme.colors.textColor,
                          fontSize: 12,
                          fontFamily: 'Poppins-Bold',
                        }}>
                        {el.best_price} ({el.best_bales})
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        width: '100%',
                        marginLeft: '5%',
                        marginTop: 10,
                        marginRight: '5%',
                        height: 35,
                      }}></View>
                  </View>
                  <View
                    style={{
                      width: '90%',
                      left: '5%',
                      height: 1,
                      marginTop: 10,
                      backgroundColor: '#D1D1D1',
                    }}></View>
                </View>
              </TouchableOpacity>
            )}
          </View>
        ));
      }
      return (
        <View
          style={{
            height: '90%',
            flex: 1,
            flexDirection: 'column',
            //backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40%',
          }}>
          <NoRecordsFound_Icon />
          <Text>Sorry, no records available</Text>
        </View>
      );
    } catch (error) {
      console.log(error);
    }
  };

  createMyPostAttribute = attributeArray => {
    try {
      if (attributeArray.length > 0) {
        return attributeArray.map((el, i) => (
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
              }}>
              {el.attribute}
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
              {el.attribute_value}(mm)
            </Text>
          </View>

          // <View style={vLineMyPostStyle}></View>
        ));
      }
      return (
        <View
          style={{
            height: '90%',
            flex: 1,
            flexDirection: 'column',
            //backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40%',
          }}>
          <NoRecordsFound_Icon />
          <Text>Sorry, no records available</Text>
        </View>
      );
    } catch (error) {
      console.log(error);
    }
  };

  createMyContractUI = () => {
    try {
      let displayDate = '';
      let arrDealDetails = [];

      if (this.state.myContractListArray.length > 0) {
        return this.state.myContractListArray.map(
          (el, i) => (
            (arrDealDetails = []),
            //displayDate = el.deal_final_date.split(','),
            (displayDate = el.deal_date),
            (arrDealDetails = el.deal_details),
            (
              <View>
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View
                    style={{
                      flex: 1,
                      marginLeft: '5%',
                      marginRight: '5%',
                      height: 40,
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.textColor,
                        fontSize: 14,
                        opacity: 0.5,
                        textAlignVertical: 'center',
                      }}>
                      {displayDate}
                    </Text>
                  </View>
                </View>

                {arrDealDetails.map((dd, j) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => this.onClickContractDetail(dd)}>
                      <View style={{flexDirection: 'row', width: '100%'}}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent:'space-between',alignItems:'center',
                            flexDirection:'row',
                            paddingHorizontal:'5%',
                            height: 40,
                          }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              flex: 1,
                              color: theme.colors.textColor,
                              fontSize: 16,
                              textAlignVertical: 'center',
                            }}>
                            {dd.product_name}
                          </Text>
                          {dd.lab_report_status != null ? <Text>Status: {dd.lab_report_status}</Text>: null}
                        </View>
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
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              flex: 1,
                              color: theme.colors.textColor,
                              fontSize: 12,
                              opacity: 0.5,
                              textAlignVertical: 'center',
                            }}>
                            Seller
                          </Text>

                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              flex: 1,
                              color: theme.colors.textColor,
                              fontSize: 12,
                              textAlignVertical: 'center',
                            }}>
                            {dd.seller_name}
                          </Text>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            marginLeft: '5%',
                            marginTop: 10,
                            marginRight: '5%',
                            height: 40,
                          }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              flex: 1,
                              color: theme.colors.textColor,
                              fontSize: 12,
                              fontWeight: 'bold',
                              textAlignVertical: 'center',
                            }}>
                            Price
                          </Text>

                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              flex: 1,
                              color: theme.colors.textColor,
                              fontSize: 12,
                              fontWeight: 'bold',
                              textAlignVertical: 'center',
                            }}>
                            ₹ {dd.sell_price}({dd.sell_bales})
                          </Text>
                        </View>
                        {/* <View style={{fontSize:14}}><Text>Fail</Text></View> */}
                        <View
                          style={{
                            flex: 1,
                            width: '100%',
                            marginLeft: '1%',
                            marginTop: 10,
                            marginRight: '5%',
                            height: 35,
                          }}>
                            
                          {/* <TouchableOpacity onPress={() => this.onClickDownload()}> */}
                          <TouchableOpacity onPress={() => this.onClickDownload(dd.url)}>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{
                                width: '100%',
                                height: '100%',
                                fontSize: 14,
                                textAlign: 'center',
                                alignItems: 'center',
                                color: 'white',
                                borderRadius: 5,
                                backgroundColor: '#69BA53',
                                textAlignVertical: 'center',
                              }}>
                              Download
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '90%',
                        left: '5%',
                        height: 1,
                        marginTop: 10,
                        backgroundColor: '#D1D1D1',
                      }}></View>
                  </View>
                ))}
              </View>
            )
          ),
        );
      }
      return (
        <View
          style={{
            height: '90%',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}>
          <NoRecordsFound_Icon />
          <Text>Sorry, no records available</Text>
        </View>
      );
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  onClickContractDetail = dealDetail => {
    try {
      this.props.navigation.navigate('MyContractDetails', {data: dealDetail});
    } catch (error) {
      console.log(error);
    }
  };

  addValues = (text, label, itemId, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach(element => {
        if (element.index === index) {
          element.attribute_value = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputData: dataArray,
      });
    } else {
      dataArray.push({
        attribute: label,
        attribute_value: text,
        index: index,
        itemId: itemId,
      });
      this.setState({
        inputData: dataArray,
      });
    }
    console.log('Add Values: ' + JSON.stringify(this.state.inputData));
  };

  addValuesSearchBuyer = (text, label, itemId, index, rangeType) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach(element => {
        if (element.index === index) {
          if(rangeType == 'from') {
            element.from = text;
            checkBool = true;
          } else {
            if(parseFloat(element.from) >= parseFloat(text)){
              alert("Invalid selection")
              element.to = 0;
            } else {
              element.to = text;
              checkBool = true;
            }
          }
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputData: dataArray,
      });
    } else {

      if(rangeType == 'from') {
        dataArray.push({
          attribute: label,
          attribute_value: text,
          index: index,
          itemId: itemId,
          from: text,
          to: 0
        });
      }
      this.setState({
        inputData: dataArray,
      });
    }
    console.log('Add Values: ' + JSON.stringify(this.state.inputData));
  };

  removeAttribute(itemId) {
    let array = this.state.selectedIDs; // make a separate copy of the array
    let index = array.indexOf(itemId);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({selectedIDs: array});
    }
  }

  toggleChecked = itemId => {
    const ids = [...this.state.ids, itemId];
    let tempArray = this.state.selectedIDs;

    if (this.isChecked(itemId)) {
      this.setState({
        ...this.state,
        ids: this.state.ids.filter(id => id !== itemId),
      });
      this.removeAttribute(itemId);
    } else {
      this.setState({
        ...this.state,
        ids,
      });
      tempArray.push(itemId);
      this.setState({
        selectedIDs: tempArray,
      });
    }
  };

  selectSearchAttribute = (text, label) => {
    try {
      let index = this.state.selectedAttributeItem.length;
      let dataArray = this.state.selectedAttributeItem;
      let checkBool = false;
      if (dataArray.length !== 0) {
        dataArray.forEach(element => {
          if (element.index === index) {
            element.is_required = 1;
            checkBool = true;
          }
        });
      }
      if (checkBool) {
        this.setState({
          selectedAttributeItem: dataArray,
        });
      } else {
        dataArray.push({attribute: label, is_required: 1});
        this.setState({
          selectedAttributeItem: dataArray,
        });
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  deSelectSearchAttribute = (text, label) => {
    try {
      let index = this.state.selectedAttributeItem.length;
      let dataArray = this.state.selectedAttributeItem;
      let checkBool = false;
      if (dataArray.length !== 0) {
        dataArray.forEach(element => {
          if (element.index === index) {
            element.is_required = 0;
            checkBool = true;
          }
        });
      }
      if (checkBool) {
        this.setState({
          selectedAttributeItem: dataArray,
        });
      } else {
        dataArray.push({attribute: label, is_required: 1});
        this.setState({
          selectedAttributeItem: dataArray,
        });
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  crateProductAttributeUI = () => {
    try {
      if (this.state.isPostToBuy) {
        return this.state.productAttributeList.map((el, i) => (
          <View
            style={{
              flexDirection: 'row',
              marginLeft: '5%',
              marginTop: 10,
              marginRight: '5%',
              height: 50,
              alignItems: 'center',
            }}>
            <Text style={{width: '35%', color: theme.colors.textColor}}>
              {el.label}
            </Text>
            <View
              style={{
                width: '65%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SelectDropdown
                data={el.value}
                onSelect={(selectedItem, j) => {
                  console.log(selectedItem);
                  this.addValues(
                    selectedItem.label,
                    el.label,
                    selectedItem.value,
                    i,
                  );
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem
                          ? selectedItem.label
                          : 'Select ' + el.label}
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
                      <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        ));
      } else if (this.state.isSearchToBuy) {
        return this.state.productAttributeList.map((el, i) => (
          <View
            style={{
              flexDirection: 'row',
              marginLeft: '5%',
              marginTop: 10,
              marginRight: '5%',
              height: 50,
              width: '80%',
              alignItems: 'center',
            }}>
            <Text style={{width: '35%', color: theme.colors.textColor}}>
              {el.label}
            </Text>
            <View
              style={{
                width: '78%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <SelectDropdown
                data={el.value}
                onSelect={(selectedItem, j) => {
                  console.log(JSON.stringify(selectedItem));
                  this.addValues(selectedItem.label, el.label, el.id, i);
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem
                          ? selectedItem.label
                          : 'Select ' + el.label}
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
                      <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
                    </View>
                  );
                }}
              /> */}
              {el.label !== 'Micronnaire' && el.label !== 'RD' && el.label !== 'Trash(%)' && el.label !== 'Moisture(%)' ? <SelectDropdown
                data={el.value}
                onSelect={(selectedItem, j) => {
                  console.log(selectedItem)
                  this.addValuesSearchBuyer(selectedItem.label,
                    el.label,
                    selectedItem.value,
                    i,
                    'from')
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem ? selectedItem.label : "Select " + el.label}
                      </Text>
                    </View>
                  );
                }}
                renderDropdownIcon={() => {
                  return (
                    <FontAwesome name="chevron-down" color={"black"} size={14} style={{ marginRight: 20 }} />
                  );
                }}
                dropdownIconPosition={"right"}

                dropdownStyle={styles.dropdown3DropdownStyle}
                rowStyle={styles.dropdown3RowStyle}
                renderCustomizedRowChild={(item, index) => {
                  return (
                    <View style={styles.dropdown3RowChildStyle}>

                      <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
                    </View>
                  );
                }}
              /> : <View style={{flexDirection: 'row',
              marginLeft: '0%',
              marginRight: '0%',
              marginTop: 0,}}><View style={{flex: 1, marginRight: 3}}>
                <SelectDropdown
                data={el.value}
                onSelect={(selectedItem, j) => {
                  console.log(selectedItem)
                  this.addValuesSearchBuyer(selectedItem.label,
                    el.label,
                    selectedItem.value,
                    i,
                    'from')
                }}

                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem ? selectedItem.label : "Select " + el.label}
                      </Text>
                    </View>
                  );
                }}
                renderDropdownIcon={() => {
                  return (
                    <FontAwesome name="chevron-down" color={"black"} size={14} style={{ marginRight: 20 }} />
                  );
                }}
                dropdownIconPosition={"right"}

                dropdownStyle={styles.dropdown3DropdownStyle}
                rowStyle={styles.dropdown3RowStyle}
                renderCustomizedRowChild={(item, index) => {
                  return (
                    <View style={styles.dropdown3RowChildStyle}>

                      <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
                    </View>
                  );
                }}
              />
                </View>
                <View style={{flex: 1, marginRight: 0}}>
                  <SelectDropdown
                data={el.value}
                onSelect={(selectedItem, j) => {
                  console.log(selectedItem)
                  this.addValuesSearchBuyer(selectedItem.label,
                    el.label,
                    selectedItem.value,
                    i,
                    'to')
                }}

                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem ? selectedItem.label : "Select " + el.label}
                      </Text>
                    </View>
                  );
                }}
                renderDropdownIcon={() => {
                  return (
                    <FontAwesome name="chevron-down" color={"black"} size={14} style={{ marginRight: 20 }} />
                  );
                }}
                dropdownIconPosition={"right"}

                dropdownStyle={styles.dropdown3DropdownStyle}
                rowStyle={styles.dropdown3RowStyle}
                renderCustomizedRowChild={(item, index) => {
                  return (
                    <View style={styles.dropdown3RowChildStyle}>

                      <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
                    </View>
                  );
                }}
              />
                  </View>
                  </View>
                }
            </View>
            {/* <View style={{marginLeft: -10}}>
              <CheckBox
                checkedIcon={<TickRound style={{width: 40, height: 40}} />}
                uncheckedIcon={<UntickRound style={{width: 40, height: 40}} />}
                checked={this.isChecked(el.id)}
                onPress={() => this.toggleChecked(el.id)}
              />
            </View> */}
          </View>
        ));
      } else if (this.state.isNotificationToSeller) {
        return this.state.productAttributeList.map((el, i) => (
          <View
            style={{
              flexDirection: 'row',
              marginLeft: '5%',
              marginTop: 10,
              marginRight: '5%',
              height: 50,
              alignItems: 'center',
            }}>
            <Text style={{width: '35%', color: theme.colors.textColor}}>
              {el.label}
            </Text>
            <View
              style={{
                width: '65%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SelectDropdown
                data={el.value}
                onSelect={(selectedItem, j) => {
                  console.log(selectedItem);
                  this.addValues(
                    selectedItem.label,
                    el.label,
                    selectedItem.value,
                    i,
                  );
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem
                          ? selectedItem.label
                          : 'Select ' + el.label}
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
                      <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        ));
      }
    } catch (error) {
      console.log(error);
    }
  };

  isChecked = itemId => {
    const isThere = this.state.ids.includes(itemId);
    return isThere;
  };

  onClickCancelPost = async (postID, type) => {
    try {
      this.setState({
        spinner: true,
      });
      var self = this;
      let api_url = '';
      let data;

      if (type == 'post') {
        data = {
          seller_buyer_id: await EncryptedStorage.getItem('user_id'),
          user_type: 'buyer',
          post_id: postID,
        };
        api_url = api_config.BASE_URL + api_config.CANCEL_POST;
      } else {
        data = {
          seller_buyer_id: await EncryptedStorage.getItem('user_id'),
          user_type: 'buyer',
          notification_id: postID,
        };
        api_url = api_config.BASE_URL + api_config.CANCEL_NOTIFICATION;
      }

      console.log(JSON.stringify(data));

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_url,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('delete post response :', response.data.data);
          self.setState({myActivePost: {}});
          self.setState({
            spinner: false,
          });
          if (response.data.status == 200) {
            alert('Post cancelled successfully.');
            self.getMyActivePost();
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

  createMyPostUI = () => {
    try {
      if (this.state.isMyPostActiveClicked) {
        if (this.state.myActivePost.length > 0) {
          return this.state.myActivePost.map((el, i) => (
            <TouchableOpacity
              onPress={() => this.onClickMyPostDetails(el, 'active')}>
              <View style={{width: '100%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: '5%',
                    marginRight: '5%',
                    height: 40,
                  }}>
                  <View style={{marginTop: 5, marginRight: 10}}>
                    {el.type == 'notification' ? (
                      <View>
                        <Bell_Icon />
                      </View>
                    ) : (
                      <View>
                        <MyPostGreen_Icon />
                      </View>
                    )}
                  </View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      flex: 1,
                      color: theme.colors.textColor,
                      fontSize: 16,
                      textAlignVertical: 'center',
                    }}>
                    {el.product_name}
                  </Text>

                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      width: '50%',
                      height: '100%',
                      fontSize: 16,
                      textAlign: 'right',
                      alignItems: 'center',

                      textAlignVertical: 'center',
                    }}>
                      {parseInt(el.remaining_bales) == 0 ? <Text>{el.no_of_bales} Bales </Text> : <Text>{el.remaining_bales} Bales </Text>}
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
                  {this.createMyPostAttribute(el.attribute_array)}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: '5%',
                    marginTop: 10,
                    marginRight: '5%',
                    height: 40,
                  }}>
                  <View style={{flex: 1, marginTop: 10}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.textColor,
                        fontSize: 12,
                        opacity: 0.5,
                        textAlignVertical: 'center',
                      }}>
                      {el.date}
                    </Text>
                  </View>

                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      width: '29%',
                      height: '100%',
                      fontSize: 14,
                      textAlign: 'center',
                      alignItems: 'center',
                      color: theme.colors.textColor,
                      fontWeight: 'bold',
                      top: 5,
                      textAlignVertical: 'center',
                    }}>
                    ₹ {el.price}
                  </Text>
                  <Text
                    numberOfLines={1}
                    onPress={() => this.onClickCancelPost(el.id, el.type)}
                    ellipsizeMode="tail"
                    style={{
                      width: '35%',
                      height: '80%',
                      marginTop: '2%',
                      fontSize: 14,
                      textAlign: 'center',
                      alignItems: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      borderRadius: 5,
                      backgroundColor: '#69BA53',
                      textAlignVertical: 'center',
                    }}>
                    Cancel
                  </Text>
                </View>
                <View
                  style={{
                    width: '90%',
                    left: '5%',
                    height: 1,
                    marginTop: 10,
                    backgroundColor: '#D1D1D1',
                  }}></View>
              </View>
            </TouchableOpacity>
          ));
        }
        return (
          <View
            style={{
              height: '90%',
              flex: 1,
              flexDirection: 'column',
              //backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '40%',
            }}>
            <NoRecordsFound_Icon />
            <Text>Sorry, no records available</Text>
          </View>
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  createMyPostCompletedUI = () => {
    try {
      if (this.state.isMyPostCompletedClicked) {
        if (this.state.myActivePost.length > 0) {
          return this.state.myActivePost.map((el, i) => (
            <TouchableOpacity
              onPress={() => this.onClickMyPostDetails(el, 'completed')}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: '5%',
                    marginRight: '5%',
                    height: 40,
                  }}>
                  <View style={{marginTop: 5, marginRight: 10}}>
                    {el.type == 'notification' ? (
                      <View>
                        <Bell_Icon />
                      </View>
                    ) : (
                      <View>
                        <MyPostGreen_Icon />
                      </View>
                    )}
                  </View>

                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      flex: 1,
                      color: theme.colors.textColor,
                      fontSize: 16,
                      textAlignVertical: 'center',
                    }}>
                    {el.product_name}
                  </Text>

                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      width: '50%',
                      height: '100%',
                      fontSize: 16,
                      textAlign: 'right',
                      alignItems: 'center',

                      textAlignVertical: 'center',
                    }}>
                    {el.no_of_bales} Bales
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: '5%',
                    marginTop: 10,
                    marginRight: '5%',
                    height: 35,
                  }}>
                  <View style={{flex: 1}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.textColor,
                        fontSize: 12,
                        opacity: 0.5,
                        textAlignVertical: 'center',
                      }}>
                      Post time
                    </Text>

                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.textColor,
                        fontSize: 12,
                        textAlignVertical: 'center',
                      }}>
                      {el.created_at}
                    </Text>
                  </View>
                  {el.status == 'complete' ? (
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        width: '35%',
                        height: '100%',
                        fontSize: 14,
                        textAlign: 'center',
                        alignItems: 'center',
                        color: '#69BA53',
                        borderStyle: 'dotted',
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: '#69BA53',
                        textAlignVertical: 'center',
                      }}>
                      Deal Done
                    </Text>
                  ) : (
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        width: '35%',
                        height: '100%',
                        fontSize: 14,
                        textAlign: 'center',
                        alignItems: 'center',
                        color: '#BA5369',
                        borderStyle: 'dotted',
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: '#BA5369',
                        textAlignVertical: 'center',
                      }}>
                      Cancelled
                    </Text>
                  )}
                </View>
                {el.status == 'complete' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 35,
                    }}>
                    <View style={{flex: 1}}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          color: theme.colors.textColor,
                          fontSize: 12,
                          opacity: 0.5,
                          textAlignVertical: 'center',
                        }}>
                        Seller Name
                      </Text>

                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          color: theme.colors.textColor,
                          fontSize: 12,
                          textAlignVertical: 'center',
                        }}>
                        {el.done_by}
                      </Text>
                    </View>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        width: '35%',
                        height: '100%',
                        fontSize: 14,
                        textAlign: 'right',
                        alignItems: 'center',
                        color: 'black',
                        fontWeight: 'bold',
                        textAlignVertical: 'center',
                      }}>
                      ₹ {el.price}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 35,
                    }}>
                    <View style={{flex: 1}}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          color: theme.colors.textColor,
                          fontSize: 12,
                          opacity: 0.5,
                          textAlignVertical: 'center',
                        }}>
                        Cancel time
                      </Text>

                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          color: theme.colors.textColor,
                          fontSize: 12,
                          textAlignVertical: 'center',
                        }}>
                        {el.updated_at}
                      </Text>
                    </View>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        width: '35%',
                        height: '100%',
                        fontSize: 14,
                        textAlign: 'right',
                        alignItems: 'center',
                        color: 'black',
                        fontWeight: 'bold',
                        textAlignVertical: 'center',
                      }}>
                      ₹ {el.price}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    width: '90%',
                    height: 1,
                    backgroundColor: '#D1D1D1',
                    marginBottom: 10,
                    marginTop: 10,
                    marginLeft: 19,
                  }}
                />
              </View>
            </TouchableOpacity>
          ));
        }
        return (
          <View
            style={{
              height: '90%',
              flex: 1,
              flexDirection: 'column',
              //backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '40%',
            }}>
            <NoRecordsFound_Icon />
            <Text>Sorry, no records available</Text>
          </View>
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  changeProduct = selectedItem => {
    try {
      this.setState({
        spinner: true,
        selectedProductID: selectedItem.value,
        selectedProductName: selectedItem.label,
      });
      this.getProductAttributeAPI(selectedItem.value);
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
      this.state.displayBalesCount =
        this.state.displayBalesCount + this.state.balesCount;
      this.setState({displayBalesCount: this.state.displayBalesCount});
    } catch (error) {
      console.log(error);
    }
  };

  getProductAttributeArray = () => {
    try {
      let tempArray = [];
      this.state.inputData.map((el, i) =>
        tempArray.push({
          attribute: el.attribute,
          attribute_value: el.attribute_value,
        }),
      );
      console.log('Post attri array: ' + JSON.stringify(tempArray));
      return tempArray;
      //this.setState({attributeArry:tempArray})
    } catch (error) {
      console.log(error);
    }
  };

  checkValidation = () => {
    try {
      if (this.state.isPostToBuy || this.state.isNotificationToSeller) {
        let attrValue = this.getProductAttributeArray();
        if (attrValue.length == 0) {
          alert(defaultMessages.en.required.replace('{0}', 'atribute value'));
          return false;
        }
        if (!fieldValidator(this.state.balesPrice)) {
          alert(defaultMessages.en.required.replace('{0}', 'price'));
          return false;
        }
        if (this.state.displayBalesCount == 0) {
          alert(defaultMessages.en.required.replace('{0}', 'bales'));
          return false;
        }
        if (this.state.isShowSpinningName) {
          if (!fieldValidator(this.state.txtSpinningMillName)) {
            alert(
              defaultMessages.en.required.replace('{0}', 'spinning mill name'),
            );
            return false;
          }
        }

        return true;
      } else if (this.state.isSearchToBuy) {
        let attrValue = this.getProductAttributeArray();
        if (attrValue.length == 0) {
          alert(defaultMessages.en.required.replace('{0}', 'atribute value'));
          return false;
        }
        if (this.state.displayBalesCount == 0) {
          alert(defaultMessages.en.required.replace('{0}', 'bales'));
          return false;
        }

        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  onClickPostToSell = async () => {
    try {
      if (this.checkValidation()) {
        var self = this;
        self.setState({
          spinner: true,
        });
        this.getProductAttributeArray();

        let data = {
          seller_buyer_id: await EncryptedStorage.getItem('user_id'),
          product_id: this.state.selectedProductID,
          price: this.state.balesPrice,
          no_of_bales: this.state.displayBalesCount,
          address: 'Raiya Road Rajkot',
          attribute_array: this.state.attributeArry,
        };
        console.log('Post to buy: ' + JSON.stringify(data));
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));

        axios({
          url: api_config.BASE_URL + api_config.POST_TO_SELL,
          method: 'POST',
          data: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(function (response) {
            console.log('response :', response);
            if (response.status == 200) {
              self.setState({
                spinner: false,
                isPostToSell: false,
                isDashboard: true,
              });
              alert('Your product posted successfully.');
            } else {
              self.setState({
                spinner: false,
              });
              alert(response.message);
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

  onClickSearch = async () => {
    try {
      alert('Hello');
    } catch (error) {
      console.log(error);
    }
  };

  onClickButtonPostToBuy = async () => {
    try {
      console.log(this.getProductAttributeArray());
      if (this.checkValidation()) {
        var self = this;
        self.setState({
          spinner: true,
        });

        let data = {
          seller_buyer_id: await EncryptedStorage.getItem('user_id'),
          product_id: this.state.selectedProductID,
          price: this.state.balesPrice,
          no_of_bales: this.state.displayBalesCount,
          attribute_array: this.getProductAttributeArray(),
          d_e: this.state.deName,
          buy_for: this.state.buyForDropDownValue,
          spinning_meal_name: this.state.txtSpinningMillName,
        };
        console.log('Post to buy: ' + JSON.stringify(data));
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));

        axios({
          url: api_config.BASE_URL + api_config.POST_TO_BUY,
          method: 'POST',
          data: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(function (response) {
            console.log('response :', response);
            if (response.status == 200) {
              self.setState({
                spinner: false,
                isPostToBuy: false,
                isDashboard: true,
              });
              alert('Your product posted successfully.');
            } else {
              self.setState({
                spinner: false,
              });
              alert(response.message);
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

  setDEFlages = selectedItem => {
    this.setState({deName: selectedItem.label});

    if (selectedItem.label == 'Domestic') {
      this.setState({isShowBuyForDrpDown: true});
    } else {
      this.setState({isShowBuyForDrpDown: false});
      this.setState({isShowSpinningName: false});
    }
  };

  setSpinningnameFlages = selectedItem => {
    this.setState({buyForDropDownValue: selectedItem.label});

    if (selectedItem.label == 'Other') {
      this.setState({isShowSpinningName: true});
    } else {
      this.setState({isShowSpinningName: false});
    }
  };

  onChanged(text) {
    this.setState({
      balesPrice: text.replace(/[^0-9]/g, ''),
    });
  }

  render() {
    const jsonDashboard = this.state.jsonData;

    return (
      <Background>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            position: 'relative',
            marginTop: -40,
            backgroundColor: theme.colors.blackBG,
          }}>
          <Spinner visible={this.state.spinner} color="#085cab" />
          <View style={{width: '100%', height: 55, marginTop: 40}}>
            <Appbar.Header style={{backgroundColor: 'transparent'}}>
              <Appbar.Action
                icon="menu"
                color="white"
                onPress={() => this.onclickMenu()}
              />
              <Appbar.Content
                style={{alignItems: 'center'}}
                color="white"
                title={this.state.titleOfScreen}
                titleStyle={{fontSize: 20, fontWeight: 'bold'}}
              />
              <Appbar.Action
                icon={() =>
                  (this.state.isMyContracts || this.state.isProfile) && (
                    <FilterSettings width={19} height={19} />
                  )
                }
                onPress={() => {
                  this.props.navigation.navigate(this.state.isProfile ? 'EditProfile' : 'MyContractFilter', { data : this.state.ProfileData });
                }}
              />
            </Appbar.Header>
          </View>

          {this.state.isPostToBuy && (
            <View
              style={{
                width: '100%',
                height: '86%',
                paddingBottom: 30,
                marginTop: 10,
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <ScrollView>
                <View style={{marginTop: 20}}>
                  <View
                    style={{
                      height: 50,
                      width: '90%',
                      marginTop: 15,
                      marginLeft: '5%',
                    }}>
                    <SelectDropdown
                      data={this.state.productItem}
                      onSelect={(selectedItem, i) => {
                        console.log(selectedItem);
                        this.changeProduct(selectedItem);
                        //this.addValues(selectedItem.label, el.label)
                      }}
                      buttonStyle={styles.dropdown3BtnStyle}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={styles.dropdown3BtnChildStyle}>
                            <Text style={styles.dropdown3BtnTxt}>
                              {selectedItem
                                ? selectedItem.label
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
                              {item.label}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>

                  {this.crateProductAttributeUI()}

                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 50,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        width: '35%',
                        color: theme.colors.textColor,
                        fontWeight: 'bold',
                      }}>
                      Price
                    </Text>

                    <View
                      style={{
                        width: '65%',
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
                        maxLength={6}
                        onChangeText={text => this.onChanged(text)}
                        value={this.state.balesPrice}
                        error={!!this.state.balesPriceError}
                        errorText={this.state.balesPriceError}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        textContentType="none"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 50,
                      alignItems: 'center',
                    }}>
                    <Text style={{width: '35%', color: theme.colors.textColor}}>
                      Buy bales
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        width: '65%',
                        height: '100%',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity onPress={() => this.onClickMinusPTB()}>
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
                          height: '100%',
                          color: theme.colors.textColor,
                          fontWeight: 'bold',
                        }}>
                        {this.state.displayBalesCount}
                      </Text>

                      <TouchableOpacity onPress={() => this.onClickPlusPTB()}>
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

                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 20,
                      alignItems: 'center',
                    }}>
                    <Text style={{width: '35%', color: theme.colors.textColor}}>
                      D/E
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 50,
                      width: '90%',
                      marginTop: 15,
                      marginLeft: '5%',
                    }}>
                    <SelectDropdown
                      data={this.state.deList}
                      onSelect={(selectedItem, i) => {
                        console.log(selectedItem);
                        this.setDEFlages(selectedItem);
                        //this.addValues(selectedItem.label, el.label)
                      }}
                      buttonStyle={styles.dropdown3BtnStyle}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={styles.dropdown3BtnChildStyle}>
                            <Text style={styles.dropdown3BtnTxt}>
                              {selectedItem
                                ? selectedItem.label
                                : this.state.deName}
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
                              {item.label}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                  {this.state.isShowBuyForDrpDown && (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: '5%',
                          marginTop: 10,
                          marginRight: '5%',
                          height: 20,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{width: '35%', color: theme.colors.textColor}}>
                          Buy For
                        </Text>
                      </View>
                      <View
                        style={{
                          height: 50,
                          width: '90%',
                          marginTop: 15,
                          marginLeft: '5%',
                        }}>
                        <SelectDropdown
                          data={this.state.buyForList}
                          onSelect={(selectedItem, i) => {
                            console.log(selectedItem);
                            this.setSpinningnameFlages(selectedItem);
                            //this.addValues(selectedItem.label, el.label)
                          }}
                          buttonStyle={styles.dropdown3BtnStyle}
                          renderCustomizedButtonChild={(
                            selectedItem,
                            index,
                          ) => {
                            return (
                              <View style={styles.dropdown3BtnChildStyle}>
                                <Text style={styles.dropdown3BtnTxt}>
                                  {selectedItem
                                    ? selectedItem.label
                                    : this.state.buyForDropDownValue}
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
                                  {item.label}
                                </Text>
                              </View>
                            );
                          }}
                        />
                      </View>
                    </View>
                  )}
                  {this.state.isShowSpinningName && (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: '5%',
                          marginTop: 0,
                          marginRight: '5%',
                          alignItems: 'center',
                        }}>
                        <TextInput
                          style={{
                            width: '100%',
                            height: 46,
                            fontWeight: 'bold',
                            backgroundColor: '#fff',
                          }}
                          label=""
                          placeholder="Spinning Mill Name"
                          returnKeyType="next"
                          onChangeText={text =>
                            this.setState({txtSpinningMillName: text})
                          }
                          value={this.state.txtSpinningMillName}
                          autoCapitalize="none"
                          autoCompleteType="off"
                          textContentType="none"
                        />
                      </View>
                    </View>
                  )}

                  <Button
                    mode="contained"
                    uppercase={false}
                    contentStyle={{height: 50}}
                    style={{width: '90%', marginLeft: '5%', marginTop: 20}}
                    labelStyle={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: 'white',
                    }}
                    onPress={() => this.onClickButtonPostToBuy()}>
                    Post
                  </Button>
                </View>
              </ScrollView>
            </View>
          )}

          {this.state.isSearchToBuy && (
            <View
              style={{
                width: '100%',
                height: '86%',
                paddingBottom: 30,
                marginTop: 10,
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <ScrollView>
                <View style={{marginTop: 20}}>
                  <View
                    style={{
                      height: 50,
                      width: '90%',
                      marginTop: 15,
                      marginLeft: '5%',
                    }}>
                    <SelectDropdown
                      data={this.state.productItem}
                      onSelect={(selectedItem, i) => {
                        console.log(selectedItem);
                        this.changeProduct(selectedItem);
                        //this.addValues(selectedItem.label, el.label)
                      }}
                      buttonStyle={styles.dropdown3BtnStyle}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={styles.dropdown3BtnChildStyle}>
                            <Text style={styles.dropdown3BtnTxt}>
                              {selectedItem
                                ? selectedItem.label
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
                              {item.label}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>

                  {this.crateProductAttributeUI()}

                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 50,
                      alignItems: 'center',
                    }}>
                    <Text style={{width: '35%', color: theme.colors.textColor}}>
                      Buy bales
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        width: '65%',
                        height: '100%',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity onPress={() => this.onClickMinusPTB()}>
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
                          height: '100%',
                          color: theme.colors.textColor,
                          fontWeight: 'bold',
                        }}>
                        {this.state.displayBalesCount}
                      </Text>

                      <TouchableOpacity onPress={() => this.onClickPlusPTB()}>
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

                  <Button
                    mode="contained"
                    uppercase={false}
                    contentStyle={{height: 50}}
                    style={{width: '90%', marginLeft: '5%', marginTop: 20}}
                    labelStyle={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: 'white',
                    }}
                    onPress={() => this.onClickSearchSelectSeller()}>
                    Search
                  </Button>
                </View>
              </ScrollView>
            </View>
          )}

          {this.state.isNotificationToSeller && (
            <View
              style={{
                width: '100%',
                height: '86%',
                paddingBottom: 30,
                marginTop: 10,
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <ScrollView>
                <View style={{marginTop: 20}}>
                  <View
                    style={{
                      height: 50,
                      width: '90%',
                      marginTop: 15,
                      marginLeft: '5%',
                    }}>
                    <SelectDropdown
                      data={this.state.productItem}
                      onSelect={(selectedItem, i) => {
                        console.log(selectedItem);
                        this.changeProduct(selectedItem);
                        //this.addValues(selectedItem.label, el.label)
                      }}
                      buttonStyle={styles.dropdown3BtnStyle}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={styles.dropdown3BtnChildStyle}>
                            <Text style={styles.dropdown3BtnTxt}>
                              {selectedItem
                                ? selectedItem.label
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
                              {item.label}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>

                  {this.crateProductAttributeUI()}

                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 50,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        width: '35%',
                        color: theme.colors.textColor,
                        fontWeight: 'bold',
                      }}>
                      Price
                    </Text>

                    <View
                      style={{
                        width: '65%',
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
                        maxLength={6}
                        onChangeText={text => this.onChanged(text)}
                        value={this.state.balesPrice}
                        error={!!this.state.balesPriceError}
                        errorText={this.state.balesPriceError}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        textContentType="none"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 50,
                      alignItems: 'center',
                    }}>
                    <Text style={{width: '35%', color: theme.colors.textColor}}>
                      Buy bales
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        width: '65%',
                        height: '100%',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity onPress={() => this.onClickMinusPTB()}>
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
                          height: '100%',
                          color: theme.colors.textColor,
                          fontWeight: 'bold',
                        }}>
                        {this.state.displayBalesCount}
                      </Text>

                      <TouchableOpacity onPress={() => this.onClickPlusPTB()}>
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

                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 20,
                      alignItems: 'center',
                    }}>
                    <Text style={{width: '35%', color: theme.colors.textColor}}>
                      D/E
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 50,
                      width: '90%',
                      marginTop: 15,
                      marginLeft: '5%',
                    }}>
                    <SelectDropdown
                      data={this.state.deList}
                      onSelect={(selectedItem, i) => {
                        console.log(selectedItem);
                        this.setDEFlages(selectedItem);
                        //this.addValues(selectedItem.label, el.label)
                      }}
                      buttonStyle={styles.dropdown3BtnStyle}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={styles.dropdown3BtnChildStyle}>
                            <Text style={styles.dropdown3BtnTxt}>
                              {selectedItem
                                ? selectedItem.label
                                : this.state.deName}
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
                              {item.label}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                  {this.state.isShowBuyForDrpDown && (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: '5%',
                          marginTop: 10,
                          marginRight: '5%',
                          height: 20,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{width: '35%', color: theme.colors.textColor}}>
                          Buy For
                        </Text>
                      </View>
                      <View
                        style={{
                          height: 50,
                          width: '90%',
                          marginTop: 15,
                          marginLeft: '5%',
                        }}>
                        <SelectDropdown
                          data={this.state.buyForList}
                          onSelect={(selectedItem, i) => {
                            console.log(selectedItem);
                            this.setSpinningnameFlages(selectedItem);
                            //this.addValues(selectedItem.label, el.label)
                          }}
                          buttonStyle={styles.dropdown3BtnStyle}
                          renderCustomizedButtonChild={(
                            selectedItem,
                            index,
                          ) => {
                            return (
                              <View style={styles.dropdown3BtnChildStyle}>
                                <Text style={styles.dropdown3BtnTxt}>
                                  {selectedItem
                                    ? selectedItem.label
                                    : this.state.buyForDropDownValue}
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
                                  {item.label}
                                </Text>
                              </View>
                            );
                          }}
                        />
                      </View>
                    </View>
                  )}
                  {this.state.isShowSpinningName && (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: '5%',
                          marginTop: 0,
                          marginRight: '5%',
                          alignItems: 'center',
                        }}>
                        <TextInput
                          style={{
                            width: '100%',
                            height: 46,
                            fontWeight: 'bold',
                            backgroundColor: '#fff',
                          }}
                          label=""
                          placeholder="Spinning Mill Name"
                          returnKeyType="next"
                          onChangeText={text =>
                            this.setState({txtSpinningMillName: text})
                          }
                          value={this.state.txtSpinningMillName}
                          autoCapitalize="none"
                          autoCompleteType="off"
                          textContentType="none"
                        />
                      </View>
                    </View>
                  )}

                  <Button
                    mode="contained"
                    uppercase={false}
                    contentStyle={{height: 50}}
                    style={{width: '90%', marginLeft: '5%', marginTop: 20}}
                    labelStyle={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: 'white',
                    }}
                    onPress={() => this.onClickSelectSeller()}>
                    Select Seller
                  </Button>
                </View>
              </ScrollView>
            </View>
          )}

          {this.state.isMyPost && (
            <View
              style={{
                width: '100%',
                height: '86%',
                paddingBottom: 30,
                marginTop: 10,
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <ScrollView>
                <View style={{marginTop: 20}}>
                  <View style={styles.container}>
                    <View style={this.state.btnActiveContainer}>
                      <TouchableOpacity onPress={() => this.onClickActive()}>
                        <Button
                          mode="text"
                          uppercase={false}
                          color={this.state.btnActiveTextColor}
                          labelStyle={{fontSize: 14}}>
                          Active
                        </Button>
                      </TouchableOpacity>
                    </View>

                    <View style={this.state.btnCompletedContainer}>
                      <TouchableOpacity onPress={() => this.onClickCompleted()}>
                        <Button
                          mode="text"
                          uppercase={false}
                          color={this.state.btnCompletedTextColor}
                          labelStyle={{fontSize: 14}}>
                          Completed
                        </Button>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {this.createMyPostUI()}
                  {this.createMyPostCompletedUI()}
                </View>
              </ScrollView>
            </View>
          )}

          {this.state.isDashboard && (
            <View
              style={{
                width: '100%',
                height: '86%',
                paddingBottom: 30,
                marginTop: 10,
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <ScrollView>
                <View style={{marginTop: 20}}>
                  <View
                    style={{
                      marginRight: 20,
                      marginLeft: 20,
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                    <View style={styles.btnCompletedContainer}>
                      <TouchableOpacity onPress={() => this.onClickActive()}>
                        <Button
                          mode="text"
                          uppercase={false}
                          color="gray"
                          labelStyle={{fontSize: 14}}>
                          My Favourite
                        </Button>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.btnActiveContainer}>
                      <TouchableOpacity onPress={() => this.onClickCompleted()}>
                        <Button
                          mode="text"
                          uppercase={false}
                          color={theme.colors.primary}
                          labelStyle={{fontSize: 14}}>
                          Deals
                        </Button>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.dealTopMainContainer}>
                    <View style={this.state.dealTabStyle1}>
                      <TouchableOpacity
                        onPress={() => this.onClickNegotiation()}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={this.state.dealTabTextBox1}>
                          In Negotiation
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={this.state.dealTabStyle2}>
                      <TouchableOpacity
                        onPress={() => this.onClickNotification()}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={this.state.dealTabTextBox2}>
                          Notification
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {this.state.dealTabStyle1.backgroundColor == '#69BA53' && (
                    <View>{this.createDashboardInNegotiationListUI()}</View>
                  )}

                  {this.state.dealTabStyle2.backgroundColor == '#69BA53' && (
                    <View>{this.createDashboardNotificationListUI()}</View>
                  )}
                </View>
              </ScrollView>
            </View>
          )}

          {this.state.isCalculator && (
            <View
              style={{
                width: '100%',
                height: '86%',
                paddingBottom: 30,
                marginTop: 10,
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <CalculatorView />
            </View>
          )}
          {this.state.isBroker && (
            <View
              style={{
                width: '100%',
                height: '86%',
                paddingBottom: 30,
                marginTop: 10,
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <Brokers Props={this.props} />
            </View>
          )}
          {this.state.isProfile && (
            <View
              style={{
                width: '100%',
                height: '86%',
                paddingBottom: 30,
                paddingTop: 20,
                marginTop: 20,
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <Profile Props={this.state.ProfileData} />

            </View>)}
          

          {this.state.isNewsFeed && (
            <View
              style={{
                width: '100%',
                height: '86%',
                paddingBottom: 30,
                paddingTop: 20,
                marginTop: 20,
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <NewsFeedView Props={this.props} />
              {/* <Wallet Props={this.props} /> */}

            </View>)}

          {this.state.isMyContracts && (
            <View
              style={{
                width: '100%',
                height: '86%',
                paddingBottom: 30,
                marginTop: 10,
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <ScrollView>
                <View style={{marginTop: 20}}>{this.createMyContractUI()}</View>
              </ScrollView>
            </View>
          )}
        </View>

        {this.state.isMenuOpen && (
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: theme.colors.blackBG,
            }}>
            <TouchableOpacity onPress={() => this.onClickHomeClose()}>
              <Icon
                name="close"
                size={30}
                color="white"
                style={{
                  width: 30,
                  height: 30,
                  marginTop: '10%',
                  marginLeft: '5%',
                }}
              />
            </TouchableOpacity>

            <View style={styles.container2}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <TouchableOpacity onPress={() => this.onClickHome()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '10%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <Home
                      size={20}
                      color="black"
                      style={{width: 20, height: 20}}
                    />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{fontWeight: 'light', height: 20}}>
                      Home
                    </Button>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onClickPostToBuy()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '4%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <PostToSell_Icon
                      size={20}
                      color="black"
                      style={{width: 20, height: 20}}
                    />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{fontWeight: 'light'}}>
                      Post to buy
                    </Button>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onClickSearchToBuy()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '4%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <SearchToSell_Icon
                      size={20}
                      color="black"
                      style={{width: 20, height: 20}}
                    />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{fontWeight: 'light'}}>
                      Search to buy
                    </Button>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.onClickNotificationToSeller()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '4%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <NotificationToBuyer_Icon
                      size={20}
                      color="black"
                      style={{width: 20, height: 20}}
                    />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{fontWeight: 'light'}}>
                      Notification to seller
                    </Button>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onClickMyPost()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '4%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <MyPost_Icon
                      size={20}
                      color="black"
                      style={{width: 20, height: 20}}
                    />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{fontWeight: 'light'}}>
                      My Post
                    </Button>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onclickBroker()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '4%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <Logout_Icon />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{ fontWeight: 'light' }}>
                      Brokers
                    </Button>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onClickMyContracts()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '4%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <MyContracts_Icon
                      size={20}
                      color="black"
                      style={{width: 20, height: 20}}
                    />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{fontWeight: 'light'}}>
                      My Contracts
                    </Button>
                  </View>
                </TouchableOpacity>


                <TouchableOpacity
                /*onPress={() => this.onClickNotificationToSeller()}*/
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '4%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <Reports_Icon />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{fontWeight: 'light'}}>
                      Reports
                    </Button>
                  </View>
                </TouchableOpacity>

                {/* <TouchableOpacity
                onPress={() => this.onClickNotificationToSeller()}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '4%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <TransactionTracking_Icon />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{fontWeight: 'light'}}>
                      Transaction Tracking
                    </Button>
                  </View>
                </TouchableOpacity> */}

                <TouchableOpacity
                /*onPress={() => this.onClickNotificationToSeller()}*/
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '4%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <History_Icon />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{fontWeight: 'light'}}>
                      History
                    </Button>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => this.onClickNewsFeed()}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '4%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <Newsfeed_Icon />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{fontWeight: 'light'}}>
                      News Feed
                    </Button>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                /*onPress={() => this.onClickNotificationToSeller()}*/
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '4%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <MCX_Icon />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{fontWeight: 'light'}}>
                      MCX
                    </Button>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Calculator')}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '4%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <Calculator_Icon />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{fontWeight: 'light'}}>
                      Calculator
                    </Button>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => this.onclickProfile()}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '4%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <Profile_Icon />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{fontWeight: 'light'}}>
                      Profile
                    </Button>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onClickChangePassword()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '4%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <ChangePassword_Icon />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{fontWeight: 'light'}}>
                      Change Password
                    </Button>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onClickLogout()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '4%',
                      paddingLeft: '5%',
                      alignItems: 'center',
                    }}>
                    <Logout_Icon
                      size={20}
                      color="black"
                      style={{width: 20, height: 20}}
                    />
                    <Button
                      mode="text"
                      uppercase={false}
                      color={theme.colors.blackBG}
                      labelStyle={{fontWeight: 'light'}}>
                      Logout
                    </Button>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        )}
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
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#444',
    left: 0,
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 16,
    marginHorizontal: 0,
  },
  dropdown3DropdownStyle: {backgroundColor: 'white'},
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
  },
});

export default Dashboard;
