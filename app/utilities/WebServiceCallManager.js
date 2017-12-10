"use strict";
import React, {Component} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Config from './Config'
import {SessionManager} from './SessionManager';
import Constants from './Constants'
import {Alert,AsyncStorage} from 'react-native';
import {Screens} from '.././navigation/Screens'


/*
 this class will be used to communicate with
 server and getting url params from the calling class,
 handles the server error if there is no error it will
 return the repsonse to the calling class
 */
export class WebServiceCallManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            size: 100,
            serverIp:''
        }
        this.getServerIP();
    }

    async getServerIP (){
        try {
            var value = await AsyncStorage.getItem(Constants.SERVER_IP_ADDRESS);
            if (value !== null && value.length > 0){
                this.setState({serverIp:value});
            } else {
                this.setState({serverIp:''});
            }
        } catch (error) {
            alert('Error encountered while reading App storage ' + error.message);
            this.setState({serverIp:''});
        }
    }

    callWebService(requestAction, subAction, bodyParams, responseHandler, optionalErrHandler) {
        this.setState({visible: true});//Starting the Processing indicator
        var url ;
        if(this.state.serverIp.length >0){
            url = this.state.serverIp+requestAction;
        }
        else {
            url = Config.IP + requestAction;
        }

        if (url.startsWith('https')) {
            this._httpsCalling(url, bodyParams, responseHandler, optionalErrHandler);
        } else {
            this._httpCalling(url, bodyParams, responseHandler, optionalErrHandler);
        }
    }

    _httpsCalling(url, params, responseHandler) {

    }

    _httpCalling(url, params, responseHandler, optionalErrHandler) {
        fetch(url,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            })
            .then((resType) => resType.json())
            .then((responseResult) => {

                this.setState({visible: false});

                if (responseResult.result === 'SUCCESS') {

                    responseHandler(responseResult);
                }
                else {
                    // if(optionalErrHandler !== undefined){
                    //   optionalErrHandler(responseResult);
                    // }
                    this.errorHandler(responseResult, optionalErrHandler);
                    // responseHandler(null ,responseResult.Header.ResponseMessage);

                }
            }).catch((err) => {

            var error = {ResponseMessage: err.errorDescription};
            // if(optionalErrHandler !== undefined){
            //   optionalErrHandler(responseResult);
            // }
            this.errorHandler(err, optionalErrHandler);
        })
            .done();
    }

    errorHandler(errorData, optionalErrHandler) {

        this.setState({visible: false});// removing the Processing symbol

        if (optionalErrHandler !== undefined) {
            optionalErrHandler(errorData);
        }
        else {
            setTimeout(
                () => {
                    Alert.alert('Respose Error ' +
                        errorData,
                        '',
                        [
                            {
                                text: 'OK', onPress: () => {/*this.props.nav.popToRoute(Screens.HomeScreen)*/
                            }
                            },
                        ],
                        {cancelable: false}
                    )
                },
                100
            );
        }

    }

    render() {
        return <Spinner visible={this.state.visible} itemProp='size:100'/>
    }
}
