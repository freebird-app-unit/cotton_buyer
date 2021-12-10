import React from "react";
import { StyleSheet } from "react-native";
import { BottomNavigation } from "react-native-paper";
import {  MapScreen } from "../screens/";



export default class BottomNav extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "Feed", title: "Feed", icon: "photo-album", color: "#6200ee" },
      { key: "MapScene", title: "MapScene", icon: "inbox", color: "#2962ff" }
    ]
  };

  render() {
    return (
      <BottomNavigation
        style={styles.BottomNav}
        navigationState={this.state}
        onIndexChange={index => this.setState({ index })}
        renderScene={BottomNavigation.SceneMap({
          Homw: Dashboard,
          Login: LoginScreen
        })}
      />
    );
  }
}