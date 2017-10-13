/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions,Text, ScrollView } from 'react-native';

import {LoginContainer} from './LoginControllerComponent';
import ComboBox from '../components/ComboBox';
const { width, height } = Dimensions.get("window");

//  image source constants

// Login screen for implementing controller components and footer components

export default class LoginScreen extends Component {

     constructor(props) {
          super(props);
          this.state ={
          }
     }


     render() {
          return (
               <ScrollView style={styles.background}>

                    {/*<Image source={imgBackgroud} style={styles.background} >*/}

                         <LoginContainer navigation={this.props.navigator} />
                    {/*</Image>*/}
               </ScrollView>
          );
     }
}
const styles = StyleSheet.create({
     background:{
          width, // equal to width : width
          height,
         resizeMode:'contain',
         backgroundColor:'#D5D6E0'

     },
});
