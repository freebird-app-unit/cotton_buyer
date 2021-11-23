import React, { useEffect, useState } from 'react';
import {
    StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform, PermissionsAndroid
} from 'react-native';
import { theme } from '../core/theme';
import Iconicons from 'react-native-vector-icons/AntDesign';
import Button from '../components/Button';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../components/responsive-ratio';
import TextInput from '../components/TextInput';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './Styles'
import axios from 'axios';
import moment from 'moment';
import EncryptedStorage from 'react-native-encrypted-storage';
import NoRecordsFound_Icon from '../assets/NoRecodsFound';
import Spinner from 'react-native-loading-spinner-overlay';
import RNFetchBlob from 'rn-fetch-blob';

import { FlatList } from 'react-native-gesture-handler';
// import { navigationRef } from '../../RootNavigation';
import api_config from '../Api/api';

const TouchableFunction = ({...props}) => {
    return (
        <TouchableOpacity style={{
            backgroundColor: '#F0F5F9',
            borderRadius: 5,
            width: (wp(93) / 3)
        }}
            onPress={props.onPress}
            onPressIn={props.onPressIn}>
            <Text numberOfLines={1}
                ellipsizeMode='tail'
                style={{
                    flex: 1,
                    color: props.flag ? '#fff' :  theme.colors.textColor,
                    fontSize: hp(1.8),
                    backgroundColor: props.flag ? theme.colors.primary : '#F0F5F9',
                    borderRadius: 5,
                    fontFamily:'Poppins-Regular',
                    height: 35,
                    textAlign: 'center',
                    textAlignVertical: 'center'
                }}>{props.title}</Text></TouchableOpacity>
    )
    
}

const SelectsBox = ({...props}) => (<SelectDropdown
    data={props.data}
    onSelect={props.onSelect}
    buttonStyle={{
        width: "100%",
        height: hp(6.5),
        // padding:2,
        backgroundColor: "#FFF",
        paddingHorizontal: wp(2),
        borderWidth: 0.7,
        borderRadius: 4,
        borderColor: "lightgray",
        left: 0
    }}
    renderCustomizedButtonChild={(selectedItem, index) => {
        return (
            <View style={styles.dropdown3BtnChildStyle}>
                <Text style={styles.dropdown3BtnTxt}>
                    {selectedItem ? selectedItem.label : props.selected.label}
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
                style={{ marginRight: 10 }}
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
/>)



function Contract({navigation}) {

    useEffect(() => {


        // const willFocusSubscription = navigation.addListener('focus', () => {
            
                        getBuyerApi()

            setbbg(true)
            // setbrg(false)
            // setprg(false)
            // getBrokerApi()
            // getBuyerApi()
           
        // });

        // return willFocusSubscription;


    }, [])

    const getProductApi = async () => {
        console.log('hi')
        try {
            setLoader(true)
            let data = {

                user_type: 'buyer', seller_buyer_id: await EncryptedStorage.getItem('user_id')
            };

            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            console.log('data',data)

            axios({
                url: api_config.BASE_URL + api_config.CONTRACT_PRODUCT_LIST,
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(function (response) {
                    setLoader(false)

                    // console.log('response :>>>>>>>>>.list', response.data);
                    if (response.data.status == 200 && response.data.data.length > 0) {
                        let productList = response.data.data;
                        var arrProductList = [];

                        for (let i = 0; i < productList.length; i++) {
                            
                            arrProductList.push({
                                label: productList[i].product_name,
                                value: productList[i].product_id,
                            });
                        }
                        let obj = {
                            label: 'All',
                            value: 0,
                        }
                        arrProductList.unshift(obj)
                        setProduct(arrProductList)
                    } else {
                        var arrProductList = [];
                        let obj = {
                            label: 'No Product available',
                            value: -1,
                        }
                        arrProductList.unshift(obj)
                        setProduct(arrProductList)
                        setProductId({ label: 'No Product available', value: -1 })
                    }
                })
                .catch(function (error) {
                  setLoader(false)
                });
        } catch (error) {
            console.log(error);
        }
    };

    const getBrokerApi = async () => {
        console.log('hi')
        try {
            setLoader(true)
          
            let data = {

                user_type: 'buyer', seller_buyer_id: await EncryptedStorage.getItem('user_id')
            };

            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            axios({
                url: api_config.BASE_URL + api_config.CONTRACT_BROKER_LIST,
                method: 'POST',
                data: formData,

                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(function (response) {
                    setLoader(false)

                    // console.log('response :>>>>>>>>>.broker', response.data);
                    if (response.data.status == 200 && response.data.data.length > 0) {
                        let productList = response.data.data;
                        var arrProductList = [];

                        for (let i = 0; i < productList.length; i++) {

                            arrProductList.push({
                                label: productList[i].broker_name,
                                value: productList[i].broker_id,
                            });
                        }
                        let obj = {
                            label: 'All',
                            value: 0,
                        }
                        arrProductList.unshift(obj)
                        setBroker(arrProductList)
                    } else {
                        var arrProductList = [];
                        let obj = {
                            label: 'No Broker available',
                            value: -1,
                        }
                        arrProductList.unshift(obj)
                        setBroker(arrProductList)
                        setBrokerId({ label: 'No Broker available', value: -1 })
                    }
                })
                .catch(function (error) {
                    setLoader(false)
                });
        } catch (error) {
            console.log(error);
        }
    };

    const getBuyerApi = async () => {
        // console.log('hi')
        try {
            setLoader(true)

            let data = {

                user_type: 'buyer', seller_buyer_id: await EncryptedStorage.getItem('user_id')
            };

            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            axios({
                url: api_config.BASE_URL + api_config.CONTRACT_PARTY_LIST,
                method: 'POST',
                data: formData,

                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(function (response) {
                    setLoader(false)

                    // console.log('response :>>>>>>>>>.buyer', response.data);
                    if (response.data.status == 200 && response.data.data.length > 0) {
                        let productList = response.data.data;
                        var arrProductList = [];

                        for (let i = 0; i < productList.length; i++) {

                            arrProductList.push({
                                label: productList[i].buyer_name,
                                value: productList[i].buyer_id,
                            });
                        }
                        let obj = {
                            label: 'All',
                            value: 0,
                        }
                        arrProductList.unshift(obj)
                        setBuyer(arrProductList)
                    } else {
                        var arrProductList = [];
                        let obj = {
                            label: 'No Seller available',
                            value: -1,
                        }
                        arrProductList.unshift(obj)
                        setBuyer(arrProductList)
                        setBuyerId({ label: 'No Seller available', value: -1})
                    }
                })
                .catch(function (error) {
                    setLoader(false)
                });
        } catch (error) {
            console.log(error);
        }
    };

    const BuyerApiContract = async (dates) => {
        console.log('hi buyer')
        try {
            BuyerId.value != -1 && setLoader(true)

            let data = {

                user_type: 'buyer', seller_buyer_id: BuyerId.value, user_id: await EncryptedStorage.getItem('user_id'), date_range: dates.from + '/' + dates.to
            };

            console.log('data',data)
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            BuyerId.value != -1 && axios({
                url: api_config.BASE_URL + api_config.PARTY_WISE_CONTRACT_REPORT,
                method: 'POST',
                data: formData,

                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(function (response) {
                    setLoader(false)

                    // alert('response :>>>>>>>>>.appbyer', response.data);
                    if (response.data.status == 200) {
                        let d = {
                            title: BuyerId.label,
                            date: moment(new Date(dates.from)).format('DD-MM-YYYY') + ' to ' + moment(new Date(dates.to)).format('DD-MM-YYYY'),
                            download: response.data.data
                        }

                        let datag = []
                        datag.push(d);
                        setBuyerData(datag);

                    } else {
                        setBuyerData([]);

                        alert(response.data.message);
                    }
                })
                .catch(function (error) {
                    setLoader(false)
                });
        } catch (error) {
            console.log(error);
        }
    }
    const BrokerApiContract = async (dates) => {
        console.log('hi broker')
        try {
            BrokerId.value != -1 && setLoader(true)

            let data = {

                user_type: 'buyer', broker_id: BrokerId.value, user_id: await EncryptedStorage.getItem('user_id'), date_range: dates.from + '/' + dates.to
            };

            console.log('data', data)
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            BrokerId.value != -1 &&  axios({
                url: api_config.BASE_URL + api_config.BROKER_WISE_CONTRACT_REPORT,
                method: 'POST',
                data: formData,

                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(function (response) {
                    setLoader(false)

                    // alert('response :>>>>>>>>>.app broker', response.data);

                    if (response.data.status == 200) {
                        let d = {
                            title: BrokerId.label,
                            date: moment(new Date(dates.from)).format('DD-MM-YYYY') + ' to ' + moment(new Date(dates.to)).format('DD-MM-YYYY'),
                            download: response.data.data
                        }

                        let datag = []
                        datag.push(d);
                        setBrokerData(datag);
                    } else {
                        setBrokerData([]);

                        alert(response.data.message);
                    }
                })
                .catch(function (error) {
                    setLoader(false)
                });
        } catch (error) {
            console.log(error);
        }
    }

    const ProductApiContract = async (dates) => {
        console.log('hi broker')
        try {
            ProductId.value != -1 &&  setLoader(true)

            let data = {

                user_type: 'buyer', product_id: ProductId.value, user_id: await EncryptedStorage.getItem('user_id'), date_range: dates.from + '/' + dates.to
            };

            console.log('data', data)
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            ProductId.value != -1 &&  axios({
                url: api_config.BASE_URL + api_config.PRODUCT_WISE_CONTRACT_REPORT,
                method: 'POST',
                data: formData,

                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(function (response) {
                    setLoader(false)
                    // alert('response :>>>>>>>>>.app product', response.data);

                    // console.log('response :>>>>>>>>>.appproduct', response.data);
                    if (response.data.status == 200) {
                        let d = {
                            title: ProductId.label,
                            date: moment(new Date(dates.from)).format('DD-MM-YYYY') + ' to ' + moment(new Date(dates.to)).format('DD-MM-YYYY'),
                            download: response.data.data
                        }

                        let datag = []
                        datag.push(d);
                        setProductData(datag)
                    } else {
                        setProductData([])

                        alert(response.data.message);
                    }
                })
                .catch(function (error) {
                    setLoader(false)
                });
        } catch (error) {
            console.log(error);
        }
    }
    const [bbg,setbbg] = useState(false)
    const [brg, setbrg] = useState(false)
    const [prg, setprg] = useState(false)
    const [Loader, setLoader] = useState(false)
    const [currentDate, setCurrentDate] = useState(moment(new Date()).format('DD-MM-YYYY'))
    const [date,setDate] = useState(null)

    const [Buyer, setBuyer] = useState([{ label: 'All', value: 0 }])
    const [Broker, setBroker] = useState([{ label: 'All', value: 0 }])
    const [Product, setProduct] = useState([{ label: 'All', value: 0 }])

    const [BuyerData,setBuyerData] = useState([])
    const [BrokerData, setBrokerData] = useState([])
    const [ProductData, setProductData] = useState([])

    console.log('buyerdssdfasda',BuyerData)

    const [BuyerId, setBuyerId] = useState({ label: 'All', value: -1 })
    const [BrokerId, setBrokerId] = useState({ label: 'All', value: -1 })
    const [ProductId, setProductId] = useState({ label: 'All', value: -1 })

    const FlagSet = (item) => {
            if (item == 'Buyer')
                {setbbg(true); setprg(false); setbrg(false);}
                    else if (item == 'Broker')
            { setbbg(false); setprg(false); setbrg(true); }
            else {
                 setbbg(false); setprg(true); setbrg(false); }
            }
          


    const onSelect = data => {
        console.log('data>>>',data)
        setDate(data.obj)
        FlagSet(data.obj.GoingTo)
        bbg && BuyerApiContract(data.obj)
        brg && BrokerApiContract(data.obj)
        prg && ProductApiContract(data.obj)

        setCurrentDate(moment(new Date(data.obj.from)).format('DD-MM-YYYY'))
        console.log('cur', currentDate.toString())
    };

    const emptyCompo = () => {
        return (
            <View
                style={{
                    flex: 1,
                    // height:hp(40),
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <NoRecordsFound_Icon />
                <Text>Sorry, no records available</Text></View>
        )
    }

    const onClickDownload = async pdfURL => {
        if (pdfURL == '') {
            alert('PDF not available');
            setLoader(false)
            return;
        }

        if (Platform.OS === 'ios') {
            downloadFile();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'Application needs access to your storage to download File',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Start downloading
                    setLoader(true)

                    downloadFile(pdfURL);
                    // console.log('Storage Permission Granted.');
                } else {
                    // If permission denied then show alert
                    Alert.alert('Error', 'Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.log('++++' + err);
            }
        }
    };

    const downloadFile = pdfURL => {
        // Get today's date to add the time suffix in filename
        let date = new Date();
        // File URL which we want to download
        let FILE_URL = pdfURL;
        // Function to get extention of the file url
        let file_ext = getFileExtention(FILE_URL);

        file_ext = '.' + file_ext[0];

        // config: To get response by passing the downloading related options
        // fs: Root directory path to download
        const { config, fs } = RNFetchBlob;
        let RootDir = fs.dirs.DownloadDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                path:
                    RootDir +
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
                // console.log('res -> ', res.data);
                setLoader(false)
                const android = RNFetchBlob.android;
                android.actionViewIntent(res.data, 'application/pdf');
                console.log('File Downloaded Successfully.');
            });
    };

    const getFileExtention = fileUrl => {
        // To get the file extension
        return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
    };

    const renderItemPost = ({ item }) => {
        console.log('item', item)
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: wp(1), flex: 1 }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{
                        fontSize: hp(2),
                        // fontWeight: 'bold',
                        color: 'black',
                        // fontFamily: 'Poppins-SemiBold',
                        fontFamily: 'Poppins-Bold',
                        // marginLeft: 20,
                        // marginBottom: 5,
                    }}>{item.title}</Text>
                    <Text
                        style={{
                            fontSize: hp(2),
                            // fontWeight: 'bold',
                            color: 'black',
                            // fontFamily: 'Poppins-SemiBold',
                            fontFamily: 'Poppins-Regular',
                            // marginLeft: 20,
                            // marginBottom: 5,
                        }}>{item.date}</Text>
                </View>
                <TouchableOpacity onPress={() => onClickDownload(item.download)}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', paddingVertical: wp(2),
                        justifyContent: 'space-between',
                    }}>
                        <Iconicons
                            name="download"
                            size={hp(2.2)}
                            color={theme.colors.primary}
                        // style={{ paddingTop: 3 }}
                        />
                        <Text style={{
                            fontSize: hp(2.1),
                            // fontWeight: 'bold',
                            color: 'black',
                            // fontFamily: 'Poppins-SemiBold',
                            fontFamily: 'Poppins-Regular',
                            color: theme.colors.primary,
                            marginLeft: wp(2),
                            // marginBottom: 5,
                        }}>Download</Text>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: wp(2) }}>
            <Spinner visible={Loader} color="#085cab" />

            <View style={{flexDirection:'row',marginTop:hp(2),justifyContent:'space-between'}}>
                <TouchableFunction title='Seller Wise' flag={bbg} onPressIn={() => {
                    setbbg(true);
                    setbrg(false);
                    setprg(false)
                }} onPress={() => getBuyerApi()}/>
                <TouchableFunction title='Broker Wise' flag={brg} onPressIn={() => {
                    setbbg(false);
                    setbrg(true);
                    setprg(false)
                }} onPress={() => getBrokerApi()}/>
                <TouchableFunction title='Product Wise' flag={prg} onPressIn={() => {
                    setbbg(false);
                    setbrg(false);
                    setprg(true)
                }} onPress={() => getProductApi()}/>

                    </View>

                    <View style={{marginTop:hp(2)}}>
                <Text
                    style={{
                        fontSize: 14,

                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                        // marginLeft: 20,
                        marginBottom: 5,
                    }}>
                    {bbg ? 'Seller' :  brg ? 'Broker' : 'Product'}

                </Text>

                {bbg && <SelectsBox data={Buyer} selected={BuyerId} onSelect={(selectedItem) => setBuyerId(selectedItem) } />}
                {brg && <SelectsBox data={Broker} selected={BrokerId} onSelect={(selectedItem) => setBrokerId(selectedItem)} />}
                {prg && <SelectsBox data={Product} selected={ProductId} onSelect={(selectedItem) => setProductId(selectedItem)} />}


                    </View>
            <View style={{ marginTop: 10, marginBottom: 5, width: wp(46) }}>
                <Text
                    style={{
                        fontSize: 14,

                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',

                        // marginLeft: 20,
                        marginBottom: 5,

                    }}>
                    Date Range
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Custom')} onPress={() => navigation.navigate('Custom', { onSelect: onSelect, comingFrom: bbg? 'Buyer': brg ? 'Broker' : 'Product' })}>
                    <View style={{
                        flexDirection: 'row', borderWidth: 0.5, height: hp(6.5), borderWidth: 0.7,
                        borderRadius: 4,
                        borderColor: "lightgray", justifyContent: 'space-between', width: wp(46), alignItems: 'center',
                        paddingHorizontal: wp(3)
                    }}>
                        <Text style={{
                            fontSize: 14,
                            // fontWeight: 'bold',
                            color: 'black',
                            // fontFamily: 'Poppins-SemiBold',
                            fontFamily: 'Poppins-Regular',
                            // marginLeft: 20,
                            // marginBottom: 5,
                        }}>
                            {currentDate}
                        </Text>
                        <Icon name="calendar" size={hp(2.3)} color="#000" />
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{ flex: 1, marginTop: hp(2) }}>

                     

                <FlatList data={
                     bbg ? BuyerData :  brg ? BrokerData : ProductData
                   
                } renderItem={renderItemPost} ListEmptyComponent={emptyCompo()} />
            </View>
        </ScrollView>

    )
}

function Post({navigation}) {
    const [Status, setstatusValue] = useState([{ label: 'active', value: 0 }, { label: 'complete', value: 1}])
    const [selectedStatus, setSelectedStatus] = useState(null)

    // const [Expenses, setExpense] = useState(0.0)
    // const [Cotton_Seed, setCottoSeed] = useState(0.0)
    // const [Our_Turn, setOutTurn] = useState(0.0)
    // const [Shortage, setShortage] = useState(0.0)
    // const [Result, setResult] = useState(0.0)
    const [currentDate, setCurrentDate] = useState(moment(new Date()).format('DD-MM-YYYY'))
    const [statusData, setStatusData] = useState([])

    const [Loader, setLoader] = useState(false)

    const onClickDownload = async pdfURL => {
        if (pdfURL == '') {
            alert('PDF not available');
            setLoader(false)
            return;
        }

        if (Platform.OS === 'ios') {
            downloadFile();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'Application needs access to your storage to download File',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Start downloading
                    setLoader(true)

                    downloadFile(pdfURL);
                    // console.log('Storage Permission Granted.');
                } else {
                    // If permission denied then show alert
                    Alert.alert('Error', 'Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.log('++++' + err);
            }
        }
    };

    const downloadFile = pdfURL => {
        // Get today's date to add the time suffix in filename
        let date = new Date();
        // File URL which we want to download
        let FILE_URL = pdfURL;
        // Function to get extention of the file url
        let file_ext = getFileExtention(FILE_URL);

        file_ext = '.' + file_ext[0];

        // config: To get response by passing the downloading related options
        // fs: Root directory path to download
        const { config, fs } = RNFetchBlob;
        let RootDir = fs.dirs.DownloadDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                path:
                    RootDir +
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
                // console.log('res -> ', res.data);
                setLoader(false)
                const android = RNFetchBlob.android;
                android.actionViewIntent(res.data, 'application/pdf');
                console.log('File Downloaded Successfully.');
            });
    };

    const getFileExtention = fileUrl => {
        // To get the file extension
        return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
    };

    const renderItemPost = ({ item }) => {
        console.log('item', item)
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: wp(1), flex: 1 }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{
                        fontSize: hp(2),
                        // fontWeight: 'bold',
                        color: 'black',
                        // fontFamily: 'Poppins-SemiBold',
                        fontFamily: 'Poppins-Bold',
                        // marginLeft: 20,
                        // marginBottom: 5,
                    }}>{item.title}</Text>
                    <Text
                        style={{
                            fontSize: hp(2),
                            // fontWeight: 'bold',
                            color: 'black',
                            // fontFamily: 'Poppins-SemiBold',
                            fontFamily: 'Poppins-Regular',
                            // marginLeft: 20,
                            // marginBottom: 5,
                        }}>{item.date}</Text>
                </View>
                <TouchableOpacity onPress={() => onClickDownload(item.download)}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', paddingVertical: wp(2),
                        justifyContent: 'space-between',
                    }}>
                        <Iconicons
                            name="download"
                            size={hp(2.2)}
                            color={theme.colors.primary}
                        // style={{ paddingTop: 3 }}
                        />
                        <Text style={{
                            fontSize: hp(2.1),
                            // fontWeight: 'bold',
                            color: 'black',
                            // fontFamily: 'Poppins-SemiBold',
                            fontFamily: 'Poppins-Regular',
                            color: theme.colors.primary,
                            marginLeft: wp(2),
                            // marginBottom: 5,
                        }}>Download</Text>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const postApi = async(dates) => {
        try {
            setLoader(true)

            let data = {

                user_type: 'buyer', status: selectedStatus.label, seller_buyer_id: await EncryptedStorage.getItem('user_id'), date_range: dates.from + '/' + dates.to
            };

            console.log('data', data)
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            axios({
                url: api_config.BASE_URL + api_config.POST_REPORT,
                method: 'POST',
                data: formData,

                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(function (response) {
                    setLoader(false)

                    console.log('response :>>>>>>>>>.appproduct', response.data);
                    if (response.data.status == 200) {
                        let d = {
                            title: selectedStatus.label,
                            date: moment(new Date(dates.from)).format('DD-MM-YYYY') + ' to ' + moment(new Date(dates.to)).format('DD-MM-YYYY'),
                            download: response.data.data
                        }

                        let datag = []
                        datag.push(d);
                        setStatusData(datag);

                    } else {
                        setStatusData([])
                        alert(response.data.message);
                    }
                })
                .catch(function (error) {
                    setLoader(false)
                });
        } catch (error) {
            console.log(error);
        }

    }

 
    const onSelectPost = data => {
        console.log('data>>>', data)
        // setDate(data.obj)
      
        setCurrentDate(moment(new Date(data.obj.from)).format('DD-MM-YYYY'))
        selectedStatus ? postApi(data.obj) : alert("please select status")
        console.log('cur', currentDate.toString())
    };
   
    const emptyCompo = () => {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <NoRecordsFound_Icon />
                <Text>Sorry, no records available</Text></View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: wp(2) }}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Spinner visible={Loader} color="#085cab" />

            <View style={{ marginTop: 10, marginBottom: 5,width:wp(46) }}>
            <Text
                style={{
                    fontSize: 14,
                 
                    color: 'black',
                            fontFamily:'Poppins-SemiBold',
                    // marginLeft: 20,
                    marginBottom: 5,
                }}>
                Status
            </Text>
            <SelectDropdown
                data={Status}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setSelectedStatus(selectedItem);
                }}
                buttonStyle={{
                    width: "100%",
                    height: hp(6.5),
                    // padding:2,
                    backgroundColor: "#FFF",
                    paddingHorizontal: wp(2),
                    borderWidth: 0.7,
                    borderRadius: 4,
                    borderColor: "lightgray",
                    left: 0
                }}
                renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                        <View style={styles.dropdown3BtnChildStyle}>
                            <Text style={styles.dropdown3BtnTxt}>
                                {selectedItem ? selectedItem.label : Status[0].label}
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
                            style={{ marginRight: 10 }}
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
            <View style={{ marginTop: 10, marginBottom: 5, width: wp(46) }}>
                <Text
                    style={{
                        fontSize: 14,
                        
                        color: 'black',
                            fontFamily: 'Poppins-SemiBold',

                        // marginLeft: 20,
                        marginBottom: 5,
                        
                    }}>
                    Date Range
                </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Custom')} onPress={() => navigation.navigate('Custom', { onSelect: onSelectPost, comingFrom:'Post' })}>
                    <View style={{
                        flexDirection: 'row', borderWidth: 0.5, height: hp(6.5), borderWidth: 0.7,
                        borderRadius: 4,
                        borderColor: "lightgray",justifyContent:'space-between',width:wp(46),alignItems:'center',
                        paddingHorizontal:wp(3)}}>
                        <Text style={{
                            fontSize: 14,
                            // fontWeight: 'bold',
                            color: 'black',
                                // fontFamily: 'Poppins-SemiBold',
                                fontFamily: 'Poppins-Regular',
                            // marginLeft: 20,
                            // marginBottom: 5,
                        }}>
                                {currentDate}
                            </Text>
                        <Icon name="calendar" size={hp(2.3)} color="#000" />
                        </View>
                </TouchableOpacity>

            </View>
            </View>
            <View style={{flex:1,marginTop:hp(2)}}>
                <FlatList data={statusData} renderItem={renderItemPost} ListEmptyComponent={emptyCompo()}/>
            </View>
        </View>



    )
}


function ThirdRoute() {
    const [Cotton_Rate, setCottonRate] = useState(0.0)
    const [Expenses, setExpense] = useState(0.0)
    const [Exchange_Rate, setExchangeRate] = useState(0.0)
    const [Result, setResult] = useState(0.0)


    const onChangedCotton_Rate = (text) => {
        setCottonRate(text)
        displayResult(text, Expenses, Exchange_Rate)
    }

    const onChangedExpenses = (text) => {
        setExpense(text)
        displayResult(Cotton_Rate, text, Exchange_Rate)
    }

    const onChangedExchange_Rate = (text) => {
        setExchangeRate(text)
        displayResult(Cotton_Rate, Expenses, text)
    }

    const displayResult = (cottonRate, expenses, exchangeRate) => {
        let t1 = parseFloat(cottonRate) + parseFloat(expenses)
        let t2 = t1 * 100
        let t3 = 355.60 * parseFloat(exchangeRate)
        let t4 = t3 * 2.205



        let result = t2 / t4;

        if (isNaN(result)) {
            setResult("Invalid")
        } else {
            setResult(result.toFixed(2))
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: wp(2) }}>

            <InPutText label='Cotton Rate' keyboardType="phone-pad" labelValue='Rs/Candy' outlineColor={'#d1d1d1'} onChangeText={text => onChangedCotton_Rate(text)} maxLength={6} />
            <InPutText label='Expenses' keyboardType="phone-pad" labelValue='Rs/Candy' outlineColor={'#d1d1d1'} onChangeText={text => onChangedExpenses(text)} maxLength={6} />
            <InPutText label='Exchange Rate' keyboardType="phone-pad" labelValue='USD/INR' outlineColor={'#d1d1d1'} onChangeText={text => onChangedExchange_Rate(text)} maxLength={6} />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center', marginTop: hp(2)
            }}>
                <View style={{ width: wp(40), }}><Text style={styles.label}>Export Rate</Text></View>
                <View style={{ alignItems: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.value}>{Result}</Text>
                    <Text style={styles.VAlue1}>Cents/Bales</Text>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center', marginTop: hp(1)
            }}>
                {/* <View style={{ width: wp(40), }}><Text style={styles.label}>Export Rate</Text></View>
            <View style={{ alignItems: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.value}>{Result}</Text>
                <Text style={styles.VAlue1}>USD/kg</Text>
            </View> */}
            </View>
        </View>



    );
}

const InPutText = (props) => {
    console.log('hello')
    return (
        <View style={{
            backgroundColor: '#fff', width: wp(96), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
        }}>
            <View style={{ width: wp(30), alignItems: 'flex-start', justifyContent: 'center', paddingTop: hp(1.5) }}>
                <Text style={{
                    fontSize: hp(1.9),
                    color: theme.colors.text,
                    fontFamily: "Poppins-Regular"
                }}>{props.label}</Text></View>
            <View style={{ width: wp(43), marginVertical: -4 }}><TextInput
                returnKeyType="next"
                // require={true}
                maxLength={50}
                onChangeText={props.onChangeText}
                {...props}
            /></View>
            <View style={{ width: wp(18), alignItems: 'flex-start', justifyContent: 'center', paddingTop: hp(1.5) }}>
                <Text style={{
                    fontSize: hp(1.7),
                    color: theme.colors.text,
                    opacity: 0.5,
                    fontFamily: "Poppins-Regular",
                    width: wp(18)
                }} numberOfLines={2}>{props.labelValue}</Text></View>

        </View>
    )
}

export { Post, Contract, InPutText }

const onPressed = () => {
    console.log('reset')
}

// const styles = StyleSheet.create({
//     label: {
//         fontSize: hp(2.5),
//         color: theme.colors.primary,
//         fontFamily: "Poppins-Regular"
//     },
//     value: {
//         fontSize: hp(2.5),
//         color: theme.colors.primary,
//         fontFamily: "Poppins-Bold",
//         marginRight: wp(5)
//     },
//     VAlue1: {
//         fontSize: hp(2),
//         color: theme.colors.text,
//         fontFamily: "Poppins-Regular"
//     }

// })
