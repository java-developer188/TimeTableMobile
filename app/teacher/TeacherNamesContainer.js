import React, {Component} from 'react';
import {
    ListView,
    View, Dimensions, Alert
} from 'react-native'
import {SessionManager} from '.././utilities/SessionManager';
import {Screens} from '.././navigation/Screens';
import TeacherNamesListView from './TeacherNamesListView';
import Constants from '.././utilities/Constants';
import {WebServiceCallManager} from '.././utilities/WebServiceCallManager';
const {width, height} = Dimensions.get("window");


export default class TeacherNamesContainer extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var facultyMembers;
        if (SessionManager.getSessionValue(Constants.FACULTY_MEMBERS) !== null) {
            facultyMembers = SessionManager.getSessionValue(Constants.FACULTY_MEMBERS).Teachers;
        }
        this.state = {
            dataSource: ds.cloneWithRows(JSON.parse(facultyMembers))
        };
    }

    onBackPress() {
        this.props.navigator.pop();
    }


    render() {
        return (
            <View>
                <TeacherNamesListView dataSource={this.state.dataSource}
                                      topGap={((height * 8.8) / 100)}
                                      onpress={this.onpress}/>

                <WebServiceCallManager visible={false} nav={this.props.navigator} ref={(input) => {
                    this.webservicemanager = input;
                }}/>
            </View>
        );
    }


     onpress = (data) => {
        this.fetchTeacherTimeTable(data)
    }


    fetchTeacherTimeTable(data) {
        // alert(JSON.stringify(data.id));
        var params = {
            "id": JSON.stringify(data.id)
        }
        this.webservicemanager.callWebService("faculty", "", params, (response) => {
            this.handleWebServiceCallResponse(response, data);
        });

    }

    handleWebServiceCallResponse(data, rowData) {

        if (data.TimeTable !== null && data.TimeTable.length > 0) {

            SessionManager.setSessionValue(Constants.TEACHER_TIMETABLE, data);
            Screens.TeacherTimeTableContainer.title = rowData.name;
            this.props.navigator.push(Screens.TeacherTimeTableContainer);
        }

    }

}
