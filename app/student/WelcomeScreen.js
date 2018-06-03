import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    ToolbarAndroid,
    NativeModules, Easing,
    AsyncStorage,
    View, TouchableOpacity, Alert, Dimensions, Navigator, ListView, ScrollView
} from 'react-native';

const {width, height} = Dimensions.get("window");
//import ViewPager from 'react-native-viewpager';
import {Screens} from '.././navigation/Screens';
import {WebServiceCallManager} from '.././utilities/WebServiceCallManager';
import {SessionManager} from ".././utilities/SessionManager";
import Constants from ".././utilities/Constants";

console.disableYellowBox = true;
var timer;
let ds, accounts = [''];
var callWebService;

export default class WelcomeScreen extends Component {

    constructor(props) {
        // const dataSource = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2});
        //  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        super(props);

    }

    componentDidMount(){
        var gcmToken;
        if (SessionManager.getSessionValue(Constants.GCM_TOKEN) !== null  &&
            SessionManager.getSessionValue(Constants.GCM_TOKEN).length > 0) {
            if (SessionManager.getSessionValue(Constants.USER) !== null){
                var student = JSON.parse(SessionManager.getSessionValue(Constants.USER));
                gcmToken = SessionManager.getSessionValue(Constants.GCM_TOKEN);
                //alert('S_id:'+student.id+" &&& token:"+gcmToken);
                this.saveUserId(student.id);
                //send token with user id to server
                this.sendGCMTokenToServer(student.id,gcmToken)
                SessionManager.setSessionValue(Constants.GCM_TOKEN,"");//clearing token so next time we send it from login screen

            }
        }
    }


    async  saveUserId(userId){
        try {
            await AsyncStorage.setItem(Constants.ASSIGNED_USER_ID,JSON.stringify(userId));
            //alert('user id saved successfull');
        } catch (error) {
            alert('Error encountered while saving user id :' + error.message);
        }
    };

    sendGCMTokenToServer(studentId,token){
        var params = {
            "id": JSON.stringify(studentId),
            "token":token
        };
        this.webservicemanager.callWebService("student/gcm", "", params, (response) => {
           // alert("Token send successfully");
        });
    }

    handleFacultyMemberCallResponse(data) {

        if (data.Teachers !== null && data.Teachers.length > 0) {

            SessionManager.setSessionValue(Constants.FACULTY_MEMBERS, data);

            this.props.navigator.push(Screens.TeacherNamesContainer);
        }
    }

    handleStudentTimetableCallResponse(data) {

        if (data.TimeTable !== null && data.TimeTable.length > 0) {

            SessionManager.setSessionValue(Constants.STUDENT_TIMETABLE, data);

            this.props.navigator.push(Screens.StudentTimeTableContainer);
        }
    }

    handleCoursesCallResponse(data) {

        if (data.Courses !== null && data.Courses.length > 0) {

            SessionManager.setSessionValue(Constants.COURSES, data);

            this.props.navigator.push(Screens.CourseNamesContainer);
        }
    }

    handleSelectedCoursesCallResponse(data) {
        if (data.CST !== null && data.CST.length > 0) {
            SessionManager.setSessionValue(Constants.FINAL_SELECTED_COURSES, data);
            this.props.navigator.push(Screens.AddRemoveByBatchScreen);
        }
    }

    handleSeatingCallResponse(data) {
        if (data.Seating !== null && data.Seating.length > 0) {
            SessionManager.setSessionValue(Constants.STUDENT_SEATING, data);
            this.props.navigator.push(Screens.SeatingContainer);
        }
    }

    handleAttendanceCallResponse(data) {
        if (data.Attendance !== null && data.Attendance.length > 0) {
            SessionManager.setSessionValue(Constants.STUDENT_ATTENDANCE, data);
            this.props.navigator.push(Screens.AttendanceContainer);
        }
    }

    actPressButton(item) {
        //   clearTimeout(timer);

        if (item === Screens.TeacherNamesContainer) {


            var params = {};
            this.webservicemanager.callWebService("faculty", "", params, (response) => {
                this.handleFacultyMemberCallResponse(response);
            });

        }
        else if (item === Screens.StudentTimeTableContainer) {

            var student = SessionManager.getSessionValue(Constants.USER)

            var params = {
                "id": JSON.parse(student).id
            };
            this.webservicemanager.callWebService("student/id", "", params, (response) => {
                this.handleStudentTimetableCallResponse(response);
            });
        }

        else if (item === Screens.AddRemoveByBatchScreen) {

            var student = SessionManager.getSessionValue(Constants.USER)

            var params = {
                "id": JSON.parse(student).id
            };
            this.webservicemanager.callWebService("courses/selected", "", params, (response) => {
                this.handleSelectedCoursesCallResponse(response);
            }, (response) => {
                this.handleErrorResponse(response);
            },);
        }
        else if (item === Screens.SeatingContainer) {

            var student = SessionManager.getSessionValue(Constants.USER)

            var params = {
                "id": JSON.parse(student).id
            };
            this.webservicemanager.callWebService("student/seating", "", params, (response) => {
                this.handleSeatingCallResponse(response);
            }, (response) => {
                this.handleErrorResponse(response);
            },);
        }
        else if (item === Screens.AttendanceContainer) {

            var student = SessionManager.getSessionValue(Constants.USER)

            var params = {
                "id": JSON.parse(student).id
            };
            this.webservicemanager.callWebService("student/attendance", "", params, (response) => {
                this.handleAttendanceCallResponse(response);
            }, (response) => {
                this.handleErrorResponse(response);
            },);
        }
        else {
            this.props.navigator.push(item);
        }

    }

    handleErrorResponse(response){
        alert(JSON.stringify(response.errorDescription))
    }

    transferPressButton(item) {
        this.props.navigator.push(item);
    }

    _renderPage(data) {
        return (
            <View>
                <Image source={data} resizeMode='stretch' style={{width: width, height: ((height * 49) / 100)}}/>
            </View>
        );
    }

    render() {
        var student = JSON.parse(SessionManager.getSessionValue(Constants.USER));

        return (
            <View style={styles.container}>

                <ScrollView style={styles.scrollStyle}>
                    <View style={styles.innerView}>

                        <View>
                            <Text style={styles.welcomeText}>
                                Welcome {student.fullName}
                            </Text>
                        </View>

                        <TouchableOpacity onPress={() => {
                            this.actPressButton(Screens.TeacherNamesContainer)
                        }}>
                            <View style={ styles.buttonView}>
                                <Text style={ styles.buttonText}>Faculty</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.actPressButton(Screens.AddRemoveByBatchScreen)
                        }}>
                            <View style={ styles.buttonView}>
                                <Text style={ styles.buttonText}>Add/Remove Courses</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.actPressButton(Screens.StudentTimeTableContainer)
                        }}>
                            <View style={ styles.buttonView}>
                                <Text style={ styles.buttonText}>My TimeTable</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.actPressButton(Screens.SeatingContainer)
                        }}>
                            <View style={ styles.buttonView}>
                                <Text style={ styles.buttonText}>Exam Seating</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.actPressButton(Screens.AttendanceContainer)
                        }}>
                            <View style={ styles.buttonView}>
                                <Text style={ styles.buttonText}>Attendance</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <WebServiceCallManager visible={false} nav={this.props.navigator} ref={ (input) => {
                    this.webservicemanager = input;
                }}/>

                <View style={{flex: 1}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
       // justifyContent: 'space-between',
        flex: 1,
        backgroundColor: '#D5D6E0'
    },
    background:{
        width, // equal to width : width
        height,
        resizeMode:'contain'

    },
    welcomeText: {
        marginTop: 12,
        marginBottom: 10,
        fontSize: ((width * 8) / 100),
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        color: 'white'
    },
    scrollStyle: {
       // flex: 1,
        marginTop: ( (height * 8) / 100),
        backfaceVisibility: 'visible',
    },
    innerView: {
        justifyContent: 'space-between',
        margin: 20,
    },
    buttonView: {
        height: ((height * 10) / 100),
        backgroundColor: 'white',
        alignItems: 'center',
        margin: 5,
    },
    bottomButtonsViewRowImage: {
        width: ((width * 60) / 100),
        height: ((height * 27) / 100),
        resizeMode: 'center',
        margin: ((width * 3) / 100),
    },
    buttonText: {
        marginTop: 18,
        fontSize: ((width * 5) / 100),
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Arial',
    }
});
