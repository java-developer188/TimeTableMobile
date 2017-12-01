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
            alert("Token send successfully");
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

        else if (item === Screens.CourseNamesContainer) {

            var params = {};
            this.webservicemanager.callWebService("courses", "", params, (response) => {
                this.handleCoursesCallResponse(response);
            });
        }
        else {
            this.props.navigator.push(item);
        }

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
                            this.actPressButton(Screens.CourseNamesContainer)
                        }}>
                            <View style={ styles.buttonView}>
                                <Text style={ styles.buttonText}>Courses</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.actPressButton(Screens.StudentTimeTableContainer)
                        }}>
                            <View style={ styles.buttonView}>
                                <Text style={ styles.buttonText}>My TimeTable</Text>
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
