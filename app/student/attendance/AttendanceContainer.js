import React, {Component} from 'react';
import {
    ListView,
    View, Dimensions,ToastAndroid
} from 'react-native'
import {SessionManager} from '../../utilities/SessionManager';
import {Screens} from '../../navigation/Screens';
import Constants from '../../utilities/Constants';
import {WebServiceCallManager} from '../../utilities/WebServiceCallManager';
import AttendanceListView from "./AttendanceListView";
const {width, height} = Dimensions.get("window");


export default class AttendanceContainer extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var attendance;
        if (SessionManager.getSessionValue(Constants.STUDENT_ATTENDANCE) !== null) {
            attendance = SessionManager.getSessionValue(Constants.STUDENT_ATTENDANCE).Attendance;
        }
        this.state = {
            dataSource: ds.cloneWithRows(JSON.parse(attendance))
        };
    }

    onBackPress() {
        this.props.navigator.pop();
    }


    render() {
        return (
            <View>
                <AttendanceListView dataSource={this.state.dataSource}
                                    onpress={this.onpress}
                                          topGap={((height * 8.8) / 100)}/>

                <WebServiceCallManager visible={false} nav={this.props.navigator} ref={(input) => {
                    this.webservicemanager = input;
                }}/>
            </View>
        );
    }


    onpress = (data) => {
        this.markAttendance(data)
    }

    markAttendance(data) {

        var params = {
            "id": data
        }
        //alert(JSON.stringify(params))
        this.webservicemanager.callWebService("student/attendance/mark", "", params, (response) => {
            this.handleWebServiceCallResponse(response);
        });

    }

    handleWebServiceCallResponse(data) {

        if(data.Attendance != null && data.Attendance.length >0){
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({dataSource:ds.cloneWithRows(JSON.parse(data.Attendance))})
            this.props.navigator.pop();
            ToastAndroid.showWithGravity('Attendance Marked' , ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
        // if (data.TimeTable !== null && data.TimeTable.length > 0) {
        //
        //     SessionManager.setSessionValue(Constants.TEACHER_TIMETABLE, data.TimeTable);
        //     this.props.navigator.push(Screens.AccountListContainer);
        // }

    }

}
