import React, { Component } from 'react';
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
import { baseUrl } from '../components/Global';
import { fontSizeMyPostCenterText } from '../components/Global';
import { vLineMyPostStyle } from '../components/Global';
import Background from '../components/Background';
import Header from '../components/Header';
import { Card, CheckBox } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Appbar, Searchbar, Button, Badge } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../core/theme';
import TextInput from '../components/TextInput';
import EncryptedStorage from 'react-native-encrypted-storage';
import defaultMessages from '../helpers/defaultMessages';
import { fieldValidator } from '../helpers/fieldValidator';
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
import styles from './Styles'

import {
    handleAndroidBackButton,
    removeAndroidBackButtonHandler,
} from '../helpers/backHandler';
import { exitAlert } from '../helpers/customAlert';
import RNFetchBlob from 'rn-fetch-blob';

const socket = io.connect('http://cottontradecentre.com:6001', { transports: ['websocket'] }); //live

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ids: [],
            selectedIDs: [],
            appState: AppState.currentState,
            loading: 'true',
            userID: 0,
            spinner: true,
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
            itemsSellerType:[],
            valueSellerType:'',
            ProfileData: [],
            openState: false,
            deValue: null,
            deOpenState: false,
            buyForOpenState: false,
            LengthinputData: [],

            buyForValue: null,
            deName: 'Domestic',
            buyForDropDownValue: 'Self',
            deList: [
                { label: 'Domestic', value: 'Domestic' },
                { label: 'Export', value: 'Export' },
            ],
            buyForList: [
                { label: 'Self', value: 'Self' },
                { label: 'Other', value: 'Other' },
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
                { label: 'Maharashtra', value: '1' },
                { label: 'Rajasthan', value: '2' },
                { label: 'Punjab', value: '3' },
                { label: 'Karnatak', value: '4' },
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

        // 
        // this.setValue = this.setValue.bind(this);
        // this.setOpenState = this.setOpenState.bind(this);
        // this.setItemsState = this.setItemsState.bind(this);

        // this.setDEValue = this.setDEValue.bind(this);
        // this.setDEOpenState = this.setDEOpenState.bind(this);
        // this.setDEItemsState = this.setDEItemsState.bind(this);

        // this.setBuyForValue = this.setBuyForValue.bind(this);
        // this.setBuyForOpenState = this.setBuyForOpenState.bind(this);
        // this.setBuyForItemsState = this.setBuyForItemsState.bind(this);
    }
    onClickMinusPTB = () => {
        try {
            if (this.state.displayBalesCount - this.state.balesCount != 0) {
                if (this.state.displayBalesCount > 0) {
                    this.state.displayBalesCount =
                        this.state.displayBalesCount - this.state.balesCount;
                    this.setState({ displayBalesCount: this.state.displayBalesCount });
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
            this.setState({ displayBalesCount: this.state.displayBalesCount });
        } catch (error) {
            console.log(error);
        }
    };





    crateProductAttributeUI = () => {
        try {
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
                    <Text style={{ width: '35%', color: theme.colors.textColor,fontFamily:'Poppins-Regular' }}>
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
                                                :  el.label}
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
                                        style={{ marginRight: 20 }}
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

        } catch (error) {
            console.log(error);
        }
    };

    componentDidMount() {
        this.getRegistrationDropDownData()
        this.getProductListAPI()
        // this.setDEFlages({ label: 'Domestic', value: 'Export' });

        this.state.productItem.map((el, i) => {
            if (i == 0) {
                return (
                    this.setState({ dropdownPlaceholder: el.label }),
                    this.getProductAttributeAPI(el.value)
                );
            }
        });
    }
    getRegistrationDropDownData = () => {
        console.log('hi>>')
        var self = this;
        axios({
            url: api_config.BASE_URL + api_config.REGISTRATION_SCREEN_DROPDOWN_DATA,
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(function (response) {
                console.log('Response 111: ' + new Date());
                self.setState({
                    spinner: false,
                })

                console.log('response.data.data[0].buyer_type', response.data.data[0].seller_type)

                let sellerListData = response.data.data[0].seller_type;
                let setlist = []
                let obj = {}
                for (let i = 0; i < response.data.data[0].seller_type.length; i++) {

                    obj = { label: sellerListData[i].name, value: sellerListData[i].id }
                    setlist.push(obj)
                    
                }

                self.setState({ itemsSellerType: setlist })

               
                console.log('Response 123: ' + new Date());
            })
            .catch(function (error) {
                self.setState({
                    spinner: false,
                })
                console.log('error>>>>', JSON.stringify(error))
                alert(defaultMessages.en.serverNotRespondingMsg);
            });
    };
    addValuesSearchBuyer = (text, label, itemId, index, rangeType) => {
        if (label === 'Length(mm)') {
            let dataArray = this.state.LengthinputData;
            let checkBool = false;
            if (dataArray.length !== 0) {
                dataArray.forEach(element => {

                    if (element.index === index) {
                        if (rangeType == 'from') {
                            element.from = text;
                            checkBool = true;
                        } else if (element.hasOwnProperty('from')) {
                            console.log('element.from>>>>', element.from)

                            if (parseFloat(element.from) >= parseFloat(text) || parseFloat(element.from) === parseFloat(text)) {
                                alert("Invalid selection")
                                element.to = 0;
                                return
                            } else {
                                element.to = text;
                                checkBool = true;
                            }
                        } else {
                            alert("please select first from")

                        }
                    }
                });
            }
            if (checkBool) {
                this.setState({
                    LengthinputData: dataArray,
                });
            } else {

                if (rangeType == 'from') {
                    dataArray.push({
                        attribute: label,
                        attribute_value: text,
                        index: index,
                        itemId: itemId,
                        from: text,
                        to: 0
                    });
                }
                else {
                    alert('please select starting value first')
                }
                this.setState({
                    LengthinputData: dataArray,
                });
            }
        } else {
            let dataArray = this.state.inputData;
            let checkBool = false;
            if (dataArray.length !== 0) {
                dataArray.forEach(element => {
                    if (element.index === index) {
                        if (rangeType == 'from') {
                            element.from = text;
                            checkBool = true;
                        } else {
                            if (parseFloat(element.from) >= parseFloat(text)) {
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

                if (rangeType == 'from') {
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
        }
    };
    Fromselectmarg = (item, from) => {
        console.log('item', item, from)
        if (item < from) {
            alert('please select smallert value than to value or change the to value')
            this.fromselectRef.openDropdown()
        }
        else if (item == from) {
            alert('please select deiffrent')
            this.fromselectRef.openDropdown()
        }
        else { }

        // (item > from) ? null :  this.fromselectRef.openDropdown();
    }

    selectmarg = (item, selected) => {
        console.log('item', item, selected)

        if (item > selected)
            alert('please select bigger value than from value or change the from value')
        else
            alert('please select deiffrent')

        this.selectRef.openDropdown();
    }
    // addValuesSearchBuyer = (text, label, itemId, index, rangeType) => {
    //     let dataArray = this.state.inputData;
    //     let checkBool = false;
    //     if (dataArray.length !== 0) {
    //         dataArray.forEach(element => {
    //             if (element.index === index) {
    //                 if (rangeType == 'from') {
    //                     element.from = text;
    //                     checkBool = true;
    //                 } else {
    //                     if (parseFloat(element.from) >= parseFloat(text)) {
    //                         alert("Invalid selection")
    //                         element.to = 0;
    //                     } else {
    //                         element.to = text;
    //                         checkBool = true;
    //                     }
    //                 }
    //             }
    //         });
    //     }
    //     if (checkBool) {
    //         this.setState({
    //             inputData: dataArray,
    //         });
    //     } else {

    //         if (rangeType == 'from') {
    //             dataArray.push({
    //                 attribute: label,
    //                 attribute_value: text,
    //                 index: index,
    //                 itemId: itemId,
    //                 from: text,
    //                 to: 0
    //             });
    //         }
    //         this.setState({
    //             inputData: dataArray,
    //         });
    //     }
    //     console.log('Add Values: ' + JSON.stringify(this.state.inputData));
    // };

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
                        self.setState({ productItem: arrProductList });
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
            this.setState({ selectedProductID: productID });

            var self = this;
            let data = { product_id: productID };

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
                    console.log(
                        'response PRODUCT_ATTRIBUTE_LIST:',
                        JSON.stringify(response.data),
                    );
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

            let attrValue = this.getProductAttributeArray();
            if (attrValue.length == 0) {
                alert(defaultMessages.en.required.replace('{0}', 'atribute value'));
                return false;
            }

            if (this.state.valueSellerType == '') {
                alert(defaultMessages.en.selectValidation.replace('{0}', 'seller type'));
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

    onChanged(text) {
        this.setState({
            balesPrice: text.replace(/[^0-9]/g, ''),
        });
    }

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
          seller_type:this.state.valueSellerType,
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

    setSpinningnameFlages = selectedItem => {
        this.setState({ buyForDropDownValue: selectedItem.label });

        if (selectedItem.label == 'Other') {
            this.setState({ isShowSpinningName: true });
        } else {
            this.setState({ isShowSpinningName: false });
        }
    };

    setDEFlages = selectedItem => {
        this.setState({ deName: selectedItem.label });

        if (selectedItem.label == 'Domestic') {
            this.setState({ isShowBuyForDrpDown: true });
        } else {
            this.setState({ isShowBuyForDrpDown: false });
            this.setState({ isShowSpinningName: false });
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
                let attributeArray = { attribute_array: this.getProductAttributeArray() };
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

    render() {
        return (

            <ScrollView>
                <View style={{ marginTop: 20 }}>
                    <View
                        style={{
                            height: 50,
                            width: '90%',
                            marginTop: 15,
                            marginLeft: '5%',
                        }}>
                        <Spinner visible={this.state.spinner} color="#085cab" />

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
                                        style={{ marginRight: 20 }}
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
                                fontFamily:'Poppins-SemiBold'
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
                                    height: 45,
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
                        <Text style={{ width: '35%', color: theme.colors.textColor,fontFamily:'Poppins-SemiBold' }}>
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
                                    fontFamily: 'Poppins-SemiBold'
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
                        <Text style={{ width: '35%', color: theme.colors.textColor, fontFamily: 'Poppins-Medium' }}>
                            Seller Type
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
                        data={this.state.itemsSellerType}
                        defaultValue={this.state.itemsSellerType}
                        onSelect={(selectedItem, index) => {
                            // setSellerTypeError(null);
                            this.setState({
                                valueSellerType: selectedItem.label
                            })
                            // setValueSellerType(selectedItem.label);
                        }}
                        buttonStyle={styles.dropdown3BtnStyle}
                        renderCustomizedButtonChild={(selectedItem, index) => {
                            return (
                                <View style={styles.dropdown3BtnChildStyle}>
                                    <Text style={styles.dropdown3BtnTxt}>
                                        {selectedItem ? selectedItem.label : 'seller Type'}
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
                                    style={{ marginRight: 20 }}
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
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: '5%',
                            marginTop: 10,
                            marginRight: '5%',
                            height: 20,
                            alignItems: 'center',
                        }}>
                        <Text style={{ width: '35%', color: theme.colors.textColor }}>
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
                                        style={{ marginRight: 20 }}
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
                                    style={{ width: '35%', color: theme.colors.textColor }}>
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
                                                style={{ marginRight: 20 }}
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
                                        this.setState({ txtSpinningMillName: text })
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
                        contentStyle={{ height: 50 }}
                        style={{ width: '90%', marginLeft: '5%', marginTop: 20 }}
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

        )
    }
}

export default App