import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/MaterialIcons';

const TextInput = ({ errorText, description, ...props }) => (
  <View style={styles.container}>
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
    <Icon style={styles.icon}
                        name='visibility-off'
                        size={30}
                        color='#69BA53'
                        //onPress={this.changePwdType}
                    />
  </View>
)

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 20,
    right: 25
  },
  container: {
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
    marginTop:0
  },
  input: {
    backgroundColor: theme.colors.surface,
    width: '90%',
    height:50
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


// import React from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { View, Text, TouchableHighlight ,StyleSheet,Dimensions} from 'react-native';
// import { TextInput as Input } from 'react-native-paper'
// import { theme } from '../core/theme'
// export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
 
 
// export default class PasswordInputView extends React.Component {
//     constructor(props) {
//         super(props);
 
//         this.state = {
//             icEye: 'visibility-off', // default icon to show that password is currently hidden
//             password: '', // actual value of password entered by the user
//             showPassword: true // boolean to show/hide the password 
 
//         }
//     }
 
//     changePwdType = () => {
//         let newState;
//         if (this.state.showPassword) {
//             newState = {
//                 icEye: 'visibility',
//                 showPassword: false,
//                 password: this.state.password
//             }
//         } else {
//             newState = {
//                 icEye: 'visibility-off',
//                 showPassword: true,
//                 password: this.state.password
//             }
//         }
//         // set new state value
//         this.setState(newState)
//     };
//     handlePassword = (password) => {
//         let newState = {
//             icEye: this.state.icEye,
//             showPassword: this.state.showPassword,
//             password: password
//         }
//         this.setState(newState);
//         this.props.callback(password); // used to return the value of the password to the caller class, skip this if you are creating this view in the caller class itself
//     };
 
 
 
//     render() {
//         return (
//             <TouchableHighlight>
//                 <View style={styles.passwordViewContainer}>
//                   <Input
//                     theme={{ colors: { primary: '#69BA53',underlineColor:'transparent'}}}
//                     style={styles.input}
//                     selectionColor={theme.colors.primary}
//                     mode="outlined"
//                     {...props}
//                   />
//                   {description && !errorText ? (
//                     <Text style={styles.description}>{description}</Text>
//                   ) : null}
//                   {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
//                     {/* <TextInput
//                         placeholder={this.props.label}
//                         label={this.props.label}
//                         value={this.state.password}
//                         onChangeText={this.handlePassword}
//                         secureTextEntry={this.state.showPassword}
//                         width={SCREEN_WIDTH}
//                         height={40}
//                         labelActiveColor={componentColors.password_icon_color}
//                         labelColor={componentColors.password_icon_color}
//                         placeholderColor={componentColors.password_icon_color}
//                         underlineColor={componentColors.password_icon_color}
//                         underlineActiveColor={componentColors.password_icon_color}
//                         underlineActiveHeight={2}
//                         underlineHeight={1}
//                     >
//                     </TextInput> */}
//                     <Icon style={styles.icon}
//                         name={this.state.icEye}
//                         size={30}
//                         color={componentColors.password_icon_color}
//                         onPress={this.changePwdType}
//                     />
//                 </View>
//             </TouchableHighlight>
//         );
//     }
// }
 
// export const styles = StyleSheet.create({
//     passwordViewContainer: {
//         flexDirection: 'row'
//     },
//     icon: {
//         position: 'absolute',
//         top: 25,
//         right: 20
//     }
 
// });
// export const componentColors = {
//     password_icon_color:'#9E9E9E',
// };