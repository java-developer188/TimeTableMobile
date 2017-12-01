import React, {Component} from 'react';
import {
    ListView,
    View,
    Dimensions,
    Alert,
    Platform,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    Text
} from 'react-native'
import {SessionManager} from '.././utilities/SessionManager';
import Constants from '.././utilities/Constants';
import {WebServiceCallManager} from '.././utilities/WebServiceCallManager';
import CSTListView from "./CSTListView";
const {width, height} = Dimensions.get("window");
const dismissKeyboard = require('dismissKeyboard');

export default class CSTContainer extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        var courseSectionTeacher;
        if (SessionManager.getSessionValue(Constants.COURSE_SECTION_TEACHER) !== null) {
            var cstKey = SessionManager.getSessionValue(Constants.COURSE_SECTION_TEACHER);
            if (SessionManager.getSessionValue( cstKey ) !== null) {
                    courseSectionTeacher = SessionManager.getSessionValue(cstKey).CST;
            }
        }

        this.state = {
            dataSource: ds.cloneWithRows(JSON.parse(courseSectionTeacher)),
            courseName: JSON.parse(courseSectionTeacher)[0].fullname
        };

    }

    onBackPress() {
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={ styles.registrationView}>

                <View /*style={ styles.middleContainerViewButtonsBtn}*/>
                    <Text style={ styles.heading}>{this.state.courseName}</Text>
                </View>

                <View style={ styles.internal}>
                    <CSTListView dataSource={this.state.dataSource}
                                            topGap={((height * 0) / 100)}/>

                </View>
                <View style={ styles.middleContainerViewButtons}>
                    <View style={ styles.middleContainerViewButtonsBtn}>
                        <TouchableHighlight onPress={ () => this.buttonsHandler('back')}>
                            <Text style={ styles.btnTextLabels}>{'Back'}</Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <WebServiceCallManager visible={false} nav={this.props.navigator} ref={(input) => {
                    this.webservicemanager = input;
                }}/>
            </View>
        );
    }




    buttonsHandler(type) {
        switch (type) {
            case 'back':
                dismissKeyboard();
                this.onBackPress();
                break;
            default:
                alert(type + ' is pressed');

        }
    }

}

const
    styles = StyleSheet.create({
        registrationView: {
            height: ((height * ( (Platform.OS === 'ios') ? 85 : 100)) / 100), // if ios height = 85 else 82
            paddingVertical: ((height * 3) / 100),
            marginTop: ((height * 8) / 100)
        },
        internal: {
            height: ((height * 70) / 100),
            justifyContent: 'center',
            alignItems: 'center'
        },
        heading: {
            color: '#000000',
            height: 35,
            textAlign: 'center',
            paddingTop: 9
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