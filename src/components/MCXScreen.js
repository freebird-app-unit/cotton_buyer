import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, RefreshControl,Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from './responsive-ratio';
import { Button } from './Button';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { theme } from '../core/theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { WebView } from 'react-native-webview';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Avatar } from 'react-native-paper';
import axios from 'axios';
import api_config from '../Api/api';
import EncryptedStorage from 'react-native-encrypted-storage';
import defaultMessages from '../helpers/defaultMessages';
import Spinner from 'react-native-loading-spinner-overlay';

const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.parse(JSON.stringify(window.location)));
})();`;

const App = ({ navigation }) => {


    const [availabeBalance, setBalance] = useState('')

    const [isLogin,setLogin] = useState(true)

    const [transaction, setTransaction] = useState(
        [
            {
                title: 'Today',
                data: [{
                    transactionDetail: 'Added to a wallet',
                    debited: true,
                    time: '09:00 pm',
                    closing_balance: '10,000',
                    trans_balance: '10,000',
                    wallet: true,
                    broker: false,
                    planRecharge: false
                }, {
                    transactionDetail: 'Added to a wallet',
                    debited: false,
                    time: '09:00 pm',
                    closing_balance: '10,000',
                    trans_balance: '10,000',
                    wallet: false,
                    broker: true,
                    brokerName: 'John Deo',
                    planRecharge: false

                },
                {
                    transactionDetail: 'Added to a wallet',
                    time: '09:00 pm',
                    closing_balance: '10,000',
                    trans_balance: '10,000',
                    wallet: false,
                    broker: false,
                    brokerName: 'John Deo',
                    debited: false,
                    planRecharge: true,
                    planValue: '5000',

                },
                ]
            },
            {
                title: '10-10-2021',
                data: [{
                    transactionDetail: 'Added to a wallet',
                    debited: true,
                    time: '09:00 pm',
                    closing_balance: '10,000',
                    trans_balance: '10,000',
                    wallet: true,
                    broker: false,
                    planRecharge: false
                }, {
                    transactionDetail: 'Added to a wallet',
                    debited: false,
                    time: '09:00 pm',
                    closing_balance: '10,000',
                    trans_balance: '10,000',
                    wallet: false,
                    broker: true,
                    brokerName: 'John Deo',
                    planRecharge: false

                },
                {
                    transactionDetail: 'Added to a wallet',
                    time: '09:00 pm',
                    closing_balance: '10,000',
                    trans_balance: '10,000',
                    wallet: false,
                    broker: false,
                    brokerName: 'John Deo',
                    debited: false,
                    planRecharge: true,
                    planValue: '5000',

                },
                ]
            },
        ]
    )

    const [loading, setLoader] = useState(false)


    const ListTransaction = async () => {
        try {
            // setListView(true)
            setLoader(true)
            https://kite.zerodha.com/connect/login?v=3&api_key=xxx
            // // var ws = new WebSocket("wss://ws.kite.trade?api_key=m1vw42v3z6f7iny1&access_token=xxxx");
            // var message = { "a": "subscribe", "v": [408065, 884737] };
            // ws.send(JSON.stringify(message))
            var api_key = 'm1vw42v3z6f7iny1';

            let data = {
                user_id: await EncryptedStorage.getItem('user_id'),
                user_type: 'seller'
            };
            // console.log("getNegotiationListData");
            // console.log('Negotiation Request Param: ' + JSON.stringify(data));
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            axios({
                url: `https://kite.zerodha.com/connect/login?v=3&api_key=${api_key}`,
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(function (response) {
                    setLoader(false)
                    serRefresh(false);

                    console.log(
                        'my login :>>>>>>>>>>>>>>>>>>>',
                        response
                    );
                    if (response.data.status == 200) {



                        // let bro = response.data.data.filter(item => item.type === 'default')
                        // DefaultBrokerList(bro);
                        // let Brokernotdefault = response.data.data.filter(item => item.type === 'not_default')
                        // setBalance(response.data.data.wallet_amount);
                        // setTransaction(response.data.data.transaction_history);

                        // self.setState({ ProfileData: response.data.data, spinner: false, });
                    } else {
                        // setListView(false)

                        console.log('hi_______', response.data.message);
                    }
                })
                .catch(function (error) {
                    // self.setState({
                    //     spinner: false,
                    //     message: 'Something bad happened ' + error,
                    // }),
                    // setListView(false)
                    setLoader(false)
                    serRefresh(false);

                    alert(defaultMessages.en.serverNotRespondingMsg);
                });
        } catch (error) {
            console.log(error);
            setLoader(false)
            serRefresh(false);

            // setListView(false)

        }
    }

    useEffect(() => {
        console.log('hi')
        ListTransaction()
    }, [])

    const [refreshing, serRefresh] = useState(false)

    const _onRefresh = () => {
        serRefresh(true);
        ListTransaction();

    }

    const styles = {
        label: {
            fontSize: hp(2.1),
            color: theme.colors.text,
            fontWeight: 'bold',
            fontFamily: 'Poppins - Bold'
        },
        balance: {
            fontSize: hp(3), fontFamily: 'Poppins - Bold',
            fontWeight: 'bold'
        },
        time: {
            fontSize: hp(1.5),
            opacity: 0.5,
            fontFamily: 'Poppins - Regular'
        },
        sectionHeader: {
            marginVertical: hp(1.5),
            // paddingLeft: 10,
            // paddingRight: 10,
            // paddingBottom: hp(1),
            fontSize: hp(2.1),
            fontFamily: 'Poppins-Bold',
            color: "#333",
            opacity: 0.5
            // backgroundColor: '#8fb1aa',  
        }
    }
    const renderItem = ({ item }) => {
        console.log('item', item)
        return (
            <View style={{flexDirection:'column'}}>
            <View style={{ flexDirection: 'row', alignSelf: 'center',justifyContent:'space-between', width: wp(94), marginVertical: hp(1) }}>
                <View style={{flexDirection:'row'}}>
                    <Text>
                        hi
                    </Text>
                    <Text>
                        hi
                    </Text>
                </View>
                <Text>
                    hi
                </Text>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center',justifyContent:'space-between', width: wp(94), marginVertical: hp(1) }}>
                <View style={{flexDirection:'row'}}>
                    <Text>
                        hi
                    </Text>
                    <Text>
                        hi
                    </Text>
                </View>
                <Text>
                    hi
                </Text>
            </View>
            </View>
        )
    }

    const _onLoad = (state) => {

        console.log('state', state);
     
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: hp(1), paddingHorizontal: wp(3) }}>
            <Spinner visible={loading} color="#085cab" />

            <View style={{ flex: 1, marginTop: hp(2) }}>
               
                    
                
                
                <View style={{
                    flex: 1
                }}>
                    {isLogin ? (<WebView
                        style={{
                            overflow: 'scroll'
                        }}
                        source={{
                            uri: 'https://kite.zerodha.com/connect/login?v=3&api_key=m1vw42v3z6f7iny1&redirect_params=some%3DX%26more%3DY'
                        }}
                        onNavigationStateChange={_onLoad}
                        useWebKit={Platform.OS == 'ios'}
                        injectedJavaScript={INJECTED_JAVASCRIPT}
                        // onMessage={this.onMessage}
                    />):(
                    <FlatList data={[1,2]}
                    renderItem={renderItem}
                    // renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={_onRefresh}
                        />
                    }
                    />)}
                </View>
            </View>
        </View>
    )
}


export default App