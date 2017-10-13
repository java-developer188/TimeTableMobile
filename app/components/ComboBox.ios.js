/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
     StyleSheet,
     Dimensions,
     View,
     Text,Image
     } from 'react-native';

const { width, height } = Dimensions.get("window");

//  image source constants
const imgArrowDown = require('.././assets/arrow_down.png');

import SimplePicker from 'react-native-simple-picker';

export default class ComboBox extends Component {

     constructor(props) {
          super(props);
          this.state = {
                    items : this.props.items,
                    selectedItem :this.props.selectedItem,
                    onValueChangeCallback : this.props.onValueChangeCallback,
                    optionsArray : [],
                    labelsArray : [],
                    inputWidth : this.props.comboBoxWidth
          }

         this.loadPickerData();

     }

     componentDidUpdate(){

          if(this.props.items != this.state.items){
               this.setState({
                    items: this.props.items
               });
          }
     }

     loadPickerData(){
       var arr = this.state.items;

       for (var i = 0; i < arr.length; i++) {
         this.state.optionsArray.push(this.state.items[i].ID);
         this.state.labelsArray.push(this.state.items[i].Name);

       }

     }

     render() {

var style = {
       picker : {
            marginTop: ((height*1)/100),
            paddingTop:((height*1)/100),
            paddingLeft:((width*2)/100),
            paddingRight:((width*5)/100),
            width:(this.state.inputWidth > 0 ? this.state.inputWidth : ((width*87)/100)),
       }
     };

          return (<View style={styles.container}>
                <Text
                  style={style.picker }
                  onPress={() => {
                    this.refs.picker.show();
                  }}
                  >
                  {this.state.selectedItem}
              </Text>
              <Image
                source={imgArrowDown} style={ styles.arrowImage}>
              </Image>
          <SimplePicker
            ref='picker'
            options={this.state.optionsArray}
            labels={this.state.labelsArray}
            onSubmit={(options) => {

                for (var i = 0; i < this.state.optionsArray.length; i++) {

                  if (this.state.items[i].ID==options) {
                    this.setState({
                      selectedItem: this.state.items[i].Name,
                    });

                    this.state.onValueChangeCallback(this.state.items[i].ID);

                      break;
                  }
                }
            }}
          />
        </View>);
     }
}

const styles = StyleSheet.create({
     arrowImage:{
       width:((width*4)/100),
       height:((height*1.5)/100),
       marginTop:((height*2.5)/100),
       marginLeft:((width*2)/100),

     },container:{
       height:((height*6.5)/100),
       flexDirection:'row',
       borderColor: 'gray',
       borderRadius:5,
       borderWidth: 1,
       marginTop: ((height*1)/100),
     }
});
