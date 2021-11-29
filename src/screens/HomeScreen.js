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
  RefreshControl
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
import {io} from 'socket.io-client';
import styles from './Styles';

import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../helpers/backHandler';
import {exitAlert} from '../helpers/customAlert';
import RNFetchBlob from 'rn-fetch-blob';

if (!window.location) {
  // App is running in simulator
  window.navigator.userAgent = 'ReactNative';
}

const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 5000,
  transports: ['websocket'], /// you need to explicitly tell it to use websockets
};

const socket = io.connect('http://165.232.181.91:3000/', connectionConfig); //live

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
      refreshing:false,
      jsonData: {},
      token: '',
      isHomeVisible: true,
      isCustomerVisible: true,
      isAllBid: true,
      isBided: false,
      isDeal: false,
      isMenuOpen: false,
      isProfile: false,
      isBroker: false,

      ProfileData: [],
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
        fontFamily: 'Poppins-Regular',

      },
      dealTabTextBox2: {
        height: 40,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: theme.colors.textColor,
        fontFamily: 'Poppins-Regular',

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

    // this.setValue = this.setValue.bind(this);
    // this.setOpenState = this.setOpenState.bind(this);
    // this.setItemsState = this.setItemsState.bind(this);

    // this.setDEValue = this.setDEValue.bind(this);
    // this.setDEOpenState = this.setDEOpenState.bind(this);
    // this.setDEItemsState = this.setDEItemsState.bind(this);

    // this.setBuyForValue = this.setBuyForValue.bind(this);
    // this.setBuyForOpenState = this.setBuyForOpenState.bind(this);
    // this.setBuyForItemsState = this.setBuyForItemsState.bind(this);

    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      // Prevent default action
      this.setState({
        arrNegotiationList: [],
        arrNotificationList: [],
      });

      this.getNegotiationListData();
      this.getNotificationListData();
    });
  }

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
      Title: el.product_name,
      cameFrom: 'notification',
      type: 'notification',
      prevScrName: 'Dashboard',
    });
  };

  componentWillUnmount() {
    // if (this._didFocusSubscription) {
    // BackHandler.remove();
    this.setState({
      arrNegotiationList: [],
      arrNotificationList: [],
    });
    //   this.unsubscribe.remove()

    // }
  }

  onBackButtonPressAndroid = () => {
    console.log('hi');
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        'e-Cotton',
        'Do you want to quit the app?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
      return true;
    } else {
      this.props.navigation.goBack();
    }
    return true;
  };

  onClickWaitingForResponse = el => {
    // console.log('Waiting for response clicked: ' + JSON.stringify(el));
    this.props.navigation.navigate('NegotiateDetails', {
      data: el,
      cameFrom: 'Dashboard',
      Title: el.product_name,
      type: el.negotiation_type,
      post_id: el.post_notification_id,
      sellerId: el.seller_id,
      prevScrName: 'Dashboard',
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
          //     'my active post list response :',
          //     JSON.stringify(response.data.data),
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
          //     'my completed post list response :',
          //     JSON.stringify(response.data.data),
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

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.onBackButtonPressAndroid(),
    );

    const {route} = this.props;

    // console.log('route', route)

    //    this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload =>
    const self = this;
    this.getNegotiationListData();
    //      socket.on('error', console.log('error'))
    //  socket.on('connect_error', console.log('error>>>>>>>'))
    socket.connect();
    // console.log('id',await EncryptedStorage.getItem('user_id'))
    socket.on('connect', () => console.log('connected socket'));
    socket.on(
      'NotificationToBuyer' + (await EncryptedStorage.getItem('user_id')),
      content => {
        // global.Notification = content.data.notificationSeller

        // console.log('this.,',this.state.arrNotificationList,content)
        const newUsers = this.state.arrNotificationList
          ? [content.data.notificationBuyer, ...this.state.arrNotificationList]
          : [content.data.notificationBuyer];
        // this.setState({ arrNotificationList:  })

        this.setState({arrNotificationList: newUsers});

        // console.log('content >>> socket', content)
      },
    );


    // socket.on(
    //   'MakeDealToBuyer' + (await EncryptedStorage.getItem('user_id')),
    //   content => {
    //     this.getNegotiationListData();
    //   },
    // );
    
    socket.onAny(async event => {
      if('MakeDealToSeller' + (await EncryptedStorage.getItem('user_id')) === event)
    {
      this.getNegotiationListData();

    }})
    
    socket.on(
      'NegotiationToBuyer' + (await EncryptedStorage.getItem('user_id')),
      content => {
        // global.Notification = content.data.notificationSeller
        
        if (this.state.arrNegotiationList.length > 0) {
          let find = this.state.arrNegotiationList.find(item =>
            item.negotiation_type === 'post'
              ? item.post_id ===
                content.data.negotiationBuyer.post_notification_id
              : item.notification_id ===
                content.data.negotiationBuyer.post_notification_id,
          );
          let findInd = this.state.arrNegotiationList.findIndex(item =>
            item.negotiation_type === 'post'
              ? item.post_id ===
                content.data.negotiationBuyer.post_notification_id
              : item.notification_id ===
                content.data.negotiationBuyer.post_notification_id,
          );

          // console.log('findDat + homescreen',find)
          if (find) {
            let newSeller = '';
            let sellerIndex = '';
            if (content.data.negotiationBuyer.negotiation_type === 'post')
              sellerIndex = find.post_detail.find(
                item =>
                  item.seller_id ===
                  parseInt(content.data.negotiationBuyer.seller_id),
              );
            else
              sellerIndex = find.notification_detail.find(
                item =>
                  item.seller_id ===
                  parseInt(content.data.negotiationBuyer.seller_id),
              );
            // let sellerIndex = content.data.negotiationBuyer.negotiation_type === 'post' ?
            // find.post_detail.find(item => item.seller_id === parseInt(content.data.negotiationBuyer.sell)) :
            // find.notification_detail.find(item => item.seller_id === parseInt(content.data.negotiationBuyer.sell));

            let sellerId;
            if (content.data.negotiationBuyer.negotiation_type === 'post')
              sellerId = find.post_detail.findIndex(
                item =>
                  item.seller_id ===
                  parseInt(content.data.negotiationBuyer.seller_id),
              );
            else
              sellerId = find.notification_detail.findIndex(
                item =>
                  item.seller_id ===
                  parseInt(content.data.negotiationBuyer.seller_id),
              );

            // console.log('find value',find,sellerIndex,findInd,sellerId)

            if (content.data.negotiationBuyer.hasOwnProperty('best_price')) {
              if (sellerIndex) {
                find.best_price = content.data.negotiationBuyer.best_price;
                find.count = content.data.negotiationBuyer.negotiation_count;
                find.best_name = content.data.negotiationBuyer.best_dealer_name;
                find.best_bales = content.data.negotiationBuyer.best_bales;

                sellerIndex = content.data.negotiationBuyer;
               
                sellerIndex.broker_name = content.data.negotiationBuyer.broker_name;
                sellerIndex.prev_price =
                  content.data.negotiationBuyer.prev_price;
                sellerIndex.current_price =
                  content.data.negotiationBuyer.current_price;
                sellerIndex.seller_name =
                  content.data.negotiationBuyer.seller_name;
                sellerIndex.negotiation_by =
                  content.data.negotiationBuyer.negotiation_by;
                sellerIndex.prev_no_of_bales =
                  content.data.negotiationBuyer.prev_bales;
                sellerIndex.current_no_of_bales =
                  content.data.negotiationBuyer.current_bales;
              } else {
                console.log('newSeller>>>>>>>>>>>>>>>>>>>>>>>');
                find.best_price = content.data.negotiationBuyer.best_price;
                find.count = content.data.negotiationBuyer.negotiation_count;
                find.best_name = content.data.negotiationBuyer.best_dealer_name;
                find.best_bales = content.data.negotiationBuyer.best_bales;

                newSeller = content.data.negotiationBuyer;

                newSeller.broker_name = content.data.negotiationBuyer.broker_name;

                newSeller.prev_price = content.data.negotiationBuyer.prev_price;
                newSeller.current_price =
                  content.data.negotiationBuyer.current_price;
                newSeller.seller_name =
                  content.data.negotiationBuyer.seller_name;
                newSeller.negotiation_by =
                  content.data.negotiationBuyer.negotiation_by;
                newSeller.prev_no_of_bales =
                  content.data.negotiationBuyer.prev_bales;
                newSeller.current_no_of_bales =
                  content.data.negotiationBuyer.current_bales;
              }
            } else {
              find.prev_price = content.data.negotiationBuyer.prev_price;
              find.prev_no_of_bales = content.data.negotiationBuyer.prev_bales;
              find.current_price = content.data.negotiationBuyer.new_price;
              find.current_no_of_bales =
                content.data.negotiationBuyer.new_bales;

              sellerIndex = content.data.negotiationBuyer;

              sellerIndex.broker_name = content.data.negotiationBuyer.broker_name;
              sellerIndex.prev_price = content.data.negotiationBuyer.prev_price;
              sellerIndex.current_price =
                content.data.negotiationBuyer.new_price;
              //   sellerIndex.seller_name = content.data.negotiationBuyer.best_dealer_name;
              sellerIndex.negotiation_by =
                content.data.negotiationBuyer.negotiation_by;
              sellerIndex.prev_no_of_bales =
                content.data.negotiationBuyer.prev_bales;
              sellerIndex.current_no_of_bales =
                content.data.negotiationBuyer.new_bales;
            }

            let temp = JSON.parse(JSON.stringify(find));
            const oldData = JSON.parse(JSON.stringify(find));

            console.log(
              'find value >>>>>>>>>>> old data and new one',
              oldData,
              newSeller,
            );

            if (temp.negotiation_type == 'post')
              sellerIndex
                ? (temp.post_detail[sellerId] = sellerIndex)
                : (temp.post_detail = [newSeller, ...oldData.post_detail]);
            else
              sellerIndex
                ? (temp.notification_detail[sellerId] = sellerIndex)
                : (temp.notification_detail = [
                    newSeller,
                    ...oldData.notification_detail,
                  ]);

            console.log('temp>>>>>>>>>>>>>>', temp, oldData);
            const {arrNegotiationList} = this.state;
            arrNegotiationList[findInd] = temp;

            self.setState({arrNegotiationList});
          } else {
            this.getNegotiationListData();
          }

          //   if (find) {
          //     const arrNegotiationList = this.state.arrNegotiationList.map(item => {
          //       if(
          //           item.negotiation_type === 'post' ? item.post_id === content.data.negotiationBuyer.post_notification_id : item.notification_id === content.data.negotiationBuyer.post_notification_id)
          //           {
          //           let itemBuyer = {}
          //           if (content.data.negotiationBuyer.hasOwnProperty('best_price'))
          //           {
          //               item.best_price = content.data.negotiationBuyer.best_price;
          //               item.count = content.data.negotiationBuyer.negotiation_count;
          //               item.best_name = content.data.negotiationBuyer.best_dealer_name;
          //               item.best_bales = content.data.negotiationBuyer.best_bales;

          //               itemBuyer = content.data.negotiationBuyer

          //               itemBuyer.prev_price = content.data.negotiationBuyer.base_price;
          //               itemBuyer.current_price = content.data.negotiationBuyer.best_price;
          //               itemBuyer.seller_name = content.data.negotiationBuyer.best_dealer_name;
          //               itemBuyer.negotiation_by = content.data.negotiationBuyer.negotiation_by;
          //               itemBuyer.prev_no_of_bales = content.data.negotiationBuyer.base_bales;
          //               itemBuyer.current_no_of_bales = content.data.negotiationBuyer.best_bales;

          //                }else
          //                {

          //               item.prev_price = content.data.negotiationBuyer.prev_price;
          //               item.prev_no_of_bales = content.data.negotiationBuyer.prev_bales;
          //               item.current_price = content.data.negotiationBuyer.new_price;
          //               item.current_no_of_bales = content.data.negotiationBuyer.new_bales;

          //               itemBuyer = content.data.negotiationBuyer

          //               itemBuyer.prev_price = content.data.negotiationBuyer.prev_price;
          //               itemBuyer.current_price = content.data.negotiationBuyer.new_price;
          //             //   itemBuyer.seller_name = content.data.negotiationBuyer.best_dealer_name;
          //               itemBuyer.negotiation_by = content.data.negotiationBuyer.negotiation_by;
          //               itemBuyer.prev_no_of_bales = content.data.negotiationBuyer.prev_bales;
          //               itemBuyer.current_no_of_bales = content.data.negotiationBuyer.new_bales;
          //                }
          //                console.log('itemBuyer',itemBuyer)
          //           if (item.negotiation_type === 'post')
          //            item.post_detail.unshift(itemBuyer)
          //            else
          //            item.notification_detail.unshift(itemBuyer)

          //           return item
          //       }else{return item}} )
          //       console.log('users >>> same user nagotiate by notification>>>>>>>>>><<<<<<<<<',arrNegotiationList)

          // self.setState({ arrNegotiationList})
          //   }else{

          //       this.getNegotiationListData()

          //     //   const arrNegotiationList = this.state.arrNegotiationList.length > 0 ? [content.data.negotiationBuyer, ...this.state.arrNegotiationList] : [content.data.negotiationBuyer];
          //     // self.setState({ arrNegotiationList})
          //   }
        } else {
          // this.setState({ arrNegotiationList:[content.data.negotiationBuyer] })
          this.getNegotiationListData();
        }
        // console.log('this.,Nagotiations',content)
        // const newUsers = this.state.arrNotificationList ? [content.data.notificationSeller, ...this.state.arrNotificationList] : [content.data.notificationSeller];
        // this.setState({ arrNotificationList:  })

        // this.setState({ arrNotificationList:newUsers})

        // console.log('content >>> socket', content)
      },
    );

    // handleAndroidBackButton(exitAlert);

    // console.log('this.props', this.props.route)
    // if (this.props.navigation.isFocused() && this.props.route.name === 'HomeScreen')
    // handleAndroidBackButton(exitAlert);
  }
  onClickRespond = el => {
    console.log('el', el);
    let data = {};
    if (el.negotiation_type == 'post') {
      data = {
        cameFrom: 'Negotiation',
        post_id: el.post_detail[0].post_notification_id,
        sellerId: el.post_detail[0].seller_id,
        current_price: el.post_detail[0].current_price,
        current_no_of_bales: el.post_detail[0].current_no_of_bales,
        payment_condition: el.post_detail[0].payment_condition,
        transmit_condition: el.post_detail[0].transmit_condition,
        lab: el.post_detail[0].lab,
        type: el.negotiation_type,
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
        type: el.negotiation_type,
      };
    }
    this.props.navigation.navigate('DealDetails', {
      data: data,
      cameFrom: 'Negotiation',
      Title: el.product_name,
      type: el.negotiation_type,
      prevScrName: 'Dashboard',
    });
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
        fontFamily: 'Poppins-Regular',

      },
      dealTabTextBox2: {
        height: 40,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: theme.colors.textColor,
        fontFamily: 'Poppins-Regular',

      },
    });
    this.setState({spinner: true});
    this.getNegotiationListData();
  };

  getNegotiationListData = async () => {
    try {
      var self = this;
      self.setState({
        seller_id: await EncryptedStorage.getItem('user_id'),
        user_type: 'buyer',
        spinner:true
      });
      let data = {
        buyer_id: await EncryptedStorage.getItem('user_id'),
        offset: '0',
        limit: '50',
      };
      console.log('getNegotiationListData');
      console.log('Negotiation Request Param: ' + JSON.stringify(data));
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
          //     'my negotiation list response :',
          //     JSON.stringify(response.data.data),
          // );
          self.setState({
            arrNegotiationList: {},
            spinner: false,
            refreshing:false,
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
            refreshing: false,
            message: 'Something bad happened ' + error,
          }),
            alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
    }
  };

  onClickMultipleNegotiation = el => {
    console.log('el', el);
    this.props.navigation.navigate('MultipleNegotiationList', {
      data: el,
      prevScrName: 'HomeScreen',
      Title: el.product_name,
    });
  };

  _onRefresh = () => {
    this.setState({
      refreshing: true,
    
    })
    
    this.getNotificationListData();
    this.getNegotiationListData();

    // getCallNews(1);

  }


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
        fontFamily: 'Poppins-Regular',

      },
      dealTabTextBox1: {
        height: 40,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: theme.colors.textColor,
        fontFamily: 'Poppins-Regular',

      },
    });

    this.setState({spinner: true});
    this.getNotificationListData();
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
            refreshing:false
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
            refreshing: false,
            message: 'Something bad happened ' + error,
          }),
            alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
    }
  };

  createDashboardInNegotiationListUI = () => {
    try {
      // console.log(
      //     'Negotiation list: ' + JSON.stringify(this.state.arrNegotiationList),
      // );
      if (this.state.arrNegotiationList.length > 0) {
        return this.state.arrNegotiationList.map((el, i) => (
          //alert(el.best_price),
          <View key={i}>
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
                            fontFamily: 'Poppins-Regular',

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
                          fontFamily: 'Poppins-Regular',

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
                        fontFamily: 'Poppins-Regular',

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
                          fontFamily: 'Poppins-Regular',

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
                              fontFamily: 'Poppins-Regular',

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
                              paddingTop:5,
                              fontFamily: 'Poppins-Regular',
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
                            fontFamily: 'Poppins-Regular',

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
                            fontFamily: 'Poppins-Regular',
                            paddingTop: 5


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
                        fontFamily: 'Poppins-Regular',

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
                          fontFamily: 'Poppins-Regular',

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
                          fontFamily: 'Poppins-Regular',

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
                                                    fontFamily: 'Poppins-SemiBold',


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
                                                      fontFamily: 'Poppins-SemiBold',

                          textAlignVertical: 'center',
                        }}>
                        ₹ {el.notification_detail[0].current_price} (
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
                                                      fontFamily: 'Poppins-SemiBold',

                          textAlignVertical: 'center',
                        }}>
                        ₹ {el.post_detail[0].current_price} (
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
              <TouchableOpacity
                onPress={() => this.onClickMultipleNegotiation(el)}>
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
                        width: '30%',
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
                        ₹ {el.price} ({el.no_of_bales})
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
                        ₹ {el.best_price} ({el.best_bales})
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

  createDashboardNotificationListUI = () => {
    try {
      // console.log(
      //     'createDashboardNotificationListUI' +
      //     JSON.stringify(this.state.arrNotificationList),
      // );
      //let = await EncryptedStorage.getItem('user_id');
      if (this.state.arrNotificationList.length > 0) {
        return this.state.arrNotificationList.map((el, i) => (
          <View style={{backgroundColor: 'white'}} key={i}>
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
                    fontFamily: 'Poppins-Regular',

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
                    fontFamily: 'Poppins-Regular',

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
                    fontFamily: 'Poppins-Regular',

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
                    fontFamily: 'Poppins-Regular',

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
                    fontFamily: 'Poppins-Regular',

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
                      paddingTop:5,
                      fontFamily: 'Poppins-Regular',

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

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
        />}
         >
        <Spinner visible={this.state.spinner} color="#085cab" />
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
                  labelStyle={{ fontSize: 14, fontFamily: 'Poppins-SemiBold'}}>
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
                  labelStyle={{ fontSize: 14, fontFamily: 'Poppins-SemiBold'}}>
                  Deals
                </Button>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dealTopMainContainer}>
            <View style={this.state.dealTabStyle1}>
              <TouchableOpacity onPress={() => this.onClickNegotiation()}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[this.state.dealTabTextBox1, { paddingTop: 5 }]}>
                  In Negotiation
                </Text>
              </TouchableOpacity>
            </View>

            <View style={this.state.dealTabStyle2}>
              <TouchableOpacity onPress={() => this.onClickNotification()}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
        
                style={[this.state.dealTabTextBox2, {paddingTop:5}]}>
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
    );
  }
}

export default Dashboard;
