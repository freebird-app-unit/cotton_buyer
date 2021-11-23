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
    PermissionsAndroid, RefreshControl
} from 'react-native';
import { baseUrl } from '../components/Global';
import { fontSizeMyPostCenterText } from '../components/Global';
import { vLineMyPostStyle } from '../components/Global';
import { wfrInNegotiation } from '../components/Global';

import Background from '../components/Background';
import Header from '../components/Header';
import { Card } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Appbar, Searchbar, Button, Badge } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../core/theme';
import TextInput from '../components/TextInput';
import api_config from '../Api/api';
import axios from 'axios';
import Plus from '../assets/Plus';
import Bell_Icon from '../assets/Bell';
import History_Icon from '../assets/History';
import Newsfeed_Icon from '../assets/NewsFeed';
import MCX_Icon from '../assets/MCX';
import Calculator_Icon from '../assets/Calculator';
import ChangePassword_Icon from '../assets/ChangePassword';
import Profile_Icon from '../assets/Profile';
import Reports_Icon from '../assets/Reports';
import TransactionTracking_Icon from '../assets/TransactionTracking';
import { fieldValidator } from '../helpers/fieldValidator';
import { priceValidator } from '../helpers/priceValidator';
import MyPostGreen_Icon from '../assets/MyPostGreen';
import defaultMessages from '../helpers/defaultMessages';
import { Picker } from '@react-native-picker/picker';
//svgs
import Home from '../assets/Home';
import NoRecordsFound_Icon from '../assets/NoRecodsFound';
import SearchToSell_Icon from '../assets/SearchToSell';
import PostToSell_Icon from '../assets/PostToSell';
import MyPost_Icon from '../assets/MyPost';
import MyContracts_Icon from '../assets/MyContracts';
import Logout_Icon from '../assets/Logout';
import NotificationToBuyer_Icon from '../assets/NotificationToBuyer';
import Employee from '../assets/Employee';
import EmployeeGray from '../assets/EmployeeGray';
import CustomerIcon from '../assets/CustomerIcon';
import FilterSettings from '../assets/FilterSettings';
import Minus from '../assets/Minus';
import MPIcon1 from '../assets/MPIcon1';
import MPIcon2 from '../assets/MPIcon2';
import PlusRound from '../assets/PlusRound';
import MinusRound from '../assets/MinusRound';
import SetPassword from '../assets/SetPassword';
import EncryptedStorage from 'react-native-encrypted-storage';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NewsFeedView from '../components/NewsFeedView';
import Profile from '../components/Profile'
import Wallet from '../components/Wallet';
import Wallet_Icon from '../assets/Wallet'
import CalculatorView from '../components/CalculatorView';
import io from "socket.io-client";
import styles from './Styles'
if (!window.location) {
    // App is running in simulator
    window.navigator.userAgent = 'ReactNative';
}

const socket = io.connect('http://cottontradecentre.com:6001', { transports: ['websocket'] }); //live

import {
    handleAndroidBackButton,
    removeAndroidBackButtonHandler
} from '../helpers/backHandler'
import {
    exitAlert
} from '../helpers/customAlert';
import RNFetchBlob from 'rn-fetch-blob';


const Data = [
    {
        label:'HomeScreen',
        Title:'Home',
        Icon : <Home />
    },
    {
        label: 'PostToBuy',
        Title: 'Post To Buy',
        Icon: <PostToSell_Icon />
    },
    {
        label: 'SearchToBuy',
        Title: 'Search To Buy',
        Icon: <SearchToSell_Icon />
    },
     {
         label: 'NotificationToSeller',
         Title: 'Notification to seller',
         Icon: <NotificationToBuyer_Icon />
    },
    {
        label: 'MyPost',
        Title: 'My Post',
        Icon: <MyPost_Icon />
    },
    {
        label: 'MyContract',
        Title: 'My Contracts',
        Icon: <MyContracts_Icon />
    },
    {
        label: 'ReportScreen',
        Title: 'Reports',
        Icon: <Reports_Icon />
    },
    // {
    //     label: 'HomeScreen',
    //     Title: 'Transaction Tracking',
    //     Icon: <TransactionTracking_Icon />
    // },
    // {
    //     label: 'HomeScreen',
    //     Title: 'History',
    //     Icon: <History_Icon />
    // },
    {
        label: 'NewsFeed',
        Title: 'News Feed',
        Icon: <Newsfeed_Icon />
    },
    {
        label: 'McxScreen',
        Title: ' MCX',
        Icon: <MCX_Icon />
    },
    {
        label: 'Calculator',
        Title: 'Calculator',
        Icon: <Calculator_Icon />
    },
    {
        label: 'Wallet',
        Title: 'Wallet',
        Icon: <Wallet_Icon />
    },
    {
        label: 'Profile',
        Title: 'Profile',
        Icon: <Profile_Icon />
    },
    {
        label: 'Brokers',
        Title: 'Brokers',
        Icon: <Profile_Icon />
    },
    {
        label: 'ChangePasswordScreen',
        Title: 'Change Password',
        Icon: <ChangePassword_Icon />
    },
    
    
    // onClickChangePassword = () => {
    //     this.setState({
    //         isMenuOpen: false,
    //     });
    //     this.props.navigation.navigate('ChangePasswordScreen');
    // };
    
    
    
]

const NavigationButton = (props) => {
    // console.log('this',props)
    return (<TouchableOpacity onPress={() => props.props.navigation.navigate(props.label)}>
        <View
            style={{
                flexDirection: 'row',
                paddingTop: '4%',
                paddingLeft: '5%',
                alignItems: 'center',
            }}>
            {props.children}
            <Button
                mode="text"
                uppercase={false}
                color={theme.colors.blackBG}
                labelStyle={{ fontWeight: 'normal', height: 20 }}>
                {props.Title}
                    </Button>
        </View>
    </TouchableOpacity>)
}

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState,
            loading: 'true',
            
            spinner: false,
            
        };

       
    }

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
                { text: 'OK', onPress: () => this.logout() },
            ],
        );
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
        await EncryptedStorage.setItem('user_id', null)
        this.props.navigation.navigate("LoginScreen");
    };
    


    render() {
      
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: theme.colors.blackBG,
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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
<View style = { styles.container2 } >

            <ScrollView showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>

                    {Data.map(item => (
                        <NavigationButton props={this.props} label={item.label} Title={item.Title} >
                        {item.Icon}
                    </NavigationButton>
                    ))}


                <TouchableOpacity onPress={() => this.onClickLogout()}>
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
                            labelStyle={{ fontWeight: 'normal' }}>
                            Logout
                    </Button>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            </View></View>
    )
}
}