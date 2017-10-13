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
import CheckBox from 'react-native-checkbox';
import Hyperlink from 'react-native-hyperlink'

export default class CheckboxWithHyperLink extends Component {

     constructor(props) {
          super(props);
          this.state = {
               title : this.props.title,
               onPressCheckboxCallback : this.props.onPressCheckboxCallback,
               onPressHyperLinkCallback : this.props.onPressHyperLinkCallback,
          }
     }

      static defaultProps = {

      }

     render() {
          return(
            <View style={styles.lastrow}>
            <CheckBox style={styles.checkBox}
            label=""
            checkboxStyle ={styles.checkBoxColor}
              onChange={(checked)=>this.state.onPressCheckboxCallback(checked)}
            />
            <View style={styles.innerRow}>
            <Hyperlink
            onPress={ url => this.state.onPressHyperLinkCallback(url) }
            linkStyle={ styles.linkStyle }
            linkText={ url => url === 'http://www.google.com' ? 'Terms & Conditions' : url }>
            <Text style={ styles.linkFontSize }>
            {this.props.title}
            </Text>
            </Hyperlink>
            </View>
            </View>
          );
     }
}

const styles = StyleSheet.create({
  lastrow: {
       flex: 1,
       flexDirection: 'row',
       alignSelf : 'center',
       padding: ((width * 4.0)/100),
  },
  innerRow: {
       flex: 1,
       flexDirection: 'row',
       paddingTop: ((height* .3)/100),
  },
  checkBox:{
    paddingLeft: ((width * 6.0)/100),
  },
  checkBoxColor:{

  },
  linkStyle:
  {
     color: '#2980b9'
  },
  linkFontSize :
  {
    fontSize : ((width * 4.0)/100),
    marginTop: ((height * .4)/100),
  }

});
