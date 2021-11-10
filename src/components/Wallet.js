import React, { useState,useEffect } from 'react';
import { View, Text, SectionList,RefreshControl } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from './responsive-ratio';
import { Button } from './Button';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { theme } from '../core/theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Avatar } from 'react-native-paper';
import axios from 'axios';
import api_config from '../Api/api';
import EncryptedStorage from 'react-native-encrypted-storage';
import defaultMessages from '../helpers/defaultMessages';
import Spinner from 'react-native-loading-spinner-overlay';

const App = ({ navigation }) => {


   const[availabeBalance,setBalance] = useState('')

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

            let data = {
                user_id: await EncryptedStorage.getItem('user_id'),
                user_type:'buyer'
            };
            // console.log("getNegotiationListData");
            // console.log('Negotiation Request Param: ' + JSON.stringify(data));
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            axios({
                url: api_config.BASE_URL + api_config.TRANSACTION_HISTORY,
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(function (response) {
                    setLoader(false)
                    serRefresh(false)
                    console.log(
                        'my wallet :>>>>>>>>>>>>>>>>>>>',
                        response.data.data
                    );
                    if (response.data.status == 200) {



                        // let bro = response.data.data.filter(item => item.type === 'default')
                        // DefaultBrokerList(bro);
                        // let Brokernotdefault = response.data.data.filter(item => item.type === 'not_default')
                        setBalance(response.data.data.wallet_amount);
                        setTransaction(response.data.data.transaction_history);

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
                    serRefresh(false)
                    alert(defaultMessages.en.serverNotRespondingMsg);
                });
        } catch (error) {
            console.log(error);
            setLoader(false)
            serRefresh(false)
            // setListView(false)

        }
    }

    // useEffect(() => {
    //     console.log('hi')
    //     ListTransaction()
    // }, [])

    useEffect(async () => {

        const willFocusSubscription = navigation.addListener('focus', () => {
            ListTransaction();
        });

        return willFocusSubscription;



    }, [])



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
        console.log('item',item)
        return (
            <View style={{ flexDirection: 'row', alignSelf: 'center', width: wp(94), marginVertical: hp(1) }}>
                <View style={{ alignItems: 'flex-start', justifyContent: 'center', width: wp(10) }}>
                <Ionicons name={'wallet-outline'} size={hp(3)} color='#333' />

                    {/* {item.type != 'withdraw' && <Ionicons name={'wallet-outline'} size={hp(3)} color='#333' />} */}
                    {/* {item.broker && <Avatar.Text size={hp(3)} labelStyle={{ fontSize: hp(2.5) }} label="JD" backgroundColor={'transparent'} />}
                    {item.planRecharge && <View style={{
                        height: hp(3.5),
                        justifyContent: 'center', alignItems: 'center', width: hp(3.5), borderWidth: 0.5, borderColor: '#333',
                        borderRadius: hp(2)
                    }}><FontAwesome name={'rupee'} size={hp(2.7)} color='#333' /></View>} */}

                </View>
                <View style={{ width: wp(70), flexDirection: 'column', alignSelf: 'center', marginHorizontal: wp(2) }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        {item.message && <Text style={styles.label}>{item.message}</Text>}
                       

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name={item.type != 'withdraw' ? 'add-outline' : 'remove-outline'} size={hp(1.7)}
                                color={item.type != 'withdraw' ? theme.colors.primary : 'red'} style={{ marginRight: wp(2) }} />
                            <FontAwesome name={'rupee'} size={hp(2)} color={item.type != 'withdraw' ? theme.colors.primary : 'red'} style={{ marginRight: wp(1) }} />
                            <Text style={{
                                color: item.type != 'withdraw' ? theme.colors.primary : 'red', fontSize: hp(2.1), fontFamily: 'Poppins - Bold',
                                fontWeight: 'bold'
                            }}>{item.amount}</Text>

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: hp(1), justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.time}>09:09 pm</Text>
                        <Text style={styles.time}>closing balance {availabeBalance}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end', justifyContent: 'center', width: wp(10) }}>
                    <Ionicons name='chevron-forward-outline' size={hp(3)} color='gray' />
                </View>
            </View>
        )
    }
    const [refreshing, serRefresh] = useState(false)

    const _onRefresh = () => {
        serRefresh(true);
        ListTransaction();
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: hp(1), paddingHorizontal: wp(3) }}>
            <Spinner visible={loading} color="#085cab" />

            <View style={{ flex: 1, marginTop: hp(2) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: hp(17), }}>
                    <View style={{ flexDirection: 'column', justifyContent: "space-between", height: hp(13) }}>
                        <Text style={{
                            fontSize: hp(2.7),
                            color: theme.colors.text,
                            opacity: 0.5,
                            fontWeight: 'bold',
                            // paddingVertical: 12,
                        }}>Available Balance</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome name={'rupee'} size={hp(3)} color='#333' style={{ paddingTop: hp(0.5), marginRight: wp(1) }} />
                            <Text style={{
                                fontSize: hp(3.5),
                                color: theme.colors.text,
                                fontWeight: 'bold',
                            }}>{availabeBalance}</Text></View>
                        <TouchableOpacity onPress={() => navigation.navigate('Plan', availabeBalance)}>
                            <View style={{
                                height: hp(5), paddingHorizontal: wp(2), paddingVertical: hp(1), borderRadius: 5, justifyContent: 'center',
                                alignItems: 'center', borderWidth: wp(0.3), borderColor: theme.colors.primary
                            }}>
                                <Text style={{ color: theme.colors.primary }}>Show Plans</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', height: hp(13), justifyContent: 'space-between', alignItems: 'center' }}>
                        <AnimatedCircularProgress
                            size={hp(11)}
                            width={wp(0.5)}
                            fill={70}
                            // padding={1}
                            tintColor={theme.colors.primary}
                            backgroundColor="#d1d1d1"
                            backgroundWidth={wp(0.3)}
                        >
                            {
                                (fill) => (
                                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><Text style={{
                                        fontSize: hp(2.8),
                                        color: theme.colors.text,
                                        fontWeight: 'bold',
                                    }}>
                                        30
                                    </Text>
                                        <Text style={{
                                            fontSize: hp(1.7),
                                            color: theme.colors.text,
                                            opacity: 0.5,
                                        }}>
                                            Days Left
                                    </Text>
                                    </View>
                                )
                            }
                        </AnimatedCircularProgress>
                        <Text style={{
                            fontSize: hp(1.3),
                            color: theme.colors.text,
                            opacity: .5
                        }}>Expired 10-10-2020</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: hp(2.5), justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{
                        fontSize: hp(2.5),
                        color: theme.colors.text,
                        fontWeight: 'bold',
                        // paddingVertical: 12,
                    }}>Transaction</Text>
                    <Ionicons name='options-outline' size={hp(3)} color='#333' />
                </View>

                <View style={{
                    flex: 1
                }}><FlatList data={transaction}
                    renderItem={renderItem}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={_onRefresh}
                            />
                        }
                    // renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                    />
                </View>
            </View>
        </View>
    )
}


export default App