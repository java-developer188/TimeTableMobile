import LoginScreen from '.././login/LoginScreen';
import HomeScreen from '.././home/HomeScreen';
import TeacherNamesContainer from '../teacher/TeacherNamesContainer';
import TeacherNamesListView from '../teacher/TeacherNamesListView';
import TeacherTimeTableContainer from '../teacher/TeacherTimeTableContainer';
import TeacherTimeTableListView from '../teacher/TeacherTimeTableListView';
import StudentTimeTableContainer from '../student/StudentTimeTableContainer';
import StudentTimeTableListView from '../student/StudentTimeTableListView';
import WelcomeScreen from '../student/WelcomeScreen';
import CourseNamesContainer from "../course/CourseNamesContainer";
import CourseNamesListView from "../course/CourseNamesListView";
import RegistrationScreen from "../registration/RegistrationScreen";
import RegisterCourseListView from "../registration/RegisterCourseListView";
import RegisterCourseContainer from "../registration/RegisterCourseContainer";
import CoursesByBatchScreen from "../registration/CoursesByBatchScreen";
import CSTContainer from "../registration/CSTContainer";
import CSTListView from "../registration/CSTListView";
import SelectedCoursesContainer from "../registration/SelectedCoursesContainer";
import SelectedCoursesListView from "../registration/SelectedCoursesListView";
import SettingsContainer from "../settings/SettingsContainer";
import SettingsListView from "../settings/SettingsListView";
import AddCourseListView from "../course/AddCourseListView";
import AddCourseContainer from "../course/AddCourseContainer";
import AddRemoveByBatchScreen from "../course/AddRemoveByBatchScreen";
import CSTAddContainer from "../course/CSTAddContainer";
import CSTAddListView from "../course/CSTAddListView";
import RemoveSelectedCoursesContainer from "../course/RemoveSelectedCoursesContainer";
import RemoveSelectedCoursesListView from "../course/RemoveSelectedCoursesListView";
import SeatingContainer from "../student/seating/SeatingContainer";
import SeatingListView from "../student/seating/SeatingListView";
import AttendanceContainer from "../student/attendance/AttendanceContainer";
import AttendanceListView from "../student/attendance/AttendanceListView";

 // All screens of app are defined here.

export const Screens = {


    LoginScreen: {title: 'Smart Timetable', className: LoginScreen, name: 'LoginScreen'},
    HomeScreen: {title: 'Smart Timetable', className: HomeScreen, name: 'HomeScreen'},
    TeacherNamesContainer: {title: 'Faculty', className: TeacherNamesContainer, name: 'TeacherNamesContainer'},
    TeacherNamesListView: {title: 'Faculty', className: TeacherNamesListView, name: 'TeacherNamesListView'},
    TeacherTimeTableContainer: {title: 'Faculty', className: TeacherTimeTableContainer, name: 'TeacherTimeTableContainer'},
    TeacherTimeTableListView: {title: 'Faculty', className: TeacherTimeTableListView, name: 'TeacherTimeTableListView'},
    StudentTimeTableContainer: {title: 'Smart Timetable', className: StudentTimeTableContainer, name: 'StudentTimeTableContainer'},
    StudentTimeTableListView: {title: 'Smart Timetable', className: StudentTimeTableListView, name: 'StudentTimeTableListView'},
    WelcomeScreen: {title: 'Smart Timetable', className: WelcomeScreen, name: 'WelcomeScreen'},
    CourseNamesContainer: {title: 'Courses', className: CourseNamesContainer, name: 'CourseNamesContainer'},
    CourseNamesListView: {title: 'Courses', className: CourseNamesListView, name: 'CourseNamesListView'},
    AddCourseContainer: {title: 'Add/Remove Courses', className: AddCourseContainer , name : 'AddCourseContainer' },
    AddCourseListView: {title: 'Add/Remove Courses', className: AddCourseListView , name : 'AddCourseListView' },
    AddRemoveByBatchScreen: {title: 'Add/Remove Courses', className: AddRemoveByBatchScreen , name : 'AddRemoveByBatchScreen' },
    CSTAddContainer: {title: 'Add/Remove Courses', className: CSTAddContainer , name : 'CSTAddContainer' },
    CSTAddListView: {title: 'Add/Remove Courses', className: CSTAddListView , name : 'CSTAddListView' },
    RemoveSelectedCoursesContainer: {title: 'Add/Remove Courses', className: RemoveSelectedCoursesContainer , name : 'RemoveSelectedCoursesContainer' },
    RemoveSelectedCoursesListView: {title: 'Add/Remove Courses', className: RemoveSelectedCoursesListView , name : 'RemoveSelectedCoursesListView' },
    RegistrationScreen: {title: 'Registration', className: RegistrationScreen , name : 'RegistrationScreen' },
    RegisterCourseContainer: {title: 'Registration', className: RegisterCourseContainer , name : 'RegisterCourseContainer' },
    RegisterCourseListView: {title: 'Registration', className: RegisterCourseListView , name : 'RegisterCourseListView' },
    CoursesByBatchScreen: {title: 'Course Registration', className: CoursesByBatchScreen , name : 'CoursesByBatchScreen' },
    CSTContainer: {title: 'Course Registration', className: CSTContainer , name : 'CSTContainer' },
    CSTListView: {title: 'Course Registration', className: CSTListView , name : 'CSTListView' },
    SelectedCoursesContainer: {title: 'Selected Courses', className: SelectedCoursesContainer , name : 'SelectedCoursesContainer' },
    SelectedCoursesListView: {title: 'Selected Courses', className: SelectedCoursesListView , name : 'SelectedCoursesListView' },
    SettingsContainer: {title: 'Settings', className: SettingsContainer , name : 'SettingsContainer' },
    SettingsListView: {title: 'Settings', className: SettingsListView , name : 'SettingsListView' },
    SeatingContainer: {title: 'Seating', className: SeatingContainer, name: 'SeatingContainer'},
    SeatingListView: {title: 'Seating', className: SeatingListView, name: 'SeatingListView'},
    AttendanceContainer: {title: 'Smart Timetable', className: AttendanceContainer, name: 'AttendanceContainer'},
    AttendanceListView: {title: 'Smart Timetable', className: AttendanceListView, name: 'AttendanceListView'}
}

export class ScreenClass {

    static getClassFromClassName(className) {

        let clsName;

        Object.keys(Screens).map((key) => {

            var user = Screens[key].className;

            if (className == key) {

                clsName = Screens[key];

            }
        });

        return clsName;

    }

}
