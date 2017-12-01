import React, {Component} from 'react'
import {
    View,
    ListView,
    Text,
    StyleSheet,
    Alert,
    TouchableHighlight,
    Dimensions,
    ToastAndroid,
    Image
} from 'react-native'
import Row from "../components/Row";
import {SessionManager} from "../utilities/SessionManager";
import * as Constants from "../utilities/Constants";
const {width, height} = Dimensions.get("window");
var color = ['#FF8563', '#716B99', '#20B5A3', '#FF6073', '#CEE271'];
const selectIcon = require('.././assets/tick.png');
var topGap;

export default class CSTListView extends Component {

    constructor(props) {
        super(props);
        topGap = this.props.topGap;
        this.state = {
            dataSource: this.props.dataSource,
            showHeader: this.props.showHeader,
            headerText: this.props.headerText
        }

    }

    static defaultProps = {
        headerText: "",
        showHeader: false,
        dataSource: [],
    }


    renderRow = (rowData, rowID) => {
        var selected = [];
        var courseSelected = false;
        if (SessionManager.getSessionValue(Constants.SELECTED_COURSES) !== null) {
            selected = SessionManager.getSessionValue(Constants.SELECTED_COURSES);
            for (var value of selected) {
                if (rowData.id === value.id) {
                    courseSelected = true;
                    break;
                }
            }
        }
        else {
            SessionManager.setSessionValue(Constants.SELECTED_COURSES, []);
        }

        if(this.state.dataSource.length < 1){
            return (
                <Text  style={styles.balanceText}>No courses</Text>
            );
        }
        else {
            return (
                <Row
                    onPress={this.onpress}
                    data={rowData}
                    rowID={rowID}
                    isSelected={courseSelected}
                />
            );
        }
    };


    renderHeader = (headerText) => {
        return (
            <View >
                <Text style={styles.labelTextHeading}>
                    {headerText}
                </Text>
            </View>
        );
    }

    _renderPage(data, width, height) {
        return (
            <View>
                <Image source={data} resizeMode='cover'
                       style={{width: width, height: height, backgroundColor: 'transparent'}}/>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    style={styles.listviewcontainer}
                    dataSource={this.state.dataSource}
                    renderRow={(row, sectionID, rowID, highlightRow) => this.renderRow(row, rowID)}
                    renderHeader={this.state.showHeader ? () => this.renderHeader(this.state.headerText) : () => {
                    }}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
                />
            </View>
        );
    }

    onpress = (data,isSelected) => {
        this.handleSelectedCourses(data,isSelected)
    }

    handleSelectedCourses(data,isSelected) {
        var selected = [];
        if(isSelected === true ) {
            if (SessionManager.getSessionValue(Constants.SELECTED_COURSES) !== null) {
                selected = SessionManager.getSessionValue(Constants.SELECTED_COURSES);
                selected.push(data);
                SessionManager.setSessionValue(Constants.SELECTED_COURSES, selected);
                ToastAndroid.showWithGravity(selected.length + ' course/s selected' , ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
            else {
                selected.push(data);
                SessionManager.setSessionValue(Constants.SELECTED_COURSES, selected);
            }
        }
        else{
            if (SessionManager.getSessionValue(Constants.SELECTED_COURSES) !== null) {
                selected =[];
                for(var value of SessionManager.getSessionValue(Constants.SELECTED_COURSES)) {
                    if(value.id !== data.id) {
                        selected.push(value);
                    }
                }
                SessionManager.setSessionValue(Constants.SELECTED_COURSES, selected);
                ToastAndroid.showWithGravity('Course Unselected' , ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: ((width * 2) / 100),
        paddingBottom: ((width * 2) / 100),
        //marginLeft: ((width * .5) / 100),
        marginTop: ((height * 0) / 100),
    },
    header: {
        fontSize: ((width * 5) / 100),
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'black',
        marginTop: ((height * 3) / 100),
        marginLeft: ((height * 2) / 100)
    },
    selectedRow: {
        flexDirection: 'row',
        height: ((height * 8) / 100),
        backgroundColor: '#12780E'
    },
    row: {
        flexDirection: 'row',
        height: ((height * 8) / 100),
    },
    block: {
        width: ((width * 20) / 100)
    },
    text: {
        fontSize: ((width * 3.5) / 100),
        textAlign: 'left',
        color: 'black',
        marginTop: ((height * 1) / 100)
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'black'
    },
    listviewcontainer: {
        height: ((height * 85) / 100),
    },
    balanceText: {
        fontSize: ((width * 4) / 100),
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: ((width * 5) / 100),
        color: 'black'
    },
    labelTextHeading: {
        marginTop: ((height * 2) / 100),
        color: '#FFFFFF',
        backgroundColor: '#00826B',
        fontFamily: 'Arial-BoldMT',
        fontSize: ((height * 1.8) / 100),
    },

});
