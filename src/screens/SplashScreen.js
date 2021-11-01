import React, {useState,useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Animated,
  Image
} from 'react-native';
import ErpMorbi from '../assets/ErpMorbi';
import ME_Icon from '../assets/ME_Icon';


const SplashScreen = ({navigation}) => {

 const springValue = useRef(new Animated.Value(0.1)).current;

    Animated.spring(
    springValue,
    {
      toValue: 1,
      friction: 1,
      useNativeDriver: true
    }
  ).start(({ finished }) => {
  /* completion callback */
   navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
});


  return (
    <View style={styles.container}>
        <Animated.View
                style={[
                  styles.fadingContainer,
                  {
                    transform: [{scale: springValue}]
                  }
                ]}
              >
                {/* <ME_Icon /> */}
                <Image style={styles.image} source={require('../assets/buyer_logo.png')} />
              </Animated.View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width:235,
    height:175
  }
});

export default SplashScreen;
