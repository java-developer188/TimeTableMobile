import React, {Component} from 'react';
import {
    ListView,
    View, Dimensions, Alert
} from 'react-native'
import {SessionManager} from '.././utilities/SessionManager';
import {Screens} from '.././navigation/Screens';
import Constants from '.././utilities/Constants';
import {WebServiceCallManager} from '.././utilities/WebServiceCallManager';
import SelectedCoursesListView from "./SelectedCoursesListView";

const {width, height} = Dimensions.get("window");


export default class SelectedCoursesContainer extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var courses;
        if (SessionManager.getSessionValue(Constants.SELECTED_COURSES) !== null) {
            courses = SessionManager.getSessionValue(Constants.SELECTED_COURSES);
        }
        this.state = {
            dataSource: ds.cloneWithRows(courses)
        };
    }

    render() {
        return (
            <View>
                <SelectedCoursesListView dataSource={this.state.dataSource}
                                      topGap={((height * 8.8) / 100)}/>

                <WebServiceCallManager visible={false} nav={this.props.navigator} ref={(input) => {
                    this.webservicemanager = input;
                }}/>
            </View>
        );
    }

}
