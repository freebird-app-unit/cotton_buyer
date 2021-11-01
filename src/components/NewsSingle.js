import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, Text, ScrollView,
    useWindowDimensions, Image, TouchableOpacity,
} from 'react-native';
import { theme } from '../core/theme';
import Button from '../components/Button';
import Swiper from 'react-native-swiper';
import api_config from '../Api/api';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from './responsive-ratio';
import TextInput from './TextInput';
import { FlatList } from 'react-native';
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';


export default function NewsFeedView({ navigation, route }) {

    console.log('navigation', navigation, route)

    const [News, setNews] = useState([])
    const [loading, setLoading] = useState(true)



    const [interested, setinterested] = useState({})


    useEffect(() => {
        try {
            let data = {
                news_id: route.params.Id

            };
            console.log("data>>>>>>>>>>>>>", data);
            // console.log('Negotiation Request Param: ' + JSON.stringify(data));
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            axios({
                url: api_config.BASE_URL + api_config.NEWS_DETAIL,
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                },
            })
                .then(function (response) {

                    // console.log('response :', response.data.status);

                    if (response.data.status == 200) {
                        console.log('response id :', response.data.data);
                        setinterested(response.data.data)
                        setLoading(false);

                    } else {
                        // alert(response.data.message);
                        setLoading(false);
                    }
                })
                .catch(function (error) {
                    setLoading(false);
                    console.log('error from image :');
                });
        } catch (error) {
            console.log('Error: ' + error);
        }
    }, [interested])



    //     news: 'GST council meeting today: Kerala, Maharashtra to oppose move to bring petrol, diesel under GST',
    //     image: require('../images/menu.png'),
    //     time: '1h ago',
    //     detail: `Kerala and Maharashtra governments will oppose any move to bring petrol and diesel under the Goods and Services Tax (GST) regime,The 45th GST Council meeting, chaired by Finance Minister Nirmala Sitharaman. to be held on September 17 and a proposal on taxing petrol and diesel under the single national GST is likely to be taken up."Finance Minister Smt @nsitharaman will chair the 45th GST Council meeting at 11 AM in Lucknow tomorrow. The meeting will be attended by MOS Shri @mppchaudhary besides Finance Ministers of States & UTs and Senior officers from Union Government & States,"
    //      the Finance Ministry has tweeted.A day ahead of the scheduled meeting, the Kerala government said that it will vehemently oppose any move to bring petrol and diesel under the GST regime as that will further reduce revenue generation for the state and asserted that the Centre should reduce its levies on the two commodities to provide relief to the common people.`
    // },
    // )
    // const[Id,setId] = useState(0);
    const backgroundStyle = {
        flex: 1,
        width: '100%',
        height: hp(86),
        paddingBottom: 30,
        paddingTop: hp(3),
        marginTop: hp(2),
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    };



    const FirstRoute = ({ item }) => {
        console.log('hellow', item)
        return (<View style={{ flex: 1, marginTop: hp(1) }}>
            <Image style={{ width: wp(90), height: hp(25) }} source={{ uri: item.image }} />
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: wp(2) }}>
                <Text style={styles.label}>{item.name}</Text>
                <Text style={[styles.VAlue1], { opacity: 0.5 }}>{item.time_ago}</Text>
                <Text style={styles.value}>{item.description}</Text>
            </View>
        </View>
        )



    };








    const renderItem = ({ item }) => {
        return <View style={{
            borderBottomWidth: wp(0.3), width: wp(90),
            paddingVertical: hp(1),
            borderBottomColor: 'rgba(0,0,0,0.1)', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'
        }}>
            <View style={{ width: wp(64), flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={{
                    fontSize: hp(2.2),
                    color: theme.colors.text,
                    fontFamily: "Poppins-Regular",
                }}>
                    {item.name}
                </Text>
                <Text style={[styles.VAlue1], { opacity: 0.5 }}>
                    1 hr ago
                </Text>
            </View>
            <View style={{ width: wp(25), justifyContent: 'center', overflow: 'hidden' }}>
                <Image style={{ height: wp(18), height: wp(20), }} source={{ uri: item.image }} />
            </View>
        </View>
    }

    // const setIndex = (index) => setId(index);

    return (
        <View style={{
            flex: 1, backgroundColor: '#333',

        }}>
            {loading &&
                <Spinner visible={loading} color="#085cab" />}

            <View style={{
                flexDirection: 'row', paddingHorizontal: wp(5),
                marginTop: hp(5), height: hp(5), alignItems: 'center', justifyContent: 'space-between'
            }}>
                <Ionicons name='chevron-back-outline' size={hp(3)} color='#fff' style={{ width: wp(30) }} onPress={() => navigation.goBack()} />
                <Text style={{ alignSelf: 'center', color: '#fff', fontSize: hp(3), fontFamily: 'Poppins - Regular' }}>News Feed</Text>
                <View style={{ width: wp(30) }} />

            </View>
            <View style={backgroundStyle}>
                {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} hidden /> */}
                <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>

                    <View style={{ flex: 1, width: wp(100), flexDirection: 'column', backgroundColor: '#fff', paddingHorizontal: wp(5) }}>
                        <ScrollView style={{ alignSelf: 'stretch', marginBottom: 10, flex: 1 }}>
                            <FirstRoute item={interested} />
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: hp(2.4),
        color: theme.colors.text,
        fontFamily: "Poppins-Regular"
    },
    value: {
        marginTop: hp(2),
        fontSize: hp(2),
        color: theme.colors.text,
        fontFamily: "Poppins-Regular",
        opacity: 0.6
        // marginRight: wp(5)
    },
    VAlue1: {
        fontSize: hp(2),
        color: theme.colors.text,
        fontFamily: "Poppins-Regular"
    }

})