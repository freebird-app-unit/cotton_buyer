import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    AppState,
    TouchableWithoutFeedback
} from 'react-native';
import { Appbar, Searchbar, Button, Badge } from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../components/responsive-ratio';
import { Calendar, CalendarList } from 'react-native-calendars';
import moment from 'moment';
import { theme } from '../core/theme';
import Background from './Background';
import Spinner from 'react-native-loading-spinner-overlay';
import Search from '../assets/Search';
import Ionicons from 'react-native-vector-icons/Ionicons';

//svgs

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
            vCalendar: false,
            markedDates: {},
            isStartDatePicked: false,
            isEndDatePicked: false,
            startDate: '',
            selectingDate: false,
            selectEndDate: false,
            SendFromDate: moment(new Date()).format('YYYY-MM-DD'),
            SendEndDate: moment(new Date()).format('YYYY-MM-DD')
        };

    }

    goBack = () => {
        const { navigation, route } = this.props;
        navigation.goBack();
        // console.log('this,.propsd',this.props.route)
        if (this.state.selectEndDate == false) {
            const obj = {
                from: this.state.SendFromDate,
                to: this.state.SendFromDate,
                GoingTo: route.params.comingFrom,
                selectedDate: this.state.selectingDate
            }

            this.setState({ selectingDate: false, selectEndDate: false, })
            route.params.onSelect({ obj });
        } else {
            const obj = {
                from: this.state.SendFromDate,
                to: this.state.SendEndDate,
                selectedDate: this.state.selectingDate,
                GoingTo: route.params.comingFrom

            }
            this.setState({ selectingDate: false, selectEndDate: false, })


            route.params.onSelect({ obj });
        }
    }


    onDayPress = (day) => {

        console.log('day', day);


        if (this.state.isStartDatePicked == false) {
            let markedDates = {}
            markedDates[day.dateString] = { startingDay: true, color: theme.colors.primary, textColor: '#FFFFFF' };
            this.setState({
                markedDates: markedDates,
                isStartDatePicked: true,
                isEndDatePicked: false,
                startDate: day.dateString,
                selectingDate: true,
                SendFromDate: moment(new Date(day.dateString)).format('YYYY-MM-DD')
            });
        } else {
            let markedDates = this.state.markedDates
            let startDate = moment(this.state.startDate);
            let endDate = moment(day.dateString);
            let SendFromDate = moment(new Date(this.state.startDate)).format('YYYY-MM-DD')
            let SendEndDate = moment(new Date(endDate)).format('YYYY-MM-DD')

            this.setState({

                SendEndDate
            });

            console.log('dats', SendFromDate, SendEndDate)
            let range = endDate.diff(startDate, 'days')
            if (range > 0) {
                for (let i = 1; i <= range; i++) {
                    let tempDate = startDate.add(1, 'day');
                    tempDate = moment(tempDate).format('YYYY-MM-DD')
                    if (i < range) {
                        markedDates[tempDate] = { color: 'rgba(105, 186, 83,0.15)', textColor: '#333', };

                    } else {
                        markedDates[tempDate] = { endingDay: true, color: theme.colors.primary, textColor: '#FFFFFF' };
                    }
                }


                this.setState({
                    markedDates: markedDates,
                    isStartDatePicked: false,
                    isEndDatePicked: true,
                    selectEndDate: true,
                    startDate: '',
                    selectingDate: true,

                });
            } else {
                let markedDates = {}
                markedDates[day.dateString] = { startingDay: false, color: 'white', textColor: '#333' };

                this.setState({
                    isStartDatePicked: false,
                    isEndDatePicked: true,
                    selectEndDate: false,
                    startDate: '',
                    markedDates: {},
                    selectingDate: false,

                });
                // alert('Select an upcomming date!');
            }
        }
    }


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


    onClickCancel = () => {

        let markedDates = {}
        markedDates[this.state.SendFromDate] = { startingDay: false, color: 'white', textColor: '#333' };

        this.setState({
            isStartDatePicked: false,
            isEndDatePicked: true,
            startDate: '',
            markedDates: {},
            selectingDate: false,

        });

    }
    onClickApply = () => {
        this.props.navigation.goBack()
    }

    onClickCustomCalender = () => {

        this.setState({ vCalendar: true })
    }



    render() {
        const jsonDashboard = this.state.jsonData;

        const currentDate = moment(new Date()).format('YYYY-MM-DD');
        const maximumDate = moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD');
        const minimumDate = '2000-01-01'

        // const onDayPress = day => {
        //   // if (isStartDate) setMillRegistrationDate(day.dateString);
        //   // else setReminderDate(day.dateString);

        // };


        // this.setState()


        return (
            <Background>

                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        marginTop: -40,
                        backgroundColor: 'white'
                    }}>


                    <View
                        style={{

                            backgroundColor: 'transparent',
                            flex: 1,

                        }}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: wp(5),
                            marginTop: hp(8), height: hp(5), alignItems: 'center', justifyContent: 'space-between'
                        }}>
                            <Ionicons name='chevron-back-outline' size={hp(3)} color='#333' style={{ width: wp(30) }}
                                onPress={() => this.goBack()} />
                            <Text style={{ width: wp(30), alignSelf: 'center', color: '#333', fontSize: hp(3), fontFamily: 'Poppins - Regular' }}>Custom</Text>
                            <View style={{ width: wp(22), justifyContent: 'space-between', flexDirection: 'row', alignSelf: 'center' }} >
                                <TouchableOpacity onPress={() => this.onClickCancel()}>
                                    <Text style={{
                                        alignSelf: 'center', color: '#333',
                                        fontSize: hp(1.9), fontFamily: 'Poppins-Regular'
                                    }}>Reset</Text>

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.goBack()}>
                                    <Text style={{
                                        alignSelf: 'center', color: '#333', fontSize: hp(1.9),
                                        fontFamily: 'Poppins-Regular'
                                    }} >Done</Text>
                                </TouchableOpacity></View>

                        </View>
                        <CalendarList
                            minDate={minimumDate}
                            monthFormat={"MMMM yyyy"}
                            markedDates={this.state.markedDates}
                            markingType="period"
                            hideExtraDays={true}
                            hideDayNames={true}
                            onDayPress={this.onDayPress}
                            maxDate={moment(new Date()).format('YYYY-MM-DD')}
                        />
                    </View>
                </View>
            </Background>
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

    dropdown3BtnStyle: {
        width: "100%",
        height: 50,
        backgroundColor: "#FFF",
        paddingHorizontal: 0,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#444",
        left: 0
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

    },
    dropdown3DropdownStyle: { backgroundColor: "white" },
    dropdown3RowStyle: {
        backgroundColor: "#fff",
        borderBottomColor: "#444",
        height: 50
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
        width: '100%'
    },

});

export default MyContractFilter;
