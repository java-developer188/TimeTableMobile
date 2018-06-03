import React, {Component} from 'react';
import {
    ListView,
    View,
    Dimensions,
    Alert,
    Platform,
    StyleSheet,
    TouchableHighlight,
    ToastAndroid,
    Text
} from 'react-native'
import {SessionManager} from '.././utilities/SessionManager';
import {Screens} from '.././navigation/Screens';
import Constants from '.././utilities/Constants';
import {WebServiceCallManager} from '.././utilities/WebServiceCallManager';
const {width, height} = Dimensions.get("window");
const dismissKeyboard = require('dismissKeyboard');

export default class AddRemoveByBatchScreen extends Component {

    constructor(props) {
        super(props);
    }

    onBackPress() {
        this.props.navigator.pop();
    }


    render() {
        return (
            <View style={ styles.registrationView}>

                <View style={ styles.internal}>
                    <View style={ styles.middleContainerViewButtons}>
                        <View style={ styles.middleContainerViewButtonsBtn}>
                            <TouchableHighlight onPress={ () => this.buttonsHandler(2014)}>
                                <Text style={ styles.btnTextLabels}>{'Batch 2014'}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={ styles.middleContainerViewButtons}>
                        <View style={ styles.middleContainerViewButtonsBtn}>
                            <TouchableHighlight onPress={ () => this.buttonsHandler(2015)}>
                                <Text style={ styles.btnTextLabels}>{'Batch 2015'}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={ styles.middleContainerViewButtons}>
                        <View style={ styles.middleContainerViewButtonsBtn}>
                            <TouchableHighlight onPress={ () => this.buttonsHandler(2016)}>
                                <Text style={ styles.btnTextLabels}>{'Batch 2016'}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={ styles.middleContainerViewButtons}>
                        <View style={ styles.middleContainerViewButtonsBtn}>
                            <TouchableHighlight onPress={ () => this.buttonsHandler(2017)}>
                                <Text style={ styles.btnTextLabels}>{'Batch 2017'}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={ styles.selectedButton}>
                        <View style={ styles.selectedBtn}>
                            <TouchableHighlight onPress={ () => this.buttonsHandler('selected')}>
                                <Text style={ styles.btnTextLabels}>{'Courses Selected '}</Text>
                            </TouchableHighlight>
                        </View>
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
            case 'selected':
                dismissKeyboard();
                this.showSelectedCoursesScreen();
                break;
            default:
                let key = 'Courses_' + type;
                if (SessionManager.getSessionValue(key) !== null) {
                    this.callCoursesByBatchScreen(key);
                }
                else {
                    var params = {
                        "batch": type
                    };
                    this.webservicemanager.callWebService("courses/batch", "", params, (response) => {
                        this.handleCoursesByBatchCallResponse(response, key);
                    });
                }

        }
    }

    callCoursesByBatchScreen(batch) {
        SessionManager.setSessionValue(Constants.COURSES_BY_BATCH, batch);
        this.props.navigator.push(Screens.AddCourseContainer);
    }

    handleCoursesByBatchCallResponse(data, batchKey) {

        if (data.Courses !== null && data.Courses.length > 0) {
            SessionManager.setSessionValue(batchKey, data);
            this.callCoursesByBatchScreen(batchKey);
        }
    }

    showSelectedCoursesScreen() {
        if (SessionManager.getSessionValue(Constants.FINAL_SELECTED_COURSES) !== null) {
            this.props.navigator.push(Screens.RemoveSelectedCoursesContainer);
        }
        else {
            ToastAndroid.showWithGravity('No Courses Selected', ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }
}
const styles = StyleSheet.create({
    registrationView: {
        height: ((height * ( (Platform.OS === 'ios') ? 85 : 100)) / 100), // if ios height = 85 else 82
        paddingVertical: ((height * 3) / 100),
        marginTop: ((height * 8) / 100)
    },
    internal: {
        height: ((height * 65) / 100),
        marginTop: ((height * 4) / 100),
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
    selectedButton: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: ((height * 2) / 100),
        width: ((width * 51) / 100),
    },
    selectedBtn: {
        width: ((width * 51) / 100),
        backgroundColor: '#000000',
        borderRadius: 4,
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