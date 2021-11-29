import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, Text, ScrollView,Image
} from 'react-native';
import { theme } from '../core/theme';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../components/responsive-ratio';
import { Avatar } from 'react-native-paper';
import Stamp_Icon from '../assets/Stamp';
import Spinner from 'react-native-loading-spinner-overlay';
import defaultMessages from '../helpers/defaultMessages';
import EncryptedStorage from 'react-native-encrypted-storage';

import api_config from '../Api/api';
import axios from 'axios';
const Profile = ({ navigation, route }) => {

    // console.log('props>>>>>>>>>>>>>',Props)

    const Name = (item) => {
        console.log('item', item)
        if (item) {
            let i = item.split(' ');
            let fname = i[0];

            if (i.length > 1) {
                let lname = i[1];
                return fname.charAt(0).toUpperCase() + "" + lname.charAt(0).toUpperCase();
            }
            else {
                return fname.charAt(0).toUpperCase() + "" + fname.charAt(1).toUpperCase()
            }
        }
        else {
            return '  '
        }
    }

const [spinner, setSpinner] = useState(false)

const [Props, setProfileData] = useState([])

const fetchProfile = async() => {

    let dataProfile = await EncryptedStorage.getItem('user_data');
    let d = (JSON.parse(dataProfile));
    console.log('data', dataProfile)
    console.log('item', dataProfile.user_id, dataProfile.api_token)
    try {
        setSpinner(true)
        let data = {
            user_id: d.user_id,
        };

        const formData = new FormData();
        formData.append('data', JSON.stringify(data));

        axios({
            url: api_config.BASE_URL + api_config.PROFILE_BUYER,
            method: 'POST',
            data: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + d.api_token
            },
        }).then(function (response) {
            console.log('res', response)
            if (response.data.status == 200) {
                setProfileData(response.data.data)
                navigation.setParams({
                    ProfileData: response.data.data,
                });
                setSpinner(false)
            } else {
                console.log(response.data.message);
            }
        })
            .catch(function (error) {
                setSpinner(false)
                console.log('error', JSON.stringify(error))
                alert(defaultMessages.en.serverNotRespondingMsg);
            });
    } catch (error) {
        console.log(error);
    }
}

useEffect(async () => {

    const willFocusSubscription = navigation.addListener('focus', () => {
        fetchProfile();
    });

    return willFocusSubscription;

   

}, [])

    const [itemChecked, setItemChecked] = useState(false);
    // const [ProfileData, setProfileData] = useState([]);



    // const[Id,setId] = useState(0);
    const backgroundStyle = {
        flex: 1,
        width: '100%',
        height: hp(86),
        paddingBottom: 30,
        // paddingTop: hp(3),
        marginTop: hp(2),
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    };

    const MainSection = (props) => (
        <View style={{ marginTop: hp(2), alignSelf: 'flex-start' }}>
            <Text style={styles.HeaderLAbel}>{props.Section}</Text>
        </View>
    )


    const LabelValue = (props) => (
        <View style={{ marginTop: hp(1), alignSelf: 'flex-start' }}>
            <Text style={styles.VAlue1}>{props.label}</Text>
            {props.label != 'Branch Address' ? <Text style={styles.ValueOfLabel}>{props.value}</Text> : <Text style={{
                width: wp(60), flexWrap: 'wrap', fontSize: hp(2),
                color: theme.colors.text,
                fontFamily: "Poppins-SemiBold",

            }}>{props.value}</Text>}
        </View>
    )

    const HeaderValue = (props) => {
        console.log('props', props.value)
        return props.value ? <View style={{ marginTop: hp(2), alignSelf: 'flex-start' }}>
            <Text style={styles.ValueOfLabel}>{props.label}</Text>
            <Image source={{ uri: props.value }} style={{ height: hp(15), width: hp(15), alignSelf: 'flex-start' }}
                resizeMode={'cover'} /></View>
            : <Stamp label={props.label} />



    }

    const Stamp = (props) => (
        <View style={{ marginTop: hp(2), alignSelf: 'flex-start' }}>
            <Text style={styles.ValueOfLabel}>{props.label}</Text>
            <Stamp_Icon
                size={20}
                color="black"
                style={{ width: 20, height: 20, }}
            />
        </View>
    )
    const YearValue = (props) => (
        <View style={{ marginTop: hp(1), alignSelf: 'flex-start' }}>
            <Text style={styles.VAlue1}>{props.label}</Text>
            <View style={{ flexDirection: 'column' }}>
                {
                    props.year.map(item => <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp(50) }}>
                        <Text style={styles.ValueOfLabel}>{item.year}</Text>
                        <Text style={styles.ValueOfLabel}>{item.turnover} cr</Text>
                    </View>)
                }
            </View>
        </View>
    )



    return (
        <ScrollView style={backgroundStyle}>
            {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} hidden /> */}
            {Props.length <= 0 ? (<Spinner visible={spinner} color="#085cab" />) :
            (<View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', flexDirection: 'column', paddingHorizontal: wp(5) }}>
                <View style={{ alignItems: 'center', flexDirection: 'row', width: wp(90) }}>
                    <Avatar.Text size={hp(3)} 
                    style={{ height: hp(10), width: hp(10), borderRadius: hp(5) }} 
                        labelStyle={{fontSize: hp(2.5),
    color: 'white',
    fontFamily: "Poppins-Bold",
        fontWeight: 'bold'}} label={Name(Props.name)} backgroundColor={theme.colors.primary} />
                    <View style={{ flexDirection: 'column', marginLeft: wp(5) }}>
                        <Text style={styles.label}>{Props.name || 'Unknown'}</Text>
                            <Text style={styles.VAlue1}>{Props.seller_buyer_type || 'not provided'}</Text>
                    </View>
                </View>
                <MainSection Section='Personal Details' />
                <LabelValue label='Contact Person Name' value={Props.name_of_contact_person || 'not provided'} />
                <LabelValue label='Contact Person Mobile Number' value={Props.mobile_number || 'not provided'} />
                <LabelValue label='Email Address' value={Props.email || 'not provided'} />
                <MainSection Section='Location Details' />
                    {Props.seller_buyer_type != 'Spinner' && <LabelValue label='City' value={Props.city || 'not provide'} />}
                    <LabelValue label='District' value={Props.district || 'not provide'} />
                    <LabelValue label='State' value={Props.state || 'not provide'} />
                <MainSection Section='Company Details' />
                    <LabelValue label='Header' value={Props.business_type || 'not provide'} />
                {/* <LabelValue label='Mill reg number' value='123456789' /> */}
                    <LabelValue label='Mill reg Date' value={Props.registration_date || 'not provided'} />
                {/* <LabelValue label='Reg as' value='MSME' /> */}
                <YearValue label='Year' year={[{
                    year: Props.turnover_date_one,
                    turnover: Props.turnover_year_one
                }, {
                    year: Props.turnover_date_two,
                    turnover: Props.turnover_year_two
                }, {
                    year: Props.turnover_date_three,
                    turnover: Props.turnover_year_three
                }]} />
                <MainSection Section='Bank Details' />
                <LabelValue label='GST Number' value={Props.gst_no || 'Not Provided'} />
                <LabelValue label='Pan Number' value={Props.pan_no_of_buyer || 'not provided'} />
                <LabelValue label='Bank Name' value={Props.bank_name || 'not provided'} />
                <LabelValue label='Account Holder Name' value={Props.account_holder_name || 'not provided'} />
                <LabelValue label='Branch Address' value={Props.branch_address || 'Not Provided'} />
                <LabelValue label='IFSC Code' value={Props.ifsc_code || 'not provided'} />
                <LabelValue label='Referral Code' value={Props.referral_code || 'not provided'} />
                {/* <LabelValue label='Broker Name' value={Props.broker_name || 'not provided'} /> */}
                    <HeaderValue label='Stamp' value={Props.profile_image} />

            </View>)}
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: hp(2.4),
        color: theme.colors.text,
        fontFamily: "Poppins-Regular"
    },
    HeaderLAbel: {
        fontSize: hp(2.5),
        color: theme.colors.text,
        fontFamily: "Poppins-SemiBold",

    },
    value: {
        fontSize: hp(2.5),
        color: '#fff',
        fontFamily: "Poppins-SemiBold",

    },
    VAlue1: {
        fontSize: hp(2),
        color: theme.colors.text,
        opacity: 0.5,
        fontFamily: "Poppins-Regular"
    },
    ValueOfLabel: {
        fontSize: hp(2),
        color: theme.colors.text,
        fontFamily: "Poppins-Medium",

        lineHeight: hp(3)
    }

})

export default Profile