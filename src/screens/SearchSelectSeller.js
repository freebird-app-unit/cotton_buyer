import React, {Component} from 'react';
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
} from 'react-native';
import {baseUrl} from '../components/Global';
import {fontSizeMyPostCenterText} from '../components/Global';
import {vLineMyPostStyle} from '../components/Global';
import Background from '../components/Background';
import Header from '../components/Header';
import {Card} from 'react-native-elements';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Appbar, Searchbar, Button, Badge} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {theme} from '../core/theme';
import TextInput from '../components/TextInput';

//svgs
import Home from '../assets/Home';
import Employee from '../assets/Employee';
import EmployeeGray from '../assets/EmployeeGray';
import CustomerIcon from '../assets/CustomerIcon';
import FilterSettings from '../assets/FilterSettings';
import DownArrow from '../assets/DownArrow';
import RightArrow from '../assets/RightArrow';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../helpers/backHandler';
import { heightPercentageToDP } from '../components/responsive-ratio';

class SearchSelectSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      loading: 'true',
      spinner: false,
      jsonData: {},
      token: '',
      openState: false,
      value: null,
      items: [
        {label: 'Maharashtra', value: '1'},
        {label: 'Rajasthan', value: '2'},
        {label: 'Punjab', value: '3'},
        {label: 'Karnatak', value: '4'},
      ],
    };
  }

  setOpenState(openState) {
    this.setState({
      openState,
    });
  }

  setValue(callback) {
    this.setState(state => ({
      value: callback(state.value),
    }));
  }

  setItemsState(callback) {
    this.setState(state => ({
      items: callback(state.items),
    }));
  }

  onClickView = data => {
    console.log('View data is...' + JSON.stringify(data));
    let passData = {
      type: 'post',
      cameFrom: 'Search',
      bales_required: this.props.route.params.bales,
      post_id: data.post_id,
      sellerId: data.seller_buyer_id,
      current_price: data.price,
      current_no_of_bales: data.bales,
      payment_condition: '',
      transmit_condition: '',
      lab: '',
    };
    this.props.navigation.navigate('DealDetails', {
      data: passData,
      type: 'post',
      prevScrName: 'SearchSelectSeller',
      cameFrom: 'Search',
    });
  };

  componentDidMount() {
    console.log(
      'Select Search----' + JSON.stringify(this.props.route.params.data),
    );
    handleAndroidBackButton(this.goToDashboard);
  }

  goToDashboard = () => {
    const navigation = this.props.navigation;
    let canGoBack = navigation.canGoBack();
    return canGoBack ? navigation.goBack() : navigation.replace('Dashboard');
  };

  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }

  onClickCountry = data => {
    console.log('data....' + JSON.stringify(data));
  };

  crateProductView = viewData => {
    return viewData.map((ell, i) => (
      <View>
        <TouchableOpacity onPress={() => this.onClickCountry(ell)}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <View
              style={{
                flex: 1,
                marginLeft: '5%',
                marginTop: 10,
                marginRight: '5%',
                height: 40,
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  flex: 1,
                  color: theme.colors.textColor,
                  fontSize: 12,
                  opacity: 0.5,
                  textAlignVertical: 'center',
                }}>
                Seller
              </Text>

              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  flex: 1,
                  color: theme.colors.textColor,
                  fontSize: 12,
                  textAlignVertical: 'center',
                }}>
                {ell.name}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                marginLeft: '5%',
                marginTop: 10,
                marginRight: '5%',
                height: 40,
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  flex: 1,
                  color: theme.colors.textColor,
                  fontSize: 12,
                  opacity: 0.5,
                  textAlignVertical: 'center',
                }}>
                Price
              </Text>

              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  flex: 1,
                  color: theme.colors.textColor,
                  fontSize: 12,

                  textAlignVertical: 'center',
                }}>
                ₹ {ell.price}({ell.remaining_bales})
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                width: '100%',
                marginLeft: '1%',
                marginTop: 10,
                marginRight: '5%',
                height: 35,
              }}>
              <TouchableOpacity onPress={() => this.onClickView(ell)}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    width: '100%',
                    height: '100%',
                    fontSize: 14,
                    textAlign: 'center',
                    alignItems: 'center',
                    color: 'white',
                    borderRadius: 5,
                    backgroundColor: '#69BA53',
                    textAlignVertical: 'center',
                  }}>
                  View
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    ));
  };

  crateProductAttributeUI4 = stationData => {
    return stationData.map((ell, i) => (
      <View>
        <TouchableOpacity onPress={() => this.onClickCountry(ell.state)}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: '5%',
              marginTop: 0,
              marginRight: '5%',
              height: 40,
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  flex: 1,
                  color: theme.colors.textColor,
                  fontSize: 14,
                  textAlign: 'left',
                  textAlignVertical: 'center',
                }}>
                {ell.name} ({ell.count})
              </Text>
            </View>
            <DownArrow
              style={{width: 30, height: 30, marginRight: 10}}></DownArrow>
          </View>
        </TouchableOpacity>

        {this.crateProductView(ell.data)}
      </View>
    ));
  };

  crateProductAttributeUI3 = districtData => {
    console.log('districtData', districtData)
    return districtData.map((ell, i) => (
      <View>
        <TouchableOpacity onPress={() => this.onClickCountry(ell.state)}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: '5%',
              marginTop: 0,
              marginRight: '5%',
              height: 40,
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  flex: 1,
                  color: theme.colors.textColor,
                  fontSize: 14,
                  textAlign: 'left',
                  textAlignVertical: 'center',
                }}>
                {ell.name} ({ell.count})
              </Text>
            </View>
            <DownArrow
              style={{width: 30, height: 30, marginRight: 10}}></DownArrow>
          </View>
        </TouchableOpacity>

        {this.crateProductAttributeUI4(ell.city)}
      </View>
    ));
  };

  crateProductAttributeUI2 = stateData => {
    console.log('statedata',stateData)
    return stateData.map((ell, i) => (
      <View>
        <TouchableOpacity onPress={() => this.onClickCountry(ell.state)}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: '5%',
              marginTop: 0,
              marginRight: '5%',
              height: 40,
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  flex: 1,
                  color: theme.colors.textColor,
                  fontSize: 14,
                  textAlign: 'left',
                  textAlignVertical: 'center',
                }}>
                {ell.name} ({ell.count})
              </Text>
            </View>
            <DownArrow
              style={{width: 30, height: 30, marginRight: 10}}></DownArrow>
          </View>
        </TouchableOpacity>

        {this.crateProductAttributeUI3(ell.district)}
      </View>
    ));
  };

  crateProductAttributeUI = () => {
    console.log("this.props.route.params.data.map", this.props.route.params.data)
    return this.props.route.params.data.map((ell, i) => (
      <View>
        <TouchableOpacity onPress={() => this.onClickCountry(ell.state)}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: '5%',
              marginTop: 0,
              marginRight: '5%',
              height: 40,
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  flex: 1,
                  color: theme.colors.textColor,
                  fontSize: 14,
                  textAlign: 'left',
                  textAlignVertical: 'center',
                }}>
                {ell.name} ({ell.count})
              </Text>
            </View>
            <DownArrow
              style={{width: 30, height: 30, marginRight: 10}}></DownArrow>
          </View>
        </TouchableOpacity>
        {this.crateProductAttributeUI2(ell.state)}
      </View>
    ));
  };

  _keyExtractor(item, index) {
    return index.toString();
  }

  _renderItem({item, index}) {
    return (
      <View style={{flexDirection: 'row', width: 80}}>
        <View style={{flex: 1}}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              flex: 1,
              color: theme.colors.textColor,
              fontSize: fontSizeMyPostCenterText,
              textAlign: 'center',
              textAlignVertical: 'center',
              textTransform: 'uppercase',
            }}>
            {item.attribute}
          </Text>

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              flex: 1,
              color: theme.colors.textColor,
              fontSize: fontSizeMyPostCenterText,
              fontWeight: 'bold',
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            {item.from} - {item.to}
          </Text>
        </View>

        <View style={vLineMyPostStyle}></View>
      </View>
    );
  }

  _keyExtractorCountry(item, index) {
    return index.toString();
  }

  _renderItemCountry({item, index}) {
    return (
      <TouchableOpacity onPress={() => this.onClickCountry(item.state)}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: '5%',
            marginTop: 0,
            marginRight: '5%',
            height: 40,
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                flex: 1,
                color: theme.colors.textColor,
                fontSize: 14,
                textAlign: 'left',
                textAlignVertical: 'center',
              }}>
              {item.name} ({item.count})
            </Text>
          </View>
          <DownArrow
            style={{width: 30, height: 30, marginRight: 10}}></DownArrow>
        </View>
      </TouchableOpacity>
    );
  }

  _keyExtractorState(item, index) {
    return index.toString();
  }

  _renderItemState({item, index}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginLeft: '5%',
          marginTop: 0,
          marginRight: '5%',
          height: 40,
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              flex: 1,
              color: theme.colors.textColor,
              fontSize: 14,
              textAlign: 'left',
              textAlignVertical: 'center',
            }}>
            {item.name} ({item.count})
          </Text>
        </View>
        <DownArrow style={{width: 30, height: 30, marginRight: 10}}></DownArrow>
      </View>
    );
  }

  render() {
    const jsonDashboard = this.state.jsonData;

    return (
      <Background>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            position: 'relative',
            // marginTop: -40,
            backgroundColor: theme.colors.blackBG,
          }}>
          <Spinner visible={this.state.spinner} color="#085cab" />

          <View style={{width: '100%', height: heightPercentageToDP(9), marginTop: heightPercentageToDP(4)}}>
            <Appbar.Header style={{backgroundColor: 'transparent'}}>
              <Appbar.BackAction
                color="white"
                onPress={() => this.props.navigation.goBack()}
              />
              <Appbar.Content
                style={{alignItems: 'center'}}
                color="white"
                title="Select Seller"
                titleStyle={{fontSize: 20, fontWeight: 'bold'}}
              />
              <Appbar.Action
                icon="notification-clear-all"
                color="transparent"
                onPress={() => {
                  this.setState({isFilterShow: true});
                }}
              />
            </Appbar.Header>
          </View>

          <View
            style={{
              width: '100%',
              height: '86%',
              paddingBottom: 30,
              marginTop: 10,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <ScrollView>
              <View style={{marginTop: 20}}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: '#F0F5F9',
                    paddingBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '5%',
                      marginRight: '5%',
                      height: 40,
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        flex: 1,
                        color: theme.colors.blackBG,
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlignVertical: 'center',
                      }}>
                      {this.props.route.params.pn}
                    </Text>

                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        width: '50%',
                        height: '100%',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'right',
                        alignItems: 'center',
                        color: theme.colors.blackBG,
                        textAlignVertical: 'center',
                      }}>
                      {this.props.route.params.bales} Bales
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: '5%',
                      marginTop: 10,
                      marginRight: '5%',
                      height: 40,
                    }}>
                    <FlatList
                      style={{flex: 1}}
                      data={this.props.route.params.info.attribute_array}
                      keyExtractor={this._keyExtractor.bind(this)}
                      renderItem={this._renderItem.bind(this)}
                      horizontal={true}
                    />
                  </View>
                </View>

                {this.crateProductAttributeUI()}
              </View>
            </ScrollView>
          </View>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    top: 0,
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
  btnActiveContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  btnCompletedContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    opacity: 0.5,
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
    opacity: 0.4,
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
    top: 80,
  },
  allbid: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginTop: '5%',
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
    textAlignVertical: 'center',
  },

  titleText: {
    flex: 1,
    color: '#2DA3FC',
    fontWeight: 'bold',
  },
  allbidValue: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginTop: '1%',
  },
  titleTextValue: {
    flex: 1,
    color: '#2DA3FC',
    fontSize: 12,
  },
  scrollViewStyle: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  dealTopMainContainer: {
    flexDirection: 'row',
    top: 0,
    marginLeft: '5%',
    marginRight: '5%',
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
    color: 'white',
  },
  dealTopBoxTextViewDisable: {
    height: 40,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    color: '#343434',
  },
});

export default SearchSelectSeller;
