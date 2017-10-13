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
import Collapsible from 'react-native-collapsible/Accordion';
const { width, height } = Dimensions.get("window");

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

export class ListViewCollapsible extends Component {

     constructor(props) {
          super(props);
          this.state = {
               // section : [
               //     {
               //       title: 'First',
               //       content: 'Lorem ipsum...',
               //     },
               //     {
               //       title: 'Second',
               //       content: 'Lorem ipsum...',
               //     }
                // ]

          }
     }

      static defaultProps = {
            sections : [
                 {
                   title: 'First',
                   content: 'Lorem ipsum...',
                 },
                 {
                   title: 'Second',
                   content: 'Lorem ipsum...',
                 }
               ]
      }

      _renderHeader(section) {
         return (
           <View style={styles.header}>
             <Text style={styles.headerText}>{section.title}</Text>
           </View>
         );
     }

     _renderContent(section) {
         return (
           <View style={styles.content}>
             <Text>{section.content}</Text>
           </View>
         );
    }


    render() {
        return (
          <Collapsible
            sections={this.props.sections}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        );
   }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
});
