import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    ToolbarAndroid,
    NativeModules, Easing,
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
const imgBackgroud = require('.././assets/bg.png');

export default class HomeScreen extends Component {

    constructor(props) {
        // const dataSource = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2});
        //  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        super(props);
        this.state = {
            // dataSource : dataSource.cloneWithPages(IMGS),
            // ds : ds.cloneWithRows(accounts)
        }

    }

    handleFacultyCallResponse(data) {

        if (data.Teachers !== null && data.Teachers.length > 0) {

            SessionManager.setSessionValue(Constants.FACULTY_MEMBERS, data);

            this.props.navigator.push(Screens.TeacherNamesContainer);
        }
    }

    handleCoursesCallResponse(data) {
        alert(JSON.stringify(data))
        if (data.Courses !== null && data.Courses.length > 0) {
            alert(JSON.stringify(data))
            SessionManager.setSessionValue(Constants.COURSES, data);

            this.props.navigator.push(Screens.CourseNamesContainer);
        }
    }

    actPressButton(item) {
        //   clearTimeout(timer);

        if (item === Screens.TeacherNamesContainer) {
            this.facultyWebServiceCall();

        }
        else  if (item === Screens.CourseNamesContainer) {
            this.coursesWebServiceCall();

        }
        else {
            this.props.navigator.push(item);
        }

    }

    coursesWebServiceCall() {
        var params = {};
        this.webservicemanager.callWebService("courses", "", params, (response) => {
            this.handleCoursesCallResponse(response);
        });
    }

    facultyWebServiceCall() {
        var params = {};
        this.webservicemanager.callWebService("faculty", "", params, (response) => {
            this.handleFacultyCallResponse(response);
        });
    }


    _renderPage(data) {
        return (
            <View>
                <Image source={data} resizeMode='stretch' style={{width: width, height: ((height * 49) / 100)}}/>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollStyle}>

                    <View style={styles.innerView}>
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
                            this.actPressButton(Screens.LoginScreen)
                        }}>
                            <View style={ styles.buttonView}>
                                <Text style={ styles.buttonText}>Login</Text>
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
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor:'#D5D6E0'
    },
    background:{
        width, // equal to width : width
        height,
        resizeMode:'stretch'

    },
    scrollStyle: {
        flex: 1,
        marginTop: ( (height  * 8) / 100),
        height: ((height * 40) / 100),
        backfaceVisibility: 'visible',
    },
    innerView: {
        justifyContent: 'space-between',
        margin:20,
    },
    buttonView: {
        height: ((height * 10) / 100),
        backgroundColor: 'white',
        alignItems:'center',
        margin:5,
    },
    bottomButtonsViewRowImage: {
        //width: ((width * 60) / 100),
        height: ((height * 27) / 100),
        resizeMode: 'center',
        //margin: ((width * 3) / 100),
    },
    buttonText: {
        marginTop: 18,
        fontSize: ((width * 5) / 100),
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Arial',
    }
});
