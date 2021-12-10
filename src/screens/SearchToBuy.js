import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AppState,
  TouchableWithoutFeedback,
  Alert,
  BackHandler,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { baseUrl } from "../components/Global";
import { fontSizeMyPostCenterText } from "../components/Global";
import { vLineMyPostStyle } from "../components/Global";
import Background from "../components/Background";
import Header from "../components/Header";
import { Card, CheckBox } from "react-native-elements";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Appbar, Searchbar, Button, Badge } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import Icon from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import { theme } from "../core/theme";
import TextInput from "../components/TextInput";
import EncryptedStorage from "react-native-encrypted-storage";
import defaultMessages from "../helpers/defaultMessages";
import { fieldValidator } from "../helpers/fieldValidator";
//svgs
import Home from "../assets/Home";
import NoRecordsFound_Icon from "../assets/NoRecodsFound";
import SearchToSell_Icon from "../assets/SearchToSell";
import PostToSell_Icon from "../assets/PostToSell";
import MyPost_Icon from "../assets/MyPost";
import MyContracts_Icon from "../assets/MyContracts";
import Logout_Icon from "../assets/Logout";
import Bell_Icon from "../assets/Bell";
import MyPostGreen_Icon from "../assets/MyPostGreen";
import History_Icon from "../assets/History";
import Newsfeed_Icon from "../assets/NewsFeed";
import MCX_Icon from "../assets/MCX";
import Calculator_Icon from "../assets/Calculator";
import ChangePassword_Icon from "../assets/ChangePassword";
import Profile_Icon from "../assets/Profile";
import Reports_Icon from "../assets/Reports";
import TransactionTracking_Icon from "../assets/TransactionTracking";
import NotificationToBuyer_Icon from "../assets/NotificationToBuyer";
import Employee from "../assets/Employee";
import EmployeeGray from "../assets/EmployeeGray";
import CustomerIcon from "../assets/CustomerIcon";
import FilterSettings from "../assets/FilterSettings";
import MPIcon1 from "../assets/MPIcon1";
import MPIcon2 from "../assets/MPIcon2";
import PlusRound from "../assets/PlusRound";
import MinusRound from "../assets/MinusRound";
import SetPassword from "../assets/SetPassword";
import axios from "axios";
import api_config from "../Api/api";
// import SelectDropdown from "react-native-select-dropdown";
import SelectDropdown from "../components/selectBox";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import TickRound from "../assets/TickRound";
import UntickRound from "../assets/UntickRound";
import CalculatorView from "../components/CalculatorView";
import NewsFeedView from "../components/NewsFeedView";
import Wallet from "../components/Wallet";
import Profile from "../components/Profile";
import Brokers from "../components/Brokers";
import io from "socket.io-client";
import styles from "./Styles";

import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from "../helpers/backHandler";
import { exitAlert } from "../helpers/customAlert";
import RNFetchBlob from "rn-fetch-blob";

const socket = io.connect("http://cottontradecentre.com:6001", {
  transports: ["websocket"],
}); //live

const CustomComponent = ({ ...props }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginLeft: "5%",
        marginTop: 10,
        marginRight: "5%",
        height: 50,
        width: "80%",
        alignItems: "center",
      }}
    >
      <Text style={{ width: "35%", color: theme.colors.textColor, fontFamily: 'Poppins-Regular' }}>
        {props.label}
      </Text>
      <View
        style={{
          width: "78%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginLeft: "0%",
            marginRight: "0%",
            marginTop: 0,
          }}
        ><View style={{ flex: 1, marginRight: 3 }}>
            <SelectDropdown
              data={props.fromValue}
              ref={props.fromref}
              onSelect={props.onSelectFrom}
              buttonStyle={styles.dropdown3BtnStyle}
              renderCustomizedButtonChild={(selectedItem, index) => {
                // console.log('sera', this.state.Micronnaire.value, index)
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    <Text style={styles.dropdown3BtnTxt}>
                      {selectedItem
                        ? selectedItem.label
                        : ''}
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
                // console.log('sera>>>', item)

                return (
                  <View style={styles.dropdown3RowChildStyle}>
                    <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={{ flex: 1, marginRight: 3 }}>
            <SelectDropdown
              data={props.toValue}
              ref={props.toref}

              onSelect={props.onSelectTo}
              defaultValue={props.to}
              buttonStyle={styles.dropdown3BtnStyle}
              renderCustomizedButtonChild={(selectedItem, index) => {
                // console.log('sera', props.value, index)
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    <Text style={styles.dropdown3BtnTxt}>
                      {selectedItem
                        ? (selectedItem.label > props.from ? selectedItem.label :  props.label)
                        : ''}
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
                // console.log('sera>>>', item)

                return (
                  <View style={styles.dropdown3RowChildStyle}>
                    <Text style={styles.dropdown3RowTxt}>{item.label}</Text>
                  </View>
                );
              }}
            /></View></View></View></View>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
      selectedMicronnaire:{},
      selectedRD: {},
      selectedTrash: {},
      selectedMoisture: {},
      Micronnaire: [],
      selectedlength:{},
      RD:[],
      Trash:[],
      Moisture:[],
      lengthData:[],
      ids: [],
      selectedIDs: [],
      appState: AppState.currentState,
      itemsSellerType: [],
      valueSellerType: '',
      loading: "true",
      userID: 0,
      spinner: true,
      jsonData: {},
      token: "",
      isHomeVisible: true,
      isCustomerVisible: true,
      isAllBid: true,
      isBided: false,
      isDeal: false,
      isMenuOpen: false,
      isProfile: false,
      isBroker: false,

      ProfileData: [],
      openState: false,
      deValue: null,
      deOpenState: false,
      buyForOpenState: false,
      LengthinputData: [],

      buyForValue: null,
      deName: "Domestic",
      buyForDropDownValue: "Self",
      deList: [
        { label: "Domestic", value: "Domestic" },
        { label: "Export", value: "Export" },
      ],
      buyForList: [
        { label: "Self", value: "Self" },
        { label: "Other", value: "Other" },
      ],
      isShowBuyForDrpDown: true,
      // MicronnaireTo: [],

      isShowSpinningName: false,
      myActivePost: {},
      arrNegotiationList: {},
      arrNotificationList: {},
      myContractListArray: {},
      balesPriceError: "",
      balesPrice: "",
      txtSpinningMillName: "",
      value: null,
      productItem: [],
      dropdownPlaceholder: "",
      productAttributeList: {},
      balesCount: 100,
      displayBalesCount: 100,
      items: [
        { label: "Maharashtra", value: "1" },
        { label: "Rajasthan", value: "2" },
        { label: "Punjab", value: "3" },
        { label: "Karnatak", value: "4" },
      ],
      isPostToBuy: false,
      isSearchToBuy: false,
      isNotificationToSeller: false,
      isDashboard: true,
      isMyContracts: false,
      isCalculator: false,
      isNewsFeed: false,
      selectedProductID: 0,
      selectedProductName: "",
      inputData: [],
      selectedAttributeItem: [],
      nonRequiredAttribute: [],
      requiredAttribute: [],
      attributeArry: [],
      isMyPostActiveClicked: true,
      titleOfScreen: "Dashboard",
      dealTabStyle1: {
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
      dealTabStyle2: {
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
      dealTabTextBox1: {
        height: 40,
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        textAlignVertical: "center",
        color: "white",
      },
      dealTabTextBox2: {
        height: 40,
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        textAlignVertical: "center",
        color: theme.colors.textColor,
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
      btnActiveTextColor: theme.colors.primary,
      btnCompletedTextColor: "gray",
      toRangeData:{}
    };

    this.lengthRef = null

    this.MicronnairefromRef = null
    this.MicronnairetoRef = null

    this.RDfromRef = null
    this.RDtoRef = null

    this.TrashfromRef = null
    this.TrashtoRef = null

    this.MoisturefromRef = null
    this.MoisturetoRef = null

    this.length = null


    // this.setValue = this.setValue.bind(this);
    // this.setOpenState = this.setOpenState.bind(this);
    // this.setItemsState = this.setItemsState.bind(this);

    // this.setDEValue = this.setDEValue.bind(this);
    // this.setDEOpenState = this.setDEOpenState.bind(this);
    // this.setDEItemsState = this.setDEItemsState.bind(this);

    // this.setBuyForValue = this.setBuyForValue.bind(this);
    // this.setBuyForOpenState = this.setBuyForOpenState.bind(this);
    // this.setBuyForItemsState = this.setBuyForItemsState.bind(this);
  }
  onClickMinusPTB = () => {
    try {
      if (this.state.displayBalesCount - this.state.balesCount != 0) {
        if (this.state.displayBalesCount > 0) {
          this.state.displayBalesCount =
            this.state.displayBalesCount - this.state.balesCount;
          this.setState({ displayBalesCount: this.state.displayBalesCount });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  onClickPlusPTB = () => {
    try {
      this.state.displayBalesCount =
        this.state.displayBalesCount + this.state.balesCount;
      this.setState({ displayBalesCount: this.state.displayBalesCount });
    } catch (error) {
      console.log(error);
    }
  };

  getRegistrationDropDownData = () => {
    console.log('hi>>')
    var self = this;
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
        self.setState({
          spinner: false,
        })

        console.log('response.data.data[0].buyer_type', response.data.data[0].seller_type)

        let sellerListData = response.data.data[0].seller_type;
        let setlist = []
        let obj = {}
        for (let i = 0; i < response.data.data[0].seller_type.length; i++) {

          obj = { label: sellerListData[i].name, value: sellerListData[i].id }
          setlist.push(obj)

        }

        self.setState({ itemsSellerType: setlist })


        console.log('Response 123: ' + new Date());
      })
      .catch(function (error) {
        self.setState({
          spinner: false,
        })
        console.log('error>>>>', JSON.stringify(error))
        alert(defaultMessages.en.serverNotRespondingMsg);
      });
  };

  crateProductAttributeUI = () => {
   return (<View
          style={{
            flexDirection: "row",
            marginLeft: "5%",
            marginTop: 10,
            marginRight: "5%",
            height: 50,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text style={{ width: "35%", color: theme.colors.textColor,fontFamily:'Poppins-Regular' }}>
            {this.state.lengthData.label}
          </Text>
          <View
            style={{
              width: "78%",
              alignItems: "center",
              justifyContent: "center",
            }}
          ><SelectDropdown
                data={this.state.lengthData.value}
         ref={(ref) => { this.lengthRef = ref; return true; }}

                onSelect={(selectedItem, j) => {
                  console.log(selectedItem);
                  this.addValuesSearchBuyer(
                    selectedItem.label,
                    this.state.lengthData.label,
                    selectedItem.value,
                    "from"
                  );
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      <Text style={styles.dropdown3BtnTxt}>
                        {selectedItem
                          ? selectedItem.label
                          : ''}
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
            </View>
        </View>
     
    )
  };




  componentDidMount() {
    this.getRegistrationDropDownData()
    this.getProductListAPI();
    //this.getProductAttributeAPI(1)
    // this.setDEFlages({ label: 'Domestic', value: 'Export' });

    this.state.productItem.map((el, i) => {
      if (i == 0) {
        return (
          this.setState({ dropdownPlaceholder: el.label }),
          this.getProductAttributeAPI(el.value)
        );
      }
    });
  }

  addValuesMicronnaire = (text, label, itemId,  rangeType) => {

    var self =this
    let { selectedMicronnaire} = this.state;
      if (rangeType == 'from')
       { 
        selectedMicronnaire = {
            attribute : label,
            // attribute_value : text,
            // itemId : itemId,
            from : text,
            to : '',
          }
      }
        else {
        selectedMicronnaire = {
          ...selectedMicronnaire,
          to: text
        }}
        self.setState({
          selectedMicronnaire,
          // inputData: [...this.state.inputData, selectedMicronnaire],
        })  
    }

  addValuesSearchBuyer = (text, label, itemId, rangeType) => {
    var self = this
    let { selectedlength } = this.state;
    if (rangeType == 'from') {
      selectedlength = {
        attribute: label,
        // attribute_value: text,
        // itemId: itemId,
        from: text,
        to: text,
      }
    }
    else {
      selectedlength = {
        ...selectedlength,
        to: text
      }
    }

    self.setState({
      selectedlength,
      // inputData: [...this.state.inputData, selectedMicronnaire],
    })
  }
  addValuesRD = (text, label, itemId, rangeType) => {

    var self = this
    let { selectedRD } = this.state;
    if (rangeType == 'from') {
      selectedRD = {
        attribute: label,
        // attribute_value: text,
        // itemId: itemId,
        from: text,
        to: '',
      }
    }
    else {
      selectedRD = {
        ...selectedRD,
        to: text
      }
    }
    self.setState({
      selectedRD,
      // inputData: [...this.state.inputData, selectedRD],
    })
  }
 
  addValuesTrash = (text, label, itemId, rangeType) => {

    var self = this
    let { selectedTrash } = this.state;
    if (rangeType == 'from') {
      selectedTrash = {
        attribute: label,
        // attribute_value: text,
        // itemId: itemId,
        from: text,
        to: '',
      }
    }
    else {
      selectedTrash = {
        ...selectedTrash,
        to: text
      }
    }
    self.setState({
      selectedTrash,
      // inputData: [...this.state.inputData, selectedTrash],
    })
  }
  addValuesMoisture = (text, label, itemId, rangeType) => {

    var self = this
    let { selectedMoisture } = this.state;
    if (rangeType == 'from') {
      selectedMoisture = {
        attribute: label,
        // attribute_value: text,
        // itemId: itemId,
        from: parseInt(text),
        to: '',
      }
    }
    else {
      selectedMoisture = {
        ...selectedMoisture,
        to: text
      }
    }
    // run kari ne jovo ok
 

    self.setState({
      selectedMoisture,
      // inputData: [...this.state.inputData, selectedMoisture],
    })
  }
  

  changeProduct = (selectedItem) => {
    try {
      this.lengthRef.reset()

      this.MicronnairefromRef.reset()
      this.MicronnairetoRef.reset()

      this.RDfromRef.reset()
      this.RDtoRef.reset()

      this.TrashfromRef.reset()
      this.TrashtoRef.reset()

      this.MoisturefromRef.reset()
      this.MoisturetoRef.reset()

      this.setState({
        spinner: true,
        displayBalesCount:100,
        selectedProductID: selectedItem.value,
        selectedProductName: selectedItem.label,
      });
      this.getProductAttributeAPI(selectedItem.value);
    } catch (error) {
      console.log(error);
    }
  };

  getProductListAPI = () => {
    try {
      var self = this;
      axios({
        url: api_config.BASE_URL + api_config.PRODUCT_LIST,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          console.log("response :", response.data);
          if (response.data.status == 200) {
            let productList = response.data.data;
            let firstProductID = "";
            var arrProductList = [];
            self.setState({
              items: [],
            });
            for (let i = 0; i < productList.length; i++) {
              if (i == 0) {
                self.setState({
                  dropdownPlaceholder: productList[i].name,
                  selectedProductName: productList[i].name,
                });
                firstProductID = productList[i].id;
              }
              arrProductList.push({
                label: productList[i].name,
                value: productList[i].id,
              });
            }
            self.setState({ productItem: arrProductList });
            self.getProductAttributeAPI(firstProductID);
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          self.setState({
            spinner: false,
            message: "Something bad happened " + error,
          }),
            alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
    }
  };

  getProductAttributeAPI = (productID) => {

    console.log('prodyc: ' + productID)
    try {
      this.setState({ selectedProductID: productID,spinner:true });

      var self = this;
      let data = { product_id: 1 || productID };

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      let jsonObj = {}

      axios({
        url: api_config.BASE_URL + api_config.PRODUCT_ATTRIBUTE_LIST,
        method: "POST",
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          console.log(
            "response PRODUCT_ATTRIBUTE_LIST:",
            JSON.stringify(response.data)
          );
          if (response.data.status == 200) {
            // jsonObj.push({
            //     "value": response.data.data.value,
            //     "label": response.data.data.label,
            //     "isdisabled": true
            // })

            let lengthsf = response.data.data.filter(item => item.label === 'Micronnaire')
            let rd = response.data.data.filter(item => item.label === 'RD')
            let tr = response.data.data.filter(item => item.label === 'Trash(%)')
            let mo = response.data.data.filter(item => item.label === 'Moisture(%)')
            let lengths = response.data.data.filter(item => item.label === 'Length(mm)')

            

            // el.label !== "RD" &&
            //   el.label !== "Trash(%)" &&
            //   el.label !== "Moisture(%)"

            console.log('lengthsf',lengthsf[0])
            // console.log("Bhavin Thakkar: ", response.data.data)
            self.setState({
              lengthData: lengths[0],
              Micronnaire: lengthsf[0],
              RD: rd[0],
              Trash: tr[0],
              Moisture: mo[0],

              // MicronnaireTo: lengthsf[0],

              spinner:false,

              // productAttributeList: response.data.data,
            });
            // self.setState({
            //   spinner: this.state.Micronnaire.length > 0 ? false : true
            // })
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          self.setState({
            spinner: false,
            message: "Something bad happened " + error,
          }),
            alert(defaultMessages.en.serverNotRespondingMsg);
        });
    } catch (error) {
      console.log(error);
    }
  };

  getProductAttributeArray = () => {
    try {
      if (this.state.selectedMicronnaire.to != '' &&
        this.state.selectedRD.to != ''  &&
        this.state.selectedlength.to != '' &&
        this.state.selectedTrash.to != '' &&
        this.state.selectedMoisture.to != ''
        )
        {
      let tempArray = [
        this.state.selectedMicronnaire,
        this.state.selectedlength, this.state.selectedRD, this.state.selectedTrash, this.state.selectedMoisture
      ];
      // this.state.inputData.map((el, i) =>
      //   tempArray.push({
      //     attribute: el.attribute,
      //     attribute_value: el.attribute_value,
      //   })
      // );
      // // this.state.inputData
      console.log("Post attri array: " + JSON.stringify(tempArray));
      return tempArray;
    }
    else {
      alert('please fill all the attributes')
    }
      //this.setState({attributeArry:tempArray})
    } catch (error) {
      console.log(error);
    }
  };

  checkValidation = () => {
    try {
      let attrValue = this.getProductAttributeArray();
      if (attrValue.length == 0) {
        alert(defaultMessages.en.required.replace("{0}", "atribute value"));
        return false;
      }
      if (this.state.displayBalesCount == 0) {
        alert(defaultMessages.en.required.replace("{0}", "bales"));
        return false;
      }

      if (this.state.valueSellerType == "") {
        alert(defaultMessages.en.selectValidation.replace("{0}", "seller type"));
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
    }
  };
  getRequiredAttributeArray = () => {
    try {
      let inputDataArray = this.state.inputData;
      let selectedItemArray = this.state.selectedIDs;
      let tempArray = [];

      for (var i = 0; i < inputDataArray.length; i++) {
        if (selectedItemArray.length > 0) {
          let index = selectedItemArray.indexOf(inputDataArray[i].itemId);
          console.log(
            "Index: " +
              inputDataArray[i].itemId +
              ":" +
              JSON.stringify(selectedItemArray)
          );
          if (index !== -1) {
            // tempArray.push({
            //   attribute: inputDataArray[i].attribute,
            //   attribute_value: inputDataArray[i].attribute_value,
            // });
            tempArray.push({
              attribute: inputDataArray[i].attribute,
              from: inputDataArray[i].from,
              to: inputDataArray[i].to,
            });
          }
        }
      }
      return tempArray;
    } catch (error) {
      console.log(error);
    }
  };

  getNonRequiredAttributeArray = () => {
    try {
      let inputDataArray = this.state.inputData;
      let selectedItemArray = this.state.selectedIDs;
      let tempArray = [];

      for (var i = 0; i < inputDataArray.length; i++) {
        if (selectedItemArray.length > 0) {
          console.log(
            "selectedItemArray: " + JSON.stringify(selectedItemArray)
          );
          let index = selectedItemArray.indexOf(inputDataArray[i].itemId);
          if (index == -1) {
            // tempArray.push({
            //   attribute: inputDataArray[i].attribute,
            //   attribute_value: inputDataArray[i].attribute_value,
            // });
            tempArray.push({
              attribute: inputDataArray[i].attribute,
              from: inputDataArray[i].from,
              to: inputDataArray[i].to,
            });
          }
        } else {
          // tempArray.push({
          //   attribute: inputDataArray[i].attribute,
          //   attribute_value: inputDataArray[i].attribute_value,
          // });
          tempArray.push({
            attribute: inputDataArray[i].attribute,
            from: inputDataArray[i].from,
            to: inputDataArray[i].to,
          });
        }
      }
      return tempArray;
    } catch (error) {
      console.log(error);
    }
  };

  onClickSearchSelectSeller = async () => {
    try {
      if (this.checkValidation()) {
        var self = this;
        self.setState({
          spinner: true,
        });

        var productName = this.state.selectedProductName;
        let requiredArray = this.getProductAttributeArray();
        let nonRequiredArray = this.getNonRequiredAttributeArray();
        let attributeArray = {
          attribute_array: this.getProductAttributeArray(),
        };
        console.log("Bhavin Thakkar: " + JSON.stringify(attributeArray));

        let data = {
          seller_buyer_id: await EncryptedStorage.getItem("user_id"),
          product_id: this.state.selectedProductID,
          no_of_bales: this.state.displayBalesCount,
          required: nonRequiredArray,
          non_required: requiredArray,
          seller_type: self.state.valueSellerType
        };

        console.log("user id --->" + data.seller_buyer_id);
        console.log("request of search to buy---" + JSON.stringify(data));
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));

        axios({
          url: api_config.BASE_URL + api_config.SEARCH_TO_BUY,
          method: "POST",
          data: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
          .then(function (response) {
            console.log("search to sell response :" + JSON.stringify(response));

            if (response.data.status == 200) {
              //REDIRECT TO SEARCH SCREEN
              self.setState({
                spinner: false,
              });
              if (response.data.data.length > 0) {
                // console.log("self", self.props);
                self.props.navigation.navigate("SearchSelectSeller", {
                  data: response.data.data,
                  info: attributeArray,
                  pn: productName,
                  bales: self.state.displayBalesCount,
                  seller_type:self.state.valueSellerType
                });
                // self.setState({
                //   selectedIDs: [],
                // });
              } else {
                alert("No search data available");
              }
            } else if (response.data.status == 404) {
              self.setState({
                spinner: false,
              });
              alert("No search data available");
            } else {
              self.setState({
                spinner: false,
              });
              alert(response.message);
            }
          })
          .catch(function (error) {
            self.setState({
              spinner: false,
            });
            alert("error" + JSON.stringify(error));
          });
      }
    } catch (error) {
      console.log(error);
    }
  };


  

  render() {

    console.log('this.state', this.state.inputData)
    return (
      <ScrollView>
        <View style={{ marginTop: 20 }}>
          <Spinner visible={this.state.spinner} color="#085cab" />
          <View
            style={{
              height: 50,
              width: "90%",
              // marginTop: 15,
              marginLeft: "5%",
            }}
          >
            <SelectDropdown
              data={this.state.productItem}
              onSelect={(selectedItem, i) => {
                console.log('hmm',selectedItem,this.MicronnaireRef);
                this.changeProduct(selectedItem);
                //this.addValues(selectedItem.label, el.label)
              }}
              buttonStyle={styles.dropdown3BtnStyle}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    <Text style={styles.dropdown3BtnTxt}>
                      {selectedItem
                        ? selectedItem.label
                        : this.state.dropdownPlaceholder}
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
          </View>

          {this.state.lengthData.hasOwnProperty('value') && this.crateProductAttributeUI()}

          

          {this.state.Micronnaire.hasOwnProperty('value') && <CustomComponent to={this.state.selectedMicronnaire.to} 
            fromref={(ref) => { this.MicronnairefromRef = ref; return true; }}
            toref={(ref) => { this.MicronnairetoRef = ref; return true; }}


          from={this.state.selectedMicronnaire.from} label={this.state.Micronnaire.label} 
          fromValue={this.state.Micronnaire.value} 
          toValue={this.state.Micronnaire.value.filter(item => item.label > this.state.selectedMicronnaire.from)}
            onSelectFrom={(selectedItem, j) => {
              console.log(selectedItem);
              this.addValuesMicronnaire(
                selectedItem.label,
                this.state.Micronnaire.label,
                selectedItem.value,
                "from"
              );
            }}
            onSelectTo={(selectedItem, j) => {
              console.log(selectedItem);
              this.addValuesMicronnaire(
                selectedItem.label,
                this.state.Micronnaire.label,
                selectedItem.value,
                "to"
              );
            }}
          />}
          {this.state.RD.hasOwnProperty('value') && <CustomComponent to={this.state.selectedRD.to}
            from={this.state.selectedRD.from} label={this.state.RD.label}
            fromref={(ref) => { this.RDfromRef = ref; return true; }}
            toref={(ref) => { this.RDtoRef = ref; return true; }}
            fromValue={this.state.RD.value}
            toValue={this.state.RD.value.filter(item => item.label > this.state.selectedRD.from)}
            onSelectFrom={(selectedItem, j) => {
              console.log(selectedItem);
              this.addValuesRD(
                selectedItem.label,
                this.state.RD.label,
                selectedItem.value,
                "from"
              );
            }}
            onSelectTo={(selectedItem, j) => {
              console.log(selectedItem);
              this.addValuesRD(
                selectedItem.label,
                this.state.RD.label,
                selectedItem.value,
                "to"
              );
            }}
          />}
          {this.state.Trash.hasOwnProperty('value') && <CustomComponent to={this.state.selectedTrash.to}
            from={this.state.selectedTrash.from} label={this.state.Trash.label}
            fromref={(ref) => { this.TrashfromRef = ref; return true; }}
            toref={(ref) => { this.TrashtoRef = ref; return true; }}
            fromValue={this.state.Trash.value}
            toValue={this.state.Trash.value.filter(item => item.label > this.state.selectedTrash.from)}
            onSelectFrom={(selectedItem, j) => {
              console.log(selectedItem);
              this.addValuesTrash(
                selectedItem.label,
                this.state.Trash.label,
                selectedItem.value,
                "from"
              );
            }}
            onSelectTo={(selectedItem, j) => {
              console.log(selectedItem);
              this.addValuesTrash(
                selectedItem.label,
                this.state.Trash.label,
                selectedItem.value,
                "to"
              );
            }}
          />}
          {this.state.Moisture.hasOwnProperty('value') && <CustomComponent to={this.state.selectedMoisture.to}
            from={this.state.selectedMoisture.from} label={this.state.Moisture.label}
            fromref={(ref) => { this.MoisturefromRef = ref; return true; }}
            toref={(ref) => { this.MoisturetoRef = ref; return true; }}
            fromValue={this.state.Moisture.value}
            toValue={this.state.Moisture.value.filter(item => +item.label > +this.state.selectedMoisture.from)}
            onSelectFrom={(selectedItem, j) => {
              console.log(selectedItem);
              this.addValuesMoisture(
                selectedItem.label,
                this.state.Moisture.label,
                selectedItem.value,
                "from"
              );
            }}
            onSelectTo={(selectedItem, j) => {
              console.log(selectedItem);
              this.addValuesMoisture(
                selectedItem.label,
                this.state.Moisture.label,
                selectedItem.value,
                "to"
              );
            }}
          />}
          
          

          <View
            style={{
              flexDirection: "row",
              marginLeft: "5%",
              marginTop: 10,
              marginRight: "5%",
              height: 50,
              alignItems: "center",
            }}
          >
            <Text style={{ width: "35%", color: theme.colors.textColor, fontFamily: 'Poppins-SemiBold' }}>
              Buy bales
            </Text>
            

            <View
              style={{
                flexDirection: "row",
                width: "65%",
                height: "100%",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => this.onClickMinusPTB()}>
                <MinusRound
                  source={require("../assets/ic_me_512.png")}
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 10,
                    marginRight: 5,
                  }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  width: "45%",
                  textAlign: "center",
                  textAlignVertical: "center",
                  height:Platform.OS === 'ios' ? undefined : "100%",
                  color: theme.colors.textColor,
                  fontFamily: 'Poppins-SemiBold'
                }}
              >
                {this.state.displayBalesCount}
              </Text>

              <TouchableOpacity onPress={() => this.onClickPlusPTB()}>
                <PlusRound
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 5,
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
            </View>

            
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: '5%',
              marginTop: 10,
              marginRight: '5%',
              height: 20,
              alignItems: 'center',
            }}>
            <Text style={{ width: '35%', color: theme.colors.textColor, fontFamily: 'Poppins-SemiBold',fontSize:16 }}>
              Seller Type
            </Text>
          </View>
          <View
            style={{
              height: 50,
              width: '90%',
              marginTop: 15,
              marginLeft: '5%',
            }}>
            <SelectDropdown
              data={this.state.itemsSellerType}
              defaultValue={this.state.itemsSellerType}
              onSelect={(selectedItem, index) => {
                // setSellerTypeError(null);
                this.setState({
                  valueSellerType: selectedItem.label
                })
                // setValueSellerType(selectedItem.label);
              }}
              buttonStyle={styles.dropdown3BtnStyle}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    <Text style={styles.dropdown3BtnTxt}>
                      {selectedItem ? selectedItem.label : 'seller Type'}
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
          </View>

          <Button
            mode="contained"
            uppercase={false}
            contentStyle={{ height: 50 }}
            style={{ width: "90%", marginLeft: "5%", marginTop: 20 ,paddingTop:5}}
            labelStyle={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              color: "white",
            }}
            onPress={() => this.onClickSearchSelectSeller()}
          >
            Search
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export default App;
