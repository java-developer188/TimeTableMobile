import React, {Component} from 'react';
import {
    ListView,
    View, Dimensions
} from 'react-native'
import {SessionManager} from '../../utilities/SessionManager';
import {Screens} from '../../navigation/Screens';
import Constants from '../../utilities/Constants';
import SeatingListView from "./SeatingListView";
import {WebServiceCallManager} from "../../utilities/WebServiceCallManager";
const {width, height} = Dimensions.get("window");


export default class SeatingContainer extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var seating;
        if (SessionManager.getSessionValue(Constants.STUDENT_SEATING) !== null) {
            seating = SessionManager.getSessionValue(Constants.STUDENT_SEATING).Seating;
        }
        this.state = {
            dataSource: ds.cloneWithRows(JSON.parse(seating))
        };
    }

    onBackPress() {
        this.props.navigator.pop();
    }


    render() {
        return (
            <View>
                <SeatingListView dataSource={this.state.dataSource}
                                          topGap={((height * 8.8) / 100)}/>

                <WebServiceCallManager visible={false} nav={this.props.navigator} ref={(input) => {
                    this.webservicemanager = input;
                }}/>
            </View>
        );
    }


    onpress = (data) => {
        this.fetchfacultyTimeTable(data)
    }

    fetchfacultyTimeTable(data) {

        var params = {
            "id": 1
        }
        this.webservicemanager.callWebService("teacher", "", params, (response) => {
            this.handleWebServiceCallResponse(response);
        });

    }

    handleWebServiceCallResponse(data) {

        // if (data.TimeTable !== null && data.TimeTable.length > 0) {
        //
        //     SessionManager.setSessionValue(Constants.TEACHER_TIMETABLE, data.TimeTable);
        //     this.props.navigator.push(Screens.AccountListContainer);
        // }

    }

}
