import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, RefreshControl, Platform } from 'react-native';
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

import { io } from "socket.io-client";
if (!window.location) {
    // MCXScreen is running in simulator
    // console.log('sdfsdf', window.navigator)
    window.navigator.userAgent = 'ReactNative';
}
// window.navigator.userAgent = 'ReactNative';

const connectionConfig = {
    jsonp: false,
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionAttempts: 5000,
    transports: ['websocket']/// you need to explicitly tell it to use websockets
};



const socket = io.connect('http://165.232.181.91:3000/', connectionConfig); //live
socket.connect()



const MCXScreen = ({ navigation }) => {

    useEffect(() => {


        // console.log('d>>>>',d)

        console.log('connect')
        socket.connect()


        socket.on(
            'McxEvent',
            content => {
                // console.log('content >>> 1', content.data.Mcx.parameters.length);

                // global.Notification = content.data.notificationSeller
                let d = mcxData.filter(item => content.data.Mcx.parameters.map(it => {
                    if (it.name.startsWith(item.name)) {
                        item.name = it.name,
                            item.value = it.value
                        return item
                    } else {
                        // console.log('it', it)

                        return it
                    }
                }
                ))

                // console.log('d',d.length);
                setmcxData(d)
            },
        );

        // socket.on(
        //     'McxEvent',
        //     content => {
        //         console.log('>>>>>', content)
        //         setmcxData(content.parameters)
        //     }

        // )
    }, [])

    var date = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getYear().toString().substr(-2);

    // console.log('yerar>>>',year)

    let b = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC']

    const datemonth = date + ' ' + b[month] + ' ' + '2021'

    const [availabeBalance, setBalance] = useState('')

    const [isLogin, setLogin] = useState(true)



    const [loading, setLoader] = useState(false)
    const [mcxData, setmcxData] = useState([{ name: 'COTTON21DECFUT', value: '--' }, { name: 'COTTON22APRFUT', value: '--' },
    {
        name: 'COTTON22FEBFUT', value: '--'
    }, {
        name: 'COTTON22JANFUT', value: '--'
    },
    {
        name: 'USDINR21DECFUT', value: '--'
    }, {
        name: 'USDINR22JANFUT', value: '--'
    }, {
        name: 'USDINR22FEBFUT', value: '--'
        
    },
    { name: 'KAPAS22APRFUT', value: '--' }, { name: 'KAPAS22FEBFUT', value: '--' }])

    // const [mcxData, setmcxData] = useState([{ name: `COTTON${year}${b[month]}FUT`, value: '--' },
    // { name: `KAPAS${year}${b[month]}FUT`, value: '--' }, {
    //     name: `USDINR${year}${b[month]}FUT`, value: '--'
    // }])
    const ListTransaction = () => {
        try {
            setLoader(true)



            let data = {
                parameters: {
                    cotton: "20.00", cocudakl: "300.00", kapas: "40.00", usdinr: "10.00"
                }

            };
            // console.log("getNegotiationListData");
            console.log('requested params: ', data);
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));
            axios({
                url: api_config.BASE_URL + api_config.GET_MCX_DATA,
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer Pk0X15IVt07nPmvQPmtwMvRJKf4jlLncg1AHqmbvKBsybxAANf7ouAqlMJbAznLpPkAxaJjzvmIDszhk3WTZvcEaJv'

                },
            }).then(async function (response) {
                setLoader(false)
                serRefresh(false);
                console.log('response', response)

                if (response.status == 200) {

                    console.log('response', response.data)

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
                    console.log('error', JSON.stringify(error))
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
        // console.log('item', item)
        return (
            <View style={{ flexDirection: 'column', borderBottomColor: 'lightgray', borderBottomWidth: 0.5 }}>
                <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', width: wp(94), marginVertical: hp(1) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            fontSize: hp(2),
                            color: theme.colors.text,
                            fontFamily: "Poppins-Bold",
                            fontWeight: 'bold'
                        }}>
                            {item.name}
                        </Text>
                        <Text style={{
                            fontSize: hp(2),
                            color: theme.colors.text,
                            opacity: 0.5,
                            fontFamily: "Poppins-Regular",
                            marginLeft: wp(2)

                        }}>
                            MCX
                        </Text>
                    </View>
                    <Text style={{
                        fontSize: hp(2),
                        color: theme.colors.text,
                        fontFamily: "Poppins-Bold",
                        fontWeight: 'bold',

                    }}>
                        {item.value}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', width: wp(94), marginVertical: hp(1) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>
                            {datemonth}
                        </Text>
                        <Text style={{
                            fontSize: hp(2),
                            color: theme.colors.text,
                            opacity: 0.5,
                            fontFamily: "Poppins-Regular",
                            marginLeft: wp(2)
                        }}>
                            FUT
                        </Text>
                    </View>
                    <Text style={{
                        fontSize: hp(2),
                        color: theme.colors.text,
                        fontFamily: "Poppins-Bold",
                        fontWeight: 'bold'
                    }}>
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
                    <FlatList data={mcxData}
                        renderItem={renderItem}
                        // renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                        keyExtractor={(item, index) => index}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={_onRefresh}
                            />
                        }
                    />
                </View>
            </View>
        </View>
    )
}


export default MCXScreen