/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
    Switch,
    Alert,
    Image,
    TouchableHighlight,
    Dimensions,
    Platform,
    AppState
} from 'react-native';
import {Screens} from '.././navigation/Screens'
import {ScreenClass} from '.././navigation/Screens';
import TextInputCustom from '.././components/TextInputCustom';
import {WebServiceCallManager} from '.././utilities/WebServiceCallManager';
import {NavigationManager} from '.././navigation/NavigationManager';
import ButtonCustom from '.././components/ButtonCustom';
import Constants from '.././utilities/Constants'
import {SessionManager} from "../utilities/SessionManager";

const dismissKeyboard = require('dismissKeyboard');
const {width, height} = Dimensions.get("window");


const loginBackgroundViewImg = require('.././assets/login_box.png');


/* Login View for displaying TextInputs(username, passwords),
 Buttons (Login, Register) and Labels (Terms & condition , forget password)
 */

export class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            emptyInputFields: '',
            loginType: 'Manual',
            falseSwitchIsOn: true,
            attemptCount: 0,
            cancelled: false
        }
    }


    buttonsHandler(type) {
        switch (type) {
            // case 'forgotpassword':
            //     this.props.navigation.push(Screens.ForgotPasswordScreen);
            //     break;
            // case 'forgotuserid':
            //    this.props.navigation.push(Screens.ForgotUserIDScreen);
            //     break;
            // case 'unlockprofile':
            //     this.props.navigation.push(Screens.UnlockProfileScreen);
            //     break;
            case 'register':
                dismissKeyboard();
                this.props.navigation.push(Screens.RegistrationScreen);
                break;
            case 'login':
                this.loginWebServiceCall();
                dismissKeyboard();
                //this.props.navigation.push(Screens.HomeScreen);
                break;
            default:
                alert(type + ' is pressed');

        }
    }


    // this will be called when user hit login button

    loginWebServiceCall() {

        if (this.state.username.length === 0 && this.state.password.length === 0) {
            this.setState({emptyInputFields: 'Username & Password Empty'});
            this.userName.textFocus();
        }
        else if (this.state.username.length === 0) {
            this.setState({emptyInputFields: 'Username Empty'});
            this.userName.textFocus();
        }
        else if (this.state.password.length === 0) {
            this.setState({emptyInputFields: 'Password Empty'});
            this.password.textFocus();

        } else {
            this.setState({emptyInputFields: ''});
            var params = {
                "username": this.state.username,
                "password": this.state.password
            };

            this.webservicemanager.callWebService("login", "", params, (response) => {
                this.handleWebServiceCallResponse(response);
            });
        }
    }

    /* handle the web service successfull response error
     response will be handled inside WebServiceCallManager */

    handleWebServiceCallResponse(data) {
        // if(data.Header.RequestAction === "LOCK_USER"){
        //      alert('user locked');
        //      return;
        // }
        dismissKeyboard();

        var userData = {
            "username": this.state.username,
            "password": this.state.password
        }


        // var passwordPolicy = {
        //   "passwordPolicy" : data.Body.Transaction.PasswordPolicy,
        //   "passwordPolicyRegex" : data.Body.Transaction.PasswordPolicyRegex
        // }
        SessionManager.setSessionValue(Constants.USER, data.Student);

        this.props.navigation.push(Screens.WelcomeScreen);


        this.setState({
            username: '',
            password: '',
            emptyInputFields: '',
            isTryAgain: false,
        });

        this.userName.textClear();
        this.password.textClear();
        dismissKeyboard();

    }

    // handling text input field focus
    textHandler() {
        this.password.focus();
    }


    render() {
        return (
            <View style={ styles.registrationView}>
                <Image style={ styles.loginViewBackground} source={loginBackgroundViewImg}>

                    <View>

                        <TextInputCustom
                            ref={(ref) => this.userName = ref}
                            placeholder={'Username'}
                            secureTextEntry={false}
                            onChangeTextCallback={val => this.setState({'username': val})}
                            returnKeyType="next"
                            textInputWidth={((width * 86) / 100)}
                            // onEndEditingCallback = {() => this.password.textFocus()}
                        />

                        <TextInputCustom
                            ref={(ref) => this.password = ref}
                            placeholder={'Password'}
                            secureTextEntry={true}
                            onChangeTextCallback={val => this.setState({'password': val})}
                            returnKeyType="done"
                            textInputWidth={((width * 86) / 100)}
                        />
                        <Text style={ styles.emptyInputFields}>{this.state.emptyInputFields}</Text>
                    </View>
                    <View style={ styles.middleContainerViewButtons}>
                        <View style={ styles.middleContainerViewButtonsBtn}>
                            <TouchableHighlight onPress={ () => this.buttonsHandler('login')}>
                                <Text style={ styles.btnTextLabels}>{'Login'}</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={ styles.middleContainerViewButtonsBtn}>
                            <TouchableHighlight onPress={() => this.buttonsHandler('register')}>
                                <Text style={ styles.btnTextLabels}>{'Register'}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <TouchableHighlight onPress={() => {
                        this.buttonsHandler('forgotpassword')
                    }} underlayColor={'transparent'}>
                        <Text style={ styles.labels}>
                            Forgot Password
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {
                        this.buttonsHandler('forgotuserid')
                    }} underlayColor={'transparent'}>
                        <Text style={ styles.labels}>
                            Forogot User ID
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.buttonsHandler('terms')} underlayColor={'transparent'}>
                        <View >
                            <Text style={ styles.labels}>
                                {'Faculty'}
                            </Text>
                        </View>
                    </TouchableHighlight>

                </Image>
                <WebServiceCallManager visible={false} nav={this.props.navigation} ref={ (input) => {
                    this.webservicemanager = input;
                }}/>
            </View>
        );
    }


} // end of class

const styles = StyleSheet.create({
    registrationView: {
        height: ((height * ( (Platform.OS === 'ios') ? 85 : 82)) / 100), // if ios height = 85 else 82
        paddingVertical: ((height * 3) / 100),
        backgroundColor:'#D5D6E0'
    },
    fingerPrintPopup: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    popupDialog: {
        width: ((width * 2) / 100),
        height: ((height * 2) / 100),
    },
    biometricIcon: {
        resizeMode: 'contain',
        margin: ((height * .3) / 100),
        width: ((width * 20) / 100),
        height: ((height * 12) / 100),
    },
    biometricTxt1: {
        margin: ((height * .3) / 100),
    },
    biometricTxt2: {
        margin: ((height * .3) / 100),
    },
    loginViewBackground: {
        marginLeft: ((width * 2) / 100),
        marginRight: ((width * 2) / 100),
        width: null,
        height: null,
        padding: ((height * 3) / 100),
        marginTop: ((height * 10) / 100),
    },
    biometricImage: {
        marginLeft: ((width * 35) / 100),
        marginRight: ((width * 15) / 100),
        width: ((width * 16) / 100),
        height: ((height * 9) / 100),
        padding: ((height * 3) / 100),
        marginTop: ((height * 2) / 100),
        opacity: 1,
    },
    biometricImageDisable: {
        marginLeft: ((width * 35) / 100),
        marginRight: ((width * 15) / 100),
        width: ((width * 16) / 100),
        height: ((height * 9) / 100),
        padding: ((height * 3) / 100),
        marginTop: ((height * 2) / 100),
        opacity: .4,
    },

    switchControl: {
        justifyContent: 'center',
        marginTop: ((height * 2) / 100),
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        color: '#333333',
        fontSize: ((height * 2) / 100),
        padding: 10,
        height: ((height * 6.5) / 100),
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: ((height * 1) / 100),
    },
    emptyInputFields: {
        justifyContent: 'center',
        marginTop: ((height * 1) / 100),
        color: 'red',
    },
    btnTextLabels: {
        color: '#FFFFFF',
        height: 35,
        textAlign: 'center',
        backgroundColor: '#4E5166',
        paddingTop: 9
    },
    middleContainerViewButtons: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: ((height * 2) / 100)
    },
    middleContainerViewButtonsBtn: {
        width: ((width * 41) / 100),
        backgroundColor: '#000000',
        borderRadius: 4,
    },
    labels: {
        color: '#000000',
        textAlign: 'center',
        fontFamily: 'Arial',
        marginTop: ((height * 2) / 100),
        backgroundColor: 'transparent',
        fontSize: ((width * 3.8) / 100)
    }
});
