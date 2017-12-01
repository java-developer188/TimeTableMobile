//import LocalizedStrings from 'react-native-localization';

/*
 All strings displayed on buttons, textfield promts,checkboxes
 etc are defined here along with localization.
 */

class Constants {

    //Registration
    static REGISTRATION_DATA = 'registration_data';

    //current user
    static USER = 'current_user';
    static STUDENT_TIMETABLE = 'student_timetable';
    static ASSIGNED_USER_ID ='assigned_user_id'

    //teacher
    static FACULTY_MEMBERS = 'faculty_members';
    static TEACHER_TIMETABLE = 'teacher_timetable';

    //course
    static COURSES = 'courses';
    static COURSES_BY_BATCH = 'courses_by_batch';
    static COURSE_SECTION_TEACHER = 'cst';
    static SELECTED_COURSES = 'selected_courses';

    static FROM_CLASS_NAME = 'fromClass';

    //GCM
    static GCM_TOKEN = 'gcm_token';

    //User Settings
    static SERVER_IP_ADDRESS = 'server_ip_address';

}

module.exports = Constants;
