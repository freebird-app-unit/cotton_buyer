import React, { useEffect } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './core/theme'
import { View, Text, Alert, StatusBar,Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import notifee, { EventType, AndroidImportance } from '@notifee/react-native';
import { Appbar, Searchbar, Button, Badge } from 'react-native-paper';
import styles from './screens/Styles'
import { navigationRef } from '../RootNavigation';
import FilterSettings from './assets/FilterSettings';

import {
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    SplashScreen,
    Dashboard,
    SetPasswordScreen,
    VerifyOtpScreen,
    ChangePasswordScreen,
    MyContractDetails,
    DealDetails,
    NegotiateDetails,
    Participant,
    MakeDealDetails,
    NotificationSelectSeller,
    SearchSelectSeller,
    MyContractFilter,
    MyPostDetails, Profile,OTPVerificationDeal,
    MultipleNegotiationList, Plan, Wallet, HomeScreen, MenuScreen, PostToBuy, SearchToBuy, NotificationToSeller, MyPost, MyContract, NewsFeedView
} from './screens'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from './components/responsive-ratio';
import Custom from './components/Custom'

import NewsSingle from './components/NewsSingle'
import EditProfile from './components/EditProfile'
import SelectBroker from './components/SelectBroker'
import Brokers from './components/Brokers'
import RegisterPlan from './components/RegisterPlan'
import MCXScreen from './components/MCXScreen'


import { FirstRoute, SecondRoute, ThirdRoute } from './components/CalculatorView'
import { Post, Contract } from './screens/ReportScreen'

// import firebase from '@react-native-firebase/app';
// import messaging from '@react-native-firebase/messaging';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import EncryptedStorage from 'react-native-encrypted-storage';

const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator();

const tabnavi = ({ navigation }) => {
    console.log('nabvi', navigation)
    return (
        <View style={{ flex: 1, backgroundColor: '#333', }}>
            <View style={{
                flexDirection: 'row', paddingHorizontal: wp(5),
                marginTop: hp(3), height: hp(9), alignItems: 'center', justifyContent: 'space-between'
            }}>
                <Ionicons name='chevron-back-outline' size={hp(3)} color='#fff' style={{ width: wp(30) }} onPress={() => navigation.goBack()} />
                <Text style={{ alignSelf: 'center', color: '#fff', fontSize: hp(3), fontFamily: 'Poppins - Regular' }}>Calculator</Text>
                <View style={{ width: wp(30) }} />

            </View>
            <View style={{
                flex: 1,
                width: '100%',
                // height: hp(86),
                paddingBottom: 30,
                paddingTop: hp(3),
                marginTop: hp(1),
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}>
                <Tab.Navigator tabBarOptions={{
                    labelStyle: { fontSize: hp(2), fontFamily: 'Poppins-SemiBold',textTransform: 'none' },
                    activeTintColor: theme.colors.primary,
                    inactiveTintColor: '#afafaf',
                    indicatorStyle: { backgroundColor: theme.colors.primary }
                }}>
                    <Tab.Screen name="Ginning" component={FirstRoute} />
                    <Tab.Screen name="Spinning" component={SecondRoute} />
                    <Tab.Screen name="Exports" component={ThirdRoute} />
                </Tab.Navigator>
            </View>
        </View>
    );
}

const ReportTab = ({ navigation }) => {
    // console.log('nabvi', navigation)
    return (
        <View style={{ flex: 1, backgroundColor: '#333', }}>
            <View style={{
                flexDirection: 'row', paddingHorizontal: wp(5),
                marginTop: hp(4), height: hp(9), alignItems: 'center', justifyContent: 'space-between'
            }}>
                <Ionicons name='chevron-back-outline' size={hp(3)} color='#fff' style={{ width: wp(30) }} onPress={() => navigation.goBack()} />
                <Text style={{ alignSelf: 'center', color: '#fff', fontSize: hp(3), fontFamily: 'Poppins - Regular' }}>Report</Text>
                <View style={{ width: wp(30) }} />

            </View>
            <View style={{
                flex: 1,
                width: '100%',
                // height: hp(86),
                paddingBottom: 30,
                paddingTop: hp(3),
                marginTop: hp(2),
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}>
                <Tab.Navigator tabBarOptions={{
                    labelStyle: { fontSize: hp(2), fontFamily: 'Poppins-SemiBold',textTransform: 'none' },
                    activeTintColor: theme.colors.primary,
                    inactiveTintColor: '#afafaf',
                    indicatorStyle: { backgroundColor: theme.colors.primary }
                }}>
                    <Tab.Screen name="Post" component={Post} />
                    <Tab.Screen name="Contract" component={Contract} />
                </Tab.Navigator>
            </View>
        </View>
    );
}

const AppHeading = (props) => {
    console.log('props', props)
    return (
        <View style={{ width: '100%', height: hp(9), marginTop: hp(4) }}>
            <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                {props.menu ? <Appbar.Action
                    icon="menu"
                    color={props.color ? props.color : "white"}
                    onPress={props.leftPress}
                /> :
                    <Appbar.Action
                        icon={() => <Ionicons name='chevron-back-outline' size={hp(3)} color={props.color ? props.color : "white"} />}
                        color={props.color ? props.color : "white"}

                        onPress={props.leftPress}
                    />}
                <Appbar.Content
                    style={{ alignItems: 'center' }}
                    color={props.color ? props.color : "white"}
                    title={props.title}
                    titleStyle={{ fontSize: hp(2.5), fontFamily: "Poppins-SemiBold", textTransform: 'none' }}
                />
               
                {props.filter ? <Appbar.Action
                    icon= {() => <FilterSettings color={'white'}/>}
                    color={props.color ? props.color : "white"}

                    onPress={
                        props.rightPress
                        // this.setState({ isFilterShow: true });
                        // // if (this.state.isMyContracts || this.state.isProfile) {
                        //   this.state.isMyContracts && this.props.navigation.navigate
                        //     ('MyContractFilter', { productList: this.state.productItem });
                        //   this.state.isProfile && this.props.navigation.navigate('EditProfile', { data: this.state.ProfileData })

                    }
                /> : <Appbar.Action
                    icon="menu"
                    color="transparent"
                    onPress={() => null}
                />}
            </Appbar.Header>
        </View>
    )
}

const AppHeadingProfile = (props) => {
    console.log('props', props)
    return (
        <View style={{ width: '100%', height: hp(9), marginTop: hp(4) }}>
            <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                {props.menu ? <Appbar.Action
                    icon="menu"
                    color="white"
                    onPress={props.leftPress}
                /> :
                    <Appbar.Action
                        icon={() => <Ionicons name='chevron-back-outline' size={hp(3)} color='#fff' />}
                        color="white"
                        onPress={props.leftPress}
                    />}
                <Appbar.Content
                    style={{ alignItems: 'center' }}
                    color="white"
                    title={props.title}
                    titleStyle={{ fontSize: hp(2.5), fontFamily: "Poppins-SemiBold" }}
                />
                <Appbar.Action
                        icon={() => <Image tintColor={'white'} style={{ height: hp(3), width: hp(3) }} source={require('./assets/edit-icon.png')} />}
                        color={"white"}
                        onPress={
                            props.rightPress
                            // this.setState({ isFilterShow: true });
                            // // if (this.state.isMyContracts || this.state.isProfile) {
                            //   this.state.isMyContracts && this.props.navigation.navigate
                            //     ('MyContractFilter', { productList: this.state.productItem });
                            //   this.state.isProfile && this.props.navigation.navigate('EditProfile', { data: this.state.ProfileData })

                        }
                    /></Appbar.Header>
        </View>
    )
}

const RegisterScreenFunction = ({ navigation, route }) => 
<View style={{ flex: 1, backgroundColor: '#f4fafe' }}>
    <AppHeading color='#333' title={'Create an account'}
     leftPress={() => navigation.goBack()} />
    <View
        style={styles.flex}>
        <RegisterScreen navigation={navigation} route={route} />
    </View>
</View>

const home = ({ navigation, route }) => {
    console.log('navigation>', navigation)
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <AppHeading title={'Dashboard'} menu leftPress={() => navigation.navigate('MenuScreen')} />
            <View
                style={styles.flex}>
                <HomeScreen navigation={navigation} route={route} />
            </View>
        </View>
    )
}

const VerifyOtpFunction = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#F0F5F9' }}>
            <AppHeading color={'#333'} title={'Verify OTP'} leftPress={() => navigation.navigate('ForgotPasswordScreen')} />
            <View
                style={styles.flex}>
                <VerifyOtpScreen navigation={navigation} />
            </View>
        </View>
    )
}

const ChangePasswordFunction = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <AppHeading menu title={'Change Password'} leftPress={() => navigation.navigate('MenuScreen')} />
            <View
                style={styles.flex}>
                <ChangePasswordScreen navigation={navigation} />
            </View>
        </View>
    )
}

const ForgotPasswordFunction = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#F0F5F9' }}>
            <AppHeading color={'#333'} title={'Forgot Password'} leftPress={() => navigation.navigate('LoginScreen')} />
            <View
                style={styles.flex}>
                <ForgotPasswordScreen navigation={navigation} />
            </View>
        </View>
    )
}

const mcxScreenFunction = ({ navigation, route }) => {
    // console.log('navigation>', navigation)
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <AppHeading title={'MCX'} menu leftPress={() => navigation.navigate('MenuScreen')} />
            <View
                style={styles.flex}>
                <MCXScreen navigation={navigation} route={route} />
            </View>
        </View>
    )
}

const PostToBuyFunction = ({ navigation,route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Post to Buy'} menu leftPress={() => navigation.navigate('MenuScreen')} />
    <View
        style={styles.flex}>
        <PostToBuy navigation={navigation} route={route}/>
    </View>
</View>

const SearchToBuyFunction = ({ navigation,route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Search Seller'} menu leftPress={() => navigation.navigate('MenuScreen')} />
    <View
        style={styles.flex}>
        <SearchToBuy navigation={navigation} route={route}/>
    </View>
</View>

const NotificationToSellerFunction = ({ navigation,route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Notification to Seller'} menu leftPress={() => navigation.navigate('MenuScreen')} />
    <View
        style={styles.flex}>
        <NotificationToSeller navigation={navigation} route={route}/>
    </View>
</View>

const MyPostFunction = ({ navigation,route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'My Post'} menu leftPress={() => navigation.navigate('MenuScreen')} />
    <View
        style={styles.flex}>
        <MyPost navigation={navigation} route={route} />
    </View>
</View>

const MyContractFunction = ({ navigation, route }) => {
    console.log('navigation>??', route)
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <AppHeading title={'My Contract'} menu filter leftPress={() => navigation.navigate('MenuScreen')} rightPress={() =>
                navigation.navigate('MyContractFilter', { productList: route.params.productList })} />
            <View
                style={styles.flex}>
                <MyContract navigation={navigation} route={route}/>
            </View>
        </View>
    )
}
const NewsFeedViewFunction = ({ navigation,route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'News Feed'} menu leftPress={() => navigation.navigate('MenuScreen')} />
    <View
        style={styles.flex}>
        <NewsFeedView navigation={navigation} route={route} />
    </View>
</View>


const MyContractFilterFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#fff' }}>
    
    <View style={{ width: '100%', height: hp(9), marginTop: hp(4) }}>

        <Appbar.Header style={{ backgroundColor: 'transparent' }}>
            <Appbar.BackAction
                color="black"
                onPress={() => navigation.goBack()}
            />
            <Appbar.Content
                style={{ alignItems: 'center' }}
                color="#333"
                title={'Filter'}
                titleStyle={{ fontSize: 20, fontFamily: 'Poppins-SemiBold', color: '#333' }}
            />
            <Appbar.Action
                // icon={() => {}}
                color="black"
                onPress={() => {
                 
                }}
            />
        </Appbar.Header>
    </View>
    <View
        style={styles.flex}>
        <MyContractFilter navigation={navigation} route={route} />
    </View>
</View>


const ParticipantFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#fff' }}>

    <View style={{ width: '100%', height: hp(9), marginTop: hp(4) }}>

        <Appbar.Header style={{ backgroundColor: 'transparent' }}>
            <Appbar.BackAction
                color="black"
                onPress={() => navigation.goBack()}
            />
            <Appbar.Content
                style={{ alignItems: 'center' }}
                color="#333"
                title={'Participant'}
                titleStyle={{ fontSize: 20, fontFamily: 'Poppins-SemiBold', color: '#333' }}
            />
            <Appbar.Action
                // icon={() => {}}
                color="black"
                onPress={() => {

                }}
            />
        </Appbar.Header>
    </View>
    <View
        style={styles.flex}>
        <Participant navigation={navigation} route={route} />
    </View>
</View>



const CustomFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#fff' }}>

    <View style={{ width: '100%', height: hp(9), marginTop: hp(4) }}>

        <Appbar.Header style={{ backgroundColor: 'transparent' }}>
            <Appbar.BackAction
                color="black"
                onPress={() => navigation.goBack()}
            />
            <Appbar.Content
                style={{ alignItems: 'center' }}
                color="#333"
                title={'Custom'}
                titleStyle={{ fontSize: 20, fontFamily: 'Poppins-SemiBold', color: '#333' }}
            />
            <Appbar.Action
                // icon={() => {}}
                color="black"
                onPress={() => {

                }}
            />
        </Appbar.Header>
    </View>
    <View
        style={styles.flex}>
        <Custom navigation={navigation} route={route} />
    </View>
</View>

const RegisterPlanFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Plan'} leftPress={() => navigation.goBack()} />
    <View
        style={styles.flex}>
        <RegisterPlan navigation={navigation} route={route} />
    </View>
</View>

const PlanFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Plan'} leftPress={() => navigation.goBack()} />
    <View
        style={styles.flex}>
        <Plan navigation={navigation} route={route} />
    </View>
</View>

const MyContractDetailsFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'My Contract Details'} leftPress={() => navigation.goBack()} />
    <View
        style={styles.flex}>
        <MyContractDetails navigation={navigation} route={route} />
    </View>
</View>

const MyPostDetailsFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'My Post '} leftPress={() => navigation.goBack()} />
    <View
        style={styles.flex}>
        <MyPostDetails navigation={navigation} route={route} />
    </View>
</View>


const WalletFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Wallet'} menu leftPress={() => navigation.navigate('MenuScreen')} />
    <View
        style={styles.flex}>
        <Wallet navigation={navigation} route={route} />
    </View>
</View>


const BrokerFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Brokers'} menu leftPress={() => navigation.navigate('MenuScreen')} />
    <View
        style={styles.flex}>
        <Brokers navigation={navigation} route={route} />
    </View>
</View>

const ProfileFunction = ({ navigation, route }) => {
    console.log('navigation>?? profiole', route.params)
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <AppHeadingProfile title={'Profile'} menu profile leftPress={() => navigation.navigate('MenuScreen')}
                rightPress={() => navigation.navigate('EditProfile', { data: route.params != undefined ? route.params.ProfileData : [] })} />
            <View
                style={styles.flex}>
                <Profile navigation={navigation} route={route} />
            </View>
        </View>
    )
}

const MultipleNegotiationListFunction = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ width: '100%', height: hp(9), marginTop: hp(4) }}>

                <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                    <Appbar.BackAction
                        color="black"
                        onPress={() => navigation.goBack()}
                    />
                    <Appbar.Content
                        style={{ alignItems: 'center' }}
                        color="#333"
                        title={route.params.Title}
                        titleStyle={{ fontSize: 20, fontFamily: 'Poppins-SemiBold', color: '#333' }}
                    />
                    <Appbar.Action
                        icon={() => <Ionicons
                            name="ios-information-circle-outline"
                            size={25}
                            color="black"
                        />}
                        color="black"
                        onPress={() => {
                            navigation.navigate('Participant', {
                                prevScrName: 'HomeScreen',
                            });
                        }}
                    />
                </Appbar.Header>
            </View>
            <View
                style={styles.flex}>
                <MultipleNegotiationList navigation={navigation} route={route} />
            </View>
        </View>
    )
}

const DealDetailsFunction = ({ navigation, route }) => {
    console.log('navigation>?? profiole >> dealdetails', route.params)
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ width: '100%', height: hp(9), marginTop: hp(4) }}>

                <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                    <Appbar.BackAction
                        color="black"
                        onPress={() => navigation.goBack()}
                    />
                    <Appbar.Content
                        style={{ alignItems: 'center' }}
                        color="#333"
                        title={route.params.Title}
                        titleStyle={{ fontSize: 20, fontFamily: 'Poppins-SemiBold', color: '#333' }}
                    />
                    <Appbar.Action
                        icon={() => <Ionicons
                            name="ios-information-circle-outline"
                            size={25}
                            color="black"
                        />}
                        color="black"
                        onPress={() => {
                            navigation.navigate('Participant', {
                                prevScrName: 'DealDetails',
                            });
                        }}
                    />
                </Appbar.Header>
            </View>
            <View
                style={styles.flex}>
                <DealDetails navigation={navigation} route={route} />
            </View>
        </View>
    )
}


const NotificationSelectSellerFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'Select Seller'} leftPress={() => navigation.goBack()} />
    <View
        style={styles.flex}>
        <NotificationSelectSeller navigation={navigation} route={route} />
    </View>
</View>

const NegotiateDetailsFunction = ({ navigation, route }) => {
    // console.log('navigation>?? profiole', route.params)
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ width: '100%', height: hp(9), marginTop: hp(4) }}>

                <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                    <Appbar.BackAction
                        color="black"
                        onPress={() => navigation.goBack()}
                    />
                    <Appbar.Content
                        style={{ alignItems: 'center' }}
                        color="black"
                        title={route.params.Title}
                        titleStyle={{ fontSize: 20, fontFamily: 'Poppins-SemiBold' }}
                    />
                    <Appbar.Action
                        icon={() => <Ionicons
                            name="ios-information-circle-outline"
                            size={25}
                            color="black"
                        />}
                        color="black"
                        onPress={() => {
                            navigation.navigate('Participant', {
                                prevScrName: 'DealDetails',
                            });
                        }}
                    />
                </Appbar.Header>
            </View>
            <View
                style={styles.flex}>
                <NegotiateDetails navigation={navigation} route={route} />
            </View>
        </View>
    )
}





const App = () => {

    
    return (
        <Provider theme={theme}>
            <NavigationContainer ref={navigationRef}>
                <StatusBar barStyle={'light-content'}
                    backgroundColor="transparent" translucent={true} />
                <Stack.Navigator
                    initialRouteName="SplashScreen"
                    screenOptions={{
                        headerShown: false,
                    }}
                >

                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreenFunction} />

                    <Stack.Screen
                        name="ForgotPasswordScreen"
                        component={ForgotPasswordFunction} />
                    <Stack.Screen
                        name="SetPasswordScreen"
                        component={SetPasswordScreen} />
                    <Stack.Screen
                        name="ChangePasswordScreen"
                        component={ChangePasswordFunction} />
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />

                    <Stack.Screen name="HomeScreen" component={home} />
                    <Stack.Screen name="MenuScreen" component={MenuScreen} />
                    <Stack.Screen name="PostToBuy" component={PostToBuyFunction} />
                    <Stack.Screen name="SearchToBuy" component={SearchToBuyFunction} />
                    <Stack.Screen name="NotificationToSeller" component={NotificationToSellerFunction} />
                    <Stack.Screen name="MyPost" component={MyPostFunction} />
                    <Stack.Screen name="MyContract" component={MyContractFunction} />
                    <Stack.Screen name="NewsFeed" component={NewsFeedViewFunction} />
                    <Stack.Screen name="Profile" component={ProfileFunction} />
                    <Stack.Screen name="Brokers" component={BrokerFunction} />
                    <Stack.Screen name="RegisterPlan" component={RegisterPlanFunction} />
                    <Stack.Screen name="McxScreen" component={mcxScreenFunction} />
                    <Stack.Screen name="ReportScreen" component={ReportTab} />

                    
                    







                    {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
                    <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpFunction} />
                    <Stack.Screen name="MyContractDetails" component={MyContractDetailsFunction} />
                    <Stack.Screen name="DealDetails" component={DealDetailsFunction} />
                    <Stack.Screen name="NegotiateDetails" component={NegotiateDetailsFunction} />
                    <Stack.Screen name="Participant" component={ParticipantFunction} />
                    <Stack.Screen name="MakeDealDetails" component={MakeDealDetails} />
                    <Stack.Screen name="NotificationSelectSeller" component={NotificationSelectSellerFunction} />
                    <Stack.Screen name="SearchSelectSeller" component={SearchSelectSeller} />
                    <Stack.Screen name="MyContractFilter" component={MyContractFilterFunction} />
                    <Stack.Screen name="MyPostDetails" component={MyPostDetailsFunction} />
                    <Stack.Screen name="MultipleNegotiationList" component={MultipleNegotiationListFunction} />
                    <Stack.Screen name="Plan" component={PlanFunction} />
                    <Stack.Screen name="Wallet" component={WalletFunction} />
                    <Stack.Screen name="Custom" component={Custom} />
                    <Stack.Screen name="NewsSingle" component={NewsSingle} />
                    <Stack.Screen name="EditProfile" component={EditProfile} />
                    <Stack.Screen name="SelectBroker" component={SelectBroker} />
                    <Stack.Screen name="Calculator" component={tabnavi} />
                    <Stack.Screen name="OTPVerification" component={OTPVerificationDeal} />



                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App