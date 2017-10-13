import React, {Component} from 'react';
import {
    ListView,
    View, Dimensions, Alert
} from 'react-native'
import {SessionManager} from '.././utilities/SessionManager';
import {Screens} from '.././navigation/Screens';
import Constants from '.././utilities/Constants';
import {WebServiceCallManager} from '.././utilities/WebServiceCallManager';
import CourseNamesListView from "./CourseNamesListView";
const {width, height} = Dimensions.get("window");


export default class CourseNamesContainer extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var courses;
        if (SessionManager.getSessionValue(Constants.COURSES) !== null) {
            courses = SessionManager.getSessionValue(Constants.COURSES).Courses;
        }
        this.state = {
            dataSource: ds.cloneWithRows(JSON.parse(courses))
        };
    }

    onBackPress() {
        this.props.navigator.pop();
    }


    render() {
        return (
            <View>
                <CourseNamesListView dataSource={this.state.dataSource}
                                      topGap={((height * 8.8) / 100)}/>

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
            Screens.TeacherTimeTableContainer.title = rowData.fullName;
            this.props.navigator.push(Screens.TeacherTimeTableContainer);
        }

    }

}
