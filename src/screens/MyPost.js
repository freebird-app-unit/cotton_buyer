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
    RefreshControl
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

    createMyPostAttribute = attributeArray => {
        try {
            if (attributeArray.length > 0) {
                return attributeArray.map((el, i) => (
                    <View style={{ flex: 1 }}>
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

    createMyPostUI = () => {
        try {
            if (this.state.isMyPostActiveClicked) {
                if (this.state.myActivePost.length > 0) {
                    return this.state.myActivePost.map((el, i) => (
                        <TouchableOpacity
                            onPress={() => this.onClickMyPostDetails(el, 'active')}>
                            <View style={{ width: '100%' }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginLeft: '5%',
                                        marginRight: '5%',
                                        height: 40,
                                    }}>
                                    <View style={{ marginTop: 5, marginRight: 10 }}>
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
                                    <View style={{ flex: 1, marginTop: 10 }}>
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
                            onPress={() => this.onClickMyPostDetails(el, el.status)}>
                            <View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginLeft: '5%',
                                        marginRight: '5%',
                                        height: 40,
                                    }}>
                                    <View style={{ marginTop: 5, marginRight: 10 }}>
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
                                    <View style={{ flex: 1 }}>
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
                                        <View style={{ flex: 1 }}>
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
                                        <View style={{ flex: 1 }}>
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

    componentDidMount() {
        this.getMyActivePost();
    }

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
            if (this.state.displayBalesCount == 0) {
                alert(defaultMessages.en.required.replace('{0}', 'bales'));
                return false;
            }

            return true;

        } catch (error) {
            console.log(error);
        }
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


    getMyActivePost = async () => {
        try {
            var self = this;
            let data = { buyer_id: await EncryptedStorage.getItem('user_id') };

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
                        refreshing:false
                    });
                    self.setState({ myActivePost: {} });
                    if (response.data.status == 200) {
                        self.setState({ myActivePost: response.data.data });
                    } else {
                        // alert(response.data.message);
                    }
                })
                .catch(function (error) {
                    self.setState({
                        spinner: false,
                        message: 'Something bad happened ' + error,
                        refreshing:false
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
                    self.setState({ myActivePost: [], spinner: false,refreshing:false });
                    if (response.data.status == 200) {
                        self.setState({ myActivePost: response.data.data });
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(function (error) {
                    self.setState({
                        spinner: false,
                        message: 'Something bad happened ' + error,
                        refreshing:false
                    }),
                        alert(defaultMessages.en.serverNotRespondingMsg);
                });
        } catch (error) {
            console.log(error);
        }
    };

    onClickMyPostDetails = (obj, status) => {
        console.log('MypostDetails -' + obj.type);
        this.props.navigation.navigate('MyPostDetails', {
            data: obj,
            status: status,
            type: obj.type
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

    _onRefresh = () => {
        this.setState({
            refreshing: true
        })
        this.getMyActivePost();
        this.getMyCompletedPost
        // getCallNews(1);

    }

    render() {
        return (

            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />
            }>
                <Spinner visible={this.state.spinner} color="#085cab" />

                <View style={{ marginTop: 20 }}>
                    <View style={styles.container}>
                        <View style={this.state.btnActiveContainer}>
                            <TouchableOpacity onPress={() => this.onClickActive()}>
                                <Button
                                    mode="text"
                                    uppercase={false}
                                    color={this.state.btnActiveTextColor}
                                    labelStyle={{ fontSize: 14 }}>
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
                                    labelStyle={{ fontSize: 14 }}>
                                    Completed
                                </Button>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {this.createMyPostUI()}
                    {this.createMyPostCompletedUI()}
                </View>
            </ScrollView>

        )
    }
}

export default App