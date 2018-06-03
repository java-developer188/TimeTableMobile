import React, {Component} from 'react';
import {
    ListView,
    View, Dimensions, Alert, Modal, Text, TouchableHighlight, StyleSheet, Platform, AsyncStorage,ToastAndroid
} from 'react-native'
import {SessionManager} from '.././utilities/SessionManager';
import {Screens} from '.././navigation/Screens';
import Constants from '.././utilities/Constants';
import {WebServiceCallManager} from '.././utilities/WebServiceCallManager';
import SettingsListView from "./SettingsListView";
import TextInputCustom from "../components/TextInputCustom";
const {width, height} = Dimensions.get("window");
const dismissKeyboard = require('dismissKeyboard');


export default class SettingsContainer extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var settings ;
        var student = SessionManager.getSessionValue(Constants.USER)
        var studentId = -1;
        if(student){
            studentId = JSON.parse(student).id;
            settings  = [{"name": "Set Server IP", "value": 0}
                , {"name": "Change Password", "value": 1}];
        }
        else{
            settings  = [{"name": "Set Server IP", "value": 0}];
        }
        this.state = {
            dataSource: ds.cloneWithRows(settings),
            serverIpModal: false,
            changePasswordModal: false,
            serverIp: '',
            studentId:studentId,
            oldPassword:'',
            newPassword: '',
            confirmPassword: '',
            isError: false,
            error: ''
        };
        this.getServerIP();
    }

    onBackPress() {
        this.props.navigator.pop();
    }


    render() {
        return (
            <View style={styles.container}>
                <SettingsListView dataSource={this.state.dataSource}
                                  topGap={((height * 8.8) / 100)}
                                  onpress={this.onpress}/>
                {this.showServerIpModal()}
                {this.showChangePasswordModal()}

                <WebServiceCallManager visible={false} nav={this.props.navigator} ref={(input) => {
                    this.webservicemanager = input;
                }}/>
            </View>
        );
    }


    onpress = (data) => {
        if (data.value === 0) {
            this.setState({serverIpModal: true})
        }
        else if (data.value === 1) {
            this.setState({changePasswordModal: true})
        }
    }


    showServerIpModal() {
        return (
            <View style={styles.modal}>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.serverIpModal}
                    onRequestClose={() => {
                        this.setError(false, '');
                        this.getServerIP();
                        this.setState({serverIpModal: false});
                    }}
                >
                    <View style={styles.modalTitle}>
                        <Text style={styles.heading}>Set Server IP</Text>
                    </View>
                    <View style={styles.modalLayout}>
                        <View>
                            <TextInputCustom
                                ref={(ref) => this.serverIP = ref}
                                placeholder={'IP Address'}
                                secureTextEntry={false}
                                value={this.state.serverIp}
                                onChangeTextCallback={val => this.setState({'serverIp': val})}
                                returnKeyType="next"
                                textInputWidth={((width * 86) / 100)}
                                // onEndEditingCallback = {() => this.password.textFocus()}
                            />
                            <View style={ styles.middleContainerViewButtons}>
                                <View style={ styles.middleContainerViewButtonsBtn}>
                                    <TouchableHighlight onPress={ () => this.buttonsHandler('save_server_ip')}>
                                        <Text style={ styles.btnTextLabels}>{'Save'}</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            {this.showError()}
                            <View style={styles.modalTitle}>

                            </View>

                        </View>
                    </View>
                </Modal>
            </View>
        )

    }

    showChangePasswordModal() {
        return (
            <View style={styles.modal}>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.changePasswordModal}
                    onRequestClose={() => {
                        this.setError(false, '');
                        this.setState({changePasswordModal: false});
                    }}
                >
                    <View style={styles.modalTitle}>
                        <Text style={styles.heading}>Change Password</Text>
                    </View>
                    <View style={styles.modalLayout}>
                        <View>
                            <TextInputCustom
                                ref={(ref) => this.oldPassword = ref}
                                placeholder={'Old Password'}
                                secureTextEntry={true}
                                onChangeTextCallback={val => this.setState({'oldPassword': val})}
                                returnKeyType="next"
                                textInputWidth={((width * 86) / 100)}
                                // onEndEditingCallback = {() => this.password.textFocus()}
                            />

                            <TextInputCustom
                                ref={(ref) => this.newPassword = ref}
                                placeholder={'New Password'}
                                secureTextEntry={true}
                                onChangeTextCallback={val => this.setState({'newPassword': val})}
                                returnKeyType="next"
                                textInputWidth={((width * 86) / 100)}
                                // onEndEditingCallback = {() => this.password.textFocus()}
                            />
                            <TextInputCustom
                                ref={(ref) => this.confirmPassword = ref}
                                placeholder={'Confirm Password'}
                                secureTextEntry={true}
                                onChangeTextCallback={val => this.setState({'confirmPassword': val})}
                                returnKeyType="next"
                                textInputWidth={((width * 86) / 100)}
                                // onEndEditingCallback = {() => this.password.textFocus()}
                            />
                            <View style={ styles.middleContainerViewButtons}>
                                <View style={ styles.middleContainerViewButtonsBtn}>
                                    <TouchableHighlight onPress={ () => this.buttonsHandler('change_password')}>
                                        <Text style={ styles.btnTextLabels}>{'Submit'}</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            {this.showError()}
                            <View style={styles.modalTitle}>

                            </View>

                        </View>
                        <WebServiceCallManager visible={false} nav={this.props.navigation} ref={ (input) => {
                            this.webservicemanager = input;
                        }}/>
                    </View>
                </Modal>
            </View>
        )

    }

    showError() {
        if (this.state.isError === true) {
            return (
                <View style={styles.errorView}>
                    <Text style={styles.error}>{this.state.error}</Text>
                </View>
            )
        }
        else {
            return (
                <View/>
            )
        }
    }

    async  saveServerIP(ipAddress) {
        try {
            await AsyncStorage.setItem(Constants.SERVER_IP_ADDRESS, ipAddress);
        } catch (error) {
            alert('Error encountered while saving server IP address :' + error.message);
        }
    };

    async getServerIP() {
        try {
            var value = await AsyncStorage.getItem(Constants.SERVER_IP_ADDRESS);
            if (value !== null && value.length > 0) {
                this.setState({serverIp: value});
            } else {
                this.setState({serverIp: ''});
            }
        } catch (error) {
            alert('Error encountered while reading App storage ' + error.message);
            this.setState({serverIp: ''});
        }
    }

    buttonsHandler(type) {
        switch (type) {
            case 'save_server_ip':
                dismissKeyboard();
                this.saveServerIP(this.state.serverIp)
                this.setState({serverIpModal: false});
                break;
            case 'change_password':
                dismissKeyboard();
                if (this.validatePassword()) {
                    var params = {
                        "studentId":this.state.studentId,
                        "oldPassword": this.state.oldPassword,
                        "newPassword": this.state.newPassword,
                        "confirmPassword":this.state.confirmPassword
                    };
                    this.webservicemanager.callWebService("student/chpwd", "", params, (response) => {
                            this.handleWebServiceCallResponse(response);
                        },
                        (response) => {
                            this.handleErrorResponse(response);
                        },);
                }
                break;
            default:
                alert(type + ' is pressed');

        }
    }

    setError(isError, error) {
        this.setState({isError: isError, error: error});
    }

    validatePassword() {
        if (this.state.oldPassword === ''  || this.state.newPassword === '' || this.state.confirmPassword === '') {
            this.setError(true, 'Fields cannot be empty');
            return false;
        }
        // else if (this.state.username.length < 6 || this.state.username.length > 20) {
        //     this.setError(true, 'Username must have 6 - 20 characters');
        //     return false;
        // }
        else if (this.state.oldPassword.length < 8) {
            this.setError(true, 'Old Password cannot be less than 8 characters');
            return false;
        }
        else if (this.state.newPassword.length < 8) {
            this.setError(true, 'Password cannot be less than 8 characters');
            return false;
        }
        else if (this.state.newPassword !== this.state.confirmPassword) {
            this.setError(true, 'Two passwords do not match.');
            return false;
        }
        else {
            this.setError(false, '');
            return true;
        }
    }
    handleErrorResponse(data) {
        this.setError(true, data.errorDescription);
    }

    handleWebServiceCallResponse(response) {
        this.setState({changePasswordModal: false});
        ToastAndroid.showWithGravity('Password Changed' , ToastAndroid.SHORT, ToastAndroid.CENTER);
    }

}
const styles = StyleSheet.create({
    container: {
        height: ((height * ( (Platform.OS === 'ios') ? 85 : 100)) / 100), // if ios height = 85 else 82
        // paddingVertical: ((height * 3) / 100)
    },
    modal: {
        height: ((height * ( (Platform.OS === 'ios') ? 50 : 50)) / 100), // if ios height = 85 else 82
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#D5D6E0',
        flex: 3
    },
    modalLayout: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D5D6E0'
    },
    modalTitle: {
        flex: 1,
        // height:((height * 35) / 100),
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#D5D6E0'
    },
    heading: {
        fontSize: ((width * 5) / 100),
        fontWeight: 'bold',
        color: 'black'
    },
    errorView: {
        flex: 1,
        // height:((height * 35) / 100),
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#D5D6E0'
    },
    error: {
        fontSize: ((width * 4) / 100),
        fontWeight: 'bold',
        color: 'red'
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
