import React, { useEffect, useRef, useState } from 'react'

import { View, AppState } from 'react-native'
import Route from './src/Navigation'
import credentials from './src/Api/firebaseConfig';

import notifee, { EventType, AndroidImportance } from '@notifee/react-native';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import EncryptedStorage from 'react-native-encrypted-storage';
import { io } from "socket.io-client";
import * as RootNavigation from './RootNavigation';
if (!window.location) {
  // App is running in simulator
  // console.log('sdfsdf', window.navigator)
  window.navigator.userAgent = 'ReactNative';
}
// window.navigator.userAgent = 'ReactNative';

const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 5000,
  transports: ['websocket']/// you need to explicitly tell it to use websockets
};

const socket = io.connect('http://165.232.181.91:3000/', connectionConfig); //live


const App = (props) => {
  // const navigation = useNavigation()

  console.log('navigation', RootNavigation.navigate)
  // RootNavigation.navigate('Custom')


  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);


  console.log('cred', credentials)
  async function onAppBootstrap() {

    if (!firebase.apps.length) {
      await firebase.initializeApp(credentials);
    }
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {

    }

    await messaging().registerDeviceForRemoteMessages();

    const token = await messaging().getToken();

    await EncryptedStorage.setItem('FCMToken', token);


  }

  async function onNotificationClicked(remoteMessage) {
    console.log(
      'Notification caused app to open from background state: ' +
      JSON.stringify(remoteMessage.data),
    );
    if (remoteMessage.data.navigateto == "DealDetails") {
      RootNavigation.navigate(remoteMessage.data.navigateto, {
        data: remoteMessage.data,
        cameFrom: 'Negotiation',
        Title: remoteMessage.data.product_name,
        type: remoteMessage.data.type,
        prevScrName: 'Dashboard',
      });
    } else {
      RootNavigation.navigate("DealDetails", {
        data: remoteMessage.data,
        cameFrom: 'Negotiation',
        Title: remoteMessage.data.product_name,
        type: remoteMessage.data.type,
        prevScrName: 'Dashboard',
      });
    }
  }

  async function onMessageReceived(message) {
    const { title, body } = message.notification

    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId: "default",
        importance: AndroidImportance.HIGH,
        largeIcon: require('./src/assets/ic_launcher.png'),
        // largeIcon:'i'

      },
    });
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        const st = io.connect('http://165.232.181.91:3000/', connectionConfig); //live

        st.connect()
        st.on('disconnect', () => console.log('disconnected st by foreground', st.id))

        st.on('reconnect', () => console.log('connected st by foreground', st.id))
        // console.log("App has come to the foreground!");
      }
      const st = io.connect('http://165.232.181.91:3000/', connectionConfig); //live

      st.disconnect();
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      // console.log("AppState", appState.current);
    });

    return subscription
  }, []);

  useEffect(async () => {
    const session = await EncryptedStorage.getItem('FCMToken');

    // const settings = await notifee.requestPermission();

    console.log('session', session,)

    socket.connect()
    socket.on('connect', () => console.log('connected socket', socket.id))

    socket.on('disconnect', () => console.log('connected socket by foreground', socket.id))


    //yes proper che reload karo pachi app server bandh hatu aayathi baroba
    socket.onAny(event => console.log('got,', event))
    socket.on('NegotiationToMultipleSeller1', content => console.log('got,', content))




    if (session === null)
      onAppBootstrap()



    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // onMessageReceived
      const { title, body } = remoteMessage.notification



      // Display a notification
      await notifee.displayNotification({
        title: title,
        body: body,
        android: {
          channelId: "default",
          importance: AndroidImportance.HIGH,

        },
      });


    });

    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
    messaging().onNotificationOpenedApp(onNotificationClicked);


    notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;
      if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {

        await notifee.cancelNotification(notification.id);
      }
    });


    return unsubscribe;
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <Route />
    </View>
  )
}

export default App