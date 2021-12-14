import React, { Component, useRef } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AppState,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
  SafeAreaView,
  Platform,
} from "react-native";
import { baseUrl } from "../components/Global";
import { fontSizeMyPostCenterText } from "../components/Global";
import { vLineMyPostStyle } from "../components/Global";
import Background from "../components/Background";
import Header from "../components/Header";
import { Card } from "react-native-elements";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Appbar, Searchbar, Button, Badge } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import Icon from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import { theme } from "../core/theme";
import TextInput from "../components/TextInput";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NoRecordsFound_Icon from '../assets/NoRecodsFound';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from "../helpers/backHandler";
import defaultMessages from "../helpers/defaultMessages";

//svgs
import Home from "../assets/Home";
import Employee from "../assets/Employee";
import EmployeeGray from "../assets/EmployeeGray";
import CustomerIcon from "../assets/CustomerIcon";
import FilterSettings from "../assets/FilterSettings";
import Checked from "../assets/Checked";
import Search from "../assets/Search";
import Unchecked from "../assets/Unchecked";
import api_config from "../Api/api";
import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";
import { heightPercentageToDP } from "../components/responsive-ratio";


class NotificationSelectSeller extends Component {

  constructor(props) {
    super(props);
    this.districtRef = React.createRef();
    this.StationRef = React.createRef();
    this.state = {
      appState: AppState.currentState,
      loading: "true",
      spinner: true,
      
      jsonData: {},
      token: "",
      stateOpenState: false,
      stateValue: null,
      stateList: [],
      stateDrpDwnPlaceholder: "",
      districtOpenState: false,
      districtValue: null,
      districtList: [],
      districtDrpDwnPlaceholder: "",
      stationOpenState: false,
      stationValue: null,
      cityValue: null,

      stationlist: [],
      citylist:[],
      cityDrpDwnPlaceholder:"",
      stationDrpDwnPlaceholder: "",
      sellerList: [],
      stateId: "",
      districtId: "",
      stationId: "",
      cityId:'',
    };

    this.setStateValue = this.setStateValue.bind(this);
    this.setStateOpenState = this.setStateOpenState.bind(this);
    this.setItemsState = this.setStateItemsState.bind(this);

    this.setStateValue = this.setStateValue.bind(this);
    this.setStateOpenState = this.setStateOpenState.bind(this);
    this.setItemsState = this.setStateItemsState.bind(this);

    this.setDistrictValue = this.setDistrictValue.bind(this);
    this.setDistrictOpenState = this.setDistrictOpenState.bind(this);
    this.setItemsState = this.setDistrictItemsState.bind(this);

    this.setStationValue = this.setStationValue.bind(this);
    this.setStationOpenState = this.setStationOpenState.bind(this);
    this.setStationItemsState = this.setStationItemsState.bind(this);
  }

  setStateOpenState(stateOpenState) {
    this.setState({
      stateOpenState,
    });
  }

  setStateValue(callback) {
    this.setState((state) => ({
      stateValue: callback(state.stateValue),
    }));
  }

  setStateItemsState(callback) {
    this.setState((state) => ({
      stateList: callback(state.items),
    }));
  }

  setDistrictOpenState(districtOpenState) {
    this.setState({
      districtOpenState,
    });
  }

  setDistrictValue(callback) {
    this.setState((state) => ({
      districtValue: callback(state.districtValue),
    }));
  }

  setDistrictItemsState(callback) {
    this.setState((state) => ({
      districtList: callback(state.items),
    }));
  }

  setStationOpenState(stationOpenState) {
    this.setState({
      stationOpenState,
    });
  }

  setStationValue(callback) {
    this.setState((state) => ({
      stationValue: callback(state.stationValue),
    }));
  }

  setStationItemsState(callback) {
    this.setState((state) => ({
      stationlist: callback(state.items),
    }));
  }

  componentDidMount() {
    this.setState({ spinner: true });
    this.getStateList();
    // handleAndroidBackButton(this.goToDashboard);
  }

  goToDashboard = () => {
    const navigation = this.props.navigation;
    let canGoBack = navigation.canGoBack();
    return canGoBack ? navigation.goBack() : navigation.replace("Dashboard");
  };

  componentWillUnmount() {
    // removeAndroidBackButtonHandler();
  }

  getStateList = () => {
    let data = { country_id: "1" };
    var self = this;
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

        self.setState({

          spinner: false,
        });
        let stateListData = response.data.data;
        let stateArray = [];
        self.setState({
          stateList: [],
        });

        for (let i = 0; i < stateListData.length; i++) {
          if (i == 0) {
            self.setState({
              stateDrpDwnPlaceholder: stateListData[i].name,
            });
            self.getDistrictList(stateListData[0].id);
            self.setState({ stateId: stateListData[0].id });
          }
          stateArray.push({
            label: stateListData[i].name,
            value: stateListData[i].id,
          });
        }

        self.setState({
          stateList: stateArray,
        });
      })
      .catch(function (error) {
        self.setState({

          spinner: false,
        });
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  getDistrictList = (stateID) => {
    let data = { state_id: stateID };
    var self = this;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    self.setState({

      spinner: true,
    });
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
        self.setState({

          spinner: false,
        });
        if (response.data.status == 200){
        let districtListData = response.data.data;
        let districtArray = [];
        for (let i = 0; i < districtListData.length; i++) {
          if (i == 0) {
            self.setState({
              districtDrpDwnPlaceholder: districtListData[i].name,
            });
            // self.getStationName(districtListData[0].id);
            // self.getCityName(districtListData[0].id);

            self.setState({ districtId: districtListData[0].id });
          }
          districtArray.push({
            label: districtListData[i].name,
            value: districtListData[i].id,
          });
        }

        self.setState({
          districtList: districtArray,
        });
      }
        else {
          let d = []
          d.push({
            label: "No district avilable", value: 0
          })
          self.setState({
            districtList: d,
            spinner: false,
          });
        }
        //this.getDistrictList(stateArray[0].id)
      })
      .catch(function (error) {
        self.setState({

          spinner: false,
        });
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  getStationName = (districtID) => {

    let data = { district_id: districtID };
    var self = this;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    self.setState({
      
      spinner: true,
    });
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
        console.log('response',response.data)
        let stationListData = response.data.data;
        if (response.data.status == 200)
        {
        let stationArray = [];
        for (let i = 0; i < stationListData.length; i++) {
          if (i == 0) {
            self.setState({
              stationDrpDwnPlaceholder: stationListData[i].name,
            });
            self.setState({ stationId: stationListData[0].id });
            // self.getSellerList(
            //   "1",
            //   self.state.stateId,
            //   self.state.districtId,
            //   stationListData[i].id
            // );
          }
          stationArray.push({
            label: stationListData[i].name,
            value: stationListData[i].id,
          });
        }
        self.setState({
          stationlist: stationArray,
          spinner: false,
        });
      }
      else {
          let d = []
          d.push({
            label: "No station avilable", value: 0
          })
          self.setState({
            stationlist: d,
            spinner: false,
          });
      }
      })
      .catch(function (error) {
        self.setState({

          spinner: false,
        });
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  getCityName = (districtID) => {

    let data = { district_id: districtID };
    var self = this;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    self.setState({

      spinner: true,
    });
    axios({
      url: api_config.BASE_URL + api_config.GET_CITY,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(function (response) {
        let stationListData = response.data.data;
        if (response.data.status == 200){
        let stationArray = [];
        for (let i = 0; i < stationListData.length; i++) {
          if (i == 0) {
            self.setState({
              cityDrpDwnPlaceholder: stationListData[i].name,
            });
            self.setState({ cityId: stationListData[0].id });
            self.getSellerList(
              "1",
              self.state.stateId,
              self.state.districtId,
              stationListData[0].id
            );
          }
          stationArray.push({
            label: stationListData[i].name,
            value: stationListData[i].id,
          });
        }
        self.setState({
          citylist: stationArray,
          spinner: false,
        });
      }
else {
        let d = []
        d.push({
          label: "No city avilable", value: 0
        })
        self.setState({
          citylist: d,
          spinner: false,
        });
      }
      })
      .catch(function (error) {
        self.setState({

          spinner: false,
        });
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  getSellerList = (countryId, stateID, districtID, stationID) => {
    console.log(
      "seller params---" +
      countryId +
      "--" +
      stateID +
      "--" +
      districtID +
      "--" +
      stationID
    );

    let data = {
      user_type: "buyer",
      country_id: "1",
      state_id: stateID,
      district_id: districtID,
      city_id: stationID,
    };
    var self = this;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    console.log('data>>>',data)

    axios({
      url: api_config.BASE_URL + api_config.SEARCH_SELLER,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(function (response) {
        let districtListData = response.data.data;
        let districtArray = [];
        console.log(
          "Search seller response: " + JSON.stringify(response.data.data)
        );
        for (let i = 0; i < districtListData.length; i++) {
          districtArray.push({
            label: districtListData[i].name,
            value: districtListData[i].seller_id,
            city: districtListData[i].city,
            isSelected: false,
          });
        }
        self.setState({
          sellerList: districtArray,
        });
        //this.getDistrictList(stateArray[0].id)
      })
      .catch(function (error) {
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  changeState = (item) => {
    console.log("changeState-->" + item);
    this.getDistrictList(item);
    //this.getSellerList(1, item, this.state.districtId, this.state.stationId);
  };

  changeDistrict = (item) => {
    console.log("changeDistrict-->" + item);
    this.getStationName(item);
    //this.getSellerList(1, this.state.stateId, item, this.state.stationId);
  };

  changeStation = (item) => {
    console.log("changeStation-->" + item);
    //this.getSellerList(1, this.state.stateId, this.state.districtId, item);
  };

  onClickButtonNotification = () => {
    {
      /*let data = {seller_buyer_id:"2",product_id:"1",price:"50000",
    no_of_bales:"50",d_e:"export",buy_for:'other',
    spinning_meal_name:'test',country_id:'1',state_id:'1',city_id:'1',station_id:'1',
    sellers:[{id:2,name:"poonam"},{id:74,name:"test"}],
    attribute_array:[{"attribute":"uhml","attribute_value":"28.3"},{"attribute":"rd","attribute_value":"21.3"}]
  }
*/
    }

    this.setState({ spinner: true });

    var sellerObject = [];
    for (var i = 0; i < this.state.sellerList.length; i++) {
      if (this.state.sellerList[i].isSelected) {
        //var obj={"id":this.state.sellerList[i].value,"type":"default"}
        sellerObject.push(this.state.sellerList[i].value);
      }
    }

    console.log('ginner>>>>', this.props.route.params.dataObj)

    var sbid = this.props.route.params.dataObj.seller_buyer_id;
    var nob = this.props.route.params.dataObj.no_of_bales;
    var attributeArray = this.props.route.params.dataObj.attribute_array;
    var productId = this.props.route.params.dataObj.product_id;
    var price = this.props.route.params.dataObj.price;
    var de = this.props.route.params.dataObj.d_e;
    var buyFor = this.props.route.params.dataObj.buy_for;
    var spinningMealName = this.props.route.params.dataObj.spinning_meal_name;
    var sId = this.state.stateId;
    var dId = this.state.districtId;
    var stId = this.props.route.params.dataObj.seller_type == 'Ginner' ? this.state.stationId : this.state.cityId;

    //  {"seller_buyer_id":"1","product_id":"1","price":"50000","no_of_bales":"50","d_e":"export","buy_for":"other","spinning_meal_name":"test","country_id":"1","state_id":"1","city_id":"1","station_id":"1","buyers":[{"id":"1","type":"default"}],"attribute_array":[{"attribute":"uhml","attribute_value":"28.3"},{"attribute":"rd","attribute_value":"21.3"}]}
    let data = {
      seller_buyer_id: sbid,
      product_id: productId,
      price: price,
      no_of_bales: nob,
      d_e: de,
      buy_for: buyFor,
      spinning_meal_name: spinningMealName,
      country_id: "1",
      state_id: sId,
      city_id: stId,
      district_id: dId,
      // station_id: stId,
      sellers: sellerObject,
      attribute_array: attributeArray,
    };

    console.log("Notification Params -->" + JSON.stringify(data));
    var self = this;
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    axios({
      url: api_config.BASE_URL + api_config.NOTIFICATION_TO_SELLER,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(function (response) {
        // console.log("Notification to seller response --->"+JSON.stringify(response));
        let districtListData = response.data.data;
        console.log(
          "Notification to seller response --->" + JSON.stringify(response.data)
        );
        self.setState({ spinner: false });
        Alert.alert("Success", response.data.message, [
          { text: "OK", onPress: () => { } },
        ]);
        self.props.navigation.navigate("HomeScreen");
        // self.props.navigation.reset({
        //   isDashboard: true,
        //   routes: [{name: 'Dashboard'}],
        // });
      })
      .catch(function (error) {
        self.setState({ spinner: false });
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  onClickRowSeller = (item) => {
    var sellerList1 = [];
    for (var i = 0; i < this.state.sellerList.length; i++) {
      if (this.state.sellerList[i].label === item.label) {
        if (item.isSelected) {
          this.state.sellerList[i].isSelected = false;
        } else {
          this.state.sellerList[i].isSelected = true;
        }
      }
      sellerList1.push(this.state.sellerList[i]);
    }

    this.setState({
      sellerList: sellerList1,
    });
  };

  _keyExtractor(item, index) {
    return index.toString();
  }

  _renderItem({ item, index }) {
    console.log("Hello: " + JSON.stringify(item));
    return (
      <TouchableOpacity
        style={{ backgroundColor: "white" }}
        onPress={() => this.onClickRowSeller(item)}
      >
        <View
          style={{
            flexDirection: "row",
            marginLeft: "5%",
            marginTop: 10,
            marginRight: "5%",
            height: 40,
            alignItems: "center",
          }}
        >
          {item.isSelected && (
            <Checked style={{ width: 30, height: 30, marginRight: 10 }} />
          )}

          {!item.isSelected && (
            <Unchecked style={{ width: 30, height: 30, marginRight: 10 }} />
          )}

          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                flex: 1,
                color: theme.colors.textColor,
                fontSize: fontSizeMyPostCenterText,
                textAlign: "left",
                textAlignVertical: "center",
              }}
            >
              {item.label}
            </Text>

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                flex: 1,
                color: theme.colors.textColor,
                fontSize: fontSizeMyPostCenterText,
                textAlign: "left",
                textAlignVertical: "center",
                opacity: 0.5,
              }}
            >
              {item.city}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }


  

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          position: "relative",
          // marginTop: -40,
          backgroundColor: "transparent",
        }}
      >
        <Spinner visible={this.state.spinner} color="#085cab" />
        {/* 
              <View style={{width: '100%',height:55, marginTop: 40}}>
                <Appbar.Header style={{backgroundColor: 'transparent'}} >
                    <Appbar.BackAction color='white' onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content
                      style={{alignItems: 'center'}}
                      color="white"
                      title="Select Seller"
                      titleStyle={{fontSize:20,fontWeight:'bold'}}
                    />
                    <Appbar.Action icon='notification-clear-all' color="transparent" onPress={() => {
                      this.setState({isFilterShow:true}); }} />
                  </Appbar.Header>
              </View> */}

        <View
          style={{
            width: "100%",
            paddingBottom: 30,
            marginTop: 20,
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <ScrollView>
            <View style={{ marginTop: 20 }}>
              <View style={{ width: "100%" }}>
                <View style={{ marginLeft: "5%", marginRight: "5%" }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      flex: 1,
                      color: theme.colors.textColor,
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlignVertical: "center",
                    }}
                  >
                    State
                  </Text>

                  {/* <DropDownPicker
                            placeholder={this.state.stateDrpDwnPlaceholder}
                            open={this.state.stateOpenState}
                            value={this.state.stateValue}
                            items={this.state.stateList}
                            setOpen={this.setStateOpenState}
                            setValue={this.setStateValue}
                            setItems={this.setStateItemsState}
                            containerStyle={{height: 50,width:'100%',marginTop:10}}
                            listMode="MODAL"
                            scrollViewProps={{
                              decelerationRate: "fast"
                            }}
                            onChangeValue={item => this.changeState(item)}  
                             /> */}
                  <SelectDropdown
                    data={this.state.stateList}
                    onSelect={(selectedItem, i) => {
                      this.setState({
                        stateId: selectedItem.value,
                        spinner: true
                      })
                      //this.changeState(selectedItem.value);
                      this.getDistrictList(selectedItem.value);
                      setTimeout(() => {
                        this.setState({ spinner: false })
                        this.districtRef.current.openDropdown()
                      }, 200);
                      //this.districtRef.current.openDropdown()
                    }}
                    buttonStyle={styles.dropdown3BtnStyle}
                    renderCustomizedButtonChild={(selectedItem, index) => {
                      return (
                        <View style={styles.dropdown3BtnChildStyle}>
                          <Text style={styles.dropdown3BtnTxt}>
                            {selectedItem
                              ? selectedItem.label
                              : this.state.stateDrpDwnPlaceholder}
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
                          <Text style={styles.dropdown3RowTxt}>
                            {item.label}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>

                <View
                  style={{ marginLeft: "5%", marginTop: 10, marginRight: "5%" }}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      flex: 1,
                      color: theme.colors.textColor,
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlignVertical: "center",
                    }}
                  >
                    District
                  </Text>

                  {/* <DropDownPicker
                            placeholder={this.state.districtDrpDwnPlaceholder}
                            open={this.state.districtOpenState}
                            value={this.state.districtValue}
                            items={this.state.districtList}
                            setOpen={this.setDistrictOpenState}
                            setValue={this.setDistrictValue}
                            setItems={this.setDistrictItemsState}
                            containerStyle={{height: 50,width:'100%',marginTop:10}}
                            listMode="MODAL"
                            scrollViewProps={{
                              decelerationRate: "fast"
                            }} 
                            onChangeValue={item => this.changeDistrict(item)}  
                            /> */}

                  <SelectDropdown
                    data={this.state.districtList}
                    ref={this.districtRef}
                    onSelect={(selectedItem, i) => {
                      this.setState({
                        districtId: selectedItem.value,
                        spinner: true
                      })
                      //this.changeState(selectedItem.value)
                      //this.changeDistrict(selectedItem.value);
                      console.log('props>>>', this.props.route.params.dataObj.seller_type)
                      this.props.route.params.dataObj.seller_type == 'Ginner' ?
                      this.getStationName(selectedItem.value) : 
                      this.getCityName(selectedItem.value)


                      setTimeout(() => {
                        this.setState({ spinner: false })
                        this.StationRef.current.openDropdown()
                      }, 200);
                    }}
                    buttonStyle={styles.dropdown3BtnStyle}
                    renderCustomizedButtonChild={(selectedItem, index) => {
                      return (
                        <View style={styles.dropdown3BtnChildStyle}>
                          <Text style={styles.dropdown3BtnTxt}>
                            {selectedItem
                              ? selectedItem.label
                              : this.state.districtDrpDwnPlaceholder}
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
                          <Text style={styles.dropdown3RowTxt}>
                            {item.label}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
                {this.props.route.params.dataObj.seller_type == 'Ginner' ? (
                  <View
                    style={{ marginLeft: "5%", marginTop: 10, marginRight: "5%" }}
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.textColor,
                        fontSize: 16,
                        fontWeight: "bold",
                        textAlignVertical: "center",
                      }}
                    >
                      Station Name
                    </Text>
                    <SelectDropdown
                      data={this.state.stationlist}
                      ref={this.StationRef}
                      onSelect={(selectedItem, i) => {
                        this.setState({
                          stationId: selectedItem.value,
                        })
                        //this.changeStation(selectedItem.value);
                        this.getSellerList(1, this.state.stateId, this.state.districtId, selectedItem.value);
                      }}
                      buttonStyle={styles.dropdown3BtnStyle}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View style={styles.dropdown3BtnChildStyle}>
                            <Text style={styles.dropdown3BtnTxt}>
                              {selectedItem
                                ? selectedItem.label
                                : this.state.stationDrpDwnPlaceholder}
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
                            <Text style={styles.dropdown3RowTxt}>
                              {item.label}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                ) : (
                    <View
                      style={{ marginLeft: "5%", marginTop: 10, marginRight: "5%" }}
                    >
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          flex: 1,
                          color: theme.colors.textColor,
                          fontSize: 16,
                          fontWeight: "bold",
                          textAlignVertical: "center",
                        }}
                      >
                        City Name
                      </Text>
                      <SelectDropdown
                        data={this.state.citylist}
                        ref={this.StationRef}
                        onSelect={(selectedItem, i) => {
                          this.setState({
                            cityId: selectedItem.value,
                          })
                          //this.changeStation(selectedItem.value);
                          this.getSellerList(1, this.state.stateId, this.state.districtId, selectedItem.value);
                        }}
                        buttonStyle={styles.dropdown3BtnStyle}
                        renderCustomizedButtonChild={(selectedItem, index) => {
                          return (
                            <View style={styles.dropdown3BtnChildStyle}>
                              <Text style={styles.dropdown3BtnTxt}>
                                {selectedItem
                                  ? selectedItem.label
                                  : this.state.cityDrpDwnPlaceholder}
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
                              <Text style={styles.dropdown3RowTxt}>
                                {item.label}
                              </Text>
                            </View>
                          );
                        }}
                      />
                    </View>
                )
                }
                

                <View
                  style={{
                    flexDirection: "row",
                    display: "none",
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
                        primary: "transparent",
                        underlineColor: "transparent",
                        background: "transparent",
                      },
                    }}
                    label="Search Seller"
                    style={{
                      width: "100%",
                      height: 45,
                      backgroundColor: "transparent",
                    }}
                    value={""}
                    underlineColor={"transparent"}
                    underlineColorAndroid="transparent"
                  />
                </View>
                {this.state.sellerList.length > 0 ? <FlatList
                  style={{ flex: 1,maxHeight:heightPercentageToDP(35)}}
                  data={this.state.sellerList}
                  keyExtractor={this._keyExtractor.bind(this)}
                  renderItem={this._renderItem.bind(this)}
                /> : <View
                  style={{
                    height: '90%',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '1%',
                  }}>
                  <NoRecordsFound_Icon />
                  <Text>Sorry, no records available</Text>
                </View>}

              </View>
            </View>
          </ScrollView>

          {this.state.sellerList.length > 0 ? <Button
            mode="contained"
            uppercase={false}
            contentStyle={{ height: 50 }}
            style={{ width: "90%", marginLeft: "5%", marginTop: 20 }}
            labelStyle={{ fontWeight: "bold", fontSize: 16, color: "white" }}
            onPress={() => {
              this.onClickButtonNotification();
            }}
          >
            Sent Notification
          </Button> : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    top: 0,
  },
  container2: {
    marginTop: "2%",
    width: "90%",
    height: "86%",
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "flex-start",
  },
  btnActiveContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  btnCompletedContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    opacity: 0.5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#57a3f5",
    marginLeft: 1,
  },
  buttonContainer2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 1,
    marginRight: 1,
    opacity: 0.4,
  },
  spinnerTextStyle: {
    color: "#000",
  },
  module_parent_view: {
    width: "100%",
  },
  module_label_header: {
    fontWeight: "bold",
    fontSize: 20,
    justifyContent: "center",
    color: "#2DA3FC",
  },
  module_card2: {
    height: 70,
    width: "90%",
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 35,
    borderColor: "#57a3f5",
    borderWidth: 1,
    elevation: 5,
    alignItems: "center",
    alignSelf: "center",
    top: 80,
  },
  allbid: {
    flexDirection: "row",
    marginLeft: "5%",
    marginTop: "5%",
  },
  bidedItem: {
    height: 120,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 0,
    borderColor: "#57a3f5",
    borderWidth: 1,
    elevation: 5,
    marginLeft: "5%",
    marginTop: 15,
    flexDirection: "row",
  },
  bidedProduct: {
    width: "60%",
    height: "85%",
    marginLeft: "2%",
    marginTop: "3%",
    alignItems: "flex-start",
  },
  bidedQuantity: {
    width: "35%",
    height: "85%",
    marginTop: "3%",
    textAlign: "center",
    alignItems: "center",
    textAlignVertical: "center",
  },

  titleText: {
    flex: 1,
    color: "#2DA3FC",
    fontWeight: "bold",
  },
  allbidValue: {
    flexDirection: "row",
    marginLeft: "5%",
    marginTop: "1%",
  },
  titleTextValue: {
    flex: 1,
    color: "#2DA3FC",
    fontSize: 12,
  },
  scrollViewStyle: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  dealTopMainContainer: {
    flexDirection: "row",
    top: 0,
    marginLeft: "5%",
    marginRight: "5%",
  },

  dealBtnEnable: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#69BA53",
    marginLeft: 0,
    marginRight: 5,
    marginTop: 10,
    borderRadius: 5,
  },
  dealBtnDisable: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F5F9",
    marginLeft: 5,
    marginRight: 0,
    marginTop: 10,
    borderRadius: 5,
  },
  dealTopBoxTextView: {
    height: 40,
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    textAlignVertical: "center",
    color: "white",
  },
  dealTopBoxTextViewDisable: {
    height: 40,
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    textAlignVertical: "center",
    color: "#343434",
  },

  dropdown3BtnStyle: {
    width: "100%",
    height: 45,
    backgroundColor: "#FFF",
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'lightgray',
    left: 0,
    marginTop: 5,
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  dropdown3BtnImage: { width: 45, height: 45, resizeMode: "cover" },
  dropdown3BtnTxt: {
    color: "black",
    textAlign: "center",
    fontWeight: "normal",
    fontSize: 16,
    marginHorizontal: 0,
    fontFamily: 'Poppins-Regular'

  },
  dropdown3DropdownStyle: { backgroundColor: "white", marginTop: heightPercentageToDP(Platform.OS === 'ios' ? 0 : -4) },
  dropdown3RowStyle: {
    backgroundColor: "#fff",
    borderBottomColor: "#444",
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  dropdownRowImage: { width: 45, height: 45, resizeMode: "cover" },
  dropdown3RowTxt: {
    color: "#000",
    textAlign: "center",
    fontWeight: "normal",
    fontSize: 16,
    marginHorizontal: 0,
    width: "100%",
    fontFamily: 'Poppins-Regular'
  },
});

export default NotificationSelectSeller;
