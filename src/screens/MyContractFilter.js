
import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AppState,
  TouchableWithoutFeedback, FlatList
} from 'react-native';
import { baseUrl } from '../components/Global';
import { fontSizeMyPostCenterText } from '../components/Global';
import { vLineMyPostStyle } from '../components/Global';
import Background from '../components/Background';
import Header from '../components/Header';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import api_config from '../Api/api';
import axios from 'axios';
import { Card } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Appbar, Searchbar, Button, Badge } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../core/theme';
import TextInput from '../components/TextInput';
import SelectDropdown from 'react-native-select-dropdown';
import style1 from './Styles'

//svgs
import Home from '../assets/Home';
import Employee from '../assets/Employee';
import EmployeeGray from '../assets/EmployeeGray';
import CustomerIcon from '../assets/CustomerIcon';
import FilterSettings from '../assets/FilterSettings';
import Download from '../assets/Download';
import Checked from '../assets/Checked';
import Search from '../assets/Search';
import Unchecked from '../assets/Unchecked';
import { heightPercentageToDP, widthPercentageToDP } from '../components/responsive-ratio';

class MyContractFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      loading: 'true',
      spinner: false,
      jsonData: {},
      token: '',
      productItem: [],
      data: [{
        name: 'Ada Perry',
        city: 'New York City',
        selected: false,
        id: 1
      }, {
        name: 'Ada gate',
        city: 'New York City',
        selected: false,
        id: 2
      }, {
        name: 'Ada idea',
        city: 'New York City',
        selected: false,
        id: 3
      }, {
        name: 'Ada airtel',
        city: 'New York City',
        selected: false,
        id: 4
      },]

    };

  }

  getProductListAPI = () => {
    try {
      var self = this;
      axios({
        url: api_config.BASE_URL + api_config.PRODUCT_LIST,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('response :>>>>>>>>>.list', response.data);
          if (response.data.status == 200) {
            let productList = response.data.data;
            let firstProductID = '';
            var arrProductList = [];
            self.setState({
              items: [],
            });
            for (let i = 0; i < productList.length; i++) {
              if (i == 0) {
                self.setState({ dropdownPlaceholder: productList[i].name });
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
            message: 'Something bad happened ' + error,
          }),
            console.log('error from image :');
        });
    } catch (error) {
      console.log(error);
    }
  };

  getProductAttributeAPI = productID => {
    try {
      this.setState({ selectedProductID: productID });
      console.log('Bhavin: ' + productID);
      var self = this;
      let data = { product_id: productID };

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.PRODUCT_ATTRIBUTE_LIST,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log('response PRODUCT_ATTRIBUTE_LIST:', response.data);
          if (response.data.status == 200) {
            self.setState({
              productAttributeList: response.data.data,
              spinner: false,
            });
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          self.setState({
            spinner: false,
            message: 'Something bad happened ' + error,
          }),
            console.log('error from image 123:');
        });
    } catch (error) {
      console.log(error);
    }
  };

  makeRequest = () => {
    this.setState({
      spinner: !this.state.spinner,
    });

    var url = 'http://dalsaniya.com/' + baseUrl[0] + '/app_api/dashboard';
    var bearer = 'Bearer ' + this.state.token;
    fetch(url, {
      method: 'POST',
      headers: {
        authentication: bearer,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ jsonData: responseJson.data, loading: false });
        this.setState({
          spinner: false,
        });
      })
      .catch((error) =>

        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error,
        }),
      );
  };


  selectedItem = (item, index) => {
    let { data } = this.state;
    item.selected = !item.selected
    data[index] = item
    this.setState(data);
  }
  renderItem = ({ item, index }) => {
    console.log('item', item)
    return <TouchableOpacity onPress={() => this.selectedItem(item, index)}
      style={{ flexDirection: 'row', marginLeft: '5%', marginTop: 10, marginRight: '5%', height: 40, alignItems: 'center', }
      }
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        {item.selected ? (<Checked style={{
          width: 30,
          height: 30,
          marginRight: 10
        }} />) : (<Unchecked style={{
          width: 30,
          height: 30,
          marginRight: 10
        }} />
        )}
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1}
            ellipsizeMode='tail'
            style={{
              flex: 1,
              color: theme.colors.textColor,
              fontSize: heightPercentageToDP(1.8),
              textAlign: 'left',
              textAlignVertical: 'center'
            }}>{item.name}</Text>

          <Text numberOfLines={1}
            ellipsizeMode='tail'
            style={{
              flex: 1,
              color: theme.colors.textColor,
              fontSize: heightPercentageToDP(1.7),

              textAlign: 'left',
              textAlignVertical: 'center'
              , opacity: .5
            }}>{item.city}</Text>

        </View>

      </View>
    </TouchableOpacity>
  }


  onClickCancel = () => {

    this.props.navigation.goBack()

  }
  onClickApply = () => {

  }
  onSelectPost = data => {
    console.log('data>>>bhai', data)
    // setDate(data.obj)    
  };
  changeProduct = selectedItem => {
    try {
      this.setState({ spinner: true, selectedProductID: selectedItem.value, selectedProductName: selectedItem.label });
      this.getProductAttributeAPI(selectedItem.value);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getProductListAPI()
  }

  render() {
    const jsonDashboard = this.state.jsonData;


    return (






      <View style={{
        width: '100%',
        paddingBottom: 30, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20
      }}>
        <ScrollView>
          <Spinner
            visible={this.state.spinner}
            color="#085cab" />
          <View style={{ marginTop: 20 }}>



            <View style={{ marginLeft: '5%', marginRight: '5%' }}>

              <Text numberOfLines={1}
                ellipsizeMode='tail'
                style={{
                  flex: 1,
                  color: theme.colors.textColor,
                  fontSize: 12,
                  fontFamily: 'Poppins-Regular',
                  textAlignVertical: 'center'
                }}>By time duration</Text>

              <View style={{ flexDirection: 'row', marginTop: 10 }}>


                <Text numberOfLines={1}
                  ellipsizeMode='tail'
                  style={{
                    flex: 1,
                    color: theme.colors.textColor,
                    fontSize: 12,
                    backgroundColor: '#F0F5F9',
                    borderRadius: 5,
                    flex: 1,
                    height: 35,
                    textAlign: 'center',
                    textAlignVertical: 'center', paddingTop: 3,
                    fontFamily: 'Poppins-Medium',

                  }}>Weekly</Text>

                <Text numberOfLines={1}
                  ellipsizeMode='tail'
                  style={{
                    flex: 1,
                    color: theme.colors.textColor,
                    fontSize: 12,
                    backgroundColor: '#F0F5F9',
                    borderRadius: 5,
                    flex: 1,
                    height: 35,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    marginLeft: 10, marginRight: 10, paddingTop: 3,
                    fontFamily: 'Poppins-Medium',

                  }}>Monthly</Text>

                <TouchableOpacity style={{
                  backgroundColor: '#F0F5F9',
                  borderRadius: 5,
                  flex: 1,
                }}
                  onPress={() => this.props.navigation.navigate('Custom', { onSelect: this.onSelectPost, comingFrom: 'Post' })}>
                  <Text numberOfLines={1}
                    ellipsizeMode='tail'
                    style={{
                      flex: 1,
                      color: theme.colors.textColor,
                      fontSize: 12,
                      backgroundColor: '#F0F5F9',
                      borderRadius: 5,
                      flex: 1,
                      height: 35,
                      textAlign: 'center',
                      textAlignVertical: 'center', paddingTop: 3,
                      fontFamily: 'Poppins-Medium',

                    }}>Custom</Text></TouchableOpacity>
              </View>


            </View>

            <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 20 }}>

              <Text numberOfLines={1}
                ellipsizeMode='tail'
                style={{
                  flex: 1,
                  color: theme.colors.textColor,
                  fontSize: 12,
                  fontFamily: 'Poppins-Regular',

                  textAlignVertical: 'center'
                }}>By Product</Text>

              <View style={{ height: 50, width: '100%', marginTop: 15, }}>
                <SelectDropdown
                  data={this.state.productItem}
                  onSelect={(selectedItem, i) => {
                    console.log(selectedItem)
                    this.changeProduct(selectedItem)
                    //this.addValues(selectedItem.label, el.label)
                  }}

                  buttonStyle={style1.dropdown3BtnStyle}
                  renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                      <View style={style1.dropdown3BtnChildStyle}>
                        <Text style={style1.dropdown3BtnTxt}>
                          {selectedItem ? selectedItem.label : this.state.dropdownPlaceholder}
                        </Text>
                      </View>
                    );
                  }}
                  renderDropdownIcon={() => {
                    return (
                      <FontAwesome name="chevron-down" color={"black"} size={14} style={{ marginRight: 20 }} />
                    );
                  }}
                  dropdownIconPosition={"right"}

                  dropdownStyle={style1.dropdown3DropdownStyle}
                  rowStyle={style1.dropdown3RowStyle}
                  renderCustomizedRowChild={(item, index) => {
                    return (
                      <View style={style1.dropdown3RowChildStyle}>

                        <Text style={style1.dropdown3RowTxt}>{item.label}</Text>
                      </View>
                    );
                  }}
                /></View>



            </View>


            <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 20 }}>

              <Text numberOfLines={1}
                ellipsizeMode='tail'
                style={{
                  flex: 1,
                  color: theme.colors.textColor,
                  fontSize: 12,

                  textAlignVertical: 'center'
                }}>By Seller</Text>

            </View>


            <Searchbar
              placeholder="Search Seller"
              onChangeText={ () => console.log('text')}
              inputStyle={{ fontFamily: 'Poppins-Regular',paddingBottom:5, width: widthPercentageToDP(100), backgroundColor: '#F0F5F9'}}
              style={{  backgroundColor: '#F0F5F9',width:widthPercentageToDP(90),marginVertical:10, marginHorizontal:widthPercentageToDP(5)}}
              icon={() => <Search style={{
                width: 25,
                height: 25,
                // marginLeft: 10,
                marginRight: 0
              }} />}
              
              // value={}
            />

            {/* <View style={{ flexDirection: 'row', backgroundColor: '#F0F5F9', marginLeft: '5%', marginRight: '5%', height: 50, marginTop: 10, borderRadius: 5, alignItems: 'center', }}>


              <Search style={{
                width: 30,
                height: 30,
                marginLeft: 10,
                marginRight: 0
              }} />


              <TextInput
                theme={{
                  colors: {
                    placeholder: 'transparent', text: 'black', primary: 'transparent',
                    underlineColor: 'transparent', background: 'transparent'
                  }
                }}
                label="Search Seller"
                style={{ width: '100%', height: 45, backgroundColor: 'transparent' }}
                value={"Search Seller"}
                underlineColor={"transparent"}
                underlineColorAndroid="transparent"

              />

            </View> */}




            <FlatList
              data={this.state.data}
              renderItem={this.renderItem}
              extraData={this.state}
            />



            <View style={{ flexDirection: 'row', marginLeft: '5%', marginTop: 10, marginRight: '5%', height: 40, alignItems: 'center', }}>



              <Unchecked style={{
                width: 30,
                height: 30,

                marginRight: 10
              }} />




              <View style={{ flex: 1 }}>
                <Text numberOfLines={1}
                  ellipsizeMode='tail'
                  style={{
                    flex: 1,
                    color: theme.colors.textColor,
                    fontSize: fontSizeMyPostCenterText,
                    textAlign: 'left',
                    textAlignVertical: 'center'
                  }}>Alex McCaddy</Text>

                <Text numberOfLines={1}
                  ellipsizeMode='tail'
                  style={{
                    flex: 1,
                    color: theme.colors.textColor,
                    fontSize: fontSizeMyPostCenterText,

                    textAlign: 'left',
                    textAlignVertical: 'center'
                    , opacity: .5
                  }}>Los Angeles</Text>

              </View>





            </View>



          </View>
        </ScrollView>


        <View style={{ flexDirection: 'row', marginLeft: '5%' }}>

          <View style={{ flex: 1 }}>

            <Button mode="contained"
              uppercase={false}
              contentStyle={{ height: 50 }}
              style={{ width: '90%', borderColor: theme.colors.primary, borderWidth: 2, backgroundColor: 'white' }}
              labelStyle={{ fontSize: 18, color: theme.colors.primary, }}
              onPress={() => this.onClickCancel()}>
              Cancel
            </Button>

          </View>

          <View style={{ flex: 1 }}>
            <Button mode="contained"
              uppercase={false}
              contentStyle={{ height: 50 }}
              style={{ width: '90%', }}
              labelStyle={{ fontSize: 18, color: 'white' }}
              onPress={() => this.onClickApply()}>
              Apply
            </Button>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    top: 0
  },
  container2: {
    marginTop: '2%',
    width: '90%',
    height: '86%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'flex-start',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  btnActiveContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary
  },
  btnCompletedContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    opacity: .5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#57a3f5',
    marginLeft: 1,
  },
  buttonContainer2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 1,
    marginRight: 1,
    opacity: .4
  },
  spinnerTextStyle: {
    color: '#000',
  },
  module_parent_view: {
    width: '100%',
  },
  module_label_header: {
    fontWeight: 'bold',
    fontSize: 20,
    justifyContent: 'center',
    color: '#2DA3FC',
  },
  module_card2: {
    height: 70,
    width: '90%',
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 35,
    borderColor: '#57a3f5',
    borderWidth: 1,
    elevation: 5,
    alignItems: 'center',
    alignSelf: 'center',
    top: 80
  },
  allbid: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginTop: '5%'
  },
  bidedItem: {
    height: 120,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 0,
    borderColor: '#57a3f5',
    borderWidth: 1,
    elevation: 5,
    marginLeft: '5%',
    marginTop: 15,
    flexDirection: 'row',
  },
  bidedProduct: {
    width: '60%',
    height: '85%',
    marginLeft: '2%',
    marginTop: '3%',
    alignItems: 'flex-start',

  },
  bidedQuantity: {
    width: '35%',
    height: '85%',
    marginTop: '3%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center'
  },

  titleText: {
    flex: 1,
    color: '#2DA3FC',
    fontWeight: 'bold'
  },
  allbidValue: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginTop: '1%'
  },
  titleTextValue: {
    flex: 1,
    color: '#2DA3FC',
    fontSize: 12
  },
  scrollViewStyle: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white'
  },
  dealTopMainContainer: {
    flexDirection: 'row',
    top: 0,
    marginLeft: '5%',
    marginRight: '5%'
  },
  dropdown3BtnStyle: {
    width: "100%",
    height: 45,
    backgroundColor: "#FFF",
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "lightgray",
    left: 0
  },
  dropdown3BtnTxt: {
    color: "black",
    textAlign: "center",
    fontWeight: "normal",
    fontSize: 16,
    marginHorizontal: 10,
  },
  dealBtnEnable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#69BA53',
    marginLeft: 0,
    marginRight: 5,
    marginTop: 10,
    borderRadius: 5,
  },
  dealBtnDisable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F5F9',
    marginLeft: 5,
    marginRight: 0,
    marginTop: 10,
    borderRadius: 5,
  },
  dealTopBoxTextView: {
    height: 40,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    color: 'white'
  },
  dealTopBoxTextViewDisable: {
    height: 40,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    color: '#343434'
  },

});

export default MyContractFilter;
