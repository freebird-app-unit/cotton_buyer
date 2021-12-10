import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'

const TextInput = ({ errorText, description, ...props }) => (
    <View style={styles.container}>
      <View style={{ flex: 1,flexDirection: 'row'}}>
        <Input
          theme={{ colors: { primary: '#69BA53',underlineColor:'transparent'}}}
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
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: '50%',
    //paddingLeft: 10,
    //marginVertical: 5,
    //flex:1,
    //alignItems: 'flex-start',
    marginTop:0,
    left:20,
  },
  input: {
    backgroundColor: theme.colors.surface,
    width: '120%',
    height:50,
    paddingLeft: 0,
    //flex:1,
    marginTop:0,
    //left:-125,
    top:-6
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
