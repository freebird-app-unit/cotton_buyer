import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Image,
} from 'react-native';
import {baseUrl} from '../components/Global';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import TextInputFY from '../components/TextInputFY';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';
import {fieldValidator} from '../helpers/fieldValidator';
import {numberValidator} from '../helpers/numberValidator';
import {gstValidator} from '../helpers/gstValidator';
import {panValidator} from '../helpers/panValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import {nameValidator} from '../helpers/nameValidator';
import DropDownPicker from 'react-native-dropdown-picker';
import {Appbar} from 'react-native-paper';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import defaultMessages from '../helpers/defaultMessages';
import api_config from '../Api/api';
import {registration_api} from '../Api/registration_api';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
// Import Image Picker
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ActionSheet from 'react-native-actionsheet';

import CircleGreen from '../assets/CircleGreen';
import CircleGray from '../assets/CircleGray';
import Stamp_Icon from '../assets/Stamp';
import {PermissionsAndroid} from 'react-native';

import LineGray from '../assets/LineWithCircleGray';
import LineGreen from '../assets/LineWithCircleGreen';
import { heightPercentageToDP } from '../components/responsive-ratio';
// import IC_PD from '../assets/personal_details.jpeg';
// import IC_LD from '../assets/location_details.jpeg';
// import IC_CD from '../assets/company_details.jpeg';
// import IC_BD from '../assets/bank_details.jpeg';

const RegisterScreen = ({navigation, ref}) => {
  const [sellerNameFocus, setSellerNameFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);
  // const element = <TextInput.Icon name="lock-outline" />;
  const [sellerName, setSellerName] = useState({value: '', error: ''});
  const [postalAddress, setPostalAddress] = useState({value: '', error: ''});
  const [contactPerson, setContactPerson] = useState({value: '', error: ''});
  const [contactNumber, setContactNumber] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [properiterShip, setProperiterShip] = useState({value: '', error: ''});
  const [millRegNo, setMillRegNo] = useState({value: '', error: ''});
  const [millRegDate, setMillRegDate] = useState({value: '', error: ''});
  const [msmeType, setMsmeType] = useState({value: '', error: ''});
  const [firstFY, setFirstFY] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });
  const [firstFYTurnOver, setFirstFYTurnOver] = useState({
    value: '',
    error: '',
  });
  const [secondFY, setSecondFY] = useState({value: '', error: ''});
  const [secondFYTurnOver, setSecondFYTurnOver] = useState({
    value: '',
    error: '',
  });
  const [thirdFY, setThirdFY] = useState({value: '', error: ''});
  const [thirdFYTurnOver, setThirdFYTurnOver] = useState({
    value: '',
    error: '',
  });
  const [cottonTradeExperience, setCottonTradeExperience] = useState({
    value: '',
    error: '',
  });
  const [gstNo, setGstNo] = useState({value: '', error: ''});
  const [panNo, setPanNo] = useState({value: '', error: ''});
  const [bankName, setBankName] = useState({value: '', error: ''});
  const [accountHolderName, setAccountHolderName] = useState({
    value: '',
    error: '',
  });
  const [branchAddress, setBranchAddress] = useState({value: '', error: ''});
  const [ifscCode, setIfscCode] = useState({value: '', error: ''});
  const [referralCode, setReferralCode] = useState({value: '', error: ''});

  const [open, setOpen] = useState(false);
  const [propriterShipValue, setBusinessTypeItem] = useState(null);
  const [propriterShipError, setPropriterShipError] = useState(null);
  const [items, setItems] = useState([]);
  const [itemsPropriterShip, setItemsPropriterShip] = useState([]);

  //const [businessTypeItems, setBusinessTypeItem] = useState([]);

  const [vCalendar, setVisibleCalendar] = useState(false);
  const [millRegistrationDate, setMillRegistrationDate] = useState('');
  const [millRegistrationDateError, setMillRegistrationDateError] =
    useState(null);
  const [isStartDate, setIsStartDate] = useState(true);

  const [openRMSME, setOpenRMSME] = useState(false);
  const [valueRMSME, setValueRMSME] = useState(null);
  const [RMSMEError, setRMSMEError] = useState(null);
  const [itemsRMSME, setItemsRMSME] = useState([]);

  const [openState, setOpenState] = useState(false);
  const [valueState, setValueState] = useState(null);
  const [StateError, setStateError] = useState(null);
  const [itemsState, setItemsState] = useState([]);

  const [openDistrict, setOpenDistrict] = useState(false);
  const [valueDistrict, setValueDistrict] = useState(null);
  const [DistrictError, setDistrictError] = useState(null);
  const [itemsDistrict, setItemsDistrict] = useState([]);

  const [openStation, setOpenStation] = useState(false);
  const [valueStation, setValueStation] = useState(null);
  const [StationError, setStationError] = useState(null);
  const [itemsStation, setItemsStation] = useState([]);

  const [openCity, setOpenCity] = useState(false);
  const [valueCity, setValueCity] = useState(null);
  const [CityError, setCityError] = useState(null);
  const [itemsCity, setItemsCity] = useState([]);

  const [openSellerType, setOpenSellerType] = useState(false);
  const [valueSellerType, setValueSellerType] = useState(null);
  const [sellerTypeError, setSellerTypeError] = useState(null);
  const [itemsSellerType, setItemsSellerType] = useState([]);

  //setContainer(myData.reduce((obj, data) => ({ ...obj, [data.pk]: data.name }), {}))
  const [container, setContainer] = useState({});

  const [openFirstYear, setOpenFirstYear] = useState(false);
  const [valueFirstYear, setValueFirstYear] = useState(null);
  const currentFYString =
    new Date().getFullYear() - 1 + ' - ' + new Date().getFullYear();
  const [itemsFirstYear, setItemsFirstYear] = useState([
    {
      label: new Date().getFullYear() - 1 + ' - ' + new Date().getFullYear(),
      value: '1',
    },
  ]);

  const [openSecondYear, setOpenSecondYear] = useState(false);
  const [valueSecondYear, setValueSecondYear] = useState(null);
  const [itemsSecondYear, setItemsSecondYear] = useState([
    {label: '2020-2019', value: '1'},
    {label: '2019-2018', value: '2'},
    {label: '2018-2017', value: '3'},
  ]);

  const [openThirdYear, setOpenThirdYear] = useState(false);
  const [valueThirdYear, setValueThirdYear] = useState(null);
  const [itemsThirdYear, setItemsThirdYear] = useState([
    {label: '2020-2019', value: '1'},
    {label: '2019-2018', value: '2'},
    {label: '2018-2017', value: '3'},
  ]);

  const [isDisplayMillData, setMillData] = useState(true);

  const [personaldetails, setPersonalDetails] = useState(true);
  const [locationdetails, setLocationDetails] = useState(false);
  const [companydetails, setCompanyDetails] = useState(false);
  const [bankdetails, setBankDetails] = useState(false);

  const [registrationYear, setRegistrationYear] = useState([]);
  const [filePath, setFilePath] = useState({});
  const [stampImageError, setStampImageError] = useState(null);
  const [fcmToken, setFCMToken] = useState(null)
  let actionSheet = useRef();
  var optionArray = ['Choose image', 'Capture image', 'Cancel'];

  useEffect(async () => {
    try {
      let getFcmToken = await EncryptedStorage.getItem('FCMToken')
      setFCMToken(getFcmToken)
      setLoading(true);
      setFilePath({});
      var minOffset = 0,
        maxOffset = 30; // Change to whatever you want
      var thisYear = new Date().getFullYear();
      setRegistrationYear([]);
      for (var i = minOffset; i <= maxOffset; i++) {
        let year = thisYear - i;
        setRegistrationYear(registrationYear => [
          ...registrationYear,
          {label: year, value: year},
        ]);
      }
      getRegistrationDropDownData();
    } catch (e) {
      console.error(e);
    }
  }, []);

  async function storeUserMobileNumber(value) {
    try {
      await EncryptedStorage.setItem('user_mobile_number', value);
    } catch (error) {
      // There was an error on the native side
    }
  }

  const getRegistrationDropDownData = () => {
    axios({
      url: api_config.BASE_URL + api_config.REGISTRATION_SCREEN_DROPDOWN_DATA,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(function (response) {
        console.log('Response 111: ' + new Date());
        setLoading(false);
        let sellerListData = response.data.data[0].buyer_type;
        let businessTypeListData = response.data.data[0].business_type;
        let RMSMEListData = response.data.data[0].registration_as;
        setItemsSellerType([]);
        setItemsPropriterShip([]);
        //setItemsRMSME([]);
        for (let i = 0; i < sellerListData.length; i++) {
          setItemsSellerType(itemsSellerType => [
            ...itemsSellerType,
            {label: sellerListData[i].name, value: sellerListData[i].id},
          ]);
        }
        for (let j = 0; j < businessTypeListData.length; j++) {
          setItemsPropriterShip(itemsPropriterShip => [
            ...itemsPropriterShip,
            {
              label: businessTypeListData[j].name,
              value: businessTypeListData[j].id,
            },
          ]);
        }
        // for (let k = 0; k < RMSMEListData.length; k++) {
        //   setItemsRMSME(itemsRMSME => [...itemsRMSME, {label: RMSMEListData[k].name,value: RMSMEListData[k].id}]);
        // }
        console.log('Response 123: ' + new Date());

        getStateList();
      })
      .catch(function (error) {
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  const getStateList = () => {
    let data = {country_id: '1'};

    const formData = new FormData();
    formData.append('data', JSON.stringify(data));

    axios({
      url: api_config.BASE_URL + api_config.GET_STATE,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then(function (response) {
        let stateListData = response.data.data;
        setItemsState([]);

        for (let i = 0; i < stateListData.length; i++) {
          setItemsState(itemsState => [
            ...itemsState,
            {label: stateListData[i].name, value: stateListData[i].id},
          ]);
        }
        //setLoading(false)
      })
      .catch(function (error) {
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  const getDistrictList = stateID => {
    setLoading(true);
    setStateError(null);
    setValueState(stateID);

    let data = {state_id: stateID};
    console.log('District data: ' + JSON.stringify(data));
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));

    axios({
      url: api_config.BASE_URL + api_config.GET_DISTRICT,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then(function (response) {
        let districtListData = response.data.data;
        console.log('District data 2: ' + JSON.stringify(districtListData));
        setItemsDistrict([]);
        setLoading(false);
        for (let i = 0; i < districtListData.length; i++) {
          setItemsDistrict(itemsDistrict => [
            ...itemsDistrict,
            {label: districtListData[i].name, value: districtListData[i].id},
          ]);
        }
        setLoading(false);
      })
      .catch(function (error) {
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  const getStationName = districtID => {
    setLoading(true);
    setValueDistrict(districtID);
    let data = {district_id: districtID};

    const formData = new FormData();
    formData.append('data', JSON.stringify(data));

    axios({
      url: api_config.BASE_URL + api_config.GET_STATIONNAME,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then(function (response) {
        if (response.data.status == 200) {
          let stationListData = response.data.data;
          setItemsStation([]);
          setLoading(false);
          for (let i = 0; i < stationListData.length; i++) {
            setItemsStation(itemsStation => [
              ...itemsStation,
              {label: stationListData[i].name, value: stationListData[i].id},
            ]);
          }
        } else {
          let d =[]
          d.push({
              label: "No station avilable", value: 0
          })
          setItemsStation(d)
          setLoading(false);
        }
      })
      .catch(function (error) {
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  const getCityName = districtID => {
    setLoading(true);
    setValueDistrict(districtID);
    let data = { district_id: districtID };

    const formData = new FormData();
    formData.append('data', JSON.stringify(data));

    axios({
      url: api_config.BASE_URL + api_config.GET_CITY,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then(function (response) {
        if (response.data.status == 200) {
          let stationListData = response.data.data;
          setItemsCity([]);
          setLoading(false);
          for (let i = 0; i < stationListData.length; i++) {
            setItemsCity(itemsStation => [
              ...itemsStation,
              { label: stationListData[i].name, value: stationListData[i].id },
            ]);
          }
        } else {
          let d = []
          d.push({
            label: "No City avilable", value: 0
          })
          setItemsCity(d)
          setLoading(false);
        }
      })
      .catch(function (error) {
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  const onDatePressed = () => {
    setVisibleCalendar(true);
    setIsStartDate(true);
  };

  const currentDate = moment(new Date()).format('YYYY-MM-DD');
  const maximumDate = moment(currentDate)
    .subtract(1, 'day')
    .format('YYYY-MM-DD');
  const minimumDate = '2000-01-01';

  const onDayPress = day => {
    if (isStartDate) setMillRegistrationDate(day.dateString);
    else setReminderDate(day.dateString);

    setMillRegistrationDateError(null);
    setVisibleCalendar(false);
    setIsStartDate(true);
  };

  const onBackPressed = () => {
    if (personaldetails) {
    }

    if (locationdetails) {
      setPersonalDetails(true);
      setLocationDetails(false);
      setCompanyDetails(false);
      setBankDetails(false);
    }

    if (companydetails) {
      setPersonalDetails(false);
      setLocationDetails(true);
      setCompanyDetails(false);
      setBankDetails(false);
    }

    if (bankdetails) {
      setPersonalDetails(false);
      setLocationDetails(false);
      setCompanyDetails(true);
      setBankDetails(false);
    }
  };

  const onSignUpPressed = () => {
    if (personaldetails) {
      if (valueSellerType == null) {
        setSellerTypeError(
          defaultMessages.en.selectValidation.replace('{0}', 'buyer type'),
        );
        return;
      }
      if (!fieldValidator(sellerName.value)) {
        setSellerName({
          ...sellerName,
          error: defaultMessages.en.required.replace('{0}', 'buyer name'),
        });
        setSellerNameFocus(true);
        return;
      }
      if (!fieldValidator(postalAddress.value)) {
        setPostalAddress({
          ...postalAddress,
          error: defaultMessages.en.required.replace('{0}', 'postal address'),
        });
        return;
      }
      if (!fieldValidator(contactPerson.value)) {
        setContactPerson({
          ...contactPerson,
          error: defaultMessages.en.required.replace(
            '{0}',
            'name of contact person',
          ),
        });
        return;
      }
      if (!fieldValidator(contactNumber.value)) {
        setContactNumber({
          ...contactNumber,
          error: defaultMessages.en.required.replace('{0}', 'contact number'),
        });
        return;
      } else if (!numberValidator(contactNumber.value, 'mobile')) {
        setContactNumber({
          ...contactNumber,
          error: defaultMessages.en.minlength
            .replace('{0}', 'Contact number')
            .replace('{1}', '10'),
        });
        return;
      }
      if (!fieldValidator(password.value) || password.value.length < 6) {
        setPassword({
          ...password,
          error: password.value.length < 6 ? defaultMessages.en.minlength
            .replace('{0}', 'Password')
            .replace('{1}', '6') : defaultMessages.en.required.replace('{0}', 'Password'),
        });
        return;
      }
      if (!fieldValidator(confirmPassword.value) || confirmPassword.value.length < 6) {
        setConfirmPassword({
          ...confirmPassword,
          error: confirmPassword.value.length < 6 ? defaultMessages.en.minlength
            .replace('{0}', 'Confirm Password')
            .replace('{1}', '6') : defaultMessages.en.required.replace('{0}', 'Confirm Password'),
        });
        return;
      }
      if (password.value != confirmPassword.value) {
        alert('Password and confirm password are not match.');
        return;
      }
      if (!fieldValidator(email.value)) {
        setEmail({
          ...email,
          error: defaultMessages.en.required.replace('{0}', 'email address'),
        });
        return;
      } else if (!emailValidator(email.value)) {
        setEmail({
          ...email,
          error: defaultMessages.en.required.replace(
            '{0}',
            'valid email address',
          ),
        });
        return;
      }

      setPersonalDetails(false);
      setLocationDetails(true);
      setCompanyDetails(false);
      setBankDetails(false);
    }

    if (companydetails) {
      if (propriterShipValue == null) {
        setPropriterShipError(
          defaultMessages.en.selectValidation.replace('{0}', 'business type'),
        );
        return;
      }
      if (millRegistrationDate == '') {
        setMillRegistrationDateError(
          defaultMessages.en.selectValidation.replace(
            '{0}',
            'registration Date',
          ),
        );
        return;
      }
      if (!fieldValidator(firstFYTurnOver.value)) {
        setFirstFYTurnOver({
          ...firstFYTurnOver,
          error: defaultMessages.en.required.replace('{0}', 'Turnover'),
        });
        return;
      }
      if (!fieldValidator(secondFYTurnOver.value)) {
        setSecondFYTurnOver({
          ...secondFYTurnOver,
          error: defaultMessages.en.required.replace('{0}', 'Turnover'),
        });
        return;
      }
      if (!fieldValidator(thirdFYTurnOver.value)) {
        setThirdFYTurnOver({
          ...thirdFYTurnOver,
          error: defaultMessages.en.required.replace('{0}', 'Turnover'),
        });
        return;
      }
      if (!fieldValidator(cottonTradeExperience.value)) {
        setCottonTradeExperience({
          ...cottonTradeExperience,
          error: defaultMessages.en.required.replace(
            '{0}',
            'Period of operation in cotton trade',
          ),
        });
        return;
      }
      if (Object.keys(filePath).length == 0) {
        setStampImageError(
          defaultMessages.en.selectValidation.replace('{0}', 'stamp image'),
        );
        return;
      }

      setPersonalDetails(false);
      setLocationDetails(false);
      setCompanyDetails(false);
      setBankDetails(true);
    }

    if (locationdetails) {
      if (valueState == null) {
        setStateError(
          defaultMessages.en.selectValidation.replace('{0}', 'state'),
        );
        return;
      }
      if (valueDistrict == null) {
        setDistrictError(
          defaultMessages.en.selectValidation.replace('{0}', 'district'),
        );
        return;
      }
      if (valueSellerType != 'Spinner' && valueCity == null) {
        setStationError(
          defaultMessages.en.selectValidation.replace('{0}', 'station'),
        );
        return;
      }

      setPersonalDetails(false);
      setLocationDetails(false);
      setCompanyDetails(true);
      setBankDetails(false);
    }

    if (bankdetails) {
      if (!fieldValidator(gstNo.value)) {
        setGstNo({
          ...gstNo,
          error: defaultMessages.en.required.replace('{0}', 'GST Number'),
        });
        return;
      } else if (!numberValidator(gstNo.value, 'gst')) {
        setGstNo({
          ...gstNo,
          error: defaultMessages.en.minlength
            .replace('{0}', 'GST Number')
            .replace('{1}', '15'),
        });
        return;
      } else if (!gstValidator(gstNo.value)) {
        setGstNo({
          ...gstNo,
          error: defaultMessages.en.validInput.replace('{0}', 'GST Number'),
        });
        return;
      }
      if (!fieldValidator(panNo.value)) {
        setPanNo({
          ...panNo,
          error: defaultMessages.en.required.replace('{0}', 'PAN Number'),
        });
        return;
      } else if (!numberValidator(panNo.value, 'pan')) {
        setPanNo({
          ...panNo,
          error: defaultMessages.en.minlength
            .replace('{0}', 'PAN Number')
            .replace('{1}', '10'),
        });
        return;
      } else if (!panValidator(panNo.value)) {
        setPanNo({
          ...panNo,
          error: defaultMessages.en.validInput.replace('{0}', 'PAN Number'),
        });
        return;
      }
      if (!fieldValidator(bankName.value)) {
        setBankName({
          ...bankName,
          error: defaultMessages.en.required.replace('{0}', 'Bank Name'),
        });
        return;
      }
      if (!fieldValidator(branchAddress.value)) {
        setBranchAddress({
          ...branchAddress,
          error: defaultMessages.en.required.replace('{0}', 'Branch Address'),
        });
        return;
      }
      if (!fieldValidator(ifscCode.value)) {
        setIfscCode({
          ...ifscCode,
          error: defaultMessages.en.required.replace('{0}', 'IFSC Code'),
        });
        return;
      }

      callRegisterAPI();
    }
  };

  async function storeScreenStack() {
    try {
      await EncryptedStorage.setItem('cameFrom', 'RegisterScreen');
    } catch (error) {
      // There was an error on the native side
    }
  }

  const callRegisterAPI = () => {
    setLoading(true);
    let data = registration_api(
      valueSellerType,
      sellerName.value,
      password.value,
      postalAddress.value,
      contactPerson.value,
      contactNumber.value,
      email.value,
      propriterShipValue,
      millRegNo.value,
      millRegistrationDate,
      valueRMSME,
      firstFYTurnOver.value,
      new Date().getFullYear() - 1 + ' - ' + new Date().getFullYear(),
      secondFYTurnOver.value,
      new Date().getFullYear() - 2 + ' - ' + (new Date().getFullYear() - 1),
      thirdFYTurnOver.value,
      new Date().getFullYear() - 3 + ' - ' + (new Date().getFullYear() - 2),
      cottonTradeExperience.value,
      gstNo.value,
      panNo.value,
      valueState,
      valueDistrict,
      valueCity,
      valueStation,
      bankName.value,
      accountHolderName.value,
      branchAddress.value,
      ifscCode.value,
      referralCode.value,
      fcmToken,
    );
    console.log('Registration Data: >>>>>>>>' + data);
    const formData = new FormData();

    formData.append('data', JSON.stringify(data));
    formData.append('image', {
      uri: filePath.assets[0].uri,
      name: Math.floor(Date.now() / 1000) + '.jpg',
      type: 'image/jpg',
    });
    console.log('Formdata: ' + JSON.stringify(formData));
    axios({
      url: api_config.BASE_URL + api_config.SELLER_REGISTRATION,
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(function (response) {
        console.log('response :', response);
        setLoading(false);
        if (response.data.status == 200) {
          storeUserMobileNumber(response.data.data.mobile_number);
          storeScreenStack();
          navigation.reset({
            index: 0,
            routes: [{name: 'VerifyOtpScreen'}],
          });
        } else {
          alert(response.data.message);
          setLoading(false);
        }
      })
      .catch(function (error) {
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  const onChangedContactNumber = text => {
    setContactNumber({value: text.replace(/[^0-9]/g, ''), error: ''});
  };

  const onChangedGstNumber = text => {
    setGstNo({value: text.replace(/[^a-zA-Z0-9]/g, ''), error: ''});
  };

  const onChangedPanNumber = text => {
    setPanNo({value: text.replace(/[^a-zA-Z0-9]/g, ''), error: ''});
  };

  const onChange = (event, selectedDate) => {
    console.log('selecrted', selectedDate, event);
    setVisibleCalendar(false);

    if (isStartDate)
      setMillRegistrationDate(new Date(selectedDate).toLocaleDateString());
    else setReminderDate(new Date(selectedDate).toLocaleDateString());

    // if (selectedDate === undefined) {
    //   this.setState({
    //     show: !this.state.show,
    //   });
    //   return;
    // } else {
    //   // setMillRegistrationDate(day.dateString)
    //   this.setState({
    //     show: !this.state.show,
    //     From_date: new Date(selectedDate).toLocaleDateString(),
    //   });
    //   // global.End_date = new Date(selectedDate).toLocaleDateString()
    // }

    console.log(
      'millRegistrationDate',
      new Date(selectedDate).toLocaleDateString(),
      millRegistrationDate,
    );
    // setMillRegistrationDateError(null);
    setVisibleCalendar(false);
    setIsStartDate(false);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Hello: ' + err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: false,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.assets[0].base64);
        console.log('uri -> ', response.assets[0].uri);
        console.log('width -> ', response.assets[0].width);
        console.log('height -> ', response.assets[0].height);
        console.log('fileSize -> ', response.assets[0].fileSize);
        console.log('type -> ', response.assets[0].type);
        console.log('fileName -> ', response.assets[0].fileName);
        setFilePath(response);
        setStampImageError(null);
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.assets[0].base64);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);
      setFilePath(response);
      setStampImageError(null);
    });
  };

  const onUploadStampClicked = () => {
    actionSheet.current.show();
  };

  return (
    <Background>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}>
        <Spinner visible={loading} color="#085cab" />
        {/* <View style={{width: '100%', marginTop: heightPercentageToDP(2), backgroundColor: '#F0F5F9'}}>
          <Appbar.Header style={{backgroundColor: 'transparent'}}>
            <Appbar.BackAction
              color="#000"
              onPress={() => navigation.goBack()}
            />
            <Appbar.Content
              style={{alignItems: 'center'}}
              color="#000"
              title="Create an account"
              titleStyle={{fontSize: 24, fontWeight: 'bold'}}
            />
            <Appbar.Action color="transparent" onPress={() => {}} />
          </Appbar.Header>
        </View> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          //contentContainerStyle={styles.contentContainer}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 60}}
          style={{backgroundColor: 'white'}}>
          <View pointerEvents={loading ? 'none' : 'auto'}>
            <View style={{height: 15}} />

            {personaldetails && (
              <View
                style={{
                  flexDirection: 'row',
                  width: '83%',
                  marginLeft: '11%',
                  alignItems: 'center',
                }}>
                <CircleGreen />
                <Image
                  style={{
                    width: '25%',
                    backgroundColor: '#d1d1d1',
                    borderWidth: 1,
                    height: 1,
                  }}
                />
                <CircleGray />

                <Image
                  style={{
                    width: '25%',
                    backgroundColor: '#d1d1d1',
                    borderWidth: 1,
                    height: 1,
                  }}
                />
                <CircleGray />

                <Image
                  style={{
                    width: '25%',
                    backgroundColor: '#d1d1d1',
                    borderWidth: 1,
                    height: 1,
                  }}
                />
                <CircleGray />
              </View>
            )}

            {locationdetails && (
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  marginLeft: '6%',
                  alignItems: 'center',
                }}>
                <CircleGreen />
                <Image
                  style={{
                    width: '25%',
                    backgroundColor: '#69ba53',
                    borderWidth: 1,
                    height: 1,
                  }}
                />
                <CircleGreen />
                <Image
                  style={{
                    width: '25%',
                    backgroundColor: '#d1d1d1',
                    borderWidth: 1,
                    height: 1,
                  }}
                />
                <CircleGray />
                <Image
                  style={{
                    width: '25%',
                    backgroundColor: '#d1d1d1',
                    borderWidth: 1,
                    height: 1,
                  }}
                />
                <CircleGray />
              </View>
            )}

            {companydetails && (
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  marginLeft: '6%',
                  alignItems: 'center',
                }}>
                <CircleGreen />
                <Image
                  style={{
                    width: '25%',
                    backgroundColor: '#69ba53',
                    borderWidth: 1,
                    height: 1,
                  }}
                />
                <CircleGreen />
                <Image
                  style={{
                    width: '25%',
                    backgroundColor: '#69ba53',
                    borderWidth: 1,
                    height: 1,
                  }}
                />
                <CircleGreen />
                <Image
                  style={{
                    width: '25%',
                    backgroundColor: '#d1d1d1',
                    borderWidth: 1,
                    height: 1,
                  }}
                />
                <CircleGray />
              </View>
            )}

            {bankdetails && (
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  marginLeft: '6%',
                  alignItems: 'center',
                }}>
                <CircleGreen />
                <Image
                  style={{
                    width: '25%',
                    backgroundColor: '#69ba53',
                    borderWidth: 1,
                    height: 1,
                  }}
                />
                <CircleGreen />
                <Image
                  style={{
                    width: '25%',
                    backgroundColor: '#69ba53',
                    borderWidth: 1,
                    height: 1,
                  }}
                />
                <CircleGreen />
                <Image
                  style={{
                    width: '25%',
                    backgroundColor: '#69ba53',
                    borderWidth: 1,
                    height: 1,
                  }}
                />
                <CircleGreen />
              </View>
            )}

            <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
              <Text
                style={{
                  color: 'green',
                  textAlign: 'center',
                  fontSize: 12,
                  flex: 1,
                }}>
                Personal{'\n'}Details
              </Text>

              <Text
                style={{
                  color:
                    locationdetails || companydetails | bankdetails
                      ? 'green'
                      : '#d1d1d1',
                  textAlign: 'center',
                  fontSize: 12,
                  flex: 1,
                }}>
                Location{'\n'}Details
              </Text>

              <Text
                style={{
                  color: companydetails | bankdetails ? 'green' : '#d1d1d1',
                  textAlign: 'center',
                  fontSize: 12,
                  flex: 1,
                }}>
                Company{'\n'}Details
              </Text>

              <Text
                style={{
                  color: bankdetails ? 'green' : '#d1d1d1',
                  textAlign: 'center',
                  fontSize: 12,
                  flex: 1,
                }}>
                Bank{'\n'}Details
              </Text>
            </View>

            {personaldetails && (
              <View style={{marginTop: 5, marginBottom: 5}}>
                <SelectDropdown
                  data={itemsSellerType}
                  defaultValue={itemsSellerType}
                  onSelect={(selectedItem, index) => {
                    setSellerTypeError(null);
                    setValueSellerType(selectedItem.label);
                  }}
                  buttonStyle={styles.dropdown3BtnStyle}
                  renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                      <View style={styles.dropdown3BtnChildStyle}>
                        <Text style={styles.dropdown3BtnTxt}>
                          {selectedItem ? selectedItem.label : 'Buyer Type'}
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
                        style={{marginRight: 20}}
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
                <View style={styles.container}>
                  {sellerTypeError != null ? (
                    <Text style={styles.error}>{sellerTypeError}</Text>
                  ) : null}
                </View>
                <View style={{marginTop: 0, marginBottom: 0}}>
                  <TextInput
                    autoFocus={sellerNameFocus}
                    label="Name of buyer"
                    returnKeyType="next"
                    value={sellerName.value}
                    onChangeText={text =>
                      setSellerName({value: text, error: ''})
                    }
                    error={!!sellerName.error}
                    errorText={sellerName.error}
                    require={true}
                    maxLength={60}
                  />
                </View>
                <View style={{marginTop: 0, marginBottom: 0}}>
                  <TextInput
                    style={styles.postInput}
                    onChangeText={text =>
                      setPostalAddress({value: text, error: ''})
                    }
                    multiline={true}
                    value={postalAddress.value}
                    numberOfLines={5}
                    label="Postal Address"
                    underlineColorAndroid="transparent"
                    returnKeyType="next"
                    require={true}
                    error={!!postalAddress.error}
                    errorText={postalAddress.error}
                    maxLength={200}
                  />
                </View>
                <View style={{marginTop: 0, marginBottom: 0}}>
                  <TextInput
                    label="Name of contact person"
                    returnKeyType="next"
                    value={contactPerson.value}
                    onChangeText={text =>
                      setContactPerson({value: text, error: ''})
                    }
                    error={!!contactPerson.error}
                    errorText={contactPerson.error}
                    maxLength={60}
                  />
                </View>
                <TextInput
                  label="Contact number"
                  returnKeyType="next"
                  value={contactNumber.value}
                  onChangeText={text => onChangedContactNumber(text)}
                  error={!!contactNumber.error}
                  errorText={contactNumber.error}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={text => setPassword({value: text, error: ''})}
                    error={!!password.error}
                    errorText={password.error}
                    maxLength={40}
                    secureTextEntry={hidePass ? true : false}
                    pass={true}
                    show={hidePass}
                    rightOnpress={() => setHidePass(!hidePass)}
                  />
                  
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    label="Confirm Password"
                    returnKeyType="done"
                    value={confirmPassword.value}
                    onChangeText={text =>
                      setConfirmPassword({value: text, error: ''})
                    }
                    error={!!confirmPassword.error}
                    errorText={confirmPassword.error}
                    maxLength={40}
                    secureTextEntry={hideConfirmPass ? true : false}
                    pass={true}
                    show={hideConfirmPass}
                    rightOnpress={() => setHideConfirmPass(!hideConfirmPass)}
                  />
                 
                </View>
                <TextInput
                  label="Email address"
                  returnKeyType="next"
                  value={email.value}
                  onChangeText={text => setEmail({value: text, error: ''})}
                  error={!!email.error}
                  errorText={email.error}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  maxLength={60}
                />
              </View>
            )}

            {companydetails && (
              <View style={{marginTop: 5, marginBottom: 5}}>
                <SelectDropdown
                  data={itemsPropriterShip}
                  defaultValue={itemsPropriterShip}
                  onSelect={(selectedItem, index) => {
                    setPropriterShipError(null);
                    setBusinessTypeItem(selectedItem.label);
                  }}
                  buttonStyle={styles.dropdown3BtnStyle}
                  renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                      <View style={styles.dropdown3BtnChildStyle}>
                        <Text style={styles.dropdown3BtnTxt}>
                          {selectedItem
                            ? selectedItem.label
                            : 'Select business type'}
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
                        style={{marginRight: 20}}
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
                <View style={styles.container}>
                  {propriterShipError != null ? (
                    <Text style={styles.error}>{propriterShipError}</Text>
                  ) : null}
                </View>

                {/* <TouchableOpacity onPress={onDatePressed}>
                  <View
                    style={{
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginLeft: 20,
                      marginRight: 20,
                      marginBottom: 0,
                      marginVertical: 8,
                      height: 50,
                      borderColor: '#8D8F91',
                      borderWidth: 1,
                      borderRadius: 5,
                    }}>
                    {millRegistrationDate == '' && (
                      <Text
                        style={{
                          fontSize: 16,
                          color: theme.colors.textColor,
                          backgroundColor: theme.colors.surface,
                        }}>
                        Registration Date
                      </Text>
                    )}
                    <Text
                      style={{
                        fontSize: 16,
                        color: theme.colors.secondary,
                        backgroundColor: theme.colors.surface,
                      }}>
                      {millRegistrationDate}
                    </Text>
                    <Icon name="calendar" size={15} color="#000" />
                  </View>
                </TouchableOpacity> */}
                {/* {vCalendar && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={
                      new Date(currentDate)
                    }
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                                )} */}

                <View style={{marginTop: 15, marginBottom: 5}}>
                  <SelectDropdown
                    data={registrationYear}
                    defaultValue={registrationYear}
                    onSelect={(selectedItem, index) => {
                      setMillRegistrationDateError(null);
                      setMillRegistrationDate(selectedItem.label);
                    }}
                    buttonStyle={styles.dropdown3BtnStyle}
                    renderCustomizedButtonChild={(selectedItem, index) => {
                      return (
                        <View style={styles.dropdown3BtnChildStyle}>
                          <Text style={styles.dropdown3BtnTxt}>
                            {selectedItem
                              ? selectedItem.label
                              : 'Registration Year'}
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
                          style={{marginRight: 20}}
                        />
                      );
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown3DropdownStyle}
                    rowStyle={styles.dropdown3RowStyle}
                    renderCustomizedRowChild={(item, index) => {
                      return (
                        <View style={styles.dropdown3RowChildStyle}>
                          <Text style={styles.dropdown3RowTxt}>
                            {item.label}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
                <View style={styles.container}>
                  {millRegistrationDateError != null ? (
                    <Text style={styles.error}>
                      {millRegistrationDateError}
                    </Text>
                  ) : null}
                </View>

                <View style={styles.container}>
                  {RMSMEError != null ? (
                    <Text style={styles.error}>{RMSMEError}</Text>
                  ) : null}
                </View>

                <View style={{marginTop: 0, marginBottom: 0}}>
                  <View style={styles1.container}>
                    <TextInputFY
                      style={styles1.button}
                      label="Financial Year"
                      returnKeyType="next"
                      value={
                        new Date().getFullYear() -
                        1 +
                        ' - ' +
                        new Date().getFullYear()
                      }
                      onChangeText={text =>
                        setFirstFYTurnOver({value: text, error: ''})
                      }
                      maxLength={15}
                      editable={false}
                    />
                    <TextInputFY
                      style={styles1.button2}
                      label="Turnover in crore(Rs)"
                      returnKeyType="next"
                      value={firstFYTurnOver.value}
                      onChangeText={text =>
                        setFirstFYTurnOver({value: text, error: ''})
                      }
                      error={!!firstFYTurnOver.error}
                      errorText={firstFYTurnOver.error}
                      maxLength={10}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.container}>
                    {firstFYTurnOver.error != '' ? (
                      <Text style={styles.error}>{firstFYTurnOver.error}</Text>
                    ) : null}
                  </View>
                  <View style={styles1.container}>
                    <TextInputFY
                      style={styles1.button}
                      label="Financial Year"
                      returnKeyType="next"
                      value={
                        new Date().getFullYear() -
                        2 +
                        ' - ' +
                        (new Date().getFullYear() - 1)
                      }
                      //onChangeText={text => setFirstFYTurnOver({value: text, error: ''})}
                      //error={!!firstFYTurnOver.error}
                      //errorText={firstFYTurnOver.error}
                      maxLength={15}
                      editable={false}
                    />
                    <TextInputFY
                      style={styles1.button2}
                      label="Turnover in crore(Rs)"
                      returnKeyType="next"
                      value={secondFYTurnOver.value}
                      onChangeText={text =>
                        setSecondFYTurnOver({value: text, error: ''})
                      }
                      error={!!secondFYTurnOver.error}
                      errorText={secondFYTurnOver.error}
                      maxLength={10}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.container}>
                    {secondFYTurnOver.error != '' ? (
                      <Text style={styles.error}>{secondFYTurnOver.error}</Text>
                    ) : null}
                  </View>
                  <View style={styles1.container}>
                    <TextInputFY
                      style={styles1.button}
                      label="Financial Year"
                      returnKeyType="next"
                      value={
                        new Date().getFullYear() -
                        3 +
                        ' - ' +
                        (new Date().getFullYear() - 2)
                      }
                      //onChangeText={text => setFirstFYTurnOver({value: text, error: ''})}
                      //error={!!firstFYTurnOver.error}
                      //errorText={firstFYTurnOver.error}
                      maxLength={15}
                      editable={false}
                    />
                    <TextInputFY
                      style={styles1.button2}
                      label="Turnover in crore(Rs)"
                      returnKeyType="next"
                      value={thirdFYTurnOver.value}
                      onChangeText={text =>
                        setThirdFYTurnOver({value: text, error: ''})
                      }
                      error={!!thirdFYTurnOver.error}
                      errorText={thirdFYTurnOver.error}
                      maxLength={10}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.container}>
                    {thirdFYTurnOver.error != '' ? (
                      <Text style={styles.error}>{thirdFYTurnOver.error}</Text>
                    ) : null}
                  </View>
                </View>

                <View style={{marginTop: 0, marginBottom: 5}}>
                  <TextInput
                    label="Period of operation in cotton trade"
                    returnKeyType="done"
                    value={cottonTradeExperience.value}
                    onChangeText={text =>
                      setCottonTradeExperience({value: text, error: ''})
                    }
                    error={!!cottonTradeExperience.error}
                    errorText={cottonTradeExperience.error}
                    maxLength={5}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.container}>
                  {cottonTradeExperience.error != '' ? (
                    <Text style={styles.error}>
                      {cottonTradeExperience.error}
                    </Text>
                  ) : null}
                </View>
                <View style={{marginTop: 0, marginBottom: 5, marginLeft: '5%'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: 'black',
                      marginLeft: 5,
                      marginBottom: 5,
                    }}>
                    Stamp
                  </Text>
                  <TouchableOpacity onPress={onUploadStampClicked}>
                    {Object.keys(filePath).length == 0 ? (
                      <Stamp_Icon />
                    ) : (
                      <Image
                        style={{width: 100, height: 100, borderRadius: 10}}
                        source={{uri: filePath.assets[0].uri}}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.container}>
                  {stampImageError != null ? (
                    <Text style={styles.error}>{stampImageError}</Text>
                  ) : null}
                </View>
              </View>
            )}

            {locationdetails && (
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'black',
                    marginLeft: 20,
                    marginBottom: 5,
                  }}>
                  State
                </Text>
                <SelectDropdown
                  data={itemsState}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    console.log(selectedItem.value);
                    //setValueState(selectedItem.value)
                    getDistrictList(selectedItem.value);
                  }}
                  buttonStyle={styles.dropdown3BtnStyle}
                  renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                      <View style={styles.dropdown3BtnChildStyle}>
                        <Text style={styles.dropdown3BtnTxt}>
                          {selectedItem ? selectedItem.label : 'State'}
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
                        style={{marginRight: 20}}
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
                <View style={styles.container}>
                  {StateError != null ? (
                    <Text style={styles.error}>{StateError}</Text>
                  ) : null}
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'black',
                    marginLeft: 20,
                    marginBottom: 5,
                  }}>
                  District
                </Text>
                <SelectDropdown
                  data={itemsDistrict}
                  onSelect={(selectedItem, index) => {
                    console.log(JSON.stringify(selectedItem));
                    setDistrictError(null);
                    valueSellerType == 'Spinner' ? getStationName(selectedItem.value) : getCityName(selectedItem.value);
                  }}
                  buttonStyle={styles.dropdown3BtnStyle}
                  renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                      <View style={styles.dropdown3BtnChildStyle}>
                        <Text style={styles.dropdown3BtnTxt}>
                          {selectedItem ? selectedItem.label : 'District'}
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
                        style={{marginRight: 20}}
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
                <View style={styles.container}>
                  {DistrictError != null ? (
                    <Text style={styles.error}>{DistrictError}</Text>
                  ) : null}
                </View>
                
                {valueSellerType != 'Spinner' ? (<><Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'black',
                    marginLeft: 20,
                    marginBottom: 5,
                  }}>
                  City
                </Text>
                <SelectDropdown
                  data={itemsCity}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setCityError(null);
                    setValueCity(selectedItem.value);
                  }}
                  buttonStyle={styles.dropdown3BtnStyle}
                  renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                      <View style={styles.dropdown3BtnChildStyle}>
                        <Text style={styles.dropdown3BtnTxt}>
                          {selectedItem ? selectedItem.label : 'City Name'}
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
                        style={{ marginRight: 20 }}
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
                <View style={styles.container}>
                  {CityError != null ? (
                    <Text style={styles.error}>{CityError}</Text>
                  ) : null}
                </View></> ) : null}
              </View>
            )}

            {bankdetails && (
              <View>
                <TextInput
                  label="GST Number"
                  returnKeyType="done"
                  value={gstNo.value}
                  onChangeText={text => onChangedGstNumber(text)}
                  error={!!gstNo.error}
                  errorText={gstNo.error}
                  maxLength={15}
                  autoCapitalize="characters"
                />

                <TextInput
                  label="PAN Number"
                  returnKeyType="done"
                  value={panNo.value}
                  onChangeText={text => onChangedPanNumber(text)}
                  error={!!panNo.error}
                  errorText={panNo.error}
                  maxLength={10}
                  autoCapitalize="characters"
                />

                <TextInput
                  label="Bank Name"
                  returnKeyType="done"
                  value={bankName.value}
                  onChangeText={text => setBankName({value: text, error: ''})}
                  error={!!bankName.error}
                  errorText={bankName.error}
                  maxLength={120}
                />

                <TextInput
                  label="Branch Name"
                  returnKeyType="done"
                  value={branchAddress.value}
                  onChangeText={text =>
                    setBranchAddress({value: text, error: ''})
                  }
                  error={!!branchAddress.error}
                  errorText={branchAddress.error}
                  maxLength={200}
                />

                <TextInput
                  label="IFSC Code"
                  returnKeyType="done"
                  value={ifscCode.value}
                  onChangeText={text => setIfscCode({value: text, error: ''})}
                  error={!!ifscCode.error}
                  errorText={ifscCode.error}
                  maxLength={10}
                />

                <TextInput
                  label="Referral Code"
                  returnKeyType="done"
                  value={referralCode.value}
                  onChangeText={text =>
                    setReferralCode({value: text, error: ''})
                  }
                  error={!!referralCode.error}
                  errorText={referralCode.error}
                  maxLength={10}
                />
              </View>
            )}

            {personaldetails && (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  marginLeft: 15,
                  marginRight: 15,
                }}>
                <Button
                  mode="contained"
                  onPress={onSignUpPressed}
                  style={{flex: 1, marginLeft: 5}}
                  labelStyle={{color: 'white', textTransform: 'capitalize'}}>
                  Next
                </Button>
              </View>
            )}

            {locationdetails && (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 24,
                  marginLeft: 15,
                  marginRight: 15,
                }}>
                <Button
                  mode="contained"
                  onPress={onBackPressed}
                  style={{
                    flex: 1,
                    marginRight: 5,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: 'gray',
                  }}
                  labelStyle={{color: 'gray', textTransform: 'capitalize'}}>
                  Back
                </Button>

                <Button
                  mode="contained"
                  onPress={onSignUpPressed}
                  style={{flex: 1, marginLeft: 5}}
                  labelStyle={{color: 'white', textTransform: 'capitalize'}}>
                  Next
                </Button>
              </View>
            )}

            {companydetails && (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 24,
                  marginLeft: 15,
                  marginRight: 15,
                }}>
                <Button
                  mode="contained"
                  onPress={onBackPressed}
                  style={{
                    flex: 1,
                    marginRight: 5,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: 'gray',
                  }}
                  labelStyle={{color: 'gray', textTransform: 'capitalize'}}>
                  Back
                </Button>

                <Button
                  mode="contained"
                  onPress={onSignUpPressed}
                  style={{flex: 1, marginLeft: 5}}
                  labelStyle={{color: 'white', textTransform: 'capitalize'}}>
                  Next
                </Button>
              </View>
            )}

            {bankdetails && (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 24,
                  marginLeft: 15,
                  marginRight: 15,
                }}>
                <Button
                  mode="contained"
                  onPress={onBackPressed}
                  style={{
                    flex: 1,
                    marginRight: 5,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: 'gray',
                  }}
                  labelStyle={{color: 'gray', textTransform: 'capitalize'}}>
                  Back
                </Button>

                <Button
                  mode="contained"
                  onPress={onSignUpPressed}
                  style={{flex: 1, marginLeft: 5}}
                  labelStyle={{color: 'white', textTransform: 'capitalize'}}>
                  Register
                </Button>
              </View>
            )}
          </View>
        </ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <ActionSheet
              ref={actionSheet}
              // Title of the Bottom Sheet
              title={'Which one do you like ?'}
              // Options Array to show in bottom sheet
              options={optionArray}
              // Define cancel button index in the option array
              // This will take the cancel option in bottom
              // and will highlight it
              cancelButtonIndex={2}
              // Highlight any specific option
              destructiveButtonIndex={1}
              onPress={index => {
                // Clicking on the option will give you alert
                //alert(index)
                if (index == 0) {
                  chooseFile('photo');
                } else if (index == 1) {
                  captureImage('photo');
                }
                //alert(optionArray[index]);
              }}
            />
          </View>
        </SafeAreaView>
        {/* {vCalendar && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'transparent',
              flex: 1,
              width: '100%',
              height: '100%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Calendar
              current={currentDate}
              minDate={minimumDate}
              maxDate={maximumDate}
              style={styles.calendar}
              onDayPress={onDayPress}
            />
          </View>
        )} */}
      </View>
    </Background>
  );
};

const styles1 = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
    //top: -5,
  },
  button: {
    width: '88%',
    height: 50,
    fontSize: 14,
    backgroundColor: theme.colors.surface,
  },
  button2: {
    width: '90%',
    height: 50,
    left: -20,
    fontSize: 14,
    backgroundColor: theme.colors.surface,
  },
});

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    margin: 0,
    marginHorizontal: 5,
    left: 15,
    fontFamily: 'Outrun future',
    fontWeight: 'bold',
    backgroundColor: theme.colors.surface,
  },
  alreadyAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 25,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  scrollViewStyle: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderBottomStartRadius: 0,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 50,
  },
  postInput: {
    fontSize: 15,
    width: '90%',
    fontFamily: 'Outrun future',
    backgroundColor: theme.colors.surface,
    textAlignVertical: 'top',
  },
  container: {
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
    marginTop: 0,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },

  dropdown3BtnStyle: {
    width: '90%',
    height: 45,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'lightgray',
    left: 19,
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 16,
    marginHorizontal: 0,
    fontFamily: 'Poppins-Regular'

  },
  dropdown3DropdownStyle: {backgroundColor: 'white',marginTop:heightPercentageToDP(-4)},
  dropdown3RowStyle: {
    backgroundColor: '#fff',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3RowTxt: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 16,
    marginHorizontal: 0,
    width: '100%',
    fontFamily: 'Poppins-Regular'
  },
  icon: {
    position: 'absolute',
    right: 25,
    paddingLeft: 10,
    width: 50,
  },
  actionButtonStyle: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#f5821f',
    marginTop: 30,
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
  },
  actionTitleStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
});

export default RegisterScreen;
