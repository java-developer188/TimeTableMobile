import React, {Component} from 'react';
import {
    ListView,
    View,
    Dimensions,
    Alert,
    Platform,
    StyleSheet,
    TouchableHighlight,
    Text
} from 'react-native'
import {SessionManager} from '.././utilities/SessionManager';
import {Screens} from '.././navigation/Screens';
import Constants from '.././utilities/Constants';
import {WebServiceCallManager} from '.././utilities/WebServiceCallManager';
import AddCourseListView from "./AddCourseListView";

const {width, height} = Dimensions.get("window");
const dismissKeyboard = require('dismissKeyboard');

export default class AddCourseContainer extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        var courses;
        if (SessionManager.getSessionValue(Constants.COURSES_BY_BATCH) !== null) {
            var batchKey = SessionManager.getSessionValue(Constants.COURSES_BY_BATCH);
            if (SessionManager.getSessionValue(batchKey) !== null) {
                courses = SessionManager.getSessionValue(batchKey).Courses;
            }
        }
        this.state = {
            dataSource: ds.cloneWithRows(JSON.parse(courses)),
        };

    }

    onBackPress() {
        this.props.navigator.pop();
    }


    render() {
        return (

            <View style={ styles.registrationView}>
                <View style={ styles.internalOne}>
                    <AddCourseListView dataSource={this.state.dataSource}
                                            onpress={this.onpress}
                                            topGap={((height * 0) / 100)}/>

                </View>
                <View style={ styles.internalTwo}>
                    <View style={ styles.middleContainerViewButtons}>
                        <View style={ styles.middleContainerViewButtonsBtn}>
                            <TouchableHighlight onPress={ () => this.buttonsHandler('back')}>
                                <Text style={ styles.btnTextLabels}>{'Back'}</Text>
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


    onpress = (data) => {
        this.fetchCST(data);
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

    fetchCST(data) {
        // alert(JSON.stringify(data.id));
        var params = {
            "id": JSON.stringify(data.id)
        }
        this.webservicemanager.callWebService("courses", "", params, (response) => {
            this.handleWebServiceCallResponse(response, data);
        }, (response) => {
            this.handleErrorResponse(response);
        },);
    }

    handleErrorResponse(data) {
        alert(JSON.stringify(data.errorDescription));
    }

    handleWebServiceCallResponse(data, rowData) {
        if (data.CST !== null && data.CST.length > 0) {
            SessionManager.setSessionValue(Constants.COURSE_SECTION_TEACHER, rowData.id);
            SessionManager.setSessionValue(rowData.id, data);
           this.props.navigator.push(Screens.CSTAddContainer);
        }

    }


}

const styles = StyleSheet.create({
    registrationView: {
        flex: 10,
        height: ((height * ( (Platform.OS === 'ios') ? 85 : 100)) / 100), // if ios height = 85 else 82
        paddingVertical: ((height * 1) / 100),
        marginTop: ((height * 8) / 100)
    },
    internalOne: {
        flex: 8,
        height: ((height * 5) / 100),
        // justifyContent: 'space-between',
        // marginTop: ((height * 8) / 100),
        //marginBottom: ((height * 36) / 100)
        // alignItems: 'center'
    },
    internalTwo: {
        flex: 1,
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
        marginTop: ((height * 2) / 100),
        borderRadius: 4,
    },
    middleContainerViewButtonsBtn: {
        width: ((width * 41) / 100),
        backgroundColor: '#000000',
        borderRadius: 4,
    },
});