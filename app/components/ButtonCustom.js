/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
     StyleSheet,
     Dimensions,
     TouchableOpacity,
     View,
     Text,
     } from 'react-native';

const { width, height } = Dimensions.get("window");


export default class TextInputCustom extends Component {

     constructor(props) {
          super(props);
          this.state = {
               title : this.props.title,
               onPressCallback : this.props.onPressCallback,
               showButton:this.props.showButton,

          }
     }

     componentDidUpdate(){

          if(this.props.title != this.state.title){
               this.setState({
                    title: this.props.title
               });
          }
     }

      static defaultProps = {
        showButton : true,
        onPressCallback : ()=>{},
      }

     render() {
       if(this.state.showButton){
          return(
               <TouchableOpacity onPress={ () => this.state.onPressCallback() } underlayColor = {'transparent'}>
                    <View style={styles.bottomView} hidden={true}>
                         <Text style={styles.bottomTextColor}>{this.state.title}</Text>
                    </View>
               </TouchableOpacity>
          );
        }
        else {
          return null;
        }
     }
}

const styles = StyleSheet.create({
     bottomView:{
          alignItems:'center',
          justifyContent:'center',
          height:((height*7)/100),
          backgroundColor: '#00826B',
     },
     bottomTextColor:{
          color:'white',
          fontFamily:'Arial-BoldMT',
          fontSize:((width*4)/100)
     },
});
