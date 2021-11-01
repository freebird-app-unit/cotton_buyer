// packages
import {Alert,BackHandler} from 'react-native';

const exitAlert = () => {
  Alert.alert(
    "e-Cotton",
    "Do you want to quit the app?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => BackHandler.exitApp() }
    ]
  );
};
export {exitAlert};


