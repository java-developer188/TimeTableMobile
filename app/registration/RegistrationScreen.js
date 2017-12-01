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
    AppState, ScrollView
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

export default class RegistrationScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            batch:'',
            rollNumber:'',
            fullName:'',
            userName:'',
            section:'',
            mobileNumber:'',
            email:'',
            emptyInputFields: '',
            loginType: 'Manual',
            falseSwitchIsOn: true,
            attemptCount: 0,
            cancelled: false
        }
    }


    buttonsHandler(type) {
        switch (type) {
            case 'select_courses':
                dismissKeyboard();
                this.proceedToNext();
                break;
            default:
                alert(type + ' is pressed');

        }
    }

    proceedToNext() {

        // if (this.state.fullName.length === 0 && this.state.email.length === 0 && this.state.rollNumber.length === 0) {
        //     this.setState({emptyInputFields: 'Full Name, Email, Roll Number and Username must not be empty'});
        //     this.fullName.textFocus();
        // }
        // else
        if (this.state.fullName.length === 0) {
            this.setState({emptyInputFields: 'Full Name Empty'});
            this.fullName.textFocus();
        }
        else if (this.state.rollNumber.length === 0) {
            this.setState({emptyInputFields: 'Roll Number Empty'});
            this.rollNumber.textFocus();
        }
        else if (this.state.userName.length === 0) {
            this.setState({emptyInputFields: 'Username Empty'});
            this.rollNumber.textFocus();
        }
        else if (this.state.email.length === 0) {
            this.setState({emptyInputFields: 'Email Empty'});
            this.email.textFocus();
        }
        else {
            this.setState({emptyInputFields: ''});

            var student = {
                batch:this.state.batch,
                rollNumber:this.state.rollNumber,
                fullName:this.state.fullName,
                userName:this.state.userName,
                section:this.state.section,
                mobileNumber:this.state.mobileNumber,
                email:this.state.email,
                courses:[]
            }

            SessionManager.setSessionValue(Constants.REGISTRATION_DATA, student);
            this.props.navigator.push(Screens.CoursesByBatchScreen);
        }
    }

    render() {
        return (
            <ScrollView>
            <View style={ styles.registrationView}>
                <Image style={ styles.loginViewBackground} source={loginBackgroundViewImg}>

                    <View>

                        <TextInputCustom
                            ref={(ref) => this.fullName = ref}
                            placeholder={'Full Name'}
                            secureTextEntry={false}
                            onChangeTextCallback={val => this.setState({'fullName' : val})}
                            returnKeyType="next"
                            textInputWidth={((width * 86) / 100)}
                            // onEndEditingCallback = {() => this.password.textFocus()}
                        />

                        <TextInputCustom
                            ref={(ref) => this.section = ref}
                            placeholder={'Section'}
                            secureTextEntry={false}
                            onChangeTextCallback={val => this.setState({'section' : val})}
                            returnKeyType="next"
                            textInputWidth={((width * 86) / 100)}
                            // onEndEditingCallback = {() => this.password.textFocus()}
                        />

                        <TextInputCustom
                            ref={(ref) => this.rollNumber = ref}
                            placeholder={'Roll Number'}
                            secureTextEntry={false}
                            onChangeTextCallback={val => this.setState({'rollNumber': val})}
                            returnKeyType="next"
                            textInputWidth={((width * 86) / 100)}
                            // onEndEditingCallback = {() => this.password.textFocus()}
                        />
                        <TextInputCustom
                            ref={(ref) => this.batch = ref}
                            placeholder={'Batch'}
                            secureTextEntry={false}
                            onChangeTextCallback={val => this.setState({'batch' :  val})}
                            returnKeyType="next"
                            textInputWidth={((width * 86) / 100)}
                            keyboardType="numeric"
                            // onEndEditingCallback = {() => this.password.textFocus()}
                        />
                        <TextInputCustom
                            ref={(ref) => this.userName = ref}
                            placeholder={'User Name'}
                            secureTextEntry={false}
                            onChangeTextCallback={val => this.setState({'userName' :  val})}
                            returnKeyType="next"
                            textInputWidth={((width * 86) / 100)}
                            // onEndEditingCallback = {() => this.password.textFocus()}
                        />
                        <TextInputCustom
                            ref={(ref) => this.email = ref}
                            placeholder={'Email Address'}
                            secureTextEntry={false}
                            onChangeTextCallback={val => this.setState({'email' :  val})}
                            returnKeyType="next"
                            textInputWidth={((width * 86) / 100)}
                            keyboardType="email-address"
                            // onEndEditingCallback = {() => this.password.textFocus()}
                        />
                        <TextInputCustom
                            ref={(ref) => this.mobileNumber = ref}
                            placeholder={'Mobile Number'}
                            secureTextEntry={false}
                            onChangeTextCallback={val => this.setState({'mobileNumber' :  val})}
                            returnKeyType="done"
                            textInputWidth={((width * 86) / 100)}
                            keyboardType="phone-pad"
                        />
                        <Text style={ styles.emptyInputFields}>{this.state.emptyInputFields}</Text>
                    </View>
                    <View style={ styles.middleContainerViewButtons}>
                        <View style={ styles.middleContainerViewButtonsBtn}>
                            <TouchableHighlight onPress={ () => this.buttonsHandler('select_courses')}>
                                <Text style={ styles.btnTextLabels}>{'Select Courses'}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Image>
                <WebServiceCallManager visible={false} nav={this.props.navigation} ref={ (input) => {
                    this.webservicemanager = input;
                }}/>
            </View>
            </ScrollView>
        );
    }


} // end of class

const styles = StyleSheet.create({
    registrationView: {
        height: ((height * ( (Platform.OS === 'ios') ? 85 : 100)) / 100), // if ios height = 85 else 82
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
        justifyContent: 'center',
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
