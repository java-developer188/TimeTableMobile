/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
     StyleSheet,
     Dimensions
     ,Text
     } from 'react-native';

const { width, height } = Dimensions.get("window");
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
//  image source constants


export default class Radiobutton extends Component {

       constructor(props) {
          super(props);
          this.state = {
                    items : this.props.items,
                    selectedItem :this.props.selectedItem,
                    onValueChangeCallback : this.props.onValueChangeCallback
          }
        }

        componentDidUpdate(){

             if(this.props.items != this.state.items){
                  this.setState({
                       items: this.props.items
                  });
             }
        }


           render() {
              return (
                   <RadioGroup style={styles.radiobuttonsgroup}
                    selectedIndex={this.state.selectedValue}
                   onSelect = {this.props.onSelect}>
                    <RadioButton value={0} >
                       <Text>{this.props.text1}</Text>
                    </RadioButton>

                    <RadioButton value={1}>
                       <Text>{this.props.text2}</Text>
                    </RadioButton>
                 </RadioGroup>
              );
          }
    }

const styles = StyleSheet.create({
     radiobuttonsgroup:{
          marginTop:((height*4)/100),
     }
});
