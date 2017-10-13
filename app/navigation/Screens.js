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


// import ChangePassword from '.././services/ChangePassword';
// import RegistrationWelcomeScreen from '.././registration/RegistrationWelcomeScreen';
// import RegistrationOnlineUserScreen from '.././registration/RegistrationOnlineUserScreen';
// import RegistrationOTPVerficationScreen from '.././registration/RegistrationOTPVerficationScreen';
// import RegistrationCompletionScreen from '.././registration/RegistrationCompletionScreen';
// import RegistrationCompletedScreen from '.././registration/RegistrationCompletedScreen';
// import ForceChangePassword from '../ForceChangePassword';
// import AccountListContainer from '.././account/AccountListContainer';
// import AccountOverviewContainer from '.././account/AccountOverviewContainer';
// import AccountSummary from '.././account/AccountSummary';
// import AccountFullStatementFilter from '.././account/AccountFullStatementFilter';
// import AccountFullStatementContainer from '.././account/AccountFullStatementContainer';
// import BeneficiaryListView from '.././beneficiary/BeneficiaryListView';
// import AddBeneficiaryOtherHBLAccounts from '../beneficiary/AddBeneficiaryOtherHBLAccounts';
// import FastTransferTransactionToHBL from '.././fasttransfer/FastTransferTransactionToHBL';
// import FundTransferToOtherHBLAccounts from '.././fundstransfer/FundTransferToOtherHBLAccounts';
// import FundTransferLocalCreditCard from '.././fundstransfer/FundTransferLocalCreditCard';
// import FundTransferDemandDraft from '.././fundstransfer/FundTransferDemandDraft';
// import FundTransferToOtherBankAccounts from '.././fundstransfer/FundTransferToOtherBankAccounts';
// import FundTransferToForeignAccounts from '.././fundstransfer/FundTransferToForeignAccounts';
// import FundTransferWithinOwnHBLAccounts from '.././fundstransfer/FundTransferWithinOwnHBLAccounts';
// import SecurityQuestions from '.././securityquestion/SecurityQuestions';
// import AddBeneficiaryToOtherBankAccounts from '../beneficiary/AddBeneficiaryToOtherBankAccounts';
// import AddBeneficiaryForForeignAccounts from '../beneficiary/AddBeneficiaryForForeignAccounts';
// import AddBeneficiaryForCreditCard from '../beneficiary/AddBeneficiaryForCreditCard';
// import AddBeneficiaryForDemandDraft from '../beneficiary/AddBeneficiaryForDemandDraft';
// import EditBeneficiaryOtherHBLAccounts from '../beneficiary/EditBeneficiaryOtherHBLAccounts';
// import EditBeneficiaryToOtherBankAccounts from '../beneficiary/EditBeneficiaryToOtherBankAccounts';
// import EditBeneficiaryForForeignAccounts from '../beneficiary/EditBeneficiaryForForeignAccounts';
// import EditBeneficiaryForCreditCard from '../beneficiary/EditBeneficiaryForCreditCard';
// import EditBeneficiaryForDemandDraft from '../beneficiary/EditBeneficiaryForDemandDraft';
// import ViewBeneficiaryOtherHBLAccounts from '../beneficiary/ViewBeneficiaryOtherHBLAccounts';
// import ViewBeneficiaryToOtherBankAccounts from '../beneficiary/ViewBeneficiaryToOtherBankAccounts';
// import ViewBeneficiaryForForeignAccounts from '../beneficiary/ViewBeneficiaryForForeignAccounts';
// import ViewBeneficiaryForCreditCard from '../beneficiary/ViewBeneficiaryForCreditCard';
// import ViewBeneficiaryForDemandDraft from '../beneficiary/ViewBeneficiaryForDemandDraft';
// import SecurityQuestionVerification from '../securityquestion/SecurityQuestionVerification';
// import SetupLoginMethod from '../login/SetupLoginMethod';
// import FngerPrintTermsAndConditions from '../login/FngerPrintTermsAndConditions';
// import PaymentsListView from '.././beneficiary/PaymentsListView';
// import FastTransferRemittanceListView from '.././fasttransfer/FastTransferRemittanceListView';
// import FastTransferMembershipBeneficiariesListView from '.././fasttransfer/FastTransferMembershipBeneficiariesListView';
// import MembershipDetails from '.././fasttransfer/MembershipDetails';
// import NewMembership from '.././fasttransfer/NewMembership';
// import FastTransferBeneficiaryListView from '.././fasttransfer/FastTransferBeneficiaryListView';
// import ServicesListView from '.././services/ServicesListView';
// import TransactionListView from '.././services/TransactionListView';
// import TransactionHistoryScreen from '.././services/TransactionHistoryScreen';
// import ForgotPasswordScreen from '.././login/ForgotPasswordScreen';
// import UnlockProfileScreen from '.././login/UnlockProfileScreen';
// import ForgotUserIDScreen from '.././login/ForgotUserIDScreen';
// import ViewUserIDScreen from '.././login/ViewUserIDScreen';
// import ViewFundTransferWithinOwnHBLAccounts from '.././fundstransfer/ViewFundTransferWithinOwnHBLAccounts';
// import ViewFundTransferToOtherHBLAccounts from '.././fundstransfer/ViewFundTransferToOtherHBLAccounts';
// import ViewFundTransferToOtherBankAccounts from '.././fundstransfer/ViewFundTransferToOtherBankAccounts';
// import ViewFundTransferToForeignAccounts from '.././fundstransfer/ViewFundTransferToForeignAccounts';
// import ViewFundTransferLocalCreditCard from '.././fundstransfer/ViewFundTransferLocalCreditCard';
// import ViewFundTransferDemandDraft from '.././fundstransfer/ViewFundTransferDemandDraft';
// import RegistrationProfileActivationScreen from '.././registration/RegistrationProfileActivationScreen';
// import ResultSuccessScreen from '.././resultscreen/ResultSuccessScreen';
// import AddFastTransferToHBL from '.././fasttransfer/AddFastTransferToHBL';
// import AddFastTransferToOtherBank from '.././fasttransfer/AddFastTransferToOtherBank';
// import AddFastTransferToCash from '.././fasttransfer/AddFastTransferToCash';
// import ViewFastTransferTransactionToHBL from '.././fasttransfer/ViewFastTransferTransactionToHBL';
/*
 All screens of app are defined here.
 */
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
    RegistrationScreen: {title: 'Registration', className: RegistrationScreen , name : 'RegistrationScreen' },


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
