import React, {Component} from 'react'
import {
    View,
    ListView,
    Text,
    StyleSheet,
    Alert,
    TouchableHighlight,
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get("window");
var color = ['#FF8563','#716B99','#20B5A3','#FF6073','#CEE271'];
// Showing the customer accounts data row
var topGap;

export default class TeacherTimeTableListView extends Component {

    constructor(props) {
        super(props);
        topGap = this.props.topGap;
        this.state = {
            dataSource: this.props.dataSource,
            showHeader: this.props.showHeader,
            headerText: this.props.headerText,
            onPress: this.props.onpress,
        }

    }

    static defaultProps = {
        headerText: "",
        showHeader: false,
        dataSource: [],
    }


    renderRow = (rowData,rowID) => (

        <View style={styles.row}>
            <View style={[styles.blockOne, {backgroundColor: color[rowID%5]}]}>
                <Text style={styles.boldText}>
                    {rowData.day}
                </Text>
                <Text>
                    {rowData.time}
                </Text>
            </View>

            <View style={styles.blockTwo}>
                <Text style={styles.text}>
                    Room
                </Text>
                <Text style={styles.textBottom}>
                    {rowData.room}
                </Text>
            </View>

            <View style={styles.blockThree}>
                <Text style={styles.boldText}>
                    {rowData.course}
                </Text>
                <Text >
                    Section: {rowData.section}
                </Text>
            </View>
        </View>
    );


    renderHeader = (headerText) => {
        return (
            <View >
                <Text style={styles.labelTextHeading}>
                    {headerText}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    style={styles.listviewcontainer}
                    dataSource={this.state.dataSource}
                    renderRow={(row,sectionID, rowID, highlightRow) => this.renderRow(row,rowID)}
                    renderHeader={this.state.showHeader ? () => this.renderHeader(this.state.headerText) : () => {
                    }}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: ((width * 2) / 100),
        marginLeft: ((width * 0) / 100),
        marginTop:((height *9) / 100),
    },
    row: {
        flexDirection:'row',
    },
    blockOne:{
        flex:2,
        alignItems:'center',
        backgroundColor: 'red',
    },
    blockTwo:{
        flex:2,
        alignItems:'center',
        marginLeft: ((height * 2) / 100)
    },
    blockThree:{
        flex:4,
        alignItems:'center',
    },
    boldText: {
        fontSize: ((width * 3.5) / 100),
        textAlign: 'left',
        color: 'black',
        fontWeight:'bold',
        marginTop: ((height * 4) / 100),
    },
    text: {
        fontSize: ((width * 3.5) / 100),
        textAlign: 'left',
        color: 'black',
        marginTop: ((height * 4) / 100),
    },
    textBottom: {
        marginBottom: ((height * 2) / 100),
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'black'
    },
    listviewcontainer: {
        height: ((height * 100) / 100),
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
