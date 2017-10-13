/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
     StyleSheet,
     Dimensions,
     TextInput,
     } from 'react-native';

const { width, height } = Dimensions.get("window");


export default class TextInputCustom extends Component {

     constructor(props) {
          super(props);
          this.state = {
               placeholder : this.props.placeholder,
               returnKeyType : this.props.returnKeyType,
               keyboardType : this.props.keyboardType,
               value : this.props.value,
               secureTextEntry : this.props.secureTextEntry,
               maxLength : this.props.maxLength,
               editable : this.props.editable,
               onEndEditingCallback : this.props.onEndEditingCallback,
               onChangeTextCallback : this.props.onChangeTextCallback,
               inputWidth : this.props.textInputWidth,
               defaultValue : this.props.defaultValue,

          }

     }

     componentWillReceiveProps(nextProps) {
         this.setState({value: nextProps.value});
     }

     //
     textFocus(){
           this.textInput.focus();
     }

     textClear(){
          this.textInput.clear();
     }

      static defaultProps = {
           placeholder : "",
           editable : true,
           returnKeyType : "next",
           secureTextEntry : false,
           keyboardType : 'default',
           onEndEditingCallback : () => {},
           onChangeTextCallback : () => {},
      }

     render() {

       var style = {
         color: '#333333',
         fontSize: ((height*2)/100),
         padding:10,
         height:((height*6.5)/100),
         width:(this.state.inputWidth > 0 ? this.state.inputWidth : ((width*96)/100)),
         borderColor: 'gray',
         backgroundColor:'white',
         borderRadius:5,
         borderWidth: 1,
         marginTop:((height*1)/100)
       };

       if(this.state.editable === false){
         style = styles.nonEditTextInput;
       }

          return(
               <TextInput
                 ref={(ref) => this.textInput = ref}
                 style={style}
                 underlineColorAndroid = 'transparent'
                 placeholder={this.state.placeholder}
                 secureTextEntry = {this.state.secureTextEntry}
                 maxLength = {this.state.maxLength}
                 editable = {this.state.editable}
                 onChangeText={(username)=>this.state.onChangeTextCallback(username)}
                 returnKeyType={this.state.returnKeyType}
                 keyboardType = {this.state.keyboardType}
                 onEndEditing={ () => this.state.onEndEditingCallback()}
                 defaultValue = {this.state.defaultValue}
                 value = {this.state.value}
               />
          );
     }
}

const styles = StyleSheet.create({
     textInput:{
          color: '#333333',
          fontSize: ((height*2)/100),
          padding:10,
          height:((height*6.5)/100),
          // width:(inputWidth > 0 ? inputWidth : ((width*96)/100)), // 96
          borderColor: 'gray',
          backgroundColor:'white',
          borderRadius:5,
          borderWidth: 1,
          marginTop:((height*1)/100),
     },
     nonEditTextInput:{
          color: '#333333',
          fontSize: ((height*2)/100),
          padding:10,
          height:((height*6.5)/100),
          borderColor: 'gray',
          backgroundColor:'#E4E4E4',
          borderRadius:5,
          borderWidth: 1,
          marginTop:((height*1)/100),
     }
});
