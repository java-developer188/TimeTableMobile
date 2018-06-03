import React, {Component} from 'react';
import {
    ListView,
    View, Dimensions, Alert
} from 'react-native'
import {SessionManager} from '.././utilities/SessionManager';
import Constants from '.././utilities/Constants';
import {WebServiceCallManager} from '.././utilities/WebServiceCallManager';
import RemoveSelectedCoursesListView from "./RemoveSelectedCoursesListView";


const {width, height} = Dimensions.get("window");


export default class RemoveSelectedCoursesContainer extends Component {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var courses;
        if (SessionManager.getSessionValue(Constants.FINAL_SELECTED_COURSES) !== null) {
            courses = SessionManager.getSessionValue(Constants.FINAL_SELECTED_COURSES).CST;
        }
        this.state = {
            dataSource: ds.cloneWithRows(JSON.parse(courses))
        };
        //alert(JSON.stringify(courses))
    }

    render() {
        return (
            <View>
                <RemoveSelectedCoursesListView dataSource={this.state.dataSource}
                                      topGap={((height * 8.8) / 100)}/>

                <WebServiceCallManager visible={false} nav={this.props.navigator} ref={(input) => {
                    this.webservicemanager = input;
                }}/>
            </View>
        );
    }

}
