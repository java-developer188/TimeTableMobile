/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
     StyleSheet,
     Dimensions
     } from 'react-native';

import DatePicker from 'react-native-datepicker'
const { width, height } = Dimensions.get("window");

export default class DatePickerCustom extends Component {

     constructor(props) {
          super(props);

          var today= this.props.date;
          var dat =  today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
          this.state = {
               dt: dat ,
          }
     }

     render() {
          return(
               <DatePicker
                    style={styles.dateInput}
                    date={this.state.dt}
                    mode="date"
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    confirmBtnText="Confirm"
                    refs="rfff"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => {
                         this.setState({dt: date});
                         this.props.callback(date);
                    }}
               />
          );

     }
}

const styles = StyleSheet.create({
     dateInput:{
          marginTop:((height*2)/100),
          height:((height*6.5)/100),
          width:((width*89)/100),
     }
});
