import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { theme } from "../core/theme";
import colors from '../common/colors';

import Button from "../components/Button";
import Swiper from "react-native-swiper";
import axios from "axios";
import api_config from "../Api/api";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Spinner from "react-native-loading-spinner-overlay";
import TextInput from "./TextInput";
import Checked from "../assets/Checked";
import Search from "../assets/Search";
import Unchecked from "../assets/Unchecked";
import defaultMessages from "../helpers/defaultMessages";
import NoRecordsFound_Icon from '../assets/NoRecodsFound';
import {
  
  FullButtonComponent,
} from '../lib';
import EncryptedStorage from "react-native-encrypted-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "./responsive-ratio";
import { FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SelectBroker = ({ navigation }) => {

  const [submittingOtp, setSubmittingOtp] = useState(true);

  const districtRef = useRef()
  const StationRef = useRef()
  // console.log('props>>', navigation)
  const [loading, setLoading] = useState(false);

  const ListBroker = async (station) => {
    console.log("valueState", valueState, valueDistrict, valueStation);
    try {
      setLoading(true);
      let token = await EncryptedStorage.getItem("user_data");
      token = JSON.parse(token);
      let data = {}
      data = {
        country_id: "1",
        state_id: valueState,
        city_id: valueDistrict,
        station_id: station,
        buyer_id: await EncryptedStorage.getItem("user_id")
      };
      // console.log("getNegotiationListData");
      console.log('Negotiation Request Param: ' , data);
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));


      axios({
        url: api_config.BASE_URL + api_config.SEARCH_BROKER,
        method: "POST",
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          // Authorization: "Bearer " + token.api_token,
        },
      })
        .then(function (response) {
          setLoading(false);
          console.log('loading',loading)

          console.log("broker list"+ JSON.stringify(response.data));
          if (response.data.status == 200) {
            // setLoading(false);
            setBroker(response.data.data);
            
            setSubmittingOtp(response.data.data.length > 0 ? false : true)
          } else {
            setSubmittingOtp(response.data.data.length > 0 ? false : true)
            setBroker(response.data.data);
            console.log("hi_______>>>", response.data.message);
          }
        })
        .catch(function (error) {
          setLoading(false);

          alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  const AddBroker = async () => {
    // console.log('valueState', selectedBroker);

    let setted = [...new Set(selectedBroker)];

    try {
      setLoading(true);
      let token = await EncryptedStorage.getItem("user_data");
      token = JSON.parse(token);
      let data = {
        buyer_id: await EncryptedStorage.getItem("user_id"),
        broker_id: setted,
      };
      // console.log('Negotiation Request Param: ' + JSON.stringify(data));
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      console.log("getNegotiationListData", formData);

      axios({
        url: api_config.BASE_URL + api_config.SEND_BROKER_REQUEST,
        method: "POST",
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          // 'Authorization': 'Bearer ' + token.api_token
        },
      })
        .then(function (response) {
          setLoading(false);

          console.log("mybroker list", response.data);
          if (response.data.status == 200) {
            // setLoading(false);
            // console.log('navigation',navigation)
            navigation.navigate("Brokers");

            alert(response.data.message);

            // setBroker(response.data.data)
          } else {
            navigation.navigate("Brokers");

            alert(response.data.message);
          }
        })
        .catch(function (error) {
          setLoading(false);

          alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  useEffect(() => {
    // ListBroker();
  }, []);

  const [valueState, setValueState] = useState();
  const [StateError, setStateError] = useState(null);
  const [itemsState, setItemsState] = useState([]);

  const [openDistrict, setOpenDistrict] = useState(false);
  const [valueDistrict, setValueDistrict] = useState();
  const [DistrictError, setDistrictError] = useState(null);
  const [itemsDistrict, setItemsDistrict] = useState([]);

  const [openStation, setOpenStation] = useState(false);
  const [valueStation, setValueStation] = useState();
  const [StationError, setStationError] = useState(null);
  const [itemsStation, setItemsStation] = useState([]);

  const [itemChecked, setItemChecked] = useState(false);
  const [selectedBroker, setselectedBroker] = useState([]);
  const [Broker, setBroker] = useState([]);

  useEffect(() => {
    getStateList();
  }, []);
  const selectedItem = (item, index) => {
    let Bro = Broker;
    item.selected = !item.selected;
    let id = selectedBroker;
    item.selected && id.push(item.id);
    console.log("id", id);
    setselectedBroker(id);

    // const Bro = Broker.map((it) => {
    //     // it.selected = false;
    //     if (it.name === item.name) {
    //         it.selected = !it.selected;
    //     }
    //     return it;
    // });
    console.log("bro", Bro);
    Bro[index] = item;

    // Bro[index] = item
    setBroker(Bro);
    setItemChecked((prevState) => !prevState);
  };
  const renderItem = ({ item, index }) => {
    // console.log('item', item)
    return (
      <TouchableOpacity
        onPress={() => selectedItem(item, index)}
        style={{
          flexDirection: "row",
          marginLeft: "5%",
          marginTop: 10,
          marginRight: "5%",
          height: 40,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {item.selected ? (
            <Checked
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
              }}
            />
          ) : (
            <Unchecked
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
              }}
            />
          )}
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                flex: 1,
                color: theme.colors.textColor,
                fontSize: hp(1.8),
                textAlign: "left",
                textAlignVertical: "center",
              }}
            >
              {item.name}
            </Text>

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                flex: 1,
                color: theme.colors.textColor,
                fontSize: hp(1.7),

                textAlign: "left",
                textAlignVertical: "center",
                opacity: 0.5,
              }}
            >
              {item.mobile_number}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const getStateList = () => {
    let data = { country_id: "1" };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    axios({
      url: api_config.BASE_URL + api_config.GET_STATE,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(function (response) {
        let stateListData = response.data.data;
        // setItemsState([]);
        let stateData = response.data.data.map(item => {
          let obj = {
            label:item.name,
            value:item.id
          }
          return obj
        })
        console.log('state',stateData);
        setItemsState(stateData)

        // for (let i = 0; i < stateListData.length; i++) {
        //   setItemsState((itemsState) => [
        //     ...itemsState,
        //     { label: stateListData[i].name, value: stateListData[i].id },
        //   ]);
        // }
        //setLoading(false)
      })
      .catch(function (error) {
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  const getDistrictList = (stateID) => {
    setLoading(true);
    setStateError(null);
    setValueState(stateID);
    let data = { state_id: stateID };
    console.log("District data: " + JSON.stringify(data));
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    axios({
      url: api_config.BASE_URL + api_config.GET_DISTRICT,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(function (response) {
        let districtListData = response.data.data;
        console.log("District data 2: " + JSON.stringify(districtListData));
        // setItemsDistrict([]);
        setLoading(false);

        let stateData = response.data.data.map(item => {
          let obj = {
            label:item.name,
            value:item.id
          }
          return obj
        })
        setItemsDistrict(stateData)

        // for (let i = 0; i < districtListData.length; i++) {
        //   setItemsDistrict((itemsDistrict) => [
        //     ...itemsDistrict,
        //     { label: districtListData[i].name, value: districtListData[i].id },
        //   ]);
        // }
        setLoading(false);
      })
      .catch(function (error) {
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  const getStationName = (districtID) => {
    setLoading(true);
    setValueDistrict(districtID);
    let data = { district_id: districtID };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    axios({
      url: api_config.BASE_URL + api_config.GET_STATIONNAME,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(function (response) {
        let stationListData = response.data.data;
        // setItemsStation([]);
        setLoading(false);
        let stateData = response.data.data.map(item => {
          let obj = {
            label:item.name,
            value:item.id
          }
          return obj
        })
        setItemsStation(stateData)
        // for (let i = 0; i < stationListData.length; i++) {
        //   setItemsStation((itemsStation) => [
        //     ...itemsStation,
        //     { label: stationListData[i].name, value: stationListData[i].id },
        //   ]);
        // }
        setLoading(false);
      })
      .catch(function (error) {
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  // const[Id,setId] = useState(0);
  const backgroundStyle = {
    flex: 1,
    width: "100%",
    height: hp(86),
    paddingBottom: 30,
    paddingTop: hp(3),
    marginTop: hp(2),
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  };

  const InPutText = (props) => {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          width: wp(90),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: wp(30),
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: hp(1.5),
          }}
        >
          <Text
            style={{
              fontSize: hp(1.9),
              color: theme.colors.text,
              fontFamily: "Poppins-Regular",
            }}
          >
            {props.label}
          </Text>
        </View>
        <View style={{ width: wp(43), marginVertical: -4 }}>
          <TextInput
            returnKeyType="next"
            require={true}
            maxLength={50}
            {...props}
          />
        </View>
        <View
          style={{
            width: wp(18),
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: hp(1.5),
          }}
        >
          <Text
            style={{
              fontSize: hp(1.7),
              color: theme.colors.text,
              opacity: 0.5,
              fontFamily: "Poppins-Regular",
              width: wp(18),
            }}
            numberOfLines={2}
          >
            {props.labelValue}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#333" }}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: wp(5),
          marginTop: hp(5),
          height: hp(5),
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Spinner visible={loading} color="#085cab" />

        <Ionicons
          name="chevron-back-outline"
          size={hp(3)}
          color="#fff"
          style={{ width: wp(30) }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            alignSelf: "center",
            color: "#fff",
            fontSize: hp(3),
            fontFamily: "Poppins - Regular",
          }}
        >
          Select Broker
        </Text>
        <View style={{ width: wp(30) }} />
      </View>
      <View style={backgroundStyle}>
        {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} hidden /> */}

        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "black",
            marginLeft: 20,
            marginBottom: 5,
          }}
        >
          State
        </Text>
        <SelectDropdown
          data={itemsState}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            console.log(selectedItem.value);
            //setValueState(selectedItem.value)
            districtRef.current.openDropdown()
            console.log('distri',districtRef)
            getDistrictList(selectedItem.value);
          }}
          buttonStyle={styles.dropdown3BtnStyle}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View style={styles.dropdown3BtnChildStyle}>
                <Text style={styles.dropdown3BtnTxt}>
                  {selectedItem ? selectedItem.label : "State"}
                </Text>
              </View>
            );
          }}
          renderDropdownIcon={() => {
            return (
              <FontAwesome
                name="chevron-down"
                color={"black"}
                size={14}
                style={{ marginRight: 20 }}
              />
            );
          }}
          dropdownIconPosition={"right"}
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
            fontWeight: "bold",
            color: "black",
            marginLeft: 20,
            marginBottom: 5,
          }}
        >
          District
        </Text>
        <SelectDropdown
          data={itemsDistrict}
          ref={districtRef}
          onSelect={(selectedItem, index) => {
            console.log(JSON.stringify(selectedItem));
            setDistrictError(null);
            StationRef.current.openDropdown()

            getStationName(selectedItem.value);
          }}
          buttonStyle={styles.dropdown3BtnStyle}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View style={styles.dropdown3BtnChildStyle}>
                <Text style={styles.dropdown3BtnTxt}>
                  {selectedItem ? selectedItem.label : "District"}
                </Text>
              </View>
            );
          }}
          renderDropdownIcon={() => {
            return (
              <FontAwesome
                name="chevron-down"
                color={"black"}
                size={14}
                style={{ marginRight: 20 }}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={{marginTop:hp(-4)}}
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
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "black",
            marginLeft: 20,
            marginBottom: 5,
          }}
        >
          Station Name
        </Text>
        <SelectDropdown
          data={itemsStation}
          ref={StationRef}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setStationError(null);
            setValueStation(selectedItem.value);
            ListBroker(selectedItem.value);
          }}
          buttonStyle={styles.dropdown3BtnStyle}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View style={styles.dropdown3BtnChildStyle}>
                <Text style={styles.dropdown3BtnTxt}>
                  {selectedItem ? selectedItem.label : "Station Name"}
                </Text>
              </View>
            );
          }}
          renderDropdownIcon={() => {
            return (
              <FontAwesome
                name="chevron-down"
                color={"black"}
                size={14}
                style={{ marginRight: 20 }}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={{marginTop:hp(-4)}}
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
          {StationError != null ? (
            <Text style={styles.error}>{StationError}</Text>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#F0F5F9",
            marginLeft: "5%",
            marginRight: "5%",
            height: 50,
            marginTop: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Search
            style={{
              width: 30,
              height: 30,
              marginLeft: 10,
              marginRight: 0,
            }}
          />
          <TextInput
            theme={{
              colors: {
                placeholder: "transparent",
                text: "black",
                opacity: 0.5,
                primary: "transparent",
                underlineColor: "transparent",
                background: "transparent",
              },
            }}
            label="Search Buyer"
            style={{
              width: "100%",
              height: 45,
              backgroundColor: "transparent",
            }}
            underlineColor={"transparent"}
            underlineColorAndroid="transparent"
          />
        </View>
        {Broker.length > 0 ? (
          <FlatList
            data={Broker}
            renderItem={renderItem}
            extraData={itemChecked}
          /> ) : (
          <View
          style={{
            // height: '90%',
            flex: 1,
            flexDirection: 'column',
            //backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: '40%',
          }}>
          <NoRecordsFound_Icon />
          <Text>Sorry, no records available</Text>
        </View> )}
       
        {!submittingOtp ? <FullButtonComponent
          type={'fill'}
          text={'Add'}
          textStyle={styles.submitButtonText}
          buttonStyle={{marginBottom:hp(2)}}
          onPress={AddBroker}
          disabled={submittingOtp}
        /> : null }
        {/* <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            marginLeft: 15,
            marginRight: 15,
          }}
        >

          <Button
            mode="contained"
            onPress={() => AddBroker()}
            style={{ flex: 1, marginLeft: 5 }}
            labelStyle={{ color: "white", textTransform: "capitalize" }}
          >
            Add
          </Button>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: hp(2.4),
    color: theme.colors.text,
    fontFamily: "Poppins-Regular",
  },
  value: {
    fontSize: hp(2.5),
    color: "#fff",
    fontFamily: "Poppins-Bold",
  },
  VAlue1: {
    fontSize: hp(2),
    color: theme.colors.text,
    fontFamily: "Poppins-Regular",
  },
  dropdown3BtnStyle: {
    width: "90%",
    height: 50,
    backgroundColor: "#FFF",
    paddingHorizontal: 0,
    borderWidth: wp(0.2),
    borderRadius: 4,
    borderColor: "#d1d1d1",
    left: 19,
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  submitButtonText: {
    color: colors.WHITE,
    //backgroundColor:colors.GREEN,
    fontFamily: 'popins',
    fontSize: 18,
    alignItems: 'center',
  },
  dropdown3RowTxt: {
    color: "#000",
    textAlign: "center",
    fontWeight: "normal",
    fontSize: 16,
    marginHorizontal: 0,
    width: "100%",
  },
});

export default SelectBroker;
