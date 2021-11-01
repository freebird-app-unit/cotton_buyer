import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'

const TextInputMultiline = ({ errorText, description, ...props }) => (
  <View style={styles.container}>
    <Input
      theme={{ colors: { primary: '#2DA3FC',underlineColor:'transparent'}}}
      style={styles.input}
      selectionColor={theme.colors.primary}
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
    marginVertical: 5,
    alignItems: 'center'
  },
  input: {
    backgroundColor: theme.colors.surface,
    width: '90%'
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

export default TextInputMultiline
