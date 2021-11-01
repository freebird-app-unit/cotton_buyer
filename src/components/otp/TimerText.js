import React from 'react';
import {StyleSheet} from 'react-native';

import {CustomText} from '../../lib';
import colors from '../../common/colors';
import {GenericStyles} from '../../styles/GenericStyles';

const TimerText = props => {
  const {text, time} = props;

  return (
    <CustomText
      style={[
        GenericStyles.centerAlignedText,
        styles.resendOtpTimerText,
        GenericStyles.mt24,
      ]}>
      {text}
      <CustomText style={GenericStyles.bold}>{' ' + time}s</CustomText>
    </CustomText>
  );
};

const styles = StyleSheet.create({
  resendOtpTimerText: {
    fontSize: 18,
    top:25,
    color:colors.GREEN,
    fontFamily:'popins'
  },
});

export default TimerText;
