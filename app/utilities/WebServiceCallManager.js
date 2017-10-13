"use strict";
import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Config from './Config'
import {SessionManager} from './SessionManager';
import Constants from './Constants'
import {  Alert } from 'react-native';
import {Screens} from '.././navigation/Screens'


     /*
          this class will be used to communicate with
          server and getting url params from the calling class,
          handles the server error if there is no error it will
          return the repsonse to the calling class
     */
export  class WebServiceCallManager extends Component{

     constructor(props) {
          super(props);
          this.state = {
               visible: this.props.visible ,
               size: 100,
          }
     }

     callWebService(requestAction,subAction,bodyParams,responseHandler,optionalErrHandler){
          this.setState({visible:true});//Starting the Processing indicator



          var url = Config.IP +requestAction;

          if (url.startsWith('https')) {
               this._httpsCalling(url,bodyParams,responseHandler,optionalErrHandler);
          } else {
               this._httpCalling(url,bodyParams,responseHandler,optionalErrHandler);
          }
     }

     _httpsCalling(url,params,responseHandler){

     }

     _httpCalling(url,params,responseHandler,optionalErrHandler){
          fetch(url,
               {
                    method: "POST",
                    headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(params)
               })
               .then((resType) => resType.json())
               .then((responseResult) => {

                    this.setState({visible:false});

                    if (responseResult.result==='SUCCESS') {

                         responseHandler(responseResult);
                    }
                    else {
                          if(optionalErrHandler !== undefined){
                            optionalErrHandler(responseResult);
                          }
                         this.errorHandler(responseResult);
                         // responseHandler(null ,responseResult.Header.ResponseMessage);

                    }
               }).catch((err) => {

                    var error = {ResponseMessage : err.errorDescription};

                    if(optionalErrHandler !== undefined){
                      optionalErrHandler(err);
                    }

                   this.errorHandler(err);
               })
               .done();
     }

     errorHandler(errorData)
     {

          this.setState({visible:false});// removing the Processing symbol

            setTimeout(
            () => {
              Alert.alert('Respose Error ' +
                errorData,
                '',
              [
              {text: 'OK', onPress: () => {/*this.props.nav.popToRoute(Screens.HomeScreen)*/}},
              ],
              { cancelable: false }
              )
              },
              100
            );

     }

     render() {
          return <Spinner visible={this.state.visible} itemProp='size:100'  />
     }
}
