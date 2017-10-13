import React, { Component } from 'react';
import {
      Navigator, Text, TouchableOpacity, Image, StyleSheet,View, Dimensions, Platform, Easing, NativeModules} from 'react-native';

const { width, height } = Dimensions.get("window");
import Drawer from '.././Drawer';
import {WebServiceCallManager} from '.././WebServiceCallManager';
import {Screens} from '../navigation/Screens';


 var rs ;
export default class CustomDrawer extends Component {
  constructor(props) {

       super(props);

     //   this.callAccounts_ = this.callAccounts.bind(this);
     //   rs = this.child.nav;
  }


closeDrawer(){
  this._drawer.closeDrawer();
}

openDrawer(){
  this._drawer.openDrawer();
}

_updateNativeStyles (dx) {
  if(SessionManager.getSessionValue(Constants.IS_LOGIN_SCREEN) !== null && SessionManager.getSessionValue(Constants.IS_LOGIN_SCREEN) !== true){
     this._drawer._updateNativeStyles(dx);
  }
}

 callAccounts = ()=>{
     this._drawer.closeDrawer();
     this.props.child.nav.push(Screens.ForgotUserIDScreen);
 // this.fetchCustomerAccounts();
}

drawerContent =(
       <View style={styles.drawerContent}>
            <View style={{}}><Text style={{color:'white'}}></Text></View>
            <View style={{}}><Text style={{color:'white'}}></Text></View>

            <TouchableOpacity onPress={() => {
             this._drawer.closeDrawer();
             this.nav.popToRoute(Screens.LoginScreen);}}><View style={{}}><Text style={{color:'white',fontWeight:'bold'}}>Home</Text></View></TouchableOpacity>
            <View style={{}}><Text style={{color:'white'}}></Text></View>

            <TouchableOpacity onPress={ this.callAccounts }
             >
                <View style={{}}><Text style={{color:'white',fontWeight:'bold'}}>Accounts</Text></View></TouchableOpacity>

            <TouchableOpacity onPress={() => {
                this._drawer.closeDrawer();
                this.nav.push(Screens.PaymentsListView);}}><View style={{}}><Text style={{color:'white',fontWeight:'bold'}}>Payments</Text></View></TouchableOpacity>

                <TouchableOpacity onPress={() => {
                  this._drawer.closeDrawer();
                  this.nav.push(Screens.FastTransferRemittanceListView);}}><View style={{}}><Text style={{color:'white',fontWeight:'bold'}}>Fast Transfer</Text></View></TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    this._drawer.closeDrawer();
                    this.nav.push(Screens.ServicesListView);}}><View style={{}}><Text style={{color:'white',fontWeight:'bold'}}>Services</Text></View></TouchableOpacity>
            <View style={{}}><Text style={{color:'white'}}></Text></View>
            <View style={{}}><Text style={{color:'white'}}></Text></View>
            <View style={{}}><Text style={{color:'white'}}></Text></View>
            <View style={{}}><Text style={{color:'white'}}></Text></View>
            <TouchableOpacity onPress={() => {
             this._drawer.closeDrawer();
             this.nav.popToRoute(Screens.LoginScreen);}}><View style={{}}><Text style={{color:'white',fontWeight:'bold'}}>Logout</Text></View></TouchableOpacity>
            <View style={{}}><Text style={{color:'white'}}></Text></View>
            <View >

            </View>
            <WebServiceCallManager visible={false} nav = {this.props.navigator} ref={ (input) => {this.webservicemanager = input;}}/>
       </View>);


  render() {


       return(
         <Drawer
           ref={(ref)=> this._drawer = ref}
           open = {true}
           style={styles.container}
           drawerWidth={((width*40)/100)}
           drawerContent={this.drawerContent}
          //  type={Drawer.types.Overlay}
          // customStyles={{drawer: styles.drawer}}
           drawerPosition={Drawer.positions.Left}
           easingFunc={Easing.ease}
           disabled={false}
         >
             {this.props.child}
         </Drawer>

       );
  }
}

const styles = StyleSheet.create({
  drawer : {
    shadowColor : '#000',
    shadowOpacity : 0.4,
    shadowRadius : 10
  },drawerContent: {
   height:height,
   justifyContent: 'space-around',
   alignItems: 'center',
   // width : width,
   backgroundColor: '#6D777A'
  },
});
