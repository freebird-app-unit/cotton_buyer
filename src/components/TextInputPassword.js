import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'

const TextInput = ({ errorText, description, ...props }) => (
  <View style={styles.container}>
    <Input
      theme={{ colors: { primary: theme.colors.primary,underlineColor:'transparent'}}}
      style={styles.input}
      selectionColor={theme.colors.primary}
      numberOfLines={1}
      mode="outlined"
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
    marginVertical: 12,
    alignItems: 'center'
  },
  input: {
    backgroundColor: theme.colors.surface,
    width: '90%',
    height:50,
    paddingVertical: 0
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
