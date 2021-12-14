import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, Text, ScrollView,
    useWindowDimensions, Image, TouchableOpacity, ActivityIndicator, RefreshControl
} from 'react-native';
import { theme } from '../core/theme';
import Button from '../components/Button';
import Swiper from 'react-native-swiper';
import api_config from '../Api/api';
import Spinner from 'react-native-loading-spinner-overlay';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from './responsive-ratio';
import TextInput from './TextInput';
import { FlatList } from 'react-native';
import axios from 'axios'



export default function NewsFeedView({ navigation,Props }) {
    console.log('props', navigation,Props)


    const [News, setNews] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageLimit, setpageLimit] = useState(1);
    const [nomoreData, setNoData] = useState(false);
    const getCallNews = (page) => {
        try {
            setLoading(true);


            let data = {
                limit: page === 1 ? '10' : '5',
                offset: page,

            };
            // console.log("data>>>>>>>>>>>>>",data);
            // console.log('Negotiation Request Param: ' + JSON.stringify(data));
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            axios({
                url: api_config.BASE_URL + api_config.NEWS,
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                },
            })
                .then(function (response) {

                    // console.log('response :', response.data.status);

                    if (response.data.status == 200) {
                        console.log('response id :????', JSON.stringify(response.data.data));
                        // setinterested((previous) => [...previous, response.data.data])
                        serRefresh(false);

                        response.data.data.length ? setNews([...News, ...response.data.data]) : setNoData(true)
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
    }


    useEffect(() => {
        getCallNews(pageLimit);
    }, [pageLimit])

    const handleLoadMore = () => {
        // return

        let page = pageLimit + 1; // increase page by 1
        setpageLimit(page); // method to set page limit
        getCallNews(page)

    };


    // const [interested, setinterested] = useState([{
    //     news: 'Punjab Agriculture University (PAU) on wednesday asked the cotton growers to',
    //     image: require('../images/a1.png'),
    //     time: '1h ago'
    // },
    // {
    //     news: 'Punjab Agriculture University (PAU) on wednesday asked the cotton growers to',
    //     image: require('../images/a2.png'),
    //     time: '1h ago'

    // },
    // {
    //     news: 'Punjab Agriculture University (PAU) on wednesday asked the cotton growers to',
    //     image: require('../images/a1.png'),
    //     time: '1h ago'

    // },
    // {
    //     news: 'Punjab Agriculture University (PAU) on wednesday asked the cotton growers to',
    //     image: require('../images/a2.png'),
    //     time: '1h ago'

    // },
    // {
    //     news: 'Punjab Agriculture University (PAU) on wednesday asked the cotton growers to',
    //     image: require('../images/a2.png'),
    //     time: '1h ago'

    // },])
    // const[Id,setId] = useState(0);
    const backgroundStyle = {
        flex: 1,
        paddingHorizontal: wp(5), marginTop: hp(1)
    };



    const FirstRoute = ({ News, index }) => (
        <TouchableOpacity key={index} style={{ marginTop: hp(1), width: wp(100) }} onPress={() => navigation.navigate('NewsSingle', { Id: News.id })}>
            <View>
                <Image style={{ width: wp(90), height: hp(25) }} source={{ uri: News.image }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: wp(2) }}>

                    <Text style={styles.label}>{News.name}</Text>
                    <Text style={[styles.VAlue1], { opacity: 0.5 }}>1h ago</Text>
                </View>
            </View></TouchableOpacity>



    );








    const renderItem = ({ item }) => {

        return <TouchableOpacity onPress={() => navigation.navigate('NewsSingle', { Id: item.id })}><View style={{
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
        </View></TouchableOpacity>
    }

    const [changedindex, setIndex] = useState(0)
    const [refreshing, serRefresh] = useState(false)

    const _onRefresh = () => {
        serRefresh(true);
        getCallNews(1);
    }
    
    return (
        <View style={backgroundStyle}>
            <Spinner visible={loading} color="#085cab" />

            <Swiper style={{ height: hp(50), }}
                dotColor={'rgba(105,186,83,0.3)'}
                key={News.length}
                activeDotColor={theme.colors.primary}
                scrollEnabled={true}
                // loadMinimalSize={2}
                removeClippedSubviews

                onIndexChanged={(index) =>

                    setIndex(index)

                }
                index={changedindex}
                loadMinimal={false}
                paginationStyle={{
                    bottom: hp(1)
                }}
            >
                {
                    News.slice(0, 5).map((item, index) =>
                        <FirstRoute News={item} key={index} />
                    )
                }
            </Swiper>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={News.slice(5)}
                    renderItem={renderItem}
                    extraData={loading}
                    onEndReachedThreshold={0.5}
                    onEndReached={handleLoadMore}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={_onRefresh}
                        />
                    }
                    keyExtractor={(item, index) => {
                        return item?.id + index.toString();
                    }}
                    ListFooterComponent={() =>
                    (<View style={{
                        height: 50, justifyContent: 'center',
                        alignItems: 'center'
                    }} >
                        {!nomoreData ? <ActivityIndicator color={'blue'} /> : <Text>No More News</Text>}
                    </View>)}
                />
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
        fontSize: hp(2.5),
        color: theme.colors.primary,
        fontFamily: "Poppins-Bold",
        marginRight: wp(5)
    },
    VAlue1: {
        fontSize: hp(2),
        color: theme.colors.text,
        fontFamily: "Poppins-Regular"
    }

})