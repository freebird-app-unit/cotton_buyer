
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import RNOtpVerify from 'react-native-otp-verify';
import { Appbar } from 'react-native-paper';
import { GenericStyles } from '../styles/GenericStyles';
import { useNavigation } from '@react-navigation/native';
import {
    NavigationHeader,
    CustomScreenContainer,
    CustomText,
    CustomTextInput,
    CustomButton,
    FullButtonComponent,
} from '../lib';
import ErrorBoundary from '../common/ErrorBoundary';
import colors from '../common/colors';
import { isAndroid, logErrorWithMessage } from '../utilities/helperFunctions';
import TimerText from '../components/otp/TimerText';
import api_config from '../Api/api';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const RESEND_OTP_TIME_LIMIT = 30; // 30 secs
const AUTO_SUBMIT_OTP_TIME_LIMIT = 4; // 4 secs

let resendOtpTimerInterval;
let autoSubmitOtpTimerInterval;
import VerifyOtpIcon from '../assets/VerifyOtp';
import EditMobileIcon from '../assets/EditMobile';

//const OTPVerificationDeal = function({navigation,ref,props}) {
const OTPVerificationDeal = function (props,route) {
    console.log('route',props.route.params)
    const { otpRequestData, attempts } = props;
    const [dealId, setdeal] = useState(props.route.params.deal_id)
    //const { navigation } = this.props;
    const navigation = useNavigation();
    const [attemptsRemaining, setAttemptsRemaining] = useState(attempts);
    const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
    const [otpArrayMail, setOtpArrayMail] = useState(['', '', '', '', '', '']);

    const [submittingOtp, setSubmittingOtp] = useState(false);
    const [submittingOtpMail, setSubmittingOtpMail] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    // in secs, if value is greater than 0 then button will be disabled
    const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
        RESEND_OTP_TIME_LIMIT,
    );

    // 0 < autoSubmitOtpTime < 4 to show auto submitting OTP text
    const [autoSubmitOtpTime, setAutoSubmitOtpTime] = useState(
        AUTO_SUBMIT_OTP_TIME_LIMIT,
    );

    // TextInput refs to focus programmatically while entering OTP
    const firstTextInputRef = useRef(null);
    const secondTextInputRef = useRef(null);
    const thirdTextInputRef = useRef(null);
    const fourthTextInputRef = useRef(null);
    const fifthTextInputRef = useRef(null);
    const sixthTextInputRef = useRef(null);

    const firstTextInputRefMail = useRef(null);
    const secondTextInputRefMail = useRef(null);
    const thirdTextInputRefMail = useRef(null);
    const fourthTextInputRefMail = useRef(null);
    const fifthTextInputRefMail = useRef(null);
    const sixthTextInputRefMail = useRef(null);
    const [screenName, setScreenName] = useState('');
    //const navigation = this.props.navigation;

    // a reference to autoSubmitOtpTimerIntervalCallback to always get updated value of autoSubmitOtpTime
    const autoSubmitOtpTimerIntervalCallbackReference = useRef();

    useEffect(() => {
        // autoSubmitOtpTime value will be set after otp is detected,
        // in that case we have to start auto submit timer
        autoSubmitOtpTimerIntervalCallbackReference.current = autoSubmitOtpTimerIntervalCallback;
    });

    useEffect(() => {
        getScreenName()
        startResendOtpTimer();

        return () => {
            if (resendOtpTimerInterval) {
                clearInterval(resendOtpTimerInterval);
            }
        };
    }, [resendButtonDisabledTime]);

    useEffect(async () => {
        //getOTPText();
        setSubmittingOtp(true)
        setMobileNumber(await EncryptedStorage.getItem("user_mobile_number"))
    }, []);

    async function getOTPText() {
        // docs: https://github.com/faizalshap/react-native-otp-verify

        RNOtpVerify.getOtp()
            .then(p =>
                RNOtpVerify.addListener(message => {
                    try {
                        if (message) {
                            const messageArray = message.split('\n');
                            if (messageArray[2]) {
                                const otp = messageArray[2].split(' ')[0];
                                if (otp.length === 4) {
                                    setOtpArray(otp.split(''));

                                    // to auto submit otp in 4 secs
                                    setAutoSubmitOtpTime(AUTO_SUBMIT_OTP_TIME_LIMIT);
                                    startAutoSubmitOtpTimer();
                                }
                            }
                        }
                    } catch (error) {
                        alert("Error: " + error);
                        logErrorWithMessage(
                            error.message,
                            'RNOtpVerify.getOtp - read message, OtpVerification',
                        );
                    }
                }),
            )
            .catch(error => {
                logErrorWithMessage(
                    error.message,
                    'RNOtpVerify.getOtp, OtpVerification',
                );
            });

        // remove listener on unmount
        return () => {
            RNOtpVerify.removeListener();
        };
    };

    const startResendOtpTimer = () => {
        if (resendOtpTimerInterval) {
            clearInterval(resendOtpTimerInterval);
        }
        resendOtpTimerInterval = setInterval(() => {
            if (resendButtonDisabledTime <= 0) {
                clearInterval(resendOtpTimerInterval);                   
            } else {
                setResendButtonDisabledTime(resendButtonDisabledTime - 1);
            }
        }, 1000);
    };

    // this callback is being invoked from startAutoSubmitOtpTimer which itself is being invoked from useEffect
    // since useEffect use closure to cache variables data, we will not be able to get updated autoSubmitOtpTime value
    // as a solution we are using useRef by keeping its value always updated inside useEffect(componentDidUpdate)
    const autoSubmitOtpTimerIntervalCallback = () => {
        if (autoSubmitOtpTime <= 0) {
            clearInterval(autoSubmitOtpTimerInterval);

            // submit OTP
            onSubmitButtonPress();
        }
        setAutoSubmitOtpTime(autoSubmitOtpTime - 1);
    };

    const startAutoSubmitOtpTimer = () => {
        if (autoSubmitOtpTimerInterval) {
            clearInterval(autoSubmitOtpTimerInterval);
        }
        autoSubmitOtpTimerInterval = setInterval(() => {
            autoSubmitOtpTimerIntervalCallbackReference.current();
        }, 1000);
    };

    const refCallbackMail = textInputRef => node => {
        textInputRef.current = node;
    };

    const refCallback = textInputRef => node => {
        textInputRef.current = node;
    };

    const onResendOtpButtonPress = () => {
        // clear last OTP
        if (firstTextInputRef) {
            setOtpArray(['', '', '', '', '', '']);
            setOtpArrayMail(['', '', '', '', '', '']);

            firstTextInputRefMail.current.focus();
        }

        setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
        resendOTPApiCall();

        // resend OTP Api call
        // todo
        console.log('todo: Resend OTP');
    };

    const resendOTPApiCall = () => {
        startResendOtpTimer();
        setLoading(true);
        let data = { deal_id: dealId, user_type: 'buyer' }


        const formData = new FormData();
        formData.append('data', JSON.stringify(data));

        axios({
            url: api_config.BASE_URL + api_config.RESEND_DEAL_OTP,
            method: 'POST',
            data: formData,
            headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                setLoading(false)
                console.log("response :", response.data.status);
                if (response.data.status == 200) {
                    alert('sent you code on your mail and mobile number')

                    //getOTPText();
                } else {
                    alert(response.data.message)
                }
            })
            .catch(function (error) {
                setLoading(false)
                alert(defaultMessages.en.serverNotRespondingMsg);
            })
    };

    async function getScreenName() {
        try {
            setScreenName(await EncryptedStorage.getItem("cameFrom"))
            //return await EncryptedStorage.getItem("cameFrom");
        } catch (error) {
            // There was an error on the native side
        }
    }

    const onSubmitButtonPress = async () => {
        
        setLoading(true);
        let otpString = '';
        let otpMailString = '';

        // const { otpArray } = this.state;

        for (var i = 0; i < otpArray.length; i++) {
            otpString += otpArray[i];
        }

        for (var i = 0; i < otpArrayMail.length; i++) {
            otpMailString += otpArrayMail[i];
        }
        console.log('todo: Submit OTP: ' + otpString);
        // let data = { deal_id: dealId, user_type:'buyer', otp: otpString }
        let data = { deal_id:dealId, user_type: 'buyer',mobile_otp :otpString,  email_otp:otpMailString  }

        console.log('data',data)
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));

        axios({
            url: api_config.BASE_URL + api_config.MAKE_DEAL_OTP_VERIFY,
            method: 'POST',
            data: formData,
            headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                setLoading(false)
                console.log("response :", response);
                if (response.data.status == 200) {
                    alert(response.data.message)

                        navigation.navigate('HomeScreen')
                 
                } else {
                    alert(response.data.message)
                }
            })
            .catch(function (error) {
                setLoading(false)
                alert(defaultMessages.en.serverNotRespondingMsg);
            })
    };

    // this event won't be fired when text changes from '' to '' i.e. backspace is pressed
    // using onOtpKeyPress for this purpose

    const onOtpChangeMail = index => {
        return value => {
            if (isNaN(Number(value))) {
                // do nothing when a non digit is pressed
                return;
            }
            const otpArrayCopy = otpArrayMail.concat();
            otpArrayCopy[index] = value;
            setOtpArrayMail(otpArrayCopy);

            for (var i = 0; i < otpArrayCopy.length; i++) {
                if (otpArrayCopy[i] == '') {
                    setSubmittingOtpMail(true)
                } else {
                    setSubmittingOtpMail(false)
                }
            }

            // auto focus to next InputText if value is not blank
            if (value !== '') {
                if (index === 0) {
                    secondTextInputRefMail.current.focus();
                } else if (index === 1) {
                    thirdTextInputRefMail.current.focus();
                } else if (index === 2) {
                    fourthTextInputRefMail.current.focus();
                } else if (index === 3) {
                    fifthTextInputRefMail.current.focus();
                } else if (index === 4) {
                    sixthTextInputRefMail.current.focus();
                }
            }

        };
    };

    const onOtpChange = index => {
        return value => {
            if (isNaN(Number(value))) {
                // do nothing when a non digit is pressed
                return;
            }
            const otpArrayCopy = otpArray.concat();
            otpArrayCopy[index] = value;
            setOtpArray(otpArrayCopy);

            for (var i = 0; i < otpArrayCopy.length; i++) {
                if (otpArrayCopy[i] == '') {
                    setSubmittingOtp(true)
                } else {
                    setSubmittingOtp(false)
                }
            }

            // auto focus to next InputText if value is not blank
            if (value !== '') {
                if (index === 0) {
                    secondTextInputRef.current.focus();
                } else if (index === 1) {
                    thirdTextInputRef.current.focus();
                } else if (index === 2) {
                    fourthTextInputRef.current.focus();
                } else if (index === 3) {
                    fifthTextInputRef.current.focus();
                } else if (index === 4) {
                    sixthTextInputRef.current.focus();
                }
            }

        };
    };

    // only backspace key press event is fired on Android
    // to have consistency, using this event just to detect backspace key press and
    // onOtpChange for other digits press

    const onOtpKeyPressMail = index => {
        return ({ nativeEvent: { key: value } }) => {
            // auto focus to previous InputText if value is blank and existing value is also blank

            if (value === 'Backspace' && otpArrayMail[index] === '') {

                if (index === 1) {
                    firstTextInputRefMail.current.focus();
                } else if (index === 2) {
                    secondTextInputRefMail.current.focus();
                } else if (index === 3) {
                    thirdTextInputRefMail.current.focus();
                } else if (index === 4) {
                    fourthTextInputRefMail.current.focus();
                } else if (index === 5) {
                    fifthTextInputRefMail.current.focus();
                } else if (index === 6) {
                    sixthTextInputRefMail.current.focus();
                }

                /**
                 * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
                 * doing this thing for us
                 * todo check this behaviour on ios
                 */

                if (isAndroid && index > 0) {
                    const otpArrayCopy = otpArrayMail.concat();
                    otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
                    setOtpArrayMail(otpArrayCopy);
                }
            }
        };
    };


    const onOtpKeyPress = index => {
        return ({ nativeEvent: { key: value } }) => {
            // auto focus to previous InputText if value is blank and existing value is also blank

            if (value === 'Backspace' && otpArray[index] === '') {

                if (index === 1) {
                    firstTextInputRef.current.focus();
                } else if (index === 2) {
                    secondTextInputRef.current.focus();
                } else if (index === 3) {
                    thirdTextInputRef.current.focus();
                } else if (index === 4) {
                    fourthTextInputRef.current.focus();
                } else if (index === 5) {
                    fifthTextInputRef.current.focus();
                } else if (index === 6) {
                    sixthTextInputRef.current.focus();
                }

                /**
                 * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
                 * doing this thing for us
                 * todo check this behaviour on ios
                 */

                if (isAndroid && index > 0) {
                    const otpArrayCopy = otpArray.concat();
                    otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
                    setOtpArray(otpArrayCopy);
                }
            }
        };
    };

    return (
        <CustomScreenContainer>
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={loading}
                color="#085cab"
            />
            <View style={{ width: '100%', marginTop: 0, backgroundColor: '#F0F5F9', height: 108, justifyContent: 'center' }}>
                <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                    <Appbar.BackAction
                        color="#000"
                        onPress={() => navigation.navigate('HomeScreen')}
                    />
                    <Appbar.Content
                        style={{ alignItems: 'center' }}
                        color="#000"
                        title="Verify OTP"
                        titleStyle={{ fontSize: 24, fontWeight: 'bold' }}
                    />
                    <Appbar.Action color="transparent" onPress={() => { }} />
                </Appbar.Header>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps={'always'}
                //contentContainerStyle={styles.contentContainer}
                contentContainerStyle={{ flexGrow: 1 }}
                style={styles.scrollViewStyle}>
                <ErrorBoundary screenName={'OTPVerificationDeal'}>
                    <View style={styles.container}>
                        <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center', marginTop: '10%', marginBottom: 50 }}>
                            <VerifyOtpIcon></VerifyOtpIcon>
                        </View>
                        <CustomText>
                            We have sent verification code on your Registered Mail
                            {/* <EditMobileIcon /> */}
                            {/* {otpRequestData.email_id ? 'email' : ' mobile number'}{' '} */}
                        </CustomText>
                        <View style={[GenericStyles.row, GenericStyles.mt12]}>
                            {[
                                firstTextInputRefMail,
                                secondTextInputRefMail,
                                thirdTextInputRefMail,
                                fourthTextInputRefMail,
                                fifthTextInputRefMail,
                                sixthTextInputRefMail
                            ].map((textInputRef, index) => (
                                <CustomTextInput
                                    containerStyle={[GenericStyles.fill, GenericStyles.mr12]}
                                    value={otpArrayMail[index]}
                                    onKeyPress={onOtpKeyPressMail(index)}
                                    onChangeText={onOtpChangeMail(index)}
                                    keyboardType={'numeric'}
                                    maxLength={1}
                                    style={[styles.otpText, GenericStyles.centerAlignedText]}
                                    autoFocus={index === 0 ? true : undefined}
                                    refCallback={refCallbackMail(textInputRef)}
                                    key={index}
                                />
                            ))}
                        </View>

                        <CustomText>
                            We have sent verification code on your number <CustomText style={GenericStyles.bold}>{mobileNumber}</CustomText>
                            {/* <EditMobileIcon /> */}
                            {/* {otpRequestData.email_id ? 'email' : ' mobile number'}{' '} */}
                        </CustomText>
                        <View style={[GenericStyles.row, GenericStyles.mt12]}>
                            {[
                                firstTextInputRef,
                                secondTextInputRef,
                                thirdTextInputRef,
                                fourthTextInputRef,
                                fifthTextInputRef,
                                sixthTextInputRef
                            ].map((textInputRef, index) => (
                                <CustomTextInput
                                    containerStyle={[GenericStyles.fill, GenericStyles.mr12]}
                                    value={otpArray[index]}
                                    onKeyPress={onOtpKeyPress(index)}
                                    onChangeText={onOtpChange(index)}
                                    keyboardType={'numeric'}
                                    maxLength={1}
                                    style={[styles.otpText, GenericStyles.centerAlignedText]}
                                    autoFocus={index === 0 ? true : undefined}
                                    refCallback={refCallback(textInputRef)}
                                    key={index}
                                />
                            ))}
                        </View>
                        {errorMessage ? (
                            <CustomText
                                style={[
                                    GenericStyles.negativeText,
                                    GenericStyles.mt12,
                                    GenericStyles.centerAlignedText,
                                ]}>
                                {errorMessage}
                            </CustomText>
                        ) : null}
                        <FullButtonComponent
                            type={'fill'}
                            text={'Verify'}
                            textStyle={styles.submitButtonText}
                            buttonStyle={GenericStyles.mt24}
                            onPress={onSubmitButtonPress}
                            disabled={submittingOtp}
                        />
                        
                        {resendButtonDisabledTime > 0 ? (
                            <TimerText text={'Resend OTP in'} time={resendButtonDisabledTime} />
                        ) : (
                            <CustomButton
                                type={'link'}
                                text={'Resend'}
                                buttonStyle={styles.otpResendButton}
                                textStyle={styles.otpResendButtonText}
                                onPress={onResendOtpButtonPress}
                            />
                        )}
                        
                        <View style={GenericStyles.fill} />
                        {submittingOtp && <ActivityIndicator />}
                        {autoSubmitOtpTime > 0 &&
                            autoSubmitOtpTime < AUTO_SUBMIT_OTP_TIME_LIMIT ? (
                            <TimerText text={'Submitting OTP in'} time={autoSubmitOtpTime} />
                        ) : null}
                        {/* <CustomText
            style={[GenericStyles.centerAlignedText, GenericStyles.mt12]}>
            {attemptsRemaining || 0} Attempts remaining
          </CustomText> */}
                    </View>
                </ErrorBoundary>
            </ScrollView>
        </CustomScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        borderRadius: 20,
        padding: 16,
        paddingTop: '0%',
        flex: 1,
    },
    submitButtonText: {
        color: colors.WHITE,
        //backgroundColor:colors.GREEN,
        fontFamily: 'popins',
        fontSize: 18,
        alignItems: 'center',
    },
    otpResendButton: {
        alignItems: 'center',
        width: '100%',
        marginTop: 16,
    },
    otpResendButtonText: {
        color: colors.GREEN,
        textTransform: 'none',
        fontSize: 18,
        fontFamily: 'popins',
        textDecorationLine: 'underline',
    },
    otpText: {
        fontWeight: 'bold',
        color: colors.GREEN,
        fontSize: 18,
        width: '100%',
    },
});

OTPVerificationDeal.defaultProps = {
    attempts: 3,
    otpRequestData: {
        username: 'varunon9',
        email_id: false,
        phone_no: true,
    },
};

OTPVerificationDeal.propTypes = {
    otpRequestData: PropTypes.object.isRequired,
    attempts: PropTypes.number.isRequired,
};

export default OTPVerificationDeal;
