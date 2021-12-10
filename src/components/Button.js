import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'

const Button = ({ texting,mode, style, ...props }) => (
  <PaperButton
    style={[
      styles.button,
      style,
    ]}
    labelStyle={[styles.text, texting]}
    mode={mode}
    {...props}
  />
)

const styles = StyleSheet.create({
  button: {
    width: '90%',
    marginVertical: 10,
    paddingVertical: 2,
    backgroundColor: theme.colors.primary,
    alignSelf:'center',

  },
  text: {
    // fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color:"#FFFFFF"
  },
})

export default Button
