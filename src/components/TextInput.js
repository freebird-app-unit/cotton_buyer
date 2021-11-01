import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/MaterialIcons';

const TextInput = ({ errorText, description, ...props }) => (
  <View style={styles.container}>
    <Input
      theme={{ colors: { primary: theme.colors.primary,underlineColor:'transparent'}}}
      style={styles.input}
      selectionColor={theme.colors.primary}
      numberOfLines={props.numberOfLines ? props.numberOfLines : 1}
      mode="outlined"
      right={props.pass ? <Input.Icon name={() => <Icon 
        name={props.show ? 'visibility-off' : 'visibility' } color='#69BA53'
      size={30} onPress={props.rightOnpress}/>} /> : {}}                                            
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
  icon: {
    position: 'absolute',
    right: 25,
    paddingLeft: 10,
    width: 50,
  },
  input: {
    backgroundColor: theme.colors.surface,
    width: '90%',
    // height:50,
    paddingVertical: 0,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
})

export default TextInput
