/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
     StyleSheet,
     Dimensions,
     Picker
     } from 'react-native';

const { width, height } = Dimensions.get("window");

//  image source constants
const imgArrowDown = require('.././assets/arrow_down.png');

export default class ComboBox extends Component {

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
                 <Picker  style={ styles.picker}
                     selectedValue={this.state.selectedItem}
                     onValueChange={(selectedItem) => {this.state.onValueChangeCallback(selectedItem); this.setState({selectedItem});}}>
                        { this.state.items.map( (item , key) => { return <Picker.Item
                               key = {key}
                               value={item.ID}
                               label={item.Name} />
                              })
                         }
                  </Picker>
              );
          }
    }

const styles = StyleSheet.create({
     picker :{
          color: '#333333',
          // padding:10,
          height:((height*6.5)/100),
          //borderColor: 'white',
          backgroundColor:'white',
          borderRadius:5,
          borderWidth: 1,
          marginTop:((height*1)/100),
     }
});
