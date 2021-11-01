import React, { useState, useEffect } from "react";
import { View, Text, Alert,RefreshControl } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "./responsive-ratio";
// import { Button } from './Button';
import Button from "./Button";

import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { theme } from "../core/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import api_config from "../Api/api";
import EncryptedStorage from "react-native-encrypted-storage";
import defaultMessages from "../helpers/defaultMessages";
import Spinner from "react-native-loading-spinner-overlay";

const App = ({ navigation }) => {
  const ListBroker = async () => {
    try {
      // setListView(true)

      let data = {
        buyer_id: await EncryptedStorage.getItem("user_id"),
      };
      // console.log("getNegotiationListData");
      // console.log('Negotiation Request Param: ' + JSON.stringify(data));
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.ADD_BROKER_LIST,
        method: "POST",
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          setListView(false);
          serRefresh(false);

          console.log(
            "my negotiation list response :>>>>>>>>>>>>>>>>>>>",
            response.data.data
          );
          if (response.data.status == 200) {
            let bro = response.data.data.filter(
              (item) => item.type === "default"
            );
            DefaultBrokerList(bro);
            let Brokernotdefault = response.data.data.filter(
              (item) => item.type === "not_default"
            );
            BrokerList(Brokernotdefault);
            // self.setState({ ProfileData: response.data.data, spinner: false, });
          } else {
            // setListView(false)

            console.log("hi_______", response.data.message);
          }
        })
        .catch(function (error) {
          // self.setState({
          //     spinner: false,
          //     message: 'Something bad happened ' + error,
          // }),
          // setListView(false)
          setLoader(false);
          serRefresh(false);


          alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
      serRefresh(false);

      // setListView(false)
    }
  };

  useEffect(() => {
    console.log("hi");
    ListBroker();
  }, []);

  const [listView, setListView] = useState(false);

  const [loading, setLoader] = useState(false);
  const [Broker, BrokerList] = useState([]);
  const [DefaultBroker, DefaultBrokerList] = useState([]);

  const styles = {
    label: (color) => ({
      fontSize: hp(2.1),
      color: color,
      fontWeight: "bold",
      fontFamily: "Poppins - Bold",
    }),

    balance: {
      fontSize: hp(3),
      fontFamily: "Poppins - Bold",
      fontWeight: "bold",
    },
    time: {
      fontSize: hp(1.5),
      opacity: 0.5,
      fontFamily: "Poppins - Regular",
    },
    sectionHeader: {
      marginVertical: hp(1.5),
      // paddingLeft: 10,
      // paddingRight: 10,
      // paddingBottom: hp(1),
      fontSize: hp(2.1),
      fontFamily: "Poppins-Bold",
      color: "#333",
      opacity: 0.5,
      // backgroundColor: '#8fb1aa',
    },
  };
  const [height, setHeight] = useState(59.5);

  const onList = (event) => {
    let { height } = event.nativeEvent.layout;
    console.log("height>>>>", height);
    setHeight(height);
  };

  const deleteBroker = async (item) => {
    console.log("item", item);
    try {
      setLoader(true);

      let data = {
        buyer_id: await EncryptedStorage.getItem("user_id"),
        broker_id: item.id,
      };
      // console.log("getNegotiationListData");
      // console.log('Negotiation Request Param: ' + JSON.stringify(data));
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.DELETE_BROKER,
        method: "POST",
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          setLoader(false);

          console.log("my delete list response :>>>>>>>>>>>>>>>>>>>", response);
          if (response.data.status == 200) {
            // ListBroker();
            let bro = Broker.filter((i) => item.id != i.id && i);
            console.log("bro", bro);

            BrokerList(bro);
            alert("Removed successfully");
            // self.setState({ ProfileData: response.data.data, spinner: false, });
          } else {
            // setLoader(false)
            alert(response.data.message);
            console.log("hi_______", response.data.message);
          }
        })
        .catch(function (error) {
          // self.setState({
          //     spinner: false,
          //     message: 'Something bad happened ' + error,
          // }),
          setLoader(false);

          alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const defaultBrokerFunction = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: wp(94),
          marginVertical: hp(1),
          backgroundColor: "#F0F5F9",
          padding: wp(2),
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            height: hp(8),
            alignSelf: "center",
            marginHorizontal: wp(2),
          }}
        >
          <Text style={styles.label(theme.colors.primary)}>{item.name}</Text>

          <Text
            style={{
              color: "#333",
              opacity: 0.5,
              fontSize: hp(2.1),
              fontFamily: "Poppins - Bold",
            }}
          >
            {item.city}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="checkmark-circle"
              size={hp(2.5)}
              color={theme.colors.primary}
            />
            <Text
              style={{
                fontSize: hp(1.9),
                color: theme.colors.primary,
                fontFamily: "Poppins - Regular",
              }}
            >
              Verified
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: wp(94),
          marginVertical: hp(1),
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            height: hp(8),
            alignSelf: "center",
            marginHorizontal: wp(2),
          }}
        >
          <Text style={styles.label(theme.colors.text)}>{item.name}</Text>

          <Text
            style={{
              color: "#333",
              opacity: 0.5,
              fontSize: hp(2.1),
              fontFamily: "Poppins - Bold",
            }}
          >
            {item.city}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="checkmark-circle"
              size={hp(2.5)}
              color={theme.colors.primary}
            />
            <Text
              style={{
                fontSize: hp(1.9),
                color: theme.colors.primary,
                fontFamily: "Poppins - Regular",
              }}
            >
              Verified
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            borderWidth: wp(0.2),
            right: wp(2),
            borderColor: "red",
            borderRadius: wp(0.5),
            paddingVertical: wp(0.3),
            paddingHorizontal: wp(0.5),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Alert.alert("E-Cotton", "Do you want to remove this broker", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => deleteBroker(item) },
              ]);
            }}
          >
            <Ionicons name="trash-outline" size={hp(2.5)} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const [refreshing, serRefresh] = useState(false)

  const _onRefresh = () => {
    serRefresh(true);
    ListBroker();
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "transparent",
        marginTop: hp(1),
        paddingHorizontal: wp(3),
      }}
    >
      <Spinner visible={loading} color="#085cab" />

      <View style={{ flex: 1, marginTop: hp(2) }}>
        <View
          style={{
            flexDirection: "row",
            marginVertical: hp(2.5),
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: hp(2.5),
              color: theme.colors.text,
              fontWeight: "bold",
              // paddingVertical: 12,
            }}
          >
            Default
          </Text>
        </View>
        <View
          style={{
            flexShrink: 1,
          }}
        >
          <FlatList
            data={DefaultBroker}
            renderItem={defaultBrokerFunction}
            keyExtractor={(item, index) => index}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={_onRefresh}
              />
            }
          />
        </View>
        <View
          style={{
            flexShrink: 1,
          }}
        >
          <FlatList
            data={Broker}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={_onRefresh}
              />
            }
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: hp(1),
              marginLeft: wp(3),
              // marginRight: 15,
            }}
          >
            <Button
              mode="contained"
              onPress={() => navigation.navigate("SelectBroker")}
              style={{
                // marginRight: 5,
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: theme.colors.primary,
                width: wp(50),
                // alignSelf: 'flex-start'
              }}
              labelStyle={{
                color: theme.colors.primary,
                textTransform: "capitalize",
              }}
            >
              Add Broker
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default App;
