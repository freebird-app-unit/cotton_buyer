import React, { useState,useEffect } from 'react'
import Background1 from '../components/Background1'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { nameValidator } from '../helpers/nameValidator'
import {fieldValidator} from '../helpers/fieldValidator';
import { baseUrl } from '../components/Global';
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
import SetPasswordIcon from '../assets/SetPassword';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import api_config from '../Api/api';
import EncryptedStorage from 'react-native-encrypted-storage';
import defaultMessages from '../helpers/defaultMessages';

const SetPasswordScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState({value: '', error: ''});
  const [confirmPassword, setConfirmPassword] = useState({value: '', error: ''});

  const sendOTP = () => {
    const passwordError = nameValidator(password.value)
    if (passwordError) {
      setPassword({ ...password, error: passwordError })
      return
    }
     navigation.reset({
        index: 0,
        routes: [{name: 'Dashboard'}],
      });
  }

  useEffect(async () => {
    //getOTPText();
    setMobileNumber(await EncryptedStorage.getItem("user_mobile_number"))
  }, []);

  const onSetPasswordClick = () => {
    if (!fieldValidator(password.value)) {
      setPassword({ ...password, error: defaultMessages.en.required.replace('{0}','Password') })
      return
    }
    if (!fieldValidator(confirmPassword.value)) {
      setConfirmPassword({ ...confirmPassword, error: defaultMessages.en.required.replace('{0}','Confirm Password') })
      return
    }
    if(password.value != confirmPassword.value) {
      alert("Password and confirm password are not match.")
      return
    }
    setLoading(true)
    callResetPasswordAPI()
  }

  const callResetPasswordAPI = () => {
    let data = {mobile_number:mobileNumber,password:password.value,confirm_password:password.value}
    
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
    axios({
      url    : api_config.BASE_URL+api_config.RESET_PASSWORD_BUYER,
      method : 'POST',
      data   : formData,
      headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' }
    })
      .then(function (response) {
            setLoading(false)
            console.log("response :", response.data.status);
            if(response.data.status == 200) {
              //alert("Password has been reset successfully")
                 navigation.reset({
                    index: 0,
                    routes: [{name: 'LoginScreen'}],
                 });
            } if(response.data.status == 404) {
              alert(response.data.message)
            } else {
              alert(response.data.message)
            }
        })
        .catch(function (error) {
            setLoading(false)
            alert(defaultMessages.en.serverNotRespondingMsg);
    })
  }

  return (
    <View style={{flex: 1,backgroundColor: '#F0F5F9'}}>
    <View style={{width: '100%', marginTop: 0}}>

        <Appbar.Header style={{backgroundColor: 'transparent'}} >
            
            <Appbar.BackAction color='black' onPress={() => navigation.goBack()} />
            <Appbar.Content
              style={{alignItems: 'center'}}
              color='black'
              title="Set Password"
              titleStyle={{fontSize:16,fontWeight:'bold'}}
            />
            <Appbar.Action  color="transparent" onPress={() => {

                    
                  }} />
          </Appbar.Header>


        </View>

<View style={{flex: 1, marginTop:'10%',width:'100%',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'white'}}>

<View style={{justifyContent:'center',width:'100%',alignItems:'center',marginTop:'10%',marginBottom:50}}>
      <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          color="#085cab"
      />
      <SetPasswordIcon> </SetPasswordIcon>
      </View>

      
      <TextInput
        label="New Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        autoCapitalize="none"
        secureTextEntry
      />

       <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        autoCapitalize="none"
        secureTextEntry
      />

      <Button
        mode="contained"
        onPress={onSetPasswordClick}
        style={{ marginTop: 25 }}
      >
        Set Password
      </Button>
</View>

    </View>
  )
}

export default SetPasswordScreen
