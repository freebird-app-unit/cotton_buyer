import React, { useState } from 'react'
import Background1 from '../components/Background1'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { nameValidator } from '../helpers/nameValidator'
import { baseUrl } from '../components/Global';
import api_config from '../Api/api';
import {fieldValidator} from '../helpers/fieldValidator';
import {numberValidator} from '../helpers/numberValidator';
import Spinner from 'react-native-loading-spinner-overlay';
import {mobileValidator} from '../helpers/mobileValidator';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AppState,
  TouchableWithoutFeedback
} from 'react-native';
import {Appbar} from 'react-native-paper';
import EncryptedStorage from 'react-native-encrypted-storage';
import ForgotPasswordIcon from '../assets/ForgotPassword';
import LeftArrow from '../assets/LeftArrow';
import defaultMessages from '../helpers/defaultMessages';

const ForgotPasswordScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false);

  const sendOTP = () => {
    const mobileError = nameValidator(mobile.value)
    if (mobileError) {
      setMobile({ ...mobile, error: mobileError })
      return
    }
    navigation.navigate('VerifyOtpScreen')
  }

  const onForgotPasswordClick = () => {
    const mobileError = mobileValidator(mobile.value);
    
    if (!fieldValidator(mobile.value)) {
      setMobile({ ...mobile, error: defaultMessages.en.required.replace('{0}','Mobile Number') })
      return
    } else if (!numberValidator(mobile.value,"mobile")) {
      setMobile({ ...mobile, error: defaultMessages.en.minlength.replace('{0}','Mobile Number').replace('{1}','10') })
      return
    }
   
    setLoading(true)
    callForgotPasswordAPI()
  }

  async function storeScreenStack() {
    try {
      await EncryptedStorage.setItem("cameFrom","ForgotPasswordScreen");
    } catch (error) {
        // There was an error on the native side
    }
  }

  async function storeUserMobileNumber(value) {
    try {
        await EncryptedStorage.setItem(
            "user_mobile_number",value);
    } catch (error) {
        // There was an error on the native side
    }
  }

  const callForgotPasswordAPI =  () => {
    let data = {mobile_number:mobile.value}

    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
    axios({
      url    : api_config.BASE_URL+api_config.FORGOT_PASSWORD_buyer,
      method : 'POST',
      data   : formData,
      headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' }
    })
      .then(function (response) {
            setLoading(false)
            console.log("response :", response.data.status);
            if(response.data.status == 200) {
                 storeScreenStack()
                 storeUserMobileNumber(mobile.value)
                 navigation.reset({
                    index: 0,
                    routes: [{name: 'VerifyOtpScreen'}],
                 });
            } else if(response.data.status == 404){
              alert(response.data.message)
            } else {
              alert(response.data.message)
            }
        })
        .catch(function (error) {
            setLoading(false)
            alert(defaultMessages.en.serverNotRespondingMsg);
    })
  };

  return (
  
    <View style={{flex: 1,backgroundColor: '#F0F5F9'}}>
    <View style={{width: '100%', marginTop: 0}}>

        <Appbar.Header style={{backgroundColor: 'transparent'}} >
            
            <Appbar.BackAction color='black' onPress={() => navigation.goBack()} />
            <Appbar.Content
              style={{alignItems: 'center'}}
              color='black'
              title="Forgot Password"
              titleStyle={{fontSize:20,fontWeight:'bold'}}
            />
            <Appbar.Action  color="transparent" onPress={() => { }} />
          </Appbar.Header>


        </View>

<View style={{flex: 1, marginTop:'10%',width:'100%',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'white'}}>
    <View style={{justifyContent:'center',width:'100%',alignItems:'center',marginTop:'10%',marginBottom:50}}>
      <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          color="#085cab"
      />
      <ForgotPasswordIcon> </ForgotPasswordIcon>
      </View>
      <TextInput
        label="Mobile Number"
        returnKeyType="done"
        value={mobile.value}
        onChangeText={(text) => setMobile({ value: text, error: '' })}
        error={!!mobile.error}
        errorText={mobile.error}
        autoCapitalize="none"
        autoCompleteType="off"
        textContentType="none"
        keyboardType='phone-pad'
        maxLength={10}
      />
      <Button
        mode="contained"
        onPress={onForgotPasswordClick}
        style={{ marginTop:25 }}
      >
        Send OTP
      </Button>
</View>

    </View>

    
  )
}

export default ForgotPasswordScreen
