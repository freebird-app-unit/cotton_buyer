import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './responsive-ratio';

const TextInput = ({ errorText, description, ...props }) => (
  <View style={styles.container}>
    <Input
      theme={{ colors: { primary: theme.colors.primary, underlineColor: 'transparent' }, fonts: { regular: 'Poppins-Regular' } }}
      style={styles.input}
      selectionColor={theme.colors.primary}
      outlineColor={'#eee'}
      numberOfLines={props.numberOfLines ? props.numberOfLines : 1}
      mode="outlined"
      right={props.pass ? <Input.Icon name={() => <Icon
        name={props.show ? 'visibility-off' : 'visibility'} color='#69BA53'
        size={hp(3)} onPress={props.rightOnpress} style={{ textAlignVertical: 'center', paddingTop: hp(1) }} />} /> : {}}
      {...props}
    />
    {description && !errorText ? (
      <Text style={styles.description}>{description}</Text>
    ) : null}
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 5,
    alignItems: 'center'
  },
  input: {
    backgroundColor: theme.colors.surface,
    width: '90%',
    height: hp(6.5),
    justifyContent: 'center',
    fontFamily: "Poppins-Regular",
    fontSize: hp(2.1)
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
    fontFamily: "Poppins-Regular"
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
    fontFamily: "Poppins-Regular"
  },
})

export default TextInput
